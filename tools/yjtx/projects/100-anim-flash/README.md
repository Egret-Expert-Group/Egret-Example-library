帧动画示例。

触摸舞台会重新播放。

播放过程中如果有帧事件，会触发 egret.MovieClipEvent.FRAME_LABEL 事件。

在播放结束一次后会触发 egret.Event.LOOP_COMPLETE 事件。全部播放完全后，会触发 egret.Event.COMPLETE 事件。