window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() 
    {
        game.load.tilemap('level1', 'assets/background..json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image( 'gameTiles', 'assets/tiles.png' );
        game.load.image('brick', 'assets/brick.png');
        game.load.image('heart', 'assets/heart.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    }
    
    var player;
    var cursors;
    
    var map;
    var map2;
    var backgroundLayer;
    var blockedLayer;
    
    var organ;
    var spawnX = [480, 1164, 1088, 608];
    var spawnY = [848, 704, 64, 112];
    
    function create() 
    {
        game.physics.startSystem(Phaser.Physics.ARCADE);
     //   game.world.setBounds(0, 0, 1280, 1280);
        
        map = game.add.tilemap('level1');
      //  map2 = game.add.tilemap('level1');
        map.addTilesetImage('tiles', 'gameTiles');
       // map2.addTilesetImage('backgroundLayer', 'gameTiles');
        
       // backgroundLayer = map2.createLayer('backgroundLayer');
        blockedLayer = map.createLayer('blockLayer');
        
        map.setCollisionBetween(1, 4000, true, 'blockLayer');
        blockedLayer.resizeWorld();
        //blockedLayer.debug = true;
        
        player = game.add.sprite(32, game.world.height - 150, 'dude');
	 
	game.physics.enable(player);
	game.camera.follow(player);
	player.body.collideWorldBounds = true;
	
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 300;
		
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);
		
	cursors = game.input.keyboard.createCursorKeys();
	
	//create organ with sprite
	//place with random position in spawnX, spawnY
	var pos = game.rnd.integerInRange(0,4);
	organ = organ.add.sprite(spawnX[pos], spawnY[pos], 'heart');
    }
    
    function update() 
    {
    	game.physics.arcade.collide(player, blockedLayer);
        player.body.velocity.x = 0;
	 
	if (cursors.left.isDown)
	{
		player.body.velocity.x = -150;
 
		player.animations.play('left');
	}
	else if (cursors.right.isDown)
	{
		player.body.velocity.x = 150;
 		player.animations.play('right');
	}
	else
	{
		player.animations.stop();
	
		player.frame = 4;
	}
	
	if (cursors.up.isDown && player.body.onFloor())
	{
		player.body.velocity.y = -350;
	}
    }
};
