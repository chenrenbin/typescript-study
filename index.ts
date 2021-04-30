function sayHello(person: string) {
  return 'Hello, ' + person;
}

let user = 'Tom';
// let user = [0, 1, 2]; // 异常数据类型编译报错还是会生产编译结果：Argument of type 'number[]' is not assignable to parameter of type 'string'.

console.log(sayHello(user));