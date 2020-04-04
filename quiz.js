// QUESTIONS for quiz 
const questions = [
  {
    "question": "How would you describe your personality?",
    "answer1": "Happy-go-lucky, looking for something fun!",
    "answer1Total": "1",
    "answer2": "Looks for the good in people, tries to find solutions.",
    "answer2Total": "2",
    "answer3": "Curious, always likes to see the deeper meaning.",
    "answer3Total": "3"
  },
  {
    "question": "I am more creative than analytical.",
    "answer1": "Agree",
    "answer1Total": "1",
    "answer2": "Neutral",
    "answer2Total": "2",
    "answer3": "Disagree",
    "answer3Total": "3"
  },
  {
    "question":
      "Select in which order you would value these: Creativity, Philanthropy & Education",
    "answer1": "Creativity, Philanthropy, Education",
    "answer1Total": "1",
    "answer2": "Philanthropy, Education, Creativity",
    "answer2Total": "2",
    "answer3": "Education, Creativity, Philanthropy",
    "answer3Total": "3"
  },
  {
    "question": "What would you most enjoy doing in your free time?",
    "answer1": "Drawing or building things with your hands.",
    "answer1Total": "1",
    "answer2": "Volunteering or connecting with family members/friends.",
    "answer2Total": "2",
    "answer3":
      "Watching a youtube video about the newest scientific discovery.",
    "answer3Total": "3"
  },
  {
    "question": "How would you prepare your food?",
    "answer1": "Take a look at the cookbook but venture away from the recipe to make your own.",
    "answer1Total": "1",
    "answer2": "Ask family members their opinion on how much they'd prefer of each ingredient.",
    "answer2Total": "2",
    "answer3": "Follow the cookbook to a T, experiment with different serving sizes.",
    "answer3Total": "3"
  },
  {
    "question":
      "What makes you feel the most satisfied?",
    "answer1":
      "Putting a block/puzzle piece in the right spot.",
    "answer1Total": "1",
    "answer2": "Helping a friend understand a difficult topic and they finally get it.",
    "answer2Total": "2",
    "answer3": "Looking at a well-made piechart.",
    "answer3Total": "3"
  },
  {
    "question": "If someone asks you a mind-boggling question you...",
    "answer1": "Question the question itself",
    "answer1Total": "1",
    "answer2": "Wonder why its beneficial to ask that question in the first place. ",
    "answer2Total": "2",
    "answer3": "Research and rack your brain for an answer",
    "answer3Total": "3"
  }
]


let currentQuestion = 0;
let score = [];
let selectedAnswersData = [];
const totalQuestions =questions.length;

const container = document.querySelector('.quiz-container');
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const restartButton = document.querySelector('.restart');
const result = document.querySelector('.result');

//Function to generate question 
function generateQuestions (index) {
    //Select each question by passing it a particular index
    const question = questions[index];
    const option1Total = questions[index].answer1Total;
    const option2Total = questions[index].answer2Total;
    const option3Total = questions[index].answer3Total;
    //Populate html elements 
    questionEl.innerHTML = `${index + 1}. ${question.question}`
    option1.setAttribute('data-total', `${option1Total}`);
    option2.setAttribute('data-total', `${option2Total}`);
    option3.setAttribute('data-total', `${option3Total}`);
    option1.innerHTML = `${question.answer1}`
    option2.innerHTML = `${question.answer2}`
    option3.innerHTML = `${question.answer3}`
}


function loadNextQuestion () {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    //Check if there is a radio input checked
    if(!selectedOption) {
        alert('Please select your answer!');
        return;
    }
    //Get value of selected radio
    const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));

    ////Add the answer score to the score array
    score.push(answerScore);

    selectedAnswersData.push()
    

    const totalScore = score.reduce((total, currentNum) => total + currentNum);

    //Finally we incement the current question number ( to be used as the index for each array)
    currentQuestion++;

        //once finished clear checked
        selectedOption.checked = false;
    //If quiz is on the final question
    if(currentQuestion == totalQuestions - 1) {
        nextButton.textContent = 'Finish';
    }
  
    //salma writing her own code here pls ignore it might not work.. update: it worked yay!!
    var developerType = "null"
var developerSummary ="null"
    if (totalScore<=9) {
        developerType = "Gaming + Art"
        developerSummary = "Looks like gaming and art might be a good fit for you! Project examples that would fall under this category are making ____ and _______. Be creative, its what you're made for!"
      } else if (totalScore<=13) {
        developerType = "Social Impact"
        developerSummary = "Looks like a social impact-based project would be the best fit for you. Look around your community. What problems need to be solved? Is there enough education programs for kids? If not, make an educational app for kids! Is your school not efficient at managing waste? Make an aapp that helps manage that!"
      } else if(totalScore<=17){
        developerType = "Research/Data"
        developerSummary = "Looks like a Research/Data project might be the best fit for you! Look around you... what are you curious about in the world around you? You can make a project that analyzes the amount of flu-cases around the country. Or, use your programming knowledge to explore outer space!"
      }
      else {
        developerType = "AI/ML"
        developerSummary = "Looks like an AI/ML based project might be the best fit for you! Look around you, anything you want to make more efficient? You can use artificial intelligence to create a self-driving car, or even create a program that detects bias in news articles. The world is your oyster!"
      }
  
    //If the quiz is finished then we hide the questions container and show the results 
    if(currentQuestion == totalQuestions) {
        container.style.display = 'none';
        document.getElementById('quizsection').style.display='none';
        document.getElementById('slide').style.display='flex';
        result.innerHTML =
         `<h1 class="final-score">Interest area: ${developerType}</h1> 
         <div class="summary">
            <h2 style ="color: #909090;">${developerSummary}</h2>
        </div>
        <button class="restart">Restart Quiz</button>
         `;
        return;
    }
    generateQuestions(currentQuestion);
}

//Function to load previous question
function loadPreviousQuestion() {
    //Decrement quentions index
    currentQuestion--;
    //remove last array value;
    score.pop();
    //Generate the question
    generateQuestions(currentQuestion);
}

//Fuction to reset and restart the quiz;
function restartQuiz(e) {
    if(e.target.matches('button')) {
    //reset array index and score
    currentQuestion = 0;
    score = [];
    //Reload quiz to the start
    location.reload();
    }

}


generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click',loadPreviousQuestion);
result.addEventListener('click',restartQuiz);

//end of quIIZZZZ STOP
