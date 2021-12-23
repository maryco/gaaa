/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src-demo/index.ts":
/*!***************************!*\
  !*** ./src-demo/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst ga_1 = __webpack_require__(/*! ../src/models/ga */ \"./src/models/ga.ts\");\r\nconst gaMonster_1 = __webpack_require__(/*! ../src/models/gaMonster */ \"./src/models/gaMonster.ts\");\r\n{\r\n    \"use strict\";\r\n    class DemoService {\r\n        constructor() { }\r\n        generateMockGa(type) {\r\n            if (type === 'pv') {\r\n                return {\r\n                    uri: 'http://dummy.example.com/?t=pageview',\r\n                    queries: [],\r\n                    hitType: ga_1.GaHitType.Pageview,\r\n                };\r\n            }\r\n            return {\r\n                uri: 'http://dummy.example.com/?t=event',\r\n                queries: [],\r\n                hitType: ga_1.GaHitType.Event,\r\n                eventDetail: {\r\n                    category: 'Category',\r\n                    action: 'Action',\r\n                    label: 'Label',\r\n                }\r\n            };\r\n        }\r\n    }\r\n    let idx = 1;\r\n    const demoService = new DemoService();\r\n    window.addEventListener('load', () => {\r\n        document.addEventListener('click', () => {\r\n            const ga = demoService.generateMockGa('ev');\r\n            const monster = gaMonster_1.GaMonsterFactory.generate(ga, idx);\r\n            if (!monster) {\r\n                return;\r\n            }\r\n            monster.build();\r\n            idx++;\r\n        });\r\n        setTimeout(() => {\r\n            const ga = demoService.generateMockGa('pv');\r\n            const monster = gaMonster_1.GaMonsterFactory.generate(ga, 0);\r\n            if (monster) {\r\n                monster.build();\r\n            }\r\n        }, 1000);\r\n    });\r\n}\r\n;\r\n\n\n//# sourceURL=webpack://gaaa/./src-demo/index.ts?");

/***/ }),

/***/ "./src/models/ga.ts":
/*!**************************!*\
  !*** ./src/models/ga.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.GaBuilder = exports.GaHitType = void 0;\r\nvar GaHitType;\r\n(function (GaHitType) {\r\n    GaHitType[\"Event\"] = \"event\";\r\n    GaHitType[\"Pageview\"] = \"pageview\";\r\n    GaHitType[\"Unknown\"] = \"unknown\";\r\n})(GaHitType = exports.GaHitType || (exports.GaHitType = {}));\r\nclass GaBuilder {\r\n    createFromUrl(url) {\r\n        let decoadedUrl = url;\r\n        try {\r\n            decoadedUrl = decodeURIComponent(url);\r\n        }\r\n        catch (e) {\r\n            console.warn(`URI decode error: ${e}`);\r\n        }\r\n        const urlParts = decoadedUrl.split('?');\r\n        if (urlParts.length !== 2) {\r\n            return {\r\n                uri: null,\r\n                queries: [],\r\n                hitType: GaHitType.Unknown,\r\n            };\r\n        }\r\n        const queries = urlParts[1].split('&');\r\n        const hitTypeParam = queries.filter((queryItem) => {\r\n            return ['t=event', 't=pageview']\r\n                .some((type) => queryItem === type);\r\n        }).shift();\r\n        const eventDetail = {};\r\n        queries.forEach((queryItem) => {\r\n            if (/^ec=/.test(queryItem)) {\r\n                eventDetail.category = queryItem.replace('ec=', '');\r\n            }\r\n            if (/^ea=/.test(queryItem)) {\r\n                eventDetail.action = queryItem.replace('ea=', '');\r\n            }\r\n            if (/^el=/.test(queryItem)) {\r\n                eventDetail.label = queryItem.replace('el=', '');\r\n            }\r\n        });\r\n        return {\r\n            uri: urlParts[0],\r\n            queries: queries,\r\n            hitType: hitTypeParam\r\n                ? hitTypeParam.replace('t=', '')\r\n                : GaHitType.Unknown,\r\n            eventDetail: eventDetail\r\n        };\r\n    }\r\n}\r\nexports.GaBuilder = GaBuilder;\r\n\n\n//# sourceURL=webpack://gaaa/./src/models/ga.ts?");

/***/ }),

/***/ "./src/models/gaMonster.ts":
/*!*********************************!*\
  !*** ./src/models/gaMonster.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.GaMonsterFactory = exports.GaPvMonster = exports.GaEventMonster = void 0;\r\nconst toastService_1 = __webpack_require__(/*! ../services/toastService */ \"./src/services/toastService.ts\");\r\nconst ga_1 = __webpack_require__(/*! ./ga */ \"./src/models/ga.ts\");\r\nclass GaMonsterHelper {\r\n    constructor() {\r\n        this.toastService = new toastService_1.ToastService();\r\n    }\r\n    idToSelector(idx) {\r\n        return `gaaa-monster-${idx}`;\r\n    }\r\n    makeBaseContainer(id) {\r\n        const container = document.createElement(\"div\");\r\n        container.id = this.idToSelector(id);\r\n        container.classList.add('gaaa-baseContainer');\r\n        return container;\r\n    }\r\n    getImaageUrl(path) {\r\n        const imgSrcUrl = chrome.runtime.getURL(path);\r\n        return `${imgSrcUrl}?${Date.now()}`;\r\n    }\r\n}\r\nclass GaEventMonster extends GaMonsterHelper {\r\n    constructor(ga, idx) {\r\n        super();\r\n        this.baseSize = { width: 300, height: 300 };\r\n        this.imagePath = '/images/content/gaaa_evMonster.svg';\r\n        this.ga = ga;\r\n        this.id = idx;\r\n    }\r\n    build() {\r\n        this.container = this.makeBaseContainer(this.id);\r\n        // Nearly 25 percent from bottom of the screen.\r\n        const posY = window.scrollY + (document.documentElement.clientHeight / 3);\r\n        this.container.style.top = `${posY}px`;\r\n        const imgNode = document.createElement(\"img\");\r\n        imgNode.src = this.getImaageUrl(this.imagePath);\r\n        this.container.appendChild(imgNode);\r\n        const toPosX = document.documentElement.clientWidth + this.baseSize.width;\r\n        this.animateMonster(toPosX);\r\n        const toast = this.toastService.build(this.id, this.ga.eventDetail, posY);\r\n        if (toast) {\r\n            document.body.insertBefore(toast, document.body.lastChild);\r\n        }\r\n        document.body.insertBefore(this.container, document.body.lastChild);\r\n    }\r\n    animateMonster(toPosX) {\r\n        if (!this.container) {\r\n            return;\r\n        }\r\n        const keyFrames = [\r\n            {\r\n                transform: 'translateX(0) scale3d(1, 1, 1)',\r\n                opacity: '1'\r\n            },\r\n            {\r\n                transform: `translateX(${toPosX}px) scale3d(5, 5, 5)`,\r\n                opacity: '0.6'\r\n            },\r\n        ];\r\n        const timingOptions = {\r\n            duration: 400,\r\n            delay: 600,\r\n            easing: \"cubic-bezier(.85,.07,.65,.66)\",\r\n        };\r\n        const anim = this.container.animate(keyFrames, timingOptions);\r\n        anim.onfinish = () => {\r\n            if (!this.container) {\r\n                return;\r\n            }\r\n            this.container.remove();\r\n            const toastId = `gaaa-toast-${this.id}`;\r\n            const toast = document.getElementById(toastId);\r\n            if (toast) {\r\n                this.toastService.animateIn(toast);\r\n            }\r\n        };\r\n    }\r\n}\r\nexports.GaEventMonster = GaEventMonster;\r\nclass GaPvMonster extends GaMonsterHelper {\r\n    constructor(ga, idx) {\r\n        super();\r\n        this.baseSize = { width: 300, height: 300 };\r\n        this.imagePath = '/images/content/gaaa_pvMonster.svg';\r\n        this.ga = ga;\r\n        this.id = idx;\r\n    }\r\n    build() {\r\n        this.container = this.makeBaseContainer(this.id);\r\n        // Nearly vertical center of the screen.\r\n        const posY = window.scrollY + (document.documentElement.clientHeight / 2);\r\n        this.container.style.top = `${posY}px`;\r\n        const imgNode = document.createElement(\"img\");\r\n        imgNode.src = this.getImaageUrl(this.imagePath);\r\n        this.container.appendChild(imgNode);\r\n        const toPosX = document.documentElement.clientWidth + this.baseSize.width;\r\n        this.buildAnimation(toPosX);\r\n        document.body.insertBefore(this.container, document.body.lastChild);\r\n    }\r\n    buildAnimation(toPosX) {\r\n        if (!this.container) {\r\n            return;\r\n        }\r\n        const keyFrames = [\r\n            {\r\n                transform: 'translateX(0) scale3d(1, 1, 1)',\r\n                opacity: '1'\r\n            },\r\n            {\r\n                transform: `translateX(${toPosX}px) scale3d(5, 5, 5)`,\r\n                opacity: '0.6'\r\n            },\r\n        ];\r\n        const timingOptions = {\r\n            duration: 800,\r\n            delay: 400,\r\n            easing: \"cubic-bezier(.85,.07,.65,.66)\",\r\n        };\r\n        const anim = this.container.animate(keyFrames, timingOptions);\r\n        anim.onfinish = () => {\r\n            if (!this.container) {\r\n                return;\r\n            }\r\n            this.container.remove();\r\n        };\r\n    }\r\n}\r\nexports.GaPvMonster = GaPvMonster;\r\nclass GaMonsterFactory {\r\n    static generate(ga, idx) {\r\n        if (ga.hitType === ga_1.GaHitType.Pageview) {\r\n            return new GaPvMonster(ga, idx);\r\n        }\r\n        if (ga.hitType === ga_1.GaHitType.Event) {\r\n            return new GaEventMonster(ga, idx);\r\n        }\r\n        return null;\r\n    }\r\n}\r\nexports.GaMonsterFactory = GaMonsterFactory;\r\n\n\n//# sourceURL=webpack://gaaa/./src/models/gaMonster.ts?");

/***/ }),

/***/ "./src/services/toastService.ts":
/*!**************************************!*\
  !*** ./src/services/toastService.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.ToastService = void 0;\r\nclass ToastService {\r\n    build(id, data, posY) {\r\n        if (!data) {\r\n            return null;\r\n        }\r\n        const container = document.createElement(\"div\");\r\n        container.id = `gaaa-toast-${id}`;\r\n        container.classList.add('gaaa-toast');\r\n        container.style.top = `${posY}px`;\r\n        const ulElm = document.createElement(\"ul\");\r\n        Object.entries(data).forEach(([key, val]) => {\r\n            const liElm = document.createElement(\"li\");\r\n            liElm.classList.add(`gaaa-toast__item--${key}`);\r\n            liElm.innerHTML = `<span>${val}</span>`;\r\n            ulElm.appendChild(liElm);\r\n        });\r\n        container.appendChild(ulElm);\r\n        return container;\r\n    }\r\n    animateIn(toastElm) {\r\n        console.log('Animate Toast!');\r\n        const items = toastElm.querySelectorAll('li');\r\n        Object.entries(items).forEach(([idx, item]) => {\r\n            item.classList.add('gaaa-toast--slideIn');\r\n            item.style.animationDelay = `${+idx * 0.2}s`;\r\n            item.onanimationend = () => {\r\n                item.style.opacity = '0.8';\r\n                if (parseInt(idx) + 1 === items.length) {\r\n                    // Dismiss toast container after last item animated\r\n                    this.animteOut(toastElm);\r\n                }\r\n            };\r\n        });\r\n    }\r\n    animteOut(toastElm) {\r\n        const keyFrames = [\r\n            {\r\n                transform: 'translateX(0)',\r\n                opacity: '0.8'\r\n            },\r\n            {\r\n                transform: 'translateX(-100vw)',\r\n                opacity: '0.6'\r\n            },\r\n            {\r\n                transform: 'translateX(-100vw)',\r\n                opacity: '0.2'\r\n            },\r\n        ];\r\n        const timingOptions = {\r\n            duration: 1800,\r\n            easing: \"ease-in\",\r\n        };\r\n        const anim = toastElm.animate(keyFrames, timingOptions);\r\n        anim.onfinish = () => {\r\n            toastElm.style.display = 'none';\r\n            toastElm.remove();\r\n        };\r\n    }\r\n}\r\nexports.ToastService = ToastService;\r\n\n\n//# sourceURL=webpack://gaaa/./src/services/toastService.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src-demo/index.ts");
/******/ 	
/******/ })()
;