currentPage = 0;
pagesIdList = ["welcome", "q1", "q2", "q3"];
pagesLabelList = ["Question 1", "Question 2", "Question 3"];

function startPlanner() {
    nextQuestion();
}

function nextQuestion() {
    currentPage++;
    setQuestionVisible();
}

function previousQuestion() {
    currentPage--;
    setQuestionVisible();
}

function setQuestionVisible() {
    screenDivs = document.getElementsByClassName("screen");
    
    for (var i = 0; i < screenDivs.length; i++) {
        screenDivs[i].classList.add("hidden");
    }

    document.getElementById(pagesIdList[currentPage]).classList.remove("hidden");

    if (currentPage != 0) {
        document.getElementById("progress-area").classList.remove("hidden");
        document.getElementById("bar-inside").style.width = 100 / (screenDivs.length - 1) * (currentPage - 1) + "%";
        document.getElementById("step-label").innerText = pagesLabelList[currentPage - 1];
    } else {
        document.getElementById("progress-area").classList.add("hidden");
    }
}