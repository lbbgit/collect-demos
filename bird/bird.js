/*

//http://blog.csdn.net/lufy_legend/article/details/19008011  JS引擎性能比较：

1. createJS
http://www.createjs.com/
2. cocos2d-Html5
http://www.cocos2d-x.org/wiki/Cocos2d-html5
3. enchant.js
http://enchantjs.com/
4. lufylegend.js
http://lufylegend.com/lufylegend	（best）

结论，在显示图片上，各个引擎效率如下
裸奔 > lufylegend.js > cocos-html5 > createJS > enchant.js

结论，在显示文字上，各个引擎效率如下
 lufylegend.js(将文字转换为LBitmapData) > cocos2d-html5 > lufylegend.js > createJS = enchant.js

init(10,"mylegend",320,480,main);  
function main(){  
    for(var i=0;i<500;i++){  
        var label = new LTextField();  
        label.text = "HTML5各引擎效率比较";  
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

《21《90《146《
 
init(1,"mylegend",320,480,main);  
function main(){  
    for(var i=0;i<500;i++){  
        var sprite = new LSprite();  
        var label = new LTextField();  
        label.text = "HTML5各引擎效率比较";  
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









//如果想要使用canvas,首先需要获得上下文对象：
ctx = document.getElementById('canvas').getContext('2d');
//然后使用这个ctx绘制图形




/*

//开发中，主要使用的是依据图片绘制的api:drawImage()，它有两个基本的使用方法：

ctx.drawImage(image,this.bx,this.by,this.bwidth,this.bheight);
ctx.drawImage(image,x,y,width,height,this.px,this.py,this.pwidth,this.pheight);

第一个api中，指定Image对象，然后给出绘制图片的x,y坐标以及宽度和高度即可。

第二个api中，第一组x,y,width,height则指定了裁剪图片的坐标尺寸，这在使用多元素的矢量图时很常用。比如：
*/

/*
其中背景和地面是不动的。

小鸟只有上和下两个动作，可以通过控制小鸟的y坐标实现。

上下的管子只会向左移动
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


//其中条件1上管道的检测为：

((bird.bx+bird.bwidth>up_pipe.px)&&(bird.by>up_pipe.py)&&(bird.bx+bird.bwidth<up_pipe.px+up_pipe.pwidth)&&(bird.by<up_pipe.py+up_pipe.pheight))||
((bird.bx+bird.bwidth>up_pipe.px)&&(bird.by>up_pipe.py)&&(bird.bx+bird.bwidth<up_pipe.px+up_pipe.pwidth)&&(bird.by<up_pipe.py+up_pipe.pheight))

//条件2下管道的检测为：
((bird.bx>down_pipe.px)&&(bird.by>down_pipe.py)&&(bird.bx<down_pipe.px+down_pipe.pwidth)&&(bird.by<down_pipe.py+down_pipe.pheight))||
((bird.bx>down_pipe.px)&&(bird.by+bird.bheight>down_pipe.py)&&(bird.bx<down_pipe.px+down_pipe.pwidth)&&(bird.by+bird.bheight<down_pipe.py+down_pipe.pheight))

//条件3地面的检测最简单，为：

bird.by+bird.bheight>ground.bgy



//当管子重新出现时，设置为true。当分值加1时，设置为false。
//小鸟的最左边的x坐标如果超出了管子的x+width，就认为成功通过。
if(isScore && bird.bx>up_pipe.px+up_pipe.pwidth){
                score += 1;
                isScore = false;
                if(score>0 && score%10 === 0){
                    velocity++;
                }
            }