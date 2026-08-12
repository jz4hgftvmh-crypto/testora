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
    question: "What would ONE unit cost to make?",
    options: [
        "$5",
        "$20",
        "$50",
        "$100"
    ]
},
{
    question: "What price could customers pay?",
    options: [
        "$10",
        "$50",
        "$100",
        "$200"
    ]
},
{
    question: "How many units could you sell per month?",
    options: [
        "10",
        "50",
        "100",
        "500"
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

   showResults();
    }

});
function showResults() {

    optionsContainer.innerHTML = "";

    questionTitle.textContent = "Your Financial Estimate";

    questionNumber.textContent = "Analysis Complete";

    nextButton.style.display = "none";


    const unitCost = Number(
        answers[answers.length - 3].replace("$", "")
    );

    const sellingPrice = Number(
        answers[answers.length - 2].replace("$", "")
    );

    const monthlySales = Number(
        answers[answers.length - 1]
    );


    const revenue = sellingPrice * monthlySales;

    const cost = unitCost * monthlySales;

    const profit = revenue - cost;


    const result = document.createElement("div");

    result.className = "result-message";

    result.innerHTML = `
        <h3>Estimated Monthly Results</h3>

        <p>
            Estimated Revenue:
            <strong>$${revenue.toLocaleString()}</strong>
        </p>

        <p>
            Estimated Cost:
            <strong>$${cost.toLocaleString()}</strong>
        </p>

        <p>
            Estimated Gross Profit:
            <strong>$${profit.toLocaleString()}</strong>
        </p>
    `;

    optionsContainer.appendChild(result);
}

showQuestion();