// Return the Element object of the corresponding element.
function $(element) {
    return document.querySelector(element)
}

// Submit the form upon a change in the filter dropdown.
$("#filter").onchange = function() {
    $("#form").submit()
}

// Get all public lisannevvliet repositories.
fetch("https://api.github.com/users/lisannevvliet/repos?per_page=100")
    .then(response => response.json())
    .then(data =>
        data.forEach(item => {
            html = `<section>
            <h3>${item.name}</h3>`

            if (item.description) {
                html += `<p>${item.description}</p>`
            }

            html += `<span>
            <a href="${item.url}" target="_blank"><img src="/images/github.png">GitHub</a>`

            if (item.homepage) {
                html += `<a href="${item.homepage}" target="_blank"><img src="/images/desktop-monitor.png">Demo</a>`
            }

            switch (item.language) {
                case "CSS":
                    html += `<a class="language"><img src="/images/css-3.png">${item.language}</a>`
                    break;
                case "JavaScript":
                    html += `<a class="language"><img src="/images/java-script.png">${item.language}</a>`
                    break;
                case "EJS":
                    html += `<a class="language"><img src="/images/ejs_icon_132422.png">${item.language}</a>`
                    break;
                case "Handlebars":
                    html += `<a class="language"><img src="/images/handlebars_original_logo_icon_146483.png">${item.language}</a>`
                    break;
                case "HTML":
                    html += `<a class="language"><img src="/images/html.png">${item.language}</a>`
                    break;
                case "Kotlin":
                    html += `<a class="language"><img src="/images/pngwing.com.png">${item.language}</a>`
                    break;
                case "Swift":
                    html += `<a class="language"><img src="/images/swift.png">${item.language}</a>`
            }

            html += `</span>
            </section>`
            
            // Add the repositories to the index page.
            $("section").insertAdjacentHTML("beforeend", html)
        })
    )