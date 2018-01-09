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
for (var i = 0; i < 5; i++) { // ���� i ���������ܸĳ� let�����Ҫ�ĸ���ô����
 ((j) => {
  tasks.push(new Promise((resolve) => {
   setTimeout(() => {
    console.log(new Date, j);
    resolve(); // ����һ��Ҫ resolve��������벻�ᰴԤ�� work
   }, 1000 * j); // ��ʱ���ĳ�ʱʱ��������
  }));
 })(i);
}

Promise.all(tasks).then(() => {
 setTimeout(() => {
  console.log(new Date, i);
 }, 1000); // ע������ֻ��Ҫ�ѳ�ʱ����Ϊ 1 ��
});





// ģ�����������е� sleep��ʵ���Ͽ������κ��첽����
const sleep = (timeountMS) => new Promise((resolve) => {
 setTimeout(resolve, timeountMS);
});

(async () => { // ������ִ�е� async �������ʽ
 for (var i = 0; i < 5; i++) {
  await sleep(1000);
  console.log(new Date, i);
 }

 await sleep(1000);
 console.log(new Date, i);
})();



var SetProtoTool=function(){
/////����ȥ�ص�ʵ��
//��������ȥ��
Array.prototype.unique = function(){
 var result = [];
 this.forEach(function(v){
  if(result.indexOf(v) < 0){
   result.push(v);
  }
 });
 return result;
}
//����hash��ȥ�أ�����һ�ֿռ任ʱ��ķ���
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
//����ķ�������һ��bug����������[1,2,'1','2',3]��ȥ�ؽ��Ϊ[1,2,3]��
Array.prototype.unique3Q = function(){
 var result = [],hash = {};
 this.forEach(function(v){
  var type = typeof(v); //��ȡԪ������
  hash[v] || (hash[v] = new Array());
  if(hash[v].indexOf(type) < 0){
   hash[v].push(type); //�洢����
   result.push(v);
  }
 });
 return result;
}
//�������ȥ��
Array.prototype.unique4Sort = function(){
 var result = [this[0]];
 this.sort();
 this.forEach(function(v){
  v != result[result.length - 1] && result.push(v); //����result���һ��Ԫ�رȽ�
 });
}

}




/////���������ʵ��
//����һ(�����ܲ���js���鷽������
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
 var key = arr[low]; //ʹ�õ�һ��Ԫ����Ϊ��������
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

//��������ʹ��js���鷽������
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




// ԭʼ���������:  Number����ֵ�� String���ַ����� Boolean�������� Null���գ� Undefined��δ���壩
// ����������һ���� Object������
// ͨ��typeof(x)���Է���һ������x����������,��typeof(null)���ͷ��ص���object��









//�ƽ�����
function Foo() {
getName = function () { alert (1); };
return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);}
//��д��������������
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName(); 



 
console.log('x' in window);//true
var x; x = 0; 
//������������ ��Ϊ��
var x;
console.log('x' in window);//true
x = 0; 


console.log(x);//�����function x(){}
var x=1;
function x(){} 
//��ɣ�
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