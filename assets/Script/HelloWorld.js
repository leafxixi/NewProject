var DollarRecognizer = require("gesture");
var gesture = new DollarRecognizer();



cc.Class({
    extends: cc.Component,

    properties: {


    },


    //事件监听
    setEventControl: function(){
        var self = this;
        var _isDown = false;

        var graphics = this.getComponent(cc.Graphics);

        // var str = "";

        cc.eventManager.addListener({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
              // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞没
            onTouchBegan: function (touch, event) {
                //实现 onTouchBegan 事件回调函数
                var target = event.getCurrentTarget();
                // 获取事件所绑定的 target
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                _isDown = true;

                var len = gesture.InitPoint(locationInNode.x,locationInNode.y);
                // str = "this.Unistrokes[] = new Unistroke("+", new Array(new Point("+parseInt(locationInNode.x)+","+parseInt(locationInNode.y)+")";
                graphics.moveTo(0, 0);
                graphics.clear();
                graphics.circle(locationInNode.x, locationInNode.y, 2);
                graphics.moveTo(locationInNode.x, locationInNode.y);
                return true;
            },
            onTouchMoved: function (touch, event) {            // 触摸移动时触发
                //实现 onTouchBegan 事件回调函数
                var target = event.getCurrentTarget();
                // 获取事件所绑定的 target
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                if (_isDown)
                {
                	gesture.AddPoint(locationInNode.x,locationInNode.y);
                	graphics.lineTo(locationInNode.x, locationInNode.y);
                    graphics.stroke();
                    // str += ",new Point("+parseInt(locationInNode.x)+","+parseInt(locationInNode.y)+")";
                }

            },
            onTouchEnded: function (touch, event) {            // 点击事件结束处理

                if (_isDown)
                {
                    _isDown = false;
                    if (gesture.GetPoints().length >= 7)
                    {
                        // str += "));";

                        // cc.log("集合: " + str);
                    	var result = gesture.Recognize(gesture.GetPoints(), 0);
                    	//判定手势操作
                        cc.log("Result: " + result.Name);
                        
                    }
                    else // fewer than 7 points were inputted
                    {
                    	//当无法Recognize时，判定为点击操作
                        // cc.log("Too few points made. Please try again.");
                        cc.log("Result: Tap");
                    }
                }
            }

        }, self.node)
    },
    // use this for initialization
    onLoad: function () {

        //触摸监听
        this.setEventControl();
    },

    // called every frame
    update: function (dt) {

    },
});
