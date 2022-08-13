import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  UnorderedList,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "lib/context/AuthContext";
import { delFaq, getFaqs, postFaq, updateFaq } from "lib/services/faq.services";
import { Faq, FaqWithId } from "lib/types";
import React, {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {};

export default function Faqs({}: Props) {
  const { isAdmin } = useAuth();

  const [faqs, setFaqs] = useState<FaqWithId[]>([]);
  const [faqToEdit, setFaqToEdit] = useState<FaqWithId>();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { isOpen, onOpen, onClose, getButtonProps } = useDisclosure();
  const toast = useToast({
    duration: 5000,
    isClosable: true,
    position: "top",
  });
  const openModalBtnProps = getButtonProps();

  useEffect(() => {
    (async () => {
      const data = await getFaqs();
      setFaqs(data);
    })();
  }, []);

  const handleClose = () => {
    onClose();
    if (isEdit) {
      setIsEdit(false);
      setFaqToEdit(undefined);
    }
  };

  const handleSubmit = async (data: Faq | FaqWithId) => {
    try {
      if (isEdit && "id" in data) {
        const res = await updateFaq(data);
        toast({
          description: `Faq modificado`,
          status: "success",
        });
        handleClose();
        const faqIdx = faqs.findIndex((e) => e.id === data.id);
        setFaqs((oldFaq) => {
          oldFaq[faqIdx] = res.body[0];
          return oldFaq;
        });
        return;
      }

      const res = await postFaq(data);
      toast({
        description: `Faq added`,
        status: "success",
      });
      handleClose();
      setFaqs((oldFaq) => oldFaq.concat(res.data));
    } catch (error) {
      toast({
        description: `Algo sucedio con el server`,
        status: "error",
      });
    }
  };

  const onEditHandle = (faq: FaqWithId) => {
    setFaqToEdit(faq);
    setIsEdit(true);
  };

  const onDelHandle = (id: number) => {
    try {
      delFaq(id).then((res) => {
        setFaqs((oldF) => oldF.filter((e) => e.id !== id));
      });
      toast({
        description: `Borrado con exito`,
        status: "success",
      });
    } catch (error) {
      toast({
        description: `Algo sucedio con el server`,
        status: "error",
      });
    }
  };

  useEffect(() => {
    if (isEdit && faqToEdit) {
      onOpen();
    }
  }, [isEdit]);

  return (
    <Container maxW="container.lg" mt="3">
      <HStack alignItems="center" justifyContent="space-between">
        <Heading>FAQ</Heading>
        {isAdmin && <Button {...openModalBtnProps}>Agregar faq</Button>}
      </HStack>
      <Text>Preguntas Frequentes</Text>

      {isAdmin && (
        <ModalFaqsForm
          isEdit={isEdit}
          faq={faqToEdit}
          isOpen={isOpen}
          onClose={handleClose}
          handleSubmit={handleSubmit}
        />
      )}
      <Accordion mt="3" allowToggle>
        {faqs.map((e) => {
          return (
            <AccordionItems
              key={e.id}
              faq={e}
              onEditHandle={onEditHandle}
              onDelHandle={onDelHandle}
            />
          );
        })}
      </Accordion>
    </Container>
  );
}

const ModalFaqsForm = ({
  faq,
  isEdit = false,
  isOpen,
  onClose,
  handleSubmit,
}: {
  faq?: FaqWithId;
  isEdit?: boolean;
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (data: Faq | FaqWithId) => void;
}) => {
  const [faqForm, setFaqForm] = useState<Faq>({ title: "", description: "" });

  useEffect(() => {
    if (isEdit && faq) {
      const { title, description } = faq;
      setFaqForm({ title, description });
      return;
    }
    setFaqForm({ title: "", description: "" });
  }, [isEdit]);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFaqForm((prevV) => ({ ...prevV, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data: Faq | FaqWithId;
    if (isEdit && faq) {
      data = {
        id: faq.id,
        title: faqForm.title,
        description: faqForm.description,
      };
    } else {
      data = {
        title: faqForm.title,
        description: faqForm.description,
      };
    }

    handleSubmit(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agregar faqs</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={onSubmit}>
          <ModalBody>
            <FormControl id="title" isRequired>
              <FormLabel>Titulo</FormLabel>
              <Input
                id="title"
                name="title"
                value={faqForm.title}
                onChange={onChange}
              />
            </FormControl>
            <FormControl id="description" isRequired>
              <FormLabel>Descripcion</FormLabel>
              <Textarea
                id="description"
                name="description"
                value={faqForm.description}
                onChange={onChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" mr={3}>
              {isEdit ? "Modificar" : "Guardar"}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

const AccordionItems = ({
  faq,
  onEditHandle,
  onDelHandle,
}: {
  faq: FaqWithId;
  onEditHandle: (faq: FaqWithId) => void;
  onDelHandle: (id: number) => void;
}) => {
  const { isAdmin } = useAuth();

  const { title, description } = faq;

  const onClickEdit = () => {
    onEditHandle(faq);
  };
  const onClickDel = () => {
    onDelHandle(faq.id);
  };

  return (
    <AccordionItem>
      <h2>
        <AccordionButton
          _expanded={{ bg: useColorModeValue("arterra.200", "arterra.400") }}
        >
          <Box flex="1" textAlign="left">
            <HStack>
              <Text>{title}</Text>
              {isAdmin && (
                <>
                  <EditIcon onClick={onClickEdit} />
                  <DeleteIcon onClick={onClickDel} />
                </>
              )}
            </HStack>
          </Box>

          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4} sx={{ whiteSpace: "pre-line" }}>
        {description}
      </AccordionPanel>
    </AccordionItem>
  );
};
