/**
 * @copyright www.egret.com
 * @author yjtx
 * @desc 富文本 xml 格式使用方式。
 *      目前支持有：font、size、color/textcolor、stroke、strokeColor、fontFamily、href、bold/b、itatic/i、u
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        var text = new egret.TextField();
        text.textColor = 0xffffff;
        text.width = 540;
        text.size = 30;
        text.lineSpacing = 40;
        /*** 本示例关键代码段开始 ***/
        var str = '<font size=20>妈妈再也不用担心我在</font>'
            + '<font color=0x336699 size=60 strokecolor=0x6699cc stroke=2>Egret</font>'
            + '<font fontfamily="楷体">里说一句话不能包含</font>'
            + '<font fontfamily="楷体"><u>各种</u></font>'
            + '<font color=0xff0000>五</font>'
            + '<font color=0x00ff00>彩</font>'
            + '<font color=0xf000f0>缤</font>'
            + '<font color=0x00ffff>纷</font>'
            + '<font>、\n</font>'
            + '<font size=56>大</font>'
            + '<font size=16>小</font>'
            + '<font size=26>不</font>'
            + '<font size=34>一</font>'
            + '<font>、</font>'
            + '<font color=0x00ff00><i>格</i></font>'
            + '<font size=26 color=0xf000f0>式</font>'
            + '<font color=0xf06f00><i>各</i></font>'
            + '<font fontfamily="KaiTi">样的文字</font>' //楷体
            + '<font>了！</font>';
        text.textFlow = new egret.HtmlTextParser().parser(str);
        /*** 本示例关键代码段结束 ***/
        this.addChild(text);
        text.x = 320 - text.textWidth / 2;
        text.y = 400 - text.textHeight / 2;
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
