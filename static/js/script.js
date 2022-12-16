// Return the Element object of the corresponding element.
function $(element) {
    return document.querySelector(element)
}

// Submit the form upon a change in the filter dropdown.
$("#filter").onchange = function() {
    $("#form").submit()
}