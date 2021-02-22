!function (e, t) { "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.notifications = t() : e.notifications = t() }(window, (function () { return function (e) { var t = {}; function n(i) { if (t[i]) return t[i].exports; var r = t[i] = { i: i, l: !1, exports: {} }; return e[i].call(r.exports, r, r.exports, n), r.l = !0, r.exports } return n.m = e, n.c = t, n.d = function (e, t, i) { n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i }) }, n.r = function (e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, n.t = function (e, t) { if (1 & t && (e = n(e)), 8 & t) return e; if (4 & t && "object" == typeof e && e && e.__esModule) return e; var i = Object.create(null); if (n.r(i), Object.defineProperty(i, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var r in e) n.d(i, r, function (t) { return e[t] }.bind(null, r)); return i }, n.n = function (e) { var t = e && e.__esModule ? function () { return e.default } : function () { return e }; return n.d(t, "a", t), t }, n.o = function (e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, n.p = "", n(n.s = 5) }([function (e, t, n) { "use strict"; Object.defineProperty(t, "__esModule", { value: !0 }), t.APITopic = t.SERVICE_CHANNEL = t.SERVICE_IDENTITY = void 0, t.SERVICE_IDENTITY = { uuid: "notifications-service", name: "notifications-service" }, t.SERVICE_CHANNEL = "of-notifications-service-v1", function (e) { e.CREATE_NOTIFICATION = "create-notification", e.CLEAR_NOTIFICATION = "clear-notification", e.GET_APP_NOTIFICATIONS = "fetch-app-notifications", e.CLEAR_APP_NOTIFICATIONS = "clear-app-notifications", e.TOGGLE_NOTIFICATION_CENTER = "toggle-notification-center", e.ADD_EVENT_LISTENER = "add-event-listener", e.REMOVE_EVENT_LISTENER = "remove-event-listener", e.GET_PROVIDER_STATUS = "get-provider-status", e.IS_SUBSCRIBED = "is-subscribed", e.REQUEST_SUBSCRIBE = "request-subscribe" }(t.APITopic || (t.APITopic = {})) }, function (e, t, n) { "use strict"; Object.defineProperty(t, "__esModule", { value: !0 }), t.getEventRouter = t.tryServiceDispatch = t.getServicePromise = t.eventEmitter = void 0; const i = n(6), r = n(3), o = n(0), s = n(8); let c; t.eventEmitter = new i.EventEmitter; const a = new r.DeferredPromise; let u = !1; async function f() { if (window.navigator.appVersion.includes("Windows")) try { const e = await fin.System.getRvmInfo(); parseInt(e.version.split(".")[0]) >= 6 && fin.System.openUrlWithBrowser("fins://system-apps/notifications").catch(() => { }) } catch (e) { } } async function l() { var e, t; if (await a.promise, !c) { if ("undefined" == typeof fin) { const e = "fin is not defined. The openfin-notifications module is only intended for use in an OpenFin application."; return c = Promise.reject(new Error(e)), c } fin.System.getVersion().then(e => { const t = parseInt(e.split(".")[2]); t < 53 && console.warn(`API version ${t} of OpenFin version ${e} is less than 53. Please upgrade the runtime version.`) }); const { name: n, uuid: i } = null !== (t = null === (e = fin.me) || void 0 === e ? void 0 : e.identity) && void 0 !== t ? t : fin.Window.me; if (i === o.SERVICE_IDENTITY.uuid && n === o.SERVICE_IDENTITY.name) c = Promise.reject(new Error("Trying to connect to provider from provider")); else { const e = window.setTimeout(() => { console.warn("Taking a long time to connect to Notifications service. Is the Notifications service running?") }, 5e3); c = fin.InterApplicationBus.Channel.connect(o.SERVICE_CHANNEL, { wait: !0, payload: { version: "1.0.0" } }).then(t => { window.clearTimeout(e); const n = p(); return t.register("WARN", e => console.warn(e)), t.register("event", e => { n.dispatchEvent(e) }), t.setDefaultAction(() => !1), t.onDisconnection(() => { console.warn("Disconnected from Notifications service"), u = !0, c = null, f(), setTimeout(() => { console.log("Attempting to reconnect to Notifications service"), l() }, 300) }), u ? console.log("Reconnected to Notifications service") : console.log("Connected to Notifications service"), t }) } } return c } let d; function p() { return d || (d = new s.EventRouter(t.eventEmitter)), d } "undefined" != typeof fin && (f(), l(), "loading" !== document.readyState ? a.resolve() : (window.addEventListener("DOMContentLoaded", () => { a.resolve() }), document.addEventListener("DOMContentLoaded", () => { a.resolve() }))), t.getServicePromise = l, t.tryServiceDispatch = async function (e, t) { return (await l()).dispatch(e, t) }, t.getEventRouter = p }, function (e, t, n) { "use strict"; Object.defineProperty(t, "__esModule", { value: !0 }), t.ActionTrigger = void 0, function (e) { e.CONTROL = "control", e.SELECT = "select", e.CLOSE = "close", e.EXPIRE = "expire", e.PROGRAMMATIC = "programmatic" }(t.ActionTrigger || (t.ActionTrigger = {})) }, function (e, t, n) { "use strict"; function i(e) { for (var n in e) t.hasOwnProperty(n) || (t[n] = e[n]) } Object.defineProperty(t, "__esModule", { value: !0 }), i(n(7)), i(n(4)) }, function (e, t, n) { "use strict"; Object.defineProperty(t, "__esModule", { value: !0 }); t.DeferredPromise = class { constructor() { const e = new Promise((e, t) => { this._resolve = e, this._reject = t }); this._promise = e } get promise() { return this._promise } get resolve() { return this._resolve } get reject() { return this._reject } } }, function (e, t, n) { "use strict"; var i = this && this.__createBinding || (Object.create ? function (e, t, n, i) { void 0 === i && (i = n), Object.defineProperty(e, i, { enumerable: !0, get: function () { return t[n] } }) } : function (e, t, n, i) { void 0 === i && (i = n), e[i] = t[n] }), r = this && this.__setModuleDefault || (Object.create ? function (e, t) { Object.defineProperty(e, "default", { enumerable: !0, value: t }) } : function (e, t) { e.default = t }), o = this && this.__importStar || function (e) { if (e && e.__esModule) return e; var t = {}; if (null != e) for (var n in e) "default" !== n && Object.hasOwnProperty.call(e, n) && i(t, e, n); return r(t, e), t }, s = this && this.__exportStar || function (e, t) { for (var n in e) "default" === n || t.hasOwnProperty(n) || i(t, e, n) }, c = this && this.__rest || function (e, t) { var n = {}; for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.indexOf(i) < 0 && (n[i] = e[i]); if (null != e && "function" == typeof Object.getOwnPropertySymbols) { var r = 0; for (i = Object.getOwnPropertySymbols(e); r < i.length; r++)t.indexOf(i[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, i[r]) && (n[i[r]] = e[i[r]]) } return n }; Object.defineProperty(t, "__esModule", { value: !0 }), t.toggleNotificationCenter = t.clearAll = t.getAll = t.clear = t.create = t.removeEventListener = t.addEventListener = t.VERSION = t.NotificationIndicatorType = t.NotificationIndicator = t.provider = void 0; const a = n(2), u = n(1), f = n(0), l = o(n(9)); t.provider = l; const d = n(11), p = n(12); Object.defineProperty(t, "NotificationIndicator", { enumerable: !0, get: function () { return p.NotificationIndicator } }), Object.defineProperty(t, "NotificationIndicatorType", { enumerable: !0, get: function () { return p.IndicatorType } }), s(n(2), t), s(n(13), t), s(n(14), t), s(n(15), t), t.VERSION = "1.0.0"; const v = u.getEventRouter(); function y(e) { const { notification: t } = e; return Object.assign(Object.assign({}, e), { notification: Object.assign(Object.assign({}, t), { date: new Date(t.date), expires: null !== t.expires ? new Date(t.expires) : null }) }) } v.registerDeserializer("notification-created", e => y(e)), v.registerDeserializer("notification-closed", e => y(e)), v.registerDeserializer("notification-action", e => { const t = y(e), { controlSource: n, controlIndex: i } = t, r = c(t, ["controlSource", "controlIndex"]); if (e.trigger === a.ActionTrigger.CONTROL) { const t = e.notification[n][i]; return Object.assign(Object.assign({}, r), { control: t }) } return r }), t.addEventListener = function (e, t) { d.validateEnvironment(), e = d.sanitizeEventType(e), t = d.sanitizeFunction(t); const n = u.eventEmitter.listenerCount(e); u.eventEmitter.addListener(e, t), 0 === n && 1 === u.eventEmitter.listenerCount(e) && u.tryServiceDispatch(f.APITopic.ADD_EVENT_LISTENER, e) }, t.removeEventListener = function (e, t) { d.validateEnvironment(), e = d.sanitizeEventType(e), t = d.sanitizeFunction(t); const n = u.eventEmitter.listenerCount(e); u.eventEmitter.removeListener(e, t), 1 === n && 0 === u.eventEmitter.listenerCount(e) && u.tryServiceDispatch(f.APITopic.REMOVE_EVENT_LISTENER, e) }, t.create = async function (e) { if ("object" != typeof e || null === e) throw new Error("Invalid argument passed to create: argument must be an object and must not be null"); if (void 0 !== e.date && !(e.date instanceof Date)) throw new Error('Invalid argument passed to create: "date" must be a valid Date object'); if (void 0 !== e.expires && null !== e.expires && !(e.expires instanceof Date)) throw new Error('Invalid argument passed to create: "expires" must be null or a valid Date object'); const t = await u.tryServiceDispatch(f.APITopic.CREATE_NOTIFICATION, Object.assign(Object.assign({}, e), { date: e.date && e.date.valueOf(), expires: e.expires && e.expires.valueOf() })); return Object.assign(Object.assign({}, t), { date: new Date(t.date), expires: null !== t.expires ? new Date(t.expires) : null }) }, t.clear = async function (e) { return u.tryServiceDispatch(f.APITopic.CLEAR_NOTIFICATION, { id: e }) }, t.getAll = async function () { return (await u.tryServiceDispatch(f.APITopic.GET_APP_NOTIFICATIONS, void 0)).map(e => Object.assign(Object.assign({}, e), { indicator: e.indicator || null, date: new Date(e.date), expires: null !== e.expires ? new Date(e.expires) : null })) }, t.clearAll = async function () { return u.tryServiceDispatch(f.APITopic.CLEAR_APP_NOTIFICATIONS, void 0) }, t.toggleNotificationCenter = async function () { return u.tryServiceDispatch(f.APITopic.TOGGLE_NOTIFICATION_CENTER, void 0) } }, function (e, t, n) { "use strict"; var i, r = "object" == typeof Reflect ? Reflect : null, o = r && "function" == typeof r.apply ? r.apply : function (e, t, n) { return Function.prototype.apply.call(e, t, n) }; i = r && "function" == typeof r.ownKeys ? r.ownKeys : Object.getOwnPropertySymbols ? function (e) { return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e)) } : function (e) { return Object.getOwnPropertyNames(e) }; var s = Number.isNaN || function (e) { return e != e }; function c() { c.init.call(this) } e.exports = c, e.exports.once = function (e, t) { return new Promise((function (n, i) { function r() { void 0 !== o && e.removeListener("error", o), n([].slice.call(arguments)) } var o; "error" !== t && (o = function (n) { e.removeListener(t, r), i(n) }, e.once("error", o)), e.once(t, r) })) }, c.EventEmitter = c, c.prototype._events = void 0, c.prototype._eventsCount = 0, c.prototype._maxListeners = void 0; var a = 10; function u(e) { if ("function" != typeof e) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e) } function f(e) { return void 0 === e._maxListeners ? c.defaultMaxListeners : e._maxListeners } function l(e, t, n, i) { var r, o, s, c; if (u(n), void 0 === (o = e._events) ? (o = e._events = Object.create(null), e._eventsCount = 0) : (void 0 !== o.newListener && (e.emit("newListener", t, n.listener ? n.listener : n), o = e._events), s = o[t]), void 0 === s) s = o[t] = n, ++e._eventsCount; else if ("function" == typeof s ? s = o[t] = i ? [n, s] : [s, n] : i ? s.unshift(n) : s.push(n), (r = f(e)) > 0 && s.length > r && !s.warned) { s.warned = !0; var a = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit"); a.name = "MaxListenersExceededWarning", a.emitter = e, a.type = t, a.count = s.length, c = a, console && console.warn && console.warn(c) } return e } function d() { if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments) } function p(e, t, n) { var i = { fired: !1, wrapFn: void 0, target: e, type: t, listener: n }, r = d.bind(i); return r.listener = n, i.wrapFn = r, r } function v(e, t, n) { var i = e._events; if (void 0 === i) return []; var r = i[t]; return void 0 === r ? [] : "function" == typeof r ? n ? [r.listener || r] : [r] : n ? function (e) { for (var t = new Array(e.length), n = 0; n < t.length; ++n)t[n] = e[n].listener || e[n]; return t }(r) : h(r, r.length) } function y(e) { var t = this._events; if (void 0 !== t) { var n = t[e]; if ("function" == typeof n) return 1; if (void 0 !== n) return n.length } return 0 } function h(e, t) { for (var n = new Array(t), i = 0; i < t; ++i)n[i] = e[i]; return n } Object.defineProperty(c, "defaultMaxListeners", { enumerable: !0, get: function () { return a }, set: function (e) { if ("number" != typeof e || e < 0 || s(e)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + "."); a = e } }), c.init = function () { void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0 }, c.prototype.setMaxListeners = function (e) { if ("number" != typeof e || e < 0 || s(e)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + "."); return this._maxListeners = e, this }, c.prototype.getMaxListeners = function () { return f(this) }, c.prototype.emit = function (e) { for (var t = [], n = 1; n < arguments.length; n++)t.push(arguments[n]); var i = "error" === e, r = this._events; if (void 0 !== r) i = i && void 0 === r.error; else if (!i) return !1; if (i) { var s; if (t.length > 0 && (s = t[0]), s instanceof Error) throw s; var c = new Error("Unhandled error." + (s ? " (" + s.message + ")" : "")); throw c.context = s, c } var a = r[e]; if (void 0 === a) return !1; if ("function" == typeof a) o(a, this, t); else { var u = a.length, f = h(a, u); for (n = 0; n < u; ++n)o(f[n], this, t) } return !0 }, c.prototype.addListener = function (e, t) { return l(this, e, t, !1) }, c.prototype.on = c.prototype.addListener, c.prototype.prependListener = function (e, t) { return l(this, e, t, !0) }, c.prototype.once = function (e, t) { return u(t), this.on(e, p(this, e, t)), this }, c.prototype.prependOnceListener = function (e, t) { return u(t), this.prependListener(e, p(this, e, t)), this }, c.prototype.removeListener = function (e, t) { var n, i, r, o, s; if (u(t), void 0 === (i = this._events)) return this; if (void 0 === (n = i[e])) return this; if (n === t || n.listener === t) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete i[e], i.removeListener && this.emit("removeListener", e, n.listener || t)); else if ("function" != typeof n) { for (r = -1, o = n.length - 1; o >= 0; o--)if (n[o] === t || n[o].listener === t) { s = n[o].listener, r = o; break } if (r < 0) return this; 0 === r ? n.shift() : function (e, t) { for (; t + 1 < e.length; t++)e[t] = e[t + 1]; e.pop() }(n, r), 1 === n.length && (i[e] = n[0]), void 0 !== i.removeListener && this.emit("removeListener", e, s || t) } return this }, c.prototype.off = c.prototype.removeListener, c.prototype.removeAllListeners = function (e) { var t, n, i; if (void 0 === (n = this._events)) return this; if (void 0 === n.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== n[e] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete n[e]), this; if (0 === arguments.length) { var r, o = Object.keys(n); for (i = 0; i < o.length; ++i)"removeListener" !== (r = o[i]) && this.removeAllListeners(r); return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this } if ("function" == typeof (t = n[e])) this.removeListener(e, t); else if (void 0 !== t) for (i = t.length - 1; i >= 0; i--)this.removeListener(e, t[i]); return this }, c.prototype.listeners = function (e) { return v(this, e, !0) }, c.prototype.rawListeners = function (e) { return v(this, e, !1) }, c.listenerCount = function (e, t) { return "function" == typeof e.listenerCount ? e.listenerCount(t) : y.call(e, t) }, c.prototype.listenerCount = y, c.prototype.eventNames = function () { return this._eventsCount > 0 ? i(this._events) : [] } }, function (e, t, n) { "use strict"; Object.defineProperty(t, "__esModule", { value: !0 }); const i = n(4); async function r(e, t) { let n = 0; for (const i of e) await t(i, n, e), n++ } async function o(e, t) { await Promise.all(e.map(t)) } function s(e, t, n) { const r = new i.DeferredPromise, o = e.add((...e) => { t(...e) && (o.remove(), r.resolve()) }); return n && n.catch(e => { o.remove(), r.reject(e) }), c(r.promise) } function c(e) { return e.catch(() => { }), e } t.serialForEach = r, t.serialMap = async function (e, t) { const n = []; return await r(e, async (e, i, r) => { n.push(await t(e, i, r)) }), n }, t.serialFilter = async function (e, t) { const n = []; return await r(e, async (e, i, r) => { await t(e, i, r) && n.push(e) }), n }, t.parallelForEach = o, t.parallelMap = async function (e, t) { const n = []; return await o(e, async (e, i, r) => { n[i] = await t(e, i, r) }), n }, t.parallelFilter = async function (e, t) { const n = []; return await o(e, async (e, i, r) => { n[i] = await t(e, i, r) }), e.filter((e, t) => n[t]) }, t.withStrictTimeout = function (e, t, n) { const i = new Promise((t, i) => setTimeout(() => i(new Error(n)), e)); return c(Promise.race([i, t])) }, t.withTimeout = function (e, t) { const n = new Promise(t => setTimeout(() => t([!0, void 0]), e)), i = t.then(e => [!1, e]); return Promise.race([n, i]) }, t.untilTrue = function (e, t, n) { return t() ? Promise.resolve() : s(e, t, n) }, t.untilSignal = s, t.allowReject = c }, function (e, t, n) { "use strict"; var i = this && this.__rest || function (e, t) { var n = {}; for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.indexOf(i) < 0 && (n[i] = e[i]); if (null != e && "function" == typeof Object.getOwnPropertySymbols) { var r = 0; for (i = Object.getOwnPropertySymbols(e); r < i.length; r++)t.indexOf(i[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, i[r]) && (n[i[r]] = e[i[r]]) } return n }; Object.defineProperty(t, "__esModule", { value: !0 }), t.EventRouter = void 0; t.EventRouter = class { constructor(e) { this._emitterProviders = {}, this._deserializers = {}, this._defaultEmitter = e } registerEmitterProvider(e, t) { this._emitterProviders[e] = t } registerDeserializer(e, t) { this._deserializers[e] = t } dispatchEvent(e) { const { type: t, target: n } = e, r = i(e, ["type", "target"]); let o; if (!n) throw new Error("Invalid event, no target specified"); if ("default" === n) o = this._defaultEmitter; else { if (!this._emitterProviders.hasOwnProperty(n.type)) throw new Error(`Invalid target, no provider registered for '${n.type}'`); o = this._emitterProviders[n.type](n.id) } const s = Object.assign({ type: t }, r), c = this._deserializers[t]; c ? o.emit(t, c(s)) : o.emit(t, s) } } }, function (e, t, n) { "use strict"; var i = this && this.__importDefault || function (e) { return e && e.__esModule ? e : { default: e } }; Object.defineProperty(t, "__esModule", { value: !0 }), t.isConnectedToAtLeast = t.getStatus = void 0; const r = i(n(10)), o = n(3), s = n(1), c = n(0); function a() { return o.withStrictTimeout(500, s.tryServiceDispatch(c.APITopic.GET_PROVIDER_STATUS, void 0), "").catch(() => ({ connected: !1, version: null })) } t.getStatus = a, t.isConnectedToAtLeast = async function (e) { const t = await a(); if (t.connected) { const n = r.default(t.version, e); if (0 === n || 1 === n) return !0 } return !1 } }, function (e, t) { e.exports = function (e, t) { for (var n = e.split("."), i = t.split("."), r = 0; r < 3; r++) { var o = Number(n[r]), s = Number(i[r]); if (o > s) return 1; if (s > o) return -1; if (!isNaN(o) && isNaN(s)) return 1; if (isNaN(o) && !isNaN(s)) return -1 } return 0 } }, function (e, t, n) { "use strict"; function i(e, t) { let n; try { n = JSON.stringify(e) } catch (e) { n = t } return n } Object.defineProperty(t, "__esModule", { value: !0 }), t.safeStringify = t.validateEnvironment = t.sanitizeEventType = t.sanitizeFunction = void 0, t.sanitizeFunction = function (e) { if ("function" != typeof e) throw new Error(`Invalid argument passed: ${i(e, "The provided value")} is not a valid function`); return e }, t.sanitizeEventType = function (e) { if ("notification-action" === e || "notification-created" === e || "notification-closed" === e) return e; throw new Error(`Invalid argument passed: ${i(e, "The provided event type")} is not a valid Notifications event type`) }, t.validateEnvironment = function () { if ("undefined" == typeof fin) throw new Error("fin is not defined. The openfin-fdc3 module is only intended for use in an OpenFin application.") }, t.safeStringify = i }, function (e, t, n) { "use strict"; Object.defineProperty(t, "__esModule", { value: !0 }), t.IndicatorType = void 0, function (e) { e.FAILURE = "failure", e.WARNING = "warning", e.SUCCESS = "success" }(t.IndicatorType || (t.IndicatorType = {})) }, function (e, t, n) { "use strict"; Object.defineProperty(t, "__esModule", { value: !0 }) }, function (e, t, n) { "use strict"; Object.defineProperty(t, "__esModule", { value: !0 }) }, function (e, t, n) { "use strict"; Object.defineProperty(t, "__esModule", { value: !0 }), t.requestSubscribe = t.isSubscribed = void 0; const i = n(1), r = n(0); t.isSubscribed = async function (e) { return i.tryServiceDispatch(r.APITopic.IS_SUBSCRIBED, e).catch(t => { if ("No action registered" === (null == t ? void 0 : t.message)) throw new Error(`Cannot query subscription to ${e || "feed"}. Current provider version does not support this API.`); throw t }) }, t.requestSubscribe = async function (e) { return i.tryServiceDispatch(r.APITopic.REQUEST_SUBSCRIBE, e).catch(t => { if ("No action registered" === (null == t ? void 0 : t.message)) throw new Error(`Cannot request subscription to ${e || "feed"}. Current provider version does not support this API.`); throw t }) } }]) }));
//# sourceMappingURL=openfin-notifications.js.map