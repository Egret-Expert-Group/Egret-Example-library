/**
 * @copyright www.egret.com
 * @author city
 * @desc 自定义布局可以让您定义更自由的UI布局风格。
 *      这里依赖某种特定的算法来进行对每个元素的定位。
 *      当然，自定义布局需要您充分理解其中所需覆盖方法的含义。
 */

class Main extends eui.UILayer {
    private loadingView:LoadingUI;

    protected createChildren():void {
        super.createChildren();
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation( "eui.IAssetAdapter", assetAdapter );
        this.stage.registerImplementation( "eui.IThemeAdapter", new ThemeAdapter() );
        //Config loading process interface
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild( this.loadingView );
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener( RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this );
        RES.loadConfig( "resource/default.res.json", "resource/" );
    }

    private onConfigComplete( event:RES.ResourceEvent ):void {
        RES.removeEventListener( RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this );
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme( "resource/default.thm.json", this.stage );
        theme.addEventListener( eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this );

        RES.addEventListener( RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this );
        RES.addEventListener( RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this );
        RES.addEventListener( RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this );
        RES.addEventListener( RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this );
        RES.loadGroup( "preload" );
    }

    private isThemeLoadEnd:boolean = false;

    private onThemeLoadComplete():void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }

    private isResourceLoadEnd:boolean = false;

    private onResourceLoadComplete( event:RES.ResourceEvent ):void {
        if ( event.groupName == "preload" ) {
            this.stage.removeChild( this.loadingView );
            RES.removeEventListener( RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this );
            RES.removeEventListener( RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this );
            RES.removeEventListener( RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this );
            RES.removeEventListener( RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this );
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    }

    private createScene() {
        if ( this.isThemeLoadEnd && this.isResourceLoadEnd ) {
            this.startCreateScene();
        }
    }

    private onItemLoadError( event:RES.ResourceEvent ):void {
        console.warn( "Url:" + event.resItem.url + " has failed to load" );
    }

    private onResourceLoadError( event:RES.ResourceEvent ):void {
        //TODO
        console.warn( "Group:" + event.groupName + " has failed to load" );
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete( event );
    }

    private onResourceProgress( event:RES.ResourceEvent ):void {
        if ( event.groupName == "preload" ) {
            this.loadingView.setProgress( event.itemsLoaded, event.itemsTotal );
        }
    }

    private _txInfo:egret.TextField;
    private _grpLayout:eui.Group;
    
    private _idxCount:number;

    protected startCreateScene():void {
   
        /// 创建容器，在其中进行布局
        this._grpLayout = new eui.Group();
        this._grpLayout.bottom = 100;
        this._grpLayout.horizontalCenter = 0;

        this.addChild( this._grpLayout );
        this._grpLayout.width = L.WBASE_OUTLINE;
        this._grpLayout.height = L.HBASE_OUTLINE;

        /// 绘制矩形用于显示 _grpLayout 的轮廓
        var iFillColor:number = ( Math.floor( Math.random() * 0xff ) << 16 )
            + ( Math.floor( Math.random() * 0xff ) << 8 )
            + Math.floor( Math.random() * 0xff );
        var outline:egret.Shape = new egret.Shape;
        outline.graphics.clear();
        outline.graphics.lineStyle( 3, iFillColor );
        outline.graphics.drawRect( 0, 0, L.WBASE_OUTLINE, L.HBASE_OUTLINE ); /// 注意该轮廓为Shape，没有参与布局，所以其尺寸并不能影响容器的尺寸
        outline.graphics.endFill();

        var vcButton:Array<eui.Button> = new Array<eui.Button>();
        var vcCountLib:Array<number> = [ 3, 4, 6, 10, 15, 18 ];     /// 按钮总个数库
        this._idxCount = 0;

        for ( var i:number = 1; i <= 18; ++i ) {
            var btn:eui.Button = new eui.Button();
            btn.label = "按钮" + ( i < 10 ? "0" : "" ) + i;
            vcButton.push( btn );
        }
        
        /*** 本示例关键代码段开始 ***/

        var rLayout:RingLayout = new RingLayout;
        this._grpLayout.layout = rLayout;
        
        /// 随机取一个按钮总个数
        var refillGroup= ()=>{
            this._grpLayout.removeChildren();
            this._grpLayout.addChild( outline );
            var countRdm:number = vcCountLib[ ++this._idxCount% vcCountLib.length ];
            for ( var i:number = 0; i < countRdm; ++i ) {
                this._grpLayout.addChild( vcButton[i] );
            }
        }

        /// 创建事件，在轻触时产生随机个数
        this.stage.addEventListener( egret.TouchEvent.TOUCH_TAP, refillGroup, this );
        
        /// 启动时自动创建一个填充
        refillGroup();

        /*** 本示例关键代码段结束 ***/

            /// 提示信息 （该部分不参与布局）
        this._txInfo = new egret.TextField;
        this.addChild( this._txInfo );

        this._txInfo.size = 28;
        this._txInfo.x = 50;
        this._txInfo.y = 50;
        this._txInfo.textAlign = egret.HorizontalAlign.LEFT;
        this._txInfo.textColor = 0x000000;
        this._txInfo.type = egret.TextFieldType.DYNAMIC;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this._txInfo.text =
            "轻触调整布局元素数量";

    }

}

class L {
    public static WBASE_OUTLINE:number = 580;
    public static HBASE_OUTLINE:number = 650;
}

/// 两种对齐模式之间可以切换
class AlignMode {
    public static GAP:number = 0;
    public static WH:number = 1;
}


/**自定义的环形布局类*/
var UIComponentClass = "eui.UIComponent";
class RingLayout extends eui.LayoutBase{
    public constructor(){
        super();
    }
    /**
     * 计算target的尺寸
     * 因为环形布局，依赖容器尺寸来定义半径，所以需要容器显式的设置width和height,在这种情况下measure方法将失去作用
     * 所以在这个例子里面，不需要重写measure方法
     * 如果您的自定义布局需要根据内部子项计算尺寸，请重写这个方法
     **/
    public measure():void{
        super.measure();
    }
    /**
     * 重写显示列表更新
     */
    public updateDisplayList(unscaledWidth:number, unscaledHeight:number):void{
        super.updateDisplayList(unscaledWidth, unscaledHeight);
        if (this.target==null)
            return;
        
        console.log( unscaledWidth, unscaledHeight );
        var angleBaseRdm:number = Math.PI * 2 * Math.random();  /// 增加随机因子起始角度
        
        var centerX:number = unscaledWidth/2;// 获得容器中心的X坐标
        var centerY:number = unscaledHeight/2;// 获得容器中心的Y坐标
        var horizon:number = centerX/2;// 获得水平可用长度的一半
        var vertical:number = centerY/2;// 获得垂直可用长度的一半
        var radius = horizon > vertical ? vertical : horizon;// 取小的为圆形半径
        var count:number = this.target.numElements;
        var maxX:number = 0;
        var maxY:number = 0;
        
        /// 第一轮循环收集可布局元素，或者说过滤不可布局元素
        var vcElemInLayout:Array<eui.UIComponent> = new Array<eui.UIComponent>();
        for (var i:number = 0; i < count; i++) {
            var layoutElement:eui.UIComponent = <eui.UIComponent> ( this.target.getElementAt( i ) );
            if ( !egret.is( layoutElement, UIComponentClass ) || !layoutElement.includeInLayout ) {
                /// 非布局元素需要排除在布局运算中
                console.log( "非布局", i );
            }else{
                vcElemInLayout.push( layoutElement );
            }
        }
        
        /// debug
        /*var mark:egret.Shape = new egret.Shape;
        mark.graphics.lineStyle( 1 );
        mark.graphics.beginFill( 0x00ff00, 1 );
        mark.graphics.drawRect( -2, -2 ,4, 4 );
        mark.graphics.endFill();
        mark.x = centerX;
        mark.y = centerY;
        this.target.addChild( mark );
        */
        
        count = vcElemInLayout.length;
        for (var i:number = 0; i < count; i++){
            var elementWidth:number = 0;
            var elementHeight:number = 0;
            var angle:number = angleBaseRdm + 2 * Math.PI * i / count;// 获得角度的大小
            var childX:number = centerX + radius * Math.sin(angle) - elementWidth/2;// 获得圆周点的X坐标
            var childY:number = centerY - radius * Math.cos(angle) - elementHeight/2;// 获得圆周点的Y坐标

            vcElemInLayout[i].anchorOffsetX = vcElemInLayout[i].width / 2;
            vcElemInLayout[i].anchorOffsetY = vcElemInLayout[i].height / 2;
            
            vcElemInLayout[i].setLayoutBoundsPosition(childX, childY);
            maxX = Math.max(maxX,childX+elementWidth);
            maxY = Math.max(maxY,childY+elementHeight);
        }
        this.target.setContentSize(maxX,maxY);
    }
}