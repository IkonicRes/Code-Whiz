q1Choices = ["strings", "booleans", "alerts", "numbers"]
q2Choices = ["quotes", "curly brackets", "parentheses", "square brackets"]
q3Choices = ["numbers and strings", "other arrays", "booleans", "all of the above"]
q4Choices = ["commas", "curly brackets", "quotes", "parentheses"]
q5Choices = ["JavaScript", "terminal/bash", "for loops", "console.log"]
quizPrompts = [
    "Commonly used data types DO NOT include:",
    "The condition in an if/else statement is enclosed within _____.",
    "Arrays in JavaScript can be used to store _____.",
    "String values must be enclosed within _____ when being assigned to variables.",
    "A very useful tool used during development and debugging for printing content to the debugger is:"
    ]
choices = [q1Choices, q2Choices, q3Choices, q4Choices, q5Choices]
gameTime = 75
currentQ = 0
quizAnswers = [2, 2, 3, 2, 3]
userChoice = Number
scoresExist = (localStorage.getItem('scores') !== null)
tScores = []
function endGame() {
    $("main").prepend("<h1>All done!</h1>")
    $("#main-text").text("Your final score is " + gameTime + ".")
    $("ol").remove()
    $("main").append('<section class="d-flex flex-row align-items-center"><h4>Enter Initials: </h4z><input type="text" id="callsign"></input><input type="submit" class="btn btn-success h-25" id="submit-btn"></input></section>')
    $("#submit-btn").on("click", function() {
        //Get the text of the input box
        tName = $("#callsign").val()
        console.log(tName)
        tScore = (tName + "%" + gameTime)
        tScores = []
        if (scoresExist){
            JSON.parse(localStorage.getItem("allEntries"))
            tScores = JSON.parse(localStorage.getItem("scores"))
            console.log(tScores)
            tScores.push(tScore)
            localStorage.setItem("scores", JSON.stringify(tScores))
        }
        else{
            tScores.push(tScore)
            localStorage.setItem("scores", JSON.stringify(tScores))
        }
    })
}

function oneSecDelay(bCorrect){
    setTimeout(function(){
        if (bCorrect){
            $("ol").remove()
            $("#result-div").remove()
            if (currentQ == 4){
                clearInterval(gameTimer)
                endGame()
            }
            else{
            currentQ++
            loadQuestion()
            }
        }
        else{
            $("ol").remove()
            $("#result-div").remove()
            if (currentQ == 4){
                clearInterval(gameTimer)
                endGame()                
            }
            else{
            currentQ++
            loadQuestion()
            }
        }
    },1000); 
}
//Event Handler for onclick of the user's choice
function addChoiceButtonListener() {
    $(".choice-button").on("click", function() {
        //Get the text of the clicked answer
        userChoice = $(this).text()
        if (userChoice === choices[currentQ][quizAnswers[currentQ]]){
            setAnswerHighlight()
            appendResult(true)
            oneSecDelay(true)
        }
        else {
            setAnswerHighlight()
            appendResult(false)
            gameTime -= 15
            oneSecDelay(false)
        }
    })
}

function appendResult(result){
    $("ol").append("<div id='result-div'></div>")
    //add and append to div a border line
    $("#result-div").append('<p id="result"></p>')
    $("#result").attr("style", "border-top: 100% solid white; text-align: center")
    if (result){
        $("#result").text("Correct!")
    }
    else{
        $("#result").text("Wrong!")
    }
}

function setAnswerHighlight(){
    tChoice = choices[currentQ].indexOf(userChoice)
    if(tChoice === quizAnswers[currentQ]){
        $('#li' + tChoice).attr("style", "background-color: #00FF00")
        $('#li' + tChoice).append('<p>&#10004</p>')
    }
    else{
        $('#li' + quizAnswers[currentQ]).attr("style", "background-color: #00FF00")
        $('#li' + quizAnswers[currentQ]).append('<p>&#10004</p>')
        $('#li' + tChoice).attr("style", "background-color: #FF0800")
        $('#li' + tChoice).append('<p>&#10007</p>')
    }
}

//Function to for loop over items and append them to list
function loadQuestion(){
    userChoice = 99
    $("main").append("<ol class='d-flex flex-column'></ol>")
    //Set the current question's p text...
    $("#main-text").text(quizPrompts[currentQ])
    //...and align it to center
    $("#main-text").attr("style", "text-align: center")
    //For loop over choices and create/append them one by one to the list with bootstrap buttons.
    //Create ol and append to the main content
    for (index = 0; index < 4; index++)
        $("ol").append('<li class="btn btn-info m-1 choice-button d-flex flex-row justify-content-center h-25" id="li' + index  + '">' + choices[currentQ][index] + '</li>')
    addChoiceButtonListener()
    
}
//Handler Function to be called onclick of start
function quizHandler(){
    //Remove h1 from html
    $("h1").remove()
    //Remove button from html
    $("#start-quiz").remove()
    //Call the loadQuestion function
    loadQuestion()

        
        //Check if the answer is correct and if so, add/append to div "Correct" and go to next Question
        //If answer is wrong, Add/append to div "Wrong" and deduct time.
        //Check if the currentQ++ is > 4 and break the timer if so, otherwise call the loadQuestion function
    gameTime = 75
    $("#countdown").text("Time: " + gameTime);
    // Set the initial width of the progress bar
    $("#countdown").css("width", "100%");
    //Start Timer
    gameTimer = setInterval(function () {
        //Subtract from timer
        gameTime--
        // Calculate the width of the progress bar
        // Update the time text
        $("#countdown").text("Time: " + gameTime);
        var progressBarWidth = (gameTime / 75) * 100 + "%"
        // Update the width of the progress bar using CSS
        $("#countdown").css("width", progressBarWidth)
        //Check if time = 0 and if so break self
        if (gameTime === 0){
            clearInterval(gameTimer)
        }
    }, 1000);
 
    //When timer is broken, check the time left, and if it's more than 0, assign the time left to a temporary score

    //Prompt user to enter up to 4 initials or enter anonymously. If something is entered, save that string over the default "Sudo" name

    //Save name and score to local storage score array

    //Reset all variables to default
}


//Make event handler for "onclick" and call the handler function, prompting the first question and starting the timer
$("#start-quiz").on("click", quizHandler);
