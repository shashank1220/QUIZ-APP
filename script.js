const questions = [
    {
        question: "Which of the following colors contain equal amounts of RBG?",
        answers: [
            {text: "White", correct: "false"},
            {text: "Black", correct: "false"},
            {text: "Gray", correct: "false"},
            {text: "All of the above", correct: "true"}
        ]
    },
    {
        question: "What is the effect of the &#60b&#62 tag?",
        answers: [
            {text: "It converts the text within it to bold font.", correct: "true"},
            {text: "It is used to write black-colored font.", correct: "false"},
            {text: "It is used to change the font size.", correct: "false"},
            {text: "None of the above.", correct: "false"}
        ]
    },
    {
        question: "What is the function of the HTML style attribute?",
        answers: [
            {text: "It is used to uniquely identify some specific styles of some elements.", correct: "false"},
            {text: "It is used to add styles to an HTML elements.", correct: "true"},
            {text: "Both A and B.", correct: "false"},
            {text: "Non of the above", correct: "false"}
        ]
    },
    {
        question: "What is the select tag is used for?",
        answers: [
            {text: "Select some attributes and change their style.", correct: "false"},
            {text: "Change text font", correct: "false"},
            {text: "Create the combo box.", correct: "true"},
            {text: "None of the above", correct: "false"}
        ]
    },
    {
        question: "How to display preformatted text in HTML?",
        answers: [
            {text: "&#60pre&#62", correct: "true"},
            {text: "&#60p&#62", correct: "false"},
            {text: "&#60hr&#62", correct: "false"},
            {text: "All of the above", correct: "false"}
        ]
    },
    {
        question: "How to set a font for a whole page?",
        answers: [
            {text: "&#60targetfont&#62", correct: "false"},
            {text: "&#60defaultfont&#62", correct: "true"},
            {text: "&#60font&#62", correct: "false"},
            {text: "None of the above", correct: "false"}
        ]
    },
    {
        question: "HTML files are saved by default with the extension?",
        answers: [
            {text: ".h", correct: "false"},
            {text: ".ht", correct: "false"},
            {text: ".html", correct: "true"},
            {text: "None of the above", correct: "false"}
        ]
    },
    {
        question: "If a background image is smaller than the screen on which it is being displayed, what will occur on the webpage?",
        answers: [
            {text: "The blank space will be shown in black.", correct: "false"},
            {text: "The image will be stretched.", correct: "false"},
            {text: "The image will be repeated.", correct: "true"},
            {text: "The image won't be displayed.", correct: "false"}
        ]
    },
    {
        question: "What are the types of lists available in HTML?",
        answers: [
            {text: "Ordered, Unordered List", correct: "true"},
            {text: "Bulleted, Numbered List", correct: "false"},
            {text: "named, Unnamed List", correct: "false"},
            {text: "None of the above", correct: "false"}
        ]
    },
    {
        question: "What are those objects called which are used for storing data on the client provided by the HTML local storage?",
        answers: [
            {text: "Windows.localStorage", correct: "false"},
            {text: "Window.sessionStorage", correct: "false"},
            {text: "Both A and B", correct: "true"},
            {text: "None of the above", correct: "false"}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answerBtn");
const nextBtn = document.getElementById("nextBtn"); 

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHtml = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtns.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextBtn.style.display = "none";
    nextBtn.innerHTML = "Next";
    while(answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtns.children).forEach(button => {
        if(button.dataset.correct == "true") {
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    showMarks();
    nextBtn.innerHTML = "Try Again";
    nextBtn.style.display = "block";
}

function handleNextbtn() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextbtn();
    }
    else {
        startQuiz();
    }
});

function showMarks() {
    const marks = document.getElementById("marks");
    let totalMarks = questions.length * 10;
    let marksObt = (score * 10 / totalMarks) * 100;
    marks.innerText = `Your Percentile is ${marksObt}%`;
}

startQuiz();