//ask & answer 

function showName() 
{ 
   alert(this.name); 
} 
var obj = { id:1, name:"jacky", showName:showName }; 
obj.showName();


for (var i = 0; i < 5; i++) {
 (function(j) { // j = i
  setTimeout(function() {
   console.log(new Date, j);
  }, 1000);
 })(i);
}
console.log(new Date, i);

//hardest,async
const tasks = [];
for (var i = 0; i < 5; i++) { // 这里 i 的声明不能改成 let，如果要改该怎么做？
 ((j) => {
  tasks.push(new Promise((resolve) => {
   setTimeout(() => {
    console.log(new Date, j);
    resolve(); // 这里一定要 resolve，否则代码不会按预期 work
   }, 1000 * j); // 定时器的超时时间逐步增加
  }));
 })(i);
}

Promise.all(tasks).then(() => {
 setTimeout(() => {
  console.log(new Date, i);
 }, 1000); // 注意这里只需要把超时设置为 1 秒
});





// 模拟其他语言中的 sleep，实际上可以是任何异步操作
const sleep = (timeountMS) => new Promise((resolve) => {
 setTimeout(resolve, timeountMS);
});

(async () => { // 声明即执行的 async 函数表达式
 for (var i = 0; i < 5; i++) {
  await sleep(1000);
  console.log(new Date, i);
 }

 await sleep(1000);
 console.log(new Date, i);
})();



var SetProtoTool=function(){
/////数组去重的实现
//基本数组去重
Array.prototype.unique = function(){
 var result = [];
 this.forEach(function(v){
  if(result.indexOf(v) < 0){
   result.push(v);
  }
 });
 return result;
}
//利用hash表去重，这是一种空间换时间的方法
Array.prototype.unique2 = function(){
 var result = [],hash = {};
 this.forEach(function(v){
  if(!hash[v]){
   hash[v] = true;
   result.push(v);
  }
 });
 return result;
}
//上面的方法存在一个bug，对于数组[1,2,'1','2',3]，去重结果为[1,2,3]，
Array.prototype.unique3Q = function(){
 var result = [],hash = {};
 this.forEach(function(v){
  var type = typeof(v); //获取元素类型
  hash[v] || (hash[v] = new Array());
  if(hash[v].indexOf(type) < 0){
   hash[v].push(type); //存储类型
   result.push(v);
  }
 });
 return result;
}
//先排序后去重
Array.prototype.unique4Sort = function(){
 var result = [this[0]];
 this.sort();
 this.forEach(function(v){
  v != result[result.length - 1] && result.push(v); //仅与result最后一个元素比较
 });
}

}




/////快速排序的实现
//方法一(尽可能不用js数组方法）：
function quickSort_WithoutArray(arr){
 qSort(arr,0,arr.length - 1);
}
function qSort(arr,low,high){
 if(low < high){
  var partKey = partition(arr,low,high);
  qSort(arr,low, partKey - 1);
  qSort(arr,partKey + 1,high);
 }
}
function partition(arr,low,high){
 var key = arr[low]; //使用第一个元素作为分类依据
 while(low < high){
  while(low < high && arr[high] >= arr[key])
   high--;
  arr[low] = arr[high];
  while(low < high && arr[low] <= arr[key])
   low++;
  arr[high] = arr[low];
 }
 arr[low] = key;
 return low;
}

//方法二（使用js数组方法）：
function quickSort(arr){
 if(arr.length <= 1) return arr;
 var index = Math.floor(arr.length/2);
 var key = arr.splice(index,1)[0];
 var left = [],right = [];
 arr.forEach(function(v){
  v <= key ? left.push(v) : right.push(v);
 });
 return quickSort(left).concat([key],quickSort(right));
}




// 原始类型有五个:  Number（数值） String（字符串） Boolean（布尔） Null（空） Undefined（未定义）
// 引用类型有一个： Object（对象）
// 通过typeof(x)可以返回一个变量x的数据类型,但typeof(null)类型返回的是object。









//黄金试题
function Foo() {
getName = function () { alert (1); };
return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);}
//请写出以下输出结果：
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName(); 



 
console.log('x' in window);//true
var x; x = 0; 
//变量声明提升 变为：
var x;
console.log('x' in window);//true
x = 0; 


console.log(x);//输出：function x(){}
var x=1;
function x(){} 
//变成：
var x;
function x(){}
console.log(x);
x=1; 


(function() {
 'use strict';
 var a = window.b = 5;
})();
console.log(b);

String.prototype.repeatify = String.prototype.repeatify || function(times) {
 var str = '';
 for (var i = 0; i < times; i++) {
  str += this;
 }
 return str;
};

console.log('hello'.repeatify(3));