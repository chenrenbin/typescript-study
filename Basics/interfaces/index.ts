/*
* 5、对象的类型——接口
* 在 TypeScript 中，使用接口（Interfaces）来定义对象的类型
*/

// 1.TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述
interface Person {
  name: string;
  age: number;
}

let tom: Person = {
  name: 'Tom',
  age: 25
}
// ps： 上面的例子，我们定义了一个接口 Person，接着定义了一个变量 tom，它的类型是 Person。这样，我们就约束了 tom 的形状必须和接口 Person 一致 (接口一般首字母大写, 有的编程语言中会建议接口的名称加上 I 前缀)

// 2.定义的变量比接口少了一些属性是不允许的, 多一些属性也是不允许的
// interface Person1 {
//   name: string;
//   age: number;
// }
// let tom1: Person1 = { //Property 'age' is missing in type '{ name: string; }' but required in type 'Person1'
//   name: 'Tom'
// }

// interface Person2 {
//   name: string;
//   age: number;
// }
// let tom2: Person2 = { // Object literal may only specify known properties, and 'gender' does not exist in type 'Person2'
//   name: 'Tom',
//   age: 25,
//   gender: 'male'
// }

// ps: 可见，赋值的时候，变量的形状必须和接口的形状保持一致
// 3. 我们希望不要完全匹配一个形状，那么可以用---可选属性
interface Person3 {
  name: string;
  age?: number;
}
let tom3: Person3 = {
  name: 'Tom'
}

// 4.有时候我们希望一个接口允许有任意的属性，可以使用---任意属性
interface Person4 {
  name: string;
  age?: number;
  [propName: string]: any;
}

let tom4: Person4 = {
  name: 'Tom',
  gender: 'male'
}

// ps: 注意
// 4.1 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集（晦涩）
// interface Person41 {
//   name: string;
//   age?: number;
//   [propName: string]: string; // 任意属性的类型string不包含可选属性age的类型number
// }
// let tom41: Person41 = { // Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person41'
//   name: 'Tom',
//   age: 25,              // Property 'age' is incompatible with index signature. Type 'number' is not assignable to type 'string'
//   gender: 'male'
// }

// 4.2 一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型
interface Person42 {
  name: string;
  age?: number;
  [propName: string]: string | number;
}

let tom42: Person42 = {
  name: 'Tom',
  age: 25,
  gender: 'male'
}

// 5.有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly 定义---只读属性
interface Person5 {
  readonly id: number; // 只读
  name: string;
  age?: number;
  [propName: string]: any;
}

let tom50: Person5 = {
  id: 89757,
  name: 'Tom',
  gender: 'male'
}

// tom.id = 9527 // 创建后被赋值会报异常：Property 'id' does not exist on type 'Person5'

// ps 注意
// 5.1 只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候
interface Person51 {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}

// let tom501: Person51 = { // id属性定义缺失：Property 'id' is missing in type '{ name: string; gender: string; }' but required in type 'Person51'
//   name: 'Tom',
//   gender: 'male'
// }

// tom.id = 89757 // Property 'id' does not exist on type 'Person51'



// 接口总结：
//   1.接口用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述
//   2.定义的变量比接口少了一些属性是不允许的, 多一些属性也是不允许的---属性完整性
//   3.我们希望不要完全匹配一个形状，那么可以用---可选属性
//   4.有时候我们希望一个接口允许有任意的属性，可以使用---任意属性
//   5.有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly 定义---只读属性