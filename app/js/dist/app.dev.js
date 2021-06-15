"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// // Import jQuery module (npm i jquery)
// import $ from 'jquery'
// window.jQuery = $
var $ = {};
window.$ = $; // // Import vendor jQuery plugin example (not module)
// require('~/app/libs/mmenu/dist/mmenu.js')

document.addEventListener('DOMContentLoaded', function () {
  var symbols = [['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'], ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], ['!', '\"', '#', '$', '%', '&', '\'', '\(', '\)', '*', '+', '\,', '-', '\.', ':', ';', '=', '?', '@', '[', '\.', '\]', '\`', '^', '_', '\{', '\|', '\}', '~']];

  $.generator = function (options) {
    var pswInpuy = document.getElementById('psw'),
        slider = document.getElementById('selectorpassword'),
        lengthpsw = document.getElementById('lengthpsw'),
        inputs = document.getElementById('checkboxs').getElementsByTagName('input'),
        inputsBox = document.getElementById('checkboxs'),
        copyPswBtn = document.getElementById('copyPswBtn'),
        badgePower = document.getElementsByClassName('badge-password'),
        password = [];
    var deg = 360;

    Array.prototype.clear = function () {
      this.length = 0;
    };

    var powerPsw = function powerPsw(pwr) {
      if (pwr <= 6) {
        for (var i = 0; i < badgePower.length; i++) {
          badgePower[i].innerHTML = 'VERY WEAK';
          badgePower[i].style.background = '#DE1B1B';
        }
      } else if (pwr > 6 && pwr < 12) {
        for (var _i = 0; _i < badgePower.length; _i++) {
          badgePower[_i].innerHTML = 'WEAK';
          badgePower[_i].style.background = '#E8D423';
        }
      } else if (pwr >= 12 && pwr < 20) {
        for (var _i2 = 0; _i2 < badgePower.length; _i2++) {
          badgePower[_i2].innerHTML = 'GOOD';
          badgePower[_i2].style.background = '#27D16F';
        }
      } else if (pwr > 20) {
        for (var _i3 = 0; _i3 < badgePower.length; _i3++) {
          badgePower[_i3].innerHTML = 'VERY GOOD';
          badgePower[_i3].style.background = '#27D16F';
        }
      }
    }; //////	Show password


    var showPassword = function showPassword(psw) {
      powerPsw(slider.value);
      pswInpuy.textContent = '';
      psw.forEach(function (elem, indx) {
        setTimeout(function () {
          pswInpuy.textContent += elem;
        }, 15 * indx);
      });
    }; //////	 Type password


    var typePassword = function typePassword(arr) {
      var inputs = _toConsumableArray(arr);

      var type = [];
      inputs.forEach(function (input) {
        if (input.checked) {
          type.push.apply(type, _toConsumableArray(symbols[input.getAttribute("data-type")]));
        }
      });
      return type;
    };

    var random = function random(min, max) {
      return Math.round(Math.random() * (min - max) + max);
    }; //////	Create password


    var createPassword = function createPassword(len, symbols) {
      password.clear();

      for (var i = 0; i < len; i++) {
        password.push(symbols["".concat(random(0, symbols.length - 1))]);
      }

      return showPassword(password);
    };

    slider.oninput = function (evt) {
      lengthpsw.innerHTML = this.value;
    };

    slider.addEventListener('change', function () {
      createPassword(this.value, typePassword(inputs));
    }); //////  last input is checked

    var checkeds = function checkeds(inputs) {
      var result = [];
      Array.from(inputs).forEach(function (chck) {
        if (chck.checked) {
          result.push('1');
        }
      });
      return result.length;
    }; //////  inputs event listener


    Array.from(inputs).forEach(function (chck) {
      chck.addEventListener('change', function (e) {
        if (checkeds(_toConsumableArray(inputs)) === 0) {
          return e.target.checked = true;
        }

        createPassword(slider.value, typePassword(inputs));
      });
    });
    var but = document.getElementById('bytton-psw');
    but.addEventListener('click', function (e) {
      var img = but.querySelector('.img');
      img.style.transform = "rotate(".concat(deg, "deg)");
      deg = deg + 360;
      createPassword(slider.value, typePassword(inputs));
    }); ////// Show lable copu

    var lableCopu = function lableCopu() {
      var box = document.getElementById('inputpsw'),
          first = document.getElementById('textpsw'),
          label = document.createElement('div');
      label.innerHTML = 'Copied';
      label.classList.add('copied-password');

      if (document.getElementsByClassName('copied-password').length > 0) {
        return console.log('Copited');
      }

      box.insertBefore(label, first);
      setTimeout(function () {
        label.classList.add('active');
        setTimeout(function () {
          label.classList.add('hide');
          setTimeout(function () {
            box.removeChild(label);
          }, 200);
        }, 1000);
      }, 100);
    }; //////	Copy 


    function copyToClipboard(str) {
      var area = document.createElement('textarea');
      document.body.appendChild(area);
      area.value = str.join('');
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
      lableCopu();
    }

    copyPswBtn.addEventListener('click', function (e) {
      copyToClipboard(password);
      copyPswBtn.classList.add('copu');
      setTimeout(function () {
        copyPswBtn.classList.remove('copu');
      }, 300);
    });

    var init = function init() {
      slider.value = options.val;
      slider.min = options.min;
      slider.max = options.max;
      lengthpsw.innerHTML = options.val;
      createPassword(slider.value, typePassword(inputs));
    };

    init();
  };

  $.generator({
    min: 4,
    max: 80,
    val: 24
  });
});