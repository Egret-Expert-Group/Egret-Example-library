/**
 * Created by huanghaiying on 15/3/23.
 */
module URLTest {
    export function testGet() {
        drawText();

        //创建GET请求
        var url: string = "http://httpbin.org/get";
        var loader: egret.URLLoader = new egret.URLLoader();
        //loader.dataFormat = egret.URLLoaderDataFormat.VARIABLES;
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE,onGetComplete,this);
        loader.load(new egret.URLRequest(url));
        this.statusGetLabel.text = "正在向httpbin.org发送GET请求";

        return this.statusGetLabel;
    }

    export function testPost() {
        drawText();

        //创建POST请求
        var url: string = "http://httpbin.org/post";
        var loader: egret.URLLoader = new egret.URLLoader();
        //loader.dataFormat = egret.URLLoaderDataFormat.VARIABLES;
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE,onPostComplete,this);
        var request: egret.URLRequest = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.POST;
        request.data = new egret.URLVariables("test=ok");
        loader.load(request);
        this.statusGetLabel.text = "正在向httpbin.org发送POST请求";

        return this.statusGetLabel;
    }

    //GET请求完成
    function onGetComplete(event: egret.Event): void {
        var loader: egret.URLLoader = <egret.URLLoader>event.target;
        var data: egret.URLVariables = loader.data;
        this.statusGetLabel.text = "获得GET响应! ";
        //this.statusGetLabel.text += "\nGET响应: \n" + decodeURIComponent(data.toString());
        this.statusGetLabel.text += "\nGET响应: \n" + data.toString();
    }

    //POST请求完成
    function onPostComplete(event: egret.Event): void {
        var loader: egret.URLLoader = <egret.URLLoader>event.target;
        var data: egret.URLVariables = loader.data;
        this.statusGetLabel.text = "获得POST响应! ";
        //this.statusGetLabel.text += "\nPOST响应: \n" + decodeURIComponent(data.toString());
        this.statusGetLabel.text += "\nPOST响应: \n" + data.toString();
    }

    //绘制文本
    var statusGetLabel: egret.TextField;
    function drawText() {
        this.statusGetLabel = new egret.TextField();
        this.statusGetLabel.size = 12;
        this.statusGetLabel.text = "状态文本";
        this.statusGetLabel.x = 10;
        this.statusGetLabel.y = 10;
        this.statusGetLabel.width = 430;
        this.statusGetLabel.height = 430;
        this.statusGetLabel.textColor = 0x0000ff;
        //this.addChild( this.statusGetLabel );
    }
}
