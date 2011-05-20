(function( $, undefined ) {

	/* update device page title when clicking on a device menu */

	$('a.device-link').live('click',function(e){
		$('#device-name').text($(e.target).text());
	});

	/* start updating the current chart */
	$('#current').live('pageshow',function(e){
      var dataSet = new TimeSeries();
      setInterval(function() {
        var now = new Date().getTime();
        dataSet.append(now, Math.random());
      }, 1000);
      // Build the timeline
      var smoothie = new SmoothieChart({ millisPerPixel: 20, grid: { strokeStyle: '#555555', lineWidth: 1, millisPerLine: 1000, verticalSections: 4 }});
      smoothie.addTimeSeries(dataSet, { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.2)', lineWidth: 3 });
      smoothie.streamTo(document.getElementById('current-chart'), 1000);
	});

	/* start updating the device chart */
	$('#device').live('pageshow',function(e){
      var dataSet = new TimeSeries();
      setInterval(function() {
        var now = new Date().getTime();
        dataSet.append(now, Math.random());
      }, 1000);
      // Build the timeline
      var smoothie = new SmoothieChart({ millisPerPixel: 20, grid: { strokeStyle: '#555555', lineWidth: 1, millisPerLine: 1000, verticalSections: 4 }});
      smoothie.addTimeSeries(dataSet, { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.2)', lineWidth: 3 });
      smoothie.streamTo(document.getElementById('device-chart'), 1000);
	});

	/* theme switcher in options */

	var changeTheme=function(theme){
		$('body, div, ul, li').attr('data-theme',theme);
		$('.ui-btn-dwn-a,.ui-btn-dwn-b,.ui-btn-dwn-e').removeClass('ui-btn-dwn-a ui-btn-dwn-b ui-btn-dwn-e').addClass('ui-btn-dwn-'+theme);
		$('.ui-btn-up-a,.ui-btn-up-b,.ui-btn-up-e').removeClass('ui-btn-up-a ui-btn-up-b ui-btn-up-e').addClass('ui-btn-up-'+theme);
		$('.ui-body-a,.ui-body-b,.ui-body-e').removeClass('ui-body-a ui-body-b ui-body-e').addClass('ui-body-'+theme);
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