/*
* 9、内置对象
* JavaScript 中有很多内置对象，它们可以直接在 TypeScript 中当做定义好了的类型
*/

// 1. ECMAScript 的内置对象
  // Boolean、Error、Date、RegExp等
  // 我们可以在 TypeScript 中将变量定义为这些类型：
  let b: Boolean = new Boolean(1);
  let e: Error = new Error('Error occurred');
  let d: Date = new Date();
  let r: RegExp = /[a-z]/

// 2. DOM 和 BOM 的内置对象
  // Document、HTMLElement、Event、NodeList 等
  // TypeScript 中会经常用到这些类型：
  let body: HTMLElement = document.body
  let allDiv: NodeList = document.querySelectorAll('div')
  document.addEventListener('click', function(e: MouseEvent) {
    // Do something
  })

//3.  TypeScript 核心库的定义文件
  // TypeScript 核心库的定义文件中定义了所有浏览器环境需要用到的类型，并且是预置在 TypeScript 中的
  //3.1  例子1：
  // Math.pow(10, '2') // Argument of type 'string' is not assignable to parameter of type 'number'.

  //上面的例子中， Math.pow 必须接受两个 number 类型的参数， TypeScript 核心库的定义文件定义：
  interface Math {
    /**
     * Returns the value of a base expression taken to a specified power.
     * @param x The base value of the expression.
     * @param y The exponent value of the expression.
     */
    pow(x: number, y: number): number;
  }

  // 3.2 例子2：
  // document.addEventListener('click', function(e) {
  //   console.log(e.targetCurrent); // Property 'targetCurrent' does not exist on type 'MouseEvent'
  // })

  // 上面的例子中，addEventListener 方法是在 TypeScript 核心库中定义的
  interface Document extends Node, GlobalEventHandlers, DocumentEvent {
    addEventListener(type: string, listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
  }

// 4. 用 TypeScript 写 Node.js
  // 注意，TypeScript 核心库的定义中不包含 Node.js 部分
  // Node.js 不是内置对象的一部分，如果想用 TypeScript 写 Node.js，则需要引入第三方声明文件：npm install @types/node --save-dev
