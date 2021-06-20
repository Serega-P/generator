(function() {
    const pswInpuy = document.getElementById('psw'),
        slider = document.getElementById('selectorpassword'),
        lengthpsw = document.getElementById('lengthpsw'),
        inputs = document.getElementById('checkboxs').getElementsByTagName('input'),
        inputsBox = document.getElementById('checkboxs'),
        copyPswBtn = document.getElementById('copyPswBtn'),
        badgePower = document.getElementsByClassName('badge-password'),
        but = document.getElementById('bytton-psw'),
        password = []
    let deg = 360

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
    ];

    Array.prototype.clear = function() {
        this.length = 0
    }

    const methods = {
        init: function(setings) {
            slider.value = setings.val || 21
            slider.min = setings.min || 4
            slider.max = setings.max || 100
            lengthpsw.innerHTML = setings.val || 21
            methods.createPassword(slider.value, methods.typePassword(inputs))
        },

        showPassword: function(psw) {
            pswInpuy.textContent = ''
            psw.forEach((elem, indx) => {
                setTimeout(() => {
                    pswInpuy.textContent += elem;
                }, 15 * indx)
            })
            return methods.powerPsw(psw.length)
        },

        typePassword: function(arr) {
            let inputs = [...arr]
            const type = []
            inputs.forEach(input => {
                if (input.checked) {
                    type.push(...symbols[input.getAttribute("data-type")])
                }
            })
            return type
        },

        random: function(min, max) {
            return Math.round(Math.random() * (min - max) + max)
        },

        createPassword: function(len, symbols) {
            password.clear()
            for (let i = 0; i < len; i++) {
                password.push(symbols[`${methods.random(0, symbols.length-1)}`])
            }
            return methods.showPassword(password)
        },

        checkeds: function(inputs) {
            let result = []
            Array.from(inputs).forEach(function(chck) {
                if (chck.checked) {
                    result.push('1')
                }
            })
            return result.length
        },

        lableCopu: function() {
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
        },

        copyToClipboard: function(str) {
            const area = document.createElement('textarea')

            document.body.appendChild(area)
            area.value = str.join('')
            area.select()
            document.execCommand("copy")
            document.body.removeChild(area)
            methods.lableCopu()
        },

        powerPsw: function(pwr) {

            for (let i = 0; i < badgePower.length; i++) {
                if (window.getComputedStyle(badgePower[i]).display !== 'none') {
                    if (pwr <= 6) {
                        return (
                            badgePower[i].innerHTML = 'VERY WEAK',
                            badgePower[i].style.background = '#DE1B1B'
                        )
                    } else if (pwr > 6 && pwr <= 12) {
                        return (
                            badgePower[i].innerHTML = 'WEAK',
                            badgePower[i].style.background = '#E8D423'
                        )
                    } else if (pwr > 12 && pwr <= 20) {
                        return (
                            badgePower[i].innerHTML = 'GOOD',
                            badgePower[i].style.background = '#27D16F'
                        )
                    } else if (pwr > 20) {
                        return (
                            badgePower[i].innerHTML = 'VERY GOOD',
                            badgePower[i].style.background = '#27D16F'
                        )
                    }
                }
            }
        }

    }

    slider.oninput = function(evt) {
        lengthpsw.innerHTML = this.value
        methods.powerPsw(this.value)
    }
    slider.addEventListener('change', function() { methods.createPassword(this.value, methods.typePassword(inputs)) })

    Array.from(inputs).forEach(function(chck) {
        chck.addEventListener('change', function(e) {

            if (methods.checkeds([...inputs]) === 0) {
                return e.target.checked = true
            }
            methods.createPassword(slider.value, methods.typePassword(inputs))
        })
    })

    but.addEventListener('click', function(e) {
        let img = but.querySelector('.img')
        img.style.transform = `rotate(${deg}deg)`
        deg = deg + 360
        methods.createPassword(slider.value, methods.typePassword(inputs))
    })

    copyPswBtn.addEventListener('click', function(e) {
        methods.copyToClipboard(password)
        copyPswBtn.classList.add('copu')
        setTimeout(() => {
            copyPswBtn.classList.remove('copu')
        }, 300)
    })


    $.generator = function(options) {

        const setings = Object.assign({}, options)
        return methods.init(setings)
    }
})()