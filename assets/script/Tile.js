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
        width:0,
        height:0,
        num:0,
        bgColor:new cc.color(255, 68, 68,255),
        numLabel:{
            default:null,
            type:cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        self.bgColor = new cc.color(255, 68, 68,255);
        this.node.on(cc.Node.EventType.TOUCH_START, function(event){
            self.num +=1;
            self.numLabel.string = self.num;
        }, this.node);
    },
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
