/*
* 类型断言
* 类型断言（Type Assertion）可以用来手动指定一个值的类型
* 语法：1. 值 as 类型  2.<类型>值
*/
 
// 形如 <Foo> 的语法在 tsx 中表示的是一个 ReactNode，在 ts 中除了表示类型断言之外，也可能是表示一个泛型，故建议大家在使用类型断言时，统一使用 值 as 类型 这样的语法

// 一、 用途：
// 1. 将一个联合类型断言为其中一个类型
  // 之前提到过（联合类型-unionTypes2），当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型中共有的属性或方法
  interface Cat {
    name: string;
    run(): void;
  }
  interface Fish {
    name: string;
    swim(): void;
  }
  function getName(animal: Cat | Fish) {
    return animal.name;
  }
  // 而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型特有的属性或方法，比如
  // function isFish(animal: Cat | Fish) {
  //   if (typeof animal.swim === 'function') { // roperty 'swim' does not exist on type 'Cat | Fish'
  //       return true;
  //   }
  //   return false;
  // }

  // 此时可以使用类型断言，将 animal 断言成 Fish：
  function isFish(animal: Cat | Fish) {
    if (typeof (animal as Fish).swim === 'function') {
      return true;
    }
    return false;
  }

  // 需要注意的是，类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误：
  function swim(animal: Cat | Fish) {
    (animal as Fish).swim(); // js运行时报错 TypeError: animal.swim is not a function
  }
  const tom1: Cat = {
    name: 'Tom',
    run() { console.log('run') }
  };
  swim(tom1)
  // 所以，使用类型断言时尽量避免断言后调用方法或引用深层属性，以减少不必要的运行时错误

// 2.将一个父类断言为更加具体的子类
  class ApiError extends Error {
    code: number = 0;
  }
  class HttpError extends Error {
    statusCode: number = 200;
  }
  function isApiError(error: Error) {
    if (typeof (error as ApiError).code === 'number') {
      return true;
    }
    return false;
  }
  // 上面的例子中，我们声明了函数 isApiError，它用来判断传入的参数是不是 ApiError 类型，为了实现这样一个函数，它的参数的类型肯定得是比较抽象的父类 Error，这样的话这个函数就能接受 Error 或它的子类作为参数了。 但是由于父类 Error 中没有 code 属性，故直接获取 error.code 会报错，需要使用类型断言获取 (error as ApiError).code

  // 2.1 用instanceof代替断言时，有的情况下 ApiError 和 HttpError 不是一个真正的类，而只是一个 TypeScript 的接口（interface），接口是一个类型，不是一个真正的值，它在编译结果中会被删除，当然就无法使用 instanceof 来做运行时判断了
  // interface ApiError21 extends Error {
  //   code: number;
  // }
  // interface HttpError21 extends Error {
  //     statusCode: number;
  // }
  // function isApiError21(error: Error) {
  //   if (error instanceof ApiError21) { // 'ApiError21' only refers to a type, but is being used as a value here.
  //     return true;
  //   }
  //   return false;
  // }

// 3. 将任何一个类型断言为 any
  // 当我们引用一个在此类型上不存在的属性或方法时，就会报错, 这种错误提示显然是非常有用的
  // const foo: number = 1;
  // foo.length = 1; // Property 'length' does not exist on type 'number'

  // 有的时候，我们非常确定这段代码不会出错，比如下面这个例子
  // let foo1: number
  // window.foo = 1 // Property 'foo' does not exist on type 'Window & typeof globalThis'

  (window as any).foo = 1
  // 上面的例子中，我们也可以通过[扩展 window 的类型（TODO）][]解决这个错误，不过如果只是临时的增加 foo 属性，as any 会更加方便
  // ps: 需要注意的是，将一个变量断言为 any 可以说是解决 TypeScript 中类型问题的最后一个手段。 它极有可能掩盖了真正的类型错误，所以如果不是非常确定，就不要使用 as any

// 4. 将 any 断言为一个具体的类型
  // 在日常的开发中，我们不可避免的需要处理 any 类型的变量，1. 它们可能是由于第三方库未能定义好自己的类型，2. 也有可能是历史遗留的或其他人编写的烂代码，3. 还可能是受到 TypeScript 类型系统的限制而无法精确定义类型的场景。

  // 遇到 any 类型的变量时，我们可以选择无视它，任由它滋生更多的 any。 
  // 我们也可以选择改进它，通过类型断言及时的把 any 断言为精确的类型，亡羊补牢，使我们的代码向着高可维护性的目标发展。

  // 举例来说，历史遗留的代码中有个 getCacheData，它的返回值是 any:
  function getCacheData(key: string): any {
    return (window as any).cache[key];
  }

  // 那么我们在使用它时，最好能够将调用了它之后的返回值断言成一个精确的类型，这样就方便了后续的操作：
  function getCacheData41(key: string): any {
    return (window as any).cache[key];
  }
  interface Cat {
    name: string;
    run(): void;
  }
  const tom41: Cat = getCacheData('tom') as Cat; // 这样的话明确了 tom41 的类型，后续对 tom41 的访问时就有了代码补全，提高了代码的可维护性
  tom41.run()

// 二、 类型断言的限制：
  // TypeScript 是结构类型系统，类型之间的对比只会比较它们最终的结构，而会忽略它们定义时的关系。
  // 5. 所以 若 A 兼容（包含） B，那么 A 能够被断言为 B，B 也能被断言为 A：
  interface Animal5 {
      name: string;
  }
  interface Cat5 {
      name: string;
      run(): void;
  }
  function testAnimal(animal: Animal5) {
      return (animal as Cat5);
  }
  function testCat(cat: Cat5) {
      return (cat as Animal5);
  }
  // ps： 
  // 允许 animal as Cat 是因为「父类可以被断言为子类」(子类（多） extend 父类)
  // 允许 cat as Animal 是因为既然子类拥有父类的属性和方法，那么被断言为父类，获取父类的属性、调用父类的方法，就不会有任何问题，故「子类可以被断言为父类」

// 三、双重断言
// 任何类型都可以被断言为 any；any 可以被断言为任何类型
  // 6.那么我们是不是可以使用双重断言 as any as Foo 来将任何一个类型断言为任何另一个类型呢？
  interface Cat6 {
    run(): void;
  }
  interface Fish6 {
    swim(): void;
  }
  function testCat6(cat: Cat6) {
    return (cat as any as Fish);
  }
  // 若你使用了这种双重断言，那么十有八九是非常错误的，它很可能会导致运行时错误。

// 四、类型断言 vs 类型转换
  // 7. 类型断言只会影响 TypeScript 编译时的类型，类型断言语句在编译结果中会被删除：
  function toBoolean(something: any): boolean {
    return something as boolean;
  }
  toBoolean(1)
  // something 断言为 boolean 虽然可以通过编译，但是并没有什么用，代码在编译后会变成：
  function toBooleanJ(something) {
    return something;
  }
  toBooleanJ(1)
  // 所以类型断言不是类型转换，它不会真的影响到变量的类型
  // 若要进行类型转换，需要直接调用类型转换的方法：
  function toBooleanJ2(something) {
    return Boolean(something)
  }
  toBooleanJ2(1)

// 五、类型断言 vs 类型声明
  // 8. 在这个例子中，使用 as Cat8 将 any 类型断言为了 Cat8 类型
  function getCacheData8(key: string): any {
    return (window as any).cache[key];
  }
  interface Cat8 {
    name: string;
    run(): void;
  }
  const tom8 = getCacheData('tom') as Cat8
  tom8.run()

  // 8.1还有其他方式可以解决这个问题： 将 tom 声明为 Cat81，然后再将 any 类型的 getCacheData81('tom') 赋值给 Cat81 类型的 tom81
  function getCacheData81(key: string): any {
    return (window as any).cache[key];
  }
  interface Cat81 {
    name: string;
    run(): void;
  }
  const tom81: Cat81 = getCacheData81('tom')
  tom81.run()

  // const tom8 = getCacheData('tom') as Cat8；的作用等价于 const tom81: Cat81 = getCacheData81('tom')
  // 8.2上面两个例子的区别
  // interface Animal82 {
  //   name: string;
  // }
  // interface Cat82 {
  //   name: string;
  //   run(): void;
  // }
  // const animal82: Animal82 = {
  //   name: 'tom'
  // }
  // let tom82: Cat82 = animal82 // Property 'run' is missing in type 'Animal82' but required in type 'Cat82'

  // 所以为了增加代码的质量，我们最好优先使用类型声明，这也比类型断言的 as 语法更加优雅

// 六、类型断言 vs 泛型
  // 9. 例子8，还有第三种解决方案：
  function getCacheData9<T>(key: string): T {
    return (window as any).cache[key];
  }
  interface Cat9 {
    name: string;
    run(): void;
  }
  const tom9 = getCacheData9<Cat9>('tom');
  tom9.run()
  // 通过给 getCacheData 函数添加了一个泛型 <T>，我们可以更加规范的实现对 getCacheData 返回值的约束，这也同时去除掉了代码中的 any，是最优的一个解决方案