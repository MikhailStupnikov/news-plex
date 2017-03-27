// ======= МОДУЛЬ СЛАЙДЕРА =======
var Slider = (function() {

	var _sliderList = $('.slider-list'),
		_sliderItems = $('.slider-item'),
		_sliderQuantity = $('.slider-item').length,
		_pagerList = $('.pager-list'),
		_active = 'pager-active',
		_currentSlide = 0,
		_pagerItem,
		_sliderId;

	function init() {
		_runSlider();
	}

	function _runSlider() {
		$(_sliderItems).not(':first').hide();

		for (var i = 0; i < _sliderQuantity; i++) {
			// $('<li>', {class: 'pager-item'}).appendTo(_pagerList); // не работает в IE 8
			_pagerList.append('<li class="pager-item">');
		}

		_pagerItem = $('.pager-item');

		_pagerItem.first().addClass(_active);

		_sliderId = setInterval(_switchSlide, 5000);

		_setUpListener();
	}

	function _setUpListener() {

		_pagerItem.on('click', _selectSlide);
		$(_sliderList).on('mouseout', _startSlider);
		$(_sliderList).on('mouseover', _stopSlider);

	}

	function _hideSlide() {
		_sliderItems.eq(_currentSlide).stop().fadeOut(300);
		_pagerItem.eq(_currentSlide).removeClass(_active);
	}

	function _showSlide() {
		_sliderItems.eq(_currentSlide).stop().fadeIn(300);
		_pagerItem.eq(_currentSlide).addClass(_active);
	}

	function _switchSlide() {
		
		_hideSlide();
		
		_currentSlide++;

		if (_currentSlide === _sliderQuantity) {
			_currentSlide = 0;
		}

		_showSlide();

	}

	function _selectSlide() {
		clearInterval(_sliderId);

		_hideSlide();

		_currentSlide = $(this).index();

		_showSlide();

		_sliderId = setInterval(_switchSlide, 3000);
	}

	function _startSlider() {
		_sliderId = setInterval(_switchSlide, 3000);
	}

	function _stopSlider() {
		clearInterval(_sliderId);
	}

	return {
		init: init
	};

})();



// ======= МОДУЛЬ АККОРДЕОНА =======
var Arrordion = (function() {

	var _accorTriger = $('.accordion-trigger'),
		_accorInner = $('.accordion-inner'),
		_active = 'accordion-active';

	function init() {
		_hideInner();
	}

	function _hideInner() {
		_accorInner.hide();

		_setUpListener();
	}

	function _setUpListener() {
		_accorTriger.on('click', _triggerAccor);
	}

	function _triggerAccor(event) {
		event.preventDefault();

		$(this).toggleClass(_active);
		$(this).siblings('.accordion-inner').stop().slideToggle(300);
	}

	return {
		init: init
	};

})();



// ======= МОДУЛЬ ПРЕВЬЮ ======= 
var Preview = (function() {

	var _bigImg = $('.news-big').children('img'),
		_newsItem = $('.news-item'),
		_wayImg;

	function init() {
		_setUpListener();
	}

	function _setUpListener() {
		_newsItem.on('click', _changePhoto);
	}

	function _changePhoto() {
		_wayImg = $(this).children('img').attr('src');
		_bigImg.attr('src', _wayImg);
	}

	return {
		init: init
	};

})();



// ======= МОДУЛЬ ТАБОВ =======
var Tabs = (function() {

	var _controlItems = $('.tabs-control-item'),
		_contentItems = $('.tabs-content-item'),
		_active = 'tabs-active';

	function init() {
		_hideTabs();
	}

	function _hideTabs() {
		_contentItems.not(':first').hide();

		_setUpListener();
	}

	function _setUpListener() {
		_controlItems.on('click', _switchTabs);
	}

	function _switchTabs() {
		_controlItems.removeClass(_active);
		_contentItems.stop().hide();

		_controlItems.eq($(this).index()).addClass(_active);
		_contentItems.eq($(this).index()).stop().fadeIn(500);
	}

	return {
		init: init
	};

})();



// ======= ИНИЦИАЛИЗАЦИЯ МОДУЛЕЙ =======
$(document).ready(function() {

	Slider.init();

	Arrordion.init();

	Preview.init();

	Tabs.init();

});