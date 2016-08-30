## Egret-Example-library
   

> 为保持本代码库干净整洁，将项目中冗余的部分(bin-debug等项目测试用目录)均忽略了。


#### 每个示例项目做完必须要做的
1. 需要对项目发布push到git库，通过`egret publish --version 001`发布并commit->push。
2. 需要在本库根目录的 `tree.json` 内按照已经填入的示例项目，填入新完成项目。每个项目完成都需要填入，这是提供给EDN后台读取项目相关数据的。其中 `backgroundColor` 字段的内容，是 `[bai|hui]` 选其一，即拼音分别代表白色和灰色背底。     
3. 各项目的 `README.md` 也是重要的部分，以面向小白开发者叙述的方式，尽量做到通俗易懂。
4. 达到一个较高完成度后，运行并截图，命名为 <项目名称.jpg>， 保存到项目目录，比如`位图缓存`主题的项目截图位置:`projs/040-bitmap-cache/040-bitmap-cache.jpg`。


#### 内部查看已完成项目链接
[完成的项目链接在这里](./tools/table-link-dynamic.md)，大家将已完成项目发布后通过git同步后统一上传FTP，并解开对应的链接。
