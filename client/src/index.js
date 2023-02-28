import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { ChakraProvider } from "@chakra-ui/react"
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    steam: {
      100: "#171a21",
      200: "#1b2838",
      300: "#2a475e",
      400: "#3B9EEF",
      500: "#c7d5e0",
      600: "#75B423",
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ChakraProvider>
)
