const questions = [
  {
    question: "Which company developed the Android operating system?" ,
    answers: [
        { text: "Apple", correct: false },
        { text: "Google", correct: true },
        { text: "Microsoft", correct: false },
        { text: "Samsung", correct: false }
    ] 
  },{
    question: "Who played the character of Iron Man in the Marvel movies?" ,
    answers: [
        { text: "Chris Evans", correct: false },
        { text: "Robert Downey Jr.", correct: true },
        { text: "Chris Hemsworth", correct: false },
        { text: "Tom Holland", correct: false }
    ]
  }, {
    question: "What is the capital city of Japan?" ,
    answers: [
        { text: "Tokyo", correct: true },
        { text: "Seoul", correct: false },
        { text: "Beijing", correct: false },
        { text: "Osaka", correct: false }
    ]
  },{
    question: "Which planet is known as the Red Planet?" ,
    answers: [
        { text: "Earth", correct: false },
        { text: "Mars", correct: true },
        { text: "Jupiter", correct: false },
        { text: "Saturn", correct: false }
    ]
  },
  {
    question: "What is the largest mammal in the world?" ,
    answers: [
        { text: "Elephant", correct: false },
        { text: "Blue Whale", correct: true },
        { text: "Giraffe", correct: false },
        { text: "Great White Shark", correct: false }
    ]
  },{
    question: "Which element has the chemical symbol 'O'?" ,
    answers: [
        { text: "Gold", correct: false },
        { text: "Oxygen", correct: true },
        { text: "Silver", correct: false },
        { text: "Hydrogen", correct: false }
    ]
  }
  ,{
    question: "What is the hardest natural substance on Earth?" ,
    answers: [
        { text: "Gold", correct: false },
        { text: "Diamond", correct: true },
        { text: "Iron", correct: false },
        { text: "Quartz", correct: false }
    ]
  },{
    question: "Which gas do plants absorb from the atmosphere?" ,
    answers: [
        { text: "Oxygen", correct: false },
        { text: "Carbon Dioxide", correct: true },
        { text: "Nitrogen", correct: false },
        { text: "Hydrogen", correct: false }
    ]
  },{
    question: "Who won the FIFA World Cup in 2022?",
    answers: [
      { text: "France", correct: false },
      { text: "Germany", correct: false },
      { text: "Argentina", correct: true },
      { text: "Brazil", correct: false }
    ]
  },{
    question: "Which programming language is primarily used for developing Android apps?",
    answers: [
      { text: "Swift", correct: false },
      { text: "Kotlin", correct: true },
      { text: "Python", correct: false },
      { text: "C#", correct: false }
    ]
  }

];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons"); 
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;


function startQuiz () {
  currentQuestionIndex = 0;
  score = 0; 
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion () {
  updateProgressBar();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  answerButtonsElement.innerHTML = ""; 

  currentQuestion.answers.forEach(answer => {
    const button  =  document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtonsElement.appendChild(button); 
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
 
  function selectAnswer (e) {
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct === "true";
    if (iscorrect) {
      selectedbtn.classList.add("correct");
      score++;
    } else {
      selectedbtn.classList.add("incorrect");
    }

    Array.from(answerButtonsElement.children).forEach(button => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true; 
    });
    nextButton.style.display = "block";
  }

  function showScore () {
    const precentage = Math.round((score / questions.length)) * 100;
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    answerButtonsElement.innerHTML = ""; 
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block"; 

    const highscore = localStorage.getItem("highscore") || 0;
    if (score > highscore) {
      localStorage.setItem("highscore", score);
      const newHighscore = document.createElement("p");
      newHighscore.innerText = ` 🎉 New Highscore: ${score}`;
      answerButtonsElement.appendChild(newHighscore);
    }else {
      const prevHigh = document.createElement("p");
      prevHigh.innerText = `Previous Highscore: ${highscore}`;
      answerButtonsElement.appendChild(prevHigh);
    }
  }

  function handleNextButton () {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }

  nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    }else {
      startQuiz();
    }
  });

  function updateProgressBar () {
    const progress = document.getElementById("progress");
    let percent;
    if (currentQuestionIndex === questions.length - 1) {
      percent = 100;
    } else {
      percent = ((currentQuestionIndex ) / questions.length) * 100;
    }
    progress.style.width = `${percent}%`;
  }

startQuiz();