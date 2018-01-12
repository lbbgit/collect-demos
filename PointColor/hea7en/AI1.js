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
    code[i] = run(code[i]); //�ݹ����¶�ȡ
    if(code[i] instanceof Function)  //�������ʽ
    {
     if(code[i].length <= 0) //�޲κ�����ʡ��[]ֱ���Ժ������Ƶ���
     {
      code[i] = code[i].call(null);
     }
     else if(i == 0)  //���ô������ĺ���[funcall,args...]
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