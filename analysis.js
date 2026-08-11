const questions = [
    {
        question: "What type of idea are you working on?",
        options: [
            "Business",
            "Scientific",
            "Engineering",
            "Technology"
        ]
    },
    {
        question: "What problem does your idea solve?",
        options: [
            "Saves time",
            "Reduces cost",
            "Improves safety",
            "Solves a common problem"
        ]
    },
    {
        question: "Who is your target user?",
        options: [
            "Students",
            "Businesses",
            "Families",
            "General public"
        ]
    },
    {
        question: "How difficult would it be to build your idea?",
        options: [
            "Easy",
            "Moderate",
            "Difficult",
            "Very difficult"
        ]
    },
    {
        question: "What resources do you need?",
        options: [
            "Low resources",
            "Moderate resources",
            "Many resources",
            "Not sure"
        ]
    }
];

let currentQuestion = 0;
let answers = [];

const questionNumber = document.querySelector(".question-number");
const questionTitle = document.querySelector(".question-card h2");
const optionsContainer = document.querySelector(".options");
const nextButton = document.querySelector(".next-button");

function showQuestion() {

const question = questions[currentQuestion];

questionNumber.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

questionTitle.textContent = question.question;

optionsContainer.innerHTML = "";

    question.options.forEach(function(option) {

        const button = document.createElement("button");

        button.className = "option";
        button.textContent = option;

        button.addEventListener("click", function() {

            document.querySelectorAll(".option").forEach(function(btn) {
                btn.classList.remove("selected");
            });

            button.classList.add("selected");

            button.dataset.selected = "true";
        });

        optionsContainer.appendChild(button);
    });

    if (currentQuestion === questions.length - 1) {
        nextButton.textContent = "Analyze My Idea";
    } else {
        nextButton.textContent = "Next";
    }
}


nextButton.addEventListener("click", function() {

    const selected = document.querySelector(".option.selected");

    if (!selected) {
        alert("Please select an answer.");
        return;
    }

    answers.push(selected.textContent);

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    } else {

        console.log("User answers:", answers);

        alert("Your answers are ready for AI analysis!");
    }
});


showQuestion();