
import { Elements, ExpressCheckoutElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from "./paymentForm";
import Card from "components/card/Card";
import { Button, Flex, Grid, GridItem } from "@chakra-ui/react";
import { FaHistory } from 'react-icons/fa';

const PUBLIC_KEY = "pk_test_51OHLo0SFmCC7yi5nXKBY2BrWgR6AlXLBNd3HN6BrHNWdSY89otpPLcrTB0IJwbSZp6apVwnQ7McwhjYYJisor9cL00KH3Gsu9W"

const stirpeTestPromise = loadStripe(PUBLIC_KEY)

const StripeContainer = () => {
    return (

        <Grid templateColumns="repeat(12, 1fr)" gap={3}>

            <GridItem colSpan={{ base: 12, md: 6 }}>
                <Card>
                    <Elements stripe={stirpeTestPromise}>
                        <PaymentForm />
                        {/* <ExpressCheckoutElement/> */}
                    </Elements>
                </Card>
            </GridItem>
            <GridItem colSpan={{ base: 12, md: 6 }}>
                <Card>
                    <Flex justifyContent={'center'} alignItems={'center'} height={'100%'} width={'100%'}>
                        <img src={require('../../../assets/img/pay.avif')} alt="Payment Banner"/>
                    </Flex>
                </Card>
            </GridItem>
            <GridItem>
                <Button leftIcon={<FaHistory />} variant="brand">History</Button>
            </GridItem> 
        </Grid>

    );
};

export default StripeContainer;