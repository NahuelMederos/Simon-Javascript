var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;


function playSound(name){
    var colorAudio = new Audio("sounds/" + name +".mp3");
    colorAudio.play();
}
function animatePress(currentColour ){
    $("#"+currentColour).addClass('pressed');
    setTimeout(function() {
        $("#"+currentColour).removeClass('pressed');
    },100);
}
    
function nextSequence(){
    userClickedPattern = [];
    $(".start").hide();
    $("h1").text("Level "+ level);
    var randomNumber = (Math.floor(Math.random() * 4)); 

    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if(currentLevel == (gamePattern.length - 1)){
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        playSound("wrong");
        $("h1").text("Game Over");
        $(".start").show();
        startOver();
}

}

$(".btn").on("click ",function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

$(".start").on("click ",function(){
    if(gameStarted == false){
        nextSequence();
        gameStarted = true;
    }
});

function startOver(){
    gamePattern = [];
    level = 0;
    gameStarted = false;
}

