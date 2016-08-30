/**
 *
 * @author 
 *
 */
module HttpRequestTest {
    
    export interface setUp {
      url:string;
      method: string;
      response?:string;
      credentials?:boolean;
      params?:any;
      header?:any;
      onSuccerss(event: egret.Event):void;
      that:any;
    }
    
    export function httpRequest(httpSet:setUp) {
        
        var url: string = httpSet.url ? httpSet.url : "http://httpbin.org/get";
        
        var method:string = httpSet.method ? httpSet.method : egret.HttpMethod.GET;
        var header = httpSet.header ? httpSet.header : { "key": "Content-Type","value":"application/x-www-form-urlencoded"}; 
        console.log("url:" + url,"header:"+header);
        var params:string = "";
        
        if(httpSet.params) {
            if(method === egret.HttpMethod.GET)
                url += "?" + paramsFormEncoded(httpSet.params);
            else
                params = paramsFormEncoded(httpSet.params);   
        }
        
        var httpRequest = new egret.HttpRequest();
        httpRequest.responseType = httpSet.response;
        httpRequest.open(url,method);
        httpRequest.setRequestHeader(header.key,header.value);
        httpRequest.send(params);
        httpRequest.addEventListener(egret.Event.COMPLETE,httpSet.onSuccerss.bind(httpSet.that),this);
        httpRequest.addEventListener(egret.IOErrorEvent.IO_ERROR,onIOError,this);
        httpRequest.addEventListener(egret.ProgressEvent.PROGRESS,onProgress,this);
    }
    
    function onIOError(event:egret.IOErrorEvent):void {
        egret.warn("post error : " + event);
    }
    
    function onProgress(event:egret.ProgressEvent):void {
        egret.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    }
    
    export function paramsFormEncoded(params:any) {
        
        var temp:string;
        
        for(var key in params){
            console.log("key:"+ key + "value:"+params[key]);
            if(temp)
                temp += key + "=" + params[key] + "&";
            else
                temp = key + "=" + params[key] + "&";   
        }
            
        return temp.slice(0,-1);        
    }

}