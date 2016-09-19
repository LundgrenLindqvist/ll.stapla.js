/* Settings */
var container = '#stapla';
var pileEm = '.pile-me';
var pileSize = 275;
var pileMargin = 20;
var offsetMax = 30;
var columns = 3;
var topMargin = 440;


/* No need to edit below unless to change core functionality */
function setHeights() {
    var winHeight = $(window).height();
    var pileLength = $('body').find(pileEm+':last').attr('data-pile');
    var containerHeight = pileSize*(Math.ceil(pileLength/columns)) + (pileMargin*2)*(Math.ceil(pileLength/(columns)))+topMargin;
    if ( winHeight < containerHeight) {
        $(container).height(containerHeight)
        $('body').height(containerHeight);
    } else {
        $(container).css({'height':''});
        $('body').css({'height':''});        
    }
}

function stapla(init) {
        
    var winWidth = $(window).width();
        
    $(pileEm).each(function(pileEmIndex){
        
        var pile = $(this).attr('data-pile');
        
        var pileColumns = ((pile-1) % 3)+1;
        
        var pileRow = Math.ceil((pile)/3);
        
        var width = $(this).outerWidth();
        var height = $(this).outerHeight();
        
        var centeringOffset = (winWidth-((pileSize*columns)+(pileMargin*(columns*2))))/2;
        
        var offsetleft = (pileSize/2)-(width/2) + ( (pileColumns-1)*pileSize + pileColumns*(pileMargin*2))-pileMargin+centeringOffset;
        var offsettop = (pileSize/2)-(height/2) + ( (pileRow-1)*pileSize + pileRow*(pileMargin*2))-pileMargin+topMargin;
        
        var randomleft = Math.ceil(Math.random() * offsetMax);
        var randomtop = Math.ceil(Math.random() * offsetMax);
        
        var caseloop = ((pileEmIndex % 4)+1);
        
        switch (caseloop) {
            case 1:
                offsetleft = offsetleft + randomleft;
                offsettop = offsettop - randomtop;
                break;
            case 2:
                offsetleft = offsetleft + randomleft;
                offsettop = offsettop + randomtop;
                break;
            case 3:
                offsetleft = offsetleft - randomleft;
                offsettop = offsettop + randomtop;
                break;
            case 4:
                offsetleft = offsetleft - randomleft;
                offsettop = offsettop - randomtop;
                break;
        }
        
        if ( init == true ) {            
            $(this).css({marginLeft:offsetleft,marginTop:offsettop,'display':'block'});
        } else {                
            if ( $(this).is(':visible') ) {
                $(this).animate({marginLeft:offsetleft,marginTop:offsettop}, 400);
            } else {                
                $(this).css({'display':'block'});
            }                
        }
        
    });
    
}


$(function() {

    $(container).delegate(pileEm, "click", function(event) {
        
        if ( !$(this).hasClass('active') ) {
        
            $('body').addClass('back');
               
            var winWidth = $(window).width();                
            var winHeight = $(window).height();                
            var pile = $(this).attr('data-pile');                
            var length = $(pileEm+'[data-pile='+pile+']').length;                
            var containerExtendedHeight = pileSize*Math.ceil(length/columns) + (pileMargin*2)*(Math.ceil(length/(columns)))+topMargin;
            
            if ( winHeight < containerExtendedHeight) {
                $(container).css({'height':containerExtendedHeight});
            } else {
                $(container).css({'height':''});
            }         
            
            var centeringOffset = (winWidth-((pileSize*columns)+(pileMargin*(columns*2))))/2;
            
            /* Move the inactive stacks to the sides */
            var pileIndex = 0;
            var currentPile;
            
            $(container).find(pileEm+':not([data-pile='+pile+'])').each(function(pileEmIndex){               
                
                $(this).removeClass('active');
                
                var pile = $(this).attr('data-pile');
                
                if ( pileEmIndex == 1 ) {
                    currentPile = pile;                    
                } else {
                    if ( pile != currentPile ) {
                        currentPile = pile;
                        pileIndex++;
                    }                
                }
                
                var row = Math.ceil((pileIndex)/2);
                
                var width = $(this).outerWidth();
                var height = $(this).outerHeight();
                
                if (pileIndex%2 == 0) {
                    var offsetleft = winWidth-(pileSize/2)+(pileMargin*2);
                } else {
                    var offsetleft = -((pileSize/2)-pileMargin);
                }
                
                var offsettop = (pileSize/2)-(height/2) + ( (row-1)*pileSize + (row-1)*(pileMargin*3) )+topMargin;
                
                var randomleft = Math.ceil(Math.random() * offsetMax);
                var randomtop = Math.ceil(Math.random() * offsetMax);
                
                var caseloop = ((pileEmIndex % 4)+1);
                
                switch (caseloop) {
                    case 1:
                        offsetleft = offsetleft + randomleft;
                        offsettop = offsettop - randomtop;
                        break;
                    case 2:
                        offsetleft = offsetleft + randomleft;
                        offsettop = offsettop + randomtop;
                        break;
                    case 3:
                        offsetleft = offsetleft - randomleft;
                        offsettop = offsettop + randomtop;
                        break;
                    case 4:
                        offsetleft = offsetleft - randomleft;
                        offsettop = offsettop - randomtop;
                        break;
                }
                
                $(this).animate({marginLeft:offsetleft,marginTop:offsettop}, 400);                
            
            });
            
            /* Spread the active stack */
            $(container).find(pileEm+'[data-pile='+pile+']').each(function(pileEmIndex){
                
                $(this).addClass('active');
                    
                var column = pileEmIndex % columns;
                var row = Math.ceil((pileEmIndex+1)/columns);
                                
                var width = $(this).outerWidth();
                var height = $(this).outerHeight();
                                
                var offsetleft = (pileSize/2)-(width/2) + ( column*pileSize + column*(pileMargin*3) ) + centeringOffset;
                var offsettop = (pileSize/2)-(height/2) + ( (row-1)*pileSize + (row-1)*(pileMargin*3) )+topMargin;
                                               
                $(this).animate({marginLeft:offsetleft,marginTop:offsettop}, 400);
            
            });
        
        }
        
        event.stopPropagation();
    });
    
    $('body.back').live({
        click: function(event){
            stapla(false);
            $(pileEm).removeClass('active');
            $('body').removeClass('back');
            event.stopPropagation();
        }
    });

});