// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        //积分更新
        Scores: {
            default: null,
            type: cc.Label
        },
    },
    //积分更新
    disScore: function () {
        this.score =  cc.sys.localStorage.getItem("ScoreDis");//读取本地存储的积分
        // 更新 scoreDisplay Label 的文字
        this.Scores.string = "Score：" + this.score.toString();//显示
    },
    // use this for initialization
    onLoad: function () {
       this.disScore();//首次加载时候调用
    },


    start () {

    },

    // update (dt) {},
});
