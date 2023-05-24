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
//Function to for loop over items and append them to list
function loadQuestion(){
    //Set the current question's p text...
    $("p").text(quizPrompts[currentQ])
    //...and align it to center
    $("p").attr("style", "text-align: center")
    //For loop over choices and create/append them one by one to the list with bootstrap buttons.
    for (index = 0; index < 4; index++)
        $("ol").append("<li class='btn btn-info m-1'>" + choices[currentQ][index] + "</li>")
}
//Handler Function to be called onclick of start
function quizHandler(){
    //Remove h1 from html
    $("h1").remove()
    //Remove button from html
    $("#start-quiz").remove()
    //Create ol and append to the main content
    $("main").append("<ol class='d-flex flex-column'></ol>")
    //Call the loadQuestion function
    loadQuestion()
    //Event Handler for onclick of the user's choice
        //Get the text of the clicked answer
        //Add and append a div 
        //add and append to div a border line
        //Check if the answer is correct and if so, add/append to div "Correct", otherwise go to next Question
        //If answer is wrong, Add/append to div "Wrong" and deduct time.
        //Check if the currentQ++ is > 4 and break the timer if so, otherwise call the loadQuestion function
    gameTime = 75
    $("#countdown").text("Time: " + gameTime)
    //Start Timer
    gameTimer = setInterval(function () {
        //Subtract from timer
        gameTime--
        
        //Update progress bar and label
        $("#countdown").attr({
            value: gameTime,
            max: 75,
        })
        $("#countdown").text("Time: " + gameTime)
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
