/**
 * @copyright www.egret.com
 * @author yjtx
 * @desc 本示例基于画弧 api，实现圆形遮罩功能。
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        this.initGraphics();
        this.changeGraphics();
    };
    //初始化赋值
    p.initGraphics = function () {
        var shape = this._shape = new egret.Shape();
        shape.x = this.stage.stageWidth / 2;
        shape.y = this.stage.stageHeight / 2;
        this.addChild(shape);
        var bitmap = new egret.Bitmap();
        this.addChild(bitmap);
        bitmap.width = 228;
        bitmap.height = 380;
        bitmap.x = shape.x - bitmap.width / 2;
        bitmap.y = shape.y - bitmap.height / 2;
        bitmap.mask = shape;
        var loader = new egret.ImageLoader();
        loader.addEventListener(egret.Event.COMPLETE, function (e) {
            var bitmapData = loader.data;
            bitmap.bitmapData = bitmapData;
        }, this);
        loader.load("resource/assets/cartoon-egret_00.png");
    };
    //轻触修改属性
    p.changeGraphics = function () {
        var shape = this._shape;
        /*** 本示例关键代码段开始 ***/
        var angle = 0;
        var i = 1;
        egret.startTick(function (timeStamp) {
            changeGraphics(angle);
            angle += 1;
            if (angle >= 360) {
                angle = angle % 360;
                i *= -1;
            }
            return false;
        }, this);
        function changeGraphics(angle) {
            shape.graphics.clear();
            shape.graphics.beginFill(0x00ffff, 1);
            shape.graphics.moveTo(0, 0);
            shape.graphics.lineTo(200, 0);
            shape.graphics.drawArc(0, 0, 200, 0, angle * Math.PI / 180, i == -1);
            shape.graphics.lineTo(0, 0);
            shape.graphics.endFill();
        }
        /*** 本示例关键代码段结束 ***/
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
