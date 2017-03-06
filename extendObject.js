function prototypeChain_631(){
	//问题在于子类的一个实例改变了引用类型值，导致所有子类实例的引用类型值都会被改变；子类没有办法给超类添加参数
	function SuperType(){
		this.property=true;
		this.arr=['1'];
	}
	SuperType.prototype.getSuperVal = function() {
		console.log(this.property)
	};
	function SubType(){
		this.subProperty=false;
	}
	SubType.prototype = new SuperType();
	//给原型添加方法一定要放在替换原型语句后面
	SubType.prototype.getSubVal = function() {
		console.log(this.subProperty)
	};
    var sub = new SubType();
    sub.getSubVal();
    sub.getSuperVal();
    sub.arr.push('2');
    var sub1=new SubType();
    console.log(sub1.arr);
}

function constructorStealing_632(){
	//缺点是 方法还是无法共享
	function SuperType(arr){
      this.arr=arr;
	}
	function SubType(){
		// 调用父类的构造函数
		SuperType.call(this,['1']);
		this.property=true
	}
	SubType.prototype=new SuperType();
	var sub=new SubType();
	console.log(sub.arr);
	sub.arr.push('2');
	var sub1 = new SubType();
	console.log(sub1.arr);
}

function conbinationInheritance_633(){
	//缺点 两次调用父类构造函数
   function SuperType(name){
   	this.name = name;
   	this.arr=['1'];
   }
   SuperType.prototype.sayName = function() {
   	console.log(this.name);
   };
   function SubType(name,age){
   	SuperType.call(this,name); //2
   	this.age=age;
   }
   SubType.prototype = new SuperType(); //1
   SubType.prototype.sayAge=function(){
   	console.log(this.age);
   }

   var sub=new SubType('sub',1);
   sub.sayName();
   sub.sayAge();
   sub.arr.push('2');
   console.log(sub.arr);

   var sub1=new SubType('sub1',1);
   sub1.sayName();
   sub1.sayAge();
   console.log(sub1.arr);

}

function prototypalInheritance_634(){
	//缺点引用值共享
	function object(o){
		function F(){}
		F.prototype=o;
		return new F();
	}
	var maokitty = {
		name:"maokitty",
		friends:["A"]
	};
	//ECMAScript5可以这么代替: var mao = Object.create(maokitty)
	var mao = object(maokitty);
	mao.name="mao";
	mao.friends.push("B");
	var kitty = object(maokitty);
	kitty.name="kitty";
	kitty.friends.push("C");
	console.log(mao.name);
	console.log(mao.friends);
	console.log(kitty.name);
	console.log(kitty.friends);
}
function parasitic_635(){
	function object(o){
		function F(){}
		F.prototype=o;
		return new F();
	}
	function anotherObj(original){
		var obj = object(original);//调用函数创建新的对象
		obj.sayHi=function(){//增强对象
			console.log("hi");
		}
		return obj;
	}
	var maokitty={
		name:"maokitty"
	}
	var mao = anotherObj(maokitty);
	mao.sayHi();
}
function conbineParasiticPrototypal_636(){
	function object(o){
		function F(){}
		F.prototype=o;
		return new F();
	}
	function inheritPropotype(subType,superType){
		//这里任何返回对象的方式都可以
		var propotype=object(superType.prototype); //创建超类型的副本
		propotype.constructor=subType; //创建副本添加构造
		subType.prototype=propotype; //创建副本给子类型的原型
	}
	function SuperType(name){
       this.name=name;
	}
	SuperType.prototype.sayName = function() {
		console.log(this.name);
	};
	function SubType(name,age){
		SuperType.call(this,name);
		this.age=age;
	}
	inheritPropotype(SubType,SuperType);
	SubType.prototype.sayAge = function() {
		console.log(this.age)
	};
	var sub = new SubType("maokitty",1);
	sub.sayAge();
	sub.sayName();
}
// prototypeChain_631();
// constructorStealing_632();
conbinationInheritance_633(); //用这个
// prototypalInheritance_634();
// parasitic_635()
// conbineParasiticPrototypal_636()

