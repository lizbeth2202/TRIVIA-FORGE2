let nombre = prompt('¿Cual es tu nombre?')
const texto = document.getElementById('nombre')
const textoNuevo = document.createTextNode(', ' + nombre)
texto.appendChild(textoNuevo)

const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const choiceE = document.getElementById("E");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

//...........................

let questions = [
    {
        question: "HTML es un lenguaje de...",
        imgSrc: "img/html.png",
        choiceA: "Marcado",
        choiceB: "Programacion",
        choiceC: "Comunicacion",
        choiceD: "Señas",
        choiceE: "A y B",
        correct: "A"
    }, {
        question: "CSS es un lenguaje de ",
        imgSrc: "img/css.png",
        choiceA: "Programacion",
        choiceB: "Estilos",
        choiceC: "Señas",
        choiceD: "Ondas electromagnéticas",
        choiceE: "A y B",
        correct: "B"
    }, {
        question: "JavaScript: ¿Quien y cuando fue creado? ",
        imgSrc: "img/js.png",
        choiceA: "Microsoft in 1990",
        choiceB: "Apple in 1976",
        choiceC: "Netscape in 1995 ",
        choiceD: "Sun Microsystems in 1995",
        choiceE: "Google in 2005",
        correct: "C"
    }, {
        question: "HTML: Que etiqueta se utiliza para dar un salto de linea ",
        imgSrc: "img/html.png",
        choiceA: " < break >",
        choiceB: " < lbr >",
        choiceC: " < lnbr >",
        choiceD: " < br >",
        choiceE: " < ln >",
        correct: "D"
    }, {
        question: "Cual propiedad es usado para cambiar el color de fondo?",
        imgSrc: "img/css.png",
        choiceA: "bgcolor",
        choiceB: "color",
        choiceC: "background-img",
        choiceD: "bg-color",
        choiceE: "background-color",
        correct: "E"
    }
];

//.................

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

//................

function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
    choiceE.innerHTML = q.choiceE;
}
start.addEventListener("click", startQuiz);

//........................

function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

//........................

function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

//...........................

function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        // change progress color to red
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

//.............................

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    } else {
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

//........................

function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

//.......................

function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

//...........................

function scoreRender() {
    scoreDiv.style.display = "block";

    const scorePerCent = Math.round(100 * score / questions.length);

    let img = (scorePerCent >= 80) ? "img/5.png" :
        (scorePerCent >= 60) ? "img/4.png" :
            (scorePerCent >= 40) ? "img/3.png" :
                (scorePerCent >= 20) ? "img/2.png" :
                    "img/1.png";

    scoreDiv.innerHTML = "<img src=" + img + ">";
    scoreDiv.innerHTML += "<p>" + score + " de 5 </p>";
}

