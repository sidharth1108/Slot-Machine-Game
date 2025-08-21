"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __export = (target, all3) => {
    for (var name in all3)
      __defProp(target, name, { get: all3[name], enumerable: true });
  };

  // node_modules/axios/lib/helpers/bind.js
  function bind(fn, thisArg) {
    return /* @__PURE__ */ __name(function wrap() {
      return fn.apply(thisArg, arguments);
    }, "wrap");
  }
  __name(bind, "bind");

  // node_modules/axios/lib/utils.js
  var { toString } = Object.prototype;
  var { getPrototypeOf } = Object;
  var kindOf = /* @__PURE__ */ ((cache) => (thing) => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  })(/* @__PURE__ */ Object.create(null));
  var kindOfTest = /* @__PURE__ */ __name((type) => {
    type = type.toLowerCase();
    return (thing) => kindOf(thing) === type;
  }, "kindOfTest");
  var typeOfTest = /* @__PURE__ */ __name((type) => (thing) => typeof thing === type, "typeOfTest");
  var { isArray } = Array;
  var isUndefined = typeOfTest("undefined");
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
  }
  __name(isBuffer, "isBuffer");
  var isArrayBuffer = kindOfTest("ArrayBuffer");
  function isArrayBufferView(val) {
    let result;
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && isArrayBuffer(val.buffer);
    }
    return result;
  }
  __name(isArrayBufferView, "isArrayBufferView");
  var isString = typeOfTest("string");
  var isFunction = typeOfTest("function");
  var isNumber = typeOfTest("number");
  var isObject = /* @__PURE__ */ __name((thing) => thing !== null && typeof thing === "object", "isObject");
  var isBoolean = /* @__PURE__ */ __name((thing) => thing === true || thing === false, "isBoolean");
  var isPlainObject = /* @__PURE__ */ __name((val) => {
    if (kindOf(val) !== "object") {
      return false;
    }
    const prototype3 = getPrototypeOf(val);
    return (prototype3 === null || prototype3 === Object.prototype || Object.getPrototypeOf(prototype3) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
  }, "isPlainObject");
  var isDate = kindOfTest("Date");
  var isFile = kindOfTest("File");
  var isBlob = kindOfTest("Blob");
  var isFileList = kindOfTest("FileList");
  var isStream = /* @__PURE__ */ __name((val) => isObject(val) && isFunction(val.pipe), "isStream");
  var isFormData = /* @__PURE__ */ __name((thing) => {
    let kind;
    return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
    kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
  }, "isFormData");
  var isURLSearchParams = kindOfTest("URLSearchParams");
  var [isReadableStream, isRequest, isResponse, isHeaders] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest);
  var trim = /* @__PURE__ */ __name((str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""), "trim");
  function forEach(obj, fn, { allOwnKeys = false } = {}) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    let i;
    let l;
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isArray(obj)) {
      for (i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
      const len = keys.length;
      let key;
      for (i = 0; i < len; i++) {
        key = keys[i];
        fn.call(null, obj[key], key, obj);
      }
    }
  }
  __name(forEach, "forEach");
  function findKey(obj, key) {
    key = key.toLowerCase();
    const keys = Object.keys(obj);
    let i = keys.length;
    let _key;
    while (i-- > 0) {
      _key = keys[i];
      if (key === _key.toLowerCase()) {
        return _key;
      }
    }
    return null;
  }
  __name(findKey, "findKey");
  var _global = (() => {
    if (typeof globalThis !== "undefined") return globalThis;
    return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
  })();
  var isContextDefined = /* @__PURE__ */ __name((context) => !isUndefined(context) && context !== _global, "isContextDefined");
  function merge() {
    const { caseless } = isContextDefined(this) && this || {};
    const result = {};
    const assignValue = /* @__PURE__ */ __name((val, key) => {
      const targetKey = caseless && findKey(result, key) || key;
      if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
        result[targetKey] = merge(result[targetKey], val);
      } else if (isPlainObject(val)) {
        result[targetKey] = merge({}, val);
      } else if (isArray(val)) {
        result[targetKey] = val.slice();
      } else {
        result[targetKey] = val;
      }
    }, "assignValue");
    for (let i = 0, l = arguments.length; i < l; i++) {
      arguments[i] && forEach(arguments[i], assignValue);
    }
    return result;
  }
  __name(merge, "merge");
  var extend = /* @__PURE__ */ __name((a, b, thisArg, { allOwnKeys } = {}) => {
    forEach(b, (val, key) => {
      if (thisArg && isFunction(val)) {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    }, { allOwnKeys });
    return a;
  }, "extend");
  var stripBOM = /* @__PURE__ */ __name((content) => {
    if (content.charCodeAt(0) === 65279) {
      content = content.slice(1);
    }
    return content;
  }, "stripBOM");
  var inherits = /* @__PURE__ */ __name((constructor, superConstructor, props, descriptors2) => {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
    constructor.prototype.constructor = constructor;
    Object.defineProperty(constructor, "super", {
      value: superConstructor.prototype
    });
    props && Object.assign(constructor.prototype, props);
  }, "inherits");
  var toFlatObject = /* @__PURE__ */ __name((sourceObj, destObj, filter2, propFilter) => {
    let props;
    let i;
    let prop;
    const merged = {};
    destObj = destObj || {};
    if (sourceObj == null) return destObj;
    do {
      props = Object.getOwnPropertyNames(sourceObj);
      i = props.length;
      while (i-- > 0) {
        prop = props[i];
        if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
          destObj[prop] = sourceObj[prop];
          merged[prop] = true;
        }
      }
      sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
    } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
    return destObj;
  }, "toFlatObject");
  var endsWith = /* @__PURE__ */ __name((str, searchString, position) => {
    str = String(str);
    if (position === void 0 || position > str.length) {
      position = str.length;
    }
    position -= searchString.length;
    const lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  }, "endsWith");
  var toArray = /* @__PURE__ */ __name((thing) => {
    if (!thing) return null;
    if (isArray(thing)) return thing;
    let i = thing.length;
    if (!isNumber(i)) return null;
    const arr = new Array(i);
    while (i-- > 0) {
      arr[i] = thing[i];
    }
    return arr;
  }, "toArray");
  var isTypedArray = /* @__PURE__ */ ((TypedArray) => {
    return (thing) => {
      return TypedArray && thing instanceof TypedArray;
    };
  })(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
  var forEachEntry = /* @__PURE__ */ __name((obj, fn) => {
    const generator = obj && obj[Symbol.iterator];
    const iterator = generator.call(obj);
    let result;
    while ((result = iterator.next()) && !result.done) {
      const pair = result.value;
      fn.call(obj, pair[0], pair[1]);
    }
  }, "forEachEntry");
  var matchAll = /* @__PURE__ */ __name((regExp, str) => {
    let matches;
    const arr = [];
    while ((matches = regExp.exec(str)) !== null) {
      arr.push(matches);
    }
    return arr;
  }, "matchAll");
  var isHTMLForm = kindOfTest("HTMLFormElement");
  var toCamelCase = /* @__PURE__ */ __name((str) => {
    return str.toLowerCase().replace(
      /[-_\s]([a-z\d])(\w*)/g,
      /* @__PURE__ */ __name(function replacer(m, p1, p2) {
        return p1.toUpperCase() + p2;
      }, "replacer")
    );
  }, "toCamelCase");
  var hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
  var isRegExp = kindOfTest("RegExp");
  var reduceDescriptors = /* @__PURE__ */ __name((obj, reducer) => {
    const descriptors2 = Object.getOwnPropertyDescriptors(obj);
    const reducedDescriptors = {};
    forEach(descriptors2, (descriptor, name) => {
      let ret;
      if ((ret = reducer(descriptor, name, obj)) !== false) {
        reducedDescriptors[name] = ret || descriptor;
      }
    });
    Object.defineProperties(obj, reducedDescriptors);
  }, "reduceDescriptors");
  var freezeMethods = /* @__PURE__ */ __name((obj) => {
    reduceDescriptors(obj, (descriptor, name) => {
      if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
        return false;
      }
      const value = obj[name];
      if (!isFunction(value)) return;
      descriptor.enumerable = false;
      if ("writable" in descriptor) {
        descriptor.writable = false;
        return;
      }
      if (!descriptor.set) {
        descriptor.set = () => {
          throw Error("Can not rewrite read-only method '" + name + "'");
        };
      }
    });
  }, "freezeMethods");
  var toObjectSet = /* @__PURE__ */ __name((arrayOrString, delimiter) => {
    const obj = {};
    const define = /* @__PURE__ */ __name((arr) => {
      arr.forEach((value) => {
        obj[value] = true;
      });
    }, "define");
    isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
    return obj;
  }, "toObjectSet");
  var noop = /* @__PURE__ */ __name(() => {
  }, "noop");
  var toFiniteNumber = /* @__PURE__ */ __name((value, defaultValue) => {
    return value != null && Number.isFinite(value = +value) ? value : defaultValue;
  }, "toFiniteNumber");
  var ALPHA = "abcdefghijklmnopqrstuvwxyz";
  var DIGIT = "0123456789";
  var ALPHABET = {
    DIGIT,
    ALPHA,
    ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
  };
  var generateString = /* @__PURE__ */ __name((size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
    let str = "";
    const { length } = alphabet;
    while (size--) {
      str += alphabet[Math.random() * length | 0];
    }
    return str;
  }, "generateString");
  function isSpecCompliantForm(thing) {
    return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
  }
  __name(isSpecCompliantForm, "isSpecCompliantForm");
  var toJSONObject = /* @__PURE__ */ __name((obj) => {
    const stack = new Array(10);
    const visit = /* @__PURE__ */ __name((source, i) => {
      if (isObject(source)) {
        if (stack.indexOf(source) >= 0) {
          return;
        }
        if (!("toJSON" in source)) {
          stack[i] = source;
          const target = isArray(source) ? [] : {};
          forEach(source, (value, key) => {
            const reducedValue = visit(value, i + 1);
            !isUndefined(reducedValue) && (target[key] = reducedValue);
          });
          stack[i] = void 0;
          return target;
        }
      }
      return source;
    }, "visit");
    return visit(obj, 0);
  }, "toJSONObject");
  var isAsyncFn = kindOfTest("AsyncFunction");
  var isThenable = /* @__PURE__ */ __name((thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch), "isThenable");
  var utils_default = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isBoolean,
    isObject,
    isPlainObject,
    isReadableStream,
    isRequest,
    isResponse,
    isHeaders,
    isUndefined,
    isDate,
    isFile,
    isBlob,
    isRegExp,
    isFunction,
    isStream,
    isURLSearchParams,
    isTypedArray,
    isFileList,
    forEach,
    merge,
    extend,
    trim,
    stripBOM,
    inherits,
    toFlatObject,
    kindOf,
    kindOfTest,
    endsWith,
    toArray,
    forEachEntry,
    matchAll,
    isHTMLForm,
    hasOwnProperty,
    hasOwnProp: hasOwnProperty,
    // an alias to avoid ESLint no-prototype-builtins detection
    reduceDescriptors,
    freezeMethods,
    toObjectSet,
    toCamelCase,
    noop,
    toFiniteNumber,
    findKey,
    global: _global,
    isContextDefined,
    ALPHABET,
    generateString,
    isSpecCompliantForm,
    toJSONObject,
    isAsyncFn,
    isThenable
  };

  // node_modules/axios/lib/core/AxiosError.js
  function AxiosError(message, code, config, request, response) {
    Error.call(this);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }
    this.message = message;
    this.name = "AxiosError";
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    response && (this.response = response);
  }
  __name(AxiosError, "AxiosError");
  utils_default.inherits(AxiosError, Error, {
    toJSON: /* @__PURE__ */ __name(function toJSON() {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: utils_default.toJSONObject(this.config),
        code: this.code,
        status: this.response && this.response.status ? this.response.status : null
      };
    }, "toJSON")
  });
  var prototype = AxiosError.prototype;
  var descriptors = {};
  [
    "ERR_BAD_OPTION_VALUE",
    "ERR_BAD_OPTION",
    "ECONNABORTED",
    "ETIMEDOUT",
    "ERR_NETWORK",
    "ERR_FR_TOO_MANY_REDIRECTS",
    "ERR_DEPRECATED",
    "ERR_BAD_RESPONSE",
    "ERR_BAD_REQUEST",
    "ERR_CANCELED",
    "ERR_NOT_SUPPORT",
    "ERR_INVALID_URL"
    // eslint-disable-next-line func-names
  ].forEach((code) => {
    descriptors[code] = { value: code };
  });
  Object.defineProperties(AxiosError, descriptors);
  Object.defineProperty(prototype, "isAxiosError", { value: true });
  AxiosError.from = (error, code, config, request, response, customProps) => {
    const axiosError = Object.create(prototype);
    utils_default.toFlatObject(error, axiosError, /* @__PURE__ */ __name(function filter2(obj) {
      return obj !== Error.prototype;
    }, "filter"), (prop) => {
      return prop !== "isAxiosError";
    });
    AxiosError.call(axiosError, error.message, code, config, request, response);
    axiosError.cause = error;
    axiosError.name = error.name;
    customProps && Object.assign(axiosError, customProps);
    return axiosError;
  };
  var AxiosError_default = AxiosError;

  // node_modules/axios/lib/helpers/null.js
  var null_default = null;

  // node_modules/axios/lib/helpers/toFormData.js
  function isVisitable(thing) {
    return utils_default.isPlainObject(thing) || utils_default.isArray(thing);
  }
  __name(isVisitable, "isVisitable");
  function removeBrackets(key) {
    return utils_default.endsWith(key, "[]") ? key.slice(0, -2) : key;
  }
  __name(removeBrackets, "removeBrackets");
  function renderKey(path, key, dots) {
    if (!path) return key;
    return path.concat(key).map(/* @__PURE__ */ __name(function each(token, i) {
      token = removeBrackets(token);
      return !dots && i ? "[" + token + "]" : token;
    }, "each")).join(dots ? "." : "");
  }
  __name(renderKey, "renderKey");
  function isFlatArray(arr) {
    return utils_default.isArray(arr) && !arr.some(isVisitable);
  }
  __name(isFlatArray, "isFlatArray");
  var predicates = utils_default.toFlatObject(utils_default, {}, null, /* @__PURE__ */ __name(function filter(prop) {
    return /^is[A-Z]/.test(prop);
  }, "filter"));
  function toFormData(obj, formData, options) {
    if (!utils_default.isObject(obj)) {
      throw new TypeError("target must be an object");
    }
    formData = formData || new (null_default || FormData)();
    options = utils_default.toFlatObject(options, {
      metaTokens: true,
      dots: false,
      indexes: false
    }, false, /* @__PURE__ */ __name(function defined(option, source) {
      return !utils_default.isUndefined(source[option]);
    }, "defined"));
    const metaTokens = options.metaTokens;
    const visitor = options.visitor || defaultVisitor;
    const dots = options.dots;
    const indexes = options.indexes;
    const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
    const useBlob = _Blob && utils_default.isSpecCompliantForm(formData);
    if (!utils_default.isFunction(visitor)) {
      throw new TypeError("visitor must be a function");
    }
    function convertValue(value) {
      if (value === null) return "";
      if (utils_default.isDate(value)) {
        return value.toISOString();
      }
      if (!useBlob && utils_default.isBlob(value)) {
        throw new AxiosError_default("Blob is not supported. Use a Buffer instead.");
      }
      if (utils_default.isArrayBuffer(value) || utils_default.isTypedArray(value)) {
        return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
      }
      return value;
    }
    __name(convertValue, "convertValue");
    function defaultVisitor(value, key, path) {
      let arr = value;
      if (value && !path && typeof value === "object") {
        if (utils_default.endsWith(key, "{}")) {
          key = metaTokens ? key : key.slice(0, -2);
          value = JSON.stringify(value);
        } else if (utils_default.isArray(value) && isFlatArray(value) || (utils_default.isFileList(value) || utils_default.endsWith(key, "[]")) && (arr = utils_default.toArray(value))) {
          key = removeBrackets(key);
          arr.forEach(/* @__PURE__ */ __name(function each(el, index) {
            !(utils_default.isUndefined(el) || el === null) && formData.append(
              // eslint-disable-next-line no-nested-ternary
              indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
              convertValue(el)
            );
          }, "each"));
          return false;
        }
      }
      if (isVisitable(value)) {
        return true;
      }
      formData.append(renderKey(path, key, dots), convertValue(value));
      return false;
    }
    __name(defaultVisitor, "defaultVisitor");
    const stack = [];
    const exposedHelpers = Object.assign(predicates, {
      defaultVisitor,
      convertValue,
      isVisitable
    });
    function build(value, path) {
      if (utils_default.isUndefined(value)) return;
      if (stack.indexOf(value) !== -1) {
        throw Error("Circular reference detected in " + path.join("."));
      }
      stack.push(value);
      utils_default.forEach(value, /* @__PURE__ */ __name(function each(el, key) {
        const result = !(utils_default.isUndefined(el) || el === null) && visitor.call(
          formData,
          el,
          utils_default.isString(key) ? key.trim() : key,
          path,
          exposedHelpers
        );
        if (result === true) {
          build(el, path ? path.concat(key) : [key]);
        }
      }, "each"));
      stack.pop();
    }
    __name(build, "build");
    if (!utils_default.isObject(obj)) {
      throw new TypeError("data must be an object");
    }
    build(obj);
    return formData;
  }
  __name(toFormData, "toFormData");
  var toFormData_default = toFormData;

  // node_modules/axios/lib/helpers/AxiosURLSearchParams.js
  function encode(str) {
    const charMap = {
      "!": "%21",
      "'": "%27",
      "(": "%28",
      ")": "%29",
      "~": "%7E",
      "%20": "+",
      "%00": "\0"
    };
    return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, /* @__PURE__ */ __name(function replacer(match) {
      return charMap[match];
    }, "replacer"));
  }
  __name(encode, "encode");
  function AxiosURLSearchParams(params, options) {
    this._pairs = [];
    params && toFormData_default(params, this, options);
  }
  __name(AxiosURLSearchParams, "AxiosURLSearchParams");
  var prototype2 = AxiosURLSearchParams.prototype;
  prototype2.append = /* @__PURE__ */ __name(function append(name, value) {
    this._pairs.push([name, value]);
  }, "append");
  prototype2.toString = /* @__PURE__ */ __name(function toString2(encoder) {
    const _encode = encoder ? function(value) {
      return encoder.call(this, value, encode);
    } : encode;
    return this._pairs.map(/* @__PURE__ */ __name(function each(pair) {
      return _encode(pair[0]) + "=" + _encode(pair[1]);
    }, "each"), "").join("&");
  }, "toString");
  var AxiosURLSearchParams_default = AxiosURLSearchParams;

  // node_modules/axios/lib/helpers/buildURL.js
  function encode2(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }
  __name(encode2, "encode");
  function buildURL(url, params, options) {
    if (!params) {
      return url;
    }
    const _encode = options && options.encode || encode2;
    const serializeFn = options && options.serialize;
    let serializedParams;
    if (serializeFn) {
      serializedParams = serializeFn(params, options);
    } else {
      serializedParams = utils_default.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams_default(params, options).toString(_encode);
    }
    if (serializedParams) {
      const hashmarkIndex = url.indexOf("#");
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url;
  }
  __name(buildURL, "buildURL");

  // node_modules/axios/lib/core/InterceptorManager.js
  var InterceptorManager = class {
    static {
      __name(this, "InterceptorManager");
    }
    constructor() {
      this.handlers = [];
    }
    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     *
     * @return {Number} An ID used to remove interceptor later
     */
    use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    }
    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     *
     * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
     */
    eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    }
    /**
     * Clear all interceptors from the stack
     *
     * @returns {void}
     */
    clear() {
      if (this.handlers) {
        this.handlers = [];
      }
    }
    /**
     * Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     *
     * @param {Function} fn The function to call for each interceptor
     *
     * @returns {void}
     */
    forEach(fn) {
      utils_default.forEach(this.handlers, /* @__PURE__ */ __name(function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      }, "forEachHandler"));
    }
  };
  var InterceptorManager_default = InterceptorManager;

  // node_modules/axios/lib/defaults/transitional.js
  var transitional_default = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  };

  // node_modules/axios/lib/platform/browser/classes/URLSearchParams.js
  var URLSearchParams_default = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams_default;

  // node_modules/axios/lib/platform/browser/classes/FormData.js
  var FormData_default = typeof FormData !== "undefined" ? FormData : null;

  // node_modules/axios/lib/platform/browser/classes/Blob.js
  var Blob_default = typeof Blob !== "undefined" ? Blob : null;

  // node_modules/axios/lib/platform/browser/index.js
  var browser_default = {
    isBrowser: true,
    classes: {
      URLSearchParams: URLSearchParams_default,
      FormData: FormData_default,
      Blob: Blob_default
    },
    protocols: ["http", "https", "file", "blob", "url", "data"]
  };

  // node_modules/axios/lib/platform/common/utils.js
  var utils_exports = {};
  __export(utils_exports, {
    hasBrowserEnv: () => hasBrowserEnv,
    hasStandardBrowserEnv: () => hasStandardBrowserEnv,
    hasStandardBrowserWebWorkerEnv: () => hasStandardBrowserWebWorkerEnv,
    origin: () => origin
  });
  var hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
  var hasStandardBrowserEnv = ((product) => {
    return hasBrowserEnv && ["ReactNative", "NativeScript", "NS"].indexOf(product) < 0;
  })(typeof navigator !== "undefined" && navigator.product);
  var hasStandardBrowserWebWorkerEnv = (() => {
    return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
  })();
  var origin = hasBrowserEnv && window.location.href || "http://localhost";

  // node_modules/axios/lib/platform/index.js
  var platform_default = {
    ...utils_exports,
    ...browser_default
  };

  // node_modules/axios/lib/helpers/toURLEncodedForm.js
  function toURLEncodedForm(data, options) {
    return toFormData_default(data, new platform_default.classes.URLSearchParams(), Object.assign({
      visitor: /* @__PURE__ */ __name(function(value, key, path, helpers) {
        if (platform_default.isNode && utils_default.isBuffer(value)) {
          this.append(key, value.toString("base64"));
          return false;
        }
        return helpers.defaultVisitor.apply(this, arguments);
      }, "visitor")
    }, options));
  }
  __name(toURLEncodedForm, "toURLEncodedForm");

  // node_modules/axios/lib/helpers/formDataToJSON.js
  function parsePropPath(name) {
    return utils_default.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
      return match[0] === "[]" ? "" : match[1] || match[0];
    });
  }
  __name(parsePropPath, "parsePropPath");
  function arrayToObject(arr) {
    const obj = {};
    const keys = Object.keys(arr);
    let i;
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      obj[key] = arr[key];
    }
    return obj;
  }
  __name(arrayToObject, "arrayToObject");
  function formDataToJSON(formData) {
    function buildPath(path, value, target, index) {
      let name = path[index++];
      if (name === "__proto__") return true;
      const isNumericKey = Number.isFinite(+name);
      const isLast = index >= path.length;
      name = !name && utils_default.isArray(target) ? target.length : name;
      if (isLast) {
        if (utils_default.hasOwnProp(target, name)) {
          target[name] = [target[name], value];
        } else {
          target[name] = value;
        }
        return !isNumericKey;
      }
      if (!target[name] || !utils_default.isObject(target[name])) {
        target[name] = [];
      }
      const result = buildPath(path, value, target[name], index);
      if (result && utils_default.isArray(target[name])) {
        target[name] = arrayToObject(target[name]);
      }
      return !isNumericKey;
    }
    __name(buildPath, "buildPath");
    if (utils_default.isFormData(formData) && utils_default.isFunction(formData.entries)) {
      const obj = {};
      utils_default.forEachEntry(formData, (name, value) => {
        buildPath(parsePropPath(name), value, obj, 0);
      });
      return obj;
    }
    return null;
  }
  __name(formDataToJSON, "formDataToJSON");
  var formDataToJSON_default = formDataToJSON;

  // node_modules/axios/lib/defaults/index.js
  function stringifySafely(rawValue, parser, encoder) {
    if (utils_default.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils_default.trim(rawValue);
      } catch (e) {
        if (e.name !== "SyntaxError") {
          throw e;
        }
      }
    }
    return (encoder || JSON.stringify)(rawValue);
  }
  __name(stringifySafely, "stringifySafely");
  var defaults = {
    transitional: transitional_default,
    adapter: ["xhr", "http", "fetch"],
    transformRequest: [/* @__PURE__ */ __name(function transformRequest(data, headers) {
      const contentType = headers.getContentType() || "";
      const hasJSONContentType = contentType.indexOf("application/json") > -1;
      const isObjectPayload = utils_default.isObject(data);
      if (isObjectPayload && utils_default.isHTMLForm(data)) {
        data = new FormData(data);
      }
      const isFormData2 = utils_default.isFormData(data);
      if (isFormData2) {
        return hasJSONContentType ? JSON.stringify(formDataToJSON_default(data)) : data;
      }
      if (utils_default.isArrayBuffer(data) || utils_default.isBuffer(data) || utils_default.isStream(data) || utils_default.isFile(data) || utils_default.isBlob(data) || utils_default.isReadableStream(data)) {
        return data;
      }
      if (utils_default.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils_default.isURLSearchParams(data)) {
        headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
        return data.toString();
      }
      let isFileList2;
      if (isObjectPayload) {
        if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
          return toURLEncodedForm(data, this.formSerializer).toString();
        }
        if ((isFileList2 = utils_default.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
          const _FormData = this.env && this.env.FormData;
          return toFormData_default(
            isFileList2 ? { "files[]": data } : data,
            _FormData && new _FormData(),
            this.formSerializer
          );
        }
      }
      if (isObjectPayload || hasJSONContentType) {
        headers.setContentType("application/json", false);
        return stringifySafely(data);
      }
      return data;
    }, "transformRequest")],
    transformResponse: [/* @__PURE__ */ __name(function transformResponse(data) {
      const transitional2 = this.transitional || defaults.transitional;
      const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
      const JSONRequested = this.responseType === "json";
      if (utils_default.isResponse(data) || utils_default.isReadableStream(data)) {
        return data;
      }
      if (data && utils_default.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
        const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
        const strictJSONParsing = !silentJSONParsing && JSONRequested;
        try {
          return JSON.parse(data);
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === "SyntaxError") {
              throw AxiosError_default.from(e, AxiosError_default.ERR_BAD_RESPONSE, this, null, this.response);
            }
            throw e;
          }
        }
      }
      return data;
    }, "transformResponse")],
    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
      FormData: platform_default.classes.FormData,
      Blob: platform_default.classes.Blob
    },
    validateStatus: /* @__PURE__ */ __name(function validateStatus(status) {
      return status >= 200 && status < 300;
    }, "validateStatus"),
    headers: {
      common: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": void 0
      }
    }
  };
  utils_default.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
    defaults.headers[method] = {};
  });
  var defaults_default = defaults;

  // node_modules/axios/lib/helpers/parseHeaders.js
  var ignoreDuplicateOf = utils_default.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ]);
  var parseHeaders_default = /* @__PURE__ */ __name((rawHeaders) => {
    const parsed = {};
    let key;
    let val;
    let i;
    rawHeaders && rawHeaders.split("\n").forEach(/* @__PURE__ */ __name(function parser(line) {
      i = line.indexOf(":");
      key = line.substring(0, i).trim().toLowerCase();
      val = line.substring(i + 1).trim();
      if (!key || parsed[key] && ignoreDuplicateOf[key]) {
        return;
      }
      if (key === "set-cookie") {
        if (parsed[key]) {
          parsed[key].push(val);
        } else {
          parsed[key] = [val];
        }
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
      }
    }, "parser"));
    return parsed;
  }, "default");

  // node_modules/axios/lib/core/AxiosHeaders.js
  var $internals = Symbol("internals");
  function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase();
  }
  __name(normalizeHeader, "normalizeHeader");
  function normalizeValue(value) {
    if (value === false || value == null) {
      return value;
    }
    return utils_default.isArray(value) ? value.map(normalizeValue) : String(value);
  }
  __name(normalizeValue, "normalizeValue");
  function parseTokens(str) {
    const tokens = /* @__PURE__ */ Object.create(null);
    const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let match;
    while (match = tokensRE.exec(str)) {
      tokens[match[1]] = match[2];
    }
    return tokens;
  }
  __name(parseTokens, "parseTokens");
  var isValidHeaderName = /* @__PURE__ */ __name((str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim()), "isValidHeaderName");
  function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
    if (utils_default.isFunction(filter2)) {
      return filter2.call(this, value, header);
    }
    if (isHeaderNameFilter) {
      value = header;
    }
    if (!utils_default.isString(value)) return;
    if (utils_default.isString(filter2)) {
      return value.indexOf(filter2) !== -1;
    }
    if (utils_default.isRegExp(filter2)) {
      return filter2.test(value);
    }
  }
  __name(matchHeaderValue, "matchHeaderValue");
  function formatHeader(header) {
    return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
  }
  __name(formatHeader, "formatHeader");
  function buildAccessors(obj, header) {
    const accessorName = utils_default.toCamelCase(" " + header);
    ["get", "set", "has"].forEach((methodName) => {
      Object.defineProperty(obj, methodName + accessorName, {
        value: /* @__PURE__ */ __name(function(arg1, arg2, arg3) {
          return this[methodName].call(this, header, arg1, arg2, arg3);
        }, "value"),
        configurable: true
      });
    });
  }
  __name(buildAccessors, "buildAccessors");
  var AxiosHeaders = class {
    static {
      __name(this, "AxiosHeaders");
    }
    constructor(headers) {
      headers && this.set(headers);
    }
    set(header, valueOrRewrite, rewrite) {
      const self2 = this;
      function setHeader(_value, _header, _rewrite) {
        const lHeader = normalizeHeader(_header);
        if (!lHeader) {
          throw new Error("header name must be a non-empty string");
        }
        const key = utils_default.findKey(self2, lHeader);
        if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
          self2[key || _header] = normalizeValue(_value);
        }
      }
      __name(setHeader, "setHeader");
      const setHeaders = /* @__PURE__ */ __name((headers, _rewrite) => utils_default.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite)), "setHeaders");
      if (utils_default.isPlainObject(header) || header instanceof this.constructor) {
        setHeaders(header, valueOrRewrite);
      } else if (utils_default.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
        setHeaders(parseHeaders_default(header), valueOrRewrite);
      } else if (utils_default.isHeaders(header)) {
        for (const [key, value] of header.entries()) {
          setHeader(value, key, rewrite);
        }
      } else {
        header != null && setHeader(valueOrRewrite, header, rewrite);
      }
      return this;
    }
    get(header, parser) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils_default.findKey(this, header);
        if (key) {
          const value = this[key];
          if (!parser) {
            return value;
          }
          if (parser === true) {
            return parseTokens(value);
          }
          if (utils_default.isFunction(parser)) {
            return parser.call(this, value, key);
          }
          if (utils_default.isRegExp(parser)) {
            return parser.exec(value);
          }
          throw new TypeError("parser must be boolean|regexp|function");
        }
      }
    }
    has(header, matcher) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils_default.findKey(this, header);
        return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
      }
      return false;
    }
    delete(header, matcher) {
      const self2 = this;
      let deleted = false;
      function deleteHeader(_header) {
        _header = normalizeHeader(_header);
        if (_header) {
          const key = utils_default.findKey(self2, _header);
          if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
            delete self2[key];
            deleted = true;
          }
        }
      }
      __name(deleteHeader, "deleteHeader");
      if (utils_default.isArray(header)) {
        header.forEach(deleteHeader);
      } else {
        deleteHeader(header);
      }
      return deleted;
    }
    clear(matcher) {
      const keys = Object.keys(this);
      let i = keys.length;
      let deleted = false;
      while (i--) {
        const key = keys[i];
        if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
          delete this[key];
          deleted = true;
        }
      }
      return deleted;
    }
    normalize(format) {
      const self2 = this;
      const headers = {};
      utils_default.forEach(this, (value, header) => {
        const key = utils_default.findKey(headers, header);
        if (key) {
          self2[key] = normalizeValue(value);
          delete self2[header];
          return;
        }
        const normalized = format ? formatHeader(header) : String(header).trim();
        if (normalized !== header) {
          delete self2[header];
        }
        self2[normalized] = normalizeValue(value);
        headers[normalized] = true;
      });
      return this;
    }
    concat(...targets) {
      return this.constructor.concat(this, ...targets);
    }
    toJSON(asStrings) {
      const obj = /* @__PURE__ */ Object.create(null);
      utils_default.forEach(this, (value, header) => {
        value != null && value !== false && (obj[header] = asStrings && utils_default.isArray(value) ? value.join(", ") : value);
      });
      return obj;
    }
    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
      return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
    }
    get [Symbol.toStringTag]() {
      return "AxiosHeaders";
    }
    static from(thing) {
      return thing instanceof this ? thing : new this(thing);
    }
    static concat(first, ...targets) {
      const computed = new this(first);
      targets.forEach((target) => computed.set(target));
      return computed;
    }
    static accessor(header) {
      const internals = this[$internals] = this[$internals] = {
        accessors: {}
      };
      const accessors = internals.accessors;
      const prototype3 = this.prototype;
      function defineAccessor(_header) {
        const lHeader = normalizeHeader(_header);
        if (!accessors[lHeader]) {
          buildAccessors(prototype3, _header);
          accessors[lHeader] = true;
        }
      }
      __name(defineAccessor, "defineAccessor");
      utils_default.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
      return this;
    }
  };
  AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
  utils_default.reduceDescriptors(AxiosHeaders.prototype, ({ value }, key) => {
    let mapped = key[0].toUpperCase() + key.slice(1);
    return {
      get: /* @__PURE__ */ __name(() => value, "get"),
      set(headerValue) {
        this[mapped] = headerValue;
      }
    };
  });
  utils_default.freezeMethods(AxiosHeaders);
  var AxiosHeaders_default = AxiosHeaders;

  // node_modules/axios/lib/core/transformData.js
  function transformData(fns, response) {
    const config = this || defaults_default;
    const context = response || config;
    const headers = AxiosHeaders_default.from(context.headers);
    let data = context.data;
    utils_default.forEach(fns, /* @__PURE__ */ __name(function transform(fn) {
      data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
    }, "transform"));
    headers.normalize();
    return data;
  }
  __name(transformData, "transformData");

  // node_modules/axios/lib/cancel/isCancel.js
  function isCancel(value) {
    return !!(value && value.__CANCEL__);
  }
  __name(isCancel, "isCancel");

  // node_modules/axios/lib/cancel/CanceledError.js
  function CanceledError(message, config, request) {
    AxiosError_default.call(this, message == null ? "canceled" : message, AxiosError_default.ERR_CANCELED, config, request);
    this.name = "CanceledError";
  }
  __name(CanceledError, "CanceledError");
  utils_default.inherits(CanceledError, AxiosError_default, {
    __CANCEL__: true
  });
  var CanceledError_default = CanceledError;

  // node_modules/axios/lib/core/settle.js
  function settle(resolve, reject, response) {
    const validateStatus2 = response.config.validateStatus;
    if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
      resolve(response);
    } else {
      reject(new AxiosError_default(
        "Request failed with status code " + response.status,
        [AxiosError_default.ERR_BAD_REQUEST, AxiosError_default.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
        response.config,
        response.request,
        response
      ));
    }
  }
  __name(settle, "settle");

  // node_modules/axios/lib/helpers/parseProtocol.js
  function parseProtocol(url) {
    const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
    return match && match[1] || "";
  }
  __name(parseProtocol, "parseProtocol");

  // node_modules/axios/lib/helpers/speedometer.js
  function speedometer(samplesCount, min) {
    samplesCount = samplesCount || 10;
    const bytes = new Array(samplesCount);
    const timestamps = new Array(samplesCount);
    let head = 0;
    let tail = 0;
    let firstSampleTS;
    min = min !== void 0 ? min : 1e3;
    return /* @__PURE__ */ __name(function push(chunkLength) {
      const now = Date.now();
      const startedAt = timestamps[tail];
      if (!firstSampleTS) {
        firstSampleTS = now;
      }
      bytes[head] = chunkLength;
      timestamps[head] = now;
      let i = tail;
      let bytesCount = 0;
      while (i !== head) {
        bytesCount += bytes[i++];
        i = i % samplesCount;
      }
      head = (head + 1) % samplesCount;
      if (head === tail) {
        tail = (tail + 1) % samplesCount;
      }
      if (now - firstSampleTS < min) {
        return;
      }
      const passed = startedAt && now - startedAt;
      return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
    }, "push");
  }
  __name(speedometer, "speedometer");
  var speedometer_default = speedometer;

  // node_modules/axios/lib/helpers/throttle.js
  function throttle(fn, freq) {
    let timestamp = 0;
    const threshold = 1e3 / freq;
    let timer = null;
    return /* @__PURE__ */ __name(function throttled() {
      const force = this === true;
      const now = Date.now();
      if (force || now - timestamp > threshold) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        timestamp = now;
        return fn.apply(null, arguments);
      }
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          timestamp = Date.now();
          return fn.apply(null, arguments);
        }, threshold - (now - timestamp));
      }
    }, "throttled");
  }
  __name(throttle, "throttle");
  var throttle_default = throttle;

  // node_modules/axios/lib/helpers/progressEventReducer.js
  var progressEventReducer_default = /* @__PURE__ */ __name((listener, isDownloadStream, freq = 3) => {
    let bytesNotified = 0;
    const _speedometer = speedometer_default(50, 250);
    return throttle_default((e) => {
      const loaded = e.loaded;
      const total = e.lengthComputable ? e.total : void 0;
      const progressBytes = loaded - bytesNotified;
      const rate = _speedometer(progressBytes);
      const inRange = loaded <= total;
      bytesNotified = loaded;
      const data = {
        loaded,
        total,
        progress: total ? loaded / total : void 0,
        bytes: progressBytes,
        rate: rate ? rate : void 0,
        estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
        event: e,
        lengthComputable: total != null
      };
      data[isDownloadStream ? "download" : "upload"] = true;
      listener(data);
    }, freq);
  }, "default");

  // node_modules/axios/lib/helpers/isURLSameOrigin.js
  var isURLSameOrigin_default = platform_default.hasStandardBrowserEnv ? (
    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
    (/* @__PURE__ */ __name(function standardBrowserEnv() {
      const msie = /(msie|trident)/i.test(navigator.userAgent);
      const urlParsingNode = document.createElement("a");
      let originURL;
      function resolveURL(url) {
        let href = url;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      __name(resolveURL, "resolveURL");
      originURL = resolveURL(window.location.href);
      return /* @__PURE__ */ __name(function isURLSameOrigin(requestURL) {
        const parsed = utils_default.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      }, "isURLSameOrigin");
    }, "standardBrowserEnv"))()
  ) : (
    // Non standard browser envs (web workers, react-native) lack needed support.
    (/* @__PURE__ */ __name(function nonStandardBrowserEnv() {
      return /* @__PURE__ */ __name(function isURLSameOrigin() {
        return true;
      }, "isURLSameOrigin");
    }, "nonStandardBrowserEnv"))()
  );

  // node_modules/axios/lib/helpers/cookies.js
  var cookies_default = platform_default.hasStandardBrowserEnv ? (
    // Standard browser envs support document.cookie
    {
      write(name, value, expires, path, domain, secure) {
        const cookie = [name + "=" + encodeURIComponent(value)];
        utils_default.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
        utils_default.isString(path) && cookie.push("path=" + path);
        utils_default.isString(domain) && cookie.push("domain=" + domain);
        secure === true && cookie.push("secure");
        document.cookie = cookie.join("; ");
      },
      read(name) {
        const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
        return match ? decodeURIComponent(match[3]) : null;
      },
      remove(name) {
        this.write(name, "", Date.now() - 864e5);
      }
    }
  ) : (
    // Non-standard browser env (web workers, react-native) lack needed support.
    {
      write() {
      },
      read() {
        return null;
      },
      remove() {
      }
    }
  );

  // node_modules/axios/lib/helpers/isAbsoluteURL.js
  function isAbsoluteURL(url) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  }
  __name(isAbsoluteURL, "isAbsoluteURL");

  // node_modules/axios/lib/helpers/combineURLs.js
  function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
  }
  __name(combineURLs, "combineURLs");

  // node_modules/axios/lib/core/buildFullPath.js
  function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  }
  __name(buildFullPath, "buildFullPath");

  // node_modules/axios/lib/core/mergeConfig.js
  var headersToObject = /* @__PURE__ */ __name((thing) => thing instanceof AxiosHeaders_default ? { ...thing } : thing, "headersToObject");
  function mergeConfig(config1, config2) {
    config2 = config2 || {};
    const config = {};
    function getMergedValue(target, source, caseless) {
      if (utils_default.isPlainObject(target) && utils_default.isPlainObject(source)) {
        return utils_default.merge.call({ caseless }, target, source);
      } else if (utils_default.isPlainObject(source)) {
        return utils_default.merge({}, source);
      } else if (utils_default.isArray(source)) {
        return source.slice();
      }
      return source;
    }
    __name(getMergedValue, "getMergedValue");
    function mergeDeepProperties(a, b, caseless) {
      if (!utils_default.isUndefined(b)) {
        return getMergedValue(a, b, caseless);
      } else if (!utils_default.isUndefined(a)) {
        return getMergedValue(void 0, a, caseless);
      }
    }
    __name(mergeDeepProperties, "mergeDeepProperties");
    function valueFromConfig2(a, b) {
      if (!utils_default.isUndefined(b)) {
        return getMergedValue(void 0, b);
      }
    }
    __name(valueFromConfig2, "valueFromConfig2");
    function defaultToConfig2(a, b) {
      if (!utils_default.isUndefined(b)) {
        return getMergedValue(void 0, b);
      } else if (!utils_default.isUndefined(a)) {
        return getMergedValue(void 0, a);
      }
    }
    __name(defaultToConfig2, "defaultToConfig2");
    function mergeDirectKeys(a, b, prop) {
      if (prop in config2) {
        return getMergedValue(a, b);
      } else if (prop in config1) {
        return getMergedValue(void 0, a);
      }
    }
    __name(mergeDirectKeys, "mergeDirectKeys");
    const mergeMap = {
      url: valueFromConfig2,
      method: valueFromConfig2,
      data: valueFromConfig2,
      baseURL: defaultToConfig2,
      transformRequest: defaultToConfig2,
      transformResponse: defaultToConfig2,
      paramsSerializer: defaultToConfig2,
      timeout: defaultToConfig2,
      timeoutMessage: defaultToConfig2,
      withCredentials: defaultToConfig2,
      withXSRFToken: defaultToConfig2,
      adapter: defaultToConfig2,
      responseType: defaultToConfig2,
      xsrfCookieName: defaultToConfig2,
      xsrfHeaderName: defaultToConfig2,
      onUploadProgress: defaultToConfig2,
      onDownloadProgress: defaultToConfig2,
      decompress: defaultToConfig2,
      maxContentLength: defaultToConfig2,
      maxBodyLength: defaultToConfig2,
      beforeRedirect: defaultToConfig2,
      transport: defaultToConfig2,
      httpAgent: defaultToConfig2,
      httpsAgent: defaultToConfig2,
      cancelToken: defaultToConfig2,
      socketPath: defaultToConfig2,
      responseEncoding: defaultToConfig2,
      validateStatus: mergeDirectKeys,
      headers: /* @__PURE__ */ __name((a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true), "headers")
    };
    utils_default.forEach(Object.keys(Object.assign({}, config1, config2)), /* @__PURE__ */ __name(function computeConfigValue(prop) {
      const merge2 = mergeMap[prop] || mergeDeepProperties;
      const configValue = merge2(config1[prop], config2[prop], prop);
      utils_default.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
    }, "computeConfigValue"));
    return config;
  }
  __name(mergeConfig, "mergeConfig");

  // node_modules/axios/lib/helpers/resolveConfig.js
  var resolveConfig_default = /* @__PURE__ */ __name((config) => {
    const newConfig = mergeConfig({}, config);
    let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
    newConfig.headers = headers = AxiosHeaders_default.from(headers);
    newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url), config.params, config.paramsSerializer);
    if (auth) {
      headers.set(
        "Authorization",
        "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : ""))
      );
    }
    let contentType;
    if (utils_default.isFormData(data)) {
      if (platform_default.hasStandardBrowserEnv || platform_default.hasStandardBrowserWebWorkerEnv) {
        headers.setContentType(void 0);
      } else if ((contentType = headers.getContentType()) !== false) {
        const [type, ...tokens] = contentType ? contentType.split(";").map((token) => token.trim()).filter(Boolean) : [];
        headers.setContentType([type || "multipart/form-data", ...tokens].join("; "));
      }
    }
    if (platform_default.hasStandardBrowserEnv) {
      withXSRFToken && utils_default.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
      if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin_default(newConfig.url)) {
        const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies_default.read(xsrfCookieName);
        if (xsrfValue) {
          headers.set(xsrfHeaderName, xsrfValue);
        }
      }
    }
    return newConfig;
  }, "default");

  // node_modules/axios/lib/adapters/xhr.js
  var isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
  var xhr_default = isXHRAdapterSupported && function(config) {
    return new Promise(/* @__PURE__ */ __name(function dispatchXhrRequest(resolve, reject) {
      const _config = resolveConfig_default(config);
      let requestData = _config.data;
      const requestHeaders = AxiosHeaders_default.from(_config.headers).normalize();
      let { responseType } = _config;
      let onCanceled;
      function done() {
        if (_config.cancelToken) {
          _config.cancelToken.unsubscribe(onCanceled);
        }
        if (_config.signal) {
          _config.signal.removeEventListener("abort", onCanceled);
        }
      }
      __name(done, "done");
      let request = new XMLHttpRequest();
      request.open(_config.method.toUpperCase(), _config.url, true);
      request.timeout = _config.timeout;
      function onloadend() {
        if (!request) {
          return;
        }
        const responseHeaders = AxiosHeaders_default.from(
          "getAllResponseHeaders" in request && request.getAllResponseHeaders()
        );
        const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
        const response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        };
        settle(/* @__PURE__ */ __name(function _resolve(value) {
          resolve(value);
          done();
        }, "_resolve"), /* @__PURE__ */ __name(function _reject(err) {
          reject(err);
          done();
        }, "_reject"), response);
        request = null;
      }
      __name(onloadend, "onloadend");
      if ("onloadend" in request) {
        request.onloadend = onloadend;
      } else {
        request.onreadystatechange = /* @__PURE__ */ __name(function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
            return;
          }
          setTimeout(onloadend);
        }, "handleLoad");
      }
      request.onabort = /* @__PURE__ */ __name(function handleAbort() {
        if (!request) {
          return;
        }
        reject(new AxiosError_default("Request aborted", AxiosError_default.ECONNABORTED, _config, request));
        request = null;
      }, "handleAbort");
      request.onerror = /* @__PURE__ */ __name(function handleError() {
        reject(new AxiosError_default("Network Error", AxiosError_default.ERR_NETWORK, _config, request));
        request = null;
      }, "handleError");
      request.ontimeout = /* @__PURE__ */ __name(function handleTimeout() {
        let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
        const transitional2 = _config.transitional || transitional_default;
        if (_config.timeoutErrorMessage) {
          timeoutErrorMessage = _config.timeoutErrorMessage;
        }
        reject(new AxiosError_default(
          timeoutErrorMessage,
          transitional2.clarifyTimeoutError ? AxiosError_default.ETIMEDOUT : AxiosError_default.ECONNABORTED,
          _config,
          request
        ));
        request = null;
      }, "handleTimeout");
      requestData === void 0 && requestHeaders.setContentType(null);
      if ("setRequestHeader" in request) {
        utils_default.forEach(requestHeaders.toJSON(), /* @__PURE__ */ __name(function setRequestHeader(val, key) {
          request.setRequestHeader(key, val);
        }, "setRequestHeader"));
      }
      if (!utils_default.isUndefined(_config.withCredentials)) {
        request.withCredentials = !!_config.withCredentials;
      }
      if (responseType && responseType !== "json") {
        request.responseType = _config.responseType;
      }
      if (typeof _config.onDownloadProgress === "function") {
        request.addEventListener("progress", progressEventReducer_default(_config.onDownloadProgress, true));
      }
      if (typeof _config.onUploadProgress === "function" && request.upload) {
        request.upload.addEventListener("progress", progressEventReducer_default(_config.onUploadProgress));
      }
      if (_config.cancelToken || _config.signal) {
        onCanceled = /* @__PURE__ */ __name((cancel) => {
          if (!request) {
            return;
          }
          reject(!cancel || cancel.type ? new CanceledError_default(null, config, request) : cancel);
          request.abort();
          request = null;
        }, "onCanceled");
        _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
        if (_config.signal) {
          _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
        }
      }
      const protocol = parseProtocol(_config.url);
      if (protocol && platform_default.protocols.indexOf(protocol) === -1) {
        reject(new AxiosError_default("Unsupported protocol " + protocol + ":", AxiosError_default.ERR_BAD_REQUEST, config));
        return;
      }
      request.send(requestData || null);
    }, "dispatchXhrRequest"));
  };

  // node_modules/axios/lib/helpers/composeSignals.js
  var composeSignals = /* @__PURE__ */ __name((signals, timeout) => {
    let controller = new AbortController();
    let aborted;
    const onabort = /* @__PURE__ */ __name(function(cancel) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = cancel instanceof Error ? cancel : this.reason;
        controller.abort(err instanceof AxiosError_default ? err : new CanceledError_default(err instanceof Error ? err.message : err));
      }
    }, "onabort");
    let timer = timeout && setTimeout(() => {
      onabort(new AxiosError_default(`timeout ${timeout} of ms exceeded`, AxiosError_default.ETIMEDOUT));
    }, timeout);
    const unsubscribe = /* @__PURE__ */ __name(() => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal2) => {
          signal2 && (signal2.removeEventListener ? signal2.removeEventListener("abort", onabort) : signal2.unsubscribe(onabort));
        });
        signals = null;
      }
    }, "unsubscribe");
    signals.forEach((signal2) => signal2 && signal2.addEventListener && signal2.addEventListener("abort", onabort));
    const { signal } = controller;
    signal.unsubscribe = unsubscribe;
    return [signal, () => {
      timer && clearTimeout(timer);
      timer = null;
    }];
  }, "composeSignals");
  var composeSignals_default = composeSignals;

  // node_modules/axios/lib/helpers/trackStream.js
  var streamChunk = /* @__PURE__ */ __name(function* (chunk, chunkSize) {
    let len = chunk.byteLength;
    if (!chunkSize || len < chunkSize) {
      yield chunk;
      return;
    }
    let pos = 0;
    let end;
    while (pos < len) {
      end = pos + chunkSize;
      yield chunk.slice(pos, end);
      pos = end;
    }
  }, "streamChunk");
  var readBytes = /* @__PURE__ */ __name(async function* (iterable, chunkSize, encode3) {
    for await (const chunk of iterable) {
      yield* streamChunk(ArrayBuffer.isView(chunk) ? chunk : await encode3(String(chunk)), chunkSize);
    }
  }, "readBytes");
  var trackStream = /* @__PURE__ */ __name((stream, chunkSize, onProgress, onFinish, encode3) => {
    const iterator = readBytes(stream, chunkSize, encode3);
    let bytes = 0;
    return new ReadableStream({
      type: "bytes",
      async pull(controller) {
        const { done, value } = await iterator.next();
        if (done) {
          controller.close();
          onFinish();
          return;
        }
        let len = value.byteLength;
        onProgress && onProgress(bytes += len);
        controller.enqueue(new Uint8Array(value));
      },
      cancel(reason) {
        onFinish(reason);
        return iterator.return();
      }
    }, {
      highWaterMark: 2
    });
  }, "trackStream");

  // node_modules/axios/lib/adapters/fetch.js
  var fetchProgressDecorator = /* @__PURE__ */ __name((total, fn) => {
    const lengthComputable = total != null;
    return (loaded) => setTimeout(() => fn({
      lengthComputable,
      total,
      loaded
    }));
  }, "fetchProgressDecorator");
  var isFetchSupported = typeof fetch === "function" && typeof Request === "function" && typeof Response === "function";
  var isReadableStreamSupported = isFetchSupported && typeof ReadableStream === "function";
  var encodeText = isFetchSupported && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Response(str).arrayBuffer()));
  var supportsRequestStream = isReadableStreamSupported && (() => {
    let duplexAccessed = false;
    const hasContentType = new Request(platform_default.origin, {
      body: new ReadableStream(),
      method: "POST",
      get duplex() {
        duplexAccessed = true;
        return "half";
      }
    }).headers.has("Content-Type");
    return duplexAccessed && !hasContentType;
  })();
  var DEFAULT_CHUNK_SIZE = 64 * 1024;
  var supportsResponseStream = isReadableStreamSupported && !!(() => {
    try {
      return utils_default.isReadableStream(new Response("").body);
    } catch (err) {
    }
  })();
  var resolvers = {
    stream: supportsResponseStream && ((res) => res.body)
  };
  isFetchSupported && ((res) => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
      !resolvers[type] && (resolvers[type] = utils_default.isFunction(res[type]) ? (res2) => res2[type]() : (_, config) => {
        throw new AxiosError_default(`Response type '${type}' is not supported`, AxiosError_default.ERR_NOT_SUPPORT, config);
      });
    });
  })(new Response());
  var getBodyLength = /* @__PURE__ */ __name(async (body) => {
    if (body == null) {
      return 0;
    }
    if (utils_default.isBlob(body)) {
      return body.size;
    }
    if (utils_default.isSpecCompliantForm(body)) {
      return (await new Request(body).arrayBuffer()).byteLength;
    }
    if (utils_default.isArrayBufferView(body)) {
      return body.byteLength;
    }
    if (utils_default.isURLSearchParams(body)) {
      body = body + "";
    }
    if (utils_default.isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  }, "getBodyLength");
  var resolveBodyLength = /* @__PURE__ */ __name(async (headers, body) => {
    const length = utils_default.toFiniteNumber(headers.getContentLength());
    return length == null ? getBodyLength(body) : length;
  }, "resolveBodyLength");
  var fetch_default = isFetchSupported && (async (config) => {
    let {
      url,
      method,
      data,
      signal,
      cancelToken,
      timeout,
      onDownloadProgress,
      onUploadProgress,
      responseType,
      headers,
      withCredentials = "same-origin",
      fetchOptions
    } = resolveConfig_default(config);
    responseType = responseType ? (responseType + "").toLowerCase() : "text";
    let [composedSignal, stopTimeout] = signal || cancelToken || timeout ? composeSignals_default([signal, cancelToken], timeout) : [];
    let finished, request;
    const onFinish = /* @__PURE__ */ __name(() => {
      !finished && setTimeout(() => {
        composedSignal && composedSignal.unsubscribe();
      });
      finished = true;
    }, "onFinish");
    let requestContentLength;
    try {
      if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
        let _request = new Request(url, {
          method: "POST",
          body: data,
          duplex: "half"
        });
        let contentTypeHeader;
        if (utils_default.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
          headers.setContentType(contentTypeHeader);
        }
        if (_request.body) {
          data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, fetchProgressDecorator(
            requestContentLength,
            progressEventReducer_default(onUploadProgress)
          ), null, encodeText);
        }
      }
      if (!utils_default.isString(withCredentials)) {
        withCredentials = withCredentials ? "cors" : "omit";
      }
      request = new Request(url, {
        ...fetchOptions,
        signal: composedSignal,
        method: method.toUpperCase(),
        headers: headers.normalize().toJSON(),
        body: data,
        duplex: "half",
        withCredentials
      });
      let response = await fetch(request);
      const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
      if (supportsResponseStream && (onDownloadProgress || isStreamResponse)) {
        const options = {};
        ["status", "statusText", "headers"].forEach((prop) => {
          options[prop] = response[prop];
        });
        const responseContentLength = utils_default.toFiniteNumber(response.headers.get("content-length"));
        response = new Response(
          trackStream(response.body, DEFAULT_CHUNK_SIZE, onDownloadProgress && fetchProgressDecorator(
            responseContentLength,
            progressEventReducer_default(onDownloadProgress, true)
          ), isStreamResponse && onFinish, encodeText),
          options
        );
      }
      responseType = responseType || "text";
      let responseData = await resolvers[utils_default.findKey(resolvers, responseType) || "text"](response, config);
      !isStreamResponse && onFinish();
      stopTimeout && stopTimeout();
      return await new Promise((resolve, reject) => {
        settle(resolve, reject, {
          data: responseData,
          headers: AxiosHeaders_default.from(response.headers),
          status: response.status,
          statusText: response.statusText,
          config,
          request
        });
      });
    } catch (err) {
      onFinish();
      if (err && err.name === "TypeError" && /fetch/i.test(err.message)) {
        throw Object.assign(
          new AxiosError_default("Network Error", AxiosError_default.ERR_NETWORK, config, request),
          {
            cause: err.cause || err
          }
        );
      }
      throw AxiosError_default.from(err, err && err.code, config, request);
    }
  });

  // node_modules/axios/lib/adapters/adapters.js
  var knownAdapters = {
    http: null_default,
    xhr: xhr_default,
    fetch: fetch_default
  };
  utils_default.forEach(knownAdapters, (fn, value) => {
    if (fn) {
      try {
        Object.defineProperty(fn, "name", { value });
      } catch (e) {
      }
      Object.defineProperty(fn, "adapterName", { value });
    }
  });
  var renderReason = /* @__PURE__ */ __name((reason) => `- ${reason}`, "renderReason");
  var isResolvedHandle = /* @__PURE__ */ __name((adapter) => utils_default.isFunction(adapter) || adapter === null || adapter === false, "isResolvedHandle");
  var adapters_default = {
    getAdapter: /* @__PURE__ */ __name((adapters) => {
      adapters = utils_default.isArray(adapters) ? adapters : [adapters];
      const { length } = adapters;
      let nameOrAdapter;
      let adapter;
      const rejectedReasons = {};
      for (let i = 0; i < length; i++) {
        nameOrAdapter = adapters[i];
        let id;
        adapter = nameOrAdapter;
        if (!isResolvedHandle(nameOrAdapter)) {
          adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
          if (adapter === void 0) {
            throw new AxiosError_default(`Unknown adapter '${id}'`);
          }
        }
        if (adapter) {
          break;
        }
        rejectedReasons[id || "#" + i] = adapter;
      }
      if (!adapter) {
        const reasons = Object.entries(rejectedReasons).map(
          ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
        );
        let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
        throw new AxiosError_default(
          `There is no suitable adapter to dispatch the request ` + s,
          "ERR_NOT_SUPPORT"
        );
      }
      return adapter;
    }, "getAdapter"),
    adapters: knownAdapters
  };

  // node_modules/axios/lib/core/dispatchRequest.js
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
    if (config.signal && config.signal.aborted) {
      throw new CanceledError_default(null, config);
    }
  }
  __name(throwIfCancellationRequested, "throwIfCancellationRequested");
  function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    config.headers = AxiosHeaders_default.from(config.headers);
    config.data = transformData.call(
      config,
      config.transformRequest
    );
    if (["post", "put", "patch"].indexOf(config.method) !== -1) {
      config.headers.setContentType("application/x-www-form-urlencoded", false);
    }
    const adapter = adapters_default.getAdapter(config.adapter || defaults_default.adapter);
    return adapter(config).then(/* @__PURE__ */ __name(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);
      response.data = transformData.call(
        config,
        config.transformResponse,
        response
      );
      response.headers = AxiosHeaders_default.from(response.headers);
      return response;
    }, "onAdapterResolution"), /* @__PURE__ */ __name(function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);
        if (reason && reason.response) {
          reason.response.data = transformData.call(
            config,
            config.transformResponse,
            reason.response
          );
          reason.response.headers = AxiosHeaders_default.from(reason.response.headers);
        }
      }
      return Promise.reject(reason);
    }, "onAdapterRejection"));
  }
  __name(dispatchRequest, "dispatchRequest");

  // node_modules/axios/lib/env/data.js
  var VERSION = "1.7.2";

  // node_modules/axios/lib/helpers/validator.js
  var validators = {};
  ["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
    validators[type] = /* @__PURE__ */ __name(function validator(thing) {
      return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
    }, "validator");
  });
  var deprecatedWarnings = {};
  validators.transitional = /* @__PURE__ */ __name(function transitional(validator, version, message) {
    function formatMessage(opt, desc) {
      return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
    }
    __name(formatMessage, "formatMessage");
    return (value, opt, opts) => {
      if (validator === false) {
        throw new AxiosError_default(
          formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
          AxiosError_default.ERR_DEPRECATED
        );
      }
      if (version && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true;
        console.warn(
          formatMessage(
            opt,
            " has been deprecated since v" + version + " and will be removed in the near future"
          )
        );
      }
      return validator ? validator(value, opt, opts) : true;
    };
  }, "transitional");
  function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== "object") {
      throw new AxiosError_default("options must be an object", AxiosError_default.ERR_BAD_OPTION_VALUE);
    }
    const keys = Object.keys(options);
    let i = keys.length;
    while (i-- > 0) {
      const opt = keys[i];
      const validator = schema[opt];
      if (validator) {
        const value = options[opt];
        const result = value === void 0 || validator(value, opt, options);
        if (result !== true) {
          throw new AxiosError_default("option " + opt + " must be " + result, AxiosError_default.ERR_BAD_OPTION_VALUE);
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw new AxiosError_default("Unknown option " + opt, AxiosError_default.ERR_BAD_OPTION);
      }
    }
  }
  __name(assertOptions, "assertOptions");
  var validator_default = {
    assertOptions,
    validators
  };

  // node_modules/axios/lib/core/Axios.js
  var validators2 = validator_default.validators;
  var Axios = class {
    static {
      __name(this, "Axios");
    }
    constructor(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager_default(),
        response: new InterceptorManager_default()
      };
    }
    /**
     * Dispatch a request
     *
     * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
     * @param {?Object} config
     *
     * @returns {Promise} The Promise to be fulfilled
     */
    async request(configOrUrl, config) {
      try {
        return await this._request(configOrUrl, config);
      } catch (err) {
        if (err instanceof Error) {
          let dummy;
          Error.captureStackTrace ? Error.captureStackTrace(dummy = {}) : dummy = new Error();
          const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
          try {
            if (!err.stack) {
              err.stack = stack;
            } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
              err.stack += "\n" + stack;
            }
          } catch (e) {
          }
        }
        throw err;
      }
    }
    _request(configOrUrl, config) {
      if (typeof configOrUrl === "string") {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }
      config = mergeConfig(this.defaults, config);
      const { transitional: transitional2, paramsSerializer, headers } = config;
      if (transitional2 !== void 0) {
        validator_default.assertOptions(transitional2, {
          silentJSONParsing: validators2.transitional(validators2.boolean),
          forcedJSONParsing: validators2.transitional(validators2.boolean),
          clarifyTimeoutError: validators2.transitional(validators2.boolean)
        }, false);
      }
      if (paramsSerializer != null) {
        if (utils_default.isFunction(paramsSerializer)) {
          config.paramsSerializer = {
            serialize: paramsSerializer
          };
        } else {
          validator_default.assertOptions(paramsSerializer, {
            encode: validators2.function,
            serialize: validators2.function
          }, true);
        }
      }
      config.method = (config.method || this.defaults.method || "get").toLowerCase();
      let contextHeaders = headers && utils_default.merge(
        headers.common,
        headers[config.method]
      );
      headers && utils_default.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (method) => {
          delete headers[method];
        }
      );
      config.headers = AxiosHeaders_default.concat(contextHeaders, headers);
      const requestInterceptorChain = [];
      let synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(/* @__PURE__ */ __name(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      }, "unshiftRequestInterceptors"));
      const responseInterceptorChain = [];
      this.interceptors.response.forEach(/* @__PURE__ */ __name(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      }, "pushResponseInterceptors"));
      let promise;
      let i = 0;
      let len;
      if (!synchronousRequestInterceptors) {
        const chain = [dispatchRequest.bind(this), void 0];
        chain.unshift.apply(chain, requestInterceptorChain);
        chain.push.apply(chain, responseInterceptorChain);
        len = chain.length;
        promise = Promise.resolve(config);
        while (i < len) {
          promise = promise.then(chain[i++], chain[i++]);
        }
        return promise;
      }
      len = requestInterceptorChain.length;
      let newConfig = config;
      i = 0;
      while (i < len) {
        const onFulfilled = requestInterceptorChain[i++];
        const onRejected = requestInterceptorChain[i++];
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected.call(this, error);
          break;
        }
      }
      try {
        promise = dispatchRequest.call(this, newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      i = 0;
      len = responseInterceptorChain.length;
      while (i < len) {
        promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
      }
      return promise;
    }
    getUri(config) {
      config = mergeConfig(this.defaults, config);
      const fullPath = buildFullPath(config.baseURL, config.url);
      return buildURL(fullPath, config.params, config.paramsSerializer);
    }
  };
  utils_default.forEach(["delete", "get", "head", "options"], /* @__PURE__ */ __name(function forEachMethodNoData(method) {
    Axios.prototype[method] = function(url, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        url,
        data: (config || {}).data
      }));
    };
  }, "forEachMethodNoData"));
  utils_default.forEach(["post", "put", "patch"], /* @__PURE__ */ __name(function forEachMethodWithData(method) {
    function generateHTTPMethod(isForm) {
      return /* @__PURE__ */ __name(function httpMethod(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          headers: isForm ? {
            "Content-Type": "multipart/form-data"
          } : {},
          url,
          data
        }));
      }, "httpMethod");
    }
    __name(generateHTTPMethod, "generateHTTPMethod");
    Axios.prototype[method] = generateHTTPMethod();
    Axios.prototype[method + "Form"] = generateHTTPMethod(true);
  }, "forEachMethodWithData"));
  var Axios_default = Axios;

  // node_modules/axios/lib/cancel/CancelToken.js
  var CancelToken = class _CancelToken {
    static {
      __name(this, "CancelToken");
    }
    constructor(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      let resolvePromise;
      this.promise = new Promise(/* @__PURE__ */ __name(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      }, "promiseExecutor"));
      const token = this;
      this.promise.then((cancel) => {
        if (!token._listeners) return;
        let i = token._listeners.length;
        while (i-- > 0) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });
      this.promise.then = (onfulfilled) => {
        let _resolve;
        const promise = new Promise((resolve) => {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = /* @__PURE__ */ __name(function reject() {
          token.unsubscribe(_resolve);
        }, "reject");
        return promise;
      };
      executor(/* @__PURE__ */ __name(function cancel(message, config, request) {
        if (token.reason) {
          return;
        }
        token.reason = new CanceledError_default(message, config, request);
        resolvePromise(token.reason);
      }, "cancel"));
    }
    /**
     * Throws a `CanceledError` if cancellation has been requested.
     */
    throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    }
    /**
     * Subscribe to the cancel signal
     */
    subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    }
    /**
     * Unsubscribe from the cancel signal
     */
    unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      const index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    }
    /**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */
    static source() {
      let cancel;
      const token = new _CancelToken(/* @__PURE__ */ __name(function executor(c) {
        cancel = c;
      }, "executor"));
      return {
        token,
        cancel
      };
    }
  };
  var CancelToken_default = CancelToken;

  // node_modules/axios/lib/helpers/spread.js
  function spread(callback) {
    return /* @__PURE__ */ __name(function wrap(arr) {
      return callback.apply(null, arr);
    }, "wrap");
  }
  __name(spread, "spread");

  // node_modules/axios/lib/helpers/isAxiosError.js
  function isAxiosError(payload) {
    return utils_default.isObject(payload) && payload.isAxiosError === true;
  }
  __name(isAxiosError, "isAxiosError");

  // node_modules/axios/lib/helpers/HttpStatusCode.js
  var HttpStatusCode = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511
  };
  Object.entries(HttpStatusCode).forEach(([key, value]) => {
    HttpStatusCode[value] = key;
  });
  var HttpStatusCode_default = HttpStatusCode;

  // node_modules/axios/lib/axios.js
  function createInstance(defaultConfig) {
    const context = new Axios_default(defaultConfig);
    const instance = bind(Axios_default.prototype.request, context);
    utils_default.extend(instance, Axios_default.prototype, context, { allOwnKeys: true });
    utils_default.extend(instance, context, null, { allOwnKeys: true });
    instance.create = /* @__PURE__ */ __name(function create(instanceConfig) {
      return createInstance(mergeConfig(defaultConfig, instanceConfig));
    }, "create");
    return instance;
  }
  __name(createInstance, "createInstance");
  var axios = createInstance(defaults_default);
  axios.Axios = Axios_default;
  axios.CanceledError = CanceledError_default;
  axios.CancelToken = CancelToken_default;
  axios.isCancel = isCancel;
  axios.VERSION = VERSION;
  axios.toFormData = toFormData_default;
  axios.AxiosError = AxiosError_default;
  axios.Cancel = axios.CanceledError;
  axios.all = /* @__PURE__ */ __name(function all(promises) {
    return Promise.all(promises);
  }, "all");
  axios.spread = spread;
  axios.isAxiosError = isAxiosError;
  axios.mergeConfig = mergeConfig;
  axios.AxiosHeaders = AxiosHeaders_default;
  axios.formToJSON = (thing) => formDataToJSON_default(utils_default.isHTMLForm(thing) ? new FormData(thing) : thing);
  axios.getAdapter = adapters_default.getAdapter;
  axios.HttpStatusCode = HttpStatusCode_default;
  axios.default = axios;
  var axios_default = axios;

  // node_modules/axios/index.js
  var {
    Axios: Axios2,
    AxiosError: AxiosError2,
    CanceledError: CanceledError2,
    isCancel: isCancel2,
    CancelToken: CancelToken2,
    VERSION: VERSION2,
    all: all2,
    Cancel,
    isAxiosError: isAxiosError2,
    spread: spread2,
    toFormData: toFormData2,
    AxiosHeaders: AxiosHeaders2,
    HttpStatusCode: HttpStatusCode2,
    formToJSON,
    getAdapter,
    mergeConfig: mergeConfig2
  } = axios_default;

  // src/utils.ts
  var Utils = class {
    static {
      __name(this, "Utils");
    }
    constructor() {
    }
    isNumber(value) {
      return !isNaN(value) && Math.floor(value) === value;
    }
    ReloadPage() {
      window.location.reload();
    }
    filterField(e) {
      let t = e.target;
      let badValues = /[.+-]/;
      t.value = t.value.replace(badValues, "");
    }
    clearField(e) {
      let t = e.target;
      let badValues = /[.+-a-zA-z]/;
      t.value = t.value.replace(badValues, "");
    }
  };
  function doRequest(requestBody) {
    try {
      const promise = axios_default.post(requestBody.url, requestBody.body, { headers: requestBody.headers });
      const datapromise = promise.then((response) => response.data);
      return datapromise;
    } catch (errors) {
      console.error(errors);
      return void 0;
    }
  }
  __name(doRequest, "doRequest");

  // src/account.ts
  var Account = class {
    static {
      __name(this, "Account");
    }
    async account(func, username, attribute) {
      let gameRequest = {
        function: func,
        username,
        attribute
      };
      const options = {
        url: "https://zfcfpwr3le.execute-api.ap-south-1.amazonaws.com/showtime/account",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(gameRequest)
        // qs: {
        //     bet: bet
        // }
      };
      try {
        const gameResponse = await doRequest(options);
        return gameResponse;
      } catch (err) {
        console.log(JSON.stringify(err));
      }
    }
  };

  // src/game.ts
  var Game = class {
    static {
      __name(this, "Game");
    }
    async play(bet) {
      let gameRequest = {
        bet
      };
      const options = {
        url: "https://zfcfpwr3le.execute-api.ap-south-1.amazonaws.com/showtime/evaluate",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(gameRequest)
      };
      try {
        const gameResponse = await doRequest(options);
        return gameResponse;
      } catch (err) {
        console.log(JSON.stringify(err));
        return void 0;
      }
    }
  };

  // src/slotmachine.ts
  var utils = new Utils();
  var acc = new Account();
  var game = new Game();
  function slotmachine() {
    document.addEventListener("DOMContentLoaded", () => {
      const messageElement = document.getElementById("message");
      const bankElement = document.getElementById("bank1");
      const betElement = document.getElementById("bet");
      const slotResultsElement = document.getElementById("slotResults");
      const bankbalanceElement = document.getElementById("bankbalance");
      const BankAddButton = document.getElementById("bankadd");
      const spinButton = document.getElementById("spin");
      const statusElement = document.getElementById("status");
      const exitButton = document.getElementById("exit");
      var modal = document.getElementById("authModal");
      var btn = document.getElementById("authBtn");
      var span = document.getElementsByClassName("close")[0];
      const usernameElement = document.getElementById("username");
      const passwordElement = document.getElementById("password");
      const signinButton = document.getElementById("signin");
      const signupButton = document.getElementById("signup");
      if (!messageElement || !bankElement || !betElement || !slotResultsElement || !bankbalanceElement || !BankAddButton || !spinButton || !statusElement || !exitButton) {
        console.error("One or more elements not found. Please check the HTML.");
        return;
      }
      messageElement.textContent = "Sign in or create an account to start the game!";
      let username = "none";
      bankElement.addEventListener("input", utils.filterField);
      betElement.addEventListener("input", utils.filterField);
      btn.onclick = function() {
        modal.style.display = "block";
      };
      span.onclick = function() {
        modal.style.display = "none";
      };
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
      exitButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to exit? All changes will be lost.")) {
          location.reload();
        }
      });
      signinButton.addEventListener("click", () => {
        let user = usernameElement.value;
        let password = passwordElement.value;
        acc.account("UserVerify", user, password).then((response) => {
          if (response == "verified") {
            username = user;
            acc.account("getBankBalance", username).then((response2) => {
              let bankbal = response2;
              bankbalanceElement.textContent = `Bank balance: $${bankbal}`;
              messageElement.textContent = `Welcome, ${username}! add amount to your account and spin to play the game!`;
              modal.style.display = "none";
            });
          } else {
            alert("username or password incorrect");
          }
        });
      });
      signupButton.addEventListener("click", () => {
        let user = usernameElement.value;
        let password = passwordElement.value;
        acc.account("UserAdd", user, password).then((response) => {
          if (response == "user added") {
            username = user;
            acc.account("getBankBalance", username).then((response2) => {
              let bankbal = response2;
              bankbalanceElement.textContent = `Bank balance: $${bankbal}`;
              messageElement.textContent = `Welcome, ${username}! add amount to your account and spin to play the game!`;
              modal.style.display = "none";
            });
          } else {
            alert("username already exists");
          }
        });
      });
      BankAddButton.addEventListener("click", () => {
        let bank = parseFloat(bankElement.value);
        if (username == "none") {
          alert("sign in or sign up to start the game!");
        } else {
          if (utils.isNumber(bank) === false || bank <= 0) {
            alert("Enter a valid number!");
          }
          if (bank < 1e10) {
            acc.account("BankAddWid", username, bank);
          }
          if (bank >= 1e10) {
            alert("Amount too high!");
          }
          setTimeout(() => {
            acc.account("getBankBalance", username).then((response) => {
              let bankbal;
              bankbal = response;
              bankbalanceElement.textContent = `Bank balance: $${bankbal}`;
            });
          }, 100);
        }
      });
      spinButton.addEventListener("click", () => {
        const bet = parseFloat(betElement.value);
        let bankbal;
        acc.account("getBankBalance", username).then((response) => {
          bankbal = response;
          if (username == "none") {
            alert("sign in or sign up to start the game!");
          } else {
            if (utils.isNumber(bet) === false) {
              alert("Enter a valid number!");
              return;
            }
            if (bet > bankbal) {
              alert("Not enough balance!");
              return;
            }
            if (bankbal < 10) {
              alert("At least $10 should be deposited to play the game");
              return;
            } else {
              messageElement.textContent = "Game started. Place your bet and spin the slot machine!";
              game.play(bet).then((res) => {
                let beoutput = res;
                let slot = beoutput.slot;
                let output = beoutput.winnings;
                slotResultsElement.innerHTML = "";
                slot.forEach((row) => {
                  const rowDiv = document.createElement("div");
                  rowDiv.classList.add("slot-row");
                  row.forEach((cell) => {
                    const cellDiv = document.createElement("div");
                    cellDiv.classList.add("slot-cell");
                    cellDiv.textContent = cell;
                    rowDiv.appendChild(cellDiv);
                  });
                  slotResultsElement.appendChild(rowDiv);
                });
                if (output > 0) {
                  statusElement.textContent = `You won $${output}!`;
                  acc.account("BankAddWid", username, output).then((response2) => {
                    let bankbal2;
                    bankbal2 = response2;
                    bankbalanceElement.textContent = `Bank balance: $${bankbal2}`;
                  });
                  confetti({
                    particleCount: 300,
                    spread: 90,
                    origin: { x: 1, y: 0.9 }
                  });
                  confetti({
                    particleCount: 300,
                    spread: 90,
                    origin: { x: 0, y: 0.9 }
                  });
                } else {
                  statusElement.textContent = `You lost $${bet}, keep trying!`;
                  acc.account("BankAddWid", username, -bet).then((response2) => {
                    let bankbal2;
                    bankbal2 = response2;
                    bankbalanceElement.textContent = `Bank balance: $${bankbal2}`;
                  });
                }
              });
            }
          }
        });
      });
    });
  }
  __name(slotmachine, "slotmachine");
  slotmachine();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3NFcnJvci5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbnVsbC5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdG9Gb3JtRGF0YS5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy90cmFuc2l0aW9uYWwuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2NsYXNzZXMvVVJMU2VhcmNoUGFyYW1zLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vYnJvd3Nlci9jbGFzc2VzL0Zvcm1EYXRhLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vYnJvd3Nlci9jbGFzc2VzL0Jsb2IuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vY29tbW9uL3V0aWxzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RvVVJMRW5jb2RlZEZvcm0uanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Zvcm1EYXRhVG9KU09OLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3NIZWFkZXJzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbGVkRXJyb3IuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VQcm90b2NvbC5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3BlZWRvbWV0ZXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3Rocm90dGxlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvYnVpbGRGdWxsUGF0aC5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3Jlc29sdmVDb25maWcuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbXBvc2VTaWduYWxzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy90cmFja1N0cmVhbS5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL2ZldGNoLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMvYWRhcHRlcnMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2Vudi9kYXRhLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy92YWxpZGF0b3IuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQXhpb3NFcnJvci5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvSHR0cFN0YXR1c0NvZGUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCAiLi4vc3JjL3V0aWxzLnRzIiwgIi4uL3NyYy9hY2NvdW50LnRzIiwgIi4uL3NyYy9nYW1lLnRzIiwgIi4uL3NyYy9zbG90bWFjaGluZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICB9O1xufVxuIiwgIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGJpbmQgZnJvbSAnLi9oZWxwZXJzL2JpbmQuanMnO1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG5jb25zdCB7dG9TdHJpbmd9ID0gT2JqZWN0LnByb3RvdHlwZTtcbmNvbnN0IHtnZXRQcm90b3R5cGVPZn0gPSBPYmplY3Q7XG5cbmNvbnN0IGtpbmRPZiA9IChjYWNoZSA9PiB0aGluZyA9PiB7XG4gICAgY29uc3Qgc3RyID0gdG9TdHJpbmcuY2FsbCh0aGluZyk7XG4gICAgcmV0dXJuIGNhY2hlW3N0cl0gfHwgKGNhY2hlW3N0cl0gPSBzdHIuc2xpY2UoOCwgLTEpLnRvTG93ZXJDYXNlKCkpO1xufSkoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG5cbmNvbnN0IGtpbmRPZlRlc3QgPSAodHlwZSkgPT4ge1xuICB0eXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gKHRoaW5nKSA9PiBraW5kT2YodGhpbmcpID09PSB0eXBlXG59XG5cbmNvbnN0IHR5cGVPZlRlc3QgPSB0eXBlID0+IHRoaW5nID0+IHR5cGVvZiB0aGluZyA9PT0gdHlwZTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IHtpc0FycmF5fSA9IEFycmF5O1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzVW5kZWZpbmVkID0gdHlwZU9mVGVzdCgndW5kZWZpbmVkJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbCkgJiYgdmFsLmNvbnN0cnVjdG9yICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwuY29uc3RydWN0b3IpXG4gICAgJiYgaXNGdW5jdGlvbih2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIpICYmIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQXJyYXlCdWZmZXIgPSBraW5kT2ZUZXN0KCdBcnJheUJ1ZmZlcicpO1xuXG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgbGV0IHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAoaXNBcnJheUJ1ZmZlcih2YWwuYnVmZmVyKSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1N0cmluZyA9IHR5cGVPZlRlc3QoJ3N0cmluZycpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRnVuY3Rpb24gPSB0eXBlT2ZUZXN0KCdmdW5jdGlvbicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzTnVtYmVyID0gdHlwZU9mVGVzdCgnbnVtYmVyJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzT2JqZWN0ID0gKHRoaW5nKSA9PiB0aGluZyAhPT0gbnVsbCAmJiB0eXBlb2YgdGhpbmcgPT09ICdvYmplY3QnO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQm9vbGVhblxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQm9vbGVhbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQm9vbGVhbiA9IHRoaW5nID0+IHRoaW5nID09PSB0cnVlIHx8IHRoaW5nID09PSBmYWxzZTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1BsYWluT2JqZWN0ID0gKHZhbCkgPT4ge1xuICBpZiAoa2luZE9mKHZhbCkgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgcHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YodmFsKTtcbiAgcmV0dXJuIChwcm90b3R5cGUgPT09IG51bGwgfHwgcHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90b3R5cGUpID09PSBudWxsKSAmJiAhKFN5bWJvbC50b1N0cmluZ1RhZyBpbiB2YWwpICYmICEoU3ltYm9sLml0ZXJhdG9yIGluIHZhbCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0RhdGUgPSBraW5kT2ZUZXN0KCdEYXRlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0ZpbGUgPSBraW5kT2ZUZXN0KCdGaWxlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Jsb2IgPSBraW5kT2ZUZXN0KCdCbG9iJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlTGlzdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGaWxlTGlzdCA9IGtpbmRPZlRlc3QoJ0ZpbGVMaXN0Jyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNTdHJlYW0gPSAodmFsKSA9PiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Zvcm1EYXRhID0gKHRoaW5nKSA9PiB7XG4gIGxldCBraW5kO1xuICByZXR1cm4gdGhpbmcgJiYgKFxuICAgICh0eXBlb2YgRm9ybURhdGEgPT09ICdmdW5jdGlvbicgJiYgdGhpbmcgaW5zdGFuY2VvZiBGb3JtRGF0YSkgfHwgKFxuICAgICAgaXNGdW5jdGlvbih0aGluZy5hcHBlbmQpICYmIChcbiAgICAgICAgKGtpbmQgPSBraW5kT2YodGhpbmcpKSA9PT0gJ2Zvcm1kYXRhJyB8fFxuICAgICAgICAvLyBkZXRlY3QgZm9ybS1kYXRhIGluc3RhbmNlXG4gICAgICAgIChraW5kID09PSAnb2JqZWN0JyAmJiBpc0Z1bmN0aW9uKHRoaW5nLnRvU3RyaW5nKSAmJiB0aGluZy50b1N0cmluZygpID09PSAnW29iamVjdCBGb3JtRGF0YV0nKVxuICAgICAgKVxuICAgIClcbiAgKVxufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNVUkxTZWFyY2hQYXJhbXMgPSBraW5kT2ZUZXN0KCdVUkxTZWFyY2hQYXJhbXMnKTtcblxuY29uc3QgW2lzUmVhZGFibGVTdHJlYW0sIGlzUmVxdWVzdCwgaXNSZXNwb25zZSwgaXNIZWFkZXJzXSA9IFsnUmVhZGFibGVTdHJlYW0nLCAnUmVxdWVzdCcsICdSZXNwb25zZScsICdIZWFkZXJzJ10ubWFwKGtpbmRPZlRlc3QpO1xuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5jb25zdCB0cmltID0gKHN0cikgPT4gc3RyLnRyaW0gP1xuICBzdHIudHJpbSgpIDogc3RyLnJlcGxhY2UoL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLCAnJyk7XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFthbGxPd25LZXlzID0gZmFsc2VdXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4sIHthbGxPd25LZXlzID0gZmFsc2V9ID0ge30pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgaTtcbiAgbGV0IGw7XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGNvbnN0IGtleXMgPSBhbGxPd25LZXlzID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKSA6IE9iamVjdC5rZXlzKG9iaik7XG4gICAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gICAgbGV0IGtleTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZEtleShvYmosIGtleSkge1xuICBrZXkgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gIGxldCBfa2V5O1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIF9rZXkgPSBrZXlzW2ldO1xuICAgIGlmIChrZXkgPT09IF9rZXkudG9Mb3dlckNhc2UoKSkge1xuICAgICAgcmV0dXJuIF9rZXk7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5jb25zdCBfZ2xvYmFsID0gKCgpID0+IHtcbiAgLyplc2xpbnQgbm8tdW5kZWY6MCovXG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGdsb2JhbFRoaXM7XG4gIHJldHVybiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWwpXG59KSgpO1xuXG5jb25zdCBpc0NvbnRleHREZWZpbmVkID0gKGNvbnRleHQpID0+ICFpc1VuZGVmaW5lZChjb250ZXh0KSAmJiBjb250ZXh0ICE9PSBfZ2xvYmFsO1xuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIGNvbnN0IHtjYXNlbGVzc30gPSBpc0NvbnRleHREZWZpbmVkKHRoaXMpICYmIHRoaXMgfHwge307XG4gIGNvbnN0IHJlc3VsdCA9IHt9O1xuICBjb25zdCBhc3NpZ25WYWx1ZSA9ICh2YWwsIGtleSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldEtleSA9IGNhc2VsZXNzICYmIGZpbmRLZXkocmVzdWx0LCBrZXkpIHx8IGtleTtcbiAgICBpZiAoaXNQbGFpbk9iamVjdChyZXN1bHRbdGFyZ2V0S2V5XSkgJiYgaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHJlc3VsdFt0YXJnZXRLZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbC5zbGljZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBhcmd1bWVudHNbaV0gJiYgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBbYWxsT3duS2V5c11cbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuY29uc3QgZXh0ZW5kID0gKGEsIGIsIHRoaXNBcmcsIHthbGxPd25LZXlzfT0ge30pID0+IHtcbiAgZm9yRWFjaChiLCAodmFsLCBrZXkpID0+IHtcbiAgICBpZiAodGhpc0FyZyAmJiBpc0Z1bmN0aW9uKHZhbCkpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSwge2FsbE93bktleXN9KTtcbiAgcmV0dXJuIGE7XG59XG5cbi8qKlxuICogUmVtb3ZlIGJ5dGUgb3JkZXIgbWFya2VyLiBUaGlzIGNhdGNoZXMgRUYgQkIgQkYgKHRoZSBVVEYtOCBCT00pXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgd2l0aCBCT01cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBjb250ZW50IHZhbHVlIHdpdGhvdXQgQk9NXG4gKi9cbmNvbnN0IHN0cmlwQk9NID0gKGNvbnRlbnQpID0+IHtcbiAgaWYgKGNvbnRlbnQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgY29udGVudCA9IGNvbnRlbnQuc2xpY2UoMSk7XG4gIH1cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDb25zdHJ1Y3RvclxuICogQHBhcmFtIHtvYmplY3R9IFtwcm9wc11cbiAqIEBwYXJhbSB7b2JqZWN0fSBbZGVzY3JpcHRvcnNdXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmNvbnN0IGluaGVyaXRzID0gKGNvbnN0cnVjdG9yLCBzdXBlckNvbnN0cnVjdG9yLCBwcm9wcywgZGVzY3JpcHRvcnMpID0+IHtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNvbnN0cnVjdG9yLnByb3RvdHlwZSwgZGVzY3JpcHRvcnMpO1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvcjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnN0cnVjdG9yLCAnc3VwZXInLCB7XG4gICAgdmFsdWU6IHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlXG4gIH0pO1xuICBwcm9wcyAmJiBPYmplY3QuYXNzaWduKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvcHMpO1xufVxuXG4vKipcbiAqIFJlc29sdmUgb2JqZWN0IHdpdGggZGVlcCBwcm90b3R5cGUgY2hhaW4gdG8gYSBmbGF0IG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZU9iaiBzb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gW2Rlc3RPYmpdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufEJvb2xlYW59IFtmaWx0ZXJdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJvcEZpbHRlcl1cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5jb25zdCB0b0ZsYXRPYmplY3QgPSAoc291cmNlT2JqLCBkZXN0T2JqLCBmaWx0ZXIsIHByb3BGaWx0ZXIpID0+IHtcbiAgbGV0IHByb3BzO1xuICBsZXQgaTtcbiAgbGV0IHByb3A7XG4gIGNvbnN0IG1lcmdlZCA9IHt9O1xuXG4gIGRlc3RPYmogPSBkZXN0T2JqIHx8IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCxlcWVxZXFcbiAgaWYgKHNvdXJjZU9iaiA9PSBudWxsKSByZXR1cm4gZGVzdE9iajtcblxuICBkbyB7XG4gICAgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2VPYmopO1xuICAgIGkgPSBwcm9wcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgIHByb3AgPSBwcm9wc1tpXTtcbiAgICAgIGlmICgoIXByb3BGaWx0ZXIgfHwgcHJvcEZpbHRlcihwcm9wLCBzb3VyY2VPYmosIGRlc3RPYmopKSAmJiAhbWVyZ2VkW3Byb3BdKSB7XG4gICAgICAgIGRlc3RPYmpbcHJvcF0gPSBzb3VyY2VPYmpbcHJvcF07XG4gICAgICAgIG1lcmdlZFtwcm9wXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHNvdXJjZU9iaiA9IGZpbHRlciAhPT0gZmFsc2UgJiYgZ2V0UHJvdG90eXBlT2Yoc291cmNlT2JqKTtcbiAgfSB3aGlsZSAoc291cmNlT2JqICYmICghZmlsdGVyIHx8IGZpbHRlcihzb3VyY2VPYmosIGRlc3RPYmopKSAmJiBzb3VyY2VPYmogIT09IE9iamVjdC5wcm90b3R5cGUpO1xuXG4gIHJldHVybiBkZXN0T2JqO1xufVxuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciBhIHN0cmluZyBlbmRzIHdpdGggdGhlIGNoYXJhY3RlcnMgb2YgYSBzcGVjaWZpZWQgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IFtwb3NpdGlvbj0gMF1cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgZW5kc1dpdGggPSAoc3RyLCBzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKSA9PiB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCB8fCBwb3NpdGlvbiA+IHN0ci5sZW5ndGgpIHtcbiAgICBwb3NpdGlvbiA9IHN0ci5sZW5ndGg7XG4gIH1cbiAgcG9zaXRpb24gLT0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbiAgY29uc3QgbGFzdEluZGV4ID0gc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbik7XG4gIHJldHVybiBsYXN0SW5kZXggIT09IC0xICYmIGxhc3RJbmRleCA9PT0gcG9zaXRpb247XG59XG5cblxuLyoqXG4gKiBSZXR1cm5zIG5ldyBhcnJheSBmcm9tIGFycmF5IGxpa2Ugb2JqZWN0IG9yIG51bGwgaWYgZmFpbGVkXG4gKlxuICogQHBhcmFtIHsqfSBbdGhpbmddXG4gKlxuICogQHJldHVybnMgez9BcnJheX1cbiAqL1xuY29uc3QgdG9BcnJheSA9ICh0aGluZykgPT4ge1xuICBpZiAoIXRoaW5nKSByZXR1cm4gbnVsbDtcbiAgaWYgKGlzQXJyYXkodGhpbmcpKSByZXR1cm4gdGhpbmc7XG4gIGxldCBpID0gdGhpbmcubGVuZ3RoO1xuICBpZiAoIWlzTnVtYmVyKGkpKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgYXJyID0gbmV3IEFycmF5KGkpO1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIGFycltpXSA9IHRoaW5nW2ldO1xuICB9XG4gIHJldHVybiBhcnI7XG59XG5cbi8qKlxuICogQ2hlY2tpbmcgaWYgdGhlIFVpbnQ4QXJyYXkgZXhpc3RzIGFuZCBpZiBpdCBkb2VzLCBpdCByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjaGVja3MgaWYgdGhlXG4gKiB0aGluZyBwYXNzZWQgaW4gaXMgYW4gaW5zdGFuY2Ugb2YgVWludDhBcnJheVxuICpcbiAqIEBwYXJhbSB7VHlwZWRBcnJheX1cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5jb25zdCBpc1R5cGVkQXJyYXkgPSAoVHlwZWRBcnJheSA9PiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiB0aGluZyA9PiB7XG4gICAgcmV0dXJuIFR5cGVkQXJyYXkgJiYgdGhpbmcgaW5zdGFuY2VvZiBUeXBlZEFycmF5O1xuICB9O1xufSkodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIGdldFByb3RvdHlwZU9mKFVpbnQ4QXJyYXkpKTtcblxuLyoqXG4gKiBGb3IgZWFjaCBlbnRyeSBpbiB0aGUgb2JqZWN0LCBjYWxsIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBrZXkgYW5kIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PGFueSwgYW55Pn0gb2JqIC0gVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGVudHJ5LlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5jb25zdCBmb3JFYWNoRW50cnkgPSAob2JqLCBmbikgPT4ge1xuICBjb25zdCBnZW5lcmF0b3IgPSBvYmogJiYgb2JqW1N5bWJvbC5pdGVyYXRvcl07XG5cbiAgY29uc3QgaXRlcmF0b3IgPSBnZW5lcmF0b3IuY2FsbChvYmopO1xuXG4gIGxldCByZXN1bHQ7XG5cbiAgd2hpbGUgKChyZXN1bHQgPSBpdGVyYXRvci5uZXh0KCkpICYmICFyZXN1bHQuZG9uZSkge1xuICAgIGNvbnN0IHBhaXIgPSByZXN1bHQudmFsdWU7XG4gICAgZm4uY2FsbChvYmosIHBhaXJbMF0sIHBhaXJbMV0pO1xuICB9XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSByZWd1bGFyIGV4cHJlc3Npb24gYW5kIGEgc3RyaW5nLCBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBhbGwgdGhlIG1hdGNoZXNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVnRXhwIC0gVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCBhZ2FpbnN0LlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gc2VhcmNoLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheTxib29sZWFuPn1cbiAqL1xuY29uc3QgbWF0Y2hBbGwgPSAocmVnRXhwLCBzdHIpID0+IHtcbiAgbGV0IG1hdGNoZXM7XG4gIGNvbnN0IGFyciA9IFtdO1xuXG4gIHdoaWxlICgobWF0Y2hlcyA9IHJlZ0V4cC5leGVjKHN0cikpICE9PSBudWxsKSB7XG4gICAgYXJyLnB1c2gobWF0Y2hlcyk7XG4gIH1cblxuICByZXR1cm4gYXJyO1xufVxuXG4vKiBDaGVja2luZyBpZiB0aGUga2luZE9mVGVzdCBmdW5jdGlvbiByZXR1cm5zIHRydWUgd2hlbiBwYXNzZWQgYW4gSFRNTEZvcm1FbGVtZW50LiAqL1xuY29uc3QgaXNIVE1MRm9ybSA9IGtpbmRPZlRlc3QoJ0hUTUxGb3JtRWxlbWVudCcpO1xuXG5jb25zdCB0b0NhbWVsQ2FzZSA9IHN0ciA9PiB7XG4gIHJldHVybiBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bLV9cXHNdKFthLXpcXGRdKShcXHcqKS9nLFxuICAgIGZ1bmN0aW9uIHJlcGxhY2VyKG0sIHAxLCBwMikge1xuICAgICAgcmV0dXJuIHAxLnRvVXBwZXJDYXNlKCkgKyBwMjtcbiAgICB9XG4gICk7XG59O1xuXG4vKiBDcmVhdGluZyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBjaGVjayBpZiBhbiBvYmplY3QgaGFzIGEgcHJvcGVydHkuICovXG5jb25zdCBoYXNPd25Qcm9wZXJ0eSA9ICgoe2hhc093blByb3BlcnR5fSkgPT4gKG9iaiwgcHJvcCkgPT4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKShPYmplY3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUmVnRXhwID0ga2luZE9mVGVzdCgnUmVnRXhwJyk7XG5cbmNvbnN0IHJlZHVjZURlc2NyaXB0b3JzID0gKG9iaiwgcmVkdWNlcikgPT4ge1xuICBjb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9iaik7XG4gIGNvbnN0IHJlZHVjZWREZXNjcmlwdG9ycyA9IHt9O1xuXG4gIGZvckVhY2goZGVzY3JpcHRvcnMsIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgbGV0IHJldDtcbiAgICBpZiAoKHJldCA9IHJlZHVjZXIoZGVzY3JpcHRvciwgbmFtZSwgb2JqKSkgIT09IGZhbHNlKSB7XG4gICAgICByZWR1Y2VkRGVzY3JpcHRvcnNbbmFtZV0gPSByZXQgfHwgZGVzY3JpcHRvcjtcbiAgICB9XG4gIH0pO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG9iaiwgcmVkdWNlZERlc2NyaXB0b3JzKTtcbn1cblxuLyoqXG4gKiBNYWtlcyBhbGwgbWV0aG9kcyByZWFkLW9ubHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqL1xuXG5jb25zdCBmcmVlemVNZXRob2RzID0gKG9iaikgPT4ge1xuICByZWR1Y2VEZXNjcmlwdG9ycyhvYmosIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgLy8gc2tpcCByZXN0cmljdGVkIHByb3BzIGluIHN0cmljdCBtb2RlXG4gICAgaWYgKGlzRnVuY3Rpb24ob2JqKSAmJiBbJ2FyZ3VtZW50cycsICdjYWxsZXInLCAnY2FsbGVlJ10uaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9IG9ialtuYW1lXTtcblxuICAgIGlmICghaXNGdW5jdGlvbih2YWx1ZSkpIHJldHVybjtcblxuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGZhbHNlO1xuXG4gICAgaWYgKCd3cml0YWJsZScgaW4gZGVzY3JpcHRvcikge1xuICAgICAgZGVzY3JpcHRvci53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghZGVzY3JpcHRvci5zZXQpIHtcbiAgICAgIGRlc2NyaXB0b3Iuc2V0ID0gKCkgPT4ge1xuICAgICAgICB0aHJvdyBFcnJvcignQ2FuIG5vdCByZXdyaXRlIHJlYWQtb25seSBtZXRob2QgXFwnJyArIG5hbWUgKyAnXFwnJyk7XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG59XG5cbmNvbnN0IHRvT2JqZWN0U2V0ID0gKGFycmF5T3JTdHJpbmcsIGRlbGltaXRlcikgPT4ge1xuICBjb25zdCBvYmogPSB7fTtcblxuICBjb25zdCBkZWZpbmUgPSAoYXJyKSA9PiB7XG4gICAgYXJyLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgb2JqW3ZhbHVlXSA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICBpc0FycmF5KGFycmF5T3JTdHJpbmcpID8gZGVmaW5lKGFycmF5T3JTdHJpbmcpIDogZGVmaW5lKFN0cmluZyhhcnJheU9yU3RyaW5nKS5zcGxpdChkZWxpbWl0ZXIpKTtcblxuICByZXR1cm4gb2JqO1xufVxuXG5jb25zdCBub29wID0gKCkgPT4ge31cblxuY29uc3QgdG9GaW5pdGVOdW1iZXIgPSAodmFsdWUsIGRlZmF1bHRWYWx1ZSkgPT4ge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUgPSArdmFsdWUpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWU7XG59XG5cbmNvbnN0IEFMUEhBID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6J1xuXG5jb25zdCBESUdJVCA9ICcwMTIzNDU2Nzg5JztcblxuY29uc3QgQUxQSEFCRVQgPSB7XG4gIERJR0lULFxuICBBTFBIQSxcbiAgQUxQSEFfRElHSVQ6IEFMUEhBICsgQUxQSEEudG9VcHBlckNhc2UoKSArIERJR0lUXG59XG5cbmNvbnN0IGdlbmVyYXRlU3RyaW5nID0gKHNpemUgPSAxNiwgYWxwaGFiZXQgPSBBTFBIQUJFVC5BTFBIQV9ESUdJVCkgPT4ge1xuICBsZXQgc3RyID0gJyc7XG4gIGNvbnN0IHtsZW5ndGh9ID0gYWxwaGFiZXQ7XG4gIHdoaWxlIChzaXplLS0pIHtcbiAgICBzdHIgKz0gYWxwaGFiZXRbTWF0aC5yYW5kb20oKSAqIGxlbmd0aHwwXVxuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn1cblxuLyoqXG4gKiBJZiB0aGUgdGhpbmcgaXMgYSBGb3JtRGF0YSBvYmplY3QsIHJldHVybiB0cnVlLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gdGhpbmcgLSBUaGUgdGhpbmcgdG8gY2hlY2suXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzU3BlY0NvbXBsaWFudEZvcm0odGhpbmcpIHtcbiAgcmV0dXJuICEhKHRoaW5nICYmIGlzRnVuY3Rpb24odGhpbmcuYXBwZW5kKSAmJiB0aGluZ1tTeW1ib2wudG9TdHJpbmdUYWddID09PSAnRm9ybURhdGEnICYmIHRoaW5nW1N5bWJvbC5pdGVyYXRvcl0pO1xufVxuXG5jb25zdCB0b0pTT05PYmplY3QgPSAob2JqKSA9PiB7XG4gIGNvbnN0IHN0YWNrID0gbmV3IEFycmF5KDEwKTtcblxuICBjb25zdCB2aXNpdCA9IChzb3VyY2UsIGkpID0+IHtcblxuICAgIGlmIChpc09iamVjdChzb3VyY2UpKSB7XG4gICAgICBpZiAoc3RhY2suaW5kZXhPZihzb3VyY2UpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZighKCd0b0pTT04nIGluIHNvdXJjZSkpIHtcbiAgICAgICAgc3RhY2tbaV0gPSBzb3VyY2U7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGlzQXJyYXkoc291cmNlKSA/IFtdIDoge307XG5cbiAgICAgICAgZm9yRWFjaChzb3VyY2UsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVkdWNlZFZhbHVlID0gdmlzaXQodmFsdWUsIGkgKyAxKTtcbiAgICAgICAgICAhaXNVbmRlZmluZWQocmVkdWNlZFZhbHVlKSAmJiAodGFyZ2V0W2tleV0gPSByZWR1Y2VkVmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzdGFja1tpXSA9IHVuZGVmaW5lZDtcblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICByZXR1cm4gdmlzaXQob2JqLCAwKTtcbn1cblxuY29uc3QgaXNBc3luY0ZuID0ga2luZE9mVGVzdCgnQXN5bmNGdW5jdGlvbicpO1xuXG5jb25zdCBpc1RoZW5hYmxlID0gKHRoaW5nKSA9PlxuICB0aGluZyAmJiAoaXNPYmplY3QodGhpbmcpIHx8IGlzRnVuY3Rpb24odGhpbmcpKSAmJiBpc0Z1bmN0aW9uKHRoaW5nLnRoZW4pICYmIGlzRnVuY3Rpb24odGhpbmcuY2F0Y2gpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmcsXG4gIGlzTnVtYmVyLFxuICBpc0Jvb2xlYW4sXG4gIGlzT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0LFxuICBpc1JlYWRhYmxlU3RyZWFtLFxuICBpc1JlcXVlc3QsXG4gIGlzUmVzcG9uc2UsXG4gIGlzSGVhZGVycyxcbiAgaXNVbmRlZmluZWQsXG4gIGlzRGF0ZSxcbiAgaXNGaWxlLFxuICBpc0Jsb2IsXG4gIGlzUmVnRXhwLFxuICBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzVHlwZWRBcnJheSxcbiAgaXNGaWxlTGlzdCxcbiAgZm9yRWFjaCxcbiAgbWVyZ2UsXG4gIGV4dGVuZCxcbiAgdHJpbSxcbiAgc3RyaXBCT00sXG4gIGluaGVyaXRzLFxuICB0b0ZsYXRPYmplY3QsXG4gIGtpbmRPZixcbiAga2luZE9mVGVzdCxcbiAgZW5kc1dpdGgsXG4gIHRvQXJyYXksXG4gIGZvckVhY2hFbnRyeSxcbiAgbWF0Y2hBbGwsXG4gIGlzSFRNTEZvcm0sXG4gIGhhc093blByb3BlcnR5LFxuICBoYXNPd25Qcm9wOiBoYXNPd25Qcm9wZXJ0eSwgLy8gYW4gYWxpYXMgdG8gYXZvaWQgRVNMaW50IG5vLXByb3RvdHlwZS1idWlsdGlucyBkZXRlY3Rpb25cbiAgcmVkdWNlRGVzY3JpcHRvcnMsXG4gIGZyZWV6ZU1ldGhvZHMsXG4gIHRvT2JqZWN0U2V0LFxuICB0b0NhbWVsQ2FzZSxcbiAgbm9vcCxcbiAgdG9GaW5pdGVOdW1iZXIsXG4gIGZpbmRLZXksXG4gIGdsb2JhbDogX2dsb2JhbCxcbiAgaXNDb250ZXh0RGVmaW5lZCxcbiAgQUxQSEFCRVQsXG4gIGdlbmVyYXRlU3RyaW5nLFxuICBpc1NwZWNDb21wbGlhbnRGb3JtLFxuICB0b0pTT05PYmplY3QsXG4gIGlzQXN5bmNGbixcbiAgaXNUaGVuYWJsZVxufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnXSBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5mdW5jdGlvbiBBeGlvc0Vycm9yKG1lc3NhZ2UsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgRXJyb3IuY2FsbCh0aGlzKTtcblxuICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnN0YWNrID0gKG5ldyBFcnJvcigpKS5zdGFjaztcbiAgfVxuXG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIHRoaXMubmFtZSA9ICdBeGlvc0Vycm9yJztcbiAgY29kZSAmJiAodGhpcy5jb2RlID0gY29kZSk7XG4gIGNvbmZpZyAmJiAodGhpcy5jb25maWcgPSBjb25maWcpO1xuICByZXF1ZXN0ICYmICh0aGlzLnJlcXVlc3QgPSByZXF1ZXN0KTtcbiAgcmVzcG9uc2UgJiYgKHRoaXMucmVzcG9uc2UgPSByZXNwb25zZSk7XG59XG5cbnV0aWxzLmluaGVyaXRzKEF4aW9zRXJyb3IsIEVycm9yLCB7XG4gIHRvSlNPTjogZnVuY3Rpb24gdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBTdGFuZGFyZFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgLy8gTWljcm9zb2Z0XG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIG51bWJlcjogdGhpcy5udW1iZXIsXG4gICAgICAvLyBNb3ppbGxhXG4gICAgICBmaWxlTmFtZTogdGhpcy5maWxlTmFtZSxcbiAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXG4gICAgICBzdGFjazogdGhpcy5zdGFjayxcbiAgICAgIC8vIEF4aW9zXG4gICAgICBjb25maWc6IHV0aWxzLnRvSlNPTk9iamVjdCh0aGlzLmNvbmZpZyksXG4gICAgICBjb2RlOiB0aGlzLmNvZGUsXG4gICAgICBzdGF0dXM6IHRoaXMucmVzcG9uc2UgJiYgdGhpcy5yZXNwb25zZS5zdGF0dXMgPyB0aGlzLnJlc3BvbnNlLnN0YXR1cyA6IG51bGxcbiAgICB9O1xuICB9XG59KTtcblxuY29uc3QgcHJvdG90eXBlID0gQXhpb3NFcnJvci5wcm90b3R5cGU7XG5jb25zdCBkZXNjcmlwdG9ycyA9IHt9O1xuXG5bXG4gICdFUlJfQkFEX09QVElPTl9WQUxVRScsXG4gICdFUlJfQkFEX09QVElPTicsXG4gICdFQ09OTkFCT1JURUQnLFxuICAnRVRJTUVET1VUJyxcbiAgJ0VSUl9ORVRXT1JLJyxcbiAgJ0VSUl9GUl9UT09fTUFOWV9SRURJUkVDVFMnLFxuICAnRVJSX0RFUFJFQ0FURUQnLFxuICAnRVJSX0JBRF9SRVNQT05TRScsXG4gICdFUlJfQkFEX1JFUVVFU1QnLFxuICAnRVJSX0NBTkNFTEVEJyxcbiAgJ0VSUl9OT1RfU1VQUE9SVCcsXG4gICdFUlJfSU5WQUxJRF9VUkwnXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXS5mb3JFYWNoKGNvZGUgPT4ge1xuICBkZXNjcmlwdG9yc1tjb2RlXSA9IHt2YWx1ZTogY29kZX07XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQXhpb3NFcnJvciwgZGVzY3JpcHRvcnMpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvdHlwZSwgJ2lzQXhpb3NFcnJvcicsIHt2YWx1ZTogdHJ1ZX0pO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuQXhpb3NFcnJvci5mcm9tID0gKGVycm9yLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlLCBjdXN0b21Qcm9wcykgPT4ge1xuICBjb25zdCBheGlvc0Vycm9yID0gT2JqZWN0LmNyZWF0ZShwcm90b3R5cGUpO1xuXG4gIHV0aWxzLnRvRmxhdE9iamVjdChlcnJvciwgYXhpb3NFcnJvciwgZnVuY3Rpb24gZmlsdGVyKG9iaikge1xuICAgIHJldHVybiBvYmogIT09IEVycm9yLnByb3RvdHlwZTtcbiAgfSwgcHJvcCA9PiB7XG4gICAgcmV0dXJuIHByb3AgIT09ICdpc0F4aW9zRXJyb3InO1xuICB9KTtcblxuICBBeGlvc0Vycm9yLmNhbGwoYXhpb3NFcnJvciwgZXJyb3IubWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSk7XG5cbiAgYXhpb3NFcnJvci5jYXVzZSA9IGVycm9yO1xuXG4gIGF4aW9zRXJyb3IubmFtZSA9IGVycm9yLm5hbWU7XG5cbiAgY3VzdG9tUHJvcHMgJiYgT2JqZWN0LmFzc2lnbihheGlvc0Vycm9yLCBjdXN0b21Qcm9wcyk7XG5cbiAgcmV0dXJuIGF4aW9zRXJyb3I7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc0Vycm9yO1xuIiwgIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBzdHJpY3RcbmV4cG9ydCBkZWZhdWx0IG51bGw7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbi8vIHRlbXBvcmFyeSBob3RmaXggdG8gYXZvaWQgY2lyY3VsYXIgcmVmZXJlbmNlcyB1bnRpbCBBeGlvc1VSTFNlYXJjaFBhcmFtcyBpcyByZWZhY3RvcmVkXG5pbXBvcnQgUGxhdGZvcm1Gb3JtRGF0YSBmcm9tICcuLi9wbGF0Zm9ybS9ub2RlL2NsYXNzZXMvRm9ybURhdGEuanMnO1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgdGhlIGdpdmVuIHRoaW5nIGlzIGEgYXJyYXkgb3IganMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aGluZyAtIFRoZSBvYmplY3Qgb3IgYXJyYXkgdG8gYmUgdmlzaXRlZC5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNWaXNpdGFibGUodGhpbmcpIHtcbiAgcmV0dXJuIHV0aWxzLmlzUGxhaW5PYmplY3QodGhpbmcpIHx8IHV0aWxzLmlzQXJyYXkodGhpbmcpO1xufVxuXG4vKipcbiAqIEl0IHJlbW92ZXMgdGhlIGJyYWNrZXRzIGZyb20gdGhlIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IG9mIHRoZSBwYXJhbWV0ZXIuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gdGhlIGtleSB3aXRob3V0IHRoZSBicmFja2V0cy5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlQnJhY2tldHMoa2V5KSB7XG4gIHJldHVybiB1dGlscy5lbmRzV2l0aChrZXksICdbXScpID8ga2V5LnNsaWNlKDAsIC0yKSA6IGtleTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHBhdGgsIGEga2V5LCBhbmQgYSBib29sZWFuLCBhbmQgcmV0dXJucyBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gVGhlIHBhdGggdG8gdGhlIGN1cnJlbnQga2V5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSBrZXkgb2YgdGhlIGN1cnJlbnQgb2JqZWN0IGJlaW5nIGl0ZXJhdGVkIG92ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gZG90cyAtIElmIHRydWUsIHRoZSBrZXkgd2lsbCBiZSByZW5kZXJlZCB3aXRoIGRvdHMgaW5zdGVhZCBvZiBicmFja2V0cy5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgY3VycmVudCBrZXkuXG4gKi9cbmZ1bmN0aW9uIHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpIHtcbiAgaWYgKCFwYXRoKSByZXR1cm4ga2V5O1xuICByZXR1cm4gcGF0aC5jb25jYXQoa2V5KS5tYXAoZnVuY3Rpb24gZWFjaCh0b2tlbiwgaSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIHRva2VuID0gcmVtb3ZlQnJhY2tldHModG9rZW4pO1xuICAgIHJldHVybiAhZG90cyAmJiBpID8gJ1snICsgdG9rZW4gKyAnXScgOiB0b2tlbjtcbiAgfSkuam9pbihkb3RzID8gJy4nIDogJycpO1xufVxuXG4vKipcbiAqIElmIHRoZSBhcnJheSBpcyBhbiBhcnJheSBhbmQgbm9uZSBvZiBpdHMgZWxlbWVudHMgYXJlIHZpc2l0YWJsZSwgdGhlbiBpdCdzIGEgZmxhdCBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PGFueT59IGFyciAtIFRoZSBhcnJheSB0byBjaGVja1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0ZsYXRBcnJheShhcnIpIHtcbiAgcmV0dXJuIHV0aWxzLmlzQXJyYXkoYXJyKSAmJiAhYXJyLnNvbWUoaXNWaXNpdGFibGUpO1xufVxuXG5jb25zdCBwcmVkaWNhdGVzID0gdXRpbHMudG9GbGF0T2JqZWN0KHV0aWxzLCB7fSwgbnVsbCwgZnVuY3Rpb24gZmlsdGVyKHByb3ApIHtcbiAgcmV0dXJuIC9eaXNbQS1aXS8udGVzdChwcm9wKTtcbn0pO1xuXG4vKipcbiAqIENvbnZlcnQgYSBkYXRhIG9iamVjdCB0byBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7P09iamVjdH0gW2Zvcm1EYXRhXVxuICogQHBhcmFtIHs/T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnZpc2l0b3JdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm1ldGFUb2tlbnMgPSB0cnVlXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5kb3RzID0gZmFsc2VdXG4gKiBAcGFyYW0gez9Cb29sZWFufSBbb3B0aW9ucy5pbmRleGVzID0gZmFsc2VdXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqKi9cblxuLyoqXG4gKiBJdCBjb252ZXJ0cyBhbiBvYmplY3QgaW50byBhIEZvcm1EYXRhIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PGFueSwgYW55Pn0gb2JqIC0gVGhlIG9iamVjdCB0byBjb252ZXJ0IHRvIGZvcm0gZGF0YS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtRGF0YSAtIFRoZSBGb3JtRGF0YSBvYmplY3QgdG8gYXBwZW5kIHRvLlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBvcHRpb25zXG4gKlxuICogQHJldHVybnNcbiAqL1xuZnVuY3Rpb24gdG9Gb3JtRGF0YShvYmosIGZvcm1EYXRhLCBvcHRpb25zKSB7XG4gIGlmICghdXRpbHMuaXNPYmplY3Qob2JqKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RhcmdldCBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGZvcm1EYXRhID0gZm9ybURhdGEgfHwgbmV3IChQbGF0Zm9ybUZvcm1EYXRhIHx8IEZvcm1EYXRhKSgpO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBvcHRpb25zID0gdXRpbHMudG9GbGF0T2JqZWN0KG9wdGlvbnMsIHtcbiAgICBtZXRhVG9rZW5zOiB0cnVlLFxuICAgIGRvdHM6IGZhbHNlLFxuICAgIGluZGV4ZXM6IGZhbHNlXG4gIH0sIGZhbHNlLCBmdW5jdGlvbiBkZWZpbmVkKG9wdGlvbiwgc291cmNlKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVxLW51bGwsZXFlcWVxXG4gICAgcmV0dXJuICF1dGlscy5pc1VuZGVmaW5lZChzb3VyY2Vbb3B0aW9uXSk7XG4gIH0pO1xuXG4gIGNvbnN0IG1ldGFUb2tlbnMgPSBvcHRpb25zLm1ldGFUb2tlbnM7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuICBjb25zdCB2aXNpdG9yID0gb3B0aW9ucy52aXNpdG9yIHx8IGRlZmF1bHRWaXNpdG9yO1xuICBjb25zdCBkb3RzID0gb3B0aW9ucy5kb3RzO1xuICBjb25zdCBpbmRleGVzID0gb3B0aW9ucy5pbmRleGVzO1xuICBjb25zdCBfQmxvYiA9IG9wdGlvbnMuQmxvYiB8fCB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgQmxvYjtcbiAgY29uc3QgdXNlQmxvYiA9IF9CbG9iICYmIHV0aWxzLmlzU3BlY0NvbXBsaWFudEZvcm0oZm9ybURhdGEpO1xuXG4gIGlmICghdXRpbHMuaXNGdW5jdGlvbih2aXNpdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3Zpc2l0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICBmdW5jdGlvbiBjb252ZXJ0VmFsdWUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHJldHVybiAnJztcblxuICAgIGlmICh1dGlscy5pc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9JU09TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAoIXVzZUJsb2IgJiYgdXRpbHMuaXNCbG9iKHZhbHVlKSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ0Jsb2IgaXMgbm90IHN1cHBvcnRlZC4gVXNlIGEgQnVmZmVyIGluc3RlYWQuJyk7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXIodmFsdWUpIHx8IHV0aWxzLmlzVHlwZWRBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB1c2VCbG9iICYmIHR5cGVvZiBCbG9iID09PSAnZnVuY3Rpb24nID8gbmV3IEJsb2IoW3ZhbHVlXSkgOiBCdWZmZXIuZnJvbSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmlzaXRvci5cbiAgICpcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IGtleVxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZ3xOdW1iZXI+fSBwYXRoXG4gICAqIEB0aGlzIHtGb3JtRGF0YX1cbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHJldHVybiB0cnVlIHRvIHZpc2l0IHRoZSBlYWNoIHByb3Agb2YgdGhlIHZhbHVlIHJlY3Vyc2l2ZWx5XG4gICAqL1xuICBmdW5jdGlvbiBkZWZhdWx0VmlzaXRvcih2YWx1ZSwga2V5LCBwYXRoKSB7XG4gICAgbGV0IGFyciA9IHZhbHVlO1xuXG4gICAgaWYgKHZhbHVlICYmICFwYXRoICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICh1dGlscy5lbmRzV2l0aChrZXksICd7fScpKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBrZXkgPSBtZXRhVG9rZW5zID8ga2V5IDoga2V5LnNsaWNlKDAsIC0yKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgKHV0aWxzLmlzQXJyYXkodmFsdWUpICYmIGlzRmxhdEFycmF5KHZhbHVlKSkgfHxcbiAgICAgICAgKCh1dGlscy5pc0ZpbGVMaXN0KHZhbHVlKSB8fCB1dGlscy5lbmRzV2l0aChrZXksICdbXScpKSAmJiAoYXJyID0gdXRpbHMudG9BcnJheSh2YWx1ZSkpXG4gICAgICAgICkpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGtleSA9IHJlbW92ZUJyYWNrZXRzKGtleSk7XG5cbiAgICAgICAgYXJyLmZvckVhY2goZnVuY3Rpb24gZWFjaChlbCwgaW5kZXgpIHtcbiAgICAgICAgICAhKHV0aWxzLmlzVW5kZWZpbmVkKGVsKSB8fCBlbCA9PT0gbnVsbCkgJiYgZm9ybURhdGEuYXBwZW5kKFxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5lc3RlZC10ZXJuYXJ5XG4gICAgICAgICAgICBpbmRleGVzID09PSB0cnVlID8gcmVuZGVyS2V5KFtrZXldLCBpbmRleCwgZG90cykgOiAoaW5kZXhlcyA9PT0gbnVsbCA/IGtleSA6IGtleSArICdbXScpLFxuICAgICAgICAgICAgY29udmVydFZhbHVlKGVsKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzVmlzaXRhYmxlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZm9ybURhdGEuYXBwZW5kKHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpLCBjb252ZXJ0VmFsdWUodmFsdWUpKTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHN0YWNrID0gW107XG5cbiAgY29uc3QgZXhwb3NlZEhlbHBlcnMgPSBPYmplY3QuYXNzaWduKHByZWRpY2F0ZXMsIHtcbiAgICBkZWZhdWx0VmlzaXRvcixcbiAgICBjb252ZXJ0VmFsdWUsXG4gICAgaXNWaXNpdGFibGVcbiAgfSk7XG5cbiAgZnVuY3Rpb24gYnVpbGQodmFsdWUsIHBhdGgpIHtcbiAgICBpZiAodXRpbHMuaXNVbmRlZmluZWQodmFsdWUpKSByZXR1cm47XG5cbiAgICBpZiAoc3RhY2suaW5kZXhPZih2YWx1ZSkgIT09IC0xKSB7XG4gICAgICB0aHJvdyBFcnJvcignQ2lyY3VsYXIgcmVmZXJlbmNlIGRldGVjdGVkIGluICcgKyBwYXRoLmpvaW4oJy4nKSk7XG4gICAgfVxuXG4gICAgc3RhY2sucHVzaCh2YWx1ZSk7XG5cbiAgICB1dGlscy5mb3JFYWNoKHZhbHVlLCBmdW5jdGlvbiBlYWNoKGVsLCBrZXkpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9ICEodXRpbHMuaXNVbmRlZmluZWQoZWwpIHx8IGVsID09PSBudWxsKSAmJiB2aXNpdG9yLmNhbGwoXG4gICAgICAgIGZvcm1EYXRhLCBlbCwgdXRpbHMuaXNTdHJpbmcoa2V5KSA/IGtleS50cmltKCkgOiBrZXksIHBhdGgsIGV4cG9zZWRIZWxwZXJzXG4gICAgICApO1xuXG4gICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICAgIGJ1aWxkKGVsLCBwYXRoID8gcGF0aC5jb25jYXQoa2V5KSA6IFtrZXldKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHN0YWNrLnBvcCgpO1xuICB9XG5cbiAgaWYgKCF1dGlscy5pc09iamVjdChvYmopKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZGF0YSBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICB9XG5cbiAgYnVpbGQob2JqKTtcblxuICByZXR1cm4gZm9ybURhdGE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRvRm9ybURhdGE7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdG9Gb3JtRGF0YSBmcm9tICcuL3RvRm9ybURhdGEuanMnO1xuXG4vKipcbiAqIEl0IGVuY29kZXMgYSBzdHJpbmcgYnkgcmVwbGFjaW5nIGFsbCBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBpbiB0aGUgdW5yZXNlcnZlZCBzZXQgd2l0aFxuICogdGhlaXIgcGVyY2VudC1lbmNvZGVkIGVxdWl2YWxlbnRzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gZW5jb2RlLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBlbmNvZGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gZW5jb2RlKHN0cikge1xuICBjb25zdCBjaGFyTWFwID0ge1xuICAgICchJzogJyUyMScsXG4gICAgXCInXCI6ICclMjcnLFxuICAgICcoJzogJyUyOCcsXG4gICAgJyknOiAnJTI5JyxcbiAgICAnfic6ICclN0UnLFxuICAgICclMjAnOiAnKycsXG4gICAgJyUwMCc6ICdcXHgwMCdcbiAgfTtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoL1shJygpfl18JTIwfCUwMC9nLCBmdW5jdGlvbiByZXBsYWNlcihtYXRjaCkge1xuICAgIHJldHVybiBjaGFyTWFwW21hdGNoXTtcbiAgfSk7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBwYXJhbXMgb2JqZWN0IGFuZCBjb252ZXJ0cyBpdCB0byBhIEZvcm1EYXRhIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gcGFyYW1zIC0gVGhlIHBhcmFtZXRlcnMgdG8gYmUgY29udmVydGVkIHRvIGEgRm9ybURhdGEgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgb2JqZWN0IHBhc3NlZCB0byB0aGUgQXhpb3MgY29uc3RydWN0b3IuXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIEF4aW9zVVJMU2VhcmNoUGFyYW1zKHBhcmFtcywgb3B0aW9ucykge1xuICB0aGlzLl9wYWlycyA9IFtdO1xuXG4gIHBhcmFtcyAmJiB0b0Zvcm1EYXRhKHBhcmFtcywgdGhpcywgb3B0aW9ucyk7XG59XG5cbmNvbnN0IHByb3RvdHlwZSA9IEF4aW9zVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZTtcblxucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uIGFwcGVuZChuYW1lLCB2YWx1ZSkge1xuICB0aGlzLl9wYWlycy5wdXNoKFtuYW1lLCB2YWx1ZV0pO1xufTtcblxucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoZW5jb2Rlcikge1xuICBjb25zdCBfZW5jb2RlID0gZW5jb2RlciA/IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGVuY29kZXIuY2FsbCh0aGlzLCB2YWx1ZSwgZW5jb2RlKTtcbiAgfSA6IGVuY29kZTtcblxuICByZXR1cm4gdGhpcy5fcGFpcnMubWFwKGZ1bmN0aW9uIGVhY2gocGFpcikge1xuICAgIHJldHVybiBfZW5jb2RlKHBhaXJbMF0pICsgJz0nICsgX2VuY29kZShwYWlyWzFdKTtcbiAgfSwgJycpLmpvaW4oJyYnKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEF4aW9zVVJMU2VhcmNoUGFyYW1zO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc1VSTFNlYXJjaFBhcmFtcyBmcm9tICcuLi9oZWxwZXJzL0F4aW9zVVJMU2VhcmNoUGFyYW1zLmpzJztcblxuLyoqXG4gKiBJdCByZXBsYWNlcyBhbGwgaW5zdGFuY2VzIG9mIHRoZSBjaGFyYWN0ZXJzIGA6YCwgYCRgLCBgLGAsIGArYCwgYFtgLCBhbmQgYF1gIHdpdGggdGhlaXJcbiAqIFVSSSBlbmNvZGVkIGNvdW50ZXJwYXJ0c1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWwgVGhlIHZhbHVlIHRvIGJlIGVuY29kZWQuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGVuY29kZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcGFyYW0gez9vYmplY3R9IG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgb3B0aW9ucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIFxuICBjb25zdCBfZW5jb2RlID0gb3B0aW9ucyAmJiBvcHRpb25zLmVuY29kZSB8fCBlbmNvZGU7XG5cbiAgY29uc3Qgc2VyaWFsaXplRm4gPSBvcHRpb25zICYmIG9wdGlvbnMuc2VyaWFsaXplO1xuXG4gIGxldCBzZXJpYWxpemVkUGFyYW1zO1xuXG4gIGlmIChzZXJpYWxpemVGbikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBzZXJpYWxpemVGbihwYXJhbXMsIG9wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSB1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpID9cbiAgICAgIHBhcmFtcy50b1N0cmluZygpIDpcbiAgICAgIG5ldyBBeGlvc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMsIG9wdGlvbnMpLnRvU3RyaW5nKF9lbmNvZGUpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICBjb25zdCBoYXNobWFya0luZGV4ID0gdXJsLmluZGV4T2YoXCIjXCIpO1xuXG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XG4gICAgfVxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5cbmNsYXNzIEludGVyY2VwdG9yTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICAgKi9cbiAgdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgICAgZnVsZmlsbGVkLFxuICAgICAgcmVqZWN0ZWQsXG4gICAgICBzeW5jaHJvbm91czogb3B0aW9ucyA/IG9wdGlvbnMuc3luY2hyb25vdXMgOiBmYWxzZSxcbiAgICAgIHJ1bldoZW46IG9wdGlvbnMgPyBvcHRpb25zLnJ1bldoZW4gOiBudWxsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBpbnRlcmNlcHRvciB3YXMgcmVtb3ZlZCwgYGZhbHNlYCBvdGhlcndpc2VcbiAgICovXG4gIGVqZWN0KGlkKSB7XG4gICAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFsbCBpbnRlcmNlcHRvcnMgZnJvbSB0aGUgc3RhY2tcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBjbGVhcigpIHtcbiAgICBpZiAodGhpcy5oYW5kbGVycykge1xuICAgICAgdGhpcy5oYW5kbGVycyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICAgKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBmb3JFYWNoKGZuKSB7XG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgICBmbihoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHNpbGVudEpTT05QYXJzaW5nOiB0cnVlLFxuICBmb3JjZWRKU09OUGFyc2luZzogdHJ1ZSxcbiAgY2xhcmlmeVRpbWVvdXRFcnJvcjogZmFsc2Vcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXhpb3NVUkxTZWFyY2hQYXJhbXMgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9BeGlvc1VSTFNlYXJjaFBhcmFtcy5qcyc7XG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyA/IFVSTFNlYXJjaFBhcmFtcyA6IEF4aW9zVVJMU2VhcmNoUGFyYW1zO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJyA/IEZvcm1EYXRhIDogbnVsbDtcbiIsICIndXNlIHN0cmljdCdcblxuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnID8gQmxvYiA6IG51bGxcbiIsICJpbXBvcnQgVVJMU2VhcmNoUGFyYW1zIGZyb20gJy4vY2xhc3Nlcy9VUkxTZWFyY2hQYXJhbXMuanMnXG5pbXBvcnQgRm9ybURhdGEgZnJvbSAnLi9jbGFzc2VzL0Zvcm1EYXRhLmpzJ1xuaW1wb3J0IEJsb2IgZnJvbSAnLi9jbGFzc2VzL0Jsb2IuanMnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaXNCcm93c2VyOiB0cnVlLFxuICBjbGFzc2VzOiB7XG4gICAgVVJMU2VhcmNoUGFyYW1zLFxuICAgIEZvcm1EYXRhLFxuICAgIEJsb2JcbiAgfSxcbiAgcHJvdG9jb2xzOiBbJ2h0dHAnLCAnaHR0cHMnLCAnZmlsZScsICdibG9iJywgJ3VybCcsICdkYXRhJ11cbn07XG4iLCAiY29uc3QgaGFzQnJvd3NlckVudiA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBoYXNTdGFuZGFyZEJyb3dzZXJFbnYgPSAoXG4gIChwcm9kdWN0KSA9PiB7XG4gICAgcmV0dXJuIGhhc0Jyb3dzZXJFbnYgJiYgWydSZWFjdE5hdGl2ZScsICdOYXRpdmVTY3JpcHQnLCAnTlMnXS5pbmRleE9mKHByb2R1Y3QpIDwgMFxuICB9KSh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IucHJvZHVjdCk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIHdlYldvcmtlciBlbnZpcm9ubWVudFxuICpcbiAqIEFsdGhvdWdoIHRoZSBgaXNTdGFuZGFyZEJyb3dzZXJFbnZgIG1ldGhvZCBpbmRpY2F0ZXMgdGhhdFxuICogYGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyYCwgdGhlIFdlYldvcmtlciB3aWxsIHN0aWxsIGJlXG4gKiBmaWx0ZXJlZCBvdXQgZHVlIHRvIGl0cyBqdWRnbWVudCBzdGFuZGFyZFxuICogYHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdgLlxuICogVGhpcyBsZWFkcyB0byBhIHByb2JsZW0gd2hlbiBheGlvcyBwb3N0IGBGb3JtRGF0YWAgaW4gd2ViV29ya2VyXG4gKi9cbmNvbnN0IGhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudiA9ICgoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSAmJlxuICAgIHR5cGVvZiBzZWxmLmltcG9ydFNjcmlwdHMgPT09ICdmdW5jdGlvbidcbiAgKTtcbn0pKCk7XG5cbmNvbnN0IG9yaWdpbiA9IGhhc0Jyb3dzZXJFbnYgJiYgd2luZG93LmxvY2F0aW9uLmhyZWYgfHwgJ2h0dHA6Ly9sb2NhbGhvc3QnO1xuXG5leHBvcnQge1xuICBoYXNCcm93c2VyRW52LFxuICBoYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYsXG4gIGhhc1N0YW5kYXJkQnJvd3NlckVudixcbiAgb3JpZ2luXG59XG4iLCAiaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4vbm9kZS9pbmRleC5qcyc7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL2NvbW1vbi91dGlscy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLi4udXRpbHMsXG4gIC4uLnBsYXRmb3JtXG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IHRvRm9ybURhdGEgZnJvbSAnLi90b0Zvcm1EYXRhLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvVVJMRW5jb2RlZEZvcm0oZGF0YSwgb3B0aW9ucykge1xuICByZXR1cm4gdG9Gb3JtRGF0YShkYXRhLCBuZXcgcGxhdGZvcm0uY2xhc3Nlcy5VUkxTZWFyY2hQYXJhbXMoKSwgT2JqZWN0LmFzc2lnbih7XG4gICAgdmlzaXRvcjogZnVuY3Rpb24odmFsdWUsIGtleSwgcGF0aCwgaGVscGVycykge1xuICAgICAgaWYgKHBsYXRmb3JtLmlzTm9kZSAmJiB1dGlscy5pc0J1ZmZlcih2YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoa2V5LCB2YWx1ZS50b1N0cmluZygnYmFzZTY0JykpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoZWxwZXJzLmRlZmF1bHRWaXNpdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9LCBvcHRpb25zKSk7XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vKipcbiAqIEl0IHRha2VzIGEgc3RyaW5nIGxpa2UgYGZvb1t4XVt5XVt6XWAgYW5kIHJldHVybnMgYW4gYXJyYXkgbGlrZSBgWydmb28nLCAneCcsICd5JywgJ3onXVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqXG4gKiBAcmV0dXJucyBBbiBhcnJheSBvZiBzdHJpbmdzLlxuICovXG5mdW5jdGlvbiBwYXJzZVByb3BQYXRoKG5hbWUpIHtcbiAgLy8gZm9vW3hdW3ldW3pdXG4gIC8vIGZvby54LnkuelxuICAvLyBmb28teC15LXpcbiAgLy8gZm9vIHggeSB6XG4gIHJldHVybiB1dGlscy5tYXRjaEFsbCgvXFx3K3xcXFsoXFx3KildL2csIG5hbWUpLm1hcChtYXRjaCA9PiB7XG4gICAgcmV0dXJuIG1hdGNoWzBdID09PSAnW10nID8gJycgOiBtYXRjaFsxXSB8fCBtYXRjaFswXTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ29udmVydCBhbiBhcnJheSB0byBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnIgLSBUaGUgYXJyYXkgdG8gY29udmVydCB0byBhbiBvYmplY3QuXG4gKlxuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggdGhlIHNhbWUga2V5cyBhbmQgdmFsdWVzIGFzIHRoZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlUb09iamVjdChhcnIpIHtcbiAgY29uc3Qgb2JqID0ge307XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhcnIpO1xuICBsZXQgaTtcbiAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gIGxldCBrZXk7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGtleSA9IGtleXNbaV07XG4gICAgb2JqW2tleV0gPSBhcnJba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgRm9ybURhdGEgb2JqZWN0IGFuZCByZXR1cm5zIGEgSmF2YVNjcmlwdCBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybURhdGEgVGhlIEZvcm1EYXRhIG9iamVjdCB0byBjb252ZXJ0IHRvIEpTT04uXG4gKlxuICogQHJldHVybnMge09iamVjdDxzdHJpbmcsIGFueT4gfCBudWxsfSBUaGUgY29udmVydGVkIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZm9ybURhdGFUb0pTT04oZm9ybURhdGEpIHtcbiAgZnVuY3Rpb24gYnVpbGRQYXRoKHBhdGgsIHZhbHVlLCB0YXJnZXQsIGluZGV4KSB7XG4gICAgbGV0IG5hbWUgPSBwYXRoW2luZGV4KytdO1xuXG4gICAgaWYgKG5hbWUgPT09ICdfX3Byb3RvX18nKSByZXR1cm4gdHJ1ZTtcblxuICAgIGNvbnN0IGlzTnVtZXJpY0tleSA9IE51bWJlci5pc0Zpbml0ZSgrbmFtZSk7XG4gICAgY29uc3QgaXNMYXN0ID0gaW5kZXggPj0gcGF0aC5sZW5ndGg7XG4gICAgbmFtZSA9ICFuYW1lICYmIHV0aWxzLmlzQXJyYXkodGFyZ2V0KSA/IHRhcmdldC5sZW5ndGggOiBuYW1lO1xuXG4gICAgaWYgKGlzTGFzdCkge1xuICAgICAgaWYgKHV0aWxzLmhhc093blByb3AodGFyZ2V0LCBuYW1lKSkge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSBbdGFyZ2V0W25hbWVdLCB2YWx1ZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICFpc051bWVyaWNLZXk7XG4gICAgfVxuXG4gICAgaWYgKCF0YXJnZXRbbmFtZV0gfHwgIXV0aWxzLmlzT2JqZWN0KHRhcmdldFtuYW1lXSkpIHtcbiAgICAgIHRhcmdldFtuYW1lXSA9IFtdO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGJ1aWxkUGF0aChwYXRoLCB2YWx1ZSwgdGFyZ2V0W25hbWVdLCBpbmRleCk7XG5cbiAgICBpZiAocmVzdWx0ICYmIHV0aWxzLmlzQXJyYXkodGFyZ2V0W25hbWVdKSkge1xuICAgICAgdGFyZ2V0W25hbWVdID0gYXJyYXlUb09iamVjdCh0YXJnZXRbbmFtZV0pO1xuICAgIH1cblxuICAgIHJldHVybiAhaXNOdW1lcmljS2V5O1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZm9ybURhdGEpICYmIHV0aWxzLmlzRnVuY3Rpb24oZm9ybURhdGEuZW50cmllcykpIHtcbiAgICBjb25zdCBvYmogPSB7fTtcblxuICAgIHV0aWxzLmZvckVhY2hFbnRyeShmb3JtRGF0YSwgKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBidWlsZFBhdGgocGFyc2VQcm9wUGF0aChuYW1lKSwgdmFsdWUsIG9iaiwgMCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1EYXRhVG9KU09OO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgdHJhbnNpdGlvbmFsRGVmYXVsdHMgZnJvbSAnLi90cmFuc2l0aW9uYWwuanMnO1xuaW1wb3J0IHRvRm9ybURhdGEgZnJvbSAnLi4vaGVscGVycy90b0Zvcm1EYXRhLmpzJztcbmltcG9ydCB0b1VSTEVuY29kZWRGb3JtIGZyb20gJy4uL2hlbHBlcnMvdG9VUkxFbmNvZGVkRm9ybS5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuaW1wb3J0IGZvcm1EYXRhVG9KU09OIGZyb20gJy4uL2hlbHBlcnMvZm9ybURhdGFUb0pTT04uanMnO1xuXG4vKipcbiAqIEl0IHRha2VzIGEgc3RyaW5nLCB0cmllcyB0byBwYXJzZSBpdCwgYW5kIGlmIGl0IGZhaWxzLCBpdCByZXR1cm5zIHRoZSBzdHJpbmdpZmllZCB2ZXJzaW9uXG4gKiBvZiB0aGUgaW5wdXRcbiAqXG4gKiBAcGFyYW0ge2FueX0gcmF3VmFsdWUgLSBUaGUgdmFsdWUgdG8gYmUgc3RyaW5naWZpZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwYXJzZXIgLSBBIGZ1bmN0aW9uIHRoYXQgcGFyc2VzIGEgc3RyaW5nIGludG8gYSBKYXZhU2NyaXB0IG9iamVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVuY29kZXIgLSBBIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSB2YWx1ZSBhbmQgcmV0dXJucyBhIHN0cmluZy5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBBIHN0cmluZ2lmaWVkIHZlcnNpb24gb2YgdGhlIHJhd1ZhbHVlLlxuICovXG5mdW5jdGlvbiBzdHJpbmdpZnlTYWZlbHkocmF3VmFsdWUsIHBhcnNlciwgZW5jb2Rlcikge1xuICBpZiAodXRpbHMuaXNTdHJpbmcocmF3VmFsdWUpKSB7XG4gICAgdHJ5IHtcbiAgICAgIChwYXJzZXIgfHwgSlNPTi5wYXJzZSkocmF3VmFsdWUpO1xuICAgICAgcmV0dXJuIHV0aWxzLnRyaW0ocmF3VmFsdWUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlLm5hbWUgIT09ICdTeW50YXhFcnJvcicpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gKGVuY29kZXIgfHwgSlNPTi5zdHJpbmdpZnkpKHJhd1ZhbHVlKTtcbn1cblxuY29uc3QgZGVmYXVsdHMgPSB7XG5cbiAgdHJhbnNpdGlvbmFsOiB0cmFuc2l0aW9uYWxEZWZhdWx0cyxcblxuICBhZGFwdGVyOiBbJ3hocicsICdodHRwJywgJ2ZldGNoJ10sXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIGNvbnN0IGNvbnRlbnRUeXBlID0gaGVhZGVycy5nZXRDb250ZW50VHlwZSgpIHx8ICcnO1xuICAgIGNvbnN0IGhhc0pTT05Db250ZW50VHlwZSA9IGNvbnRlbnRUeXBlLmluZGV4T2YoJ2FwcGxpY2F0aW9uL2pzb24nKSA+IC0xO1xuICAgIGNvbnN0IGlzT2JqZWN0UGF5bG9hZCA9IHV0aWxzLmlzT2JqZWN0KGRhdGEpO1xuXG4gICAgaWYgKGlzT2JqZWN0UGF5bG9hZCAmJiB1dGlscy5pc0hUTUxGb3JtKGRhdGEpKSB7XG4gICAgICBkYXRhID0gbmV3IEZvcm1EYXRhKGRhdGEpO1xuICAgIH1cblxuICAgIGNvbnN0IGlzRm9ybURhdGEgPSB1dGlscy5pc0Zvcm1EYXRhKGRhdGEpO1xuXG4gICAgaWYgKGlzRm9ybURhdGEpIHtcbiAgICAgIHJldHVybiBoYXNKU09OQ29udGVudFR5cGUgPyBKU09OLnN0cmluZ2lmeShmb3JtRGF0YVRvSlNPTihkYXRhKSkgOiBkYXRhO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1JlYWRhYmxlU3RyZWFtKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLCBmYWxzZSk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIGxldCBpc0ZpbGVMaXN0O1xuXG4gICAgaWYgKGlzT2JqZWN0UGF5bG9hZCkge1xuICAgICAgaWYgKGNvbnRlbnRUeXBlLmluZGV4T2YoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIHRvVVJMRW5jb2RlZEZvcm0oZGF0YSwgdGhpcy5mb3JtU2VyaWFsaXplcikudG9TdHJpbmcoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKChpc0ZpbGVMaXN0ID0gdXRpbHMuaXNGaWxlTGlzdChkYXRhKSkgfHwgY29udGVudFR5cGUuaW5kZXhPZignbXVsdGlwYXJ0L2Zvcm0tZGF0YScpID4gLTEpIHtcbiAgICAgICAgY29uc3QgX0Zvcm1EYXRhID0gdGhpcy5lbnYgJiYgdGhpcy5lbnYuRm9ybURhdGE7XG5cbiAgICAgICAgcmV0dXJuIHRvRm9ybURhdGEoXG4gICAgICAgICAgaXNGaWxlTGlzdCA/IHsnZmlsZXNbXSc6IGRhdGF9IDogZGF0YSxcbiAgICAgICAgICBfRm9ybURhdGEgJiYgbmV3IF9Gb3JtRGF0YSgpLFxuICAgICAgICAgIHRoaXMuZm9ybVNlcmlhbGl6ZXJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkIHx8IGhhc0pTT05Db250ZW50VHlwZSApIHtcbiAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL2pzb24nLCBmYWxzZSk7XG4gICAgICByZXR1cm4gc3RyaW5naWZ5U2FmZWx5KGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICBjb25zdCB0cmFuc2l0aW9uYWwgPSB0aGlzLnRyYW5zaXRpb25hbCB8fCBkZWZhdWx0cy50cmFuc2l0aW9uYWw7XG4gICAgY29uc3QgZm9yY2VkSlNPTlBhcnNpbmcgPSB0cmFuc2l0aW9uYWwgJiYgdHJhbnNpdGlvbmFsLmZvcmNlZEpTT05QYXJzaW5nO1xuICAgIGNvbnN0IEpTT05SZXF1ZXN0ZWQgPSB0aGlzLnJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nO1xuXG4gICAgaWYgKHV0aWxzLmlzUmVzcG9uc2UoZGF0YSkgfHwgdXRpbHMuaXNSZWFkYWJsZVN0cmVhbShkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgaWYgKGRhdGEgJiYgdXRpbHMuaXNTdHJpbmcoZGF0YSkgJiYgKChmb3JjZWRKU09OUGFyc2luZyAmJiAhdGhpcy5yZXNwb25zZVR5cGUpIHx8IEpTT05SZXF1ZXN0ZWQpKSB7XG4gICAgICBjb25zdCBzaWxlbnRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuc2lsZW50SlNPTlBhcnNpbmc7XG4gICAgICBjb25zdCBzdHJpY3RKU09OUGFyc2luZyA9ICFzaWxlbnRKU09OUGFyc2luZyAmJiBKU09OUmVxdWVzdGVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKHN0cmljdEpTT05QYXJzaW5nKSB7XG4gICAgICAgICAgaWYgKGUubmFtZSA9PT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICAgICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGUsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRSwgdGhpcywgbnVsbCwgdGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG4gIG1heEJvZHlMZW5ndGg6IC0xLFxuXG4gIGVudjoge1xuICAgIEZvcm1EYXRhOiBwbGF0Zm9ybS5jbGFzc2VzLkZvcm1EYXRhLFxuICAgIEJsb2I6IHBsYXRmb3JtLmNsYXNzZXMuQmxvYlxuICB9LFxuXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH0sXG5cbiAgaGVhZGVyczoge1xuICAgIGNvbW1vbjoge1xuICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLFxuICAgICAgJ0NvbnRlbnQtVHlwZSc6IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCddLCAobWV0aG9kKSA9PiB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmF1bHRzO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuXG4vLyBSYXdBeGlvc0hlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG5jb25zdCBpZ25vcmVEdXBsaWNhdGVPZiA9IHV0aWxzLnRvT2JqZWN0U2V0KFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dKTtcblxuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHJhd0hlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IHJhd0hlYWRlcnMgPT4ge1xuICBjb25zdCBwYXJzZWQgPSB7fTtcbiAgbGV0IGtleTtcbiAgbGV0IHZhbDtcbiAgbGV0IGk7XG5cbiAgcmF3SGVhZGVycyAmJiByYXdIZWFkZXJzLnNwbGl0KCdcXG4nKS5mb3JFYWNoKGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IGxpbmUuc3Vic3RyaW5nKDAsIGkpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IGxpbmUuc3Vic3RyaW5nKGkgKyAxKS50cmltKCk7XG5cbiAgICBpZiAoIWtleSB8fCAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2Zba2V5XSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSkge1xuICAgICAgICBwYXJzZWRba2V5XS5wdXNoKHZhbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IFt2YWxdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IHBhcnNlSGVhZGVycyBmcm9tICcuLi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyc7XG5cbmNvbnN0ICRpbnRlcm5hbHMgPSBTeW1ib2woJ2ludGVybmFscycpO1xuXG5mdW5jdGlvbiBub3JtYWxpemVIZWFkZXIoaGVhZGVyKSB7XG4gIHJldHVybiBoZWFkZXIgJiYgU3RyaW5nKGhlYWRlcikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB1dGlscy5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLm1hcChub3JtYWxpemVWYWx1ZSkgOiBTdHJpbmcodmFsdWUpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVRva2VucyhzdHIpIHtcbiAgY29uc3QgdG9rZW5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgY29uc3QgdG9rZW5zUkUgPSAvKFteXFxzLDs9XSspXFxzKig/Oj1cXHMqKFteLDtdKykpPy9nO1xuICBsZXQgbWF0Y2g7XG5cbiAgd2hpbGUgKChtYXRjaCA9IHRva2Vuc1JFLmV4ZWMoc3RyKSkpIHtcbiAgICB0b2tlbnNbbWF0Y2hbMV1dID0gbWF0Y2hbMl07XG4gIH1cblxuICByZXR1cm4gdG9rZW5zO1xufVxuXG5jb25zdCBpc1ZhbGlkSGVhZGVyTmFtZSA9IChzdHIpID0+IC9eWy1fYS16QS1aMC05XmB8fiwhIyQlJicqKy5dKyQvLnRlc3Qoc3RyLnRyaW0oKSk7XG5cbmZ1bmN0aW9uIG1hdGNoSGVhZGVyVmFsdWUoY29udGV4dCwgdmFsdWUsIGhlYWRlciwgZmlsdGVyLCBpc0hlYWRlck5hbWVGaWx0ZXIpIHtcbiAgaWYgKHV0aWxzLmlzRnVuY3Rpb24oZmlsdGVyKSkge1xuICAgIHJldHVybiBmaWx0ZXIuY2FsbCh0aGlzLCB2YWx1ZSwgaGVhZGVyKTtcbiAgfVxuXG4gIGlmIChpc0hlYWRlck5hbWVGaWx0ZXIpIHtcbiAgICB2YWx1ZSA9IGhlYWRlcjtcbiAgfVxuXG4gIGlmICghdXRpbHMuaXNTdHJpbmcodmFsdWUpKSByZXR1cm47XG5cbiAgaWYgKHV0aWxzLmlzU3RyaW5nKGZpbHRlcikpIHtcbiAgICByZXR1cm4gdmFsdWUuaW5kZXhPZihmaWx0ZXIpICE9PSAtMTtcbiAgfVxuXG4gIGlmICh1dGlscy5pc1JlZ0V4cChmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIGZpbHRlci50ZXN0KHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmb3JtYXRIZWFkZXIoaGVhZGVyKSB7XG4gIHJldHVybiBoZWFkZXIudHJpbSgpXG4gICAgLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvKFthLXpcXGRdKShcXHcqKS9nLCAodywgY2hhciwgc3RyKSA9PiB7XG4gICAgICByZXR1cm4gY2hhci50b1VwcGVyQ2FzZSgpICsgc3RyO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBidWlsZEFjY2Vzc29ycyhvYmosIGhlYWRlcikge1xuICBjb25zdCBhY2Nlc3Nvck5hbWUgPSB1dGlscy50b0NhbWVsQ2FzZSgnICcgKyBoZWFkZXIpO1xuXG4gIFsnZ2V0JywgJ3NldCcsICdoYXMnXS5mb3JFYWNoKG1ldGhvZE5hbWUgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG1ldGhvZE5hbWUgKyBhY2Nlc3Nvck5hbWUsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgICAgIHJldHVybiB0aGlzW21ldGhvZE5hbWVdLmNhbGwodGhpcywgaGVhZGVyLCBhcmcxLCBhcmcyLCBhcmczKTtcbiAgICAgIH0sXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgfSk7XG59XG5cbmNsYXNzIEF4aW9zSGVhZGVycyB7XG4gIGNvbnN0cnVjdG9yKGhlYWRlcnMpIHtcbiAgICBoZWFkZXJzICYmIHRoaXMuc2V0KGhlYWRlcnMpO1xuICB9XG5cbiAgc2V0KGhlYWRlciwgdmFsdWVPclJld3JpdGUsIHJld3JpdGUpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIHNldEhlYWRlcihfdmFsdWUsIF9oZWFkZXIsIF9yZXdyaXRlKSB7XG4gICAgICBjb25zdCBsSGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoIWxIZWFkZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdoZWFkZXIgbmFtZSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZycpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHNlbGYsIGxIZWFkZXIpO1xuXG4gICAgICBpZigha2V5IHx8IHNlbGZba2V5XSA9PT0gdW5kZWZpbmVkIHx8IF9yZXdyaXRlID09PSB0cnVlIHx8IChfcmV3cml0ZSA9PT0gdW5kZWZpbmVkICYmIHNlbGZba2V5XSAhPT0gZmFsc2UpKSB7XG4gICAgICAgIHNlbGZba2V5IHx8IF9oZWFkZXJdID0gbm9ybWFsaXplVmFsdWUoX3ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzZXRIZWFkZXJzID0gKGhlYWRlcnMsIF9yZXdyaXRlKSA9PlxuICAgICAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCAoX3ZhbHVlLCBfaGVhZGVyKSA9PiBzZXRIZWFkZXIoX3ZhbHVlLCBfaGVhZGVyLCBfcmV3cml0ZSkpO1xuXG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QoaGVhZGVyKSB8fCBoZWFkZXIgaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yKSB7XG4gICAgICBzZXRIZWFkZXJzKGhlYWRlciwgdmFsdWVPclJld3JpdGUpXG4gICAgfSBlbHNlIGlmKHV0aWxzLmlzU3RyaW5nKGhlYWRlcikgJiYgKGhlYWRlciA9IGhlYWRlci50cmltKCkpICYmICFpc1ZhbGlkSGVhZGVyTmFtZShoZWFkZXIpKSB7XG4gICAgICBzZXRIZWFkZXJzKHBhcnNlSGVhZGVycyhoZWFkZXIpLCB2YWx1ZU9yUmV3cml0ZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0hlYWRlcnMoaGVhZGVyKSkge1xuICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgaGVhZGVyLmVudHJpZXMoKSkge1xuICAgICAgICBzZXRIZWFkZXIodmFsdWUsIGtleSwgcmV3cml0ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWRlciAhPSBudWxsICYmIHNldEhlYWRlcih2YWx1ZU9yUmV3cml0ZSwgaGVhZGVyLCByZXdyaXRlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldChoZWFkZXIsIHBhcnNlcikge1xuICAgIGhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpO1xuXG4gICAgaWYgKGhlYWRlcikge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleSh0aGlzLCBoZWFkZXIpO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpc1trZXldO1xuXG4gICAgICAgIGlmICghcGFyc2VyKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcnNlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZVRva2Vucyh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihwYXJzZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5jYWxsKHRoaXMsIHZhbHVlLCBrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzUmVnRXhwKHBhcnNlcikpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VyLmV4ZWModmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGFyc2VyIG11c3QgYmUgYm9vbGVhbnxyZWdleHB8ZnVuY3Rpb24nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYXMoaGVhZGVyLCBtYXRjaGVyKSB7XG4gICAgaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKGhlYWRlcik7XG5cbiAgICBpZiAoaGVhZGVyKSB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHRoaXMsIGhlYWRlcik7XG5cbiAgICAgIHJldHVybiAhIShrZXkgJiYgdGhpc1trZXldICE9PSB1bmRlZmluZWQgJiYgKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUodGhpcywgdGhpc1trZXldLCBrZXksIG1hdGNoZXIpKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZGVsZXRlKGhlYWRlciwgbWF0Y2hlcikge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGxldCBkZWxldGVkID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBkZWxldGVIZWFkZXIoX2hlYWRlcikge1xuICAgICAgX2hlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKF9oZWFkZXIpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleShzZWxmLCBfaGVhZGVyKTtcblxuICAgICAgICBpZiAoa2V5ICYmICghbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHNlbGYsIHNlbGZba2V5XSwga2V5LCBtYXRjaGVyKSkpIHtcbiAgICAgICAgICBkZWxldGUgc2VsZltrZXldO1xuXG4gICAgICAgICAgZGVsZXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheShoZWFkZXIpKSB7XG4gICAgICBoZWFkZXIuZm9yRWFjaChkZWxldGVIZWFkZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGVIZWFkZXIoaGVhZGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVsZXRlZDtcbiAgfVxuXG4gIGNsZWFyKG1hdGNoZXIpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcyk7XG4gICAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgICBsZXQgZGVsZXRlZCA9IGZhbHNlO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUodGhpcywgdGhpc1trZXldLCBrZXksIG1hdGNoZXIsIHRydWUpKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzW2tleV07XG4gICAgICAgIGRlbGV0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZWxldGVkO1xuICB9XG5cbiAgbm9ybWFsaXplKGZvcm1hdCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcblxuICAgIHV0aWxzLmZvckVhY2godGhpcywgKHZhbHVlLCBoZWFkZXIpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkoaGVhZGVycywgaGVhZGVyKTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBzZWxmW2tleV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IGZvcm1hdCA/IGZvcm1hdEhlYWRlcihoZWFkZXIpIDogU3RyaW5nKGhlYWRlcikudHJpbSgpO1xuXG4gICAgICBpZiAobm9ybWFsaXplZCAhPT0gaGVhZGVyKSB7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICB9XG5cbiAgICAgIHNlbGZbbm9ybWFsaXplZF0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZF0gPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjb25jYXQoLi4udGFyZ2V0cykge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmNvbmNhdCh0aGlzLCAuLi50YXJnZXRzKTtcbiAgfVxuXG4gIHRvSlNPTihhc1N0cmluZ3MpIHtcbiAgICBjb25zdCBvYmogPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLCAodmFsdWUsIGhlYWRlcikgPT4ge1xuICAgICAgdmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gZmFsc2UgJiYgKG9ialtoZWFkZXJdID0gYXNTdHJpbmdzICYmIHV0aWxzLmlzQXJyYXkodmFsdWUpID8gdmFsdWUuam9pbignLCAnKSA6IHZhbHVlKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy50b0pTT04oKSlbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMudG9KU09OKCkpLm1hcCgoW2hlYWRlciwgdmFsdWVdKSA9PiBoZWFkZXIgKyAnOiAnICsgdmFsdWUpLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuICAgIHJldHVybiAnQXhpb3NIZWFkZXJzJztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tKHRoaW5nKSB7XG4gICAgcmV0dXJuIHRoaW5nIGluc3RhbmNlb2YgdGhpcyA/IHRoaW5nIDogbmV3IHRoaXModGhpbmcpO1xuICB9XG5cbiAgc3RhdGljIGNvbmNhdChmaXJzdCwgLi4udGFyZ2V0cykge1xuICAgIGNvbnN0IGNvbXB1dGVkID0gbmV3IHRoaXMoZmlyc3QpO1xuXG4gICAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IGNvbXB1dGVkLnNldCh0YXJnZXQpKTtcblxuICAgIHJldHVybiBjb21wdXRlZDtcbiAgfVxuXG4gIHN0YXRpYyBhY2Nlc3NvcihoZWFkZXIpIHtcbiAgICBjb25zdCBpbnRlcm5hbHMgPSB0aGlzWyRpbnRlcm5hbHNdID0gKHRoaXNbJGludGVybmFsc10gPSB7XG4gICAgICBhY2Nlc3NvcnM6IHt9XG4gICAgfSk7XG5cbiAgICBjb25zdCBhY2Nlc3NvcnMgPSBpbnRlcm5hbHMuYWNjZXNzb3JzO1xuICAgIGNvbnN0IHByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuXG4gICAgZnVuY3Rpb24gZGVmaW5lQWNjZXNzb3IoX2hlYWRlcikge1xuICAgICAgY29uc3QgbEhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKCFhY2Nlc3NvcnNbbEhlYWRlcl0pIHtcbiAgICAgICAgYnVpbGRBY2Nlc3NvcnMocHJvdG90eXBlLCBfaGVhZGVyKTtcbiAgICAgICAgYWNjZXNzb3JzW2xIZWFkZXJdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1dGlscy5pc0FycmF5KGhlYWRlcikgPyBoZWFkZXIuZm9yRWFjaChkZWZpbmVBY2Nlc3NvcikgOiBkZWZpbmVBY2Nlc3NvcihoZWFkZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuQXhpb3NIZWFkZXJzLmFjY2Vzc29yKFsnQ29udGVudC1UeXBlJywgJ0NvbnRlbnQtTGVuZ3RoJywgJ0FjY2VwdCcsICdBY2NlcHQtRW5jb2RpbmcnLCAnVXNlci1BZ2VudCcsICdBdXRob3JpemF0aW9uJ10pO1xuXG4vLyByZXNlcnZlZCBuYW1lcyBob3RmaXhcbnV0aWxzLnJlZHVjZURlc2NyaXB0b3JzKEF4aW9zSGVhZGVycy5wcm90b3R5cGUsICh7dmFsdWV9LCBrZXkpID0+IHtcbiAgbGV0IG1hcHBlZCA9IGtleVswXS50b1VwcGVyQ2FzZSgpICsga2V5LnNsaWNlKDEpOyAvLyBtYXAgYHNldGAgPT4gYFNldGBcbiAgcmV0dXJuIHtcbiAgICBnZXQ6ICgpID0+IHZhbHVlLFxuICAgIHNldChoZWFkZXJWYWx1ZSkge1xuICAgICAgdGhpc1ttYXBwZWRdID0gaGVhZGVyVmFsdWU7XG4gICAgfVxuICB9XG59KTtcblxudXRpbHMuZnJlZXplTWV0aG9kcyhBeGlvc0hlYWRlcnMpO1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc0hlYWRlcnM7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvaW5kZXguanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuLi9jb3JlL0F4aW9zSGVhZGVycy5qcyc7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEBwYXJhbSB7P09iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlIG9iamVjdFxuICpcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShmbnMsIHJlc3BvbnNlKSB7XG4gIGNvbnN0IGNvbmZpZyA9IHRoaXMgfHwgZGVmYXVsdHM7XG4gIGNvbnN0IGNvbnRleHQgPSByZXNwb25zZSB8fCBjb25maWc7XG4gIGNvbnN0IGhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShjb250ZXh0LmhlYWRlcnMpO1xuICBsZXQgZGF0YSA9IGNvbnRleHQuZGF0YTtcblxuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuLmNhbGwoY29uZmlnLCBkYXRhLCBoZWFkZXJzLm5vcm1hbGl6ZSgpLCByZXNwb25zZSA/IHJlc3BvbnNlLnN0YXR1cyA6IHVuZGVmaW5lZCk7XG4gIH0pO1xuXG4gIGhlYWRlcnMubm9ybWFsaXplKCk7XG5cbiAgcmV0dXJuIGRhdGE7XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuLyoqXG4gKiBBIGBDYW5jZWxlZEVycm9yYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3Q9fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7T2JqZWN0PX0gcmVxdWVzdCBUaGUgcmVxdWVzdC5cbiAqXG4gKiBAcmV0dXJucyB7Q2FuY2VsZWRFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbGVkRXJyb3IobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBBeGlvc0Vycm9yLmNhbGwodGhpcywgbWVzc2FnZSA9PSBudWxsID8gJ2NhbmNlbGVkJyA6IG1lc3NhZ2UsIEF4aW9zRXJyb3IuRVJSX0NBTkNFTEVELCBjb25maWcsIHJlcXVlc3QpO1xuICB0aGlzLm5hbWUgPSAnQ2FuY2VsZWRFcnJvcic7XG59XG5cbnV0aWxzLmluaGVyaXRzKENhbmNlbGVkRXJyb3IsIEF4aW9zRXJyb3IsIHtcbiAgX19DQU5DRUxfXzogdHJ1ZVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENhbmNlbGVkRXJyb3I7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuL0F4aW9zRXJyb3IuanMnO1xuXG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm5zIHtvYmplY3R9IFRoZSByZXNwb25zZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgY29uc3QgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKFxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIFtBeGlvc0Vycm9yLkVSUl9CQURfUkVRVUVTVCwgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFXVtNYXRoLmZsb29yKHJlc3BvbnNlLnN0YXR1cyAvIDEwMCkgLSA0XSxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZVByb3RvY29sKHVybCkge1xuICBjb25zdCBtYXRjaCA9IC9eKFstK1xcd117MSwyNX0pKDo/XFwvXFwvfDopLy5leGVjKHVybCk7XG4gIHJldHVybiBtYXRjaCAmJiBtYXRjaFsxXSB8fCAnJztcbn1cbiIsICIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ2FsY3VsYXRlIGRhdGEgbWF4UmF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IFtzYW1wbGVzQ291bnQ9IDEwXVxuICogQHBhcmFtIHtOdW1iZXJ9IFttaW49IDEwMDBdXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHNwZWVkb21ldGVyKHNhbXBsZXNDb3VudCwgbWluKSB7XG4gIHNhbXBsZXNDb3VudCA9IHNhbXBsZXNDb3VudCB8fCAxMDtcbiAgY29uc3QgYnl0ZXMgPSBuZXcgQXJyYXkoc2FtcGxlc0NvdW50KTtcbiAgY29uc3QgdGltZXN0YW1wcyA9IG5ldyBBcnJheShzYW1wbGVzQ291bnQpO1xuICBsZXQgaGVhZCA9IDA7XG4gIGxldCB0YWlsID0gMDtcbiAgbGV0IGZpcnN0U2FtcGxlVFM7XG5cbiAgbWluID0gbWluICE9PSB1bmRlZmluZWQgPyBtaW4gOiAxMDAwO1xuXG4gIHJldHVybiBmdW5jdGlvbiBwdXNoKGNodW5rTGVuZ3RoKSB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgIGNvbnN0IHN0YXJ0ZWRBdCA9IHRpbWVzdGFtcHNbdGFpbF07XG5cbiAgICBpZiAoIWZpcnN0U2FtcGxlVFMpIHtcbiAgICAgIGZpcnN0U2FtcGxlVFMgPSBub3c7XG4gICAgfVxuXG4gICAgYnl0ZXNbaGVhZF0gPSBjaHVua0xlbmd0aDtcbiAgICB0aW1lc3RhbXBzW2hlYWRdID0gbm93O1xuXG4gICAgbGV0IGkgPSB0YWlsO1xuICAgIGxldCBieXRlc0NvdW50ID0gMDtcblxuICAgIHdoaWxlIChpICE9PSBoZWFkKSB7XG4gICAgICBieXRlc0NvdW50ICs9IGJ5dGVzW2krK107XG4gICAgICBpID0gaSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBoZWFkID0gKGhlYWQgKyAxKSAlIHNhbXBsZXNDb3VudDtcblxuICAgIGlmIChoZWFkID09PSB0YWlsKSB7XG4gICAgICB0YWlsID0gKHRhaWwgKyAxKSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBpZiAobm93IC0gZmlyc3RTYW1wbGVUUyA8IG1pbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBhc3NlZCA9IHN0YXJ0ZWRBdCAmJiBub3cgLSBzdGFydGVkQXQ7XG5cbiAgICByZXR1cm4gcGFzc2VkID8gTWF0aC5yb3VuZChieXRlc0NvdW50ICogMTAwMCAvIHBhc3NlZCkgOiB1bmRlZmluZWQ7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNwZWVkb21ldGVyO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBUaHJvdHRsZSBkZWNvcmF0b3JcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge051bWJlcn0gZnJlcVxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHRocm90dGxlKGZuLCBmcmVxKSB7XG4gIGxldCB0aW1lc3RhbXAgPSAwO1xuICBjb25zdCB0aHJlc2hvbGQgPSAxMDAwIC8gZnJlcTtcbiAgbGV0IHRpbWVyID0gbnVsbDtcbiAgcmV0dXJuIGZ1bmN0aW9uIHRocm90dGxlZCgpIHtcbiAgICBjb25zdCBmb3JjZSA9IHRoaXMgPT09IHRydWU7XG5cbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGlmIChmb3JjZSB8fCBub3cgLSB0aW1lc3RhbXAgPiB0aHJlc2hvbGQpIHtcbiAgICAgIGlmICh0aW1lcikge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICB9XG4gICAgICB0aW1lc3RhbXAgPSBub3c7XG4gICAgICByZXR1cm4gZm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgaWYgKCF0aW1lcikge1xuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgICB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgIH0sIHRocmVzaG9sZCAtIChub3cgLSB0aW1lc3RhbXApKTtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRocm90dGxlO1xuIiwgImltcG9ydCBzcGVlZG9tZXRlciBmcm9tIFwiLi9zcGVlZG9tZXRlci5qc1wiO1xuaW1wb3J0IHRocm90dGxlIGZyb20gXCIuL3Rocm90dGxlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IChsaXN0ZW5lciwgaXNEb3dubG9hZFN0cmVhbSwgZnJlcSA9IDMpID0+IHtcbiAgbGV0IGJ5dGVzTm90aWZpZWQgPSAwO1xuICBjb25zdCBfc3BlZWRvbWV0ZXIgPSBzcGVlZG9tZXRlcig1MCwgMjUwKTtcblxuICByZXR1cm4gdGhyb3R0bGUoZSA9PiB7XG4gICAgY29uc3QgbG9hZGVkID0gZS5sb2FkZWQ7XG4gICAgY29uc3QgdG90YWwgPSBlLmxlbmd0aENvbXB1dGFibGUgPyBlLnRvdGFsIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHByb2dyZXNzQnl0ZXMgPSBsb2FkZWQgLSBieXRlc05vdGlmaWVkO1xuICAgIGNvbnN0IHJhdGUgPSBfc3BlZWRvbWV0ZXIocHJvZ3Jlc3NCeXRlcyk7XG4gICAgY29uc3QgaW5SYW5nZSA9IGxvYWRlZCA8PSB0b3RhbDtcblxuICAgIGJ5dGVzTm90aWZpZWQgPSBsb2FkZWQ7XG5cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgbG9hZGVkLFxuICAgICAgdG90YWwsXG4gICAgICBwcm9ncmVzczogdG90YWwgPyAobG9hZGVkIC8gdG90YWwpIDogdW5kZWZpbmVkLFxuICAgICAgYnl0ZXM6IHByb2dyZXNzQnl0ZXMsXG4gICAgICByYXRlOiByYXRlID8gcmF0ZSA6IHVuZGVmaW5lZCxcbiAgICAgIGVzdGltYXRlZDogcmF0ZSAmJiB0b3RhbCAmJiBpblJhbmdlID8gKHRvdGFsIC0gbG9hZGVkKSAvIHJhdGUgOiB1bmRlZmluZWQsXG4gICAgICBldmVudDogZSxcbiAgICAgIGxlbmd0aENvbXB1dGFibGU6IHRvdGFsICE9IG51bGxcbiAgICB9O1xuXG4gICAgZGF0YVtpc0Rvd25sb2FkU3RyZWFtID8gJ2Rvd25sb2FkJyA6ICd1cGxvYWQnXSA9IHRydWU7XG5cbiAgICBsaXN0ZW5lcihkYXRhKTtcbiAgfSwgZnJlcSk7XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgP1xuXG4vLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3Rcbi8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIGNvbnN0IG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIGNvbnN0IHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGxldCBvcmlnaW5VUkw7XG5cbiAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0cyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICBsZXQgaHJlZiA9IHVybDtcblxuICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgICB9XG5cbiAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAvLyB1cmxQYXJzaW5nTm9kZSBwcm92aWRlcyB0aGUgVXJsVXRpbHMgaW50ZXJmYWNlIC0gaHR0cDovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHV0aWxzXG4gICAgICByZXR1cm4ge1xuICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgcGF0aG5hbWU6ICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJykgP1xuICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgY29uc3QgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfSkoKTtcbiIsICJpbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICB7XG4gICAgd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICBjb25zdCBjb29raWUgPSBbbmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSldO1xuXG4gICAgICB1dGlscy5pc051bWJlcihleHBpcmVzKSAmJiBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG5cbiAgICAgIHV0aWxzLmlzU3RyaW5nKHBhdGgpICYmIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcblxuICAgICAgdXRpbHMuaXNTdHJpbmcoZG9tYWluKSAmJiBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuXG4gICAgICBzZWN1cmUgPT09IHRydWUgJiYgY29va2llLnB1c2goJ3NlY3VyZScpO1xuXG4gICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICB9LFxuXG4gICAgcmVhZChuYW1lKSB7XG4gICAgICBjb25zdCBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgIH0sXG5cbiAgICByZW1vdmUobmFtZSkge1xuICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICB9XG4gIH1cblxuICA6XG5cbiAgLy8gTm9uLXN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICB7XG4gICAgd3JpdGUoKSB7fSxcbiAgICByZWFkKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICByZW1vdmUoKSB7fVxuICB9O1xuXG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZCtcXC0uXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvP1xcLyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn1cbiIsICIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBpc0Fic29sdXRlVVJMIGZyb20gJy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyc7XG5pbXBvcnQgY29tYmluZVVSTHMgZnJvbSAnLi4vaGVscGVycy9jb21iaW5lVVJMcy5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIGZ1bGwgcGF0aFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCkge1xuICBpZiAoYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChyZXF1ZXN0ZWRVUkwpKSB7XG4gICAgcmV0dXJuIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCk7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3RlZFVSTDtcbn1cbiIsICIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gXCIuL0F4aW9zSGVhZGVycy5qc1wiO1xuXG5jb25zdCBoZWFkZXJzVG9PYmplY3QgPSAodGhpbmcpID0+IHRoaW5nIGluc3RhbmNlb2YgQXhpb3NIZWFkZXJzID8geyAuLi50aGluZyB9IDogdGhpbmc7XG5cbi8qKlxuICogQ29uZmlnLXNwZWNpZmljIG1lcmdlLWZ1bmN0aW9uIHdoaWNoIGNyZWF0ZXMgYSBuZXcgY29uZmlnLW9iamVjdFxuICogYnkgbWVyZ2luZyB0d28gY29uZmlndXJhdGlvbiBvYmplY3RzIHRvZ2V0aGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcxXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMlxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVyZ2VDb25maWcoY29uZmlnMSwgY29uZmlnMikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgY29uZmlnMiA9IGNvbmZpZzIgfHwge307XG4gIGNvbnN0IGNvbmZpZyA9IHt9O1xuXG4gIGZ1bmN0aW9uIGdldE1lcmdlZFZhbHVlKHRhcmdldCwgc291cmNlLCBjYXNlbGVzcykge1xuICAgIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHRhcmdldCkgJiYgdXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2UuY2FsbCh7Y2FzZWxlc3N9LCB0YXJnZXQsIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZSh7fSwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHNvdXJjZS5zbGljZSgpO1xuICAgIH1cbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIG1lcmdlRGVlcFByb3BlcnRpZXMoYSwgYiwgY2FzZWxlc3MpIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUoYSwgYiwgY2FzZWxlc3MpO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGEpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhLCBjYXNlbGVzcyk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIoYSwgYikge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYikpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBkZWZhdWx0VG9Db25maWcyKGEsIGIpIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChhKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIG1lcmdlRGlyZWN0S2V5cyhhLCBiLCBwcm9wKSB7XG4gICAgaWYgKHByb3AgaW4gY29uZmlnMikge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGEsIGIpO1xuICAgIH0gZWxzZSBpZiAocHJvcCBpbiBjb25maWcxKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBtZXJnZU1hcCA9IHtcbiAgICB1cmw6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgbWV0aG9kOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIGRhdGE6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgYmFzZVVSTDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc2Zvcm1SZXF1ZXN0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRyYW5zZm9ybVJlc3BvbnNlOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHBhcmFtc1NlcmlhbGl6ZXI6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdGltZW91dDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0aW1lb3V0TWVzc2FnZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB3aXRoQ3JlZGVudGlhbHM6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgd2l0aFhTUkZUb2tlbjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBhZGFwdGVyOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHJlc3BvbnNlVHlwZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB4c3JmQ29va2llTmFtZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB4c3JmSGVhZGVyTmFtZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBvblVwbG9hZFByb2dyZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG9uRG93bmxvYWRQcm9ncmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBkZWNvbXByZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG1heENvbnRlbnRMZW5ndGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgbWF4Qm9keUxlbmd0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBiZWZvcmVSZWRpcmVjdDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc3BvcnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgaHR0cEFnZW50OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGh0dHBzQWdlbnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgY2FuY2VsVG9rZW46IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgc29ja2V0UGF0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICByZXNwb25zZUVuY29kaW5nOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHZhbGlkYXRlU3RhdHVzOiBtZXJnZURpcmVjdEtleXMsXG4gICAgaGVhZGVyczogKGEsIGIpID0+IG1lcmdlRGVlcFByb3BlcnRpZXMoaGVhZGVyc1RvT2JqZWN0KGEpLCBoZWFkZXJzVG9PYmplY3QoYiksIHRydWUpXG4gIH07XG5cbiAgdXRpbHMuZm9yRWFjaChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCBjb25maWcxLCBjb25maWcyKSksIGZ1bmN0aW9uIGNvbXB1dGVDb25maWdWYWx1ZShwcm9wKSB7XG4gICAgY29uc3QgbWVyZ2UgPSBtZXJnZU1hcFtwcm9wXSB8fCBtZXJnZURlZXBQcm9wZXJ0aWVzO1xuICAgIGNvbnN0IGNvbmZpZ1ZhbHVlID0gbWVyZ2UoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSwgcHJvcCk7XG4gICAgKHV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZ1ZhbHVlKSAmJiBtZXJnZSAhPT0gbWVyZ2VEaXJlY3RLZXlzKSB8fCAoY29uZmlnW3Byb3BdID0gY29uZmlnVmFsdWUpO1xuICB9KTtcblxuICByZXR1cm4gY29uZmlnO1xufVxuIiwgImltcG9ydCBwbGF0Zm9ybSBmcm9tIFwiLi4vcGxhdGZvcm0vaW5kZXguanNcIjtcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vdXRpbHMuanNcIjtcbmltcG9ydCBpc1VSTFNhbWVPcmlnaW4gZnJvbSBcIi4vaXNVUkxTYW1lT3JpZ2luLmpzXCI7XG5pbXBvcnQgY29va2llcyBmcm9tIFwiLi9jb29raWVzLmpzXCI7XG5pbXBvcnQgYnVpbGRGdWxsUGF0aCBmcm9tIFwiLi4vY29yZS9idWlsZEZ1bGxQYXRoLmpzXCI7XG5pbXBvcnQgbWVyZ2VDb25maWcgZnJvbSBcIi4uL2NvcmUvbWVyZ2VDb25maWcuanNcIjtcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSBcIi4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzXCI7XG5pbXBvcnQgYnVpbGRVUkwgZnJvbSBcIi4vYnVpbGRVUkwuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgKGNvbmZpZykgPT4ge1xuICBjb25zdCBuZXdDb25maWcgPSBtZXJnZUNvbmZpZyh7fSwgY29uZmlnKTtcblxuICBsZXQge2RhdGEsIHdpdGhYU1JGVG9rZW4sIHhzcmZIZWFkZXJOYW1lLCB4c3JmQ29va2llTmFtZSwgaGVhZGVycywgYXV0aH0gPSBuZXdDb25maWc7XG5cbiAgbmV3Q29uZmlnLmhlYWRlcnMgPSBoZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oaGVhZGVycyk7XG5cbiAgbmV3Q29uZmlnLnVybCA9IGJ1aWxkVVJMKGJ1aWxkRnVsbFBhdGgobmV3Q29uZmlnLmJhc2VVUkwsIG5ld0NvbmZpZy51cmwpLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcik7XG5cbiAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICBpZiAoYXV0aCkge1xuICAgIGhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0Jhc2ljICcgK1xuICAgICAgYnRvYSgoYXV0aC51c2VybmFtZSB8fCAnJykgKyAnOicgKyAoYXV0aC5wYXNzd29yZCA/IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChhdXRoLnBhc3N3b3JkKSkgOiAnJykpXG4gICAgKTtcbiAgfVxuXG4gIGxldCBjb250ZW50VHlwZTtcblxuICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSkge1xuICAgIGlmIChwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgfHwgcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52KSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKHVuZGVmaW5lZCk7IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9IGVsc2UgaWYgKChjb250ZW50VHlwZSA9IGhlYWRlcnMuZ2V0Q29udGVudFR5cGUoKSkgIT09IGZhbHNlKSB7XG4gICAgICAvLyBmaXggc2VtaWNvbG9uIGR1cGxpY2F0aW9uIGlzc3VlIGZvciBSZWFjdE5hdGl2ZSBGb3JtRGF0YSBpbXBsZW1lbnRhdGlvblxuICAgICAgY29uc3QgW3R5cGUsIC4uLnRva2Vuc10gPSBjb250ZW50VHlwZSA/IGNvbnRlbnRUeXBlLnNwbGl0KCc7JykubWFwKHRva2VuID0+IHRva2VuLnRyaW0oKSkuZmlsdGVyKEJvb2xlYW4pIDogW107XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKFt0eXBlIHx8ICdtdWx0aXBhcnQvZm9ybS1kYXRhJywgLi4udG9rZW5zXS5qb2luKCc7ICcpKTtcbiAgICB9XG4gIH1cblxuICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG5cbiAgaWYgKHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudikge1xuICAgIHdpdGhYU1JGVG9rZW4gJiYgdXRpbHMuaXNGdW5jdGlvbih3aXRoWFNSRlRva2VuKSAmJiAod2l0aFhTUkZUb2tlbiA9IHdpdGhYU1JGVG9rZW4obmV3Q29uZmlnKSk7XG5cbiAgICBpZiAod2l0aFhTUkZUb2tlbiB8fCAod2l0aFhTUkZUb2tlbiAhPT0gZmFsc2UgJiYgaXNVUkxTYW1lT3JpZ2luKG5ld0NvbmZpZy51cmwpKSkge1xuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICBjb25zdCB4c3JmVmFsdWUgPSB4c3JmSGVhZGVyTmFtZSAmJiB4c3JmQ29va2llTmFtZSAmJiBjb29raWVzLnJlYWQoeHNyZkNvb2tpZU5hbWUpO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0KHhzcmZIZWFkZXJOYW1lLCB4c3JmVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdDb25maWc7XG59XG5cbiIsICJpbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5pbXBvcnQgc2V0dGxlIGZyb20gJy4vLi4vY29yZS9zZXR0bGUuanMnO1xuaW1wb3J0IHRyYW5zaXRpb25hbERlZmF1bHRzIGZyb20gJy4uL2RlZmF1bHRzL3RyYW5zaXRpb25hbC5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IENhbmNlbGVkRXJyb3IgZnJvbSAnLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanMnO1xuaW1wb3J0IHBhcnNlUHJvdG9jb2wgZnJvbSAnLi4vaGVscGVycy9wYXJzZVByb3RvY29sLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzJztcbmltcG9ydCBwcm9ncmVzc0V2ZW50UmVkdWNlciBmcm9tICcuLi9oZWxwZXJzL3Byb2dyZXNzRXZlbnRSZWR1Y2VyLmpzJztcbmltcG9ydCByZXNvbHZlQ29uZmlnIGZyb20gXCIuLi9oZWxwZXJzL3Jlc29sdmVDb25maWcuanNcIjtcblxuY29uc3QgaXNYSFJBZGFwdGVyU3VwcG9ydGVkID0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJztcblxuZXhwb3J0IGRlZmF1bHQgaXNYSFJBZGFwdGVyU3VwcG9ydGVkICYmIGZ1bmN0aW9uIChjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBjb25zdCBfY29uZmlnID0gcmVzb2x2ZUNvbmZpZyhjb25maWcpO1xuICAgIGxldCByZXF1ZXN0RGF0YSA9IF9jb25maWcuZGF0YTtcbiAgICBjb25zdCByZXF1ZXN0SGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKF9jb25maWcuaGVhZGVycykubm9ybWFsaXplKCk7XG4gICAgbGV0IHtyZXNwb25zZVR5cGV9ID0gX2NvbmZpZztcbiAgICBsZXQgb25DYW5jZWxlZDtcbiAgICBmdW5jdGlvbiBkb25lKCkge1xuICAgICAgaWYgKF9jb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgICAgX2NvbmZpZy5jYW5jZWxUb2tlbi51bnN1YnNjcmliZShvbkNhbmNlbGVkKTtcbiAgICAgIH1cblxuICAgICAgaWYgKF9jb25maWcuc2lnbmFsKSB7XG4gICAgICAgIF9jb25maWcuc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIHJlcXVlc3Qub3BlbihfY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBfY29uZmlnLnVybCwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IF9jb25maWcudGltZW91dDtcblxuICAgIGZ1bmN0aW9uIG9ubG9hZGVuZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgY29uc3QgcmVzcG9uc2VIZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oXG4gICAgICAgICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgJiYgcmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9ICFyZXNwb25zZVR5cGUgfHwgcmVzcG9uc2VUeXBlID09PSAndGV4dCcgfHwgcmVzcG9uc2VUeXBlID09PSAnanNvbicgP1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICBjb25zdCByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUoZnVuY3Rpb24gX3Jlc29sdmUodmFsdWUpIHtcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0sIGZ1bmN0aW9uIF9yZWplY3QoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICgnb25sb2FkZW5kJyBpbiByZXF1ZXN0KSB7XG4gICAgICAvLyBVc2Ugb25sb2FkZW5kIGlmIGF2YWlsYWJsZVxuICAgICAgcmVxdWVzdC5vbmxvYWRlbmQgPSBvbmxvYWRlbmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGUgdG8gZW11bGF0ZSBvbmxvYWRlbmRcbiAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0IHx8IHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyByZWFkeXN0YXRlIGhhbmRsZXIgaXMgY2FsbGluZyBiZWZvcmUgb25lcnJvciBvciBvbnRpbWVvdXQgaGFuZGxlcnMsXG4gICAgICAgIC8vIHNvIHdlIHNob3VsZCBjYWxsIG9ubG9hZGVuZCBvbiB0aGUgbmV4dCAndGljaydcbiAgICAgICAgc2V0VGltZW91dChvbmxvYWRlbmQpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELCBfY29uZmlnLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdOZXR3b3JrIEVycm9yJywgQXhpb3NFcnJvci5FUlJfTkVUV09SSywgX2NvbmZpZywgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICBsZXQgdGltZW91dEVycm9yTWVzc2FnZSA9IF9jb25maWcudGltZW91dCA/ICd0aW1lb3V0IG9mICcgKyBfY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnIDogJ3RpbWVvdXQgZXhjZWVkZWQnO1xuICAgICAgY29uc3QgdHJhbnNpdGlvbmFsID0gX2NvbmZpZy50cmFuc2l0aW9uYWwgfHwgdHJhbnNpdGlvbmFsRGVmYXVsdHM7XG4gICAgICBpZiAoX2NvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBfY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2U7XG4gICAgICB9XG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UsXG4gICAgICAgIHRyYW5zaXRpb25hbC5jbGFyaWZ5VGltZW91dEVycm9yID8gQXhpb3NFcnJvci5FVElNRURPVVQgOiBBeGlvc0Vycm9yLkVDT05OQUJPUlRFRCxcbiAgICAgICAgX2NvbmZpZyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgIHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQgJiYgcmVxdWVzdEhlYWRlcnMuc2V0Q29udGVudFR5cGUobnVsbCk7XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycy50b0pTT04oKSwgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoX2NvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhX2NvbmZpZy53aXRoQ3JlZGVudGlhbHM7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChyZXNwb25zZVR5cGUgJiYgcmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gX2NvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuICAgIGlmICh0eXBlb2YgX2NvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBwcm9ncmVzc0V2ZW50UmVkdWNlcihfY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcywgdHJ1ZSkpO1xuICAgIH1cblxuICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgaWYgKHR5cGVvZiBfY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgcHJvZ3Jlc3NFdmVudFJlZHVjZXIoX2NvbmZpZy5vblVwbG9hZFByb2dyZXNzKSk7XG4gICAgfVxuXG4gICAgaWYgKF9jb25maWcuY2FuY2VsVG9rZW4gfHwgX2NvbmZpZy5zaWduYWwpIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgICBvbkNhbmNlbGVkID0gY2FuY2VsID0+IHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlamVjdCghY2FuY2VsIHx8IGNhbmNlbC50eXBlID8gbmV3IENhbmNlbGVkRXJyb3IobnVsbCwgY29uZmlnLCByZXF1ZXN0KSA6IGNhbmNlbCk7XG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9O1xuXG4gICAgICBfY29uZmlnLmNhbmNlbFRva2VuICYmIF9jb25maWcuY2FuY2VsVG9rZW4uc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuICAgICAgaWYgKF9jb25maWcuc2lnbmFsKSB7XG4gICAgICAgIF9jb25maWcuc2lnbmFsLmFib3J0ZWQgPyBvbkNhbmNlbGVkKCkgOiBfY29uZmlnLnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHByb3RvY29sID0gcGFyc2VQcm90b2NvbChfY29uZmlnLnVybCk7XG5cbiAgICBpZiAocHJvdG9jb2wgJiYgcGxhdGZvcm0ucHJvdG9jb2xzLmluZGV4T2YocHJvdG9jb2wpID09PSAtMSkge1xuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdVbnN1cHBvcnRlZCBwcm90b2NvbCAnICsgcHJvdG9jb2wgKyAnOicsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBjb25maWcpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEgfHwgbnVsbCk7XG4gIH0pO1xufVxuIiwgImltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gXCIuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qc1wiO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSBcIi4uL2NvcmUvQXhpb3NFcnJvci5qc1wiO1xuXG5jb25zdCBjb21wb3NlU2lnbmFscyA9IChzaWduYWxzLCB0aW1lb3V0KSA9PiB7XG4gIGxldCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXG4gIGxldCBhYm9ydGVkO1xuXG4gIGNvbnN0IG9uYWJvcnQgPSBmdW5jdGlvbiAoY2FuY2VsKSB7XG4gICAgaWYgKCFhYm9ydGVkKSB7XG4gICAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgICAgIHVuc3Vic2NyaWJlKCk7XG4gICAgICBjb25zdCBlcnIgPSBjYW5jZWwgaW5zdGFuY2VvZiBFcnJvciA/IGNhbmNlbCA6IHRoaXMucmVhc29uO1xuICAgICAgY29udHJvbGxlci5hYm9ydChlcnIgaW5zdGFuY2VvZiBBeGlvc0Vycm9yID8gZXJyIDogbmV3IENhbmNlbGVkRXJyb3IoZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6IGVycikpO1xuICAgIH1cbiAgfVxuXG4gIGxldCB0aW1lciA9IHRpbWVvdXQgJiYgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgb25hYm9ydChuZXcgQXhpb3NFcnJvcihgdGltZW91dCAke3RpbWVvdXR9IG9mIG1zIGV4Y2VlZGVkYCwgQXhpb3NFcnJvci5FVElNRURPVVQpKVxuICB9LCB0aW1lb3V0KVxuXG4gIGNvbnN0IHVuc3Vic2NyaWJlID0gKCkgPT4ge1xuICAgIGlmIChzaWduYWxzKSB7XG4gICAgICB0aW1lciAmJiBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgc2lnbmFscy5mb3JFYWNoKHNpZ25hbCA9PiB7XG4gICAgICAgIHNpZ25hbCAmJlxuICAgICAgICAoc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIgPyBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbmFib3J0KSA6IHNpZ25hbC51bnN1YnNjcmliZShvbmFib3J0KSk7XG4gICAgICB9KTtcbiAgICAgIHNpZ25hbHMgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHNpZ25hbHMuZm9yRWFjaCgoc2lnbmFsKSA9PiBzaWduYWwgJiYgc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIgJiYgc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25hYm9ydCkpO1xuXG4gIGNvbnN0IHtzaWduYWx9ID0gY29udHJvbGxlcjtcblxuICBzaWduYWwudW5zdWJzY3JpYmUgPSB1bnN1YnNjcmliZTtcblxuICByZXR1cm4gW3NpZ25hbCwgKCkgPT4ge1xuICAgIHRpbWVyICYmIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgdGltZXIgPSBudWxsO1xuICB9XTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29tcG9zZVNpZ25hbHM7XG4iLCAiXG5cbmV4cG9ydCBjb25zdCBzdHJlYW1DaHVuayA9IGZ1bmN0aW9uKiAoY2h1bmssIGNodW5rU2l6ZSkge1xuICBsZXQgbGVuID0gY2h1bmsuYnl0ZUxlbmd0aDtcblxuICBpZiAoIWNodW5rU2l6ZSB8fCBsZW4gPCBjaHVua1NpemUpIHtcbiAgICB5aWVsZCBjaHVuaztcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgcG9zID0gMDtcbiAgbGV0IGVuZDtcblxuICB3aGlsZSAocG9zIDwgbGVuKSB7XG4gICAgZW5kID0gcG9zICsgY2h1bmtTaXplO1xuICAgIHlpZWxkIGNodW5rLnNsaWNlKHBvcywgZW5kKTtcbiAgICBwb3MgPSBlbmQ7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHJlYWRCeXRlcyA9IGFzeW5jIGZ1bmN0aW9uKiAoaXRlcmFibGUsIGNodW5rU2l6ZSwgZW5jb2RlKSB7XG4gIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2YgaXRlcmFibGUpIHtcbiAgICB5aWVsZCogc3RyZWFtQ2h1bmsoQXJyYXlCdWZmZXIuaXNWaWV3KGNodW5rKSA/IGNodW5rIDogKGF3YWl0IGVuY29kZShTdHJpbmcoY2h1bmspKSksIGNodW5rU2l6ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHRyYWNrU3RyZWFtID0gKHN0cmVhbSwgY2h1bmtTaXplLCBvblByb2dyZXNzLCBvbkZpbmlzaCwgZW5jb2RlKSA9PiB7XG4gIGNvbnN0IGl0ZXJhdG9yID0gcmVhZEJ5dGVzKHN0cmVhbSwgY2h1bmtTaXplLCBlbmNvZGUpO1xuXG4gIGxldCBieXRlcyA9IDA7XG5cbiAgcmV0dXJuIG5ldyBSZWFkYWJsZVN0cmVhbSh7XG4gICAgdHlwZTogJ2J5dGVzJyxcblxuICAgIGFzeW5jIHB1bGwoY29udHJvbGxlcikge1xuICAgICAgY29uc3Qge2RvbmUsIHZhbHVlfSA9IGF3YWl0IGl0ZXJhdG9yLm5leHQoKTtcblxuICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgY29udHJvbGxlci5jbG9zZSgpO1xuICAgICAgICBvbkZpbmlzaCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBsZW4gPSB2YWx1ZS5ieXRlTGVuZ3RoO1xuICAgICAgb25Qcm9ncmVzcyAmJiBvblByb2dyZXNzKGJ5dGVzICs9IGxlbik7XG4gICAgICBjb250cm9sbGVyLmVucXVldWUobmV3IFVpbnQ4QXJyYXkodmFsdWUpKTtcbiAgICB9LFxuICAgIGNhbmNlbChyZWFzb24pIHtcbiAgICAgIG9uRmluaXNoKHJlYXNvbik7XG4gICAgICByZXR1cm4gaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgfVxuICB9LCB7XG4gICAgaGlnaFdhdGVyTWFyazogMlxuICB9KVxufVxuIiwgImltcG9ydCBwbGF0Zm9ybSBmcm9tIFwiLi4vcGxhdGZvcm0vaW5kZXguanNcIjtcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vdXRpbHMuanNcIjtcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gXCIuLi9jb3JlL0F4aW9zRXJyb3IuanNcIjtcbmltcG9ydCBjb21wb3NlU2lnbmFscyBmcm9tIFwiLi4vaGVscGVycy9jb21wb3NlU2lnbmFscy5qc1wiO1xuaW1wb3J0IHt0cmFja1N0cmVhbX0gZnJvbSBcIi4uL2hlbHBlcnMvdHJhY2tTdHJlYW0uanNcIjtcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSBcIi4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzXCI7XG5pbXBvcnQgcHJvZ3Jlc3NFdmVudFJlZHVjZXIgZnJvbSBcIi4uL2hlbHBlcnMvcHJvZ3Jlc3NFdmVudFJlZHVjZXIuanNcIjtcbmltcG9ydCByZXNvbHZlQ29uZmlnIGZyb20gXCIuLi9oZWxwZXJzL3Jlc29sdmVDb25maWcuanNcIjtcbmltcG9ydCBzZXR0bGUgZnJvbSBcIi4uL2NvcmUvc2V0dGxlLmpzXCI7XG5cbmNvbnN0IGZldGNoUHJvZ3Jlc3NEZWNvcmF0b3IgPSAodG90YWwsIGZuKSA9PiB7XG4gIGNvbnN0IGxlbmd0aENvbXB1dGFibGUgPSB0b3RhbCAhPSBudWxsO1xuICByZXR1cm4gKGxvYWRlZCkgPT4gc2V0VGltZW91dCgoKSA9PiBmbih7XG4gICAgbGVuZ3RoQ29tcHV0YWJsZSxcbiAgICB0b3RhbCxcbiAgICBsb2FkZWRcbiAgfSkpO1xufVxuXG5jb25zdCBpc0ZldGNoU3VwcG9ydGVkID0gdHlwZW9mIGZldGNoID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBSZXF1ZXN0ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBSZXNwb25zZSA9PT0gJ2Z1bmN0aW9uJztcbmNvbnN0IGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgPSBpc0ZldGNoU3VwcG9ydGVkICYmIHR5cGVvZiBSZWFkYWJsZVN0cmVhbSA9PT0gJ2Z1bmN0aW9uJztcblxuLy8gdXNlZCBvbmx5IGluc2lkZSB0aGUgZmV0Y2ggYWRhcHRlclxuY29uc3QgZW5jb2RlVGV4dCA9IGlzRmV0Y2hTdXBwb3J0ZWQgJiYgKHR5cGVvZiBUZXh0RW5jb2RlciA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgKChlbmNvZGVyKSA9PiAoc3RyKSA9PiBlbmNvZGVyLmVuY29kZShzdHIpKShuZXcgVGV4dEVuY29kZXIoKSkgOlxuICAgIGFzeW5jIChzdHIpID0+IG5ldyBVaW50OEFycmF5KGF3YWl0IG5ldyBSZXNwb25zZShzdHIpLmFycmF5QnVmZmVyKCkpXG4pO1xuXG5jb25zdCBzdXBwb3J0c1JlcXVlc3RTdHJlYW0gPSBpc1JlYWRhYmxlU3RyZWFtU3VwcG9ydGVkICYmICgoKSA9PiB7XG4gIGxldCBkdXBsZXhBY2Nlc3NlZCA9IGZhbHNlO1xuXG4gIGNvbnN0IGhhc0NvbnRlbnRUeXBlID0gbmV3IFJlcXVlc3QocGxhdGZvcm0ub3JpZ2luLCB7XG4gICAgYm9keTogbmV3IFJlYWRhYmxlU3RyZWFtKCksXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgZ2V0IGR1cGxleCgpIHtcbiAgICAgIGR1cGxleEFjY2Vzc2VkID0gdHJ1ZTtcbiAgICAgIHJldHVybiAnaGFsZic7XG4gICAgfSxcbiAgfSkuaGVhZGVycy5oYXMoJ0NvbnRlbnQtVHlwZScpO1xuXG4gIHJldHVybiBkdXBsZXhBY2Nlc3NlZCAmJiAhaGFzQ29udGVudFR5cGU7XG59KSgpO1xuXG5jb25zdCBERUZBVUxUX0NIVU5LX1NJWkUgPSA2NCAqIDEwMjQ7XG5cbmNvbnN0IHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gPSBpc1JlYWRhYmxlU3RyZWFtU3VwcG9ydGVkICYmICEhKCgpPT4ge1xuICB0cnkge1xuICAgIHJldHVybiB1dGlscy5pc1JlYWRhYmxlU3RyZWFtKG5ldyBSZXNwb25zZSgnJykuYm9keSk7XG4gIH0gY2F0Y2goZXJyKSB7XG4gICAgLy8gcmV0dXJuIHVuZGVmaW5lZFxuICB9XG59KSgpO1xuXG5jb25zdCByZXNvbHZlcnMgPSB7XG4gIHN0cmVhbTogc3VwcG9ydHNSZXNwb25zZVN0cmVhbSAmJiAoKHJlcykgPT4gcmVzLmJvZHkpXG59O1xuXG5pc0ZldGNoU3VwcG9ydGVkICYmICgoKHJlcykgPT4ge1xuICBbJ3RleHQnLCAnYXJyYXlCdWZmZXInLCAnYmxvYicsICdmb3JtRGF0YScsICdzdHJlYW0nXS5mb3JFYWNoKHR5cGUgPT4ge1xuICAgICFyZXNvbHZlcnNbdHlwZV0gJiYgKHJlc29sdmVyc1t0eXBlXSA9IHV0aWxzLmlzRnVuY3Rpb24ocmVzW3R5cGVdKSA/IChyZXMpID0+IHJlc1t0eXBlXSgpIDpcbiAgICAgIChfLCBjb25maWcpID0+IHtcbiAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoYFJlc3BvbnNlIHR5cGUgJyR7dHlwZX0nIGlzIG5vdCBzdXBwb3J0ZWRgLCBBeGlvc0Vycm9yLkVSUl9OT1RfU1VQUE9SVCwgY29uZmlnKTtcbiAgICAgIH0pXG4gIH0pO1xufSkobmV3IFJlc3BvbnNlKSk7XG5cbmNvbnN0IGdldEJvZHlMZW5ndGggPSBhc3luYyAoYm9keSkgPT4ge1xuICBpZiAoYm9keSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBpZih1dGlscy5pc0Jsb2IoYm9keSkpIHtcbiAgICByZXR1cm4gYm9keS5zaXplO1xuICB9XG5cbiAgaWYodXRpbHMuaXNTcGVjQ29tcGxpYW50Rm9ybShib2R5KSkge1xuICAgIHJldHVybiAoYXdhaXQgbmV3IFJlcXVlc3QoYm9keSkuYXJyYXlCdWZmZXIoKSkuYnl0ZUxlbmd0aDtcbiAgfVxuXG4gIGlmKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGJvZHkpKSB7XG4gICAgcmV0dXJuIGJvZHkuYnl0ZUxlbmd0aDtcbiAgfVxuXG4gIGlmKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGJvZHkpKSB7XG4gICAgYm9keSA9IGJvZHkgKyAnJztcbiAgfVxuXG4gIGlmKHV0aWxzLmlzU3RyaW5nKGJvZHkpKSB7XG4gICAgcmV0dXJuIChhd2FpdCBlbmNvZGVUZXh0KGJvZHkpKS5ieXRlTGVuZ3RoO1xuICB9XG59XG5cbmNvbnN0IHJlc29sdmVCb2R5TGVuZ3RoID0gYXN5bmMgKGhlYWRlcnMsIGJvZHkpID0+IHtcbiAgY29uc3QgbGVuZ3RoID0gdXRpbHMudG9GaW5pdGVOdW1iZXIoaGVhZGVycy5nZXRDb250ZW50TGVuZ3RoKCkpO1xuXG4gIHJldHVybiBsZW5ndGggPT0gbnVsbCA/IGdldEJvZHlMZW5ndGgoYm9keSkgOiBsZW5ndGg7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzRmV0Y2hTdXBwb3J0ZWQgJiYgKGFzeW5jIChjb25maWcpID0+IHtcbiAgbGV0IHtcbiAgICB1cmwsXG4gICAgbWV0aG9kLFxuICAgIGRhdGEsXG4gICAgc2lnbmFsLFxuICAgIGNhbmNlbFRva2VuLFxuICAgIHRpbWVvdXQsXG4gICAgb25Eb3dubG9hZFByb2dyZXNzLFxuICAgIG9uVXBsb2FkUHJvZ3Jlc3MsXG4gICAgcmVzcG9uc2VUeXBlLFxuICAgIGhlYWRlcnMsXG4gICAgd2l0aENyZWRlbnRpYWxzID0gJ3NhbWUtb3JpZ2luJyxcbiAgICBmZXRjaE9wdGlvbnNcbiAgfSA9IHJlc29sdmVDb25maWcoY29uZmlnKTtcblxuICByZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGUgPyAocmVzcG9uc2VUeXBlICsgJycpLnRvTG93ZXJDYXNlKCkgOiAndGV4dCc7XG5cbiAgbGV0IFtjb21wb3NlZFNpZ25hbCwgc3RvcFRpbWVvdXRdID0gKHNpZ25hbCB8fCBjYW5jZWxUb2tlbiB8fCB0aW1lb3V0KSA/XG4gICAgY29tcG9zZVNpZ25hbHMoW3NpZ25hbCwgY2FuY2VsVG9rZW5dLCB0aW1lb3V0KSA6IFtdO1xuXG4gIGxldCBmaW5pc2hlZCwgcmVxdWVzdDtcblxuICBjb25zdCBvbkZpbmlzaCA9ICgpID0+IHtcbiAgICAhZmluaXNoZWQgJiYgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb21wb3NlZFNpZ25hbCAmJiBjb21wb3NlZFNpZ25hbC51bnN1YnNjcmliZSgpO1xuICAgIH0pO1xuXG4gICAgZmluaXNoZWQgPSB0cnVlO1xuICB9XG5cbiAgbGV0IHJlcXVlc3RDb250ZW50TGVuZ3RoO1xuXG4gIHRyeSB7XG4gICAgaWYgKFxuICAgICAgb25VcGxvYWRQcm9ncmVzcyAmJiBzdXBwb3J0c1JlcXVlc3RTdHJlYW0gJiYgbWV0aG9kICE9PSAnZ2V0JyAmJiBtZXRob2QgIT09ICdoZWFkJyAmJlxuICAgICAgKHJlcXVlc3RDb250ZW50TGVuZ3RoID0gYXdhaXQgcmVzb2x2ZUJvZHlMZW5ndGgoaGVhZGVycywgZGF0YSkpICE9PSAwXG4gICAgKSB7XG4gICAgICBsZXQgX3JlcXVlc3QgPSBuZXcgUmVxdWVzdCh1cmwsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IGRhdGEsXG4gICAgICAgIGR1cGxleDogXCJoYWxmXCJcbiAgICAgIH0pO1xuXG4gICAgICBsZXQgY29udGVudFR5cGVIZWFkZXI7XG5cbiAgICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpICYmIChjb250ZW50VHlwZUhlYWRlciA9IF9yZXF1ZXN0LmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkpIHtcbiAgICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZShjb250ZW50VHlwZUhlYWRlcilcbiAgICAgIH1cblxuICAgICAgaWYgKF9yZXF1ZXN0LmJvZHkpIHtcbiAgICAgICAgZGF0YSA9IHRyYWNrU3RyZWFtKF9yZXF1ZXN0LmJvZHksIERFRkFVTFRfQ0hVTktfU0laRSwgZmV0Y2hQcm9ncmVzc0RlY29yYXRvcihcbiAgICAgICAgICByZXF1ZXN0Q29udGVudExlbmd0aCxcbiAgICAgICAgICBwcm9ncmVzc0V2ZW50UmVkdWNlcihvblVwbG9hZFByb2dyZXNzKVxuICAgICAgICApLCBudWxsLCBlbmNvZGVUZXh0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXV0aWxzLmlzU3RyaW5nKHdpdGhDcmVkZW50aWFscykpIHtcbiAgICAgIHdpdGhDcmVkZW50aWFscyA9IHdpdGhDcmVkZW50aWFscyA/ICdjb3JzJyA6ICdvbWl0JztcbiAgICB9XG5cbiAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsLCB7XG4gICAgICAuLi5mZXRjaE9wdGlvbnMsXG4gICAgICBzaWduYWw6IGNvbXBvc2VkU2lnbmFsLFxuICAgICAgbWV0aG9kOiBtZXRob2QudG9VcHBlckNhc2UoKSxcbiAgICAgIGhlYWRlcnM6IGhlYWRlcnMubm9ybWFsaXplKCkudG9KU09OKCksXG4gICAgICBib2R5OiBkYXRhLFxuICAgICAgZHVwbGV4OiBcImhhbGZcIixcbiAgICAgIHdpdGhDcmVkZW50aWFsc1xuICAgIH0pO1xuXG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocmVxdWVzdCk7XG5cbiAgICBjb25zdCBpc1N0cmVhbVJlc3BvbnNlID0gc3VwcG9ydHNSZXNwb25zZVN0cmVhbSAmJiAocmVzcG9uc2VUeXBlID09PSAnc3RyZWFtJyB8fCByZXNwb25zZVR5cGUgPT09ICdyZXNwb25zZScpO1xuXG4gICAgaWYgKHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgKG9uRG93bmxvYWRQcm9ncmVzcyB8fCBpc1N0cmVhbVJlc3BvbnNlKSkge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuXG4gICAgICBbJ3N0YXR1cycsICdzdGF0dXNUZXh0JywgJ2hlYWRlcnMnXS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICBvcHRpb25zW3Byb3BdID0gcmVzcG9uc2VbcHJvcF07XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgcmVzcG9uc2VDb250ZW50TGVuZ3RoID0gdXRpbHMudG9GaW5pdGVOdW1iZXIocmVzcG9uc2UuaGVhZGVycy5nZXQoJ2NvbnRlbnQtbGVuZ3RoJykpO1xuXG4gICAgICByZXNwb25zZSA9IG5ldyBSZXNwb25zZShcbiAgICAgICAgdHJhY2tTdHJlYW0ocmVzcG9uc2UuYm9keSwgREVGQVVMVF9DSFVOS19TSVpFLCBvbkRvd25sb2FkUHJvZ3Jlc3MgJiYgZmV0Y2hQcm9ncmVzc0RlY29yYXRvcihcbiAgICAgICAgICByZXNwb25zZUNvbnRlbnRMZW5ndGgsXG4gICAgICAgICAgcHJvZ3Jlc3NFdmVudFJlZHVjZXIob25Eb3dubG9hZFByb2dyZXNzLCB0cnVlKVxuICAgICAgICApLCBpc1N0cmVhbVJlc3BvbnNlICYmIG9uRmluaXNoLCBlbmNvZGVUZXh0KSxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGUgfHwgJ3RleHQnO1xuXG4gICAgbGV0IHJlc3BvbnNlRGF0YSA9IGF3YWl0IHJlc29sdmVyc1t1dGlscy5maW5kS2V5KHJlc29sdmVycywgcmVzcG9uc2VUeXBlKSB8fCAndGV4dCddKHJlc3BvbnNlLCBjb25maWcpO1xuXG4gICAgIWlzU3RyZWFtUmVzcG9uc2UgJiYgb25GaW5pc2goKTtcblxuICAgIHN0b3BUaW1lb3V0ICYmIHN0b3BUaW1lb3V0KCk7XG5cbiAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIGhlYWRlcnM6IEF4aW9zSGVhZGVycy5mcm9tKHJlc3BvbnNlLmhlYWRlcnMpLFxuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVzcG9uc2Uuc3RhdHVzVGV4dCxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICByZXF1ZXN0XG4gICAgICB9KVxuICAgIH0pXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIG9uRmluaXNoKCk7XG5cbiAgICBpZiAoZXJyICYmIGVyci5uYW1lID09PSAnVHlwZUVycm9yJyAmJiAvZmV0Y2gvaS50ZXN0KGVyci5tZXNzYWdlKSkge1xuICAgICAgdGhyb3cgT2JqZWN0LmFzc2lnbihcbiAgICAgICAgbmV3IEF4aW9zRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBBeGlvc0Vycm9yLkVSUl9ORVRXT1JLLCBjb25maWcsIHJlcXVlc3QpLFxuICAgICAgICB7XG4gICAgICAgICAgY2F1c2U6IGVyci5jYXVzZSB8fCBlcnJcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cblxuICAgIHRocm93IEF4aW9zRXJyb3IuZnJvbShlcnIsIGVyciAmJiBlcnIuY29kZSwgY29uZmlnLCByZXF1ZXN0KTtcbiAgfVxufSk7XG5cblxuIiwgImltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgaHR0cEFkYXB0ZXIgZnJvbSAnLi9odHRwLmpzJztcbmltcG9ydCB4aHJBZGFwdGVyIGZyb20gJy4veGhyLmpzJztcbmltcG9ydCBmZXRjaEFkYXB0ZXIgZnJvbSAnLi9mZXRjaC5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tIFwiLi4vY29yZS9BeGlvc0Vycm9yLmpzXCI7XG5cbmNvbnN0IGtub3duQWRhcHRlcnMgPSB7XG4gIGh0dHA6IGh0dHBBZGFwdGVyLFxuICB4aHI6IHhockFkYXB0ZXIsXG4gIGZldGNoOiBmZXRjaEFkYXB0ZXJcbn1cblxudXRpbHMuZm9yRWFjaChrbm93bkFkYXB0ZXJzLCAoZm4sIHZhbHVlKSA9PiB7XG4gIGlmIChmbikge1xuICAgIHRyeSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sICduYW1lJywge3ZhbHVlfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVtcHR5XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgJ2FkYXB0ZXJOYW1lJywge3ZhbHVlfSk7XG4gIH1cbn0pO1xuXG5jb25zdCByZW5kZXJSZWFzb24gPSAocmVhc29uKSA9PiBgLSAke3JlYXNvbn1gO1xuXG5jb25zdCBpc1Jlc29sdmVkSGFuZGxlID0gKGFkYXB0ZXIpID0+IHV0aWxzLmlzRnVuY3Rpb24oYWRhcHRlcikgfHwgYWRhcHRlciA9PT0gbnVsbCB8fCBhZGFwdGVyID09PSBmYWxzZTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBnZXRBZGFwdGVyOiAoYWRhcHRlcnMpID0+IHtcbiAgICBhZGFwdGVycyA9IHV0aWxzLmlzQXJyYXkoYWRhcHRlcnMpID8gYWRhcHRlcnMgOiBbYWRhcHRlcnNdO1xuXG4gICAgY29uc3Qge2xlbmd0aH0gPSBhZGFwdGVycztcbiAgICBsZXQgbmFtZU9yQWRhcHRlcjtcbiAgICBsZXQgYWRhcHRlcjtcblxuICAgIGNvbnN0IHJlamVjdGVkUmVhc29ucyA9IHt9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgbmFtZU9yQWRhcHRlciA9IGFkYXB0ZXJzW2ldO1xuICAgICAgbGV0IGlkO1xuXG4gICAgICBhZGFwdGVyID0gbmFtZU9yQWRhcHRlcjtcblxuICAgICAgaWYgKCFpc1Jlc29sdmVkSGFuZGxlKG5hbWVPckFkYXB0ZXIpKSB7XG4gICAgICAgIGFkYXB0ZXIgPSBrbm93bkFkYXB0ZXJzWyhpZCA9IFN0cmluZyhuYW1lT3JBZGFwdGVyKSkudG9Mb3dlckNhc2UoKV07XG5cbiAgICAgICAgaWYgKGFkYXB0ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKGBVbmtub3duIGFkYXB0ZXIgJyR7aWR9J2ApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChhZGFwdGVyKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICByZWplY3RlZFJlYXNvbnNbaWQgfHwgJyMnICsgaV0gPSBhZGFwdGVyO1xuICAgIH1cblxuICAgIGlmICghYWRhcHRlcikge1xuXG4gICAgICBjb25zdCByZWFzb25zID0gT2JqZWN0LmVudHJpZXMocmVqZWN0ZWRSZWFzb25zKVxuICAgICAgICAubWFwKChbaWQsIHN0YXRlXSkgPT4gYGFkYXB0ZXIgJHtpZH0gYCArXG4gICAgICAgICAgKHN0YXRlID09PSBmYWxzZSA/ICdpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBlbnZpcm9ubWVudCcgOiAnaXMgbm90IGF2YWlsYWJsZSBpbiB0aGUgYnVpbGQnKVxuICAgICAgICApO1xuXG4gICAgICBsZXQgcyA9IGxlbmd0aCA/XG4gICAgICAgIChyZWFzb25zLmxlbmd0aCA+IDEgPyAnc2luY2UgOlxcbicgKyByZWFzb25zLm1hcChyZW5kZXJSZWFzb24pLmpvaW4oJ1xcbicpIDogJyAnICsgcmVuZGVyUmVhc29uKHJlYXNvbnNbMF0pKSA6XG4gICAgICAgICdhcyBubyBhZGFwdGVyIHNwZWNpZmllZCc7XG5cbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICBgVGhlcmUgaXMgbm8gc3VpdGFibGUgYWRhcHRlciB0byBkaXNwYXRjaCB0aGUgcmVxdWVzdCBgICsgcyxcbiAgICAgICAgJ0VSUl9OT1RfU1VQUE9SVCdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFkYXB0ZXI7XG4gIH0sXG4gIGFkYXB0ZXJzOiBrbm93bkFkYXB0ZXJzXG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdHJhbnNmb3JtRGF0YSBmcm9tICcuL3RyYW5zZm9ybURhdGEuanMnO1xuaW1wb3J0IGlzQ2FuY2VsIGZyb20gJy4uL2NhbmNlbC9pc0NhbmNlbC5qcyc7XG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvaW5kZXguanMnO1xuaW1wb3J0IENhbmNlbGVkRXJyb3IgZnJvbSAnLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuLi9jb3JlL0F4aW9zSGVhZGVycy5qcyc7XG5pbXBvcnQgYWRhcHRlcnMgZnJvbSBcIi4uL2FkYXB0ZXJzL2FkYXB0ZXJzLmpzXCI7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGVkRXJyb3JgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cblxuICBpZiAoY29uZmlnLnNpZ25hbCAmJiBjb25maWcuc2lnbmFsLmFib3J0ZWQpIHtcbiAgICB0aHJvdyBuZXcgQ2FuY2VsZWRFcnJvcihudWxsLCBjb25maWcpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgY29uZmlnLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShjb25maWcuaGVhZGVycyk7XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICBjb25maWcsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICBpZiAoWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLmluZGV4T2YoY29uZmlnLm1ldGhvZCkgIT09IC0xKSB7XG4gICAgY29uZmlnLmhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsIGZhbHNlKTtcbiAgfVxuXG4gIGNvbnN0IGFkYXB0ZXIgPSBhZGFwdGVycy5nZXRBZGFwdGVyKGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXIpO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgICAgY29uZmlnLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlLFxuICAgICAgcmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmVzcG9uc2UuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKHJlc3BvbnNlLmhlYWRlcnMpO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZVxuICAgICAgICApO1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59XG4iLCAiZXhwb3J0IGNvbnN0IFZFUlNJT04gPSBcIjEuNy4yXCI7IiwgIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHtWRVJTSU9OfSBmcm9tICcuLi9lbnYvZGF0YS5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuXG5jb25zdCB2YWxpZGF0b3JzID0ge307XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5bJ29iamVjdCcsICdib29sZWFuJywgJ251bWJlcicsICdmdW5jdGlvbicsICdzdHJpbmcnLCAnc3ltYm9sJ10uZm9yRWFjaCgodHlwZSwgaSkgPT4ge1xuICB2YWxpZGF0b3JzW3R5cGVdID0gZnVuY3Rpb24gdmFsaWRhdG9yKHRoaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gdHlwZSB8fCAnYScgKyAoaSA8IDEgPyAnbiAnIDogJyAnKSArIHR5cGU7XG4gIH07XG59KTtcblxuY29uc3QgZGVwcmVjYXRlZFdhcm5pbmdzID0ge307XG5cbi8qKlxuICogVHJhbnNpdGlvbmFsIG9wdGlvbiB2YWxpZGF0b3JcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufGJvb2xlYW4/fSB2YWxpZGF0b3IgLSBzZXQgdG8gZmFsc2UgaWYgdGhlIHRyYW5zaXRpb25hbCBvcHRpb24gaGFzIGJlZW4gcmVtb3ZlZFxuICogQHBhcmFtIHtzdHJpbmc/fSB2ZXJzaW9uIC0gZGVwcmVjYXRlZCB2ZXJzaW9uIC8gcmVtb3ZlZCBzaW5jZSB2ZXJzaW9uXG4gKiBAcGFyYW0ge3N0cmluZz99IG1lc3NhZ2UgLSBzb21lIG1lc3NhZ2Ugd2l0aCBhZGRpdGlvbmFsIGluZm9cbiAqXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gKi9cbnZhbGlkYXRvcnMudHJhbnNpdGlvbmFsID0gZnVuY3Rpb24gdHJhbnNpdGlvbmFsKHZhbGlkYXRvciwgdmVyc2lvbiwgbWVzc2FnZSkge1xuICBmdW5jdGlvbiBmb3JtYXRNZXNzYWdlKG9wdCwgZGVzYykge1xuICAgIHJldHVybiAnW0F4aW9zIHYnICsgVkVSU0lPTiArICddIFRyYW5zaXRpb25hbCBvcHRpb24gXFwnJyArIG9wdCArICdcXCcnICsgZGVzYyArIChtZXNzYWdlID8gJy4gJyArIG1lc3NhZ2UgOiAnJyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gKHZhbHVlLCBvcHQsIG9wdHMpID0+IHtcbiAgICBpZiAodmFsaWRhdG9yID09PSBmYWxzZSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgIGZvcm1hdE1lc3NhZ2Uob3B0LCAnIGhhcyBiZWVuIHJlbW92ZWQnICsgKHZlcnNpb24gPyAnIGluICcgKyB2ZXJzaW9uIDogJycpKSxcbiAgICAgICAgQXhpb3NFcnJvci5FUlJfREVQUkVDQVRFRFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodmVyc2lvbiAmJiAhZGVwcmVjYXRlZFdhcm5pbmdzW29wdF0pIHtcbiAgICAgIGRlcHJlY2F0ZWRXYXJuaW5nc1tvcHRdID0gdHJ1ZTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGZvcm1hdE1lc3NhZ2UoXG4gICAgICAgICAgb3B0LFxuICAgICAgICAgICcgaGFzIGJlZW4gZGVwcmVjYXRlZCBzaW5jZSB2JyArIHZlcnNpb24gKyAnIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5lYXIgZnV0dXJlJ1xuICAgICAgICApXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB2YWxpZGF0b3IgPyB2YWxpZGF0b3IodmFsdWUsIG9wdCwgb3B0cykgOiB0cnVlO1xuICB9O1xufTtcblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0J3MgcHJvcGVydGllcyB0eXBlXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBzY2hlbWFcbiAqIEBwYXJhbSB7Ym9vbGVhbj99IGFsbG93VW5rbm93blxuICpcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKi9cblxuZnVuY3Rpb24gYXNzZXJ0T3B0aW9ucyhvcHRpb25zLCBzY2hlbWEsIGFsbG93VW5rbm93bikge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ29wdGlvbnMgbXVzdCBiZSBhbiBvYmplY3QnLCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OX1ZBTFVFKTtcbiAgfVxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob3B0aW9ucyk7XG4gIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgY29uc3Qgb3B0ID0ga2V5c1tpXTtcbiAgICBjb25zdCB2YWxpZGF0b3IgPSBzY2hlbWFbb3B0XTtcbiAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnNbb3B0XTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsaWRhdG9yKHZhbHVlLCBvcHQsIG9wdGlvbnMpO1xuICAgICAgaWYgKHJlc3VsdCAhPT0gdHJ1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignb3B0aW9uICcgKyBvcHQgKyAnIG11c3QgYmUgJyArIHJlc3VsdCwgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSk7XG4gICAgICB9XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKGFsbG93VW5rbm93biAhPT0gdHJ1ZSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ1Vua25vd24gb3B0aW9uICcgKyBvcHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT04pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFzc2VydE9wdGlvbnMsXG4gIHZhbGlkYXRvcnNcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5pbXBvcnQgYnVpbGRVUkwgZnJvbSAnLi4vaGVscGVycy9idWlsZFVSTC5qcyc7XG5pbXBvcnQgSW50ZXJjZXB0b3JNYW5hZ2VyIGZyb20gJy4vSW50ZXJjZXB0b3JNYW5hZ2VyLmpzJztcbmltcG9ydCBkaXNwYXRjaFJlcXVlc3QgZnJvbSAnLi9kaXNwYXRjaFJlcXVlc3QuanMnO1xuaW1wb3J0IG1lcmdlQ29uZmlnIGZyb20gJy4vbWVyZ2VDb25maWcuanMnO1xuaW1wb3J0IGJ1aWxkRnVsbFBhdGggZnJvbSAnLi9idWlsZEZ1bGxQYXRoLmpzJztcbmltcG9ydCB2YWxpZGF0b3IgZnJvbSAnLi4vaGVscGVycy92YWxpZGF0b3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuL0F4aW9zSGVhZGVycy5qcyc7XG5cbmNvbnN0IHZhbGlkYXRvcnMgPSB2YWxpZGF0b3IudmFsaWRhdG9ycztcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuY2xhc3MgQXhpb3Mge1xuICBjb25zdHJ1Y3RvcihpbnN0YW5jZUNvbmZpZykge1xuICAgIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGNvbmZpZ09yVXJsIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAgICogQHBhcmFtIHs/T2JqZWN0fSBjb25maWdcbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICAgKi9cbiAgYXN5bmMgcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9yZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIGxldCBkdW1teTtcblxuICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSA/IEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGR1bW15ID0ge30pIDogKGR1bW15ID0gbmV3IEVycm9yKCkpO1xuXG4gICAgICAgIC8vIHNsaWNlIG9mZiB0aGUgRXJyb3I6IC4uLiBsaW5lXG4gICAgICAgIGNvbnN0IHN0YWNrID0gZHVtbXkuc3RhY2sgPyBkdW1teS5zdGFjay5yZXBsYWNlKC9eLitcXG4vLCAnJykgOiAnJztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIWVyci5zdGFjaykge1xuICAgICAgICAgICAgZXJyLnN0YWNrID0gc3RhY2s7XG4gICAgICAgICAgICAvLyBtYXRjaCB3aXRob3V0IHRoZSAyIHRvcCBzdGFjayBsaW5lc1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhY2sgJiYgIVN0cmluZyhlcnIuc3RhY2spLmVuZHNXaXRoKHN0YWNrLnJlcGxhY2UoL14uK1xcbi4rXFxuLywgJycpKSkge1xuICAgICAgICAgICAgZXJyLnN0YWNrICs9ICdcXG4nICsgc3RhY2tcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpZ25vcmUgdGhlIGNhc2Ugd2hlcmUgXCJzdGFja1wiIGlzIGFuIHVuLXdyaXRhYmxlIHByb3BlcnR5XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxuXG4gIF9yZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gICAgaWYgKHR5cGVvZiBjb25maWdPclVybCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICAgIGNvbmZpZy51cmwgPSBjb25maWdPclVybDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uZmlnID0gY29uZmlnT3JVcmwgfHwge307XG4gICAgfVxuXG4gICAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcblxuICAgIGNvbnN0IHt0cmFuc2l0aW9uYWwsIHBhcmFtc1NlcmlhbGl6ZXIsIGhlYWRlcnN9ID0gY29uZmlnO1xuXG4gICAgaWYgKHRyYW5zaXRpb25hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyh0cmFuc2l0aW9uYWwsIHtcbiAgICAgICAgc2lsZW50SlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgIGZvcmNlZEpTT05QYXJzaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgICBjbGFyaWZ5VGltZW91dEVycm9yOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pXG4gICAgICB9LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIgIT0gbnVsbCkge1xuICAgICAgaWYgKHV0aWxzLmlzRnVuY3Rpb24ocGFyYW1zU2VyaWFsaXplcikpIHtcbiAgICAgICAgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIgPSB7XG4gICAgICAgICAgc2VyaWFsaXplOiBwYXJhbXNTZXJpYWxpemVyXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKHBhcmFtc1NlcmlhbGl6ZXIsIHtcbiAgICAgICAgICBlbmNvZGU6IHZhbGlkYXRvcnMuZnVuY3Rpb24sXG4gICAgICAgICAgc2VyaWFsaXplOiB2YWxpZGF0b3JzLmZ1bmN0aW9uXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNldCBjb25maWcubWV0aG9kXG4gICAgY29uZmlnLm1ldGhvZCA9IChjb25maWcubWV0aG9kIHx8IHRoaXMuZGVmYXVsdHMubWV0aG9kIHx8ICdnZXQnKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gICAgbGV0IGNvbnRleHRIZWFkZXJzID0gaGVhZGVycyAmJiB1dGlscy5tZXJnZShcbiAgICAgIGhlYWRlcnMuY29tbW9uLFxuICAgICAgaGVhZGVyc1tjb25maWcubWV0aG9kXVxuICAgICk7XG5cbiAgICBoZWFkZXJzICYmIHV0aWxzLmZvckVhY2goXG4gICAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICAgIChtZXRob2QpID0+IHtcbiAgICAgICAgZGVsZXRlIGhlYWRlcnNbbWV0aG9kXTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgY29uZmlnLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuY29uY2F0KGNvbnRleHRIZWFkZXJzLCBoZWFkZXJzKTtcblxuICAgIC8vIGZpbHRlciBvdXQgc2tpcHBlZCBpbnRlcmNlcHRvcnNcbiAgICBjb25zdCByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICAgIGxldCBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSB0cnVlO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgICAgaWYgKHR5cGVvZiBpbnRlcmNlcHRvci5ydW5XaGVuID09PSAnZnVuY3Rpb24nICYmIGludGVyY2VwdG9yLnJ1bldoZW4oY29uZmlnKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgJiYgaW50ZXJjZXB0b3Iuc3luY2hyb25vdXM7XG5cbiAgICAgIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgICAgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gICAgfSk7XG5cbiAgICBsZXQgcHJvbWlzZTtcbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGxlbjtcblxuICAgIGlmICghc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzKSB7XG4gICAgICBjb25zdCBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QuYmluZCh0aGlzKSwgdW5kZWZpbmVkXTtcbiAgICAgIGNoYWluLnVuc2hpZnQuYXBwbHkoY2hhaW4sIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluKTtcbiAgICAgIGNoYWluLnB1c2guYXBwbHkoY2hhaW4sIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbik7XG4gICAgICBsZW4gPSBjaGFpbi5sZW5ndGg7XG5cbiAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICAgICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbltpKytdLCBjaGFpbltpKytdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG4gICAgbGVuID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xuXG4gICAgbGV0IG5ld0NvbmZpZyA9IGNvbmZpZztcblxuICAgIGkgPSAwO1xuXG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgIGNvbnN0IG9uRnVsZmlsbGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW5baSsrXTtcbiAgICAgIGNvbnN0IG9uUmVqZWN0ZWQgPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbltpKytdO1xuICAgICAgdHJ5IHtcbiAgICAgICAgbmV3Q29uZmlnID0gb25GdWxmaWxsZWQobmV3Q29uZmlnKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIG9uUmVqZWN0ZWQuY2FsbCh0aGlzLCBlcnJvcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBwcm9taXNlID0gZGlzcGF0Y2hSZXF1ZXN0LmNhbGwodGhpcywgbmV3Q29uZmlnKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG5cbiAgICBpID0gMDtcbiAgICBsZW4gPSByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4ocmVzcG9uc2VJbnRlcmNlcHRvckNoYWluW2krK10sIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbltpKytdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGdldFVyaShjb25maWcpIHtcbiAgICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICAgIGNvbnN0IGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gICAgcmV0dXJuIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcik7XG4gIH1cbn1cblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2QsXG4gICAgICB1cmwsXG4gICAgICBkYXRhOiAoY29uZmlnIHx8IHt9KS5kYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVIVFRQTWV0aG9kKGlzRm9ybSkge1xuICAgIHJldHVybiBmdW5jdGlvbiBodHRwTWV0aG9kKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgICBtZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IGlzRm9ybSA/IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnXG4gICAgICAgIH0gOiB7fSxcbiAgICAgICAgdXJsLFxuICAgICAgICBkYXRhXG4gICAgICB9KSk7XG4gICAgfTtcbiAgfVxuXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZ2VuZXJhdGVIVFRQTWV0aG9kKCk7XG5cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZCArICdGb3JtJ10gPSBnZW5lcmF0ZUhUVFBNZXRob2QodHJ1ZSk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQXhpb3M7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuL0NhbmNlbGVkRXJyb3IuanMnO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtDYW5jZWxUb2tlbn1cbiAqL1xuY2xhc3MgQ2FuY2VsVG9rZW4ge1xuICBjb25zdHJ1Y3RvcihleGVjdXRvcikge1xuICAgIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzb2x2ZVByb21pc2U7XG5cbiAgICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICAgIH0pO1xuXG4gICAgY29uc3QgdG9rZW4gPSB0aGlzO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICB0aGlzLnByb21pc2UudGhlbihjYW5jZWwgPT4ge1xuICAgICAgaWYgKCF0b2tlbi5fbGlzdGVuZXJzKSByZXR1cm47XG5cbiAgICAgIGxldCBpID0gdG9rZW4uX2xpc3RlbmVycy5sZW5ndGg7XG5cbiAgICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICAgIHRva2VuLl9saXN0ZW5lcnNbaV0oY2FuY2VsKTtcbiAgICAgIH1cbiAgICAgIHRva2VuLl9saXN0ZW5lcnMgPSBudWxsO1xuICAgIH0pO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICB0aGlzLnByb21pc2UudGhlbiA9IG9uZnVsZmlsbGVkID0+IHtcbiAgICAgIGxldCBfcmVzb2x2ZTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIHRva2VuLnN1YnNjcmliZShyZXNvbHZlKTtcbiAgICAgICAgX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgfSkudGhlbihvbmZ1bGZpbGxlZCk7XG5cbiAgICAgIHByb21pc2UuY2FuY2VsID0gZnVuY3Rpb24gcmVqZWN0KCkge1xuICAgICAgICB0b2tlbi51bnN1YnNjcmliZShfcmVzb2x2ZSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9O1xuXG4gICAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCkge1xuICAgICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsZWRFcnJvcihtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpO1xuICAgICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaHJvd3MgYSBgQ2FuY2VsZWRFcnJvcmAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAgICovXG4gIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gICAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlIHRvIHRoZSBjYW5jZWwgc2lnbmFsXG4gICAqL1xuXG4gIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICh0aGlzLnJlYXNvbikge1xuICAgICAgbGlzdGVuZXIodGhpcy5yZWFzb24pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzID0gW2xpc3RlbmVyXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmUgZnJvbSB0aGUgY2FuY2VsIHNpZ25hbFxuICAgKi9cblxuICB1bnN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gICAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gICAqL1xuICBzdGF0aWMgc291cmNlKCkge1xuICAgIGxldCBjYW5jZWw7XG4gICAgY29uc3QgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgICAgY2FuY2VsID0gYztcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgdG9rZW4sXG4gICAgICBjYW5jZWxcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhbmNlbFRva2VuO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvc1xuICpcbiAqIEBwYXJhbSB7Kn0gcGF5bG9hZCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvcywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQXhpb3NFcnJvcihwYXlsb2FkKSB7XG4gIHJldHVybiB1dGlscy5pc09iamVjdChwYXlsb2FkKSAmJiAocGF5bG9hZC5pc0F4aW9zRXJyb3IgPT09IHRydWUpO1xufVxuIiwgImNvbnN0IEh0dHBTdGF0dXNDb2RlID0ge1xuICBDb250aW51ZTogMTAwLFxuICBTd2l0Y2hpbmdQcm90b2NvbHM6IDEwMSxcbiAgUHJvY2Vzc2luZzogMTAyLFxuICBFYXJseUhpbnRzOiAxMDMsXG4gIE9rOiAyMDAsXG4gIENyZWF0ZWQ6IDIwMSxcbiAgQWNjZXB0ZWQ6IDIwMixcbiAgTm9uQXV0aG9yaXRhdGl2ZUluZm9ybWF0aW9uOiAyMDMsXG4gIE5vQ29udGVudDogMjA0LFxuICBSZXNldENvbnRlbnQ6IDIwNSxcbiAgUGFydGlhbENvbnRlbnQ6IDIwNixcbiAgTXVsdGlTdGF0dXM6IDIwNyxcbiAgQWxyZWFkeVJlcG9ydGVkOiAyMDgsXG4gIEltVXNlZDogMjI2LFxuICBNdWx0aXBsZUNob2ljZXM6IDMwMCxcbiAgTW92ZWRQZXJtYW5lbnRseTogMzAxLFxuICBGb3VuZDogMzAyLFxuICBTZWVPdGhlcjogMzAzLFxuICBOb3RNb2RpZmllZDogMzA0LFxuICBVc2VQcm94eTogMzA1LFxuICBVbnVzZWQ6IDMwNixcbiAgVGVtcG9yYXJ5UmVkaXJlY3Q6IDMwNyxcbiAgUGVybWFuZW50UmVkaXJlY3Q6IDMwOCxcbiAgQmFkUmVxdWVzdDogNDAwLFxuICBVbmF1dGhvcml6ZWQ6IDQwMSxcbiAgUGF5bWVudFJlcXVpcmVkOiA0MDIsXG4gIEZvcmJpZGRlbjogNDAzLFxuICBOb3RGb3VuZDogNDA0LFxuICBNZXRob2ROb3RBbGxvd2VkOiA0MDUsXG4gIE5vdEFjY2VwdGFibGU6IDQwNixcbiAgUHJveHlBdXRoZW50aWNhdGlvblJlcXVpcmVkOiA0MDcsXG4gIFJlcXVlc3RUaW1lb3V0OiA0MDgsXG4gIENvbmZsaWN0OiA0MDksXG4gIEdvbmU6IDQxMCxcbiAgTGVuZ3RoUmVxdWlyZWQ6IDQxMSxcbiAgUHJlY29uZGl0aW9uRmFpbGVkOiA0MTIsXG4gIFBheWxvYWRUb29MYXJnZTogNDEzLFxuICBVcmlUb29Mb25nOiA0MTQsXG4gIFVuc3VwcG9ydGVkTWVkaWFUeXBlOiA0MTUsXG4gIFJhbmdlTm90U2F0aXNmaWFibGU6IDQxNixcbiAgRXhwZWN0YXRpb25GYWlsZWQ6IDQxNyxcbiAgSW1BVGVhcG90OiA0MTgsXG4gIE1pc2RpcmVjdGVkUmVxdWVzdDogNDIxLFxuICBVbnByb2Nlc3NhYmxlRW50aXR5OiA0MjIsXG4gIExvY2tlZDogNDIzLFxuICBGYWlsZWREZXBlbmRlbmN5OiA0MjQsXG4gIFRvb0Vhcmx5OiA0MjUsXG4gIFVwZ3JhZGVSZXF1aXJlZDogNDI2LFxuICBQcmVjb25kaXRpb25SZXF1aXJlZDogNDI4LFxuICBUb29NYW55UmVxdWVzdHM6IDQyOSxcbiAgUmVxdWVzdEhlYWRlckZpZWxkc1Rvb0xhcmdlOiA0MzEsXG4gIFVuYXZhaWxhYmxlRm9yTGVnYWxSZWFzb25zOiA0NTEsXG4gIEludGVybmFsU2VydmVyRXJyb3I6IDUwMCxcbiAgTm90SW1wbGVtZW50ZWQ6IDUwMSxcbiAgQmFkR2F0ZXdheTogNTAyLFxuICBTZXJ2aWNlVW5hdmFpbGFibGU6IDUwMyxcbiAgR2F0ZXdheVRpbWVvdXQ6IDUwNCxcbiAgSHR0cFZlcnNpb25Ob3RTdXBwb3J0ZWQ6IDUwNSxcbiAgVmFyaWFudEFsc29OZWdvdGlhdGVzOiA1MDYsXG4gIEluc3VmZmljaWVudFN0b3JhZ2U6IDUwNyxcbiAgTG9vcERldGVjdGVkOiA1MDgsXG4gIE5vdEV4dGVuZGVkOiA1MTAsXG4gIE5ldHdvcmtBdXRoZW50aWNhdGlvblJlcXVpcmVkOiA1MTEsXG59O1xuXG5PYmplY3QuZW50cmllcyhIdHRwU3RhdHVzQ29kZSkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gIEh0dHBTdGF0dXNDb2RlW3ZhbHVlXSA9IGtleTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBIdHRwU3RhdHVzQ29kZTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCBiaW5kIGZyb20gJy4vaGVscGVycy9iaW5kLmpzJztcbmltcG9ydCBBeGlvcyBmcm9tICcuL2NvcmUvQXhpb3MuanMnO1xuaW1wb3J0IG1lcmdlQ29uZmlnIGZyb20gJy4vY29yZS9tZXJnZUNvbmZpZy5qcyc7XG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi9kZWZhdWx0cy9pbmRleC5qcyc7XG5pbXBvcnQgZm9ybURhdGFUb0pTT04gZnJvbSAnLi9oZWxwZXJzL2Zvcm1EYXRhVG9KU09OLmpzJztcbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanMnO1xuaW1wb3J0IENhbmNlbFRva2VuIGZyb20gJy4vY2FuY2VsL0NhbmNlbFRva2VuLmpzJztcbmltcG9ydCBpc0NhbmNlbCBmcm9tICcuL2NhbmNlbC9pc0NhbmNlbC5qcyc7XG5pbXBvcnQge1ZFUlNJT059IGZyb20gJy4vZW52L2RhdGEuanMnO1xuaW1wb3J0IHRvRm9ybURhdGEgZnJvbSAnLi9oZWxwZXJzL3RvRm9ybURhdGEuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IHNwcmVhZCBmcm9tICcuL2hlbHBlcnMvc3ByZWFkLmpzJztcbmltcG9ydCBpc0F4aW9zRXJyb3IgZnJvbSAnLi9oZWxwZXJzL2lzQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gXCIuL2NvcmUvQXhpb3NIZWFkZXJzLmpzXCI7XG5pbXBvcnQgYWRhcHRlcnMgZnJvbSAnLi9hZGFwdGVycy9hZGFwdGVycy5qcyc7XG5pbXBvcnQgSHR0cFN0YXR1c0NvZGUgZnJvbSAnLi9oZWxwZXJzL0h0dHBTdGF0dXNDb2RlLmpzJztcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICpcbiAqIEByZXR1cm5zIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICBjb25zdCBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICBjb25zdCBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0LCB7YWxsT3duS2V5czogdHJ1ZX0pO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQsIG51bGwsIHthbGxPd25LZXlzOiB0cnVlfSk7XG5cbiAgLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuICBpbnN0YW5jZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoZGVmYXVsdENvbmZpZywgaW5zdGFuY2VDb25maWcpKTtcbiAgfTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxuY29uc3QgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5heGlvcy5DYW5jZWxlZEVycm9yID0gQ2FuY2VsZWRFcnJvcjtcbmF4aW9zLkNhbmNlbFRva2VuID0gQ2FuY2VsVG9rZW47XG5heGlvcy5pc0NhbmNlbCA9IGlzQ2FuY2VsO1xuYXhpb3MuVkVSU0lPTiA9IFZFUlNJT047XG5heGlvcy50b0Zvcm1EYXRhID0gdG9Gb3JtRGF0YTtcblxuLy8gRXhwb3NlIEF4aW9zRXJyb3IgY2xhc3NcbmF4aW9zLkF4aW9zRXJyb3IgPSBBeGlvc0Vycm9yO1xuXG4vLyBhbGlhcyBmb3IgQ2FuY2VsZWRFcnJvciBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuYXhpb3MuQ2FuY2VsID0gYXhpb3MuQ2FuY2VsZWRFcnJvcjtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcblxuYXhpb3Muc3ByZWFkID0gc3ByZWFkO1xuXG4vLyBFeHBvc2UgaXNBeGlvc0Vycm9yXG5heGlvcy5pc0F4aW9zRXJyb3IgPSBpc0F4aW9zRXJyb3I7XG5cbi8vIEV4cG9zZSBtZXJnZUNvbmZpZ1xuYXhpb3MubWVyZ2VDb25maWcgPSBtZXJnZUNvbmZpZztcblxuYXhpb3MuQXhpb3NIZWFkZXJzID0gQXhpb3NIZWFkZXJzO1xuXG5heGlvcy5mb3JtVG9KU09OID0gdGhpbmcgPT4gZm9ybURhdGFUb0pTT04odXRpbHMuaXNIVE1MRm9ybSh0aGluZykgPyBuZXcgRm9ybURhdGEodGhpbmcpIDogdGhpbmcpO1xuXG5heGlvcy5nZXRBZGFwdGVyID0gYWRhcHRlcnMuZ2V0QWRhcHRlcjtcblxuYXhpb3MuSHR0cFN0YXR1c0NvZGUgPSBIdHRwU3RhdHVzQ29kZTtcblxuYXhpb3MuZGVmYXVsdCA9IGF4aW9zO1xuXG4vLyB0aGlzIG1vZHVsZSBzaG91bGQgb25seSBoYXZlIGEgZGVmYXVsdCBleHBvcnRcbmV4cG9ydCBkZWZhdWx0IGF4aW9zXG4iLCAiaW1wb3J0IGF4aW9zIGZyb20gJy4vbGliL2F4aW9zLmpzJztcblxuLy8gVGhpcyBtb2R1bGUgaXMgaW50ZW5kZWQgdG8gdW53cmFwIEF4aW9zIGRlZmF1bHQgZXhwb3J0IGFzIG5hbWVkLlxuLy8gS2VlcCB0b3AtbGV2ZWwgZXhwb3J0IHNhbWUgd2l0aCBzdGF0aWMgcHJvcGVydGllc1xuLy8gc28gdGhhdCBpdCBjYW4ga2VlcCBzYW1lIHdpdGggZXMgbW9kdWxlIG9yIGNqc1xuY29uc3Qge1xuICBBeGlvcyxcbiAgQXhpb3NFcnJvcixcbiAgQ2FuY2VsZWRFcnJvcixcbiAgaXNDYW5jZWwsXG4gIENhbmNlbFRva2VuLFxuICBWRVJTSU9OLFxuICBhbGwsXG4gIENhbmNlbCxcbiAgaXNBeGlvc0Vycm9yLFxuICBzcHJlYWQsXG4gIHRvRm9ybURhdGEsXG4gIEF4aW9zSGVhZGVycyxcbiAgSHR0cFN0YXR1c0NvZGUsXG4gIGZvcm1Ub0pTT04sXG4gIGdldEFkYXB0ZXIsXG4gIG1lcmdlQ29uZmlnXG59ID0gYXhpb3M7XG5cbmV4cG9ydCB7XG4gIGF4aW9zIGFzIGRlZmF1bHQsXG4gIEF4aW9zLFxuICBBeGlvc0Vycm9yLFxuICBDYW5jZWxlZEVycm9yLFxuICBpc0NhbmNlbCxcbiAgQ2FuY2VsVG9rZW4sXG4gIFZFUlNJT04sXG4gIGFsbCxcbiAgQ2FuY2VsLFxuICBpc0F4aW9zRXJyb3IsXG4gIHNwcmVhZCxcbiAgdG9Gb3JtRGF0YSxcbiAgQXhpb3NIZWFkZXJzLFxuICBIdHRwU3RhdHVzQ29kZSxcbiAgZm9ybVRvSlNPTixcbiAgZ2V0QWRhcHRlcixcbiAgbWVyZ2VDb25maWdcbn1cbiIsICJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5leHBvcnQgY2xhc3MgVXRpbHMge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gIH1cbiAgaXNOdW1iZXIodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhaXNOYU4odmFsdWUpICYmIE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZTtcbiAgfVxuICBSZWxvYWRQYWdlKCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfVxuICBmaWx0ZXJGaWVsZChlOiBhbnkpIHtcbiAgICBsZXQgdCA9IGUudGFyZ2V0O1xuICAgIGxldCBiYWRWYWx1ZXMgPSAvWy4rLV0vO1xuICAgIHQudmFsdWUgPSB0LnZhbHVlLnJlcGxhY2UoYmFkVmFsdWVzLCAnJyk7XG4gIH1cbiAgY2xlYXJGaWVsZChlOiBhbnkpIHtcbiAgICBsZXQgdCA9IGUudGFyZ2V0O1xuICAgIGxldCBiYWRWYWx1ZXMgPSAvWy4rLWEtekEtel0vO1xuICAgIHQudmFsdWUgPSB0LnZhbHVlLnJlcGxhY2UoYmFkVmFsdWVzLCAnJyk7XG4gIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZG9SZXF1ZXN0KHJlcXVlc3RCb2R5OiBhbnkpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBwcm9taXNlID0gYXhpb3MucG9zdChyZXF1ZXN0Qm9keS51cmwsIHJlcXVlc3RCb2R5LmJvZHksIHsgaGVhZGVyczogcmVxdWVzdEJvZHkuaGVhZGVycyB9KTtcbiAgICBjb25zdCBkYXRhcHJvbWlzZSA9IHByb21pc2UudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmRhdGEpXG4gICAgcmV0dXJuIGRhdGFwcm9taXNlO1xuICB9IGNhdGNoIChlcnJvcnMpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9ycyk7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDsgLy8gUmV0dXJuIHVuZGVmaW5lZCBpbiBjYXNlIG9mIGFuIGVycm9yXG4gIH1cbn1cblxuXG4iLCAiaW1wb3J0IHsgZG9SZXF1ZXN0IH0gZnJvbSBcIi4vdXRpbHNcIlxuXG5cblxuZXhwb3J0IGNsYXNzIEFjY291bnQge1xuXG4gICAgYXN5bmMgYWNjb3VudChmdW5jOiBzdHJpbmcsIHVzZXJuYW1lOiBzdHJpbmcsIGF0dHJpYnV0ZT86IGFueSkge1xuXG4gICAgICAgIGxldCBnYW1lUmVxdWVzdCA9IHtcbiAgICAgICAgICAgIGZ1bmN0aW9uOiBmdW5jLFxuICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgYXR0cmlidXRlOiBhdHRyaWJ1dGVcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vemZjZnB3cjNsZS5leGVjdXRlLWFwaS5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb20vc2hvd3RpbWUvYWNjb3VudFwiLFxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShnYW1lUmVxdWVzdClcbiAgICAgICAgICAgIC8vIHFzOiB7XG4gICAgICAgICAgICAvLyAgICAgYmV0OiBiZXRcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZ2FtZVJlc3BvbnNlID0gYXdhaXQgZG9SZXF1ZXN0KG9wdGlvbnMpO1xuICAgICAgICAgICAgcmV0dXJuIGdhbWVSZXNwb25zZVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycikpXG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsICJpbXBvcnQgeyBkb1JlcXVlc3QgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5leHBvcnQgY2xhc3MgR2FtZSB7XG4gICAgYXN5bmMgcGxheShiZXQ6IG51bWJlcikge1xuICAgICAgICBsZXQgZ2FtZVJlcXVlc3QgPSB7XG4gICAgICAgICAgICBiZXQ6IGJldFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vemZjZnB3cjNsZS5leGVjdXRlLWFwaS5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb20vc2hvd3RpbWUvZXZhbHVhdGVcIixcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZ2FtZVJlcXVlc3QpXG4gICAgICAgIH07XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGdhbWVSZXNwb25zZSA9IGF3YWl0IGRvUmVxdWVzdChvcHRpb25zKTtcbiAgICAgICAgICAgIHJldHVybiBnYW1lUmVzcG9uc2VcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnIpKTtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4iLCAiaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gXCIuL2FjY291bnRcIjtcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9nYW1lXCI7XG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbnRlcmZhY2UgR2FtZU91dHB1dCB7XG4gICAgc2xvdDogc3RyaW5nW11bXSxcbiAgICB3aW5uaW5nczogbnVtYmVyXG59XG52YXIgdXRpbHMgPSBuZXcgVXRpbHMoKTtcbnZhciBhY2MgPSBuZXcgQWNjb3VudCgpO1xuY29uc3QgZ2FtZSA9IG5ldyBHYW1lKCk7XG5leHBvcnQgZnVuY3Rpb24gc2xvdG1hY2hpbmUoKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgbWVzc2FnZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVzc2FnZScpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBjb25zdCBiYW5rRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYW5rMScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGJldEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmV0JykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgICAgY29uc3Qgc2xvdFJlc3VsdHNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nsb3RSZXN1bHRzJykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGJhbmtiYWxhbmNlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYW5rYmFsYW5jZScpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBjb25zdCBCYW5rQWRkQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhbmthZGQnKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICAgICAgY29uc3Qgc3BpbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcGluJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHN0YXR1c0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhdHVzJykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGV4aXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhpdCcpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuICAgICAgICB2YXIgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImF1dGhNb2RhbFwiKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgdmFyIGJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXV0aEJ0blwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICAgICAgdmFyIHNwYW4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY2xvc2VcIilbMF0gYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgICBjb25zdCB1c2VybmFtZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgICBjb25zdCBwYXNzd29yZEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFzc3dvcmQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgICBjb25zdCBzaWduaW5CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbmluJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHNpZ251cEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWdudXAnKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICAgICAgaWYgKCFtZXNzYWdlRWxlbWVudCB8fCAhYmFua0VsZW1lbnQgfHwgIWJldEVsZW1lbnQgfHwgIXNsb3RSZXN1bHRzRWxlbWVudCB8fCAhYmFua2JhbGFuY2VFbGVtZW50IHx8ICFCYW5rQWRkQnV0dG9uIHx8ICFzcGluQnV0dG9uIHx8ICFzdGF0dXNFbGVtZW50IHx8ICFleGl0QnV0dG9uKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiT25lIG9yIG1vcmUgZWxlbWVudHMgbm90IGZvdW5kLiBQbGVhc2UgY2hlY2sgdGhlIEhUTUwuXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG1lc3NhZ2VFbGVtZW50LnRleHRDb250ZW50ID0gXCJTaWduIGluIG9yIGNyZWF0ZSBhbiBhY2NvdW50IHRvIHN0YXJ0IHRoZSBnYW1lIVwiO1xuXG4gICAgICAgIGxldCB1c2VybmFtZSA9IFwibm9uZVwiO1xuXG4gICAgICAgIGJhbmtFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdXRpbHMuZmlsdGVyRmllbGQpO1xuICAgICAgICBiZXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdXRpbHMuZmlsdGVyRmllbGQpO1xuICAgICAgICBidG4ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIH1cbiAgICAgICAgc3Bhbi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5vbmNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IG1vZGFsKSB7XG4gICAgICAgICAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGV4aXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29uZmlybSgnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGV4aXQ/IEFsbCBjaGFuZ2VzIHdpbGwgYmUgbG9zdC4nKSkge1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2lnbmluQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHVzZXIgPSB1c2VybmFtZUVsZW1lbnQudmFsdWU7XG4gICAgICAgICAgICBsZXQgcGFzc3dvcmQgPSBwYXNzd29yZEVsZW1lbnQudmFsdWU7XG4gICAgICAgICAgICBhY2MuYWNjb3VudChcIlVzZXJWZXJpZnlcIiwgdXNlciwgcGFzc3dvcmQpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSA9PSBcInZlcmlmaWVkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWUgPSB1c2VyO1xuICAgICAgICAgICAgICAgICAgICBhY2MuYWNjb3VudChcImdldEJhbmtCYWxhbmNlXCIsIHVzZXJuYW1lKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiYW5rYmFsID0gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYW5rYmFsYW5jZUVsZW1lbnQudGV4dENvbnRlbnQgPSBgQmFuayBiYWxhbmNlOiAkJHtiYW5rYmFsfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlRWxlbWVudC50ZXh0Q29udGVudCA9IGBXZWxjb21lLCAke3VzZXJuYW1lfSEgYWRkIGFtb3VudCB0byB5b3VyIGFjY291bnQgYW5kIHNwaW4gdG8gcGxheSB0aGUgZ2FtZSFgO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwidXNlcm5hbWUgb3IgcGFzc3dvcmQgaW5jb3JyZWN0XCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIHNpZ251cEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCB1c2VyID0gdXNlcm5hbWVFbGVtZW50LnZhbHVlO1xuICAgICAgICAgICAgbGV0IHBhc3N3b3JkID0gcGFzc3dvcmRFbGVtZW50LnZhbHVlO1xuICAgICAgICAgICAgYWNjLmFjY291bnQoXCJVc2VyQWRkXCIsIHVzZXIsIHBhc3N3b3JkKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgPT0gXCJ1c2VyIGFkZGVkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWUgPSB1c2VyO1xuICAgICAgICAgICAgICAgICAgICBhY2MuYWNjb3VudChcImdldEJhbmtCYWxhbmNlXCIsIHVzZXJuYW1lKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiYW5rYmFsID0gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYW5rYmFsYW5jZUVsZW1lbnQudGV4dENvbnRlbnQgPSBgQmFuayBiYWxhbmNlOiAkJHtiYW5rYmFsfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlRWxlbWVudC50ZXh0Q29udGVudCA9IGBXZWxjb21lLCAke3VzZXJuYW1lfSEgYWRkIGFtb3VudCB0byB5b3VyIGFjY291bnQgYW5kIHNwaW4gdG8gcGxheSB0aGUgZ2FtZSFgO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwidXNlcm5hbWUgYWxyZWFkeSBleGlzdHNcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgQmFua0FkZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBiYW5rOiBudW1iZXIgPSBwYXJzZUZsb2F0KGJhbmtFbGVtZW50LnZhbHVlKTtcbiAgICAgICAgICAgIGlmICh1c2VybmFtZSA9PSBcIm5vbmVcIikge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwic2lnbiBpbiBvciBzaWduIHVwIHRvIHN0YXJ0IHRoZSBnYW1lIVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCh1dGlscy5pc051bWJlcihiYW5rKSA9PT0gZmFsc2UgfHwgYmFuayA8PSAwKSkge1xuICAgICAgICAgICAgICAgICAgICBhbGVydChcIkVudGVyIGEgdmFsaWQgbnVtYmVyIVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGJhbmsgPCAxMDAwMDAwMDAwMCkge1xuICAgICAgICAgICAgICAgICAgICBhY2MuYWNjb3VudChcIkJhbmtBZGRXaWRcIiwgdXNlcm5hbWUsIGJhbmspO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYmFuayA+PSAxMDAwMDAwMDAwMCkge1xuICAgICAgICAgICAgICAgICAgICBhbGVydChcIkFtb3VudCB0b28gaGlnaCFcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhY2MuYWNjb3VudChcImdldEJhbmtCYWxhbmNlXCIsIHVzZXJuYW1lKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiYW5rYmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFua2JhbCA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFua2JhbGFuY2VFbGVtZW50LnRleHRDb250ZW50ID0gYEJhbmsgYmFsYW5jZTogJCR7YmFua2JhbH1gO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzcGluQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYmV0ID0gcGFyc2VGbG9hdChiZXRFbGVtZW50LnZhbHVlKTtcbiAgICAgICAgICAgIGxldCBiYW5rYmFsO1xuICAgICAgICAgICAgYWNjLmFjY291bnQoXCJnZXRCYW5rQmFsYW5jZVwiLCB1c2VybmFtZSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgYmFua2JhbCA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIGlmICh1c2VybmFtZSA9PSBcIm5vbmVcIikge1xuICAgICAgICAgICAgICAgICAgICBhbGVydChcInNpZ24gaW4gb3Igc2lnbiB1cCB0byBzdGFydCB0aGUgZ2FtZSFcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1dGlscy5pc051bWJlcihiZXQpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJFbnRlciBhIHZhbGlkIG51bWJlciFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGJldCA+IGJhbmtiYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiTm90IGVub3VnaCBiYWxhbmNlIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoYmFua2JhbCA8IDEwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIkF0IGxlYXN0ICQxMCBzaG91bGQgYmUgZGVwb3NpdGVkIHRvIHBsYXkgdGhlIGdhbWVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlRWxlbWVudC50ZXh0Q29udGVudCA9IFwiR2FtZSBzdGFydGVkLiBQbGFjZSB5b3VyIGJldCBhbmQgc3BpbiB0aGUgc2xvdCBtYWNoaW5lIVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZS5wbGF5KGJldCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJlb3V0cHV0ID0gcmVzIGFzIEdhbWVPdXRwdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IGJlb3V0cHV0LnNsb3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG91dHB1dCA9IGJlb3V0cHV0Lndpbm5pbmdzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3RSZXN1bHRzRWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90LmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0Rpdi5jbGFzc0xpc3QuYWRkKCdzbG90LXJvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxEaXYuY2xhc3NMaXN0LmFkZCgnc2xvdC1jZWxsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsRGl2LnRleHRDb250ZW50ID0gY2VsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0Rpdi5hcHBlbmRDaGlsZChjZWxsRGl2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3RSZXN1bHRzRWxlbWVudC5hcHBlbmRDaGlsZChyb3dEaXYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG91dHB1dCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzRWxlbWVudC50ZXh0Q29udGVudCA9IGBZb3Ugd29uICQke291dHB1dH0hYDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjLmFjY291bnQoXCJCYW5rQWRkV2lkXCIsIHVzZXJuYW1lLCBvdXRwdXQpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJhbmtiYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYW5rYmFsID0gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYW5rYmFsYW5jZUVsZW1lbnQudGV4dENvbnRlbnQgPSBgQmFuayBiYWxhbmNlOiAkJHtiYW5rYmFsfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZldHRpKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlQ291bnQ6IDMwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwcmVhZDogOTAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW46IHsgeDogMSwgeTogMC45IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25mZXR0aSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZUNvdW50OiAzMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcHJlYWQ6IDkwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luOiB7IHg6IDAsIHk6IDAuOSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNFbGVtZW50LnRleHRDb250ZW50ID0gYFlvdSBsb3N0ICQke2JldH0sIGtlZXAgdHJ5aW5nIWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjYy5hY2NvdW50KFwiQmFua0FkZFdpZFwiLCB1c2VybmFtZSwgLWJldCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmFua2JhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhbmtiYWwgPSByZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhbmtiYWxhbmNlRWxlbWVudC50ZXh0Q29udGVudCA9IGBCYW5rIGJhbGFuY2U6ICQke2JhbmtiYWx9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH0pO1xuICAgIH0pXG59XG5zbG90bWFjaGluZSgpO1xuXG5cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7QUFFZSxXQUFSLEtBQXNCLElBQUksU0FBUztBQUN4QyxXQUFPLGdDQUFTLE9BQU87QUFDckIsYUFBTyxHQUFHLE1BQU0sU0FBUyxTQUFTO0FBQUEsSUFDcEMsR0FGTztBQUFBLEVBR1Q7QUFKd0I7OztBQ0l4QixNQUFNLEVBQUMsU0FBUSxJQUFJLE9BQU87QUFDMUIsTUFBTSxFQUFDLGVBQWMsSUFBSTtBQUV6QixNQUFNLFNBQVUsNEJBQVMsV0FBUztBQUM5QixVQUFNLE1BQU0sU0FBUyxLQUFLLEtBQUs7QUFDL0IsV0FBTyxNQUFNLEdBQUcsTUFBTSxNQUFNLEdBQUcsSUFBSSxJQUFJLE1BQU0sR0FBRyxFQUFFLEVBQUUsWUFBWTtBQUFBLEVBQ3BFLEdBQUcsdUJBQU8sT0FBTyxJQUFJLENBQUM7QUFFdEIsTUFBTSxhQUFhLHdCQUFDLFNBQVM7QUFDM0IsV0FBTyxLQUFLLFlBQVk7QUFDeEIsV0FBTyxDQUFDLFVBQVUsT0FBTyxLQUFLLE1BQU07QUFBQSxFQUN0QyxHQUhtQjtBQUtuQixNQUFNLGFBQWEsaUNBQVEsV0FBUyxPQUFPLFVBQVUsTUFBbEM7QUFTbkIsTUFBTSxFQUFDLFFBQU8sSUFBSTtBQVNsQixNQUFNLGNBQWMsV0FBVyxXQUFXO0FBUzFDLFdBQVMsU0FBUyxLQUFLO0FBQ3JCLFdBQU8sUUFBUSxRQUFRLENBQUMsWUFBWSxHQUFHLEtBQUssSUFBSSxnQkFBZ0IsUUFBUSxDQUFDLFlBQVksSUFBSSxXQUFXLEtBQy9GLFdBQVcsSUFBSSxZQUFZLFFBQVEsS0FBSyxJQUFJLFlBQVksU0FBUyxHQUFHO0FBQUEsRUFDM0U7QUFIUztBQVlULE1BQU0sZ0JBQWdCLFdBQVcsYUFBYTtBQVU5QyxXQUFTLGtCQUFrQixLQUFLO0FBQzlCLFFBQUk7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Q3pDLENBQUM7QUFFRCxvQkFBSSxTQUFTLEdBQUc7QUFDWixnQ0FBYyxjQUFjLFlBQVksTUFBTTtBQUM5QyxzQkFBSSxRQUFRLGNBQWMsVUFBVSxNQUFNLEVBQUUsS0FBSyxDQUFBQSxjQUFZO0FBQ3pELHdCQUFJQztBQUNKLG9CQUFBQSxXQUFVRDtBQUNWLHVDQUFtQixjQUFjLGtCQUFrQkMsUUFBTztBQUFBLGtCQUM5RCxDQUFDO0FBQ0QsMkJBQVM7QUFBQSxvQkFDTCxlQUFlO0FBQUEsb0JBQ2YsUUFBUTtBQUFBLG9CQUNSLFFBQVEsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJO0FBQUEsa0JBQzNCLENBQUM7QUFDRCwyQkFBUztBQUFBLG9CQUNMLGVBQWU7QUFBQSxvQkFDZixRQUFRO0FBQUEsb0JBQ1IsUUFBUSxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUk7QUFBQSxrQkFDM0IsQ0FBQztBQUFBLGdCQUNMLE9BQU87QUFDSCxnQ0FBYyxjQUFjLGFBQWEsR0FBRztBQUM1QyxzQkFBSSxRQUFRLGNBQWMsVUFBVSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUFELGNBQVk7QUFDdkQsd0JBQUlDO0FBQ0osb0JBQUFBLFdBQVVEO0FBQ1YsdUNBQW1CLGNBQWMsa0JBQWtCQyxRQUFPO0FBQUEsa0JBQzlELENBQUM7QUFBQSxnQkFDTDtBQUFBLGNBRUosQ0FBQztBQUFBLFlBQ0w7QUFBQSxVQUVKO0FBQUEsUUFDSixDQUFDO0FBQUEsTUFFTCxDQUFDO0FBQUEsSUFDTCxDQUFDO0FBQUEsRUFDTDtBQWxMZ0I7QUFtTGhCLGNBQVk7IiwKICAibmFtZXMiOiBbInByb3RvdHlwZSIsICJkZXNjcmlwdG9ycyIsICJmaWx0ZXIiLCAiaGFzT3duUHJvcGVydHkiLCAiZmlsdGVyIiwgInByb3RvdHlwZSIsICJ0b1N0cmluZyIsICJlbmNvZGUiLCAiaXNGb3JtRGF0YSIsICJpc0ZpbGVMaXN0IiwgInRyYW5zaXRpb25hbCIsICJmaWx0ZXIiLCAic2VsZiIsICJwcm90b3R5cGUiLCAidmFsaWRhdGVTdGF0dXMiLCAibWVyZ2UiLCAidHJhbnNpdGlvbmFsIiwgInNpZ25hbCIsICJlbmNvZGUiLCAicmVzIiwgInZhbGlkYXRvcnMiLCAidHJhbnNpdGlvbmFsIiwgIkF4aW9zIiwgIkF4aW9zRXJyb3IiLCAiQ2FuY2VsZWRFcnJvciIsICJpc0NhbmNlbCIsICJDYW5jZWxUb2tlbiIsICJWRVJTSU9OIiwgImFsbCIsICJpc0F4aW9zRXJyb3IiLCAic3ByZWFkIiwgInRvRm9ybURhdGEiLCAiQXhpb3NIZWFkZXJzIiwgIkh0dHBTdGF0dXNDb2RlIiwgIm1lcmdlQ29uZmlnIiwgInJlc3BvbnNlIiwgImJhbmtiYWwiXQp9Cg==
