//libs:egret
//resources:
//docs:绘图 api 之画圆弧。\n基于此 api 可以不仅仅画出圆弧，还可以绘制出拱形、扇形、花瓣等等。\n轻触屏幕出现不同的花瓣形状。
//name:030-graph-arc
var GraphicsDrawArc = (function (_super) {
    __extends(GraphicsDrawArc, _super);
    function GraphicsDrawArc() {
        _super.call(this);
        this._count = 0;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=GraphicsDrawArc,p=c.prototype;
    p.onAddToStage = function (event) {
        // this.initGraphics();
        this.drawFl();
        this.changeGraphics();
    };
    //初始化赋值
    p.initGraphics = function () {
        var shape = new egret.Shape();
        this.addChild(shape);
        shape.x = this.stage.stageWidth / 2;
        shape.y = this.stage.stageHeight / 2;
        /*** 本示例关键代码段开始 ***/
        shape.graphics.lineStyle(2, 0xff00ff);
        shape.graphics.drawArc(0, 0, 150, 0, Math.PI, true);
        /*** 本示例关键代码段结束 ***/
    };
    //轻触修改属性
    p.changeGraphics = function () {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            this.drawFl();
        }, this);
    };
    p.drawFl = function () {
        this.removeChildren();
        var nums = [18, 15, 12, 10, 9, 6, 5, 4, 3];
        var num = nums[this._count++];
        this._count %= nums.length;
        var singleAng = 180 / num;
        var r1 = 150;
        var r2 = r1 * Math.sin(singleAng * Math.PI / 180);
        var r3 = r1 * Math.cos(singleAng * Math.PI / 180);
        for (var i = 0; i < num; i++) {
            var shape = new egret.Shape();
            this.addChild(shape);
            shape.x = this.stage.stageWidth / 2;
            shape.y = this.stage.stageHeight / 2;
            shape.graphics.clear();
            shape.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
            var ang = -singleAng / 2 + i * 2 * singleAng;
            shape.graphics.drawArc(r3 * Math.cos(ang * Math.PI / 180), r3 * Math.sin(ang * Math.PI / 180), r2, (ang + 90) * Math.PI / 180, (ang - 90) * Math.PI / 180, true);
        }
    };
    return GraphicsDrawArc;
}(egret.DisplayObjectContainer));
egret.registerClass(GraphicsDrawArc,'GraphicsDrawArc');
