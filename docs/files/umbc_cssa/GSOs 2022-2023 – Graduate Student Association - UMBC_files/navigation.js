let menu_items = document.querySelectorAll("li.menu-item");

let menu_items_has_children = document.querySelectorAll('.top-level > .sub-menu li.menu-item-has-children:not(.sub-menu .sub-menu li.menu-item-has-children), li.top-level.menu-item-has-children')

let top_level_menu_items = document.querySelectorAll(".top-level");

let menu_hover = document.querySelectorAll("li.menu-hover");

let menu_toggle = document.querySelector(".menu-toggle")
let whole_menu = document.querySelector("#primary-menu")

let menu_toggle_content = document.querySelector(".menu-toggle .menu-toggle-content")

let expose_search_button = document.querySelector('.utility-nav-search')
let search_form = document.querySelector('.search-form-desktop')
let search_form_mobile
let search_context_radios = document.querySelectorAll('input[name="search_context"]')

let query = document.querySelector('.q')

let query_temp = document.querySelector('.q_temp')

let this_site_radio = document.getElementById('this-site')

let utility_navigation_wrapper = document.querySelector('.utility-navigation-wrapper')

const navigation_wrapper = document.querySelector('.navigation-wrapper')

let windowWidth
let document_width 

let menu_navigation_duration = "300"

let thing_to_animate = document.querySelector(".navigation-wrapper")


menu_toggle.addEventListener('click', (el)=>{
  el.preventDefault()      
  
  DOMAnimations.slideToggle(thing_to_animate, menu_navigation_duration);
    
  if (el.target.getAttribute('aria-expanded') == 'true') {
    el.target.setAttribute('aria-expanded',false)
    menu_toggle_content.innerHTML = 'Menu'
    navigation_wrapper.classList.toggle('open')
    document.querySelector('body').classList.toggle('mobile-menu-open')
    
    document.querySelector('.mobile-header-title a').setAttribute('tabindex', -1)
    document.querySelector('.umbc-logo-wrapper ').setAttribute('tabindex', 0)

    menu_items_has_children.forEach((menu_item)=>{
      menu_item.classList.remove('menu-hover', 'open')
      menu_item.querySelectorAll('.sub-menu').forEach((mi)=>{
        mi.classList.remove('open')
      })
    })
    
    
  } else {
    el.target.setAttribute('aria-expanded', true)
    menu_toggle_content.innerHTML = 'Close'
    navigation_wrapper.classList.toggle('open')
    document.querySelector('body').classList.toggle('mobile-menu-open')
    document.querySelector('.mobile-header-title a').setAttribute('tabindex', 0)
    document.querySelector('.umbc-logo-wrapper ').setAttribute('tabindex', -1)
  
  }
  
})

menu_items_has_children.forEach((el) => {
  let activatingA = el.querySelector("a");
  let btn = chevron_button(activatingA.text);
  activatingA.insertAdjacentHTML("afterend", btn);
})

let resize_fn = throttle(() => {
  // mobile safari triggers resize events when it doesn't need to, let's check to see if the window is really resized
  if (window.innerWidth != windowWidth) {
        
    document_width = window.innerWidth;
    
    // bigger than medium
    if (document_width > 768) {

      desktop_navigation_enable();
      
    } else {
      // smaller than medium
      mobile_navigation_enable();
    }
    
    windowWidth = window.innerWidth
  }
}, 50);

window.addEventListener("resize", resize_fn);

function desktop_navigation_enable() {
  // 'medium' size
  navigation_wrapper.style.display = "block"

  document.querySelector('body').classList.remove('mobile-menu-open')
  navigation_wrapper.classList.remove('open')
  menu_toggle_content.innerHTML = 'Menu'
  
  menu_items_has_children.forEach((menu_item)=>{
    menu_item.classList.remove('menu-hover', 'open')
    menu_item.querySelectorAll('.sub-menu').forEach((mi)=>{
      mi.classList.remove('open')
    })      
  })
  
  menu_items_has_children.forEach((menu)=>{
    let menu_rect = menu.getBoundingClientRect();
    
    // the menu starts at X, and if you add the offset width, and it's greater than the document width, then it will spill off the side of the menu, causing horizontal scroll. The class "too-wide" makes the menu items go to the right instead.
    
    let menu_item_has_submenus = menu.querySelectorAll(".sub-menu").length > 1;
    
    // get width of the sub-menu with JS instead, but need to add ~ 1rem of slack 
    let sub_menu_width = menu.querySelector('.sub-menu').getBoundingClientRect().width + 16

    let width_of_menu_item = menu_item_has_submenus ? sub_menu_width*2 : sub_menu_width;

    if (menu_rect.x + width_of_menu_item > document_width) {
      menu.classList.add('too-wide')
    } else {
      menu.classList.remove('too-wide')
    }
  })

  top_level_menu_items.forEach((tlmi)=>{
    tlmi.addEventListener('mouseover', (el)=>{
      top_level_menu_items.forEach((open_el) => {
        open_el.classList.add("menu-disable");
        open_el.querySelectorAll("menu-item").forEach((mi)=>{
          mi.classList.remove("menu-hover")
        })
      });
    })
  })
  
  document.querySelectorAll('.top-level > a').forEach((tlmia)=>{
    tlmia.addEventListener('focus', (item)=>{
      whole_menu.classList.add('menu-instant')

      top_level_menu_items.forEach((tlmi)=>{
        tlmi.classList.add('menu-disable')
        tlmi.classList.remove('menu-hover')
        
        tlmi.querySelectorAll("li").forEach((mi)=>{
          mi.classList.remove("menu-hover")
        })
        
        tlmi.querySelectorAll('.sub-menu').forEach((submenu)=>{
          submenu.classList.remove('open')
        })
      })
      item.target.closest('.top-level').classList.remove('menu-disable')
    }, true)
  })
  
  
  document.querySelectorAll('.top-level > button').forEach((button)=>{
    button.addEventListener("click", (event) => {
      whole_menu.classList.add('menu-instant')
      event.preventDefault()
      event.target.closest('.top-level').classList.toggle('menu-hover')
      event.target.closest('.top-level').querySelectorAll('.menu-item').forEach((submenu)=>{
        submenu.classList.remove('menu-hover')
      })
    })
  })
  
  document.querySelectorAll('.sub-menu button').forEach((button)=>{
    button.addEventListener("click", (event) => {
      whole_menu.classList.add('menu-instant')
      event.preventDefault()
      
      if (!event.target.closest('.menu-item').classList.contains("menu-hover")) {
      
        function demo() {
          event.target.closest('.top-level').querySelectorAll('.menu-hover').forEach((mh)=>{
            mh.classList.remove('menu-hover')
          })
          return Promise.resolve("Success"); 
        } 
      
        demo().then(() => { 
          event.target.closest('.menu-item').classList.add('menu-hover')
        }) 
      } else {
        event.target.closest('.menu-item').classList.remove('menu-hover')  
      }
      
    })
  })
  
  menu_items_has_children.forEach((menu_item)=>{        
    menu_item.addEventListener('mouseover',()=>{
      whole_menu.classList.remove('menu-instant')
      menu_item.classList.add('menu-hover')
      menu_item.classList.remove('menu-disable')
      menu_item.classList.remove('menu-item-instant')
    })
    
    menu_item.addEventListener('mouseleave',(item)=>{
      menu_item.classList.remove('menu-hover', 'open')
      
      if(item.relatedTarget) {
        if (item.relatedTarget.closest("li")) {
          if (item.relatedTarget.closest("li").classList.contains("menu-item")) {
            item.target.classList.add("menu-item-instant")
          }
        }
      }

      document.querySelectorAll('.menu-disable').forEach((mi)=>{
        mi.classList.remove('menu-disable')
      })
      menu_item.querySelectorAll('.sub-menu').forEach((mi)=>{
        mi.classList.remove('open')
      })
    })
    
    
    menu_item.querySelector("button").addEventListener("focus", (event) => {
      event.target.closest('.top-level').classList.remove('menu-disable')
    })

  })
}

let touchmoved

function mobile_navigation_enable() {
  navigation_wrapper.style.removeProperty('display')
  
  // if it's a touch based device (phone or tablet)
  if ('ontouchstart' in window) {
            
    menu_items_has_children.forEach((menu_item)=>{

      menu_item.addEventListener("touchend", (event) =>{
        if (event.target.getAttribute('data-clickable') == 'false' && touchmoved == false) {

          whole_menu.classList.add('menu-instant')
          let parent = event.currentTarget.parentNode;
          parent.classList.add("menu-hover");  
          menu_item.classList.add('menu-hover')    
          event.preventDefault()
          event.stopPropagation()
          event.target.setAttribute('data-clickable', 'true')
        }
      });
      
      menu_item.addEventListener("touchmove", (event) => {
        touchmoved = true
      })
      
      menu_item.addEventListener("touchstart", (event) => {
        touchmoved = false
      })
     
    })
    
    document.querySelectorAll('.menu-item-has-children > a').forEach((link)=>{
      link.setAttribute('data-clickable', 'false')
    })
    
  // if it's a regular mouse based thing but small
  } else {
    menu_items_has_children.forEach((menu_item)=>{
      menu_item.querySelector("button").addEventListener("click", (event) => {
        whole_menu.classList.add('menu-instant')
        event.preventDefault();
        let parent = event.currentTarget.parentNode;
        let sub_menu = parent.querySelector(".sub-menu");
        sub_menu.classList.toggle("open");
        parent.classList.toggle("menu-hover");
        
        sub_menu.querySelectorAll('.sub-menu').forEach((sm)=>{
          sm.classList.remove("open");
          sm.parentNode.classList.remove('menu-hover')
        })
      });
      menu_item.addEventListener('mouseover', ()=> {        
        whole_menu.classList.remove('menu-instant')
        menu_item.classList.add('menu-hover')
        menu_item.classList.remove('menu-disable')          
      })
    })
  }
}

let search_context = document.querySelector('input[name="search_context"]:checked').value;

if(search_context_radios){
  search_context_radios.forEach((elem) => {
      elem.addEventListener("change", (event) => {
          search_context = event.target.value;
      });
  });
}

search_form.addEventListener('submit', (e)=>{
  e.preventDefault()
  
  let search_value = query_temp.value
    
  query.value = `${search_value} ${search_context}`
  e.target.submit()
})

document.addEventListener("DOMContentLoaded", () => {
  resize_fn()
});
