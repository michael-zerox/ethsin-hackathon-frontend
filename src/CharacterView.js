import { Card, CardBody, Text, VStack, Image } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import React, { useCallback, useEffect } from "react";

const CharacterView = ({
  name,
  health,
  initialHealth,
  imageBack,
  imageFront,
  level,
  size,
  index,
  isAttacking,
}) => {
  const controls = useAnimation();

  const playAnimation = useCallback(() => {
    controls.start({
      x: [0, 800 - index * 100, 0],
      y: [0, index * -80, 0],
      transition:{ duration: 0.6 },
    });
  }, [controls, index]);

  useEffect(() => {
    if (isAttacking) {
      playAnimation();
    }
  }, [isAttacking, playAnimation]);

  return (
    <VStack
      style={{ position: "absolute", left: index * 250, top: index * 80 }}
    >
      <Card className="character" borderWidth={3}>
        <CardBody>
          <Text fontWeight="bold">{name}</Text>
          <Text>Lvl: {level}</Text>
          <Text>
            Health:{" "}
            <Text
              display="inline"
              color={health < initialHealth * 0.5 ? "red.500" : "green.500"}
            >
              {health}
            </Text>
            / {initialHealth}
          </Text>
        </CardBody>
      </Card>
      <Image
        src={imageBack ?? imageFront}
        width={size}
        as={motion.img}
        animate={controls}
      />
    </VStack>
  );
};

export default CharacterView;
