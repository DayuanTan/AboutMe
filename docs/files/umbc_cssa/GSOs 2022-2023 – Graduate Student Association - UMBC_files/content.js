const section_menu_toggle = document.querySelector(".section-menu-toggle")
let section_navigation_empty_links = document.querySelectorAll(".section-nav-empty-link-heading")
const expanders = document.querySelectorAll('.sights-expander-trigger')
const links_with_images = document.querySelectorAll(".entry-content a img")

if(expanders.length) {
  expanders.forEach((el)=>{
    let target = document.getElementById(el.getAttribute('aria-controls'))

    if (el.getAttribute('aria-expanded') === "true") {
      target.classList.remove('sights-expander-hidden')
    }
    
    function handle_click(el) {
      let self = el.target
      
      let do_event = false
      
      if (el.type === 'keydown') {
        if (el.keyCode === 13 || el.keyCode === 32) {
          do_event = true
        }
      } else if (el.type === 'click') {
        do_event = true
      }

      if (do_event) {
        if (self.getAttribute('aria-expanded') === 'true') {
          self.setAttribute('aria-expanded', false)
          target.classList.add('sights-expander-hidden')
        } else {
          self.setAttribute('aria-expanded', true)
          target.classList.remove('sights-expander-hidden')
        }
      }
    }

    el.addEventListener('click', handle_click)
    el.addEventListener('keydown', handle_click)
  })
}


section_menu_toggle?.addEventListener("click", (el)=>{
  el.target.classList.toggle("shown")
  document.querySelector(".section-menu").classList.toggle("shown")
})


if (section_navigation_empty_links) {
  section_navigation_empty_links.forEach((empty_link)=>{
    let this_id = `${empty_link.getAttribute('id')}`
    let content_string = `${this_id}-content`
    let sibling = empty_link.nextElementSibling

    empty_link.setAttribute("role","button")
    empty_link.setAttribute("tabindex","0")
    
    if (empty_link.closest("li").classList.contains('current-menu-ancestor')) {
      empty_link.setAttribute("aria-expanded", "true")
    } else {
      empty_link.setAttribute("aria-expanded", "false")
    }

    empty_link.setAttribute("aria-controls", content_string)

    sibling.setAttribute("id", content_string)
    sibling.setAttribute("role", "region")
    sibling.setAttribute("aria-labelledby", this_id)

    function handle_click(el) {
      let self = el.target
      
      let do_event = false
      
      if (el.type === 'keydown') {
        if (el.keyCode === 13 || el.keyCode === 32) {
          do_event = true
        }
      } else if (el.type === 'click') {
        do_event = true
      }

      if (do_event) {
        if (self.getAttribute('aria-expanded') === 'true') {
          self.setAttribute('aria-expanded', false)
          sibling.style.display = "none"
        } else {
          self.setAttribute('aria-expanded', true)
          sibling.style.display = "block"
        }
      }
    }

    empty_link.addEventListener('click', handle_click)
    empty_link.addEventListener('keydown', handle_click)
  })
}


links_with_images.forEach((link) => {
  link.closest("a").classList.add("has-image")
})
