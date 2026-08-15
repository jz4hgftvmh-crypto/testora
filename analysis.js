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
async function showResults() {

    optionsContainer.innerHTML = "";

    questionTitle.textContent = "Analyzing Your Idea...";

    questionNumber.textContent = "Please wait";

    nextButton.style.display = "none";


    // آخر 3 إجابات خاصة بالحسابات المالية
    const unitCost = Number(
        answers[answers.length - 3].replace("$", "").replace(",", "")
    );

    const sellingPrice = Number(
        answers[answers.length - 2].replace("$", "").replace(",", "")
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

        <hr>

        <h3>AI Analysis</h3>

        <p id="ai-analysis">
            Analyzing your idea...
        </p>
    `;

    optionsContainer.appendChild(result);


    // نجمع الأسئلة ويا الإجابات
    const ideaData = questions.map(function(question, index) {

        return `${question.question}
Answer: ${answers[index]}`;

    }).join("\n\n");


    const message = `
Analyze this project idea based on the user's answers.

${ideaData}

Financial Estimate:
Monthly Revenue: $${revenue}
Monthly Cost: $${cost}
Monthly Gross Profit: $${profit}

Give a clear and simple analysis containing:

1. Idea Summary
2. Strengths
3. Possible Challenges
4. Financial Feasibility
5. Suggestions for Improvement
6. Final Evaluation

Keep the answer concise and understandable.
`;


    try {

        const response = await fetch("http://localhost:3000/ask", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });


        const data = await response.json();

        document.getElementById("ai-analysis").textContent =
            data.answer;

        questionTitle.textContent = "Your Idea Analysis";

        questionNumber.textContent = "Analysis Complete";


    } catch (error) {

        console.error(error);

        document.getElementById("ai-analysis").textContent =
            "Could not connect to the AI server.";

        questionTitle.textContent = "Analysis Error";

    }
}

showQuestion();