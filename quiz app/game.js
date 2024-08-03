const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

const MAX_QUESTIONS = 15;  // Define the number of questions
const CORRECT_BONUS = 10; // Define the score for a correct answer

let questions = [
    {
        "question": "What is sustainable development?",
        "choice1": "Development that meets the needs of the present without compromising the ability of future generations to meet their own needs.",
        "choice2": "Development that only focuses on economic growth.",
        "choice3": "Development that ignores environmental impacts.",
        "choice4": "Development that only benefits developed countries.",
        "answer": 1
    },
    {
        "question": "Which of the following is a renewable energy source?",
        "choice1": "Coal",
        "choice2": "Natural Gas",
        "choice3": "Solar Energy",
        "choice4": "Nuclear Energy",
        "answer": 3
    },
    {
        "question": "What does the term 'carbon footprint' refer to?",
        "choice1": "The number of carbon atoms in the atmosphere",
        "choice2": "The total amount of greenhouse gases emitted by human activities",
        "choice3": "The size of a carbon molecule",
        "choice4": "The weight of carbon in a tree",
        "answer": 2
    },
    {
        "question": "Which international agreement aims to reduce carbon dioxide emissions and the presence of greenhouse gases?",
        "choice1": "Kyoto Protocol",
        "choice2": "Montreal Protocol",
        "choice3": "Paris Agreement",
        "choice4": "Basel Convention",
        "answer": 3
    },
    {
        "question": "What is the main goal of the Paris Agreement?",
        "choice1": "To end poverty worldwide",
        "choice2": "To improve global health",
        "choice3": "To limit global warming to below 2 degrees Celsius compared to pre-industrial levels",
        "choice4": "To promote free trade",
        "answer": 3
    },
    {
        "question": "Which of the following is not a pillar of sustainability?",
        "choice1": "Economic",
        "choice2": "Social",
        "choice3": "Environmental",
        "choice4": "Technological",
        "answer": 4
    },
    {
        "question": "What does the term 'greenwashing' refer to?",
        "choice1": "The practice of making an unsubstantiated or misleading claim about the environmental benefits of a product, service, technology or company practice",
        "choice2": "A process to clean industrial waste",
        "choice3": "A new method of recycling",
        "choice4": "An agricultural practice to increase crop yield",
        "answer": 1
    },
    {
        "question": "Which sector is the largest contributor to global greenhouse gas emissions?",
        "choice1": "Transportation",
        "choice2": "Industry",
        "choice3": "Agriculture",
        "choice4": "Energy production",
        "answer": 4
    },
    {
        "question": "What is the purpose of the Sustainable Development Goals (SDGs)?",
        "choice1": "To provide a global framework for achieving a better and more sustainable future for all",
        "choice2": "To regulate international trade",
        "choice3": "To enhance military cooperation between countries",
        "choice4": "To promote tourism globally",
        "answer": 1
    },
    {
        "question": "Which SDG focuses on clean water and sanitation?",
        "choice1": "SDG 2",
        "choice2": "SDG 3",
        "choice3": "SDG 6",
        "choice4": "SDG 7",
        "answer": 3
    },
    {
        "question": "What is the primary cause of ocean acidification?",
        "choice1": "Deforestation",
        "choice2": "Increased CO2 emissions",
        "choice3": "Oil spills",
        "choice4": "Plastic pollution",
        "answer": 2
    },
    {
        "question": "Which of the following best describes 'biodiversity'?",
        "choice1": "The variety of plant and animal life in a particular habitat",
        "choice2": "The study of ecosystems",
        "choice3": "The process of energy flow in an ecosystem",
        "choice4": "The practice of agriculture",
        "answer": 1
    },
    {
        "question": "Which organization released the Brundtland Report?",
        "choice1": "United Nations",
        "choice2": "World Bank",
        "choice3": "International Monetary Fund",
        "choice4": "World Trade Organization",
        "answer": 1
    },
    {
        "question": "What is the main focus of SDG 13?",
        "choice1": "Life on land",
        "choice2": "Life below water",
        "choice3": "Climate action",
        "choice4": "Affordable and clean energy",
        "answer": 3
    },
    {
        "question": "What does the term 'greenwashing' refer to?",
        "choice1": "The practice of making an unsubstantiated or misleading claim about the environmental benefits of a product, service, technology or company practice",
        "choice2": "A process to clean industrial waste",
        "choice3": "A new method of recycling",
        "choice4": "An agricultural practice to increase crop yield",
        "answer": 1
    }
];

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    console.log("Game started");
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
    console.log("New question loaded");
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
    console.log("Score incremented");
};

// Start the game once the DOM is fully loaded
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    startGame();
});
