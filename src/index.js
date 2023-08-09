import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./sidebar_context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<CartProvider>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</CartProvider>
);
