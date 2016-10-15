var Colors = require("Colors");

cc.Class({
    extends: cc.Component,

    properties: {
        gameName:{
            default:null,
            type:cc.Node
        },
        bg:{
            default:null,
            type:cc.Node
        },
        startBtn:{
            default:null,
            type:cc.Node
        },
        btnEffect:cc.AudioClip
    },

    // use this for initialization
    onLoad: function () {
        // 背景铺平
        this.bg.width = cc.winSize.width;
        this.bg.height = cc.winSize.height;
        this.bg.setPosition(this.bg.width/2,this.bg.height/2);
        this.bg.color = Colors.startBg;
        // 设置文字
        var action = cc.repeatForever(cc.sequence(cc.scaleTo(1, 1.5),cc.scaleTo(1,1)));
        this.gameName.runAction(action);
        this.gameName.setPosition(cc.winSize.width/2,cc.winSize.height/2);
        // 设置按钮
        this.startBtn.setPosition(this.gameName.getPositionX(),this.gameName.getPositionY()-210);
    },

    startGame:function(){
        cc.audioEngine.playEffect(this.btnEffect);
        cc.director.loadScene("gameScene");
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
