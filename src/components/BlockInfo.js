import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  VStack,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  CircularProgress,
  Text,
} from "@chakra-ui/react";
import { alchemy } from "./Main";

function BlockInfo({ blockNumber }) {
  const [block, setBlock] = useState(null);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const block = await alchemy.core.getBlock(blockNumber);
      setBlock(block);
    };

    fetchData();
  }, [blockNumber]);

  return (
    <Box
      color={"white"}
      bg="gray.700"
      textAlign="center"
      minWidth="100vw"
      minHeight="100vh"
      padding="20px"
    >
      {block === null ? (
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
            Block Information
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
                  Block Number:
                </Th>
                <Td fontSize="md">{block.number}</Td>
              </Tr>
              <Tr>
                <Th fontSize="md" fontWeight="semibold" color={"orange"}>
                  Transaction Count:
                </Th>
                <Td fontSize="md">{block.transactions.length}</Td>
              </Tr>
              <Tr>
                <Th fontSize="md" fontWeight="semibold" color={"orange"}>
                  Timestamp:
                </Th>
                <Td fontSize="md">{block.timestamp}</Td>
              </Tr>
              <Tr>
                <Th fontSize="md" fontWeight="semibold" color={"orange"}>
                  Fee Recipient:
                </Th>
                <Td fontSize="md">{block.miner}</Td>
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

export default BlockInfo;
