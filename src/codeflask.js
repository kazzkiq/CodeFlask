(function(window) {
    'use strict';

    function initCodeFlask() {
        var CodeFlask = {};

        CodeFlask.run = function(selector, language) {

            CodeFlask.language = language;

            var target = document.querySelectorAll(selector);

            if(target.length > 1) {
                var i;
                for(i=0; i < target.length; i++) {
                    CodeFlask.generateDOM(target[i]);
                }
            }else {
                CodeFlask.generateDOM(target);
            }

        }

        CodeFlask.generateDOM = function(target) {
            var textarea = document.createElement('TEXTAREA'),
                highlightPre = document.createElement('PRE'),
                highlightCode = document.createElement('CODE');

            textarea.classList.add('CodeFlask__textarea')
            highlightPre.classList.add('CodeFlask__pre');
            highlightCode.classList.add('CodeFlask__code');
            highlightCode.classList.add('language-' + CodeFlask.language);

            target.classList.add('CodeFlask');
            target.innerHTML = '';

            target.appendChild(textarea);
            target.appendChild(highlightPre);
            highlightPre.appendChild(highlightCode);

            CodeFlask.handleInput(textarea, highlightCode, highlightPre);
            CodeFlask.handlePreElement(highlightPre);

        }

        CodeFlask.handleInput = function(textarea, highlightCode, highlightPre) {
            var input, selStartPos, inputVal;

            textarea.addEventListener('input', function(e) {
                input = this;

                // Change content only if not arrows event
                //if(e.keyCode < 37 && e.keyCode > 40) {
                    highlightCode.innerHTML = input.value.replace(/&/g, "&amp;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;") + "\n";
                //}

                Prism.highlightAll();
            });

            textarea.addEventListener('keydown', function(e) {
                input = this,
                selStartPos = input.selectionStart,
                inputVal = input.value;

                // If TAB pressed, insert four spaces
                if(e.keyCode === 9){
                    input.value = inputVal.substring(0, selStartPos) + "    " + inputVal.substring(selStartPos, input.value.length);
                    input.selectionStart = selStartPos + 4;
                    input.selectionEnd = selStartPos + 4;
                    e.preventDefault();

                    highlightCode.innerHTML = input.value.replace(/&/g, "&amp;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;") + "\n";
                    Prism.highlightAll();
                }
            });

            textarea.addEventListener('scroll', function(){
                this.scrollTop = Math.floor(this.scrollTop);
                highlightPre.style.top = "-" + this.scrollTop + "px";
                console.log(highlightPre.style.top);
            });

        }

        CodeFlask.handlePreElement = function(hightlightPre) {
            hightlightPre.addEventListener('scroll', function(e) {
                console.log("Heeeeey! (scroll)");
                e.preventDefault();
                e.stopPropagation();
                return false;
            });

            hightlightPre.addEventListener('click', function(e) {
                console.log("Heeeeey! (click)");
                e.preventDefault();
                e.stopPropagation();
                return false;
            });

            hightlightPre.addEventListener('mouseover', function(e) {
                console.log("Heeeeey! (mouseover)");
                e.preventDefault();
                e.stopPropagation();
                return false;
            });

            hightlightPre.addEventListener('wheel', function(e) {
                console.log("Heeeeey! (wheel)");
                e.preventDefault();
                e.stopPropagation();
                return false;
            });
        }

        return CodeFlask;
    }

    if(typeof(CodeFlask) === 'undefined') {
        window.CodeFlask = initCodeFlask();
    }else{
        console.error('CodeFlask already exists in your page.');
        console.error('Please check for conflicts on your JS libraries.');
    }
})(window);
