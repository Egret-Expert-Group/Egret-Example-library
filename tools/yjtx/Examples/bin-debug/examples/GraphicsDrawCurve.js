//libs:egret
//resources:
//docs:贝塞尔曲线示例。\n拖动舞台上圆点，可以查看贝塞尔曲线不同的显示。
//name:030-graph-bezier
var GraphicsDrawCurve = (function (_super) {
    __extends(GraphicsDrawCurve, _super);
    function GraphicsDrawCurve() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=GraphicsDrawCurve,p=c.prototype;
    p.onAddToStage = function (event) {
        this._shape = new egret.Shape();
        this.addChild(this._shape);
        this.init();
        this.initGraphics();
    };
    //初始化赋值
    p.initGraphics = function () {
        var shape = this._shape;
        /*** 本示例关键代码段开始 ***/
        shape.graphics.lineStyle(3, 0xff0ff0);
        shape.graphics.moveTo(140, 400);
        shape.graphics.curveTo(340, 200, 480, 500);
        /*** 本示例关键代码段结束 ***/
    };
    p.resetCure = function () {
        var shape = this._shape;
        /*** 本示例关键代码段开始 ***/
        shape.graphics.clear();
        shape.graphics.lineStyle(3, 0xff0ff0);
        shape.graphics.moveTo(this._startShape.x, this._startShape.y);
        shape.graphics.curveTo(this._control.x, this._control.y, this._anchor.x, this._anchor.y);
        /*** 本示例关键代码段结束 ***/
    };
    p.init = function () {
        this._startShape = this.initShape(140, 400, 0xffff00);
        this._control = this.initShape(340, 200, 0xff0000);
        this._anchor = this.initShape(480, 500, 0x000ff0);
    };
    p.initShape = function (x, y, color) {
        var shape = new egret.Shape();
        shape.graphics.beginFill(color);
        shape.graphics.drawCircle(0, 0, 20);
        shape.graphics.endFill();
        this.addChild(shape);
        shape.x = x;
        shape.y = y;
        shape.touchEnabled = true;
        shape.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginHandler, this);
        return shape;
    };
    p.onBeginHandler = function (e) {
        e.stopImmediatePropagation();
        this.drapShape = e.currentTarget;
        this.drapShape.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginHandler, this);
        this.drapShape.touchEnabled = false;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onEndHandler, this);
    };
    p.onMoveHandler = function (e) {
        this.drapShape.x = e.stageX;
        this.drapShape.y = e.stageY;
        this.resetCure();
    };
    p.onEndHandler = function (e) {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEndHandler, this);
        this.drapShape.touchEnabled = true;
        ;
        this.drapShape.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginHandler, this);
    };
    return GraphicsDrawCurve;
}(egret.DisplayObjectContainer));
egret.registerClass(GraphicsDrawCurve,'GraphicsDrawCurve');
