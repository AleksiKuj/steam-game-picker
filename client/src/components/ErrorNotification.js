import {
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
} from "@chakra-ui/react"
const ErrorNotification = ({ errorText, errorDescription }) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>{errorText}</AlertTitle>
      <AlertDescription>{errorDescription}</AlertDescription>
    </Alert>
  )
}

export default ErrorNotification
