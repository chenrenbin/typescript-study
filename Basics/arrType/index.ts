/*
* 数组的类型
* 在 TypeScript 中，数组类型有多种定义方式，比较灵活
*/

// 1.「类型 + 方括号」表示法
let arr1: number[] = [1, 1, 2, 3, 5]

// ps: 这种方式，数组的项中不允许出现其他的类型；数组的一些方法的参数也会根据数组在定义时约定的类型进行限制

// 1.1  
// let arr11: number[] = [1, '1', 2, 3, 5] //Type 'string' is not assignable to type 'number'

// 1.2
// let arr12: number[] = [1, 1, 2, 3, 5]
// arr12.push('8')  // Argument of type 'string' is not assignable to parameter of type 'number'

// 2. 用数组泛型表示---Array<elemType> 后续会在进阶系列的泛型Generics介绍
let arr2: Array<number> = [1, 1, 2, 3, 5]

// 3. 用接口表示
interface NumberArray {
  [index: number]: number;
}
let arr3: NumberArray = [1, 1, 2, 3, 5]
 
// ps：虽然接口也可以用来描述数组，但推荐前两种方式（比较简单）; 
// 3.1 接口常用来表示类数组---类数组（Array-like Object）不是数组类型，比如 arguments
// function sum() {
//   let args: number[] = arguments; // Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 15 more
// }

function sum1() {
  let args: {
      [index: number]: number;
      length: number;
      callee: Function;
  } = arguments;
}
// 在这个例子中，我们除了约束当索引的类型是数字时，值的类型必须是数字之外，也约束了它还有 length 和 callee 两个属性

// TypeScript常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等
function sum2() {
  let args: IArguments = arguments;
}
// 其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是
// interface IArguments {
//   [index: number]: any;
//   length: number;
//   callee: Function;
// }

// 4. 一个比较常见的做法是，用 any 表示数组中允许出现任意类型
let arr4: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }]

