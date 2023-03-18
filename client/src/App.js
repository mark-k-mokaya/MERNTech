import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import LandingScreen from "./screens/LandingScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";

function App() {
	return (
		<ChakraProvider>
			<Router>
				<Navbar />
				<main>
					<Routes>
						<Route path="/" element={<LandingScreen />} />
						<Route path="/products" element={<ProductsScreen />} />
						<Route path="/products/:id" element={<ProductScreen />} />
						<Route path="/cart" element={<CartScreen />} />
						<Route path="/login" element={<LoginScreen />} />
						<Route path="/signup" element={<RegistrationScreen />} />
					</Routes>
				</main>
				<Footer />
			</Router>
		</ChakraProvider>
	);
}

export default App;
