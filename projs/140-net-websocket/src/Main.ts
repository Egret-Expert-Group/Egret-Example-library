/**
 * @copyright www.egret.com
 * @author A闪
 * @desc Websocket通信实例
 */

class Main extends egret.DisplayObjectContainer {


    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this); 
		
		RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
		RES.loadConfig("resource/resource.json", "resource/");
	}

	private onConfigComplete(event: RES.ResourceEvent): void {
	        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
			RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
			RES.loadGroup("preload");
	}

	private onResourceLoadComplete(event: RES.ResourceEvent): void {
		this.init();
	}

	private socket:egret.WebSocket;
	private init()
	{
		this.socket = new egret.WebSocket();
		this.socket.addEventListener( egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this );
		this.socket.addEventListener( egret.Event.CONNECT, this.onSocketOpen, this );
		this.socket.connect( "echo.websocket.org", 80 );
		this.drawScene();
	}

	private msgText:egret.TextField;
	private msgPushText:egret.TextField;
	private pushMsgBtn:egret.Sprite;
	private drawScene()
	{
		var bg:egret.Bitmap = new egret.Bitmap();
		bg.texture = RES.getRes( "background_png" );
		this.addChild( bg );

		this.msgText = new egret.TextField();
		this.msgText.width = 370;
		this.msgText.height = 250;
		this.msgText.x = 35;
		this.msgText.y = 30;
		this.msgText.background = true;
		this.msgText.backgroundColor = 0xffffff;
		this.msgText.textColor = 0;
		this.msgText.size = 12;
		this.addChild( this.msgText );

		this.msgPushText = new egret.TextField();
		this.msgPushText.width = 285;
		this.msgPushText.height = 35;
		this.msgPushText.x = 30;
		this.msgPushText.y = 300;
		this.msgPushText.background = true;
		this.msgPushText.backgroundColor = 0xffffff;
		this.msgPushText.textColor = 0;
		this.msgPushText.type = egret.TextFieldType.INPUT;
		this.addChild( this.msgPushText );

		this.pushMsgBtn = new egret.Sprite();
		this.pushMsgBtn.x = 330;
		this.pushMsgBtn.y = 300;
		this.addChild( this.pushMsgBtn );
		this.pushMsgBtn.touchEnabled = true;
		this.pushMsgBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onPushMsg, this );
		
		var btnbg:egret.Bitmap = new egret.Bitmap();
		btnbg.texture = RES.getRes( "sendbtn_png" );
		this.pushMsgBtn.addChild( btnbg );

		console.log("draw scene!");
	}

	private onReceiveMessage( evt:egret.ProgressEvent )
	{
		var msg:string = this.socket.readUTF();
		this.msgText.text += "\nServer:"+msg;
	}

	private onSocketOpen( evt:egret.Event )
	{
		this.msgText.text += "\nThe connection is successful!";
	}

	private onPushMsg( evt:egret.TouchEvent )
	{
		this.socket.writeUTF( this.msgPushText.text );	
		this.socket.flush();
		this.msgPushText.text = "";
	}
}


