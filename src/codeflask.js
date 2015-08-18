(function(window) {
    'use strict';

    function initCodeFlask() {
        var CodeFlask = {};

        CodeFlask.run = function(selector, opts) {
            var target = document.querySelectorAll(selector);

            if(target.length > 1) {
                throw 'CodeFlask.js ERROR: run() expects only one element, ' +
                target.length + ' given. Use CodeFlask.runAll() instead.';
            }else {
                CodeFlask.generateDOM(target[0], false, opts);
            }

        }

        CodeFlask.runAll = function(selector, opts) {
            var target = document.querySelectorAll(selector);

            var i;
            for(i=0; i < target.length; i++) {
                CodeFlask.generateDOM(target[i], true, opts);
            }
        }

        CodeFlask.generateDOM = function(target, isMultiple, opts) {
            (opts.language.match(/html|xml|xhtml|svg/)) ? opts.language = 'markup' : null;
            (opts.language.match(/js/)) ? opts.language = 'javascript' : null;
            
            CodeFlask.defaultLanguage = target.dataset.language || opts.language || 'markup';

            var textarea = document.createElement('TEXTAREA'),
                highlightPre = document.createElement('PRE'),
                highlightCode = document.createElement('CODE'),
                lang, initialCode;

            (opts.language.match(/html|xml|xhtml|svg/)) ? opts.language = 'markup' : null;
            (opts.language.match(/js/)) ? opts.language = 'javascript' : null;
            CodeFlask.defaultLanguage = opts.language || 'markup';

            // Prevent this var from being refreshed when rendering multiple
            // instances
            if(!isMultiple) {
                CodeFlask.textarea = textarea;
                CodeFlask.highlightCode = highlightCode;
            }

            lang = target.dataset.language || CodeFlask.defaultLanguage;
            initialCode = target.textContent;

            textarea.classList.add('CodeFlask__textarea');
            highlightPre.classList.add('CodeFlask__pre');
            highlightCode.classList.add('CodeFlask__code');
            highlightCode.classList.add('language-' + lang);

            target.classList.add('CodeFlask');

            // Fixing iOS "drunk-text" issue
            if(/iPad|iPhone|iPod/.test(navigator.platform)) {
                highlightCode.style.paddingLeft = '3px';
            }

            target.innerHTML = '';
            target.appendChild(textarea);
            target.appendChild(highlightPre);
            highlightPre.appendChild(highlightCode);


            // Render initial code inside tag
            textarea.value = initialCode;
            CodeFlask.renderOutput(highlightCode, textarea);

            Prism.highlightAll();

            CodeFlask.handleInput(textarea, highlightCode, highlightPre);
            CodeFlask.handlePreElement(highlightPre);



        }

        CodeFlask.onUpdate = function(cb) {
            if(typeof(cb) == "function") {
                CodeFlask.textarea.addEventListener('input', function(e) {
                    cb(this.value);
                });
            }else{
                throw 'CodeFlask.js ERROR: onUpdate() expects function, ' +
                typeof(cb) + ' given instead.';
            }
        }

        CodeFlask.update = function(string) {
            var evt = document.createEvent("HTMLEvents");

            CodeFlask.textarea.value = string;
            CodeFlask.renderOutput(CodeFlask.highlightCode, CodeFlask.textarea);
            Prism.highlightAll();

            evt.initEvent("input", false, true);
            CodeFlask.textarea.dispatchEvent(evt);
        }

        CodeFlask.renderOutput = function(highlightCode, input) {
            highlightCode.innerHTML = input.value.replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;") + "\n";
        }

        CodeFlask.handleInput = function(textarea, highlightCode, highlightPre) {
            var input, selStartPos, inputVal, roundedScroll;

            textarea.addEventListener('input', function(e) {
                input = this;

                CodeFlask.renderOutput(highlightCode, input);

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

                roundedScroll = Math.floor(this.scrollTop);

                // Fixes issue of desync text on mouse wheel, fuck Firefox.
                if(navigator.userAgent.toLowerCase().indexOf('firefox') < 0) {
                    this.scrollTop = roundedScroll;
                }

                highlightPre.style.top = "-" + roundedScroll + "px";
            });

        }

        CodeFlask.handlePreElement = function(hightlightPre) {

            ['scroll', 'click', 'mouseover', 'wheel'].forEach(function(event){
                hightlightPre.addEventListener(event, function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                });
            });

        }

        return CodeFlask;
    }

    if(typeof(CodeFlask) === 'undefined') {
        window.CodeFlask = initCodeFlask();
    }else{
        console.error('A CodeFlask instance already exists in your page.');
        console.error('Please check for conflicts on your JS libraries.');
    }
})(window);
