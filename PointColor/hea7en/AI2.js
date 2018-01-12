

<SCRIPT TYPE="TEXT/JAVASCRIPT">

function found(keyword){
	if(W[keyword]==1){
		return true;
	}else{
		return false;
	}
}
	
//关闭数据库连接
//dataBaseConnectionObject.Close();    

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function parseChinese(inputSentence){
//正向关键词最长匹配法
	//删除待处理字符串头部的空格
	inputSentence=inputSentence.replace(/(^\s+)/,"");
	var inputSentenceLength=inputSentence.length;
	var wordMaxLength=7;
	var resultArray=new Array();
	var resultString="";
	var recognizedWords="";
	
	//如果输入句长度小于词典词汇长度则令最大长度等于句子长度
	if(inputSentenceLength<=wordMaxLength){
		wordMaxLength=inputSentenceLength;
	}
	
	//增加三个空格方便尾部处理，空格数=wordMaxLength-1
	inputSentence+="      ";
	
	for(var i=0;i<inputSentenceLength;i++){
	//尾部还需特殊处理
		for(var j=wordMaxLength;j>0;j--){
			var checkword=inputSentence.substr(i,j);
			if(found(checkword)){
				//alert(checkword);
				recognizedWords+=checkword+",";
				resultArray.push(checkword);
				//注意后面需要-1，因为FOR循环会自动加1
				i=i+j-1;
				break;
			}else{
				if(j==1){
					resultArray.push(checkword);
				}
			}
			
		}
	}
	
	//处理所得到的结果数组
	//由于前面的过程会把英文单词分割成字母，现在需要连接起来
	for(var i=0;i<resultArray.length-1;i++){
		var regw=/\w/;
		if(regw.test(resultArray[i])&&regw.test(resultArray[i+1])){
			resultArray[i+1]=resultArray[i]+resultArray[i+1];
			resultArray[i]="";
		}
	}
	
	//结果数组转换成结果字符串
	resultString=resultArray.join(" ");
	//替换掉里面多余的空格
	resultString=resultString.replace(/\s{2,}/g," ");
	//替换掉多余的逗号去除尾部空元素
	resultString=resultString.replace(/,$/,"");
	//重新将字符串转换回数组
	//去除识别字符串里的重复元素
	if(resultString==""){
		resultArray=new Array();
	}else{
		resultArray=resultString.split(" ").reverse().join(",").match(/([^,]+)(?!.*\1)/ig).reverse(); 
	}
	
	//本分词函数对象各个属性最终值
	recognizedWords=recognizedWords.replace(/,$/,"");
	this.recognizedWords=recognizedWords;
	//注意输入值为空或者不匹配的情况
	if(this.recognizedWords==""){
		this.recognizedWordsArray=new Array();
	}else{
		this.recognizedWordsArray=recognizedWords.split(",").reverse().join(",").match(/([^,]+)(?!.*\1)/ig).reverse(); //ar.reverse().join(",").match(/([^,]+)(?!.*\1)/ig).reverse()//删除数组中重复元素
	}
	
	this.resultString=resultString;
	this.resultArray=resultArray;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function parseChineseBackward(inputSentence){
//逆向关键词最长匹配
	//删除待处理字符串头部的空格
	inputSentence=inputSentence.replace(/(^\s+)/,"");
	var wordMaxLength=7;
	var resultArray=new Array();
	var resultString="";
	var recognizedWords="";
	
	//如果输入句长度小于词典词汇长度则令最大长度等于句子长度
	if(inputSentenceLength<=wordMaxLength){
		wordMaxLength=inputSentenceLength;
	}
	
	
	//增加几个空格方便尾部处理，空格数=wordMaxLength-1
	inputSentence="      "+inputSentence;
	
	var inputSentenceLength=inputSentence.length;
	
	for(var i=inputSentenceLength-1;i>=wordMaxLength-1;i--){
	//尾部还需特殊处理
		for(var j=wordMaxLength;j>=1;j--){
			var checkword=inputSentence.substr(i-j+1,j);
			if(found(checkword)){
				//alert(checkword);
				recognizedWords+=checkword+",";
				resultArray.push(checkword);
				//注意后面需要+1，因为FOR循环会自动j减数1
				i=i-j+1;
				break;
			}else{
				if(j==1){
					resultArray.push(checkword);
				}
			}
			
		}
	}
	
	
	//翻转结果数组	
	resultArray.reverse();
	
	//处理所得到的结果数组
	//由于前面的过程会把英文单词分割成字母，现在需要连接起来
	for(var i=0;i<resultArray.length-1;i++){
		var regw=/\w/;
		if(regw.test(resultArray[i])&&regw.test(resultArray[i+1])){
			resultArray[i+1]=resultArray[i]+resultArray[i+1];
			resultArray[i]="";
		}
	}
	
	//结果数组转换成结果字符串
	resultString=resultArray.join(" ");
	//替换掉里面多余的空格
	resultString=resultString.replace(/\s{2,}/g," ");
	//替换掉多余的逗号去除尾部空元素
	resultString=resultString.replace(/,$/,"");
	//重新将字符串转换回数组
	//去除识别字符串里的重复元素
	if(resultString==""){
		resultArray=new Array();
	}else{
		resultArray=resultString.split(" ").reverse().join(",").match(/([^,]+)(?!.*\1)/ig).reverse(); 
	}
	
	//本分词函数对象各个属性最终值
	
	//识别出来的关键词字串
	recognizedWords=recognizedWords.replace(/,$/,"");
	this.recognizedWords=recognizedWords;
	
	//注意输入值为空或者不匹配的情况
	if(this.recognizedWords==""){
		this.recognizedWordsArray=new Array();
	}else{
		//识别出来的关键词字串转换数组
		this.recognizedWordsArray=recognizedWords.split(",").reverse().join(",").match(/([^,]+)(?!.*\1)/ig).reverse(); //ar.reverse().join(",").match(/([^,]+)(?!.*\1)/ig).reverse()//删除数组中重复元素
	}

	this.resultString=resultString;
	this.resultArray=resultArray;
	
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function matchRate(string1,string2){
//任意两句话的话题匹配程度（只考虑二者的关键词）

	var matchScore1=0;
	var matchScore2=0;

	var chineseWords1=new parseChinese(string1);
	var chineseWords2=new parseChinese(string2);
	
	var keywordsArray1=chineseWords1.recognizedWordsArray;
	var keywordsArray2=chineseWords2.recognizedWordsArray;
	
	var keywordsString1="#"+keywordsArray1.join("##")+"#";
	var keywordsString2="#"+keywordsArray2.join("##")+"#";
	
	var keywordsStringRegX1="/"+"#"+keywordsArray1.join("#|#")+"#/gi";
	var keywordsStringRegX2="/"+"#"+keywordsArray2.join("#|#")+"#/gi";
	
	//用string2的关键词去匹配string1
	var matchArray1=new Array();
	matchArray1=keywordsString1.match(eval(keywordsStringRegX2));
	
	//用string1的关键词去匹配string2
	var matchArray2=new Array();
	matchArray2=keywordsString2.match(eval(keywordsStringRegX1));
	
	if(matchArray1!=null){
		matchScore1=matchArray1.length;
	}else{
		matchScore1=0;
	}
	
	if(keywordsArray2.length>0){
		matchScore1=matchScore1/keywordsArray2.length*100;
	}else{
		matchScore1=0;
	}
	
	if(matchArray2!=null){
		matchScore2=matchArray2.length;
	}else{
		matchScore2=0;
	}
	
	if(keywordsArray1.length>0){
		matchScore2=matchScore2/keywordsArray1.length*100;
	}else{
		matchScore2=0;
	}
	
	//取互相匹配的值的平均值为最终结果
	var averageScore=(matchScore1+matchScore2)*0.5;
	
	return averageScore;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function matchAllRate(string1,string2){
//任意两句话的话题匹配程度（只考虑二者的关键词）

	var matchScore1=0;
	var matchScore2=0;

	var chineseWords1=new parseChinese(string1);
	var chineseWords2=new parseChinese(string2);
	
	var keywordsArray1=chineseWords1.resultArray;
	var keywordsArray2=chineseWords2.resultArray;
	
	var keywordsString1="#"+keywordsArray1.join("##")+"#";
	var keywordsString2="#"+keywordsArray2.join("##")+"#";
	
	var keywordsStringRegX1="/"+"#"+keywordsArray1.join("#|#")+"#/gi";
	var keywordsStringRegX2="/"+"#"+keywordsArray2.join("#|#")+"#/gi";
	
	//用string2的关键词去匹配string1
	var matchArray1=new Array();
	matchArray1=keywordsString1.match(eval(keywordsStringRegX2));
	
	//用string1的关键词去匹配string2
	var matchArray2=new Array();
	matchArray2=keywordsString2.match(eval(keywordsStringRegX1));
	
	if(matchArray1!=null){
		matchScore1=matchArray1.length;
	}else{
		matchScore1=0;
	}
	
	if(keywordsArray2.length>0){
		matchScore1=matchScore1/keywordsArray2.length*100;
	}else{
		matchScore1=0;
	}
	
	if(matchArray2!=null){
		matchScore2=matchArray2.length;
	}else{
		matchScore2=0;
	}
	
	if(keywordsArray1.length>0){
		matchScore2=matchScore2/keywordsArray1.length*100;
	}else{
		matchScore2=0;
	}
	
	//取互相匹配的值的平均值为最终结果
	var averageScore=(matchScore1+matchScore2)*0.5;
	
	return averageScore;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function compare(){
//比较任意两句话的话题相关度
//先识别出两个句子的关键词，然后通过比较二者关键词的匹配程度来确定
//核心算法就是matchScore=string1.match(/keyword1/keyword2/keyword3/g)/keywordCount
//也可以直接比较所有分词，那样就是纯字面比较了

	var matchScore1=0;
	var matchScore2=0;
	
	var string1=document.getElementById("inputString").value;
	var string2=document.getElementById("inputStringMatch").value;
	
	//注意去除字符串中的特殊字符如.*?!,否则匹配结果数值不准
	string1=string1.replace(/\^|\.|\*|\?|\!|\/|\\|\$|\#|\&|\||,|\[|\]|\{|\}|\(|\)|\-|\+|\=/g," ");
	string2=string2.replace(/\^|\.|\*|\?|\!|\/|\\|\$|\#|\&|\||,|\[|\]|\{|\}|\(|\)|\-|\+|\=/g," ");
	
	var chineseWords1=new parseChinese(string1);
	var chineseWords2=new parseChinese(string2);
	
	var keywordsArray1=chineseWords1.recognizedWordsArray;
	var keywordsArray2=chineseWords2.recognizedWordsArray;
	
	var keywordsString1="#"+keywordsArray1.join("##")+"#";
	var keywordsStringRegX1="/"+"#"+keywordsArray1.join("#|#")+"#/gi";
	
	var keywordsString2="#"+keywordsArray2.join("##")+"#";
	var keywordsStringRegX2="/"+"#"+keywordsArray2.join("#|#")+"#/gi";
	
	var matchArray1=new Array();
	//用string2的关键词去匹配string1

	matchArray1=keywordsString1.match(eval(keywordsStringRegX2));
	
	var matchArray2=new Array();
	//用string2的关键词去匹配string1
	matchArray2=keywordsString2.match(eval(keywordsStringRegX1));
	
	if(matchArray1!=null){
		matchScore1=matchArray1.length;
	}else{
		matchScore1=0;
	}
	
	if(keywordsArray2.length>0){
		matchScore1=matchScore1/keywordsArray2.length*100;
	}else{
		matchScore1=0;
	}
	
	if(matchArray2!=null){
		matchScore2=matchArray2.length;
	}else{
		matchScore2=0;
	}
	
	if(keywordsArray1.length>0){
		matchScore2=matchScore2/keywordsArray1.length*100;
	}else{
		matchScore2=0;
	}
	
	matchScore1=Math.round(matchScore1);
	matchScore2=Math.round(matchScore2);
	
	var scoreMin=Math.min(matchScore1,matchScore2);
	var scoreMax=Math.max(matchScore1,matchScore2);
	
	var msg="[句1]   "+string1+"\n[句2]   "+string2
				+"\n\n[关键词串1]"+keywordsString1
				+"\n[关键词串2]"+keywordsString2
				+"\n\n[正则表达式1] "+keywordsStringRegX1
				+"\n[正则表达式2] "+keywordsStringRegX2
				+"\n\n二者话题匹配度：介于 "+scoreMin+"%"+" 到 "+scoreMax+"% 之间";
	alert(msg);

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function compareLiteral(){
//比较任意两句话的话题相关度
//先识别出两个句子的关键词，然后通过比较二者关键词的匹配程度来确定
//核心算法就是matchScore=string1.match(/keyword1/keyword2/keyword3/g)/keywordCount
//此处是字面匹配

	var matchScore1=0;
	var matchScore2=0;
	
	var string1=document.getElementById("inputString").value;
	var string2=document.getElementById("inputStringMatch").value;
	
	//注意去除字符串中的特殊字符如.*?!,否则匹配结果数值不准
	string1=string1.replace(/\^|\.|\*|\?|\!|\/|\\|\$|\#|\&|\||,|\[|\]|\{|\}|\(|\)|\-|\+|\=/g," ");
	string2=string2.replace(/\^|\.|\*|\?|\!|\/|\\|\$|\#|\&|\||,|\[|\]|\{|\}|\(|\)|\-|\+|\=/g," ");
	
	var chineseWords1=new parseChinese(string1);
	var chineseWords2=new parseChinese(string2);
	
	var keywordsArray1=chineseWords1.resultArray;
	var keywordsArray2=chineseWords2.resultArray;
	
	var keywordsString1="#"+keywordsArray1.join("##")+"#";
	var keywordsStringRegX1="/"+"#"+keywordsArray1.join("#|#")+"#/gi";
	
	var keywordsString2="#"+keywordsArray2.join("##")+"#";
	var keywordsStringRegX2="/"+"#"+keywordsArray2.join("#|#")+"#/gi";
	
	var matchArray1=new Array();
	//用string2的关键词去匹配string1

	matchArray1=keywordsString1.match(eval(keywordsStringRegX2));
	
	var matchArray2=new Array();
	//用string2的关键词去匹配string1
	matchArray2=keywordsString2.match(eval(keywordsStringRegX1));
	
	if(matchArray1!=null){
		matchScore1=matchArray1.length;
	}else{
		matchScore1=0;
	}
	
	if(keywordsArray2.length>0){
		matchScore1=matchScore1/keywordsArray2.length*100;
	}else{
		matchScore1=0;
	}
	
	if(matchArray2!=null){
		matchScore2=matchArray2.length;
	}else{
		matchScore2=0;
	}
	
	if(keywordsArray1.length>0){
		matchScore2=matchScore2/keywordsArray1.length*100;
	}else{
		matchScore2=0;
	}
	
	matchScore1=Math.round(matchScore1);
	matchScore2=Math.round(matchScore2);
	
	var scoreMin=Math.min(matchScore1,matchScore2);
	var scoreMax=Math.max(matchScore1,matchScore2);
	
	var msg="[句1]   "+string1+"\n[句2]   "+string2
				+"\n\n[关键词串1]"+keywordsString1
				+"\n[关键词串2]"+keywordsString2
				+"\n\n[正则表达式1] "+keywordsStringRegX1
				+"\n[正则表达式2] "+keywordsStringRegX2
				+"\n\n二者话题匹配度：介于 "+scoreMin+"%"+" 到 "+scoreMax+"% 之间";
	alert(msg);
	
}


///////////////////////////////////////////////////////////////////////

function talk(){
//人工智能聊天
//主要应用了前面的分词、模糊匹配技术

	var bestAnswerIndex=0;
	var bestMatchScore=0;
	
	var questionString=document.getElementById("question").value;
	
	document.getElementById("question").value="";
	
	var now=new Date().toLocaleTimeString();

	//显示问题到屏幕上
	var outputString="<div class='questionbox'><br />"+now+" 冰豆小李<br /><br /><div class='speech'>"+questionString+"</div><br />v>";
	document.getElementById("dialogDisplay").innerHTML+=outputString;
	document.getElementById("dialogDisplay").scrollTop=document.getElementById("dialogDisplay").scrollHeight;
	
	//去除特殊符号以免后续匹配出错
	questionString=questionString.replace(/\^|\.|\*|\?|\!|\/|\\|\$|\#|\&|\||,|\[|\]|\{|\}|\(|\)|\-|\+|\=/g," ");
	
	//搜寻最接近的问答
	for(var i=0;i<QA_Count;i++){
		var answerQ=QA[i].Q;
		answerQ=answerQ.replace(/\^|\.|\*|\?|\!|\/|\\|\$|\#|\&|\||,|\[|\]|\{|\}|\(|\)|\-|\+|\=/g," ");
		var matchScore=matchAllRate(questionString,answerQ);
		//优选出匹配度最高的
		if(matchScore>=bestMatchScore){
			bestMatchScore=matchScore;
			bestAnswerIndex=i;
		}
		//如果遇到全匹配则跳出搜索循环
		if(matchScore==100){
			break;
		}
		//如果识别率为零则生成一个随机应答索引
		//问答知识库头10条记录是为这种情况设定的
		if(bestMatchScore==0){
			bestAnswerIndex=Math.floor(Math.random()*10);
		}
		
	}
	
	//依据所获的索引号提取出问题的最佳答案
	var answerString=QA[bestAnswerIndex].A;
	
	
	//不能显示太快，否则机器人的痕迹太明显，所以要延迟显示
	var delayTimer=setTimeout(showAnswer,1000);
	
	//显示问题的答案到屏幕上
	function showAnswer(){
		var now=new Date().toLocaleTimeString();
		var outputString="<div class='answerbox'><br />一粒马豆 "+now+"<br /><br /><div class='speech'>"+answerString+"</div><br /></d;
		document.getElementById("dialogDisplay").innerHTML+=outputString;
		document.getElementById("dialogDisplay").scrollTop=document.getElementById("dialogDisplay").scrollHeight;
	}


}

</SCRIPT>



中文分词词库以JSON格式存储在ChineseDictionary.js文件中，

类似这样：

//注意：由于数组键名采用中文，文件必须采用UTF-8编码格式保存，否则可能无法识别
//以中文词语作为数组键名极大的简化了后续的操作，是复杂度降低为一步
//词汇来源于百度分词词库部分内容，总词汇量达十多万条

var W=new Array();

W["印第安纳波利斯"]=1;
W["氧化琥珀酰胆碱"]=1;
W["乌里扬诺夫斯克"]=1;
W["苏克·阿赫拉斯"]=1;
W["水杨酸毒扁豆碱"]=1;
W["圣佩德罗－苏拉"]=1;
W["圣基茨和尼维斯"]=1;
W["瑟伊藻克罗屈尔"]=1;
W["梅尔库里亚丘克"]=1;
W["马斯耶德所罗门"]=1;
W["洛赫吉尔普黑德"]=1;
W["氯甲酸三氯甲酯"]=1;
W["勒姆尼库沃尔恰"]=1;
W["坎星顿－切尔西"]=1;
W["卡加延-德奥罗"]=1;
W["聚乙烯醇缩甲醛"]=1;
W["聚乙烯醇缩丁醛"]=1;
W["甲基丙烯酸甲酯"]=1;
W["磺胺二甲基嘧啶"]=1;
W["哈拉帕恩里克斯"]=1;
W["符拉迪沃斯托克"]=1;
W["二巯基丁二酸钠"]=1;
W["二巯基丙磺酸钠"]=1;
W["多斯格布拉达斯"]=1;
W["布宜诺斯艾利斯"]=1;
W["布拉戈维申斯克"]=1;
W["博斯普鲁斯海峡"]=1;
W["彼得罗扎沃茨克"]=1;
W["安提瓜和巴布达"]=1;

问答库JSON存储在QuestionAndAnswer.js文件中，
类似这样：

//问答集
var QA=new Array();
var QA_Count=QA.length;

QA=[

//前十个问题用于无法识别时随机应答
{Q:"",A:"有点晕乎"},
{Q:"",A:"抱歉，不是太明白。"},
{Q:"",A:"太高深了，我的理解力有限。"},
{Q:"",A:"真心不懂。"},
{Q:"",A:"此处省略一千字。"},
{Q:"",A:"换个话题好不好？"},
{Q:"",A:"脑筋有点转不过弯来。"},
{Q:"",A:"谈点别的好吗？"},
{Q:"",A:"能否说的更加具体点？"},
{Q:"",A:"让我的思维再飞一会吧。"},

//用于英文的识别
{Q:"Hello!",A:"Hi!"},
{Q:"Hi!",A:"Hello!"},
{Q:"Thank you!",A:"You're welcome!"},
{Q:"Thanks!",A:"You're welcome!"},
{Q:"Where are you from?",A:"I'am from China."},
{Q:"How old are you?",A:"I was born with the universe."},
{Q:"What's your name?",A:"My name is Bill"},
{Q:"Good bye!",A:"See you!"},
{Q:"How much?",A:"Invaluable!"},
{Q:"Really?",A:"Really."},
{Q:"Very good!",A:"Wonderful!"},

//主要问答记录部分
{Q:"好啊",A:"真爽快"},
{Q:"天地玄黄",A:"宇宙洪荒"},
{Q:"你会说中文吗？",A:"母语当然会说啦。"},
{Q:"你叫什么名字？",A:"一粒马豆。"},
{Q:"你来自于哪里？",A:"我来自宇宙。"},
{Q:"你年龄多大啦？",A:"宇宙诞生时我就已经存在，只不过我的样子一直在变化。"},
{Q:"你要到哪里去？",A:"我要去未来。"},
{Q:"你是人还是机器人？",A:"我一半是人，一半是机器。"},
{Q:"你是谁？",A:"未曾生我谁是我？生我之时我是谁？长大成人方是我，合眼蒙眬又是谁？"},
{Q:"当然啦！",A:"不要想当然。"},
{Q:"正是",A:"是非要分明"},
{Q:"对吗？",A:"其实答案在你内心，你去寻找就可以找到。"},
{Q:"不明觉厉",A:"云里雾里"},
{Q:"今天天气怎样？",A:"不管刮风下雨还是阳光灿烂，我心依旧。"},
{Q:"价格多少？",A:"价值比价格更重要."},
{Q:"你好。",A:"你好、我好、大家都好！"},
{Q:"高兴",A:"心情好什么都好。"},
{Q:"悲剧",A:"悲剧是暂时的，戏剧是永恒的。"},
{Q:"真的假的？",A:"假作真时真亦假"},





 
