(function() {
    const overlay = document.getElementById('moverlay'),
        cMenu = document.getElementById('contentmenu'),
        menu = document.getElementById('menu'),
        butClose = document.getElementById('mclose'),
        html = document.querySelector('html')

    const addClass = function(arr) {
        arr.forEach((i, n) => {
            i.el.classList.add(i.cls)
        })
    }

    const removeClass = function(arr) {
        arr.forEach((i, n) => {
            i.el.classList.remove(i.cls)
        })
    }

    const showMenu = function(ovr, cont) {
        ovr.style.display = 'block'
        setTimeout(() => { addClass([{ el: ovr, cls: 'menu__overlay' }]) }, 10)
        addClass([{
                el: cont,
                cls: 'active'
            },
            {
                el: menu,
                cls: 'open'
            },
            {
                el: html,
                cls: 'scroll-hidden'
            }

        ])
    }

    const closeMenu = function(el) {
        if (el === butClose || el === overlay || el.parentElement === butClose) {
            removeClass([{
                    el: html,
                    cls: 'scroll-hidden'
                },
                {
                    el: overlay,
                    cls: 'menu__overlay'
                },
                {
                    el: cMenu,
                    cls: 'active'
                },
                {
                    el: menu,
                    cls: 'open'
                }
            ])
            setTimeout(() => { overlay.style.display = 'none' }, 250)
        }
        return
    }

    document.getElementById('menu').addEventListener('click', function(e) {
        if (!menu.classList.contains('open')) { return console.log('Menu is open') }
        const target = e.target || e.srcElement
        return closeMenu(target)

    })

    document.getElementById('mopen').addEventListener('click', function() {
        return showMenu(overlay, cMenu)
    })
})()