import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  InputGroup,
  InputLeftAddon,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { MdHome } from "react-icons/md";
import { AddAllergieModal } from "../components/sections/modal/AddAllergieModal";
import {
  useAllergiesQuery,
  useEditUserMutation,
  useMeQuery
} from "../generated/graphql";

export const Profile = () => {
  let token = Cookies.get("token");
  let allergiesModal = useDisclosure();
  const [edit, setEdit] = useState(false);
  const [req, setReq] = useState({});
  const [, editUser] = useEditUserMutation();
  let [{ fetching, data }] = useMeQuery({
    variables: {
      token: token,
    },
  });

  let body = null;
  let user = null;
  useEffect(() => {}, [user]);
  if (fetching) body = <p> Loading </p>;
  else if (!data) body = <p> Loading </p>;
  else if (data.me) {
    let user = data.me
    console.log(user)
    body = (
      <Formik
        initialValues={{
          firstName: data.me.firstName,
          lastName: data.me.lastName,
          address: {
            street: data.me.address.street,
            city: data.me.address.city,
            country: data.me.address.country,
          },
          telephone: data.me.telephone
        }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values)
          editUser({ inputs: {...values, email: data.me.email, version: parseInt(data.me.version)}, token: token }).then((res) =>
            setEdit(false)
          );
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <SimpleGrid
            style={{fontSize: 16}}
              columns={3}
              spacing={2}
            >
              <Box align="left">
                <Avatar
                  name={data.me.email.split("@")[0]}
                  src="https://bit.ly/dan-abramov"
                  margin={4}
                  pd={3}
                  width={150}
                  height={150}
                />
              </Box>
              <Box align="left">
                {edit ? (
                  <InputGroup  color="black">
                    <Field
                      type="text"
                      name="firstName"
                      placeholder={user.firstName}
                    />
                    <Field
                      type="text"
                      name="lastName"
                      placeholder={user.lastName}
                    />
                  </InputGroup>
                ) : (
                  <Text>
                    {user.firstName} {user.lastName}
                  </Text>
                )}
                <Stack spacing={4}>
                  <InputGroup  color="black">
                    <InputLeftAddon children={<EmailIcon />} />
                    <Text padding={3} fontSize="1em">
                      {user.email ? user.email : "Not added"}
                    </Text>
                  </InputGroup>

                  <InputGroup  color="black">
                    <InputLeftAddon children={<PhoneIcon />} />
                    {edit ? (
                      <Field
                        type="text"
                        name="telephone"
                        placeholder={user.telephone}
                      />
                    ) : (
                      <Text padding={3} fontSize="1em">
                        {user.telephone ? user.telephone : "Not added"}
                      </Text>
                    )}
                  </InputGroup>

                  <InputGroup color="black">
                    <InputLeftAddon children={<MdHome />} />
                    {edit ? (
                      <>
                      <Field
                        type="text"
                        name="address.street"
                        placeholder={ user.address.street}
                      />
                      <Field
                        type="text"
                        name="address.city"
                        placeholder={ user.address.city}
                      />
                      <Field
                        type="text"
                        name="address.country"
                        placeholder={ user.address.country}
                      />
                      </>
                    ) : (
                      <Text padding={3} >
                        {user.address.street +
                          "," +
                          user.address.city +
                          "," +
                          user.address.country}
                      </Text>
                    )}
                  </InputGroup>
                </Stack>
              </Box>
              <Box align="right">
                {edit ? (
                  <Box>
                    <Button
                      w={90}
                      colorScheme="red"
                      onClick={() => setEdit(!edit)}
                    >
                      Cancel
                    </Button>
                    <Button
                      w={90}
                      colorScheme="teal"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Box>
                ) : (
                  <Box>
                    <Button p={2} w={180} onClick={() => setEdit(!edit)}>
                      Edit Profile
                    </Button>
                    <Button p={2} w={180} onClick={() => allergiesModal.onOpen()}>
                      Add Allergies
                    </Button>
                  </Box>
                )}
                <Box>{user.role === "patient" && <Allergies />}</Box>
              </Box>
              <AddAllergieModal
                onOpen={allergiesModal.onOpen}
                isOpen={allergiesModal.isOpen}
                onClose={allergiesModal.onClose}
              />
            </SimpleGrid>
          </Form>
        )}
      </Formik>
    );
  }
  return (
    <>
      <Box m="4" p="8">
        {body}
      </Box>
    </>
  );
}

const Allergies = () => {
  const token = Cookies.get("token");
  const [{ fetching, data }] = useAllergiesQuery({
    variables: {
      token: token,
    },
  });
  if (data && data.allergies) {
    console.log(data.allergies);
    let arr = Object.values(data.allergies);
    return (
      <>
        <Text style={{ fontSize: 18, textAlign: "center" }} p={2}>
          Alergies
        </Text>
        <hr></hr>

        <List spacing={3}>
          {arr.map((item) => (
            <ListItem>
              <Text style={{ fontSize: 22, textAlign: "left" }} p={2}>
                {item.name + "  ----  " + item.kind}{" "}
              </Text>
            </ListItem>
          ))}
        </List>
      </>
    );
  } else {
    return <div>No Allergies</div>;
  }
};
