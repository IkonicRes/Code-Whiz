function addResetButtonListener() {
    $("#reset").on("click", function() {
        window.location.href = "../../index.html"
    })
}

function addClearButtonListener() {
    $("#clear").on("click", function() {
        localStorage.clear()
    })
}

addClearButtonListener()
addResetButtonListener()