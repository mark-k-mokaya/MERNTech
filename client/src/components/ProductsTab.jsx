import {
	Box,
	Th,
	Tr,
	Table,
	Thead,
	Tbody,
	useDisclosure,
	Alert,
	Stack,
	Spinner,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Wrap,
	useToast,
	Text,
	Accordion,
	AccordionItem,
	AccordionIcon,
	AccordionButton,
	AccordionPanel,
} from "@chakra-ui/react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProducts, resetProductError} from "../redux/actions/productActions";
import {adminSelector} from "../redux/slices/admin";
import {productsSelector} from "../redux/slices/products";
import ProductTableItem from "./ProductTableItem";
import AddNewProduct from "./AddNewProduct";

const ProductsTab = () => {
	const dispatch = useDispatch();
	const toast = useToast();

	const admin = useSelector(adminSelector);
	const {error, loading} = admin;

	const productInfo = useSelector(productsSelector);
	const {products, productUpdate} = productInfo;

	useEffect(() => {
		dispatch(getProducts());
		dispatch(resetProductError());
		if (productUpdate) {
			toast({
				description: "Product has been updated.",
				status: "success",
				isClosable: true,
			});
		}
	}, [dispatch, toast, productUpdate]);

	return (
		<Box>
			{error && (
				<Alert status="error">
					<AlertIcon />
					<AlertTitle>Oops! </AlertTitle>
					<AlertDescription>{}</AlertDescription>
				</Alert>
			)}

			{loading ? (
				<Wrap justify="center">
					<Stack direction="row" spacing="4">
						<Spinner
							mt="20"
							thickness="2px"
							speed="0.65s"
							emptyColor="gray.200"
							color="orange.500"
							size="xl"
						/>
					</Stack>
				</Wrap>
			) : (
				<Box>
					<Accordion allowToggle>
						<AccordionItem>
							<h2>
								<AccordionButton>
									<Box flex="1" textAlign="right">
										<Box justifyContent="center">
											<Text mr="8px" fontWeight="bold">
												Add New Product <AccordionIcon />
											</Text>
										</Box>
									</Box>
								</AccordionButton>
							</h2>
							<AccordionPanel pb="4">
								<Table>
									<Tbody>
										<AddNewProduct />
									</Tbody>
								</Table>
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
					<Table variant="simple" size="lg">
						<Thead>
							<Tr>
								<Th>Image</Th>
								<Th>Description</Th>
								<Th>Brand & Name</Th>
								<Th>Category & Price</Th>
								<Th>Stock & New Badge</Th>
							</Tr>
						</Thead>
						<Tbody>
							{products.length > 0 &&
								products.map((product) => (
									<ProductTableItem key={product._id} product={product} />
								))}
						</Tbody>
					</Table>
				</Box>
			)}
		</Box>
	);
};

export default ProductsTab;
