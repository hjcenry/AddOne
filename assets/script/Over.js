var Global = require("Global");
var Colors = require("Colors");

cc.Class({
    extends: cc.Component,

    properties: {
        bg:{
            default:null,
            type:cc.Node
        },
        gameText:{
            default:null,
            type:cc.Node
        },
        backBtn:{
            default:null,
            type:cc.Node
        },
        textLabel:{
            default:null,
            type:cc.Label
        },
        scoreLabel:{
            default:null,
            type:cc.Label
        },
        scoreText:{
            default:null,
            type:cc.Node
        },
        overEffect:cc.AudioClip,
        addCoin:cc.AudioClip,
        btnEffect:cc.AudioClip,
        score:0,
        changeScore:0,
    },

    // use this for initialization
    onLoad: function () {
        // 背景层
        this.bg.width = cc.winSize.width;
        this.bg.height = cc.winSize.height;
        this.bg.setPosition(this.bg.width/2,this.bg.height/2);
        this.bg.color = Colors.overBg;
        // 文字层
        this.gameText.setPosition(cc.winSize.width/2,cc.winSize.height/2);
        var action = cc.repeatForever(cc.sequence(cc.scaleTo(1, 1.5),cc.scaleTo(1,1)));
        this.gameText.runAction(action);
        // 播放结束音效
        cc.audioEngine.playEffect(this.overEffect);
        // 分数
        this.scoreText.setPosition(this.gameText.getPositionX(),this.gameText.getPositionY()+200);
        this.score = Global.score;
        this.schedule(this.updateScore,0.1,cc.REPEAT_FOREVER,2);
        // 点击分数立即加到最高分数
        var self = this;
        this.bg.on(cc.Node.EventType.TOUCH_START,function(event){
            cc.log("score text touch");
            cc.audioEngine.playEffect(self.addCoin);
            self.changeScore = self.score;
            self.scoreLabel.string = "最终分数："+self.changeScore;
        }, this.bg);
        // 返回按钮
        this.backBtn.setPosition(this.gameText.getPositionX(),this.gameText.getPositionY()-200);
    },

    updateScore(){
        if(this.score<=this.changeScore){
            this.unschedule(this.updateScore);
        }
        this.changeScore += 20;
        this.changeScore = this.changeScore>this.score?this.score:this.changeScore;
        // 添加音效
        cc.audioEngine.playEffect(this.addCoin);
        this.scoreLabel.string = "最终分数："+this.changeScore;
    },

    back:function(){
        Global.score = 0;
        cc.audioEngine.playEffect(this.btnEffect);
        cc.director.loadScene("startScene");
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
