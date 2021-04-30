/*
* 函数的类型
* 函数是 JavaScript 中的一等公民
*/

// 1.函数申明
// Js: 
  function sum(x, y) {
    return x + y;
  }
// Ts: 一个函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出都考虑到，其中函数声明的类型定义较简单
  function sumT(x: number, y: number): number {
    return x + y;
  }
  // 输入多余的（或者少于要求的）参数，是不被允许的: （可用第4点解决）
  // sumT(1, 2, 3) // Expected 2 arguments, but got 3
  // sumT(1) // Expected 2 arguments, but got 1

// 2.函数表达式（Function Expression）
// Js:
  let mySum = function (x, y) {
    return x + y;
  }
// Ts:
  let mySumT = function (x: number, y: number): number {
    return x + y;
  }
  // 2.1 上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 mySumT，是通过赋值操作进行类型推论而推断出来的。如果需要我们手动给 mySumT 添加类型，则应该是这样
  let mySumT21: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
  }
  // ps: 注意不要混淆了 TypeScript 中的 => 和 ES6 中的 =>; 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

// 3.用接口定义函数的形状
  interface SearchFunc {
    (source: string, subString: string): boolean;
  }
  let mySearch: SearchFunc
  mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
  }

// 4.可选参数
  function buildName(firstName: string, lastName?: string) {
    return lastName ? (firstName + ' ' + lastName) : firstName;
  }
  let tomcat = buildName('Tom', 'Cat');
  let tomName = buildName('Tom')
  
  // ps: 选参数后面不允许再出现必需参数了：
  // function buildName41(firstName?: string, lastName: string) { // A required parameter cannot follow an optional parameter
  //   return lastName ? (firstName + ' ' + lastName) : firstName;
  // }
  // let tomcat41 = buildName('Tom', 'Cat');
  // let tomName41 = buildName(undefined, 'Tom')

// 5. 参数默认值
// TypeScript 会将添加了默认值的参数识别为可选参数
  function buildName5(firstName: string, lastName: string = 'Cat') {
    return firstName + ' ' + lastName;
  }
  let tomcat5 = buildName('Tom', 'Cat');
  let tom5 = buildName('Tom')

  // 此时就不受「可选参数必须接在必需参数后面」的限制了
  function buildName51(firstName: string = 'Tom', lastName: string) {
    return firstName + ' ' + lastName;
  }
  let tomcat51 = buildName('Tom', 'Cat');
  let tom51 = buildName('Tom')

// 6. 剩余参数
// ES6 中，可以使用 ...rest 的方式获取函数中的剩余参数（rest 参数）：
  function push(array, ...items) {
    items.forEach(function(item) {
        array.push(item);
    });
  }
  let a: any[] = [];
  push(a, 1, 2, 3)

// 事实上，items 是一个数组。所以我们可以用数组的类型来定义它
  function push61(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
  }
  let a61 = [];
  push61(a, 1, 2, 3)

// 7. 重载---重载允许一个函数接受不同数量或类型的参数时，作出不同的处理
// 比如，我们需要实现一个函数 reverse，输入数字 123 的时候，输出反转的数字 321，输入字符串 'hello' 的时候，输出反转的字符串 'olleh'

  // 利用联合类型，我们可以这么实现：
  function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
      return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
      return x.split('').reverse().join('');
    }
  }

  // 然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串
  // 这时，我们可以使用重载定义多个 reverse 的函数类型：
  function reverse71(x: number): number;
  function reverse71(x: string): string;
  function reverse71(x: number | string): number | string {
    if (typeof x === 'number') {
      return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
      return x.split('').reverse().join('');
    }
  }
  // ps：注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面
