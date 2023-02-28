import { Box, Link, Text } from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"

const Footer = () => {
  return (
    <Box bg="steam.100" py="5" color="white" align="center">
      <Link href="https://github.com/AleksiKuj" target={"_blank"}>
        Github <ExternalLinkIcon mx="2px" />
      </Link>
      <Text color="steam.500" fontSize="xs">
        SteamGamePicker is a hobby project and is not affiliated with Valve or
        Steam. Steam and the Steam logo are trademarks of Valve Corporation. All
        other trademarks are property of their respective owners. No data is
        collected or saved from the users.
      </Text>
    </Box>
  )
}
export default Footer
