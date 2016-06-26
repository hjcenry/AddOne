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
        numLabel:{
            default:null,
            type:cc.Label
        },
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            self.setNum(parseInt(self.numLabel.string)+1,false);
        }, this.node);
    },

    setNum:function(num,isInit){
        this.numLabel.string = num;
        switch(num){
            case 1:
                this.node.color = new cc.color(235, 245, 223, 255);
                break;
            case 2:
                this.node.color = new cc.color(186, 212, 170, 255);
                break;
            case 3:
                this.node.color = new cc.color(212, 212, 170, 255);
                break;  
            case 4:
                this.node.color = new cc.color(124, 99, 84, 255);
                break;
            case 5:
                this.node.color = new cc.color(218, 227, 224, 255);
                break;
            case 6:
                this.node.color = new cc.color(64, 125, 148, 255);
                break;  
            case 7:
                this.node.color = new cc.color(123, 118, 135, 255);
                break;
            case 8:
                this.node.color = new cc.color(172, 173, 172, 255);
                break;
            case 9:
                this.node.color = new cc.color(204, 196, 194, 255);
                break;  
            case 10:
                this.node.color = new cc.color(199, 225, 240, 255);
                break;
            case 11:
                this.node.color = new cc.color(150, 196, 230, 255);
                break;
            case 12:
                this.node.color = new cc.color(25, 77, 91, 255);
                break;  
            case 13:
                this.node.color = new cc.color(229, 96, 205, 255);
                break;
            case 14:
                this.node.color = new cc.color(250, 174, 78, 255);
                break;
            case 15:
                this.node.color = new cc.color(255, 241, 222, 255);
                break;
            default:
                this.node.color = new cc.color(255, 209, 145, 255);
                break;
        }
        // 消除逻辑

        // 能量条逻辑
        if(!isInit){
            var powers = this.game.powers;
            for (var i = powers.length - 1; i >= 0; i--) {
                if(powers[i]!=null){
                    var costBarAction = cc.sequence(cc.scaleTo(0.1,0),cc.callFunc(function(power){
                        power.destroy();
                    },null,powers[i]));
                    powers[i].runAction(costBarAction);
                    powers[i] = null;
                    if(i==0){
                        // Game Over
                        cc.director.loadScene("overScene");
                    }
                    break;
                }
            };
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
