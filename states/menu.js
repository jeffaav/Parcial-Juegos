var Menu = function funtion_name() {
    
}

Menu.prototype = {
    create: function () {
        this.sea = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'sea');
        this.titulo = this.game.add.text(this.game.width/2, 100, 'Examen Parcial', {
           fontSize: '20px', fill: '#fff'
        });
        this.titulo.anchor.setTo(0.5);
        this.boton = this.game.add.sprite(this.game.width/2, 600, 'facebook');
        this.boton.scale.setTo(0.5);
        this.boton.inputEnabled = true;
        this.boton.events.onInputDown.add(this.connect, this);
        this.boton.anchor.setTo(0.5);
        
        that = this;
    },
    connect: function () {
        this.callFBSDK();
    },
    callFBSDK: function () {
        FB.login(function(resp){
            if (resp.status == 'connected') {
                FB.api('/me', function(resp) {
                    info = resp;

                    $.ajax({
                        url: 'https://parcial-service-lvaldivia.c9users.io/facebook/',
                        data: {
                            id: resp.id,
                            first_name: resp.name
                        },
                        type: 'post',
                        jsonp: true,
                        success: function (resp) {
                            console.log(resp);
                            if (resp.status_code == 0) {
                                localStorage.setItem('usuario', JSON.stringify({
                                    codigo: info.id,
                                    nombre: info.name
                                }));
                                that.game.state.start('Game');
                            }
                        }
                    });
                });
            }
        },{scope: 'public_profile'})
    }
}