/*

//http://blog.csdn.net/lufy_legend/article/details/19008011  JS�������ܱȽϣ�

1. createJS
http://www.createjs.com/
2. cocos2d-Html5
http://www.cocos2d-x.org/wiki/Cocos2d-html5
3. enchant.js
http://enchantjs.com/
4. lufylegend.js
http://lufylegend.com/lufylegend	��best��

���ۣ�����ʾͼƬ�ϣ���������Ч������
�㱼 > lufylegend.js > cocos-html5 > createJS > enchant.js

���ۣ�����ʾ�����ϣ���������Ч������
 lufylegend.js(������ת��ΪLBitmapData) > cocos2d-html5 > lufylegend.js > createJS = enchant.js

init(10,"mylegend",320,480,main);  
function main(){  
    for(var i=0;i<500;i++){  
        var label = new LTextField();  
        label.text = "HTML5������Ч�ʱȽ�";  
        label.size = 10 + 20*Math.random();  
        label.color = randomColor();  
        label.rotate = 180*Math.random()/Math.PI;  
        label.x = Math.random()*LGlobal.width - 50;  
        label.y = Math.random()*LGlobal.height;  
        addChild(label);  
    }  
    var fps = new FPS();  
    addChild(fps);  
}  
function randomColor(){  
    var rand = Math.floor(Math.random() * 0xFFFFFF).toString(16);  
    if(rand.length == 6){  
        return rand;  
    }else{  
        return randomColor();  
    }  
}  

��21��90��146��
 
init(1,"mylegend",320,480,main);  
function main(){  
    for(var i=0;i<500;i++){  
        var sprite = new LSprite();  
        var label = new LTextField();  
        label.text = "HTML5������Ч�ʱȽ�";  
        label.size = 10 + 20*Math.random();  
        label.color = randomColor();  
        sprite.addChild(label);  
          
        var bitmapData = new LBitmapData(null,0,0,label.getWidth(),label.getHeight());  
        bitmapData.draw(sprite);  
        var bitmap = new LBitmap(bitmapData);  
        bitmap.rotate = 180*Math.random()/Math.PI;  
        bitmap.x = Math.random()*LGlobal.width - 50;  
        bitmap.y = Math.random()*LGlobal.height;  
        addChild(bitmap);  
    }  
    var fps = new FPS();  
    addChild(fps);  
}  
function randomColor(){  
    var rand = Math.floor(Math.random() * 0xFFFFFF).toString(16);  
    if(rand.length == 6){  
        return rand;  
    }else{  
        return randomColor();  
    }  
}  



*/









//�����Ҫʹ��canvas,������Ҫ��������Ķ���
ctx = document.getElementById('canvas').getContext('2d');
//Ȼ��ʹ�����ctx����ͼ��




/*

//�����У���Ҫʹ�õ�������ͼƬ���Ƶ�api:drawImage()����������������ʹ�÷�����

ctx.drawImage(image,this.bx,this.by,this.bwidth,this.bheight);
ctx.drawImage(image,x,y,width,height,this.px,this.py,this.pwidth,this.pheight);

��һ��api�У�ָ��Image����Ȼ���������ͼƬ��x,y�����Լ���Ⱥ͸߶ȼ��ɡ�

�ڶ���api�У���һ��x,y,width,height��ָ���˲ü�ͼƬ������ߴ磬����ʹ�ö�Ԫ�ص�ʸ��ͼʱ�ܳ��á����磺
*/

/*
���б����͵����ǲ����ġ�

С��ֻ���Ϻ�����������������ͨ������С���y����ʵ�֡�

���µĹ���ֻ�������ƶ�
*/


if(up_pipe.px+up_pipe.pwidth>0){
                up_pipe.px -= velocity;
                down_pipe.px -= velocity;
            }else{
                up_pipe.px = 400;
                down_pipe.px = 400;
                up_pipe.pheight = 100+Math.random()*200;
                down_pipe.py = up_pipe.pheight+pipe_height;
                down_pipe.pheight = 600-down_pipe.py;
                isScore = true;
            }

			
		
		
ver2 = ver1+gravity;
bird.by += (ver2+ver1)*0.5;


//��������1�Ϲܵ��ļ��Ϊ��

((bird.bx+bird.bwidth>up_pipe.px)&&(bird.by>up_pipe.py)&&(bird.bx+bird.bwidth<up_pipe.px+up_pipe.pwidth)&&(bird.by<up_pipe.py+up_pipe.pheight))||
((bird.bx+bird.bwidth>up_pipe.px)&&(bird.by>up_pipe.py)&&(bird.bx+bird.bwidth<up_pipe.px+up_pipe.pwidth)&&(bird.by<up_pipe.py+up_pipe.pheight))

//����2�¹ܵ��ļ��Ϊ��
((bird.bx>down_pipe.px)&&(bird.by>down_pipe.py)&&(bird.bx<down_pipe.px+down_pipe.pwidth)&&(bird.by<down_pipe.py+down_pipe.pheight))||
((bird.bx>down_pipe.px)&&(bird.by+bird.bheight>down_pipe.py)&&(bird.bx<down_pipe.px+down_pipe.pwidth)&&(bird.by+bird.bheight<down_pipe.py+down_pipe.pheight))

//����3����ļ����򵥣�Ϊ��

bird.by+bird.bheight>ground.bgy



//���������³���ʱ������Ϊtrue������ֵ��1ʱ������Ϊfalse��
//С�������ߵ�x������������˹��ӵ�x+width������Ϊ�ɹ�ͨ����
if(isScore && bird.bx>up_pipe.px+up_pipe.pwidth){
                score += 1;
                isScore = false;
                if(score>0 && score%10 === 0){
                    velocity++;
                }
            }