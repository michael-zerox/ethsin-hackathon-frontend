import {
  Button,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

function ResultModal({
  isOpen,
  onClose,
  characters,
  initialCharacters,
  onContinue,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent style={{ minWidth: 1000, padding: 20 }}>
        <ModalBody>
          <VStack>
            <Text textAlign="center" fontWeight="bold">
              --- Game Ended ---
            </Text>
            <Text textAlign="center" fontWeight="bold">
              --- Win! ---
            </Text>
            <Text textAlign="center" fontWeight="bold">
              --- Summary of Battle ---
            </Text>
            <HStack gap={10} justifyContent="center" alignItems="flex-end" marginTop={30}>
              {characters.map((character, i) => {
                const initialState = initialCharacters[i];
                const currentState = character;
                const levelChange = currentState.level - initialState.level;
                const healthChange = initialState.health - currentState.health;
                const attackChange = currentState.damage - initialState.damage;
                const expChange = currentState.exp - initialState.exp;

                return (
                  <VStack alignItems="flex-start">
                    <Image src={character.imageFront} />
                    <Text>
                      Lvl: {initialState.level}{" "}
                      {levelChange > 0 && (
                        <>
                          <Text color="green.500" display="inline">
                            + {levelChange}
                          </Text>
                          <Text display="inline"> -> {currentState.level}</Text>
                        </>
                      )}
                    </Text>
                    <Text>
                      HP: {initialState.health}{" "}
                      {healthChange > 0 && (
                        <>
                          <Text color="red.500" display="inline">
                            - {healthChange}
                          </Text>
                          <Text display="inline">
                            {" "}
                            -> {currentState.health}
                          </Text>
                        </>
                      )}
                    </Text>
                    <Text>
                      Atk: {initialState.damage}{" "}
                      {attackChange > 0 && (
                        <>
                          <Text color="green.500" display="inline">
                            + {attackChange.toFixed(2)}
                          </Text>
                          <Text display="inline">
                            {" "}
                            -> {currentState.damage}
                          </Text>
                        </>
                      )}
                    </Text>
                    <Text>
                      Exp: {initialState.exp}{" "}
                      {expChange > 0 && (
                        <>
                          <Text color="green.500" display="inline">
                            + {expChange}
                          </Text>
                          <Text display="inline"> -> {currentState.exp}</Text>
                        </>
                      )}
                      {expChange < 0 && (
                        <>
                          <Text color="red.500" display="inline">
                            {expChange}
                          </Text>
                          <Text display="inline"> -> {currentState.exp}</Text>
                        </>
                      )}
                    </Text>
                  </VStack>
                );
              })}
            </HStack>
            <Button onClick={onContinue} alignSelf="center" marginTop={30} colorScheme="whatsapp">
              Update Assets
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ResultModal;
