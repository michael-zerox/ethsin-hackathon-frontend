import {
  HStack,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

function AssetsModal({ isOpen, onClose, characters }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent style={{ minWidth: 1200, padding: 20 }}>
        <ModalBody>
          <VStack>
            <Text textAlign="center" fontWeight="bold">
              --- Assets | Pokemon ---
            </Text>
            <HStack
              gap={20}
              justifyContent="center"
              marginTop={30}
              alignItems="flex-end"
            >
              {characters.map((character, i) => {
                return (
                  <VStack alignItems="flex-start">
                    <Image src={character.imageFront} width={character.size} />
                    <Text>Token ID: {character.tokenId}</Text>
                    <Text>Lvl: {character.level}</Text>
                    <Text>HP: {character.health}</Text>
                    <Text>Atk: {character.damage}</Text>
                    <Text>Exp: {character.exp}</Text>
                    <Link
                      href={character.chainLink}
                      isExternal
                      color="teal.500"
                    >
                      View on chain <ExternalLinkIcon mx="2px"/>
                    </Link>
                  </VStack>
                );
              })}
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AssetsModal;
