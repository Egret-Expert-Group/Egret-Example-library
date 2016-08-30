/**
 * @copyright www.egret.com
 * @author 东北大客
 * @desc ProgressBar控件为随时间而变的任务进度提供了形象化的表示。
 *      可以通过direction属性设置ProgressBar填充在逐步完成过
 *      程中扩展的方向。
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
    
    ///保存当前进度
	private _nTick:number = 0;
	///保存当前循环数
    private _nLoop:number = 0;
	///保存循环状态
    private _matirx:Array<number> = [ 
               1,-1,0,0,
               0,1,-1,0,
               0,0,1,-1,
               -1,0,0,1
           ];
    ///保存进度条       
	private _progressBar:Array<eui.ProgressBar> = [];	
    ///保存进度条原始方向
    private _direction:Array<string> = [
        eui.Direction.BTT,
        eui.Direction.LTR,
        eui.Direction.TTB,
        eui.Direction.RTL
    ];   
	private _nSpeed:number = 2;
    
    
    protected startCreateScene():void {
            /*** 本示例关键代码段开始 ***/    
		   var progressBar:Array<eui.ProgressBar> = []; 	
		   ///创建进度条并设置其位置	
           var leftBar:eui.ProgressBar = new eui.ProgressBar();
           leftBar.height = 280;
           leftBar.width = 65;
           leftBar.horizontalCenter = -172.5;
           leftBar.verticalCenter = 0; 
           ///设置进度条的方向
           leftBar.direction = eui.Direction.BTT;
           this.addChild(leftBar); 
		   progressBar.push(leftBar);
           
           var topBar:eui.ProgressBar = new eui.ProgressBar();
           topBar.width = 280;
           topBar.height = 65;
           topBar.verticalCenter = -107.5;
           topBar.horizontalCenter = 0;
           topBar.direction = eui.Direction.LTR;
           this.addChild(topBar);
		   progressBar.push(topBar);
           
           var rightBar:eui.ProgressBar = new eui.ProgressBar();
           rightBar.height = 280;
           rightBar.width = 65;
           rightBar.horizontalCenter = 172.5;
           rightBar.verticalCenter = 0;
           rightBar.direction = eui.Direction.TTB;
           this.addChild(rightBar);
		   progressBar.push(rightBar);
                      
           var bottomBar:eui.ProgressBar = new eui.ProgressBar();
           bottomBar.width = 280;
           bottomBar.height = 65;
           bottomBar.verticalCenter = 107.5;
           bottomBar.horizontalCenter = 0;
           bottomBar.direction = eui.Direction.RTL;
           this.addChild(bottomBar);
           progressBar.push(bottomBar);
           /*** 本示例关键代码段结束 ***/   
           ///保存 progressBar
		   this._progressBar = progressBar;
		   ///模拟进度事件，在每帧增加值 
           this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this); 
	}
	
	private onEnterFrame(e) {
		///获得本地变量
		var tick = this._nTick;
		var loop = this._nLoop;
		var matirx = this._matirx;
		var progressBar = this._progressBar;
        var direction = this._direction;
        var speed = this._nSpeed;	   
		///循环增加进度值
		for(let i = 0; i < progressBar.length; i++) {
            ///增加 progressBar 的值
			progressBar[i].value += matirx[loop + i * 4] * speed;
            if (progressBar[i].value === progressBar[i].maximum) {
                ///改变 progressBar 的方向
                progressBar[i].direction = progressBar[(i+6) % 4].direction;
            } else if (progressBar[i].value === progressBar[i].minimum && progressBar[i].direction !== direction[i]) {
                 ///重置 progressBar 的方向
                 progressBar[i].direction = direction[i];
            }
		}
		///增加进度
	    this._nTick++;
	   
		if (tick === progressBar[0].maximum / speed) {
            ///当循环完成之后清零
		    loop === progressBar.length - 1 ? this._nLoop = 0 : this._nLoop++;
		    this._nTick = 0;
	    }
	}     
}
