jQuery(document).ready(function($)
{

	let isScreenMobile = $(window).width() < 768;

	$.fn.isInViewport = function () {
		let elementTop = $(this).offset().top;
		let elementBottom = elementTop + $(this).outerHeight();

		let viewportTop = $(window).scrollTop();
		let viewportBottom = viewportTop + $(window).height();
		
		return elementBottom > viewportTop && elementTop < viewportBottom;
	};

	// -- General -- //
	const $GeneralScope = {

		// Constructor
		init: function() {
			this.addTextButtonToGoBack();
			this.menuScripts();
			this.navigationSnippet();
			this.addDivToButtonsForStyles();
			this.moveSectionFooterIntoFooter();
			this.addDivToHeaderBanner();
			this.setBackgroundImage();
			this.disableZoomBrowser();
			this.fixingFooterForMobile();
			this.activeInViewport();
		},

		

		activeInViewport:function(){
			$(window).on('load scroll', function(){
				$('.home-carling-black-history-item-image').each(function(){
					if ($(this).isInViewport()) {
						$(this).addClass('show-image')
					}
					else {
						$(this).removeClass('show-image');
					}
				})
			});
		},

		addTextButtonToGoBack:function(){
			let ButtonGoBack = $('.custom-carling-black-404 #block-system-main .field-items .field-item a,'+
													'.custom-carling-black-subscribe-thanks #block-system-main article a,'+
													'.custom-carling-black-contact-thanks #block-system-main article a');
			let TextButton = ButtonGoBack.text();
			ButtonGoBack.html('<div class="text-button">'+TextButton+'</div>');
		},

		// Menu scripts
		menuScripts: function() {
			let ButtonTrigger = $('.navbar-header .navbar-toggle');
			let MenuWrapper = $('.navbar .navbar-collapse');
			let ButtonClose = $('<div class="button-menu-mobile-close d-sm-none"></div>');
			

			if(ButtonTrigger){
				$(document).on('click','.navbar-toggle', function(){
					ButtonTrigger.toggleClass("collapsed");
				});
			}

			if(MenuWrapper){
				MenuWrapper.prepend(ButtonClose);
				ButtonClose.click(function(){
					MenuWrapper.collapse('toggle');
				});
			}

			$(window).scroll(function() {

				let scroll    = $(window).scrollTop();
				let header_el = $('.navbar');

				if (scroll >= 100) {
					header_el.addClass("scroll_menu");
				} else {
					header_el.removeClass("scroll_menu");
				}
			});
		},

		navigationSnippet: function() {
			$('a[href*="#"]')
			// Remove links that don't actually link to anything
			.not('[href="#"]')
			.not('[href="#0"]')
			.click(function(event) {
				// On-page links
				if (
					location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
					&& 
					location.hostname == this.hostname
				) {
					// Figure out element to scroll to
					let target = $(this.hash);

					target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
					// Does a scroll target exist?
					if (target.length) {
						// Only prevent default if animation is actually gonna happen
						event.preventDefault();
						$('html, body').animate({
							scrollTop: target.offset().top
						}, 1000, function() {
							// Callback after animation
							// Must change focus!
							let $target = $(target);
							$target.focus();

							if(isScreenMobile){
								menu_wrapper.slideUp(300);
							}

							if ($target.is(":focus")) { // Checking if the target was focused
								return false;
							} else {
							$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
								$target.focus(); // Set focus again
							};
						});
					}
				}
			});
		},


		addDivToButtonsForStyles: function(){
			let Buttons = $("button.btn");
			Buttons.each(function(){
				let textButton = $(this).text();
				$(this).text("");
				$(this).append("<p class='text-button'>"+textButton+"</p>");
			});
		},

		moveSectionFooterIntoFooter: function(){
			let SectionMenu = $("#block-menu-menu-footer-menu");
			if(SectionMenu){
				SectionMenu.insertAfter(".ab-inbev-footer .ab-inbev-footer-content-1 .ab-inbev-footer-aware-logo");
			}
		},

		addDivToHeaderBanner:function(){
			let PageHeader = $('#page-header');
			PageHeader.append('<div class="banner-logo-circle"></div>');
		},
		
		setBackgroundImage:function(){
			let Body = $("html body");
			let DataBackgroundDesktop = Body.data('bg-desktop');
			let DataBackgroundMobile = Body.data('bg-mobile');
			if(DataBackgroundMobile && isScreenMobile){
				Body.attr('style','background-image:url("'+DataBackgroundMobile+'");');
			}
			else if(DataBackgroundDesktop){
				Body.attr('style','background-image:url("'+DataBackgroundDesktop+'");');
			}
		},

		disableZoomBrowser:function(){
			$(document).keydown(function(event) {
				if (event.ctrlKey==true && (event.which == '61' || event.which == '107' || event.which == '173' || event.which == '171' || event.which == '109'  || event.which == '187'  || event.which == '189'  ) ) {
								event.preventDefault();
						 }
						// 107 Num Key  +
						// 171 Num Key  + Alphabetic
						// 109 Num Key  -
						// 173 Min Key  hyphen/underscor Hey
						// 61 Plus key  +/= key
				});
				
				$(window).bind('mousewheel DOMMouseScroll', function (event) {
							 if (event.ctrlKey == true) {
							 event.preventDefault();
							 }
				});
		},

		fixingFooterForMobile: function(){
			if(isScreenMobile){
				let ImageLogoContainer = $('footer .ab-inbev-footer .ab-inbev-footer-aware-logo');
				ImageLogoContainer.insertAfter('#block-menu-menu-footer-menu');
			}
		}


	}

	// -- Agegate -- //
	const $AgegateScope = {
		// Constructor
		init: function() {
			this.ageScripts(); 
			this.moveUpTextAge();
			this.centerCursorInputForEdgeBrowsers();
			this.styleForCheckboxRememberMe();
			//this.includeLabelSelectInCombo();
		},
		// scripts for Agegate
		ageScripts: function() {
			// Dom manipulation
			let ListCountries = $('.form-item-list-of-countries');
			let Checklist     = $('.form-item-remember-me');
			let FbValidate    = $('.age_checker_facebook_validate');
			let RememberMe    = $('.ab-inbev-remember-me');
			let RememberLabel = Checklist.find('label');
			let RememberMeStr = RememberMe.find('strong');
			let FooterContent = $('.ab-inbev-footer');
			let AgeChecker		= $('#age_checker');
			
			if(ListCountries) {
			  ListCountries.insertAfter('#age_checker_error_message');
			}
			
			/*
			if(Checklist) {
				Checklist.append(RememberMe);
				RememberLabel.append(RememberMeStr);
			}*/

			$("<div class='label_or'>OR</div>").insertAfter("#edit-submit");
			if(FbValidate){
			  FbValidate.insertAfter('#age_checker_widget .label_or');
			  FbValidate.append('<span class="button_facebook"><div class="text-button">SIGN IN WITH FACEBOOK</div></span>')
			}
			/*
			if(FooterContent) {
				$('.agegate-container-footer').append(FooterContent);
			}*/

			if(AgeChecker){
				$('body.page-agegate').attr('style',AgeChecker.attr("style"));
				AgeChecker.removeAttr('style');
			}

			
		},

		moveUpTextAge:function(){
			let TextDisclaimer = $(".ab-inbev-remember-me");
			if(TextDisclaimer){
				TextDisclaimer.insertAfter(".form-item-remember-me");
			}
		},

		includeLabelSelectInCombo:function(){
			let LabelSelect = $('#age_checker .form-item-list-of-countries label');
			let SelectCities = $('#age_checker_country');
			let SelectOption = $('<option value="#">'+LabelSelect.text()+'</option>');
			SelectCities.prepend(SelectOption);
		},

		centerCursorInputForEdgeBrowsers:function(){
			if(window.navigator.userAgent.search(/edge/ig)){
				let InputsText = $('#age_checker_day, #age_checker_month, #age_checker_year');
				InputsText.each(function(){
					let PlaceholderText = $(this).attr('placeholder');
					$(this).focusin(function () {
            $(this).attr("placeholder", "");
        	});

					$(this).focusout(function () {
							var txtval = $(this).val();
							if (txtval == "") {
									$(this).attr("placeholder", PlaceholderText);
							}
					});
				});
		}
		},

		styleForCheckboxRememberMe: function(){
			let LabelContainerCheckbox = $('#age_checker .form-item-remember-me label');
			if(LabelContainerCheckbox){
				LabelContainerCheckbox.append('<span class="checkmark"></span>');
			}
		}
	}

	// -- Home -- //
	const $HomeScope = {

		// Constructor
		init: function() {		

			// Instance functions
			this.addDivToButtonsForStyles();
			this.homeSliders();
			this.homeBanners();
			this.historySlider();
			this.fixAlignRedDotsDesktop();
		},

		addDivToButtonsForStyles: function(){
			let Buttons = $("#block-views-slider-home-block .view-slider-home .view-content .views-row .home-carling-black-slider-item .home-carling-black-slider-item-content > a,#block-views-banner-home-block .view-banner-home .view-content .home-carling-black-banner-item .home-carling-black-banner-item-content > a");
			Buttons.each(function(){
				let textButton = $(this).text();
				$(this).text("");
				$(this).append("<p class='text-button'>"+textButton+"</p>");
			});
		},

		// scripts for slider
		homeSliders: function() {
			let ViewContent = $('#block-views-slider-home-block .view-slider-home .view-content');
			if(ViewContent){
				ViewContent.slick({
					dots:true,
					arrows:true,
					slidesToShow: 1,
					slidesToScroll: 1,
					adaptiveHeight: true,
					responsive:[
						{
							breakpoint: 1024,
							settings: {
								arrows:true
							}
						},
						{
							breakpoint: 768,
							settings: {
								arrows:false
							}
						},
						{
							breakpoint: 480,
							settings: {
								arrows:false
							}
						}
					]
				});
			}
		},

		homeBanners: function(){
			let ViewContent = $('#block-views-banner-home-block .view-banner-home .view-content');
			if(ViewContent && $(window).width() < 768){
				ViewContent.slick({
					dots:false,
					infinite:false,
					arrows:true,
					slidesToShow: 5,
  				slidesToScroll: 5,
					responsive:[
						{
							breakpoint: 1024,
							settings: {
								slidesToShow: 5,
								slidesToScroll: 5
							}
						},
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1
							}
						},
						{
							breakpoint: 480,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1
							}
						}
					]
				});
			}
		},

		historySlider: function(){
			let ViewContent = $('#block-views-history-home-block .view-history-home .view-content');
			let ContentBanner = $('#block-views-banner-home-block .view-banner-home .view-content .views-row .home-carling-black-banner-item .home-carling-black-banner-item-content');
			if(ViewContent && $(window).width() < 768){
				ViewContent.slick({
					dots:true,
					infinite:false,
					slidesToShow: 1,
  				slidesToScroll: 1
				});
			}
		},

		fixAlignRedDotsDesktop: function(){
			if(!isScreenMobile){
				let ItemsHistory = $("#block-views-history-home-block .view-history-home .view-content .views-row");
				ItemsHistory.each(function(){
					let TitleItem = $(this).find(".views-field .field-content .home-carling-black-history-item .home-carling-black-history-item-content h2");
					let DotItem =  $(this).find(".views-field .field-content .home-carling-black-history-item .divisor .dot");
					if(TitleItem.height()>40){
						DotItem.css({ top: '117px' });
					}
				});
			}
		}

	}

	// -- About -- //
	const $AboutScope = {
		init:function(){
			this.sliderProducts();
			this.sliderAwards();
			this.fixingAwardsSectionForDesktop();
			this.positionContainer360First();
			this.showProducts();
		},

		showProducts:function(){
			$(window).on('load scroll', function(){
				$('.view-products-about .view-content .views-row').each(function(){
					if ($(this).isInViewport()) {
						$(this).addClass('show-products')
					}
				})
				$('.image-awards').each(function(){
					if ($(this).isInViewport()) {
						$(this).addClass('show-awards')
					}
				})
			});
		},

		sliderProducts:function(){
			let ViewContent = $('#block-views-products-about-block .view-products-about .view-content');
			if(ViewContent && $(window).width() < 768){
				ViewContent.slick({
					dots:false,
					infinite:false,
					arrows:true,
					slidesToShow: 1,
					slidesToScroll: 1,
					adaptativeHeight:false,
					centerPadding: '50px',
					responsive:[
						{
							breakpoint: 1024,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 3
							}
						},
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1
							}
						},
						{
							breakpoint: 480,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1
							}
						}
					]
				});
			}
		},

		sliderAwards:function(){
			let ViewContent = $('#block-views-awards-list-block .view-awards-list .view-content');
			if(ViewContent && isScreenMobile){
				ViewContent.slick({
					dots:false,
					infinite:false,
					arrows:true,
					slidesToShow: 1,
					slidesToScroll: 1,
					adaptativeHeight:false
				});
			}
		},

		fixingAwardsSectionForDesktop:function(){
			let ViewAwardsList = $('#block-views-awards-list-block .view-awards-list');
			let NewContainer = $('<div class="view-container"></div>');
			let AwardsViewContent = $('#block-views-awards-list-block .view-awards-list .view-content');
			let AwardsTitleSubtitle = $(
				'#block-views-awards-list-block .view-awards-list .view-header h2,'+
				'#block-views-awards-list-block .view-awards-list .view-header h3,'+
				'#block-views-awards-list-block .view-awards-list .view-header p'
			);
			ViewAwardsList.append(NewContainer);
			NewContainer.append(AwardsViewContent);
			NewContainer.prepend(AwardsTitleSubtitle);
		},

		positionContainer360First:function(){
			let Container360 = $('#block-views-banner-about-block .container360');
			let ContainerBanner360 = $('#block-views-banner-about-block .about-carling-black-banner-item');
			ContainerBanner360.prepend(Container360);

			let MenusBottleCan = $('#block-views-banner-about-block .container360 .menu360 li');
			MenusBottleCan.click(function(){
				MenusBottleCan.removeClass('active');
				$(this).addClass('active');
				let NthChildImg = $(this).index()+1;
				$('#block-views-banner-about-block .container360 > img').hide();
				$('#block-views-banner-about-block .container360 > img:nth-child('+NthChildImg+')').show();
			});
		}


	}

  // -- Article Detail -- //
	const $ArticleDetailScope = {

	// Constructor
	init: function() {    

		// Instance functions
			this.searchBlog();
			this.configureRelatedArticlesSlider();
			this.fixSearchBar();
			this.changeSearchBarAndSelectPositions();
	},

	// scripts for slider
	searchBlog: function() {
		$("#search-blog-button").click(function(event) {
		event.preventDefault();
		var text_search = $('#search-blog-text').val();
		var search_elements = text_search.split(" ");
		var base_url = "/blog?title=";
		$.each(search_elements, function( index, value ) {
			if (index >= search_elements.length - 1){
			base_url += value
			}else{
			base_url += value + '+'
			}
		});
		window.location = base_url;
		});
		},

		configureRelatedArticlesSlider: function(){
			let ViewContent = $('.view-blog-related .view-content');
			if(ViewContent){
				ViewContent.slick({
					dots:true,
					infinite:false,
					slidesToShow: 3,
					slidesToScroll: 3,
					arrows: true,
					responsive:[
						{
							breakpoint: 1024,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 3,
								arrows: false
							}
						},
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 2,
								arrows: true
							}
						},
						{
							breakpoint: 480,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								arrows: true
							}
						}
					]
				});
			}
		},

		fixSearchBar:function(){
			let LinksContainer = $("#block-views-blog-category-search-block .view-blog-category-search .view-content");
			let SelectMenuMobile = $('<select id="edit-field-blog-category-tid" class="form-control form-select" name="field_blog_category_tid" onchange="location = this.value;"></select>');
			SelectMenuMobile.insertAfter(LinksContainer);

			let ItemListContainer = LinksContainer.find('.views-row');
			ItemListContainer.each(function(){
				let Link = $(this).find('.views-field .field-content .form-item a');
				let LinkText = Link.text();
				let LinkUrl = Link.attr('href');
				SelectMenuMobile.append('<option value="'+LinkUrl+'">'+LinkText+'</option>');
			});
		},

		changeSearchBarAndSelectPositions(){
			let SelectDiv = $('#edit-field-blog-category-tid');
			let SearchBarDiv = $('#block-views-blog-category-search-block .view-blog-category-search .view-footer');
			SelectDiv.insertAfter(SearchBarDiv);
		}

	}
	
	const $BlogScope = {

	init: function() {
	this.fixSearchBar();
	this.addLinesToArticles();
	this.addDivToButtonsForStyles();
	this.changeTextAndPhoto();
	this.turnIntoSlideBlogListForMobile();
	this.changeSearchBarAndSelectPositions();
	this.addActiveToFilters();
	this.animationPosts();
	this.homeSliderVideoSLider();
	},

	animationPosts: function() {
	$(window).on('load scroll', function(){
	$('.view-id-blog_list .views-row').each(function(){
		if ($(this).isInViewport()) {
			$(this).addClass('show-post')
		}
		else {
			$(this).removeClass('show-post');
		}
	})
	});
	},

	addActiveToFilters: function(){
	let url = new URL(document.URL);
	let query_string = url.search;
	let search_params = new URLSearchParams(query_string); 
	let category_tid = search_params.get('field_blog_category_tid');

	$(".view-blog-list .view-filters .form-type-bef-link a").each(function( index ) {
	let url = new URL($(this).attr("href"));
	let query_string = url.search;
	let search_params = new URLSearchParams(query_string); 
	let category_link_tid = search_params.get('field_blog_category_tid');
	if (category_tid == category_link_tid){
	$(this).addClass("active");
	$(this).parent().addClass("active");
	}
	});
	},

	addLinesToArticles: function(){
	let LinesSpanArticles = $('<span class="line-article-blog"></span>');
	let BoxArticleText = $('.view-content .carling-black-blog-list-item-left');
	BoxArticleText.prepend(LinesSpanArticles);
	},

	addDivToButtonsForStyles: function(){
	let Buttons = $(".view-content .carling-black-blog-list-item .carling-black-blog-list-item-left > a");
	Buttons.each(function(){
		let textButton = $(this).text();
		$(this).text("");
		$(this).append("<p class='text-button'>"+textButton+"</p>");
	});
	},

	changeTextAndPhoto: function(){
	if($(window).width() < 768){
		let DivImageArticle = $('.view-content .carling-black-blog-list-item-right');
		DivImageArticle.each(function(){
			$(this).prev().insertAfter($(this));
		});
	}
	},

	fixSearchBar:function(){
	let FormSearch = $('#views-exposed-form-blog-list-page-1');
	let HiddenField = $('#edit-field-blog-category-tid-wrapper .bef-new-value');
	let SelectField = $('#edit-field-blog-category-tid');
	let SectionSearchBlock = $('.views-exposed-widgets');
	let ViewFooterSearch = $('<div class="view-footer"></div>');
	let DivTextFieldSearch = $('#edit-title-wrapper');
	let DivButtonSearch = $('.view-filters .views-submit-button');
	ViewFooterSearch.append(DivTextFieldSearch);
	ViewFooterSearch.append(DivButtonSearch);
	SectionSearchBlock.append(ViewFooterSearch);

	let InputTextFieldSearch = $('#edit-title-wrapper .views-widget #edit-title');
	InputTextFieldSearch.attr("placeholder", "SEARCH BLOG ENTRIES...");

	$('#edit-field-blog-category-tid').removeAttr('style');

	//Fix Form submit
	SelectField.change(function(){
		let NumberSelected = $(this).children("option:selected").val();
		HiddenField.val(NumberSelected);
		FormSearch.submit();
	});

	},

	turnIntoSlideBlogListForMobile: function(){
		if($(window).width() < 768){
			let ViewContent = $('.view-blog-list .view-content');
			ViewContent.slick({
				dots:true,
				infinite:false,
				slidesToShow: 1,
			slidesToScroll: 1,
				responsive:[
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		}
	},


	homeSliderVideoSLider: function(){
		let ViewContent = $('.slick-wrap');

		ViewContent.on('init', function(event, slick){
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
		
		ViewContent.slick({
			dots: true,
			focusOnSelect: true,
			infinite: true,
			arrows: false,
			speed: 300,
			slidesToShow: 1,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
					}
				},
				{
					breakpoint: 600,
					settings: {
						arrows: true,
						dots: false
					}
				},
				{
					breakpoint: 480,
					settings: {
						arrows: true,
						dots: false
					}
				}
		    
			]
		});
	},

	changeSearchBarAndSelectPositions(){
	let SelectDiv = $('#edit-field-blog-category-tid-wrapper');
	let SearchBarDiv = $('.view-filters .views-exposed-widgets .view-footer');
	SelectDiv.insertAfter(SearchBarDiv);

	}

	}

	const $Page404Scope = {
		init:function(){
		}
	}

  // -- Contact -- //
  const $ContactScope = {
    init:function(){
	  this.validateFormContact();
	  this.dataLayerSupport();
    },

    validateFormContact:function(){
      //Add new methods to validate fields
      jQuery.validator.addMethod("emailordomain", function(value, element) {
        return this.optional(element) || /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value) || /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/.test(value);
      }, "Please specify the correct url/email");

      jQuery.validator.addMethod("lettersonly", function(value, element) {
        return this.optional(element) || /^[A-Za-z\u00C0-\u017F" "ñ]+$/i.test(value);
      }, "Letters and spaces only please"); 

      if($('#webform-client-form-66').length > 0){
        // jQuery validate
        $('#webform-client-form-66').validate({
          rules:
          {
            "submitted[first_name__last_name]":
            {
                "required": true
            },
            "submitted[email]":
            {
                "required": true,
                "email": true,
                "emailordomain": true
            },
            "submitted[your_message]":
            {
                "required": true
            }
          },
          errorPlacement: function(){
            return false;
          }
        });
      }
	},
	
	dataLayerSupport: function() {

		let formWrapper  = document.getElementById('webform-client-form-66'),
			emailField   = document.getElementById('edit-submitted-email');
		
		formWrapper.addEventListener('submit', (e)=> {
			if($("#webform-client-form-66").valid()){
				dataLayer.push({
					'event': 'Contact',
					'eventCategory': 'Contact',
					'eventAction': 'Sent',
					'eventLabel': emailField.value,
				});
			}
		})
	}
  }

  // -- Subscribe -- //
  const $SubscribeScope = {
    init:function(){
	  this.validateFormSubscribe();
	  this.dataLayerSupport();
    },

    validateFormSubscribe:function(){
      //Add new methods to validate fields
      jQuery.validator.addMethod("emailordomain", function(value, element) {
        return this.optional(element) || /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value) || /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/.test(value);
      }, "Please specify the correct url/email");

      jQuery.validator.addMethod("lettersonly", function(value, element) {
        return this.optional(element) || /^[A-Za-z\u00C0-\u017F" "ñ]+$/i.test(value);
      }, "Letters and spaces only please"); 

      if($('#webform-client-form-126').length > 0){
        // jQuery validate
        $('#webform-client-form-126').validate({
          rules:
          {
            "submitted[first_name__last_name]":
            {
                "required": true
            },
            "submitted[email]":
            {
                "required": true,
                "email": true,
                "emailordomain": true
            }
          },
          errorPlacement: function(){
            return false;
          }
        });
      }
	},

	dataLayerSupport: function() {

		let formWrapper     = document.getElementById('webform-client-form-126'),
			nameField       = document.getElementById('edit-submitted-first-name-last-name'),
			emailField      = document.getElementById('email'),
			acceptanceField = document.getElementById('edit-submitted-accept-the-terms-1'),
			marketingField  = document.getElementById('edit-submitted-accept-the-terms-2');

		// Set Naming Conventions
		/*nameField.setAttribute('td-type','fullname');
		emailField.setAttribute('td-type','email');
		acceptanceField.setAttribute('td-type', 'TC-PP');
		marketingField.setAttribute('td-type', 'MARKETING-ACTIVATION');
		
		formWrapper.addEventListener('submit', (e)=> {
			if($("#webform-client-form-126").valid()){
				
				// Trigger datalayer
				dataLayer.push({
					'event': 'Register',
					'eventCategory': 'Register',
					'eventAction': 'Sent',
					'eventLabel': emailField.value,
				});

				// Marketing datas

			}
		})*/
	}
  }

	// ----------------------------
	// TRIGGERS
	// ----------------------------

	// Trigger 
	$GeneralScope.init();

	// Agegate
	if ($('body').hasClass('page-agegate')) {
		$AgegateScope.init();
	}

	// Home Scripts
	if ($('body').hasClass('front')) {
		$HomeScope.init();
	}

  // Article Detail Scripts
  if ($('body').hasClass('node-type-article')) {
    $ArticleDetailScope.init();
	}
	
	// Article Detail Scripts
  if ($('body').hasClass('page-blog')) {
    $BlogScope.init();
	}
	
	// Article Detail Scripts
  if ($('body').hasClass('custom-carling-black-404')) {
    $Page404Scope.init();
	}
	
  // About Scripts
	if($('body').hasClass('custom-carling-black-about')){
		$AboutScope.init();
	}

  // Contact Scripts
  if($('body').hasClass('custom-carling-black-contact')){
    $ContactScope.init();
  }

  // Subscribe Scripts
  if($('#webform-client-form-126').length > 0){
    $SubscribeScope.init();
  }

  // shareButtons braai off
    $('#fbrs').bind("click", function () {
        dataLayer.push({
            'event': 'trackEvent',
            'eventCategory': 'Class of Its Own Social Media',
            'eventAction': 'Facebook',
            'eventLabel': 'Click Button',
            'eventValue': '_VALUE_'
        });

        var text = "Give the Class of its Own a shout out or tell us how you found the gold inside yourself using: #THERESGOLDINSIDE #CLASSOFITSOWN";
        var pageUrl = window.location.origin;
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(pageUrl) + '&quote=' + encodeURIComponent(text));
    });

    $('#twrs').bind("click", function () {
        dataLayer.push({
            'event': 'trackEvent',
            'eventCategory': 'Class of Its Own Social Media',
            'eventAction': 'Twitter',
            'eventLabel': 'Click Button',
            'eventValue': '_VALUE_'
        });
        var text = "Give the Class of its Own a shout out or tell us how you found the gold inside yourself using: #THERESGOLDINSIDE #CLASSOFITSOWN";
        var pageUrl = window.location.origin;
        window.open('https://twitter.com/share?url=' + encodeURIComponent(pageUrl) + '&text=' + encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
    });

    /* api youtube */
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // slider

    // jQuery('.slider').slick({
    //     slidesToShow: 1,
    //     centerMode: true,
    //     speed: 500
    // });

    // jQuery('.slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    //     jQuery('.slick-current iframe').attr('src', jQuery('.slick-current iframe').attr('src'));
    // });

    // Youtube Datalayer
    setTimeout(() => {
        if ($("body").hasClass('classOwn')) {
            let Idcurrent = jQuery(".videoresponsive iframe")[0].attributes["id"].value;
            // let title = jQuery(".slick-current .views-field-title .field-content p").text();
            videoload(Idcurrent);
            console.log(Idcurrent);
        }
    }, 1000);


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
                    eventValue: "_VALUE_",
                });

                done = true;
            }
        }
        onYouTubeIframeAPIReady();
    }
    if ($('.view-golden-questions').length) {
			$( ".views-field-title" ).addClass( "closed-answers" );
      var element = document.getElementsByClassName("views-field-title");
      var i;
  
      for (i = 0; i < element.length; i++) {
        element[i].addEventListener("click", function() {
          this.classList.toggle("active");
          var panel = this.nextElementSibling.nextElementSibling;
          if (panel.style.display === "block") {
            panel.style.display = "none";
						$(this).removeClass("open-answers").addClass("closed-answers");
          } else {
            panel.style.display = "block";
						$(this).removeClass("closed-answers").addClass("open-answers");
          }
        });
      }
    }

		if ($('#block-views-gold-medal-award-block').length) {
			$(".cbl-awards .gold").addClass("closed-award");
			$('.gold').click(function() {
				var panel = this.nextElementSibling;
				if (panel.style.display === "block") {
					panel.style.display = "none";
					$(this).parent().siblings().children().css("display", "none");
					$(this).removeClass("open-award").addClass("closed-award");
					$(this).parent().parent().parent().css("margin-bottom", "0px");
				} else {
					panel.style.display = "block";
					$(this).parent().siblings().children().css("display", "table-cell");
					$(this).removeClass("closed-award").addClass("open-award");
					$(this).parent().parent().parent().css("margin-bottom", "80px");
				}
			});
		}

});


