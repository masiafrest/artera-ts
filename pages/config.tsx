import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
type Props = {};
import { supabase } from "lib/utils/supabaseClient";
import { NextAppPageServerSideProps, ProductDetailInterface } from "lib/types";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import ProductForm from "components/Forms/ProductForm";

export default function Config({}: Props) {
  return (
    <Container maxW="container.lg" mt="3">
      <HStack alignItems="center" justifyContent="space-between">
        <Heading>Ajuste</Heading>
      </HStack>
      <Text></Text>

      <Accordion mt="3">
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Cambiar imagen carrousel
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}></AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Section 2 title
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
}): Promise<NextAppPageServerSideProps> => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user?.user_metadata.isadmin) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};
