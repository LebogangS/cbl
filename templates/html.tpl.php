<?php

/**
 * @file
 * Default theme implementation to display the HTML structure of a single page.
 *
 * Variables:
 * - $css: An array of CSS files for the current page.
 * - $language: (object) The language the site is being displayed in.
 *   $language->language contains its textual representation.
 *   $language->dir contains the language direction. It will either be 'ltr' or
 *   'rtl'.
 * - $html_attributes:  String of attributes for the html element. It can be
 *   manipulated through the variable $html_attributes_array from preprocess
 *   functions.
 * - $html_attributes_array: An array of attribute values for the HTML element.
 *   It is flattened into a string within the variable $html_attributes.
 * - $body_attributes:  String of attributes for the BODY element. It can be
 *   manipulated through the variable $body_attributes_array from preprocess
 *   functions.
 * - $body_attributes_array: An array of attribute values for the BODY element.
 *   It is flattened into a string within the variable $body_attributes.
 * - $rdf_namespaces: All the RDF namespace prefixes used in the HTML document.
 * - $grddl_profile: A GRDDL profile allowing agents to extract the RDF data.
 * - $head_title: A modified version of the page title, for use in the TITLE
 *   tag.
 * - $head_title_array: (array) An associative array containing the string parts
 *   that were used to generate the $head_title variable, already prepared to be
 *   output as TITLE tag. The key/value pairs may contain one or more of the
 *   following, depending on conditions:
 *   - title: The title of the current page, if any.
 *   - name: The name of the site.
 *   - slogan: The slogan of the site, if any, and if there is no title.
 * - $head: Markup for the HEAD section (including meta tags, keyword tags, and
 *   so on).
 * - $styles: Style tags necessary to import all CSS files for the page.
 * - $scripts: Script tags necessary to load the JavaScript files and settings
 *   for the page.
 * - $page_top: Initial markup from any modules that have altered the
 *   page. This variable should always be output first, before all other dynamic
 *   content.
 * - $page: The rendered page content.
 * - $page_bottom: Final closing markup from any modules that have altered the
 *   page. This variable should always be output last, after all other dynamic
 *   content.
 * - $classes String of classes that can be used to style contextually through
 *   CSS.
 *
 * @see bootstrap_preprocess_html()
 * @see template_preprocess()
 * @see template_preprocess_html()
 * @see template_process()
 *
 * @ingroup templates
 */
?><!DOCTYPE html>
<html<?php print $html_attributes;?><?php print $rdf_namespaces;?>>
<head>
  <link rel="profile" href="<?php print $grddl_profile; ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php print $head; ?>
  <title><?php print $head_title; ?></title>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>

  <?php print $styles; ?>
  <!-- HTML5 element support for IE6-8 -->
  <!--[if lt IE 9]>
    <script src="https://cdn.jsdelivr.net/html5shiv/3.7.3/html5shiv-printshiv.min.js"></script>
  <![endif]-->
  <?php print $scripts; ?>
</head>
<body<?php print $body_attributes; ?> <?php (isset($background_desktop)) ? print 'data-bg-desktop="' . $background_desktop . '"' : '';?> <?php (isset($background_mobile)) ? print 'data-bg-mobile="' . $background_mobile . '"' : '';?> <?php (isset($youtube_video_id)) ? print 'data-bg-youtube-video-id="' . $youtube_video_id . '"' : '';?> >

<style>
    @media (min-width: 300px )and (max-width: 700px) {
    .home-carling-black-slider-item-content h2 {
            margin-top: 320px !important;
            font-size: 34px !important;
    }
  }
  </style>
 
  <div id="skip-link">
    <a href="#main-content" class="element-invisible element-focusable"><?php print t('Skip to main content'); ?></a>
  </div>
  <?php print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; ?>

  <script type="text/javascript" src="https://code.jquery.com/jquery-1.11.0.min.js"></script>
      <script type="text/javascript" src="https://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
      <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
  <script>
      jQuery(document).ready(function($) {
            $('.slick-wrap').on('init', function(event, slick){
                  var dots = $( '.slick-dots li' );
                  dots.each( function( k, v){
                        $(this).find( 'button' ).addClass( 'heading'+ k );
                  });
                  var items = slick.$slides;
                  items.each( function( k, v){
                        var text = $(this).find( 'h2' ).text();
                        $( '.heading' + k ).text(text);
                  });
            });

            $('.slick-wrap').slick({
                  dots: true,
                  focusOnSelect: true,
                  infinite: true,
                  arrows: true,
                  speed: 300,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  prevArrow: $('.prev'),
                  nextArrow: $('.next'),
                  responsive: [
                        {
                              breakpoint: 1024,
                              settings: {
                              }
                        },
                        {
                              breakpoint: 600,
                              settings: {
                                    arrows: false,
                                    dots: true
                              }
                        },
                        {
                              breakpoint: 480,
                              settings: {
                                    arrows: false,
                                    dots: true
                              }
                        }
            
                  ]
            });

            $(window).load(function() {

                $( "#webform-client-form-201 .text-button" ).click(function(event) {
                    if (document.getElementById("edit-submitted-father-name-surname")) {
                        localStorage.setItem("father_name_surname", document.getElementById("edit-submitted-father-name-surname").value);
                    }
                    if (document.getElementById("edit-submitted-father-figure-enabled")) {
                        localStorage.setItem("father_figure", document.getElementById("edit-submitted-father-figure-enabled").value);
                    }
                    if (document.getElementById("edit-submitted-nominator-name")) {
                        localStorage.setItem("nominator_name", document.getElementById("edit-submitted-nominator-name").value);
                    }
                    if (document.getElementById("edit-submitted-nominator-surname")) {
                        localStorage.setItem("nominator_surname", document.getElementById("edit-submitted-nominator-surname").value);
                    }
                    if (document.getElementById("edit-submitted-selected-slider-icon")) {
                        localStorage.setItem("selected_emblem", document.getElementById("edit-submitted-selected-slider-icon").value);
                    }
                });


            });
            
            if(document.getElementById("nominated-father")){
                document.getElementById("nominated-father").innerHTML = localStorage.getItem("father_name_surname");
            }
            if(document.getElementById("nominated-father-figure")){
                document.getElementById("nominated-father-figure").innerHTML = localStorage.getItem("father_figure");
            }
            if(document.getElementById("nominator-name-surname")){
                document.getElementById("nominator-name-surname").innerHTML = localStorage.getItem("nominator_name") + ' ' + localStorage.getItem("nominator_surname");
            }
            if(document.getElementById("nominator-name-surname2")){
                document.getElementById("nominator-name-surname2").innerHTML = localStorage.getItem("nominator_name") + ' ' + localStorage.getItem("nominator_surname");
            }
            if(document.getElementById("fathers-selected-emblem")){
                // document.getElementById("fathers-selected-emblem").innerHTML = localStorage.getItem("selected_emblem");
                document.getElementById("fathers-selected-emblem").innerHTML = '<img class="cbl-fathers-emblem" src="' + localStorage.getItem("selected_emblem") +'"></img>';
            }

         

                $('.play-video-1').on('click', function(e) {

                    e.preventDefault();

                    console.log($("#player"));
                    $(".player-1")[0].src += "&&autoplay=1";
                    $('.player-1').show();
                    $('.video-cover-1').hide();
                    $('.play-video-1').hide();
                });

                $('.play-video-2').on('click', function(e) {

                    e.preventDefault();

                    console.log($("#player"));
                    $(".player-2")[0].src += "&&autoplay=1";
                    $('.player-2').show();
                    $('.video-cover-2').hide();
                    $('.play-video-2').hide();
                });


                                    
      });

     
  </script>
</body>
</html>
