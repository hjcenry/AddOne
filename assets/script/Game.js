cc.Class({
    extends: cc.Component,

    properties: {
        tilePre:{
            default:null,
            type:cc.Prefab
        },
        tiles:[
            [null,null,null,null,null],
            [null,null,null,null,null],
            [null,null,null,null,null],
            [null,null,null,null,null],
            [null,null,null,null,null],
        ]
    },

    // use this for initialization
    onLoad: function () {
        for(var row=0;row<5;row++){
            for(var col = 0;col<5;col++){
                var tile = cc.instantiate(this.tilePre);
                this.node.addChild(tile);
                tile.setPosition((tile.width+10)*col-((tile.width)*5)/2,(tile.height+10)*row-((tile.height)*5)/2);
                this.tiles[row][col] = tile;
            }
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
for(var row=0;row<5;row++){
            for(var col = 0;col<5;col++){
            }
}
    }
});
