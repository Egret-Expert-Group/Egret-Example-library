/**
 * @copyright www.egret.com
 * @author A闪
 * @desc 通过键盘来控制。
 */

class Main extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        this.stage.dirtyRegionPolicy = "off";
        var shp:egret.Shape = new egret.Shape;
        shp.graphics.beginFill( 0x335577, .6 );
        shp.graphics.drawRect( 0, 0, this.stage.stageWidth, this.stage.stageHeight );
        shp.$graphics.endFill();
        shp.cacheAsBitmap = true;
        this.addChild( shp );
        
        this.addChild(new coreElement.Game());
    }
}