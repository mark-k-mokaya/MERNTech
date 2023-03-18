import {
	Box,
	Button,
	Container,
	FormControl,
	Heading,
	HStack,
	Stack,
	Text,
	useBreakpointValue,
	useColorModeValue as mode,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Alert,
	useToast,
} from "@chakra-ui/react";
import {Formik} from "formik";
import * as Yup from "yup";
import TextField from "../components/TextField";
import PasswordTextField from "../components/PasswordTextField";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, Link as ReactLink} from "react-router-dom";
import {userSelector} from "../redux/slices/user";
import {register} from "../redux/actions/userActions";

const RegistrationScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(userSelector);
	const {loading, error, userInfo} = user;
	const redirect = "/products";
	const toast = useToast();

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
			toast({
				description: "Account created. Welcome aboard.",
				status: "success",
				isClosable: true,
			});
		}
	}, [userInfo, redirect, error, navigate, toast]);

	const headingBR = useBreakpointValue({base: "xs", md: "sm"});
	const boxBR = useBreakpointValue({base: "transparent", md: "bg-surface"});

	return (
		<Formik
			initialValues={{name: "", email: "", password: ""}}
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
			onSubmit={(values) =>
				dispatch(register(values.name, values.email, values.password))
			}>
			{(formik) => (
				<Container
					maxW="lg"
					py={{base: "12", md: "24"}}
					px={{base: "12", md: "24"}}
					minH="4xl">
					<Stack spacing="8">
						<Stack spacing="6">
							<Stack spacing={{base: "2", md: "3"}} textAlign="center">
								<Heading size={headingBR}>Create an account.</Heading>
								<HStack spacing="1" justify="center">
									<Text color="muted">Already a user? </Text>
									<Button
										as={ReactLink}
										to="/signup"
										variant="link"
										colorScheme="orange">
										Sign up
									</Button>
								</HStack>
							</Stack>
						</Stack>
						<Box
							py={{base: "0", sm: "8"}}
							px={{base: "4", sm: "10"}}
							bg={{boxBR}}
							boxShadow={{base: "none", md: "xl"}}>
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
								<Stack>
									<Button
										colorScheme="orange"
										size="lg"
										fontSize="md"
										isLoading={loading}
										type="submit">
										Sign up
									</Button>
								</Stack>
							</Stack>
						</Box>
					</Stack>
				</Container>
			)}
		</Formik>
	);
};

export default RegistrationScreen;
