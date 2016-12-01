/*
	plugins

	- GroupInputs
	- jquery.caret

*/



/**
* GroupInputs v. 0.7.4
* @author Pavel Kornilov <pk@ostrovok.ru> <lusever@lusever.com>
* https://github.com/lusever/groupinputs
* MIT Licensed
*/
(function($) {

function caret(node, start, end) {
    var range;
    if (start !== undefined) {
        if (node.setSelectionRange) {
            node.setSelectionRange(start, end);
        // IE, "else" for opera 10
        } else if (document.selection && document.selection.createRange) {
            range = node.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    } else {
        start = 0;
        end = 0;
        if ('selectionStart' in node) {
            start = node.selectionStart;
            end = node.selectionEnd;
        } else if (node.createTextRange) {
            range = document.selection.createRange();
            var dup = range.duplicate();

            if (range.parentElement() === node) {
                start = -dup.moveStart('character', -100000);
                end = start + range.text.length;
            }
        }
        return {
            start: start,
            end: end
        };
    }
}

$.fn.groupinputs = function() {
    // iOS does not support input.focus()
    if (/iPad|iPhone/.test(navigator.platform)) {
        return this;
    }

    var inputs = this,
        inputsMaxlength = [],
        totalMaxlength = 0;

    function afterPaste(elem, options) {
        // for example, inputs value before paste: [00|2 ] [33 ], need paste: 1111
        // now state: [001111|2] [33 ]

        var firstValue = elem[0].value,
            caretEnd = caret(elem[0]).end, // in webkit start: 2, end: 6
            left = firstValue.slice(0, caretEnd), // 001111
            right = firstValue.slice(caretEnd), // 2
            rightFreeSpace = options.maxlength - right.length, // 3
            isSetFocus = false,
            buffer, newCaretStart, i;

        for (i = inputs.length - 1; i > options.index; i--) {
            rightFreeSpace += inputsMaxlength[i] - inputs[i].value.length;
        }

        if (left.length > rightFreeSpace) {
            left = left.slice(0, rightFreeSpace); // 001111.slice(0, 5)
            newCaretStart = rightFreeSpace;
        } else {
            newCaretStart = caretEnd;
        }

        if (firstValue.length > options.maxlength) {
            elem[0].value = (left + right).slice(0, options.maxlength); // [0011] [33 ]

            // caret remains on input
            if (newCaretStart <= options.maxlength) {
                caret(elem[0], newCaretStart, newCaretStart);
                isSetFocus = true;
            }

            buffer = (left + right).slice(options.maxlength); // 112

            if (buffer.length) {
                newCaretStart -= Math.min(options.maxlength, left.length);
                var maxlength, valLength;
                while (inputs[++i]) {
                    maxlength = inputsMaxlength[i];
                    buffer += inputs[i].value; // 11233
                    inputs[i].value = buffer.slice(0, maxlength);
                    if (buffer.length <= maxlength) {
                        break;
                    }
                    valLength = inputs[i].value.length;
                    if (!isSetFocus) {
                        if (newCaretStart < maxlength) {
                            isSetFocus = true;
                            inputs.eq(i).focus();
                            caret(inputs[i], newCaretStart, newCaretStart);
                        }
                        newCaretStart -= valLength;
                    }
                    buffer = buffer.slice(maxlength);
                }
            }
            if (!isSetFocus) {
                // setTimeout may be necessary for chrome and safari (https://bugs.webkit.org/show_bug.cgi?id=56271)
                inputs.eq(i).focus();
                caret(inputs[i], newCaretStart, newCaretStart);
            }
        }
    }

    function handler(e) {
        var eventSelector = e.type,
            options = e.data,
            elem = e.data.elem,
            index = options.index,
            caretPos;

        if ($.browser.opera) { // last check 12
            if (eventSelector === 'keypress') {
                eventSelector = 'keydown';
            }
            if (eventSelector === 'input') {
                eventSelector += '.opera';
            }
        }

        switch (e.keyCode) {
            case 8 : eventSelector += '.backspace'; break;
            case 37: eventSelector += '.left'; break;
            case 39: eventSelector += '.right'; break;
            case 46: eventSelector += '.delete'; break;
        }

        switch (eventSelector) {
            case 'keydown.right':
                caretPos = caret(elem[0]);
                if (
                    caretPos.start === this.value.length && // caret is last
                    index !== inputs.length - 1 // input is no last
                ) {
                    inputs.eq(index + 1).focus();
                    caret(inputs[index + 1], 0, 0);
                    e.preventDefault(); // no next motion
                }
                break;
            case 'keydown.backspace':
            case 'keydown.left':
                caretPos = caret(elem[0]);
                if (
                    caretPos.start === caretPos.end &&
                    caretPos.start === 0 && // caret is first
                    index !== 0 // input is no first
                ) {
                    var toFocus = inputs.eq(index - 1),
                        lengthToFocus = toFocus.val().length;
                    toFocus.focus();
                    caret(toFocus[0], lengthToFocus, lengthToFocus);
                    if (eventSelector === 'keydown.left') {
                        e.preventDefault(); // no next motion
                    }
                }
                break;
            case 'keyup':
            case 'keydown': // repeat in FF10, Webkit, IE
            //case 'keypress': // repeat in FF10, Opera 11
                // ignore system key. ex.: shift
                if (e.keyCode < 48) {
                    break;
                }

                caretPos = caret(elem[0]);
                if (
                    caretPos.start === caretPos.end &&
                    caretPos.start === this.value.length && // caret is last
                    index !== inputs.length - 1 && // input is no last
                    this.value.length === options.maxlength
                ) {
                    inputs.eq(index + 1).focus();
                    caret(inputs[index + 1], 0, 0);
                }
                break;
            case 'paste':
                elem.attr('maxlength', totalMaxlength);
                break;
/* case 'keypress':
elem.attr('maxlength', options.maxlength + 1);
break;*/
            case 'propertychange': // IE8
            case 'input': // webkit set cursor position as [00|11112]
                // after paste
                if (elem.attr('maxlength') !== options.maxlength) {
                    // Chrome fix
                    setTimeout(function() {
                        afterPaste(elem, options);
                        elem.attr('maxlength', options.maxlength);
                    }, 0);
                }
                break;
            case 'input.opera':
                afterPaste(elem, options);
                break;
        }
    }

    inputs.each(function(i) {
        var elem = inputs.eq(i),
            maxlength = +elem.attr('maxlength');

        totalMaxlength += maxlength;
        inputsMaxlength.push(maxlength);

        elem.on('keydown keypress keyup input paste propertychange', {
            elem: elem,
            index: i,
            maxlength: maxlength
        }, handler);
    });

    // opera not support paste event
    if ($.browser.opera) {
        inputs.attr('maxlength', totalMaxlength);
    }

    return this;
};

}(jQuery));


/*
 *
 * Copyright (c) 2010 C. F., Wong (<a href="http://cloudgen.w0ng.hk">Cloudgen Examplet Store</a>)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
﻿(function(k,e,i,j){k.fn.caret=function(b,l){var a,c,f=this[0],d=k.browser.msie;if(typeof b==="object"&&typeof b.start==="number"&&typeof b.end==="number"){a=b.start;c=b.end}else if(typeof b==="number"&&typeof l==="number"){a=b;c=l}else if(typeof b==="string")if((a=f.value.indexOf(b))>-1)c=a+b[e];else a=null;else if(Object.prototype.toString.call(b)==="[object RegExp]"){b=b.exec(f.value);if(b!=null){a=b.index;c=a+b[0][e]}}if(typeof a!="undefined"){if(d){d=this[0].createTextRange();d.collapse(true);
d.moveStart("character",a);d.moveEnd("character",c-a);d.select()}else{this[0].selectionStart=a;this[0].selectionEnd=c}this[0].focus();return this}else{if(d){c=document.selection;if(this[0].tagName.toLowerCase()!="textarea"){d=this.val();a=c[i]()[j]();a.moveEnd("character",d[e]);var g=a.text==""?d[e]:d.lastIndexOf(a.text);a=c[i]()[j]();a.moveStart("character",-d[e]);var h=a.text[e]}else{a=c[i]();c=a[j]();c.moveToElementText(this[0]);c.setEndPoint("EndToEnd",a);g=c.text[e]-a.text[e];h=g+a.text[e]}}else{g=
f.selectionStart;h=f.selectionEnd}a=f.value.substring(g,h);return{start:g,end:h,text:a,replace:function(m){return f.value.substring(0,g)+m+f.value.substring(h,f.value[e])}}}}})(jQuery,"length","createRange","duplicate");


