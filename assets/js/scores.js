scoresExist = (localStorage.getItem('scores') !== null)

function addResetButtonListener() {
    $("#reset").on("click", function() {
        window.location.href = "https://ikonicres.github.io/Code-Whiz"
    });
}

function setDefaultHighScore() {
    var $listItem = $("<li>").addClass("list-group-item align-items-center");
    var $scoreName = $("<span>").text("Highest Score");
    var $scoreValue = $("<span>").text("0");

    var $scoreSection = $("<div>").addClass("d-flex flex-row justify-content-between");

    $scoreSection.append($scoreName, $scoreValue);
    $listItem.append($scoreSection);
    $(scoreOl).append($listItem);
}

function addClearButtonListener() {
    $("#clear").on("click", function() {
        localStorage.clear();
        $("li").remove(".list-group-item")
        setDefaultHighScore()
    });
}

function bubbleSort(inputArr) {
    let len = inputArr.length;
    for (var index0 = 0; index0 < len; index0++) {
        for (var index1 = index0 + 1; index1 < len; index1++) {
            if (inputArr[index0][1] < inputArr[index1][1]) {
                var temp = inputArr[index0];
                inputArr[index0] = inputArr[index1];
                inputArr[index1] = temp;
            }
        }
    }
    return inputArr;
}

var scoreOl = $("#score-list");
function populateScores(scoresPostOrdered){
    for(index = 0; index < scoresPostOrdered.length; index++){
        var $listItem = $("<li>").addClass("list-group-item align-items-center");

        var $scoreName = $("<span>").text(scoresPreOrdered[index][0]);
        var $scoreValue = $("<span>").text(scoresPreOrdered[index][1]);
    
        var $scoreSection = $("<div>").addClass("d-flex flex-row justify-content-between");
    
        $scoreSection.append($scoreName, $scoreValue);
        $listItem.append($scoreSection);
        $(scoreOl).append($listItem);
    }
}

var scores = JSON.parse(localStorage.getItem("scores"));
console.log(scores);
var scoresPreOrdered = [];
if (scoresExist){
    for (var index = 0; index < scores.length; index++) {
        var tScore = scores[index].split("%");
        scoresPreOrdered.push(tScore);
    }
}
else{
    setDefaultHighScore()
}
scoresPostOrdered = bubbleSort(scoresPreOrdered)
populateScores(scoresPostOrdered)
addClearButtonListener();
addResetButtonListener();