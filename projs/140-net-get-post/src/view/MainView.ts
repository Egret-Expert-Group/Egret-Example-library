/**
 *
 * @author 
 *
 */
class MainView extends eui.Component{
	public constructor() {
    	super();
	}
	
    public getButton:eui.RadioButton;
    public postButton:eui.RadioButton;
    public title:eui.BitmapLabel;
    public loading:eui.Image;
    public loadingLabel:eui.BitmapLabel;
    public argsLabel:eui.BitmapLabel;
    public args:eui.List;
    public headers:eui.List;
    public originLabel:eui.BitmapLabel;
    public urlLabel:eui.BitmapLabel;
	//测试参数传递
    private testParams = { "key1": "value1","key2": "value2","key3": "value3"};
	
    protected createChildren(): void {
        super.createChildren();
        this.skinName = new mainviewSkin();
    
        this.getButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onGetButton,this);
        this.postButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPostButton,this);  
        this.onGetButton();
    }
    
    private onGetButton() {
        console.log("onGetButton");
        
        this.title.text = "获得GET响应";
        this.argsLabel.text = "Args";
        var set = <HttpRequestTest.setUp>{};

        set.params = this.testParams;

        set.method = egret.HttpMethod.GET
        set.url = "http://httpbin.org/get";

        set.onSuccerss = this.onSuccess;
        set.that = this;

        HttpRequestTest.httpRequest(set);
        
        this.loading.alpha = 1;
        this.loadingLabel.alpha = 1;
        egret.Tween.get(this.loading,{"loop":"true"}).to({"rotation":"360"},2000);
    }
    
    private onPostButton() {
        console.log("onGetButton");
        
        this.title.text = "获得POST响应";
        this.argsLabel.text = "Form"; 
        var set = <HttpRequestTest.setUp>{};

        set.params = this.testParams;

        set.method = egret.HttpMethod.POST;
        set.url = "http://httpbin.org/post";

        set.onSuccerss = this.onSuccess;
        set.that = this;

        HttpRequestTest.httpRequest(set);
        
        this.loading.alpha = 1;
        this.loadingLabel.alpha = 1;
        egret.Tween.get(this.loading,{ "loop": "true" }).to({ "rotation": "360" },2000);
        
    }
    
    private onSuccess(event: egret.Event) {
        var request = <egret.HttpRequest>event.currentTarget;
        
        egret.Tween.get(this.loading).to({"alpha":0},1000,egret.Ease.sineOut);
        egret.Tween.get(this.loadingLabel).to({ "alpha": 0 },1000,egret.Ease.sineOut);  
        console.log("here is main call" + this.testParams);
        
        var data = JSON.parse(request.response);
        egret.log("post data : ",data);
        
        var args:Array<any> = [];
        
        if(data.form){
            for(var key in data.form) {
                args.push({ label: key + " : " + data.form[key] });
            }
         }else {
            for(var key in data.args) {
                args.push({ label: key + " : " + data.args[key] });
            }
         }   
        this.args.itemRenderer = LabelRenderer;
        this.args.dataProvider = new eui.ArrayCollection(args);
        var headers:Array<any> = [];
        for(key in data.headers){
            headers.push({ label: key + " : " + data.headers[key] });
        }
       
        this.headers.itemRenderer = LabelRenderer;
        this.headers.dataProvider = new eui.ArrayCollection(headers);
        
        this.originLabel.text = data.origin;
        this.urlLabel.text = data.url;
    }
}
