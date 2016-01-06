var loaded = false;
var relativePath=config.relative_path;

$(window).on('action:ajaxify.end', function (e, url) {
	$.getScript("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", function (data){
		$.getJSON(relativePath + "/google-adsense.config", function (data){
			//If ad in header is enabled
			if(data.header_id && loaded == false){
				$("<div class='text-center'>" + getInsCode(data.client_id, data.header_id, '', 'margin:15px auto;', 'auto') + "</div>").insertBefore("#content");
				(adsbygoogle = window.adsbygoogle || []).push({});
			}

			//If ad in footer is enabled
			if(data.footer_id && loaded == false){
				 $("<div class='text-center'>" + getInsCode(data.client_id, data.footer_id, '', 'margin:15px auto;', 'auto') + "</div>").insertAfter("#content");
				(adsbygoogle = window.adsbygoogle || []).push({});
			}

			if (url.url.substring(0, 6) == "topic/") {
				if(data.after_first_post_id){
					$(".posts >li:first-child").after("<li>" + getInsCode(data.client_id, data.after_first_post_id, '', 'margin: 15px auto', 'auto') + "</li>");
					(adsbygoogle = window.adsbygoogle || []).push({});
				}
				if(data.first_post_id){
					switch(data.first_post_position){
						case 'bottom':
						$(".posts >li:first-child .content").append(getInsCode(data.client_id, data.first_post_id, '', 'margin:15px auto;', 'auto'));
						break;

						case 'top':
						$(".posts >li:first-child .content").prepend(getInsCode(data.client_id, data.first_post_id, '', 'margin:15px auto;', 'auto'));
						break;

						case 'left':
						var height = $(".posts >li:first-child .content").height();
						if(height < 250){
							var type = "rectangle";
							var width = 250;
						}
						else{
							var width = 300;
							var type ="vertical";
						}
						$(".posts >li:first-child .content").prepend(getInsCode(data.client_id, data.first_post_id, 'pull-left', 'width:' + width + 'px;  margin-right:30px;', type));
						break;

						case 'right':
						var height = $(".posts >li:first-child .content").height();
						if(height < 250){
							var type = "rectangle";
							var width = 250;
						}
						else{
							var width = 300;
							var type ="vertical";
						}
						$(".posts >li:first-child .content").prepend(getInsCode(data.client_id, data.first_post_id, 'pull-right', 'width:' + width + 'px; margin-left:30px;', type));
						break;

						default:
						break;
					}
					(adsbygoogle = window.adsbygoogle || []).push({});

				}
			}
			loaded = true;
		})
})

})


function getInsCode(clientId, dataId, customClass, style, format){
	var ad = '<ins class="adsbygoogle ' + customClass + '" style="display:block; margin-bottom:15px;' + style + ' " data-ad-format="' + format + '" data-ad-client="ca-' + clientId + '" data-ad-slot="' + dataId + '"></ins>';
	return ad;
}
