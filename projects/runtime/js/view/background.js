var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // container which will be returned
        var background;
        var buildings = [];
        var tree;
        
        // ANIMATION VARIABLES HERE:
        
        
        // add objects for display inb ackground
        // called at the start of game and whenever the page is resized
        function render() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;

            background.removeAllChildren();

            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,canvasHeight,'#000000');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            var circle;
            for(var i=0; i < 500; i++) {
                circle = draw.circle(1,'#1a1aff',' #66d9ff',1);
                circle.x = canvasWidth*Math.random();
                circle.y = groundY*Math.random();
                background.addChild(circle);
            }
            var moon = draw.bitmap('img/moon.png');
            background.addChild(moon);
            moon.x = 900;
            moon.y = 10;
            moon.scaleX = 0.5;
            moon.scaleY = 0.5;
            
               tree = draw.bitmap('img/tree.png');
               tree.x = 500;
               tree.y = 260;
               tree.scaleX = 0.5;
               tree.scaleY = 0.7;
               background.addChild(tree);
                
            
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            var buildingHeight = 350;
            var building;
            for(var i=0; i < 5; ++i) {
                building = draw.bitmap('img/building2.png');
                building.x = 400*i;
                building.y = -98;
                background.addChild(building);
                buildings.push(building);
            }
            
            // TODO 4: Part 1 - Add a tree
        }
                        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x + -5;
            if(tree.x < -100) {
                tree.x = canvasWidth;
            }
            // TODO 5: Part 2 - Parallax
            for (var counter = 0; counter < 4; counter++) {
                buildings[counter].x = buildings[counter].x - 0.6;
                
                if(buildings[counter].x < -100) {
                    buildings[counter].x = canvasWidth;
                }
            }
            

        
        }   
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        app.addResizeable(background);
        app.addUpdateable(background);
        
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
