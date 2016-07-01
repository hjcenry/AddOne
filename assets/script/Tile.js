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
            self.setNum(parseInt(self.numLabel.string)+1,true,false);
        }, this.node);
    },
    newTile:function(row,col){
        this.node.setPosition(5+(5+this.node.width)*col+this.node.width/2,5+(5+this.node.height)*row+this.node.height/2);
        this.node.setScale(0);
        this.node.runAction(cc.scaleTo(0.1,1));
        this.setArrPosition(row,col);
    },
    moveTo:function(row,col){
        this.row = row;
        this.col = col;
        this.node.stopActionByTag(1);
        var action = cc.moveTo(0.2,cc.p(5+(5+this.node.width)*col+this.node.width/2,5+(5+this.node.height)*row+this.node.height/2));
        this.node.runAction(action);
        action.setTag(1);
    },
    destoryTile:function(){
        var action = cc.sequence(cc.scaleTo(0.1,0),cc.callFunc(function(node){
            node.destroy();
        },this.node,this.node));
        this.node.runAction(action);
    },
    setArrPosition:function(row,col){
        this.row = row;
        this.col = col;
    },

    setNum:function(num,exeLogic,playEffect){
        this.game.maxNum = num>this.game.maxNum?num:this.game.maxNum;
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
        // 播放特效
        if(playEffect){
            this.node.runAction(cc.sequence(cc.scaleTo(0.15,1.5),cc.scaleTo(0.15,1)));
        }
        // 消除逻辑
        if(exeLogic){
            // 执行逻辑
            var isMove = this.game.operateLogic(this.row,this.col,parseInt(this.numLabel.string));
            var powers = this.game.powers;
            // 能量条-1
            if(!isMove){
                for (var i = powers.length - 1; i >= 0; i--) {
                    if(powers[i]!=null){
                        var costBarAction = cc.sequence(cc.scaleTo(0.1,0),cc.callFunc(function(power){
                            power.destroy();
                        },null,powers[i]));
                        powers[i].runAction(costBarAction);
                        powers[i] = null;
                        break;
                    }
                };
                // 游戏结束逻辑判断：能量条为空
                if(powers[0]==null){
                    // Game Over
                    cc.director.loadScene("overScene");
                }
            }
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
