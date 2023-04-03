import {
	Box,
	Button,
	FormControl,
	Heading,
	HStack,
	Stack,
	Text,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Flex,
	Card,
	CardHeader,
	CardBody,
	StackDivider,
	useToast,
	Container,
} from "@chakra-ui/react";
import TextField from "../components/TextField";
import PasswordTextField from "../components/PasswordTextField";
import {useEffect, useState} from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import {useSelector, useDispatch} from "react-redux";
import {updateProfile, resetUpdateSuccess} from "../redux/actions/userActions";
import {useLocation} from "react-router";
import {Navigate} from "react-router-dom";
import {userSelector} from "../redux/slices/user";

const ProfileScreen = () => {
	const dispatch = useDispatch();
	const user = useSelector(userSelector);
	const {userInfo, loading, error, updateSuccess} = user;
	const location = useLocation();
	const toast = useToast();

	useEffect(() => {
		if (updateSuccess) {
			toast({
				description: "Profile saved.",
				status: "success",
				isClosable: "true",
			});
			dispatch(resetUpdateSuccess());
		}
	}, [toast, updateSuccess, dispatch]);

	return userInfo ? (
		<Formik
			initialValues={{
				name: userInfo.name,
				email: userInfo.email,
				password: "",
				confirmPassword: "",
			}}
			validationSchema={Yup.object({
				name: Yup.string().required("Your name is required."),
				email: Yup.string()
					.email("Invalid Email Address.")
					.required("Your email address is required."),
				password: Yup.string()
					.min(1, "Password is too short. Must contain atleast 1 character")
					.required("Password is required"),
				confirmPassword: Yup.string()
					.min(1, "Password is too short. Must contain atleast 1 character")
					.required("Password is required")
					.oneOf([Yup.ref("password"), null], "Passwords do not match."),
			})}
			onSubmit={(values) => {
				dispatch(
					updateProfile(
						userInfo._id,
						values.name,
						values.email,
						values.password
					)
				);
			}}>
			{(formik) => (
				<Box
					minH="100vh"
					maxW={{base: "3xl", lg: "7xl"}}
					mx="auto"
					px={{base: "4", md: "8", lg: "12"}}
					py={{base: "6", md: "8", lg: "12"}}>
					<Stack
						direction={{base: "column", lg: "row"}}
						align={{lg: "flex-start"}} spacing="10">
						<Stack
							flex="1.5"
							mb={{base: "2xl", md: "none"}}>
							<Heading fontSize="2xl" fontWeight="extrabold">
								Profile
							</Heading>
							<Stack spacing="6">
								<Stack spacing="6" as="form" onSubmit={formik.handleSubmit}>
									{error && (
										<Alert
											status="error"
											flexDir="column"
											alignItems="center"
											justifyContent="center"
											textAlign="center">
											<AlertIcon />
											<AlertTitle>We are sorry!</AlertTitle>
											<AlertDescription>{error}</AlertDescription>
										</Alert>
									)}

									<Stack spacing="5">
										<FormControl>
											<TextField
												type="text"
												name="name"
												placeholder="Your first and last name"
												label="Full name"
											/>
											<TextField
												type="text"
												name="email"
												placeholder="Your Email Address"
												label="Email Adress"
											/>
											<PasswordTextField
												type="password"
												name="password"
												placeholder="Your Password"
												label="Password"
											/>
											<PasswordTextField
												type="password"
												name="confirmPassword"
												placeholder="Confirm Password"
												label="Confirm Password"
											/>
										</FormControl>
									</Stack>
									<Stack spacing="6">
										<Button
											colorScheme="orange"
											size="lg"
											fontSize="md"
											isLoading={loading}
											type="submit">
											Save
										</Button>
									</Stack>
								</Stack>
							</Stack>
						</Stack>
						<Flex
							direction="column"
							align="center"
							flex="1"
							_dark={{bg: "gray.900"}}>
							<Card>
								<CardHeader>
									<Heading size="md">User Report</Heading>
								</CardHeader>
								<CardBody>
									<Stack divider={<StackDivider />} spacing="4">
										<Box pt="2" fontSize="sm">
											Registered on{" "}
											{new Date(userInfo.createdAt).toDateString()}
										</Box>
									</Stack>
								</CardBody>
							</Card>
						</Flex>
					</Stack>
				</Box>
			)}
		</Formik>
	) : (
		<Navigate to="/login" replace={true} state={{from: location}} />
	);
};

export default ProfileScreen;
