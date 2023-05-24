q1Choices = ["strings", "booleans", "alerts", "numbers"]
q2Choices = ["quotes", "curly brackets", "parentheses", "square brackets"]
q3Choices = ["numbers and strings", "other arrays", "booleans", "all of the above"]
q4Choices = ["commas", "curly brackets", "quotes", "parentheses"]
q5Choices = ["JavaScript", "terminal/bash", "for loops", "console.log"]
questionPrompts = [
    "Commonly used data types DO NOT include:",
    "The condition in an if/else statement is enclosed within _____.",
    "Arrays in JavaScript can be used to store _____.",
    "String values must be enclosed within _____ when being assigned to variables."
]
gameTime = 75
currentQ = 0
quizAnswers = [2, ]
//Handler Function to be called onclick of start
    //Remove button from html
    //create ol and append
    //For loop over choices and create/append them one by one to the list with bootstrap.
    //Event Handler for onclick of the user's choice
        //Get the text of the clicked answer
        //Add and append a div 
        //add and append to div a spacer line
        //Check if the answer is correct and if so, add/append to div "Correct" and if the currentQ++ is > 4 break the timer, otherwise go to next Question
        //If answer is wrong, Add/append to div "Wrong" and deduct time.
    //Start Timer
            //Subtract from timer
            //Update progress bar and label
            //Check if time < 1 and if so break self
    //When timer is broken, check the time left, and if it's more than 0, assign the time left to a temporary score

    //Prompt user to enter up to 4 initials or enter anonymously. If something is entered, save that string over the default "Sudo" name

    //Save name and score to local storage score array

    //Reset all variables to default





//Make event handler for "onclick" and call the handler function, prompting the first question and starting the timer