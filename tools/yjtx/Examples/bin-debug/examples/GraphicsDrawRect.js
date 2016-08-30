//libs:egret
//resources:
//docs:绘制矩形api。\n点击舞台，会在点击位置出现一个随机矩形。
//name:030-graph-rect
var GraphicsDrawRect = (function (_super) {
    __extends(GraphicsDrawRect, _super);
    function GraphicsDrawRect() {
        _super.call(this);
        this.shape = new egret.Shape();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=GraphicsDrawRect,p=c.prototype;
    p.onAddToStage = function (event) {
        this.initGraphics();
        this.changeGraphics();
    };
    p.drawRect = function (x, y) {
        var shape = this.shape;
        var w = Math.random() * 200 + 100;
        var h = Math.random() * 200 + 100;
        /*** 本示例关键代码段开始 ***/
        shape.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
        shape.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
        shape.graphics.drawRect(x - w / 2, y - h / 2, w, h);
        shape.graphics.endFill();
        /*** 本示例关键代码段结束 ***/
    };
    //初始化赋值
    p.initGraphics = function () {
        var shape = this.shape;
        this.addChild(shape);
        this.drawRect(this.stage.stageWidth / 2, this.stage.stageHeight / 2);
    };
    //轻触修改属性
    p.changeGraphics = function () {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            this.drawRect(e.stageX, e.stageY);
        }, this);
    };
    return GraphicsDrawRect;
}(egret.DisplayObjectContainer));
egret.registerClass(GraphicsDrawRect,'GraphicsDrawRect');
