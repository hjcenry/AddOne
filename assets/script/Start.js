cc.Class({
    extends: cc.Component,

    properties: {
        gameName:{
            default:null,
            type:cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        var action = cc.repeatForever(cc.sequence(cc.scaleTo(1, 1.5),cc.scaleTo(1,1)));
        this.gameName.runAction(action);
    },

    startGame:function(){
        cc.director.loadScene("gameScene");
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
