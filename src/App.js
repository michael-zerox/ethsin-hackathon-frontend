import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Image,
  List,
  ListItem,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Character from "./Character";
import CharacterView from "./CharacterView";

import ResultModal from "./ResultModal";
import backgroundImage from "./assets/background.png";
import charizardBack from "./assets/charizard-back.gif";
import charizardFront from "./assets/charizard-front.gif";
import gengarBack from "./assets/gengar-back.gif";
import gengarFront from "./assets/gengar-front.gif";
import giratinaFront from "./assets/giratina-origin.gif";
import mewBack from "./assets/mew-back.gif";
import mewFront from "./assets/mew-front.gif";
import pikachuBack from "./assets/pikachu-back.gif";
import pikachuFront from "./assets/pikachu-front.gif";
import AssetsModal from "./AssetsModal";
import { motion, useAnimation } from "framer-motion";

const characters = [
  new Character({
    name: "Charizard",
    imageFront: charizardFront,
    imageBack: charizardBack,
    size: 200,
    tokenId: 1,
    level: 69,
    health: 303,
    damage: 132,
    exp: 94,
    chainLink:
      "https://bafybeicobthud6jjolqcfi6yic3rotqhc7u4svupehnug7o7xaklu7qm3u.ipfs.nftstorage.link/1_updated.json",
  }),
  new Character({
    name: "Pikachu",
    imageFront: pikachuFront,
    imageBack: pikachuBack,
    size: 100,
    tokenId: 2,
    level: 52,
    health: 210,
    damage: 70,
    exp: 30,
    chainLink:
      "https://bafybeicobthud6jjolqcfi6yic3rotqhc7u4svupehnug7o7xaklu7qm3u.ipfs.nftstorage.link/2_updated.json",
  }),
  new Character({
    name: "Mew",
    imageFront: mewFront,
    imageBack: mewBack,
    size: 100,
    tokenId: 3,
    level: 49,
    health: 260,
    damage: 110,
    exp: 96,
    chainLink:
      "https://bafybeicobthud6jjolqcfi6yic3rotqhc7u4svupehnug7o7xaklu7qm3u.ipfs.nftstorage.link/3_updated.json",
  }),
  new Character({
    name: "Gengar",
    imageFront: gengarFront,
    imageBack: gengarBack,
    size: 200,
    tokenId: 4,
    level: 78,
    health: 291,
    damage: 121,
    exp: 22,
    chainLink:
      "https://bafybeicobthud6jjolqcfi6yic3rotqhc7u4svupehnug7o7xaklu7qm3u.ipfs.nftstorage.link/4_updated.json",
  }),
];

const boss = new Character({
  name: "Giratina",
  imageFront: giratinaFront,
  size: 500,
  tokenId: 5,
  level: 100,
  health: 500,
  damage: 80,
});

const initialCharacters = JSON.parse(JSON.stringify(characters)); // deep copy
const initialBoss = Object.assign(
  Object.create(Object.getPrototypeOf(boss)),
  boss
);

// follow predefined actions
const actions = [
  {
    attacker: characters[0], // Charizard
    target: boss,
  },
  {
    attacker: boss,
    target: characters,
  },
  {
    attacker: characters[1], // Pikachu
    target: boss,
  },
  {
    attacker: boss, // Giratina
    target: characters[0], // Charizard
  },
  {
    attacker: characters[2], // Mew
    target: boss,
  },
  {
    attacker: boss,
    target: characters[1],
  },
  {
    attacker: characters[3],
    target: boss,
  },
];

const App = () => {
  const {
    isOpen: isGameOver,
    onClose: closeResultModal,
    onOpen: gameOver,
  } = useDisclosure();
  const {
    isOpen: isAssetsModalOpen,
    onClose: closeAssetsModal,
    onOpen: openAssetsModal,
  } = useDisclosure();
  const [actionLog, setActionLog] = useState([]);
  const [currentActionIndex, setCurrentActionIndex] = useState(0);
  const [attacker, setAttacker] = useState(0);
  const actionLogRef = useRef(null);

  const logAction = (logs) => {
    setActionLog((prevLogs) => {
      return [
        ...prevLogs.slice().map((l) => ({ ...l, isNew: false })),
        ...logs,
      ];
    });
  };

  const levelUpCharacters = () => {
    // Iterate through all characters and award experience based on their level
    characters.forEach((character) => {
      const experienceGain = Math.floor(1000 / character.level);
      character.exp += experienceGain;

      // Check if the character leveled up
      if (character.exp >= 100) {
        character.level++;
        character.damage += character.damage * 0.08; // Increase damage on level up (adjust as needed)
        character.exp = character.exp + experienceGain - 100;
      }
    });
  };

  const nextRound = () => {
    const action = actions[currentActionIndex];
    const { attacker, target } = action;
    // Perform the attack
    attacker.attack(target, logAction);
    setAttacker(attacker);

    // Check if the boss is defeated
    if (target === boss && boss.health <= 0) {
      gameOver();
      // Handle game over logic when the boss is defeated (level up, display modal, etc.).
      levelUpCharacters();
    } else {
      if (currentActionIndex === actions.length - 1) {
        setCurrentActionIndex(0);
      } else {
        setCurrentActionIndex(currentActionIndex + 1);
      }
    }

    actionLogRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const controls = useAnimation();

  const playAnimation = useCallback(() => {
    controls.start({
      x: [0, -700, 0],
      y: [0, 50, 0],
      transition: { duration: 0.6 },
    });
  }, [controls]);

  useEffect(() => {
    if (attacker.name === boss.name) {
      playAnimation();
    }
  }, [attacker, playAnimation]);

  return (
    <Box
      backgroundImage={backgroundImage}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      height="100vh"
    >
      <Button onClick={nextRound} marginTop={30} marginLeft={50}>
        Next
      </Button>
      <List
        spacing={3}
        style={{
          height: 300,
          maxHeight: 300,
          borderRadius: 30,
          overflow: "auto",
          width: 500,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: 30,
          margin: 50,
        }}
      >
        {actionLog.map((log, index) => (
          <ListItem key={index} color="white" opacity={!log.isNew && 0.5}>
            <Text fontWeight="bold">
              {log.attacker.name} dealt{" "}
              <Text display="inline" color="red.500">
                {log.attacker.damage} damage
              </Text>{" "}
              to {log.target.name}
            </Text>
          </ListItem>
        ))}
        <div style={{ float: "left", clear: "both" }} ref={actionLogRef} />
      </List>
      {/* pokemons */}
      <HStack marginTop={50} position="relative">
        {characters.map((character, index) => (
          <CharacterView
            key={character.name}
            {...character}
            index={index}
            initialHealth={initialCharacters[index].health}
            isAttacking={attacker.name === character.name}
          />
        ))}
      </HStack>
      {/* boss */}
      <VStack style={{ position: "absolute", top: 50, right: 100 }}>
        <Card className="character">
          <CardBody>
            <Text>{boss.name}</Text>
            <Text>Lvl: {boss.level}</Text>
            <Text>
              Health:{" "}
              <Text
                display="inline"
                color={
                  boss.health < initialBoss.health * 0.5
                    ? "red.500"
                    : "green.500"
                }
              >
                {boss.health}
              </Text>
              / {initialBoss.health}
            </Text>
          </CardBody>
        </Card>
        <Image
          src={boss.imageFront}
          width={boss.size}
          as={motion.img}
          animate={controls}
          transition="0.1s linear"
        />
      </VStack>
      <ResultModal
        isOpen={isGameOver}
        onClose={closeResultModal}
        characters={characters}
        initialCharacters={initialCharacters}
        onContinue={() => {
          closeResultModal();
          openAssetsModal();
        }}
      />
      <AssetsModal
        isOpen={isAssetsModalOpen}
        onClose={closeAssetsModal}
        characters={characters}
      />
    </Box>
  );
};

export default App;
