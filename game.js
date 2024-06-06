
buttonColors = ["red", "blue", "yellow", "green"];
gamePattern = [];
userClickedPattern = [];
var level = 0;
var started = false;


console.log("hihiun");
function nextSequence(){
    
    level++;
    $("#level-title").text("Level " + level);
    userClickedPattern = [];

    randomno = Math.floor((Math.random()) * 4);
    randomChosenColor = buttonColors[randomno];

    gamePattern.push(randomChosenColor);

    // $("#" + randomChosenColor).fadeOut().fadeIn();
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    game(userChosenColour);
});

function game(userChosenColour){
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
}
var playerChosenColor;

$(document).keydown(function(event){
    console.log(event.key); 
    if(started){
        switch(event.key){
            case "q":
                playerChosenColor = $(".q").attr("id");
                game(playerChosenColor);
            break;

            case "w":
                playerChosenColor = $(".w").attr("id");
                game(playerChosenColor);
            break;

            case "a":
                playerChosenColor = $(".a").attr("id");
                game(playerChosenColor);
            break;

            case "s":
                playerChosenColor = $(".s").attr("id");
                game(playerChosenColor);
            break;

            default: console.log(this.innerHTML);
        }
    }
});

function playSound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(color){
    $("#" + color).addClass("pressed");

    setTimeout(function(){
        $("#" + color).removeClass("pressed")
    }, 100);
}

// $(document).keydown(function(){
//     if(!started){
//         $("#level-title").text("Level 0");
//         nextSequence();
//         started = true;
//     }
// });
$("h1").click(function(){
    if(!started){
        $("#level-title").text("Level 0");
        nextSequence();
        started = true;
    }
});
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel])
        console.log("success");
    else{
        console.log("failed");
        
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);        

        $("#level-title").text("Game Over, Click here to restart!");

        startOver();
    }
    if(currentLevel == gamePattern.length - 1){
        setTimeout(function(){
            nextSequence();
        }, 1000);
    }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}