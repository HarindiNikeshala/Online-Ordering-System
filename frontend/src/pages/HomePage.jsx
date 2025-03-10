import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/product";
import { useEffect } from "react";
import { Link } from "react-router-dom"

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts]);

  return (
    <div>
      <Container maxW="container.xl" py={12}>
        <VStack spacing={8}>
          <Text
            fontSize={"30"}
            fontWeight="bold"
            bgGradient={"linear(to-r, purple.400,pink.400)"}
            bgClip="text"
            textAlign="center"
          >
            Current Products
          </Text>

          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3
            }}
            spacing={10}
            w={"full"}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>

          {products.length === 0 && (
            <Text fontSize='xl' textAlign="center" fontWeight={"bold"} color={"gray.500"}>
              No product Found{" "}
              <Link to={"/create"}>
                <Text as="span" color={"pink.500"} _hover={{ textDecoration: "underline" }}>
                  Create a new product
                </Text>
              </Link>
            </Text>
          )}
        </VStack>
      </Container>
    </div>
  )
}

export default HomePage