formatMoney(profit);


    answersList.innerHTML = "";


    questions.forEach(function(question, index) {

        const item =
            document.createElement("div");

        item.className = "answer-item";


        const questionElement =
            document.createElement("strong");

        questionElement.textContent =
            question.question;


        const answerElement =
            document.createElement("span");

        answerElement.textContent =
            answers[index];


        item.appendChild(questionElement);

        item.appendChild(answerElement);

        answersList.appendChild(item);

    });
{

    questionCard.style.display = "none";

    resultsCard.classList.add("show");

}


function formatMoney(number) {

    return "$" + number.toLocaleString();

}


restartButton.addEventListener("click", function() {

    currentQuestion = 0;

    answers = new Array(questions.length);

    resultsCard.classList.remove("show");

    questionCard.style.display = "block";

    showQuestion();

});


showQuestion();