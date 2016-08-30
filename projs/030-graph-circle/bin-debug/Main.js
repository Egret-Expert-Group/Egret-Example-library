/**
 * @copyright www.egret.com
 * @author yjtx
 * @desc 绘制圆形矢量，点击舞台，会在点击位置出现一个随机圆。
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.shape = new egret.Shape();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        this.initGraphics();
        this.changeGraphics();
    };
    p.drawCircle = function (x, y) {
        var shape = this.shape;
        shape.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
        shape.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
        shape.graphics.drawCircle(x, y, Math.random() * 50 + 50);
        shape.graphics.endFill();
    };
    //初始化赋值
    p.initGraphics = function () {
        var shape = this.shape;
        this.addChild(shape);
        this.drawCircle(this.stage.stageWidth / 2, this.stage.stageHeight / 2);
    };
    //轻触修改属性
    p.changeGraphics = function () {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            this.drawCircle(e.stageX, e.stageY);
        }, this);
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
