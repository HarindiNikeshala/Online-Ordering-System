import { Container, Flex, HStack, Text, Button, useColorMode } from "@chakra-ui/react"
import { CiSquarePlus } from "react-icons/ci";
import { Link } from "react-router-dom";
import { IoIosMoon, IoIosSunny } from "react-icons/io";

const Navbar = () => {

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row"
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          bgGradient='linear(to-l, #7928CA, #FF0080)'
          bgClip='text'
          textTransform={"uppercase"}
          textAlign={"center"}
          fontWeight='extrabold'
        >
          <Link to={"/"}>Product Store</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <CiSquarePlus fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoIosMoon size="20" /> : <IoIosSunny size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;