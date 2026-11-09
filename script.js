
const questions = [
    {
        name: "Sher",
        image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600",
        answers: ["Sher", "Yo‘lbars", "Bo‘ri", "Tulki"],
        correct: 0
    },
    {
        name: "Fil",
        image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600",
        answers: ["Jirafa", "Fil", "Ayiq", "Ot"],
        correct: 1
    },
    {
        name: "Yo‘lbars",
        image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600",
        answers: ["Sher", "Mushuk", "Yo‘lbars", "Bo‘ri"],
        correct: 2
    },
    {
        name: "Panda",
        image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=600",
        answers: ["Koala", "Panda", "Ayiq", "Maymun"],
        correct: 1
    },
    {
        name: "Jirafa",
        image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=600",
        answers: ["Jirafa", "Zebra", "Tuya", "Ot"],
        correct: 0
    },
    {
        name: "Maymun",
        image: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=600",
        answers: ["Koala", "Lemur", "Maymun", "Panda"],
        correct: 2
    },
    {
        name: "Zebra",
        image: "https://images.unsplash.com/photo-1501706362039-c06b2d715385?w=600",
        answers: ["Ot", "Zebra", "Eshak", "Jirafa"],
        correct: 1
    },
    {
        name: "Tulki",
        image: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=600",
        answers: ["Bo‘ri", "It", "Tulki", "Sher"],
        correct: 2
    },
    {
        name: "Koala",
        image: "https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?w=600",
        answers: ["Panda", "Koala", "Maymun", "Ayiq"],
        correct: 1
    },
    {
        name: "Fil",
        image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600",
        answers: ["Fil", "Karkidon", "Begemot", "Jirafa"],
        correct: 0
    }
];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const nameInput = document.getElementById("player-name");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionNumber = document.getElementById("question-number");
const scoreText = document.getElementById("score");
const mistakesText = document.getElementById("mistakes");
const progressBar = document.getElementById("progress-bar");

const animalImage = document.getElementById("animal-image");
const answersBox = document.getElementById("answers");
const feedback = document.getElementById("feedback");

let playerName = "";
let currentQuestion = 0;
let score = 0;
let mistakes = 0;
let answered = false;

startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartGame);

function startGame() {
    playerName = nameInput.value.trim();

    if (!playerName) {
        alert("Iltimos, ismingizni kiriting!");
        return;
    }

    currentQuestion = 0;
    score = 0;
    mistakes = 0;

    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();
}

function showQuestion() {
    answered = false;

    const q = questions[currentQuestion];

    questionNumber.textContent =
        `Savol: ${currentQuestion + 1}/${questions.length}`;

    scoreText.textContent = `⭐ Ball: ${score}`;
    mistakesText.textContent = `❌ Xato: ${mistakes}`;

    progressBar.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    animalImage.src = q.image;
    animalImage.alt = "Hayvon rasmi";

    answersBox.innerHTML = "";
    feedback.textContent = "";
    nextBtn.disabled = true;

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.className = "answer-btn";
        button.textContent =
            `${String.fromCharCode(65 + index)}. ${answer}`;

        button.addEventListener("click", () => {
            checkAnswer(index, button);
        });

        answersBox.appendChild(button);
    });
}

function checkAnswer(selectedIndex, selectedButton) {
    if (answered) return;

    answered = true;

    const correctIndex = questions[currentQuestion].correct;
    const buttons = answersBox.querySelectorAll("button");

    buttons.forEach(button => {
        button.disabled = true;
    });

    if (selectedIndex === correctIndex) {
        score++;
        selectedButton.classList.add("correct");
        feedback.textContent = "✅ To‘g‘ri! Barakalla!";
    } else {
        mistakes++;
        selectedButton.classList.add("wrong");
        buttons[correctIndex].classList.add("correct");

        feedback.textContent =
            `❌ To‘g‘ri javob: ${questions[currentQuestion].name}`;
    }

    scoreText.textContent = `⭐ Ball: ${score}`;
    mistakesText.textContent = `❌ Xato: ${mistakes}`;

    nextBtn.disabled = false;

    if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = "Natijani ko‘rish 🏆";
    }
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        nextBtn.textContent = "Keyingi savol ➜";
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    document.getElementById("result-name").textContent =
        `Ishtirokchi: ${playerName}`;

    document.getElementById("final-score").textContent =
        `⭐ Ball: ${score}/${questions.length}`;

    document.getElementById("final-mistakes").textContent =
        `❌ Xatolar: ${mistakes}`;

    let message = "";

    if (score === 10) {
        message = "🏆 Ajoyib! Siz hayvonlar bilimdonisiz!";
    } else if (score >= 8) {
        message = "👏 Juda yaxshi natija!";
    } else if (score >= 5) {
        message = "👍 Yaxshi! Yana mashq qiling!";
    } else {
        message = "💪 Harakatda davom eting!";
    }

    document.getElementById("final-message").textContent = message;
    progressBar.style.width = "100%";
}

function restartGame() {
    resultScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");

    nameInput.value = "";
    nextBtn.textContent = "Keyingi savol ➜";
}
