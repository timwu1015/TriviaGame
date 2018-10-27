var questions = [
    { q: "How many computer languages are in use?", a1: "50", a2: "20", a3: "2000", a4: "5000", acorrect : "2000"},
    { q: "which of these is not an early computer?", a1: "NASA", a2: "ENIAC", a3: "UNIVAC", a4: "SAGE", acorrect : "NASA"},
    { q: "who founded Apple Computer?", a1: "Stephen Fry", a2: "Steve Jobs", a3: "Stephen Hawking", a4: "Bill Gates", acorrect : "Steve Jobs"},
    { q: "What does the internet prefix WWW stand for?", a1: "Western Washington World", a2: "Wide Width Wickets", a3: "World Wide Web", a4: "Worldwide Weather", acorrect : "World Wide Web"}  
];

var questionindex = 0;
var correct = 0;
var incorrect = 0;
var noanswer = 0;
var number = 10; 
var intervalID; 
var windowTimeout;

function decrement() {
    number--;
    
    $("#timer").text("Time remaining: " + number + " seconds");

    if (number === 0) {
        stop();
        $("#content").empty();

        var timeoutmeg = $("<p>").text("Out of time!");
        $("#content").append(timeoutmeg);
        
        var correctanw = $("<p>").text("The correct answer is " + questions[questionindex].acorrect);
        $("#content").append(correctanw);

        questionindex++;
        noanswer++;
        number = 10;

        setTimeout(renderQuestion, 3000);
        windowTimeout = setTimeout(run, 3000);  
    }
}

function run() {
    $("#timer").text("Time remaining: " + number + " seconds");
    intervalID = setInterval(decrement, 1000);
}

function stop() {
    clearInterval(intervalID);
}

function renderQuestion() {
    $("#content").empty();

    if (questionindex <= (questions.length -1)) {
        var question = $("<h3>");
        question.text(questions[questionindex].q);
        $("#content").append(question);

        var answer1 = $("<p>");
        answer1.addClass("answer");
        answer1.attr("data-value", questions[questionindex].a1);
        answer1.text(questions[questionindex].a1);
        $("#content").append(answer1);

        var answer2 = $("<p>");
        answer2.addClass("answer");
        answer2.attr("data-value", questions[questionindex].a2);
        answer2.text(questions[questionindex].a2);
        $("#content").append(answer2);

        var answer3 = $("<p>");
        answer3.addClass("answer");
        answer3.attr("data-value", questions[questionindex].a3);
        answer3.text(questions[questionindex].a3);
        $("#content").append(answer3);

        var answer4 = $("<p>");
        answer4.addClass("answer");
        answer4.attr("data-value", questions[questionindex].a4);
        answer4.text(questions[questionindex].a4);
        $("#content").append(answer4);
    }
    else {
        $("#content").empty(); 

        var alldone = $("<h3>").text("All done, here is how you did!");
        $("#content").append(alldone);

        var correctstat = $("<p>").text("Correct Answers: " + correct);
        $("#content").append(correctstat);

        var wrongstat = $("<p>").text("Wrong Answers: " + incorrect);
        $("#content").append(wrongstat);

        var unanswered = $("<p>").text("Unanswered: " + noanswer);
        $("#content").append(unanswered);

        var startOver = $("<button>");
        startOver.text("Restart?");
        startOver.addClass("button");
        $("#content").append(startOver);

        clearTimeout(windowTimeout);
        reset();
        
    }
}

function reset () {
    questionindex = 0;
    correct = 0;
    incorrect = 0;
    noanswer = 0;
    number = 10; 
}

$(document).on("click", ".button", function() {
    $(".button").hide();
    run();
    renderQuestion();
});


$(document).on("click", ".answer", function() {
    stop();
    var select = $(this).attr("data-value");
    if (select === questions[questionindex].acorrect) {
        $("#content").empty();

        var correctmeg = $("<h3>").text("Yep!");
        $("#content").append(correctmeg);
        
        var correctanw = $("<p>").text("The correct answer is " + questions[questionindex].acorrect);
        $("#content").append(correctanw);

        questionindex++;
        correct++;
        number = 10;

        setTimeout(renderQuestion, 3000);
        windowTimeout = setTimeout(run, 3000);
    }
    else {
        $("#content").empty();

        var wrongmeg = $("<h3>").text("Nope!");
        $("#content").append(wrongmeg);
        
        var correctanw = $("<p>").text("The correct answer is " + questions[questionindex].acorrect);
        $("#content").append(correctanw);

        questionindex++;
        incorrect++;
        number = 10;

        setTimeout(renderQuestion, 3000);
        windowTimeout = setTimeout(run, 3000);
    }
});

