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
        this.addChild(new coreElement.Game());
    }
    
}