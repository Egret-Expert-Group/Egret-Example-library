<!-- 170-eui-image EDN Egret示例库项目 -->

Image控件允许您在运行时显示JPEG、PNG等图片文件文件。
Image继承至Bitmap，因此您可以直接对其bitmapData属性，赋值从外部加载得到的位图数据以显示对应图片。
同时，Image还提供了更加方便的source属性，source属性可以接受一个网络图片url作为值，赋值为url后，它内部会自动去加载并显示图片。
并且您同样也可以直接把BitmapData对象赋值给source属性以显示图片。