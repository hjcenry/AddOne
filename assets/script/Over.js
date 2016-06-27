cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
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
        this.gameText.setPosition(cc.winSize.width/2,cc.winSize.width/2);
        this.gameText.height = this.textLabel.height;
        cc.log("debug1:",this.gameText.height);
        cc.log("debug2:",this.textLabel.height);
        // 返回按钮
        this.backBtn.setPosition(this.gameText.getPositionX(),this.gameText.getPositionY()-this.gameText.height/2-20);
        cc.log("1:"+this.gameText.getPositionY());
        cc.log("2:"+this.gameText.height/2);
        cc.log("3:"+this.backBtn.getPositionY());
    },

    back:function(){
        cc.director.loadScene("startScene");
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
