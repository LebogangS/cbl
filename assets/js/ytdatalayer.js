(function ($) {
    Drupal.behaviors.classOwn = {
        attach: function (context) {
            jQuery(document).ready(function ($) {
                /* api youtube */
                var tag = document.createElement("script");
                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName("script")[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                setTimeout(() => {
                    if ($("body").hasClass('classOwn')) {
                        let Idcurrent = jQuery(".videoresponsive iframe")[0].attributes["id"].value;
                        // let title = jQuery(".slick-current .views-field-title .field-content p").text();
                        videoload(Idcurrent);
                        console.log(Idcurrent);
                    }
                }, 1500);

                function videoload(idFrame) {
                    var player;
                    function onYouTubeIframeAPIReady() {
                        player = new YT.Player(idFrame, {
                            events: {
                                onStateChange: onPlayerStateChange,
                            },
                        });
                    }
                    var done = false;
                    function onPlayerStateChange(event) {
                        if (event.data == YT.PlayerState.PLAYING && !done) {
                            dataLayer.push({
                                event: "trackEvent",
                                eventCategory: 'Class of its own video',
                                eventAction: "Fully Story Video 1",
                                eventLabel: "Click Youtube",
                                eventValue: "_VALUE_"
                            });

                            done = true;
                        }
                    }
                    onYouTubeIframeAPIReady();
                }
            });
        }
    }
}(jQuery));

