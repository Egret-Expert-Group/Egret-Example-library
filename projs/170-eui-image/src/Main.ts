/**
 * @copyright www.egret.com
 * @author 东北大客
 * @desc Image控件允许您在运行时显示JPEG、PNG等图片文件文件。
 *      Image继承至Bitmap，因此您可以直接对其bitmapData属性
 *      ，赋值从外部加载得到的位图数据以显示对应图片。
 *      同时，Image还提供了更加方便的source属性，source属性可以
 *      接受一个网络图片url作为值，赋值为url后，它内部会自动去加载并显示图
 *      片。
 *      并且您同样也可以直接把BitmapData对象赋值给source属性以显
 *      示图片。
 */

class Main extends eui.UILayer {

    public constructor(){
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
    }

    private _source:Array<string> =  [ "resource/cartoon-egret_00.png",
        "resource/cartoon-egret_01.png",
        "resource/cartoon-egret_02.png",
        "resource/cartoon-egret_03.png"
    ];

    private addToStage( ) {

        var source:Array<string> = this._source;
        /*** 本示例关键代码段开始 ***/  
        var img:eui.Image = new eui.Image();
		///可以直接通过 source 属性设置图片的源。
        img.source = source[0];
        this.addChild(img);
        img.verticalCenter = 0;
        img.horizontalCenter = 0;
        img.addEventListener(egret.Event.COMPLETE,(e)=>{
			///在图片的载入完成事件中获得图片的宽高。
            egret.log( "宽度:" + img.width,"高度:" + img.height);
        },this);
        img.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
            var img:eui.Image = <eui.Image>e.target;
            var random = Math.floor(Math.random() * 4);
			///随机指定图片的源。
            img.source = source[random];
        },this);
        /*** 本示例关键代码段结束 ***/
		
        var info:eui.Label = new eui.Label();
        info.text = "轻触小白鹭随机切换图片资源";
        this.addChild(info);
        info.textColor = 0x1122cc;
        info.verticalCenter = 220;
        info.horizontalCenter = 0;
    }

    private onComplete(e:egret.Event) {
        var img = e.target;
        ///在图片的载入完成事件中获得图片的宽高。
        egret.log( "宽度:" + img.width,"高度:" + img.height);
    }

    private onTouch(e:egret.Event) {
        var source = this._source;
        var img:eui.Image = <eui.Image>e.target;
        var random = Math.floor(Math.random() * 4);
        ///随机指定图片的源。
        img.source = source[random];
    }
}
