/**
 * jQuery.loading
 * 
 * @author Ryosuke Sawada
 */

jQuery.loading = function(action,option){

	if(typeof action === "object"){
		option = action;
		action = "show";
	}

	var floating_id = "jquery-loading-floating";
	var background_id = "jquery-loading-background";

	if(action === "show"){

		var parameter = jQuery.extend(true,{},{
			background:{
				color: "#aaaaaa"
			},
			content: {
				width: 244
			},
			events:{
				show: function(box,background){
					$(background).fadeTo(100,0.4,function(){
						$(box).slideDown(200);
					});
					return this;
				}
			}
		},option);


		$("#"+floating_id+", #"+background_id).remove();

		var html_floating_prefix = '<div id="'+floating_id+'" style="position:fixed !important; position:absolute;  z-index:10000; padding:2.3em 15px; border:solid 8px #bdbdbd; background-color:#ffffff;">';
		var html_floating_suffix = '</div>';

		//htmlにheight: 100%を設定する
		$("html").css("height","100%");

		//背景グレーを引く
		//ie6の場合はwidth/heightをoffsetWidthとかで設定する必要あり。
		var s_background_width = "100%";
		var s_background_height = "100%";
		if(jQuery.support.checkOn && jQuery.support.noCloneEvent && window.globalStorage){
			s_background_width = $(window).width()+"px";
			s_background_height = $(window).height()+"px";
		}

		var html_background = "<div id='"+background_id+"' style='position:fixed !important; position:absolute;  z-index:9000; top:0; left:0; width:"+s_background_width+"; height:"+s_background_height+"; z-index:900; background-color:"+parameter.background.color+";'></div>";

		jQuery(html_background).hide().appendTo("body");
		jQuery(html_floating_prefix+parameter.content.text+html_floating_suffix).hide().appendTo("body");

		// 設置したあとtop,leftを算出してセット(widthはparameterからセット)
		$("#"+floating_id).css({
			top:($(window).height() - $("#"+floating_id).outerHeight()) / 2,
			left:($(window).width() - $("#"+floating_id).outerWidth()) / 2,
			width: parameter.content.width
		});
		parameter.events.show.call(this,$("#"+floating_id),$("#"+background_id));

	}else if(action === "hide"){

		var callback = option || function(box,background){
			$(box).slideUp(200,function(){
				$(background).hide();
			});
			return this;
		};

		callback.call(this,$("#"+floating_id),$("#"+background_id));

	}


}
