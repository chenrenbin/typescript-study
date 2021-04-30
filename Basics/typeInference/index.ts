/*
* 类型推论
* 如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型
*/

// 1.TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论
// let myAge = 'seven' // 等价于let myAge: string = 'seven'
// myAge = 18 // Type 'number' is not assignable to type 'string'.

// 2.如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查
let myAge
myAge = 'seven'
myAge = 7