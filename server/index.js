require("dotenv").config()
const express = require("express")
const https = require("https")
const app = express()
const cors = require("cors")
const path = require("path")
const API_KEY = process.env.STEAM_API_KEY

app.use(cors())
app.use(express.static(path.join(__dirname, "build")))

app.get("/api/get-steamid", (req, res) => {
  const vanityUrl = req.query.vanityurl

  if (!vanityUrl) {
    return res.status(400).send("Missing steamID parameter")
  }

  const options = {
    hostname: "api.steampowered.com",
    path: `/ISteamUser/ResolveVanityURL/v0001/?key=${API_KEY}&vanityurl=${vanityUrl}`,
    method: "GET",
  }

  const apiReq = https.request(options, (apiRes) => {
    const chunks = []

    apiRes.on("data", (chunk) => {
      chunks.push(chunk)
    })

    apiRes.on("end", () => {
      const body = Buffer.concat(chunks)
      console.log(JSON.parse(body))
      let jsonResponse
      try {
        jsonResponse = JSON.parse(body)
      } catch (error) {
        console.error(error)
        return res.status(500).send("Invalid API response")
      }

      res.json(jsonResponse)
    })
  })

  apiReq.on("error", (error) => {
    console.error(error)
    res.status(500).send("Internal Server Error")
  })

  apiReq.end()
})

app.get("/api/get-games", (req, res) => {
  const steamID = req.query.steamid

  if (!steamID) {
    return res.status(400).send("Missing steamID parameter")
  }

  const options = {
    hostname: "api.steampowered.com",
    path: `/IPlayerService/GetOwnedGames/v0001/?key=${API_KEY}&steamid=${steamID}&include_appinfo=true&include_played_free_games=true&format=json`,
    method: "GET",
  }

  const apiReq = https.request(options, (apiRes) => {
    const chunks = []

    apiRes.on("data", (chunk) => {
      chunks.push(chunk)
    })

    apiRes.on("end", () => {
      const body = Buffer.concat(chunks)

      // Check if the response is valid JSON
      let jsonResponse
      try {
        jsonResponse = JSON.parse(body)
      } catch (error) {
        console.error(error)
        return res.status(500).send("Invalid API response")
      }

      res.json(jsonResponse)
    })
  })

  apiReq.on("error", (error) => {
    console.error(error)
    res.status(500).send("Internal Server Error")
  })

  apiReq.end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
