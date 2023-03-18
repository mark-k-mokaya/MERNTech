import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from "@chakra-ui/react";
import {useState, useEffect} from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import {useselector, useDispatch, useSelector} from "react-redux";
import {useNavigate, Link as ReactLink, useLocation} from "react-router-dom";
import TextField from "../components/TextField";
import PasswordTextField from "../components/PasswordTextField";
import {userSelector} from "../redux/slices/user";
import {login} from "../redux/actions/userActions";

//TODO: Redefine password length
const LoginScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  location.state
  const dispatch = useDispatch();
  const redirect = "/products";
  const toast = useToast();

  const user = useSelector(userSelector);
  const {loading, error, userInfo} = user;

  const headingBR = useBreakpointValue({base: "xs", md: "sm"});
  const boxBR = useBreakpointValue({base: "transparent", md: "bg-surface"});

  useEffect(() => {
    if (userInfo) {
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate(redirect);
      }
      toast({description: "Login successful.", status: "success", isClosable: true});
    }
  }, [userInfo, redirect, error, navigate, location.state, toast]);

  return (
    <Formik
      initialValues={{email: "", password: ""}}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid Email Address.")
          .required("Email Address is required."),
        password: Yup.string()
          .min(1, "Password is too short. Must contain atleast 1 character")
          .required("Password is required"),
      })}
      onSubmit={(values) => dispatch(login(values.email, values.password))}>
      {(formik) => (
        <Container
          maxW="lg"
          py={{base: "12", md: "24"}}
          px={{base: "12", md: "24"}}
          minH="4xl">
          <Stack spacing="8">
            <Stack spacing="6">
              <Stack spacing={{base: "2", md: "3"}} textAlign="center">
                <Heading size={headingBR}>Log into your account</Heading>
                <HStack spacing="1" justify="center">
                  <Text color="muted">Don't Have an Account? </Text>
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
                  </FormControl>
                </Stack>
                <Stack>
                  <Button
                    colorScheme="orange"
                    size="lg"
                    fontSize="md"
                    isLoading={loading}
                    type="submit">
                    Sign in
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

export default LoginScreen;
