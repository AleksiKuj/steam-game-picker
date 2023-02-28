import { useState } from "react"

import Footer from "./components/Footer"
import Header from "./components/Header"

import Main from "./components/Main"
import ErrorNotification from "./components/ErrorNotification"
import { Container, Flex } from "@chakra-ui/react"

function App() {
  const [error, setError] = useState("")
  const [errorDescription, setErrorDescription] = useState("")

  return (
    <Flex direction={"column"} minH="100vh" bg="steam.200">
      <Flex direction={"column"} grow="1">
        <Header />
        {error ? (
          <ErrorNotification
            errorText={error}
            errorDescription={errorDescription}
          />
        ) : null}
        <Container align="center">
          <Main setError={setError} setErrorDescription={setErrorDescription} />
        </Container>
      </Flex>
      <Footer />
    </Flex>
  )
}

export default App
