const questions = [
    {
        question: "What are you trying to create?",
        options: [
            "Physical product",
            "Software / App",
            "Scientific experiment",
            "Engineering system"
        ]
    },
    {
        question: "What problem does your idea solve?",
        options: [
            "Saves time",
            "Reduces cost",
            "Improves safety",
            "Reduces waste"
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
        question: "What technology does your idea use?",
        options: [
            "AI",
            "Sensors",
            "Renewable energy",
            "Software",
            "Mechanical system"
        ]
    },
    {
        question: "What does your idea need?",
        options: [
            "Electricity",
            "Water",
            "Materials",
            "Data"
        ]
    },
    {
        question: "What is your biggest challenge?",
        options: [
            "Technical difficulty",
            "Cost",
            "Materials",
            "Safety"
        ]
    },
    {
        question: "What stage is your idea at?",
        options: [
            "Just an idea",
            "Basic design",
            "Prototype",
            "Already tested"
        ]
    },
    {
        question: "What is your starting budget?",
        options: [
            "Under $100",
            "$100 - $500",
            "$500 - $1,000",
            "Over $1,000"
        ]
    },
    {
        question: "What would ONE unit cost?",
        options: [
            "Under $5",
            "$5 - $20",
            "$20 - $50",
            "Over $50"
        ]
    },
    {
        question: "What price could customers pay?",
        options: [
            "Under $10",
            "$10 - $50",
            "$50 - $100",
            "Over $100"
        ]
    },
    {
        question: "How many units could you sell per month?",
        options: [
            "1 - 10",
            "11 - 50",
            "51 - 100",
            "Over 100"
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
        "Question " + (currentQuestion + 1) +
        " of " + questions.length;

    questionTitle.textContent = question.question;

    optionsContainer.innerHTML = "";

    question.options.forEach(function(option) {

        const button = document.createElement("button");

        button.className = "option";
        button.textContent = option;
        button.type = "button";

        button.addEventListener("click", function() {

            document.querySelectorAll(".option").forEach(function(item) {
                item.classList.remove("selected");
            });

            button.classList.add("selected");

            answers[currentQuestion] = option;

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

    if (!answers[currentQuestion]) {
        alert("Please select an answer first.");
        return;
    }

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    } else {

        console.log("All answers:", answers);

        alert("Analysis completed!");
    }

});


showQuestion();