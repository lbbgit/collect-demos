NIL = [];

Array.prototype.toEvalString = function()
{
 if(this.length <= 0) return "NIL";
 var str = "";
 for (var i = 0; i < this.length; i++)
 {
  if(this[i] instanceof Array)
   str += "," + this[i].toEvalString();
  else str += "," + this[i];
 }
 return "[" + str.slice(1) + "]";
};

(function(){
 
 LispScript = {
  Run : run
 };
 
 function run(code)
 {
  if(code instanceof Array)
  {
   var elements = new Array();
   for (var i = 0; i < code.length; i++)
   {
    code[i] = run(code[i]); //递归向下读取
    if(code[i] instanceof Function)  //解析表达式
    {
     if(code[i].length <= 0) //无参函数可省略[]直接以函数名称调用
     {
      code[i] = code[i].call(null);
     }
     else if(i == 0)  //调用带参数的函数[funcall,args...]
     {
      return code[i].apply(null, code.slice(1));
     }
    }
   }

   return code;
  }
  return Element(code);
 };
})();

function Assert(msg, cond)
{
 if(cond)
  return true;
 else
  {
   alert(msg);
   throw new Error(msg);
  }
};

function Element(arg)
{
 if(arg == null)
  return [];
 else if(arg instanceof Function && arg.length <= 0)
  return arg.call(null);
 else
  return arg;
};

__funList = new Array();