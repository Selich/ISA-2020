import React from "react";
import { HStack, SimpleGrid, Grid, GridItem, Box, FormControl, FormLabel, Button, Flex, Select, Stack } from '@chakra-ui/react';
// import { yupResolver } from '@hookform/resolvers/yup';
import { SearchBox } from '../../ui/SearchBox'
import { FormInput } from './../../../components/sections/FormInput';
import { Wrapper }  from './../../../components/ui/Wrapper';
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { FieldError, useLoginMutation } from '../../../generated/graphql';
import { toErrorMap } from '../../../utils/errorMap';

const items = [
  "Linkedin",
  "Sinkedin"
];


export default function PriceForm({onClose}) {
	// const [{ fetching: loginFetch }, login] = useLoginMutation();
  return (
      <Wrapper variant="regular">
        <Formik
					initialValues={{ 
						code: "",
					  name: "",
					  type: "",
					  points: "",
					  form: "",
					  contents: "",
					  producer: "",
					  info: "",
						alternatives: []
					}}
          onSubmit={async (values, { setErrors }) => {
						//const response = await login(values);
						//if (response.data?.login.errors) {
						//  console.log(response.data.login.errors);
						// setErrors(toErrorMap(response.data.login.errors));
						//} else if (response.data?.login.user) {
						//  let user = response.data.login.user
            // @ts-ignore
              // router.push(`/${user.role}/${user.id}`);
              onClose()
            }
          }
        >
          {({ isSubmitting }) => (
          <Form>
						<HStack>
  				<SimpleGrid columns={2} spacingX="10px" spacingY="10px" maxW="50%">
  				<SimpleGrid columns={2} spacingX="10px" spacingY="10px" minChildWidth="150px">
              <Box mt={4}>
								<FormInput 
									name="code" 
									placeholder="code" 
									label="Code" 
								/>
              </Box>
              <Box mt={4}>
								<FormInput 
									name="name" 
									placeholder="name" 
									label="Name" 
								/>
              </Box>
						</SimpleGrid>
  				<SimpleGrid columns={2} spacingX="10px" spacingY="10px" minChildWidth="150px">
              <Box mt={4}>
								<FormInput 
									name="type" 
									placeholder="type" 
									label="Type" 
								/>
              </Box>
              <Box mt={4}>
								<FormInput 
									name="form" 
									placeholder="form" 
									label="Form" 
								/>
              </Box>
						</SimpleGrid>
  				<SimpleGrid columns={2} spacingX="10px" spacingY="10px" minChildWidth="150px">
              <Box mt={4}>
								<FormInput 
									name="producer" 
									placeholder="producer" 
									label="Producer" 
								/>
              </Box>
						</SimpleGrid>
              <Box mt={4}>
								<FormInput 
									name="contents" 
									placeholder="contents" 
									label="Contents" 
								/>
              </Box>
						</SimpleGrid>
  				<SimpleGrid columns={1} spacingX="10px" spacingY="10px" >
							<SearchBox alternatives={items}/>
					</SimpleGrid>
				</HStack>
              <Button
                mt={4}
                size="md"
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
              >
              Create Medicine
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    );
}
