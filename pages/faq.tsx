import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Heading,
  Icon,
  ListItem,
  Text,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { FcFaq } from "react-icons/fc";

type Props = {};

export default function Faq({}: Props) {
  return (
    <Container maxW="container.lg" mt="3">
      <Heading>
        {/* <Icon>
          <FcFaq />
        </Icon>{" "} */}
        FAQ
      </Heading>
      <Text>Preguntas Frequentes</Text>

      <Accordion mt="3">
        <AccordionItems title="Cuidado a considerar">
          <UnorderedList>
            <ListItem>
              Cada artículo está sellado con cera, la cual lo protege del agua y
              calor.
            </ListItem>
            <ListItem>
              Limpie con un paño húmedo. Evite los limpiadores abrasivos.
              Recomendamos limpiar cualquier derrame lo antes posible.
            </ListItem>
            <ListItem>Solamente para uso en interiores.</ListItem>
            <ListItem>No apto para lavavajillas (dishwashers).</ListItem>
            <ListItem>Manipular con cuidado para evitar daños.</ListItem>
            <ListItem>
              Cada pieza está hecha a mano por nosotras, por lo tanto, cada
              artículo es completamente único y los colores pueden variar
              ligeramente de las fotos.
            </ListItem>
            <ListItem>
              Es posible que se produzcan pequeñas burbujas de aire debido a la
              naturaleza del material y modo de fabricación. Hacemos todo lo
              posible para minimizarlas en la medida de lo posible.
            </ListItem>
          </UnorderedList>
        </AccordionItems>
      </Accordion>
    </Container>
  );
}

const AccordionItems = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton
          _expanded={{ bg: useColorModeValue("gray.200", "gray.700") }}
        >
          <Box flex="1" textAlign="left">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>{children}</AccordionPanel>
    </AccordionItem>
  );
};
