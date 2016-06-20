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
        tilePre:{
            default:null,
            type:cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        for(var row=0;row<4;row++){
            for(var col = 0;col<4;col++){
                var tile = cc.instantiate(this.tilePre);
                this.node.addChild(tile);
                // tile.setPosition(100+col,100+row);
                tile.setPosition(tile.width*(col+1)+10,tile.height*(row+1)+10);
            }
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
