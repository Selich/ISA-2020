import { Box } from "@chakra-ui/react";
import React from "react";

export const Paper = (props) => (
      <Box
        m="4"
        p="8"
        border="1px"
        rounded="2px"
        borderColor="gray.300"
        boxShadow="md"
        bg="grey.200"
        color="#2d383c"
        fontSize="2rem"
        textAlign="center"
        h="1200px"
      >
          {props.children}
      </Box>
)