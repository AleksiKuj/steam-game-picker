import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Divider,
  ListItem,
  List,
  Link,
} from "@chakra-ui/react"
import { ExternalLinkIcon, CalendarIcon, TimeIcon } from "@chakra-ui/icons"
const GameCard = ({ game }) => {
  const lastPlayed = (timestamp) => {
    if (timestamp === 0) return "Never"
    const date = new Date(timestamp * 1000)

    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
    return date.toLocaleDateString("en-GB", options)
  }

  const timePlayed = (time) => {
    if (time <= 120) {
      return `${time} minutes`
    } else {
      return `${(time / 60).toFixed(1)} hours`
    }
  }
  return (
    <Card maxW="md" w={"md"} bg={"steam.300"} color="white">
      <CardBody>
        <Image
          src={`https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg`}
          alt={`${game.name}`}
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{game.name}</Heading>
          <List spacing={3}>
            <ListItem>
              <TimeIcon /> Playtime: {timePlayed(game.playtime_forever)}
            </ListItem>

            <ListItem>
              <CalendarIcon /> Last played: {lastPlayed(game.rtime_last_played)}
            </ListItem>
          </List>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter margin="auto">
        <Link
          href={`https://store.steampowered.com/app/${game.appid}`}
          target={"_blank"}
        >
          <Button bg="steam.600">
            Store page <ExternalLinkIcon mx="2px" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default GameCard
