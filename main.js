// Import Node.js modules.
require("dotenv").config()
const express = require("express")
const handlebars  = require("express-handlebars")
const { graphql } = require("@octokit/graphql")

// Initialise Express.
const app = express()

// Configure GraphQL authorization.
const graphqlAuth = graphql.defaults({
  headers: { authorization: "token " + process.env.GITHUB_PERSONAL_ACCESS_TOKEN },
})

// Render static files.
app.use(express.static("static"))

// Set the view engine to Handlebars, import the helpers and change the filename extension.
app.engine("hbs", handlebars.engine({ helpers: require("./helpers"), extname: ".hbs" }))
app.set("view engine", "hbs")

// Parse incoming requests.
app.use(express.urlencoded({ extended: true }))

// Set and log the port for Express.
const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`Express running at http://localhost:${port}.`) })

// Variable in which the selected filter is stored.
let filter = "all"

// Listen to all GET requests on /.
app.get("/", (_req, res) => {
  // Get all public lisannevvliet repositories.
  graphqlAuth(`{
    user(login: "lisannevvliet") {
      name
      bio
      url
      repositories(first: 100, privacy: PUBLIC) {
        nodes {
          name
          description
          url
          homepageUrl
          primaryLanguage {
            name
          }
        }
      }
    }
  }`).then((data) => {
    let repositories = []

    if (filter == "mobile-development") {
      data.user.repositories.nodes.forEach((repository) => {
        // Filter Mobile Development repositories and delete repositories without demo.
        if (repository.name.includes("MadLevel") || repository.name.includes("iOS-Workshop") && repository.homepageUrl != null) {
          if (repository.homepageUrl.length > 0) {
            repositories.push(repository)
          }
        }
      })
    } else if (filter == "web-design-and-development") {
      data.user.repositories.nodes.forEach((repository) => {
        // Filter Web Design & Development repositories and delete Portfolio repository and repositories without demo.
        if (!(repository.name.includes("MadLevel")) && !(repository.name.includes("iOS-Workshop")) && !(repository.name.includes("Portfolio")) && repository.homepageUrl != null) {
          if (repository.homepageUrl.length > 0) {
            repositories.push(repository)
          }
        }
      })
    } else {
      // Delete Portfolio repository and repositories without demo.
      data.user.repositories.nodes.forEach((repository) => {
        if (!(repository.name.includes("Portfolio")) && repository.homepageUrl != null) {
          if (repository.homepageUrl.length > 0) {
            repositories.push(repository)
          }
        }
      })
    }

    // Load the index page with the repositories.
    res.render("index", {
      user: data.user,
      repositories: repositories,
      filter: filter
    })
  })
})

// Listen to all POST requests on /.
app.post("/", (req, res) => {
  // Set the filter variable to the selected filter.
  filter = req.body.filter

  // Redirect to the index page.
  res.redirect("/")
})