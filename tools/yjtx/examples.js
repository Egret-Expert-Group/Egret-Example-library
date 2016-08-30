var list = [
     "TextFieldAll",
     "TextFieldAlign",
     "TextFieldBold",
     "TextFieldColor",
     "TextFieldHref",
     "TextFieldInput",
     "TextFieldItalic",
     "TextFieldSize",
     "TextFieldStroke",
     "TextFieldTextFlow",
     "TextFieldTextFlowByArray",
     
     "GraphicsDrawLine",
     "GraphicsDrawCircle",
     "GraphicsDrawRect",
     "GraphicsDrawCurve",
     "GraphicsDrawArc",
     "GraphicsDrawArcHigh",
     
     "MovieClipNormal",
     
     "SoundNormal",
     "VideoNormal",
     
     "ParticleComet",
     "ParticleSnow",
     "ParticleBall",
     
     "RESLoadByUrl",
     "RESGroupPreload",
     "RESCreateGroupPreload"
];

var examples = {
    "Core": list,
    "EUI": ["all"],
    "GUI": ["ocean", "simple"]
};


function returnHref(thirdName, forthName) {
    if (thirdName.indexOf("GUI") >= 0) {
        return "GUIExample/index.html?mainClass=" + forthName + "&test=" + forthName + "&r=" + Math.random();
    }
    else if (thirdName.indexOf("EUI") >= 0) {
        return "EUIExample/index.html?mainClass=" + (forthName) + "&test=" + forthName + "&r=" + Math.random();
    }
    else {
        return "Examples/index.html?mainClass=" + forthName + "&test=" + forthName + "&r=" + Math.random();
    }
}

createRoot("Egret", "examples", examples, returnHref);
