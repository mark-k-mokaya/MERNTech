import {
	TableContainer,
	Stack,
	Spinner,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Table,
	Th,
	Tbody,
	Thead,
	Tr,
	Td,
	Button,
	ListItem,
	UnorderedList,
	Wrap,
} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {getUserOrders} from "../redux/actions/userActions";
import {useEffect} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {userSelector} from "../redux/slices/user";

const UserOrdersScreen = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const user = useSelector(userSelector);
	const {loading, error, orders, userInfo} = user;

	useEffect(() => {
		if (userInfo) {
			dispatch(getUserOrders());
		}
	}, []);

	return userInfo ? (
		<>
			{loading ? (
				<Wrap
					justify="center"
					dir="column"
					align="center"
					mt="20px"
					minH="100vh">
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
				</Wrap>
			) : error ? (
				<Alert status="error">
					<AlertIcon />
					<AlertTitle>Oops!</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			) : (
				orders && (
					<TableContainer minH="100vh">
						<Table variant="striped">
							<Thead>
								<Tr>
									<Th>Order Id</Th>
									<Th>Order Date</Th>
									<Th>Paid Total (incl. Shipping)</Th>
									<Th>Items</Th>
									<Th>Print Receipt</Th>
								</Tr>
							</Thead>
							<Tbody>
								{orders.map((order) => (
									<Tr key={order._id}>
										<Td>{order._id}</Td>
										<Td>{new Date(order.createdAt).toDateString()}</Td>
										<Td>
											${order.totalPrice} via {order.paymentMethod}
										</Td>
										<Td>
											<UnorderedList>
												{order.orderItems.map((item) => (
													<ListItem key={item._id}>
														{item.qty} x {item.name} {`($${item.price} each)`}
													</ListItem>
												))}
											</UnorderedList>
										</Td>
										<Td>
											<Button variant="outline">Receipt</Button>
										</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					</TableContainer>
				)
			)}
		</>
	) : (
		<Navigate to="/login" replace={true} state={{from: location}} />
	);
};

export default UserOrdersScreen;
