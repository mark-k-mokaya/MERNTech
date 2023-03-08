import {Center, Wrap, WrapItem} from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";

import {products} from "../products.js";

const ProductsScreen = () => {
  return (
    <Wrap spacing="30px" justify="center" minHeight="100vh">
      {products.map((product) => (
        <WrapItem>
              <Center w="250px" h="550px">{<ProductCard product={product}/>}</Center>
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default ProductsScreen;
