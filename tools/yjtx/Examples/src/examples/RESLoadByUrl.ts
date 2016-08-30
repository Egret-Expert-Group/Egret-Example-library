//libs:egret,res
//resources:resource/default.res.json,resource/assets/cartoon-egret_00.png,resource/assets/cartoon-egret_01.png,resource/assets/cartoon-egret_02.png,resource/assets/cartoon-egret_03.png,resource/config/description.json
//docs:res模块资源加载示例。\nRES.getResByUrl 来加载一个没有在 default.res.json 中配置的文件。
//name:130-res-get-res-by-url

class RESLoadByUrl extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        this.createGameScene();
    }

    //创建游戏场景
    private createGameScene():void {
        this.createBitmapByName("resource/assets/cartoon-egret_00.png", this.stage.stageWidth / 2, 200);
        this.createBitmapByName("resource/assets/cartoon-egret_01.png", this.stage.stageWidth / 2 + 200, 400);
        this.createBitmapByName("resource/assets/cartoon-egret_02.png", this.stage.stageWidth / 2 - 200, 400);
        this.createBitmapByName("resource/assets/cartoon-egret_03.png", this.stage.stageWidth / 2, 600);
    }

    private createBitmapByName(url:string, x:number, y:number):void {
        /*** 本示例关键代码段开始 ***/
        RES.getResByUrl(url, function(texture:egret.Texture):void {
            var result:egret.Bitmap = new egret.Bitmap();
            result.texture = texture;
            result.scaleX = result.scaleY = 0.5;
            result.anchorOffsetX = result.width / 2;
            result.anchorOffsetY = result.height / 2;
            result.x = x;
            result.y = y;
            this.addChild(result);
        }, this, RES.ResourceItem.TYPE_IMAGE);
        /*** 本示例关键代码段结束 ***/
    }
}


