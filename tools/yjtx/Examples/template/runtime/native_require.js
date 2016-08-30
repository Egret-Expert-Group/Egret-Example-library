
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"libs/modules/particle/particle.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/examples/GraphicsDrawArc.js",
	"bin-debug/examples/GraphicsDrawArcHigh.js",
	"bin-debug/examples/GraphicsDrawCircle.js",
	"bin-debug/examples/GraphicsDrawCurve.js",
	"bin-debug/examples/GraphicsDrawLine.js",
	"bin-debug/examples/GraphicsDrawRect.js",
	"bin-debug/examples/MovieClipNormal.js",
	"bin-debug/examples/ParticleBall.js",
	"bin-debug/examples/ParticleComet.js",
	"bin-debug/examples/ParticleSnow.js",
	"bin-debug/examples/RESCreateGroupPreload.js",
	"bin-debug/examples/RESGroupPreload.js",
	"bin-debug/examples/RESLoadByUrl.js",
	"bin-debug/examples/SoundNormal.js",
	"bin-debug/examples/TextFieldAlign.js",
	"bin-debug/examples/TextFieldAll.js",
	"bin-debug/examples/TextFieldBold.js",
	"bin-debug/examples/TextFieldColor.js",
	"bin-debug/examples/TextFieldHref.js",
	"bin-debug/examples/TextFieldInput.js",
	"bin-debug/examples/TextFieldItalic.js",
	"bin-debug/examples/TextFieldSize.js",
	"bin-debug/examples/TextFieldStroke.js",
	"bin-debug/examples/TextFieldTextFlow.js",
	"bin-debug/examples/TextFieldTextFlowByArray.js",
	"bin-debug/examples/VideoNormal.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 960,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: true,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};