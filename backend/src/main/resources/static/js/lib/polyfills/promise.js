function m(n) {
    function b(a) {
        if ("object" !== typeof this || "function" !== typeof a) throw new TypeError;
        this.c = this.a = null;
        this.b = [];
        g(a, h.bind(this), d.bind(this))
    }

    function k(a) {
        var c = this;
        null === this.a ? this.b.push(a) : n(function () {
            var f = c.a ? a.d : a.e;
            if ("function" !== typeof f) (c.a ? a.resolve : a.reject)(c.c); else {
                var e;
                try {
                    e = f(c.c)
                } catch (b) {
                    a.reject(b);
                    return
                }
                a.resolve(e)
            }
        })
    }

    function h(a) {
        try {
            if (a === this) throw new TypeError;
            if (a && ("object" === typeof a || "function" === typeof a)) {
                var c = a.then;
                if ("function" === typeof c) {
                    g(c.bind(a),
                        h.bind(this), d.bind(this));
                    return
                }
            }
            this.a = !0;
            this.c = a;
            l.call(this)
        } catch (b) {
            d.call(this, b)
        }
    }

    function d(a) {
        this.a = !1;
        this.c = a;
        l.call(this)
    }

    function l() {
        for (var a = 0, c = this.b.length; a < c; a++) k.call(this, this.b[a]);
        this.b = null
    }

    function g(a, c, b) {
        var e = !1;
        try {
            a(function (a) {
                e || (e = !0, c(a))
            }, function (a) {
                e || (e = !0, b(a))
            })
        } catch (d) {
            e || (e = !0, b(d))
        }
    }

    b.prototype["catch"] = function (a) {
        return this.then(null, a)
    };
    b.prototype.then = function (a, c) {
        var f = this;
        return new b(function (b, d) {
            k.call(f, {d: a, e: c, resolve: b, reject: d})
        })
    };
    b.resolve = function (a) {
        return a && "object" === typeof a && a.constructor === b ? a : new b(function (b) {
            b(a)
        })
    };
    b.reject = function (a) {
        return new b(function (b, d) {
            d(a)
        })
    };
    return b
}

"undefined" !== typeof module && (module.f = m);