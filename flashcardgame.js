// NPM Packages
var inquirer = require('inquirer');

// local Require files
var basiccard = require('./BasicCard.js');
var clozecard = require('./ClozeCard.js');
var questions = require('./questions.js').questions; // defines the object within the questions.js file
var basicquestions = require('./basicquestions.js').basicquestions;


// Global Variable: Array to hold question arguments
var basic = [];

// Loops through and sets up the ask questions function & pushes to the empty closeQuestions array.
for (var i = 0; i < basicquestions.length; i++) {
  var bflashcard = new basiccard.BasicCard(basicquestions[i].front, basicquestions[i].back);
  basic.push(bflashcard);
}


// Global Variable: Array to hold question arguments
var closeQuestions = [];

// Loops through and sets up the ask questions function & pushes to the empty closeQuestions array.
for (var i = 0; i < questions.length; i++) {
  var flashcard = new clozecard.ClozeCard(questions[i].full, questions[i].cloze);
  closeQuestions.push(flashcard);
}

// Log all question results
// console.log(basic);
// console.log(closeQuestions); 

// Setting all values to zero to score question results
var currentQuestion = 0; // Index of currentQuestion = 0. Set to 0 for start of game
var correct = 0;
var wrong = 0;

// Global - Start game prompt. Call askQuestion() function to start game
console.log('');
console.log('----------------------------------');
console.log('Welcome to That 70\'s show Trivia! \n')

inquirer.prompt([
    {
      type: "list",
      message: "Choose your flashcard Game.",
      choices: ["Basic", "Cloze"],
      name: "choice"
    }
  ]).then(function(user) {
    var inputResults = user.choice;
    console.log(inputResults);

    switch (inputResults) {

      case "Basic":
      askQuestionb();
      break;

      case "Cloze":
      askQuestion();
      break;

    default:
          console.log("error");
    }
  });

// This is the Cloze Function
function askQuestion() {
  inquirer.prompt([
    {
      type: 'input',
      message: closeQuestions[currentQuestion].partial + '\nAnswer: ',
      name: 'userGuess'
    }
    // This is the promise. Waits for completion of the input. Then runs the promise.
    // When we input our answer and hit enter. Then the promise.then(functions(answers)) runs.
  ]).then(function (answers) {
    console.log('\n');
    if (answers.userGuess.toLowerCase() === closeQuestions[currentQuestion].cloze.toLowerCase()) {
      // console.log("This is the answer in lowercase: " + answers.userGuess.toLowerCase()); // Test of toLowerCase. See in backend
      console.log('Correct, I love Wisconson! \n(You are welcome to join the crew in the basement!)\n');
      correct++;
    } else {
      console.log('Wrong, Red is gonna put his foot up your ass! \n (You know he will...)\n');
      wrong++;
    }
    console.log(closeQuestions[currentQuestion].full);

    if (currentQuestion < closeQuestions.length - 1) {
      currentQuestion++;
      askQuestion();
    } else {
      console.log('Game Over!');
      console.log('Correct Answers: ' + correct);
      console.log('Incorrect Answers: ' + wrong);
      console.log('\n AHhhhhh noooooo. (Fez is sad the game is over!)\n');

      inquirer.prompt([
        {
          type: 'confirm',
          message: 'Would you like to play again?',
          name: 'Again'
        }
      ]).then(function (answers) {
        // If confirm is yes. Reset all values and call askQuestion function to start game over.
        if (answers.Again) {
          currentQuestion = 0;
          correct = 0;
          wrong = 0;
          reload(); // This call starts the game over.

        } else {
          console.log('Thanks for playing!');
        }
      })
    }
  })
}


// This is the Basic Function
function askQuestionb() {
  inquirer.prompt([
    {
      type: 'input',
      message: basic[currentQuestion].front + '\nAnswer: ',
      name: 'userGuess'
    }
    // This is the promise. Waits for completion of the input. Then runs the promise.
    // When we input our answer and hit enter. Then the promise.then(functions(answers)) runs.
  ]).then(function (answers) {
    console.log('\n');
    if (answers.userGuess.toLowerCase() === basic[currentQuestion].back.toLowerCase()) {
      // console.log("This is the answer in lowercase: " + answers.userGuess.toLowerCase()); // Test of toLowerCase. See in backend
      console.log('Correct, I love Wisconson! \n(You are welcome to join the crew in the basement!)\n');
      correct++;
    } else {
      console.log('Wrong, Red is gonna put his foot up your ass! \n (You know he will...)\n');
      wrong++;
    }
    console.log(basic[currentQuestion].front);

    if (currentQuestion < basic.length - 1) {
      currentQuestion++;
      askQuestionb();
    } else {
      console.log('Game Over!');
      console.log('Correct Answers: ' + correct);
      console.log('Incorrect Answers: ' + wrong);
      console.log('\n AHhhhhh noooooo. (Fez is sad the game is over!)\n');

      inquirer.prompt([
        {
          type: 'confirm',
          message: 'Would you like to play again?',
          name: 'Again'
        }
      ]).then(function (answers) {
        // If confirm is yes. Reset all values and call askQuestion function to start game over.
        if (answers.Again) {
          currentQuestion = 0;
          correct = 0;
          wrong = 0;
          reload(); // This call starts the game over.

        } else {
          console.log('Thanks for playing!');
        }
      })
    }
  })
}

// This is the function to reload the game and to ask if user is going to play Basic or Cloze
function reload() {
inquirer.prompt([
    {
      type: "list",
      message: "Choose your flashcard Game.",
      choices: ["Basic", "Cloze"],
      name: "choice"
    }
  ]).then(function(user) {
    var inputResults = user.choice;
    console.log(inputResults);

    switch (inputResults) {

      case "Basic":
      askQuestionb();
      break;

      case "Cloze":
      askQuestion();
      break;

    default:
          console.log("error");
    }
  });
};
