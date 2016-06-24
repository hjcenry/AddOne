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
        bgColor:new cc.color(255, 255, 255,255),
        numLabel:{
            default:null,
            type:cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        self.num = 1;
        cc.log(self.color);
        self.color = self.bgColor;
        cc.log(self.color);
        this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            self.setNum(self);
        }, this.node);
    },

    setNum:function(self){
        self.num +=1;
        self.numLabel.string = self.num;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
