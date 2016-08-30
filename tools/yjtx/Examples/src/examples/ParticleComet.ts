//libs:egret,res,particle
//resources:resource/assets/particle1
//docs:粒子示例，飞行中的物体。
//name:150-particle-1

class ParticleComet extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        this.createGameScene();
    }
    
    private _texture:egret.Texture;
    private _rock:egret.Texture;
    private _config:any;
    //创建游戏场景
    private createGameScene():void {
        RES.getResByUrl("resource/assets/particle1/rock.png", function(texture:egret.Texture):void {
            this._texture = texture;
            
            this.create();
        }, this, RES.ResourceItem.TYPE_IMAGE);
        RES.getResByUrl("resource/assets/particle1/sun.json", function(data:any):void {
            this._config = data;
            
            this.create();
        }, this, RES.ResourceItem.TYPE_JSON);
        
    }
    
    private create():void {
        if (this._texture && this._config ) {
            var system = new particle.GravityParticleSystem(this._texture, this._config);
            this.addChild(system);
            system.start();
            system.y = 400;
            system.x = 300;
            
            var angle:number = 0;
            egret.startTick(function (timeStamp:number):boolean {
                angle += -2;
                
                system.emitterX = Math.sin(angle * Math.PI / 180) * 200;
                system.emitterY = Math.cos(angle * Math.PI / 180) * 200 / 2;
                
                return false;
            }, this);
        }
    }
}


