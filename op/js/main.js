!function e(t, i, s) {
    function n(a, o) {
        if (!i[a]) {
            if (!t[a]) {
                var l = "function" == typeof require && require;
                if (!o && l)
                    return l(a, !0);
                if (r)
                    return r(a, !0);
                var c = new Error("Cannot find module '" + a + "'");
                throw c.code = "MODULE_NOT_FOUND",
                c
            }
            var h = i[a] = {
                exports: {}
            };
            t[a][0].call(h.exports, (function (e) {
                return n(t[a][1][e] || e)
            }
            ), h, h.exports, e, t, i, s)
        }
        return i[a].exports
    }
    for (var r = "function" == typeof require && require, a = 0; a < s.length; a++)
        n(s[a]);
    return n
}({
    1: [function (e, t, i) {
        "use strict";
        var s = e(5)
            , n = e(6)
            , r = e(10)
            , a = e(8)
            , o = e(34).EventEmitterMicro
            , l = o.prototype
            , c = e(12)
            , h = e(14)
            , d = [c.BUSY, c.CHECKED, c.DISABLED, c.EXPANDED, c.HIDDEN, c.INVALID, c.PRESSED, c.SELECTED]
            , u = function (e, t) {
                o.call(this),
                    this._options = t || {},
                    this._selector = t.selector || ".navitem",
                    this._allowMultiSelection = t.multiSelection || !1;
                var i = d.indexOf(t.state) > -1 ? t.state : c.SELECTED;
                this.el = e,
                    this._navItems = e.querySelectorAll(this._selector),
                    this._navItems = Array.prototype.slice.call(this._navItems),
                    this._state = i,
                    this._navKeys = {},
                    this.selectOption = this.selectOption.bind(this),
                    this._handleKeyDown = this._handleKeyDown.bind(this),
                    this._setup()
            };
        u.ONSELECT = "onSelect",
            u.ONFOCUS = "onFocus";
        var m = u.prototype = Object.create(l);
        m._setup = function () {
            for (var e = [h.ARROW_DOWN, h.ARROW_RIGHT], t = [h.ARROW_UP, h.ARROW_LEFT], i = [h.ENTER, h.SPACEBAR], s = 0; s < e.length; s++)
                this.addNavkey(e[s], this._arrowDown.bind(this, !0)),
                    this.addNavkey(t[s], this._arrowDown.bind(this, null)),
                    this.addNavkey(i[s], this.selectOption);
            this._setupNavItems()
        }
            ,
            m._setupNavItems = function () {
                if (this._navItems.length) {
                    for (var e = 0; e < this._navItems.length; e++)
                        this._setTabbingByIndex(e);
                    void 0 !== this.focusedNavItemIndex && void 0 !== this.selectedNavitemIndex || this.setSelectedItemByIndex(0, !0)
                }
            }
            ,
            m._setTabbingByIndex = function (e) {
                var t = this._navItems[e];
                a(t.getAttribute(this._state)) && (this.focusedNavItemIndex = e,
                    this.selectedNavitemIndex = e),
                    a(t.getAttribute(c.DISABLED)) ? s(t) : n(t)
            }
            ,
            m.start = function () {
                this._navItems.length < 1 || (this.el.addEventListener("keydown", this._handleKeyDown),
                    this.el.addEventListener("click", this.selectOption))
            }
            ,
            m.stop = function () {
                this.el.removeEventListener("keydown", this._handleKeyDown),
                    this.el.removeEventListener("click", this.selectOption)
            }
            ,
            m._handleKeyDown = function (e) {
                if (e.ctrlKey || e.altKey || e.metaKey)
                    return !0;
                this._navKeys[e.keyCode] && this._navKeys[e.keyCode](e)
            }
            ,
            m._arrowDown = function (e, t, i) {
                t.preventDefault(),
                    this.previousNavItemIndex = this.focusedNavItemIndex,
                    this.focusedNavItemIndex = this._calculateIndex(e, this.focusedNavItemIndex),
                    this._navItems[this.focusedNavItemIndex].focus(),
                    i || this.trigger(u.ONFOCUS, {
                        event: t,
                        index: this.focusedNavItemIndex,
                        el: this._navItems[this.focusedNavItemIndex]
                    })
            }
            ,
            m.selectOption = function (e, t) {
                e.preventDefault();
                var i = this._navItems.indexOf(document.activeElement);
                i > -1 && document.activeElement !== this._navItems[this.focusedNavItemIndex] && (this.focusedNavItemIndex = i),
                    this._allowMultiSelection ? this._toggleState() : (r(this._navItems[this.selectedNavitemIndex], this._state, "false"),
                        r(this._navItems[this.focusedNavItemIndex], this._state, "true")),
                    this.selectedNavitemIndex = this.focusedNavItemIndex,
                    t || this.trigger(u.ONSELECT, {
                        event: e,
                        index: this.selectedNavitemIndex,
                        el: this._navItems[this.selectedNavitemIndex]
                    })
            }
            ,
            m._toggleState = function () {
                var e = this._navItems[this.focusedNavItemIndex].getAttribute(this._state);
                a(e) ? r(this._navItems[this.focusedNavItemIndex], this._state, "false") : r(this._navItems[this.focusedNavItemIndex], this._state, "true")
            }
            ,
            m._calculateIndex = function (e, t) {
                var i = t;
                if (!0 === e) {
                    if (i = ++i >= this._navItems.length ? 0 : i,
                        !a(this._navItems[i].getAttribute(c.DISABLED)) || this._navItems[i].hasAttribute("disabled"))
                        return i
                } else if (i = --i < 0 ? this._navItems.length - 1 : i,
                    !a(this._navItems[i].getAttribute(c.DISABLED)) || this._navItems[i].hasAttribute("disabled"))
                    return i;
                return this._calculateIndex(e, i)
            }
            ,
            m.updateNavItems = function () {
                var e = this.el.querySelectorAll(this._selector);
                this._navItems = Array.prototype.slice.call(e)
            }
            ,
            m.addNavItem = function (e) {
                e && e.nodeType && this._navItems.indexOf(e) < 0 && (a(e.getAttribute(c.DISABLED)) || n(e),
                    this._navItems.push(e))
            }
            ,
            m.setSelectedItemByIndex = function (e, t) {
                this._allowMultiSelection || isNaN(this.selectedNavitemIndex) || r(this._navItems[this.selectedNavitemIndex], this._state, "false"),
                    this.focusedNavItemIndex = e,
                    this.selectedNavitemIndex = e,
                    r(this._navItems[this.selectedNavitemIndex], this._state, "true"),
                    t || this.trigger(u.ONSELECT, {
                        event: null,
                        index: this.focusedNavItemIndex,
                        el: this._navItems[this.focusedNavItemIndex]
                    })
            }
            ,
            m.getSelectedItem = function () {
                return this._navItems[this.selectedNavitemIndex]
            }
            ,
            m.getFocusedItem = function (e) {
                return this._navItems[this.focusedNavItemIndex]
            }
            ,
            m.addNavkey = function (e, t) {
                "function" == typeof t && "number" == typeof e ? this._navKeys[e] = t : console.warn("incorrect types arguments were passed")
            }
            ,
            m.removeNavkey = function (e) {
                delete this._navKeys[e]
            }
            ,
            m.destroy = function () {
                for (var e in l.destroy.call(this),
                    this.stop(),
                    this.el = null,
                    this._options = null,
                    this._selector = null,
                    this.focusedNavItemIndex = null,
                    this.selectedNavitemIndex = null,
                    this._navItems = null,
                    this._state = null,
                    this.selectOption = null,
                    this._handleKeyDown = null,
                    this._navKeys)
                    this._navKeys.hasOwnProperty(e) && this.removeNavkey(e);
                this._navKeys = null
            }
            ,
            t.exports = u
    }
        , {
        10: 10,
        12: 12,
        14: 14,
        34: 34,
        5: 5,
        6: 6,
        8: 8
    }],
    2: [function (e, t, i) {
        "use strict";
        var s = e(12)
            , n = e(15)
            , r = e(6)
            , a = e(5)
            , o = e(10)
            , l = e(8)
            , c = e(1)
            , h = c.prototype
            , d = function (e, t) {
                t = t || {},
                    c.call(this, e, {
                        selector: t.selector || "*[role=" + n.OPTION + "]",
                        state: t.state || s.SELECTED
                    })
            }
            , u = d.prototype = Object.create(h);
        u._setTabbingByIndex = function (e) {
            var t = this._navItems[e];
            l(t.getAttribute(this._state)) ? (this.focusedNavItemIndex = e,
                this.selectedNavitemIndex = e,
                this._enableElement(t)) : this._disableElement(t)
        }
            ,
            u.setSelectedItemByIndex = function (e, t) {
                isNaN(this.selectedNavitemIndex) || this._disableElement(this._navItems[this.selectedNavitemIndex]),
                    h.setSelectedItemByIndex.call(this, e, t),
                    this._enableElement(this._navItems[this.selectedNavitemIndex])
            }
            ,
            u.addNavItem = function (e) {
                e && e.nodeType && this._navItems.indexOf(e) < 0 && (l(e.getAttribute(s.DISABLED)) || this._disableElement(e),
                    this._navItems.push(e))
            }
            ,
            u._arrowDown = function (e, t) {
                h._arrowDown.call(this, e, t, !0),
                    this.selectOption(t)
            }
            ,
            u._enableElement = function (e) {
                r(e),
                    o(e, this._state, "true")
            }
            ,
            u._disableElement = function (e) {
                a(e),
                    o(e, this._state, "false")
            }
            ,
            u.selectOption = function (e) {
                a(this._navItems[this.selectedNavitemIndex]),
                    h.selectOption.call(this, e),
                    r(this._navItems[this.focusedNavItemIndex])
            }
            ,
            t.exports = d
    }
        , {
        1: 1,
        10: 10,
        12: 12,
        15: 15,
        5: 5,
        6: 6,
        8: 8
    }],
    3: [function (e, t, i) {
        "use strict";
        function s() {
            this._createElemnts(),
                this._bindEvents()
        }
        var n = s.prototype;
        n._bindEvents = function () {
            this._onResize = this._resize.bind(this)
        }
            ,
            n._createElemnts = function () {
                this.span = document.createElement("span");
                var e = this.span.style;
                e.visibility = "hidden",
                    e.position = "absolute",
                    e.top = "0",
                    e.bottom = "0",
                    e.zIndex = "-1",
                    this.span.innerHTML = "&nbsp;",
                    this.iframe = document.createElement("iframe");
                var t = this.iframe.style;
                t.position = "absolute",
                    t.top = "0",
                    t.left = "0",
                    t.width = "100%",
                    t.height = "100%",
                    this.span.appendChild(this.iframe),
                    document.body.appendChild(this.span)
            }
            ,
            n.detect = function (e) {
                this.originalSize = e || 17,
                    this.currentSize = parseFloat(window.getComputedStyle(this.span)["font-size"]),
                    this.currentSize > this.originalSize && this._onResize(),
                    this.isDetecting || (this.iframe.contentWindow.addEventListener("resize", this._onResize),
                        this.isDetecting = !0)
            }
            ,
            n._resize = function (e) {
                this.currentSize = parseFloat(window.getComputedStyle(this.span)["font-size"]),
                    this.originalSize < this.currentSize ? document.documentElement.classList.add("text-zoom") : document.documentElement.classList.remove("text-zoom"),
                    window.dispatchEvent(new Event("resize"))
            }
            ,
            n.remove = function () {
                this.isDetecting && (this.iframe.contentWindow.removeEventListener("resize", this._onResize),
                    this.isDetecting = !1)
            }
            ,
            n.destroy = function () {
                this.remove(),
                    this.span && this.span.parentElement && this.span.parentElement.removeChild(this.span),
                    this.span = null,
                    this.iframe = null
            }
            ,
            t.exports = new s
    }
        , {}],
    4: [function (e, t, i) {
        "use strict";
        var s = e(13)
            , n = function () {
                this.focusableSelectors = s.join(",")
            }
            , r = n.prototype;
        r.isFocusableElement = function (e, t, i) {
            if (t && !this._isDisplayed(e))
                return !1;
            var n = e.nodeName.toLowerCase()
                , r = s.indexOf(n) > -1;
            return "a" === n || (r ? !e.disabled : !e.contentEditable || (i = i || parseFloat(e.getAttribute("tabindex")),
                !isNaN(i)))
        }
            ,
            r.isTabbableElement = function (e, t) {
                if (t && !this._isDisplayed(e))
                    return !1;
                var i = e.getAttribute("tabindex");
                return i = parseFloat(i),
                    isNaN(i) ? this.isFocusableElement(e, t, i) : i >= 0
            }
            ,
            r._isDisplayed = function (e) {
                var t = e.getBoundingClientRect();
                return (0 !== t.top || 0 !== t.left || 0 !== t.width || 0 !== t.height) && "hidden" !== window.getComputedStyle(e).visibility
            }
            ,
            r.getTabbableElements = function (e, t) {
                for (var i = e.querySelectorAll(this.focusableSelectors), s = i.length, n = [], r = 0; r < s; r++)
                    this.isTabbableElement(i[r], t) && n.push(i[r]);
                return n
            }
            ,
            r.getFocusableElements = function (e, t) {
                for (var i = e.querySelectorAll(this.focusableSelectors), s = i.length, n = [], r = 0; r < s; r++)
                    this.isFocusableElement(i[r], t) && n.push(i[r]);
                return n
            }
            ,
            t.exports = new n
    }
        , {
        13: 13
    }],
    5: [function (e, t, i) {
        "use strict";
        var s = e(10);
        t.exports = function (e) {
            s(e, "tabindex", "-1")
        }
    }
        , {
        10: 10
    }],
    6: [function (e, t, i) {
        "use strict";
        var s = e(10)
            , n = e(4);
        t.exports = function (e) {
            var t = [].concat(e);
            (t = t.filter((function (e) {
                return !n.isTabbableElement(e)
            }
            ))).length > 0 && s(t, "tabindex", 0)
        }
    }
        , {
        10: 10,
        4: 4
    }],
    7: [function (e, t, i) {
        "use strict";
        var s = e(10)
            , n = e(12)
            , r = e(4)
            , a = function (e, t) {
                var i = e.getAttribute("data-original-" + t);
                i || (i = e.getAttribute(t) || "",
                    s(e, "data-original-" + t, i))
            };
        t.exports = function (e, t) {
            if (r.isFocusableElement(e, t))
                a(e, "tabindex"),
                    s(e, "tabindex", -1);
            else
                for (var i = r.getTabbableElements(e, t), o = i.length; o--;)
                    a(i[o], "tabindex"),
                        s(i[o], "tabindex", -1);
            a(e, n.HIDDEN),
                s(e, n.HIDDEN, !0)
        }
    }
        , {
        10: 10,
        12: 12,
        4: 4
    }],
    8: [function (e, t, i) {
        "use strict";
        t.exports = function (e) {
            return "string" == typeof e ? "true" === (e = e.toLowerCase()) : e
        }
    }
        , {}],
    9: [function (e, t, i) {
        "use strict";
        var s = function (e, t) {
            if ("string" == typeof t)
                for (var i = t.split(/\s+/), s = 0; s < i.length; s++)
                    e.getAttribute(i[s]) && e.removeAttribute(i[s])
        };
        t.exports = function (e, t) {
            if (e.length)
                for (var i = 0; i < e.length; i++)
                    s(e[i], t);
            else
                s(e, t)
        }
    }
        , {}],
    10: [function (e, t, i) {
        "use strict";
        var s = function (e, t, i) {
            e && 1 === e.nodeType && e.setAttribute(t, i)
        };
        t.exports = function (e, t, i) {
            if ("string" != typeof i && (i = i.toString()),
                e)
                if (e.length)
                    for (var n = 0; n < e.length; n++)
                        s(e[n], t, i);
                else
                    s(e, t, i)
        }
    }
        , {}],
    11: [function (e, t, i) {
        "use strict";
        var s = e(9)
            , n = e(10)
            , r = e(12)
            , a = "data-original-"
            , o = function (e, t) {
                var i = e.getAttribute(a + t);
                "string" == typeof i && (i.length ? n(e, t, i) : s(e, t),
                    s(e, a + t))
            };
        t.exports = function (e) {
            s(e, "tabindex " + r.HIDDEN),
                o(e, "tabindex"),
                o(e, r.HIDDEN);
            for (var t = e.querySelectorAll("[" + a + "tabindex]"), i = t.length; i--;)
                o(t[i], "tabindex")
        }
    }
        , {
        10: 10,
        12: 12,
        9: 9
    }],
    12: [function (e, t, i) {
        "use strict";
        t.exports = {
            AUTOCOMPLETE: "aria-autocomplete",
            CHECKED: "aria-checked",
            DISABLED: "aria-disabled",
            EXPANDED: "aria-expanded",
            HASPOPUP: "aria-haspopup",
            HIDDEN: "aria-hidden",
            INVALID: "aria-invalid",
            LABEL: "aria-label",
            LEVEL: "aria-level",
            MULTILINE: "aria-multiline",
            MULTISELECTABLE: "aria-multiselectable",
            ORIENTATION: "aria-orientation",
            PRESSED: "aria-pressed",
            READONLY: "aria-readonly",
            REQUIRED: "aria-required",
            SELECTED: "aria-selected",
            SORT: "aria-sort",
            VALUEMAX: "aria-valuemax",
            VALUEMIN: "aria-valuemin",
            VALUENOW: "aria-valuenow",
            VALUETEXT: "aria-valuetext",
            ATOMIC: "aria-atomic",
            BUSY: "aria-busy",
            LIVE: "aria-live",
            RELEVANT: "aria-relevant",
            DROPEFFECT: "aria-dropeffect",
            GRABBED: "aria-grabbed",
            ACTIVEDESCENDANT: "aria-activedescendant",
            CONTROLS: "aria-controls",
            DESCRIBEDBY: "aria-describedby",
            FLOWTO: "aria-flowto",
            LABELLEDBY: "aria-labelledby",
            OWNS: "aria-owns",
            POSINSET: "aria-posinset",
            SETSIZE: "aria-setsize"
        }
    }
        , {}],
    13: [function (e, t, i) {
        "use strict";
        t.exports = ["input", "select", "textarea", "button", "optgroup", "option", "menuitem", "fieldset", "object", "a[href]", "*[tabindex]", "*[contenteditable]"]
    }
        , {}],
    14: [function (e, t, i) {
        "use strict";
        t.exports = e(46)
    }
        , {
        46: 46
    }],
    15: [function (e, t, i) {
        "use strict";
        t.exports = {
            ALERT: "alert",
            ALERTDIALOG: "alertdialog",
            BUTTON: "button",
            CHECKBOX: "checkbox",
            DIALOG: "dialog",
            GRIDCELL: "gridcell",
            LINK: "link",
            LOG: "log",
            MARQUEE: "marquee",
            MENUITEM: "menuitem",
            MENUITEMCHECKBOX: "menuitemcheckbox",
            MENUITEMRADIO: "menuitemradio",
            OPTION: "option",
            PROGRESSBAR: "progressbar",
            RADIO: "radio",
            SCROLLBAR: "scrollbar",
            SLIDER: "slider",
            SPINBUTTON: "spinbutton",
            STATUS: "status",
            SWITCH: "switch",
            TAB: "tab",
            TABPANEL: "tabpanel",
            TEXTBOX: "textbox",
            TIMER: "timer",
            TOOLTIP: "tooltip",
            TREEITEM: "treeitem",
            COMBOBOX: "combobox",
            GRID: "grid",
            LISTBOX: "listbox",
            MENU: "menu",
            MENUBAR: "menubar",
            RADIOGROUP: "radiogroup",
            TABLIST: "tablist",
            TREE: "tree",
            TREEGRID: "treegrid",
            ARTICLE: "article",
            COLUMNHEADER: "columnheader",
            DEFINITION: "definition",
            DIRECTORY: "directory",
            DOCUMENT: "document",
            GROUP: "group",
            HEADING: "heading",
            IMG: "img",
            LIST: "list",
            LISTITEM: "listitem",
            MATH: "math",
            NOTE: "note",
            PRESENTATION: "presentation",
            REGION: "region",
            ROW: "row",
            ROWGROUP: "rowgroup",
            ROWHEADER: "rowheader",
            SEPARATOR: "separator",
            TOOLBAR: "toolbar",
            APPLICATION: "application",
            BANNER: "banner",
            COMPLEMENTARY: "complementary",
            CONTENTINFO: "contentinfo",
            FORM: "form",
            MAIN: "main",
            NAVIGATION: "navigation",
            SEARCH: "search"
        }
    }
        , {}],
    16: [function (e, t, i) {
        "use strict";
        var s = !1
            , n = {};
        "undefined" != typeof window && (n = window || self);
        try {
            s = !!n.localStorage.getItem("f7c9180f-5c45-47b4-8de4-428015f096c0")
        } catch (e) { }
        t.exports = s
    }
        , {}],
    17: [function (e, t, i) {
        "use strict";
        var s = e(16);
        t.exports = function (e) {
            return function () {
                if (s && "object" == typeof window.console && "function" == typeof console[e])
                    return console[e].apply(console, Array.prototype.slice.call(arguments, 0))
            }
        }
    }
        , {
        16: 16
    }],
    18: [function (e, t, i) {
        "use strict";
        t.exports = e(17)("log")
    }
        , {
        17: 17
    }],
    19: [function (e, t, i) {
        "use strict";
        t.exports = e(17)("warn")
    }
        , {
        17: 17
    }],
    20: [function (e, t, i) {
        "use strict";
        t.exports = function (e, t) {
            var i;
            return t ? {
                width: (i = e.getBoundingClientRect()).width,
                height: i.height
            } : {
                width: e.offsetWidth,
                height: e.offsetHeight
            }
        }
    }
        , {}],
    21: [function (e, t, i) {
        "use strict";
        var s = e(20)
            , n = e(22)
            , r = e(23);
        t.exports = function (e, t) {
            var i, a, o, l;
            if (t)
                return i = e.getBoundingClientRect(),
                    a = n(),
                    o = r(),
                {
                    top: i.top + o,
                    right: i.right + a,
                    bottom: i.bottom + o,
                    left: i.left + a
                };
            for (l = s(e, t),
                i = {
                    top: e.offsetTop,
                    left: e.offsetLeft,
                    width: l.width,
                    height: l.height
                }; e = e.offsetParent;)
                i.top += e.offsetTop,
                    i.left += e.offsetLeft;
            return {
                top: i.top,
                right: i.left + i.width,
                bottom: i.top + i.height,
                left: i.left
            }
        }
    }
        , {
        20: 20,
        22: 22,
        23: 23
    }],
    22: [function (e, t, i) {
        "use strict";
        t.exports = function (e) {
            return (e = e || window) === window ? window.scrollX || window.pageXOffset : e.scrollLeft
        }
    }
        , {}],
    23: [function (e, t, i) {
        "use strict";
        t.exports = function (e) {
            return (e = e || window) === window ? window.scrollY || window.pageYOffset : e.scrollTop
        }
    }
        , {}],
    24: [function (e, t, i) {
        "use strict";
        t.exports = 1
    }
        , {}],
    25: [function (e, t, i) {
        "use strict";
        var s = e(27);
        t.exports = function (e, t) {
            return !!s(e) && ("number" == typeof t ? e.nodeType === t : -1 !== t.indexOf(e.nodeType))
        }
    }
        , {
        27: 27
    }],
    26: [function (e, t, i) {
        "use strict";
        var s = e(25)
            , n = e(24);
        t.exports = function (e) {
            return s(e, n)
        }
    }
        , {
        24: 24,
        25: 25
    }],
    27: [function (e, t, i) {
        "use strict";
        t.exports = function (e) {
            return !(!e || !e.nodeType)
        }
    }
        , {}],
    28: [function (e, t, i) {
        "use strict";
        var s = /^\[object (HTMLCollection|NodeList|Object)\]$/;
        t.exports = function (e) {
            return !!e && ("number" == typeof e.length && (!!("object" != typeof e[0] || e[0] && e[0].nodeType) && s.test(Object.prototype.toString.call(e))))
        }
    }
        , {}],
    29: [function (e, t, i) {
        "use strict";
        var s = e(30);
        t.exports = new s,
            t.exports.ElementEngagement = s
    }
        , {
        30: 30
    }],
    30: [function (e, t, i) {
        "use strict";
        var s, n = e(34).EventEmitterMicro, r = {
            defaults: e(85),
            extend: e(86)
        }, a = e(31).ElementTracker, o = {
            timeToEngage: 500,
            inViewThreshold: .75,
            stopOnEngaged: !0
        }, l = {
            thresholdEnterTime: 0,
            thresholdExitTime: 0,
            inThreshold: !1,
            engaged: !1,
            tracking: !0
        }, c = function (e) {
            a.call(this, null, e),
                n.call(this),
                this._thresholdEnter = this._thresholdEnter.bind(this),
                this._thresholdExit = this._thresholdExit.bind(this),
                this._enterView = this._enterView.bind(this),
                this._exitView = this._exitView.bind(this)
        };
        s = c.prototype = Object.create(a.prototype),
            (s = r.extend(s, n.prototype))._decorateTrackedElement = function (e, t) {
                var i;
                i = r.defaults(o, t || {}),
                    r.extend(e, i),
                    r.extend(e, l)
            }
            ,
            s._attachElementListeners = function (e) {
                e.on("thresholdenter", this._thresholdEnter, this),
                    e.on("thresholdexit", this._thresholdExit, this),
                    e.on("enterview", this._enterView, this),
                    e.on("exitview", this._exitView, this)
            }
            ,
            s._removeElementListeners = function (e) {
                e.off("thresholdenter", this._thresholdEnter),
                    e.off("thresholdexit", this._thresholdExit),
                    e.off("enterview", this._enterView),
                    e.off("exitview", this._exitView)
            }
            ,
            s._attachAllElementListeners = function () {
                this.elements.forEach((function (e) {
                    e.stopOnEngaged && e.engaged || this._attachElementListeners(e)
                }
                ), this)
            }
            ,
            s._removeAllElementListeners = function () {
                this.elements.forEach((function (e) {
                    this._removeElementListeners(e)
                }
                ), this)
            }
            ,
            s._elementInViewPastThreshold = function (e) {
                return e.pixelsInView === this._windowHeight || e.percentInView > e.inViewThreshold
            }
            ,
            s._ifInView = function (e, t) {
                var i = e.inThreshold;
                a.prototype._ifInView.apply(this, arguments),
                    !i && this._elementInViewPastThreshold(e) && (e.inThreshold = !0,
                        e.trigger("thresholdenter", e),
                        "number" == typeof e.timeToEngage && e.timeToEngage >= 0 && (e.engagedTimeout = window.setTimeout(this._engaged.bind(this, e), e.timeToEngage)))
            }
            ,
            s._ifAlreadyInView = function (e) {
                var t = e.inThreshold;
                a.prototype._ifAlreadyInView.apply(this, arguments),
                    t && !this._elementInViewPastThreshold(e) && (e.inThreshold = !1,
                        e.trigger("thresholdexit", e),
                        e.engagedTimeout && (window.clearTimeout(e.engagedTimeout),
                            e.engagedTimeout = null))
            }
            ,
            s._engaged = function (e) {
                e.engagedTimeout = null,
                    this._elementEngaged(e),
                    e.trigger("engaged", e),
                    this.trigger("engaged", e)
            }
            ,
            s._thresholdEnter = function (e) {
                e.thresholdEnterTime = Date.now(),
                    e.thresholdExitTime = 0,
                    this.trigger("thresholdenter", e)
            }
            ,
            s._thresholdExit = function (e) {
                e.thresholdExitTime = Date.now(),
                    this.trigger("thresholdexit", e)
            }
            ,
            s._enterView = function (e) {
                this.trigger("enterview", e)
            }
            ,
            s._exitView = function (e) {
                this.trigger("exitview", e)
            }
            ,
            s._elementEngaged = function (e) {
                e.engaged = !0,
                    e.stopOnEngaged && this.stop(e)
            }
            ,
            s.stop = function (e) {
                this.tracking && !e && (this._removeAllElementListeners(),
                    a.prototype.stop.call(this)),
                    e && e.tracking && (e.tracking = !1,
                        this._removeElementListeners(e),
                        this.removeElement(e))
            }
            ,
            s.start = function (e) {
                e || this._attachAllElementListeners(),
                    e && !e.tracking && (e.stopOnEngaged && e.engaged || (e.tracking = !0,
                        this._attachElementListeners(e))),
                    this.tracking ? (this.refreshAllElementMetrics(),
                        this.refreshAllElementStates()) : a.prototype.start.call(this)
            }
            ,
            s.addElement = function (e, t) {
                t = t || {};
                var i = a.prototype.addElement.call(this, e, t.useRenderedPosition);
                return this._decorateTrackedElement(i, t),
                    i
            }
            ,
            s.addElements = function (e, t) {
                [].forEach.call(e, (function (e) {
                    this.addElement(e, t)
                }
                ), this)
            }
            ,
            t.exports = c
    }
        , {
        31: 31,
        34: 34,
        85: 85,
        86: 86
    }],
    31: [function (e, t, i) {
        "use strict";
        var s = e(32)
            , n = e(33);
        t.exports = new s,
            t.exports.ElementTracker = s,
            t.exports.TrackedElement = n
    }
        , {
        32: 32,
        33: 33
    }],
    32: [function (e, t, i) {
        "use strict";
        var s = {
            isNodeList: e(28),
            isElement: e(26)
        }
            , n = {
                getDimensions: e(20),
                getPagePosition: e(21),
                getScrollY: e(23)
            }
            , r = {
                clone: e(84),
                extend: e(86)
            }
            , a = e(33)
            , o = {
                autoStart: !1,
                useRenderedPosition: !1
            };
        function l(e, t) {
            this.options = r.clone(o),
                this.options = "object" == typeof t ? r.extend(this.options, t) : this.options,
                this._scrollY = this._getScrollY(),
                this._windowHeight = this._getWindowHeight(),
                this.tracking = !1,
                this.elements = [],
                e && (Array.isArray(e) || s.isNodeList(e) || s.isElement(e)) && this.addElements(e),
                this.refreshAllElementStates = this.refreshAllElementStates.bind(this),
                this.refreshAllElementMetrics = this.refreshAllElementMetrics.bind(this),
                this.options.autoStart && this.start()
        }
        var c = l.prototype;
        c.destroy = function () {
            var e, t;
            for (this.stop(),
                e = 0,
                t = this.elements.length; e < t; e++)
                this.elements[e].destroy();
            this.elements = null,
                this.options = null
        }
            ,
            c._registerTrackedElements = function (e) {
                [].concat(e).forEach((function (e) {
                    this._elementInDOM(e.element) && (e.offsetTop = e.element.offsetTop,
                        this.elements.push(e))
                }
                ), this)
            }
            ,
            c._elementInDOM = function (e) {
                var t = !1
                    , i = document.getElementsByTagName("body")[0];
                return s.isElement(e) && i.contains(e) && (t = !0),
                    t
            }
            ,
            c._elementPercentInView = function (e) {
                return e.pixelsInView / e.height
            }
            ,
            c._elementPixelsInView = function (e) {
                var t = e.top - this._scrollY
                    , i = e.bottom - this._scrollY;
                return t > this._windowHeight || i < 0 ? 0 : Math.min(i, this._windowHeight) - Math.max(t, 0)
            }
            ,
            c._ifInView = function (e, t) {
                t || e.trigger("enterview", e)
            }
            ,
            c._ifAlreadyInView = function (e) {
                e.inView || e.trigger("exitview", e)
            }
            ,
            c.addElements = function (e, t) {
                void 0 === t && (t = this.options.useRenderedPosition);
                for (var i = 0, n = (e = s.isNodeList(e) ? Array.prototype.slice.call(e) : [].concat(e)).length; i < n; i++)
                    this.addElement(e[i], t)
            }
            ,
            c.addElement = function (e, t) {
                var i = null;
                if (void 0 === t && (t = this.options.useRenderedPosition),
                    !s.isElement(e))
                    throw new TypeError("ElementTracker: " + e + " is not a valid DOM element");
                return i = new a(e, t),
                    this._registerTrackedElements(i),
                    this.refreshElementMetrics(i),
                    this.refreshElementState(i),
                    i
            }
            ,
            c.removeElement = function (e) {
                var t, i = [];
                this.elements.forEach((function (t, s) {
                    t !== e && t.element !== e || i.push(s)
                }
                )),
                    t = this.elements.filter((function (e, t) {
                        return i.indexOf(t) < 0
                    }
                    )),
                    this.elements = t
            }
            ,
            c.start = function () {
                !1 === this.tracking && (this.tracking = !0,
                    window.addEventListener("resize", this.refreshAllElementMetrics),
                    window.addEventListener("orientationchange", this.refreshAllElementMetrics),
                    window.addEventListener("scroll", this.refreshAllElementStates),
                    this.refreshAllElementMetrics())
            }
            ,
            c.stop = function () {
                !0 === this.tracking && (this.tracking = !1,
                    window.removeEventListener("resize", this.refreshAllElementMetrics),
                    window.removeEventListener("orientationchange", this.refreshAllElementMetrics),
                    window.removeEventListener("scroll", this.refreshAllElementStates))
            }
            ,
            c.refreshAllElementMetrics = function (e, t) {
                "number" != typeof e && (e = this._getScrollY()),
                    "number" != typeof t && (t = this._getWindowHeight()),
                    this._scrollY = e,
                    this._windowHeight = t,
                    this.elements.forEach(this.refreshElementMetrics, this)
            }
            ,
            c.refreshElementMetrics = function (e) {
                if (!e.isActive)
                    return e;
                var t = n.getDimensions(e.element, e.useRenderedPosition)
                    , i = n.getPagePosition(e.element, e.useRenderedPosition);
                return e = r.extend(e, t, i),
                    this.refreshElementState(e)
            }
            ,
            c.refreshAllElementStates = function (e) {
                "number" != typeof e && (e = this._getScrollY()),
                    this._scrollY = e,
                    this.elements.forEach(this.refreshElementState, this)
            }
            ,
            c.refreshElementState = function (e) {
                if (!e.isActive)
                    return e;
                var t = e.inView;
                return e.pixelsInView = this._elementPixelsInView(e),
                    e.percentInView = this._elementPercentInView(e),
                    e.inView = e.pixelsInView > 0,
                    e.inView && this._ifInView(e, t),
                    t && this._ifAlreadyInView(e),
                    e
            }
            ,
            c.pauseElementTracking = function (e) {
                e && (e.isActive = !1)
            }
            ,
            c.resumeElementTracking = function (e) {
                e && (e.isActive = !0)
            }
            ,
            c._getWindowHeight = function () {
                return window.innerHeight
            }
            ,
            c._getScrollY = function () {
                return n.getScrollY()
            }
            ,
            t.exports = l
    }
        , {
        20: 20,
        21: 21,
        23: 23,
        26: 26,
        28: 28,
        33: 33,
        84: 84,
        86: 86
    }],
    33: [function (e, t, i) {
        "use strict";
        var s = {
            isElement: e(26)
        }
            , n = e(34).EventEmitterMicro
            , r = n.prototype;
        function a(e, t) {
            if (!s.isElement(e))
                throw new TypeError("TrackedElement: " + e + " is not a valid DOM element");
            n.call(this),
                this.element = e,
                this.inView = !1,
                this.isActive = !0,
                this.percentInView = 0,
                this.pixelsInView = 0,
                this.offsetTop = 0,
                this.top = 0,
                this.right = 0,
                this.bottom = 0,
                this.left = 0,
                this.width = 0,
                this.height = 0,
                this.useRenderedPosition = t || !1
        }
        (a.prototype = Object.create(r)).destroy = function () {
            this.element = null,
                r.destroy.call(this)
        }
            ,
            t.exports = a
    }
        , {
        26: 26,
        34: 34
    }],
    34: [function (e, t, i) {
        "use strict";
        t.exports = {
            EventEmitterMicro: e(35)
        }
    }
        , {
        35: 35
    }],
    35: [function (e, t, i) {
        "use strict";
        function s() {
            this._events = {}
        }
        var n = s.prototype;
        n.on = function (e, t) {
            this._events[e] = this._events[e] || [],
                this._events[e].unshift(t)
        }
            ,
            n.once = function (e, t) {
                var i = this;
                this.on(e, (function s(n) {
                    i.off(e, s),
                        void 0 !== n ? t(n) : t()
                }
                ))
            }
            ,
            n.off = function (e, t) {
                if (this.has(e)) {
                    if (1 === arguments.length)
                        return this._events[e] = null,
                            void delete this._events[e];
                    var i = this._events[e].indexOf(t);
                    -1 !== i && this._events[e].splice(i, 1)
                }
            }
            ,
            n.trigger = function (e, t) {
                if (this.has(e))
                    for (var i = this._events[e].length - 1; i >= 0; i--)
                        void 0 !== t ? this._events[e][i](t) : this._events[e][i]()
            }
            ,
            n.has = function (e) {
                return e in this._events != !1 && 0 !== this._events[e].length
            }
            ,
            n.destroy = function () {
                for (var e in this._events)
                    this._events[e] = null;
                this._events = null
            }
            ,
            t.exports = s
    }
        , {}],
    36: [function (e, t, i) {
        t.exports = function (e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
    }
        , {}],
    37: [function (e, t, i) {
        var s = e(38);
        function n() {
            if ("function" != typeof WeakMap)
                return null;
            var e = new WeakMap;
            return n = function () {
                return e
            }
                ,
                e
        }
        t.exports = function (e) {
            if (e && e.__esModule)
                return e;
            if (null === e || "object" !== s(e) && "function" != typeof e)
                return {
                    default: e
                };
            var t = n();
            if (t && t.has(e))
                return t.get(e);
            var i = {}
                , r = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var a in e)
                if (Object.prototype.hasOwnProperty.call(e, a)) {
                    var o = r ? Object.getOwnPropertyDescriptor(e, a) : null;
                    o && (o.get || o.set) ? Object.defineProperty(i, a, o) : i[a] = e[a]
                }
            return i.default = e,
                t && t.set(e, i),
                i
        }
    }
        , {
        38: 38
    }],
    38: [function (e, t, i) {
        function s(e) {
            return "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? t.exports = s = function (e) {
                return typeof e
            }
                : t.exports = s = function (e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                s(e)
        }
        t.exports = s
    }
        , {}],
    39: [function (e, t, i) { }
        , {}],
    40: [function (e, t, i) {
        "use strict";
        const s = e(112)
            , n = e(119)
            , r = e(109);
        n.BREAKPOINTS = [{
            name: "S",
            mediaQuery: "only screen and (max-width: 734px)"
        }, {
            name: "M",
            mediaQuery: "only screen and (max-width: 1068px)"
        }, {
            name: "L",
            mediaQuery: "only screen and (min-width: 1441px)"
        }, {
            name: "L",
            mediaQuery: "only screen and (min-width: 1069px)"
        }];
        new (e(44));
        var a = null;
        try {
            a = e("@marcom/ac-analytics")
        } catch (e) { }
        var o = e(45);
        function l(e, t, i, s, n) {
            Array.from(e.querySelectorAll("a")).forEach((function (i, r) {
                var o = 1 === n ? 0 : s
                    , l = i.getAttribute("data-analytics-title") || i.getAttribute("aria-label") || i.innerText;
                if (!/\w/.test(l)) {
                    var c = e.getAttribute("data-module-template")
                        , h = e.getAttribute("data-unit-id");
                    if (h) {
                        for (var d = e.parentNode; !c;)
                            c = d.getAttribute("data-module-template"),
                                d = d.parentNode;
                        l = c + " " + h
                    } else
                        l = c;
                    /\w/.test(i.className) && (l += " " + i.className)
                }
                l = l.split("’").join("").split(/[^\w]+/).join(" ").toLowerCase();
                var u = {
                    eVar102: t + "." + o + ":" + l,
                    eVar103: "abcdefghijklmnopqrstuvwxyz".charAt(s - 1)
                };
                i.addEventListener("mouseup", (function () {
                    a.passiveTracker(u)
                }
                ))
            }
            ))
        }
        t.exports = function () {
            !function () {
                const e = document.querySelector("div.adv-wrapper");
                e && e.offsetHeight > 0 && document.body.style.setProperty("--global-nav-ad-bar-height", e.offsetHeight + "px", "important")
            }();
            var e = [];
            s.on("ON_DOM_KEYFRAMES_CREATED", () => {
                new r,
                    [].forEach.call(document.querySelectorAll("[data-module-template]"), (function (t, i) {
                        var n = t.getAttribute("data-module-template")
                            , r = o[n].SectionClass
                            , a = o[n].collectionUnits;
                        e.push(new r(t, i, a, s))
                    }
                    ))
            }
            ),
                s.initialize(),
                a && function () {
                    var e;
                    e = 0,
                        Array.from(document.querySelectorAll("[data-module-template]")).forEach((function (t, i) {
                            var s = parseInt(window.getComputedStyle(t).getPropertyValue("--columns-for-analytics-only"));
                            if (!isNaN(s)) {
                                var n = Array.from(t.querySelectorAll("[data-unit-id]"));
                                if (n && n.length > 0) {
                                    var r = 0;
                                    n.forEach((function (t, i) {
                                        var n = i + 1;
                                        r = Math.ceil(n / s),
                                            l(t, e + r, 0, n - (r - 1) * s, s)
                                    }
                                    )),
                                        e += r
                                } else
                                    e++,
                                        l(t, e + 0, 0, 1, s)
                            }
                        }
                        ));
                    var t = {
                        page: {
                            data: {}
                        }
                    }
                        , i = function () {
                            var e, t, i, s = document.querySelector("meta[property=analytics-track]");
                            if (s && s.content && (i = document.querySelector("[data-module-template]")) && (e = i.querySelector("[data-analytics-section-engagement]")) && e.hasAttribute("data-analytics-section-engagement") && (t = e.getAttribute("data-analytics-section-engagement").split(":")[1]))
                                return "0. " + s.content.toLowerCase() + " - " + t + " - section engaged .0"
                        }();
                    i && (t.page.data.prop34 = i),
                        a.createBasicObserverSuite(t)
                }()
        }
    }
        , {
        109: 109,
        112: 112,
        119: 119,
        44: 44,
        45: 45,
        undefined: void 0
    }],
    41: [function (e, t, i) {
        "use strict";
        var s = e(42)
            , n = s.prototype;
        function r(e, t, i) {
            s.apply(this, arguments)
        }
        (r.prototype = Object.create(n)).destroy = function () {
            n.destroy.call(this)
        }
            ,
            t.exports = r
    }
        , {
        42: 42
    }],
    42: [function (e, t, i) {
        "use strict";
        var s = e(34).EventEmitterMicro
            , n = s.prototype
            , r = e(29).ElementEngagement
            , a = e(43);
        function o(t, i, n, a) {
            s.apply(this),
                this.sectionElement = t,
                this.sectionIndex = i,
                this.moduleTemplateName = t.getAttribute("data-module-template"),
                this.viewportEmitter = e(206),
                this.AnimSystem = a,
                this.sectionAnalyticsRegion = t.getAttribute("data-analytics-region"),
                this.collectionUnits = this.sectionElement.querySelectorAll("[data-unit-id]"),
                this.elementEngagement = new r,
                this.elementEngagement.start(),
                this.collectionUnitObjs = {},
                this._setDebouncedResizeEvents(500),
                this.initContentUnitClasses(n)
        }
        var l = o.prototype = Object.create(n);
        l.initContentUnitClasses = function (e) {
            Array.from(this.collectionUnits).forEach(function (t) {
                var i = t.getAttribute("data-unit-id")
                    , s = e[i] ? e[i] : a;
                this.collectionUnitObjs[i] = new s(t, i, this)
            }
                .bind(this))
        }
            ,
            l.destroy = function () {
                n.destroy.call(this)
            }
            ,
            l.addWrapperClass = function (e) {
                this.sectionElement.classList.add(e)
            }
            ,
            l.removeWrapperClass = function (e) {
                this.sectionElement.classList.remove(e)
            }
            ,
            l._setDebouncedResizeEvents = function (e) {
                var t = !1;
                window.addEventListener("resize", function () {
                    clearTimeout(this._checkResizeEndTimer),
                        t || (this.trigger("resize:start"),
                            t = !0),
                        this._checkResizeEndTimer = setTimeout(function () {
                            t && (t = !1,
                                this.trigger("resize:end"))
                        }
                            .bind(this), e)
                }
                    .bind(this))
            }
            ,
            t.exports = o
    }
        , {
        206: 206,
        29: 29,
        34: 34,
        43: 43
    }],
    43: [function (e, t, i) {
        "use strict";
        var s = e(34).EventEmitterMicro
            , n = s.prototype;
        function r(e, t, i) {
            s.apply(this),
                this.collectionUnitElement = e,
                this.unitWrapperElement = this.collectionUnitElement.querySelector(".unit-wrapper"),
                this.id = t,
                this.sectionObj = i,
                this.AnimSystem = i.AnimSystem,
                this.handleLinkAccessibilityConcerns()
        }
        var a = r.prototype = Object.create(n);
        a.setVoiceoverCopy = function () {
            if (this.unitWrapperElement) {
                var e = /^\s*$/
                    , t = this.unitWrapperElement.querySelector("a.unit-link")
                    , i = t.querySelector(".unit-link-vo");
                if (t && i) {
                    var s = i.textContent
                        , n = e.test(s);
                    Array.from(this.unitWrapperElement.querySelectorAll(".unit-copy-wrapper>*:not(a)")).forEach((function (t) {
                        if (n) {
                            var i = t.innerText && "" != t.innerText ? t.innerText : t.textContent;
                            if (i = i.replace(/[\r\n]/g, " "),
                                e.test(i))
                                return;
                            /[a-z0-9]\s*$/i.test(i) && (i += "."),
                                s += i.split(/\.$/).join(". ")
                        }
                        t.setAttribute("aria-hidden", !0)
                    }
                    )),
                        n && (t.setAttribute("aria-label", s),
                            i.innerHTML = s)
                }
            }
        }
            ,
            a.handleLinkAccessibilityConcerns = function () {
                if (this.unitWrapperElement) {
                    let i = this.unitWrapperElement.querySelector("a.unit-link")
                        , s = i ? i.href : null
                        , n = i ? i.getAttribute("aria-label") : null
                        , r = this.unitWrapperElement.querySelectorAll(".cta-links a")
                        , a = function () {
                            let e = [];
                            return r.forEach((t, i) => {
                                e.push(t.href)
                            }
                            ),
                                e
                        }()
                        , o = s && a.indexOf(s) >= 0
                        , l = !n || !/\w/.test(n);
                    if (s)
                        if (o)
                            i.removeAttribute("aria-label"),
                                i.setAttribute("aria-hidden", "true"),
                                i.setAttribute("tabindex", "-1");
                        else if (l) {
                            var e = this.unitWrapperElement.querySelector(".unit-copy-wrapper>*:not(a)")
                                , t = e.innerText && "" != e.innerText ? e.innerText : e.textContent;
                            i.setAttribute("aria-label", t)
                        }
                }
            }
            ,
            a.destroy = function () {
                n.destroy.call(this)
            }
            ,
            t.exports = r
    }
        , {
        34: 34
    }],
    44: [function (e, t, i) {
        "use strict";
        e(36)(e(203));
        var s = e(88)
            , n = e(34);
        const r = e(3)
            , a = [1.2, 1.44, 1.72, 2.07, 2.48, 2.98];
        class o extends n.EventEmitterMicro {
            constructor(e = 17, t = a) {
                super(),
                    this.baseFontSize = e,
                    this.fontSizeDeltas = t,
                    r.detect(this.baseFontSize),
                    this._cachedTextZoomDeltaFloat = 1,
                    this._cachedTextZoomFactor = 0,
                    this._rafEmitter = new s.RAFEmitter,
                    this._htmlElement = document.querySelector("html"),
                    this._listenForChanges(),
                    this._checkForTextZoomChange()
            }
            _listenForChanges() {
                window.addEventListener("resize", e => {
                    this._checkForTextZoomChange()
                }
                )
            }
            _checkForTextZoomChange() {
                var e = 4;
                this._rafEmitter.on("update", () => {
                    e--;
                    const t = this.getTextZoomDeltaAsFloat();
                    t != this._cachedTextZoomDeltaFloat ? (this._cachedTextZoomDeltaFloat = t,
                        this._cachedTextZoomDeltaFactor = this.getTextZoomAsFactor(),
                        this._setTextZoomDataAttribute(),
                        this.trigger("textZoomChange", {
                            zoomAsFloat: this._cachedTextZoomDeltaFloat,
                            zoomAsFactor: this._cachedTextZoomDeltaFactor
                        })) : e > 0 && this._rafEmitter.run()
                }
                ),
                    this._rafEmitter.run()
            }
            _setTextZoomDataAttribute() {
                this._rafEmitter.on("draw", () => {
                    const e = this._cachedTextZoomDeltaFactor > 0 ? "setAttribute" : "removeAttribute";
                    this._htmlElement[e]("data-text-zoom", this._cachedTextZoomDeltaFactor)
                }
                )
            }
            getTextZoomAsFactor() {
                let e = 0;
                const t = this.getTextZoomDeltaAsFloat();
                return this.fontSizeDeltas.forEach(i => {
                    t > i && e++
                }
                ),
                    e
            }
            getTextZoomDeltaAsFloat() {
                return parseFloat(r.currentSize) / this.baseFontSize
            }
        }
        t.exports = o
    }
        , {
        203: 203,
        3: 3,
        34: 34,
        36: 36,
        88: 88
    }],
    45: [function (e, t, i) {
        "use strict";
        t.exports = {
            "fam-gallery": {
                SectionClass: e(212),
                collectionUnits: e(224)
            },
            generic: {
                SectionClass: e(41),
                collectionUnits: e(225)
            },
            heroes: {
                SectionClass: e(41),
                collectionUnits: e(226)
            },
            modal: {
                SectionClass: e(216),
                collectionUnits: e(227)
            },
            promos: {
                SectionClass: e(41),
                collectionUnits: e(228)
            },
            ribbon: {
                SectionClass: e(41),
                collectionUnits: e(229)
            },
            "tv-plus-gallery": {
                SectionClass: e(217),
                collectionUnits: e(230)
            }
        }
    }
        , {
        212: 212,
        216: 216,
        217: 217,
        224: 224,
        225: 225,
        226: 226,
        227: 227,
        228: 228,
        229: 229,
        230: 230,
        41: 41
    }],
    46: [function (e, t, i) {
        "use strict";
        t.exports = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            SHIFT: 16,
            CONTROL: 17,
            ALT: 18,
            COMMAND: 91,
            CAPSLOCK: 20,
            ESCAPE: 27,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            ARROW_LEFT: 37,
            ARROW_UP: 38,
            ARROW_RIGHT: 39,
            ARROW_DOWN: 40,
            DELETE: 46,
            ZERO: 48,
            ONE: 49,
            TWO: 50,
            THREE: 51,
            FOUR: 52,
            FIVE: 53,
            SIX: 54,
            SEVEN: 55,
            EIGHT: 56,
            NINE: 57,
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82,
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            NUMPAD_ZERO: 96,
            NUMPAD_ONE: 97,
            NUMPAD_TWO: 98,
            NUMPAD_THREE: 99,
            NUMPAD_FOUR: 100,
            NUMPAD_FIVE: 101,
            NUMPAD_SIX: 102,
            NUMPAD_SEVEN: 103,
            NUMPAD_EIGHT: 104,
            NUMPAD_NINE: 105,
            NUMPAD_ASTERISK: 106,
            NUMPAD_PLUS: 107,
            NUMPAD_DASH: 109,
            NUMPAD_DOT: 110,
            NUMPAD_SLASH: 111,
            NUMPAD_EQUALS: 187,
            TICK: 192,
            LEFT_BRACKET: 219,
            RIGHT_BRACKET: 221,
            BACKSLASH: 220,
            SEMICOLON: 186,
            APOSTRAPHE: 222,
            APOSTROPHE: 222,
            SPACEBAR: 32,
            CLEAR: 12,
            COMMA: 188,
            DOT: 190,
            SLASH: 191
        }
    }
        , {}],
    47: [function (e, t, i) {
        "use strict";
        var s = e(48)
            , n = e(50)
            , r = e(53)
            , a = function (e, t) {
                t = t || {},
                    this._tabbables = null,
                    this._excludeHidden = t.excludeHidden,
                    this._firstTabbableElement = t.firstFocusElement,
                    this._lastTabbableElement = null,
                    this._relatedTarget = null,
                    this.el = e,
                    this._handleOnFocus = this._handleOnFocus.bind(this)
            }
            , o = a.prototype;
        o.start = function (e) {
            this.updateTabbables(),
                n(this.el, null, this._excludeHidden);
            let t = document.activeElement;
            this._firstTabbableElement ? this.el.contains(document.activeElement) || e || (this._firstTabbableElement.focus(),
                t = this._firstTabbableElement) : console.warn("this._firstTabbableElement is null, CircularTab needs at least one tabbable element."),
                this._relatedTarget = t,
                document.addEventListener("focus", this._handleOnFocus, !0)
        }
            ,
            o.stop = function () {
                r(this.el),
                    document.removeEventListener("focus", this._handleOnFocus, !0)
            }
            ,
            o.updateTabbables = function () {
                this._tabbables = s.getTabbableElements(this.el, this._excludeHidden),
                    this._firstTabbableElement = this._firstTabbableElement || this._tabbables[0],
                    this._lastTabbableElement = this._tabbables[this._tabbables.length - 1]
            }
            ,
            o._handleOnFocus = function (e) {
                if (this.el.contains(e.target))
                    this._relatedTarget = e.target;
                else {
                    if (e.preventDefault(),
                        this.updateTabbables(),
                        this._relatedTarget === this._lastTabbableElement || null === this._relatedTarget)
                        return this._firstTabbableElement.focus(),
                            void (this._relatedTarget = this._firstTabbableElement);
                    if (this._relatedTarget === this._firstTabbableElement && this._lastTabbableElement)
                        return this._lastTabbableElement.focus(),
                            void (this._relatedTarget = this._lastTabbableElement)
                }
            }
            ,
            o.destroy = function () {
                this.stop(),
                    this.el = null,
                    this._tabbables = null,
                    this._firstTabbableElement = null,
                    this._lastTabbableElement = null,
                    this._relatedTarget = null,
                    this._handleOnFocus = null
            }
            ,
            t.exports = a
    }
        , {
        48: 48,
        50: 50,
        53: 53
    }],
    48: [function (e, t, i) {
        "use strict";
        var s = e(55)
            , n = function () {
                this.focusableSelectors = s.selectors
            }
            , r = n.prototype;
        r.isFocusableElement = function (e, t, i) {
            return !(t && !this._isDisplayed(e)) && (s.nodeName[e.nodeName] ? !e.disabled : !e.contentEditable || (i = i || parseFloat(e.getAttribute("tabindex")),
                !isNaN(i)))
        }
            ,
            r.isTabbableElement = function (e, t) {
                if (t && !this._isDisplayed(e))
                    return !1;
                var i = e.getAttribute("tabindex");
                return i = parseFloat(i),
                    isNaN(i) ? this.isFocusableElement(e, t, i) : i >= 0
            }
            ,
            r._isDisplayed = function (e) {
                var t = e.getBoundingClientRect();
                return (0 !== t.top || 0 !== t.left || 0 !== t.width || 0 !== t.height) && "hidden" !== window.getComputedStyle(e).visibility
            }
            ,
            r.getTabbableElements = function (e, t) {
                for (var i = e.querySelectorAll(this.focusableSelectors), s = i.length, n = [], r = 0; r < s; r++)
                    this.isTabbableElement(i[r], t) && n.push(i[r]);
                return n
            }
            ,
            r.getFocusableElements = function (e, t) {
                for (var i = e.querySelectorAll(this.focusableSelectors), s = i.length, n = [], r = 0; r < s; r++)
                    this.isFocusableElement(i[r], t) && n.push(i[r]);
                return n
            }
            ,
            t.exports = new n
    }
        , {
        55: 55
    }],
    49: [function (e, t, i) {
        "use strict";
        var s = e(54)
            , n = e(48)
            , r = function (e, t) {
                var i = e.getAttribute("data-original-" + t);
                i || (i = e.getAttribute(t) || "",
                    e.setAttribute("data-original-" + t, i))
            };
        t.exports = function (e, t) {
            if (n.isFocusableElement(e, t))
                r(e, "tabindex"),
                    e.setAttribute("tabindex", "-1");
            else
                for (var i = n.getTabbableElements(e, t), a = i.length; a--;)
                    r(i[a], "tabindex"),
                        i[a].setAttribute("tabindex", "-1");
            r(e, s.HIDDEN),
                e.setAttribute(s.HIDDEN, "true")
        }
    }
        , {
        48: 48,
        54: 54
    }],
    50: [function (e, t, i) {
        "use strict";
        var s = e(49);
        t.exports = function e(t, i, n) {
            i = i || document.body;
            for (var r = t, a = t; r = r.previousElementSibling;)
                s(r, n);
            for (; a = a.nextElementSibling;)
                s(a, n);
            t.parentElement && t.parentElement !== i && e(t.parentElement, i, n)
        }
    }
        , {
        49: 49
    }],
    51: [function (e, t, i) {
        "use strict";
        t.exports = function (e, t) {
            let i;
            i = e instanceof NodeList ? e : [].concat(e),
                t = Array.isArray(t) ? t : [].concat(t),
                i.forEach(e => {
                    t.forEach(t => {
                        e.removeAttribute(t)
                    }
                    )
                }
                )
        }
    }
        , {}],
    52: [function (e, t, i) {
        "use strict";
        var s = e(51)
            , n = e(54)
            , r = "data-original-"
            , a = function (e, t) {
                var i = e.getAttribute(r + t);
                null !== i && ("" === i ? s(e, t) : e.setAttribute(t, i),
                    s(e, r + t))
            };
        t.exports = function (e) {
            a(e, "tabindex"),
                a(e, n.HIDDEN);
            for (var t = e.querySelectorAll("[".concat(r + "tabindex", "]")), i = t.length; i--;)
                a(t[i], "tabindex")
        }
    }
        , {
        51: 51,
        54: 54
    }],
    53: [function (e, t, i) {
        "use strict";
        var s = e(52);
        t.exports = function e(t, i) {
            i = i || document.body;
            for (var n = t, r = t; n = n.previousElementSibling;)
                s(n);
            for (; r = r.nextElementSibling;)
                s(r);
            t.parentElement && t.parentElement !== i && e(t.parentElement, i)
        }
    }
        , {
        52: 52
    }],
    54: [function (e, t, i) {
        "use strict";
        t.exports = {
            AUTOCOMPLETE: "aria-autocomplete",
            CHECKED: "aria-checked",
            DISABLED: "aria-disabled",
            EXPANDED: "aria-expanded",
            HASPOPUP: "aria-haspopup",
            HIDDEN: "aria-hidden",
            INVALID: "aria-invalid",
            LABEL: "aria-label",
            LEVEL: "aria-level",
            MULTILINE: "aria-multiline",
            MULTISELECTABLE: "aria-multiselectable",
            ORIENTATION: "aria-orientation",
            PRESSED: "aria-pressed",
            READONLY: "aria-readonly",
            REQUIRED: "aria-required",
            SELECTED: "aria-selected",
            SORT: "aria-sort",
            VALUEMAX: "aria-valuemax",
            VALUEMIN: "aria-valuemin",
            VALUENOW: "aria-valuenow",
            VALUETEXT: "aria-valuetext",
            ATOMIC: "aria-atomic",
            BUSY: "aria-busy",
            LIVE: "aria-live",
            RELEVANT: "aria-relevant",
            DROPEFFECT: "aria-dropeffect",
            GRABBED: "aria-grabbed",
            ACTIVEDESCENDANT: "aria-activedescendant",
            CONTROLS: "aria-controls",
            DESCRIBEDBY: "aria-describedby",
            FLOWTO: "aria-flowto",
            LABELLEDBY: "aria-labelledby",
            OWNS: "aria-owns",
            POSINSET: "aria-posinset",
            SETSIZE: "aria-setsize"
        }
    }
        , {}],
    55: [function (e, t, i) {
        "use strict";
        t.exports = {
            selectors: ["input", "select", "textarea", "button", "optgroup", "option", "menuitem", "fieldset", "object", "a[href]", "[tabindex]", "[contenteditable]"].join(","),
            nodeName: {
                INPUT: "input",
                SELECT: "select",
                TEXTAREA: "textarea",
                BUTTON: "button",
                OPTGROUP: "optgroup",
                OPTION: "option",
                MENUITEM: "menuitem",
                FIELDSET: "fieldset",
                OBJECT: "object",
                A: "a"
            }
        }
    }
        , {}],
    56: [function (e, t, i) {
        "use strict";
        t.exports = function (e) {
            return !(!e || !e.nodeType)
        }
    }
        , {}],
    57: [function (e, t, i) {
        "use strict";
        function s() {
            this._events = {}
        }
        let n = s.prototype;
        n.on = function (e, t) {
            return this._events[e] = this._events[e] || [],
                this._events[e].unshift(t),
                t
        }
            ,
            n.once = function (e, t) {
                let i = this;
                return this.on(e, (function s(n) {
                    i.off(e, s),
                        void 0 !== n ? t(n) : t()
                }
                ))
            }
            ,
            n.off = function (e, t) {
                if (!this.has(e))
                    return;
                if (1 === arguments.length)
                    return this._events[e] = null,
                        void delete this._events[e];
                let i = this._events[e].indexOf(t);
                -1 !== i && this._events[e].splice(i, 1)
            }
            ,
            n.trigger = function (e, t) {
                if (this.has(e))
                    for (let i = this._events[e].length - 1; i >= 0; i--)
                        void 0 !== t ? this._events[e][i](t) : this._events[e][i]()
            }
            ,
            n.has = function (e) {
                return e in this._events != !1 && 0 !== this._events[e].length
            }
            ,
            n.destroy = function () {
                for (let e in this._events)
                    this._events[e] = null;
                this._events = null
            }
            ,
            t.exports = s
    }
        , {}],
    58: [function (e, t, i) {
        "use strict";
        const s = e(57)
            , n = e(60);
        t.exports = class extends s {
            constructor(e) {
                super(),
                    this._keysDown = {},
                    this._DOMKeyDown = this._DOMKeyDown.bind(this),
                    this._DOMKeyUp = this._DOMKeyUp.bind(this),
                    this._context = e || document,
                    this._context.addEventListener("keydown", this._DOMKeyDown, !0),
                    this._context.addEventListener("keyup", this._DOMKeyUp, !0)
            }
            onDown(e, t) {
                return this.on("keydown:" + e, t)
            }
            onceDown(e, t) {
                return this.once("keydown:" + e, t)
            }
            offDown(e, t) {
                return this.off("keydown:" + e, t)
            }
            onUp(e, t) {
                return this.on("keyup:" + e, t)
            }
            onceUp(e, t) {
                return this.once("keyup:" + e, t)
            }
            offUp(e, t) {
                return this.off("keyup:" + e, t)
            }
            isDown(e) {
                return e += "",
                    this._keysDown[e] || !1
            }
            isUp(e) {
                return !this.isDown(e)
            }
            destroy() {
                return this._context.removeEventListener("keydown", this._DOMKeyDown, !0),
                    this._context.removeEventListener("keyup", this._DOMKeyUp, !0),
                    this._keysDown = null,
                    this._context = null,
                    super.destroy(),
                    this
            }
            _DOMKeyDown(e) {
                var t = this._normalizeKeyboardEvent(e)
                    , i = t.keyCode += "";
                this._trackKeyDown(i),
                    this.trigger("keydown:" + i, t)
            }
            _DOMKeyUp(e) {
                var t = this._normalizeKeyboardEvent(e)
                    , i = t.keyCode += "";
                this._trackKeyUp(i),
                    this.trigger("keyup:" + i, t)
            }
            _normalizeKeyboardEvent(e) {
                return new n(e)
            }
            _trackKeyUp(e) {
                this._keysDown[e] && (this._keysDown[e] = !1)
            }
            _trackKeyDown(e) {
                this._keysDown[e] || (this._keysDown[e] = !0)
            }
        }
    }
        , {
        57: 57,
        60: 60
    }],
    59: [function (e, t, i) {
        "use strict";
        const s = e(58);
        t.exports = new s
    }
        , {
        58: 58
    }],
    60: [function (e, t, i) {
        "use strict";
        const s = e(61)
            , n = ["keyLocation", "keyIdentifier"];
        t.exports = class {
            constructor(e) {
                this.originalEvent = e;
                for (let t in e)
                    -1 === n.indexOf(t) && "function" != typeof e[t] && (this[t] = e[t]);
                this.keyCode || (this.keyCode = this._getKeyCode()),
                    this.location = void 0 !== this.originalEvent.location ? this.originalEvent.location : this.originalEvent.keyLocation
            }
            preventDefault() {
                if ("function" == typeof this.originalEvent.preventDefault)
                    return this.originalEvent.preventDefault();
                this.originalEvent.returnValue = !1
            }
            stopPropagation() {
                return this.originalEvent.stopPropagation()
            }
            _getKeyCode() {
                return s[this.code] || -1
            }
        }
    }
        , {
        61: 61
    }],
    61: [function (e, t, i) {
        "use strict";
        t.exports = {
            Backspace: 8,
            Tab: 9,
            Enter: 13,
            NumpadEnter: 13,
            ShiftLeft: 16,
            ShiftRight: 16,
            ControlLeft: 17,
            ControlRight: 17,
            AltLeft: 18,
            AltRight: 18,
            CapsLock: 20,
            Escape: 27,
            PageUp: 33,
            PageDown: 34,
            End: 35,
            Home: 36,
            ArrowLeft: 37,
            ArrowUp: 38,
            ArrowRight: 39,
            ArrowDown: 40,
            Delete: 46,
            Digit0: 48,
            Digit1: 49,
            Digit2: 50,
            Digit3: 51,
            Digit4: 52,
            Digit5: 53,
            Digit6: 54,
            Digit7: 55,
            Digit8: 56,
            Digit9: 57,
            KeyA: 65,
            KeyB: 66,
            KeyC: 67,
            KeyD: 68,
            KeyE: 69,
            KeyF: 70,
            KeyG: 71,
            KeyH: 72,
            KeyI: 73,
            KeyJ: 74,
            KeyK: 75,
            KeyL: 76,
            KeyM: 77,
            KeyN: 78,
            KeyO: 79,
            KeyP: 80,
            KeyQ: 81,
            KeyR: 82,
            KeyS: 83,
            KeyT: 84,
            KeyU: 85,
            KeyV: 86,
            KeyW: 87,
            KeyX: 88,
            KeyY: 89,
            KeyZ: 90,
            Numpad0: 96,
            Numpad1: 97,
            Numpad2: 98,
            Numpad3: 99,
            Numpad4: 100,
            Numpad5: 101,
            Numpad6: 102,
            Numpad7: 103,
            Numpad8: 104,
            Numpad9: 105,
            NumpadMultiply: 106,
            NumpadAdd: 107,
            NumpadSubtract: 109,
            NumpadDecimal: 110,
            NumpadDivide: 111,
            NumpadEqual: 187,
            Backquote: 192,
            BracketLeft: 219,
            BracketRight: 221,
            Backslash: 220,
            Semicolon: 186,
            Quote: 222,
            Space: 32,
            Equal: 187,
            Comma: 188,
            Minus: 189,
            Period: 190,
            Slash: 191
        }
    }
        , {}],
    62: [function (e, t, i) {
        "use strict";
        t.exports = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            SHIFT: 16,
            CONTROL: 17,
            ALT: 18,
            COMMAND: 91,
            CAPSLOCK: 20,
            ESCAPE: 27,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            ARROW_LEFT: 37,
            ARROW_UP: 38,
            ARROW_RIGHT: 39,
            ARROW_DOWN: 40,
            DELETE: 46,
            ZERO: 48,
            ONE: 49,
            TWO: 50,
            THREE: 51,
            FOUR: 52,
            FIVE: 53,
            SIX: 54,
            SEVEN: 55,
            EIGHT: 56,
            NINE: 57,
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82,
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            NUMPAD_ZERO: 96,
            NUMPAD_ONE: 97,
            NUMPAD_TWO: 98,
            NUMPAD_THREE: 99,
            NUMPAD_FOUR: 100,
            NUMPAD_FIVE: 101,
            NUMPAD_SIX: 102,
            NUMPAD_SEVEN: 103,
            NUMPAD_EIGHT: 104,
            NUMPAD_NINE: 105,
            NUMPAD_ASTERISK: 106,
            NUMPAD_PLUS: 107,
            NUMPAD_DASH: 109,
            NUMPAD_DOT: 110,
            NUMPAD_SLASH: 111,
            NUMPAD_EQUALS: 187,
            TICK: 192,
            LEFT_BRACKET: 219,
            RIGHT_BRACKET: 221,
            BACKSLASH: 220,
            SEMICOLON: 186,
            APOSTROPHE: 222,
            SPACEBAR: 32,
            CLEAR: 12,
            COMMA: 188,
            DOT: 190,
            SLASH: 191
        }
    }
        , {}],
    63: [function (e, t, i) {
        "use strict";
        var s = e(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var n = s(e(98));
        var r = {
            combine: e => {
                let t = "mixin_mask_" + Math.random().toString(16).slice(2);
                const i = t => {
                    let i = e.find(e => e.breakpointMask.includes(t));
                    if (!i)
                        throw "Cannot find mode for current breakpoint ".concat(t, ". Current Settings ").concat(e);
                    return i.mixin
                }
                    ;
                let s = (e, i, ...s) => e[t][i] ? e[t][i].apply(e, s) : null;
                const r = {
                    beforeCreate() {
                        this[t] = i(this._viewport),
                            s(this, "beforeCreate")
                    },
                    onBreakpointChange() {
                        const e = i(this._viewport);
                        e !== this[t] && (s(this, "destroy"),
                            this[t] = e,
                            (0,
                                n.default)(() => {
                                    s(this, "beforeCreate", this.model.options),
                                        s(this, "created", this.model.options),
                                        s(this, "beforeMount", this.model.options),
                                        s(this, "mounted")
                                }
                                    , !1))
                    },
                    destroy() {
                        s(this, "destroy"),
                            this[t] = null
                    }
                };
                return e.forEach(e => {
                    e.mixin = e.mixin || {},
                        Object.keys(e.mixin).forEach(e => r[e] = r[e] || function (...t) {
                            return s(this, e, ...t)
                        }
                        )
                }
                ),
                    r
            }
        };
        i.default = r
    }
        , {
        36: 36,
        98: 98
    }],
    64: [function (e, t, i) {
        "use strict";
        var s = e(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var n = s(e(57))
            , r = s(e(56))
            , a = s(e(65))
            , o = s(e(81))
            , l = s(e(71))
            , c = s(e(67));
        const h = ["beforeCreate", "created", "beforeMount", "mounted", "onWillOpen", "onOpen", "onWillClose", "onClose", "onResizeImmediate", "onBreakpointChange", "onResizeDebounced", "destroy"]
            , d = {
                attributes: {}
            };
        class u extends n.default {
            constructor(e, t = d) {
                super(t),
                    this.elements = {},
                    this.elements.content = e,
                    this.options = t,
                    this.opened = !1,
                    this.model = Object.assign({}, JSON.parse(JSON.stringify(a.default))),
                    this.templates = {},
                    h.forEach(e => {
                        this[e] = (...t) => {
                            this["__".concat(e)] && this["__".concat(e)].forEach(e => e.apply(this, t))
                        }
                    }
                    ),
                    this._bindEvents(),
                    ["beforeCreate", "created", "beforeMount"].forEach(e => this[e](t))
            }
            appendContent(e, t) {
                (0,
                    r.default)(e) && (t = t && (0,
                        r.default)(t) ? t : this.elements.contentContainer).appendChild(e)
            }
            removeContent(e) {
                e ? (this.elements.container.contains(e) && e.remove(),
                    this.trigger(this.model.Events.CONTENT_REMOVED)) : this._emptyContent()
            }
            scrollToModalTop() {
                this.elements.container.scrollTop = 0
            }
            _emptyContent() {
                this.elements.contentContainer.innerHTML = ""
            }
            _bindEvents() {
                this.on(this.model.Events.WILLOPEN, this.onWillOpen),
                    this.on(this.model.Events.OPEN, this.onOpen),
                    this.on(this.model.Events.WILLCLOSE, this.onWillClose),
                    this.on(this.model.Events.CLOSE, this.onClose)
            }
            _releaseEvents() {
                this.off(this.model.Events.WILLOPEN, this.onWillOpen),
                    this.off(this.model.Events.OPEN, this.onOpen),
                    this.off(this.model.Events.WILLCLOSE, this.onwillClose),
                    this.off(this.model.Events.CLOSE, this.onClose)
            }
            static withMixins(...e) {
                const t = class extends u {
                }
                    , i = t.prototype;
                return [o.default, ...e, c.default, l.default].forEach(e => {
                    for (const t in e)
                        h.includes(t) ? (i["__".concat(t)] = i["__".concat(t)] || [],
                            i["__".concat(t)].push(e[t])) : i[t] = e[t]
                }
                ),
                    t
            }
        }
        var m = u;
        i.default = m
    }
        , {
        36: 36,
        56: 56,
        57: 57,
        65: 65,
        67: 67,
        71: 71,
        81: 81
    }],
    65: [function (e, t, i) {
        "use strict";
        var s = e(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var n = s(e(62))
            , r = s(e(83))
            , a = s(e(82))
            , o = {
                PageOverlay: {
                    ClassNames: ["modal-page-overlay"]
                },
                FullBleed: {
                    ClassNames: ["modal-full-bleed"]
                },
                Open: {
                    Document: {
                        ClassNames: ["has-modal"]
                    },
                    Container: {
                        ClassNames: ["modal-open"]
                    }
                },
                Close: {
                    Selector: "[data-modal-close]"
                },
                Elements: {
                    container: {
                        Attributes: {
                            class: "modal"
                        },
                        Template: r.default
                    },
                    contentContainer: {
                        Selector: "[data-modal-element-content-container]"
                    },
                    closeButton: {
                        Attributes: {
                            class: "modal-close-button",
                            "data-modal-close": "",
                            "aria-label": "Close"
                        },
                        ParentSelector: "[data-modal-close-button-parent]",
                        Template: a.default
                    },
                    closeIcon: {
                        Attributes: {
                            class: "modal-close-icon",
                            "data-modal-close": ""
                        }
                    }
                },
                DialogRole: {
                    Selector: "[data-modal-element-overlay]",
                    Attributes: {
                        "aria-modal": "true",
                        role: "dialog",
                        tabindex: "-1",
                        "aria-hidden": "true"
                    }
                },
                Keyboard: {
                    close: {
                        keys: [n.default.ESCAPE]
                    },
                    open: {
                        keys: []
                    }
                },
                Events: {
                    CONTENT_APPENDED: "contentappended",
                    RENDERED: "rendered",
                    WILLOPEN: "willopen",
                    OPEN: "open",
                    WILLCLOSE: "willclose",
                    CLOSE: "close",
                    CONTENT_REMOVED: "contentremoved"
                }
            };
        i.default = o
    }
        , {
        36: 36,
        62: 62,
        82: 82,
        83: 83
    }],
    66: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        i.default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.12,10l4.07-4.06a1.5,1.5,0,1,0-2.11-2.12L10,7.88,5.94,3.81A1.5,1.5,0,1,0,3.82,5.93L7.88,10,3.81,14.06a1.5,1.5,0,0,0,0,2.12,1.51,1.51,0,0,0,2.13,0L10,12.12l4.06,4.07a1.45,1.45,0,0,0,1.06.44,1.5,1.5,0,0,0,1.06-2.56Z"/></svg>'
    }
        , {}],
    67: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var s = {
            created() {
                this.options.gum || this._isVue || (this.anim ? (this.anim.on(this.anim.model.PageEvents.ON_RESIZE_IMMEDIATE, this.onResizeImmediate),
                    this.anim.on(this.anim.model.PageEvents.ON_RESIZE_DEBOUNCED, this.onResizeDebounced),
                    this.anim.on(this.anim.model.PageEvents.ON_BREAKPOINT_CHANGE, this.onBreakpointChange)) : (window.addEventListener("resize", this.onResizeImmediate),
                        this.viewportEmitterMicro.on(this.viewportEmitterMicro.CHANGE_EVENTS.VIEWPORT, this.onBreakpointChange)),
                    this._mountedRaf = requestAnimationFrame(this.mounted))
            },
            onResizeImmediate() {
                this.anim || (window.clearTimeout(this._resizeTimeout),
                    this._resizeTimeout = window.setTimeout(this.onResizeDebounced, 250))
            },
            destroy() {
                cancelAnimationFrame(this._mountedRaf),
                    this.anim ? (this.anim.off(this.anim.model.PageEvents.ON_RESIZE_IMMEDIATE, this.onResizeImmediate),
                        this.anim.off(this.anim.model.PageEvents.ON_RESIZE_DEBOUNCED, this.onResizeDebounced),
                        this.anim.off(this.anim.model.PageEvents.ON_BREAKPOINT_CHANGE, this.onBreakpointChange)) : (window.removeEventListener("resize", this.onResizeImmediate),
                            this.viewportEmitterMicro.off(this.viewportEmitterMicro.CHANGE_EVENTS.VIEWPORT, this.onBreakpointChange))
            }
        };
        i.default = s
    }
        , {}],
    68: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var s = {
            created() {
                this.close = this.close.bind(this)
            },
            onWillOpen() {
                this._attachCloseEvents()
            },
            onClose() {
                this._removeCloseEvents(),
                    document.documentElement.classList.remove(...this.model.Open.Document.ClassNames),
                    this.elements.container.classList.remove(...this.model.Open.Container.ClassNames)
            },
            mounted() {
                this.close.elements = Array.from(document.querySelectorAll(this.model.Close.Selector))
            },
            destroy() {
                this.close()
            },
            close(e) {
                this.opened && (e && "click" === e.type && !this.close.elements.includes(e.target) || (this.trigger(this.model.Events.WILLCLOSE),
                    this.trigger(this.model.Events.CLOSE)))
            },
            _removeCloseEvents() {
                this.elements.container && this.elements.container.removeEventListener("click", this.close)
            },
            _attachCloseEvents() {
                this.elements.container && this.elements.container.addEventListener("click", this.close)
            }
        };
        i.default = s
    }
        , {}],
    69: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var s = e(76)
            , n = [s.Close, s.CloseButton];
        i.default = n
    }
        , {
        76: 76
    }],
    70: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var s = {
            created() {
                this.onCloseButtonClick = this.onCloseButtonClick.bind(this)
            },
            beforeMount() {
                this._setCloseAriaLabel(),
                    this.appendCloseButton()
            },
            mounted() {
                this.elements.closeButton.addEventListener("click", this.onCloseButtonClick)
            },
            destroy() {
                this.elements.closeButton.removeEventListener("click", this.onCloseButtonClick)
            },
            appendCloseButton() {
                (this.elements.container.querySelector(this.model.Elements.closeButton.ParentSelector) || this.elements.container).appendChild(this.elements.closeButton)
            },
            onCloseButtonClick(e) {
                this.close(e)
            },
            _setCloseAriaLabel() {
                if (this.elements.content && this.elements.content.dataset.modalCloseLabel) {
                    let e = this.elements.content.dataset.modalCloseLabel;
                    this.elements.closeButton.setAttribute("aria-label", e)
                }
            }
        };
        i.default = s
    }
        , {}],
    71: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var s = {
            created() {
                this._createModalElements()
            },
            beforeMount() {
                this._setDialogAriaLabel(),
                    this.appendModalElements()
            },
            destroy() {
                document.body.removeChild(this.elements.container),
                    this._releaseEvents();
                for (let e in this)
                    Object.prototype.hasOwnProperty.call(this, e) && (this[e] = null)
            },
            getModalElementKey(e) {
                let t;
                for (const i in e.dataset)
                    if (i.includes("modalElement")) {
                        const e = i.substring("modalElement".length);
                        t = e[0].toLowerCase() + e.slice(1)
                    }
                return t
            },
            appendContentElement() {
                this.appendContent(this.elements.content, this.elements.contentContainer),
                    this.trigger(this.model.Events.CONTENT_APPENDED)
            },
            appendModalElements() {
                document.body.appendChild(this.elements.container),
                    this.trigger(this.model.Events.RENDERED)
            },
            _createModalElements() {
                this._createTemplates(),
                    this._createElementsFromTemplate();
                for (const e in this.templates)
                    this._setChildElements(this.elements[e]);
                this._setDialogRoleElement(),
                    this._setElementAttributes(),
                    this.appendContentElement()
            },
            _createTemplates() {
                for (const e in this.model.Elements) {
                    const t = this.model.Elements[e].Template;
                    t && !this.templates[e] && (this.templates[e] = t)
                }
            },
            _createElementsFromTemplate() {
                for (const e in this.templates)
                    this.elements[e] = (new DOMParser).parseFromString(this.templates[e], "text/html").body.childNodes[0]
            },
            _setChildElements(e) {
                [...e.children].forEach(e => {
                    this.getModalElementKey(e) && (this.elements[this.getModalElementKey(e)] = e),
                        this._setChildElements(e)
                }
                )
            },
            _setDialogRoleElement() {
                this.dialogRoleElement || (this.dialogRoleElement = this.elements.container.querySelector(this.model.DialogRole.Selector) || this.elements.container);
                for (const e in this.model.DialogRole.Attributes)
                    this.dialogRoleElement.setAttribute(e, this.model.DialogRole.Attributes[e])
            },
            _setElementAttributes() {
                let e = {}
                    , t = {};
                for (const t in this.model.Elements)
                    this.model.Elements[t].Attributes && (e[t] = this.model.Elements[t].Attributes);
                for (const i in e) {
                    t[i] = Object.assign({}, e[i], this.options.attributes[i]);
                    for (const i in this.options.attributes)
                        "undefined" !== t[i] && (t[i] = Object.assign({}, e[i], this.options.attributes[i]))
                }
                for (const e in t)
                    for (const i in t[e]) {
                        let s = t[e][i];
                        if (!this.elements[e])
                            return;
                        switch (i) {
                            case "class":
                                Array.isArray(s) && (s = s.join(" ")),
                                    this.elements[e].className = "".concat(this.elements[e].className, " ").concat(s).trim();
                                break;
                            default:
                                this.elements[e].setAttribute(i, s)
                        }
                    }
            },
            _setDialogAriaLabel() {
                if (this.elements.content && this.elements.content.dataset.modalDialogLabel) {
                    let e = this.elements.content.dataset.modalDialogLabel;
                    this.dialogRoleElement.setAttribute("aria-label", e)
                } else
                    this.dialogRoleElement.hasAttribute("aria-label") || this.dialogRoleElement.hasAttribute("aria-labelledby") || this.dialogRoleElement.setAttribute("aria-label", "Modal")
            }
        };
        i.default = s
    }
        , {}],
    72: [function (e, t, i) {
        "use strict";
        var s = e(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var n = s(e(47))
            , r = s(e(48))
            , a = {
                created() {
                    this.scrollToModalTop = this.scrollToModalTop.bind(this)
                },
                mounted() {
                    r.default.getTabbableElements(this.dialogRoleElement).length && (this._circularTab = new n.default(this.dialogRoleElement))
                },
                onOpen() {
                    this._giveModalFocus()
                },
                onWillClose() {
                    this._removeModalFocus()
                },
                destroy() {
                    clearTimeout(this._focusTimeout),
                        this._removeModalFocus(),
                        this._circularTab && this._circularTab.destroy()
                },
                _giveModalFocus() {
                    this.dialogRoleElement.removeAttribute("aria-hidden"),
                        this.elements.container.classList.add("modal-touch-lock"),
                        this._activeElement = document.activeElement,
                        this._circularTab && this._circularTab.start(!0),
                        this.elements.container.addEventListener("scroll", this.scrollToModalTop),
                        this._focusTimeout = setTimeout(() => {
                            this.dialogRoleElement.focus({
                                preventScroll: !0
                            }),
                                requestAnimationFrame(() => {
                                    this.elements.container.removeEventListener("scroll", this.scrollToModalTop),
                                        this.elements.container.classList.remove("modal-touch-lock")
                                }
                                )
                        }
                            , 300)
                },
                _removeModalFocus() {
                    this._circularTab && this._circularTab.stop(),
                        this.dialogRoleElement.setAttribute("aria-hidden", "true"),
                        this.elements.container.removeEventListener("scroll", this.scrollToModalTop),
                        this._activeElement && (this._activeElement.focus(),
                            this._activeElement = null)
                }
            };
        i.default = a
    }
        , {
        36: 36,
        47: 47,
        48: 48
    }],
    73: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var s = {
            beforeCreate() {
                this.model.Open.Document.ClassNames.push("has-modal-full-bleed")
            },
            beforeMount() {
                this.elements.container.classList.add(...this.model.FullBleed.ClassNames)
            },
            destroy() {
                this.elements.container.classList.remove(...this.model.FullBleed.ClassNames)
            }
        };
        i.default = s
    }
        , {}],
    74: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var s = e(76)
            , n = [...s.CloseBundle, s.Focus, s.Keyboard, s.Open, s.FullBleed, s.ScrollPosition];
        i.default = n
    }
        , {
        76: 76
    }],
    75: [function (e, t, i) {
        "use strict";
        const s = e(59);
        t.exports = {
            beforeCreate() {
                this._keysToOpen = this.model.Keyboard.open.keys,
                    this._keysToClose = this.model.Keyboard.close.keys,
                    this._enabledKeysToOpen = [],
                    this._enabledKeysToClose = []
            },
            onWillOpen() {
                this._keysToOpen.forEach(this.disableKeyToOpen, this),
                    this._keysToClose.forEach(this.enableKeyToClose, this)
            },
            onWillClose() {
                this._keysToOpen.forEach(this.enableKeyToOpen, this),
                    this._keysToClose.forEach(this.disableKeyToClose, this)
            },
            destroy() {
                this._keysToOpen.forEach(this.disableKeyToOpen, this),
                    this._keysToClose.forEach(this.disableKeyToClose, this)
            },
            addKeyToOpen(e) {
                -1 === this._keysToOpen.indexOf(e) && (this._keysToOpen.push(e),
                    this.enableKeyToOpen(e))
            },
            addKeyToClose(e) {
                -1 === this._keysToClose.indexOf(e) && (this._keysToClose.push(e),
                    this.enableKeyToClose(e))
            },
            removeKeyToOpen(e) {
                const t = this._keysToOpen.indexOf(e);
                -1 !== t && (this._keysToOpen.splice(t, 1),
                    this.disableKeyToOpen(e))
            },
            removeAllKeysToOpen() {
                this._keysToOpen.forEach(this.disableKeyToOpen, this),
                    this._keysToOpen.splice(0, this._keysToOpen.length)
            },
            removeKeyToClose(e) {
                const t = this._keysToClose.indexOf(e);
                -1 !== t && (this._keysToClose.splice(t, 1),
                    this.disableKeyToClose(e))
            },
            removeAllKeysToClose() {
                this._keysToClose.forEach(this.disableKeyToClose, this),
                    this._keysToClose.splice(0, this._keysToClose.length)
            },
            enableKeyToOpen(e) {
                -1 === this._enabledKeysToOpen.indexOf(e) && (s.onUp(e, this.open, this),
                    this._enabledKeysToOpen.push(e))
            },
            enableKeyToClose(e) {
                -1 === this._enabledKeysToClose.indexOf(e) && (s.onUp(e, this.close, this),
                    this._enabledKeysToClose.push(e))
            },
            disableKeyToOpen(e) {
                const t = this._enabledKeysToOpen.indexOf(e);
                -1 !== t && (s.offUp(e, this.open, this),
                    this._enabledKeysToOpen.splice(t, 1))
            },
            disableKeyToClose(e) {
                const t = this._enabledKeysToClose.indexOf(e);
                -1 !== t && (s.offUp(e, this.close, this),
                    this._enabledKeysToClose.splice(t, 1))
            }
        }
    }
        , {
        59: 59
    }],
    76: [function (e, t, i) {
        "use strict";
        var s = e(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            Object.defineProperty(i, "Close", {
                enumerable: !0,
                get: function () {
                    return n.default
                }
            }),
            Object.defineProperty(i, "CloseButton", {
                enumerable: !0,
                get: function () {
                    return r.default
                }
            }),
            Object.defineProperty(i, "Focus", {
                enumerable: !0,
                get: function () {
                    return a.default
                }
            }),
            Object.defineProperty(i, "FullBleed", {
                enumerable: !0,
                get: function () {
                    return o.default
                }
            }),
            Object.defineProperty(i, "Keyboard", {
                enumerable: !0,
                get: function () {
                    return l.default
                }
            }),
            Object.defineProperty(i, "Open", {
                enumerable: !0,
                get: function () {
                    return c.default
                }
            }),
            Object.defineProperty(i, "PageOverlay", {
                enumerable: !0,
                get: function () {
                    return h.default
                }
            }),
            Object.defineProperty(i, "ScrollPosition", {
                enumerable: !0,
                get: function () {
                    return d.default
                }
            }),
            Object.defineProperty(i, "CloseBundle", {
                enumerable: !0,
                get: function () {
                    return u.default
                }
            }),
            Object.defineProperty(i, "FullBleedBundle", {
                enumerable: !0,
                get: function () {
                    return m.default
                }
            }),
            Object.defineProperty(i, "PageOverlayBundle", {
                enumerable: !0,
                get: function () {
                    return p.default
                }
            });
        var n = s(e(68))
            , r = s(e(70))
            , a = s(e(72))
            , o = s(e(73))
            , l = s(e(75))
            , c = s(e(77))
            , h = s(e(78))
            , d = s(e(80))
            , u = s(e(69))
            , m = s(e(74))
            , p = s(e(79))
    }
        , {
        36: 36,
        68: 68,
        69: 69,
        70: 70,
        72: 72,
        73: 73,
        74: 74,
        75: 75,
        77: 77,
        78: 78,
        79: 79,
        80: 80
    }],
    77: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var s = {
            created() {
                this.open = this.open.bind(this)
            },
            onWillOpen() {
                document.documentElement.classList.add(...this.model.Open.Document.ClassNames),
                    this.elements.container.classList.add(...this.model.Open.Container.ClassNames),
                    this.scrollToModalTop()
            },
            open() {
                this.opened || (this.trigger(this.model.Events.WILLOPEN),
                    this.trigger(this.model.Events.OPEN))
            }
        };
        i.default = s
    }
        , {}],
    78: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var s = {
            beforeCreate() {
                this.model.Open.Document.ClassNames.push("has-modal-page-overlay"),
                    this._scrollBarWidth = 0
            },
            beforeMount() {
                this.elements.container.classList.add(...this.model.PageOverlay.ClassNames)
            },
            mounted() {
                this._saveScrollBarWidth()
            },
            onResizeDebounced() {
                this.opened || this._saveScrollBarWidth()
            },
            onWillOpen() {
                document.documentElement.style.setProperty("--modal-scrollbar-buffer", this._scrollBarWidth)
            },
            onClose() {
                document.documentElement.style.removeProperty("--modal-scrollbar-buffer")
            },
            destroy() {
                this.elements.container.classList.remove(...this.model.PageOverlay.ClassNames)
            },
            _saveScrollBarWidth() {
                this._scrollBarWidth = "".concat(window.innerWidth - document.body.clientWidth, "px")
            }
        };
        i.default = s
    }
        , {}],
    79: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var s = e(76)
            , n = [...s.CloseBundle, s.Focus, s.Keyboard, s.Open, s.PageOverlay, s.ScrollPosition];
        i.default = n
    }
        , {
        76: 76
    }],
    80: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var s = {
            created() {
                this._scrollX = 0,
                    this._scrollY = 0
            },
            onWillOpen() {
                this._saveScrollPosition()
            },
            onClose() {
                this._restoreScrollPosition()
            },
            _saveScrollPosition() {
                this._scrollX = document.documentElement.scrollLeft,
                    this._scrollY = document.documentElement.scrollTop
            },
            _restoreScrollPosition() {
                window.scrollTo(this._scrollX, this._scrollY)
            }
        };
        i.default = s
    }
        , {}],
    81: [function (e, t, i) {
        "use strict";
        var s = e(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var n = s(e(204))
            , r = {
                beforeCreate() {
                    document.body._animInfo ? (this.anim = document.body._animInfo.group.anim,
                        this._setViewport(this.anim.model.pageMetrics)) : (this.viewportEmitterMicro = new n.default,
                            this.viewportEmitterMicro.CHANGE_EVENTS = n.default.CHANGE_EVENTS,
                            this._setViewport(this.viewportEmitterMicro))
                },
                onBreakpointChange(e) {
                    this._setViewport(e),
                        this._setPreviousViewport(e)
                },
                onOpen() {
                    this.opened = !0
                },
                onClose() {
                    this.opened = !1
                },
                _setViewport(e) {
                    this._viewport = this.anim ? this._getValidViewport(e.breakpoint) : this._getValidViewport(e.viewport)
                },
                _setPreviousViewport(e) {
                    this._previousViewport = this.anim ? this._getValidViewport(e.previousBreakpoint) : this._getValidViewport(e.oldViewport)
                },
                _getValidViewport(e) {
                    const t = {
                        X: "L",
                        L: "L",
                        M: "M",
                        S: "S"
                    };
                    if (!Object.keys(t).includes(e))
                        throw "The viewport ".concat(e, " is not valid. Valid viewports are: ").concat(Object.keys(t));
                    return t[e] || ""
                }
            };
        i.default = r
    }
        , {
        204: 204,
        36: 36
    }],
    82: [function (e, t, i) {
        "use strict";
        var s = e(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var n = s(e(66))
            , r = "<button data-modal-element-close-button>\n\t<span data-modal-element-close-icon>".concat(n.default, "</span>\n</button>");
        i.default = r
    }
        , {
        36: 36,
        66: 66
    }],
    83: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        i.default = '<div class="modal" data-modal-element-container data-modal-close>\n\t<div class="modal-overlay-container" data-modal-element-overlay-container data-modal-close>\n\t\t<div class="modal-overlay" data-modal-element-overlay data-modal-close-button-parent>\n\t\t\t<div class="modal-content-container" data-modal-element-content-container></div>\n\t\t</div>\n\t</div>\n</div>'
    }
        , {}],
    84: [function (e, t, i) {
        "use strict";
        e(39);
        var s = e(86)
            , n = Object.prototype.hasOwnProperty;
        t.exports = function (e, t) {
            return t ? function e(t, i) {
                var s;
                for (s in i)
                    n.call(i, s) && (null === i[s] ? t[s] = null : "object" == typeof i[s] ? (t[s] = Array.isArray(i[s]) ? [] : {},
                        e(t[s], i[s])) : t[s] = i[s]);
                return t
            }({}, e) : s({}, e)
        }
    }
        , {
        39: 39,
        86: 86
    }],
    85: [function (e, t, i) {
        "use strict";
        var s = e(86);
        t.exports = function (e, t) {
            if ("object" != typeof e)
                throw new TypeError("defaults: must provide a defaults object");
            if ("object" != typeof (t = t || {}))
                throw new TypeError("defaults: options must be a typeof object");
            return s({}, e, t)
        }
    }
        , {
        86: 86
    }],
    86: [function (e, t, i) {
        "use strict";
        e(39);
        var s = Object.prototype.hasOwnProperty;
        t.exports = function () {
            var e, t;
            return e = arguments.length < 2 ? [{}, arguments[0]] : [].slice.call(arguments),
                t = e.shift(),
                e.forEach((function (e) {
                    if (null != e)
                        for (var i in e)
                            s.call(e, i) && (t[i] = e[i])
                }
                )),
                t
        }
    }
        , {
        39: 39
    }],
    87: [function (e, t, i) {
        "use strict";
        t.exports = {
            majorVersionNumber: "3.x"
        }
    }
        , {}],
    88: [function (e, t, i) {
        "use strict";
        t.exports = {
            RAFEmitter: e(89),
            ThrottledRAFEmitter: e(94),
            update: e(102),
            external: e(99),
            draw: e(98),
            cancelUpdate: e(97),
            cancelExternal: e(96),
            cancelDraw: e(95),
            RAFExecutor: e(90),
            sharedRAFExecutorInstance: e(101)
        }
    }
        , {
        101: 101,
        102: 102,
        89: 89,
        90: 90,
        94: 94,
        95: 95,
        96: 96,
        97: 97,
        98: 98,
        99: 99
    }],
    89: [function (e, t, i) {
        "use strict";
        var s, n = e(34).EventEmitterMicro, r = e(101), a = e(100);
        function o(e) {
            e = e || {},
                n.call(this),
                this.id = a.getNewID(),
                this.executor = e.executor || r,
                this._reset(),
                this._willRun = !1,
                this._didDestroy = !1
        }
        (s = o.prototype = Object.create(n.prototype)).run = function () {
            return this._willRun || (this._willRun = !0),
                this._subscribe()
        }
            ,
            s.cancel = function () {
                this._unsubscribe(),
                    this._willRun && (this._willRun = !1),
                    this._reset()
            }
            ,
            s.destroy = function () {
                var e = this.willRun();
                return this.cancel(),
                    this.executor = null,
                    n.prototype.destroy.call(this),
                    this._didDestroy = !0,
                    e
            }
            ,
            s.willRun = function () {
                return this._willRun
            }
            ,
            s.isRunning = function () {
                return this._isRunning
            }
            ,
            s._subscribe = function () {
                return this.executor.subscribe(this)
            }
            ,
            s._unsubscribe = function () {
                return this.executor.unsubscribe(this)
            }
            ,
            s._onAnimationFrameStart = function (e) {
                this._isRunning = !0,
                    this._willRun = !1,
                    this._didEmitFrameData || (this._didEmitFrameData = !0,
                        this.trigger("start", e))
            }
            ,
            s._onAnimationFrameEnd = function (e) {
                this._willRun || (this.trigger("stop", e),
                    this._reset())
            }
            ,
            s._reset = function () {
                this._didEmitFrameData = !1,
                    this._isRunning = !1
            }
            ,
            t.exports = o
    }
        , {
        100: 100,
        101: 101,
        34: 34
    }],
    90: [function (e, t, i) {
        "use strict";
        var s, n = e(35);
        function r(e) {
            e = e || {},
                this._reset(),
                this.updatePhases(),
                this.eventEmitter = new n,
                this._willRun = !1,
                this._totalSubscribeCount = -1;
            var t = null
                , i = null;
            "undefined" != typeof window ? (t = window.requestAnimationFrame,
                i = window.cancelAnimationFrame) : t = i = function () { }
                ,
                this._requestAnimationFrame = t,
                this._cancelAnimationFrame = i,
                this._boundOnAnimationFrame = this._onAnimationFrame.bind(this),
                this._boundOnExternalAnimationFrame = this._onExternalAnimationFrame.bind(this)
        }
        (s = r.prototype).frameRequestedPhase = "requested",
            s.startPhase = "start",
            s.runPhases = ["update", "external", "draw"],
            s.endPhase = "end",
            s.disabledPhase = "disabled",
            s.beforePhaseEventPrefix = "before:",
            s.afterPhaseEventPrefix = "after:",
            s.subscribe = function (e, t) {
                return this._totalSubscribeCount++,
                    this._nextFrameSubscribers[e.id] || (t ? this._nextFrameSubscribersOrder.unshift(e.id) : this._nextFrameSubscribersOrder.push(e.id),
                        this._nextFrameSubscribers[e.id] = e,
                        this._nextFrameSubscriberArrayLength++,
                        this._nextFrameSubscriberCount++,
                        this._run()),
                    this._totalSubscribeCount
            }
            ,
            s.subscribeImmediate = function (e, t) {
                return this._totalSubscribeCount++,
                    this._subscribers[e.id] || (t ? this._subscribersOrder.splice(this._currentSubscriberIndex + 1, 0, e.id) : this._subscribersOrder.unshift(e.id),
                        this._subscribers[e.id] = e,
                        this._subscriberArrayLength++,
                        this._subscriberCount++),
                    this._totalSubscribeCount
            }
            ,
            s.unsubscribe = function (e) {
                return !!this._nextFrameSubscribers[e.id] && (this._nextFrameSubscribers[e.id] = null,
                    this._nextFrameSubscriberCount--,
                    0 === this._nextFrameSubscriberCount && this._cancel(),
                    !0)
            }
            ,
            s.getSubscribeID = function () {
                return this._totalSubscribeCount += 1
            }
            ,
            s.destroy = function () {
                var e = this._cancel();
                return this.eventEmitter.destroy(),
                    this.eventEmitter = null,
                    this.phases = null,
                    this._subscribers = null,
                    this._subscribersOrder = null,
                    this._nextFrameSubscribers = null,
                    this._nextFrameSubscribersOrder = null,
                    this._rafData = null,
                    this._boundOnAnimationFrame = null,
                    this._onExternalAnimationFrame = null,
                    e
            }
            ,
            s.useExternalAnimationFrame = function (e) {
                if ("boolean" == typeof e) {
                    var t = this._isUsingExternalAnimationFrame;
                    return e && this._animationFrame && (this._cancelAnimationFrame.call(window, this._animationFrame),
                        this._animationFrame = null),
                        !this._willRun || e || this._animationFrame || (this._animationFrame = this._requestAnimationFrame.call(window, this._boundOnAnimationFrame)),
                        this._isUsingExternalAnimationFrame = e,
                        e ? this._boundOnExternalAnimationFrame : t || !1
                }
            }
            ,
            s.updatePhases = function () {
                this.phases || (this.phases = []),
                    this.phases.length = 0,
                    this.phases.push(this.frameRequestedPhase),
                    this.phases.push(this.startPhase),
                    Array.prototype.push.apply(this.phases, this.runPhases),
                    this.phases.push(this.endPhase),
                    this._runPhasesLength = this.runPhases.length,
                    this._phasesLength = this.phases.length
            }
            ,
            s._run = function () {
                if (!this._willRun)
                    return this._willRun = !0,
                        0 === this.lastFrameTime && (this.lastFrameTime = performance.now()),
                        this._animationFrameActive = !0,
                        this._isUsingExternalAnimationFrame || (this._animationFrame = this._requestAnimationFrame.call(window, this._boundOnAnimationFrame)),
                        this.phase === this.disabledPhase && (this.phaseIndex = 0,
                            this.phase = this.phases[this.phaseIndex]),
                        !0
            }
            ,
            s._cancel = function () {
                var e = !1;
                return this._animationFrameActive && (this._animationFrame && (this._cancelAnimationFrame.call(window, this._animationFrame),
                    this._animationFrame = null),
                    this._animationFrameActive = !1,
                    this._willRun = !1,
                    e = !0),
                    this._isRunning || this._reset(),
                    e
            }
            ,
            s._onAnimationFrame = function (e) {
                for (this._subscribers = this._nextFrameSubscribers,
                    this._subscribersOrder = this._nextFrameSubscribersOrder,
                    this._subscriberArrayLength = this._nextFrameSubscriberArrayLength,
                    this._subscriberCount = this._nextFrameSubscriberCount,
                    this._nextFrameSubscribers = {},
                    this._nextFrameSubscribersOrder = [],
                    this._nextFrameSubscriberArrayLength = 0,
                    this._nextFrameSubscriberCount = 0,
                    this.phaseIndex = 0,
                    this.phase = this.phases[this.phaseIndex],
                    this._isRunning = !0,
                    this._willRun = !1,
                    this._didRequestNextRAF = !1,
                    this._rafData.delta = e - this.lastFrameTime,
                    this.lastFrameTime = e,
                    this._rafData.fps = 0,
                    this._rafData.delta >= 1e3 && (this._rafData.delta = 0),
                    0 !== this._rafData.delta && (this._rafData.fps = 1e3 / this._rafData.delta),
                    this._rafData.time = e,
                    this._rafData.naturalFps = this._rafData.fps,
                    this._rafData.timeNow = Date.now(),
                    this.phaseIndex++,
                    this.phase = this.phases[this.phaseIndex],
                    this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase),
                    this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++)
                    null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && !1 === this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._onAnimationFrameStart(this._rafData);
                for (this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase),
                    this._runPhaseIndex = 0; this._runPhaseIndex < this._runPhasesLength; this._runPhaseIndex++) {
                    for (this.phaseIndex++,
                        this.phase = this.phases[this.phaseIndex],
                        this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase),
                        this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++)
                        null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && !1 === this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]].trigger(this.phase, this._rafData);
                    this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase)
                }
                for (this.phaseIndex++,
                    this.phase = this.phases[this.phaseIndex],
                    this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase),
                    this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++)
                    null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && !1 === this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._onAnimationFrameEnd(this._rafData);
                this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase),
                    this._willRun ? (this.phaseIndex = 0,
                        this.phaseIndex = this.phases[this.phaseIndex]) : this._reset()
            }
            ,
            s._onExternalAnimationFrame = function (e) {
                this._isUsingExternalAnimationFrame && this._onAnimationFrame(e)
            }
            ,
            s._reset = function () {
                this._rafData || (this._rafData = {}),
                    this._rafData.time = 0,
                    this._rafData.delta = 0,
                    this._rafData.fps = 0,
                    this._rafData.naturalFps = 0,
                    this._rafData.timeNow = 0,
                    this._subscribers = {},
                    this._subscribersOrder = [],
                    this._currentSubscriberIndex = -1,
                    this._subscriberArrayLength = 0,
                    this._subscriberCount = 0,
                    this._nextFrameSubscribers = {},
                    this._nextFrameSubscribersOrder = [],
                    this._nextFrameSubscriberArrayLength = 0,
                    this._nextFrameSubscriberCount = 0,
                    this._didEmitFrameData = !1,
                    this._animationFrame = null,
                    this._animationFrameActive = !1,
                    this._isRunning = !1,
                    this._shouldReset = !1,
                    this.lastFrameTime = 0,
                    this._runPhaseIndex = -1,
                    this.phaseIndex = -1,
                    this.phase = this.disabledPhase
            }
            ,
            t.exports = r
    }
        , {
        35: 35
    }],
    91: [function (e, t, i) {
        "use strict";
        var s = e(93)
            , n = function (e) {
                this.phase = e,
                    this.rafEmitter = new s,
                    this._cachePhaseIndex(),
                    this.requestAnimationFrame = this.requestAnimationFrame.bind(this),
                    this.cancelAnimationFrame = this.cancelAnimationFrame.bind(this),
                    this._onBeforeRAFExecutorStart = this._onBeforeRAFExecutorStart.bind(this),
                    this._onBeforeRAFExecutorPhase = this._onBeforeRAFExecutorPhase.bind(this),
                    this._onAfterRAFExecutorPhase = this._onAfterRAFExecutorPhase.bind(this),
                    this.rafEmitter.on(this.phase, this._onRAFExecuted.bind(this)),
                    this.rafEmitter.executor.eventEmitter.on("before:start", this._onBeforeRAFExecutorStart),
                    this.rafEmitter.executor.eventEmitter.on("before:" + this.phase, this._onBeforeRAFExecutorPhase),
                    this.rafEmitter.executor.eventEmitter.on("after:" + this.phase, this._onAfterRAFExecutorPhase),
                    this._frameCallbacks = [],
                    this._currentFrameCallbacks = [],
                    this._nextFrameCallbacks = [],
                    this._phaseActive = !1,
                    this._currentFrameID = -1,
                    this._cancelFrameIdx = -1,
                    this._frameCallbackLength = 0,
                    this._currentFrameCallbacksLength = 0,
                    this._nextFrameCallbacksLength = 0,
                    this._frameCallbackIteration = 0
            }
            , r = n.prototype;
        r.requestAnimationFrame = function (e, t) {
            return !0 === t && this.rafEmitter.executor.phaseIndex > 0 && this.rafEmitter.executor.phaseIndex <= this.phaseIndex ? this._phaseActive ? (this._currentFrameID = this.rafEmitter.executor.subscribeImmediate(this.rafEmitter, !0),
                this._frameCallbacks.push(this._currentFrameID, e),
                this._frameCallbackLength += 2) : (this._currentFrameID = this.rafEmitter.executor.subscribeImmediate(this.rafEmitter, !1),
                    this._currentFrameCallbacks.push(this._currentFrameID, e),
                    this._currentFrameCallbacksLength += 2) : (this._currentFrameID = this.rafEmitter.run(),
                        this._nextFrameCallbacks.push(this._currentFrameID, e),
                        this._nextFrameCallbacksLength += 2),
                this._currentFrameID
        }
            ,
            r.cancelAnimationFrame = function (e) {
                this._cancelFrameIdx = this._nextFrameCallbacks.indexOf(e),
                    this._cancelFrameIdx > -1 ? this._cancelNextAnimationFrame() : (this._cancelFrameIdx = this._currentFrameCallbacks.indexOf(e),
                        this._cancelFrameIdx > -1 ? this._cancelCurrentAnimationFrame() : (this._cancelFrameIdx = this._frameCallbacks.indexOf(e),
                            this._cancelFrameIdx > -1 && this._cancelRunningAnimationFrame()))
            }
            ,
            r._onRAFExecuted = function (e) {
                for (this._frameCallbackIteration = 0; this._frameCallbackIteration < this._frameCallbackLength; this._frameCallbackIteration += 2)
                    this._frameCallbacks[this._frameCallbackIteration + 1](e.time, e);
                this._frameCallbacks.length = 0,
                    this._frameCallbackLength = 0
            }
            ,
            r._onBeforeRAFExecutorStart = function () {
                Array.prototype.push.apply(this._currentFrameCallbacks, this._nextFrameCallbacks.splice(0, this._nextFrameCallbacksLength)),
                    this._currentFrameCallbacksLength = this._nextFrameCallbacksLength,
                    this._nextFrameCallbacks.length = 0,
                    this._nextFrameCallbacksLength = 0
            }
            ,
            r._onBeforeRAFExecutorPhase = function () {
                this._phaseActive = !0,
                    Array.prototype.push.apply(this._frameCallbacks, this._currentFrameCallbacks.splice(0, this._currentFrameCallbacksLength)),
                    this._frameCallbackLength = this._currentFrameCallbacksLength,
                    this._currentFrameCallbacks.length = 0,
                    this._currentFrameCallbacksLength = 0
            }
            ,
            r._onAfterRAFExecutorPhase = function () {
                this._phaseActive = !1
            }
            ,
            r._cachePhaseIndex = function () {
                this.phaseIndex = this.rafEmitter.executor.phases.indexOf(this.phase)
            }
            ,
            r._cancelRunningAnimationFrame = function () {
                this._frameCallbacks.splice(this._cancelFrameIdx, 2),
                    this._frameCallbackLength -= 2
            }
            ,
            r._cancelCurrentAnimationFrame = function () {
                this._currentFrameCallbacks.splice(this._cancelFrameIdx, 2),
                    this._currentFrameCallbacksLength -= 2
            }
            ,
            r._cancelNextAnimationFrame = function () {
                this._nextFrameCallbacks.splice(this._cancelFrameIdx, 2),
                    this._nextFrameCallbacksLength -= 2,
                    0 === this._nextFrameCallbacksLength && this.rafEmitter.cancel()
            }
            ,
            t.exports = n
    }
        , {
        93: 93
    }],
    92: [function (e, t, i) {
        "use strict";
        var s = e(91)
            , n = function () {
                this.events = {}
            }
            , r = n.prototype;
        r.requestAnimationFrame = function (e) {
            return this.events[e] || (this.events[e] = new s(e)),
                this.events[e].requestAnimationFrame
        }
            ,
            r.cancelAnimationFrame = function (e) {
                return this.events[e] || (this.events[e] = new s(e)),
                    this.events[e].cancelAnimationFrame
            }
            ,
            t.exports = new n
    }
        , {
        91: 91
    }],
    93: [function (e, t, i) {
        "use strict";
        var s = e(89)
            , n = function (e) {
                s.call(this, e)
            };
        (n.prototype = Object.create(s.prototype))._subscribe = function () {
            return this.executor.subscribe(this, !0)
        }
            ,
            t.exports = n
    }
        , {
        89: 89
    }],
    94: [function (e, t, i) {
        "use strict";
        var s, n = e(89), r = e(34).EventEmitterMicro;
        function a(e, t) {
            r.call(this),
                t = t || {},
                this._fps = e || 0,
                this._delta = 0,
                this._currentFps = 0,
                this._rafEmitter = t.rafEmitter || new n,
                this._lastThrottledTime = 0,
                this._didEmitFrameData = !1,
                this._rafEmitterEvent = null,
                this._shouldDraw = !1,
                this._boundOnRAFEmitterUpdate = this._onRAFEmitterUpdate.bind(this),
                this._boundOnRAFEmitterDraw = this._onRAFEmitterDraw.bind(this),
                this._boundOnRAFEmitterStop = this._onRAFEmitterStop.bind(this),
                this._rafEmitter.on("update", this._boundOnRAFEmitterUpdate),
                this._rafEmitter.on("draw", this._boundOnRAFEmitterDraw),
                this._rafEmitter.on("stop", this._boundOnRAFEmitterStop)
        }
        (s = a.prototype = Object.create(r.prototype)).setFps = function (e) {
            return e !== this._fps && (this._fps = e,
                !0)
        }
            ,
            s.getFps = function () {
                return this._fps
            }
            ,
            s.run = function () {
                return this._rafEmitter.run()
            }
            ,
            s.cancel = function () {
                return this._rafEmitter.cancel()
            }
            ,
            s.willRun = function () {
                return this._rafEmitter.willRun()
            }
            ,
            s.isRunning = function () {
                return this._rafEmitter.isRunning()
            }
            ,
            s.destroy = function () {
                var e = this._rafEmitter.destroy();
                return r.prototype.destroy.call(this),
                    this._rafEmitter = null,
                    this._boundOnRAFEmitterUpdate = null,
                    this._boundOnRAFEmitterDraw = null,
                    this._boundOnRAFEmitterStop = null,
                    this._rafEmitterEvent = null,
                    e
            }
            ,
            s._onRAFEmitterUpdate = function (e) {
                if (0 === this._lastThrottledTime && (this._lastThrottledTime = this._rafEmitter.executor.lastFrameTime),
                    this._delta = e.time - this._lastThrottledTime,
                    !this._fps)
                    throw new TypeError("FPS is not defined.");
                this._currentFps = 1e3 / this._delta,
                    this._currentFps > this._fps ? this._rafEmitter.run() : (this._rafEmitterEvent = Object.assign({}, e),
                        this._rafEmitterEvent.delta = this._delta,
                        this._rafEmitterEvent.fps = this._currentFps,
                        this._lastThrottledTime = this._rafEmitterEvent.time,
                        this._shouldDraw = !0,
                        this._didEmitFrameData || (this.trigger("start", this._rafEmitterEvent),
                            this._didEmitFrameData = !0),
                        this.trigger("update", this._rafEmitterEvent))
            }
            ,
            s._onRAFEmitterDraw = function () {
                this._shouldDraw && (this._shouldDraw = !1,
                    this.trigger("draw", this._rafEmitterEvent))
            }
            ,
            s._onRAFEmitterStop = function () {
                this._lastThrottledTime = 0,
                    this._didEmitFrameData = !1,
                    this.trigger("stop", this._rafEmitterEvent)
            }
            ,
            t.exports = a
    }
        , {
        34: 34,
        89: 89
    }],
    95: [function (e, t, i) {
        "use strict";
        var s = e(92);
        t.exports = s.cancelAnimationFrame("draw")
    }
        , {
        92: 92
    }],
    96: [function (e, t, i) {
        "use strict";
        var s = e(92);
        t.exports = s.cancelAnimationFrame("external")
    }
        , {
        92: 92
    }],
    97: [function (e, t, i) {
        "use strict";
        var s = e(92);
        t.exports = s.cancelAnimationFrame("update")
    }
        , {
        92: 92
    }],
    98: [function (e, t, i) {
        "use strict";
        var s = e(92);
        t.exports = s.requestAnimationFrame("draw")
    }
        , {
        92: 92
    }],
    99: [function (e, t, i) {
        "use strict";
        var s = e(92);
        t.exports = s.requestAnimationFrame("external")
    }
        , {
        92: 92
    }],
    100: [function (e, t, i) {
        "use strict";
        var s = e(103).SharedInstance
            , n = e(87).majorVersionNumber
            , r = function () {
                this._currentID = 0
            };
        r.prototype.getNewID = function () {
            return this._currentID++,
                "raf:" + this._currentID
        }
            ,
            t.exports = s.share("@marcom/ac-raf-emitter/sharedRAFEmitterIDGeneratorInstance", n, r)
    }
        , {
        103: 103,
        87: 87
    }],
    101: [function (e, t, i) {
        "use strict";
        var s = e(103).SharedInstance
            , n = e(87).majorVersionNumber
            , r = e(90);
        t.exports = s.share("@marcom/ac-raf-emitter/sharedRAFExecutorInstance", n, r)
    }
        , {
        103: 103,
        87: 87,
        90: 90
    }],
    102: [function (e, t, i) {
        "use strict";
        var s = e(92);
        t.exports = s.requestAnimationFrame("update")
    }
        , {
        92: 92
    }],
    103: [function (e, t, i) {
        "use strict";
        t.exports = {
            SharedInstance: e(104)
        }
    }
        , {
        104: 104
    }],
    104: [function (e, t, i) {
        "use strict";
        var s, n = "undefined" != typeof window ? window : {}, r = n.AC, a = (s = {},
        {
            get: function (e, t) {
                var i = null;
                return s[e] && s[e][t] && (i = s[e][t]),
                    i
            },
            set: function (e, t, i) {
                return s[e] || (s[e] = {}),
                    s[e][t] = "function" == typeof i ? new i : i,
                    s[e][t]
            },
            share: function (e, t, i) {
                var s = this.get(e, t);
                return s || (s = this.set(e, t, i)),
                    s
            },
            remove: function (e, t) {
                var i = typeof t;
                if ("string" !== i && "number" !== i)
                    s[e] && (s[e] = null);
                else {
                    if (!s[e] || !s[e][t])
                        return;
                    s[e][t] = null
                }
            }
        });
        r || (r = n.AC = {}),
            r.SharedInstance || (r.SharedInstance = a),
            t.exports = r.SharedInstance
    }
        , {}],
    105: [function (e, t, i) {
        "use strict";
        t.exports = {
            joinSearchParams: e(106),
            parseSearchParams: e(107),
            parseURL: e(108)
        }
    }
        , {
        106: 106,
        107: 107,
        108: 108
    }],
    106: [function (e, t, i) {
        "use strict";
        t.exports = function (e, t) {
            var i = "";
            if (e) {
                var s = Object.keys(e)
                    , n = s.length - 1;
                s.forEach((function (t, s) {
                    var r = e[t]
                        , a = (t = t.trim()) + (r = null === (r = r && "string" == typeof r ? r.trim() : r) ? "" : "=" + r) + (s === n ? "" : "&");
                    i = i ? i.concat(a) : a
                }
                ))
            }
            return i && !1 !== t ? "?" + i : i
        }
    }
        , {}],
    107: [function (e, t, i) {
        "use strict";
        t.exports = function (e) {
            var t = (e = (e = e || window.location.search).replace(/^[^?]*\?/, "")) ? e.split("&") : []
                , i = {}
                , s = new RegExp("=");
            return t.forEach((function (e) {
                var t, n;
                if (s.test(e)) {
                    var r = e.split("=", 2);
                    t = r[0],
                        n = r[1]
                } else
                    t = e,
                        n = null;
                i[t] = n
            }
            )),
                i
        }
    }
        , {}],
    108: [function (e, t, i) {
        "use strict";
        var s = e(107);
        t.exports = function (e) {
            var t, i = "", n = !1;
            return e ? window.URL && "function" == typeof window.URL ? t = new URL(e, window.location) : ((t = document.createElement("a")).href = e,
                t.href = t.href,
                function (e) {
                    var t = e.port
                        , i = new RegExp(":" + t);
                    return t && !i.test(e.href) && i.test(e.host)
                }(t) && (i = t.host.replace(new RegExp(":" + t.port), ""),
                    n = !0)) : t = window.location,
            {
                hash: t.hash,
                host: i || t.host,
                hostname: t.hostname,
                href: t.href,
                origin: t.origin || t.protocol + "//" + (i || t.host),
                pathname: t.pathname,
                port: n ? "" : t.port,
                protocol: t.protocol,
                search: t.search,
                searchParams: s(t.search)
            }
        }
    }
        , {
        107: 107
    }],
    109: [function (e, t, i) {
        "use strict";
        class s {
            constructor(e = {}) {
                this.options = e,
                    "loading" === document.readyState ? document.addEventListener("readystatechange", e => {
                        "interactive" === document.readyState && this._init()
                    }
                    ) : this._init()
            }
            _init() {
                if (this._images = Array.from(document.querySelectorAll("*[".concat(s.DATA_ATTRIBUTE, "]"))),
                    this.AnimSystem = this._findAnim(),
                    null === this.AnimSystem)
                    return null;
                this._addKeyframesToImages()
            }
            _defineKeyframeOptions(e = null) {
                const t = e.getAttribute(s.DATA_DOWNLOAD_AREA_KEYFRAME) || "{}";
                return Object.assign({}, {
                    start: "t - 200vh",
                    end: "b + 100vh",
                    event: "AnimLazyImage"
                }, JSON.parse(t))
            }
            _addKeyframesToImages() {
                this._scrollGroup = this.AnimSystem.getGroupForTarget(document.body),
                    this._images.forEach(e => {
                        this.AnimSystem.getGroupForTarget(e) && (this._scrollGroup = this.AnimSystem.getGroupForTarget(e));
                        let t = this._defineKeyframeOptions(e);
                        this._scrollGroup.addKeyframe(e, t).controller.once("AnimLazyImage:enter", () => {
                            this._imageIsInLoadRange(e)
                        }
                        )
                    }
                    )
            }
            _cleanUpImageAttributes(e) {
                let t = !1;
                try {
                    t = this._scrollGroup.getControllerForTarget(e).getNearestKeyframeForAttribute("AnimLazyImage").isCurrentlyInRange
                } catch (e) {
                    t = !1
                }
                t || e.setAttribute(s.DATA_ATTRIBUTE, "")
            }
            _downloadingImageAttributes(e) {
                e.removeAttribute(s.DATA_ATTRIBUTE)
            }
            _imageIsInLoadRange(e) {
                this._downloadImage(e)
            }
            _downloadImage(e) {
                this._downloadingImageAttributes(e)
            }
            _findAnim() {
                var e = Array.from(document.querySelectorAll("[data-anim-group],[data-anim-scroll-group],[data-anim-time-group]"));
                return e.map(e => e._animInfo ? e._animInfo.group : null).filter(e => null !== e),
                    e[0] && e[0]._animInfo ? e[0]._animInfo.group.anim : (console.error("AnimLazyImage: AnimSystem not found, please initialize anim before instantiating"),
                        null)
            }
        }
        s.DATA_DOWNLOAD_AREA_KEYFRAME = "data-download-area-keyframe",
            s.DATA_ATTRIBUTE = "data-anim-lazy-image",
            t.exports = s
    }
        , {}],
    110: [function (e, t, i) {
        "use strict";
        class s {
            constructor() {
                this._events = {}
            }
            on(e, t) {
                return this._events[e] = this._events[e] || [],
                    this._events[e].unshift(t),
                    t
            }
            once(e, t) {
                const i = s => {
                    this.off(e, i),
                        void 0 !== s ? t(s) : t()
                }
                    ;
                return this.on(e, i)
            }
            off(e, t) {
                if (!this.has(e))
                    return;
                if (!t)
                    return void delete this._events[e];
                const i = this._events[e].indexOf(t);
                -1 !== i && this._events[e].splice(i, 1)
            }
            trigger(e, t) {
                if (this.has(e))
                    for (let i = this._events[e].length - 1; i >= 0; i--)
                        void 0 !== t ? this._events[e][i](t) : this._events[e][i]()
            }
            has(e) {
                return e in this._events && 0 !== this._events[e].length
            }
            destroy() {
                this._events = null
            }
        }
        s.EventEmitterMicro = s,
            t.exports = s
    }
        , {}],
    111: [function (e, t, i) {
        "use strict";
        t.exports = {
            version: "4.3.2",
            major: "4.x",
            majorMinor: "4.3"
        }
    }
        , {}],
    112: [function (e, t, i) {
        "use strict";
        const s = e(110)
            , n = e(119)
            , r = e(114)
            , a = e(115)
            , o = e(117)
            , l = e(138)
            , c = e(139)
            , h = e(140)
            , d = e(111)
            , { update: u, cancelUpdate: m } = e(198);
        let p = null;
        class f extends s {
            constructor() {
                if (super(),
                    p)
                    throw "You cannot create multiple AnimSystems. You probably want to create multiple groups instead. You can have unlimited groups on a page";
                p = this,
                    this.groups = [],
                    this.scrollSystems = [],
                    this.timeSystems = [],
                    this.tweenGroup = null,
                    this._forceUpdateRAFId = null,
                    this.initialized = !1,
                    this.model = n,
                    this.plugins = {
                        keyframe: [],
                        parser: []
                    },
                    this.version = d.version,
                    this._resolveReady = () => { }
                    ,
                    this.ready = new Promise(e => this._resolveReady = e),
                    this.onScroll = this.onScroll.bind(this),
                    this.onResizedDebounced = this.onResizedDebounced.bind(this),
                    this.onResizeImmediate = this.onResizeImmediate.bind(this)
            }
            initialize() {
                return this.initialized || "undefined" == typeof window || (this.initialized = !0,
                    this.timeSystems = [],
                    this.scrollSystems = [],
                    this.groups = [],
                    this.setupEvents(),
                    this.initializeResizeFilter(),
                    this.initializeModel(),
                    this.createDOMGroups(),
                    this.createDOMKeyframes(),
                    this.tweenGroup = new h(null, this),
                    this.groups.unshift(this.tweenGroup),
                    this._resolveReady()),
                    this.ready
            }
            use(e, t) {
                e.install(this, t)
            }
            remove() {
                return this.initialized ? Promise.all(this.groups.map(e => e.remove())).then(() => {
                    this.groups = [],
                        this.scrollSystems = [],
                        this.timeSystems = [],
                        window.clearTimeout(n.RESIZE_TIMEOUT),
                        window.removeEventListener("scroll", this.onScroll),
                        window.removeEventListener("resize", this.onResizeImmediate),
                        this._events = {},
                        this.initialized = !1,
                        this.ready = new Promise(e => this._resolveReady = e)
                }
                ) : (this.ready = new Promise(e => this._resolveReady = e),
                    Promise.resolve())
            }
            destroy() {
                return this.remove()
            }
            createTimeGroup(e, t) {
                e instanceof HTMLElement || (e = (t = e || {}).el);
                let i = new c(e, this);
                return t && t.name && (i.name = t.name),
                    this.groups.push(i),
                    this.timeSystems.push(i),
                    this.trigger(n.EVENTS.ON_GROUP_CREATED, i),
                    i
            }
            createScrollGroup(e, t) {
                if (!e)
                    throw "AnimSystem scroll based groups must supply an HTMLElement";
                let i = new l(e, this)
                    , s = t || {};
                return s.name && (i.name = s.name),
                    s.getPosition && s.getMaxPosition && (i.getPosition = s.getPosition,
                        i.createViewableRange = () => ({
                            a: 0,
                            d: s.getMaxPosition()
                        })),
                    i.getPosition = s.getPosition || i.getPosition,
                    i.getPosition = s.getPosition || i.getPosition,
                    this.groups.push(i),
                    this.scrollSystems.push(i),
                    this.trigger(n.EVENTS.ON_GROUP_CREATED, i),
                    i
            }
            removeGroup(e) {
                return e.destroyed || e.anim !== this ? Promise.resolve() : Promise.all(e.keyframeControllers.map(t => e.removeKeyframeController(t))).then(() => {
                    let t = this.groups.indexOf(e);
                    -1 !== t && this.groups.splice(t, 1),
                        t = this.scrollSystems.indexOf(e),
                        -1 !== t && this.scrollSystems.splice(t, 1),
                        t = this.timeSystems.indexOf(e),
                        -1 !== t && this.timeSystems.splice(t, 1),
                        e.destroyed || e.destroy()
                }
                )
            }
            createDOMGroups() {
                document.body.setAttribute("data-anim-scroll-group", "body"),
                    document.querySelectorAll("[data-anim-scroll-group]").forEach(e => this.createScrollGroup(e)),
                    document.querySelectorAll("[data-anim-time-group]").forEach(e => this.createTimeGroup(e)),
                    this.trigger(n.EVENTS.ON_DOM_GROUPS_CREATED, this.groups)
            }
            createDOMKeyframes() {
                let e = [];
                ["data-anim-keyframe", r.DATA_ATTRIBUTE, a.DATA_ATTRIBUTE, o.DATA_ATTRIBUTE].forEach((function (t) {
                    for (let i = 0; i < 12; i++)
                        e.push(t + (0 === i ? "" : "-" + (i - 1)))
                }
                ));
                for (let t = 0; t < e.length; t++) {
                    let i = e[t]
                        , s = document.querySelectorAll("[" + i + "]");
                    for (let e = 0; e < s.length; e++) {
                        const t = s[e]
                            , n = JSON.parse(t.getAttribute(i));
                        this.addKeyframe(t, n)
                    }
                }
                u(() => {
                    null !== this.groups && (this.groups.forEach(e => e.onKeyframesDirty({
                        silent: !0
                    })),
                        this.groups.forEach(e => e.trigger(n.EVENTS.ON_DOM_KEYFRAMES_CREATED, e)),
                        this.trigger(n.EVENTS.ON_DOM_KEYFRAMES_CREATED, this),
                        this.groups.forEach(e => {
                            e.forceUpdate({
                                waitForNextUpdate: !1,
                                silent: !0
                            }),
                                e.reconcile()
                        }
                        ),
                        this.onScroll())
                }
                )
            }
            initializeResizeFilter() {
                if (n.cssDimensionsTracker)
                    return;
                const e = document.querySelector(".cssDimensionsTracker") || document.createElement("div");
                e.setAttribute("cssDimensionsTracker", "true"),
                    e.style.position = "fixed",
                    e.style.top = "0",
                    e.style.width = "100%",
                    e.style.height = "100vh",
                    e.style.pointerEvents = "none",
                    e.style.visibility = "hidden",
                    e.style.zIndex = "-1",
                    document.documentElement.appendChild(e),
                    n.cssDimensionsTracker = e
            }
            initializeModel() {
                n.pageMetrics.windowHeight = n.cssDimensionsTracker.clientHeight,
                    n.pageMetrics.windowWidth = n.cssDimensionsTracker.clientWidth,
                    n.pageMetrics.scrollY = window.scrollY || window.pageYOffset,
                    n.pageMetrics.scrollX = window.scrollX || window.pageXOffset,
                    n.pageMetrics.breakpoint = n.getBreakpoint();
                let e = document.documentElement.getBoundingClientRect();
                n.pageMetrics.documentOffsetX = e.left + n.pageMetrics.scrollX,
                    n.pageMetrics.documentOffsetY = e.top + n.pageMetrics.scrollY
            }
            setupEvents() {
                window.removeEventListener("scroll", this.onScroll),
                    window.addEventListener("scroll", this.onScroll),
                    window.removeEventListener("resize", this.onResizeImmediate),
                    window.addEventListener("resize", this.onResizeImmediate)
            }
            onScroll() {
                n.pageMetrics.scrollY = window.scrollY || window.pageYOffset,
                    n.pageMetrics.scrollX = window.scrollX || window.pageXOffset;
                for (let e = 0, t = this.scrollSystems.length; e < t; e++)
                    this.scrollSystems[e].updateTimeline();
                this.trigger(n.PageEvents.ON_SCROLL, n.pageMetrics)
            }
            onResizeImmediate() {
                let e = n.cssDimensionsTracker.clientWidth
                    , t = n.cssDimensionsTracker.clientHeight;
                if (e === n.pageMetrics.windowWidth && t === n.pageMetrics.windowHeight)
                    return;
                n.pageMetrics.windowWidth = e,
                    n.pageMetrics.windowHeight = t,
                    n.pageMetrics.scrollY = window.scrollY || window.pageYOffset,
                    n.pageMetrics.scrollX = window.scrollX || window.pageXOffset;
                let i = document.documentElement.getBoundingClientRect();
                n.pageMetrics.documentOffsetX = i.left + n.pageMetrics.scrollX,
                    n.pageMetrics.documentOffsetY = i.top + n.pageMetrics.scrollY,
                    window.clearTimeout(n.RESIZE_TIMEOUT),
                    n.RESIZE_TIMEOUT = window.setTimeout(this.onResizedDebounced, 250),
                    this.trigger(n.PageEvents.ON_RESIZE_IMMEDIATE, n.pageMetrics)
            }
            onResizedDebounced() {
                u(() => {
                    let e = n.pageMetrics.breakpoint
                        , t = n.getBreakpoint();
                    if (t !== e) {
                        n.pageMetrics.previousBreakpoint = e,
                            n.pageMetrics.breakpoint = t;
                        for (let e = 0, t = this.groups.length; e < t; e++)
                            this.groups[e]._onBreakpointChange();
                        this.trigger(n.PageEvents.ON_BREAKPOINT_CHANGE, n.pageMetrics)
                    }
                    for (let e = 0, t = this.groups.length; e < t; e++)
                        this.groups[e].forceUpdate({
                            waitForNextUpdate: !1
                        });
                    this.trigger(n.PageEvents.ON_RESIZE_DEBOUNCED, n.pageMetrics)
                }
                )
            }
            forceUpdate({ waitForNextUpdate: e = !0, silent: t = !1 } = {}) {
                this._forceUpdateRAFId && (m(this._forceUpdateRAFId),
                    this._forceUpdateRAFId = null);
                let i = () => {
                    for (let e = 0, i = this.groups.length; e < i; e++) {
                        this.groups[e].forceUpdate({
                            waitForNextUpdate: !1,
                            silent: t
                        })
                    }
                    return null
                }
                    ;
                this._forceUpdateRAFId = e ? u(i) : i()
            }
            addKeyframe(e, t) {
                let i = this.getGroupForTarget(e);
                return i = i || this.getGroupForTarget(document.body),
                    i.addKeyframe(e, t)
            }
            addEvent(e, t) {
                let i = this.getGroupForTarget(e);
                return i = i || this.getGroupForTarget(document.body),
                    i.addEvent(e, t)
            }
            getTimeGroupForTarget(e) {
                return this._getGroupForTarget(e, e => e instanceof c)
            }
            getScrollGroupForTarget(e) {
                return this._getGroupForTarget(e, e => !(e instanceof c))
            }
            getGroupForTarget(e) {
                return this._getGroupForTarget(e, () => !0)
            }
            getGroupByName(e) {
                return this.groups.find(t => t.name === e) || null
            }
            _getGroupForTarget(e, t) {
                if (e._animInfo && e._animInfo.group && t(e._animInfo.group))
                    return e._animInfo.group;
                let i = e;
                for (; i;) {
                    if (i._animInfo && i._animInfo.isGroup && t(i._animInfo.group))
                        return i._animInfo.group;
                    i = i.parentElement
                }
                return null
            }
            getControllerForTarget(e) {
                return e._animInfo && e._animInfo.controller ? e._animInfo.controller : null
            }
            addTween(e, t) {
                if (null == this.tweenGroup)
                    throw new Error("TweenGroup not found");
                return this.tweenGroup.addTween(e, t)
            }
        }
        t.exports = "undefined" == typeof window ? new f : window.AC.SharedInstance.share("AnimSystem", d.major, f)
    }
        , {
        110: 110,
        111: 111,
        114: 114,
        115: 115,
        117: 117,
        119: 119,
        138: 138,
        139: 139,
        140: 140,
        198: 198
    }],
    113: [function (e, t, i) {
        "use strict";
        const s = e(119);
        class n {
            constructor(e, t) {
                this._index = 0,
                    this.keyframe = e,
                    t && (this.name = t)
            }
            get start() {
                return this.keyframe.jsonProps.start
            }
            set index(e) {
                this._index = e
            }
            get index() {
                return this._index
            }
        }
        t.exports = class {
            constructor(e) {
                this.timeGroup = e,
                    this.chapters = [],
                    this.chapterNames = {},
                    this.currentChapter = null,
                    this.tween = null,
                    this.destroyed = !1
            }
            destroy() {
                this.destroyed = !0,
                    this.tween && !this.tween.destroyed && this.tween.remove(),
                    this.tween = null
            }
            addChapter(e) {
                const { position: t, name: i } = e;
                if (void 0 === t)
                    throw ReferenceError("Cannot add chapter without target position.");
                0 === this.chapters.length && 0 !== e.position && this.addChapter({
                    position: 0
                });
                let s = this.timeGroup.addKeyframe(this, {
                    start: t,
                    end: t,
                    event: "Chapter"
                });
                this.timeGroup.forceUpdate({
                    waitForNextFrame: !1,
                    silent: !0
                });
                const r = new n(s, i || "");
                if (this.chapters.push(r),
                    i) {
                    if (this.chapterNames.hasOwnProperty(i))
                        throw ReferenceError('Duplicate chapter name assigned - "'.concat(i, '" is already in use'));
                    this.chapterNames[i] = r
                }
                return this.chapters.sort((e, t) => e.start - t.start).forEach((e, t) => e.index = t),
                    this.currentChapter = this.currentChapter || this.chapters[0],
                    r
            }
            playToChapter(e) {
                let t;
                if (e.hasOwnProperty("index"))
                    t = this.chapters[e.index];
                else {
                    if (!e.hasOwnProperty("name"))
                        throw ReferenceError("Cannot play to chapter without target index or name");
                    t = this.chapterNames[e.name]
                }
                if (!t || this.currentChapter === t && !0 !== e.force)
                    return null;
                let i = e.ease || "easeInOutCubic";
                this.tween && this.tween.controller && (this.tween.remove(),
                    i = e.ease || "easeOutQuint"),
                    this.timeGroup.timeScale(e.timeScale || 1);
                const n = void 0 !== e.duration ? e.duration : this.getDurationToChapter(t)
                    , r = this.timeGroup.time()
                    , a = t.start;
                let o = !1;
                return this.tween = this.timeGroup.anim.addTween({
                    time: r
                }, {
                    easeFunction: i,
                    duration: n,
                    time: [r, a],
                    onStart: () => {
                        this.destroyed || this.timeGroup.trigger(s.EVENTS.ON_CHAPTER_INITIATED, {
                            player: this,
                            next: t
                        })
                    }
                    ,
                    onDraw: e => {
                        if (this.destroyed)
                            return;
                        let i = e.tweenProps.time.current;
                        this.timeGroup.time(i),
                            e.keyframe.curvedT > .5 && !o && (o = !0,
                                this.currentIndex = t.index,
                                this.currentChapter = t,
                                this.timeGroup.trigger(s.EVENTS.ON_CHAPTER_OCCURRED, {
                                    player: this,
                                    current: t
                                }))
                    }
                    ,
                    onComplete: e => {
                        this.destroyed || (this.timeGroup.time(e.tweenProps.time.current),
                            this.timeGroup.trigger(s.EVENTS.ON_CHAPTER_COMPLETED, {
                                player: this,
                                current: t
                            }),
                            this.timeGroup.paused(!0),
                            this.tween = null)
                    }
                }),
                    this.tween
            }
            getDurationToChapter(e) {
                const t = this.chapters[e.index - 1] || this.chapters[e.index + 1];
                return Math.abs(t.start - e.start)
            }
        }
    }
        , {
        119: 119
    }],
    114: [function (e, t, i) {
        "use strict";
        const s = e(119)
            , n = e(135)
            , r = e(133)
            , a = e(199)
            , o = e(120)
            , l = e(128)
            , c = e(126)
            , h = e(143)
            , d = e(145)
            , u = e(144)
            , m = e(127)
            , { cssAttributes: p, suffixFreeAttributes: f, domAttributes: y } = e(130);
        class g {
            constructor(e, t) {
                this.controller = e,
                    this.anchors = [],
                    this.jsonProps = t,
                    this.ease = e.group.defaultEase,
                    this.easeFunction = o.linear,
                    this.start = 0,
                    this.end = 0,
                    this.localT = 0,
                    this.curvedT = 0,
                    this.id = 0,
                    this.event = "",
                    this.needsEventDispatch = !1,
                    this.snapAtCreation = !1,
                    this.isEnabled = !1,
                    this.animValues = {},
                    this.breakpointMask = s.KeyframeDefaults.breakpointMask,
                    this.disabledWhen = [],
                    this.keyframeType = s.KeyframeTypes.Interpolation,
                    this.hold = !1,
                    this.preserveState = !1,
                    this.markedForRemoval = !1,
                    this.hidden;
                let i = !1;
                Object.defineProperty(this, "hidden", {
                    get: () => i,
                    set(t) {
                        i = t,
                            e.group.keyframesDirty = !0
                    }
                }),
                    this.uuid = m(),
                    this.destroyed = !1
            }
            destroy() {
                this.destroyed = !0,
                    this.controller = null,
                    this.disabledWhen = null,
                    this.anchors = null,
                    this.jsonProps = null,
                    this.easeFunction = null,
                    this.animValues = null
            }
            remove() {
                return this.controller && this.controller.removeKeyframe(this)
            }
            parseOptions(e) {
                this.jsonProps = e,
                    e.relativeTo && console.error("KeyframeError: relativeTo has been removed. Use 'anchors' property instead. Found 'relativeTo':\"".concat(e.relativeTo, '"')),
                    void 0 === e.end && void 0 === e.duration && (e.end = e.start),
                    "" !== e.anchors && e.anchors ? (this.anchors = [],
                        e.anchors = Array.isArray(e.anchors) ? e.anchors : [e.anchors],
                        e.anchors.forEach((t, i) => {
                            let s = d(t, this.controller.group.element);
                            if (!s) {
                                let s = "";
                                return "string" == typeof t && (s = " Provided value was a string, so a failed attempt was made to find anchor with the provided querystring in group.element, or in the document."),
                                    void console.warn("Keyframe on", this.controller.element, " failed to find anchor at index ".concat(i, " in array"), e.anchors, ". Anchors must be JS Object references, Elements references, or valid query selector strings. ".concat(s))
                            }
                            this.anchors.push(s),
                                this.controller.group.metrics.add(s)
                        }
                        )) : (this.anchors = [],
                            e.anchors = []),
                    e.ease ? this.ease = parseFloat(e.ease) : e.ease = this.ease,
                    e.hasOwnProperty("snapAtCreation") ? this.snapAtCreation = e.snapAtCreation : e.snapAtCreation = this.snapAtCreation,
                    e.easeFunction || (e.easeFunction = s.KeyframeDefaults.easeFunctionString),
                    e.breakpointMask ? this.breakpointMask = e.breakpointMask : e.breakpointMask = this.breakpointMask,
                    e.disabledWhen ? this.disabledWhen = Array.isArray(e.disabledWhen) ? e.disabledWhen : [e.disabledWhen] : e.disabledWhen = this.disabledWhen,
                    e.hasOwnProperty("hold") ? this.hold = e.hold : e.hold = this.hold,
                    e.hasOwnProperty("preserveState") ? this.preserveState = e.preserveState : e.preserveState = s.KeyframeDefaults.preserveState,
                    this.easeFunction = o[e.easeFunction],
                    o.hasOwnProperty(e.easeFunction) || (e.easeFunction.includes("bezier") ? this.easeFunction = l.fromCSSString(e.easeFunction) : e.easeFunction.includes("spring") ? this.easeFunction = c.fromCSSString(e.easeFunction) : console.error("Keyframe parseOptions cannot find 'easeFunction' named '" + e.easeFunction + "'"));
                for (let t in e) {
                    if (-1 !== s.KeyframeJSONReservedWords.indexOf(t))
                        continue;
                    let i = e[t];
                    if (Array.isArray(i)) {
                        if (1 === i.length && (i[1] = i[0],
                            i[0] = null),
                            void 0 === this.controller.tweenProps[t] || !this.controller._ownerIsElement) {
                            let a = 0;
                            this.controller._ownerIsElement || (a = this.controller.element[t] || 0);
                            const o = t.startsWith("--");
                            let l = i[2] || (o || f.includes(t) ? void 0 : "px")
                                , c = this.controller.group.anim.plugins.keyframe.reduce((i, s) => i || s.parseProp.call(this, e, t), null);
                            if (!c && this.controller._ownerIsElement)
                                if (o || p.includes(t)) {
                                    let i = u(t)
                                        , n = e.round || ["z-index"].includes(i)
                                        , o = this.controller.getTargetComputedStyle();
                                    a = parseFloat(o.getPropertyValue(i)),
                                        isNaN(a) && (a = 0),
                                        c = new r(a, s.KeyframeDefaults.epsilon, this.snapAtCreation, t, n, l),
                                        this.controller.cssAttributes.push(c)
                                } else
                                    y.includes(t) && (c = new n(a, s.KeyframeDefaults.epsilon, this.snapAtCreation, t, e.round, l),
                                        this.controller.domAttributes.push(c));
                            c || (c = new n(a, s.KeyframeDefaults.epsilon, this.snapAtCreation, t, e.round, l)),
                                this.controller.tweenProps[t] = c
                        }
                        this.animValues[t] = this.controller.group.expressionParser.parseArray(this, i),
                            this.controller.tweenProps[t].calculateEpsilon(e.epsilon, this.animValues[t])
                    }
                }
                this.keyframeType = this.hold ? s.KeyframeTypes.InterpolationForward : s.KeyframeTypes.Interpolation,
                    e.event && (this.event = e.event)
            }
            overwriteProps(e) {
                this.animValues = {};
                let t = Object.assign({}, this.jsonProps, e);
                this.controller.updateKeyframe(this, t)
            }
            updateLocalProgress(e) {
                if (this.start === this.end || e < this.start || e > this.end)
                    return this.localT = e < this.start ? this.hold ? this.localT : 0 : e > this.end ? 1 : 0,
                        void (this.curvedT = this.easeFunction(this.localT));
                const t = (e - this.start) / (this.end - this.start)
                    , i = this.hold ? this.localT : 0;
                this.localT = a.clamp(t, i, 1),
                    this.curvedT = this.easeFunction(this.localT)
            }
            reconcile(e) {
                this.controller.tweenProps[e].reconcile(this.animValues[e], this.curvedT) && (this.needsEventDispatch || (this.needsEventDispatch = !0,
                    this.controller.keyframesRequiringDispatch.push(this)))
            }
            reset(e) {
                this.localT = e || 0;
                let t = this.ease;
                this.ease = 1;
                for (let e in this.animValues)
                    this.reconcile(e);
                this.ease = t
            }
            onDOMRead(e) {
                let t = this.controller.tweenProps[e].update(this.animValues[e], this.curvedT, this.ease);
                return "" === this.event || this.needsEventDispatch || t && (this.needsEventDispatch = !0,
                    this.controller.keyframesRequiringDispatch.push(this)),
                    t
            }
            isInRange(e) {
                return e >= this.start && e <= this.end
            }
            setEnabled(e) {
                e = e || h(Array.from(document.documentElement.classList));
                let t = -1 !== this.breakpointMask.indexOf(s.pageMetrics.breakpoint)
                    , i = !1;
                return this.disabledWhen.length > 0 && (i = this.disabledWhen.some(t => "function" == typeof t ? t(this, e) : void 0 !== e[t])),
                    this.isEnabled = t && !i,
                    this.isEnabled
            }
            evaluateConstraints() {
                this.start = this.controller.group.expressionParser.parseTimeValue(this, this.jsonProps.start),
                    this.end = this.controller.group.expressionParser.parseTimeValue(this, this.jsonProps.end || 0),
                    this.evaluateInterpolationConstraints()
            }
            evaluateInterpolationConstraints() {
                for (let e in this.animValues) {
                    let t = this.jsonProps[e];
                    this.animValues[e] = this.controller.group.expressionParser.parseArray(this, t)
                }
            }
        }
        g.DATA_ATTRIBUTE = "data-anim-tween",
            t.exports = g
    }
        , {
        119: 119,
        120: 120,
        126: 126,
        127: 127,
        128: 128,
        130: 130,
        133: 133,
        135: 135,
        143: 143,
        144: 144,
        145: 145,
        199: 199
    }],
    115: [function (e, t, i) {
        "use strict";
        const s = e(114)
            , n = e(119)
            , r = e(135);
        class a extends s {
            constructor(e, t) {
                super(e, t),
                    this.keyframeType = n.KeyframeTypes.CSSClass,
                    this._triggerType = a.TRIGGER_TYPE_CSS_CLASS,
                    this.cssClass = "",
                    this.friendlyName = "",
                    this.style = {
                        on: null,
                        off: null
                    },
                    this.toggle = n.KeyframeDefaults.toggle,
                    this.isApplied = !1
            }
            parseOptions(e) {
                if (!this.controller._ownerIsElement)
                    throw new TypeError("CSS Keyframes cannot be applied to JS Objects");
                if (e.x = void 0,
                    e.y = void 0,
                    e.z = void 0,
                    e.scale = void 0,
                    e.scaleX = void 0,
                    e.scaleY = void 0,
                    e.rotationX = void 0,
                    e.rotationY = void 0,
                    e.rotationZ = void 0,
                    e.rotation = void 0,
                    e.opacity = void 0,
                    e.hold = void 0,
                    void 0 !== e.toggle && (this.toggle = e.toggle),
                    void 0 !== e.cssClass)
                    this._triggerType = a.TRIGGER_TYPE_CSS_CLASS,
                        this.cssClass = e.cssClass,
                        this.friendlyName = "." + this.cssClass,
                        void 0 === this.controller.tweenProps.targetClasses && (this.controller.tweenProps.targetClasses = {
                            add: [],
                            remove: []
                        });
                else {
                    if (void 0 === e.style || !this.isValidStyleProperty(e.style))
                        throw new TypeError("KeyframeCSSClass no 'cssClass` property found. If using `style` property its also missing or invalid");
                    if (this._triggerType = a.TRIGGER_TYPE_STYLE_PROPERTY,
                        this.style = e.style,
                        this.friendlyName = "style",
                        this.toggle = void 0 !== this.style.off || this.toggle,
                        this.toggle && void 0 === this.style.off) {
                        this.style.off = {};
                        for (let e in this.style.on)
                            this.style.off[e] = ""
                    }
                    void 0 === this.controller.tweenProps.targetStyles && (this.controller.tweenProps.targetStyles = {})
                }
                if (void 0 === e.end && (e.end = e.start),
                    e.toggle = this.toggle,
                    this._triggerType === a.TRIGGER_TYPE_CSS_CLASS)
                    this.isApplied = this.controller.element.classList.contains(this.cssClass);
                else {
                    let e = getComputedStyle(this.controller.element);
                    this.isApplied = !0;
                    for (let t in this.style.on)
                        if (e[t] !== this.style.on[t]) {
                            this.isApplied = !1;
                            break
                        }
                }
                super.parseOptions(e),
                    this.animValues[this.friendlyName] = [0, 0],
                    void 0 === this.controller.tweenProps[this.friendlyName] && (this.controller.tweenProps[this.friendlyName] = new r(0, 1, !1, this.friendlyName)),
                    this.keyframeType = n.KeyframeTypes.CSSClass
            }
            updateLocalProgress(e) {
                this.isApplied && !this.toggle || (this.start !== this.end ? !this.isApplied && e >= this.start && e <= this.end ? this._apply() : this.isApplied && this.toggle && (e < this.start || e > this.end) && this._unapply() : !this.isApplied && e >= this.start ? this._apply() : this.isApplied && this.toggle && e < this.start && this._unapply())
            }
            _apply() {
                if (this._triggerType === a.TRIGGER_TYPE_CSS_CLASS)
                    this.controller.tweenProps.targetClasses.add.push(this.cssClass),
                        this.controller.needsClassUpdate = !0;
                else {
                    for (let e in this.style.on)
                        this.controller.tweenProps.targetStyles[e] = this.style.on[e];
                    this.controller.needsStyleUpdate = !0
                }
                this.isApplied = !0
            }
            _unapply() {
                if (this._triggerType === a.TRIGGER_TYPE_CSS_CLASS)
                    this.controller.tweenProps.targetClasses.remove.push(this.cssClass),
                        this.controller.needsClassUpdate = !0;
                else {
                    for (let e in this.style.off)
                        this.controller.tweenProps.targetStyles[e] = this.style.off[e];
                    this.controller.needsStyleUpdate = !0
                }
                this.isApplied = !1
            }
            isValidStyleProperty(e) {
                if (!e.hasOwnProperty("on"))
                    return !1;
                if ("object" != typeof e.on)
                    throw new TypeError("KeyframeCSSClass `style` property should be in the form of: {on:{visibility:'hidden', otherProperty: 'value'}}");
                if (this.toggle && e.hasOwnProperty("off") && "object" != typeof e.off)
                    throw new TypeError("KeyframeCSSClass `style` property should be in the form of: {on:{visibility:'hidden', otherProperty: 'value'}}");
                return !0
            }
            reconcile(e) { }
            onDOMRead(e) {
                return !1
            }
            evaluateInterpolationConstraints() { }
        }
        a.TRIGGER_TYPE_CSS_CLASS = 0,
            a.TRIGGER_TYPE_STYLE_PROPERTY = 1,
            a.DATA_ATTRIBUTE = "data-anim-classname",
            t.exports = a
    }
        , {
        114: 114,
        119: 119,
        135: 135
    }],
    116: [function (e, t, i) {
        "use strict";
        const s = e(119)
            , n = e(135)
            , r = e(122)
            , a = e(118)
            , o = e(115)
            , l = e(123)
            , c = e(143)
            , h = e(127)
            , d = e(151)
            , { transformAttributes: u, cssAttributes: m, domAttributes: p } = e(130)
            , f = e(132)
            , y = e(133)
            , g = e(134)
            , v = Math.PI / 180
            , _ = {
                create: e(207),
                rotateX: e(208),
                rotateY: e(209),
                rotateZ: e(210),
                scale: e(211)
            }
            , E = e(110);
        t.exports = class extends E {
            constructor(e, t) {
                super(),
                    this._events.draw = [],
                    this.uuid = h(),
                    this.group = e,
                    this.element = t,
                    this._ownerIsElement = this.element instanceof Element,
                    this._ownerIsElement ? this.friendlyName = this.element.tagName + "." + Array.from(this.element.classList).join(".") : this.friendlyName = this.element.friendlyName || this.uuid,
                    this.element._animInfo = this.element._animInfo || new a(e, this),
                    this.element._animInfo.controller = this,
                    this.element._animInfo.group = this.group,
                    this.element._animInfo.controllers.push(this),
                    this.tweenProps = this.element._animInfo.tweenProps,
                    this.eventObject = new r(this),
                    this.needsStyleUpdate = !1,
                    this.needsClassUpdate = !1,
                    this.elementMetrics = this.group.metrics.add(this.element),
                    this.attributes = [],
                    this.cssAttributes = [],
                    this.domAttributes = [],
                    this.keyframes = {},
                    this._allKeyframes = [],
                    this._activeKeyframes = [],
                    this.keyframesRequiringDispatch = [],
                    this.updateCachedValuesFromElement(),
                    this.boundsMin = 0,
                    this.boundsMax = 0,
                    this.mat2d = new Float32Array(6),
                    this.mat4 = _.create(),
                    this.needsWrite = !0,
                    this.onDOMWriteImp = this._ownerIsElement ? this.onDOMWriteForElement : this.onDOMWriteForObject
            }
            on(e, t) {
                return super.on(e, t)
            }
            destroy() {
                if (this.element._animInfo) {
                    this.element._animInfo.controller === this && (this.element._animInfo.controller = null);
                    let e = this.element._animInfo.controllers.indexOf(this);
                    if (-1 !== e && this.element._animInfo.controllers.splice(e, 1),
                        0 === this.element._animInfo.controllers.length)
                        this.element._animInfo = null;
                    else {
                        let e = this.element._animInfo.controllers.find(e => e.group !== e.group.anim.tweenGroup);
                        e && (this.element._animInfo.controller = e,
                            this.element._animInfo.group = e.group)
                    }
                }
                this.eventObject.controller = null,
                    this.eventObject.element = null,
                    this.eventObject.keyframe = null,
                    this.eventObject.tweenProps = null,
                    this.eventObject = null,
                    this.elementMetrics = null,
                    this.group = null,
                    this.keyframesRequiringDispatch = null;
                for (let e = 0; e < this._allKeyframes.length; e++)
                    this._allKeyframes[e].destroy();
                this._allKeyframes = null,
                    this._activeKeyframes = null,
                    this.attributes = null,
                    this.keyframes = null,
                    this.element = null,
                    this.tweenProps = null,
                    this.destroyed = !0,
                    super.destroy()
            }
            remove() {
                return this.group && this.group.removeKeyframeController(this)
            }
            updateCachedValuesFromElement() {
                if (!this._ownerIsElement)
                    return;
                const e = this.getTargetComputedStyle(!0);
                if (null === e)
                    throw Error("Could not retrieve computed style for target");
                let t = new DOMMatrix(e.getPropertyValue("transform"))
                    , i = d(t)
                    , r = s.KeyframeDefaults.epsilon;
                ["x", "y", "z"].forEach((e, t) => {
                    this.tweenProps[e] = new n(i.translation[t], r, !1, e)
                }
                ),
                    this.tweenProps.rotation = new n(i.rotation[2], r, !1, "rotation"),
                    ["rotationX", "rotationY", "rotationZ"].forEach((e, t) => {
                        this.tweenProps[e] = new n(i.rotation[t], r, !1, e)
                    }
                    ),
                    this.tweenProps.scale = new n(i.scale[0], r, !1, "scale"),
                    ["scaleX", "scaleY", "scaleZ"].forEach((e, t) => {
                        this.tweenProps[e] = new n(i.scale[t], r, !1, e)
                    }
                    )
            }
            addKeyframe(e) {
                let t = l(e);
                if (!t)
                    throw new Error("AnimSystem Cannot create keyframe for from options `" + e + "`");
                let i = new t(this, e);
                return i.parseOptions(e),
                    i.id = this._allKeyframes.length,
                    this._allKeyframes.push(i),
                    i
            }
            needsUpdate() {
                for (let e = 0, t = this.attributes.length; e < t; e++) {
                    let t = this.attributes[e];
                    if (this.tweenProps[t].needsUpdate())
                        return !0
                }
                return !1
            }
            updateLocalProgress(e) {
                for (let t = 0, i = this.attributes.length; t < i; t++) {
                    let i = this.attributes[t]
                        , s = this.keyframes[this.attributes[t]];
                    if (1 === s.length) {
                        s[0].updateLocalProgress(e);
                        continue
                    }
                    let n = this.getNearestKeyframeForAttribute(i, e);
                    n && n.updateLocalProgress(e)
                }
            }
            reconcile() {
                for (let e = 0, t = this.attributes.length; e < t; e++) {
                    let t = this.attributes[e]
                        , i = this.getNearestKeyframeForAttribute(t, this.group.position.local);
                    null !== i && (i.updateLocalProgress(this.group.position.local),
                        i.snapAtCreation && i.reconcile(t))
                }
            }
            determineActiveKeyframes(e) {
                e = e || c(Array.from(document.documentElement.classList));
                let t = this._activeKeyframes
                    , i = this.attributes
                    , s = {};
                this._activeKeyframes = [],
                    this.attributes = [],
                    this.keyframes = {};
                for (let t = 0; t < this._allKeyframes.length; t++) {
                    let i = this._allKeyframes[t];
                    if (i.markedForRemoval || i.hidden || !i.setEnabled(e))
                        for (let e in i.animValues)
                            this.tweenProps[e].isActive = i.preserveState,
                                i.preserveState && (s[e] = !0);
                    else {
                        this._activeKeyframes.push(i);
                        for (let e in i.animValues)
                            this.keyframes[e] = this.keyframes[e] || [],
                                this.keyframes[e].push(i),
                                -1 === this.attributes.indexOf(e) && (s[e] = !0,
                                    this.attributes.push(e),
                                    this.tweenProps[e].isActive = !0)
                    }
                }
                this.attributes.forEach(e => this.tweenProps[e].isActive = !0),
                    this.cssAttributes = this.attributes.filter(e => m.includes(e) || e.startsWith("--")).map(e => this.tweenProps[e]),
                    this.domAttributes = this.attributes.filter(e => p.includes(e)).map(e => this.tweenProps[e]);
                let n = t.filter(e => -1 === this._activeKeyframes.indexOf(e));
                if (0 === n.length)
                    return;
                let r = i.filter(e => -1 === this.attributes.indexOf(e) && !s.hasOwnProperty(e));
                if (0 !== r.length)
                    if (this.needsWrite = !0,
                        this._ownerIsElement)
                        this.group.rafEmitter.once("before:draw", () => {
                            let e = r.some(e => u.includes(e))
                                , t = e && Object.keys(s).some(e => u.includes(e));
                            e && !t && this.element.style.removeProperty("transform");
                            for (let e = 0, t = r.length; e < t; ++e) {
                                let t = r[e]
                                    , i = this.tweenProps[t]
                                    , s = i.isActive ? i.target : i.initialValue;
                                if (i.current = i.target = s,
                                    !i.isActive)
                                    switch (!0) {
                                        case i instanceof f:
                                        case i instanceof y:
                                            i.unset(this.element.style);
                                            break;
                                        case i instanceof g:
                                            i.unset(i.applyToStyle ? this.element.style : this.element)
                                    }
                            }
                            for (let e = 0, t = n.length; e < t; ++e) {
                                let t = n[e];
                                t instanceof o && !t.preserveState && t._unapply()
                            }
                        }
                            , !0);
                    else
                        for (let e = 0, t = r.length; e < t; ++e) {
                            let t = this.tweenProps[r[e]];
                            t.current = t.target,
                                t.isActive = !1
                        }
            }
            onDOMRead(e) {
                for (let t = 0, i = this.attributes.length; t < i; t++) {
                    let i = this.attributes[t]
                        , s = this.getNearestKeyframeForAttribute(i, e);
                    s && s.onDOMRead(i) && (this.needsWrite = !0)
                }
            }
            onDOMWrite() {
                (this.needsWrite || this.needsClassUpdate || this.needsStyleUpdate) && (this.needsWrite = !1,
                    this.onDOMWriteImp(),
                    this.handleEventDispatch())
            }
            onDOMWriteForObject() {
                for (let e = 0, t = this.attributes.length; e < t; e++) {
                    let t = this.attributes[e];
                    this.element[t] = this.tweenProps[t].current
                }
            }
            onDOMWriteForElement(e = this.element.style) {
                this.handleStyleTransform(e);
                for (let t = 0, i = this.cssAttributes.length; t < i; t++)
                    this.cssAttributes[t].set(e);
                for (let e = 0, t = this.domAttributes.length; e < t; e++)
                    this.domAttributes[e].set(this.element);
                if (this.needsStyleUpdate) {
                    for (let e in this.tweenProps.targetStyles)
                        null !== this.tweenProps.targetStyles[e] && (this.element.style[e] = this.tweenProps.targetStyles[e]),
                            this.tweenProps.targetStyles[e] = null;
                    this.needsStyleUpdate = !1
                }
                this.needsClassUpdate && (this.tweenProps.targetClasses.add.length > 0 && this.element.classList.add.apply(this.element.classList, this.tweenProps.targetClasses.add),
                    this.tweenProps.targetClasses.remove.length > 0 && this.element.classList.remove.apply(this.element.classList, this.tweenProps.targetClasses.remove),
                    this.tweenProps.targetClasses.add.length = 0,
                    this.tweenProps.targetClasses.remove.length = 0,
                    this.needsClassUpdate = !1)
            }
            handleStyleTransform(e = this.element.style) {
                let t = this.tweenProps;
                if (t.z.isActive || t.rotationX.isActive || t.rotationY.isActive) {
                    const i = this.mat4;
                    i[0] = 1,
                        i[1] = 0,
                        i[2] = 0,
                        i[3] = 0,
                        i[4] = 0,
                        i[5] = 1,
                        i[6] = 0,
                        i[7] = 0,
                        i[8] = 0,
                        i[9] = 0,
                        i[10] = 1,
                        i[11] = 0,
                        i[12] = 0,
                        i[13] = 0,
                        i[14] = 0,
                        i[15] = 1;
                    const s = t.x.current
                        , n = t.y.current
                        , r = t.z.current;
                    if (i[12] = i[0] * s + i[4] * n + i[8] * r + i[12],
                        i[13] = i[1] * s + i[5] * n + i[9] * r + i[13],
                        i[14] = i[2] * s + i[6] * n + i[10] * r + i[14],
                        i[15] = i[3] * s + i[7] * n + i[11] * r + i[15],
                        0 !== t.rotation.current || 0 !== t.rotationZ.current) {
                        const e = (t.rotation.current || t.rotationZ.current) * v;
                        _.rotateZ(i, i, e)
                    }
                    if (0 !== t.rotationX.current) {
                        const e = t.rotationX.current * v;
                        _.rotateX(i, i, e)
                    }
                    if (0 !== t.rotationY.current) {
                        const e = t.rotationY.current * v;
                        _.rotateY(i, i, e)
                    }
                    1 === t.scale.current && 1 === t.scaleX.current && 1 === t.scaleY.current || _.scale(i, i, [t.scale.current, t.scale.current, 1]),
                        e.transform = "matrix3d(" + i[0] + "," + i[1] + "," + i[2] + "," + i[3] + "," + i[4] + "," + i[5] + "," + i[6] + "," + i[7] + "," + i[8] + "," + i[9] + "," + i[10] + "," + i[11] + "," + i[12] + "," + i[13] + "," + i[14] + "," + i[15] + ")"
                } else if (t.x.isActive || t.y.isActive || t.rotation.isActive || t.rotationZ.isActive || t.scale.isActive || t.scaleX.isActive || t.scaleY.isActive) {
                    const i = this.mat2d;
                    i[0] = 1,
                        i[1] = 0,
                        i[2] = 0,
                        i[3] = 1,
                        i[4] = 0,
                        i[5] = 0;
                    const s = t.x.current
                        , n = t.y.current
                        , r = i[0]
                        , a = i[1]
                        , o = i[2]
                        , l = i[3]
                        , c = i[4]
                        , h = i[5];
                    if (i[0] = r,
                        i[1] = a,
                        i[2] = o,
                        i[3] = l,
                        i[4] = r * s + o * n + c,
                        i[5] = a * s + l * n + h,
                        0 !== t.rotation.current || 0 !== t.rotationZ.current) {
                        const e = (t.rotation.current || t.rotationZ.current) * v
                            , s = i[0]
                            , n = i[1]
                            , r = i[2]
                            , a = i[3]
                            , o = i[4]
                            , l = i[5]
                            , c = Math.sin(e)
                            , h = Math.cos(e);
                        i[0] = s * h + r * c,
                            i[1] = n * h + a * c,
                            i[2] = s * -c + r * h,
                            i[3] = n * -c + a * h,
                            i[4] = o,
                            i[5] = l
                    }
                    t.scaleX.isActive || t.scaleY.isActive ? (i[0] = i[0] * t.scaleX.current,
                        i[1] = i[1] * t.scaleX.current,
                        i[2] = i[2] * t.scaleY.current,
                        i[3] = i[3] * t.scaleY.current) : (i[0] = i[0] * t.scale.current,
                            i[1] = i[1] * t.scale.current,
                            i[2] = i[2] * t.scale.current,
                            i[3] = i[3] * t.scale.current),
                        e.transform = "matrix(" + i[0] + ", " + i[1] + ", " + i[2] + ", " + i[3] + ", " + i[4] + ", " + i[5] + ")"
                }
            }
            handleEventDispatch() {
                if (0 !== this.keyframesRequiringDispatch.length) {
                    for (let e = 0, t = this.keyframesRequiringDispatch.length; e < t; e++) {
                        let t = this.keyframesRequiringDispatch[e];
                        t.needsEventDispatch = !1,
                            this.eventObject.keyframe = t,
                            this.eventObject.pageMetrics = s.pageMetrics,
                            this.eventObject.event = t.event,
                            this.trigger(t.event, this.eventObject)
                    }
                    this.keyframesRequiringDispatch.length = 0
                }
                if (0 !== this._events.draw.length) {
                    this.eventObject.keyframe = null,
                        this.eventObject.event = "draw";
                    for (let e = this._events.draw.length - 1; e >= 0; e--)
                        this._events.draw[e](this.eventObject)
                }
            }
            updateAnimationConstraints() {
                for (let e = 0, t = this._activeKeyframes.length; e < t; e++)
                    this._activeKeyframes[e].evaluateConstraints();
                this.attributes.forEach(e => {
                    1 !== this.keyframes[e].length && this.keyframes[e].sort(s.KeyframeComparison)
                }
                ),
                    this.updateDeferredPropertyValues()
            }
            refreshMetrics() {
                let e = new Set([this.element]);
                this._allKeyframes.forEach(t => t.anchors.forEach(t => e.add(t))),
                    this.group.metrics.refreshCollection(e),
                    this.group.keyframesDirty = !0
            }
            getTargetComputedStyle(e = !1) {
                return this._ownerIsElement ? ((e || void 0 === this.group.computedStyleCache[this.uuid]) && (this.group.computedStyleCache[this.uuid] = getComputedStyle(this.element)),
                    this.group.computedStyleCache[this.uuid]) : null
            }
            updateDeferredPropertyValues() {
                for (let e = 0, t = this.attributes.length; e < t; e++) {
                    let t = this.attributes[e]
                        , i = this.keyframes[t];
                    if (!(i[0].keyframeType > s.KeyframeTypes.InterpolationForward))
                        for (let e = 0, s = i.length; e < s; e++) {
                            let n = i[e];
                            null === n.jsonProps[t][0] && (0 === e ? n.jsonProps[t][0] = n.animValues[t][0] = this.tweenProps[t].current : n.animValues[t][0] = i[e - 1].animValues[t][1]),
                                null === n.jsonProps[t][1] && (n.animValues[t][1] = e === s - 1 ? this.tweenProps[t].current : i[e + 1].animValues[t][0])
                        }
                }
            }
            getBounds(e) {
                this.boundsMin = Number.MAX_VALUE,
                    this.boundsMax = -Number.MAX_VALUE;
                for (let t = 0, i = this.attributes.length; t < i; t++) {
                    let i = this.keyframes[this.attributes[t]];
                    for (let t = 0; t < i.length; t++) {
                        let s = i[t];
                        this.boundsMin = Math.min(s.start, this.boundsMin),
                            this.boundsMax = Math.max(s.end, this.boundsMax),
                            e.min = Math.min(s.start, e.min),
                            e.max = Math.max(s.end, e.max)
                    }
                }
            }
            getNearestKeyframeForAttribute(e, t) {
                t = void 0 !== t ? t : this.group.position.local;
                let i = null
                    , s = Number.POSITIVE_INFINITY
                    , n = this.keyframes[e];
                if (void 0 === n)
                    return null;
                let r = n.length;
                if (0 === r)
                    return null;
                if (1 === r)
                    return n[0];
                for (let e = 0; e < r; e++) {
                    let r = n[e];
                    if (r.isInRange(t)) {
                        i = r;
                        break
                    }
                    let a = Math.min(Math.abs(t - r.start), Math.abs(t - r.end));
                    a < s && (s = a,
                        i = r)
                }
                return i
            }
            getAllKeyframesForAttribute(e) {
                return this.keyframes[e]
            }
            updateKeyframe(e, t) {
                e.parseOptions(t),
                    e.evaluateConstraints(),
                    this.group.keyframesDirty = !0,
                    this.group.rafEmitter.update(() => {
                        this.trigger(s.EVENTS.ON_KEYFRAME_UPDATED, e),
                            this.group.trigger(s.EVENTS.ON_KEYFRAME_UPDATED, e)
                    }
                    )
            }
            removeKeyframe(e) {
                return e.destroyed || e.controller !== this ? Promise.resolve(e) : (e.markedForRemoval = !0,
                    this.group.keyframesDirty = !0,
                    new Promise(t => {
                        this.group.rafEmitter.draw(() => {
                            t(e),
                                e.destroy();
                            let i = this._allKeyframes.indexOf(e);
                            -1 !== i && this._allKeyframes.splice(i, 1)
                        }
                        )
                    }
                    ))
            }
            updateAnimation(e, t) {
                return this.group.gui && console.warn("KeyframeController.updateAnimation(keyframe,props) has been deprecated. Please use updateKeyframe(keyframe,props)"),
                    this.updateKeyframe(e, t)
            }
        }
    }
        , {
        110: 110,
        115: 115,
        118: 118,
        119: 119,
        122: 122,
        123: 123,
        127: 127,
        130: 130,
        132: 132,
        133: 133,
        134: 134,
        135: 135,
        143: 143,
        151: 151,
        207: 207,
        208: 208,
        209: 209,
        210: 210,
        211: 211
    }],
    117: [function (e, t, i) {
        "use strict";
        const s = e(114)
            , n = e(119)
            , r = e(135);
        class a extends s {
            constructor(e, t) {
                super(e, t),
                    this.keyframeType = n.KeyframeTypes.Event,
                    this.isApplied = !1,
                    this.hasDuration = !1,
                    this.isCurrentlyInRange = !1
            }
            parseOptions(e) {
                e.x = void 0,
                    e.y = void 0,
                    e.scale = void 0,
                    e.scaleX = void 0,
                    e.scaleY = void 0,
                    e.rotation = void 0,
                    e.style = void 0,
                    e.cssClass = void 0,
                    e.rotation = void 0,
                    e.opacity = void 0,
                    e.hold = void 0,
                    this.event = e.event,
                    this.animValues[this.event] = [0, 0],
                    void 0 === this.controller.tweenProps[this.event] && (this.controller.tweenProps[this.event] = new r(0, 1, !1, this.event)),
                    super.parseOptions(e),
                    this.keyframeType = n.KeyframeTypes.Event
            }
            updateLocalProgress(e) {
                if (this.hasDuration) {
                    let t = this.isCurrentlyInRange
                        , i = e >= this.start && e <= this.end;
                    if (t === i)
                        return;
                    return this.isCurrentlyInRange = i,
                        void (i && !t ? this._trigger(this.event + ":enter") : t && !i && this._trigger(this.event + ":exit"))
                }
                !this.isApplied && e >= this.start ? (this.isApplied = !0,
                    this._trigger(this.event)) : this.isApplied && e < this.start && (this.isApplied = !1,
                        this._trigger(this.event + ":reverse"))
            }
            _trigger(e) {
                this.controller.eventObject.event = e,
                    this.controller.eventObject.keyframe = this,
                    this.controller.trigger(e, this.controller.eventObject)
            }
            evaluateConstraints() {
                super.evaluateConstraints(),
                    this.hasDuration = this.start !== this.end
            }
            reset(e) {
                this.isApplied = !1,
                    this.isCurrentlyInRange = !1,
                    super.reset(e)
            }
            onDOMRead(e) {
                return !1
            }
            reconcile(e) { }
            evaluateInterpolationConstraints() { }
        }
        a.DATA_ATTRIBUTE = "data-anim-event",
            t.exports = a
    }
        , {
        114: 114,
        119: 119,
        135: 135
    }],
    118: [function (e, t, i) {
        "use strict";
        t.exports = class {
            constructor(e, t, i = !1) {
                this.isGroup = i,
                    this.group = e,
                    this.controller = t,
                    this.controllers = [],
                    this.tweenProps = {
                        targetStyles: {},
                        targetClasses: {
                            add: [],
                            remove: []
                        }
                    }
            }
        }
    }
        , {}],
    119: [function (e, t, i) {
        "use strict";
        const s = {
            GUI_INSTANCE: null,
            ANIM_INSTANCE: null,
            cssDimensionsTracker: null,
            LOCAL_STORAGE_KEYS: {
                GuiPosition: "anim-ui.position",
                GroupCollapsedStates: "anim-ui.group-collapsed-states",
                scrollY: "anim-ui.scrollY-position",
                path: "anim-ui.path"
            },
            RESIZE_TIMEOUT: -1,
            BREAKPOINTS: [{
                name: "S",
                mediaQuery: "only screen and (max-width: 734px)"
            }, {
                name: "M",
                mediaQuery: "only screen and (max-width: 1068px)"
            }, {
                name: "L",
                mediaQuery: "only screen and (min-width: 1069px)"
            }],
            getBreakpoint: function () {
                for (let e = 0; e < s.BREAKPOINTS.length; e++) {
                    let t = s.BREAKPOINTS[e];
                    if (window.matchMedia(t.mediaQuery).matches)
                        return t.name
                }
                return this.BREAKPOINTS[0].name
            },
            KeyframeDefaults: {
                ease: 1,
                epsilon: .05,
                preserveState: !1,
                easeFunctionString: "linear",
                easeFunction: "linear",
                hold: !1,
                snapAtCreation: !1,
                toggle: !1,
                breakpointMask: "SMLX",
                event: "",
                disabledWhen: [],
                cssClass: ""
            },
            KeyframeTypes: {
                Interpolation: 0,
                InterpolationForward: 1,
                CSSClass: 2,
                Event: 3
            },
            EVENTS: {
                ON_DOM_KEYFRAMES_CREATED: "ON_DOM_KEYFRAMES_CREATED",
                ON_DOM_GROUPS_CREATED: "ON_DOM_GROUPS_CREATED",
                ON_GROUP_CREATED: "ON_GROUP_CREATED",
                ON_KEYFRAME_UPDATED: "ON_KEYFRAME_UPDATED",
                ON_TIMELINE_START: "ON_TIMELINE_START",
                ON_TIMELINE_UPDATE: "ON_TIMELINE_UPDATE",
                ON_TIMELINE_COMPLETE: "ON_TIMELINE_COMPLETE",
                ON_CHAPTER_INITIATED: "ON_CHAPTER_INITIATED",
                ON_CHAPTER_OCCURRED: "ON_CHAPTER_OCCURRED",
                ON_CHAPTER_COMPLETED: "ON_CHAPTER_COMPLETED"
            },
            PageEvents: {
                ON_SCROLL: "ON_SCROLL",
                ON_RESIZE_IMMEDIATE: "ON_RESIZE_IMMEDIATE",
                ON_RESIZE_DEBOUNCED: "ON_RESIZE_DEBOUNCED",
                ON_BREAKPOINT_CHANGE: "ON_BREAKPOINT_CHANGE"
            },
            KeyframeJSONReservedWords: ["event", "cssClass", "style", "anchors", "start", "end", "epsilon", "easeFunction", "ease", "breakpointMask", "disabledWhen"],
            pageMetrics: {
                scrollX: 0,
                scrollY: 0,
                windowWidth: 0,
                windowHeight: 0,
                documentOffsetX: 0,
                documentOffsetY: 0,
                previousBreakpoint: "",
                breakpoint: ""
            },
            KeyframeComparison: function (e, t) {
                return e.start < t.start ? -1 : e.start > t.start ? 1 : 0
            }
        };
        t.exports = s
    }
        , {}],
    120: [function (e, t, i) {
        "use strict";
        t.exports = new class {
            constructor() {
                this.linear = function (e) {
                    return e
                }
                    ,
                    this.easeInQuad = function (e) {
                        return e * e
                    }
                    ,
                    this.easeOutQuad = function (e) {
                        return e * (2 - e)
                    }
                    ,
                    this.easeInOutQuad = function (e) {
                        return e < .5 ? 2 * e * e : (4 - 2 * e) * e - 1
                    }
                    ,
                    this.easeInSin = function (e) {
                        return 1 + Math.sin(Math.PI / 2 * e - Math.PI / 2)
                    }
                    ,
                    this.easeOutSin = function (e) {
                        return Math.sin(Math.PI / 2 * e)
                    }
                    ,
                    this.easeInOutSin = function (e) {
                        return (1 + Math.sin(Math.PI * e - Math.PI / 2)) / 2
                    }
                    ,
                    this.easeInElastic = function (e) {
                        return 0 === e ? e : (.04 - .04 / e) * Math.sin(25 * e) + 1
                    }
                    ,
                    this.easeOutElastic = function (e) {
                        return .04 * e / --e * Math.sin(25 * e)
                    }
                    ,
                    this.easeInOutElastic = function (e) {
                        return (e -= .5) < 0 ? (.02 + .01 / e) * Math.sin(50 * e) : (.02 - .01 / e) * Math.sin(50 * e) + 1
                    }
                    ,
                    this.easeOutBack = function (e) {
                        return (e -= 1) * e * (2.70158 * e + 1.70158) + 1
                    }
                    ,
                    this.easeInCubic = function (e) {
                        return e * e * e
                    }
                    ,
                    this.easeOutCubic = function (e) {
                        return --e * e * e + 1
                    }
                    ,
                    this.easeInOutCubic = function (e) {
                        return e < .5 ? 4 * e * e * e : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1
                    }
                    ,
                    this.easeInQuart = function (e) {
                        return e * e * e * e
                    }
                    ,
                    this.easeOutQuart = function (e) {
                        return 1 - --e * e * e * e
                    }
                    ,
                    this.easeInOutQuart = function (e) {
                        return e < .5 ? 8 * e * e * e * e : 1 - 8 * --e * e * e * e
                    }
                    ,
                    this.easeInQuint = function (e) {
                        return e * e * e * e * e
                    }
                    ,
                    this.easeOutQuint = function (e) {
                        return 1 + --e * e * e * e * e
                    }
                    ,
                    this.easeInOutQuint = function (e) {
                        return e < .5 ? 16 * e * e * e * e * e : 1 + 16 * --e * e * e * e * e
                    }
            }
        }
    }
        , {}],
    121: [function (e, t, i) {
        "use strict";
        const s = e(119)
            , n = e(124)
            , r = (e, t) => null == e ? t : e;
        t.exports = class {
            constructor() {
                this.clear(),
                    this._metrics = new WeakMap
            }
            clear() {
                this._metrics = new WeakMap
            }
            destroy() {
                this.clear()
            }
            add(e) {
                let t = this._metrics.get(e);
                if (t)
                    return t;
                let i = new n(e);
                return this._metrics.set(e, i),
                    this._refreshMetrics(e, i)
            }
            get(e) {
                return this._metrics.get(e)
            }
            refreshCollection(e) {
                e.forEach(e => this._refreshMetrics(e, void 0))
            }
            refreshMetrics(e) {
                return this._refreshMetrics(e)
            }
            _refreshMetrics(e, t) {
                if (t = t || this._metrics.get(e),
                    !(e instanceof HTMLElement))
                    return t.width = r(e.width, 0),
                        t.height = r(e.height, 0),
                        t.top = r(e.top, r(e.y, 0)),
                        t.left = r(e.left, r(e.x, 0)),
                        t.right = t.left + t.width,
                        t.bottom = t.top + t.height,
                        t;
                if (void 0 === e.offsetWidth) {
                    let i = e.getBoundingClientRect();
                    return t.width = i.width,
                        t.height = i.height,
                        t.top = s.pageMetrics.scrollY + i.top,
                        t.left = s.pageMetrics.scrollX + i.left,
                        t.right = t.left + t.width,
                        t.bottom = t.top + t.height,
                        t
                }
                t.width = e.offsetWidth,
                    t.height = e.offsetHeight,
                    t.top = s.pageMetrics.documentOffsetY,
                    t.left = s.pageMetrics.documentOffsetX;
                let i = e;
                for (; i;)
                    t.top += i.offsetTop,
                        t.left += i.offsetLeft,
                        i = i.offsetParent;
                return t.right = t.left + t.width,
                    t.bottom = t.top + t.height,
                    t
            }
        }
    }
        , {
        119: 119,
        124: 124
    }],
    122: [function (e, t, i) {
        "use strict";
        t.exports = class {
            constructor(e) {
                this.controller = e,
                    this.element = this.controller.element,
                    this.keyframe = null,
                    this.event = "",
                    this.pageMetrics,
                    this.tweenProps = this.controller.tweenProps
            }
        }
    }
        , {}],
    123: [function (e, t, i) {
        "use strict";
        const s = e(119)
            , n = e(114)
            , r = e(117)
            , a = e(115)
            , o = ["onEnter", "onExit", "onEvent", "onEventReverse", "onEnterOnce", "onExitOnce", "onEventOnce", "onEventReverseOnce"];
        t.exports = function (e) {
            const t = function (e) {
                for (let t in e) {
                    let i = e[t];
                    if (-1 === s.KeyframeJSONReservedWords.indexOf(t) && Array.isArray(i))
                        return !0
                }
                return !1
            }(e)
                , i = o.filter(t => t in e);
            if (void 0 !== e.cssClass || void 0 !== e.style) {
                if (t)
                    throw new Error("CSS Keyframes cannot tween values, please use multiple keyframes instead");
                if (i.length > 0)
                    throw new Error("CSS Keyframes cannot dispatch events, please use multiple keyframes instead");
                return a
            }
            if (t && 0 === i.length)
                return n;
            if (e.event || i.length > 0) {
                if (t)
                    throw new Error("Events such as '".concat(i.join(", "), "' do not fire when tweening values, please use multiple keyframes instead"));
                return r
            }
            throw delete e.anchors,
            new Error("Could not determine tween type based on ".concat(JSON.stringify(e)))
        }
    }
        , {
        114: 114,
        115: 115,
        117: 117,
        119: 119
    }],
    124: [function (e, t, i) {
        "use strict";
        t.exports = class {
            constructor(e) {
                this.top = 0,
                    this.bottom = 0,
                    this.left = 0,
                    this.right = 0,
                    this.height = 0,
                    this.width = 0
            }
            toString() {
                return "top:".concat(this.top, ", bottom:").concat(this.bottom, ", left:").concat(this.left, ", right:").concat(this.right, ", height:").concat(this.height, ", width:").concat(this.width)
            }
            toObject() {
                return {
                    top: this.top,
                    bottom: this.bottom,
                    left: this.left,
                    right: this.right,
                    height: this.height,
                    width: this.width
                }
            }
        }
    }
        , {}],
    125: [function (e, t, i) {
        "use strict";
        t.exports = class {
            constructor() {
                this.local = 0,
                    this.localUnclamped = 0,
                    this.lastPosition = 0
            }
        }
    }
        , {}],
    126: [function (e, t, i) {
        "use strict";
        const { map: s } = e(199)
            , n = {};
        class r {
            constructor(e, t, i, s) {
                this.mass = e,
                    this.stiffness = t,
                    this.damping = i,
                    this.initialVelocity = s,
                    this.m_w0 = Math.sqrt(this.stiffness / this.mass),
                    this.m_zeta = this.damping / (2 * Math.sqrt(this.stiffness * this.mass)),
                    this.m_zeta < 1 ? (this.m_wd = this.m_w0 * Math.sqrt(1 - this.m_zeta * this.m_zeta),
                        this.m_A = 1,
                        this.m_B = (this.m_zeta * this.m_w0 - this.initialVelocity) / this.m_wd) : (this.m_wd = 0,
                            this.m_A = 1,
                            this.m_B = -this.initialVelocity + this.m_w0)
            }
            solve(e) {
                return 1 - (e = this.m_zeta < 1 ? Math.exp(-e * this.m_zeta * this.m_w0) * (this.m_A * Math.cos(this.m_wd * e) + this.m_B * Math.sin(this.m_wd * e)) : (this.m_A + this.m_B * e) * Math.exp(-e * this.m_w0))
            }
        }
        const a = /\d*\.?\d+/g;
        r.fromCSSString = function (e) {
            let t = e.match(a);
            if (4 !== t.length)
                throw "SpringEasing could not convert ".concat(e, " to spring params");
            let i = t.map(Number)
                , o = new r(...i);
            const l = o.solve.bind(o);
            let c = 0;
            let h = function () {
                if (n[e])
                    return n[e];
                let t, i = 0;
                for (; ;) {
                    c += 1 / 6;
                    if (1 === l(c)) {
                        if (i++,
                            i >= 16) {
                            t = c * (1 / 6);
                            break
                        }
                    } else
                        i = 0
                }
                return n[e] = t,
                    n[e]
            }();
            return function (e) {
                return 0 === e || 1 === e ? e : l(s(e, 0, 1, 0, h))
            }
        }
            ,
            t.exports = r
    }
        , {
        199: 199
    }],
    127: [function (e, t, i) {
        "use strict";
        t.exports = () => Math.random().toString(16).slice(-4)
    }
        , {}],
    128: [function (e, t, i) {
        "use strict";
        const s = Math.abs;
        class n {
            constructor(e, t, i, s) {
                this.cp = new Float32Array(6),
                    this.cp[0] = 3 * e,
                    this.cp[1] = 3 * (i - e) - this.cp[0],
                    this.cp[2] = 1 - this.cp[0] - this.cp[1],
                    this.cp[3] = 3 * t,
                    this.cp[4] = 3 * (s - t) - this.cp[3],
                    this.cp[5] = 1 - this.cp[3] - this.cp[4]
            }
            sampleCurveX(e) {
                return ((this.cp[2] * e + this.cp[1]) * e + this.cp[0]) * e
            }
            sampleCurveY(e) {
                return ((this.cp[5] * e + this.cp[4]) * e + this.cp[3]) * e
            }
            sampleCurveDerivativeX(e) {
                return (3 * this.cp[2] * e + 2 * this.cp[1]) * e + this.cp[0]
            }
            solveCurveX(e) {
                let t, i, n, r, a, o;
                for (n = e,
                    o = 0; o < 5; o++) {
                    if (r = this.sampleCurveX(n) - e,
                        s(r) < 1e-5)
                        return n;
                    if (a = this.sampleCurveDerivativeX(n),
                        s(a) < 1e-5)
                        break;
                    n -= r / a
                }
                if (t = 0,
                    i = 1,
                    n = e,
                    n < t)
                    return t;
                if (n > i)
                    return i;
                for (; t < i;) {
                    if (r = this.sampleCurveX(n),
                        s(r - e) < 1e-5)
                        return n;
                    e > r ? t = n : i = n,
                        n = .5 * (i - t) + t
                }
                return n
            }
            solve(e) {
                return this.sampleCurveY(this.solveCurveX(e))
            }
        }
        const r = /\d*\.?\d+/g;
        n.fromCSSString = function (e) {
            let t = e.match(r);
            if (4 !== t.length)
                throw "UnitBezier could not convert ".concat(e, " to cubic-bezier");
            let i = t.map(e => parseFloat(e))
                , s = new n(i[0], i[1], i[2], i[3]);
            return s.solve.bind(s)
        }
            ,
            t.exports = n
    }
        , {}],
    129: [function (e, t, i) {
        "use strict";
        t.exports = class {
            constructor(e, t) {
                this.a = e.top - t,
                    this.a < 0 && (this.a = e.top),
                    this.d = e.bottom
            }
        }
    }
        , {}],
    130: [function (e, t, i) {
        "use strict";
        let s = ["borderRadius", "bottom", "fontSize", "fontWeight", "height", "left", "lineHeight", "marginBottom", "marginLeft", "marginRight", "marginTop", "maxHeight", "maxWidth", "opacity", "paddingBottom", "paddingLeft", "paddingRight", "paddingTop", "right", "top", "width", "zIndex", "strokeDashoffset"];
        s.push(...s.map(e => e.replace(/[A-Z]/g, e => "-" + e.toLowerCase())));
        t.exports = {
            transformAttributes: ["x", "y", "z", "scale", "scaleX", "scaleY", "rotation", "rotationX", "rotationY", "rotationZ"],
            cssAttributes: s,
            domAttributes: ["scrollLeft", "scrollTop", "scrollBy", "scrollTo", "currentTime"],
            suffixFreeAttributes: ["opacity", "z-index", "font-weight", "zIndex", "fontWeight", "scrollLeft", "scrollTop", "scrollBy", "scrollTo", "currentTime"]
        }
    }
        , {}],
    131: [function (e, t, i) {
        "use strict";
        const s = e(135);
        t.exports = class extends s {
            constructor(e, t, i, s, n, r) {
                super(e, t, i, s),
                    this.key = s,
                    this.initialValue = new Float32Array(e),
                    this.target = new Float32Array(e),
                    this.current = new Float32Array(e),
                    this.previousValue = new Float32Array(e)
            }
            update(e, t, i) {
                for (let s = 0, n = this.target.length; s < n; s++)
                    this.target[s] = e[0][s] + t * (e[1][s] - e[0][s]),
                        this.previousValue[s] = this.current[s],
                        this.current[s] += (this.target[s] - this.current[s]) * i;
                let s = this.delta(this.current, this.target);
                return s < this.epsilon && (this.current = new Float32Array(this.target),
                    s = 0),
                    s > this.epsilon || 0 === s && this.previousValue.some((e, t) => e !== this.current[t])
            }
            reconcile(e, t) {
                return this.initialValue.forEach((t, i) => this.initialValue[i] = e[0][i]),
                    this.update(e, t, 1)
            }
            needsUpdate() {
                return this.delta(this.current, this.target) > this.epsilon
            }
            delta(e, t) {
                let i = 0;
                for (let s = 0, n = e.length; s < n; s++)
                    i += Math.abs(e[s] - t[s]);
                return i
            }
            calculateEpsilon(e, t) {
                this.epsilon = e || .05
            }
            set(e) {
                throw "ArrayTargetValue does not implement a `set` method. Subclasses must overwrite"
            }
            unset(e) {
                throw "ArrayTargetValue does not implement an `unset` method. Subclasses must overwrite"
            }
        }
    }
        , {
        135: 135
    }],
    132: [function (e, t, i) {
        "use strict";
        const s = e(131);
        t.exports = class extends s {
            set(e) {
                const t = "rgba(".concat(Math.round(this.current[0]), ",").concat(Math.round(this.current[1]), ",").concat(Math.round(this.current[2]), ",").concat(this.current[3], ")");
                e.setProperty(this.key, t)
            }
            unset(e) {
                e.removeProperty(this.key)
            }
        }
    }
        , {
        131: 131
    }],
    133: [function (e, t, i) {
        "use strict";
        const s = e(135)
            , n = e(144);
        t.exports = class extends s {
            constructor(e, t, i, s, r = !1, a) {
                super(e, t, i, s = n(s), r, a)
            }
            set(e) {
                let t = this.current;
                this.round && (t = Math.round(t)),
                    this.suffix && (t = "".concat(t).concat(this.suffix)),
                    e.setProperty(this.key, t.toString())
            }
            unset(e) {
                e.removeProperty(this.key)
            }
        }
    }
        , {
        135: 135,
        144: 144
    }],
    134: [function (e, t, i) {
        "use strict";
        const s = e(131)
            , n = e(142);
        t.exports = class extends s {
            constructor(e, t, i, s, r, a, o) {
                super(n.parseExpression(null, e), t, i, s, r, a),
                    this.applyToStyle = o,
                    this.pathStrings = n.getPathStrings(e)
            }
            update(e, t, i) {
                if (e[0].length !== e[1].length)
                    throw new Error("Path length mismatch. Start/end paths must must contain the same number of points. Start value: \r ".concat(n.reconstructPath(e[0], this.pathStrings)));
                return super.update(e, t, i)
            }
            set(e) {
                const t = n.reconstructPath(this.current, this.pathStrings);
                this.applyToStyle ? e.setProperty(this.key, t) : e.setAttribute("d", t)
            }
            unset(e) {
                if (this.applyToStyle)
                    e.removeProperty(this.key);
                else {
                    const t = n.reconstructPath(this.initialValue, this.pathStrings);
                    e.setAttribute("d", t)
                }
            }
        }
    }
        , {
        131: 131,
        142: 142
    }],
    135: [function (e, t, i) {
        "use strict";
        t.exports = class {
            constructor(e, t, i, s, n = !1, r) {
                this.epsilon = parseFloat(t),
                    this.snapAtCreation = i,
                    this.initialValue = e,
                    this.target = e,
                    this.current = e,
                    this.previousValue = e,
                    this.isActive = !1,
                    this.key = s,
                    this.round = n,
                    this.suffix = r
            }
            update(e, t, i) {
                this.target = e[0] + t * (e[1] - e[0]),
                    this.previousValue = this.current,
                    this.current += (this.target - this.current) * i;
                let s = this.delta(this.current, this.target);
                return s < this.epsilon && (this.current = this.target,
                    s = 0),
                    s > this.epsilon || 0 === s && this.previousValue !== this.current
            }
            reconcile(e, t) {
                return this.initialValue = e[0],
                    this.update(e, t, 1)
            }
            needsUpdate() {
                return this.delta(this.current, this.target) > this.epsilon
            }
            delta(e, t) {
                return Math.abs(e - t)
            }
            calculateEpsilon(e, t) {
                if (e)
                    return void (this.epsilon = e);
                let i = this.delta(t[0], t[1])
                    , s = Math.min(.001 * i, this.epsilon, .05);
                this.epsilon = Math.max(s, .001)
            }
            set(e) {
                let t = this.current;
                this.round && (t = Math.round(t)),
                    this.suffix && (t += this.suffix),
                    e[this.key] = t
            }
            unset(e) { }
        }
    }
        , {}],
    136: [function (e, t, i) {
        "use strict";
        const s = e(137)
            , n = new (e(121));
        class r {
            constructor(e) {
                this.group = e,
                    this.data = {
                        anchors: null,
                        keyframe: null,
                        metrics: this.group.metrics,
                        target: null
                    }
            }
            parseArray(e, t) {
                return [this.parseExpression(e, t[0]), this.parseExpression(e, t[1])]
            }
            parseExpression(e, t) {
                if (!t)
                    return null;
                if ("number" == typeof t)
                    return t;
                if ("string" != typeof t)
                    throw "Expression must be a string, received ".concat(typeof t, ": ").concat(t);
                return this.data.target = e.controller.element,
                    this.data.anchors = e.anchors,
                    this.data.keyframe = e,
                    this.group.anim.plugins.parser.reduce((i, s) => i || s.parseExpression.call(this, e, t), null) || r._parse(t, this.data)
            }
            parseTimeValue(e, t) {
                if ("number" == typeof t)
                    return t;
                let i = this.group.expressionParser.parseExpression(e, t);
                return this.group.convertScrollPositionToTValue(i || 0)
            }
            destroy() {
                this.group = null
            }
            static parse(e, t) {
                var i, s, a;
                return (null === (s = t = null !== (i = t) && void 0 !== i ? i : {
                    target: null
                }) || void 0 === s ? void 0 : s.target) && (n.clear(),
                    n.add(t.target)),
                    null === (a = t.anchors) || void 0 === a || a.forEach(e => n.add(e)),
                    t.metrics = n,
                    r._parse(e, t)
            }
            static _parse(e, t) {
                return s.Parse(e).execute(t)
            }
        }
        r.programs = s.programs,
            "undefined" != typeof window && (window.ExpressionParser = r),
            t.exports = r
    }
        , {
        121: 121,
        137: 137
    }],
    137: [function (e, t, i) {
        "use strict";
        const s = e(119)
            , n = e(199)
            , r = e(120)
            , a = {}
            , o = {
                smoothstep: (e, t, i) => (i = o.clamp((i - e) / (t - e), 0, 1)) * i * (3 - 2 * i),
                deg: e => 180 * e / Math.PI,
                rad: e => e * Math.PI / 180,
                random: (e, t) => Math.random() * (t - e) + e,
                parseInt: function (e) {
                    function t(t, i) {
                        return e.apply(this, arguments)
                    }
                    return t.toString = function () {
                        return e.toString()
                    }
                        ,
                        t
                }((e, t) => parseInt(e, t)),
                parseFloat: function (e) {
                    function t(t) {
                        return e.apply(this, arguments)
                    }
                    return t.toString = function () {
                        return e.toString()
                    }
                        ,
                        t
                }(e => parseFloat(e)),
                atan: Math.atan2
            };
        Object.getOwnPropertyNames(Math).forEach(e => o[e] ? null : o[e.toLowerCase()] = Math[e]),
            Object.getOwnPropertyNames(n).forEach(e => o[e] ? null : o[e.toLowerCase()] = n[e]),
            Object.getOwnPropertyNames(r).forEach(e => o[e] = r[e]);
        let l = null;
        const c = "a"
            , h = "STRING_CONST"
            , d = "ALPHA"
            , u = "("
            , m = ")"
            , p = "PLUS"
            , f = "MINUS"
            , y = "MUL"
            , g = "DIV"
            , v = "INTEGER_CONST"
            , _ = "FLOAT_CONST"
            , E = ","
            , b = "EOF"
            , w = "COALESCE"
            , A = "BOOL"
            , T = "L_NOT"
            , x = "L_OR"
            , I = "L_AND"
            , S = "QUESTION_MARK"
            , C = "COMPARISON"
            , P = "COLON"
            , O = {
                NUMBERS: /\d|\d\.\d/,
                DIGIT: /\d/,
                MATH_OPERATOR: /[-+*/]/,
                PAREN: /[()]/,
                QUOTE: /['"`]/,
                WHITE_SPACE: /\s/,
                ALPHA: /[a-zA-Z]|%/,
                ALPHANUMERIC: /[a-zA-Z0-9]/,
                OBJECT_UNIT: /^(t|l|b|r|%w|%h|%|h|w)$/,
                GLOBAL_METRICS_UNIT: /^(px|vh|vw)$/,
                ANY_UNIT: /^(t|l|b|r|%w|%h|%|h|w|px|vh|vw|rad|deg)$/,
                MATH_FUNCTION: new RegExp("\\b(".concat(Object.keys(o).join("|"), ")\\b"), "i"),
                EQUALITY_OPERATOR: /==/,
                INEQUALITY_OPERATOR: /!=/,
                L_AND: /&&/,
                L_OR: /\|\|/
            }
            , D = function (e, t, i, s = "") {
                let n = t.slice(Math.max(i, 0), Math.min(t.length, i + 3))
                    , r = new Error("Expression Error. ".concat(e, ' in expression "').concat(t, '", near "').concat(n, '"'));
                throw console.error(r.message, l ? l.keyframe || l.target : ""),
                r
            }
            , M = {
                round: 1,
                clamp: 3,
                lerp: 3,
                random: 2,
                atan: 2,
                floor: 1,
                ceil: 1,
                abs: 1,
                cos: 1,
                sin: 1,
                smoothstep: 3,
                rad: 1,
                deg: 1,
                pow: 2,
                calc: 1
            };
        class N {
            constructor(e, t) {
                this.type = e,
                    this.value = t
            }
        }
        N.ONE = new N("100", 100),
            N.EOF = new N(b, null);
        class L {
            constructor(e) {
                this.type = e
            }
        }
        class R extends L {
            constructor(e, t) {
                super("UnaryOp"),
                    this.token = e,
                    this.expr = t
            }
        }
        class k extends L {
            constructor(e, t, i) {
                super("BinOp"),
                    this.left = e,
                    this.op = t,
                    this.right = i
            }
        }
        class F extends L {
            constructor(e, t, i) {
                super("TernaryOp"),
                    this.condition = e,
                    this.left = t,
                    this.right = i
            }
        }
        class K extends L {
            constructor(e, t) {
                if (super("MathOp"),
                    this.op = e,
                    this.list = t,
                    M[e.value] && t.length !== M[e.value])
                    throw new Error("Incorrect number of arguments for '".concat(e.value, "'. Received ").concat(t.length, ", expected ").concat(M[e.value]))
            }
        }
        class U extends L {
            constructor(e) {
                super("Str"),
                    this.token = e,
                    this.value = e.value
            }
        }
        class G extends L {
            constructor(e) {
                super("Num"),
                    this.token = e,
                    this.value = e.value
            }
        }
        class B extends L {
            constructor(e) {
                super("Bool"),
                    this.token = e,
                    this.value = e.value
            }
        }
        class z extends L {
            constructor(e, t, i) {
                super("RefValue"),
                    this.num = e,
                    this.ref = t,
                    this.unit = i
            }
        }
        class V extends L {
            constructor(e, t, i = !0) {
                super("CSSValue"),
                    this.ref = e,
                    this.propertyName = t,
                    this.evaluate = i
            }
        }
        class j extends L {
            constructor(e, t) {
                super("PropValue"),
                    this.ref = e,
                    this.propertyName = t
            }
        }
        class H {
            constructor(e) {
                let t;
                for (this.text = e,
                    this.pos = 0,
                    this.char = this.text[this.pos],
                    this.tokens = []; (t = this.getNextToken()) && t !== N.EOF;)
                    this.tokens.push(t);
                this.tokens.push(t)
            }
            advance() {
                var e;
                this.char = null !== (e = this.text[++this.pos]) && void 0 !== e ? e : null
            }
            skipWhiteSpace() {
                for (; null != this.char && O.WHITE_SPACE.test(this.char);)
                    this.advance()
            }
            name() {
                let e = "";
                for (; null != this.char && O.ALPHA.test(this.char);)
                    e += this.char,
                        this.advance();
                return "true" === e || "false" === e ? new N(A, "true" === e) : new N(d, e)
            }
            number() {
                let e = "";
                for ("." === this.char && (e += this.char,
                    this.advance()); null != this.char && O.DIGIT.test(this.char);)
                    e += this.char,
                        this.advance();
                if (null != this.char && "." === this.char)
                    for (e.includes(".") && D("Number appears to contain 2 decimal points", this.text, this.pos),
                        e += this.char,
                        this.advance(); null != this.char && O.DIGIT.test(this.char);)
                        e += this.char,
                            this.advance();
                return "." === e && D("Attempted to parse a number, but found only a decimal point", this.text, this.pos),
                    e.includes(".") ? new N(_, parseFloat(e)) : new N(v, parseInt(e))
            }
            string(e) {
                let t = "";
                for (this.advance(); null !== this.char && this.char !== e;)
                    t += this.char,
                        this.advance();
                if (this.char === e)
                    return this.advance(),
                        new N(h, t);
                throw new Error("Unterminated string literal in expression ".concat(this.text))
            }
            getNextToken() {
                for (; null != this.char;)
                    if (O.WHITE_SPACE.test(this.char))
                        this.skipWhiteSpace();
                    else {
                        if ("." === this.char || O.DIGIT.test(this.char))
                            return this.number();
                        if ("," === this.char)
                            return this.advance(),
                                new N(E, ",");
                        if (":" === this.char)
                            return this.advance(),
                                new N(P, ":");
                        if (O.MATH_OPERATOR.test(this.char)) {
                            let e = ""
                                , t = this.char;
                            switch (t) {
                                case "+":
                                    e = p;
                                    break;
                                case "-":
                                    e = f;
                                    break;
                                case "*":
                                    e = y;
                                    break;
                                case "/":
                                    e = g
                            }
                            return this.advance(),
                                new N(e, t)
                        }
                        if (O.PAREN.test(this.char)) {
                            let e = ""
                                , t = this.char;
                            switch (t) {
                                case "(":
                                    e = u;
                                    break;
                                case ")":
                                    e = m
                            }
                            return this.advance(),
                                new N(e, t)
                        }
                        if (O.QUOTE.test(this.char))
                            return this.string(this.char);
                        if (O.ALPHA.test(this.char))
                            return this.name();
                        if ("?" === this.char)
                            return this.advance(),
                                "?" === this.char ? (this.advance(),
                                    new N(w, "??")) : new N(S, "?");
                        if ("<" === this.char)
                            return this.advance(),
                                "=" === this.char ? (this.advance(),
                                    new N(C, "<=")) : new N(C, "<");
                        if (">" === this.char)
                            return this.advance(),
                                "=" === this.char ? (this.advance(),
                                    new N(C, ">=")) : new N(C, ">");
                        if (O.EQUALITY_OPERATOR.test(this.text.substring(this.pos, this.pos + 2)))
                            return this.advance(),
                                this.advance(),
                                "=" === this.char ? (this.advance(),
                                    new N(C, "===")) : new N(C, "==");
                        if (O.INEQUALITY_OPERATOR.test(this.text.substring(this.pos, this.pos + 2)))
                            return this.advance(),
                                this.advance(),
                                "=" === this.char ? (this.advance(),
                                    new N(C, "!==")) : new N(C, "!=");
                        if (O.L_OR.test(this.text.substring(this.pos, this.pos + 2)))
                            return this.advance(),
                                this.advance(),
                                new N(x, "||");
                        if (O.L_AND.test(this.text.substring(this.pos, this.pos + 2)))
                            return this.advance(),
                                this.advance(),
                                new N(I, "&&");
                        if ("!" === this.char)
                            return this.advance(),
                                new N(T, "!");
                        D('Unexpected character "'.concat(this.char, '"'), this.text, this.pos)
                    }
                return N.EOF
            }
        }
        class W {
            constructor(e) {
                this.lexer = e,
                    this.pos = 0
            }
            get currentToken() {
                return this.lexer.tokens[this.pos]
            }
            error(e, t = "") {
                D(e + t, this.lexer.text, this.pos)
            }
            consume(e) {
                let t = this.currentToken;
                return t.type === e ? this.pos += 1 : this.error("Invalid token ".concat(this.currentToken.value, ", expected ").concat(e)),
                    t
            }
            consumeList(e) {
                e.includes(this.currentToken) ? this.pos += 1 : this.error("Invalid token ".concat(this.currentToken.value, ", expected ").concat(e))
            }
            expr() {
                return this.conditionalExpr()
            }
            conditionalExpr() {
                let e = this.logicalExpr();
                for (; this.currentToken.type === S;) {
                    this.consume(S);
                    const t = this.expr();
                    this.consume(P);
                    const i = this.expr();
                    e = new F(e, t, i)
                }
                return e
            }
            logicalExpr() {
                let e = this.coalesceExpr();
                for (; ;)
                    if (this.currentToken.type === I)
                        e = new k(e, this.consume(this.currentToken.type), this.coalesceExpr());
                    else {
                        if (this.currentToken.type !== x)
                            break;
                        e = new k(e, this.consume(this.currentToken.type), this.logicalExpr())
                    }
                return e
            }
            coalesceExpr() {
                let e = this.comparisonExpr();
                for (; this.currentToken.type === w;) {
                    const t = this.consume(w);
                    e = new k(e, t, this.comparisonExpr())
                }
                return e
            }
            comparisonExpr() {
                let e = this.additiveExpr();
                for (; this.currentToken.type === C;) {
                    const t = this.consume(C);
                    e = new k(e, t, this.additiveExpr())
                }
                return e
            }
            additiveExpr() {
                let e = this.term();
                for (; this.currentToken.type === p || this.currentToken.type === f;) {
                    const t = this.currentToken;
                    this.consume(t.type),
                        e = new k(e, t, this.term())
                }
                return e
            }
            term() {
                let e = this.unaryExpr();
                for (; this.currentToken.type === y || this.currentToken.type === g;) {
                    const t = this.currentToken;
                    this.consume(t.type),
                        e = new k(e, t, this.unaryExpr())
                }
                return e
            }
            unaryExpr() {
                return this.currentToken.type === T || this.currentToken.type === p || this.currentToken.type === f ? new R(this.consume(this.currentToken.type), this.unaryExpr()) : this.factor()
            }
            factor() {
                if (this.currentToken.type === A)
                    return new B(this.consume(A));
                if (this.currentToken.type === h)
                    return new U(this.consume(this.currentToken.type));
                if (this.currentToken.type === v || this.currentToken.type === _) {
                    let e = new G(this.currentToken);
                    return this.pos += 1,
                        O.MATH_OPERATOR.test(this.currentToken.value) || this.currentToken.type === m || this.currentToken.type === E || this.currentToken.type === b ? e : this.currentToken.type === d && this.currentToken.value === c ? (this.consume(d),
                            new z(e, this.anchorIndex(), this.unit(O.ANY_UNIT))) : this.currentToken.type === d ? ("%a" === this.currentToken.value && this.error("%a is invalid, try removing the %"),
                                new z(e, null, this.unit())) : e
                }
                if (O.OBJECT_UNIT.test(this.currentToken.value))
                    return new z(new G(N.ONE), null, this.unit());
                if (this.currentToken.value === c) {
                    this.consume(d);
                    const e = this.anchorIndex();
                    if (O.OBJECT_UNIT.test(this.currentToken.value))
                        return new z(new G(N.ONE), e, this.unit())
                } else if (this.currentToken.type === d) {
                    if ("calc" === this.currentToken.value)
                        return this.consume(d),
                            this.expr();
                    if ("css" === this.currentToken.value || "cssStr" === this.currentToken.value || "var" === this.currentToken.value || "prop" === this.currentToken.value) {
                        const e = "prop" !== this.currentToken.value ? V : j
                            , t = !this.currentToken.value.endsWith("Str");
                        this.consume(d),
                            this.consume(u);
                        const i = this.propertyName();
                        let s = null;
                        return this.currentToken.type === E && (this.consume(E),
                            this.consume(d),
                            s = this.anchorIndex()),
                            this.consume(m),
                            new e(s, i, t)
                    }
                    if (O.MATH_FUNCTION.test(this.currentToken.value)) {
                        const e = this.currentToken.value
                            , t = e.toLowerCase();
                        if ("number" == typeof o[t])
                            return this.consume(d),
                                new G(new N(d, o[t]));
                        const i = N[e] || new N(e, e)
                            , s = [];
                        this.consume(d),
                            this.consume(u);
                        let n = null;
                        do {
                            this.currentToken.value === E && this.consume(E),
                                n = this.expr(),
                                s.push(n)
                        } while (this.currentToken.value === E);
                        return this.consume(m),
                            new K(i, s)
                    }
                } else if (this.currentToken.type === u) {
                    this.consume(u);
                    let e = this.expr();
                    return this.consume(m),
                        e
                }
                this.error("Unexpected token '".concat(this.currentToken.value, "'"))
            }
            propertyName() {
                let e = "";
                for (; this.currentToken.type === d || this.currentToken.type === f || this.currentToken.type === v;)
                    e += this.currentToken.value,
                        this.pos += 1;
                return e
            }
            unit(e = O.ANY_UNIT) {
                const t = this.currentToken;
                if (t.type === d && e.test(t.value))
                    return this.consume(d),
                        new N(d, t.value = t.value.replace(/%(h|w)/, "$1").replace("%", "h"));
                this.error("Expected unit type")
            }
            anchorIndex() {
                const e = this.currentToken;
                if (e.type === v)
                    return this.consume(v),
                        new G(e);
                this.error("Invalid anchor reference", ". Should be something like a0, a1, a2")
            }
            parse() {
                const e = this.expr();
                return this.currentToken !== N.EOF && this.error("Unexpected token ".concat(this.currentToken.value)),
                    e
            }
        }
        class q {
            constructor(e) {
                this.parser = e,
                    this.root = e.parse()
            }
            visit(e) {
                let t = this[e.type];
                if (!t)
                    throw new Error("No visit method named, ".concat(t));
                return t.call(this, e)
            }
            BinOp(e) {
                var t;
                switch (e.op.type) {
                    case p:
                        return this.visit(e.left) + this.visit(e.right);
                    case f:
                        return this.visit(e.left) - this.visit(e.right);
                    case y:
                        return this.visit(e.left) * this.visit(e.right);
                    case g:
                        return this.visit(e.left) / this.visit(e.right);
                    case C:
                        return this.comparisonOp(e);
                    case x:
                        return this.visit(e.left) || this.visit(e.right);
                    case I:
                        return this.visit(e.left) && this.visit(e.right);
                    case w:
                        return null !== (t = this.visit(e.left)) && void 0 !== t ? t : this.visit(e.right);
                    default:
                        throw new Error("Unhandled binary operation: ".concat(e.op.type))
                }
            }
            comparisonOp(e) {
                switch (e.op.value) {
                    case "==":
                        return this.visit(e.left) == this.visit(e.right);
                    case "===":
                        return this.visit(e.left) === this.visit(e.right);
                    case "!=":
                        return this.visit(e.left) != this.visit(e.right);
                    case "!==":
                        return this.visit(e.left) !== this.visit(e.right);
                    case "<":
                        return this.visit(e.left) < this.visit(e.right);
                    case "<=":
                        return this.visit(e.left) <= this.visit(e.right);
                    case ">":
                        return this.visit(e.left) > this.visit(e.right);
                    case ">=":
                        return this.visit(e.left) >= this.visit(e.right);
                    default:
                        throw new Error("Unhandled comparison operation: ".concat(e.op.value))
                }
            }
            TernaryOp(e) {
                return this.visit(e.condition) ? this.visit(e.left) : this.visit(e.right)
            }
            RefValue(e) {
                let t = this.unwrapReference(e)
                    , i = e.unit.value
                    , n = e.num.value;
                const r = l.metrics.get(t);
                switch (i) {
                    case "h":
                        return .01 * n * r.height;
                    case "t":
                        return .01 * n * r.top;
                    case "vh":
                        return .01 * n * s.pageMetrics.windowHeight;
                    case "vw":
                        return .01 * n * s.pageMetrics.windowWidth;
                    case "px":
                        return n;
                    case "w":
                        return .01 * n * r.width;
                    case "b":
                        return .01 * n * r.bottom;
                    case "l":
                        return .01 * n * r.left;
                    case "r":
                        return .01 * n * r.right;
                    case "rad":
                        return 180 * n / Math.PI;
                    case "deg":
                        return n
                }
            }
            PropValue(e) {
                return (null === e.ref ? l.target : l.anchors[e.ref.value])[e.propertyName]
            }
            CSSValue(e) {
                let t = this.unwrapReference(e);
                const i = getComputedStyle(t).getPropertyValue(e.propertyName);
                return e.evaluate ? "" === i ? void 0 : q.Parse(i).execute(l) : i.trimStart()
            }
            Num(e) {
                return e.value
            }
            Bool(e) {
                return e.value
            }
            Str(e) {
                return e.value
            }
            UnaryOp(e) {
                switch (e.token.type) {
                    case T:
                        return !this.visit(e.expr);
                    case p:
                        return +this.visit(e.expr);
                    case f:
                        return -this.visit(e.expr)
                }
            }
            MathOp(e) {
                let t = e.list.map(e => this.visit(e));
                return o[e.op.value].apply(null, t)
            }
            unwrapReference(e) {
                return null === e.ref ? l.target : (e.ref.value >= l.anchors.length && console.error("Not enough anchors supplied for expression ".concat(this.parser.lexer.text), l.target),
                    l.anchors[e.ref.value])
            }
            execute(e) {
                return l = e,
                    this.visit(this.root)
            }
            static Parse(e) {
                return a[e] || (a[e] = new q(new W(new H(e))))
            }
        }
        q.programs = a,
            t.exports = q
    }
        , {
        119: 119,
        120: 120,
        199: 199
    }],
    138: [function (e, t, i) {
        "use strict";
        const s = e(110)
            , n = e(199)
            , r = e(143)
            , a = e(119)
            , o = e(118)
            , l = e(125)
            , c = e(129)
            , h = e(121)
            , d = e(136)
            , u = e(116)
            , { RAFExecutor: m } = e(198);
        let p = 0;
        t.exports = class extends s {
            constructor(e, t) {
                super(),
                    this.anim = t,
                    this.element = e,
                    this.name = this.name || e.getAttribute("data-anim-scroll-group"),
                    this.isEnabled = !0,
                    this.position = new l,
                    this.metrics = new h,
                    this.metrics.add(this.element),
                    this.expressionParser = new d(this),
                    this.boundsMin = 0,
                    this.boundsMax = 0,
                    this.timelineUpdateRequired = !1,
                    this._keyframesDirty = !1,
                    this.viewableRange = this.createViewableRange(),
                    this.defaultEase = a.KeyframeDefaults.ease,
                    this.keyframeControllers = [],
                    this.updateProgress(this.getPosition()),
                    this.onDOMRead = this.onDOMRead.bind(this),
                    this.onDOMWrite = this.onDOMWrite.bind(this),
                    this.gui = null,
                    this.computedStyleCache = {},
                    this.destroyed = !1,
                    this.rafEmitter,
                    this.finalizeInit()
            }
            finalizeInit() {
                this.element._animInfo = new o(this, null, !0),
                    this.setupRAFEmitter()
            }
            destroy() {
                this.destroyed = !0,
                    this.expressionParser.destroy();
                for (let e = 0, t = this.keyframeControllers.length; e < t; e++)
                    this.keyframeControllers[e].destroy();
                this.keyframeControllers = [],
                    this.gui && (this.gui.destroy(),
                        this.gui = null),
                    this.metrics.destroy(),
                    this.rafEmitter.destroy(),
                    this.rafEmitter = null,
                    this.anim = null,
                    this.element._animInfo && this.element._animInfo.group === this && (this.element._animInfo.group = null,
                        this.element._animInfo = null),
                    this.element = null,
                    this.isEnabled = !1,
                    super.destroy()
            }
            removeKeyframeController(e) {
                return e.destroyed || !this.keyframeControllers.includes(e) ? Promise.resolve() : (e._allKeyframes.forEach(e => e.markedForRemoval = !0),
                    this.keyframesDirty = !0,
                    new Promise(t => {
                        this.rafEmitter.afterDraw(() => {
                            const i = this.keyframeControllers.indexOf(e);
                            -1 !== i ? (this.keyframeControllers.splice(i, 1),
                                e.onDOMWrite(),
                                e.destroy(),
                                this.gui && this.gui.create(),
                                t()) : t()
                        }
                        )
                    }
                    ))
            }
            remove() {
                return this.anim && this.anim.removeGroup(this)
            }
            clear() {
                return Promise.all(this.keyframeControllers.map(e => this.removeKeyframeController(e)))
            }
            setupRAFEmitter(e) {
                this.rafEmitter && this.rafEmitter.destroy(),
                    this.rafEmitter = e || m.create(),
                    this.rafEmitter.on("update", this.onDOMRead),
                    this.rafEmitter.on("draw", this.onDOMWrite),
                    this.rafEmitter.once("before:draw", () => this.reconcile())
            }
            requestDOMChange() {
                return !!this.isEnabled && this.rafEmitter.run()
            }
            onDOMRead() {
                this.keyframesDirty && this.onKeyframesDirty();
                for (let e = 0, t = this.keyframeControllers.length; e < t; e++)
                    this.keyframeControllers[e].onDOMRead(this.position.local)
            }
            onDOMWrite() {
                for (let e = 0, t = this.keyframeControllers.length; e < t; e++)
                    this.keyframeControllers[e].onDOMWrite();
                this.needsUpdate() && this.requestDOMChange(),
                    this.computedStyleCache = {}
            }
            needsUpdate() {
                if (this._keyframesDirty)
                    return !0;
                for (let e = 0, t = this.keyframeControllers.length; e < t; e++)
                    if (this.keyframeControllers[e].needsUpdate())
                        return !0;
                return !1
            }
            addKeyframe(e, t) {
                let i = this.getControllerForTarget(e);
                return null === i && (i = new u(this, e),
                    this.keyframeControllers.push(i)),
                    this.keyframesDirty = !0,
                    i.addKeyframe(t)
            }
            addEvent(e, t) {
                t.event = t.event || "Generic-Event-Name-" + p++;
                let i = void 0 !== t.end && t.end !== t.start;
                const s = this.addKeyframe(e, t);
                return i ? (t.onEnterOnce && s.controller.once(t.event + ":enter", t.onEnterOnce),
                    t.onExitOnce && s.controller.once(t.event + ":exit", t.onExitOnce),
                    t.onEnter && s.controller.on(t.event + ":enter", t.onEnter),
                    t.onExit && s.controller.on(t.event + ":exit", t.onExit)) : (t.onEventOnce && s.controller.once(t.event, t.onEventOnce),
                        t.onEventReverseOnce && s.controller.once(t.event + ":reverse", t.onEventReverseOnce),
                        t.onEvent && s.controller.on(t.event, t.onEvent),
                        t.onEventReverse && s.controller.on(t.event + ":reverse", t.onEventReverse)),
                    s
            }
            forceUpdate({ waitForNextUpdate: e = !0, silent: t = !1 } = {}) {
                this.isEnabled && (this.refreshMetrics(),
                    this.timelineUpdateRequired = !0,
                    e ? this.keyframesDirty = !0 : this.onKeyframesDirty({
                        silent: t
                    }))
            }
            onKeyframesDirty({ silent: e = !1 } = {}) {
                this.determineActiveKeyframes(),
                    this.keyframesDirty = !1,
                    this.metrics.refreshMetrics(this.element),
                    this.viewableRange = this.createViewableRange();
                for (let e = 0, t = this.keyframeControllers.length; e < t; e++)
                    this.keyframeControllers[e].updateAnimationConstraints();
                this.updateBounds(),
                    this.updateProgress(this.getPosition()),
                    e || this.updateTimeline(),
                    this.gui && this.gui.create()
            }
            refreshMetrics() {
                let e = new Set([this.element]);
                this.keyframeControllers.forEach(t => {
                    e.add(t.element),
                        t._allKeyframes.forEach(t => t.anchors.forEach(t => e.add(t)))
                }
                ),
                    this.metrics.refreshCollection(e),
                    this.viewableRange = this.createViewableRange()
            }
            reconcile() {
                for (let e = 0, t = this.keyframeControllers.length; e < t; e++)
                    this.keyframeControllers[e].reconcile()
            }
            determineActiveKeyframes(e) {
                e = e || r(Array.from(document.documentElement.classList));
                for (let t = 0, i = this.keyframeControllers.length; t < i; t++)
                    this.keyframeControllers[t].determineActiveKeyframes(e)
            }
            updateBounds() {
                if (0 === this.keyframeControllers.length)
                    return this.boundsMin = 0,
                        void (this.boundsMax = 0);
                let e = {
                    min: Number.POSITIVE_INFINITY,
                    max: Number.NEGATIVE_INFINITY
                };
                for (let t = 0, i = this.keyframeControllers.length; t < i; t++)
                    this.keyframeControllers[t].getBounds(e);
                let t = this.convertTValueToScrollPosition(e.min)
                    , i = this.convertTValueToScrollPosition(e.max);
                i - t < a.pageMetrics.windowHeight ? (e.min = this.convertScrollPositionToTValue(t - .5 * a.pageMetrics.windowHeight),
                    e.max = this.convertScrollPositionToTValue(i + .5 * a.pageMetrics.windowHeight)) : (e.min -= .001,
                        e.max += .001),
                    this.boundsMin = e.min,
                    this.boundsMax = e.max,
                    this.timelineUpdateRequired = !0
            }
            createViewableRange() {
                return new c(this.metrics.get(this.element), a.pageMetrics.windowHeight)
            }
            _onBreakpointChange(e, t) {
                this.keyframesDirty = !0,
                    this.determineActiveKeyframes()
            }
            updateProgress(e) {
                this.hasDuration() ? (this.position.localUnclamped = (e - this.viewableRange.a) / (this.viewableRange.d - this.viewableRange.a),
                    this.position.local = n.clamp(this.position.localUnclamped, this.boundsMin, this.boundsMax)) : this.position.local = this.position.localUnclamped = 0
            }
            performTimelineDispatch() {
                for (let e = 0, t = this.keyframeControllers.length; e < t; e++)
                    this.keyframeControllers[e].updateLocalProgress(this.position.local);
                this.trigger(a.EVENTS.ON_TIMELINE_UPDATE, this.position.local),
                    this.trigger("update", this.position.local),
                    this.timelineUpdateRequired = !1,
                    this.position.lastPosition !== this.position.local && (this.position.lastPosition <= this.boundsMin && this.position.localUnclamped > this.boundsMin ? (this.trigger(a.EVENTS.ON_TIMELINE_START, this),
                        this.trigger("start", this)) : this.position.lastPosition >= this.boundsMin && this.position.localUnclamped < this.boundsMin ? (this.trigger(a.EVENTS.ON_TIMELINE_START + ":reverse", this),
                            this.trigger("start:reverse", this)) : this.position.lastPosition <= this.boundsMax && this.position.localUnclamped >= this.boundsMax ? (this.trigger(a.EVENTS.ON_TIMELINE_COMPLETE, this),
                                this.trigger("complete", this)) : this.position.lastPosition >= this.boundsMax && this.position.localUnclamped < this.boundsMax && (this.trigger(a.EVENTS.ON_TIMELINE_COMPLETE + ":reverse", this),
                                    this.trigger("complete:reverse", this))),
                    null !== this.gui && this.gui.onScrollUpdate(this.position)
            }
            updateTimeline(e) {
                if (!this.isEnabled)
                    return !1;
                void 0 === e && (e = this.getPosition()),
                    this.updateProgress(e);
                let t = this.position.lastPosition === this.boundsMin || this.position.lastPosition === this.boundsMax
                    , i = this.position.localUnclamped === this.boundsMin || this.position.localUnclamped === this.boundsMax;
                if (!this.timelineUpdateRequired && t && i && this.position.lastPosition === e)
                    return void (this.position.local = this.position.localUnclamped);
                if (this.timelineUpdateRequired || this.position.localUnclamped > this.boundsMin && this.position.localUnclamped < this.boundsMax)
                    return this.performTimelineDispatch(),
                        this.requestDOMChange(),
                        void (this.position.lastPosition = this.position.localUnclamped);
                let s = this.position.lastPosition > this.boundsMin && this.position.lastPosition < this.boundsMax
                    , n = this.position.localUnclamped <= this.boundsMin || this.position.localUnclamped >= this.boundsMax;
                if (s && n)
                    return this.performTimelineDispatch(),
                        this.requestDOMChange(),
                        void (this.position.lastPosition = this.position.localUnclamped);
                const r = this.position.lastPosition < this.boundsMin && this.position.localUnclamped > this.boundsMax
                    , a = this.position.lastPosition > this.boundsMax && this.position.localUnclamped < this.boundsMax;
                (r || a) && (this.performTimelineDispatch(),
                    this.requestDOMChange(),
                    this.position.lastPosition = this.position.localUnclamped),
                    null !== this.gui && this.gui.onScrollUpdate(this.position)
            }
            _onScroll(e) {
                this.updateTimeline(e)
            }
            convertScrollPositionToTValue(e) {
                return this.hasDuration() ? n.map(e, this.viewableRange.a, this.viewableRange.d, 0, 1) : 0
            }
            convertTValueToScrollPosition(e) {
                return this.hasDuration() ? n.map(e, 0, 1, this.viewableRange.a, this.viewableRange.d) : 0
            }
            hasDuration() {
                return this.viewableRange.a !== this.viewableRange.d
            }
            getPosition() {
                return a.pageMetrics.scrollY
            }
            getControllerForTarget(e) {
                if (!e._animInfo || !e._animInfo.controllers)
                    return null;
                if (e._animInfo.controller && e._animInfo.controller.group === this)
                    return e._animInfo.controller;
                const t = e._animInfo.controllers;
                for (let e = 0, i = t.length; e < i; e++)
                    if (t[e].group === this)
                        return t[e];
                return null
            }
            set keyframesDirty(e) {
                this._keyframesDirty = e,
                    this._keyframesDirty && this.requestDOMChange()
            }
            get keyframesDirty() {
                return this._keyframesDirty
            }
        }
    }
        , {
        110: 110,
        116: 116,
        118: 118,
        119: 119,
        121: 121,
        125: 125,
        129: 129,
        136: 136,
        143: 143,
        198: 198,
        199: 199
    }],
    139: [function (e, t, i) {
        "use strict";
        const s = e(138)
            , n = e(113)
            , r = e(199);
        let a = 0;
        const { RAFExecutor: o } = e(198);
        class l extends s {
            constructor(e, t) {
                e || ((e = document.createElement("div")).className = "TimeGroup-" + a++),
                    super(e, t),
                    this.name = this.name || e.getAttribute("data-anim-time-group"),
                    this._isPaused = !0,
                    this._repeats = 0,
                    this._isReversed = !1,
                    this._timeScale = 1,
                    this._chapterPlayer = new n(this),
                    this.now = performance.now(),
                    this._playheadEmitter
            }
            finalizeInit() {
                if (!this.anim)
                    throw "TimeGroup not instantiated correctly. Please use `AnimSystem.createTimeGroup(el)`";
                this.onPlayTimeUpdate = this.onPlayTimeUpdate.bind(this),
                    super.finalizeInit()
            }
            progress(e) {
                if (void 0 === e)
                    return 0 === this.boundsMax ? 0 : this.position.local / this.boundsMax;
                let t = e * this.boundsMax;
                return this.timelineUpdateRequired = !0,
                    this.updateTimeline(t),
                    e
            }
            time(e) {
                return void 0 === e ? this.position.local : (e = r.clamp(e, this.boundsMin, this.duration),
                    this.timelineUpdateRequired = !0,
                    this.updateTimeline(e),
                    e)
            }
            play(e) {
                this.reversed(!1),
                    this.isEnabled = !0,
                    this._isPaused = !1,
                    this.time(e),
                    this.now = performance.now(),
                    this._playheadEmitter.run()
            }
            reverse(e) {
                this.reversed(!0),
                    this.isEnabled = !0,
                    this._isPaused = !1,
                    this.time(e),
                    this.now = performance.now(),
                    this._playheadEmitter.run()
            }
            reversed(e) {
                if (void 0 === e)
                    return this._isReversed;
                this._isReversed = e
            }
            restart() {
                this._isReversed ? (this.progress(1),
                    this.reverse(this.time())) : (this.progress(0),
                        this.play(this.time()))
            }
            pause(e) {
                this.time(e),
                    this._isPaused = !0
            }
            paused(e) {
                return void 0 === e ? this._isPaused : (this._isPaused = e,
                    this._isPaused || this.play(),
                    this)
            }
            onPlayTimeUpdate() {
                if (this._isPaused)
                    return;
                let e = performance.now()
                    , t = (e - this.now) / 1e3;
                this.now = e,
                    this._isReversed && (t = -t);
                let i = this.time() + t * this._timeScale;
                if (this._repeats === l.REPEAT_FOREVER || this._repeats > 0) {
                    let e = !1;
                    !this._isReversed && i > this.boundsMax ? (i -= this.boundsMax,
                        e = !0) : this._isReversed && i < 0 && (i = this.boundsMax + i,
                            e = !0),
                        e && (this._repeats = this._repeats === l.REPEAT_FOREVER ? l.REPEAT_FOREVER : this._repeats - 1)
                }
                this.time(i);
                let s = !this._isReversed && this.position.local !== this.duration
                    , n = this._isReversed && 0 !== this.position.local;
                s || n ? this._playheadEmitter.run() : this.paused(!0)
            }
            updateProgress(e) {
                this.hasDuration() ? (this.position.localUnclamped = e,
                    this.position.local = r.clamp(this.position.localUnclamped, this.boundsMin, this.boundsMax)) : this.position.local = this.position.localUnclamped = 0
            }
            updateBounds() {
                if (0 === this.keyframeControllers.length)
                    return this.boundsMin = 0,
                        void (this.boundsMax = 0);
                let e = {
                    min: Number.POSITIVE_INFINITY,
                    max: Number.NEGATIVE_INFINITY
                };
                for (let t = 0, i = this.keyframeControllers.length; t < i; t++)
                    this.keyframeControllers[t].getBounds(e);
                this.boundsMin = 0,
                    this.boundsMax = e.max,
                    this.viewableRange.a = 0,
                    this.viewableRange.d = this.boundsMax,
                    this.timelineUpdateRequired = !0
            }
            setupRAFEmitter(e) {
                this._playheadEmitter = o.create(),
                    this._playheadEmitter.on("update", this.onPlayTimeUpdate),
                    super.setupRAFEmitter(e)
            }
            get duration() {
                return this.keyframesDirty && this.onKeyframesDirty({
                    silent: !0
                }),
                    this.boundsMax
            }
            timeScale(e) {
                return void 0 === e ? this._timeScale : (this._timeScale = e,
                    this)
            }
            repeats(e) {
                return void 0 === e ? this._repeats : (this._repeats = e,
                    e)
            }
            getPosition() {
                return this.position.local
            }
            addChapter(e) {
                return this._chapterPlayer.addChapter(e)
            }
            playToChapter(e) {
                return this._chapterPlayer.playToChapter(e)
            }
            convertScrollPositionToTValue(e) {
                return e
            }
            convertTValueToScrollPosition(e) {
                return e
            }
            hasDuration() {
                return this.duration > 0
            }
            destroy() {
                this._chapterPlayer.destroy(),
                    this._playheadEmitter.destroy(),
                    this._playheadEmitter = null,
                    super.destroy()
            }
            get timelineProgress() {
                return this.progress()
            }
            set timelineProgress(e) {
                this.progress(e)
            }
            get progressValue() {
                return this.progress()
            }
            set progressValue(e) {
                this.progress(e)
            }
            get timeValue() {
                return this.time()
            }
            set timeValue(e) {
                this.time(e)
            }
        }
        l.REPEAT_FOREVER = -1,
            t.exports = l
    }
        , {
        113: 113,
        138: 138,
        198: 198,
        199: 199
    }],
    140: [function (e, t, i) {
        "use strict";
        const s = e(138)
            , n = (e(113),
                e(199));
        let r = 0;
        const { RAFExecutor: a } = e(198);
        t.exports = class extends s {
            constructor(e, t) {
                e || ((e = document.createElement("div")).className = "TweenGroup-" + r++),
                    super(e, t),
                    this.name = "Tweens",
                    this.keyframes = [],
                    this._isPaused = !1,
                    this.now = performance.now(),
                    this._timeEmitter
            }
            finalizeInit() {
                this.onTimeEmitterUpdate = this.onTimeEmitterUpdate.bind(this),
                    this.removeExpiredKeyframeControllers = this.removeExpiredKeyframeControllers.bind(this),
                    super.finalizeInit()
            }
            destroy() {
                this._timeEmitter.destroy(),
                    this._timeEmitter = null,
                    this._keyframes = [],
                    super.destroy()
            }
            setupRAFEmitter(e) {
                this.now = performance.now(),
                    this._timeEmitter = a.create(),
                    this._timeEmitter.on("after:update", this.onTimeEmitterUpdate, !0),
                    super.setupRAFEmitter(e)
            }
            addTween(e, t) {
                if (void 0 !== t.start || void 0 !== t.end)
                    throw Error("Tweens do not have a start or end, they can only have a duration. Consider using a TimeGroup instead");
                if ("number" != typeof t.duration)
                    throw Error("Tween options.duration is undefined, or is not a number");
                let i, s;
                t.start = (t.delay || 0) + this.position.localUnclamped,
                    t.end = t.start + t.duration,
                    t.preserveState = !0,
                    t.snapAtCreation = !0,
                    e._animInfo && (i = e._animInfo.group,
                        s = e._animInfo.controller);
                let n = Object.assign({}, t)
                    , r = super.addKeyframe(e, n);
                return e._animInfo.group = i,
                    e._animInfo.controller = s,
                    [["onStart", "once"], ["onDraw", "on"]].forEach(([e, i]) => {
                        if (!t[e])
                            return;
                        let s = t[e]
                            , n = r.controller;
                        t[e] = n[i]("draw", e => {
                            r.markedForRemoval || (e.keyframe = r,
                                s(e),
                                e.keyframe = null)
                        }
                        )
                    }
                    ),
                    this.removeOverlappingProps(r),
                    this.keyframes.push(r),
                    this._timeEmitter.scheduled || (this.now = performance.now(),
                        this._timeEmitter.run()),
                    r
            }
            removeOverlappingProps(e) {
                if (e.controller._allKeyframes.length <= 1)
                    return;
                let t = Object.keys(e.animValues)
                    , i = e.controller;
                for (let s = 0, n = i._allKeyframes.length; s < n; s++) {
                    const n = i._allKeyframes[s];
                    if (n === e)
                        continue;
                    if (n.markedForRemoval)
                        continue;
                    let r = Object.keys(n.animValues)
                        , a = r.filter(e => t.includes(e));
                    a.length !== r.length ? a.forEach(e => delete n.animValues[e]) : (n.markedForRemoval = !0,
                        n.jsonProps.onDraw && n.controller.off("draw", n.jsonProps.onDraw))
                }
            }
            onTimeEmitterUpdate(e) {
                if (this._isPaused || 0 === this.keyframeControllers.length)
                    return;
                let t = performance.now()
                    , i = (t - this.now) / 1e3;
                this.now = t;
                let s = this.position.local + i;
                this.position.local = this.position.localUnclamped = s,
                    this.onTimeUpdate()
            }
            onTimeUpdate() {
                for (let e = 0, t = this.keyframes.length; e < t; e++)
                    this.keyframes[e].markedForRemoval || this.keyframes[e].updateLocalProgress(this.position.localUnclamped);
                this.requestDOMChange(),
                    this._timeEmitter.run(),
                    null !== this.gui && this.gui.onScrollUpdate(this.position)
            }
            onDOMRead() {
                if (this.keyframesDirty && this.onKeyframesDirty(),
                    0 !== this.keyframes.length)
                    for (let e = 0, t = this.keyframes.length; e < t; e++) {
                        this.keyframes[e].controller.needsWrite = !0;
                        for (let t in this.keyframes[e].animValues)
                            this.keyframes[e].onDOMRead(t)
                    }
            }
            onDOMWrite() {
                super.onDOMWrite(),
                    this.removeExpiredKeyframes()
            }
            removeExpiredKeyframes() {
                let e = this.keyframes.length
                    , t = e;
                for (; e--;) {
                    let t = this.keyframes[e];
                    t.destroyed ? this.keyframes.splice(e, 1) : (t.markedForRemoval && (t.jsonProps.onComplete && 1 === t.localT && (t.controller.eventObject.keyframe = t,
                        t.jsonProps.onComplete(t.controller.eventObject),
                        t.jsonProps.onComplete = null),
                        null !== this.gui && this.gui.isDraggingPlayhead || (t.remove(),
                            this.keyframes.splice(e, 1)),
                        t.jsonProps.onStart && t.controller.off("draw", t.jsonProps.onStart),
                        t.jsonProps.onDraw && t.controller.off("draw", t.jsonProps.onDraw)),
                        1 === t.localT && (t.markedForRemoval = !0))
                }
                this.keyframes.length === t && 0 !== this.keyframes.length || this._timeEmitter.afterUpdate(this.removeExpiredKeyframeControllers)
            }
            removeExpiredKeyframeControllers() {
                for (let e = 0, t = this.keyframeControllers.length; e < t; e++) {
                    let t = !0
                        , i = this.keyframeControllers[e];
                    for (let e = 0, s = i._allKeyframes.length; e < s; e++)
                        if (!i._allKeyframes[e].destroyed) {
                            t = !1;
                            break
                        }
                    t && i.remove()
                }
            }
            updateBounds() {
                this.boundsMin = Math.min(...this.keyframes.map(e => e.start)),
                    this.boundsMax = Math.max(...this.keyframes.map(e => e.end))
            }
            play() {
                this.isEnabled = !0,
                    this._isPaused = !1,
                    this.now = performance.now(),
                    this._timeEmitter.run()
            }
            pause() {
                this._isPaused = !0
            }
            paused() {
                return this._isPaused
            }
            time(e) {
                if (void 0 === e)
                    return this.position.local;
                this.position.local = this.position.localUnclamped = n.clamp(e, this.boundsMin, this.boundsMax),
                    this.onTimeUpdate()
            }
            performTimelineDispatch() { }
            hasDuration() {
                return !0
            }
            getPosition() {
                return this.position.local
            }
            updateProgress(e) { }
            get duration() {
                return this.boundsMax
            }
        }
    }
        , {
        113: 113,
        138: 138,
        198: 198,
        199: 199
    }],
    141: [function (e, t, i) {
        "use strict";
        const s = /-?\d*\.?\d+/gm;
        t.exports = {
            getStringNumbers: e => e.match(s).map(e => parseFloat(e)),
            getStringNonNumbers: e => e.split(s),
            reconstructStringWithNumbers(e, t) {
                let i = "";
                for (let s = 0, n = e.length; s < n; s++)
                    i += t[s] + e[s];
                return i += t[e.length],
                    i
            },
            trim: e => null === e ? e : e.replace(/\s+/gm, " ").trim()
        }
    }
        , {}],
    142: [function (e, t, i) {
        "use strict";
        const { trim: s, getStringNumbers: n, getStringNonNumbers: r, reconstructStringWithNumbers: a } = e(141)
            , o = /^\s*?M[(-?\d)|\s]/
            , l = /^(inset|circle|ellipse|polygon|path)\(/
            , c = e => o.test(e)
            , h = e => l.test(e);
        t.exports = {
            install(e, t) {
                e.plugins.parser.includes(this) || e.plugins.parser.push(this)
            },
            parseExpression: (e, t) => "string" == typeof t && (c(t) || h(t)) ? n(t) : null,
            scalePath(e, t) {
                const i = this.parseExpression(null, e);
                if (!i)
                    throw Error("Could not parse expression");
                const s = r(e);
                for (let e = 0, s = i.length; e < s; e++)
                    i[e] = i[e] * t;
                return this.reconstructPath(i, s)
            },
            trim: s,
            getPathStrings: r,
            getPathNumbers: n,
            reconstructPath: a
        }
    }
        , {
        141: 141
    }],
    143: [function (e, t, i) {
        "use strict";
        t.exports = function (e) {
            return e.reduce((e, t) => (e[t] = t,
                e), {})
        }
    }
        , {}],
    144: [function (e, t, i) {
        "use strict";
        t.exports = function (e) {
            return e.startsWith("--") ? e : e.replace(/[A-Z]/g, e => "-" + e.toLowerCase())
        }
    }
        , {}],
    145: [function (e, t, i) {
        "use strict";
        t.exports = function (e, t) {
            if ("string" != typeof e)
                return e;
            try {
                return (t || document).querySelector(e) || document.querySelector(e)
            } catch (e) {
                return !1
            }
        }
    }
        , {}],
    146: [function (e, t, i) {
        "use strict";
        const s = e(102)
            , n = e(98)
            , r = e(147)
            , a = e(149)
            , o = e(150)
            , l = e(148);
        t.exports = class {
            constructor(e, t = {}) {
                if ("number" != typeof e || !isFinite(e))
                    throw new TypeError('Clip duration must be a finite number; got "'.concat(e, '"'));
                "function" == typeof t && (t = {
                    draw: t
                }),
                    this.ease = a(t.ease),
                    this.update = a(t.update),
                    this.draw = a(t.draw),
                    this.prepare = a(t.prepare),
                    this.finish = a(t.finish),
                    this._duration = 1e3 * e,
                    this._startTime = null,
                    this._isPrepared = !1,
                    this._promise = null,
                    this._isPlaying = !1
            }
            get isReversed() {
                return this._duration < 0
            }
            get isComplete() {
                const e = this.progress;
                return !this.isReversed && e >= 1 || this.isReversed && e <= 0
            }
            get progress() {
                if (0 === this._duration)
                    return 1;
                let e = (this.lastFrameTime - this._startTime) / this._duration;
                return this.isReversed && (e = 1 + e),
                    l(e, 0, 1)
            }
            get easedProgress() {
                return this.ease ? this.ease(this.progress) : this.progress
            }
            _run(e, t) {
                this.lastFrameTime = Date.now(),
                    null === this._startTime && (this._startTime = this.lastFrameTime);
                const i = this.easedProgress;
                this.update && s(() => this._isPlaying && this.update(i)),
                    n(() => {
                        this._isPlaying && (this.draw && this.draw(i),
                            this.isComplete ? o(n, [this.finish, t]) : this._run(this, t))
                    }
                    )
            }
            play() {
                if ("function" != typeof this.draw)
                    throw new Error('Clip must be given a "draw" function as an option or have its "draw" method overriden.');
                return this._isPlaying = !0,
                    this._promise || (this._promise = new Promise((e, t) => {
                        !this._isPrepared && this.prepare ? (this._isPrepared = !0,
                            n(() => r(this.prepare(), () => {
                                this._run(this, e)
                            }
                            ))) : this._run(this, e)
                    }
                    )),
                    this._promise
            }
            destroy() {
                this._isPlaying = !1,
                    this.draw = this.finish = this.update = this.prepare = null
            }
            static play() {
                return new this(...arguments).play()
            }
        }
    }
        , {
        102: 102,
        147: 147,
        148: 148,
        149: 149,
        150: 150,
        98: 98
    }],
    147: [function (e, t, i) {
        "use strict";
        t.exports = function (e, t) {
            e instanceof Promise ? e.then(t) : t()
        }
    }
        , {}],
    148: [function (e, t, i) {
        "use strict";
        t.exports = function (e, t, i) {
            return Math.min(Math.max(e, t), i)
        }
    }
        , {}],
    149: [function (e, t, i) {
        "use strict";
        t.exports = function (e) {
            return "function" == typeof e ? e : null
        }
    }
        , {}],
    150: [function (e, t, i) {
        "use strict";
        t.exports = function (e, t) {
            const i = t.length;
            let s = 0;
            !function n() {
                "function" == typeof t[s] && e(t[s]),
                    s++,
                    s < i && n()
            }()
        }
    }
        , {}],
    151: [function (e, t, i) {
        "use strict";
        "undefined" != typeof window && (window.DOMMatrix = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix);
        const s = 180 / Math.PI
            , n = e => Math.round(1e6 * e) / 1e6;
        function r(e) {
            return Math.sqrt(e[0] * e[0] + e[1] * e[1] + e[2] * e[2])
        }
        function a(e, t) {
            return 0 === t ? Array.from(e) : [e[0] / t, e[1] / t, e[2] / t]
        }
        function o(e, t) {
            return e[0] * t[0] + e[1] * t[1] + e[2] * t[2]
        }
        function l(e, t, i, s) {
            return [e[0] * i + t[0] * s, e[1] * i + t[1] * s, e[2] * i + t[2] * s]
        }
        function c(e) {
            const t = new Float32Array(4)
                , i = new Float32Array(3)
                , c = new Float32Array(3)
                , h = new Float32Array(3);
            h[0] = e[3][0],
                h[1] = e[3][1],
                h[2] = e[3][2];
            const d = new Array(3);
            for (let t = 0; t < 3; t++)
                d[t] = e[t].slice(0, 3);
            i[0] = r(d[0]),
                d[0] = a(d[0], i[0]),
                c[0] = o(d[0], d[1]),
                d[1] = l(d[1], d[0], 1, -c[0]),
                i[1] = r(d[1]),
                d[1] = a(d[1], i[1]),
                c[0] /= i[1],
                c[1] = o(d[0], d[2]),
                d[2] = l(d[2], d[0], 1, -c[1]),
                c[2] = o(d[1], d[2]),
                d[2] = l(d[2], d[1], 1, -c[2]),
                i[2] = r(d[2]),
                d[2] = a(d[2], i[2]),
                c[1] /= i[2],
                c[2] /= i[2];
            const u = (m = d[1],
                p = d[2],
                [m[1] * p[2] - m[2] * p[1], m[2] * p[0] - m[0] * p[2], m[0] * p[1] - m[1] * p[0]]);
            var m, p;
            if (o(d[0], u) < 0)
                for (let e = 0; e < 3; e++)
                    i[e] *= -1,
                        d[e][0] *= -1,
                        d[e][1] *= -1,
                        d[e][2] *= -1;
            let f;
            return t[0] = .5 * Math.sqrt(Math.max(1 + d[0][0] - d[1][1] - d[2][2], 0)),
                t[1] = .5 * Math.sqrt(Math.max(1 - d[0][0] + d[1][1] - d[2][2], 0)),
                t[2] = .5 * Math.sqrt(Math.max(1 - d[0][0] - d[1][1] + d[2][2], 0)),
                t[3] = .5 * Math.sqrt(Math.max(1 + d[0][0] + d[1][1] + d[2][2], 0)),
                d[2][1] > d[1][2] && (t[0] = -t[0]),
                d[0][2] > d[2][0] && (t[1] = -t[1]),
                d[1][0] > d[0][1] && (t[2] = -t[2]),
                f = t[0] < .001 && t[0] >= 0 && t[1] < .001 && t[1] >= 0 ? [0, 0, n(180 * Math.atan2(d[0][1], d[0][0]) / Math.PI)] : function (e) {
                    const [t, i, r, a] = e
                        , o = t * t
                        , l = i * i
                        , c = r * r
                        , h = t * i + r * a
                        , d = a * a + o + l + c;
                    return h > .49999 * d ? [0, 2 * Math.atan2(t, a) * s, 90] : h < -.49999 * d ? [0, -2 * Math.atan2(t, a) * s, -90] : [n(Math.atan2(2 * t * a - 2 * i * r, 1 - 2 * o - 2 * c) * s), n(Math.atan2(2 * i * a - 2 * t * r, 1 - 2 * l - 2 * c) * s), n(Math.asin(2 * t * i + 2 * r * a) * s)]
                }(t),
            {
                translation: h,
                rotation: f,
                eulerRotation: f,
                scale: [n(i[0]), n(i[1]), n(i[2])]
            }
        }
        t.exports = function (e) {
            e instanceof Element && (e = String(getComputedStyle(e).transform).trim());
            let t = e instanceof DOMMatrix ? e : new DOMMatrix(e);
            const i = new Array(4);
            for (let e = 1; e < 5; e++) {
                const s = i[e - 1] = new Float32Array(4);
                for (let i = 1; i < 5; i++)
                    s[i - 1] = t["m".concat(e).concat(i)]
            }
            return c(i)
        }
    }
        , {}],
    152: [function (e, t, i) {
        "use strict";
        var s = e(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = i.pluginCache = void 0;
        var n = s(e(35))
            , r = s(e(163))
            , a = s(e(153))
            , o = s(e(155));
        const l = {};
        i.pluginCache = l;
        const c = [];
        let h = 1;
        class d extends n.default {
            constructor(e = {}) {
                super(),
                    this.el = e.el || document.createElement("video"),
                    this.id = e.id || this.el.id || this.el.dataset.inlineMediaId || "inlineMedia-".concat(h++);
                const t = (e.plugins || []).concat(r.default);
                this._initPlugins(t, e),
                    c.push(this)
            }
            async load(e) {
                for (const t of this.plugins)
                    if ("function" == typeof t.load)
                        return t.load(e)
            }
            abortLoad() {
                for (const e of this.plugins)
                    if ("function" == typeof e.abortLoad) {
                        e.abortLoad();
                        break
                    }
            }
            async play() {
                for (const e of this.plugins)
                    if ("function" == typeof e.play)
                        return e.play()
            }
            get src() {
                for (const e of this.plugins)
                    if (e.src)
                        return e.src;
                return ""
            }
            get playbackState() {
                for (const e of this.plugins) {
                    const t = e.playbackState;
                    if (void 0 !== t)
                        return t
                }
            }
            get loadingState() {
                for (const e of this.plugins) {
                    const t = e.loadingState;
                    if (void 0 !== t)
                        return t
                }
            }
            _initPlugins(e, t) {
                this.plugins = [],
                    this.pluginMap = new Map;
                for (let i of e) {
                    if ("string" == typeof i) {
                        if (!l[i])
                            throw new Error("Trying to use undefined Plugin named: ".concat(i, " . Ensure you call Media.addPlugin() first!"));
                        i = l[i]
                    }
                    if (!1 !== i.isSupported) {
                        const e = new i(Object.assign({
                            media: this
                        }, t));
                        this.plugins.push(e),
                            this.pluginMap.set(i, e)
                    }
                }
                this.trigger(o.default.MOUNTED)
            }
            destroy() {
                if (!this._destroyed) {
                    for (const e of this.plugins)
                        "function" == typeof e.destroy && e.destroy();
                    super.destroy(),
                        c.splice(c.indexOf(this), 1),
                        this._destroyed = !0
                }
            }
            static get medias() {
                return c
            }
            static addPlugin(e, t) {
                l[e] = t
            }
            static async autoInitialize(e = document, t = {}) {
                return (0,
                    a.default)(e, t)
            }
        }
        var u = d;
        i.default = u
    }
        , {
        153: 153,
        155: 155,
        163: 163,
        35: 35,
        36: 36
    }],
    153: [function (e, t, i) {
        "use strict";
        var s = e(36)
            , n = e(37);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = async function (e = document, t = {}) {
                e || (e = document);
                const i = e.querySelectorAll("[".concat("data-inline-media", "]"))
                    , s = [];
                for (let e of i) {
                    const i = e.dataset
                        , n = i.inlineMediaPlugins ? i.inlineMediaPlugins.split(",").map(e => e.trim()) : []
                        , o = [];
                    for (const e of n)
                        if (!r.pluginCache[e]) {
                            if (!a.default[e])
                                throw new Error("Error Trying to use undefined Plugin named: ".concat(e, " . Ensure you call Media.addPlugin() first to register this custom plugin!"));
                            o.push(async () => {
                                const t = (await a.default[e]()).default;
                                r.default.addPlugin(e, t)
                            }
                            )
                        }
                    await Promise.all(o.map(async e => e())),
                        s.push(new r.default(Object.assign({
                            el: e,
                            plugins: n.map(e => r.pluginCache[e])
                        }, t)))
                }
                return s
            }
            ;
        var r = n(e(152))
            , a = s(e(159))
    }
        , {
        152: 152,
        159: 159,
        36: 36,
        37: 37
    }],
    154: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        i.default = {
            EMPTY: "loading-empty",
            LOADING: "loading",
            LOADED: "loaded",
            ERROR: "loading-error",
            DISABLED: "loading-disabled"
        }
    }
        , {}],
    155: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        i.default = {
            MOUNTED: "MOUNTED",
            MEDIA_LOAD_START: "MEDIA_LOAD_START",
            MEDIA_LOAD_COMPLETE: "MEDIA_LOAD_COMPLETE",
            MEDIA_LOAD_ERROR: "MEDIA_LOAD_ERROR",
            PLAYBACK_STATE_CHANGE: "PLAYBACK_STATE_CHANGE",
            LOADING_STATE_CHANGE: "LOADING_STATE_CHANGE"
        }
    }
        , {}],
    156: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        i.default = {
            LOAD_START: "loadstart",
            LOADED_DATA: "loadeddata",
            LOADED_METADATA: "loadedmetadata",
            CAN_PLAY: "canplay",
            CAN_PLAY_THROUGH: "canplaythrough",
            PLAY: "play",
            PLAYING: "playing",
            PAUSE: "pause",
            WAITING: "waiting",
            SEEKING: "seeking",
            SEEKED: "seeked",
            ERROR: "error",
            ENDED: "ended",
            ABORT: "abort"
        }
    }
        , {}],
    157: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        i.default = {
            IDLE: "idle",
            PLAYING: "playing",
            PAUSED: "paused",
            ENDED: "ended"
        }
    }
        , {}],
    158: [function (e, t, i) {
        "use strict";
        var s = e(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            Object.defineProperty(i, "Media", {
                enumerable: !0,
                get: function () {
                    return n.default
                }
            }),
            Object.defineProperty(i, "default", {
                enumerable: !0,
                get: function () {
                    return n.default
                }
            }),
            Object.defineProperty(i, "Plugin", {
                enumerable: !0,
                get: function () {
                    return r.default
                }
            }),
            i.autoInit = void 0;
        var n = s(e(152))
            , r = s(e(165));
        const a = n.default.autoInitialize;
        i.autoInit = a
    }
        , {
        152: 152,
        165: 165,
        36: 36
    }],
    159: [function (e, t, i) {
        "use strict";
        var s = e(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var n = s(e(37));
        var r = {
            AnimLoad: async () => Promise.resolve().then(() => (0,
                n.default)(e(166))),
            AnimPlay: async () => Promise.resolve().then(() => (0,
                n.default)(e(167))),
            FeatureObserver: async () => Promise.resolve().then(() => (0,
                n.default)(e(169))),
            LoadTimeout: async () => Promise.resolve().then(() => (0,
                n.default)(e(171))),
            PlayPauseButton: async () => Promise.resolve().then(() => (0,
                n.default)(e(173))),
            ViewportSource: async () => Promise.resolve().then(() => (0,
                n.default)(e(176)))
        };
        i.default = r
    }
        , {
        166: 166,
        167: 167,
        169: 169,
        171: 171,
        173: 173,
        176: 176,
        36: 36,
        37: 37
    }],
    160: [function (e, t, i) {
        "use strict";
        var s = e(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var n = s(e(165))
            , r = s(e(157))
            , a = s(e(154))
            , o = s(e(156))
            , l = s(e(155));
        const c = [o.default.LOADED_DATA, o.default.LOAD_START, o.default.CAN_PLAY, o.default.CAN_PLAY_THROUGH, o.default.PLAY, o.default.PLAYING, o.default.PAUSE, o.default.WAITING, o.default.SEEKING, o.default.SEEKED, o.default.ERROR, o.default.ENDED];
        class h extends n.default {
            constructor(e) {
                super(e),
                    this._container = e.container || this.media.el.parentElement,
                    this._playbackState = r.default.IDLE,
                    this._loadingState = a.default.EMPTY,
                    this._elementsToDecorate = [],
                    this._container && this._elementsToDecorate.push(this._container),
                    this.media.id && this._elementsToDecorate.push(...Array.from(document.querySelectorAll("[data-inline-media-controller={id}]".replace("{id}", this.media.id))));
                for (const e of this._elementsToDecorate)
                    e.classList.add(this._playbackState),
                        e.classList.add(this._loadingState);
                this.updateState = this.updateState.bind(this),
                    this._addEventListeners()
            }
            _addEventListeners() {
                for (let e of c)
                    this.media.el.addEventListener(e, this.updateState);
                this.media.on(l.default.LOADING_STATE_CHANGE, this.updateState),
                    this.media.on(l.default.PLAYBACK_STATE_CHANGE, this.updateState)
            }
            _removeEventListeners() {
                for (let e of c)
                    this.media.el.removeEventListener(e, this.updateState);
                this.media.off(l.default.LOADING_STATE_CHANGE, this.updateState),
                    this.media.off(l.default.PLAYBACK_STATE_CHANGE, this.updateState)
            }
            updateState(e) {
                const t = this.media.playbackState
                    , i = this._playbackState
                    , s = this.media.loadingState
                    , n = this._loadingState;
                if (this._playbackState = t,
                    this._loadingState = s,
                    t !== i) {
                    for (const e of this._elementsToDecorate)
                        e.classList.add(t),
                            e.classList.remove(i);
                    this.media.trigger(l.default.PLAYBACK_STATE_CHANGE)
                }
                if (s !== n) {
                    for (const e of this._elementsToDecorate)
                        e.classList.add(s),
                            e.classList.remove(n);
                    this.media.trigger(l.default.LOADING_STATE_CHANGE)
                }
            }
            destroy() {
                for (const e of this._elementsToDecorate)
                    e.classList.remove(this._playbackState),
                        e.classList.remove(this._loadingState);
                this._removeEventListeners(),
                    super.destroy()
            }
        }
        var d = h;
        i.default = d
    }
        , {
        154: 154,
        155: 155,
        156: 156,
        157: 157,
        165: 165,
        36: 36
    }],
    161: [function (e, t, i) {
        "use strict";
        var s = e(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var n = s(e(165))
            , r = s(e(156))
            , a = s(e(155))
            , o = s(e(154))
            , l = s(e(19))
            , c = s(e(203));
        const h = r.default.CAN_PLAY_THROUGH
            , { HAVE_NOTHING: d, HAVE_CURRENT_DATA: u, NETWORK_EMPTY: m } = HTMLMediaElement;
        class p extends n.default {
            constructor(e) {
                super(e),
                    this._loadCompleteEvent = e.loadCompleteEvent || h,
                    this._onLoaded = this._onLoaded.bind(this),
                    this._onError = this._onError.bind(this)
            }
            mounted() {
                "none" !== this.media.el.preload && this.media.src && (async () => {
                    try {
                        await this.media.load(this.media.src)
                    } catch (e) {
                        (0,
                            l.default)("auto load of ".concat(this.media.src, " failed or was aborted with err:").concat(e))
                    }
                }
                )()
            }
            async load(e) {
                if (void 0 === e && this.media.src && (e = this.media.src),
                    !e)
                    throw new Error("No Media src was specified, can not fullfill load() request");
                return e !== this._currentLoadUrl && (this.media.trigger(a.default.MEDIA_LOAD_START),
                    this._currentLoadUrl = e,
                    this._pendingPromise = new Promise((t, i) => {
                        this._resolvePendingPromise = () => {
                            this._resolvePendingPromise = null,
                                this._rejectPendingPromise = null,
                                t()
                        }
                            ,
                            this._rejectPendingPromise = () => {
                                this._resolvePendingPromise = null,
                                    this._rejectPendingPromise = null,
                                    i()
                            }
                            ,
                            this.media.el.addEventListener(this._loadCompleteEvent, this._onLoaded),
                            c.default.browser.firefox && "canplaythrough" === this._loadCompleteEvent && this.media.el.addEventListener("canplay", this._onLoaded),
                            this.media.el.addEventListener(r.default.ERROR, this._onError),
                            this.media.el.addEventListener(r.default.ABORT, this._onError),
                            this.media.el.src = e,
                            this.media.el.load()
                    }
                    )),
                    this._pendingPromise
            }
            _clearLoadListeners() {
                this.media.el.removeEventListener(this._loadCompleteEvent, this._onLoaded),
                    this.media.el.removeEventListener("canplay", this._onLoaded),
                    this.media.el.removeEventListener(r.default.ERROR, this._onError),
                    this.media.el.removeEventListener(r.default.ABORT, this._onError)
            }
            _onLoaded() {
                this._clearLoadListeners(),
                    this.media.trigger(a.default.LOADING_STATE_CHANGE),
                    this.media.trigger(a.default.MEDIA_LOAD_COMPLETE),
                    this._resolvePendingPromise()
            }
            _onError() {
                this._clearLoadListeners(),
                    this.media.trigger(a.default.MEDIA_LOAD_ERROR),
                    this.media.trigger(a.default.LOADING_STATE_CHANGE),
                    this._rejectPendingPromise()
            }
            abortLoad() {
                this._rejectPendingPromise && this._rejectPendingPromise()
            }
            get loadingState() {
                return this.media.el.error ? o.default.ERROR : this.media.el.networkState === m && this.media.el.readyState === d ? o.default.EMPTY : this.media.el.readyState < u ? this.media.el.buffered.length && 0 === this.media.el.buffered.start(0) && this.media.el.buffered.end(0) === this.media.el.duration ? o.default.LOADED : o.default.LOADING : o.default.LOADED
            }
            destroy() {
                this._clearLoadListeners(),
                    super.destroy()
            }
        }
        var f = p;
        i.default = f
    }
        , {
        154: 154,
        155: 155,
        156: 156,
        165: 165,
        19: 19,
        203: 203,
        36: 36
    }],
    162: [function (e, t, i) {
        "use strict";
        var s = e(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var n = s(e(165))
            , r = s(e(157));
        const { HAVE_METADATA: a, HAVE_CURRENT_DATA: o } = HTMLVideoElement;
        class l extends n.default {
            constructor(e) {
                super(e),
                    this._initialize()
            }
            _initialize() {
                this.media.el.playsInline = !0,
                    this.media.el.autoplay && (this._autoPlayTimer = setTimeout(() => this.media.play()))
            }
            async play() {
                this.media.el.readyState < a && await this.media.load(),
                    await this.media.el.play()
            }
            get playbackState() {
                return this.media.el.ended ? r.default.ENDED : this.media.el.paused && !this.media.el.ended ? r.default.PAUSED : r.default.PLAYING
            }
            destroy() {
                clearTimeout(this._autoPlayTimer),
                    super.destroy()
            }
        }
        var c = l;
        i.default = c
    }
        , {
        157: 157,
        165: 165,
        36: 36
    }],
    163: [function (e, t, i) {
        "use strict";
        var s = e(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var n = s(e(164))
            , r = s(e(161))
            , a = s(e(162))
            , o = s(e(160))
            , l = [n.default, r.default, a.default, o.default];
        i.default = l
    }
        , {
        160: 160,
        161: 161,
        162: 162,
        164: 164,
        36: 36
    }],
    164: [function (e, t, i) {
        "use strict";
        var s = e(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var n = s(e(165));
        class r extends n.default {
            get src() {
                if (!this.media.el.currentSrc && !this.media.el.src)
                    for (let e of this.media.el.querySelectorAll("source"))
                        if (this.media.el.canPlayType(e.type))
                            return e.src;
                return this.media.el.currentSrc || this.media.el.src
            }
        }
        var a = r;
        i.default = a
    }
        , {
        165: 165,
        36: 36
    }],
    165: [function (e, t, i) {
        "use strict";
        var s = e(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var n = s(e(155));
        var r = class {
            constructor(e) {
                this.options = e,
                    this.media = e.media,
                    this.mounted = this.mounted.bind(this),
                    this.media.on(n.default.MOUNTED, this.mounted)
            }
            mounted() { }
            static get isSupported() {
                return !0
            }
            destroy() { }
        }
            ;
        i.default = r
    }
        , {
        155: 155,
        36: 36
    }],
    166: [function (e, t, i) {
        "use strict";
        var s = e(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var n = s(e(178))
            , r = s(e(165))
            , a = s(e(19));
        const o = {
            start: "t - 200vh",
            end: "b + 100vh"
        };
        class l extends r.default {
            constructor(e) {
                super(e),
                    this._anim = e.anim,
                    this._container = e.container || this.media.el.parentElement,
                    this._scrollGroup = this.options.scrollGroup || this._anim.getGroupForTarget(this._container || this.media.el),
                    this._initialize()
            }
            _initialize() {
                this._onLoadKeyframeEnter = this._onLoadKeyframeEnter.bind(this),
                    this._onLoadKeyframeExit = this._onLoadKeyframeExit.bind(this);
                const e = (0,
                    n.default)(this.media.el.dataset, this.options, "loadKeyframe", o);
                e.event || (e.event = "inline-media-load-kf"),
                    this._loadKeyframe = this._scrollGroup.addKeyframe(this.media.el, e),
                    this._loadKeyframe.controller.on("".concat(this._loadKeyframe.event, ":enter"), this._onLoadKeyframeEnter),
                    this._loadKeyframe.controller.on("".concat(this._loadKeyframe.event, ":exit"), this._onLoadKeyframeExit)
            }
            get loadKeyframe() {
                return this._loadKeyframe
            }
            async _onLoadKeyframeEnter(e) {
                try {
                    await this.media.load(),
                        this._loaded = !0
                } catch (e) {
                    (0,
                        a.default)("AnimLoad: Load error occured")
                }
            }
            _onLoadKeyframeExit(e) { }
            destroy() {
                this._loadKeyframe.controller.off("".concat(this._loadKeyframe.event, ":enter"), this._onLoadKeyframeEnter),
                    this._loadKeyframe.controller.off("".concat(this._loadKeyframe.event, ":exit"), this._onLoadKeyframeExit),
                    super.destroy()
            }
        }
        i.default = l
    }
        , {
        165: 165,
        178: 178,
        19: 19,
        36: 36
    }],
    167: [function (e, t, i) {
        "use strict";
        var s = e(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var n = s(e(155))
            , r = s(e(178))
            , a = s(e(165));
        const o = {
            start: "t - 100vh",
            end: "b"
        };
        class l extends a.default {
            constructor(e) {
                super(e),
                    this._anim = e.anim,
                    this._container = e.container || this.media.el.parentElement,
                    this._scrollGroup = this.options.scrollGroup || this._anim.getGroupForTarget(this._container || this.media.el),
                    this._initialize()
            }
            _initialize() {
                this._onPlayKeyframeEnter = this._onPlayKeyframeEnter.bind(this),
                    this._onPlayKeyframeExit = this._onPlayKeyframeExit.bind(this);
                const e = this.media.el.dataset;
                if (this._autoPlayWithReducedMotion = (0,
                    r.default)(e, this.options, "autoPlayWithReducedMotion", !1),
                    !this._autoPlayWithReducedMotion && l.prefersReducedMotion)
                    return;
                this._pauseOnExit = (0,
                    r.default)(e, this.options, "pauseOnExit", !1),
                    this._resetOnExit = (0,
                        r.default)(e, this.options, "resetOnExit", !1);
                const t = (0,
                    r.default)(e, this.options, "playKeyframe", o);
                t.event || (t.event = "inline-media-play-kf"),
                    this._playKeyframe = this._scrollGroup.addKeyframe(this.media.el, t),
                    this._playKeyframe.controller.on("".concat(this._playKeyframe.event, ":enter"), this._onPlayKeyframeEnter),
                    this._playKeyframe.controller.on("".concat(this._playKeyframe.event, ":exit"), this._onPlayKeyframeExit),
                    this._onLoadStart = this._onLoadStart.bind(this),
                    this.media.on(n.default.MEDIA_LOAD_START, this._onLoadStart)
            }
            _onLoadStart() {
                this._loaded = !1
            }
            async _onPlayKeyframeEnter(e) {
                if (this._inFrame = !0,
                    !this._paused && (this._loaded || (await this.media.load(),
                        this._loaded = !0),
                        this._inFrame))
                    try {
                        await this.media.play()
                    } catch (e) { }
            }
            _onPlayKeyframeExit(e) {
                this._inFrame = !1,
                    this._loaded && this.media.el.paused && !this.media.el.ended ? this._paused = !0 : this._pauseOnExit && (this._paused = !1,
                        this.media.el.pause()),
                    this._loaded && this._resetOnExit && (this.media.el.currentTime = 0)
            }
            get playKeyframe() {
                return this._playKeyframe
            }
            destroy() {
                this._playKeyframe.controller.off("".concat(this._playKeyframe.event, ":enter"), this._onPlayKeyframeEnter),
                    this._playKeyframe.controller.off("".concat(this._playKeyframe.event, ":exit"), this._onPlayKeyframeExit),
                    this.media.off(n.default.MEDIA_LOAD_START, this._onLoadStart),
                    super.destroy()
            }
            static get prefersReducedMotion() {
                return window.matchMedia("(prefers-reduced-motion: reduce)").matches
            }
        }
        i.default = l
    }
        , {
        155: 155,
        165: 165,
        178: 178,
        36: 36
    }],
    168: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var s = class {
            constructor(e) {
                this.featureClass = e.featureClass,
                    this._callback = e.callback,
                    this._isPresent = !1,
                    this._wasPresent = !1
            }
            get presenceChanged() {
                return this._isPresent !== this._wasPresent
            }
            get isPresent() {
                return this._isPresent
            }
            updatePresence(e) {
                this._wasPresent = this._isPresent,
                    this._isPresent = e.contains(this.featureClass)
            }
            triggerCallback(e) {
                return this._callback(e)
            }
        }
            ;
        i.default = s
    }
        , {}],
    169: [function (e, t, i) {
        "use strict";
        var s = e(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var n = s(e(165))
            , r = s(e(157))
            , a = s(e(154))
            , o = s(e(155))
            , l = s(e(170))
            , c = s(e(168));
        const h = e => e
            , d = e => e ? e.split(",").map(e => e.trim()) : null;
        class u extends n.default {
            constructor(e) {
                super(e);
                const t = (t, i, s) => {
                    let n = "inlineMedia" + t[0].toUpperCase() + t.slice(1);
                    return i(this.media.el.dataset[n]) || e[t] || s
                }
                    ;
                this._disabledStates = new l.default({
                    features: t("disabledWhen", d, []),
                    onActivate: this.disable.bind(this),
                    onDeactivate: this.enable.bind(this)
                }),
                    this._destroyStates = new l.default({
                        features: t("destroyWhen", d, []),
                        onActivate: this.destroyMedia.bind(this)
                    }),
                    this._pausedStates = new l.default({
                        features: t("pausedWhen", d, []),
                        onActivate: this.pauseMedia.bind(this)
                    }),
                    this._autoplayStates = new l.default({
                        features: t("autoplayWhen", d, []),
                        onActivate: this.autoplayMedia.bind(this),
                        onDeactivate: this.disableAutoplay.bind(this)
                    });
                const i = e.featureDetect || {};
                var s;
                this.featureCallbacks = Object.entries(i).map(([e, t]) => new c.default({
                    featureClass: e,
                    callback: t
                })),
                    this._featureElement = (s = t("featureElement", h, document.documentElement)) instanceof HTMLElement ? s : document.querySelector(s),
                    this.featureSets = [this._autoplayStates, this._pausedStates, this._disabledStates, this._destroyStates],
                    this._featuresUpdated = this._featuresUpdated.bind(this),
                    this.play = !1,
                    this._observer = new MutationObserver(this._featuresUpdated),
                    this._observer.observe(this._featureElement, {
                        attributes: !0,
                        attributeFilter: ["class"]
                    }),
                    this._featuresUpdated()
            }
            get loadingState() {
                return this._disabledStates.isDetected ? a.default.DISABLED : void 0
            }
            get playbackState() {
                return this._disabledStates.isDetected ? r.default.PAUSED : void 0
            }
            _featuresUpdated() {
                let e = this._featureElement.classList;
                this.featureSets.filter(t => (t.updateFeatureState(e),
                    t.detectionChanged)).forEach(e => e.applyEffect()),
                    this.featureCallbacks.forEach(t => {
                        t.updatePresence(e),
                            t.isPresent && t.presenceChanged && t.triggerCallback(this.media)
                    }
                    )
            }
            autoplayMedia() {
                this.media.el.setAttribute("autoplay", !0),
                    this.media.play()
            }
            disableAutoplay() {
                this.media.el.setAttribute("autoplay", !1)
            }
            pauseMedia() {
                this.media.el.pause()
            }
            destroyMedia() {
                this.media.destroy()
            }
            destroy() {
                this._observer.disconnect()
            }
            disable() {
                this.media.abortLoad(),
                    this.media.el.pause(),
                    this.play = h,
                    this.media.trigger(o.default.LOADING_STATE_CHANGE),
                    this.media.trigger(o.default.PLAYBACK_STATE_CHANGE)
            }
            enable() {
                this.play = !1,
                    this.media.trigger(o.default.LOADING_STATE_CHANGE),
                    this.media.trigger(o.default.PLAYBACK_STATE_CHANGE)
            }
        }
        var m = u;
        i.default = m
    }
        , {
        154: 154,
        155: 155,
        157: 157,
        165: 165,
        168: 168,
        170: 170,
        36: 36
    }],
    170: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        const s = () => { }
            ;
        var n = class {
            constructor(e) {
                var t;
                this._features = new Set((t = e.features,
                    Array.isArray(t) ? t : t ? [t] : [])),
                    this._isDetected = !1,
                    this._wasDetected = !1,
                    this._onActivate = e.onActivate || s,
                    this._onDeactivate = e.onDeactivate || s
            }
            get detectionChanged() {
                return this._isDetected !== this._wasDetected
            }
            get isDetected() {
                return this._isDetected
            }
            updateFeatureState(e) {
                this._wasDetected = this._isDetected;
                for (let t of e)
                    if (this._features.has(t))
                        return void (this._isDetected = !0);
                this._isDetected = !1
            }
            applyEffect() {
                this._isDetected ? this._onActivate() : this._onDeactivate()
            }
        }
            ;
        i.default = n
    }
        , {}],
    171: [function (e, t, i) {
        "use strict";
        var s = e(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var n = s(e(165))
            , r = s(e(155));
        class a extends n.default {
            static get LOAD_TIMEOUT_EVENT() {
                return "inline-media-timeout"
            }
            constructor(e) {
                super(e);
                const t = this.media.el.dataset;
                this._timeoutDelay = t.loadTimeout || e.loadTimeout || 3e4,
                    this._onLoadStart = this._onLoadStart.bind(this),
                    this._onLoadComplete = this._onLoadComplete.bind(this),
                    this._onTimerComplete = this._onTimerComplete.bind(this),
                    this.media.on(r.default.MEDIA_LOAD_START, this._onLoadStart),
                    this.media.on(r.default.MEDIA_LOAD_COMPLETE, this._onLoadComplete)
            }
            _onLoadStart() {
                clearTimeout(this._timer),
                    this._timer = setTimeout(this._onTimerComplete, this._timeoutDelay)
            }
            _onLoadComplete() {
                clearTimeout(this._timer)
            }
            _onTimerComplete() {
                this.media.trigger("inline-media-timeout"),
                    this.media.destroy(),
                    this.media.el.parentElement && this.media.el.parentElement.removeChild(this.media.el)
            }
            destroy() {
                clearTimeout(this._timer),
                    this.media.off(r.default.MEDIA_LOAD_START, this._onLoadStart)
            }
        }
        i.default = a
    }
        , {
        155: 155,
        165: 165,
        36: 36
    }],
    172: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        i.default = {
            S: "small",
            M: "medium",
            L: "large",
            X: "xlarge"
        }
    }
        , {}],
    173: [function (e, t, i) {
        "use strict";
        var s = e(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var n = s(e(165))
            , r = s(e(155))
            , a = s(e(157));
        const o = "Pause"
            , l = "Play"
            , c = "Replay"
            , h = {
                CLICK: "data-analytics-click",
                TITLE: "data-analytics-title"
            };
        class d extends n.default {
            constructor(e) {
                super(e),
                    this._container = e.container || this.media.el.parentElement,
                    this._button = this._findButton(),
                    this._onClick = this._onClick.bind(this),
                    this._onPlaybackStateChange = this._onPlaybackStateChange.bind(this);
                const t = this._button.dataset;
                this._ariaLabels = {
                    playing: t.ariaPlaying || e.ariaPlaying || o,
                    paused: t.ariaPaused || e.ariaPaused || l,
                    ended: t.ariaEnded || e.ariaEnded || c
                },
                    this._button.addEventListener("click", this._onClick),
                    this.media.on(r.default.PLAYBACK_STATE_CHANGE, this._onPlaybackStateChange),
                    this._activeAnalytics = Object.values(h).filter(e => this._button.hasAttribute(e + "-play") && this._button.hasAttribute(e + "-pause") || this._button.hasAttribute(e + "-replay"))
            }
            _findButton() {
                if (this.options.playPauseButton)
                    return this.options.playPauseButton;
                let e = this._container.querySelector("".concat('[data-inline-media-control="PlayPause"]'));
                if (!e) {
                    const t = document.querySelectorAll("[data-inline-media-controller='{id}']".replace("{id}", this.media.id));
                    for (const i of t)
                        e = "PlayPause" === i.getAttribute("data-inline-media-control") ? i : i.querySelector("".concat('[data-inline-media-control="PlayPause"]'))
                }
                return e
            }
            _onPlaybackStateChange() {
                switch (this.media.playbackState) {
                    case a.default.PLAYING:
                        this._button.setAttribute("aria-label", this._ariaLabels.playing);
                        break;
                    case a.default.ENDED:
                        this._button.setAttribute("aria-label", this._ariaLabels.ended);
                        break;
                    default:
                        this._button.setAttribute("aria-label", this._ariaLabels.paused)
                }
                this._setAnalyticsState()
            }
            _setAnalyticsState() {
                let e;
                switch (this.media.playbackState) {
                    case a.default.PLAYING:
                        e = "pause";
                        break;
                    case a.default.ENDED:
                        e = "replay";
                        break;
                    default:
                        e = "play"
                }
                for (const t of this._activeAnalytics) {
                    let i = e;
                    "replay" !== e || this._button.hasAttribute("".concat(t, "-").concat(i)) || (i = "play"),
                        this._button.setAttribute(t, this._button.getAttribute("".concat(t, "-").concat(i)))
                }
            }
            _onClick(e) {
                this.media.el.paused ? this.media.play() : this.media.el.pause()
            }
            destroy() {
                this._button.removeEventListener("click", this._onClick),
                    this.media.off(r.default.PLAYBACK_STATE_CHANGE, this._onPlaybackStateChange)
            }
        }
        i.default = d
    }
        , {
        155: 155,
        157: 157,
        165: 165,
        36: 36
    }],
    174: [function (e, t, i) {
        "use strict";
        var s = e(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var n = s(e(177));
        i.default = class {
            constructor(e) {
                this._breakpoints = e.breakpoints || n.default,
                    this.options = e,
                    this._initialize()
            }
            _initialize() {
                this._updateBreakpoint = this._updateBreakpoint.bind(this),
                    this._callback = this.options.callback,
                    this._mediaQueries = Object.keys(this._breakpoints).map(e => window.matchMedia("(min-width: ".concat(this._breakpoints[e], "px)"))),
                    this._addEventListeners(),
                    this._updateBreakpoint()
            }
            _addEventListeners() {
                for (const e of this._mediaQueries)
                    e.addListener(this._updateBreakpoint)
            }
            _removeEventListeners() {
                for (const e of this._mediaQueries)
                    e.removeListener(this._updateBreakpoint)
            }
            _updateBreakpoint() {
                const e = Object.keys(this._breakpoints);
                let t = e[0];
                for (let i = 1; i < e.length; i++) {
                    if (!this._mediaQueries[i].matches)
                        break;
                    t = e[i]
                }
                let i = !1;
                this._currentBreakpoint && this._currentBreakpoint !== t && (i = !0),
                    this._currentBreakpoint = t,
                    i && this._callback()
            }
            get breakpoint() {
                return this._currentBreakpoint
            }
            destroy() {
                this._removeEventListeners()
            }
        }
    }
        , {
        177: 177,
        36: 36
    }],
    175: [function (e, t, i) {
        "use strict";
        var s = e(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var n = s(e(174))
            , r = s(e(172));
        class a extends n.default {
            constructor(e) {
                super(e)
            }
            _initialize() {
                this._anim = this.options.anim,
                    this._bpMap = this.options.animBreakpointMap || r.default,
                    this._updateBreakpoint = this._updateBreakpoint.bind(this),
                    this._callback = this.options.callback,
                    this._addEventListeners(),
                    this._updateBreakpoint()
            }
            _addEventListeners() {
                this._anim.on("ON_BREAKPOINT_CHANGE", this._updateBreakpoint)
            }
            _removeEventListeners() {
                this._anim.off("ON_BREAKPOINT_CHANGE", this._updateBreakpoint)
            }
            _updateBreakpoint() {
                const e = this._bpMap[this._anim.model.pageMetrics.breakpoint];
                let t = !1;
                this._currentBreakpoint && this._currentBreakpoint !== e && (t = !0),
                    this._currentBreakpoint = e,
                    t && this._callback()
            }
            destroy() {
                super.destroy()
            }
        }
        i.default = a
    }
        , {
        172: 172,
        174: 174,
        36: 36
    }],
    176: [function (e, t, i) {
        "use strict";
        var s = e(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        var n = s(e(165))
            , r = s(e(174))
            , a = s(e(175))
            , o = (s(e(19)),
                s(e(18)),
                s(e(154)));
        class l extends n.default {
            constructor(e) {
                super(e),
                    this._cachedPlaying = null,
                    this._initialize()
            }
            _initialize() {
                this._onBreakpointChange = this._onBreakpointChange.bind(this);
                const e = Object.assign({
                    callback: this._onBreakpointChange
                }, this.options);
                this._breakpointDetect = e.anim ? new a.default(e) : new r.default(e),
                    this._currentTime = 0;
                const t = this.media.el.dataset;
                this._basePath = this.options.basePath || t.inlineMediaBasepath || "./",
                    this._onBreakpointChange()
            }
            _onBreakpointChange() {
                this._currentBreakpoint = this._breakpointDetect.breakpoint;
                const e = window.devicePixelRatio > 1 ? "".concat(this._currentBreakpoint, "_2x") : this._currentBreakpoint
                    , t = "".concat(this._basePath).concat(e, ".").concat("mp4");
                this._swapSrc(t)
            }
            get src() {
                return this._src
            }
            async _swapSrc(e) {
                if (this._src = e,
                    this.media.loadingState === o.default.EMPTY)
                    return;
                const t = null !== this._cachedPlaying ? this._cachedPlaying : !this.media.el.paused;
                return this.media.loadingState === o.default.LOADED && (this._currentTime = this.media.el.currentTime),
                    this._cachedPlaying = t,
                    await this.media.load("".concat(e, "#t=").concat(this._currentTime)),
                    this._cachedPlaying = null,
                    t ? this.media.play() : Promise.resolve()
            }
            destroy() {
                this._breakpointDetect.destroy(),
                    super.destroy()
            }
        }
        i.default = l
    }
        , {
        154: 154,
        165: 165,
        174: 174,
        175: 175,
        18: 18,
        19: 19,
        36: 36
    }],
    177: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = void 0;
        i.default = {
            small: 0,
            medium: 570,
            large: 780,
            xlarge: 1280
        }
    }
        , {}],
    178: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = function (e, t, i, s) {
                const n = i[0].toUpperCase() + i.slice(1)
                    , r = e["inlineMedia" + n];
                if (void 0 !== r)
                    switch (typeof s) {
                        case "boolean":
                            return "false" !== r;
                        case "object":
                            return JSON.parse(r);
                        case "number":
                            return Number(r);
                        default:
                            return r
                    }
                else if (void 0 !== t[i]) {
                    const e = t[i];
                    return "boolean" != typeof s || "false" !== e && "true" !== e ? e : "false" !== e
                }
                return s
            }
    }
        , {}],
    179: [function (e, t, i) {
        "use strict";
        const s = e(35)
            , n = e(181)
            , r = e(185)
            , a = e(184)
            , o = e(190)
            , l = e(197)
            , c = e(183)
            , h = e(187)
            , d = e(193)
            , u = e(186)
            , m = ["beforeCreate", "created", "beforeMount", "createItems", "itemsCreated", "mounted", "animateToItem", "onItemChangeInitiated", "onItemChangeOccurred", "onItemChangeCompleted", "onResizeImmediate", "onBreakpointChange", "onResizeDebounced", "destroy"];
        class p extends s {
            constructor(e) {
                super(e),
                    this.el = e.el,
                    this.model = Object.assign({
                        options: e
                    }, JSON.parse(JSON.stringify(n))),
                    this.model.Item.ConstructorFunction = n.Item.ConstructorFunction,
                    this._items = [],
                    this.currentIndex = 0,
                    m.forEach(e => {
                        this[e] = (...t) => {
                            this["__".concat(e)] && this["__".concat(e)].forEach(e => e.apply(this, t))
                        }
                    }
                    );
                const t = this.destroy;
                this.destroy = (...e) => {
                    t.apply(this, e),
                        s.prototype.destroy.call(this)
                }
                    ,
                    this.on(n.Events.ITEM_CHANGE_INITIATED, this.onItemChangeInitiated),
                    this.on(n.Events.ITEM_CHANGE_OCCURRED, this.onItemChangeOccurred),
                    this.on(n.Events.ITEM_CHANGE_COMPLETED, this.onItemChangeCompleted),
                    ["beforeCreate", "created", "beforeMount", "createItems"].forEach(t => this[t](e))
            }
        }
        p.withMixins = (...e) => {
            const t = class extends p {
            }
                , i = t.prototype;
            return e.unshift(r, l, o, u),
                e.push(c, d, a, h),
                e.forEach(e => {
                    for (const t in e)
                        m.includes(t) ? (i["__".concat(t)] = i["__".concat(t)] || [],
                            i["__".concat(t)].push(e[t])) : i[t] = e[t]
                }
                ),
                t
        }
            ,
            t.exports = p
    }
        , {
        181: 181,
        183: 183,
        184: 184,
        185: 185,
        186: 186,
        187: 187,
        190: 190,
        193: 193,
        197: 197,
        35: 35
    }],
    180: [function (e, t, i) {
        "use strict";
        const s = e(34).EventEmitterMicro
            , n = {};
        "undefined" != typeof window && (n.draw = e(98),
            n.cancelDraw = e(95));
        t.exports = class extends s {
            constructor(e) {
                super(),
                    this.index = e.index,
                    this.el = e.el,
                    this._x = 0,
                    this._y = 0,
                    this._opacity = 0,
                    this._width = 0,
                    this._height = 0,
                    this._zIndex = 0,
                    this.id = this.el.getAttribute("id"),
                    this.analyticsId = this.el.getAttribute("data-analytics-gallery-item-id") || this.el.getAttribute("id"),
                    this.applyDraw = this.applyDraw.bind(this),
                    this.measure()
            }
            measure() {
                const e = getComputedStyle(this.el);
                this._width = this.el.clientWidth,
                    this._height = this.el.clientHeight,
                    this._zIndex = parseInt(e.getPropertyValue("z-index")),
                    this._opacity = parseFloat(e.getPropertyValue("opacity"))
            }
            select() {
                this.el.classList.add("current"),
                    this.trigger("select", this)
            }
            deselect() {
                this.el.classList.remove("current"),
                    this.trigger("deselect", this)
            }
            progress(e) { }
            needsRedraw() {
                n.cancelDraw(this._rafID),
                    this._rafID = n.draw(this.applyDraw, !0)
            }
            applyDraw() {
                this.el.style.zIndex = this._zIndex,
                    this.el.style.opacity = this._opacity,
                    this.el.style.transform = "translate(".concat(this._x, "px, ").concat(this._y, "px)")
            }
            get height() {
                return this._height
            }
            set height(e) {
                this._height = e,
                    this.needsRedraw()
            }
            get width() {
                return this._width
            }
            set width(e) {
                this._width = e,
                    this.needsRedraw()
            }
            get x() {
                return this._x
            }
            set x(e) {
                this._x = e,
                    this.needsRedraw()
            }
            get y() {
                return this._y
            }
            set y(e) {
                this._y = e,
                    this.needsRedraw()
            }
            get opacity() {
                return this._opacity
            }
            set opacity(e) {
                this._opacity = e,
                    this.needsRedraw()
            }
            get zIndex() {
                return this._zIndex
            }
            set zIndex(e) {
                this._zIndex = e,
                    this.needsRedraw()
            }
        }
    }
        , {
        34: 34,
        95: 95,
        98: 98
    }],
    181: [function (e, t, i) {
        "use strict";
        t.exports = {
            PrefersReducedMotion: !1,
            IsRTL: !1,
            IsTouch: !1,
            Slide: {
                Selector: ".item-container",
                duration: 1
            },
            Fade: {
                duration: .5
            },
            Item: {
                Selector: ".item-container .gallery-item",
                ConstructorFunction: e(180)
            },
            DotNav: {
                Selector: ".dotnav"
            },
            PaddleNav: {
                Selector: ".paddlenav"
            },
            ChapterPlayer: {
                defaultEase: e => e
            },
            FadeCaptionOnChange: {
                ItemSelector: ".captions-gallery [data-captions-gallery-item]"
            },
            TabNav: {
                ItemSelector: ".tablist-wrapper li",
                RoamingTabIndexSelector: "a"
            },
            SwipeDetect: {
                DesktopSwipe: !1,
                LimitIndexChange: !1,
                movementRateMultiplier: 1.5,
                velocityMultiplier: 8
            },
            SwipeDrag: {
                DesktopSwipe: !1,
                movementRateMultiplier: 1.5,
                velocityMultiplier: 8
            },
            InitialIndexFromHashLink: {
                Enabled: !1,
                ScrollReset: !1
            },
            Theme: {
                classPrefix: "theme"
            },
            Events: {
                ITEM_CHANGE_INITIATED: "ITEM_CHANGE_INITIATED",
                ITEM_CHANGE_OCCURRED: "ITEM_CHANGE_OCCURRED",
                ITEM_CHANGE_COMPLETED: "ITEM_CHANGE_COMPLETED"
            }
        }
    }
        , {
        180: 180
    }],
    182: [function (e, t, i) {
        "use strict";
        let s;
        try {
            s = e("@marcom/ac-analytics").observer.Gallery
        } catch (e) { }
        t.exports = {
            created(e) {
                this.analytics = {
                    lastTrackedItem: null,
                    observer: null,
                    name: this.el.getAttribute("data-analytics-gallery-id") || this.el.getAttribute("id"),
                    events: {
                        UPDATE: "update",
                        UPDATE_COMPLETE: "update:complete"
                    }
                }
            },
            mounted() {
                s && (name || (console.warn("No ID attribute found on the Mixin Gallery element - please add an ID", this),
                    name = "null"),
                    this.analytics.observer = new s(this, {
                        galleryName: this.analytics.name,
                        beforeUpdateEvent: this.analytics.events.UPDATE,
                        afterUpdateEvent: this.analytics.events.UPDATE_COMPLETE,
                        trackAutoRotate: !0
                    }))
            },
            onItemChangeCompleted(e) {
                if (!e.previous || e.current === this.analytics.lastTrackedItem || e.current === e.previous && !this.analytics.lastTrackedItem)
                    return;
                this.analytics.lastTrackedItem = e.current;
                let t = {
                    incoming: {
                        id: e.current.analyticsId
                    },
                    outgoing: {
                        id: e.previous.analyticsId
                    },
                    interactionEvent: this.lastInteractionEvent
                };
                this.trigger(this.analytics.events.UPDATE_COMPLETE, t)
            }
        }
    }
        , {
        undefined: void 0
    }],
    183: [function (e, t, i) {
        "use strict";
        t.exports = {
            createItems(e) {
                if (this._items.length)
                    this.itemsCreated();
                else {
                    if (!this.model.Item.ConstructorFunction)
                        throw new ReferenceError("MixinGallery::AutoCreateItems - this.model.Item.ConstructorFunction is null");
                    if (0 === this._items.length) {
                        this._items = [],
                            Array.from(this.el.querySelectorAll(this.model.Item.Selector)).forEach((e, t) => {
                                const i = new this.model.Item.ConstructorFunction({
                                    el: e,
                                    index: t
                                });
                                this._items.push(i)
                            }
                            );
                        let e = this._items[this._items.length - 1];
                        for (let t = 0; t < this._items.length; t++) {
                            const i = this._items[t];
                            i.prev = e,
                                i.next = this._items[t + 1],
                                e = i
                        }
                        e.next = this._items[0]
                    }
                    this.itemsCreated()
                }
            }
        }
    }
        , {}],
    184: [function (e, t, i) {
        "use strict";
        t.exports = {
            itemsCreated(e) {
                this.model.options.gum || this._isVue || (this.anim.on("ON_RESIZE_IMMEDIATE", this.onResizeImmediate),
                    this.anim.on("ON_RESIZE_DEBOUNCED", this.onResizeDebounced),
                    this.anim.on("ON_BREAKPOINT_CHANGE", this.onBreakpointChange),
                    requestAnimationFrame(this.mounted))
            },
            destroy() {
                this.model.options.gum || this._isVue || (this.anim.off("ON_RESIZE_IMMEDIATE", this.onResizeImmediate),
                    this.anim.off("ON_RESIZE_DEBOUNCED", this.onResizeDebounced),
                    this.anim.off("ON_BREAKPOINT_CHANGE", this.onBreakpointChange))
            }
        }
    }
        , {}],
    185: [function (e, t, i) {
        "use strict";
        t.exports = {
            beforeCreate() {
                Object.defineProperties(this, {
                    currentItem: {
                        configurable: !0,
                        get: () => this._items[this.wrappedIndex(this.currentIndex)]
                    }
                })
            },
            wrappedIndex(e) {
                return (e %= this._items.length) < 0 ? this._items.length + e : e
            },
            getItemForTrigger(e) {
                return this._items.find(t => t.id === e)
            }
        }
    }
        , {}],
    186: [function (e, t, i) {
        "use strict";
        t.exports = {
            itemsCreated() {
                if (!this.model.InitialIndexFromHashLink.Enabled || !this._items)
                    return;
                const e = location.hash.slice(1);
                if (!e)
                    return;
                const t = this._items.findIndex(({ id: t }) => t === e);
                t > -1 && (this.currentIndex = t,
                    this.model.InitialIndexFromHashLink.ScrollReset && this._resetHorizontalScrollPosition())
            },
            _resetHorizontalScrollPosition(e) {
                const t = e || this.el;
                0 !== t.scrollLeft ? t.scrollLeft = 0 : t !== document.body && this._resetHorizontalScrollPosition(t.parentNode)
            }
        }
    }
        , {}],
    187: [function (e, t, i) {
        "use strict";
        t.exports = {
            mounted() {
                const e = this._items[this.wrappedIndex(this.currentIndex)];
                this.trigger(this.model.Events.ITEM_CHANGE_INITIATED, {
                    gallery: this,
                    next: e
                }),
                    this.trigger(this.model.Events.ITEM_CHANGE_OCCURRED, {
                        gallery: this,
                        current: e
                    }),
                    this.trigger(this.model.Events.ITEM_CHANGE_COMPLETED, {
                        gallery: this,
                        current: e
                    })
            }
        }
    }
        , {}],
    188: [function (e, t, i) {
        "use strict";
        t.exports = {
            itemsCreated() {
                this._items.forEach(e => {
                    e.progress = function (e) {
                        if (void 0 === e)
                            return this._progress;
                        this._progress = e,
                            this.el.style.setProperty("--progress", e)
                    }
                        ,
                        e.progress(e.index)
                }
                )
            }
        }
    }
        , {}],
    189: [function (e, t, i) {
        "use strict";
        const s = ["INPUT", "SELECT", "TEXTAREA"];
        t.exports = {
            created() {
                this.handleIntersect = this.handleIntersect.bind(this),
                    this.onKeyDown = this.onKeyDown.bind(this),
                    this.observer = new IntersectionObserver(this.handleIntersect),
                    this.observer.observe(this.el),
                    this.isInView = !1
            },
            destroy() {
                window.removeEventListener("keydown", this.onKeyDown),
                    this.observer.disconnect(),
                    this.observer = null,
                    this.isInView = !1
            },
            handleIntersect(e) {
                e.forEach(e => {
                    this.isInView = e.isIntersecting,
                        e.isIntersecting ? window.addEventListener("keydown", this.onKeyDown) : window.removeEventListener("keydown", this.onKeyDown)
                }
                )
            },
            onKeyDown(e) {
                if (37 !== e.keyCode && 39 !== e.keyCode || this.inputHasFocus())
                    return;
                let t = this.model.IsRTL ? -1 : 1
                    , i = 37 === e.keyCode ? -1 : 1;
                this.lastInteractionEvent = e;
                const s = this.currentIndex + i * t;
                this.animateToItem(s)
            },
            inputHasFocus: function () {
                return -1 !== s.indexOf(document.activeElement.nodeName)
            }
        }
    }
        , {}],
    190: [function (e, t, i) {
        "use strict";
        t.exports = {
            beforeCreate() {
                document.body._animInfo && (this.anim = document.body._animInfo.group.anim,
                    this.model.pageMetrics = this.anim.model.pageMetrics)
            },
            addKeyframe(e) {
                const t = e.el || this.el;
                return (e.group || this.anim).addKeyframe(t, e)
            },
            addDiscreteEvent(e) {
                e.event = e.event || "Generic-Event-Name-" + tmpUUID++;
                let t = void 0 !== e.end && e.end !== e.start;
                const i = this.addKeyframe(e);
                return t ? (e.onEnterOnce && i.controller.once(e.event + ":enter", e.onEnterOnce),
                    e.onExitOnce && i.controller.once(e.event + ":exit", e.onExitOnce),
                    e.onEnter && i.controller.on(e.event + ":enter", e.onEnter),
                    e.onExit && i.controller.on(e.event + ":exit", e.onExit)) : (e.onEventOnce && i.controller.once(e.event, e.onEventOnce),
                        e.onEventReverseOnce && i.controller.once(e.event + ":reverse", e.onEventReverseOnce),
                        e.onEvent && i.controller.on(e.event, e.onEvent),
                        e.onEventReverse && i.controller.on(e.event + ":reverse", e.onEventReverse)),
                    i
            },
            addRAFLoop(e) {
                let t = ["start", "end"];
                if (!t.every(t => e.hasOwnProperty(t)))
                    return void console.log("BubbleGum.BaseComponent::addRAFLoop required options are missing: " + t.join(" "));
                const i = new RAFEmitter.create;
                i.on("update", e.onUpdate || noop),
                    i.on("draw", e.onDraw || noop),
                    i.on("draw", () => i.run());
                const { onEnter: s, onExit: n } = e;
                return e.onEnter = () => {
                    i.run(),
                        s && s()
                }
                    ,
                    e.onExit = () => {
                        i.cancel(),
                            n && n()
                    }
                    ,
                    this.addDiscreteEvent(e)
            },
            addContinuousEvent(e) {
                e.onDraw || console.log("BubbleGum.BaseComponent::addContinuousEvent required option `onDraw` is missing. Consider using a regular keyframe if you do not need a callback"),
                    e.event = e.event || "Generic-Event-Name-" + tmpUUID++;
                let t = this.addKeyframe(e);
                return t.controller.on(e.event, e.onDraw),
                    t
            }
        }
    }
        , {}],
    191: [function (e, t, i) {
        "use strict";
        const s = (e, t) => {
            t ? e.removeAttribute("disabled") : e.setAttribute("disabled", "true")
        }
            ;
        t.exports = {
            mounted() {
                const e = this.el.querySelector(this.model.PaddleNav.Selector);
                this.paddleNav = {
                    previousEl: e.querySelector(".paddlenav-arrow-previous"),
                    nextEl: e.querySelector(".paddlenav-arrow-next")
                },
                    this.onPaddleNavSelected = this.onPaddleNavSelected.bind(this),
                    [this.paddleNav.previousEl, this.paddleNav.nextEl].forEach(e => {
                        e.addEventListener("click", this.onPaddleNavSelected)
                    }
                    )
            },
            destroy() {
                [this.paddleNav.previousEl, this.paddleNav.nextEl].forEach(e => {
                    e.removeEventListener("click", this.onPaddleNavSelected)
                }
                ),
                    this.paddleNav = null
            },
            onPaddleNavSelected(e) {
                let t = e.target.className.includes("previous") ? -1 : 1;
                this.lastInteractionEvent = e;
                const i = this.currentIndex + 1 * t;
                this.animateToItem(i)
            },
            onItemChangeCompleted(e) {
                const t = this.wrappedIndex(this.currentIndex + 1) !== this.currentIndex;
                s(this.paddleNav.nextEl, t);
                const i = this.wrappedIndex(this.currentIndex + -1) !== this.currentIndex;
                s(this.paddleNav.previousEl, i)
            }
        }
    }
        , {}],
    192: [function (e, t, i) {
        "use strict";
        t.exports = {
            onItemChangeOccurred(e) {
                const { previous: t, current: i } = this.selections.occurred;
                t && t !== i && t.deselect(),
                    i.select()
            }
        }
    }
        , {}],
    193: [function (e, t, i) {
        "use strict";
        const s = e(7)
            , n = e(11);
        t.exports = {
            itemsCreated(e) {
                this._items.forEach((e, t) => {
                    t === this.wrappedIndex(this.currentIndex) ? n(e.el) : s(e.el)
                }
                )
            },
            onItemChangeCompleted(e) {
                const { previous: t, current: i } = this.selections.completed;
                t && t !== i && s(t.el),
                    n(i.el)
            }
        }
    }
        , {
        11: 11,
        7: 7
    }],
    194: [function (e, t, i) {
        "use strict";
        const s = e(146)
            , n = e(128)
            , r = e(102)
            , a = e(98)
            , o = e(95)
            , l = e(97);
        t.exports = {
            beforeCreate() {
                Object.defineProperties(this, {
                    widthOfItem: {
                        configurable: !0,
                        get: () => this._items[0].width
                    }
                })
            },
            created(e) {
                this.position = 0,
                    this.target = 0,
                    this.slideContainer = this.el.querySelector(this.model.Slide.Selector),
                    this.sign = this.model.IsRTL ? -1 : 1,
                    this.mountUpdateId = 0,
                    this.mountDrawId = 0
            },
            mounted() {
                this.mountUpdateId = r(() => {
                    this._items.forEach(e => {
                        e.measure(),
                            e.x = e.width * e.index * this.sign
                    }
                    ),
                        this.mountDrawId = a(() => {
                            this.mountDrawId = null,
                                this.position = this.target = this.convertSlideIndexToHorizontalPosition(this.wrappedIndex(this.currentIndex)),
                                this.slideContainer.style.transform = "translate3d(".concat(-this.position, "px, 0,0)"),
                                this.checkForSlideUpdate(!0)
                        }
                        )
                }
                )
            },
            animateToItem(e) {
                const t = this.wrappedIndex(e);
                if (this.currentIndex === t)
                    return;
                this.el.parentElement.scrollLeft = 0;
                let i = "cubic-bezier(0.645, 0.045, 0.355, 1)";
                this.clip && this.clip._isPlaying && (this.clip.destroy(),
                    i = "cubic-bezier(0.23, 1, 0.32, 1)");
                const r = this.target
                    , a = this.convertSlideIndexToHorizontalPosition(e)
                    , o = this.model.PrefersReducedMotion ? .001 : this.model.Slide.duration
                    , l = this._items[this.wrappedIndex(e)];
                this.clip = new s(o, {
                    ease: n.fromCSSString(i),
                    prepare: () => this.trigger(this.model.Events.ITEM_CHANGE_INITIATED, {
                        gallery: this,
                        next: l
                    }),
                    update: e => {
                        e = Math.min(1, Math.max(e, 0)),
                            this.target = r + (a - r) * e
                    }
                    ,
                    draw: () => this.draw(1),
                    finish: () => this.trigger(this.model.Events.ITEM_CHANGE_COMPLETED, {
                        gallery: this,
                        current: l
                    })
                }),
                    this.slideContainer.style.transition = "transform ".concat(o, "s ").concat(i),
                    this.slideContainer.style.transform = "translate3d(".concat(-a, "px, 0,0)"),
                    this.clip.play().then(() => {
                        this.clip.destroy(),
                            this.clip = null
                    }
                    )
            },
            draw(e = 1) {
                let t = this.target - this.position;
                this.position += t * e;
                const i = Math.abs(this.position - this.target);
                i < .1 && (this.position = this.target),
                    this.checkForSlideUpdate(),
                    1 !== e && (this.slideContainer.style.transition = "transform 0.1s cubic-bezier(0.23, 1, 0.32, 1)",
                        this.slideContainer.style.transform = "translate(".concat(-this.position, "px, 0)"),
                        Math.abs(i) > 0 && (o(this.dragDrawId),
                            a(() => this.draw(e)))),
                    this._items.forEach(e => {
                        let t = (e.x - this.position) / this.widthOfItem;
                        e.progress(t)
                    }
                    )
            },
            checkForSlideUpdate(e) {
                let t = Math.floor((this.position * this.sign + .5 * this.widthOfItem) / this.widthOfItem);
                isNaN(t) || (t !== this.currentIndex || e) && (this.currentIndex = t,
                    this.wrapSlideItems(),
                    this.trigger(this.model.Events.ITEM_CHANGE_OCCURRED, {
                        gallery: this,
                        current: this.currentItem
                    }))
            },
            wrapSlideItems() {
                this.clampedIndex || this._items.length < 2 || (this.currentItem.x = this.convertSlideIndexToHorizontalPosition(this.currentIndex),
                    this.currentItem.prev.x = this.convertSlideIndexToHorizontalPosition(this.currentIndex - 1),
                    this.currentItem.next.x = this.convertSlideIndexToHorizontalPosition(this.currentIndex + 1))
            },
            onResizeImmediate() {
                this.clip && (this.clip.destroy(),
                    this.clip = null),
                    this._items.forEach(e => {
                        e.measure(),
                            e.x = e.width * e.index * this.sign
                    }
                    ),
                    this.currentIndex = this.wrappedIndex(this.currentItem.index),
                    this.wrapSlideItems(),
                    this.position = this.target = this.convertSlideIndexToHorizontalPosition(this.currentIndex),
                    this.slideContainer.style.transition = "none",
                    a(() => {
                        this.slideContainer.style.transform = "translate3d(".concat(-this.position, "px, 0,0)")
                    }
                    )
            },
            convertSlideIndexToHorizontalPosition(e) {
                return e * this.widthOfItem * this.sign
            },
            destroy() {
                this.mountUpdateId && l(this.mountUpdateId),
                    this.mountDrawId && o(this.mountDrawId),
                    this.clip && (this.clip.destroy(),
                        this.clip = null),
                    this._items.forEach(e => {
                        e.measure(),
                            e.x = 0,
                            e.zIndex = e === this.currentItem ? 2 : 0
                    }
                    ),
                    this.slideContainer.removeAttribute("style")
            }
        }
    }
        , {
        102: 102,
        128: 128,
        146: 146,
        95: 95,
        97: 97,
        98: 98
    }],
    195: [function (e, t, i) {
        "use strict";
        const s = e(98)
            , n = e(95);
        t.exports = {
            created(e) {
                this.swipeDrag = {
                    movementRateMultiplier: this.model.SwipeDrag.movementRateMultiplier,
                    velocityMultiplier: this.model.SwipeDrag.velocityMultiplier,
                    dragDrawId: -1,
                    waitingToReachTargetDrawId: -1,
                    inputStart: {
                        x: 0,
                        y: 0
                    },
                    swipeVelocity: 0,
                    isDragging: !1
                },
                    this._onStartDrag = this._onStartDrag.bind(this),
                    this._onDrag = this._onDrag.bind(this),
                    this._onStopDrag = this._onStopDrag.bind(this),
                    this.waitingToReachTarget = this.waitingToReachTarget.bind(this)
            },
            mounted() {
                this.inputMoveEventName = this.model.IsTouch ? "touchmove" : "mousemove",
                    this.inputUpEventName = this.model.IsTouch ? "touchend" : "mouseup",
                    this.inputDownEvent = this.model.IsTouch ? "touchstart" : "mousedown",
                    (this.model.IsTouch || this.model.SwipeDrag.DesktopSwipe) && (this.el.removeEventListener(this.inputDownEvent, this._onStartDrag),
                        this.el.addEventListener(this.inputDownEvent, this._onStartDrag))
            },
            _onStartDrag(e) {
                n(this.swipeDrag.dragDrawId),
                    n(this.swipeDrag.waitingToReachTargetDrawId);
                const t = e.target || e.relatedTarget;
                switch (!0) {
                    case "A" === t.tagName:
                    case "BUTTON" === t.tagName:
                    case !e.touches && 1 !== e.which:
                        return
                }
                this.clip && this.clip.destroy(),
                    this.lastInteractionEvent = e,
                    this.swipeDrag.swipeVelocity = 0,
                    this.swipeDrag.isDragging = !1;
                const i = this.model.IsTouch ? e.touches[0] : e;
                let { screenX: s, screenY: r } = i;
                this.swipeDrag.inputStart = {
                    x: s,
                    y: r
                },
                    window.addEventListener(this.inputMoveEventName, this._onDrag, {
                        passive: !1
                    }),
                    window.addEventListener(this.inputUpEventName, this._onStopDrag)
            },
            _onDrag(e) {
                this.swipeDrag.isDragging && e.cancelable && e.preventDefault();
                const t = this.model.IsTouch ? e.touches[0] : e;
                let { screenX: i, screenY: r } = t
                    , a = this.swipeDrag.inputStart.x - i
                    , o = this.swipeDrag.inputStart.y - r;
                this.swipeDrag.inputStart = {
                    x: i,
                    y: r
                },
                    this.swipeDrag.isDragging || (this.swipeDrag.isDragging = Math.abs(a) > 3 && Math.abs(a) > Math.abs(o)),
                    this.swipeDrag.isDragging && (this.target += a * this.swipeDrag.movementRateMultiplier,
                        this.swipeDrag.swipeVelocity = a * this.swipeDrag.velocityMultiplier,
                        this.clampedIndex && (this.model.IsRTL ? this.target = Math.max(this.widthOfItem * this.sign * (this._items.length - 1), Math.min(0, this.target)) : this.target = Math.min(this.widthOfItem * (this._items.length - 1), Math.max(0, this.target))),
                        n(this.swipeDrag.dragDrawId),
                        this.swipeDrag.dragDrawId = s(() => this.draw(.3)))
            },
            _onStopDrag(e) {
                if (window.removeEventListener(this.inputMoveEventName, this._onDrag),
                    window.removeEventListener(this.inputUpEventName, this._onStopDrag),
                    !this.swipeDrag.isDragging)
                    return;
                let t = [this.currentIndex - 1, this.currentIndex, this.currentIndex + 1]
                    , i = 0
                    , r = Number.MAX_VALUE;
                for (let e = 0, s = t.length; e < s; e++) {
                    let s = t[e] * this.widthOfItem
                        , n = Math.abs(s - (this.position + this.swipeDrag.swipeVelocity) * this.sign);
                    n < r && (r = n,
                        i = e)
                }
                this.lastInteractionEvent = e;
                let a = t[i];
                this.clampedIndex && (a = this.wrappedIndex(a)),
                    this.target = this.convertSlideIndexToHorizontalPosition(a),
                    n(this.swipeDrag.dragDrawId),
                    n(this.swipeDrag.waitingToReachTargetDrawId),
                    this.swipeDrag.dragDrawId = s(() => {
                        this.trigger(this.model.Events.ITEM_CHANGE_INITIATED, {
                            gallery: this,
                            next: this._items[this.wrappedIndex(a)]
                        }),
                            this.draw(.2),
                            this.waitingToReachTarget(a)
                    }
                    )
            },
            waitingToReachTarget(e) {
                if (Math.abs(this.position - this.target) > .1)
                    return void (this.swipeDrag.waitingToReachTargetDrawId = s(() => this.waitingToReachTarget(e)));
                const t = this.selections.occurred.current;
                this.trigger(this.model.Events.ITEM_CHANGE_COMPLETED, {
                    gallery: this,
                    current: t
                })
            },
            destroy() {
                this.el.removeEventListener(this.inputDownEvent, this._onStartDrag),
                    window.removeEventListener(this.inputMoveEventName, this._onDrag),
                    window.removeEventListener(this.inputUpEventName, this._onStopDrag)
            }
        }
    }
        , {
        95: 95,
        98: 98
    }],
    196: [function (e, t, i) {
        "use strict";
        const s = e(2)
            , n = e(12)
            , r = e(15);
        t.exports = {
            created() {
                this.tabNav = {
                    items: [],
                    current: null
                }
            },
            itemsCreated() {
                Array.from(this.el.querySelectorAll(this.model.TabNav.ItemSelector)).forEach((e, t) => {
                    const i = new a(e, t)
                        , s = this.getItemForTrigger(i.trigger);
                    s || console.error("MixinGallery '".concat(this.el.id, "': Could not match tav/dot nav item with trigger '").concat(i.trigger, "', to gallery any item. Double check to make sure the triggers match the item id's.")),
                        i.onSelected = e => {
                            this.lastInteractionEvent = e,
                                e.preventDefault();
                            let i = t - this.wrappedIndex(this.currentIndex)
                                , s = this.currentIndex + i;
                            this.animateToItem(s)
                        }
                        ,
                        s.on("select", () => {
                            e.classList.add("current"),
                                i.anchorEl.classList.add("current")
                        }
                        ),
                        s.on("deselect", () => {
                            e.classList.remove("current"),
                                i.anchorEl.classList.remove("current")
                        }
                        ),
                        i.anchorEl.addEventListener("click", i.onSelected),
                        this.tabNav.items.push(i)
                }
                ),
                    this._items.forEach((e, t) => {
                        e.el.setAttribute("role", r.TABPANEL),
                            e.el.setAttribute(n.LABELLEDBY, this.tabNav.items[t].anchorEl.id),
                            this.tabNav.items[t].anchorEl.setAttribute(n.CONTROLS, e.el.id)
                    }
                    )
            },
            mounted() {
                const e = this.tabNav.items[0].el.parentElement;
                this.roamingTabIndex = new s(e, {
                    selector: this.model.TabNav.RoamingTabIndexSelector
                })
            },
            onItemChangeCompleted(e) {
                let t = this.tabNav.items.filter(t => t.trigger === e.current.id)[0];
                this.setCurrentItem(t),
                    this.roamingTabIndex.setSelectedItemByIndex(t.index, !0),
                    document.activeElement.parentElement.parentElement === t.el.parentElement && t.anchorEl.focus()
            },
            setCurrentItem(e) {
                e !== this.tabNav.current && (this.tabNav.current = e)
            }
        };
        class a {
            constructor(e, t) {
                this.el = e,
                    this.index = t,
                    this.anchorEl = e.querySelector("a"),
                    this.trigger = this.anchorEl.getAttribute("data-ac-gallery-trigger"),
                    this.anchorEl.setAttribute("role", r.TAB)
            }
        }
    }
        , {
        12: 12,
        15: 15,
        2: 2
    }],
    197: [function (e, t, i) {
        "use strict";
        t.exports = {
            beforeCreate() {
                this.selections = {
                    initiated: {
                        current: null,
                        previous: null
                    },
                    occurred: {
                        current: null,
                        previous: null
                    },
                    completed: {
                        current: null,
                        previous: null
                    }
                }
            },
            onItemChangeInitiated(e) {
                this.selections.initiated.previous = this.selections.initiated.current,
                    this.selections.initiated.current = this.selections.initiated.next,
                    this.selections.initiated.next = e.next
            },
            onItemChangeOccurred(e) {
                this.selections.occurred.previous = e.previous = this.selections.occurred.current,
                    this.selections.occurred.current = e.current
            },
            onItemChangeCompleted(e) {
                this.selections.completed.previous = e.previous = this.selections.completed.current,
                    this.selections.completed.current = e.current
            }
        }
    }
        , {}],
    198: [function (e, t, i) {
        "use strict";
        const { SharedInstance: s } = e(103)
            , n = e => "".concat(e[0].toUpperCase() + e.slice(1))
            , r = ["before:update", "update", "after:update", "before:draw", "draw", "after:draw"]
            , a = (e, t, i) => {
                let s = n(i);
                ["before".concat(s), i, "after".concat(s)].forEach(e => {
                    const i = e.replace(/[A-Z]/, e => ":".concat(e[0].toLowerCase()));
                    t[e] = e => t.once(i, e, !0),
                        t["next".concat(n(e))] = e => {
                            let s = 0
                                , n = () => {
                                    if (1 == s++)
                                        return e(),
                                            t.off(i, n);
                                    t.run()
                                }
                                ;
                            return t.on(i, n, !0)
                        }
                        ,
                        t["cancel".concat(n(e))] = t["cancelNext".concat(n(e))] = e => t.off(i, e)
                }
                )
            }
            ;
        class o {
            constructor() {
                this.scheduled = !1,
                    this.e = {}
            }
            setExec(e) {
                return this.exec = e,
                    a(this.exec, this, "update"),
                    a(this.exec, this, "draw"),
                    this
            }
            run() {
                this.scheduled || (this.exec.schedule(this),
                    this.scheduled = !0)
            }
            destroy() {
                this.cancel(),
                    Object.freeze(this.e = {})
            }
            cancel() {
                this.scheduled = !1,
                    this.exec.emitters.delete(this)
            }
            on(e, t, i) {
                return i && this.run(),
                    this.e[e] = this.e[e] || [],
                    this.e[e].push(t),
                    t
            }
            once(e, t, i) {
                const s = () => {
                    this.off(e, s),
                        t()
                }
                    ;
                return this.on(e, s, i)
            }
            has(e) {
                return e in this.e && 0 !== this.e[e].size
            }
            off(e, t) {
                if (!this.has(e))
                    return;
                if (!t)
                    return void delete this.e[e];
                const i = this.e[e].indexOf(t);
                -1 !== i && this.e[e].splice(i, 1)
            }
            trigger(e) {
                this.has(e) && this.e[e].slice().forEach(t => {
                    this.e[e].includes(t) && t()
                }
                )
            }
        }
        const l = s.share("RAFEmitter", "1.x", new class extends o {
            constructor() {
                super(),
                    this.raf = "undefined" != typeof window ? window.requestAnimationFrame.bind(window) : () => { }
                    ,
                    this.emitters = new Set([this]),
                    this.setExec(this)
            }
            cancel() { }
            destroy() { }
            create() {
                return (new o).setExec(this)
            }
            schedule(e) {
                this.emitters.add(e),
                    this.scheduled || (this.scheduled = !0,
                        this.raf(this.perform.bind(this)))
            }
            perform() {
                this.scheduled = !1;
                let e = this.emitters;
                this.emitters = new Set([this]),
                    r.forEach(t => {
                        e.forEach(e => {
                            t === r[0] && (e.scheduled = !1),
                                e.trigger(t)
                        }
                        )
                    }
                    )
            }
        }
        );
        t.exports = {
            RAFExecutor: l,
            beforeUpdate: l.beforeUpdate,
            update: l.update,
            afterUpdate: l.afterUpdate,
            beforeDraw: l.beforeDraw,
            draw: l.draw,
            afterDraw: l.afterDraw,
            nextBeforeUpdate: l.nextBeforeUpdate,
            nextUpdate: l.nextUpdate,
            nextAfterUpdate: l.nextAfterUpdate,
            nextBeforeDraw: l.nextBeforeDraw,
            nextDraw: l.nextDraw,
            nextAfterDraw: l.nextAfterDraw,
            cancelBeforeUpdate: l.cancelBeforeUpdate,
            cancelUpdate: l.cancelUpdate,
            cancelAfterUpdate: l.cancelAfterUpdate,
            cancelBeforeDraw: l.cancelBeforeDraw,
            cancelDraw: l.cancelDraw,
            cancelAfterDraw: l.cancelAfterDraw,
            cancelNextBeforeUpdate: l.cancelNextBeforeUpdate,
            cancelNextUpdate: l.cancelNextUpdate,
            cancelNextAfterUpdate: l.cancelNextAfterUpdate,
            cancelNextBeforeDraw: l.cancelNextBeforeDraw,
            cancelNextDraw: l.cancelNextDraw,
            cancelNextAfterDraw: l.cancelNextAfterDraw
        }
    }
        , {
        103: 103
    }],
    199: [function (e, t, i) {
        "use strict";
        t.exports = {
            lerp: function (e, t, i) {
                return t + (i - t) * e
            },
            map: function (e, t, i, s, n) {
                return s + (n - s) * (e - t) / (i - t)
            },
            mapClamp: function (e, t, i, s, n) {
                var r = s + (n - s) * (e - t) / (i - t);
                return Math.max(s, Math.min(n, r))
            },
            norm: function (e, t, i) {
                return (e - t) / (i - t)
            },
            clamp: function (e, t, i) {
                return Math.max(t, Math.min(i, e))
            },
            randFloat: function (e, t) {
                return Math.random() * (t - e) + e
            },
            randInt: function (e, t) {
                return Math.floor(Math.random() * (t - e) + e)
            }
        }
    }
        , {}],
    200: [function (e, t, i) {
        "use strict";
        t.exports = {
            browser: {
                safari: !1,
                chrome: !1,
                firefox: !1,
                ie: !1,
                opera: !1,
                android: !1,
                edge: !1,
                edgeChromium: !1,
                samsung: !1,
                version: {
                    string: "",
                    major: 0,
                    minor: 0,
                    patch: 0,
                    documentMode: !1
                }
            },
            os: {
                osx: !1,
                ios: !1,
                android: !1,
                windows: !1,
                linux: !1,
                fireos: !1,
                chromeos: !1,
                version: {
                    string: "",
                    major: 0,
                    minor: 0,
                    patch: 0
                }
            }
        }
    }
        , {}],
    201: [function (e, t, i) {
        "use strict";
        t.exports = {
            browser: [{
                name: "edge",
                userAgent: "Edge",
                version: ["rv", "Edge"],
                test: function (e) {
                    return e.ua.indexOf("Edge") > -1 || "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" === e.ua
                }
            }, {
                name: "edgeChromium",
                userAgent: "Edge",
                version: ["rv", "Edg"],
                test: function (e) {
                    return e.ua.indexOf("Edg") > -1 && -1 === e.ua.indexOf("Edge")
                }
            }, {
                name: "chrome",
                userAgent: "Chrome"
            }, {
                name: "firefox",
                test: function (e) {
                    return e.ua.indexOf("Firefox") > -1 && -1 === e.ua.indexOf("Opera")
                },
                version: "Firefox"
            }, {
                name: "android",
                userAgent: "Android"
            }, {
                name: "safari",
                test: function (e) {
                    return e.ua.indexOf("Safari") > -1 && e.vendor.indexOf("Apple") > -1
                },
                version: "Version"
            }, {
                name: "ie",
                test: function (e) {
                    return e.ua.indexOf("IE") > -1 || e.ua.indexOf("Trident") > -1
                },
                version: ["MSIE", "rv"],
                parseDocumentMode: function () {
                    var e = !1;
                    return document.documentMode && (e = parseInt(document.documentMode, 10)),
                        e
                }
            }, {
                name: "opera",
                userAgent: "Opera",
                version: ["Version", "Opera"]
            }, {
                name: "samsung",
                userAgent: "SamsungBrowser"
            }],
            os: [{
                name: "windows",
                test: function (e) {
                    return e.ua.indexOf("Windows") > -1
                },
                version: "Windows NT"
            }, {
                name: "osx",
                userAgent: "Mac",
                test: function (e) {
                    return e.ua.indexOf("Macintosh") > -1
                }
            }, {
                name: "ios",
                test: function (e) {
                    return e.ua.indexOf("iPhone") > -1 || e.ua.indexOf("iPad") > -1
                },
                version: ["iPhone OS", "CPU OS"]
            }, {
                name: "linux",
                userAgent: "Linux",
                test: function (e) {
                    return (e.ua.indexOf("Linux") > -1 || e.platform.indexOf("Linux") > -1) && -1 === e.ua.indexOf("Android")
                }
            }, {
                name: "fireos",
                test: function (e) {
                    return e.ua.indexOf("Firefox") > -1 && e.ua.indexOf("Mobile") > -1
                },
                version: "rv"
            }, {
                name: "android",
                userAgent: "Android",
                test: function (e) {
                    return e.ua.indexOf("Android") > -1
                }
            }, {
                name: "chromeos",
                userAgent: "CrOS"
            }]
        }
    }
        , {}],
    202: [function (e, t, i) {
        "use strict";
        var s = e(200)
            , n = e(201);
        function r(e, t) {
            if ("function" == typeof e.parseVersion)
                return e.parseVersion(t);
            var i, s = e.version || e.userAgent;
            "string" == typeof s && (s = [s]);
            for (var n, r = s.length, a = 0; a < r; a++)
                if ((n = t.match((i = s[a],
                    new RegExp(i + "[a-zA-Z\\s/:]+([0-9_.]+)", "i")))) && n.length > 1)
                    return n[1].replace(/_/g, ".");
            return !1
        }
        function a(e, t, i) {
            for (var s, n, a = e.length, o = 0; o < a; o++)
                if ("function" == typeof e[o].test ? !0 === e[o].test(i) && (s = e[o].name) : i.ua.indexOf(e[o].userAgent) > -1 && (s = e[o].name),
                    s) {
                    if (t[s] = !0,
                        "string" == typeof (n = r(e[o], i.ua))) {
                        var l = n.split(".");
                        t.version.string = n,
                            l && l.length > 0 && (t.version.major = parseInt(l[0] || 0),
                                t.version.minor = parseInt(l[1] || 0),
                                t.version.patch = parseInt(l[2] || 0))
                    } else
                        "edge" === s && (t.version.string = "12.0.0",
                            t.version.major = "12",
                            t.version.minor = "0",
                            t.version.patch = "0");
                    return "function" == typeof e[o].parseDocumentMode && (t.version.documentMode = e[o].parseDocumentMode()),
                        t
                }
            return t
        }
        t.exports = function (e) {
            var t = {};
            return t.browser = a(n.browser, s.browser, e),
                t.os = a(n.os, s.os, e),
                t
        }
    }
        , {
        200: 200,
        201: 201
    }],
    203: [function (e, t, i) {
        "use strict";
        var s = {
            ua: window.navigator.userAgent,
            platform: window.navigator.platform,
            vendor: window.navigator.vendor
        };
        t.exports = e(202)(s)
    }
        , {
        202: 202
    }],
    204: [function (e, t, i) {
        "use strict";
        const s = e(34).EventEmitterMicro
            , n = [{
                name: "S",
                mediaQuery: "only screen and (max-width: 734px)"
            }, {
                name: "M",
                mediaQuery: "only screen and (min-width: 735px) and (max-width: 1068px)"
            }, {
                name: "L",
                mediaQuery: "only screen and (min-width: 1069px) and (max-width: 1440px)"
            }, {
                name: "X",
                mediaQuery: "only screen and (min-width: 1441px)"
            }]
            , r = "only screen and (-webkit-min-device-pixel-ratio: 1.5), screen and (min-resolution: 1.5dppx), screen and (min-resolution: 144dpi)"
            , a = "only screen and (orientation: portrait)";
        class o extends s {
            constructor(e = {}) {
                super(),
                    this.BREAKPOINTS = e.breakpoints || n,
                    this._setupProperties(),
                    this._onRetinaChange = this._onRetinaChange.bind(this),
                    this._onOrientationChange = this._onOrientationChange.bind(this),
                    this.listenersAdded = {
                        orientation: !1,
                        retina: !1,
                        viewport: !1
                    }
            }
            static get CHANGE_EVENTS() {
                return {
                    ORIENTATION: "change:orientation",
                    RETINA: "change:retina",
                    VIEWPORT: "change:viewport"
                }
            }
            on() {
                this._setupListeners(arguments[0]),
                    super.on.apply(this, arguments)
            }
            _onRetinaChange() {
                this.trigger(o.CHANGE_EVENTS.RETINA, this)
            }
            _onOrientationChange() {
                this.trigger(o.CHANGE_EVENTS.ORIENTATION, this)
            }
            _setupProperties() {
                Object.defineProperty(this, "retina", {
                    get: () => window.matchMedia(r).matches
                }),
                    Object.defineProperty(this, "orientation", {
                        get: () => window.matchMedia(a).matches ? "portrait" : "landscape"
                    }),
                    this.viewport = this.getBreakpoint()
            }
            _setupListeners(e) {
                if (e !== o.CHANGE_EVENTS.RETINA || this.listenersAdded.retina || (window.matchMedia(r).addListener(this._onRetinaChange),
                    this.listenersAdded.retina = !0),
                    e !== o.CHANGE_EVENTS.ORIENTATION || this.listenersAdded.orientation || (window.matchMedia(a).addListener(this._onOrientationChange),
                        this.listenersAdded.orientation = !0),
                    e === o.CHANGE_EVENTS.VIEWPORT && !this.listenersAdded.viewport) {
                    for (let e = 0; e < this.BREAKPOINTS.length; e++) {
                        let t = this.BREAKPOINTS[e];
                        window.matchMedia(t.mediaQuery).addListener(e => {
                            e.matches && (this.oldViewport = this.viewport,
                                this.viewport = t.name,
                                this.trigger(o.CHANGE_EVENTS.VIEWPORT, this))
                        }
                        )
                    }
                    this.listenersAdded.viewport = !0
                }
            }
            getBreakpoint() {
                for (let e = 0; e < this.BREAKPOINTS.length; e++) {
                    let t = this.BREAKPOINTS[e];
                    if (window.matchMedia(t.mediaQuery).matches)
                        return t.name
                }
            }
        }
        t.exports = o
    }
        , {
        34: 34
    }],
    205: [function (e, t, i) {
        "use strict";
        var s = e(34).EventEmitterMicro;
        const n = {};
        "undefined" != typeof window && (n.update = e(102));
        var r = "viewport-emitter"
            , a = {
                removeNamespace: !0
            }
            , o = "data-viewport-emitter-dispatch"
            , l = "data-viewport-emitter-state"
            , c = "only screen and (-webkit-min-device-pixel-ratio: 1.5), screen and (min-resolution: 1.5dppx), screen and (min-resolution: 144dpi)"
            , h = "only screen and (orientation: portrait)"
            , d = "only screen and (orientation: landscape)"
            , u = "change:any"
            , m = "change:orientation"
            , p = "change:retina"
            , f = "change:viewport";
        function y(e, t) {
            s.call(this),
                this._id = e || r,
                this._options = Object.assign({}, a, t),
                this._allowDOMEventDispatch = !1,
                this._allowElementStateData = !1,
                this._options.removeNamespace = "boolean" != typeof this._options.removeNamespace || this._options.removeNamespace,
                this._el = this._initViewportEl(this._id),
                this._resizing = !1,
                this._mediaQueryLists = {
                    resolution: {
                        retina: window.matchMedia(c)
                    },
                    orientation: {
                        portrait: window.matchMedia(h),
                        landscape: window.matchMedia(d)
                    }
                },
                this._viewport = this._getViewport(this._options.removeNamespace),
                this._retina = this._getRetina(this._mediaQueryLists.resolution.retina),
                this._orientation = this._initOrientation(),
                this._addListeners(),
                this._updateElementStateData()
        }
        Object.defineProperty(y, "DOM_DISPATCH_ATTRIBUTE", {
            get: function () {
                return o
            }
        }),
            Object.defineProperty(y, "DOM_STATE_ATTRIBUTE", {
                get: function () {
                    return l
                }
            });
        var g = y.prototype = Object.create(s.prototype);
        Object.defineProperty(g, "id", {
            get: function () {
                return this._id
            }
        }),
            Object.defineProperty(g, "element", {
                get: function () {
                    return this._el
                }
            }),
            Object.defineProperty(g, "mediaQueryLists", {
                get: function () {
                    return this._mediaQueryLists
                }
            }),
            Object.defineProperty(g, "viewport", {
                get: function () {
                    return this._viewport
                }
            }),
            Object.defineProperty(g, "retina", {
                get: function () {
                    return this._retina
                }
            }),
            Object.defineProperty(g, "orientation", {
                get: function () {
                    return this._orientation
                }
            }),
            Object.defineProperty(g, "hasDomDispatch", {
                get: function () {
                    return this._allowDOMEventDispatch
                }
            }),
            g.destroy = function () {
                for (var e in this._removeListeners(),
                    this._options)
                    this._options[e] = null;
                for (var t in this._mediaQueryLists) {
                    var i = this._mediaQueryLists[t];
                    for (var n in i)
                        i[n] = null
                }
                this._id = null,
                    this._el = null,
                    this._viewport = null,
                    this._retina = null,
                    this._orientation = null,
                    s.prototype.destroy.call(this)
            }
            ,
            g._initViewportEl = function (e) {
                var t = document.getElementById(e);
                return t || ((t = document.createElement("div")).id = e,
                    t = document.body.appendChild(t)),
                    t.hasAttribute(o) || (t.setAttribute(o, ""),
                        this._allowDOMEventDispatch = !0),
                    t.hasAttribute(l) || (this._allowElementStateData = !0),
                    t
            }
            ,
            g._dispatch = function (e, t) {
                var i = {
                    viewport: this._viewport,
                    orientation: this._orientation,
                    retina: this._retina
                };
                if (this._allowDOMEventDispatch) {
                    var s = new CustomEvent(e, {
                        detail: t
                    })
                        , n = new CustomEvent(u, {
                            detail: i
                        });
                    this._el.dispatchEvent(s),
                        this._el.dispatchEvent(n)
                }
                this.trigger(e, t),
                    this.trigger(u, i)
            }
            ,
            g._addListeners = function () {
                this._onOrientationChange = this._onOrientationChange.bind(this),
                    this._onRetinaChange = this._onRetinaChange.bind(this),
                    this._onViewportChange = this._onViewportChange.bind(this),
                    this._onViewportChangeUpdate = this._onViewportChangeUpdate.bind(this),
                    this._mediaQueryLists.orientation.portrait.addListener(this._onOrientationChange),
                    this._mediaQueryLists.orientation.landscape.addListener(this._onOrientationChange),
                    this._mediaQueryLists.resolution.retina.addListener(this._onRetinaChange),
                    window.addEventListener("resize", this._onViewportChange)
            }
            ,
            g._removeListeners = function () {
                this._mediaQueryLists.orientation.portrait.removeListener(this._onOrientationChange),
                    this._mediaQueryLists.orientation.landscape.removeListener(this._onOrientationChange),
                    this._mediaQueryLists.resolution.retina.removeListener(this._onRetinaChange),
                    window.removeEventListener("resize", this._onViewportChange)
            }
            ,
            g._updateElementStateData = function () {
                if (this._allowElementStateData) {
                    var e = JSON.stringify({
                        viewport: this._viewport,
                        orientation: this._orientation,
                        retina: this._retina
                    });
                    this._el.setAttribute(l, e)
                }
            }
            ,
            g._getViewport = function (e) {
                var t = window.getComputedStyle(this._el, "::before").content;
                return t ? (t = t.replace(/["']/g, ""),
                    e ? t.split(":").pop() : t) : null
            }
            ,
            g._getRetina = function (e) {
                return e.matches
            }
            ,
            g._getOrientation = function (e) {
                var t = this._orientation;
                if (e.matches) {
                    return e.media.match(/portrait|landscape/)[0]
                }
                return t
            }
            ,
            g._initOrientation = function () {
                var e = this._getOrientation(this._mediaQueryLists.orientation.portrait);
                return e || this._getOrientation(this._mediaQueryLists.orientation.landscape)
            }
            ,
            g._onViewportChange = function () {
                this._resizing || (this._resizing = !0,
                    n.update(this._onViewportChangeUpdate))
            }
            ,
            g._onViewportChangeUpdate = function () {
                var e = this._viewport;
                if (this._viewport = this._getViewport(this._options.removeNamespace),
                    e !== this._viewport) {
                    var t = {
                        from: e,
                        to: this._viewport
                    };
                    this._updateElementStateData(),
                        this._dispatch(f, t)
                }
                this._resizing = !1
            }
            ,
            g._onRetinaChange = function (e) {
                var t = this._retina;
                if (this._retina = this._getRetina(e),
                    t !== this._retina) {
                    var i = {
                        from: t,
                        to: this._retina
                    };
                    this._updateElementStateData(),
                        this._dispatch(p, i)
                }
            }
            ,
            g._onOrientationChange = function (e) {
                var t = this._orientation;
                if (this._orientation = this._getOrientation(e),
                    t !== this._orientation) {
                    var i = {
                        from: t,
                        to: this._orientation
                    };
                    this._updateElementStateData(),
                        this._dispatch(m, i)
                }
            }
            ,
            t.exports = y
    }
        , {
        102: 102,
        34: 34
    }],
    206: [function (e, t, i) {
        "use strict";
        var s = e(205);
        t.exports = new s
    }
        , {
        205: 205
    }],
    207: [function (e, t, i) {
        "use strict";
        t.exports = function () {
            var e = new Float32Array(16);
            return e[0] = 1,
                e[1] = 0,
                e[2] = 0,
                e[3] = 0,
                e[4] = 0,
                e[5] = 1,
                e[6] = 0,
                e[7] = 0,
                e[8] = 0,
                e[9] = 0,
                e[10] = 1,
                e[11] = 0,
                e[12] = 0,
                e[13] = 0,
                e[14] = 0,
                e[15] = 1,
                e
        }
    }
        , {}],
    208: [function (e, t, i) {
        "use strict";
        t.exports = function (e, t, i) {
            var s = Math.sin(i)
                , n = Math.cos(i)
                , r = t[4]
                , a = t[5]
                , o = t[6]
                , l = t[7]
                , c = t[8]
                , h = t[9]
                , d = t[10]
                , u = t[11];
            t !== e && (e[0] = t[0],
                e[1] = t[1],
                e[2] = t[2],
                e[3] = t[3],
                e[12] = t[12],
                e[13] = t[13],
                e[14] = t[14],
                e[15] = t[15]);
            return e[4] = r * n + c * s,
                e[5] = a * n + h * s,
                e[6] = o * n + d * s,
                e[7] = l * n + u * s,
                e[8] = c * n - r * s,
                e[9] = h * n - a * s,
                e[10] = d * n - o * s,
                e[11] = u * n - l * s,
                e
        }
    }
        , {}],
    209: [function (e, t, i) {
        "use strict";
        t.exports = function (e, t, i) {
            var s = Math.sin(i)
                , n = Math.cos(i)
                , r = t[0]
                , a = t[1]
                , o = t[2]
                , l = t[3]
                , c = t[8]
                , h = t[9]
                , d = t[10]
                , u = t[11];
            t !== e && (e[4] = t[4],
                e[5] = t[5],
                e[6] = t[6],
                e[7] = t[7],
                e[12] = t[12],
                e[13] = t[13],
                e[14] = t[14],
                e[15] = t[15]);
            return e[0] = r * n - c * s,
                e[1] = a * n - h * s,
                e[2] = o * n - d * s,
                e[3] = l * n - u * s,
                e[8] = r * s + c * n,
                e[9] = a * s + h * n,
                e[10] = o * s + d * n,
                e[11] = l * s + u * n,
                e
        }
    }
        , {}],
    210: [function (e, t, i) {
        "use strict";
        t.exports = function (e, t, i) {
            var s = Math.sin(i)
                , n = Math.cos(i)
                , r = t[0]
                , a = t[1]
                , o = t[2]
                , l = t[3]
                , c = t[4]
                , h = t[5]
                , d = t[6]
                , u = t[7];
            t !== e && (e[8] = t[8],
                e[9] = t[9],
                e[10] = t[10],
                e[11] = t[11],
                e[12] = t[12],
                e[13] = t[13],
                e[14] = t[14],
                e[15] = t[15]);
            return e[0] = r * n + c * s,
                e[1] = a * n + h * s,
                e[2] = o * n + d * s,
                e[3] = l * n + u * s,
                e[4] = c * n - r * s,
                e[5] = h * n - a * s,
                e[6] = d * n - o * s,
                e[7] = u * n - l * s,
                e
        }
    }
        , {}],
    211: [function (e, t, i) {
        "use strict";
        t.exports = function (e, t, i) {
            var s = i[0]
                , n = i[1]
                , r = i[2];
            return e[0] = t[0] * s,
                e[1] = t[1] * s,
                e[2] = t[2] * s,
                e[3] = t[3] * s,
                e[4] = t[4] * n,
                e[5] = t[5] * n,
                e[6] = t[6] * n,
                e[7] = t[7] * n,
                e[8] = t[8] * r,
                e[9] = t[9] * r,
                e[10] = t[10] * r,
                e[11] = t[11] * r,
                e[12] = t[12],
                e[13] = t[13],
                e[14] = t[14],
                e[15] = t[15],
                e
        }
    }
        , {}],
    212: [function (e, t, i) {
        "use strict";
        const s = e(42)
            , n = e(218);
        t.exports = class extends s {
            constructor(e) {
                super(...arguments),
                    this.gallery = this.sectionElement.querySelector(".fam-gallery"),
                    this.playPause = this.sectionElement.querySelector(".fam-gallery-play-pause"),
                    this.isReduceMotion = document.documentElement.classList.contains("reduced-motion"),
                    this._initialize()
            }
            async _initialize() {
                this.marquee = this.sectionElement.querySelector(".fam-gallery-marquee"),
                    this.timeline = this.AnimSystem.groups.filter(e => "famGalleryMarquee" === e.name)[0],
                    this.isReduceMotion && this.gallery.classList.add("fam-gallery-ext-paused"),
                    this.onlyFAMGallery(),
                    n.emitter.on(n.events.playing, () => {
                        this.timeline.play(),
                            this.marquee.style.willChange = "transform",
                            this.gallery.classList.remove("fam-gallery-ext-paused")
                    }
                    ),
                    n.emitter.on(n.events.paused, () => {
                        this.timeline.pause(),
                            this.marquee.style.willChange = "",
                            this.gallery.classList.add("fam-gallery-ext-paused")
                    }
                    )
            }
            onlyFAMGallery() {
                const e = document.getElementById("tv-plus-gallery")
                    , t = document.querySelector(".tv-plus-gallery-play-pause");
                e && !t || this.isReduceMotion ? e && !t || !this.isReduceMotion || (this.playPause.classList.add("paused"),
                    this.playPause.setAttribute("aria-label", "Play FAM gallery"),
                    this.playPause.setAttribute("data-analytics-title", "play-fam-gallery"),
                    this.playPause.setAttribute("data-analytics-click", "prop3:play-fam-gallery")) : (this.playPause.classList.add("playing"),
                        this.playPause.setAttribute("aria-label", "Pause FAM Gallery"),
                        this.playPause.setAttribute("data-analytics-title", "pause-fam-gallery"),
                        this.playPause.setAttribute("data-analytics-click", "prop3:pause-fam-gallery"))
            }
        }
    }
        , {
        218: 218,
        42: 42
    }],
    213: [function (e, t, i) {
        "use strict";
        const s = e(42);
        t.exports = class extends s {
            constructor(e) {
                super(...arguments),
                    setTimeout(() => {
                        if (document.querySelector(".modal")) {
                            document.querySelector(".modal").classList.add("modal-dark")
                        }
                    }
                        , 500)
            }
        }
    }
        , {
        42: 42
    }],
    214: [function (e, t, i) {
        "use strict";
        const s = e(42);
        t.exports = class extends s {
            constructor(e) {
                super(...arguments),
                    this.isSupported() && this._initialize(e)
            }
            async _initialize(e) {
                const t = e.querySelector(".unit-copy-wrapper")
                    , i = e.querySelector("#apple-vision-pro-enhanced")
                    , s = i.parentElement
                    , n = e.querySelector(".avp-enhanced-napoleon-legal");
                function r() {
                    const e = Math.floor(i.currentTime);
                    7 === e && (t.classList.add("legal-visible"),
                        n.style.opacity = 1,
                        n.removeAttribute("aria-hidden")),
                        10 === e && (t.classList.remove("legal-visible"),
                            n.style.opacity = 0,
                            n.setAttribute("aria-hidden", !0))
                }
                i.addEventListener("canplaythrough", () => {
                    i.addEventListener("timeupdate", r)
                }
                ),
                    i.addEventListener("error", () => {
                        t.classList.remove("legal-visible"),
                            n.remove(),
                            i.removeEventListener("timeupdate", r)
                    }
                    ),
                    s.addEventListener("LOAD_TIMEOUT", () => {
                        t.classList.remove("legal-visible"),
                            n.remove(),
                            i.removeEventListener("timeupdate", r)
                    }
                    ),
                    this.viewportEmitter.on("change:viewport", () => {
                        t.classList.remove("legal-visible"),
                            n.remove(),
                            i.removeEventListener("timeupdate", r)
                    }
                    )
            }
            isSupported() {
                return !document.documentElement.classList.contains("reduced-motion") || !document.documentElement.classList.contains("no-enhanced-xp")
            }
        }
    }
        , {
        42: 42
    }],
    215: [function (e, t, i) {
        "use strict";
        const s = e(42)
            , n = e(112);
        t.exports = class extends s {
            constructor(e) {
                if (super(...arguments),
                    this.el = e,
                    this.btsContainer = document.querySelector(".bubble-wrapper.animate"),
                    !this.btsContainer)
                    return;
                if (this.bubbles = [...this.btsContainer.querySelectorAll(".bubble")],
                    !this.bubbles)
                    return;
                const t = document.documentElement.classList.contains("text-zoom")
                    , i = window.innerHeight < 350;
                t || i ? this._showBubbles() : this.isSupported() && this._initialize()
            }
            _initialize() {
                this.timeGroup = n.createTimeGroup(),
                    this.timeGroupFadeIn = n.createTimeGroup(),
                    this.scrollGroup = n.createScrollGroup(this.btsContainer),
                    this.searchParams = new URLSearchParams(window.location.search),
                    this.doesAnimExist = !0,
                    this._addBuildAnimation(),
                    this.viewportEmitter.on("change:viewport", () => {
                        this.doesAnimExist && (this._destroy(),
                            this.doesAnimExist = !1)
                    }
                    ),
                    this.viewportEmitter.on("change:orientation", () => {
                        this.doesAnimExist && (this._destroy(),
                            this.doesAnimExist = !1)
                    }
                    )
            }
            _addBuildAnimation() {
                const e = this.el.querySelector(".bubble-1")
                    , t = this.el.querySelector(".bubble-2")
                    , i = this.el.querySelector(".bubble-3")
                    , s = this.el.querySelector(".bubble-4")
                    , n = this.el.querySelector(".icon-heart")
                    , r = this.el.querySelector(".icon-mba")
                    , a = this.el.querySelector(".icon-ipadair")
                    , o = this.el.querySelector(".icon-giftcard")
                    , l = this.el.querySelector(".icon-exclam");
                this.timeGroupFadeIn.addKeyframe(e, {
                    start: "0",
                    end: "".concat("0", " + 0.38"),
                    cssClass: "will-change-opacity",
                    toggle: !0
                }),
                    this.timeGroupFadeIn.addKeyframe(e, {
                        start: "0",
                        end: "".concat("0", " + 3.7"),
                        cssClass: "will-change-transform",
                        toggle: !0
                    }),
                    this.timeGroupFadeIn.addKeyframe(e, {
                        start: "0",
                        end: "".concat("0", " + 0.38"),
                        opacity: [0, 1]
                    }),
                    this.timeGroupFadeIn.addKeyframe(t, {
                        start: "0",
                        end: "".concat("0", " + 0.38"),
                        cssClass: "will-change-opacity",
                        toggle: !0
                    }),
                    this.timeGroupFadeIn.addKeyframe(t, {
                        start: "0",
                        end: "".concat("0", " + 0.38"),
                        opacity: [0, 1]
                    }),
                    this.timeGroupFadeIn.addKeyframe(i, {
                        start: "0",
                        end: "".concat("0", " + 0.38"),
                        cssClass: "will-change-opacity",
                        toggle: !0
                    }),
                    this.timeGroupFadeIn.addKeyframe(i, {
                        start: "0",
                        end: "".concat("0", " + 0.38"),
                        opacity: [0, 1]
                    }),
                    this.timeGroupFadeIn.addKeyframe(s, {
                        start: "0",
                        end: "".concat("0", " + 0.38"),
                        cssClass: "will-change-opacity",
                        toggle: !0
                    }),
                    this.timeGroupFadeIn.addKeyframe(s, {
                        start: "0",
                        end: "".concat("0", " + 0.38"),
                        opacity: [0, 1]
                    }),
                    this.timeGroupFadeIn.play(),
                    this.timeGroup.addKeyframe(e, {
                        start: "".concat("0", " + 1.05"),
                        end: "".concat("0", " + 1.2"),
                        y: ["50%", "-40px"],
                        rotation: ["5deg", "15deg"],
                        easeFunction: "easeOutCubic"
                    }),
                    this.timeGroup.addKeyframe(e, {
                        start: "".concat("0", " + 1.237"),
                        end: "".concat("0", " + 1.425"),
                        y: ["-40px", "45px"],
                        rotation: ["15deg", "2deg"],
                        easeFunction: "easeInQuad"
                    }),
                    this.timeGroup.addKeyframe(e, {
                        start: "".concat("0", " + 1.425"),
                        end: "".concat("0", " + 1.487"),
                        scale: [1, 1.02],
                        easeFunction: "linear"
                    }),
                    this.timeGroup.addKeyframe(e, {
                        start: "".concat("0", " + 1.487"),
                        end: "".concat("0", " + 1.5"),
                        scale: [1.02, 1],
                        easeFunction: "linear"
                    }),
                    this.timeGroup.addKeyframe(e, {
                        start: "".concat("0", " + 1.575"),
                        end: "".concat("0", " + 1.8"),
                        rotation: ["2deg", "5deg"],
                        easeFunction: "linear"
                    }),
                    this.timeGroup.addKeyframe(e, {
                        start: "".concat("0", " + 1.8"),
                        end: "".concat("0", " + 1.95"),
                        y: ["45px", "5px"],
                        rotation: ["5deg", "-1deg"],
                        easeFunction: "bezier(0.09,0.71,0.25,1.29)"
                    }),
                    this.timeGroup.addKeyframe(e, {
                        start: "".concat("0", " + 1.95"),
                        end: "".concat("0", " + 2.137"),
                        y: ["5px", "20px"],
                        easeFunction: "bezier(0.13,0.55,0.27,0.79)"
                    }),
                    this.timeGroup.addKeyframe(e, {
                        start: "".concat("0", " + 2.89"),
                        end: "".concat("0", " + 2.96"),
                        rotation: ["-1deg", "4deg"],
                        easeFunction: "linear"
                    }),
                    this.timeGroup.addKeyframe(e, {
                        start: "".concat("0", " + 2.96"),
                        end: "".concat("0", " + 3.3"),
                        y: ["20px", "-35px"],
                        rotation: ["4deg", "-4deg"],
                        easeFunction: "bezier(0.01,0.97,1,1)"
                    }),
                    this.timeGroup.addKeyframe(e, {
                        start: "".concat("0", " + 3.3"),
                        end: "".concat("0", " + 3.45"),
                        y: ["-35px", "0"],
                        rotation: ["-4deg", "0deg"],
                        easeFunction: "bezier(0.57,0.01,1,1)"
                    }),
                    this.timeGroup.addKeyframe(e, {
                        start: "".concat("0", " + 3.45"),
                        end: "".concat("0", " + 3.53"),
                        scale: [1, .99],
                        easeFunction: "linear"
                    }),
                    this.timeGroup.addKeyframe(e, {
                        start: "".concat("0", " + 3.5"),
                        end: "".concat("0", " + 3.6"),
                        scale: [.99, 1],
                        easeFunction: "linear"
                    }),
                    this.timeGroup.addKeyframe(t, {
                        start: "0",
                        end: "0",
                        rotation: ["0deg", "2deg"],
                        easeFunction: "linear"
                    }),
                    this.timeGroup.addKeyframe(t, {
                        start: "".concat("0", " + 0.75"),
                        end: "".concat("0", " + 3.5"),
                        cssClass: "will-change-transform",
                        toggle: !0
                    }),
                    this.timeGroup.addKeyframe(t, {
                        start: "".concat("0", " + 0.9"),
                        end: "".concat("0", " + 1.2"),
                        y: ["700px", "20px"],
                        easeFunction: "easeOutCubic"
                    }),
                    this.timeGroup.addKeyframe(t, {
                        start: "".concat("0", " + 0.975"),
                        end: "".concat("0", " + 1.24"),
                        scale: [0, 1.8],
                        easeFunction: "bezier(0.01,0.72,0.45,0.94)"
                    }),
                    this.timeGroup.addKeyframe(t, {
                        start: "".concat("0", " + 1.2"),
                        end: "".concat("0", " + 1.425"),
                        y: ["20px", "50px"],
                        easeFunction: "bezier(0.7,0.02,0.8,0.99)"
                    }),
                    this.timeGroup.addKeyframe(t, {
                        start: "".concat("0", " + 1.24"),
                        end: "".concat("0", " + 1.425"),
                        scale: [1.8, .9],
                        easeFunction: "bezier(0.52,0.02,1,1)"
                    }),
                    this.timeGroup.addKeyframe(t, {
                        start: "".concat("0", " + 1.73"),
                        end: "".concat("0", " + 1.91"),
                        y: ["50px", "20px"],
                        rotation: ["2deg", "5deg"],
                        easeFunction: "bezier(0.02,0.63,0.84,0.99)"
                    }),
                    this.timeGroup.addKeyframe(t, {
                        start: "".concat("0", " + 1.95"),
                        end: "".concat("0", " + 2.33"),
                        y: ["20px", "30px"],
                        easeFunction: "bezier(-0.01,1.13,0.54,0.95)"
                    }),
                    this.timeGroup.addKeyframe(t, {
                        start: "".concat("0", " + 1.8"),
                        end: "".concat("0", " + 2.25"),
                        scale: [.9, 1],
                        easeFunction: "bezier(0.23,0.48,0.49,0.74)"
                    }),
                    this.timeGroup.addKeyframe(t, {
                        start: "".concat("0", " + 2.735"),
                        end: "".concat("0", " + 3.15"),
                        y: ["30px", "-40px"],
                        easeFunction: "bezier(0.01,0.97,1,1)"
                    }),
                    this.timeGroup.addKeyframe(t, {
                        start: "".concat("0", " + 2.7"),
                        end: "".concat("0", " + 2.738"),
                        rotation: ["5deg", "2deg"],
                        easeFunction: "linear"
                    }),
                    this.timeGroup.addKeyframe(t, {
                        start: "".concat("0", " + 3.15"),
                        end: "".concat("0", " + 3.3"),
                        y: ["-40px", "0"],
                        easeFunction: "bezier(0.57,0.01,1,1)"
                    }),
                    this.timeGroup.addKeyframe(t, {
                        start: "".concat("0", " + 2.88"),
                        end: "".concat("0", " + 3"),
                        rotation: ["2deg", "0deg"],
                        easeFunction: "bezier(0.26,0.45,1,1)"
                    }),
                    this.timeGroup.addKeyframe(t, {
                        start: "".concat("0", " + 3.225"),
                        end: "".concat("0", " + 3.3"),
                        scale: [1, .99],
                        easeFunction: "linear"
                    }),
                    this.timeGroup.addKeyframe(t, {
                        start: "".concat("0", " + 3.3"),
                        end: "".concat("0", " + 3.375"),
                        scale: [.99, 1],
                        easeFunction: "linear"
                    }),
                    this.timeGroup.addKeyframe(i, {
                        start: "0",
                        end: "0",
                        rotation: ["0deg", "-4deg"],
                        easeFunction: "linear"
                    }),
                    this.timeGroup.addKeyframe(i, {
                        start: "".concat("0", " + 1.2"),
                        end: "".concat("0", " + 3.64"),
                        cssClass: "will-change-transform",
                        toggle: !0
                    }),
                    this.timeGroup.addKeyframe(i, {
                        start: "".concat("0", " + 1.54"),
                        end: "".concat("0", " + 1.73"),
                        y: ["500px", "20px"],
                        easeFunction: "bezier(0,0.98,1,1)"
                    }),
                    this.timeGroup.addKeyframe(i, {
                        start: "".concat("0", " + 1.76"),
                        end: "".concat("0", " + 1.91"),
                        y: ["20px", "40px"],
                        easeFunction: "bezier(0,0.98,1,1)"
                    }),
                    this.timeGroup.addKeyframe(i, {
                        start: "".concat("0", " + 1.58"),
                        end: "".concat("0", " + 1.91"),
                        scale: [0, 1.1],
                        easeFunction: "bezier(0.16,0.55,0.66,0.83)"
                    }),
                    this.timeGroup.addKeyframe(i, {
                        start: "".concat("0", " + 1.91"),
                        end: "".concat("0", " + 2.18"),
                        scale: [1.1, 1],
                        easeFunction: "linear"
                    }),
                    this.timeGroup.addKeyframe(i, {
                        start: "".concat("0", " + 2.18"),
                        end: "".concat("0", " + 2.33"),
                        scale: [1, .9],
                        easeFunction: "linear"
                    }),
                    this.timeGroup.addKeyframe(i, {
                        start: "".concat("0", " + 2.33"),
                        end: "".concat("0", " + 2.44"),
                        scale: [.9, 1],
                        easeFunction: "linear"
                    }),
                    this.timeGroup.addKeyframe(i, {
                        start: "".concat("0", " + 2.7"),
                        end: "".concat("0", " + 3"),
                        y: ["40px", "-40px"],
                        easeFunction: "bezier(0.12,0.39,0.26,0.96)"
                    }),
                    this.timeGroup.addKeyframe(i, {
                        start: "".concat("0", " + 2.7"),
                        end: "".concat("0", " + 2.85"),
                        rotation: ["-4deg", "4deg"],
                        easeFunction: "bezier(0.23,0.56,1,1)"
                    }),
                    this.timeGroup.addKeyframe(i, {
                        start: "".concat("0", " + 3"),
                        end: "".concat("0", " + 3.19"),
                        y: ["-40px", "0"],
                        easeFunction: "bezier(0.47,0.02,0.32,1)"
                    }),
                    this.timeGroup.addKeyframe(i, {
                        start: "".concat("0", " + 3"),
                        end: "".concat("0", " + 3.19"),
                        rotation: ["4deg", "0deg"],
                        easeFunction: "bezier(0.13,0.42,1,1)"
                    }),
                    this.timeGroup.addKeyframe(i, {
                        start: "".concat("0", " + 3.15"),
                        end: "".concat("0", " + 3.26"),
                        scale: [1, 1.01],
                        easeFunction: "linear"
                    }),
                    this.timeGroup.addKeyframe(i, {
                        start: "".concat("0", " + 3.26"),
                        end: "".concat("0", " + 3.38"),
                        scale: [1.01, 1],
                        easeFunction: "bezier(0.18,0.89,0.34,1.45)"
                    }),
                    this.timeGroup.addKeyframe(s, {
                        start: "".concat("0", " + 2.55"),
                        end: "".concat("0", " + 2.7"),
                        y: ["500px", "20px"],
                        scale: [0, 1],
                        easeFunction: "bezier(0.16,0.51,0.63,0.99)"
                    }),
                    this.timeGroup.addKeyframe(s, {
                        start: "".concat("0", " + 2.2"),
                        end: "".concat("0", " + 3.2"),
                        cssClass: "will-change-transform",
                        toggle: !0
                    }),
                    this.timeGroup.addKeyframe(s, {
                        start: "".concat("0", " + 2.7"),
                        end: "".concat("0", " + 2.85"),
                        y: ["20px", "-25px"],
                        easeFunction: "bezier(0.16,0.44,0.6,0.89)"
                    }),
                    this.timeGroup.addKeyframe(s, {
                        start: "".concat("0", " + 2.85"),
                        end: "".concat("0", " + 3"),
                        y: ["-25px", "0"],
                        easeFunction: "bezier(0.01,0.24,1,1)"
                    }),
                    this.timeGroup.addKeyframe(r, {
                        start: "0",
                        end: "0",
                        opacity: [0, 0],
                        rotation: ["0deg", "-20deg"],
                        easeFunction: "linear"
                    }),
                    this.timeGroup.addKeyframe(r, {
                        start: "0",
                        end: "".concat("0", " + 0.5"),
                        cssClass: "will-change-opacity",
                        toggle: !0
                    }),
                    this.timeGroup.addKeyframe(r, {
                        start: "0",
                        end: "".concat("0", " + 1.6"),
                        cssClass: "will-change-transform",
                        toggle: !0
                    }),
                    this.timeGroup.addKeyframe(r, {
                        start: "".concat("0", " + 0.26"),
                        end: "".concat("0", " + 0.26"),
                        opacity: [0, 1],
                        easeFunction: "linear"
                    }),
                    this.timeGroup.addKeyframe(r, {
                        start: "".concat("0", " + 0.6"),
                        end: "".concat("0", " + 0.83"),
                        y: ["-500px", "0"],
                        easeFunction: "bezier(0.05,0.75,1,1)"
                    }),
                    this.timeGroup.addKeyframe(r, {
                        start: "".concat("0", " + 0.6"),
                        end: "".concat("0", " + 0.83"),
                        x: ["-400px", "-81px"],
                        easeFunction: "bezier(0.05,0.75,1,1)",
                        breakpointMask: "L"
                    }),
                    this.timeGroup.addKeyframe(r, {
                        start: "".concat("0", " + 0.6"),
                        end: "".concat("0", " + 0.83"),
                        x: ["-400px", "-66px"],
                        easeFunction: "bezier(0.05,0.75,1,1)",
                        breakpointMask: "M"
                    }),
                    this.timeGroup.addKeyframe(r, {
                        start: "".concat("0", " + 0.6"),
                        end: "".concat("0", " + 0.83"),
                        x: ["-400px", "-55px"],
                        easeFunction: "bezier(0.05,0.75,1,1)",
                        breakpointMask: "S"
                    }),
                    this.timeGroup.addKeyframe(r, {
                        start: "".concat("0", " + 0.68"),
                        end: "".concat("0", " + 0.83"),
                        rotation: ["-20deg", "2deg"],
                        easeFunction: "bezier(0.29,0.65,1,1)"
                    }),
                    this.timeGroup.addKeyframe(r, {
                        start: "".concat("0", " + 1.05"),
                        end: "".concat("0", " + 1.16"),
                        rotation: ["2deg", "-13deg"],
                        easeFunction: "bezier(0.25,0.6,1,1)"
                    }),
                    this.timeGroup.addKeyframe(r, {
                        start: "".concat("0", " + 1.24"),
                        end: "".concat("0", " + 1.43"),
                        rotation: ["-13deg", "0deg"],
                        easeFunction: "bezier(0.52,0.01,1,1)"
                    }),
                    this.timeGroup.addKeyframe(a, {
                        start: "0",
                        end: "0",
                        opacity: [0, 0],
                        rotation: ["0deg", "60deg"],
                        easeFunction: "linear"
                    }),
                    this.timeGroup.addKeyframe(a, {
                        start: "0",
                        end: "".concat("0", " + 0.4"),
                        cssClass: "will-change-opacity",
                        toggle: !0
                    }),
                    this.timeGroup.addKeyframe(a, {
                        start: "".concat("0", " + 0.23"),
                        end: "".concat("0", " + 1.6"),
                        cssClass: "will-change-transform",
                        toggle: !0
                    }),
                    this.timeGroup.addKeyframe(a, {
                        start: "".concat("0", " + 0.6"),
                        end: "".concat("0", " + 0.83"),
                        y: ["500px", "-1px"],
                        easeFunction: "bezier(0.05,0.75,1,1)"
                    }),
                    this.timeGroup.addKeyframe(a, {
                        start: "".concat("0", " + 0.6"),
                        end: "".concat("0", " + 0.83"),
                        x: ["350px", "-87px"],
                        easeFunction: "bezier(0.05,0.75,1,1)",
                        breakpointMask: "L"
                    }),
                    this.timeGroup.addKeyframe(a, {
                        start: "".concat("0", " + 0.6"),
                        end: "".concat("0", " + 0.83"),
                        x: ["350px", "-71px"],
                        easeFunction: "bezier(0.05,0.75,1,1)",
                        breakpointMask: "M"
                    }),
                    this.timeGroup.addKeyframe(a, {
                        start: "".concat("0", " + 0.6"),
                        end: "".concat("0", " + 0.83"),
                        x: ["350px", "-59px"],
                        easeFunction: "bezier(0.05,0.75,1,1)",
                        breakpointMask: "S"
                    }),
                    this.timeGroup.addKeyframe(a, {
                        start: "".concat("0", " + 0.26"),
                        end: "".concat("0", " + 0.26"),
                        opacity: [0, 1],
                        easeFunction: "linear"
                    }),
                    this.timeGroup.addKeyframe(a, {
                        start: "".concat("0", " + 0.68"),
                        end: "".concat("0", " + 0.83"),
                        rotation: ["60deg", "2deg"],
                        easeFunction: "bezier(0.29,0.65,1,1)"
                    }),
                    this.timeGroup.addKeyframe(a, {
                        start: "".concat("0", " + 1.05"),
                        end: "".concat("0", " + 1.16"),
                        rotation: ["2deg", "25deg"],
                        easeFunction: "bezier(0.25,0.6,1,1)"
                    }),
                    this.timeGroup.addKeyframe(a, {
                        start: "".concat("0", " + 1.24"),
                        end: "".concat("0", " + 1.425"),
                        rotation: ["25deg", "0deg"],
                        easeFunction: "bezier(0.52,0.01,1,1)"
                    }),
                    this.timeGroup.addKeyframe(n, {
                        start: "".concat("0", " + 3.2"),
                        end: "".concat("0", " + 3.75"),
                        cssClass: "will-change-opacity",
                        toggle: !0
                    }),
                    this.timeGroup.addKeyframe(n, {
                        start: "".concat("0", " + 3.2"),
                        end: "".concat("0", " + 4.2"),
                        cssClass: "will-change-scale",
                        toggle: !0
                    }),
                    this.timeGroup.addKeyframe(n, {
                        start: "".concat("0", " + 3.56"),
                        end: "".concat("0", " + 4.125"),
                        cssClass: "will-change-transform",
                        toggle: !0,
                        breakpointMask: "S"
                    }),
                    this.timeGroup.addKeyframe(n, {
                        start: "".concat("0", " + 3.56"),
                        end: "".concat("0", " + 3.6"),
                        opacity: [0, 1],
                        easeFunction: "linear"
                    }),
                    this.timeGroup.addKeyframe(n, {
                        start: "".concat("0", " + 3.56"),
                        end: "".concat("0", " + 3.825"),
                        scale: [0, 1.3],
                        easeFunction: "bezier(0.02,0.89,1,1)"
                    }),
                    this.timeGroup.addKeyframe(n, {
                        start: "".concat("0", " + 3.6"),
                        end: "".concat("0", " + 3.6"),
                        x: ["0", "-30px"],
                        easeFunction: "bezier(0.02,0.89,1,1)",
                        breakpointMask: "S"
                    }),
                    this.timeGroup.addKeyframe(n, {
                        start: "".concat("0", " + 3.9"),
                        end: "".concat("0", " + 4.05"),
                        scale: [1.3, 1],
                        easeFunction: "bezier(0.02,0.89,1,1)"
                    }),
                    this.timeGroup.addKeyframe(o, {
                        start: "0",
                        end: "0",
                        opacity: [1, 0],
                        scale: [1, 1.2],
                        easeFunction: "linear"
                    }),
                    this.timeGroup.addKeyframe(o, {
                        start: "".concat("0", " + 1.65"),
                        end: "".concat("0", " + 2.25"),
                        cssClass: "will-change-opacity",
                        toggle: !0
                    }),
                    this.timeGroup.addKeyframe(o, {
                        start: "".concat("0", " + 1.61"),
                        end: "".concat("0", " + 2.33"),
                        cssClass: "will-change-transform",
                        toggle: !0
                    }),
                    this.timeGroup.addKeyframe(o, {
                        start: "".concat("0", " + 1.99"),
                        end: "".concat("0", " + 2.18"),
                        y: ["-50px", "0"],
                        scale: [1.2, 1],
                        easeFunction: "bezier(0.2,0.69,1,1)"
                    }),
                    this.timeGroup.addKeyframe(o, {
                        start: "".concat("0", " + 2.025"),
                        end: "".concat("0", " + 2.1"),
                        opacity: [0, 1],
                        easeFunction: "linear"
                    }),
                    this.timeGroup.addKeyframe(l, {
                        start: "0",
                        end: "0",
                        opacity: [0, 0],
                        easeFunction: "linear"
                    }),
                    this.timeGroup.addKeyframe(l, {
                        start: "".concat("0", " + 3.9"),
                        end: "".concat("0", " + 4.5"),
                        cssClass: "will-change-transform",
                        toggle: !0
                    }),
                    this.timeGroup.addKeyframe(l, {
                        start: "".concat("0", " + 4.05"),
                        end: "".concat("0", " + 4.2"),
                        opacity: [0, 1],
                        scale: [0, 1.4],
                        easeFunction: "bezier(0.23,0.72,1,1)"
                    }),
                    this.timeGroup.addKeyframe(l, {
                        start: "".concat("0", " + 4.35"),
                        end: "".concat("0", " + 4.425"),
                        scale: [1.4, 1],
                        easeFunction: "linear"
                    });
                const c = document.querySelector('[data-module-template="heroes"]');
                "bts-2024" === c.querySelectorAll("[data-unit-id]")[0].getAttribute("data-unit-id") ? this.timeGroup.play() : (this.scrollGroup.addEvent(this.btsContainer, {
                    start: "a0t - 30vh",
                    anchors: [this.el],
                    onEventOnce: () => this.timeGroup.play()
                }),
                    c.addEventListener("focusin", () => {
                        this.timeGroup.play()
                    }
                    ))
            }
            _destroy() {
                this.timeGroup.remove(),
                    this.timeGroupFadeIn.remove(),
                    this.scrollGroup.remove(),
                    this._showBubbles()
            }
            _showBubbles() {
                this.bubbles.forEach(e => {
                    e.classList.add("show")
                }
                )
            }
            isSupported() {
                return this.btsContainer && document.documentElement.classList.contains("enhanced-xp") && !document.documentElement.classList.contains("text-zoom")
            }
        }
    }
        , {
        112: 112,
        42: 42
    }],
    216: [function (e, t, i) {
        "use strict";
        var s = e(36)
            , n = s(e(64))
            , r = s(e(63))
            , a = e(76);
        const o = e(42)
            , l = {
                beforeCreate() {
                    this.modalFootnoteClick = this.modalFootnoteClick.bind(this),
                        this.focusTarget = null
                },
                modalFootnoteClick(e) {
                    const t = e.currentTarget.getAttribute("href");
                    "#" != t && (this.focusTarget = document.querySelector(t),
                        this.close())
                },
                onWillOpen() {
                    this.elements.content.querySelectorAll(".footnote a").forEach(e => {
                        e.addEventListener("click", this.modalFootnoteClick)
                    }
                    )
                },
                onClose() {
                    this.elements.content.querySelectorAll(".footnote a").forEach(e => {
                        e.removeEventListener("click", this.modalFootnoteClick)
                    }
                    ),
                        requestAnimationFrame(() => this.focusTarget = null)
                }
            }
            , c = n.default.withMixins(a.Close, a.CloseButton, a.Focus, a.Keyboard, a.Open, a.ScrollPosition, l, r.default.combine([{
                mixin: a.FullBleed,
                breakpointMask: "S"
            }, {
                mixin: a.PageOverlay,
                breakpointMask: "ML"
            }]));
        t.exports = class extends o {
            constructor(e) {
                super(...arguments),
                    this.onClick = this.onClick.bind(this),
                    this.openModal = this.openModal.bind(this),
                    this.closeModal = this.closeModal.bind(this),
                    this._initialize(e)
            }
            async _initialize(e) {
                this.el = e,
                    this.modal = this.createModal(),
                    document.querySelector("[data-modal-trigger]").addEventListener("click", this.onClick)
            }
            createModal() {
                const e = this.el.getAttribute("data-modal-class") || ""
                    , t = this.el.getAttribute("data-modal-name") || ""
                    , i = this.el.getAttribute("data-modal-name-ref") || "";
                return new c(this.el, {
                    attributes: {
                        container: {
                            id: "modal-".concat(t),
                            class: "".concat(e, " modal-wide modal-curtain-blur modal-curtain-white"),
                            "data-modal-name": t
                        },
                        contentContainer: {
                            "data-analytics-activitymap-region-id": "".concat(i, " modal")
                        }
                    }
                })
            }
            onClick(e) {
                e.preventDefault(),
                    this.openModal()
            }
            openModal() {
                this.modal.open()
            }
            closeModal() {
                this.modal.close()
            }
        }
    }
        , {
        36: 36,
        42: 42,
        63: 63,
        64: 64,
        76: 76
    }],
    217: [function (e, t, i) {
        "use strict";
        const s = e(43)
            , n = e(206)
            , r = e(105).parseSearchParams
            , a = e(179)
            , o = e(194)
            , l = e(196)
            , c = e(189)
            , h = e(192)
            , d = (e(182),
                e(188))
            , u = e(191)
            , m = e(195)
            , p = new (0,
                e(34).EventEmitterMicro)
            , f = "destroyed"
            , y = e(218)
            , g = e(112);
        let v;
        try {
            v = e("@marcom/ac-analytics").observer.Gallery
        } catch (e) { }
        const _ = {
            created(e) {
                this.analytics = {
                    lastTrackedItem: null,
                    observer: null,
                    name: this.el.getAttribute("data-analytics-gallery-id") || this.el.getAttribute("id"),
                    events: {
                        UPDATE: "update",
                        UPDATE_COMPLETE: "update:complete"
                    }
                }
            },
            mounted() {
                v && (this.analytics.observer = new v(this, {
                    galleryName: this.analytics.name,
                    beforeUpdateEvent: this.analytics.events.UPDATE,
                    afterUpdateEvent: this.analytics.events.UPDATE_COMPLETE,
                    trackAutoRotate: !1
                }))
            },
            onItemChangeCompleted(e) {
                if (!e.previous || e.current === this.analytics.lastTrackedItem || e.current === e.previous && !this.analytics.lastTrackedItem)
                    return;
                if (e.gallery && e.gallery.lastInteractionEvent && e.gallery.lastInteractionEvent.event && "timeout" == e.gallery.lastInteractionEvent.event)
                    return;
                this.analytics.lastTrackedItem = e.current;
                let t = {
                    incoming: {
                        id: e.current.analyticsId
                    },
                    outgoing: {
                        id: e.previous.analyticsId
                    },
                    interactionEvent: this.lastInteractionEvent
                };
                this.trigger(this.analytics.events.UPDATE_COMPLETE, t)
            }
        }
            , E = {
                onItemChangeCompleted(e) {
                    const t = this.model.items.length;
                    let i = e.gallery.currentIndex
                        , s = i - 1
                        , n = i + 1;
                    s < 0 ? s = t + s % t : s %= t,
                        n < 0 ? n = t + n % t : n %= t;
                    const r = this.model.items[s].title
                        , a = this.model.items[n].title;
                    this.model.previousElement.setAttribute("aria-label", this.model.previousTemplate.replace("${title}", r)),
                        this.model.nextElement.setAttribute("aria-label", this.model.nextTemplate.replace("${title}", a))
                }
            }
            , b = s.prototype
            , w = {
                L: "large",
                M: "medium",
                S: "small"
            }
            , A = {
                xlarge: {
                    width: 1250,
                    height: 1250 / (1124 / 600)
                },
                large: {
                    width: 980,
                    height: 980 / (1124 / 600)
                },
                medium: {
                    width: 689,
                    height: 689 / (1124 / 600)
                },
                small: {
                    width: 274,
                    height: 495
                }
            }
            , T = {
                xlarge: "shelfImage",
                large: "shelfImage",
                medium: "shelfImage",
                small: "channelSplashTall"
            }
            , x = "singleColorContentLogo"
            , I = {
                mounted() {
                    this.autoplayAdvance = this.autoplayAdvance.bind(this),
                        this.onPlayPauseClick = this.onPlayPauseClick.bind(this),
                        this.model.playPauseElement && this.model.playPauseElement.addEventListener("click", this.onPlayPauseClick),
                        document.documentElement.classList.contains("no-reduced-motion") ? (this.autoAdvanceTimeout = setTimeout(this.autoplayAdvance, this.model.autoAdvanceDelay),
                            this.model.playPauseElement.classList.add("playing"),
                            this.model.playPauseElement.setAttribute("aria-label", this.model.pauseAria),
                            this.model.playPauseElement.setAttribute("data-analytics-title", this.model.analyticsTitlePause),
                            this.model.playPauseElement.setAttribute("data-analytics-click", this.model.analyticsClickPause)) : (this.isPaused = !0,
                                this.model.playPauseElement.classList.add("paused"),
                                this.model.playPauseElement.setAttribute("aria-label", this.model.playAria),
                                this.model.playPauseElement.setAttribute("data-analytics-title", this.model.analyticsTitlePlay),
                                this.model.playPauseElement.setAttribute("data-analytics-click", this.model.analyticsClickPlay)),
                        this.model.playPauseElement.classList.add("show")
                },
                onPlayPauseClick(e) {
                    this.isPaused && !e.forcePause ? (this.isPaused = !1,
                        this.model.playPauseElement.classList.remove("paused"),
                        this.model.playPauseElement.classList.add("playing"),
                        this.model.playPauseElement.setAttribute("aria-label", this.model.pauseAria),
                        this.autoplayAdvance(),
                        window.clearTimeout(this.autoAdvanceTimeout),
                        this.autoAdvanceTimeout = setTimeout(this.autoplayAdvance, this.model.autoAdvanceDelay),
                        setTimeout(() => {
                            this.model.playPauseElement.setAttribute("data-analytics-title", this.model.analyticsTitlePause),
                                this.model.playPauseElement.setAttribute("data-analytics-click", this.model.analyticsClickPause)
                        }
                            , 0)) : (this.isPaused || this.model.hasTvPlusPlayPause || y.handleClick(),
                                this.isPaused = !0,
                                this.model.playPauseElement.classList.remove("playing"),
                                this.model.playPauseElement.classList.add("paused"),
                                this.model.playPauseElement.setAttribute("aria-label", this.model.playAria),
                                window.clearTimeout(this.autoAdvanceTimeout),
                                setTimeout(() => {
                                    this.model.playPauseElement.setAttribute("data-analytics-title", this.model.analyticsTitlePlay),
                                        this.model.playPauseElement.setAttribute("data-analytics-click", this.model.analyticsClickPlay)
                                }
                                    , 0))
                },
                autoplayAdvance() {
                    if (this.inView) {
                        this.lastInteractionEvent = {
                            event: "timeout"
                        };
                        let e = this.model.IsRTL ? -1 : 1;
                        const t = this.currentIndex + e;
                        this.animateToItem(t)
                    }
                    this.autoAdvanceTimeout = setTimeout(this.autoplayAdvance, this.model.autoAdvanceDelay)
                },
                onItemChangeInitiated(e) {
                    void 0 !== e.gallery.lastInteractionEvent && "timeout" !== e.gallery.lastInteractionEvent.event && this.onPlayPauseClick({
                        forcePause: !0
                    })
                },
                destroy() {
                    window.clearTimeout(this.autoAdvanceTimeout)
                }
            };
        function S(e) {
            var t = document.createElement("template");
            return e = e.trim(),
                t.innerHTML = e,
                t.content.firstChild
        }
        function C(e, t, i) {
            s.apply(this, arguments),
                this.anim = g,
                g.initialize(),
                this.dotNavEl = this.collectionUnitElement.querySelector(".dotnav-items"),
                this.galleryEl = this.collectionUnitElement.querySelector(".gallery"),
                this.galleryItemsContainerEl = this.collectionUnitElement.querySelector(".gallery .item-container"),
                this.token = this.galleryEl.dataset.token,
                this.watchNowText = this.galleryEl.dataset.watchNow,
                this.previewNowText = this.galleryEl.dataset.previewNow,
                this.watchNowTemplate = this.galleryEl.dataset.watchNowAria,
                this.previewNowTemplate = this.galleryEl.dataset.previewNowAria,
                this.previousAria = this.galleryEl.dataset.previousAria || "Previous",
                this.nextAria = this.galleryEl.dataset.nextAria || "Next",
                this.playAria = this.galleryEl.dataset.playAria || "Play Apple TV plus gallery",
                this.pauseAria = this.galleryEl.dataset.pauseAria || "Pause Apple TV plus gallery",
                this.paddleNavPrevious = this.collectionUnitElement.querySelector(".paddlenav-arrow-previous"),
                this.paddleNavPreviousAriaTemplate = this.galleryEl.dataset.prevAriaTemplate,
                this.paddleNavNext = this.collectionUnitElement.querySelector(".paddlenav-arrow-next"),
                this.paddleNavNextAriaTemplate = this.galleryEl.dataset.nextAriaTemplate,
                this.dotNavItemAriaTemplate = this.galleryEl.dataset.dotnavItemAria || "Item {n}",
                this.mod419Links = this.galleryEl.dataset.mod419Links,
                this.playPause = this.collectionUnitElement.querySelector(".tv-plus-gallery-play-pause"),
                this.onResize = this.onResize.bind(this),
                this.anim.on("ON_RESIZE_DEBOUNCED", this.onResize);
            const n = document.querySelector(".tv-plus-legal");
            if (n) {
                "none" === window.getComputedStyle(n).display && (n.parentElement.style.display = "none")
            }
            this.setViewport(),
                this.getCollection(),
                this.destroyed || (this.render(),
                    this.initGallery())
        }
        const P = C.prototype = Object.create(b);
        P.getCollection = function () {
            var e, t, i, s;
            this.items = null === (e = window.tvPlusHpData) || void 0 === e || null === (t = e.data) || void 0 === t || null === (i = t.shelf) || void 0 === i ? void 0 : i.items,
                this.marcom = null === (s = window.tvPlusHpData) || void 0 === s ? void 0 : s.marcom;
            const n = r().apiFailure;
            if (!this.items || n)
                return this.destroy(),
                    void (this.destroyed = !0);
            this.mergeData()
        }
            ,
            P.destroy = function () {
                this.collectionUnitElement.style.display = "none",
                    this.playPause || (p.trigger(f),
                        p.destroy())
            }
            ,
            P.setViewport = function () {
                this.viewport = w[this.anim.model.pageMetrics.breakpoint],
                    "large" == this.viewport && window.innerWidth >= 1441 && (this.viewport = "xlarge")
            }
            ,
            P.onResize = function (e) {
                const t = this.viewport;
                this.setViewport(),
                    t != this.viewport && this.items.forEach(e => {
                        let t = e.images[T[this.viewport]]
                            , i = this.getImageUrl(t, A[this.viewport].width);
                        e.galleryLinkEl && (e.galleryLinkEl.style.backgroundImage = "url(".concat(i, ")"))
                    }
                    )
            }
            ,
            P.mergeData = function () {
                this.items.forEach(e => {
                    !function (e) {
                        var t;
                        const i = {
                            "tvs.sbd.7000": "mls_season_pass",
                            "tvs.sbd.1000230": "paramount+",
                            "tvs.sbd.4000": "apple_tv+"
                        };
                        var s;
                        e.marcom || (e.marcom = {}),
                            e.marcom.type = e.type ? e.type.toLowerCase() : "trailer",
                            ("movie" === e.marcom.type || "room" === e.marcom.type || "show" === e.marcom.type) && (null == e || null === (s = e.extendedMetadata) || void 0 === s ? void 0 : s.hasOwnProperty("comingSoon")) && (e.marcom.type = "trailer");
                        let n = e.id;
                        i.hasOwnProperty(n) && (e.marcom.channel = i[n]),
                            e.marcom.released = Date.now() > e.releaseDate,
                            e.marcom.tagline = (null == e || null === (t = e.extendedMetadata) || void 0 === t ? void 0 : t.hasOwnProperty("tagLine")) ? e.extendedMetadata.tagLine.trim() : ""
                    }(e),
                        e.extendedMetadata && Object.entries(e.extendedMetadata).forEach(([t, i]) => {
                            e.hasOwnProperty(t) ? Object.assign(e[t], i) : e[t] = i
                        }
                        )
                }
                )
            }
            ,
            P.setTheme = function (e = "Movie", t) {
                if (this.theme = "theme-light",
                    "Brand" !== e) {
                    const e = t.joeColor.match(/^b:\S+/)[0]
                        , [i, s, n] = e.match(/\d+/g).map(e => parseInt(e, 10));
                    Math.sqrt(.299 * Math.pow(i, 2) + .587 * Math.pow(s, 2) + .114 * Math.pow(n, 2)) > 234 && (this.theme = "theme-dark")
                }
            }
            ,
            P.render = function () {
                this.items.forEach((e, t) => {
                    var i;
                    const s = t + 1;
                    let n = "";
                    var r;
                    (null == e ? void 0 : e.genres) && ((null === (r = e.genres[0]) || void 0 === r ? void 0 : r.name) && (n = e.genres[0].name));
                    const a = e.longNote ? e.longNote : "";
                    let o = this.watchNowTemplate.replace("{title}", e.title)
                        , l = this.previewNowTemplate.replace("{title}", e.title)
                        , c = this.watchNowText
                        , h = this.previewNowText;
                    const d = "tv-plus-gallery-" + e.title.toLowerCase();
                    let u = l
                        , m = h;
                    "trailer" !== e.marcom.type && (u = o,
                        m = c);
                    let p, f = e.images[T[this.viewport]], y = this.getImageUrl(f, A[this.viewport].width);
                    (null === (i = e.marcom) || void 0 === i ? void 0 : i.tagline) && (m = e.marcom.tagline,
                        u = "".concat(e.marcom.tagline, ", ").concat(e.title)),
                        e.images[x] && (p = this.getImageUrl(e.images[x], 2 * A.small.width, "", null, "png"),
                            this.setTheme(e.type, e.images[x])),
                        this.mod419Links && ("en-419" !== this.marcom.locale && "es-419" !== this.marcom.locale || (e.url = function (e, t = "mx") {
                            var i = new URL(e);
                            return i.pathname.split("/")[1] === t && (i.pathname = i.pathname.split("/").slice(2).join("/"),
                                e = i),
                                e
                        }(e.url)));
                    let g = "Genre" !== e.type && "Show" !== e.type && "Movie" !== e.type || ["edt.item.66a027e5-cca3-4665-87b6-b7f9fd596adf", "edt.item.66a027e0-5a63-4cdc-b588-0215670fc3e9", "edt.item.66a027da-6335-4492-ae7e-6b3db6d9b73e", "umc.cmc.3t6dvnnr87zwd4wmvpdx5came"].includes(e.id) ? "hide" : "show";
                    const v = n ? '<span class="genre">'.concat(n, '</span> <span class="m-dot" aria-hidden="true">&#183;</span> ').concat(a) : "".concat(a)
                        , _ = '<div id="tv-plus-gallery-item-'.concat(s, '" data-analytics-gallery-item-id="Tv Plus Gallery item ').concat(s, '" data-ac-gallery-item="" class="gallery-item ').concat(this.theme, '">\n\t\t\t<a href="').concat(e.url, "?").concat(this.token, '"\n\t\t\t\tstyle="background-image: url(').concat(y, ')"\n\t\t\t\tdata-analytics-title="').concat(m.toLowerCase(), '"\n\t\t\t\tdata-rid-relay=\'{"289":"itsct"}\'\n\t\t\t\tdata-analytics-exit-link\n\t\t\t\tdata-analytics-activitymap-region-id="').concat(d, '">\n\n\t\t\t\t<div class="inner">\n\t\t\t\t\t<div class="info-top">\n\t\t\t\t\t\t<figure class="atv-plus-icon ').concat(g, '-icon"></figure>\n\t\t\t\t\t\t<figure class="logo"\n\t\t\t\t\t\t\tstyle="background-image: url(').concat(p, ')"\n\t\t\t\t\t\t></figure>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="info-bottom">\n\t\t\t\t\t\t<div class="custom-button button-primary-light" aria-label="').concat(u, '">').concat(m, '</div>\n\t\t\t\t\t\t<p class="typography-shows-genre">').concat(v, "</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</a>\n\t\t</div>")
                        , E = '<li role="presentation">\n\t\t\t<a href="#tv-plus-gallery-item-'.concat(s, '"\n\t\t\t\tid="tv-plus-gallery-item-').concat(s, '-trigger"\n\t\t\t\taria-label="').concat(this.dotNavItemAriaTemplate.replace("{n}", s).toLowerCase(), " - ").concat(e.title.toLowerCase(), '"\n\t\t\t\tdata-ac-gallery-trigger="tv-plus-gallery-item-').concat(s, '"\n\t\t\t\tclass="dotnav-item">\n\t\t\t\t\t<span class="visuallyhidden">Item ').concat(s, "</span>\n\t\t\t\t</a>\n\t\t</li>");
                    e.galleryItemEl = S(_),
                        e.dotNavItemEl = S(E),
                        e.galleryLinkEl = e.galleryItemEl.querySelector("a"),
                        this.galleryItemsContainerEl.appendChild(e.galleryItemEl),
                        this.dotNavEl.appendChild(e.dotNavItemEl)
                }
                )
            }
            ,
            P.getImageUrl = function (e, t, i = "", s = null, r = "jpg") {
                if (!e)
                    return null;
                const a = n.retina ? 2 : 1
                    , o = e.width / e.height
                    , l = Math.floor(t / o);
                let c = t
                    , h = s || l;
                return c = Math.ceil(c * a),
                    h = Math.ceil(h * a),
                    e.url.replace("{w}", c).replace("{h}", h).replace("{c}", i).replace("tc.", ".").replace("{f}", r)
            }
            ,
            P.initGallery = function () {
                const e = this.playPause
                    , t = document.querySelector(".fam-gallery-play-pause")
                    , i = e || t
                    , s = e ? this.pauseAria : "pause the gallery"
                    , n = e ? this.playAria : "play the gallery"
                    , r = e ? "pause-tv-plus-gallery" : "pause-gallery"
                    , p = e ? "prop3:pause-tv-plus-gallery" : "prop3:pause-gallery"
                    , f = e ? "play-tv-plus-gallery" : "play-gallery"
                    , y = e ? "prop3:play-tv-plus-gallery" : "prop3:play-gallery"
                    , g = this.paddleNavPrevious
                    , v = this.paddleNavNext
                    , b = this.paddleNavPreviousAriaTemplate
                    , w = this.paddleNavNextAriaTemplate
                    , A = this.items
                    , T = {
                        beforeCreate() {
                            this.model.autoAdvanceDelay = 4500,
                                this.model.playAria = n,
                                this.model.pauseAria = s,
                                this.model.analyticsTitlePause = r,
                                this.model.analyticsClickPause = p,
                                this.model.analyticsTitlePlay = f,
                                this.model.analyticsClickPlay = y,
                                this.model.hasTvPlusPlayPause = e,
                                this.model.playPauseElement = i,
                                this.model.previousElement = g,
                                this.model.nextElement = v,
                                this.model.previousTemplate = b,
                                this.model.nextTemplate = w,
                                this.model.items = A,
                                this.model.IsRTL = "rtl" === document.documentElement.getAttribute("dir"),
                                this.model.IsTouch = "ontouchstart" in document.documentElement
                        }
                    }
                    , x = a.withMixins(I, T, d, u, o, m, l, c, h, _, E)
                    , S = document.querySelector("#tv-plus-gallery");
                this.gallery = new x({
                    el: S
                });
                this.anim.createScrollGroup(this.collectionUnitElement).addEvent(this.galleryEl, {
                    start: "t - 80vh",
                    end: "b",
                    event: "gallery-visible",
                    onEnter: () => this.gallery.inView = !0,
                    onExit: () => this.gallery.inView = !1
                })
            }
            ,
            t.exports = C
    }
        , {
        105: 105,
        112: 112,
        179: 179,
        182: 182,
        188: 188,
        189: 189,
        191: 191,
        192: 192,
        194: 194,
        195: 195,
        196: 196,
        206: 206,
        218: 218,
        34: 34,
        43: 43,
        undefined: void 0
    }],
    218: [function (e, t, i) {
        "use strict";
        const s = e(34).EventEmitterMicro;
        t.exports = new class {
            constructor() {
                this.tvPlusGallery = document.querySelector('[data-module-template="tv-plus-gallery"]'),
                    this.tvPlusPlayPauseButton = document.querySelector(".tv-plus-gallery-play-pause"),
                    this.famGalleryButton = document.querySelector(".fam-gallery-play-pause"),
                    this.events = {
                        playing: "playing",
                        paused: "paused"
                    },
                    this.emitter = new s,
                    this.isTvPlusDestroyed = !1,
                    this.famGalleryButton && this.initialize()
            }
            async initialize() {
                this.famGalleryButton.addEventListener("click", this.handleClick.bind(this)),
                    this.tvPlusGallery && this.tvPlusGallery.addEventListener("destroyed", () => this.isTvPlusDestroyed = !0),
                    this.isTvPlusDestroyed && this.famGalleryButton.classList.add("playing")
            }
            handleClick() {
                this.famGalleryButton.classList.contains("playing") ? (this.emitter.trigger(this.events.paused),
                    (this.isTvPlusDestroyed || !this.tvPlusGallery || this.tvPlusPlayPauseButton) && (this.famGalleryButton.classList.add("paused"),
                        this.famGalleryButton.classList.remove("playing"),
                        this.famGalleryButton.setAttribute("aria-label", "Play FAM gallery"),
                        setTimeout(() => {
                            this.famGalleryButton.setAttribute("data-analytics-title", "play-fam-gallery"),
                                this.famGalleryButton.setAttribute("data-analytics-click", "prop3:play-fam-gallery")
                        }
                            , 0))) : this.famGalleryButton.classList.contains("paused") && (this.emitter.trigger(this.events.playing),
                                (this.isTvPlusDestroyed || !this.tvPlusGallery || this.tvPlusPlayPauseButton) && (this.famGalleryButton.classList.add("playing"),
                                    this.famGalleryButton.classList.remove("paused"),
                                    this.famGalleryButton.setAttribute("aria-label", "Pause FAM gallery"),
                                    setTimeout(() => {
                                        this.famGalleryButton.setAttribute("data-analytics-title", "pause-fam-gallery"),
                                            this.famGalleryButton.setAttribute("data-analytics-click", "prop3:pause-fam-gallery")
                                    }
                                        , 0)))
            }
        }
    }
        , {
        34: 34
    }],
    219: [function (e, t, i) {
        "use strict";
        var s = e(36)(e(112));
        function n(e, t) {
            const i = e.index * e.itemSize
                , n = "forward" === e.direction ? i + e.itemSize * t.moveSpaces : Math.max(i - e.itemSize * t.moveSpaces, 0);
            t.smoothScroll = s.default.addTween(e.scrollContainer, {
                duration: t.animationDuration,
                scrollLeft: [i, n],
                easeFunction: "cubic-bezier(0.770, 0.000, 0.170, 1.000)",
                onStart: () => {
                    e.scrollContainer.style.scrollSnapType = "none",
                        t.isAnimationScroll = !0
                }
                ,
                onComplete: () => {
                    e.scrollContainer.style.scrollSnapType = "x mandatory",
                        e.direction = "forward",
                        t.moveSpaces = 1,
                        setTimeout(() => {
                            t.isUserInteraction = !1,
                                t.isAnimationScroll = !1
                        }
                            , 100)
                }
            })
        }
        function r(e, t) {
            if (t.isPlaying)
                return t.isPlaying = !1,
                    e.scrollContainer.style.scrollSnapType = "x mandatory",
                    t.isAnimationScroll || function (e, t) {
                        var i;
                        const n = (1 - t.progressKeyframes.localT) * t.scrollAnimationDelay;
                        t.scrollAnimationDelay = n > 1 ? n : 1,
                            t.navUnitImageWrapper.length > 1 ? t.progress = t.navThumbnailProgress[e.arrayCurrentIndex].getBoundingClientRect().width : "S" === s.default.model.getBreakpoint() ? t.progress = t.progressDotv2[e.arrayCurrentIndex].getBoundingClientRect().width : t.progress = window.getComputedStyle(t.navFrontsv2[e.arrayCurrentIndex]).getPropertyValue("stroke-dashoffset");
                        void 0 !== t.progressKeyframes && null !== (null === (i = t.progressKeyframes) || void 0 === i ? void 0 : i.controller) && t.progressKeyframes.remove()
                    }(e, t),
                    void setTimeout(() => {
                        p(t)
                    }
                        , 100);
            e.direction = "forward",
                t.isPlaying = !0,
                setTimeout(() => {
                    p(t)
                }
                    , 100),
                o(e, t)
        }
        function a(e, t) {
            !function (e, t) {
                var i;
                t.scrollAnimationDelay = t.defaultScrollAnimationDelayTime,
                    t.navUnitImageWrapper.length > 1 ? t.navThumbnailProgress.forEach((e, i) => {
                        e.classList.remove("current"),
                            t.navThumbnailItems[i].classList.remove("current"),
                            t.progress = t.defaultNavThumbnailProgress,
                            setTimeout(() => {
                                e.style.width = "".concat(t.defaultNavThumbnailProgress, "px")
                            }
                                , 200)
                    }
                    ) : (t.navFrontsv2.forEach(e => {
                        e.classList.remove("current"),
                            e.style.strokeDashoffset = t.defaultNavFrontsProgress
                    }
                    ),
                        t.navItemsDotv2.forEach((e, i) => {
                            e.classList.remove("current"),
                                s.default.addTween(t.progressDotv2[i], {
                                    duration: .4,
                                    width: [t.progress, t.defaultNavDotProgress, "px"]
                                })
                        }
                        ),
                        0 !== e.directionIndex && e.wrapIndex <= 1 && t.navItemPrevious.classList.remove("disabled"),
                        t.progress = "S" === s.default.model.getBreakpoint() ? t.defaultNavDotProgress : t.defaultNavFrontsProgress);
                e.items.forEach(e => {
                    e.classList.remove("current")
                }
                ),
                    void 0 !== t.progressKeyframes && null !== (null === (i = t.progressKeyframes) || void 0 === i ? void 0 : i.controller) && t.progressKeyframes.remove()
            }(e, t),
                t.navUnitImageWrapper.length > 1 ? (t.navThumbnailProgress[t.progressIndex].classList.add("current"),
                    t.navThumbnailItems[t.progressIndex].classList.add("current")) : (t.navFrontsv2[t.progressIndex].classList.add("current"),
                        t.navItemsDotv2[t.progressIndex].classList.add("current"),
                        0 === t.progressIndex && e.index <= 1 && t.navItemPrevious.classList.add("disabled")),
                e.items[t.progressIndex].classList.add("current")
        }
        function o(e, t) {
            t.navUnitImageWrapper.length > 1 ? t.progressKeyframes = s.default.addTween(t.navThumbnailProgress[e.arrayCurrentIndex], {
                duration: t.scrollAnimationDelay,
                width: [t.progress, t.navItemSize, "px"],
                onComplete: () => {
                    c(e, t),
                        t.progress = t.defaultNavThumbnailProgress
                }
            }) : "S" === s.default.model.getBreakpoint() ? t.progressKeyframes = s.default.addTween(t.progressDotv2[e.arrayCurrentIndex], {
                duration: t.scrollAnimationDelay,
                width: [t.progress, t.navItemSize, "px"],
                onComplete: () => {
                    c(e, t),
                        t.progress = t.defaultNavDotProgress
                }
            }) : t.progressKeyframes = s.default.addTween(t.navFrontsv2[e.arrayCurrentIndex], {
                duration: t.scrollAnimationDelay,
                "stroke-dashoffset": [t.progress, 0, "px"],
                onComplete: () => {
                    c(e, t),
                        t.progress = t.defaultNavFrontsProgress
                }
            })
        }
        function l(e, t) {
            t.moveSpaces > 1 && a(e, t),
                n(e, t)
        }
        function c(e, t) {
            e.items.map(e => e.x).some(t => t > e.position) ? n(e, t) : (e.direction = "reverse",
                t.moveSpaces = e.numItems - 1,
                t.progressIndex = (e.arrayCurrentIndex - t.moveSpaces + e.numItems) % e.numItems,
                l(e, t)),
                t.scrollAnimationDelay = t.defaultScrollAnimationDelayTime
        }
        function h(e, t) {
            let i;
            return function (...s) {
                clearTimeout(i),
                    i = setTimeout(() => {
                        e(...s)
                    }
                        , t)
            }
        }
        function d(e, t) {
            let i = 0
                , s = !0
                , n = !1;
            const r = h(() => {
                t.currentIndex = e.arrayCurrentIndex,
                    e.direction = "forward",
                    n || (1 === t.moveSpaces && (t.progressIndex = e.arrayCurrentIndex,
                        a(e, t)),
                        u(e.unitWrappers[e.arrayCurrentIndex], t)),
                    t.isPlaying && o(e, t),
                    n = !1
            }
                , 200)
                , l = h(() => {
                    n = !0,
                        1 === t.moveSpaces && (t.progressIndex = e.directionIndex,
                            a(e, t))
                }
                    , 200);
            e.scrollContainer.addEventListener("scroll", () => {
                if (!t.isResizing) {
                    const n = e.scrollGroup.element.scrollLeft;
                    e.scrollGroup.updateTimeline(),
                        g(e),
                        r(),
                        n > i ? e.direction = "forward" : n < i && (e.direction = "reverse"),
                        Math.abs(e.normalizedIndex - .5) < .4 && s && (s = !1,
                            function (e) {
                                e.items.forEach(t => {
                                    "forward" === e.direction && t.x < e.position ? (t.x = e.wrapIndex * (e.itemSize * e.numItems) + t.offset,
                                        t.style.left = "".concat(t.x - t.offset, "px"),
                                        e.scrollGroup.forceUpdate()) : "reverse" === e.direction && e.index > 1 && t.x > e.position && (t.x = t.x - e.itemSize * e.numItems,
                                            t.style.left = "".concat(Math.max(parseInt(t.style.left) - e.itemSize * e.numItems, 0), "px"),
                                            e.scrollGroup.forceUpdate())
                                }
                                )
                            }(e),
                            l(),
                            u(e.unitWrappers[e.directionIndex], t)),
                        Math.abs(e.normalizedIndex - .5) > .4 && !s && (s = !0,
                            m(e, t)),
                        i = n
                }
            }
            )
        }
        function u(e, t) {
            const i = e.classList.contains("theme-dark");
            i && (t.navUnitImageWrapper.length > 1 || "S" === s.default.model.getBreakpoint()) && t.navWrapper.classList.add("theme-dark"),
                (!i || t.navUnitImageWrapper.length < 1 && "S" !== s.default.model.getBreakpoint()) && t.navWrapper.classList.remove("theme-dark")
        }
        function m(e, t) {
            const i = e.items[e.directionIndex].dataset.unitId;
            e.carouselAnalyticsData.prop62.includes(i) || (e.carouselAnalyticsData.prop62 ? e.carouselAnalyticsData.prop62 += "|".concat(i) : e.carouselAnalyticsData.prop62 = i,
                e.analyticsTracked = !1,
                e.analytics && e.analytics.passiveTracker(e.carouselAnalyticsData)),
                e.analytics && !e.analyticsTracked && e.index > 0 && (!t.isAnimationScroll || t.isUserInteraction) && (e.analyticsTracked = !0,
                    e.carouselAnalyticsData.title = e.carouselAnalyticsData.prop62,
                    e.analytics.track(e.carouselAnalyticsData))
        }
        function p(e) {
            e.playPauseButton.forEach(t => {
                const i = t.getAttribute("data-aria-play")
                    , s = t.getAttribute("data-aria-pause")
                    , n = t.getAttribute("data-analytics-title-play")
                    , r = t.getAttribute("data-analytics-click-play")
                    , a = t.getAttribute("data-analytics-title-pause")
                    , o = t.getAttribute("data-analytics-click-pause");
                t.matches(".playing, .paused") || t.classList.add("playing"),
                    e.isPlaying ? (t.classList.replace("paused", "playing"),
                        t.setAttribute("aria-label", s),
                        t.setAttribute("data-analytics-title", a),
                        t.setAttribute("data-analytics-click", o)) : (t.classList.replace("playing", "paused"),
                            t.setAttribute("aria-label", i),
                            t.setAttribute("data-analytics-title", n),
                            t.setAttribute("data-analytics-click", r))
            }
            )
        }
        function f(e) {
            const t = e.sectionContainer.querySelector(".nav-wrapper")
                , i = getComputedStyle(e.sectionContainer.querySelector(".nav-item")).getPropertyValue("--progress-width").trim()
                , n = [...t.querySelectorAll(".unit-image-wrapper")]
                , c = [...t.querySelectorAll(".progress-bar")]
                , m = [...t.querySelectorAll(".nav-item button")]
                , f = [...t.querySelectorAll(".segment.front")]
                , y = e.sectionContainer.querySelector(".nav-item-previous")
                , _ = [...t.querySelectorAll(".dot .nav-item-wrapper .nav-item")]
                , E = [...t.querySelectorAll(".progress-dot")]
                , b = [...t.querySelectorAll(".nav-item-play-pause")];
            let w = {
                navWrapper: t,
                navUnitImageWrapper: n,
                navThumbnailProgress: c,
                navThumbnailItems: m,
                navItemSize: i,
                navFrontsv2: f,
                navItemPrevious: y,
                navItemsDotv2: _,
                progressDotv2: E,
                playPauseButton: b,
                animationDuration: 1.3,
                defaultScrollAnimationDelayTime: 2.7,
                defaultNavThumbnailProgress: 0,
                defaultNavDotProgress: 8,
                defaultNavFrontsProgress: 100,
                scrollAnimationDelay: 2.7,
                isAnimationScroll: !1,
                isPlaying: !1,
                isResizing: !1,
                isUserInteraction: !1,
                wasPlaying: !1,
                currentIndex: 0,
                moveSpaces: 1,
                progressIndex: 0,
                progress: 0
            };
            !function (e, t) {
                e.isReduceMotion ? (t.isPlaying = !1,
                    p(t)) : (t.isPlaying = !0,
                        p(t)),
                    t.navUnitImageWrapper.length > 1 ? (t.progress = t.defaultNavThumbnailProgress,
                        t.navThumbnailProgress[e.arrayCurrentIndex].classList.add("current"),
                        t.navThumbnailItems[e.arrayCurrentIndex].classList.add("current")) : (t.progress = "S" === s.default.model.getBreakpoint() ? t.defaultNavDotProgress : t.defaultNavFrontsProgress,
                            t.navItemPrevious.classList.add("disabled"),
                            t.navFrontsv2[e.arrayCurrentIndex].classList.add("current"),
                            t.navItemsDotv2[e.arrayCurrentIndex].classList.add("current")),
                    u(e.unitWrappers[0], t)
            }(e, w),
                d(e, w),
                function (e, t) {
                    s.default.addEvent(e.sectionContainer, {
                        start: "a0b + 10vh",
                        anchors: [e.sectionContainer],
                        onEvent: () => {
                            t.isPlaying && (t.wasPlaying = !0,
                                r(e, t))
                        }
                        ,
                        onEventReverse: () => {
                            !t.isPlaying && t.wasPlaying && (t.wasPlaying = !1,
                                r(e, t))
                        }
                    }),
                        window.addEventListener("blur", () => {
                            t.isPlaying && (t.wasPlaying = !0,
                                r(e, t))
                        }
                        ),
                        window.addEventListener("focus", () => {
                            !t.isPlaying && t.wasPlaying && (t.wasPlaying = !1,
                                r(e, t))
                        }
                        ),
                        e.ctaLinks.forEach(i => {
                            i.addEventListener("pointerenter", () => {
                                t.isPlaying && (t.wasPlaying = !0,
                                    r(e, t))
                            }
                            ),
                                i.addEventListener("pointerleave", () => {
                                    !t.isPlaying && t.wasPlaying && (t.wasPlaying = !1,
                                        r(e, t))
                                }
                                )
                        }
                        );
                    let i = !1;
                    document.addEventListener("mousedown", () => {
                        i = !0
                    }
                    ),
                        e.sectionContainer.addEventListener("focusin", () => {
                            t.isPlaying && !i && r(e, t),
                                i = !1
                        }
                        )
                }(e, w),
                function (e, t) {
                    if (t.navUnitImageWrapper.length > 1)
                        t.navThumbnailItems.forEach((i, s) => {
                            i.addEventListener("click", () => {
                                t.isAnimationScroll || (e.direction = s > e.arrayCurrentIndex ? "forward" : "reverse",
                                    t.moveSpaces = Math.abs(e.arrayCurrentIndex - s),
                                    t.progressIndex = s,
                                    t.isUserInteraction = !0,
                                    l(e, t))
                            }
                            )
                        }
                        );
                    else {
                        e.sectionContainer.querySelector(".nav-item-next").addEventListener("click", () => {
                            t.isAnimationScroll || (e.direction = "forward",
                                t.isUserInteraction = !0,
                                l(e, t))
                        }
                        ),
                            t.navItemPrevious.addEventListener("click", () => {
                                t.isAnimationScroll || (e.direction = "reverse",
                                    t.isUserInteraction = !0,
                                    l(e, t))
                            }
                            ),
                            t.navItemsDotv2.forEach((i, s) => {
                                i.addEventListener("click", () => {
                                    t.isAnimationScroll || (e.direction = s > e.arrayCurrentIndex ? "forward" : "reverse",
                                        t.moveSpaces = Math.abs(e.arrayCurrentIndex - s),
                                        t.progressIndex = s,
                                        t.isUserInteraction = !0,
                                        l(e, t))
                                }
                                )
                            }
                            )
                    }
                    t.playPauseButton.forEach(i => {
                        i.addEventListener("click", () => {
                            r(e, t)
                        }
                        )
                    }
                    )
                }(e, w),
                function (e, t) {
                    document.addEventListener("keydown", (function (i) {
                        "ArrowRight" === i.key ? t.isAnimationScroll || (e.direction = "forward",
                            t.isUserInteraction = !0,
                            l(e, t)) : "ArrowLeft" === i.key && (t.isAnimationScroll || (e.direction = "reverse",
                                t.isUserInteraction = !0,
                                l(e, t)))
                    }
                    ))
                }(e, w),
                e.isReduceMotion || o(e, w),
                function (e, t) {
                    let i = e.itemSize
                        , s = []
                        , n = !1
                        , o = window.innerWidth;
                    const l = h(() => {
                        e.items.forEach((t, s) => {
                            t.offset = t.index * e.itemSize,
                                t.x = e.itemSize * (t.x / i),
                                e.arrayCurrentIndex !== s && (t.style.left = "".concat(parseInt(t.style.left, 10) / i * e.itemSize, "px"))
                        }
                        ),
                            g(e),
                            u(e.unitWrappers[e.arrayCurrentIndex], t),
                            e.mainMarginLeft = window.getComputedStyle(e.main).marginLeft,
                            e.sectionContainer.style.setProperty("--main-margin-left", e.mainMarginLeft),
                            e.scrollGroup.forceUpdate(),
                            e.scrollContainer.style.scrollSnapType = "x mandatory",
                            !t.isPlaying && t.wasPlaying && (t.wasPlaying = !1,
                                t.progressIndex = e.arrayCurrentIndex,
                                a(e, t),
                                r(e, t)),
                            n = !1,
                            t.isResizing = !1,
                            i = e.itemSize
                    }
                        , 200);
                    window.addEventListener("resize", () => {
                        const a = window.innerWidth;
                        var c;
                        o !== a && (void 0 !== t.smoothScroll && null !== (null === (c = t.smoothScroll) || void 0 === c ? void 0 : c.controller) && t.smoothScroll.remove(),
                            n || (s = e.items[e.arrayCurrentIndex].style.left,
                                n = !0),
                            t.isPlaying && (t.wasPlaying = !0,
                                r(e, t)),
                            e.sectionWidth = e.sectionContainer.getBoundingClientRect().width,
                            e.sectionContainer.style.setProperty("--tile-width", "".concat(e.sectionWidth, "px")),
                            t.isResizing = !0,
                            e.scrollContainer.style.scrollSnapType = "none",
                            e.itemSize = e.sectionWidth,
                            e.scrollContainer.scrollLeft = e.index * e.itemSize,
                            e.items[e.arrayCurrentIndex].style.left = "".concat(parseInt(s, 10) / i * e.itemSize, "px"),
                            o = a,
                            l(),
                            e.btsImage && v(e))
                    }
                    )
                }(e, w),
                e.btsImage && v(e)
        }
        function y(e) {
            e.keyframeArray = [],
                e.items.forEach((t, i) => {
                    t.index = i,
                        t.x = t.offsetLeft,
                        t.offset = t.offsetLeft,
                        function (e) {
                            const t = document.createElement("div");
                            t.className = "scrim",
                                e.appendChild(t)
                        }(e.unitWrappers[i]),
                        function (e, t) {
                            const i = t.querySelector(".unit-copy-wrapper")
                                , s = t.querySelector(".unit-image-wrapper")
                                , n = t.querySelector(".scrim");
                            e.scrollGroup.addKeyframe(i, {
                                start: "a0l - (var(--safe-area-inset-lt) + var(--main-margin-left)) - 20vw",
                                end: "a0l - (var(--safe-area-inset-lt) + var(--main-margin-left))",
                                opacity: [0, 1],
                                ease: .4,
                                anchors: [t],
                                disabledWhen: ["reduced-motion"]
                            }),
                                e.scrollGroup.addKeyframe(i, {
                                    start: "a0l - (var(--safe-area-inset-lt) + var(--main-margin-left))",
                                    end: "a0l - (var(--safe-area-inset-lt) + var(--main-margin-left)) + 20vw",
                                    opacity: [1, 0],
                                    ease: .4,
                                    anchors: [t],
                                    disabledWhen: ["reduced-motion"]
                                }),
                                e.scrollGroup.addKeyframe(i, {
                                    start: "a0l - (var(--safe-area-inset-lt) + var(--main-margin-left)) - 21vw",
                                    end: "a0l - (var(--safe-area-inset-lt) + var(--main-margin-left)) + 21vw",
                                    anchors: [t],
                                    cssClass: "will-change-opacity",
                                    disabledWhen: ["reduced-motion"],
                                    toggle: !0
                                }),
                                e.scrollGroup.addKeyframe(s, {
                                    start: "a0l - (var(--safe-area-inset-lt) + var(--main-margin-left)) - 150vw",
                                    end: "a0l - (var(--safe-area-inset-lt) + var(--main-margin-left))",
                                    x: ["-50vw", 0],
                                    ease: .8,
                                    anchors: [t],
                                    disabledWhen: ["reduced-motion"],
                                    breakpointMask: "ML"
                                }),
                                e.scrollGroup.addKeyframe(s, {
                                    start: "a0l - (var(--safe-area-inset-lt) + var(--main-margin-left))",
                                    end: "a0r + (var(--safe-area-inset-lt) + var(--main-margin-left)) + 50vw",
                                    x: [0, "50vw"],
                                    ease: .8,
                                    anchors: [t],
                                    disabledWhen: ["reduced-motion"],
                                    breakpointMask: "ML"
                                }),
                                e.scrollGroup.addKeyframe(s, {
                                    start: "a0l - (var(--safe-area-inset-lt) + var(--main-margin-left)) - 151vw",
                                    end: "a0r + (var(--safe-area-inset-lt) + var(--main-margin-left)) + 51vw",
                                    anchors: [t],
                                    cssClass: "will-change-transform",
                                    disabledWhen: ["reduced-motion"],
                                    toggle: !0,
                                    breakpointMask: "ML"
                                }),
                                e.scrollGroup.addKeyframe(s, {
                                    start: "a0l - (var(--safe-area-inset-lt) + var(--main-margin-left)) - 150vw",
                                    end: "a0l - (var(--safe-area-inset-lt) + var(--main-margin-left))",
                                    x: ["-34vw", 0],
                                    ease: 1,
                                    anchors: [t],
                                    disabledWhen: ["reduced-motion"],
                                    breakpointMask: "S"
                                }),
                                e.scrollGroup.addKeyframe(s, {
                                    start: "a0l - (var(--safe-area-inset-lt) + var(--main-margin-left))",
                                    end: "a0r + (var(--safe-area-inset-lt) + var(--main-margin-left)) + 40vw",
                                    x: [0, "34vw"],
                                    ease: 1,
                                    anchors: [t],
                                    disabledWhen: ["reduced-motion"],
                                    breakpointMask: "S"
                                }),
                                e.scrollGroup.addKeyframe(s, {
                                    start: "a0l - (var(--safe-area-inset-lt) + var(--main-margin-left)) - 151vw",
                                    end: "a0r + (var(--safe-area-inset-lt) + var(--main-margin-left))+ 51vw",
                                    anchors: [t],
                                    cssClass: "will-change-transform",
                                    disabledWhen: ["reduced-motion"],
                                    toggle: !0,
                                    breakpointMask: "S"
                                }),
                                e.scrollGroup.addKeyframe(n, {
                                    start: "a0l - (var(--safe-area-inset-lt) + var(--main-margin-left))",
                                    end: "a0r + (var(--safe-area-inset-lt) + var(--main-margin-left)) - 20vw",
                                    opacity: [0, 1],
                                    anchors: [t],
                                    disabledWhen: ["reduced-motion"]
                                }),
                                e.scrollGroup.addKeyframe(n, {
                                    start: " - 1vw",
                                    end: "a0r + (var(--safe-area-inset-lt) + var(--main-margin-left)) - 19vw",
                                    anchors: [t],
                                    cssClass: "will-change-opacity",
                                    disabledWhen: ["reduced-motion"],
                                    toggle: !0
                                })
                        }(e, t)
                }
                )
        }
        function g(e) {
            e.index = "forward" === e.direction ? Math.floor(Math.round(e.scrollGroup.element.scrollLeft) / e.itemSize) : Math.ceil(e.scrollGroup.element.scrollLeft / e.itemSize),
                e.normalizedIndex = e.scrollGroup.element.scrollLeft / e.itemSize % 1,
                e.arrayCurrentIndex = e.index % e.numItems,
                e.directionIndex = "forward" === e.direction ? (e.arrayCurrentIndex + 1) % e.numItems : (e.arrayCurrentIndex - 1 + e.numItems) % e.numItems,
                e.position = e.index * e.itemSize,
                e.wrapIndex = Math.ceil(e.position / (e.itemSize * e.numItems))
        }
        function v(e) {
            const t = e.btsImage.clientWidth
                , i = Math.round(t / 1.19);
            e.btsImage.style.setProperty("height", i + "px", "important")
        }
        const _ = async t => {
            await s.default.initialize();
            const i = document.documentElement.classList.contains("reduced-motion")
                , n = document.querySelector("main")
                , r = document.querySelector('[data-module-template="heroes"]')
                , a = document.querySelector(".carousel-wrapper")
                , o = r.querySelector(".unit-image-bts-2024-hero-bts-2024-carousel")
                , l = a.querySelector(".carousel-content")
                , c = [...l.querySelectorAll("[data-unit-id]")]
                , h = [...r.querySelectorAll(".unit-wrapper.carousel")]
                , d = [...l.querySelectorAll(".cta-links a")]
                , u = c.length;
            let p, v = Math.round(r.getBoundingClientRect().width), _ = window.getComputedStyle(n).marginLeft, E = v;
            try {
                p = e("@marcom/ac-analytics")
            } catch (e) { }
            r.style.setProperty("--tile-width", "".concat(v, "px")),
                r.style.setProperty("--tile-count", u),
                r.style.setProperty("--main-margin-left", _);
            const b = s.default.createScrollGroup(a, {
                getPosition: () => a.scrollLeft,
                getMaxPosition: () => a.scrollWidth
            });
            let w = {
                isReduceMotion: i,
                main: n,
                sectionContainer: r,
                scrollContainer: a,
                btsImage: o,
                itemContainer: l,
                items: c,
                unitWrappers: h,
                ctaLinks: d,
                numItems: u,
                sectionWidth: v,
                mainMarginLeft: _,
                itemSize: E,
                direction: "forward",
                scrollGroup: b,
                index: 0,
                arrayCurrentIndex: 0,
                directionIndex: 0,
                analytics: p,
                analyticsTracked: !1,
                carouselAnalyticsData: {
                    prop62: ""
                }
            };
            "v1" === t ? function (e) {
                const t = document.getElementById("thumbnail-nav").content.cloneNode(!0);
                e.appendChild(t)
            }(r) : "v2" === t && function (e, t, i) {
                const s = document.getElementById("icon-nav").content.cloneNode(!0);
                e.appendChild(s);
                const n = e.querySelector(".nav-content.dot");
                t.forEach((e, t) => {
                    const i = '<li class="nav-item-wrapper">\n\t\t\t<a id="item-'.concat(t + 1, '" class="nav-item" data-analytics-title="nav-item-').concat(t + 1, '" data-analytics-click="prop3:nav-item-').concat(t + 1, '"><span class="progress-dot"></span><span class="visuallyhidden">Item ').concat(t + 1, "</span></a>\n\t\t</li>");
                    n.insertAdjacentHTML("beforeend", i)
                }
                );
                const r = e.querySelector(".progress-wrapper")
                    , a = e.querySelector(".progress")
                    , o = parseFloat(getComputedStyle(r).getPropertyValue("width")) - parseFloat(getComputedStyle(a).getPropertyValue("stroke-width"));
                a.setAttribute("transform", "rotate(".concat(5, " 50 50)"));
                const l = (360 - 10 * i) / i;
                t.forEach((e, t) => {
                    const i = t * (l + 10) - 90
                        , s = i + l
                        , n = i * Math.PI / 180
                        , r = s * Math.PI / 180
                        , c = 50 + o * Math.cos(n)
                        , h = 50 + o * Math.sin(n)
                        , d = 50 + o * Math.cos(r)
                        , u = 50 + o * Math.sin(r)
                        , m = '<path id="segment-'.concat(t, '-behind" class="segment behind" d="M ').concat(c, ",").concat(h, " A ").concat(o, ",").concat(o, " 0 0,1 ").concat(d, ",").concat(u, '"/><path id="segment-').concat(t, '" class="segment front" d="M ').concat(c, ",").concat(h, " A ").concat(o, ",").concat(o, " 0 0,1 ").concat(d, ",").concat(u, '"/>');
                    a.insertAdjacentHTML("beforeend", m)
                }
                )
            }(r, c, u),
                history.scrollRestoration = "manual",
                window.addEventListener("popstate", () => {
                    window.scrollTo({
                        left: 0,
                        top: window.scrollY,
                        behavior: "smooth"
                    })
                }
                ),
                m(w, !1),
                g(w),
                f(w),
                y(w)
        }
            ;
        !function () {
            let e = document.body.getAttribute("data-at-ab-hpcn");
            const t = new MutationObserver((t, i) => {
                for (const s of t) {
                    const t = s.target.getAttribute(s.attributeName)
                        , n = setTimeout(() => i.disconnect(), 5e3);
                    "attributes" !== s.type || "data-at-ab-hpcn" !== s.attributeName || "v1" !== t && "v2" !== t || (e = document.body.getAttribute("data-at-ab-hpcn"),
                        _(e),
                        i.disconnect(),
                        clearTimeout(n))
                }
            }
            )
                , i = {
                    attributes: !0,
                    attributeFilter: ["data-at-ab-hpcn"],
                    subtree: !1
                };
            "v1" === e || "v2" === e ? _(e) : t.observe(document.body, i)
        }()
    }
        , {
        112: 112,
        36: 36,
        undefined: void 0
    }],
    220: [function (e, t, i) {
        "use strict";
        const s = e(206)
            , n = e(112)
            , { Media: r } = e(158)
            , a = e(221)
            , o = new Event("LOAD_TIMEOUT", {
                bubbles: !1,
                cancelable: !1
            })
            , l = new Event("LOAD_COMPLETE", {
                bubbles: !1,
                cancelable: !1
            });
        t.exports = function () {
            function e() {
                const e = document.documentElement.clientHeight;
                let t = "xlarge" === s.viewport ? "large" : s.viewport;
                return "large" === t && e > 775 && (t = "largetall"),
                    "medium" === t && e > 733 && (t = "mediumtall"),
                    t
            }
            function t(e, t, a) {
                e.forEach(async e => {
                    const c = e.querySelector("video")
                        , h = c.parentElement;
                    if (!c)
                        return;
                    a || (t = "mediumtall" === (t = "largetall" === t ? "large" : t) ? "medium" : t),
                        void 0 !== e.dataset.inlineMediaEnhancedXlarge && (t = "xlarge" === s.viewport ? "xlarge" : t),
                        function (e, t) {
                            const i = document.documentElement.classList.contains("safari")
                                , n = document.documentElement.classList.contains("touch")
                                , r = e.dataset.inlineMediaBasepath
                                , a = e.dataset.inlineMediaBasepathTouch;
                            let o = e.dataset.inlineMediaType ? e.dataset.inlineMediaType : "mp4";
                            i && "webm" === o && (o = "mov");
                            (a && n || a && "small" === t) && (o = "mp4");
                            let l = s.retina ? "".concat(t, "_2x.").concat(o) : "".concat(t, ".").concat(o);
                            document.documentElement.classList.contains("ipad") && /^large/.test(t) && (l = "largetall" == t ? "largetall.".concat(o) : "large.".concat(o));
                            a && n || a && "small" === t ? e.setAttribute("src", "".concat(a).concat(l)) : e.setAttribute("src", "".concat(r).concat(l))
                        }(c, t);
                    const d = await r.autoInitialize(e, {
                        anim: n
                    });
                    return !1 in c.dataset && c.addEventListener("canplaythrough", () => async function (e) {
                        if (e.paused)
                            try {
                                await e.play()
                            } catch (t) {
                                i(e)
                            }
                    }(c)),
                        c.addEventListener("error", () => {
                            i(c, d)
                        }
                        ),
                        d[0].on("inline-media-timeout", () => {
                            document.documentElement.classList.add("inline-media-timeout"),
                                h.dispatchEvent(o)
                        }
                        ),
                        d[0].on("MEDIA_LOAD_COMPLETE", () => {
                            h.dispatchEvent(l)
                        }
                        ),
                        d
                }
                )
            }
            function i(e, t) {
                t && t[0].destroy();
                const i = e.parentElement
                    , s = i.parentElement.parentElement
                    , n = s.parentElement.parentElement
                    , r = n.classList.contains("enhanced")
                    , a = s.querySelector(".static-frame")
                    , o = s.getAttributeNames().filter(e => e.startsWith("data-inline-media"));
                s.removeAttribute(o),
                    i.remove(),
                    a.classList.remove("static-frame"),
                    r && n.classList.remove("enhanced")
            }
            function c() {
                const e = document.querySelectorAll("[data-inline-media-enhanced], [data-inline-media-hero], [data-inline-media-promo]");
                0 !== e.length && (document.documentElement.classList.remove("enhanced-xp"),
                    document.documentElement.classList.add("no-enhanced-xp"),
                    e.forEach(e => {
                        const t = e.querySelector("video");
                        t && i(t)
                    }
                    ))
            }
            document.documentElement.classList.contains("reduced-motion") ? (document.documentElement.classList.remove("enhanced-xp"),
                document.documentElement.classList.add("no-enhanced-xp"),
                c()) : function () {
                    r.addPlugin("PlayOnce", a);
                    const i = document.querySelector('[data-module-template="heroes"]')
                        , n = document.querySelector('[data-module-template="promos"]')
                        , o = i.querySelectorAll("[data-inline-media-enhanced]")
                        , l = i.querySelectorAll("[data-inline-media-hero]")
                        , h = n.querySelectorAll("[data-inline-media-promo]");
                    if (0 === o.length && 0 === l.length && 0 === h.length)
                        return;
                    const d = e();
                    o.length > 0 && (t(o, d, !1),
                        function (e) {
                            e.forEach(e => {
                                e.parentElement.parentElement.classList.add("enhanced")
                            }
                            )
                        }(o));
                    l.length > 0 && t(l, d, !0);
                    h.length > 0 && t(h, d, !1);
                    window.addEventListener("resize", function (e) {
                        let t;
                        return function (...i) {
                            clearTimeout(t),
                                t = setTimeout(() => {
                                    e(...i)
                                }
                                    , 300)
                        }
                    }(() => function (t) {
                        const i = e();
                        t != i && c()
                    }(d))),
                        s.on("change:orientation", c)
                }()
        }
    }
        , {
        112: 112,
        158: 158,
        206: 206,
        221: 221
    }],
    221: [function (e, t, i) {
        "use strict";
        const s = e(162).default;
        t.exports = class extends s {
            constructor(e) {
                super(e),
                    this._playedOnce = !1
            }
            async play() {
                return !1 === this._playedOnce ? (this._playedOnce = !0,
                    super.play()) : null
            }
        }
    }
        , {
        162: 162
    }],
    222: [function (e, t, i) {
        "use strict";
        e(40)(),
            e(219),
            e(220)(),
            e(223)()
    }
        , {
        219: 219,
        220: 220,
        223: 223,
        40: 40
    }],
    223: [function (e, t, i) {
        "use strict";
        t.exports = function () { }
    }
        , {}],
    224: [function (e, t, i) {
        "use strict";
        t.exports = {}
    }
        , {}],
    225: [function (e, t, i) {
        "use strict";
        t.exports = {}
    }
        , {}],
    226: [function (e, t, i) {
        "use strict";
        var s = {};
        s["bts-2024"] = e(215),
            s["apple-vision-pro-enhanced"] = e(214),
            s["apple-immersive-metallica"] = e(213),
            t.exports = s
    }
        , {
        213: 213,
        214: 214,
        215: 215
    }],
    227: [function (e, t, i) {
        "use strict";
        t.exports = {}
    }
        , {}],
    228: [function (e, t, i) {
        "use strict";
        t.exports = {}
    }
        , {}],
    229: [function (e, t, i) {
        "use strict";
        t.exports = {}
    }
        , {}],
    230: [function (e, t, i) {
        "use strict";
        t.exports = {}
    }
        , {}]
}, {}, [222]);
