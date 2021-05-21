import {  EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { Form, Formik } from "formik";
import {
  Avatar,
  Box,
  InputLeftAddon,
  InputRightAddon,
  Button,
  Input,
  SimpleGrid,
  InputGroup,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { MdHome } from "react-icons/md";
import { FormInput } from "../../components/sections/FormInput";
import { EditProfileModal } from "../../components/sections/modal/EditProfileModal";
import { SubListModal } from "../../components/sections/modal/SubListModal";
import { usePatientQuery } from "../../generated/graphql";

export default function Profile() {
  const [edit, setEdit] = useState(false)
  const [alergies, setAlergies] = useState(false)
  let token = Cookies.get("token");
  let [{ fetching, data }] = usePatientQuery({
    variables: {
      token: token,
    },
  });
  const handleSubmit = () => {

  }

  const subModal = useDisclosure();
  let user = null;
  let body = null;

  if (data) user = data.patient;

  if (fetching) body = <p> Loading </p>;
  else if (!data) body = <p> Loading </p>;
  else if (data.patient) {
    console.log(data.patient);
    body = (
      <>
        <Box align="left">
          <Avatar
            name={user.email.split("@")[0]}
            src="https://bit.ly/dan-abramov"
            size="2xl"
            margin={4}
            pd={3}
            width={290}
            height={290}
          />
        </Box>
        <Box align="left" >
          { (edit) 
          ? (
            <InputGroup size="lg" color="black">
              <Input type="firstName" placeholder={user.firstName} />
              <Input type="lastName" placeholder={user.lastName} />
            </InputGroup>
          ) : (
          <Text fontSize="3em">
            {user.firstName} {user.lastName}
          </Text>
          )
          }
          <Stack spacing={4}>
            <InputGroup size="lg" color="black">
              <InputLeftAddon children={<EmailIcon/>}/>
              {
              (edit) 
              ? (
              <Input type="tel" placeholder={user.email} />
              ) : (
              <Text padding={3} fontSize="1em">
                {user.email ? user.email : "Not added"}
              </Text>
              )
              }
            </InputGroup>

            <InputGroup size="lg" color="black">
              <InputLeftAddon children={<PhoneIcon/>}/>
              {
              (edit) 
              ? (
              <Input type="tel" placeholder={user.telephone} />
              ) : (
              <Text padding={3} fontSize="1em">
                {user.telephone ? user.telephone : "Not added"}
              </Text>
              )
              }
            </InputGroup>

            <InputGroup size="lg" color="black">
              <InputLeftAddon children={<MdHome/>}/>
              {
              (edit) 
              ? (
              <Input type="string" placeholder={user.address.street + " " + user.address.city + " " + user.address.country}
               />
              ) : (
              <Text padding={3} fontSize="1em">
                {user.address.street + " " + user.address.city + " " + user.address.country}
              </Text>
              )
              }
            </InputGroup>

          <hr />
            <InputGroup size="lg" color="black">
              <InputLeftAddon children={"Points"}/>
              <Text padding={3} fontSize="1em">
                  {user.points ? user.points : 0} 
              </Text>
            </InputGroup>
            <InputGroup size="lg" color="black">
              <InputLeftAddon children={"Tier"}/>
              <Text padding={3} fontSize="1em">
                  {user.tier ? user.tier.name : "No Tier"}{" "}
              </Text>
            </InputGroup>
          </Stack>
        </Box>
      </>
    );
  }
  return (
    <>
      <Box m="4" p="8">
        <SimpleGrid
          columns={3}
          spacing={2}
          margin="30"
          padding="20"
          boxShadow="0 4px 4px 2px #aaa"
        >
          {body}
          <Box align="right">
            {(edit)
              ? (
            <Box>
              <Button w={90} colorScheme="red" onClick={() => setEdit(!edit)}>
                 Cancel
              </Button>
              <Button w={90} colorScheme="teal" onClick={() => handleSubmit()}>
                 Submit
              </Button>
            </Box>
              )
              : (
            <Box>
              <Button w={180} onClick={() => setEdit(!edit)}>
                Edit Profile
              </Button>
            </Box>

              )}
            <Box>
              {" "}
            </Box>
            <Box>
              {" "}
              <Button w={180} onClick={subModal.onOpen}>
                Subscriptions
              </Button>{" "}
            </Box>
          </Box>
        </SimpleGrid>
      </Box>

      <SubListModal
        onOpen={subModal.onOpen}
        isOpen={subModal.isOpen}
        onClose={subModal.onClose}
      />
    </>
  );
}
