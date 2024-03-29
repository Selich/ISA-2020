import argon2 from "argon2";
import axios from 'axios'
import jwt from "jsonwebtoken";
import { Tier } from "../entities/Tier";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Address } from "../entities/Address";
import Patient from "../entities/Patient";
import User from "../entities/User";
import { MyContext } from "../types";
import { sendVerificationMail } from "../utils/sendMail";
import { PatientInput, PatientResponse, UserInput, UserResponse } from "./types/dtos";
import { getConnection } from "typeorm";


const roles = {
    'users': ['patient'],
    'employees': ['derm', 'pharm', 'pharmadmin'],

}
@Resolver(User)
export class AuthResolver {

    @Query(() => User, { nullable: true })
    async me(@Arg("token") token: string, @Ctx() { req }: MyContext) {
        let decode = jwt.decode(token);
        // @ts-ignore
        return await User.findOne({ email: decode.email });
    }

    @Mutation(() => User, { nullable: true })
    async editUser(
        @Arg("token") token: string,
        @Arg("inputs") inputs: UserInput,
    ) {
        // @ts-ignore
        let user = await User.findOne({ email: inputs.email });
        if (!user) return null
        if (!inputs.address) return null

        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction()

        try {
            if (inputs.version != user.version) return null
            let { street, city, country } = inputs.address
            let address = await Address.findOne({ street, city, country });
            if (!address) {
                let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +
                    street?.replace(' ', '+') +
                    '+' + city?.replace(' ', '+') +
                    '+' + country?.replace(' ', '+')
                    + '&key=' + 'AIzaSyAAQDnv95Dl24FWuV-cuFSrazikHP9Lau0'
                let res = await axios.get(url)
                console.log(url)
                console.log(res.data)
                let lat = res.data.results[0].geometry.location.lat
                let long = res.data.results[0].geometry.location.lng

                user.address = await Address.save(new Address({ street, city, country, lat, long, user: user, }));
            }
            else
                user.address = address

            if (inputs.firstName)
                user.firstName = inputs.firstName
            if (inputs.lastName)
                user.lastName = inputs.lastName
            if (inputs.telephone)
                user.telephone = inputs.telephone
            user.version += 1

            await queryRunner.manager.save(user);
            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
        return user

    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("inputs") inputs: UserInput,
        @Ctx() { req }: MyContext) {
        let user = await User.findOne({ email: inputs.email });
        if (!user)
            return {
                errors: [
                    { field: "email", message: "Invalid credentials" },
                    { field: "password", message: "Invalid credentials" },
                ]
            };

        if(user.role === 'sysadmin'){
            user.isEnabled = true
        }

        if (!user.isEnabled)
            return { errors: [{ field: "email", message: "User not activated. Please check your email." }] };


        console.log(inputs)

        if (inputs.password && !argon2.verify(user.password, inputs.password))
            return {
                errors: [
                    { field: "email", message: "Invalid credentials" },
                    { field: "password", message: "Invalid credentials" },
                ]
            }
        
        

        let token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            "secret",
            { expiresIn: "20m" }
        );

        req.session.user = user;
        return { token, user };
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg("inputs") inputs: UserInput,
        @Ctx() { mailer }: MyContext
    ) {
        let temp = await User.findOne({ email: inputs.email });
        if (temp) return { errors: [{ field: "email", message: "User already exists" }] };

        if (!(inputs.password === inputs.confirmPassword))
            return { errors: [{ field: "password", message: "Passwords need to match" }] };

        let user = null
        let token: string | boolean = 'test'

        if (!inputs.role) return { errors: [{ field: "role", message: "No role defined" }] };

        if (inputs.role && roles.users.includes(inputs.role)) {
            user = new Patient({ ...inputs })
            token = await sendVerificationMail(user, mailer)
        }
        if (!user) return { errors: [{ field: "email", message: "Invalid register info" }] };

        let address = null
        if (inputs.address) {
            let { street, city, country } = inputs.address
            address = await Address.findOne({ street, city, country });
            if (!address) {
                let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +
                    street?.replace(' ', '+') +
                    '+' + city?.replace(' ', '+') +
                    '+' + country?.replace(' ', '+')
                    + '&key=' + 'AIzaSyAAQDnv95Dl24FWuV-cuFSrazikHP9Lau0'
                let res = await axios.get(url)
                console.log(url)
                console.log(res.data)
                let lat = res.data.results[0].geometry.location.lat
                let long = res.data.results[0].geometry.location.lng

                user.address = await Address.save(new Address({ street, city, country, lat, long, user: temp, }));
            }
            else
                user.address = address
        }
        if (inputs.password)
            user.password = await argon2.hash(inputs.password);

        user.appointments = []
        user.tier = await Tier.findOneOrFail({ name: 'Regular' })
        user.save()
        return { token, user }

    }
    @Mutation(() => PatientResponse)
    async confirmRegistration(
        @Arg("email") email: string,
        @Ctx() { req }: MyContext
    ) {
        let user = await Patient.findOne({ email });
        if (user !== undefined) {
            user.isEnabled = true;
            user = await Patient.save(user);

            req.session.userId = user.id;
        }

        return { user };
    }


    @Mutation(() => Boolean)
    logout(@Ctx() { req, res }: MyContext) {
        return new Promise((resolve) =>
            req.session.destroy((err: any) => {
                res.clearCookie("qid");
                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                }

                resolve(true);
            })
        );
    }
}
