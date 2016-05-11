var Game = function (game) {
    
}

Game.prototype = {
    create:function () {
        this.elapsed = 0;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1000;
        this.game.world.setBounds(0, 0,800, 800);
        this.sea = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'sea');
        
        this.vidas = 3;
        this.score = 0;
        this.shootingElapsed = 0;
        this.enemyElapsed = 0;
        
        this.textoVida = this.game.add.text(this.game.width - 100, 20, 'Vidas ' + this.vidas, {
           fontSize: '18px', fill: '#fff'
        });
        
        this.textoScore = this.game.add.text(this.game.width - 100, 50, 'Score ' + this.score, {
           fontSize: '18px', fill: '#fff'
        });
        
        this.player = this.game.add.sprite(this.game.width / 2, this.game.height - 100, 'player');
        this.player.anchor.setTo(0.5);
        this.player.checkWorldBounds = true;
        this.player.animations.add('fly',[0,1,2],20,true);
        this.player.animations.play('fly');
        this.game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.body.inmovable = true;
        this.player.body.allowGravity = false;
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        
        
        this.bullets = this.game.add.group();
    
        this.enemies = this.game.add.group();
        
        this.fireSound = this.game.add.audio('player-fire');
        this.explosionSound = this.game.add.audio('explosion');
        
        
        
        that = this;
    },
    moverPlayer: function () {
        if(this.cursors.left.isDown){
          this.player.body.velocity.x = -280;
          
        }else if(this.cursors.right.isDown){
          this.player.body.velocity.x = +280;
        }else{
          this.player.body.velocity.x = 0;

        }
        
        if(this.cursors.up.isDown){
          this.player.body.velocity.y = -280;
          
        }else if(this.cursors.down.isDown){
          this.player.body.velocity.y = +280;
        }else{
          this.player.body.velocity.y = 0;
        }
    },
    update:function () {
        this.moverPlayer();
        
        this.shootingElapsed += this.game.time.elapsed;
        if (this.space.isDown) {
            if (this.shootingElapsed >= 150) {
                this.crearBala(this);
                
                this.shootingElapsed = 0;
                this.fireSound.play();
            }
        }
        
        this.bullets.forEach(function (element) {
          if (element.y < 0) {
            //element.die();
          }
        })
        
        this.enemyElapsed += this.game.time.elapsed;
        
        if (this.enemyElapsed >= 2000) {
            this.enemyElapsed = 0;
            this.crearEnemigo(this);
        }
    
        
        this.game.physics.arcade.collide(this.bullets, this.enemies, null, function (bullet, enemy) {
            bullet.kill();
            enemy.kill();
            
            this.score += enemy.puntos;
            this.textoScore.text = 'Score ' + this.score;
            var explosion = this.game.add.sprite(enemy.x, enemy.y, 'explosion');
            explosion.animations.add('explode');
            explosion.play('explode', 6, false, true);
            
            this.explosionSound.play();
            
        }, this);
        
        this.game.physics.arcade.collide(this.player, this.enemies, null, function (player, enemy) {
            
            enemy.kill();
            
            this.vidas -= 1;
            this.textoVida.text = 'Vidas ' + this.vidas;
            
            if (this.vidas == 0) {
                var usuario = JSON.parse(localStorage.getItem('usuario'));
                usuario.score = this.score;
                
                localStorage.setItem('usuario', JSON.stringify(usuario));
                
                this.game.state.start('GameOver');
            }
            
        }, this);
    },
    crearBala: function () {
        var bullet = this.bullets.getFirstDead();
        
        if (!bullet) {
          bullet = this.game.add.sprite(this.player.x + this.player.width / 2,this.player.y - 5,'bullet');
          this.bullets.add(bullet);
          bullet.anchor.setTo(0.5);
          this.game.physics.arcade.enable(bullet);
        } else {
          bullet.reset(this.player.x + this.player.width / 2,this.player.y - 5);
        }
        
        bullet.body.velocity.y = -350;
        bullet.body.allowGravity = false;
    },
    crearEnemigo: function () {
        
        var random = this.game.rnd.integerInRange(1, 2);
        var x = this.game.rnd.integerInRange(32, this.game.width - 32);
        var enemy;
        
        if (random == 1) {
            enemy = this.game.add.sprite(x, 0, 'enemy');    
            enemy.puntos = 10;
        } else {
            enemy = this.game.add.sprite(x, 0, 'boss');    
            enemy.puntos = 40;
        }
        
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
        enemy.animations.add('fly',[0,1,2],20,true);
        enemy.animations.play('fly');
        this.game.physics.arcade.enable(enemy);
        
        
        enemy.body.velocity.y = 150;
        enemy.body.collideWorldBounds = true;
        //enemy.body.inmovable = true;
        enemy.body.allowGravity = false;
        
        this.enemies.add(enemy);
        
        console.log(enemy);
    }
}