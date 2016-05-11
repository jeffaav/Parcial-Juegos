var GameOver = function funtion_name() {
    
}

GameOver.prototype = {
    create: function () {
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
        this.sea = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'sea');
        this.titulo = this.game.add.text(this.game.width/2, 100, 'Game Over', {
           fontSize: '40px', fill: '#fff'
        });
        this.titulo.anchor.setTo(0.5);
        
        this.puntaje = this.game.add.text(this.game.width/2, 160, 'Puntaje obtenido: ' + this.usuario.score , {
           fontSize: '20px', fill: '#fff'
        });
        this.puntaje.anchor.setTo(0.5);
        
        this.codigo = this.game.add.text(this.game.width/2, 190, this.usuario.codigo, {
           fontSize: '20px', fill: '#fff'
        });
        this.codigo.anchor.setTo(0.5);
        
        
        this.text.inputEnabled = true;
        this.text.events.onInputDown.add(function () {
            this.game.state.start('Game');
        }, this);
        
        
        $.ajax({
            url: 'https://parcial-service-lvaldivia.c9users.io/puntaje/',
            data: {
                uid: this.usuario.codigo,
                score: this.usuario.score
            },
            type: 'post',
            jsonp: true,
            success: function (resp) {
                alert(resp.msg);
            }
        });
    }
}