
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { usePharmacyMutation } from '../../../generated/graphql';


export default function PharmacyID() {
  const router = useRouter()
  const [{ fetching }, pharmacy] = usePharmacyMutation();
  let body = null
  let user = null
  let data = {}
  useEffect(() => {
    // const { id } = router.query
    // data = pharmacy({ id: '' + id })

  },[])

  return(<h1>test</h1>)
  //   if (!data.pharmacy) {
  //     body = <p> loading </p>
  //   } else {
  //     console.log(data.pharmacy)
  //     body = (
  //       <>
  //         test
  //         <Text></Text>
  //         <Text fontSize={17}>{data.pharmacy.name}</Text>
  //         <Text fontSize={17} ></Text>

  //         <Text fontSize={17}></Text>
  //         <Text fontSize={14}></Text>
  //         <hr />
  //         <Text fontSize={17}></Text>
  //         <Text fontSize={17}></Text>

  //       </>)


  //   }
  // }, [])


  // return (
  //   <>
  //     <Box
  //       m="4"
  //       p="8"
  //       border="1px"
  //       rounded="2px"
  //       borderColor="gray.300"
  //       boxShadow="md"
  //       bg="grey.200"
  //       color="#2d383c"
  //       fontSize="2rem"
  //       textAlign="center"
  //       h="400px"
  //     >
  //       <SimpleGrid columns={2}>
  //         <Box align="left">
  //           {body}
  //         </Box>
  //       </SimpleGrid>
  //     </Box>
    // </>
}


