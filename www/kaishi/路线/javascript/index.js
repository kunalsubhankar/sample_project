
//1.数据定义（实际生产环境中由后台给出）
var data = [

	{img:1, h1:"Night", h2:"Light"},
	{img:2, h1:"Shandow", h2:"Building"},
	{img:3, h1:"Blue", h2:"Water"},
	{img:4, h1:"Olympic", h2:"Sailing Center"},
	{img:5, h1:"grey", h2:"sky"},
	{img:6, h1:"Catholic", h2:"Church"},
	{img:7, h1:"Dusk of", h2:"Qingdao"}

];

//2. 定义一个通用函数,获取dom节点
var g = function(id){

	if( id.substr(0, 1) === "." ){

		return document.getElementsByClassName( id.substr(1) );

	}

	return document.getElementById( id );

};


//3. 添加幻灯片的操作（所有幻灯片&&对应的按钮）
function addSlider(){

	//3.1 获取模板
	var tpl_main = g("template_main").innerHTML
				.replace(/^\s*/,"").replace(/\s*$/,"");

	var tpl_ctrl = g("template_ctrl").innerHTML
				.replace(/^\s*/,"").replace(/\s*$/,"");

	//3.2 定义最终输出HTML变量
	var out_main = [];
	var out_ctrl = [];

	//3.3 遍历所有数据，构建最终输出的HTML
	for( var i in data ){

		var _html_main = tpl_main.replace(/{{index}}/g, data[i].img)
						 .replace(/{{h2}}/g, data[i].h1)
						 .replace(/{{h3}}/g, data[i].h2)
						 .replace(/{{css}}/g, ['', 'main-i_right'][i%2]);//从不同方向进入
		var _html_ctrl = tpl_ctrl.replace(/{{index}}/g, data[i].img);

		out_main.push( _html_main );
		out_ctrl.push( _html_ctrl );

	}

	//3.4 把HTML回写到对应的DOM里
	g( "template_main" ).innerHTML = out_main.join("");
	g( "template_ctrl" ).innerHTML = out_ctrl.join("");

	//7. 增加#main_background。背景图。防止更换时右边出现白底
	g( "template_main" ).innerHTML += tpl_main
						 .replace(/{{index}}/g, '{{index}}');
						
	g( "main_{{index}}" ).id = "main_background";

}


//5. 幻灯片切换
function switchSlider( n ){

	//5.1获得要展现的幻灯片&&控制器DOM
	var main = g( "main_" + n );
	var ctrl = g( "ctrl_" + n );

	//5.2 获得所有的幻灯片以及控制按钮
	var clear_main = g( ".main-i" );
	var clear_ctrl = g( ".ctrl-i" );

	//清除所有幻灯片以及控制按钮的active类
	for ( var i = 0; i < clear_ctrl.length; i++ ){

		clear_main[i].className = clear_main[i].className.replace("main-i_active", "");
		clear_ctrl[i].className = clear_ctrl[i].className.replace("ctrl-i_active", "");

	}

	//5.3 添加active样式
	main.className += " main-i_active";
	ctrl.className += " ctrl-i_active";

	//7.2 切换时，复制上一张到#main_background中
	//1秒之后才背景才更换为当前图片，所以切换时看到的还是上一张的背景图
	
	setTimeout(function(){

		g( "main_background" ).innerHTML = main.innerHTML;

	}, 1000);
		
}

//动态调整图片的margin-top, 使其垂直居中
function movePictures(){

	var pictures = g( ".picture" );
	for (var i = 0; i < pictures.length; i++ ){

		pictures[i].style.marginTop = (-1 * pictures[i].clientHeight / 2) + "px";

	}
}

//4. 定义何时处理幻灯片输出 
window.onload = function(){

	addSlider();
	switchSlider(1);
	//因为动态加入图片，movePictures又必须获取到图片，会存在时间差
	setTimeout(function(){

		movePictures();		

	},100);

}