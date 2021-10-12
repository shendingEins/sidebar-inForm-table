(function($) {

	"use strict";

	var fullHeight = function() {
		
		$('.js-fullheight').css('height',$(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height',$(window).height());
		});
		
	};
	fullHeight();
    //抽屉 
	$('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  });

})(jQuery);

/**
 * --侧边栏
 * 1、侧边栏不同表单切换 */
function formChange(formName){
	if(formName=="pointform"){
		$('#pointform').show().siblings().hide();//显示pointform并隐藏它所有的兄弟元素
	}else if(formName=="lineform"){	
		$('#lineform').show().siblings().hide();	
	}else if(formName=="landlineform"){
		$('#landlineform').show().siblings().hide();	
	}
}
/**
 * --侧边栏
 * 2、侧边栏下拉框 */
 var dialogDic = {
    "Type": ['雨水', '污水', '工业废水'],  //类型
    "Func": ['检修井', '阀门井', '化粪池', '篦子', '明沟', '明管', '隐蔽点', '入河口', '不明流向点', '入户点', '工废检修井'],  //用途
    "PLevel": ['主井', '二级边井', '三级边井', '市政井'],  //管井等级
    "CType": ['方形', '圆形', '不规则形'],   //井盖类型
    "ProType": ['厂区', '小区', '市政'],  //工程类型
    "PipType": ['雨水', '污水', '混接', '工业废水', '明管', '沟渠', '明渠'],  //管段类
    "Ground": ['沥青', '绿化', '水泥', '其他'],  //路面类型
    "LLevel": ['主管', '二极管', '篦收水管']  //管段等级
    
};
/**
 * 使用字典添加下拉框内值
 * @param {any} dic 下拉框字典
 */
function CreateList(dic) {
    for (var key in dic) {
        for (var i = 0; i < dic[key].length; i++) {
            $("[name='" + key+ "']").append("<option>" + dic[key][i] + "</option>");
        }
		editSelect(key);
    }
}
CreateList(dialogDic);
//可编辑下拉框功能
function editSelect(selectname){
	$("[name='" + selectname+ "']").editableSelect({
	bg_iframe:true,
	case_sensitive: false,//是否进行匹配
    items_then_scroll: 10 ,//下拉列表显示数目的条目
    isFilter:false,//是否过滤
    // onSelect:function(){ console.log("下拉框选中") },
    // onCreat:function(){ console.log("下拉创建") },
    // onShow:function(){ console.log("下拉框显示") },
    // onHide:function(){ console.log("下拉框隐藏") }
});
}



/**
 * --侧边栏
 * 3、侧边栏单选框：获得选中单选框的value */
$("input[name='CState']").click(function(){
	item = $("input[name='CState']:checked").val();
	//alert(item);
})

/**
 * --侧边栏
 * 4、批量获取form表单要提交的值 */
 $("#confirm").on('click', function () {
	var data = $('#pointform').getFormData();
	alert(JSON.stringify(data));
	//console.log(JSON.stringify(data));
	
  });
/**
 *自定义函数： 获取表单值[name]
 * @returns {{}}
 * 用法：var savaData = $('#Form').getFormData();
 */
 $.fn.getFormData = function () {
	var obj = {};
	var $tags = this.find('[name]');
	$tags.each(function () {
	  var key = $(this).attr('name');
	  if (obj.hasOwnProperty(key) && $(this).is(':checked')) {
		obj[key] = obj[key] + ',' + $(this).val();//checkebox的值是‘aa,bb,cc’这样的格式，要数组的自行修改
		return true ;
	  }
	  var isCheck= $(this).is(function(){
		var type = $(this).attr('type');
		return type =='checkbox' || type =='radio'
	  });
	  if(isCheck){
		if($(this).is(':checked')){
		  obj[key] = $(this).val();
		}
		return true;
	  }else{
		obj[key] = $(this).val();
	  }
	});
	return obj;
  };
 
  