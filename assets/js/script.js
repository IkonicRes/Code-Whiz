//Declare choices for each question...
q1Choices = ["strings", "booleans", "alerts", "numbers"]
q2Choices = ["quotes", "curly brackets", "parentheses", "square brackets"]
q3Choices = ["numbers and strings", "other arrays", "booleans", "all of the above"]
q4Choices = ["commas", "curly brackets", "quotes", "parentheses"]
q5Choices = ["JavaScript", "terminal/bash", "for loops", "console.log"]
//...and the questions themselves
quizPrompts = [
    "Commonly used data types DO NOT include:",
    "The condition in an if/else statement is enclosed within _____.",
    "Arrays in JavaScript can be used to store _____.",
    "String values must be enclosed within _____ when being assigned to variables.",
    "A very useful tool used during development and debugging for printing content to the debugger is:"
    ]
//Then add all of the choices arrays to one array so that there is one question array and one answer array
choices = [q1Choices, q2Choices, q3Choices, q4Choices, q5Choices]
//Set the default variables
gameTime = 75
currentQ = 0
quizAnswers = [2, 2, 3, 2, 3]
userChoice = Number
tScores = []
//And check whether scores already exist in localstorage
scoresExist = (localStorage.getItem('scores') !== null)
//Make a clamp to handle a later bug with progress bar width
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

//This function is called when the game should end
function endGame() {
    $("#countdown").text("Time: " + gameTime);
    // Set the initial width of the progress bar
    $(".progress-bar").css("width", "0%");
    //It prepends the "All done!" header to the beginning of the main section, then sets the main text to your result
    $("main").prepend("<h1>All done!</h1>")
    $("#main-text").text("Your final score is " + gameTime + ".")
    //removes all choices and appends a section under the results text has a bit of text, an input box, and a submit button.
    $("ol").remove()
    $("main").append('<section class="d-flex flex-row align-items-center"><h4>Enter Initials: </h4z><input type="text" id="callsign"></input><input type="submit" class="btn btn-success h-25 align-self-center" id="submit-btn"></input></section>')
    //Add a click event to the submit button
    $("#submit-btn").on("click", function() {
        //Get the text of the input box
        tName = $("#callsign").val()
        //If name wasnt entered, add a default anonymous name instead.
        if (tName.length < 1){
            tName = "FunkyAnon"
        }
        //Set the score percentage and reset the "scores" array
        tScore = (tName + "%" + gameTime)
        tScores = []
        //Check if the scores exist in localstorage, and if so, parse the data, append the new score, and restringify the data to be updated in local storage
        if (scoresExist){
            JSON.parse(localStorage.getItem("allEntries"))
            tScores = JSON.parse(localStorage.getItem("scores"))
            tScores.push(tScore)
            localStorage.setItem("scores", JSON.stringify(tScores))
        }
        //Otherwise, push the score to the empty array and stringify/set in local storage
        else{
            tScores.push(tScore)
            localStorage.setItem("scores", JSON.stringify(tScores))
        }
        //Then navigate to the high scores page
        window.location.href = "https://ikonicres.github.io/Code-Whiz/score.html"
    })
}

//This function should facilitate the gameflow, handling changing questions and ending the game after a small delay when the user makes a choice.
function delayedFacilitator(){
    //We make a timer that fires after a half second delay
    setTimeout(function(){
        //We remove the ordered list with answer choices, as well as the result indicator text...
        $("ol").remove()
        $("#result-div").remove()
        //It checks if we're at the last question, if so......
        if (currentQ == 4){
            //...it clears the timer and ends the game.
            clearInterval(gameTimer)
            endGame()
        }
        //If we're not at the last question
        else{
            //Increment the question and load the next one.
            currentQ++
            loadQuestion()
        }
    },500); 
}

//This function should add a choice button listener every time a "Choice" button is created, which should prompt the evaluation logic and move the game forward when activated.
function addChoiceButtonListener() {
    //set the event to happen on click for every element with class choice-button, but only once
    $(".choice-button").one("click", function() {
        //Get the text of the clicked answer
        userChoice = $(this).text()
        //Check the user's choice(the text of the clicked element) against the sub-array of the correct index of the current quizAnswers element, and if user is correct...
        if (userChoice === choices[currentQ][quizAnswers[currentQ]]){
            //Run the function to indicate correct or incorrect and correct answers...
            setAnswerHighlight()
            //...append the confirmation text of whether or not you answered correctly, and fire the delayed facilitator
            appendResult(true)
            delayedFacilitator()
        }
        //Otherwise if user answered wrong...
        else {
            //...still run the highlight, but append the result as false...
            setAnswerHighlight()
            appendResult(false)
            //... and check if subtracting 15 seconds from gameTime would bring time into negative. If it does, set the gameTime to zero and clear the game timer loop
            if ((gameTime - 15) <= 0) {
                gameTime = 0
                clearInterval(gameTimer)
            }
            //Otherwise subtract 15 seconds for wrong answer...
            else {
                gameTime -= 15
            }
            //... and fire the delayed facilitator function
            delayedFacilitator()
        }
    })
}

//This function highlights the correct answer in green, and the incorrect answer in red. It also adds a "tick" or "X" symbol on the correct and incorrect answers respectively
function setAnswerHighlight(){
    //First it gets the index number of the choice element
    tChoice = choices[currentQ].indexOf(userChoice)
    //And checks if it is the same index as the quiz answer, which happens to be indexed the same.
    if(tChoice === quizAnswers[currentQ]){
        //If so it makes the background of the correct answer green and puts a tick mark on the button
        $('#li' + tChoice).attr("style", "background-color: #00FF00")
        $('#li' + tChoice).append('<p>&#10004</p>')
    }
    //Otherwise if user answered wrong
    else{
        //It still puts the background color and check mark on the correct choice, but changes the user choice's button's color to red and adds an "X" to it. 
        $('#li' + quizAnswers[currentQ]).attr("style", "background-color: #00FF00")
        $('#li' + quizAnswers[currentQ]).append('<p>&#10004</p>')
        $('#li' + tChoice).attr("style", "background-color: #FF0800")
        $('#li' + tChoice).append('<p>&#10007</p>')
    }
}

//This function appends the result of your choice (whether you were right or wrong) to a new div it creates at the end of the ordered list
function appendResult(result){
    //First it appends a div with an id of result-div
    $("ol").append("<div id='result-div'></div>")
    //Then it uses that ID to append a p tag to it with an id of result.
    $("#result-div").append('<p id="result"></p>')
    //It then sets the style of that p tag so that it centers all text content
    $("#result").attr("style", "text-align: center")
    //And checks if you got the result right
    if (result){
        //Pasting "Correct!" if so
        $("#result").text("Correct!")
    }
    //Otherwise if user is wrong
    else{
        //We paste "Wrong!" in the content instead
        $("#result").text("Wrong!")
    }
}

//This function loops populates the question and loops over the possible answers populating them as well.
function loadQuestion(){
    //First we set the user's choice to a ridiculous impossible index
    userChoice = 99
    //Then we append a new ordered list to the page, giving it a bootstrap class of display: flex-column
    $("main").append("<ol class='d-flex flex-column'></ol>")
    //Set the current question's text...
    $("#main-text").text(quizPrompts[currentQ])
    //...and align it to center
    $("#main-text").attr("style", "text-align: center")
    //For loop over choices and create/append them one by one to the list with bootstrap buttons.
    for (index = 0; index < 4; index++)
        $("ol").append('<li class="btn btn-info m-1 choice-button d-flex flex-row justify-content-center h-25" id="li' + index  + '">' + choices[currentQ][index] + '</li>')
    //Add a choice button listener to the page when all buttons have been added
    addChoiceButtonListener()
}


//Handler Function to be called onclick of start; This function runs our main game loop.
function quizHandler(){
    //Remove h1 from html
    $("h1").remove()
    //Remove button from html
    $("#start-quiz").remove()
    //Call the loadQuestion function
    loadQuestion()
    //Set the gameTime to the full amount
    gameTime = 75
    $("#countdown").text("Time: " + gameTime);
    // Set the initial width of the progress bar
    $(".progress-bar").css("width", "100%");
    //Start Timer for the game loop
    gameTimer = setInterval(function () {
        //Subtract from timer
        gameTime--
        // Calculate the width of the progress bar
        // Update the time text
        $("#countdown").text("Time: " + gameTime);
        //Set the width of the progress bar
        var progressBarWidth = (gameTime / 75) * 100 + "%"
        //And update it in the css.
        $(".progress-bar").css("width", (100/75) * gameTime + "%");
        // Update the aria-value of the progress bar using CSS
        $(".progress-bar").attr('aria-valuenow', progressBarWidth)
        //Check if time = 0 and if so, end game and break self
        if (gameTime === 0){
            endGame()   
            clearInterval(gameTimer)
        }
    }, 1000);
}


//Make event handler for "onclick" and call the handler function, prompting the first question and starting the timer
$("#start-quiz").on("click", quizHandler);
