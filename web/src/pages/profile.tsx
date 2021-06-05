import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { MdHome } from "react-icons/md";
import { AddAllergieModal } from "../components/sections/modal/AddAllergieModal";
import {
  useAllergiesQuery,
  useEditUserMutation,
  useMeQuery,
} from "../generated/graphql";
import { login } from "../services/authService";
import { toErrorMap } from "../types";

export default function Profile() {
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
    user = data.me;
    let temp = { ...user };
    const handleSubmit = () => {
      delete temp.__typename;
      delete temp.address.__typename;
      editUser({ inputs: temp, token: token }).then((res) => console.log(res));
    };
    console.log(data.me);
    body = (
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          address: {
            street: "",
            city: "",
            country: "",
          },
        }}
        onSubmit={async (values, { setErrors }) => {
          delete temp.__typename;
          delete temp.address.__typename;
          editUser({ inputs: temp, token: token }).then((res) =>
            console.log(res)
          );
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <SimpleGrid
              columns={3}
              spacing={2}
              margin="30"
              padding="20"
              boxShadow="0 4px 4px 2px #aaa"
            >
              <Box align="left">
                <Avatar
                  name={data.me.email.split("@")[0]}
                  src="https://bit.ly/dan-abramov"
                  size="2xl"
                  margin={4}
                  pd={3}
                  width={290}
                  height={290}
                />
              </Box>
              <Box align="left">
                {edit ? (
                  <InputGroup size="lg" color="black">
                    <Input
                      value={temp.firstName}
                      type="firstName"
                      placeholder={user.firstName}
                    />
                    <Input
                      value={user.lastName}
                      type="lastName"
                      placeholder={user.lastName}
                    />
                  </InputGroup>
                ) : (
                  <Text fontSize="3em">
                    {user.firstName} {user.lastName}
                  </Text>
                )}
                <Stack spacing={4}>
                  <InputGroup size="lg" color="black">
                    <InputLeftAddon children={<EmailIcon />} />
                    <Text padding={3} fontSize="1em">
                      {user.email ? user.email : "Not added"}
                    </Text>
                  </InputGroup>

                  <InputGroup size="lg" color="black">
                    <InputLeftAddon children={<PhoneIcon />} />
                    {edit ? (
                      <Input
                        value={user.telephone}
                        type="tel"
                        placeholder={user.telephone}
                      />
                    ) : (
                      <Text padding={3} fontSize="1em">
                        {user.telephone ? user.telephone : "Not added"}
                      </Text>
                    )}
                  </InputGroup>

                  <InputGroup size="lg" color="black">
                    <InputLeftAddon children={<MdHome />} />
                    {edit ? (
                      <Input
                        type="string"
                        value={
                          user.address.street +
                          "," +
                          user.address.city +
                          "," +
                          user.address.country
                        }
                        placeholder={
                          user.address.street +
                          "," +
                          user.address.city +
                          "," +
                          user.address.country
                        }
                      />
                    ) : (
                      <Text padding={3} fontSize="1em">
                        {user.address.street +
                          "," +
                          user.address.city +
                          "," +
                          user.address.country}
                      </Text>
                    )}
                  </InputGroup>

                  <hr />
                  {user.role === "patient" && (
                    <>
                      <InputGroup size="lg" color="black">
                        <InputLeftAddon children={"Points"} />
                        <Text padding={3} fontSize="1em">
                          {user.points ? user.points : 0}
                        </Text>
                      </InputGroup>
                      <InputGroup size="lg" color="black">
                        <InputLeftAddon children={"Tier"} />
                        <Text padding={3} fontSize="1em">
                          {user.tier ? user.tier.name : "No Tier"}{" "}
                        </Text>
                      </InputGroup>
                    </>
                  )}
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
                      onClick={() => handleSubmit()}
                    >
                      Submit
                    </Button>
                  </Box>
                ) : (
                  <Box>
                    <Button w={180} onClick={() => setEdit(!edit)}>
                      Edit Profile
                    </Button>
                    <Button w={180} onClick={() => allergiesModal.onOpen()}>
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
        <Text style={{ fontSize: 32, textAlign: "center" }} p={2}>
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
