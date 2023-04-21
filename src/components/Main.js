import { Alchemy, Network } from "alchemy-sdk";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Center,
  Divider,
  Flex,
  CircularProgress,
  Text,
  TableContainer,
  Table,
  TableCaption,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(settings);

const { Utils } = require("alchemy-sdk");

export function Main() {
  const [blockNumber, setBlockNumber] = useState();
  const [latestBlocks, setLatestBlocks] = useState();
  const [latestTransactions, setLatestTransactions] = useState();

  useEffect(() => {
    const blockArray = [];
    const transactionArray = [];

    const getLatestBlocksAndTransactions = async () => {
      const blockNumber = await alchemy.core.getBlockNumber();
      const latestBlock = await alchemy.core.getBlock(blockNumber);

      setBlockNumber(blockNumber);
      for (let i = blockNumber; i >= blockNumber - 20; i--) {
        if (i !== undefined) {
          const block = await alchemy.core.getBlock(i);
          blockArray.push(block);
        }
      }

      const transactions = latestBlock.transactions;
      const startingIndex = Math.max(transactions.length - 20, 0);
      for (let i = transactions.length - 1; i >= startingIndex; i--) {
        if (transactions[i] !== undefined) {
          const transaction = await alchemy.core.getTransaction(
            transactions[i]
          );
          transactionArray.push(transaction);
        }
      }
      setLatestBlocks(blockArray);
      setLatestTransactions(transactionArray);
    };

    getLatestBlocksAndTransactions();
  }, []);

  useEffect(() => {
    console.log(latestBlocks);
    console.log(latestTransactions);
  }, [latestBlocks, latestTransactions]);

  return (
    <Box
      color={"White"}
      bg="gray.700"
      textAlign="center"
      minWidth="100vw"
      minHeight="100vh"
    >
      <Center
        fontWeight="700"
        fontSize="48px"
        pt="10px"
        pb="10px"
        color="yellow"
      >
        Ethereum Block Explorer
      </Center>
      <Divider />
      {!latestBlocks ? (
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
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          marginTop={"40px"}
          gap={"30px"}
        >
          <TableContainer
            overflowY="auto"
            maxHeight="600px"
            borderBottom={"3px solid white"}
            bg={"black"}
          >
            <Table variant size="lg" width="600px">
              <TableCaption
                placement="top"
                fontSize={"25px"}
                fontWeight={"bold"}
                pt="20px"
                pb="20px"
                bg={"black"}
              >
                Latest Blocks
              </TableCaption>
              <Tbody bg={"black"} fontWeight={"semibold"}>
                {latestBlocks.map((block, index) => {
                  return (
                    <Tr key={index}>
                      <Td>
                        <Text color="orange">Block</Text>
                        <Link
                          textDecoration="underline"
                          to={`/block/number/${block.number}`}
                        >
                          {block.number}
                        </Link>
                      </Td>
                      <Td>
                        <Text color="orange">Block Hash</Text>
                        <Link to={`/block/hash/${block.hash}`}>
                          {block.hash.slice(0, 10)}...
                        </Link>
                      </Td>
                      <Td>
                        <Text color="orange"> Miner</Text>
                        <Link to={`/address/${block.miner}`}>
                          {block.miner.slice(0, 10)}...
                        </Link>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
          <TableContainer
            overflowY="auto"
            maxHeight="600px"
            borderBottom={"2px solid white"}
            bg={"black"}
          >
            <Table variant size="lg" width="600px">
              <TableCaption
                placement="top"
                fontSize={"25px"}
                fontWeight={"bold"}
                pt="20px"
                pb="20px"
                bg={"black"}
              >
                Latest Transactions
              </TableCaption>
              <Tbody bg={"black"} fontWeight={"semibold"}>
                {latestTransactions &&
                  latestTransactions.slice(0, 20).map((transaction, index) => {
                    return (
                      <Tr key={index}>
                        <Td>
                          <Text color="orange">Transaction Hash</Text>
                          <Link
                            textDecoration="underline"
                            to={`/transaction/${transaction.hash}`}
                          >
                            {transaction.hash.slice(0, 10)}...
                          </Link>
                        </Td>
                        <Td>
                          <Text color="orange">From</Text>
                          <Link to={`/address/${transaction.from}`}>
                            {transaction.from.slice(0, 10)}...
                          </Link>
                        </Td>
                        <Td>
                          <Text color="orange">To</Text>
                          {transaction.to ? (
                            <Link to={`/address/${transaction.to}`}>
                              {transaction.to.slice(0, 10)}...
                            </Link>
                          ) : (
                            <Text>Contract Creation</Text>
                          )}
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      )}
    </Box>
  );
}
