cc.Class({
    extends: cc.Component,

    properties: {
        tilePre:{
            default:null,
            type:cc.Prefab
        },
        powerPre:{
            default:null,
            type:cc.Prefab
        },
        bg:{
            default:null,
            type:cc.Node
        },
        topBg:{
            default:null,
            type:cc.Node
        },
        tiles:{
            default:null,
            type:Array
        },
        powers:{
            default:null,
            type:Array
        },
        scoreLabel:{
            default:null,
            type:cc.Label
        },
        scoreNum:{
            default:null,
            type:cc.Label
        },
        tileBg:{
            default:null,
            type:cc.Node
        },
        powerBarBg:{
            default:null,
            type:cc.Node
        },
        maxNum:0
    },

    // use this for initialization
    onLoad: function () {
        // 初始化方块数组
        this.tiles = [
            [null,null,null,null,null],
            [null,null,null,null,null],
            [null,null,null,null,null],
            [null,null,null,null,null],
            [null,null,null,null,null]
        ];
        this.powers = [null,null,null,null,null];
        // 背景层
        this.bg.width = cc.winSize.width;
        this.bg.height = cc.winSize.height;
        this.bg.setPosition(-cc.winSize.width/2,-cc.winSize.height/2);
        // 设置顶部背景层
        this.topBg.width = cc.winSize.width-30;
        this.topBg.height = this.scoreLabel.height;
        this.topBg.setPosition(-cc.winSize.width/2+15,cc.winSize.height/2-100);
        // 能量条背景层
        this.powerBarBg.width = cc.winSize.width-30;
        this.powerBarBg.height = this.powerBarBg.width/5/2;
        this.powerBarBg.setPosition(15-cc.winSize.width/2,this.topBg.getPositionY()-200);
        // 方块背景层
        this.tileBg.width = cc.winSize.width-30;
        this.tileBg.height = this.tileBg.width;
        this.tileBg.setPosition(15-cc.winSize.width/2,this.powerBarBg.getPositionY()-10-this.tileBg.height);
        // 生成能量条
        for(var i=0;i<5;i++){
            var power = cc.instantiate(this.powerPre);
            power.width = (this.powerBarBg.width-30)/5;
            power.height = this.powerBarBg.height-10;
            this.powerBarBg.addChild(power);
            power.setPosition(5+(5+power.width)*i+power.width/2,5+power.height/2);
            this.powers[i] = power;
        };
        // 生成初始方块
        for(var row=0;row<5;row++){
            for(var col = 0;col<5;col++){
                var tile = cc.instantiate(this.tilePre);
                tile.getComponent("Tile").game = this;
                tile.width = (this.tileBg.width-30)/5;
                tile.height = (this.tileBg.height-30)/5;
                var count = 0;
                var maxRandom = 5;
                var randomNum = 0;
                while(true){
                    count++;
                    var arr = new Array();
                    var scanArr = new Array();
                    if(count>10){
                        maxRandom++;
                    }
                    randomNum = Math.ceil(Math.random()*maxRandom);
                    tile.getComponent("Tile").setNum(randomNum,false,false);
                    tile.setPosition(5+(5+tile.width)*col+tile.width/2,5+(5+tile.height)*row+tile.height/2);
                    this.tiles[row][col] = tile;
                    this.scanAround(row,col,-1,-1,randomNum,arr,scanArr);
                    if(arr.length<3){
                        break;
                    }
                }
                tile.getComponent("Tile").setArrPosition(row,col);
                this.tileBg.addChild(tile);
            }
        }
    },
    // 核心扫描逻辑
    scanAround:function(row,col,lastRow,lastCol,num,arr,scanArr){
        // cc.log("row:",row,",col:",col,",lastRow:",lastRow,",lastCol:",lastCol,",num:",num,",arr:",arr,",scanArr:",scanArr);
        if(this.tiles[row][col]==null){
            return;
        }
        var isClear = false;
        if(scanArr==undefined){
            scanArr = new Array();
        }
        // 扫描过的节点不再扫描
        if(scanArr.indexOf(row+"#"+col)==-1){
            scanArr.push(row+"#"+col);
        }else{
            return;
        }
        // 扫描上
        if(row<4&&(lastRow!=(row+1)||lastCol!=col)&&this.tiles[row+1][col]!=null){
            var nextNum = parseInt(this.tiles[row+1][col].getComponent("Tile").numLabel.string);
            if(nextNum==num){
                if(arr.indexOf(row+"#"+col)==-1){
                    arr.push(row+"#"+col);
                }
                this.scanAround(row+1,col,row,col,num,arr,scanArr);
                isClear = true;
            }
        }
        // 扫描下
        if(row>0&&(lastRow!=(row-1)||lastCol!=col)&&this.tiles[row-1][col]!=null){
            var nextNum = parseInt(this.tiles[row-1][col].getComponent("Tile").numLabel.string);
            if(nextNum==num){
                if(arr.indexOf(row+"#"+col)==-1){
                    arr.push(row+"#"+col);
                }
                this.scanAround(row-1,col,row,col,num,arr,scanArr);
                isClear = true;
            }
        }
        // 扫描左
        if(col>0&&(lastRow!=row||lastCol!=(col-1))&&this.tiles[row][col-1]!=null){
            var nextNum = parseInt(this.tiles[row][col-1].getComponent("Tile").numLabel.string);
            if(nextNum==num){
                if(arr.indexOf(row+"#"+col)==-1){
                    arr.push(row+"#"+col);
                }
                this.scanAround(row,col-1,row,col,num,arr,scanArr);
                isClear = true;
            }
        }
        // 扫描右
        if(col<4&&(lastRow!=row||lastCol!=(col+1))&&this.tiles[row][col+1]!=null){
            var nextNum = parseInt(this.tiles[row][col+1].getComponent("Tile").numLabel.string);
            if(nextNum==num){
                if(arr.indexOf(row+"#"+col)==-1){
                    arr.push(row+"#"+col);
                }
                this.scanAround(row,col+1,row,col,num,arr,scanArr);
                isClear = true;
            }
        }
        // 四周都不通，但不是出发遍历点，并且数字相同，也加入到数组
        if(!isClear&&(lastRow!=-1&&lastCol!=-1)){
            var curNum = parseInt(this.tiles[row][col].getComponent("Tile").numLabel.string)
            if(curNum==num){
                if(arr.indexOf(row+"#"+col)==-1){
                    arr.push(row+"#"+col);
                }
            }
        }
    },

    operateLogic:function(touchRow,touchCol,curNum){
        var arr = new Array();
        var scanArr = new Array();
        this.scanAround(touchRow,touchCol,-1,-1,curNum,arr,scanArr);
        if(arr.length>=3){
            var addScore = 0;
            for(var index in arr){
                var row = arr[index].split("#")[0];
                var col = arr[index].split("#")[1];
                addScore += parseInt(this.tiles[row][col].getComponent("Tile").numLabel.string*10);
                if(row!=touchRow||col!=touchCol){
                    // 执行销毁动作                    
                    this.tiles[row][col].getComponent("Tile").destoryTile();
                    this.tiles[row][col] = null;
                }else{
                    this.tiles[row][col].getComponent("Tile").setNum(curNum+1,false,true);
                    this.maxNum = curNum+1>this.maxNum?curNum+1:this.maxNum;
                }
            }
            // 更新分数
            this.scoreNum.string = parseInt(this.scoreNum.string)+addScore;
            this.scheduleOnce(function() {
                // 0.1s后所有方块向下移动
                this.moveAllTileDown();
            },0.1);
            // 能量条补充一格
            for(var i=0;i<5;i++){
                if(this.powers[i]==null){
                    cc.log(i," null power");
                    var power = cc.instantiate(this.powerPre);
                    power.width = (this.powerBarBg.width-30)/5;
                    power.height = this.powerBarBg.height-10;
                    this.powerBarBg.addChild(power);
                    power.setPosition(5+(5+power.width)*i+power.width/2,5+power.height/2);
                    this.powers[i] = power;
                    break;
                }
            };
            return true;
        }
        return false;
    },

    moveAllTileDown:function(){
        for (var col = 0; col < 5; col++) {
            for (var row = 0; row < 5; row++) {
                if (this.tiles[row][col] != null) {// 有方块
                    for (var row1 = row; row1 > 0; row1--) {
                        if (this.tiles[row1 - 1][col] == null){
                            //如果没有向下移动
                            this.tiles[row1 - 1][col] = this.tiles[row1][col];
                            this.tiles[row1][col] = null;
                            this.tiles[row1 - 1][col].getComponent("Tile").moveTo(row1 - 1, col);
                        }
                    }
                }
            }
        }
        this.scheduleOnce(function() {
            // 生成新方块
            for (var col = 0; col < 5; col++) {
                for (var row = 0; row < 5; row++) {
                    if(this.tiles[row][col]==null){
                        var tile = cc.instantiate(this.tilePre);
                        tile.getComponent("Tile").game = this;
                        tile.width = (this.tileBg.width-30)/5;
                        tile.height = (this.tileBg.height-30)/5;
                        var maxRandom = this.maxNum;
                        var randomNum = Math.ceil(Math.random()*maxRandom);
                        tile.getComponent("Tile").setNum(randomNum,false,false);
                        tile.getComponent("Tile").newTile(row,col);
                        this.tiles[row][col] = tile;
                        this.tileBg.addChild(tile);
                    }
                }
            }
            // 0.5s后遍历执行逻辑
            this.scheduleOnce(function() {
                var isSearch = false;
                for (var col = 0; col < 5; col++) {
                    for (var row = 0; row < 5; row++) {
                        if(!isSearch){
                            isSearch = this.tiles[row][col]!=null&&this.operateLogic(row,col,parseInt(this.tiles[row][col].getComponent("Tile").numLabel.string));
                        }
                    }
                }
            }, 0.5);        
         }, 0.3);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // }
});
