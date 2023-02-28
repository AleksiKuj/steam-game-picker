import { useState } from "react"
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
} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
const Main = ({ setError, setErrorDescription }) => {
  const [steamID, setSteamID] = useState("")
  const [vanityUrl, setVanityUrl] = useState("")
  const [games, setGames] = useState("")
  const [game, setGame] = useState("")

  const fetchId = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(
        `/api/get-steamid?vanityurl=${vanityUrl}`
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
      const response = await axios.get(`/api/get-games?steamid=${steamID}`)

      setGames(response.data.response.games)
      setGame(
        response.data.response.games[
          Math.floor(Math.random() * response.data.response.games.length)
        ]
      )
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
  return (
    <>
      <Box py={5}>
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
        <form onSubmit={fetchGames}>
          <FormControl>
            <FormLabel color="white">Enter SteamID64</FormLabel>
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
            <FormHelperText color="steam.500">
              Make sure your profile is public
            </FormHelperText>
          </FormControl>

          <Button type="submit" bg="steam.400" mt="5" color="white">
            Pick random game
          </Button>
        </form>
      </div>
      <Center py={5}>{game ? <GameCard game={game} /> : ""}</Center>
    </>
  )
}

export default Main
