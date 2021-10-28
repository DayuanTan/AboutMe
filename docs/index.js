
function  imgslider(){
    // img slider refer to https://www.codingsnow.com/2021/01/image-slider-with-auto-play-manual.html

    var counter = 1;
    var counterwsn = 1;
    var counterarchi = 1;
    setInterval(function(){
        document.getElementById('radio' + counter).checked = true;
        counter++;
        if(counter > 3){
            counter = 1;
        }

        document.getElementById('radiowsn' + counterwsn).checked = true;
        counterwsn++;
        if(counterwsn > 4){
            counterwsn = 1;
        }

        document.getElementById('radioarchi' + counterarchi).checked = true;
        counterarchi++;
        if(counterarchi > 4){
            counterarchi = 1;
        }

    }, 2000);
}


// starts here
document.addEventListener('DOMContentLoaded', imgslider);