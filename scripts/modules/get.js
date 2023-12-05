import { $ } from "./$.js"
import { insert } from "./insert.js"

export function get(filter) {
    // Show the loader upon searching.
    $(".loader").classList.remove("none")

    // Get all public lisannevvliet repositories.
    fetch("https://api.github.com/users/lisannevvliet/repos?per_page=100&sort=updated&direction=asc")
        .then(response => response.json())
        .then(data =>
            data.forEach(repository => {
                // Delete repositories without demo and Portfolio repository.
                if (repository.homepage && repository.name != "portfolio") {
                    switch (filter) {
                        case "all":
                            insert(repository)
                            break
                        case "mobile-development":
                            // Filter Mobile Development repositories.
                            if (repository.topics[0] == "mobile-development") {
                                insert(repository)
                            }

                            break
                        case "web-design-and-development":
                            // Filter Web Design & Development repositories.
                            if (repository.topics[0] == "web-design-and-development") {
                                insert(repository)
                            }

                            break
                    }
                }
            })
        )
}