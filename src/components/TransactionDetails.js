import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  CircularProgress,
  VStack,
  Heading,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";
import { alchemy } from "./Main";

function TransactionDetails() {
  const [transaction, setTransaction] = useState(null);
  const { transactionHash } = useParams();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const transaction = await alchemy.core.getTransaction(transactionHash);
      setTransaction(transaction);
    };

    fetchData();
  }, [transactionHash]);

  return (
    <Box
      color={"white"}
      bg="gray.700"
      textAlign="center"
      minWidth="100vw"
      minHeight="100vh"
      padding="20px"
    >
      {transaction === null ? (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection="column"
          pt="300px"
        >
          <CircularProgress isIndeterminate color="orange" size={"35px"} />
          <Text fontSize="20px">
            Retreiving data from Ethereum, please standby⛏️🙏
          </Text>
        </Flex>
      ) : (
        <VStack spacing={4}>
          <Heading as="h2" size="lg" color="yellow">
            Transaction Details
          </Heading>
          <Table
            variant="unstyled"
            border="1px"
            borderColor="gray.300"
            borderRadius="md"
            maxWidth={"800px"}
          >
            <Thead display="none" />
            <Tbody>
              <Tr>
                <Th fontSize="md" fontWeight="semibold" color={"orange"}>
                  Transaction Hash:
                </Th>
                <Td fontSize="md">{transaction.hash}</Td>
              </Tr>
              <Tr>
                <Th fontSize="md" fontWeight="semibold" color={"orange"}>
                  Block:
                </Th>
                <Td fontSize="md">{transaction.blockNumber}</Td>
              </Tr>
              <Tr>
                <Th fontSize="md" fontWeight="semibold" color={"orange"}>
                  From:
                </Th>
                <Td fontSize="md">{transaction.from}</Td>
              </Tr>
              <Tr>
                <Th fontSize="md" fontWeight="semibold" color={"orange"}>
                  To:
                </Th>
                <Td fontSize="md">{transaction.to}</Td>
              </Tr>
              <Tr>
                <Th fontSize="md" fontWeight="semibold" color={"orange"}>
                  Value:
                </Th>
                <Td fontSize="md">{transaction.value.toString()} ETH</Td>
              </Tr>
              <Tr>
                <Th fontSize="md" fontWeight="semibold" color={"orange"}>
                  Gas Price:
                </Th>
                <Td fontSize="md">{transaction.gasPrice.toString()} Gwei</Td>
              </Tr>
            </Tbody>
          </Table>
          <Button mt={4} colorScheme="orange" onClick={goBack}>
            Back
          </Button>
        </VStack>
      )}
    </Box>
  );
}

export default TransactionDetails;
