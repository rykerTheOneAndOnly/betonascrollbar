var startBtnEl = document.getElementById("startBtn");
var titleEl = document.getElementById("title");
var racer1El = document.getElementById("racer1");
var racer2El = document.getElementById("racer2");
var racer3El = document.getElementById("racer3");
var racer4El = document.getElementById("racer4");
var racer5El = document.getElementById("racer5");
var racer1SpeedEl = document.getElementById("racer1Speed");
var racer1EnduranceEl = document.getElementById("racer1Endurance");
var racer1LuckEl = document.getElementById("racer1Luck");
var racer2SpeedEl = document.getElementById("racer2Speed");
var racer2EnduranceEl = document.getElementById("racer2Endurance");
var racer2LuckEl = document.getElementById("racer2Luck");
var racer3SpeedEl = document.getElementById("racer3Speed");
var racer3EnduranceEl = document.getElementById("racer3Endurance");
var racer3LuckEl = document.getElementById("racer3Luck");
var racer4SpeedEl = document.getElementById("racer4Speed");
var racer4EnduranceEl = document.getElementById("racer4Endurance");
var racer4LuckEl = document.getElementById("racer4Luck");
var racer5SpeedEl = document.getElementById("racer5Speed");
var racer5EnduranceEl = document.getElementById("racer5Endurance");
var racer5LuckEl = document.getElementById("racer5Luck");
var racerStatsEl = document.getElementById("racerStats");
var statsOpenLinkEl = document.getElementById("statsOpenLink");
var statsCloseLinkEl = document.getElementById("statsCloseLink");
var creditsEl = document.getElementById("credits");
var racerSelectEl = document.getElementById("racerSelect");

"use strict";

var credits = 3;
var racerJump = 1;

class racer1 {};
class racer2 {};
class racer3 {};
class racer4 {};
class racer5 {};

function setRolledStats(racer) {
    var skillsetArea = 45;

    racer.speed = Math.floor(Math.random() * (35 - 15)) + 15;
    skillsetArea -= racer.speed;

    racer.endurance = skillsetArea;

    if (racer.speed >= 25) {
        racer.luck = Math.floor(Math.random() * 2) + 1;
    }
    if (racer.speed < 25) {
        racer.luck = Math.floor(Math.random() * (5 - 3)) + 3;
    }

    if (skillsetArea < 0) {
        console.log("ERROR: skillsetArea is lower than one!");
    }
}

function applyStats() {
    setRolledStats(racer1);
    setRolledStats(racer2);
    setRolledStats(racer3);
    setRolledStats(racer4);
    setRolledStats(racer5);

    racer1SpeedEl.innerHTML = racer1.speed;
    racer1EnduranceEl.innerHTML = racer1.endurance;
    racer1LuckEl.innerHTML = racer1.luck;

    racer2SpeedEl.innerHTML = racer2.speed;
    racer2EnduranceEl.innerHTML = racer2.endurance;
    racer2LuckEl.innerHTML = racer2.luck;

    racer3SpeedEl.innerHTML = racer3.speed;
    racer3EnduranceEl.innerHTML = racer3.endurance;
    racer3LuckEl.innerHTML = racer3.luck;

    racer4SpeedEl.innerHTML = racer4.speed;
    racer4EnduranceEl.innerHTML = racer4.endurance;
    racer4LuckEl.innerHTML = racer4.luck;

    racer5SpeedEl.innerHTML = racer5.speed;
    racer5EnduranceEl.innerHTML = racer5.endurance;
    racer5LuckEl.innerHTML = racer5.luck;
}

applyStats();

function showStats() {
    racerStatsEl.style.display = "revert";
}

statsOpenLinkEl.addEventListener("click", showStats);

function closeStats() {
    racerStatsEl.style.display = "none";
}

statsCloseLinkEl.addEventListener("click", closeStats);

var speedWeighted = 6;
var enduranceWeighted = 4;
var luckWeighted = 900;

function restartGame() {
	location.reload();
}

var gameWon = false;
function gameWin(racerEl) {
    if (!gameWon) {
        if(racerEl.id == "racer1") {
            titleEl.innerHTML = "Racer 1 Wins";
        }
        else if(racerEl.id == "racer2") {
            titleEl.innerHTML = "Racer 2 Wins";
        }
        else if(racerEl.id == "racer3") {
            titleEl.innerHTML = "Racer 3 Wins";
        }
        else if(racerEl.id == "racer4") {
            titleEl.innerHTML = "Racer 4 Wins";
        }
        else if(racerEl.id == "racer5") {
            titleEl.innerHTML = "Racer 5 Wins";
        }	

        startBtnEl.innerHTML = "Race Again";
        startBtnEl.addEventListener("click", restartGame);
        startBtnEl.disabled = false;
        racerSelectEl.disabled = false;
        gameWon = true;
        currentSpeed = 0;
    }
}

function checkForWin(racerEl) {
    if (racerEl.value >= 100) {
        gameWin(racerEl);
        return true;
    }
    if (gameWon) {
        return true;
    }
}

function moveRacer(racer, racerEl) {
    racer.speed -= 50;
    var currentSpeed = Math.abs(racer.speed);

    var moveInterval = setInterval(function() { racerEl.value += racerJump; }, currentSpeed * speedWeighted);

    setTimeout(function() {
        clearInterval(moveInterval);
        currentSpeed = currentSpeed * 2;
        moveInterval = setInterval(function() {
            racerEl.value += racerJump;
            checkForWin(racerEl);
        }, currentSpeed * speedWeighted);
        setTimeout(function() {
            clearInterval(moveInterval);
            currentSpeed = currentSpeed / (racer.luck / 2);
            moveInterval = setInterval(function() {
                racerEl.value += racerJump;
                checkForWin(racerEl);
            }, currentSpeed * speedWeighted);
            setTimeout(function() {
                clearInterval(moveInterval);
                currentSpeed = currentSpeed * (racer.luck / 2);
                moveInterval = setInterval(function() {
                    racerEl.value += racerJump;
                    checkForWin(racerEl);
                }, currentSpeed * speedWeighted);
            }, racer.luck * (luckWeighted * 1.5));
        }, racer.luck * luckWeighted);
    }, (racer.endurance * luckWeighted) / enduranceWeighted);
}

function startRace() {
    if(!gameWon) {
        credits--;
    }

    racerSelectEl.disabled = true;
    startBtnEl.disabled = true;

    moveRacer(racer1, racer1El);
    moveRacer(racer2, racer2El);   
    moveRacer(racer3, racer3El);   
    moveRacer(racer4, racer4El);   
    moveRacer(racer5, racer5El);

    racerJump = 1
}

startBtnEl.addEventListener("click", startRace);