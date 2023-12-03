import { $ } from "./modules/$.js"
import { get } from "./modules/get.js"

// Change the repositories upon a change in the filter dropdown.
$("select").onchange = event => {
    $("section").replaceChildren()
    get(event.target.value)
}

get("all")