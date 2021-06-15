// // Import jQuery module (npm i jquery)
// import $ from 'jquery'
// window.jQuery = $
const $ = {}
window.$ = $

// // Import vendor jQuery plugin example (not module)
// require('~/app/libs/mmenu/dist/mmenu.js')

document.addEventListener('DOMContentLoaded', () => {

    const symbols = [
        [
            'A', 'B', 'C', 'D', 'E', 'F', 'G',
            'H', 'I', 'J', 'K', 'L', 'M', 'N',
            'O', 'P', 'Q', 'R', 'S', 'T', 'U',
            'V', 'W', 'X', 'Y', 'Z'
        ],

        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
            'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
            'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
            'y', 'z'
        ],

        [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        ],

        [
            '!', '\"', '#', '$', '%', '&', '\'',
            '\(', '\)', '*', '+', '\,', '-', '\.',
            ':', ';', '=', '?', '@', '[', '\.',
            '\]', '\`', '^', '_', '\{', '\|', '\}', '~'
        ]
    ]


    $.generator = function(options) {

        const pswInpuy = document.getElementById('psw'),
            slider = document.getElementById('selectorpassword'),
            lengthpsw = document.getElementById('lengthpsw'),
            inputs = document.getElementById('checkboxs').getElementsByTagName('input'),
            inputsBox = document.getElementById('checkboxs'),
            copyPswBtn = document.getElementById('copyPswBtn'),
            badgePower = document.getElementsByClassName('badge-password'),
            password = []


        let deg = 360



        Array.prototype.clear = function() {
            this.length = 0
        }

        const powerPsw = function(pwr) {
            if (pwr <= 6) {
                for (let i = 0; i < badgePower.length; i++) {
                    badgePower[i].innerHTML = 'VERY WEAK'
                    badgePower[i].style.background = '#DE1B1B'
                }
            } else if (pwr > 6 && pwr < 12) {
                for (let i = 0; i < badgePower.length; i++) {
                    badgePower[i].innerHTML = 'WEAK'
                    badgePower[i].style.background = '#E8D423'
                }
            } else if (pwr >= 12 && pwr < 20) {
                for (let i = 0; i < badgePower.length; i++) {
                    badgePower[i].innerHTML = 'GOOD'
                    badgePower[i].style.background = '#27D16F'
                }
            } else if (pwr > 20) {
                for (let i = 0; i < badgePower.length; i++) {
                    badgePower[i].innerHTML = 'VERY GOOD'
                    badgePower[i].style.background = '#27D16F'
                }
            }
        }

        //////	Show password

        const showPassword = function(psw) {
            powerPsw(slider.value)
            pswInpuy.textContent = ''
            psw.forEach((elem, indx) => {
                setTimeout(() => {
                    pswInpuy.textContent += elem;
                }, 15 * indx)
            })
        }

        //////	 Type password

        const typePassword = function(arr) {
            let inputs = [...arr]
            const type = []
            inputs.forEach(input => {
                if (input.checked) {
                    type.push(...symbols[input.getAttribute("data-type")])
                }
            })
            return type
        }



        const random = (min, max) => Math.round(Math.random() * (min - max) + max)


        //////	Create password

        const createPassword = function(len, symbols) {
            password.clear()
            for (let i = 0; i < len; i++) {
                password.push(symbols[`${random(0, symbols.length-1)}`])
            }
            return showPassword(password)

        }


        slider.oninput = function(evt) { lengthpsw.innerHTML = this.value }

        slider.addEventListener('change', function() { createPassword(this.value, typePassword(inputs)) })


        //////  last input is checked

        const checkeds = function(inputs) {
            let result = []
            Array.from(inputs).forEach(function(chck) {
                if (chck.checked) {
                    result.push('1')
                }
            })
            return result.length
        }


        //////  inputs event listener

        Array.from(inputs).forEach(function(chck) {
            chck.addEventListener('change', function(e) {

                if (checkeds([...inputs]) === 0) {
                    return e.target.checked = true
                }
                createPassword(slider.value, typePassword(inputs))
            })
        })

        const but = document.getElementById('bytton-psw')
        but.addEventListener('click', function(e) {
            let img = but.querySelector('.img')
            img.style.transform = `rotate(${deg}deg)`
            deg = deg + 360
            createPassword(slider.value, typePassword(inputs))
        })

        ////// Show lable copu

        const lableCopu = function() {
            let box = document.getElementById('inputpsw'),
                first = document.getElementById('textpsw'),
                label = document.createElement('div')
            label.innerHTML = 'Copied'
            label.classList.add('copied-password')
            if (document.getElementsByClassName('copied-password').length > 0) {
                return console.log('Copited')
            }
            box.insertBefore(label, first)
            setTimeout(() => {
                label.classList.add('active')
                setTimeout(() => {
                    label.classList.add('hide')
                    setTimeout(() => { box.removeChild(label) }, 200)
                }, 1000)
            }, 100)
        }

        //////	Copy 

        function copyToClipboard(str) {
            const area = document.createElement('textarea')

            document.body.appendChild(area)
            area.value = str.join('')
            area.select()
            document.execCommand("copy")
            document.body.removeChild(area)
            lableCopu()
        }


        copyPswBtn.addEventListener('click', function(e) {
            copyToClipboard(password)
            copyPswBtn.classList.add('copu')
            setTimeout(() => {
                copyPswBtn.classList.remove('copu')
            }, 300)
        })


        const init = () => {
            slider.value = options.val
            slider.min = options.min
            slider.max = options.max
            lengthpsw.innerHTML = options.val
            createPassword(slider.value, typePassword(inputs))
        }
        init()


    }

    $.generator({
        min: 4,
        max: 80,
        val: 24
    })

})