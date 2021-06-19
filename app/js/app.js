// // Import jQuery module (npm i jquery)
// import $ from 'jquery'
// window.jQuery = $
const $ = {}
window.$ = $

// // Import vendor jQuery plugin example (not module)
// require('~/app/libs/mmenu/dist/mmenu.js')


document.addEventListener('DOMContentLoaded', () => {
    $.generator({
        min: 4,
        max: 80,
        val: 24
    })

})