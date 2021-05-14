/*
* 10、声明文件
* 当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能
*/

// 使用声明文件时的关联方法（///三斜杠引用）--- 配合第2点使用
 /// <reference path="./index.d.ts" />

// 1. 什么是声明语句
  // 假如我们想使用第三方库 jQuery，一种常见的方式是在 html 中通过 <script> 标签引入 jQuery，然后就可以使用全局变量 $ 或 jQuery 了: 
  // $('#foo'); / jQuery('#foo');

  // 但是在 ts 中，编译器并不知道 $ 或 jQuery 是什么东西:
  // jQuery('#foo') // annot find name 'jQuery'

  // 这时，我们需要使用 declare var 来定义它的类型
  // declare var jQuery: (selector: string) => any;
  // jQuery('#foo')

  // ps: declare var 并没有真的定义一个变量，只是定义了全局变量 jQuery 的类型，仅仅会用于编译时的检查，在编译结果中会被删除

//2. 什么是声明文件
  // 通常我们会把声明语句放到一个单独的文件（jQuery.d.ts）中，这就是声明文件
  // 一般来说，ts 会解析项目中所有的 *.ts 文件，当然也包含以 .d.ts 结尾的文件。所以当我们将 jQuery.d.ts 放到项目中时，其他所有 *.ts 文件就都可以获得 jQuery 的类型定义了
  jQuery('#foo')