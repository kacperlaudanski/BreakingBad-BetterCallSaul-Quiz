import { questionsBTC } from '/questions-btc.js'
import { questionsBB } from '/questions-bb.js'

const btcStartButton = document.getElementById('btc-start-game-button');
const bbStartButton = document.getElementById('bb-start-game-button'); 
const restartButton = document.getElementById('restart-button'); 
const questionText = document.querySelector('.question');
const quizContainer = document.querySelector('.quiz-container')
const questionBox = document.querySelector('.question-box')
const answerBtns = document.querySelectorAll('.answer-button')
const btcGameIntro = document.getElementById('btc-gameIntro'); 
const bbGameIntro = document.getElementById('bb-gameIntro'); 
const introContainer = document.querySelector('.container')
const summaryBox = document.querySelector('.summary-box'); 
const circularScore = document.querySelector('.circular-score'); 
const scoreValue = document.querySelector('.score-value'); 
const congrats = document.querySelector('.congrats'); 

let shuffledQuestion, currentQuestionIndex; 
let correctAnswers = 1, 
    scoreEndValue = (correctAnswers/15)*100, 
    circleSpeed = 100; 
let color;

const hideElement = (element) => {
   element.classList.add('hidden'); 
 }

const showElement = (element) => {
   element.classList.remove('hidden'); 
}

const showElementWithTransition = (element) => {
  element.classList.add('show'); 
}

const removeElementWithTransition = (element) => {
   element.classList.remove('show'); 
}

setTimeout(() => {
   showElement(btcGameIntro);  
},500)

setTimeout(() => {
   showElement(bbGameIntro); 
},1000)
 
const resetAnswerButtons = () => {
    answerBtns.forEach(button => {
       button.onclick = null; 
       button.style.removeProperty('--c'); 
       button.disabled = false; 
    })
 }
 
 const markCorrectAnswer = () => {
    answerBtns.forEach((correctButton, correctButtonIndex) => {
       if (shuffledQuestion[currentQuestionIndex].answers[correctButtonIndex].correct) {
          correctButton.style.setProperty('--c', '#25ba20');
       }
 })};
 
 const showSummary = () => { 
    hideElement(questionBox); 
    showElement(summaryBox); 
    setTimeout(()=> {
       showElementWithTransition(summaryBox); 
    }, 500); 
    let progress = setInterval(() => {
       let scorePercent = Math.round((correctAnswers/15)*100);
       scoreValue.textContent = `${scorePercent}%`
      if(scorePercent < 33){
         congrats.textContent = "Keep watching and learning !"
         color = "#d62d1a"; 
        }else if(33 <  scorePercent && scorePercent < 66){
         congrats.textContent = "Great job, keep studying !"
         color = "#ffff00"; 
        }else if(66 < scorePercent){
         congrats.textContent = "Wow, you're a true fan !"
         color = "#25ba20"; 
      }
       circularScore.style.background = `conic-gradient(${color} ${scorePercent * 3.6}deg, #ededed 0deg)`
        if(correctAnswers == scoreEndValue){
          clearInterval(progress); 
         }
      }, circleSpeed);
      showElement(restartButton); 
      console.log(correctAnswers);
 }

const startingGame = (startButton, questions) => {
   hideElement(startButton);  
   hideElement(introContainer);
   showElement(questionBox); 
   showElementWithTransition(questionBox);   
   setTimeout(()=>{
      showElement(quizContainer); 
   }, 2000);
   setTimeout(()=>{
      showElementWithTransition(quizContainer); 
   }, 3000); 
   shuffledQuestion = questions.sort(() => Math.random() - .5)
   currentQuestionIndex = 0; 
   generateNextQuestion(); 
}

const generateNextQuestion = () => { 
   resetAnswerButtons(); 
   questionText.textContent = shuffledQuestion[currentQuestionIndex].question;
   answerBtns.forEach((button, buttonIndex) => {  
      button.innerHTML = shuffledQuestion[currentQuestionIndex].answers[buttonIndex].answer;
      button.onclick = () => {
         button.disabled = true;
         if(shuffledQuestion[currentQuestionIndex].answers[buttonIndex].correct){
             correctAnswers++; 
             button.style.setProperty('--c', '#25ba20'); 
         }else{
            button.style.setProperty('--c', '#d62d1a'); 
            markCorrectAnswer(); 
         }
         currentQuestionIndex++;
         if (shuffledQuestion.length > currentQuestionIndex + 1){
            setTimeout(()=>{
               generateNextQuestion()
            }, 1000); 
         }else{
            showSummary(); 
         }
      }
   }) 
}

const restartGame = () => {
   hideElement(restartButton); 
   hideElement(quizContainer);
   removeElementWithTransition(quizContainer); 
   hideElement(questionBox); 
   showElement(introContainer); 
   showElement(bbStartButton);  
   showElement(btcStartButton);  
   hideElement(summaryBox); 
   removeElementWithTransition(summaryBox);
   correctAnswers = 0; 
}

btcStartButton.addEventListener('click', () => {
   startingGame(btcStartButton, questionsBTC); 
   document.body.style.backgroundImage = "url('public/images/btc16.jpeg')";
})

bbStartButton.addEventListener('click', () => {
   startingGame(bbStartButton, questionsBB);  
   document.body.style.backgroundImage = "url('public/images/bb1.jpeg')";
})
 
restartButton.addEventListener('click', restartGame); 