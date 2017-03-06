//ECMAScript包含两种属性：数据属性和访问器属性

//对象 6.6.1 1小节
function literally_611(){
	var person = {};
	//person:属性所在的对象 "name":属性名字 {..}：描述符对象
	Object.defineProperty(person,"name",{
		writable:false,			//不能修改属性,调用defineProperty方法默认是false
		configurable:false,		//不能删除属性,调用defineProperty方法默认是false
		value:"Maokitty"		//属性的值，调用defineProperty方法默认是undefind
	})
	console.log(person.name)
	//严格模式会出错
	person.name="Mao"
	console.log(person.name)
	//严格模式会出错
	delete person.name
	console.log(person.name)
	//属性已经不可配置，不允许再次定义
	// Object.defineProperty(person,"name",{
	// 	configurable:true,
	// 	value:"Mao"
	// })
}

function literally_612(){
	var book ={
		_year:2004,
		edition:1
	}
	Object.defineProperty(book,"year",{
		get:function(){
			return this._year
		},
		set:function(newValue){
			if (newValue>2004) {
				this._year=newValue;
				this.edition+=newValue-2004
			}
		}

	});
	book.year =2005
	console.log(book.edition)
}

function literally_613(){
	var book = {};
	// 一次性设定多个属性
	Object.defineProperties(book,{
		// 数据属性
		_year:{
			value:2004
		},
		edition:{
			value:1
		},
		// 访问器属性
		year:{
			get:function(){
				return this._year
			},
			set:function(newValue){
				if (newValue>2004) {
					this._year=newValue;
					this.edition+=newValue-2004;
				}
			}

		}
	});
	// getOwnPropertyDescriptor 取得给定属性的描述符，参数是:属性所在的对象和描述符属性的名称
	var descriptor = Object.getOwnPropertyDescriptor(book,"_year");
	console.log(descriptor.value);
	console.log(descriptor.configurable);
	console.log(descriptor.value);
	console.log(descriptor.enumerable);
	console.log(typeof descriptor.get);

	var descriptor = Object.getOwnPropertyDescriptor(book,"year");
	console.log(descriptor.value);
	console.log(descriptor.enumerable);
	console.log(typeof descriptor.get);

}

function factoryMode_621(){
	//工厂模式，无法解决对象识别的问题
	function createPerson(name,age){
		var obj={}
		obj.name = name;
		obj.age=age;
		obj.sayName=function(){
			console.log(this.name)
		}
		return obj;
	}
	var maokitty=createPerson("Maokitty",1);
	var mao=createPerson("mao",1);
	mao.sayName();
	maokitty.sayName();
}
function constructFunction_622(){
	function Person(name,age){
		this.name=name;
		this.age=age;
		this.sayName = sayName;
	}
	// 将方法定义在全局，然后构造函数中引用，但是只能在某个对象中引用，多个方法需要定义多个全局函数，这样封装性不好
	function sayName(){
		console.log(this.name);
	}
	var maokitty=new Person("maokitty",1);
	var mao=new Person("mao",1)
	mao.sayName();
	maokitty.sayName();
	console.log(mao.sayName == maokitty.sayName)
	console.log(mao instanceof Person)
	console.log(mao instanceof Object)
	console.log(typeof mao)
}

function prototypeMode_623_1(){
	// 原型的缺点：实例之间共享所有的原型属性，那么一个实例修改属性值会全部反应到所有的实例中，这样对非全局共享属性容易造成问题
  function Person(){

  }
  Person.prototype.name="maokitty";
  Person.prototype.age=1;
  Person.prototype.sayName = function(){
  	console.log(this.name)
  }
  // 创建对象的时候，会为maokitty添加一个prototype属性，此属性会指向函数原型
  var maokitty = new Person();
  maokitty.sayName()
  console.log(maokitty.constructor == Person)
}

function prototypeMode_623_2(){
	function Person(){}
	// 原型链的一种更简单的方式,本质上重写了原型函数。以一个字面量对象的方式创建了原型，那么他的构造函数不再指向原函数，而是Object。可通过在构造函数中添加 constructor:Persion解决
	//坏处在于使构造函数变的可以枚举
	Person.prototype = {
		"name":"maokitty",
		"age":1,
		"sayName":function(){
			console.log(this.name);
		}
	}
	var maokitty = new Person();
	maokitty.sayName();
	maokitty.name="mao"
	maokitty.sayName();
	console.log(maokitty.constructor == Person)
	var mao= new Person();
	mao.sayName();
}
function conbineConstructorPrototype(){
	// 自己的属性通过构造函数的当时使用
	function Person(name,age){
		this.name = name;
		this.age=age;
	}
	// 共有的属性、方法通过原型链来写
	Person.prototype={
		constructor:Person,
		job:"human",
		sayName : function(){
			console.log(this.name);
		}
	}
	var maokitty = new Person("maokitty",1);
	var mao = new Person("mao",1);
	console.log(mao.job);
	console.log(maokitty.job);
	mao.sayName();
	maokitty.sayName();
}


// literally_611() 
// literally_612()
// literally_613()  // 字面量创建对象缺点在于使用同一个对象创建对象
// factoryMode_621() //工厂模式
// constructFunction_622() //构造函数方式
// prototypeMode_623_1() //使用原型链的方式
// prototypeMode_623_2() //使用原型链的简单方式
conbineConstructorPrototype_624() //推荐使用这种方式




