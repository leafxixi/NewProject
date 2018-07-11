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

        var str = "";

        cc.eventManager.addListener({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
              // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞没
            onTouchBegan: function (touch, event) {
                //实现 onTouchBegan 事件回调函数
                var target = event.getCurrentTarget();
                // 获取事件所绑定的 target
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                // cc.log("当前点击坐标("+locationInNode.x +","+ locationInNode.y+")");
                _isDown = true;

                var len = gesture.InitPoint(locationInNode.x,locationInNode.y);
                // cc.log("the begin _points.lenth="+ len);
                str = "this.Unistrokes[] = new Unistroke("+", new Array(new Point("+parseInt(locationInNode.x)+","+parseInt(locationInNode.y)+")";
                graphics.clear();
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
                    str += ",new Point("+parseInt(locationInNode.x)+","+parseInt(locationInNode.y)+")";
                }

            },
            onTouchEnded: function (touch, event) {            // 点击事件结束处理

                if (_isDown)
                {
                    _isDown = false;
                    if (gesture.GetPoints().length >= 10)
                    {
                        str += "));";

                        cc.log("集合: " + str);

                    	// cc.log("the _points.length = " + gesture.GetPoints().length + " , and will Recognize the gesture!")
                        var result = gesture.Recognize(gesture.GetPoints(), 0);

                        cc.log("Result: " + result.Name);
                        // gesture.AddGesture("test",gesture.GetPoints());


                        
                    }
                    else // fewer than 10 points were inputted
                    {
                        cc.log("Too few points made. Please try again.");
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
