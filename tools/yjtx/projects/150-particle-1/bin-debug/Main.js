/**
 * @copyright www.egret.com
 * @author yjtx
 * @desc 粒子示例，飞行中的物体。
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        this.createGameScene();
    };
    //创建游戏场景
    p.createGameScene = function () {
        RES.getResByUrl("resource/assets/particle1/rock.png", function (texture) {
            this._texture = texture;
            this.create();
        }, this, RES.ResourceItem.TYPE_IMAGE);
        RES.getResByUrl("resource/assets/particle1/sun.json", function (data) {
            this._config = data;
            this.create();
        }, this, RES.ResourceItem.TYPE_JSON);
    };
    p.create = function () {
        if (this._texture && this._config) {
            var system = new particle.GravityParticleSystem(this._texture, this._config);
            this.addChild(system);
            system.start();
            system.y = 400;
            system.x = 300;
            var angle = 0;
            egret.startTick(function (timeStamp) {
                angle += -2;
                system.emitterX = Math.sin(angle * Math.PI / 180) * 200;
                system.emitterY = Math.cos(angle * Math.PI / 180) * 200 / 2;
                return false;
            }, this);
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
