function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function throttle(callback, limit) {
  var waiting = false;
  return function () {
    if (!waiting) {
      callback.apply(this, arguments);
      waiting = true;
      setTimeout(function () {
        waiting = false;
      }, limit);
    }
  };
}

document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages;    

  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".lazy");
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });

    lazyloadImages.forEach(function(image) {
      imageObserver.observe(image);
    });
  } else {  
    var lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(".lazy");
    
    function lazyload () {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }    

      lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
        });
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }
})

var DOMAnimations = {
    
  /**
  * SlideUp
  *
  * @param {HTMLElement} element
  * @param {Number} duration
  * @returns {Promise<boolean>}
  */
  slideUp: function (element, duration = 500) {

      return new Promise(function (resolve, reject) {

          element.style.height = element.offsetHeight + 'px';
          element.style.transitionProperty = `height, margin, padding`;
          element.style.transitionDuration = duration + 'ms';
          element.offsetHeight;
          element.style.overflow = 'hidden';
          element.style.height = 0;
          element.style.paddingTop = 0;
          element.style.paddingBottom = 0;
          element.style.marginTop = 0;
          element.style.marginBottom = 0;
          window.setTimeout(function () {
              element.style.display = 'none';
              element.style.removeProperty('height');
              element.style.removeProperty('padding-top');
              element.style.removeProperty('padding-bottom');
              element.style.removeProperty('margin-top');
              element.style.removeProperty('margin-bottom');
              element.style.removeProperty('overflow');
              element.style.removeProperty('transition-duration');
              element.style.removeProperty('transition-property');
              resolve(false);
          }, duration)
      })
  },

  /**
  * SlideDown
  *
  * @param {HTMLElement} element
  * @param {Number} duration
  * @returns {Promise<boolean>}
  */
  slideDown: function (element, duration = 500) {

      return new Promise(function (resolve, reject) {

          element.style.removeProperty('display');
          let display = window.getComputedStyle(element).display;

          if (display === 'none') 
              display = 'block';

          element.style.display = display;
          let height = element.offsetHeight;
          element.style.overflow = 'hidden';
          element.style.height = 0;
          element.style.paddingTop = 0;
          element.style.paddingBottom = 0;
          element.style.marginTop = 0;
          element.style.marginBottom = 0;
          element.offsetHeight;
          element.style.transitionProperty = `height, margin, padding`;
          element.style.transitionDuration = duration + 'ms';
          element.style.height = height + 'px';
          element.style.removeProperty('padding-top');
          element.style.removeProperty('padding-bottom');
          element.style.removeProperty('margin-top');
          element.style.removeProperty('margin-bottom');
          window.setTimeout(function () {
              element.style.removeProperty('height');
              element.style.removeProperty('overflow');
              element.style.removeProperty('transition-duration');
              element.style.removeProperty('transition-property');
          }, duration)
      })
  },

  /**
  * SlideToggle
  *
  * @param {HTMLElement} element
  * @param {Number} duration
  * @returns {Promise<boolean>}
  */
  slideToggle: function (element, duration = 500) {

      if (window.getComputedStyle(element).display === 'none') {

          return this.slideDown(element, duration);

      } else {

          return this.slideUp(element, duration);
      }
  }
}