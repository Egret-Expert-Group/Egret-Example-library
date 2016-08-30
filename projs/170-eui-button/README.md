<!-- 170-eui-button EDN Egret示例库项目 --> 
按钮组件是 EUI 的基本组件之一。可以通过按钮的 icon 属性设置按钮的 icon 显示。通过按钮的 label 属性可以设置按钮的显示文字。
按钮的 labelDisplay 属性可以获得到文本标签对象，如果需要操作需要注意类型的转换。
按钮的皮肤一般由包括背景图片，文字标签，和 icon 组成。其中 icon 的 id 应为 iconDisplay。按钮的默认行为中在触摸开始和结束时默认获得按钮的 down 和 up 事件。可以显示设置按钮的状态，或通过设置  currentState 为 null 来取消显示设置。