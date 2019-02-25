'use strict';
var showDays;
$(document).ready( function() {	
    console.log(window.location);
    if(window.location.pathname=="/" || 
        window.location.pathname=="/index.html" || 
        window.location.pathname=="/felicific19/index.html" || 
        window.location.pathname=="/felicific19/"){
    var days = getUrlJsonSync('https://anmolsaxena10.github.io/felicific-data/days.json');
    
    for(var i=1 ; i<=days.length ; i++){
        var events = getUrlJsonSync(`https://anmolsaxena10.github.io/felicific-data/Days/day${i}.json`);
        console.log(i+' = '+events);
        if(events==undefined)continue;
        for(var j=0 ; j<events.length ; j++){
            var item = `<div class="cbp-item day${i}">
                        <a href="event_page/index.html?url=${i}">
                            <figure class="fig">
                                <img src="https://anmolsaxena10.github.io/felicific-data/${events[j].poster}" alt="">
                                <figcaption>
                                    <h3>${events[j].event_name}</h3>
                                    <p>${days[i-1].date}</p>
                                </figcaption>
                            </figure>
                        </a>
                        </div>`;
            // console.log(item);
            $('#grid-container').append(item);
        }
    }

    var cultural = getUrlJsonSync('https://anmolsaxena10.github.io/felicific-data/Days/cultural.json');
    console.log(cultural);
    // if(cultural!=undefined){
    for(var j=0 ; j<cultural.length ; j++){
        var item = `<div class="cbp-item cultural">
                    <a href="event_page/index.html?url=7">
                        <figure class="fig">
                            <img src="https://anmolsaxena10.github.io/felicific-data/${cultural[j].poster_url}" alt="">
                            <figcaption>
                                <h3>${cultural[j].name}</h3>
                            </figcaption>
                        </figure>
                    </a>
                    </div>`;
        // console.log(item);
        $('#grid-container').append(item);
    }
    // }
    }


    // HOME PAGE HEIGHT
    jQuery(window).load(function() {
        
            // will first fade out the loading animation
        jQuery(".loader").fadeOut();
            // will fade out the whole DIV that covers the website.
        jQuery(".preloader").delay(1000).fadeOut("slow");
    });

    // HOME PAGE HEIGHT
    if ($('.home, .portfolio-hero').length) {
        function fullhome() {
            var hometext = $('.home, .portfolio-hero')            
//            var homett = $('.hero-title').offset();
//            $('.social').css('margin-top', homett.top)            
            hometext.css({
                "height": $(window).height() + "px"
            });
        }
        fullhome();
        $(window).resize(fullhome);
    }
        

    // MAGNIFIC POPUP FOR PORTFOLIO PAGE
    // $('.magnif').magnificPopup({
    //     type:'image',
    //     gallery:{enabled:true},
    //     zoom:{enabled: true, duration: 300}
    // });
    
    
    // HOME TYPED JS
    if ($('.element').length) {
        $('.element').each(function () {
            $(this).typed({
                strings: [$(this).data('text1'), $(this).data('text2'), $(this).data('text3')], 
                loop: $(this).data('loop') ? $(this).data('loop') : false ,
                backDelay: $(this).data('backdelay') ? $(this).data('backdelay') : 2000 ,                
                typeSpeed: 10,
            });
        });
    }


    // PORTFOLIO ISOTOPE
    if ($('.isotope_items').length) {
         var $container = $('.isotope_items');
         $container.isotope();

        $('.portfolio-filter ul li').on("click", function(){
            $(".portfolio-filter ul li").removeClass("select-cat");
            $(this).addClass("select-cat");              
            var selector = $(this).attr('data-filter');
            $(".isotope_items").isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false,
                }
        });
            return false;
        });      
    }


    // PORTFOLIO EFFECT
    $(".cbp-item").hover3d({
        selector: "figure",
        perspective: 3000,
        shine: true
    });

    
   // $('.site-btn').click(function(){
   //      $('.isotope_items').load('port.html').fadeIn();
   //  });


// PORTFOLIO CONTENT

    $('#grid-container').cubeportfolio({
        layoutMode: 'grid',
        filters: '.portfolio-filter',
        gridAdjustment: 'responsive',
        animationType: 'skew',
        defaultFilter: '*',
        gapVertical: 30,
        gapHorizontal: 30,
        singlePageAnimation: 'fade',
        mediaQueries: [{
                width: 700,
                cols: 3,
            }, {
                width: 480,
                cols: 2,
                options: {
                    caption: '',
                    gapHorizontal: 30,
                    gapVertical: 20,
                }
            }, {
                width: 320,
                cols: 1,
                options: {
                    caption: '',
                    gapHorizontal: 50,
                }
            }],            
        singlePageCallback: function (url, element) {
            var t = this;
            $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'html',
                    timeout: 30000
                })
                .done(function (result) {
                    t.updateSinglePage(result);
                })
                .fail(function () {
                    t.updateSinglePage('AJAX Error! Please refresh the page!');
                });
        },
            plugins: {
                loadMore: {
                    element: '#port-loadMore',
                    action: 'click',
                    loadItems: 3,
                }
            }
    }); 

    //TWITTER
    if ($('.widget-twitter .tweet').length) {
        $('.widget-twitter .tweet').twittie({
            username: 'envato'
            , list: null
            , dateFormat: '%B %d, %Y'
            , template: '{{tweet}} <br/> <span class="date">{{date}}</span>'
            , count: 10

        }, function () {
            setInterval(function() {
                var item = $('.widget-twitter .tweet ul').find('li:first');

                item.animate( {marginLeft: '-220px', 'opacity': '0'}, 500, function() {
                    $(this).detach().appendTo('.widget-twitter .tweet ul').removeAttr('style');
                });
            }, 5000);
        });
    }


    // RESPONSIVE MENU
    $('.nav-icon').click(function(){
        $('body').toggleClass('full-open');
    });


    // OWL CAROUSEL GENERAL JS
    var owlcar = $('.owl-carousel');
    if (owlcar.length) {
        owlcar.each(function () {
            var $owl = $(this);
            var itemsData = $owl.data('items');
            var autoPlayData = $owl.data('autoplay');
            var paginationData = $owl.data('pagination');
            var navigationData = $owl.data('navigation');
            var stopOnHoverData = $owl.data('stop-on-hover');
            var itemsDesktopData = $owl.data('items-desktop');
            var itemsDesktopSmallData = $owl.data('items-desktop-small');
            var itemsTabletData = $owl.data('items-tablet');
            var itemsTabletSmallData = $owl.data('items-tablet-small');
            $owl.owlCarousel({
                items: itemsData
                , pagination: paginationData
                , navigation: navigationData
                , autoPlay: autoPlayData
                , stopOnHover: stopOnHoverData
                , navigationText: ["<", ">"]
                , itemsCustom: [
                    [0, 1]
                    , [500, itemsTabletSmallData]
                    , [710, itemsTabletData]
                    , [992, itemsDesktopSmallData]
                    , [1199, itemsDesktopData]
                ]
            , });
        });
    }
    setTimeout(function(){
        $("#d1").trigger('click');
    }, 1000);
}); // document ready end 


function getUrlJsonSync(url){

    var jqxhr = $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        cache: false,
        async: false
    });
    var response = {valid: jqxhr.statusText,  data: jqxhr.responseJSON};
    return response.data;
}


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
  
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
  
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
  };