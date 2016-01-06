var loaded = false;
var relativePath = config.relative_path;

$(window).on('action:ajaxify.start', function(e, url) {
            $.getJSON(relativePath + "/google-adsense.config", function (data){

                    //If ad in header is enabled
                    if (data.header_id && loaded == false) {
                        $(getInsCode(data.client_id, data.header_id, '', 'margin:15px auto;', 'auto')).insertBefore("#content");
                        (adsbygoogle = window.adsbygoogle || []).push({});
                    }

                    //If ad in footer is enabled
                    if (data.footer_id && loaded == false) {
                        $(getInsCode(data.client_id, data.footer_id, '', 'margin:15px auto;', 'auto')).insertBefore("#footer");
                        (adsbygoogle = window.adsbygoogle || []).push({});
                    }

                    // After first post
                    if (url.url.substring(0, 6) == "topic/") {
                        if (data.after_first_post_id) {
                            $(".posts >li:first-child").after("<li>" + getInsCode(data.client_id, data.after_first_post_id, '', 'margin: 15px auto', 'auto') + "</li><br>");
                            (adsbygoogle = window.adsbygoogle || []).push({});
                        }
                        loaded = true;
                    }

                    // First post
                    if (data.first_post_id) {
                        switch (data.first_post_position) {
                            case 'bottom':
                                $(".posts >li:first-child .content").after("<li>" + getInsCode(data.client_id, data.first_post_id, '', 'margin: 15px auto', 'auto') + "</li><br>");
                                (adsbygoogle = window.adsbygoogle || []).push({});
                                break;

                            case 'top':
                                $(".posts >li:first-child .content").before("<li>" + getInsCode(data.client_id, data.first_post_id, '', 'margin: 15px auto', 'auto') + "</li><br><br>");
                                (adsbygoogle = window.adsbygoogle || []).push({});
                                break;

                            case 'left':
                                var height = $(".posts >li:first-child .content").height();
                                if (height < 250) {
                                    var type = "rectangle";
                                    var width = 300;
                                } else {
                                    var width = 336;
                                    var type = "vertical";
                                }
                                $(".posts >li:first-child .content").before(getInsCode(data.client_id, data.first_post_id, 'pull-left', 'width:' + width + 'px;  margin-right:30px;', type));
                                (adsbygoogle = window.adsbygoogle || []).push({});
                                break;

                            case 'right':
                                var height = $(".posts >li:first-child .content").height();
                                if (height < 250) {
                                    var type = "rectangle";
                                    var width = 300;
                                } else {
                                    var width = 336;
                                    var type = "vertical";
                                }
                                $(".posts >li:first-child .content").before(getInsCode(data.client_id, data.first_post_id, 'pull-right', 'width:' + width + 'px; margin-left:30px;', type));
                                (adsbygoogle = window.adsbygoogle || []).push({});
                                break;

                            default:
                                break;
                        }
                        loaded = true;
			}
                    })
            })



        function getInsCode(clientId, dataId, customClass, style, format) {
            var ad = '<ins class="adsbygoogle ' + customClass + '" style="display:block; margin-bottom:15px;' + style + ' " data-ad-format="' + format + '" data-ad-client="ca-' + clientId + '" data-ad-slot="' + dataId + '"></ins>';
            return ad;
        }
