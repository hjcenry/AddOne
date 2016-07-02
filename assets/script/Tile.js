var Global = require("Global");
var Colors = require("Colors");

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
        clickEffect:cc.AudioClip
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            if(!self.game.isCal){
                cc.audioEngine.playEffect(self.clickEffect);
                self.game.isCal = true;
                // 连击次数归零
                Global.combo = 0;
                cc.audioEngine.playEffect(this.addCoin);
                self.setNum(parseInt(self.numLabel.string)+1,true,false);
            }
        }, this.node);
    },
    // 产生新方块
    newTile:function(row,col){
        this.node.setPosition(5+(5+this.node.width)*col+this.node.width/2,5+(5+this.node.height)*row+this.node.height/2);
        this.node.setScale(0);
        this.node.runAction(cc.scaleTo(0.1,1));
        this.setArrPosition(row,col);
    },
    // 移动到特定点
    moveTo:function(row,col){
        this.row = row;
        this.col = col;
        this.node.stopActionByTag(1);
        var action = cc.moveTo(0.2,cc.p(5+(5+this.node.width)*col+this.node.width/2,5+(5+this.node.height)*row+this.node.height/2));
        this.node.runAction(action);
        action.setTag(1);
    },
    // 方块销毁
    destoryTile:function(){
        var action = cc.sequence(cc.scaleTo(0.1,0),cc.callFunc(function(node){
            node.destroy();
        },this.node,this.node));
        this.node.runAction(action);
    },
    // 设置方块在数组的位置
    setArrPosition:function(row,col){
        this.row = row;
        this.col = col;
    },
    // 设置方块数字
    setNum:function(num,exeLogic,playEffect){
        this.game.maxNum = num>this.game.maxNum?num:this.game.maxNum;
        this.numLabel.string = num;
        switch(num){
            case 1:
                this.node.color = Colors.num1;
                break;
            case 2:
                this.node.color = Colors.num2;
                break;
            case 3:
                this.node.color = Colors.num3;
                break;  
            case 4:
                this.node.color = Colors.num4;
                break;
            case 5:
                this.node.color = Colors.num5;
                break;
            case 6:
                this.node.color = Colors.num6;
                break;  
            case 7:
                this.node.color = Colors.num7;
                break;
            case 8:
                this.node.color = Colors.num8;
                break;
            case 9:
                this.node.color = Colors.num9;
                break;  
            case 10:
                this.node.color = Colors.num10;
                break;
            case 11:
                this.node.color = Colors.num11;
                break;
            case 12:
                this.node.color = Colors.num12;
                break;  
            case 13:
                this.node.color = Colors.num13;
                break;
            case 14:
                this.node.color = Colors.num14;
                break;
            case 15:
                this.node.color = Colors.num15;
                break;
            case 16:
                this.node.color = Colors.num16;
                break;
            case 17:
                this.node.color = Colors.num17;
                break;
            case 18:
                this.node.color = Colors.num18;
                break;
            case 19:
                this.node.color = Colors.num19;
                break;
            case 20:
                this.node.color = Colors.num20;
                break;
            default:
                this.node.color = Colors.nums;
                break;
        }
        // 播放特效
        if(playEffect){
            this.node.runAction(cc.sequence(cc.scaleTo(0.15,1.5),cc.scaleTo(0.15,1)));
        }
        // 消除逻辑
        if(exeLogic){
            // 执行逻辑
            var isMove = this.game.operateLogic(this.row,this.col,parseInt(this.numLabel.string),true);
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
                    Global.score = this.game.scoreNum.string;
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
