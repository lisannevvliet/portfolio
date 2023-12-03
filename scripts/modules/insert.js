import { $ } from "./$.js"

export function insert(repository) {
    let html = `<section>
    <h3>${repository.name}</h3>`

    if (repository.description) {
        html += `<p>${repository.description}</p>`
    }

    html += `<span>
    <a href="${repository.url}" target="_blank"><img src="/images/github.png">GitHub</a>`

    if (repository.homepage) {
        html += `<a href="${repository.homepage}" target="_blank"><img src="/images/desktop-monitor.png">Demo</a>`
    }

    switch (repository.language) {
        case "CSS":
            html += `<a class="language"><img src="/images/css-3.png">${repository.language}</a>`
            break
        case "JavaScript":
            html += `<a class="language"><img src="/images/java-script.png">${repository.language}</a>`
            break
        case "EJS":
            html += `<a class="language"><img src="/images/ejs_icon_132422.png">${repository.language}</a>`
            break
        case "Handlebars":
            html += `<a class="language"><img src="/images/handlebars_original_logo_icon_146483.png">${repository.language}</a>`
            break
        case "HTML":
            html += `<a class="language"><img src="/images/html.png">${repository.language}</a>`
            break
        case "Kotlin":
            html += `<a class="language"><img src="/images/pngwing.com.png">${repository.language}</a>`
            break
        case "Swift":
            html += `<a class="language"><img src="/images/swift.png">${repository.language}</a>`
    }

    html += `</span>
    </section>`
    
    // Add the repositories to the index page.
    $("section").insertAdjacentHTML("beforeend", html)
}