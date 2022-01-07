
function  imgslider(){
    // img slider refer to https://www.codingsnow.com/2021/01/image-slider-with-auto-play-manual.html

    var counterdsmc_indexpage = 1;
    setInterval(function(){
        
        document.getElementById('radiodsmc_indexpage' + counterdsmc_indexpage).checked = true;
        counterdsmc_indexpage++;
        if(counterdsmc_indexpage > 5){
            counterdsmc_indexpage = 1;
        }

    }, 2000);
}


// starts here
document.addEventListener('DOMContentLoaded', imgslider);