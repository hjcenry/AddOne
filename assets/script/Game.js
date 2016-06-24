cc.Class({
    extends: cc.Component,

    properties: {
        tilePre:{
            default:null,
            type:cc.Prefab
        },
        tiles:{
            default:null,
            type:Array
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
        }
    },

    // use this for initialization
    onLoad: function () {
        this.tiles = [
            [null,null,null,null,null],
            [null,null,null,null,null],
            [null,null,null,null,null],
            [null,null,null,null,null],
            [null,null,null,null,null]
        ];
        this.tileBg.width = cc.winSize.width-30;
        this.tileBg.height = this.tileBg.width;
        this.tileBg.setPosition(15-cc.winSize.width/2,15-cc.winSize.height/2);
        for(var row=0;row<5;row++){
            for(var col = 0;col<5;col++){
                var tile = cc.instantiate(this.tilePre);
                tile.width = (this.tileBg.width-30)/5;
                tile.height = tile.width;
                this.tileBg.addChild(tile);
                tile.setPosition(5+(5+tile.width)*col+tile.width/2,5+(5+tile.height)*row+tile.height/2);
                this.tiles[row][col] = tile;
            }
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // }
});
