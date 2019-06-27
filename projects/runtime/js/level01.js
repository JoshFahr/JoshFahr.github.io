var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1,
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:300,y:340},
                {type: 'sawblade',x:600,y:410},
                {type: 'sawblade',x:400,y:385},
                {type: 'spikes',x:700,y:200},
                {type: 'enemy',x:800,y:400},
                {type: 'enemy',x:1200,y:400},
                {type: 'trophy',x:1500,y:390},
                {type: 'sawblade',x:800,y:410},
                {type: 'sawblade',x:1300,y:350}
                
                

            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);
        
        for (var i = 0; i < levelData.gameItems.length; i++) {
            var gameItem = levelData.gameItems[i];
            if ("sawblade" === gameItem.type){
                createSawBlade(gameItem.x, gameItem.y);
            }
            if ("enemy" === gameItem.type){
                createEnemy(gameItem.x, gameItem.y);
            }
            if ("trophy" === gameItem.type){
                createTrophy(gameItem.x, gameItem.y);
            }
             // Create a sawblade using the .x and .y property of each game item object
        }
        
        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize, damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            var obstacleImage = draw.bitmap('img/sawblade.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -hitZoneSize;
            obstacleImage.y = -hitZoneSize;
        
        }
        
        function createSpikes(x,y){
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var mySpikes = game.createObstacle(hitZoneSize, damageFromObstacle);
            mySpikes.x = x;
            mySpikes.y = y;
            game.addGameItem(mySpikes);
            var obstacleImage = draw.bitmap('img/spikes.png');
            mySpikes.addChild(obstacleImage);
            obstacleImage.x = -hitZoneSize;
            obstacleImage.y = -hitZoneSize;
            game.addGameItem(mySpikes);
        }
        function createEnemy(x, y){
            var enemy =  game.createGameItem('enemy',25);
            var redSquare = draw.bitmap('img/goomba2.jpg');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            enemy.velocityX = -0.8;
            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-10);
                enemy.fadeOut();
                console.log("The enemy has hit Halle!");
            };
            enemy.onProjectileCollision = function(){
                enemy.fadeOut();
            };
       
            game.addGameItem(enemy);
                
        } 
        function createTrophy(x, y){
            var trophy =  game.createGameItem('enemy',25);
            var redSquare = draw.bitmap('img/trophy.jpg');
            redSquare.x = -25;
            redSquare.y = -25;
            trophy.addChild(redSquare);
            trophy.x = x;
            trophy.y = y;
            trophy.velocityX = -0.8;
            trophy.onPlayerCollision = function() {
                game.updateScore(11000);
                trophy.fadeOut();
                console.log("Congratulations! You've Won The Game!");
            };
            trophy.onProjectileCollision = function() {
            };
            
            game.addGameItem(trophy);
        }
           
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}