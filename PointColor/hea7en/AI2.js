

<SCRIPT TYPE="TEXT/JAVASCRIPT">

function found(keyword){
	if(W[keyword]==1){
		return true;
	}else{
		return false;
	}
}
	
//�ر����ݿ�����
//dataBaseConnectionObject.Close();    

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function parseChinese(inputSentence){
//����ؼ����ƥ�䷨
	//ɾ���������ַ���ͷ���Ŀո�
	inputSentence=inputSentence.replace(/(^\s+)/,"");
	var inputSentenceLength=inputSentence.length;
	var wordMaxLength=7;
	var resultArray=new Array();
	var resultString="";
	var recognizedWords="";
	
	//�������䳤��С�ڴʵ�ʻ㳤��������󳤶ȵ��ھ��ӳ���
	if(inputSentenceLength<=wordMaxLength){
		wordMaxLength=inputSentenceLength;
	}
	
	//���������ո񷽱�β�������ո���=wordMaxLength-1
	inputSentence+="      ";
	
	for(var i=0;i<inputSentenceLength;i++){
	//β���������⴦��
		for(var j=wordMaxLength;j>0;j--){
			var checkword=inputSentence.substr(i,j);
			if(found(checkword)){
				//alert(checkword);
				recognizedWords+=checkword+",";
				resultArray.push(checkword);
				//ע�������Ҫ-1����ΪFORѭ�����Զ���1
				i=i+j-1;
				break;
			}else{
				if(j==1){
					resultArray.push(checkword);
				}
			}
			
		}
	}
	
	//�������õ��Ľ������
	//����ǰ��Ĺ��̻��Ӣ�ĵ��ʷָ����ĸ��������Ҫ��������
	for(var i=0;i<resultArray.length-1;i++){
		var regw=/\w/;
		if(regw.test(resultArray[i])&&regw.test(resultArray[i+1])){
			resultArray[i+1]=resultArray[i]+resultArray[i+1];
			resultArray[i]="";
		}
	}
	
	//�������ת���ɽ���ַ���
	resultString=resultArray.join(" ");
	//�滻���������Ŀո�
	resultString=resultString.replace(/\s{2,}/g," ");
	//�滻������Ķ���ȥ��β����Ԫ��
	resultString=resultString.replace(/,$/,"");
	//���½��ַ���ת��������
	//ȥ��ʶ���ַ�������ظ�Ԫ��
	if(resultString==""){
		resultArray=new Array();
	}else{
		resultArray=resultString.split(" ").reverse().join(",").match(/([^,]+)(?!.*\1)/ig).reverse(); 
	}
	
	//���ִʺ������������������ֵ
	recognizedWords=recognizedWords.replace(/,$/,"");
	this.recognizedWords=recognizedWords;
	//ע������ֵΪ�ջ��߲�ƥ������
	if(this.recognizedWords==""){
		this.recognizedWordsArray=new Array();
	}else{
		this.recognizedWordsArray=recognizedWords.split(",").reverse().join(",").match(/([^,]+)(?!.*\1)/ig).reverse(); //ar.reverse().join(",").match(/([^,]+)(?!.*\1)/ig).reverse()//ɾ���������ظ�Ԫ��
	}
	
	this.resultString=resultString;
	this.resultArray=resultArray;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function parseChineseBackward(inputSentence){
//����ؼ����ƥ��
	//ɾ���������ַ���ͷ���Ŀո�
	inputSentence=inputSentence.replace(/(^\s+)/,"");
	var wordMaxLength=7;
	var resultArray=new Array();
	var resultString="";
	var recognizedWords="";
	
	//�������䳤��С�ڴʵ�ʻ㳤��������󳤶ȵ��ھ��ӳ���
	if(inputSentenceLength<=wordMaxLength){
		wordMaxLength=inputSentenceLength;
	}
	
	
	//���Ӽ����ո񷽱�β�������ո���=wordMaxLength-1
	inputSentence="      "+inputSentence;
	
	var inputSentenceLength=inputSentence.length;
	
	for(var i=inputSentenceLength-1;i>=wordMaxLength-1;i--){
	//β���������⴦��
		for(var j=wordMaxLength;j>=1;j--){
			var checkword=inputSentence.substr(i-j+1,j);
			if(found(checkword)){
				//alert(checkword);
				recognizedWords+=checkword+",";
				resultArray.push(checkword);
				//ע�������Ҫ+1����ΪFORѭ�����Զ�j����1
				i=i-j+1;
				break;
			}else{
				if(j==1){
					resultArray.push(checkword);
				}
			}
			
		}
	}
	
	
	//��ת�������	
	resultArray.reverse();
	
	//�������õ��Ľ������
	//����ǰ��Ĺ��̻��Ӣ�ĵ��ʷָ����ĸ��������Ҫ��������
	for(var i=0;i<resultArray.length-1;i++){
		var regw=/\w/;
		if(regw.test(resultArray[i])&&regw.test(resultArray[i+1])){
			resultArray[i+1]=resultArray[i]+resultArray[i+1];
			resultArray[i]="";
		}
	}
	
	//�������ת���ɽ���ַ���
	resultString=resultArray.join(" ");
	//�滻���������Ŀո�
	resultString=resultString.replace(/\s{2,}/g," ");
	//�滻������Ķ���ȥ��β����Ԫ��
	resultString=resultString.replace(/,$/,"");
	//���½��ַ���ת��������
	//ȥ��ʶ���ַ�������ظ�Ԫ��
	if(resultString==""){
		resultArray=new Array();
	}else{
		resultArray=resultString.split(" ").reverse().join(",").match(/([^,]+)(?!.*\1)/ig).reverse(); 
	}
	
	//���ִʺ������������������ֵ
	
	//ʶ������Ĺؼ����ִ�
	recognizedWords=recognizedWords.replace(/,$/,"");
	this.recognizedWords=recognizedWords;
	
	//ע������ֵΪ�ջ��߲�ƥ������
	if(this.recognizedWords==""){
		this.recognizedWordsArray=new Array();
	}else{
		//ʶ������Ĺؼ����ִ�ת������
		this.recognizedWordsArray=recognizedWords.split(",").reverse().join(",").match(/([^,]+)(?!.*\1)/ig).reverse(); //ar.reverse().join(",").match(/([^,]+)(?!.*\1)/ig).reverse()//ɾ���������ظ�Ԫ��
	}

	this.resultString=resultString;
	this.resultArray=resultArray;
	
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function matchRate(string1,string2){
//�������仰�Ļ���ƥ��̶ȣ�ֻ���Ƕ��ߵĹؼ��ʣ�

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
	
	//��string2�Ĺؼ���ȥƥ��string1
	var matchArray1=new Array();
	matchArray1=keywordsString1.match(eval(keywordsStringRegX2));
	
	//��string1�Ĺؼ���ȥƥ��string2
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
	
	//ȡ����ƥ���ֵ��ƽ��ֵΪ���ս��
	var averageScore=(matchScore1+matchScore2)*0.5;
	
	return averageScore;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function matchAllRate(string1,string2){
//�������仰�Ļ���ƥ��̶ȣ�ֻ���Ƕ��ߵĹؼ��ʣ�

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
	
	//��string2�Ĺؼ���ȥƥ��string1
	var matchArray1=new Array();
	matchArray1=keywordsString1.match(eval(keywordsStringRegX2));
	
	//��string1�Ĺؼ���ȥƥ��string2
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
	
	//ȡ����ƥ���ֵ��ƽ��ֵΪ���ս��
	var averageScore=(matchScore1+matchScore2)*0.5;
	
	return averageScore;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function compare(){
//�Ƚ��������仰�Ļ�����ض�
//��ʶ����������ӵĹؼ��ʣ�Ȼ��ͨ���Ƚ϶��߹ؼ��ʵ�ƥ��̶���ȷ��
//�����㷨����matchScore=string1.match(/keyword1/keyword2/keyword3/g)/keywordCount
//Ҳ����ֱ�ӱȽ����зִʣ��������Ǵ�����Ƚ���

	var matchScore1=0;
	var matchScore2=0;
	
	var string1=document.getElementById("inputString").value;
	var string2=document.getElementById("inputStringMatch").value;
	
	//ע��ȥ���ַ����е������ַ���.*?!,����ƥ������ֵ��׼
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
	//��string2�Ĺؼ���ȥƥ��string1

	matchArray1=keywordsString1.match(eval(keywordsStringRegX2));
	
	var matchArray2=new Array();
	//��string2�Ĺؼ���ȥƥ��string1
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
	
	var msg="[��1]   "+string1+"\n[��2]   "+string2
				+"\n\n[�ؼ��ʴ�1]"+keywordsString1
				+"\n[�ؼ��ʴ�2]"+keywordsString2
				+"\n\n[������ʽ1] "+keywordsStringRegX1
				+"\n[������ʽ2] "+keywordsStringRegX2
				+"\n\n���߻���ƥ��ȣ����� "+scoreMin+"%"+" �� "+scoreMax+"% ֮��";
	alert(msg);

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function compareLiteral(){
//�Ƚ��������仰�Ļ�����ض�
//��ʶ����������ӵĹؼ��ʣ�Ȼ��ͨ���Ƚ϶��߹ؼ��ʵ�ƥ��̶���ȷ��
//�����㷨����matchScore=string1.match(/keyword1/keyword2/keyword3/g)/keywordCount
//�˴�������ƥ��

	var matchScore1=0;
	var matchScore2=0;
	
	var string1=document.getElementById("inputString").value;
	var string2=document.getElementById("inputStringMatch").value;
	
	//ע��ȥ���ַ����е������ַ���.*?!,����ƥ������ֵ��׼
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
	//��string2�Ĺؼ���ȥƥ��string1

	matchArray1=keywordsString1.match(eval(keywordsStringRegX2));
	
	var matchArray2=new Array();
	//��string2�Ĺؼ���ȥƥ��string1
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
	
	var msg="[��1]   "+string1+"\n[��2]   "+string2
				+"\n\n[�ؼ��ʴ�1]"+keywordsString1
				+"\n[�ؼ��ʴ�2]"+keywordsString2
				+"\n\n[������ʽ1] "+keywordsStringRegX1
				+"\n[������ʽ2] "+keywordsStringRegX2
				+"\n\n���߻���ƥ��ȣ����� "+scoreMin+"%"+" �� "+scoreMax+"% ֮��";
	alert(msg);
	
}


///////////////////////////////////////////////////////////////////////

function talk(){
//�˹���������
//��ҪӦ����ǰ��ķִʡ�ģ��ƥ�似��

	var bestAnswerIndex=0;
	var bestMatchScore=0;
	
	var questionString=document.getElementById("question").value;
	
	document.getElementById("question").value="";
	
	var now=new Date().toLocaleTimeString();

	//��ʾ���⵽��Ļ��
	var outputString="<div class='questionbox'><br />"+now+" ����С��<br /><br /><div class='speech'>"+questionString+"</div><br />v>";
	document.getElementById("dialogDisplay").innerHTML+=outputString;
	document.getElementById("dialogDisplay").scrollTop=document.getElementById("dialogDisplay").scrollHeight;
	
	//ȥ����������������ƥ�����
	questionString=questionString.replace(/\^|\.|\*|\?|\!|\/|\\|\$|\#|\&|\||,|\[|\]|\{|\}|\(|\)|\-|\+|\=/g," ");
	
	//��Ѱ��ӽ����ʴ�
	for(var i=0;i<QA_Count;i++){
		var answerQ=QA[i].Q;
		answerQ=answerQ.replace(/\^|\.|\*|\?|\!|\/|\\|\$|\#|\&|\||,|\[|\]|\{|\}|\(|\)|\-|\+|\=/g," ");
		var matchScore=matchAllRate(questionString,answerQ);
		//��ѡ��ƥ�����ߵ�
		if(matchScore>=bestMatchScore){
			bestMatchScore=matchScore;
			bestAnswerIndex=i;
		}
		//�������ȫƥ������������ѭ��
		if(matchScore==100){
			break;
		}
		//���ʶ����Ϊ��������һ�����Ӧ������
		//�ʴ�֪ʶ��ͷ10����¼��Ϊ��������趨��
		if(bestMatchScore==0){
			bestAnswerIndex=Math.floor(Math.random()*10);
		}
		
	}
	
	//�����������������ȡ���������Ѵ�
	var answerString=QA[bestAnswerIndex].A;
	
	
	//������ʾ̫�죬��������˵ĺۼ�̫���ԣ�����Ҫ�ӳ���ʾ
	var delayTimer=setTimeout(showAnswer,1000);
	
	//��ʾ����Ĵ𰸵���Ļ��
	function showAnswer(){
		var now=new Date().toLocaleTimeString();
		var outputString="<div class='answerbox'><br />һ���� "+now+"<br /><br /><div class='speech'>"+answerString+"</div><br /></d;
		document.getElementById("dialogDisplay").innerHTML+=outputString;
		document.getElementById("dialogDisplay").scrollTop=document.getElementById("dialogDisplay").scrollHeight;
	}


}

</SCRIPT>



���ķִʴʿ���JSON��ʽ�洢��ChineseDictionary.js�ļ��У�

����������

//ע�⣺������������������ģ��ļ��������UTF-8�����ʽ���棬��������޷�ʶ��
//�����Ĵ�����Ϊ�����������ļ��˺����Ĳ������Ǹ��ӶȽ���Ϊһ��
//�ʻ���Դ�ڰٶȷִʴʿⲿ�����ݣ��ܴʻ�����ʮ������

var W=new Array();

W["ӡ�ڰ��ɲ���˹"]=1;
W["��������������"]=1;
W["������ŵ��˹��"]=1;
W["�տˡ�������˹"]=1;
W["ˮ���ᶾ�ⶹ��"]=1;
W["ʥ����ޣ�����"]=1;
W["ʥ���ĺ���ά˹"]=1;
W["ɪ�����������"]=1;
W["÷�����������"]=1;
W["��˹Ү��������"]=1;
W["��ռ����պڵ�"]=1;
W["�ȼ������ȼ���"]=1;
W["��ķ����ֶ�ǡ"]=1;
W["���Ƕ٣��ж���"]=1;
W["������-�°���"]=1;
W["����ϩ������ȩ"]=1;
W["����ϩ������ȩ"]=1;
W["�׻���ϩ�����"]=1;
W["�ǰ����׻����"]=1;
W["�����������˹"]=1;
W["��������˹�п�"]=1;
W["���ϻ���������"]=1;
W["���ϻ���������"]=1;
W["��˹������˹"]=1;
W["����ŵ˹����˹"]=1;
W["������ά��˹��"]=1;
W["��˹��³˹��Ͽ"]=1;
W["�˵������ִĿ�"]=1;
W["����ϺͰͲ���"]=1;

�ʴ��JSON�洢��QuestionAndAnswer.js�ļ��У�
����������

//�ʴ�
var QA=new Array();
var QA_Count=QA.length;

QA=[

//ǰʮ�����������޷�ʶ��ʱ���Ӧ��
{Q:"",A:"�е��κ�"},
{Q:"",A:"��Ǹ������̫���ס�"},
{Q:"",A:"̫�����ˣ��ҵ���������ޡ�"},
{Q:"",A:"���Ĳ�����"},
{Q:"",A:"�˴�ʡ��һǧ�֡�"},
{Q:"",A:"��������ò��ã�"},
{Q:"",A:"�Խ��е�ת����������"},
{Q:"",A:"̸���ĺ���"},
{Q:"",A:"�ܷ�˵�ĸ��Ӿ���㣿"},
{Q:"",A:"���ҵ�˼ά�ٷ�һ��ɡ�"},

//����Ӣ�ĵ�ʶ��
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

//��Ҫ�ʴ��¼����
{Q:"�ð�",A:"��ˬ��"},
{Q:"�������",A:"������"},
{Q:"���˵������",A:"ĸ�ﵱȻ��˵����"},
{Q:"���ʲô���֣�",A:"һ������"},
{Q:"�����������",A:"���������档"},
{Q:"������������",A:"���浮��ʱ�Ҿ��Ѿ����ڣ�ֻ�����ҵ�����һֱ�ڱ仯��"},
{Q:"��Ҫ������ȥ��",A:"��Ҫȥδ����"},
{Q:"�����˻��ǻ����ˣ�",A:"��һ�����ˣ�һ���ǻ�����"},
{Q:"����˭��",A:"δ������˭���ң�����֮ʱ����˭��������˷����ң������ɱ�����˭��"},
{Q:"��Ȼ����",A:"��Ҫ�뵱Ȼ��"},
{Q:"����",A:"�Ƿ�Ҫ����"},
{Q:"����",A:"��ʵ���������ģ���ȥѰ�ҾͿ����ҵ���"},
{Q:"��������",A:"��������"},
{Q:"��������������",A:"���ܹη����껹��������ã��������ɡ�"},
{Q:"�۸���٣�",A:"��ֵ�ȼ۸����Ҫ."},
{Q:"��á�",A:"��á��Һá���Ҷ��ã�"},
{Q:"����",A:"�����ʲô���á�"},
{Q:"����",A:"��������ʱ�ģ�Ϸ��������ġ�"},
{Q:"��ļٵģ�",A:"������ʱ�����"},





 
