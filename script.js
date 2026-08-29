currentPage = 0;
pagesIdList = ["welcome", "q1", "q2", "q3", "q4", "q5", "q6", "results"];
pagesLabelList = ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5", "Question 6", "Results!"];

date = null;
place = "No option selected!";
food = "No option selected!";
activity = "No option selected!";
notes = null;

function startPlanner() {
    nextQuestion();
}

function finishPlanner() {
    nextQuestion();
}

function restartPlanner() {
    currentPage = 0;

    place = "No option selected!";
    food = "No option selected!";
    activity = "No option selected!";

    // clear the green highlights and the Other boxes
    subjectsToId = {"place": "q3", "food": "q4", "activity": "q5"};
    for (var subject in subjectsToId) {
        optionDivs = document.getElementById(subjectsToId[subject]).getElementsByClassName("option");
        for (var i = 0; i < optionDivs.length; i++) {
            optionDivs[i].classList.remove("picked");
        }
        document.getElementById(subject + "-other-input").value = "";
        document.getElementById(subject + "-other-input").classList.add("hidden");
    }

    document.getElementById("date-input").value = "";
    document.getElementById("start-time-input").value = "09:00";
    document.getElementById("notes-input").value = "";

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

    if (currentPage == 7) {
        generateResultsScreen();
    }
}

function pickPlace(element, label) {
    document.getElementById("place-other-input").classList.add("hidden");
    document.getElementById("place-other-input").value = "";
    place = label;

    optionDivs = document.getElementById("q3").getElementsByClassName("option");
    for (var i = 0; i < optionDivs.length; i++) {
        optionDivs[i].classList.remove("picked");
    }
    element.classList.add("picked");
}

function pickFood(element, label) {
    document.getElementById("food-other-input").classList.add("hidden");
    document.getElementById("place-other-input").value = "";
    food = label;

    optionDivs = document.getElementById("q4").getElementsByClassName("option");
    for (var i = 0; i < optionDivs.length; i++) {
        optionDivs[i].classList.remove("picked");
    }
    element.classList.add("picked");
}

function pickActivity(element, label) {
    document.getElementById("activity-other-input").classList.add("hidden");
    document.getElementById("place-other-input").value = "";
    activity = label;

    optionDivs = document.getElementById("q5").getElementsByClassName("option");
    for (var i = 0; i < optionDivs.length; i++) {
        optionDivs[i].classList.remove("picked");
    }
    element.classList.add("picked");
}

function pickOther(subject) {
    document.getElementById(subject + "-other-input").classList.remove("hidden");

    subjectsToId = {"place": "q3", "food": "q4", "activity": "q5"};
    optionDivs = document.getElementById(subjectsToId[subject]).getElementsByClassName("option");
    for (var i = 0; i < optionDivs.length; i++) {
        optionDivs[i].classList.remove("picked");
    }
    document.getElementById(subject + "-other").classList.add("picked");
}

function typedOther(subject) {
    switch (subject) {
        case "place":
            place = document.getElementById("place-other-input").value;
            break;
        case "food":
            food = document.getElementById("food-other-input").value;
            break;
        case "activity":
            activity = document.getElementById("activity-other-input").value;
            break;
    }
    
}

function generateResultsScreen() {
    // date + time line at the top
    dateValue = document.getElementById("date-input").value;
    timeValue = document.getElementById("start-time-input").value;

    if (dateValue == "") {
        document.getElementById("results-date").innerText = "no date picked";
    } else {
        date = new Date(dateValue + "T" + timeValue);
        document.getElementById("results-date").innerText = date.toLocaleString();
    }

    document.getElementById("results-place").innerText = place;
    document.getElementById("results-food").innerText = food;
    document.getElementById("results-activities").innerText = activity;

    // what to bring
    stuffToBring = "Phone\nWallet\nKeys\n";

    placeSpecificItems = {
        "Amusement park 🎢": "Tickets\nCash for snacks\n",
        "Park 🏞️": "Picnic blanket\n",
        "Travel 🗺️": "Luggage\nPassport\n",
        "Stay home 🏚️": "Comfy blanket\n",
        "Friend\u2019s house 🏘️": "Games\n"
    };

    activitySpecificItems = {
        "Ziplining 🪡": "Closed-toe shoes\n",
        "Swimming 🏊": "Swimsuit\nTowel\n",
        "Skydiving 🪂": "Closed-toe shoes\n",
        "Skiing ⛷️": "Warm jacket\nGoggles\nGloves\n",
        "Hiking 🥾": "Hiking shoes\nSnacks\n",
        "Banana boating 🍌🚣": "Swimsuit\nTowel\n"
    };

    if (placeSpecificItems[place]) {
        stuffToBring = stuffToBring + placeSpecificItems[place];
    }
    if (activitySpecificItems[activity]) {
        stuffToBring = stuffToBring + activitySpecificItems[activity];
    }

    // put each item on the page as its own box
    itemList = stuffToBring.trim().split("\n");
    bringArea = document.getElementById("results-bring");
    bringArea.innerHTML = "";

    for (var i = 0; i < itemList.length; i++) {
        itemBox = document.createElement("p");
        itemBox.className = "tip";
        itemBox.innerText = itemList[i];
        bringArea.appendChild(itemBox);
    }

    if (document.getElementById("notes-input").value == "") {
        document.getElementById("notes-area").classList.add("hidden");
    } else {
        document.getElementById("results-notes").innerText = document.getElementById("notes-input").value;
        document.getElementById("notes-area").classList.remove("hidden");
    }
}