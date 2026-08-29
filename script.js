currentPage = 0;
pagesIdList = ["welcome", "q1", "q2", "q3", "q4", "q5", "q6", "results"];
pagesLabelList = ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5", "Question 6", "Results!"];

date = null;
place = null;
food = null;
activity = null;
notes = null;

function startPlanner() {
    nextQuestion();
}

function finishPlanner() {
    nextQuestion();
}

function restartPlanner() {
    currentPage = 0;
    setQuestionVisible();
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
        document.getElementById("bar-inside").style.width = 100 / (screenDivs.length - 2) * (currentPage - 1) + "%";
        document.getElementById("step-label").innerText = pagesLabelList[currentPage - 1];
    } else {
        document.getElementById("progress-area").classList.add("hidden");
    }

    /* UNFINISHED
    date = new Date(document.getElementById("date-input").value + "T" + document.getElementById("time-input").value);
    console.log(document.getElementById("date-input").value);

    document.getElementById("results-date").innerText = date.toLocaleString(); */
}

function pickPlace(element, label) {
    document.getElementById("place-other-input").classList.add("hidden");
    placeObject = {};
    place = placeObject[label];
}

function pickOther(ummTestIguessidk) {
    document.getElementById("place-other-input").classList.remove("hidden");
}