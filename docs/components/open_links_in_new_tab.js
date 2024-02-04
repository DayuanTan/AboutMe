// open_links_in_new_tab.js
window.addEventListener('load', function () {
    var allLinks = document.querySelectorAll('a');
    for (var i = 0; i < allLinks.length; i++) {
        if (!allLinks[i].classList.contains('no-new-tab')) {
            allLinks[i].setAttribute('target', '_blank');
        }
    }
});