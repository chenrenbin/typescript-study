/*
* 2、基本数据类型
* JavaScript 的类型分为两种：值类型(基本类型)（Primitive data types）和引用数据类型（Object types）--- 举例值类型常用的几种
*/

// 1.布尔值
let isDone: boolean = false
let isDone1: boolean = Boolean(0)
// Error: 'boolean' is a primitive, but 'Boolean' is a wrapper object. Prefer using 'boolean' when possible.
// let isDone: boolean = new Boolean(0)

// 2.数值
let num: number = 123
let num2: number = 0b1010 // 被编译成十进制
let num8: number = 0o744 // 被编译成十进制
let numNaN: number = NaN
let numInfinity: number = Infinity

// 3.字符串
let str: string = 'chenrenbin'
let strTemplate: string = `${str} in Leelen` // 也支持字符串模板

// 4.Null 和 Undefined
let u: undefined = undefined
let n: null = null
// undefined 和 null 是所有类型的子类型,可以赋值给 number 类型的变量
let numInu: number = undefined
let numInn: number = null

// 5.Viod（特殊但使用场景少）
// Error: Type 'void' is not assignable to type 'number'.
// let v: void  // void运算符: 对给定的表达式进行求值，然后返回 undefined（填充a标签的herf不产生跳转，填充image的src不向服务器请求）。不能给其他类型的变量赋值
// let numInv: number = v