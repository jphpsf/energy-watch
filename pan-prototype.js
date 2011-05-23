(function( $, undefined ) {

	/* update device page title when clicking on a device menu */
	$('a.device-link').live('click',function(e){
		$('#device-name').text($(e.target).text());
	});

	/* handle device switch on/off */
	$('#device-switch').live('change', function(e){
		if ($(this).val()=='off') {
			deviceIsOff=true;
		} else {
			deviceIsOff=false;
		}
	});

	var deviceIsOff = false,
		charts = {},
		initChart = function(id) {
			if (charts[id]) {
				return false;
			}
			var dataSet = new TimeSeries(), $value=$('#'+id+'-value');
			setInterval(function() {
				var now = new Date().getTime(), value=Math.random() * 5 + 5;
				if ($.mobile.activePage.is('#device') && deviceIsOff===true) {
					value=0;
				}
				$value.text(value.toFixed(2)+'KW');
				dataSet.append(now, value);
			}, 1000);
			// Build the timeline
			var smoothie = new SmoothieChart({ minValue:0, millisPerPixel: 20, grid: { strokeStyle: '#555555', lineWidth: 1, millisPerLine: 1000, verticalSections: 4 }});
			var orientation = (window.orientation===0?'portrait':'landscape');
			changeChartOrientation(id, orientation);
			smoothie.addTimeSeries(dataSet, { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.2)', lineWidth: 3 });
			smoothie.streamTo(document.getElementById(id), 1000);
			charts[id]=true;
		},
		changeChartOrientation = function(id, orientation) {
			var $chart=$('#'+id),
				width=Math.floor(window.innerWidth*0.9),
				height=Math.floor(window.innerHeight*0.5);
			$chart.attr('width',width);
			$chart.attr('height',height);
		};

	/* start updating the current chart */
	$('#current').live('pageshow',function(e){
		initChart('current-chart');
	});

	/* start updating the device chart */
	$('#device').live('pageshow',function(e){
		initChart('device-chart');
	});

	/* orientation response for current consumption canvas chart */
	$(window).bind('orientationchange', function(e,orientation){
		if ($.mobile.activePage.is('#current')) {
			changeChartOrientation('current-chart', orientation);
		} else if ($.mobile.activePage.is('#device')) {
			changeChartOrientation('device-chart', orientation);
		}
	});

	/* theme switcher in options */
	var changeTheme=function(theme){
		$('body, div, ul, li').attr('data-theme',theme);
		$('.ui-btn-dwn-a,.ui-btn-dwn-b,.ui-btn-dwn-e').removeClass('ui-btn-dwn-a ui-btn-dwn-b ui-btn-dwn-e').addClass('ui-btn-dwn-'+theme);
		$('.ui-btn-up-a,.ui-btn-up-b,.ui-btn-up-e').removeClass('ui-btn-up-a ui-btn-up-b ui-btn-up-e').addClass('ui-btn-up-'+theme);
		$('.ui-body-a,.ui-body-b,.ui-body-e').removeClass('ui-body-a ui-body-b ui-body-e').addClass('ui-body-'+theme);
		$('.ui-bar-a,.ui-bar-b,.ui-bar-e').filter(':not(li.bar)').removeClass('ui-bar-a ui-bar-b ui-bar-e').addClass('ui-bar-'+theme);
		$('#options').trigger("pageshow");
	}

	$('#dark-theme').live('change',function(){
		changeTheme('a');
	});
	$('#light-theme').live('change',function(){
		changeTheme('b');
	});
	$('#sun-theme').live('change',function(){
		changeTheme('e');
	});

})( jQuery, this );
