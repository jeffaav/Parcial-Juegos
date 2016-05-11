var Preload = function (game) {
}

Preload.prototype = {
    preload: function () {
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //this.scale.pageAlignHorizontally = true;
        //this.scale.pageAlignVertically = true;
        
        this.game.load.image('bullet', '/assets/bullet.png');
        this.game.load.image('destroyer', '/assets/destroyer.png');
        this.game.load.image('enemy-bullet', '/assets/enemy-bullet.png');
        
        this.game.load.image('preloader-bar', '/assets/preloader-bar.png');
        this.game.load.image('sea', '/assets/sea.png');
        this.game.load.image('facebook', '/assets/sign-in-facebook.png');
        
        this.game.load.spritesheet('enemy', '/assets/enemy.png', 32, 32, 4);
        this.game.load.spritesheet('player', '/assets/player.png', 64, 64, 4);
        this.game.load.spritesheet('boss', '/assets/boss.png', 32, 32, 3);
        this.game.load.spritesheet('explosion', '/assets/explosion.png', 32, 32, 6);
        this.game.load.spritesheet('shooting-enemy', '/assets/shooting-enemy.png', 32, 32, 4);
        
        this.game.load.audio('explosion', '/assets/explosion.wav');
        this.game.load.audio('player-fire', '/assets/player-fire.wav');
        
        //this.game.load.spritesheet('key', 'url', w, h, frames, 1, 1);
        //
        //this.game.load.text('key', 'url');
    },
    create: function () {
        this.game.state.start('Menu');
    }
}