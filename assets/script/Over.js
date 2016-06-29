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
        }
    },

    // use this for initialization
    onLoad: function () {
        // 背景层
        this.bg.width = cc.winSize.width;
        this.bg.height = cc.winSize.height;
        this.bg.setPosition(this.bg.width/2,this.bg.height/2);
        // 文字层
        this.gameText.setPosition(cc.winSize.width/2,cc.winSize.height/2);
        this.gameText.height = this.textLabel.height;
        // 返回按钮
        this.backBtn.setPosition(this.gameText.getPositionX(),this.gameText.getPositionY()-200);
    },

    back:function(){
        cc.director.loadScene("startScene");
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
