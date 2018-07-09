var gesture = require("gesture");

function Point(x, y) // constructor
{
    this.X = x;
    this.Y = y;
}

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },
    //事件监听
    setEventControl: function(){
        var self = this;
        var _isDown = false;
        var _points = new Array();
        cc.eventManager.addListener({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
              // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞没
            onTouchBegan: function (touch, event) {
                //实现 onTouchBegan 事件回调函数
                var target = event.getCurrentTarget();
                // 获取事件所绑定的 target
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                cc.log("当前点击坐标("+locationInNode.x +","+ locationInNode.y+")");
                _isDown = true;
                _points.length = 1; // clear
                _points[0] = new Point(locationInNode.x, locationInNode.y);
                return true;
            },
            onTouchMoved: function (touch, event) {            // 触摸移动时触发
                //实现 onTouchBegan 事件回调函数
                var target = event.getCurrentTarget();
                // 获取事件所绑定的 target
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                if (_isDown)
                {
                    _points[_points.length] = new Point(locationInNode.x, locationInNode.y); // append
                    cc.log("当前移动坐标("+locationInNode.x +","+ locationInNode.y+")");

                }

            },
            onTouchEnded: function (touch, event) {            // 点击事件结束处理

                if (_isDown)
                {
                    _isDown = false;
                    if (_points.length >= 10)
                    {
                        var result = gesture.Recognize(_points, false);
                        cc.log("Result: " + result.Name);
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
        this.label.string = this.text;
        //触摸监听
        this.setEventControl();
    },

    // called every frame
    update: function (dt) {

    },
});
