import {
	Box,
	Image,
	Text,
	Wrap,
	Stack,
	Spinner,
	Alert,
	AlertIcon,
	AlertDescription,
	AlertTitle,
	Flex,
	Badge,
	Heading,
	HStack,
	Button,
	SimpleGrid,
	useToast,
	Tooltip,
	Input,
	Textarea,
} from "@chakra-ui/react";
import {MinusIcon, StarIcon, SmallAddIcon} from "@chakra-ui/icons";
import {BiPackage, BiCheckShield, BiSupport} from "react-icons/bi";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
	createProductReview,
	getProduct,
	resetProductError,
} from "../redux/actions/productActions";
import {addToCart} from "../redux/actions/cartActions";
import {useEffect, useState} from "react";
import {productsSelector} from "../redux/slices/products";
import {cartSelector} from "../redux/slices/cart";
import {userSelector} from "../redux/slices/user";

const ProductScreen = () => {
	// Track Review Details
	const [comment, setComment] = useState("");
	const [rating, setRating] = useState(1);
	const [title, setTitle] = useState("");
	const [reviewBoxOpen, setReviewBoxOpen] = useState(false);
	const [hasReviewed, setHasReviewed] = useState(false);

	// Track Product Details
	const [amount, setAmount] = useState(1);
	let {id} = useParams();
	const toast = useToast();

	// redux
	const dispatch = useDispatch();
	const products = useSelector(productsSelector);
	const {loading, error, product, reviewSend} = products;

	// Fetch Cart Details
	const cartInfo = useSelector(cartSelector);
	const {cart} = cartInfo;

	//Fetch User Details
	const user = useSelector(userSelector);
	const {userInfo} = user;

	useEffect(() => async ()=>{
		let res = await product.reviews.every((item) => item.user !== userInfo._id);
		console.log(res);
	},
		[]
	);

	useEffect(() => {
		dispatch(getProduct(id));
		if (reviewSend) {
			toast({
				description: "Product Review Saved.",
				status: "success",
				isClosable: true,
			});
			dispatch(resetProductError());
			setReviewBoxOpen(false);
		}
	}, [dispatch, id, cart, reviewSend, toast]);

	const changeAmount = (input) => {
		if (input === "plus") {
			setAmount(amount + 1);
		}

		if (input === "minus") {
			setAmount(amount - 1);
		}
	};

	const addItem = () => {
		dispatch(addToCart(product._id, amount));
		toast({
			description: "Item Added To Cart",
			status: "success",
			isClosable: true,
		});
	};

	const hasUserReviewed = () =>
		product.reviews.some((item) => item.user === userInfo._id);

	const onSubmit = () => {
		dispatch(
			createProductReview(product._id, userInfo._id, comment, rating, title)
		);
	};

	return (
		<Wrap spacing="30px" justify="center" minH="100vh">
			{loading ? (
				<Stack direction="row" spacing={4}>
					<Spinner
						mt={20}
						thickness="2px"
						speed="0.65s"
						emptyColor="gray.200"
						color="orange.500"
						size="xl"
					/>
				</Stack>
			) : error ? (
				<Alert status="error">
					<AlertIcon />
					<AlertTitle>We are sorry!</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			) : (
				product && (
					<Box
						maxW={{base: "3xl", lg: "5xl"}}
						mx="auto"
						px={{base: "4", md: "8", lg: "12"}}
						py={{base: "6", md: "8", lg: "12"}}>
						<Stack
							direction={{base: "column", lg: "row"}}
							align={{lg: "flex-start"}}>
							<Stack
								pr={{base: "0", md: "12"}}
								spacing={{base: "8", md: "4"}}
								flex="1.5"
								mb={{base: "12", md: "none"}}>
								{product.productIsNew && (
									<Badge
										rounded="full"
										w="40px"
										fontSize="0.8em"
										colorScheme="green">
										New
									</Badge>
								)}

								{product.stock <= 0 && (
									<Badge
										rounded="full"
										w="70px"
										fontSize="0.8em"
										colorScheme="red">
										Sold Out
									</Badge>
								)}

								<Heading fontSize="2xl" fontWeight="extrabold">
									{product.name}
								</Heading>
								<Stack spacing="5">
									<Box>
										<Text fontSize="xl">${product.price}</Text>
										<Flex>
											<HStack spacing="2px">
												<StarIcon color="orange.500" />
												<StarIcon
													color={
														product.rating >= 2 ? "orange.500" : "gray.200"
													}
												/>
												<StarIcon
													color={
														product.rating >= 3 ? "orange.500" : "gray.200"
													}
												/>
												<StarIcon
													color={
														product.rating >= 4 ? "orange.500" : "gray.200"
													}
												/>
												<StarIcon
													color={
														product.rating >= 5 ? "orange.500" : "gray.200"
													}
												/>
											</HStack>
											<Text fontSize="md" fontWeight="bold" ml="4px">
												{product.numberOfReviews} Reviews
											</Text>
										</Flex>
									</Box>
									<Text>{product.description}</Text>
									<Text fontWeight="bold">Quantity</Text>
									<Flex
										w="170px"
										p="5px"
										borderColor="gray.200"
										alignItems="center">
										<Button
											isDisabled={amount <= 0}
											onClick={() => changeAmount("minus")}>
											<MinusIcon />
										</Button>
										<Text mx="30px">{amount}</Text>
										<Button
											isDisabled={
												(amount >= product.stock) & (product.stock > 1)
											}
											onClick={() => changeAmount("plus")}>
											<SmallAddIcon w="20px" h="25px" />
										</Button>
									</Flex>
									<Button
										colorScheme="orange"
										isDisabled={product.stock <= 0}
										onClick={() => addItem()}>
										Add To Cart
									</Button>
									<Stack w="270px">
										<Flex alignItems="center">
											<BiPackage size="20px" />
											<Text fontWeight="medium" fontSize="small" ml="2">
												Free shipping for orders above $1000
											</Text>
										</Flex>
										<Flex alignItems="center">
											<BiCheckShield size="20px" />
											<Text fontWeight="medium" fontSize="small" ml="2">
												2 year extended warranty
											</Text>
										</Flex>
										<Flex alignItems="center">
											<BiSupport size="20px" />
											<Text fontWeight="medium" fontSize="small" ml="2">
												24/7 Customer Support
											</Text>
										</Flex>
									</Stack>
								</Stack>
							</Stack>
							<Flex
								direction="column"
								align="center"
								flex="1"
								_dark={{bg: "gray.900"}}>
								<Image mb="30px" src={product.image} alt={product.name} />
							</Flex>
						</Stack>
						{userInfo && (
							<>
								<Tooltip
									label={
										hasUserReviewed()
											? "You have already reviewed this product."
											: ""
									}
									fontSize="md">
									<Button
										isDisabled={hasUserReviewed()}
										my="20px"
										w="140px"
										colorScheme="orange"
										onClick={() => setReviewBoxOpen(!reviewBoxOpen)}>
										Write a review
									</Button>
								</Tooltip>
								{reviewBoxOpen && (
									<Stack mb="20px">
										<Wrap>
											<HStack spacing="2px">
												<Button variant="outline" onClick={() => setRating(1)}>
													<StarIcon color="orange.500" />
												</Button>
												<Button variant="outline" onClick={() => setRating(2)}>
													<StarIcon
														color={rating >= 2 ? "orange.500" : "gray.200"}
													/>
												</Button>
												<Button variant="outline" onClick={() => setRating(3)}>
													<StarIcon
														color={rating >= 3 ? "orange.500" : "gray.200"}
													/>
												</Button>
												<Button variant="outline" onClick={() => setRating(4)}>
													<StarIcon
														color={rating >= 4 ? "orange.500" : "gray.200"}
													/>
												</Button>
												<Button variant="outline" onClick={() => setRating(5)}>
													<StarIcon
														color={rating >= 5 ? "orange.500" : "gray.200"}
													/>
												</Button>
											</HStack>
										</Wrap>
										<Input
											onChange={(e) => setTitle(e.target.value)}
											placeholder="Title (optional)"
										/>
										<Textarea
											onChange={(e) => setComment(e.target.value)}
											placeholder={`The ${product.name} is... `}
										/>
										<Button
											w="140px"
											colorScheme="orange"
											onClick={() => onSubmit()}>
											Publish Review
										</Button>
									</Stack>
								)}
							</>
						)}
						<Stack>
							<Text fontSize="xl" fontWeight="bold">
								Reviews
							</Text>
							<SimpleGrid minChildWidth="300px" spacingX="40px" spacingY="20px">
								{product.reviews.map((review, index) => {
									return (
										<Box key={review._id}>
											<Flex spacing="2px" alignItems="center">
												<StarIcon color="orange.500" />
												<StarIcon
													color={review.rating >= 2 ? "orange.500" : "gray.200"}
												/>
												<StarIcon
													color={review.rating >= 3 ? "orange.500" : "gray.200"}
												/>
												<StarIcon
													color={review.rating >= 4 ? "orange.500" : "gray.200"}
												/>
												<StarIcon
													color={review.rating >= 5 ? "orange.500" : "gray.200"}
												/>
												<Text fontWeight="semibold" ml="4px">
													{review.title && review.title}
												</Text>
											</Flex>

											<Box py="12px">{review.comment}</Box>
											<Text fontSize="small" color="gray.400">
												{" "}
												by {review.name},{" "}
												{new Date(review.createdAt).toDateString()}
											</Text>
										</Box>
									);
								})}
							</SimpleGrid>
						</Stack>
					</Box>
				)
			)}
		</Wrap>
	);
};

export default ProductScreen;
