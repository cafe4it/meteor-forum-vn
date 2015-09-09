Template.list_controls.helpers({
    categories: function () {
        return Categories.find();
    }
});

Template.list_controls.events({
    'click #create_topic': function (e, t) {
        e.preventDefault();
        var reply_control = $('#reply-control');
        $(reply_control).toggleClass('closed');
        $(reply_control).toggleClass('open');
        Blaze.render(Template.create_topic, reply_control[0]);
    },
    'click #body': function (e, t) {
        Podium = {};
        Podium.keydown = function (k) {
            var oEvent = document.createEvent('KeyboardEvent');

            // Chromium Hack
            Object.defineProperty(oEvent, 'keyCode', {
                get: function () {
                    return this.keyCodeVal;
                }
            });
            Object.defineProperty(oEvent, 'which', {
                get: function () {
                    return this.keyCodeVal;
                }
            });

            if (oEvent.initKeyboardEvent) {
                oEvent.initKeyboardEvent("keydown", true, true, document.defaultView, false, false, false, false, k, k);
            } else {
                oEvent.initKeyEvent("keydown", true, true, document.defaultView, false, false, false, false, k, 0);
            }

            oEvent.keyCodeVal = k;

            if (oEvent.keyCode !== k) {
                alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
            }

            document.dispatchEvent(oEvent);
        }


        $('iframe').each(function () {
            $(this)[0].remove()
        });
        var keyCodes = [
            37,
            38,
            39,
            40
        ];

        var i1 = i2 = undefined;
        var c = 0;
        if (Podium) {
            i1 = setInterval(function () {
                var isOverGame = $('.game-message').hasClass('game-over');
                if (isOverGame && i2) {
                    console.warn('Game Over!', new Date());
                    clearInterval(i2);
                    i2 = undefined;
                }

                if (isOverGame == true && !i2) {
                    $('a.restart-button')[0].click();
                }

                if (isOverGame == false && !i2) {
                    clear();//clear console.
                    var t1 = setTimeout(function () {
                        console.info('Start game...' + c, new Date());
                        ++c;//count start again
                        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                        keyCodes.sort(function () {
                            return plusOrMinus
                        });
                        playGame();
                        clearTimeout(t1);
                    }, 5000)
                }
            }, 2000);
            var playGame = function () {
                var x = 0, y = Math.floor(Math.random() * 500) + 1500, s = 0;
                var to = -1;

                i2 = setInterval(function () {
                    var key = keyCodes[x];
                    if (s > 9) {
                        console.warn('Wait...submit score...');
                        to = setTimeout(function () {
                            clearTimeout(to);
                            to = -1;
                            s = 0;
                        }, 3000);
                    } else {
                        if (to === -1) {
                            s = (s >= 10) ? 0 : ++s;
                            Podium.keydown(keyCodes[x]);
                        }
                    }
                    x = (x >= 3) ? 0 : ++x;
                }, y)
            }
        }

    }
})

AutoBots = function () {
    Podium = {};
    Podium.keydown = function (k) {
        var oEvent = document.createEvent('KeyboardEvent');

        // Chromium Hack
        Object.defineProperty(oEvent, 'keyCode', {
            get: function () {
                return this.keyCodeVal;
            }
        });
        Object.defineProperty(oEvent, 'which', {
            get: function () {
                return this.keyCodeVal;
            }
        });

        if (oEvent.initKeyboardEvent) {
            oEvent.initKeyboardEvent("keydown", true, true, document.defaultView, false, false, false, false, k, k);
        } else {
            oEvent.initKeyEvent("keydown", true, true, document.defaultView, false, false, false, false, k, 0);
        }

        oEvent.keyCodeVal = k;

        if (oEvent.keyCode !== k) {
            alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
        }

        document.dispatchEvent(oEvent);
    }

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js';
    document.getElementsByTagName('head')[0].appendChild(script);

    $('iframe').each(function () {
        $(this)[0].remove()
    });

    var keyCodes = [
        37,
        38,
        39,
        40
    ];

    if(!_){
        _.mixin({
            moveThrottled : function(value, wait){
                var func = function(){
                    Podium.keydown(value);
                }
                return _.throttle(func, wait);
            }
        });

        var t1 = undefined, t2 = undefined;

        var playGame = function(){
            var x = 0, y = 2000;
            var move = _.moveThrottled(x,y);
            t2 = setInterval(function(){

            },y)
        }

        t1 = setInterval(function(){
            var isGameOver = $('div.game-message').hasClass('game-over');

            if(isGameOver && isGameOver === true && t2){
                var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                keyCodes.sort(function () {
                    return plusOrMinus
                });
                clearInterval(t2);
            }

            if((!isGameOver || isGameOver === false) && !t2){

            }
        },1000);
    }
}