<!-- 090-debug-fps EDN Egret示例库项目 --> 
开启帧频信息面板 Egret 会在舞台的左上角显示 FPS 和 其他性能指标
在 index 文件内找到 data-show-fps 字段，设置为 true 即可显示帧频信息，反之关闭。
其中:
FPS:   - 帧频
Draw:  - 每帧 draw 方法调用的平均次数，脏区域占舞台的百分比
Cost:  - Ticker和EnterFrame阶段显示的耗时,每帧舞台所有事件处理和矩阵运算耗时，绘制显示对象耗时（单位是ms）