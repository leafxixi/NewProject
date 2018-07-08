// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var hero2 = require("HeroPlayer");//引用玩家的操作脚本

cc.Class({
    extends: cc.Component,

    properties: {
        times: 0,//控制时间
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad: function () {
        this.moveRight();
    },
//左右移动
    moveRight: function(){
        var seq = cc.repeatForever(
             cc.sequence(
                 cc.moveBy(this.times, cc.p(240, 0)), cc.moveBy(this.times, cc.p(-240,0))
             ));
        this.node.runAction(seq);
    },
//当前节点世界坐标系下的范围包围盒
    noteBox: function(){
        return this.node.getBoundingBoxToWorld();
    },  
    // start () {
    // },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var _label = cc.find("Canvas/hero").getComponent(hero2);
      //障碍物碰撞框
        if(cc.rectIntersectsRect(_label.node.getBoundingBoxToWorld(), this.noteBox())){
            cc.eventManager.removeAllListeners();//移除所有事件监听
        }
    },

});
