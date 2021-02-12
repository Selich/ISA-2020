import React from 'react'
import { Box, Button, useDisclosure, } from "@chakra-ui/react"
import SubscriptionTable from '../../components/tables/SubscriptionTable';


const Subscriptions = (): JSX.Element => {

    return (
        <>
            <Box m={10} mx={20}>
                <SubscriptionTable/>
            </Box>
        </>
    )

}

export default Subscriptions;
