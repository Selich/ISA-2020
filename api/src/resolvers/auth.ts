import argon2 from "argon2";
import axios from 'axios'
import jwt from "jsonwebtoken";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Address } from "../entities/Address";
import { Employee } from "../entities/Employee";
import Patient from "../entities/Patient";
import User from "../entities/User";
import { MyContext } from "../types";
import { sendVerificationMail } from "../utils/sendMail";
import { PatientInput, PatientResponse, UserInput, UserResponse } from "./types/dtos";


const roles = {
    'users': ['patient'],
    'employees': ['derm', 'pharm', 'pharmadmin'],

}
@Resolver(User)
export class AuthResolver {

    @Query(() => User, { nullable: true })
    me(@Arg("token") token: string, @Ctx() { req }: MyContext) {
        let decode = jwt.decode(token);
        console.log(decode);
        let temp = Patient.findOne({ id: req.session.id });
        if (!temp) {
            let temp2 = Employee.findOne({ id: req.session.id });
            if (!temp2) return null;
            //@ts-ignore
            temp = temp2;
        }

        return temp;
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("inputs") inputs: UserInput, 
        @Ctx() { req }: MyContext) 
    {
        let patient = null
        let employee = null
        let user = null
        patient = await Patient.findOne({ email: inputs.email });
        employee = await Employee.findOne({ email: inputs.email });
        user = (!patient) ? employee : patient

        if (!user)
            return { errors: [{ field: "email", message: "Invalid" }] };

        user.isEnabled = true
        if (!user.isEnabled)
            return { errors: [{ field: "email", message: "User not activated" }] };


        if(inputs.password && !argon2.verify(user.password, inputs.password))
            return { errors: [{ field: "password", message: "Invalid" }] };

        let token = jwt.sign(
            { id: user.id, email: user.email, },
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

        if(!inputs.role) return { errors: [{ field: "role", message: "No role defined" }] };

        if(inputs.role && roles.users.includes(inputs.role)){
            user = new Patient({...inputs})
            token = await sendVerificationMail(user, mailer)
        } else if(inputs.role && roles.employees.includes(inputs.role)){
            user = new Employee({...inputs})
        }
        if(!user) return { errors: [{ field: "email", message: "Invalid register info" }] };

        let address = null
        if(inputs.address){
            let { street, city, country } = inputs.address
            address = await Address.findOne({ street, city, country });
            if (!address){
                let url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ 
                street?.replace(' ', '+') + 
                '+' + city?.replace(' ', '+') + 
                '+' + country?.replace(' ', '+')
                +'&key=' + 'AIzaSyAAQDnv95Dl24FWuV-cuFSrazikHP9Lau0'
                let res = await axios.get(url)
                console.log(url)
                console.log(res.data)
                let lat = res.data.results[0].geometry.location.lat
                let long = res.data.results[0].geometry.location.lng

                user.address = await Address.save( new Address({ street, city, country,  lat, long, user: temp, }));
            }
            else 
                user.address = address
        }
        if(inputs.password)
            user.password = await argon2.hash(inputs.password);

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
