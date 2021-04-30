/*
* 任意值
* 任意值（Any）用来表示允许赋值为任意类型。
*/

// 1.如果是一个普通类型，在赋值过程中改变类型是不被允许的
// let str: string = 'seven';
// str = 7  // Type 'number' is not assignable to type 'string'.

// 2.如果是 any 类型，则允许被赋值为任意类型
let age: any = 'seven'
age = 7

// 3.任意值上访问任何属性都是允许的
let age1: any = 'chenrenbin'
console.log(age1.myAge)
console.log(age1.myAge.lastAge)

// 4.变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型
let something       // 等价于let something: any;
something = 'seven'
something = 7
something.setName('chrb')

