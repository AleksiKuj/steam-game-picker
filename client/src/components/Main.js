import { useState, useEffect } from "react"
import axios from "axios"
import GameCard from "./GameCard"

import {
  Input,
  Button,
  Box,
  Center,
  InputRightAddon,
  InputGroup,
  FormControl,
  FormLabel,
  IconButton,
  FormHelperText,
  Text,
  Radio,
  RadioGroup,
  Stack,
  useBoolean,
} from "@chakra-ui/react"

import { SearchIcon } from "@chakra-ui/icons"

const Main = ({ setError, setErrorDescription }) => {
  const [steamID, setSteamID] = useState("")
  const [vanityUrl, setVanityUrl] = useState("")
  const [games, setGames] = useState("")

  const [steamID2, setSteamID2] = useState("")
  const [games2, setGames2] = useState("")

  const [twoPlayers, setTwoPlayers] = useBoolean()
  const [commonGames, setCommonGames] = useState("")
  const [game, setGame] = useState("")
  const [game2, setGame2] = useState("")

  const fetchId = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(
        `http://localhost:3001/api/get-steamid?vanityurl=${vanityUrl}`
      )
      if (response.data.response.steamid !== undefined) {
        setSteamID(response.data.response.steamid)
      }
      setError(null)
      if (response.data.response.message === "No match") {
        setError(response.data.response.message + "!")
        setErrorDescription("Make sure your custom ID is valid.")
        setTimeout(() => {
          setError(null)
        }, 6000)
      }
    } catch (error) {
      console.log(error)
      setError(error.response.data)
      if (error.response.data.length > 50) {
        setError("Invalid ID")
        setTimeout(() => {
          setError(null)
        }, 6000)
      }
    }
  }
  const fetchGames = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(
        `http://localhost:3001/api/get-games?steamid=${steamID}`
      )
      setGames(response.data.response.games)

      if (steamID2 && twoPlayers === true) {
        const response2 = await axios.get(
          `http://localhost:3001/api/get-games?steamid=${steamID2}`
        )
        console.log("set games2")
        setGames2(response2.data.response.games)
      } else {
        console.log("set games 2 to null")
        setGames2(null)
      }

      setError(null)
    } catch (error) {
      console.log(error)
      setError(error.response.data + "!")
      setErrorDescription(
        "Make sure Steam ID is valid and your profile is not private."
      )
      setTimeout(() => {
        setError(null)
      }, 6000)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (twoPlayers && games && games2) {
        setCommonGames(
          games.filter((game) => {
            const item2 = games2.find((game2) => game2.appid === game.appid)
            return item2 !== undefined
          })
        )
        console.log(commonGames)
        if (commonGames.length > 0) {
          const randomGame =
            commonGames[Math.floor(Math.random() * commonGames.length)]
          setGame(randomGame)
          setGame2(games2.filter((game) => game.appid === randomGame.appid))
          return
        } else {
          setError("No common games or a profile is not public.")
          console.log("No common games")
        }
      } else {
        setGame(games[Math.floor(Math.random() * games.length)])
        setGame2(null)
      }
    }, 100)
  }, [games])

  return (
    <>
      <Box py={5}>
        <Text color="red.300">
          Note: Steam Web API has had some downtime lately so there may be
          issues.
        </Text>
        <form onSubmit={fetchId}>
          <FormControl>
            <FormLabel color="white">
              If you have a custom steamID enter it to get your SteamID64
            </FormLabel>
            <InputGroup>
              <Input
                type="text"
                placeholder="Custom SteamID"
                _placeholder={{ opacity: 1, color: "steam.500" }}
                onChange={(e) => setVanityUrl(e.target.value)}
                color="white"
              />

              <InputRightAddon
                type="submit"
                bg="steam.400"
                _hover={{ cursor: "pointer" }}
                onClick={(e) => fetchId(e)}
                children={
                  <IconButton
                    borderRadius="0"
                    borderTopWidth="1px"
                    borderBottomWidth="1px"
                    bg="steam.400"
                    _hover={{ background: "steam.400" }}
                    width="100%"
                    color=""
                    icon={<SearchIcon />}
                  />
                }
              />
            </InputGroup>
          </FormControl>
        </form>
      </Box>
      <div>
        <Text color="white">
          Experimental feature: Choose 2 players and get a random game you both
          own.{" "}
        </Text>
        <Center>
          <RadioGroup
            onChange={setTwoPlayers.toggle}
            value={twoPlayers}
            color="white"
          >
            <Stack direction="row">
              <Radio value={false}>1 profile</Radio>
              <Radio value={true}>2 profiles</Radio>
            </Stack>
          </RadioGroup>
        </Center>

        <form onSubmit={fetchGames}>
          <FormControl>
            <FormLabel color="white">Enter SteamID64</FormLabel>
            <FormLabel color="steam.500" fontSize={"xs"}>
              Profile ID
            </FormLabel>
            <InputGroup>
              <Input
                type="text"
                placeholder="SteamID64"
                _placeholder={{ opacity: 1, color: "steam.500" }}
                onChange={(e) => setSteamID(e.target.value)}
                value={steamID}
                color="white"
              />
            </InputGroup>
            {twoPlayers === true ? (
              <>
                <FormLabel color="steam.500" fontSize={"xs"} pt="2">
                  Profile 2 ID
                </FormLabel>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="SteamID64"
                    _placeholder={{ opacity: 1, color: "steam.500" }}
                    onChange={(e) => setSteamID2(e.target.value)}
                    value={steamID2}
                    color="white"
                  />
                </InputGroup>
                <FormHelperText color="steam.500">
                  Make sure your profile is public
                </FormHelperText>
              </>
            ) : null}
          </FormControl>

          <Button type="submit" bg="steam.400" mt="5" color="white">
            Pick random game
          </Button>
        </form>
        <Text color={"white"}>
          {commonGames && games2 ? `${commonGames.length} common games` : null}
        </Text>
      </div>
      <Center py={5}>
        {game ? <GameCard game={game} game2={game2} /> : ""}
      </Center>
    </>
  )
}

export default Main
