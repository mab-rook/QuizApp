// function startQuiz(){
//     alert("Welcome to the quiz!");
//     var name = prompt("Please enter your name:");     
// }

const questionContainer = document.getElementById("question_container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer_buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");
const timerElement = document.getElementById("timer");
const questionCountSelect = document.getElementById("question-count");
const start_btn = document.getElementsByClassName("start-btn");



const questions = [
  {
    question: "What does CPU stand for?",
    answers: [
      { text: "Central Processing Unit", correct: true },
      { text: "Computer Processing Unit", correct: false },
      { text: "Central Programming Unit", correct: false },
      { text: "Computer Power Unit", correct: false },
    ],
  },
  {
    question: "Which data structure uses FIFO (First In, First Out)?",
    answers: [
      { text: "Stack", correct: false },
      { text: "Queue", correct: true },
      { text: "Tree", correct: false },
      { text: "Graph", correct: false },
    ],
  },
  {
    question: "Which language is primarily used for web development?",
    answers: [
      { text: "Python", correct: false },
      { text: "HTML", correct: true },
      { text: "C++", correct: false },
      { text: "Java", correct: false },
    ],
  },
  {
    question: "Which SQL command is used to retrieve data?",
    answers: [
      { text: "UPDATE", correct: false },
      { text: "DELETE", correct: false },
      { text: "SELECT", correct: true },
      { text: "INSERT", correct: false },
    ],
  },
  {
    question: "What does RAM stand for?",
    answers: [
      { text: "Random Access Memory", correct: true },
      { text: "Read Access Memory", correct: false },
      { text: "Run Access Memory", correct: false },
      { text: "Real Access Memory", correct: false },
    ],
  },
  {
    question: "Which of these is a NoSQL database?",
    answers: [
      { text: "MySQL", correct: false },
      { text: "Oracle", correct: false },
      { text: "MongoDB", correct: true },
      { text: "PostgreSQL", correct: false },
    ],
  },
  {
    question: "What is the default port for HTTP?",
    answers: [
      { text: "21", correct: false },
      { text: "80", correct: true },
      { text: "443", correct: false },
      { text: "22", correct: false },
    ],
  },
  {
    question: "Which of the following is not an OOP concept?",
    answers: [
      { text: "Inheritance", correct: false },
      { text: "Encapsulation", correct: false },
      { text: "Compilation", correct: true },
      { text: "Polymorphism", correct: false },
    ],
  },
  {
    question: "What does Git help with in development?",
    answers: [
      { text: "Version Control", correct: true },
      { text: "Design", correct: false },
      { text: "Compilation", correct: false },
      { text: "Testing", correct: false },
    ],
  },
  {
    question: "Which protocol is used to send emails?",
    answers: [
      { text: "HTTP", correct: false },
      { text: "SMTP", correct: true },
      { text: "FTP", correct: false },
      { text: "SNMP", correct: false },
    ],
  },
];

let shuffleQuestion;
let currentQuestionIndex;
let score = 0;
let totalTime = 0;
let globalTimer = 0;
let questionTimeLimit = 10;
let countdownInterval;



function optionDropdown() {
  const max = questions.length;
  questionCountSelect.innerHTML = "";

  for (let i = 1; i <= max; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    questionCountSelect.appendChild(option);
  }
}
console.log(optionDropdown());

function startQuiz(){
    score = 0;
  
    questionContainer.style.display = "flex";
    start_btn[0].style.display = "block"; 
    const selectedQuestion = parseInt(questionCountSelect.value);

    shuffleQuestion = questions.sort(() => Math.random() - 0.5).slice(0, selectedQuestion); 
    // shuffleQuestion[currentQuestionIndex];
    // const q = shuffleQuestion[currentQuestionIndex]
    // q.question;
    // questionElement.innerText = q.question;
    currentQuestionIndex = 0;
    nextButton.classList.remove("hide");
    resultDiv.classList.add("hide");
    restartButton.classList.add("hide");
    
    setNextQuestion();
}



// function timerFunction(){
//     timerElement.innerText = `Time Taken: 0`
//     clearInterval(timerInterval);
//     setInterval(() => {
//         timer++;
//         timerElement.innerText = `time: ${timer} `
//     }, 1000)
// }

// function timer(){
//     timerInterval = setInterval(() => {
//         timer++;
//     }, 1000)
// }

function startQuestionCountdown(seconds) {
    let timeLeft = seconds;
    timerElement.innerText = `Time left: ${timeLeft}s`;

    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
      timeLeft--;
      globalTimer++;
      timerElement.innerText = `Time left: ${timeLeft}s`;

      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        SkipQuestion();
      }
    }, 1000);
  }

  function SkipQuestion() {
    const selectedIndex = Array.from(answerButtons.querySelectorAll("input"))
      .findIndex((radio) => radio.checked);

    if (selectedIndex !== -1 && shuffleQuestion[currentQuestionIndex].answers[selectedIndex].correct) {
      score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < shuffleQuestion.length) {
      setNextQuestion();
    } else {
      endQuiz();
    }
  }

  function setNextQuestion() {
    resetState();
    showQuestion(shuffleQuestion[currentQuestionIndex]);
    startQuestionCountdown(questionTimeLimit);
  }

  function showQuestion(question) {
    questionElement.textContent = question.question;

    question.answers.forEach((answer, index) => {
      const inputGroup = document.createElement("div");
      inputGroup.classList.add("input-group");

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.id = "answer" + index;
      radio.name = "answer";
      radio.value = index;

      const label = document.createElement("label");
      label.htmlFor = "answer" + index;
      label.innerText = answer.text;

      inputGroup.appendChild(radio);
      inputGroup.appendChild(label);
      answerButtons.appendChild(inputGroup);
    });
  }

  function resetState() {
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }


nextButton.addEventListener("click", () => {
      const answerIndex = Array.from(answerButtons.querySelectorAll("input"))
        .findIndex((radio) => radio.checked);

      if (answerIndex !== -1) {
        
        if (shuffleQuestion[currentQuestionIndex].answers[answerIndex].correct) {
          score++; 
        } 

        currentQuestionIndex++; 

        
        if (currentQuestionIndex < shuffleQuestion.length) {
          setNextQuestion();
        } else {
          endQuiz(); 
        }
      } else {
        alert("Please select an answer.");
        startQuestionCountdown(questionTimeLimit);
      }
});


// restartButton.addEventListener("click",  startQuiz);
restartButton.addEventListener("click",  () => {
    score = 0;
    globalTimer = 0;
    questionContainer.style.display = "none"; 
    resultDiv.classList.add("hide"); 
    restartButton.classList.add("hide"); 
    start_btn[0].style.display = "block"; 
    clearInterval(countdownInterval); 

});

function endQuiz() {
    clearInterval(countdownInterval); 
    questionContainer.style.display = "none"; 
    nextButton.classList.add("hide"); 
    restartButton.classList.remove("hide"); 
    resultDiv.classList.remove("hide"); 
    resultDiv.innerText = `Your final score: ${score} / ${shuffleQuestion.length}. Time taken: ${globalTimer}s`;
    start_btn[0].style.display = "none"; // Show the start button again
}


