/*
* 联合类型
* 联合类型（Union Types）表示取值可以为多种类型中的一种
*/

// 1.联合类型使用 | 分隔每个类型, string | number的意思是允许 myFavorite 的类型是 string 或者 number，但是不能是其他类型
let myFavorite: string | number
myFavorite = 'seven'
myFavorite = 7

// 2.当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法
// function getLength(something: string | number): number {
//   return something.length  // Property 'length' does not exist on type 'string | number'.
// }
function getStr(something: string | number): string {
  return something.toString()
}

// 3.联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型
let myFavorite1: string | number
myFavorite1 = 'seven'
console.log(myFavorite1.length) // 5
myFavorite1 = 7
// console.log(myFavorite1.length) // Property 'length' does not exist on type 'number'.
