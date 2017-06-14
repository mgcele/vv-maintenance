$(function(){
	var carHtml,carHtml1,carHtml2,carHtml3;
	/*点击显示汽车型号*/
	
	$("#carCtrl").click(function(){
		$(".carTypeSelector").css("display","block");
		$(".typeBody").css("display","none");
		$(".typeBody").eq(0).css("display","block");
		$(".carCheck").css("background","#F2F2F2");
		$(".carCheck1").css("background","#FFCC00");
	});
	/*点击品牌的操作*/
	$(".carCheck1").click(function(){
		$(".typeBody").css("display","none");
		$(".typeBody").eq(0).css("display","block");
		$(".carCheck").css("background","#F2F2F2");
		$(this).css("background","#FFCC00");
	});
	/*点击系列的操作*/
	$(".carCheck2").click(function(){	
		$(".typeBody").css("display","none");
		$(".typeBody").eq(1).css("display","block");
		$(".carCheck").css("background","#F2F2F2");
		$(this).css("background","#FFCC00");
	});
	/*点击型号的操作*/
	$(".carCheck3").click(function(){	
		$(".typeBody").css("display","none");
		$(".typeBody").eq(2).css("display","block");
		$(".carCheck").css("background","#F2F2F2");
		$(this).css("background","#FFCC00");
	});
	/*选取汽车型号，进行页面展示*/
	
	/*点击列表中的品牌*/
	$("#list-brands-1496806925485_2968_7618").on("click","li",function(){
		carHtml1="";
		carHtml1="<span>"+$(this).text()+"</span>";
		$(".typeBody").css("display","none");
		$(".typeBody").eq(1).css("display","block");
		$(".carCheck").css("background","#F2F2F2");
		$(".carCheck2").css("background","#FFCC00");
		$.ajax({
			type:"get",
			url:"carSerials.json",
			async:true,
			success:function(data){
				$.each(data, function(x,y) {
					console.log(y.name)
					$("#list-serials-1496806925485_2968_7618").append("<li class='listItem'>"+y.name+"</li>");
				});
			},
			error:function(error){
				console.log(error);
			}
		});
	});
	/*点击列表中的系列*/
	$("#list-serials-1496806925485_2968_7618").on("click","li",function(){	
		carHtml2="";
		carHtml2="&nbsp;&nbsp;<span>"+$(this).text()+"</span>";
		$(".typeBody").css("display","none");
		$(".typeBody").eq(2).css("display","block");
		$(".carCheck").css("background","#F2F2F2");
		$(".carCheck3").css("background","#FFCC00");	
		$.ajax({
			type:"get",
			url:"carModel.json",
			async:true,
			success:function(data){
				$.each(data, function(x,y) {
					console.log(y.name)
					$("#list-models-1496806925485_2968_7618").append("<li class='listItem'>"+y.name+"</li>");
				});
			},
			error:function(error){
				console.log(error);
			}
		});
	});
	/*点击列表中的型号*/
	$("#list-models-1496806925485_2968_7618").on("click","li",function(){
		carHtml3="";
		carHtml3="<br/><span>"+$(this).text()+"</span>";		
		carHtml=carHtml1+carHtml2+carHtml3;
		$(".carType").html(carHtml);
		$(".carTypeSelector").css("display","none");
		
	});
	/*点击选取汽车的取消按钮*/
	$(".cancel").click(function(){
		$(".carTypeSelector").css("display","none");
	});
	
})