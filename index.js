import { questionsBTC } from '/questions-btc.js'
import { questionsBB } from '/questions-bb.js'

const btcStartButton = document.getElementById('btc-start-game-button');
const bbStartButton = document.getElementById('bb-start-game-button'); 
const nextQuestionButton = document.getElementById('next-button');
const restartButton = document.getElementById('restart-button'); 
const questionText = document.querySelector('.question');
const quizContainer = document.querySelector('.quiz-container')
const questionBox = document.querySelector('.question-box')
const answerBtns = document.querySelectorAll('.answer')
const quizBox = document.querySelector('.quiz-container');
const btcHalf = document.querySelector('.btc-half'); 
const bbHalf = document.querySelector('.bb-half');   
const btcGameIntro = document.getElementById('btc-gameIntro'); 
const bbGameIntro = document.getElementById('bb-gameIntro'); 
const introContainer = document.querySelector('.container')

let shuffledQuestion, currentQuestionIndex; 

setTimeout(() => {
   btcGameIntro.classList.remove('hidden'); 
},1000)

setTimeout(() => {
   bbGameIntro.classList.remove('hidden')
},3000)


function startingGame(startButton, questions){
   startButton.classList.add('hidden'); 
   introContainer.classList.add('hidden')
   questionBox.classList.remove('hidden');  
   quizContainer.classList.remove('hidden'); 
   shuffledQuestion = questions.sort(() => Math.random() - .5)
   currentQuestionIndex = 0; 
   generateNextQuestion(questions); 
}

function generateNextQuestion(questions){ 

   answerBtns.forEach(button => {
      button.onclick = null; 
   })
   questionText.textContent = shuffledQuestion[currentQuestionIndex].question; 
   answerBtns.forEach((button, buttonIndex) => {
      button.innerHTML = shuffledQuestion[currentQuestionIndex].answers[buttonIndex].answer; 
      button.onclick = () => {
         if(shuffledQuestion[currentQuestionIndex].answers[buttonIndex].correct === true){
            quizBox.classList.add('correct');
            setTimeout(()=>{quizBox.classList.remove('correct')},1000); 
            nextQuestionButton.classList.remove('hidden'); 
         }else if(shuffledQuestion[currentQuestionIndex].answers[buttonIndex].correct === false){
            quizBox.classList.add('wrong');
            restartButton.classList.remove('hidden')  
            nextQuestionButton.classList.add('hidden') 
         }
         if (shuffledQuestion.length > currentQuestionIndex + 1){
            return; 
         } else{
            restartButton.classList.remove('hidden'); 
            questionBox.classList.add('hidden'); 
            nextQuestionButton.classList.add('hidden');
         }
      }
   })
}

function nextQuestion(){
   currentQuestionIndex++; 
   nextQuestionButton.classList.add('hidden')
   generateNextQuestion(); 
}

function restartGame(){
   restartButton.classList.add('hidden');
   nextQuestionButton.classList.add('hidden'); 
   quizBox.classList.remove('wrong');
   questionBox.classList.add('hidden'); 
   startingGame(); 
}

btcStartButton.addEventListener('click', () => {
   startingGame(btcStartButton, questionsBTC); 
})

bbStartButton.addEventListener('click', () => {
   startingGame(bbStartButton, questionsBB); 
})

nextQuestionButton.addEventListener('click', nextQuestion); 
restartButton.addEventListener('click', restartGame); 