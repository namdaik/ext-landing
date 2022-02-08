/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
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
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
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
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/collect.js/dist/helpers/clone.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/helpers/clone.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Clone helper
 *
 * Clone an array or object
 *
 * @param items
 * @returns {*}
 */

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = function clone(items) {
  var cloned = void 0;

  if (Array.isArray(items)) {
    var _cloned;

    cloned = [];

    (_cloned = cloned).push.apply(_cloned, _toConsumableArray(items));
  } else {
    cloned = {};

    Object.keys(items).forEach(function (prop) {
      cloned[prop] = items[prop];
    });
  }

  return cloned;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/helpers/is.js":
/*!****************************************************!*\
  !*** ./node_modules/collect.js/dist/helpers/is.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = {
  /**
   * @returns {boolean}
   */
  isArray: function isArray(item) {
    return Array.isArray(item);
  },

  /**
   * @returns {boolean}
   */
  isObject: function isObject(item) {
    return (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && Array.isArray(item) === false && item !== null;
  },

  /**
   * @returns {boolean}
   */
  isFunction: function isFunction(item) {
    return typeof item === 'function';
  }
};

/***/ }),

/***/ "./node_modules/collect.js/dist/helpers/nestedValue.js":
/*!*************************************************************!*\
  !*** ./node_modules/collect.js/dist/helpers/nestedValue.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Get value of a nested property
 *
 * @param mainObject
 * @param key
 * @returns {*}
 */

module.exports = function nestedValue(mainObject, key) {
  try {
    return key.split('.').reduce(function (obj, property) {
      return obj[property];
    }, mainObject);
  } catch (err) {
    // If we end up here, we're not working with an object, and @var mainObject is the value itself
    return mainObject;
  }
};

/***/ }),

/***/ "./node_modules/collect.js/dist/helpers/values.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/helpers/values.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/**
 * Values helper
 *
 * Retrieve values from [this.items] when it is an array, object or Collection
 *
 * @returns {*}
 * @param items
 */

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = function values(items) {
  var valuesArray = [];

  if (Array.isArray(items)) {
    valuesArray.push.apply(valuesArray, _toConsumableArray(items));
  } else if (items.constructor.name === 'Collection') {
    valuesArray.push.apply(valuesArray, _toConsumableArray(items.all()));
  } else {
    Object.keys(items).forEach(function (prop) {
      return valuesArray.push(items[prop]);
    });
  }

  return valuesArray;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/helpers/variadic.js":
/*!**********************************************************!*\
  !*** ./node_modules/collect.js/dist/helpers/variadic.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Variadic helper function
 *
 * @param args
 * @returns {*}
 */

module.exports = function variadic(args) {
  if (Array.isArray(args[0])) {
    return args[0];
  }

  return args;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/index.js":
/*!***********************************************!*\
  !*** ./node_modules/collect.js/dist/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function Collection(collection) {
  if (collection !== undefined && !Array.isArray(collection) && (typeof collection === 'undefined' ? 'undefined' : _typeof(collection)) !== 'object') {
    this.items = [collection];
  } else if (collection instanceof this.constructor) {
    this.items = collection.all();
  } else {
    this.items = collection || [];
  }
}

/**
 * Symbol.iterator
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator
 */
var SymbolIterator = __webpack_require__(/*! ./methods/symbol.iterator */ "./node_modules/collect.js/dist/methods/symbol.iterator.js");

if (typeof Symbol !== 'undefined') {
  Collection.prototype[Symbol.iterator] = SymbolIterator;
}

/**
 * Support JSON.stringify
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
 */
Collection.prototype.toJSON = function toJSON() {
  return this.items;
};

Collection.prototype.all = __webpack_require__(/*! ./methods/all */ "./node_modules/collect.js/dist/methods/all.js");
Collection.prototype.average = __webpack_require__(/*! ./methods/average */ "./node_modules/collect.js/dist/methods/average.js");
Collection.prototype.avg = __webpack_require__(/*! ./methods/avg */ "./node_modules/collect.js/dist/methods/avg.js");
Collection.prototype.chunk = __webpack_require__(/*! ./methods/chunk */ "./node_modules/collect.js/dist/methods/chunk.js");
Collection.prototype.collapse = __webpack_require__(/*! ./methods/collapse */ "./node_modules/collect.js/dist/methods/collapse.js");
Collection.prototype.combine = __webpack_require__(/*! ./methods/combine */ "./node_modules/collect.js/dist/methods/combine.js");
Collection.prototype.concat = __webpack_require__(/*! ./methods/concat */ "./node_modules/collect.js/dist/methods/concat.js");
Collection.prototype.contains = __webpack_require__(/*! ./methods/contains */ "./node_modules/collect.js/dist/methods/contains.js");
Collection.prototype.count = __webpack_require__(/*! ./methods/count */ "./node_modules/collect.js/dist/methods/count.js");
Collection.prototype.countBy = __webpack_require__(/*! ./methods/countBy */ "./node_modules/collect.js/dist/methods/countBy.js");
Collection.prototype.crossJoin = __webpack_require__(/*! ./methods/crossJoin */ "./node_modules/collect.js/dist/methods/crossJoin.js");
Collection.prototype.dd = __webpack_require__(/*! ./methods/dd */ "./node_modules/collect.js/dist/methods/dd.js");
Collection.prototype.diff = __webpack_require__(/*! ./methods/diff */ "./node_modules/collect.js/dist/methods/diff.js");
Collection.prototype.diffAssoc = __webpack_require__(/*! ./methods/diffAssoc */ "./node_modules/collect.js/dist/methods/diffAssoc.js");
Collection.prototype.diffKeys = __webpack_require__(/*! ./methods/diffKeys */ "./node_modules/collect.js/dist/methods/diffKeys.js");
Collection.prototype.dump = __webpack_require__(/*! ./methods/dump */ "./node_modules/collect.js/dist/methods/dump.js");
Collection.prototype.duplicates = __webpack_require__(/*! ./methods/duplicates */ "./node_modules/collect.js/dist/methods/duplicates.js");
Collection.prototype.each = __webpack_require__(/*! ./methods/each */ "./node_modules/collect.js/dist/methods/each.js");
Collection.prototype.eachSpread = __webpack_require__(/*! ./methods/eachSpread */ "./node_modules/collect.js/dist/methods/eachSpread.js");
Collection.prototype.every = __webpack_require__(/*! ./methods/every */ "./node_modules/collect.js/dist/methods/every.js");
Collection.prototype.except = __webpack_require__(/*! ./methods/except */ "./node_modules/collect.js/dist/methods/except.js");
Collection.prototype.filter = __webpack_require__(/*! ./methods/filter */ "./node_modules/collect.js/dist/methods/filter.js");
Collection.prototype.first = __webpack_require__(/*! ./methods/first */ "./node_modules/collect.js/dist/methods/first.js");
Collection.prototype.firstWhere = __webpack_require__(/*! ./methods/firstWhere */ "./node_modules/collect.js/dist/methods/firstWhere.js");
Collection.prototype.flatMap = __webpack_require__(/*! ./methods/flatMap */ "./node_modules/collect.js/dist/methods/flatMap.js");
Collection.prototype.flatten = __webpack_require__(/*! ./methods/flatten */ "./node_modules/collect.js/dist/methods/flatten.js");
Collection.prototype.flip = __webpack_require__(/*! ./methods/flip */ "./node_modules/collect.js/dist/methods/flip.js");
Collection.prototype.forPage = __webpack_require__(/*! ./methods/forPage */ "./node_modules/collect.js/dist/methods/forPage.js");
Collection.prototype.forget = __webpack_require__(/*! ./methods/forget */ "./node_modules/collect.js/dist/methods/forget.js");
Collection.prototype.get = __webpack_require__(/*! ./methods/get */ "./node_modules/collect.js/dist/methods/get.js");
Collection.prototype.groupBy = __webpack_require__(/*! ./methods/groupBy */ "./node_modules/collect.js/dist/methods/groupBy.js");
Collection.prototype.has = __webpack_require__(/*! ./methods/has */ "./node_modules/collect.js/dist/methods/has.js");
Collection.prototype.implode = __webpack_require__(/*! ./methods/implode */ "./node_modules/collect.js/dist/methods/implode.js");
Collection.prototype.intersect = __webpack_require__(/*! ./methods/intersect */ "./node_modules/collect.js/dist/methods/intersect.js");
Collection.prototype.intersectByKeys = __webpack_require__(/*! ./methods/intersectByKeys */ "./node_modules/collect.js/dist/methods/intersectByKeys.js");
Collection.prototype.isEmpty = __webpack_require__(/*! ./methods/isEmpty */ "./node_modules/collect.js/dist/methods/isEmpty.js");
Collection.prototype.isNotEmpty = __webpack_require__(/*! ./methods/isNotEmpty */ "./node_modules/collect.js/dist/methods/isNotEmpty.js");
Collection.prototype.join = __webpack_require__(/*! ./methods/join */ "./node_modules/collect.js/dist/methods/join.js");
Collection.prototype.keyBy = __webpack_require__(/*! ./methods/keyBy */ "./node_modules/collect.js/dist/methods/keyBy.js");
Collection.prototype.keys = __webpack_require__(/*! ./methods/keys */ "./node_modules/collect.js/dist/methods/keys.js");
Collection.prototype.last = __webpack_require__(/*! ./methods/last */ "./node_modules/collect.js/dist/methods/last.js");
Collection.prototype.macro = __webpack_require__(/*! ./methods/macro */ "./node_modules/collect.js/dist/methods/macro.js");
Collection.prototype.make = __webpack_require__(/*! ./methods/make */ "./node_modules/collect.js/dist/methods/make.js");
Collection.prototype.map = __webpack_require__(/*! ./methods/map */ "./node_modules/collect.js/dist/methods/map.js");
Collection.prototype.mapSpread = __webpack_require__(/*! ./methods/mapSpread */ "./node_modules/collect.js/dist/methods/mapSpread.js");
Collection.prototype.mapToDictionary = __webpack_require__(/*! ./methods/mapToDictionary */ "./node_modules/collect.js/dist/methods/mapToDictionary.js");
Collection.prototype.mapInto = __webpack_require__(/*! ./methods/mapInto */ "./node_modules/collect.js/dist/methods/mapInto.js");
Collection.prototype.mapToGroups = __webpack_require__(/*! ./methods/mapToGroups */ "./node_modules/collect.js/dist/methods/mapToGroups.js");
Collection.prototype.mapWithKeys = __webpack_require__(/*! ./methods/mapWithKeys */ "./node_modules/collect.js/dist/methods/mapWithKeys.js");
Collection.prototype.max = __webpack_require__(/*! ./methods/max */ "./node_modules/collect.js/dist/methods/max.js");
Collection.prototype.median = __webpack_require__(/*! ./methods/median */ "./node_modules/collect.js/dist/methods/median.js");
Collection.prototype.merge = __webpack_require__(/*! ./methods/merge */ "./node_modules/collect.js/dist/methods/merge.js");
Collection.prototype.mergeRecursive = __webpack_require__(/*! ./methods/mergeRecursive */ "./node_modules/collect.js/dist/methods/mergeRecursive.js");
Collection.prototype.min = __webpack_require__(/*! ./methods/min */ "./node_modules/collect.js/dist/methods/min.js");
Collection.prototype.mode = __webpack_require__(/*! ./methods/mode */ "./node_modules/collect.js/dist/methods/mode.js");
Collection.prototype.nth = __webpack_require__(/*! ./methods/nth */ "./node_modules/collect.js/dist/methods/nth.js");
Collection.prototype.only = __webpack_require__(/*! ./methods/only */ "./node_modules/collect.js/dist/methods/only.js");
Collection.prototype.pad = __webpack_require__(/*! ./methods/pad */ "./node_modules/collect.js/dist/methods/pad.js");
Collection.prototype.partition = __webpack_require__(/*! ./methods/partition */ "./node_modules/collect.js/dist/methods/partition.js");
Collection.prototype.pipe = __webpack_require__(/*! ./methods/pipe */ "./node_modules/collect.js/dist/methods/pipe.js");
Collection.prototype.pluck = __webpack_require__(/*! ./methods/pluck */ "./node_modules/collect.js/dist/methods/pluck.js");
Collection.prototype.pop = __webpack_require__(/*! ./methods/pop */ "./node_modules/collect.js/dist/methods/pop.js");
Collection.prototype.prepend = __webpack_require__(/*! ./methods/prepend */ "./node_modules/collect.js/dist/methods/prepend.js");
Collection.prototype.pull = __webpack_require__(/*! ./methods/pull */ "./node_modules/collect.js/dist/methods/pull.js");
Collection.prototype.push = __webpack_require__(/*! ./methods/push */ "./node_modules/collect.js/dist/methods/push.js");
Collection.prototype.put = __webpack_require__(/*! ./methods/put */ "./node_modules/collect.js/dist/methods/put.js");
Collection.prototype.random = __webpack_require__(/*! ./methods/random */ "./node_modules/collect.js/dist/methods/random.js");
Collection.prototype.reduce = __webpack_require__(/*! ./methods/reduce */ "./node_modules/collect.js/dist/methods/reduce.js");
Collection.prototype.reject = __webpack_require__(/*! ./methods/reject */ "./node_modules/collect.js/dist/methods/reject.js");
Collection.prototype.replace = __webpack_require__(/*! ./methods/replace */ "./node_modules/collect.js/dist/methods/replace.js");
Collection.prototype.replaceRecursive = __webpack_require__(/*! ./methods/replaceRecursive */ "./node_modules/collect.js/dist/methods/replaceRecursive.js");
Collection.prototype.reverse = __webpack_require__(/*! ./methods/reverse */ "./node_modules/collect.js/dist/methods/reverse.js");
Collection.prototype.search = __webpack_require__(/*! ./methods/search */ "./node_modules/collect.js/dist/methods/search.js");
Collection.prototype.shift = __webpack_require__(/*! ./methods/shift */ "./node_modules/collect.js/dist/methods/shift.js");
Collection.prototype.shuffle = __webpack_require__(/*! ./methods/shuffle */ "./node_modules/collect.js/dist/methods/shuffle.js");
Collection.prototype.skip = __webpack_require__(/*! ./methods/skip */ "./node_modules/collect.js/dist/methods/skip.js");
Collection.prototype.skipUntil = __webpack_require__(/*! ./methods/skipUntil */ "./node_modules/collect.js/dist/methods/skipUntil.js");
Collection.prototype.skipWhile = __webpack_require__(/*! ./methods/skipWhile */ "./node_modules/collect.js/dist/methods/skipWhile.js");
Collection.prototype.slice = __webpack_require__(/*! ./methods/slice */ "./node_modules/collect.js/dist/methods/slice.js");
Collection.prototype.some = __webpack_require__(/*! ./methods/some */ "./node_modules/collect.js/dist/methods/some.js");
Collection.prototype.sort = __webpack_require__(/*! ./methods/sort */ "./node_modules/collect.js/dist/methods/sort.js");
Collection.prototype.sortDesc = __webpack_require__(/*! ./methods/sortDesc */ "./node_modules/collect.js/dist/methods/sortDesc.js");
Collection.prototype.sortBy = __webpack_require__(/*! ./methods/sortBy */ "./node_modules/collect.js/dist/methods/sortBy.js");
Collection.prototype.sortByDesc = __webpack_require__(/*! ./methods/sortByDesc */ "./node_modules/collect.js/dist/methods/sortByDesc.js");
Collection.prototype.sortKeys = __webpack_require__(/*! ./methods/sortKeys */ "./node_modules/collect.js/dist/methods/sortKeys.js");
Collection.prototype.sortKeysDesc = __webpack_require__(/*! ./methods/sortKeysDesc */ "./node_modules/collect.js/dist/methods/sortKeysDesc.js");
Collection.prototype.splice = __webpack_require__(/*! ./methods/splice */ "./node_modules/collect.js/dist/methods/splice.js");
Collection.prototype.split = __webpack_require__(/*! ./methods/split */ "./node_modules/collect.js/dist/methods/split.js");
Collection.prototype.sum = __webpack_require__(/*! ./methods/sum */ "./node_modules/collect.js/dist/methods/sum.js");
Collection.prototype.take = __webpack_require__(/*! ./methods/take */ "./node_modules/collect.js/dist/methods/take.js");
Collection.prototype.takeUntil = __webpack_require__(/*! ./methods/takeUntil */ "./node_modules/collect.js/dist/methods/takeUntil.js");
Collection.prototype.takeWhile = __webpack_require__(/*! ./methods/takeWhile */ "./node_modules/collect.js/dist/methods/takeWhile.js");
Collection.prototype.tap = __webpack_require__(/*! ./methods/tap */ "./node_modules/collect.js/dist/methods/tap.js");
Collection.prototype.times = __webpack_require__(/*! ./methods/times */ "./node_modules/collect.js/dist/methods/times.js");
Collection.prototype.toArray = __webpack_require__(/*! ./methods/toArray */ "./node_modules/collect.js/dist/methods/toArray.js");
Collection.prototype.toJson = __webpack_require__(/*! ./methods/toJson */ "./node_modules/collect.js/dist/methods/toJson.js");
Collection.prototype.transform = __webpack_require__(/*! ./methods/transform */ "./node_modules/collect.js/dist/methods/transform.js");
Collection.prototype.unless = __webpack_require__(/*! ./methods/unless */ "./node_modules/collect.js/dist/methods/unless.js");
Collection.prototype.unlessEmpty = __webpack_require__(/*! ./methods/whenNotEmpty */ "./node_modules/collect.js/dist/methods/whenNotEmpty.js");
Collection.prototype.unlessNotEmpty = __webpack_require__(/*! ./methods/whenEmpty */ "./node_modules/collect.js/dist/methods/whenEmpty.js");
Collection.prototype.union = __webpack_require__(/*! ./methods/union */ "./node_modules/collect.js/dist/methods/union.js");
Collection.prototype.unique = __webpack_require__(/*! ./methods/unique */ "./node_modules/collect.js/dist/methods/unique.js");
Collection.prototype.unwrap = __webpack_require__(/*! ./methods/unwrap */ "./node_modules/collect.js/dist/methods/unwrap.js");
Collection.prototype.values = __webpack_require__(/*! ./methods/values */ "./node_modules/collect.js/dist/methods/values.js");
Collection.prototype.when = __webpack_require__(/*! ./methods/when */ "./node_modules/collect.js/dist/methods/when.js");
Collection.prototype.whenEmpty = __webpack_require__(/*! ./methods/whenEmpty */ "./node_modules/collect.js/dist/methods/whenEmpty.js");
Collection.prototype.whenNotEmpty = __webpack_require__(/*! ./methods/whenNotEmpty */ "./node_modules/collect.js/dist/methods/whenNotEmpty.js");
Collection.prototype.where = __webpack_require__(/*! ./methods/where */ "./node_modules/collect.js/dist/methods/where.js");
Collection.prototype.whereBetween = __webpack_require__(/*! ./methods/whereBetween */ "./node_modules/collect.js/dist/methods/whereBetween.js");
Collection.prototype.whereIn = __webpack_require__(/*! ./methods/whereIn */ "./node_modules/collect.js/dist/methods/whereIn.js");
Collection.prototype.whereInstanceOf = __webpack_require__(/*! ./methods/whereInstanceOf */ "./node_modules/collect.js/dist/methods/whereInstanceOf.js");
Collection.prototype.whereNotBetween = __webpack_require__(/*! ./methods/whereNotBetween */ "./node_modules/collect.js/dist/methods/whereNotBetween.js");
Collection.prototype.whereNotIn = __webpack_require__(/*! ./methods/whereNotIn */ "./node_modules/collect.js/dist/methods/whereNotIn.js");
Collection.prototype.whereNull = __webpack_require__(/*! ./methods/whereNull */ "./node_modules/collect.js/dist/methods/whereNull.js");
Collection.prototype.whereNotNull = __webpack_require__(/*! ./methods/whereNotNull */ "./node_modules/collect.js/dist/methods/whereNotNull.js");
Collection.prototype.wrap = __webpack_require__(/*! ./methods/wrap */ "./node_modules/collect.js/dist/methods/wrap.js");
Collection.prototype.zip = __webpack_require__(/*! ./methods/zip */ "./node_modules/collect.js/dist/methods/zip.js");

var collect = function collect(collection) {
  return new Collection(collection);
};

module.exports = collect;
module.exports.collect = collect;
module.exports.default = collect;
module.exports.Collection = Collection;

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/all.js":
/*!*****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/all.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function all() {
  return this.items;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/average.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/average.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function average(key) {
  if (key === undefined) {
    return this.sum() / this.items.length;
  }

  return new this.constructor(this.items).pluck(key).sum() / this.items.length;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/avg.js":
/*!*****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/avg.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var average = __webpack_require__(/*! ./average */ "./node_modules/collect.js/dist/methods/average.js");

module.exports = average;

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/chunk.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/chunk.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function chunk(size) {
  var _this = this;

  var chunks = [];
  var index = 0;

  if (Array.isArray(this.items)) {
    do {
      var items = this.items.slice(index, index + size);
      var collection = new this.constructor(items);

      chunks.push(collection);
      index += size;
    } while (index < this.items.length);
  } else if (_typeof(this.items) === 'object') {
    var keys = Object.keys(this.items);

    var _loop = function _loop() {
      var keysOfChunk = keys.slice(index, index + size);
      var collection = new _this.constructor({});

      keysOfChunk.forEach(function (key) {
        return collection.put(key, _this.items[key]);
      });

      chunks.push(collection);
      index += size;
    };

    do {
      _loop();
    } while (index < keys.length);
  } else {
    chunks.push(new this.constructor([this.items]));
  }

  return new this.constructor(chunks);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/collapse.js":
/*!**********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/collapse.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = function collapse() {
  var _ref;

  return new this.constructor((_ref = []).concat.apply(_ref, _toConsumableArray(this.items)));
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/combine.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/combine.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function combine(array) {
  var _this = this;

  var values = array;

  if (values instanceof this.constructor) {
    values = array.all();
  }

  var collection = {};

  if (Array.isArray(this.items) && Array.isArray(values)) {
    this.items.forEach(function (key, iterator) {
      collection[key] = values[iterator];
    });
  } else if (_typeof(this.items) === 'object' && (typeof values === 'undefined' ? 'undefined' : _typeof(values)) === 'object') {
    Object.keys(this.items).forEach(function (key, index) {
      collection[_this.items[key]] = values[Object.keys(values)[index]];
    });
  } else if (Array.isArray(this.items)) {
    collection[this.items[0]] = values;
  } else if (typeof this.items === 'string' && Array.isArray(values)) {
    var _values = values;

    var _values2 = _slicedToArray(_values, 1);

    collection[this.items] = _values2[0];
  } else if (typeof this.items === 'string') {
    collection[this.items] = values;
  }

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/concat.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/concat.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var clone = __webpack_require__(/*! ../helpers/clone */ "./node_modules/collect.js/dist/helpers/clone.js");

module.exports = function concat(collectionOrArrayOrObject) {
  var list = collectionOrArrayOrObject;

  if (collectionOrArrayOrObject instanceof this.constructor) {
    list = collectionOrArrayOrObject.all();
  } else if ((typeof collectionOrArrayOrObject === 'undefined' ? 'undefined' : _typeof(collectionOrArrayOrObject)) === 'object') {
    list = [];
    Object.keys(collectionOrArrayOrObject).forEach(function (property) {
      list.push(collectionOrArrayOrObject[property]);
    });
  }

  var collection = clone(this.items);

  list.forEach(function (item) {
    if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
      Object.keys(item).forEach(function (key) {
        return collection.push(item[key]);
      });
    } else {
      collection.push(item);
    }
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/contains.js":
/*!**********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/contains.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var values = __webpack_require__(/*! ../helpers/values */ "./node_modules/collect.js/dist/helpers/values.js");

var _require = __webpack_require__(/*! ../helpers/is */ "./node_modules/collect.js/dist/helpers/is.js"),
    isFunction = _require.isFunction;

module.exports = function contains(key, value) {
  if (value !== undefined) {
    if (Array.isArray(this.items)) {
      return this.items.filter(function (items) {
        return items[key] !== undefined && items[key] === value;
      }).length > 0;
    }

    return this.items[key] !== undefined && this.items[key] === value;
  }

  if (isFunction(key)) {
    return this.items.filter(function (item, index) {
      return key(item, index);
    }).length > 0;
  }

  if (Array.isArray(this.items)) {
    return this.items.indexOf(key) !== -1;
  }

  var keysAndValues = values(this.items);
  keysAndValues.push.apply(keysAndValues, _toConsumableArray(Object.keys(this.items)));

  return keysAndValues.indexOf(key) !== -1;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/count.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/count.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function count() {
  var arrayLength = 0;

  if (Array.isArray(this.items)) {
    arrayLength = this.items.length;
  }

  return Math.max(Object.keys(this.items).length, arrayLength);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/countBy.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/countBy.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function countBy() {
  var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (value) {
    return value;
  };

  return new this.constructor(this.items).groupBy(fn).map(function (value) {
    return value.count();
  });
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/crossJoin.js":
/*!***********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/crossJoin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function crossJoin() {
  function join(collection, constructor, args) {
    var current = args[0];

    if (current instanceof constructor) {
      current = current.all();
    }

    var rest = args.slice(1);
    var last = !rest.length;
    var result = [];

    for (var i = 0; i < current.length; i += 1) {
      var collectionCopy = collection.slice();
      collectionCopy.push(current[i]);

      if (last) {
        result.push(collectionCopy);
      } else {
        result = result.concat(join(collectionCopy, constructor, rest));
      }
    }

    return result;
  }

  for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return new this.constructor(join([], this.constructor, [].concat([this.items], values)));
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/dd.js":
/*!****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/dd.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

module.exports = function dd() {
  this.dump();

  if (typeof process !== 'undefined') {
    process.exit(1);
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/diff.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/diff.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function diff(values) {
  var valuesToDiff = void 0;

  if (values instanceof this.constructor) {
    valuesToDiff = values.all();
  } else {
    valuesToDiff = values;
  }

  var collection = this.items.filter(function (item) {
    return valuesToDiff.indexOf(item) === -1;
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/diffAssoc.js":
/*!***********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/diffAssoc.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function diffAssoc(values) {
  var _this = this;

  var diffValues = values;

  if (values instanceof this.constructor) {
    diffValues = values.all();
  }

  var collection = {};

  Object.keys(this.items).forEach(function (key) {
    if (diffValues[key] === undefined || diffValues[key] !== _this.items[key]) {
      collection[key] = _this.items[key];
    }
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/diffKeys.js":
/*!**********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/diffKeys.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function diffKeys(object) {
  var objectToDiff = void 0;

  if (object instanceof this.constructor) {
    objectToDiff = object.all();
  } else {
    objectToDiff = object;
  }

  var objectKeys = Object.keys(objectToDiff);

  var remainingKeys = Object.keys(this.items).filter(function (item) {
    return objectKeys.indexOf(item) === -1;
  });

  return new this.constructor(this.items).only(remainingKeys);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/dump.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/dump.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function dump() {
  // eslint-disable-next-line
  console.log(this);

  return this;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/duplicates.js":
/*!************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/duplicates.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function duplicates() {
  var _this = this;

  var occuredValues = [];
  var duplicateValues = {};

  var stringifiedValue = function stringifiedValue(value) {
    if (Array.isArray(value) || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
      return JSON.stringify(value);
    }

    return value;
  };

  if (Array.isArray(this.items)) {
    this.items.forEach(function (value, index) {
      var valueAsString = stringifiedValue(value);

      if (occuredValues.indexOf(valueAsString) === -1) {
        occuredValues.push(valueAsString);
      } else {
        duplicateValues[index] = value;
      }
    });
  } else if (_typeof(this.items) === 'object') {
    Object.keys(this.items).forEach(function (key) {
      var valueAsString = stringifiedValue(_this.items[key]);

      if (occuredValues.indexOf(valueAsString) === -1) {
        occuredValues.push(valueAsString);
      } else {
        duplicateValues[key] = _this.items[key];
      }
    });
  }

  return new this.constructor(duplicateValues);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/each.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/each.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function each(fn) {
  var stop = false;

  if (Array.isArray(this.items)) {
    var length = this.items.length;


    for (var index = 0; index < length && !stop; index += 1) {
      stop = fn(this.items[index], index, this.items) === false;
    }
  } else {
    var keys = Object.keys(this.items);
    var _length = keys.length;


    for (var _index = 0; _index < _length && !stop; _index += 1) {
      var key = keys[_index];

      stop = fn(this.items[key], key, this.items) === false;
    }
  }

  return this;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/eachSpread.js":
/*!************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/eachSpread.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = function eachSpread(fn) {
  this.each(function (values, key) {
    fn.apply(undefined, _toConsumableArray(values).concat([key]));
  });

  return this;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/every.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/every.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var values = __webpack_require__(/*! ../helpers/values */ "./node_modules/collect.js/dist/helpers/values.js");

module.exports = function every(fn) {
  var items = values(this.items);

  return items.every(fn);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/except.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/except.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var variadic = __webpack_require__(/*! ../helpers/variadic */ "./node_modules/collect.js/dist/helpers/variadic.js");

module.exports = function except() {
  var _this = this;

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var properties = variadic(args);

  if (Array.isArray(this.items)) {
    var _collection = this.items.filter(function (item) {
      return properties.indexOf(item) === -1;
    });

    return new this.constructor(_collection);
  }

  var collection = {};

  Object.keys(this.items).forEach(function (property) {
    if (properties.indexOf(property) === -1) {
      collection[property] = _this.items[property];
    }
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/filter.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/filter.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function falsyValue(item) {
  if (Array.isArray(item)) {
    if (item.length) {
      return false;
    }
  } else if (item !== undefined && item !== null && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
    if (Object.keys(item).length) {
      return false;
    }
  } else if (item) {
    return false;
  }

  return true;
}

function filterObject(func, items) {
  var result = {};
  Object.keys(items).forEach(function (key) {
    if (func) {
      if (func(items[key], key)) {
        result[key] = items[key];
      }
    } else if (!falsyValue(items[key])) {
      result[key] = items[key];
    }
  });

  return result;
}

function filterArray(func, items) {
  if (func) {
    return items.filter(func);
  }
  var result = [];
  for (var i = 0; i < items.length; i += 1) {
    var item = items[i];
    if (!falsyValue(item)) {
      result.push(item);
    }
  }

  return result;
}

module.exports = function filter(fn) {
  var func = fn || false;
  var filteredItems = null;
  if (Array.isArray(this.items)) {
    filteredItems = filterArray(func, this.items);
  } else {
    filteredItems = filterObject(func, this.items);
  }

  return new this.constructor(filteredItems);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/first.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/first.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! ../helpers/is */ "./node_modules/collect.js/dist/helpers/is.js"),
    isFunction = _require.isFunction;

module.exports = function first(fn, defaultValue) {
  if (isFunction(fn)) {
    for (var i = 0, length = this.items.length; i < length; i += 1) {
      var item = this.items[i];
      if (fn(item)) {
        return item;
      }
    }

    if (isFunction(defaultValue)) {
      return defaultValue();
    }

    return defaultValue;
  }

  if (Array.isArray(this.items) && this.items.length || Object.keys(this.items).length) {
    if (Array.isArray(this.items)) {
      return this.items[0];
    }

    var firstKey = Object.keys(this.items)[0];

    return this.items[firstKey];
  }

  if (isFunction(defaultValue)) {
    return defaultValue();
  }

  return defaultValue;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/firstWhere.js":
/*!************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/firstWhere.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function firstWhere(key, operator, value) {
  return this.where(key, operator, value).first() || null;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/flatMap.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/flatMap.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function flatMap(fn) {
  return this.map(fn).collapse();
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/flatten.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/flatten.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! ../helpers/is */ "./node_modules/collect.js/dist/helpers/is.js"),
    isArray = _require.isArray,
    isObject = _require.isObject;

module.exports = function flatten(depth) {
  var flattenDepth = depth || Infinity;

  var fullyFlattened = false;
  var collection = [];

  var flat = function flat(items) {
    collection = [];

    if (isArray(items)) {
      items.forEach(function (item) {
        if (isArray(item)) {
          collection = collection.concat(item);
        } else if (isObject(item)) {
          Object.keys(item).forEach(function (property) {
            collection = collection.concat(item[property]);
          });
        } else {
          collection.push(item);
        }
      });
    } else {
      Object.keys(items).forEach(function (property) {
        if (isArray(items[property])) {
          collection = collection.concat(items[property]);
        } else if (isObject(items[property])) {
          Object.keys(items[property]).forEach(function (prop) {
            collection = collection.concat(items[property][prop]);
          });
        } else {
          collection.push(items[property]);
        }
      });
    }

    fullyFlattened = collection.filter(function (item) {
      return isObject(item);
    });
    fullyFlattened = fullyFlattened.length === 0;

    flattenDepth -= 1;
  };

  flat(this.items);

  while (!fullyFlattened && flattenDepth > 0) {
    flat(collection);
  }

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/flip.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/flip.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function flip() {
  var _this = this;

  var collection = {};

  if (Array.isArray(this.items)) {
    Object.keys(this.items).forEach(function (key) {
      collection[_this.items[key]] = Number(key);
    });
  } else {
    Object.keys(this.items).forEach(function (key) {
      collection[_this.items[key]] = key;
    });
  }

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/forPage.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/forPage.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function forPage(page, chunk) {
  var _this = this;

  var collection = {};

  if (Array.isArray(this.items)) {
    collection = this.items.slice(page * chunk - chunk, page * chunk);
  } else {
    Object.keys(this.items).slice(page * chunk - chunk, page * chunk).forEach(function (key) {
      collection[key] = _this.items[key];
    });
  }

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/forget.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/forget.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function forget(key) {
  if (Array.isArray(this.items)) {
    this.items.splice(key, 1);
  } else {
    delete this.items[key];
  }

  return this;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/get.js":
/*!*****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/get.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! ../helpers/is */ "./node_modules/collect.js/dist/helpers/is.js"),
    isFunction = _require.isFunction;

module.exports = function get(key) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (this.items[key] !== undefined) {
    return this.items[key];
  }

  if (isFunction(defaultValue)) {
    return defaultValue();
  }

  if (defaultValue !== null) {
    return defaultValue;
  }

  return null;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/groupBy.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/groupBy.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var nestedValue = __webpack_require__(/*! ../helpers/nestedValue */ "./node_modules/collect.js/dist/helpers/nestedValue.js");

var _require = __webpack_require__(/*! ../helpers/is */ "./node_modules/collect.js/dist/helpers/is.js"),
    isFunction = _require.isFunction;

module.exports = function groupBy(key) {
  var _this = this;

  var collection = {};

  this.items.forEach(function (item, index) {
    var resolvedKey = void 0;

    if (isFunction(key)) {
      resolvedKey = key(item, index);
    } else if (nestedValue(item, key) || nestedValue(item, key) === 0) {
      resolvedKey = nestedValue(item, key);
    } else {
      resolvedKey = '';
    }

    if (collection[resolvedKey] === undefined) {
      collection[resolvedKey] = new _this.constructor([]);
    }

    collection[resolvedKey].push(item);
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/has.js":
/*!*****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/has.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var variadic = __webpack_require__(/*! ../helpers/variadic */ "./node_modules/collect.js/dist/helpers/variadic.js");

module.exports = function has() {
  var _this = this;

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var properties = variadic(args);

  return properties.filter(function (key) {
    return Object.hasOwnProperty.call(_this.items, key);
  }).length === properties.length;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/implode.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/implode.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function implode(key, glue) {
  if (glue === undefined) {
    return this.items.join(key);
  }

  return new this.constructor(this.items).pluck(key).all().join(glue);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/intersect.js":
/*!***********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/intersect.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function intersect(values) {
  var intersectValues = values;

  if (values instanceof this.constructor) {
    intersectValues = values.all();
  }

  var collection = this.items.filter(function (item) {
    return intersectValues.indexOf(item) !== -1;
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/intersectByKeys.js":
/*!*****************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/intersectByKeys.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function intersectByKeys(values) {
  var _this = this;

  var intersectKeys = Object.keys(values);

  if (values instanceof this.constructor) {
    intersectKeys = Object.keys(values.all());
  }

  var collection = {};

  Object.keys(this.items).forEach(function (key) {
    if (intersectKeys.indexOf(key) !== -1) {
      collection[key] = _this.items[key];
    }
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/isEmpty.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/isEmpty.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isEmpty() {
  if (Array.isArray(this.items)) {
    return !this.items.length;
  }

  return !Object.keys(this.items).length;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/isNotEmpty.js":
/*!************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/isNotEmpty.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isNotEmpty() {
  return !this.isEmpty();
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/join.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/join.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function join(glue, finalGlue) {
  var collection = this.values();

  if (finalGlue === undefined) {
    return collection.implode(glue);
  }

  var count = collection.count();

  if (count === 0) {
    return '';
  }

  if (count === 1) {
    return collection.last();
  }

  var finalItem = collection.pop();

  return collection.implode(glue) + finalGlue + finalItem;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/keyBy.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/keyBy.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var nestedValue = __webpack_require__(/*! ../helpers/nestedValue */ "./node_modules/collect.js/dist/helpers/nestedValue.js");

var _require = __webpack_require__(/*! ../helpers/is */ "./node_modules/collect.js/dist/helpers/is.js"),
    isFunction = _require.isFunction;

module.exports = function keyBy(key) {
  var collection = {};

  if (isFunction(key)) {
    this.items.forEach(function (item) {
      collection[key(item)] = item;
    });
  } else {
    this.items.forEach(function (item) {
      var keyValue = nestedValue(item, key);

      collection[keyValue || ''] = item;
    });
  }

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/keys.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/keys.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function keys() {
  var collection = Object.keys(this.items);

  if (Array.isArray(this.items)) {
    collection = collection.map(Number);
  }

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/last.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/last.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! ../helpers/is */ "./node_modules/collect.js/dist/helpers/is.js"),
    isFunction = _require.isFunction;

module.exports = function last(fn, defaultValue) {
  var items = this.items;


  if (isFunction(fn)) {
    items = this.filter(fn).all();
  }

  if (Array.isArray(items) && !items.length || !Object.keys(items).length) {
    if (isFunction(defaultValue)) {
      return defaultValue();
    }

    return defaultValue;
  }

  if (Array.isArray(items)) {
    return items[items.length - 1];
  }
  var keys = Object.keys(items);

  return items[keys[keys.length - 1]];
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/macro.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/macro.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function macro(name, fn) {
  this.constructor.prototype[name] = fn;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/make.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/make.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function make() {
  var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  return new this.constructor(items);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/map.js":
/*!*****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/map.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function map(fn) {
  var _this = this;

  if (Array.isArray(this.items)) {
    return new this.constructor(this.items.map(fn));
  }

  var collection = {};

  Object.keys(this.items).forEach(function (key) {
    collection[key] = fn(_this.items[key], key);
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/mapInto.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/mapInto.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function mapInto(ClassName) {
  return this.map(function (value, key) {
    return new ClassName(value, key);
  });
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/mapSpread.js":
/*!***********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/mapSpread.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = function mapSpread(fn) {
  return this.map(function (values, key) {
    return fn.apply(undefined, _toConsumableArray(values).concat([key]));
  });
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/mapToDictionary.js":
/*!*****************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/mapToDictionary.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

module.exports = function mapToDictionary(fn) {
  var collection = {};

  this.items.forEach(function (item, k) {
    var _fn = fn(item, k),
        _fn2 = _slicedToArray(_fn, 2),
        key = _fn2[0],
        value = _fn2[1];

    if (collection[key] === undefined) {
      collection[key] = [value];
    } else {
      collection[key].push(value);
    }
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/mapToGroups.js":
/*!*************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/mapToGroups.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

module.exports = function mapToGroups(fn) {
  var collection = {};

  this.items.forEach(function (item, key) {
    var _fn = fn(item, key),
        _fn2 = _slicedToArray(_fn, 2),
        keyed = _fn2[0],
        value = _fn2[1];

    if (collection[keyed] === undefined) {
      collection[keyed] = [value];
    } else {
      collection[keyed].push(value);
    }
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/mapWithKeys.js":
/*!*************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/mapWithKeys.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

module.exports = function mapWithKeys(fn) {
  var _this = this;

  var collection = {};

  if (Array.isArray(this.items)) {
    this.items.forEach(function (item) {
      var _fn = fn(item),
          _fn2 = _slicedToArray(_fn, 2),
          keyed = _fn2[0],
          value = _fn2[1];

      collection[keyed] = value;
    });
  } else {
    Object.keys(this.items).forEach(function (key) {
      var _fn3 = fn(_this.items[key]),
          _fn4 = _slicedToArray(_fn3, 2),
          keyed = _fn4[0],
          value = _fn4[1];

      collection[keyed] = value;
    });
  }

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/max.js":
/*!*****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/max.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = function max(key) {
  if (typeof key === 'string') {
    var filtered = this.items.filter(function (item) {
      return item[key] !== undefined;
    });

    return Math.max.apply(Math, _toConsumableArray(filtered.map(function (item) {
      return item[key];
    })));
  }

  return Math.max.apply(Math, _toConsumableArray(this.items));
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/median.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/median.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function median(key) {
  var length = this.items.length;


  if (key === undefined) {
    if (length % 2 === 0) {
      return (this.items[length / 2 - 1] + this.items[length / 2]) / 2;
    }

    return this.items[Math.floor(length / 2)];
  }

  if (length % 2 === 0) {
    return (this.items[length / 2 - 1][key] + this.items[length / 2][key]) / 2;
  }

  return this.items[Math.floor(length / 2)][key];
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/merge.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/merge.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function merge(value) {
  var arrayOrObject = value;

  if (typeof arrayOrObject === 'string') {
    arrayOrObject = [arrayOrObject];
  }

  if (Array.isArray(this.items) && Array.isArray(arrayOrObject)) {
    return new this.constructor(this.items.concat(arrayOrObject));
  }

  var collection = JSON.parse(JSON.stringify(this.items));

  Object.keys(arrayOrObject).forEach(function (key) {
    collection[key] = arrayOrObject[key];
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/mergeRecursive.js":
/*!****************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/mergeRecursive.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function mergeRecursive(items) {
  var merge = function merge(target, source) {
    var merged = {};

    var mergedKeys = Object.keys(Object.assign({}, target, source));

    mergedKeys.forEach(function (key) {
      if (target[key] === undefined && source[key] !== undefined) {
        merged[key] = source[key];
      } else if (target[key] !== undefined && source[key] === undefined) {
        merged[key] = target[key];
      } else if (target[key] !== undefined && source[key] !== undefined) {
        if (target[key] === source[key]) {
          merged[key] = target[key];
        } else if (!Array.isArray(target[key]) && _typeof(target[key]) === 'object' && !Array.isArray(source[key]) && _typeof(source[key]) === 'object') {
          merged[key] = merge(target[key], source[key]);
        } else {
          merged[key] = [].concat(target[key], source[key]);
        }
      }
    });

    return merged;
  };

  if (!items) {
    return this;
  }

  if (items.constructor.name === 'Collection') {
    return new this.constructor(merge(this.items, items.all()));
  }

  return new this.constructor(merge(this.items, items));
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/min.js":
/*!*****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/min.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = function min(key) {
  if (key !== undefined) {
    var filtered = this.items.filter(function (item) {
      return item[key] !== undefined;
    });

    return Math.min.apply(Math, _toConsumableArray(filtered.map(function (item) {
      return item[key];
    })));
  }

  return Math.min.apply(Math, _toConsumableArray(this.items));
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/mode.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/mode.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function mode(key) {
  var values = [];
  var highestCount = 1;

  if (!this.items.length) {
    return null;
  }

  this.items.forEach(function (item) {
    var tempValues = values.filter(function (value) {
      if (key !== undefined) {
        return value.key === item[key];
      }

      return value.key === item;
    });

    if (!tempValues.length) {
      if (key !== undefined) {
        values.push({ key: item[key], count: 1 });
      } else {
        values.push({ key: item, count: 1 });
      }
    } else {
      tempValues[0].count += 1;
      var count = tempValues[0].count;


      if (count > highestCount) {
        highestCount = count;
      }
    }
  });

  return values.filter(function (value) {
    return value.count === highestCount;
  }).map(function (value) {
    return value.key;
  });
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/nth.js":
/*!*****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/nth.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var values = __webpack_require__(/*! ../helpers/values */ "./node_modules/collect.js/dist/helpers/values.js");

module.exports = function nth(n) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var items = values(this.items);

  var collection = items.slice(offset).filter(function (item, index) {
    return index % n === 0;
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/only.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/only.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var variadic = __webpack_require__(/*! ../helpers/variadic */ "./node_modules/collect.js/dist/helpers/variadic.js");

module.exports = function only() {
  var _this = this;

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var properties = variadic(args);

  if (Array.isArray(this.items)) {
    var _collection = this.items.filter(function (item) {
      return properties.indexOf(item) !== -1;
    });

    return new this.constructor(_collection);
  }

  var collection = {};

  Object.keys(this.items).forEach(function (prop) {
    if (properties.indexOf(prop) !== -1) {
      collection[prop] = _this.items[prop];
    }
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/pad.js":
/*!*****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/pad.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var clone = __webpack_require__(/*! ../helpers/clone */ "./node_modules/collect.js/dist/helpers/clone.js");

module.exports = function pad(size, value) {
  var abs = Math.abs(size);
  var count = this.count();

  if (abs <= count) {
    return this;
  }

  var diff = abs - count;
  var items = clone(this.items);
  var isArray = Array.isArray(this.items);
  var prepend = size < 0;

  for (var iterator = 0; iterator < diff;) {
    if (!isArray) {
      if (items[iterator] !== undefined) {
        diff += 1;
      } else {
        items[iterator] = value;
      }
    } else if (prepend) {
      items.unshift(value);
    } else {
      items.push(value);
    }

    iterator += 1;
  }

  return new this.constructor(items);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/partition.js":
/*!***********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/partition.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function partition(fn) {
  var _this = this;

  var arrays = void 0;

  if (Array.isArray(this.items)) {
    arrays = [new this.constructor([]), new this.constructor([])];

    this.items.forEach(function (item) {
      if (fn(item) === true) {
        arrays[0].push(item);
      } else {
        arrays[1].push(item);
      }
    });
  } else {
    arrays = [new this.constructor({}), new this.constructor({})];

    Object.keys(this.items).forEach(function (prop) {
      var value = _this.items[prop];

      if (fn(value) === true) {
        arrays[0].put(prop, value);
      } else {
        arrays[1].put(prop, value);
      }
    });
  }

  return new this.constructor(arrays);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/pipe.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/pipe.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function pipe(fn) {
  return fn(this);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/pluck.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/pluck.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! ../helpers/is */ "./node_modules/collect.js/dist/helpers/is.js"),
    isArray = _require.isArray,
    isObject = _require.isObject;

var nestedValue = __webpack_require__(/*! ../helpers/nestedValue */ "./node_modules/collect.js/dist/helpers/nestedValue.js");

var buildKeyPathMap = function buildKeyPathMap(items) {
  var keyPaths = {};

  items.forEach(function (item, index) {
    function buildKeyPath(val, keyPath) {
      if (isObject(val)) {
        Object.keys(val).forEach(function (prop) {
          buildKeyPath(val[prop], keyPath + '.' + prop);
        });
      } else if (isArray(val)) {
        val.forEach(function (v, i) {
          buildKeyPath(v, keyPath + '.' + i);
        });
      }

      keyPaths[keyPath] = val;
    }

    buildKeyPath(item, index);
  });

  return keyPaths;
};

module.exports = function pluck(value, key) {
  if (value.indexOf('*') !== -1) {
    var keyPathMap = buildKeyPathMap(this.items);

    var keyMatches = [];

    if (key !== undefined) {
      var keyRegex = new RegExp('0.' + key, 'g');
      var keyNumberOfLevels = ('0.' + key).split('.').length;

      Object.keys(keyPathMap).forEach(function (k) {
        var matchingKey = k.match(keyRegex);

        if (matchingKey) {
          var match = matchingKey[0];

          if (match.split('.').length === keyNumberOfLevels) {
            keyMatches.push(keyPathMap[match]);
          }
        }
      });
    }

    var valueMatches = [];
    var valueRegex = new RegExp('0.' + value, 'g');
    var valueNumberOfLevels = ('0.' + value).split('.').length;

    Object.keys(keyPathMap).forEach(function (k) {
      var matchingValue = k.match(valueRegex);

      if (matchingValue) {
        var match = matchingValue[0];

        if (match.split('.').length === valueNumberOfLevels) {
          valueMatches.push(keyPathMap[match]);
        }
      }
    });

    if (key !== undefined) {
      var collection = {};

      this.items.forEach(function (item, index) {
        collection[keyMatches[index] || ''] = valueMatches;
      });

      return new this.constructor(collection);
    }

    return new this.constructor([valueMatches]);
  }

  if (key !== undefined) {
    var _collection = {};

    this.items.forEach(function (item) {
      if (nestedValue(item, value) !== undefined) {
        _collection[item[key] || ''] = nestedValue(item, value);
      } else {
        _collection[item[key] || ''] = null;
      }
    });

    return new this.constructor(_collection);
  }

  return this.map(function (item) {
    if (nestedValue(item, value) !== undefined) {
      return nestedValue(item, value);
    }

    return null;
  });
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/pop.js":
/*!*****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/pop.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function pop() {
  if (Array.isArray(this.items)) {
    return this.items.pop();
  }

  var keys = Object.keys(this.items);
  var key = keys[keys.length - 1];
  var last = this.items[key];

  delete this.items[key];

  return last;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/prepend.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/prepend.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function prepend(value, key) {
  if (key !== undefined) {
    return this.put(key, value);
  }

  this.items.unshift(value);

  return this;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/pull.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/pull.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! ../helpers/is */ "./node_modules/collect.js/dist/helpers/is.js"),
    isFunction = _require.isFunction;

module.exports = function pull(key, defaultValue) {
  var returnValue = this.items[key] || null;

  if (!returnValue && defaultValue !== undefined) {
    if (isFunction(defaultValue)) {
      returnValue = defaultValue();
    } else {
      returnValue = defaultValue;
    }
  }

  delete this.items[key];

  return returnValue;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/push.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/push.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function push() {
  var _items;

  (_items = this.items).push.apply(_items, arguments);

  return this;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/put.js":
/*!*****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/put.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function put(key, value) {
  this.items[key] = value;

  return this;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/random.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/random.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var values = __webpack_require__(/*! ../helpers/values */ "./node_modules/collect.js/dist/helpers/values.js");

module.exports = function random() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  var items = values(this.items);

  var collection = new this.constructor(items).shuffle();

  // If not a length was specified
  if (length !== parseInt(length, 10)) {
    return collection.first();
  }

  return collection.take(length);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/reduce.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/reduce.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function reduce(fn, carry) {
  var _this = this;

  var reduceCarry = null;

  if (carry !== undefined) {
    reduceCarry = carry;
  }

  if (Array.isArray(this.items)) {
    this.items.forEach(function (item) {
      reduceCarry = fn(reduceCarry, item);
    });
  } else {
    Object.keys(this.items).forEach(function (key) {
      reduceCarry = fn(reduceCarry, _this.items[key], key);
    });
  }

  return reduceCarry;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/reject.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/reject.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function reject(fn) {
  return new this.constructor(this.items).filter(function (item) {
    return !fn(item);
  });
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/replace.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/replace.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function replace(items) {
  if (!items) {
    return this;
  }

  if (Array.isArray(items)) {
    var _replaced = this.items.map(function (value, index) {
      return items[index] || value;
    });

    return new this.constructor(_replaced);
  }

  if (items.constructor.name === 'Collection') {
    var _replaced2 = Object.assign({}, this.items, items.all());

    return new this.constructor(_replaced2);
  }

  var replaced = Object.assign({}, this.items, items);

  return new this.constructor(replaced);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/replaceRecursive.js":
/*!******************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/replaceRecursive.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function replaceRecursive(items) {
  var replace = function replace(target, source) {
    var replaced = Object.assign({}, target);

    var mergedKeys = Object.keys(Object.assign({}, target, source));

    mergedKeys.forEach(function (key) {
      if (!Array.isArray(source[key]) && _typeof(source[key]) === 'object') {
        replaced[key] = replace(target[key], source[key]);
      } else if (target[key] === undefined && source[key] !== undefined) {
        if (_typeof(target[key]) === 'object') {
          replaced[key] = Object.assign({}, source[key]);
        } else {
          replaced[key] = source[key];
        }
      } else if (target[key] !== undefined && source[key] === undefined) {
        if (_typeof(target[key]) === 'object') {
          replaced[key] = Object.assign({}, target[key]);
        } else {
          replaced[key] = target[key];
        }
      } else if (target[key] !== undefined && source[key] !== undefined) {
        if (_typeof(source[key]) === 'object') {
          replaced[key] = Object.assign({}, source[key]);
        } else {
          replaced[key] = source[key];
        }
      }
    });

    return replaced;
  };

  if (!items) {
    return this;
  }

  if (!Array.isArray(items) && (typeof items === 'undefined' ? 'undefined' : _typeof(items)) !== 'object') {
    return new this.constructor(replace(this.items, [items]));
  }

  if (items.constructor.name === 'Collection') {
    return new this.constructor(replace(this.items, items.all()));
  }

  return new this.constructor(replace(this.items, items));
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/reverse.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/reverse.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function reverse() {
  var collection = [].concat(this.items).reverse();

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/search.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/search.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable eqeqeq */

var _require = __webpack_require__(/*! ../helpers/is */ "./node_modules/collect.js/dist/helpers/is.js"),
    isArray = _require.isArray,
    isObject = _require.isObject,
    isFunction = _require.isFunction;

module.exports = function search(valueOrFunction, strict) {
  var _this = this;

  var result = void 0;

  var find = function find(item, key) {
    if (isFunction(valueOrFunction)) {
      return valueOrFunction(_this.items[key], key);
    }

    if (strict) {
      return _this.items[key] === valueOrFunction;
    }

    return _this.items[key] == valueOrFunction;
  };

  if (isArray(this.items)) {
    result = this.items.findIndex(find);
  } else if (isObject(this.items)) {
    result = Object.keys(this.items).find(function (key) {
      return find(_this.items[key], key);
    });
  }

  if (result === undefined || result < 0) {
    return false;
  }

  return result;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/shift.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/shift.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function shift() {
  if (Array.isArray(this.items) && this.items.length) {
    return this.items.shift();
  }

  if (Object.keys(this.items).length) {
    var key = Object.keys(this.items)[0];
    var value = this.items[key];
    delete this.items[key];

    return value;
  }

  return null;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/shuffle.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/shuffle.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var values = __webpack_require__(/*! ../helpers/values */ "./node_modules/collect.js/dist/helpers/values.js");

module.exports = function shuffle() {
  var items = values(this.items);

  var j = void 0;
  var x = void 0;
  var i = void 0;

  for (i = items.length; i; i -= 1) {
    j = Math.floor(Math.random() * i);
    x = items[i - 1];
    items[i - 1] = items[j];
    items[j] = x;
  }

  this.items = items;

  return this;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/skip.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/skip.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! ../helpers/is */ "./node_modules/collect.js/dist/helpers/is.js"),
    isObject = _require.isObject;

module.exports = function skip(number) {
  var _this = this;

  if (isObject(this.items)) {
    return new this.constructor(Object.keys(this.items).reduce(function (accumulator, key, index) {
      if (index + 1 > number) {
        accumulator[key] = _this.items[key];
      }

      return accumulator;
    }, {}));
  }

  return new this.constructor(this.items.slice(number));
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/skipUntil.js":
/*!***********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/skipUntil.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! ../helpers/is */ "./node_modules/collect.js/dist/helpers/is.js"),
    isArray = _require.isArray,
    isObject = _require.isObject,
    isFunction = _require.isFunction;

module.exports = function skipUntil(valueOrFunction) {
  var _this = this;

  var previous = null;
  var items = void 0;

  var callback = function callback(value) {
    return value === valueOrFunction;
  };
  if (isFunction(valueOrFunction)) {
    callback = valueOrFunction;
  }

  if (isArray(this.items)) {
    items = this.items.filter(function (item) {
      if (previous !== true) {
        previous = callback(item);
      }

      return previous;
    });
  }

  if (isObject(this.items)) {
    items = Object.keys(this.items).reduce(function (acc, key) {
      if (previous !== true) {
        previous = callback(_this.items[key]);
      }

      if (previous !== false) {
        acc[key] = _this.items[key];
      }

      return acc;
    }, {});
  }

  return new this.constructor(items);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/skipWhile.js":
/*!***********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/skipWhile.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! ../helpers/is */ "./node_modules/collect.js/dist/helpers/is.js"),
    isArray = _require.isArray,
    isObject = _require.isObject,
    isFunction = _require.isFunction;

module.exports = function skipWhile(valueOrFunction) {
  var _this = this;

  var previous = null;
  var items = void 0;

  var callback = function callback(value) {
    return value === valueOrFunction;
  };
  if (isFunction(valueOrFunction)) {
    callback = valueOrFunction;
  }

  if (isArray(this.items)) {
    items = this.items.filter(function (item) {
      if (previous !== true) {
        previous = !callback(item);
      }

      return previous;
    });
  }

  if (isObject(this.items)) {
    items = Object.keys(this.items).reduce(function (acc, key) {
      if (previous !== true) {
        previous = !callback(_this.items[key]);
      }

      if (previous !== false) {
        acc[key] = _this.items[key];
      }

      return acc;
    }, {});
  }

  return new this.constructor(items);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/slice.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/slice.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function slice(remove, limit) {
  var collection = this.items.slice(remove);

  if (limit !== undefined) {
    collection = collection.slice(0, limit);
  }

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/some.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/some.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var contains = __webpack_require__(/*! ./contains */ "./node_modules/collect.js/dist/methods/contains.js");

module.exports = contains;

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/sort.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/sort.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function sort(fn) {
  var collection = [].concat(this.items);

  if (fn === undefined) {
    if (this.every(function (item) {
      return typeof item === 'number';
    })) {
      collection.sort(function (a, b) {
        return a - b;
      });
    } else {
      collection.sort();
    }
  } else {
    collection.sort(fn);
  }

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/sortBy.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/sortBy.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var nestedValue = __webpack_require__(/*! ../helpers/nestedValue */ "./node_modules/collect.js/dist/helpers/nestedValue.js");

var _require = __webpack_require__(/*! ../helpers/is */ "./node_modules/collect.js/dist/helpers/is.js"),
    isFunction = _require.isFunction;

module.exports = function sortBy(valueOrFunction) {
  var collection = [].concat(this.items);
  var getValue = function getValue(item) {
    if (isFunction(valueOrFunction)) {
      return valueOrFunction(item);
    }

    return nestedValue(item, valueOrFunction);
  };

  collection.sort(function (a, b) {
    var valueA = getValue(a);
    var valueB = getValue(b);

    if (valueA === null || valueA === undefined) {
      return 1;
    }
    if (valueB === null || valueB === undefined) {
      return -1;
    }

    if (valueA < valueB) {
      return -1;
    }
    if (valueA > valueB) {
      return 1;
    }

    return 0;
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/sortByDesc.js":
/*!************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/sortByDesc.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function sortByDesc(valueOrFunction) {
  return this.sortBy(valueOrFunction).reverse();
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/sortDesc.js":
/*!**********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/sortDesc.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function sortDesc() {
  return this.sort().reverse();
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/sortKeys.js":
/*!**********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/sortKeys.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function sortKeys() {
  var _this = this;

  var ordered = {};

  Object.keys(this.items).sort().forEach(function (key) {
    ordered[key] = _this.items[key];
  });

  return new this.constructor(ordered);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/sortKeysDesc.js":
/*!**************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/sortKeysDesc.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function sortKeysDesc() {
  var _this = this;

  var ordered = {};

  Object.keys(this.items).sort().reverse().forEach(function (key) {
    ordered[key] = _this.items[key];
  });

  return new this.constructor(ordered);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/splice.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/splice.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function splice(index, limit, replace) {
  var slicedCollection = this.slice(index, limit);

  this.items = this.diff(slicedCollection.all()).all();

  if (Array.isArray(replace)) {
    for (var iterator = 0, length = replace.length; iterator < length; iterator += 1) {
      this.items.splice(index + iterator, 0, replace[iterator]);
    }
  }

  return slicedCollection;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/split.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/split.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function split(numberOfGroups) {
  var itemsPerGroup = Math.round(this.items.length / numberOfGroups);

  var items = JSON.parse(JSON.stringify(this.items));
  var collection = [];

  for (var iterator = 0; iterator < numberOfGroups; iterator += 1) {
    collection.push(new this.constructor(items.splice(0, itemsPerGroup)));
  }

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/sum.js":
/*!*****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/sum.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var values = __webpack_require__(/*! ../helpers/values */ "./node_modules/collect.js/dist/helpers/values.js");

var _require = __webpack_require__(/*! ../helpers/is */ "./node_modules/collect.js/dist/helpers/is.js"),
    isFunction = _require.isFunction;

module.exports = function sum(key) {
  var items = values(this.items);

  var total = 0;

  if (key === undefined) {
    for (var i = 0, length = items.length; i < length; i += 1) {
      total += parseFloat(items[i]);
    }
  } else if (isFunction(key)) {
    for (var _i = 0, _length = items.length; _i < _length; _i += 1) {
      total += parseFloat(key(items[_i]));
    }
  } else {
    for (var _i2 = 0, _length2 = items.length; _i2 < _length2; _i2 += 1) {
      total += parseFloat(items[_i2][key]);
    }
  }

  return parseFloat(total.toPrecision(12));
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/symbol.iterator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/symbol.iterator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function SymbolIterator() {
  var _this = this;

  var index = -1;

  return {
    next: function next() {
      index += 1;

      return {
        value: _this.items[index],
        done: index >= _this.items.length
      };
    }
  };
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/take.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/take.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function take(length) {
  var _this = this;

  if (!Array.isArray(this.items) && _typeof(this.items) === 'object') {
    var keys = Object.keys(this.items);
    var slicedKeys = void 0;

    if (length < 0) {
      slicedKeys = keys.slice(length);
    } else {
      slicedKeys = keys.slice(0, length);
    }

    var collection = {};

    keys.forEach(function (prop) {
      if (slicedKeys.indexOf(prop) !== -1) {
        collection[prop] = _this.items[prop];
      }
    });

    return new this.constructor(collection);
  }

  if (length < 0) {
    return new this.constructor(this.items.slice(length));
  }

  return new this.constructor(this.items.slice(0, length));
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/takeUntil.js":
/*!***********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/takeUntil.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! ../helpers/is */ "./node_modules/collect.js/dist/helpers/is.js"),
    isArray = _require.isArray,
    isObject = _require.isObject,
    isFunction = _require.isFunction;

module.exports = function takeUntil(valueOrFunction) {
  var _this = this;

  var previous = null;
  var items = void 0;

  var callback = function callback(value) {
    return value === valueOrFunction;
  };
  if (isFunction(valueOrFunction)) {
    callback = valueOrFunction;
  }

  if (isArray(this.items)) {
    items = this.items.filter(function (item) {
      if (previous !== false) {
        previous = !callback(item);
      }

      return previous;
    });
  }

  if (isObject(this.items)) {
    items = Object.keys(this.items).reduce(function (acc, key) {
      if (previous !== false) {
        previous = !callback(_this.items[key]);
      }

      if (previous !== false) {
        acc[key] = _this.items[key];
      }

      return acc;
    }, {});
  }

  return new this.constructor(items);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/takeWhile.js":
/*!***********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/takeWhile.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! ../helpers/is */ "./node_modules/collect.js/dist/helpers/is.js"),
    isArray = _require.isArray,
    isObject = _require.isObject,
    isFunction = _require.isFunction;

module.exports = function takeWhile(valueOrFunction) {
  var _this = this;

  var previous = null;
  var items = void 0;

  var callback = function callback(value) {
    return value === valueOrFunction;
  };
  if (isFunction(valueOrFunction)) {
    callback = valueOrFunction;
  }

  if (isArray(this.items)) {
    items = this.items.filter(function (item) {
      if (previous !== false) {
        previous = callback(item);
      }

      return previous;
    });
  }

  if (isObject(this.items)) {
    items = Object.keys(this.items).reduce(function (acc, key) {
      if (previous !== false) {
        previous = callback(_this.items[key]);
      }

      if (previous !== false) {
        acc[key] = _this.items[key];
      }

      return acc;
    }, {});
  }

  return new this.constructor(items);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/tap.js":
/*!*****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/tap.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function tap(fn) {
  fn(this);

  return this;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/times.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/times.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function times(n, fn) {
  for (var iterator = 1; iterator <= n; iterator += 1) {
    this.items.push(fn(iterator));
  }

  return this;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/toArray.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/toArray.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function toArray() {
  var collectionInstance = this.constructor;

  function iterate(list, collection) {
    var childCollection = [];

    if (list instanceof collectionInstance) {
      list.items.forEach(function (i) {
        return iterate(i, childCollection);
      });
      collection.push(childCollection);
    } else if (Array.isArray(list)) {
      list.forEach(function (i) {
        return iterate(i, childCollection);
      });
      collection.push(childCollection);
    } else {
      collection.push(list);
    }
  }

  if (Array.isArray(this.items)) {
    var collection = [];

    this.items.forEach(function (items) {
      iterate(items, collection);
    });

    return collection;
  }

  return this.values().all();
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/toJson.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/toJson.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function toJson() {
  if (_typeof(this.items) === 'object' && !Array.isArray(this.items)) {
    return JSON.stringify(this.all());
  }

  return JSON.stringify(this.toArray());
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/transform.js":
/*!***********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/transform.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function transform(fn) {
  var _this = this;

  if (Array.isArray(this.items)) {
    this.items = this.items.map(fn);
  } else {
    var collection = {};

    Object.keys(this.items).forEach(function (key) {
      collection[key] = fn(_this.items[key], key);
    });

    this.items = collection;
  }

  return this;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/union.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/union.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function union(object) {
  var _this = this;

  var collection = JSON.parse(JSON.stringify(this.items));

  Object.keys(object).forEach(function (prop) {
    if (_this.items[prop] === undefined) {
      collection[prop] = object[prop];
    }
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/unique.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/unique.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! ../helpers/is */ "./node_modules/collect.js/dist/helpers/is.js"),
    isFunction = _require.isFunction;

module.exports = function unique(key) {
  var collection = void 0;

  if (key === undefined) {
    collection = this.items.filter(function (element, index, self) {
      return self.indexOf(element) === index;
    });
  } else {
    collection = [];

    var usedKeys = [];

    for (var iterator = 0, length = this.items.length; iterator < length; iterator += 1) {
      var uniqueKey = void 0;
      if (isFunction(key)) {
        uniqueKey = key(this.items[iterator]);
      } else {
        uniqueKey = this.items[iterator][key];
      }

      if (usedKeys.indexOf(uniqueKey) === -1) {
        collection.push(this.items[iterator]);
        usedKeys.push(uniqueKey);
      }
    }
  }

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/unless.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/unless.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function when(value, fn, defaultFn) {
  if (!value) {
    fn(this);
  } else {
    defaultFn(this);
  }
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/unwrap.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/unwrap.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function unwrap(value) {
  if (value instanceof this.constructor) {
    return value.all();
  }

  return value;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/values.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/values.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getValues = __webpack_require__(/*! ../helpers/values */ "./node_modules/collect.js/dist/helpers/values.js");

module.exports = function values() {
  return new this.constructor(getValues(this.items));
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/when.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/when.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function when(value, fn, defaultFn) {
  if (value) {
    return fn(this, value);
  }

  if (defaultFn) {
    return defaultFn(this, value);
  }

  return this;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/whenEmpty.js":
/*!***********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/whenEmpty.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function whenEmpty(fn, defaultFn) {
  if (Array.isArray(this.items) && !this.items.length) {
    return fn(this);
  }if (!Object.keys(this.items).length) {
    return fn(this);
  }

  if (defaultFn !== undefined) {
    if (Array.isArray(this.items) && this.items.length) {
      return defaultFn(this);
    }if (Object.keys(this.items).length) {
      return defaultFn(this);
    }
  }

  return this;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/whenNotEmpty.js":
/*!**************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/whenNotEmpty.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function whenNotEmpty(fn, defaultFn) {
  if (Array.isArray(this.items) && this.items.length) {
    return fn(this);
  }if (Object.keys(this.items).length) {
    return fn(this);
  }

  if (defaultFn !== undefined) {
    if (Array.isArray(this.items) && !this.items.length) {
      return defaultFn(this);
    }if (!Object.keys(this.items).length) {
      return defaultFn(this);
    }
  }

  return this;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/where.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/where.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var values = __webpack_require__(/*! ../helpers/values */ "./node_modules/collect.js/dist/helpers/values.js");
var nestedValue = __webpack_require__(/*! ../helpers/nestedValue */ "./node_modules/collect.js/dist/helpers/nestedValue.js");

module.exports = function where(key, operator, value) {
  var comparisonOperator = operator;
  var comparisonValue = value;

  var items = values(this.items);

  if (operator === undefined || operator === true) {
    return new this.constructor(items.filter(function (item) {
      return nestedValue(item, key);
    }));
  }

  if (operator === false) {
    return new this.constructor(items.filter(function (item) {
      return !nestedValue(item, key);
    }));
  }

  if (value === undefined) {
    comparisonValue = operator;
    comparisonOperator = '===';
  }

  var collection = items.filter(function (item) {
    switch (comparisonOperator) {
      case '==':
        return nestedValue(item, key) === Number(comparisonValue) || nestedValue(item, key) === comparisonValue.toString();

      default:
      case '===':
        return nestedValue(item, key) === comparisonValue;

      case '!=':
      case '<>':
        return nestedValue(item, key) !== Number(comparisonValue) && nestedValue(item, key) !== comparisonValue.toString();

      case '!==':
        return nestedValue(item, key) !== comparisonValue;

      case '<':
        return nestedValue(item, key) < comparisonValue;

      case '<=':
        return nestedValue(item, key) <= comparisonValue;

      case '>':
        return nestedValue(item, key) > comparisonValue;

      case '>=':
        return nestedValue(item, key) >= comparisonValue;
    }
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/whereBetween.js":
/*!**************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/whereBetween.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function whereBetween(key, values) {
  return this.where(key, '>=', values[0]).where(key, '<=', values[values.length - 1]);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/whereIn.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/whereIn.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var extractValues = __webpack_require__(/*! ../helpers/values */ "./node_modules/collect.js/dist/helpers/values.js");
var nestedValue = __webpack_require__(/*! ../helpers/nestedValue */ "./node_modules/collect.js/dist/helpers/nestedValue.js");

module.exports = function whereIn(key, values) {
  var items = extractValues(values);

  var collection = this.items.filter(function (item) {
    return items.indexOf(nestedValue(item, key)) !== -1;
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/whereInstanceOf.js":
/*!*****************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/whereInstanceOf.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function whereInstanceOf(type) {
  return this.filter(function (item) {
    return item instanceof type;
  });
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/whereNotBetween.js":
/*!*****************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/whereNotBetween.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var nestedValue = __webpack_require__(/*! ../helpers/nestedValue */ "./node_modules/collect.js/dist/helpers/nestedValue.js");

module.exports = function whereNotBetween(key, values) {
  return this.filter(function (item) {
    return nestedValue(item, key) < values[0] || nestedValue(item, key) > values[values.length - 1];
  });
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/whereNotIn.js":
/*!************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/whereNotIn.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var extractValues = __webpack_require__(/*! ../helpers/values */ "./node_modules/collect.js/dist/helpers/values.js");
var nestedValue = __webpack_require__(/*! ../helpers/nestedValue */ "./node_modules/collect.js/dist/helpers/nestedValue.js");

module.exports = function whereNotIn(key, values) {
  var items = extractValues(values);

  var collection = this.items.filter(function (item) {
    return items.indexOf(nestedValue(item, key)) === -1;
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/whereNotNull.js":
/*!**************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/whereNotNull.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function whereNotNull() {
  var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  return this.where(key, '!==', null);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/whereNull.js":
/*!***********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/whereNull.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function whereNull() {
  var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  return this.where(key, '===', null);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/wrap.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/wrap.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function wrap(value) {
  if (value instanceof this.constructor) {
    return value;
  }

  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
    return new this.constructor(value);
  }

  return new this.constructor([value]);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/zip.js":
/*!*****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/zip.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function zip(array) {
  var _this = this;

  var values = array;

  if (values instanceof this.constructor) {
    values = values.all();
  }

  var collection = this.items.map(function (item, index) {
    return new _this.constructor([item, values[index]]);
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/app/ext-landing/background.js":
/*!*******************************************!*\
  !*** ./src/app/ext-landing/background.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BackgroundController; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
 //import MainEvent from "@event/main-event.js";
//import AlarmEvent from "@event/alarm-event.js";



function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BackgroundController = /*#__PURE__*/function () {
  function BackgroundController() {// this.mainEvent = new MainEvent();
    // this.alarmEvent = new AlarmEvent();

    _classCallCheck(this, BackgroundController);
  }

  _createClass(BackgroundController, [{
    key: "run",
    value: function () {
      var _run = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var currentTab;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                global.extPageType = 'background'; // this.mainEvent.listener();
                // this.alarmEvent.listener();
                // await Settings.setup();

                _context.next = 3;
                return ChromeServices.tab.currentTab();

              case 3:
                currentTab = _context.sent;
                console.log(currentTab);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function run() {
        return _run.apply(this, arguments);
      }

      return run;
    }()
  }]);

  return BackgroundController;
}();


var controller = new BackgroundController();
controller.run();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/configs/dev.app.js":
/*!********************************!*\
  !*** ./src/configs/dev.app.js ***!
  \********************************/
/*! exports provided: ENV, APP_DEBUG, ADMIN_API_DOMAIN, LSG_REDIRECT, ANALYTICS_ID, ENCRYPTION_KEY_STATUS, ENCRYPTION_KEY, SHOW_LOG_UPDATE_SETTINGS, SHOW_LOG_CHROME_EVENT, WAIT_REDIRECT, PINT_SCROLL_NUMBER, PINT_SCROLL_DELAY, FB_SCROLL_DELAY, FB_SCROLL_NUMBER, FB_GROUP_AUTO_FILL_ANSWERS, OPEN_PROCESSING_TAB, PUBLISH_POST_ON_FB_PAGE_MAX_DAYS, ALARM_PUBLISH_POST_ON_FB_PAGE_TIME, LIMIT_THE_NUMBER_OF_FB_PAGE_POST_PER_DAY, ALARM_AUTO_JOIN_FB_GROUP_PER_TIME, LIMIT_THE_NUMBER_JOIN_FB_GROUP_PER_DAY, ALARM_AUTO_WRITE_TO_FB_GROUP_PER_TIME, LIMIT_THE_NUMBER_WRITE_TO_FB_GROUP_PER_DAY, ALARM_AUTO_GET_FB_POST_LIKE_PER_TIME, LIMIT_THE_NUMBER_LOAD_PAGE_FB_POST_LIKE_PER_TIME, ALARM_AUTO_GET_FB_LIKE_PER_TIME, LIMIT_THE_NUMBER_FB_LIKE_PER_DAY, ALARM_AUTO_GET_FB_POST_LIKE_SEEDING_PER_TIME, ALARM_AUTO_GET_FB_SAVE_POST_SEEDING_PER_TIME, LIMIT_THE_NUMBER_FB_SAVE_POST_PER_DAY, ALARM_AUTO_EXEC_SAVE_FB_POST_SEEDING_PER_TIME, ALARM_AUTO_GET_FB_COMMENT_SEEDING_PER_TIME, LIMIT_THE_NUMBER_FB_COMMENT_PER_DAY, ALARM_AUTO_EXEC_SAVE_FB_COMMENT_SEEDING_PER_TIME, ALARM_AUTO_OPEN_PROCESSING_TAB_PER_TIME, actionTimeAccountOld, SEARCHER, AFFCONFIGS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENV", function() { return ENV; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_DEBUG", function() { return APP_DEBUG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADMIN_API_DOMAIN", function() { return ADMIN_API_DOMAIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LSG_REDIRECT", function() { return LSG_REDIRECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ANALYTICS_ID", function() { return ANALYTICS_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENCRYPTION_KEY_STATUS", function() { return ENCRYPTION_KEY_STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENCRYPTION_KEY", function() { return ENCRYPTION_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHOW_LOG_UPDATE_SETTINGS", function() { return SHOW_LOG_UPDATE_SETTINGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHOW_LOG_CHROME_EVENT", function() { return SHOW_LOG_CHROME_EVENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WAIT_REDIRECT", function() { return WAIT_REDIRECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PINT_SCROLL_NUMBER", function() { return PINT_SCROLL_NUMBER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PINT_SCROLL_DELAY", function() { return PINT_SCROLL_DELAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FB_SCROLL_DELAY", function() { return FB_SCROLL_DELAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FB_SCROLL_NUMBER", function() { return FB_SCROLL_NUMBER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FB_GROUP_AUTO_FILL_ANSWERS", function() { return FB_GROUP_AUTO_FILL_ANSWERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OPEN_PROCESSING_TAB", function() { return OPEN_PROCESSING_TAB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PUBLISH_POST_ON_FB_PAGE_MAX_DAYS", function() { return PUBLISH_POST_ON_FB_PAGE_MAX_DAYS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALARM_PUBLISH_POST_ON_FB_PAGE_TIME", function() { return ALARM_PUBLISH_POST_ON_FB_PAGE_TIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LIMIT_THE_NUMBER_OF_FB_PAGE_POST_PER_DAY", function() { return LIMIT_THE_NUMBER_OF_FB_PAGE_POST_PER_DAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALARM_AUTO_JOIN_FB_GROUP_PER_TIME", function() { return ALARM_AUTO_JOIN_FB_GROUP_PER_TIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LIMIT_THE_NUMBER_JOIN_FB_GROUP_PER_DAY", function() { return LIMIT_THE_NUMBER_JOIN_FB_GROUP_PER_DAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALARM_AUTO_WRITE_TO_FB_GROUP_PER_TIME", function() { return ALARM_AUTO_WRITE_TO_FB_GROUP_PER_TIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LIMIT_THE_NUMBER_WRITE_TO_FB_GROUP_PER_DAY", function() { return LIMIT_THE_NUMBER_WRITE_TO_FB_GROUP_PER_DAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALARM_AUTO_GET_FB_POST_LIKE_PER_TIME", function() { return ALARM_AUTO_GET_FB_POST_LIKE_PER_TIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LIMIT_THE_NUMBER_LOAD_PAGE_FB_POST_LIKE_PER_TIME", function() { return LIMIT_THE_NUMBER_LOAD_PAGE_FB_POST_LIKE_PER_TIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALARM_AUTO_GET_FB_LIKE_PER_TIME", function() { return ALARM_AUTO_GET_FB_LIKE_PER_TIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LIMIT_THE_NUMBER_FB_LIKE_PER_DAY", function() { return LIMIT_THE_NUMBER_FB_LIKE_PER_DAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALARM_AUTO_GET_FB_POST_LIKE_SEEDING_PER_TIME", function() { return ALARM_AUTO_GET_FB_POST_LIKE_SEEDING_PER_TIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALARM_AUTO_GET_FB_SAVE_POST_SEEDING_PER_TIME", function() { return ALARM_AUTO_GET_FB_SAVE_POST_SEEDING_PER_TIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LIMIT_THE_NUMBER_FB_SAVE_POST_PER_DAY", function() { return LIMIT_THE_NUMBER_FB_SAVE_POST_PER_DAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALARM_AUTO_EXEC_SAVE_FB_POST_SEEDING_PER_TIME", function() { return ALARM_AUTO_EXEC_SAVE_FB_POST_SEEDING_PER_TIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALARM_AUTO_GET_FB_COMMENT_SEEDING_PER_TIME", function() { return ALARM_AUTO_GET_FB_COMMENT_SEEDING_PER_TIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LIMIT_THE_NUMBER_FB_COMMENT_PER_DAY", function() { return LIMIT_THE_NUMBER_FB_COMMENT_PER_DAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALARM_AUTO_EXEC_SAVE_FB_COMMENT_SEEDING_PER_TIME", function() { return ALARM_AUTO_EXEC_SAVE_FB_COMMENT_SEEDING_PER_TIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALARM_AUTO_OPEN_PROCESSING_TAB_PER_TIME", function() { return ALARM_AUTO_OPEN_PROCESSING_TAB_PER_TIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actionTimeAccountOld", function() { return actionTimeAccountOld; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SEARCHER", function() { return SEARCHER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AFFCONFIGS", function() { return AFFCONFIGS; });
//tên môi trường
var ENV = 'dev';
var APP_DEBUG = true; // Môi trường dev

var ADMIN_API_DOMAIN = 'https://admin.namk.name.vn/myadmin/api/';
var LSG_REDIRECT = 'https://namdaik.github.io/redirect';
var ANALYTICS_ID = 'UA-135121873-18';
var ENCRYPTION_KEY_STATUS = true;
var ENCRYPTION_KEY = 'bÉỞuẺỦỀWỉ[%ẲỨLẻQCÝắÌễÔE8-wẨnỳổỸvƯGẩử}]ẤP*Ỷứ1#ỬzỐằỘÓẴóểừ>ÀẵờệẰỎ@ẮjỈXdgỂrầẫ7lưếạTmỊ9õẦýọĂồđẬf;ỮỪáoởăÒỌĐỢỴi{.a(ảUÕãÚFYÂỜ?yỒÙĨộJỹ&tZẪpÃŨỷơVhú:ỠqẶẼ|eẽỡ)ủì`ớ2ặécẹụƠẾI~AỔậíựSÍOỄỰà,ỆÁòM^4ẸũèỏấêNBữẠỵẢốxkÈ$RD_5ịs!+ợKôùỗĩâỖ6ẳ30Ớ=ỤÊ<ềHỲ'; // Hiển thị log setting được cập nhật

var SHOW_LOG_UPDATE_SETTINGS = false;
var SHOW_LOG_CHROME_EVENT = false; // chứa những biến dễ thay đổi

var WAIT_REDIRECT = 0; //số lần scroll trang pinterest để lấy ảnh

var PINT_SCROLL_NUMBER = 1; // thời gian chờ sau mỗi lần scroll

var PINT_SCROLL_DELAY = 1000; // thời gian chờ sau mỗi lần scroll

var FB_SCROLL_DELAY = 2000;
var FB_SCROLL_NUMBER = 2; // tự động trả lời câu khỏi khi join group

var FB_GROUP_AUTO_FILL_ANSWERS = true; //mở processing tab

var OPEN_PROCESSING_TAB = true; // giới hạn đăng bài viết trước lên fb-page số ngày

var PUBLISH_POST_ON_FB_PAGE_MAX_DAYS = 7; //Hẹn giờ đăng bài viết lên fb-page sau mỗi phút

var ALARM_PUBLISH_POST_ON_FB_PAGE_TIME = 1 * 60 * 1000; //Giới hạn số bài đăng vào FB-Page mỗi ngày

var LIMIT_THE_NUMBER_OF_FB_PAGE_POST_PER_DAY = 1; //Hẹn giờ tham gia một nhóm sau mỗi phút

var ALARM_AUTO_JOIN_FB_GROUP_PER_TIME = 5 * 60 * 1000; //Giới hạn số lần join group mỗi ngày

var LIMIT_THE_NUMBER_JOIN_FB_GROUP_PER_DAY = 1; //Hẹn giờ đăng bài vào nhóm sau mỗi phút

var ALARM_AUTO_WRITE_TO_FB_GROUP_PER_TIME = 5 * 60 * 1000; //Giới hạn số bài đăng vào FB-Page mỗi ngày

var LIMIT_THE_NUMBER_WRITE_TO_FB_GROUP_PER_DAY = 1; //Hẹn giờ lấy post fb-like sau mỗi phút

var ALARM_AUTO_GET_FB_POST_LIKE_PER_TIME = 5 * 60 * 1000; //giới hạn số lần load trang [xem tin khác]

var LIMIT_THE_NUMBER_LOAD_PAGE_FB_POST_LIKE_PER_TIME = 3; //Hẹn giờ like fb-post sau mỗi phút

var ALARM_AUTO_GET_FB_LIKE_PER_TIME = 0.2 * 60 * 1000; //Giới hạn số like mỗi ngày

var LIMIT_THE_NUMBER_FB_LIKE_PER_DAY = 1500; //Hẹn giờ lấy job fb-like seeding sau mỗi phút

var ALARM_AUTO_GET_FB_POST_LIKE_SEEDING_PER_TIME = 0.5 * 60 * 1000; //////////////////fbsave
//Hẹn giờ lấy job fb-post_save seeding sau mỗi phút

var ALARM_AUTO_GET_FB_SAVE_POST_SEEDING_PER_TIME = 0.5 * 60 * 1000; //Giới hạn số FbSavePost mỗi ngày

var LIMIT_THE_NUMBER_FB_SAVE_POST_PER_DAY = 1000; //Hẹn giờ thực hiện save post fb sau mỗi phút

var ALARM_AUTO_EXEC_SAVE_FB_POST_SEEDING_PER_TIME = 0.5 * 60 * 1000; //////////////////fbComment
//Hẹn giờ lấy job fb-comment seeding sau mỗi phút

var ALARM_AUTO_GET_FB_COMMENT_SEEDING_PER_TIME = 0.5 * 60 * 1000; //Giới hạn số FbSavePost mỗi ngày

var LIMIT_THE_NUMBER_FB_COMMENT_PER_DAY = 1000; //Hẹn giờ thực hiện fb comment sau mỗi phút

var ALARM_AUTO_EXEC_SAVE_FB_COMMENT_SEEDING_PER_TIME = 0.5 * 60 * 1000; //Hẹn giờ kiểm tra Processing tab

var ALARM_AUTO_OPEN_PROCESSING_TAB_PER_TIME = 1 * 60 * 1000;
var actionTimeAccountOld = {
  //Hẹn giờ đăng bài viết lên page sau mỗi phút
  "ALARM_PUBLISH_POST_ON_FB_PAGE_TIME": 5 * 60 * 1000,
  //Giới hạn số bài đăng vào FB-Page mỗi ngày
  "LIMIT_THE_NUMBER_OF_FB_PAGE_POST_PER_DAY": 1,
  //Hẹn giờ tham gia một nhóm sau mỗi phút
  "ALARM_AUTO_JOIN_FB_GROUP_PER_TIME": 5 * 60 * 1000,
  //Giới hạn số lần join group mỗi ngày
  "LIMIT_THE_NUMBER_JOIN_FB_GROUP_PER_DAY": 5,
  ////////////////////fbGroup
  //Hẹn giờ đăng bài vào nhóm sau mỗi phút
  "ALARM_AUTO_WRITE_TO_FB_GROUP_PER_TIME": 5 * 60 * 1000,
  //Giới hạn số bài đăng vào FB-Group mỗi ngày
  "LIMIT_THE_NUMBER_WRITE_TO_FB_GROUP_PER_DAY": 20,
  ////////////////////fblike
  //Hẹn giờ lấy post fb-like sau mỗi phút
  "ALARM_AUTO_GET_FB_POST_LIKE_PER_TIME": 10 * 60 * 1000,
  //giới hạn số lần load trang [xem tin khác]
  "LIMIT_THE_NUMBER_LOAD_PAGE_FB_POST_LIKE_PER_TIME": 3,
  //Hẹn giờ like fb-post sau mỗi phút
  "ALARM_AUTO_GET_FB_LIKE_PER_TIME": 2 * 60 * 1000,
  //Giới hạn số like mỗi ngày
  "LIMIT_THE_NUMBER_FB_LIKE_PER_DAY": 600,
  //Hẹn giờ lấy job fb-like seeding sau mỗi phút
  "ALARM_AUTO_GET_FB_POST_LIKE_SEEDING_PER_TIME": 15 * 60 * 1000,
  //////////////////fbsave
  //Hẹn giờ lấy job fb-post_save seeding sau mỗi phút
  "ALARM_AUTO_GET_FB_SAVE_POST_SEEDING_PER_TIME": 15 * 60 * 1000,
  //Giới hạn số FbSavePost mỗi ngày
  "LIMIT_THE_NUMBER_FB_SAVE_POST_PER_DAY": 100,
  //Hẹn giờ thực hiện save post fb sau mỗi phút
  "ALARM_AUTO_EXEC_SAVE_FB_POST_SEEDING_PER_TIME": 5 * 60 * 1000,
  //////////////////fbComment
  //Hẹn giờ lấy job fb-comment seeding sau mỗi phút
  "ALARM_AUTO_GET_FB_COMMENT_SEEDING_PER_TIME": 15 * 60 * 1000,
  //Giới hạn số fb comment mỗi ngày
  "LIMIT_THE_NUMBER_FB_COMMENT_PER_DAY": 1000,
  //Hẹn giờ thực hiện fb comment sau mỗi phút
  "ALARM_AUTO_EXEC_SAVE_FB_COMMENT_SEEDING_PER_TIME": 3 * 60 * 1000,
  //Hẹn giờ lấy job fbClickLink seeding sau mỗi phút
  "ALARM_AUTO_GET_FB_CLICK_LINK_SEEDING_PER_TIME": 15 * 60 * 1000,
  //Giới hạn số fbClickLink mỗi ngày
  "LIMIT_THE_NUMBER_FB_CLICK_LINK_PER_DAY": 1000,
  //Hẹn giờ thực hiện fbClickLink sau mỗi phút
  "ALARM_AUTO_EXEC_FB_CLICK_LINK_SEEDING_PER_TIME": 3 * 60 * 1000,
  //Hẹn giờ kiểm tra Processing tab
  "ALARM_AUTO_OPEN_PROCESSING_TAB_PER_TIME": 1 * 60 * 1000
};
var SEARCHER = {
  apiDomain: 'https://api.namdaik.com/f/',
  numberPageClicked: 3,
  numberGgPageMax: 4,
  lengthRelatedKeyword: 3,
  timeOnPageClicked: 10000,
  timeOnGgPage: 8000
}; // affConfig

var AFFCONFIGS = {
  clickAffEveryDay: 3
};

/***/ }),

/***/ "./src/const/all.js":
/*!**************************!*\
  !*** ./src/const/all.js ***!
  \**************************/
/*! exports provided: FB_API_URL, FB_WAP, PINT_IMG_DEFAULT_PATH, actionTimeAccountNew */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FB_API_URL", function() { return FB_API_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FB_WAP", function() { return FB_WAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PINT_IMG_DEFAULT_PATH", function() { return PINT_IMG_DEFAULT_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actionTimeAccountNew", function() { return actionTimeAccountNew; });
// let config =  {
// };
// config.fbApiUrl = "https://graph.facebook.com/";
// chứa những biến ít thay đổi
var FB_API_URL = "https://graph.facebook.com/";
var FB_WAP = 'https://d.facebook.com';
var PINT_IMG_DEFAULT_PATH = "https://i.pinimg.com/originals/";
var actionTimeAccountNew = {
  //Hẹn giờ đăng bài viết lên page sau mỗi phút
  "ALARM_PUBLISH_POST_ON_FB_PAGE_TIME": 10 * 60 * 1000,
  //Giới hạn số bài đăng vào FB-Page mỗi ngày
  "LIMIT_THE_NUMBER_OF_FB_PAGE_POST_PER_DAY": 1,
  //Hẹn giờ tham gia một nhóm sau mỗi phút
  "ALARM_AUTO_JOIN_FB_GROUP_PER_TIME": 10 * 60 * 1000,
  //Giới hạn số lần join group mỗi ngày
  "LIMIT_THE_NUMBER_JOIN_FB_GROUP_PER_DAY": 2,
  ////////////////////fbGroup
  //Hẹn giờ đăng bài vào nhóm sau mỗi phút
  "ALARM_AUTO_WRITE_TO_FB_GROUP_PER_TIME": 10 * 60 * 1000,
  //Giới hạn số bài đăng vào FB-Page mỗi ngày
  "LIMIT_THE_NUMBER_WRITE_TO_FB_GROUP_PER_DAY": 3,
  ////////////////////fblike
  //Hẹn giờ lấy post fb-like sau mỗi phút
  "ALARM_AUTO_GET_FB_POST_LIKE_PER_TIME": 10 * 60 * 1000,
  //giới hạn số lần load trang [xem tin khác]
  "LIMIT_THE_NUMBER_LOAD_PAGE_FB_POST_LIKE_PER_TIME": 3,
  //Hẹn giờ like fb-post sau mỗi phút
  "ALARM_AUTO_GET_FB_LIKE_PER_TIME": 5 * 60 * 1000,
  //Giới hạn số like mỗi ngày
  "LIMIT_THE_NUMBER_FB_LIKE_PER_DAY": 20,
  //Hẹn giờ lấy job fb-like seeding sau mỗi phút
  "ALARM_AUTO_GET_FB_POST_LIKE_SEEDING_PER_TIME": 10 * 60 * 1000,
  //////////////////fbsave
  //Hẹn giờ lấy job fb-post_save seeding sau mỗi phút
  "ALARM_AUTO_GET_FB_SAVE_POST_SEEDING_PER_TIME": 30 * 60 * 1000,
  //Giới hạn số FbSavePost mỗi ngày
  "LIMIT_THE_NUMBER_FB_SAVE_POST_PER_DAY": 5,
  //Hẹn giờ thực hiện save post fb sau mỗi phút
  "ALARM_AUTO_EXEC_SAVE_FB_POST_SEEDING_PER_TIME": 10 * 60 * 1000,
  //////////////////fbComment
  //Hẹn giờ lấy job fb-comment seeding sau mỗi phút
  "ALARM_AUTO_GET_FB_COMMENT_SEEDING_PER_TIME": 10 * 60 * 1000,
  //Giới hạn số FbSavePost mỗi ngày
  "LIMIT_THE_NUMBER_FB_COMMENT_PER_DAY": 10,
  //Hẹn giờ thực hiện fb comment sau mỗi phút
  "ALARM_AUTO_EXEC_SAVE_FB_COMMENT_SEEDING_PER_TIME": 10 * 60 * 1000,
  //Hẹn giờ lấy job fbClickLink seeding sau mỗi phút
  "ALARM_AUTO_GET_FB_CLICK_LINK_SEEDING_PER_TIME": 20 * 60 * 1000,
  //Giới hạn số fbClickLink mỗi ngày
  "LIMIT_THE_NUMBER_FB_CLICK_LINK_PER_DAY": 10,
  //Hẹn giờ thực hiện fbClickLink sau mỗi phút
  "ALARM_AUTO_EXEC_FB_CLICK_LINK_SEEDING_PER_TIME": 10 * 60 * 1000,
  //Hẹn giờ kiểm tra Processing tab
  "ALARM_AUTO_OPEN_PROCESSING_TAB_PER_TIME": 1 * 60 * 1000
};

/***/ }),

/***/ "./src/exceptions/api-error.js":
/*!*************************************!*\
  !*** ./src/exceptions/api-error.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ApiError; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ApiError = /*#__PURE__*/function () {
  function ApiError(err, request) {
    _classCallCheck(this, ApiError);

    this.error = err;
    this.request = request;
  } ///log console


  _createClass(ApiError, [{
    key: "log",
    value: function log() {
      logInfo(this.info());
    }
  }, {
    key: "info",
    value: function info() {
      return {
        status: 'error',
        message: 'Request faild',
        error_name: 'request-faild',
        code: this.error.response.status,
        data: {
          error: this.error.response,
          request: this.request
        }
      };
    } //save log to db

  }, {
    key: "saveLog",
    value: function saveLog() {
      AppLog.create(this.info());
    }
  }, {
    key: "throwInfo",
    value: function throwInfo() {
      throw this.info();
    }
  }]);

  return ApiError;
}();



/***/ }),

/***/ "./src/helpers/global-array.js":
/*!*************************************!*\
  !*** ./src/helpers/global-array.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Object.defineProperty(Array.prototype, 'random', {
  value: function value() {
    var random = this[Math.floor(Math.random() * this.length)];

    if (!random) {
      random = this[Math.floor(Math.random() * this.length)];
    }

    return random;
  },
  configurable: true
});
Object.defineProperty(Array.prototype, 'shuffle', {
  configurable: true,
  value: function value() {
    var array1 = this;
    var currentIndex = array1.length,
        temporaryValue,
        randomIndex; // While there remain elements to shuffle...

    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1; // And swap it with the current element.

      temporaryValue = array1[currentIndex];
      array1[currentIndex] = array1[randomIndex];
      array1[randomIndex] = temporaryValue;
    }

    return array1;
  }
});
Object.defineProperty(Array.prototype, 'filterEmpty', {
  configurable: true,
  value: function value() {
    return this.filter(function (e) {
      return e;
    });
  }
});

/***/ }),

/***/ "./src/helpers/global-date.js":
/*!************************************!*\
  !*** ./src/helpers/global-date.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Object.defineProperty(Date.prototype, 'addDays', {
  value: function value() {
    var days = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    this.setDate(this.getDate() + days);
    return this;
  },
  configurable: true
});
Object.defineProperty(Date.prototype, 'subDays', {
  value: function value() {
    var days = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    this.setDate(this.getDate() - days);
    return this;
  },
  configurable: true
}); //lấy năm tháng giò phút giây

Object.defineProperty(Date.prototype, 'getFullDateTime', {
  value: function value() {
    // lỗi định dạng ngày giờ sai
    if (isNaN(this.getTime())) {
      throw Error("invalid date");
    }

    return this.getFullDate() + " " + this.getFullTime();
  },
  configurable: true
}); //lấy năm tháng giò phút giây

Object.defineProperty(Date.prototype, 'getFullDate', {
  value: function value() {
    // lỗi định dạng ngày giờ sai
    if (isNaN(this.getTime())) {
      throw Error("invalid date");
    }

    var year = this.getFullYear();
    var month = this.getMonth() + 1;
    var today = this.getDate();
    var dateText = year + '-' + addZero(month) + '-' + addZero(today);
    return dateText;
  },
  configurable: true
}); //lấy năm tháng giò phút giây

Object.defineProperty(Date.prototype, 'getFullTime', {
  value: function value() {
    // lỗi định dạng ngày giờ sai
    if (isNaN(this.getTime())) {
      throw Error("invalid date");
    }

    var hour = this.getHours();
    var minute = this.getMinutes();
    var second = this.getSeconds();
    var time = addZero(hour) + ':' + addZero(minute) + ':' + addZero(second);
    return time;
  },
  configurable: true
});
Object.defineProperty(Date.prototype, 'getRoundTime', {
  value: function value() {
    return Math.round(this.getTime() / 1000);
  },
  configurable: true
}); //trừ date trả về số ngày

Object.defineProperty(Date.prototype, 'subDate', {
  value: function value(dateSubs) {
    if (isNaN(this.getTime())) {
      throw Error("invalid date");
    }

    var _MS_PER_DAY = 1000 * 60 * 60 * 24; // Discard the time and time-zone information.


    var utc1 = Date.UTC(this.getFullYear(), this.getMonth(), this.getDate());
    var utc2 = Date.UTC(dateSubs.getFullYear(), dateSubs.getMonth(), dateSubs.getDate());
    return Math.floor((utc1 - utc2) / _MS_PER_DAY);
  },
  configurable: true
});

/***/ }),

/***/ "./src/helpers/global-number.js":
/*!**************************************!*\
  !*** ./src/helpers/global-number.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Object.defineProperty(Number.prototype, 'toDays', {
  value: function value() {
    return Math.ceil(this / (1000 * 60 * 60 * 24));
  },
  configurable: true
});
Object.defineProperty(Number.prototype, 'toHours', {
  value: function value() {
    return Math.ceil(this / (1000 * 60 * 60));
  },
  configurable: true
});
Object.defineProperty(Number.prototype, 'toMinutes', {
  value: function value() {
    return Math.ceil(this / (1000 * 60));
  },
  configurable: true
});
Object.defineProperty(Number.prototype, 'toSeconds', {
  value: function value() {
    return Math.ceil(this / 1000);
  },
  configurable: true
});

/***/ }),

/***/ "./src/helpers/global-string.js":
/*!**************************************!*\
  !*** ./src/helpers/global-string.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Object.defineProperty(String.prototype, 'isEmpty', {
  value: function value() {
    return this.length === 0 || !this.trim();
  },
  configurable: true
});
Object.defineProperty(String.prototype, 'toInt', {
  value: function value() {
    return parseInt(this);
  },
  configurable: true
});
Object.defineProperty(String.prototype, 'subBetween', {
  value: function value(strStart, strEnd) {
    var startIndex = this.indexOf(strStart) + strStart.length;
    var endIndex = this.indexOf(strEnd) - startIndex;
    return this.substr(startIndex, endIndex);
  },
  configurable: true
});
Object.defineProperty(String.prototype, 'subLastToEnd', {
  value: function value(strEnd) {
    var subStart = this.lastIndexOf(strEnd) + strEnd.length;
    return this.slice(subStart);
  },
  configurable: true
});
Object.defineProperty(String.prototype, 'isNotEmpty', {
  value: function value() {
    return !this.isEmpty();
  },
  configurable: true
});
Object.defineProperty(String.prototype, 'isBlank', {
  value: function value() {
    return this.length === 0 || !this.trim();
  },
  configurable: true
});
Object.defineProperty(String.prototype, 'basename', {
  value: function value() {
    var ext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var name = this.split('/').reverse()[0];
    return name.slice(0, name.length - ext.length);
  },
  configurable: true
});
Object.defineProperty(String.prototype, 'wordCount', {
  value: function value() {
    var matches = this.match(/\S+/g);
    return matches ? matches.length : 0;
  },
  configurable: true
}); //Viết hoa chữ cái đầu

Object.defineProperty(String.prototype, 'capitalize', {
  value: function value() {
    if (this.isEmpty()) {
      return '';
    }

    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  configurable: true
});
Object.defineProperty(String.prototype, 'isURL', {
  value: function validURL() {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

    return !!pattern.test(this);
  },
  configurable: true
});
Object.defineProperty(String.prototype, 'clearVn', {
  value: function validURL() {
    var replacedBy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var str = this.replace(/[^\wàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]/gi, replacedBy);
    return str.replace(/\s+/g, ' ').trim();
  },
  configurable: true
});
Object.defineProperty(String.prototype, 'renderKeywords', {
  value: function validURL() {
    var wordLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;
    var words = this.clearVn(' ').split(' ');
    var arrayKeys = [];
    countWords = words.length - wordLength;

    if (countWords < 1) {
      return words;
    }

    for (i = 0; i < countWords; i++) {
      var wordIndex = '';

      for (j = 0; j < wordLength; j++) {
        wordIndex += ' ' + words[i + j];
      }

      arrayKeys.push(wordIndex.trim());
    }

    return arrayKeys;
  },
  configurable: true
});
Object.defineProperty(String.prototype, 'clearUrl', {
  value: function clearUrl() {
    var url = new URL(this);
    return url.origin + url.pathname;
  },
  configurable: true
});
Object.defineProperty(String.prototype, 'clearHttp', {
  value: function clearHttp() {
    console.log(this);
    var url = new URL(this); // fragment locator

    return url.host + url.pathname;
  },
  configurable: true
});
Object.defineProperty(String.prototype, 'trimChar', {
  configurable: true,
  value: function trimChar(charToRemove) {
    var str = this;

    while (str.charAt(0) == charToRemove) {
      str = str.substring(1);
    }

    while (str.charAt(str.length - 1) == charToRemove) {
      str = str.substring(0, str.length - 1);
    }

    return str.toString();
  }
});
Object.defineProperty(String.prototype, 'toJson', {
  configurable: true,
  value: function trimChar() {
    return JSON.parse(this);
  }
});
Object.defineProperty(String.prototype, 'isEmail', {
  configurable: true,
  value: function value() {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this);
  }
});

/***/ }),

/***/ "./src/helpers/global.js":
/*!*******************************!*\
  !*** ./src/helpers/global.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _configs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @configs */ "./src/configs/dev.app.js");
/* harmony import */ var _const_all__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @const/all */ "./src/const/all.js");
/* harmony import */ var _helpers_request__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @helpers/request */ "./src/helpers/request.js");
/* harmony import */ var _chrome_services_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @chrome/services.js */ "./src/modules/chrome/services.js");
/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @helpers/helpers */ "./src/helpers/helpers.js");
/* harmony import */ var _models_settings_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @models/settings.js */ "./src/models/settings.js");
/* harmony import */ var _models_app_log_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @models/app-log.js */ "./src/models/app-log.js");
/* harmony import */ var _common_my_codding__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @common/my-codding */ "./src/modules/common/my-codding.js");
/* harmony import */ var _admin_api_my_api_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @admin/api/my-api.js */ "./src/modules/admin/api/my-api.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }










var collect = __webpack_require__(/*! collect.js */ "./node_modules/collect.js/dist/index.js");

var globalString = __webpack_require__(/*! @helpers/global-string */ "./src/helpers/global-string.js");

var globalArray = __webpack_require__(/*! @helpers/global-array */ "./src/helpers/global-array.js");

var globalDate = __webpack_require__(/*! @helpers/global-date */ "./src/helpers/global-date.js");

var globalNumber = __webpack_require__(/*! @helpers/global-number */ "./src/helpers/global-number.js");


global.AppConfigs = _configs__WEBPACK_IMPORTED_MODULE_1__;
global.AppConst = _const_all__WEBPACK_IMPORTED_MODULE_2__;
global.myCodding = new _common_my_codding__WEBPACK_IMPORTED_MODULE_8__["default"]();
global.AppRequest = new _helpers_request__WEBPACK_IMPORTED_MODULE_3__["default"]();
global.AppHelpers = new _helpers_helpers__WEBPACK_IMPORTED_MODULE_5__["default"]();
global.ChromeServices = new _chrome_services_js__WEBPACK_IMPORTED_MODULE_4__["default"]();
global.MyApi = new _admin_api_my_api_js__WEBPACK_IMPORTED_MODULE_9__["default"]();
global.Settings = new _models_settings_js__WEBPACK_IMPORTED_MODULE_6__["default"]();
global.AppLog = new _models_app_log_js__WEBPACK_IMPORTED_MODULE_7__["default"](); // hàm log cho app;

global.logInfo = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  logColor('Green', args);
};

global.logDanger = function () {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  console.error(args);
  logColor('Red', args);
};

global.logWarning = function () {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  logColor('yellow', args);
};

global.logColor = function (color, args) {
  if (_configs__WEBPACK_IMPORTED_MODULE_1__["ENV"] === 'produce') {
    return;
  }

  var date = new Date();
  var time = '%c' + date.getFullTime() + " " + date.getMilliseconds();

  if (typeof args[0] === 'string') {
    console.log(time + ' %c' + args[0], 'color:gray;', 'color:' + color + ';');
    args.shift();
  } else {
    console.log(time, 'color:gray');
  }

  args.forEach(function (item, i) {
    console.log(item);
  });
};

global.newException = function () {
  var _console;

  for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  (_console = console).error.apply(_console, args);

  throw new Error(args.toString());
};

global.appRedirect = function () {
  window.location.replace(arguments.length <= 0 ? undefined : arguments[0]);
};

global.appReload = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
  var time,
      _args = arguments;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          time = _args.length > 0 && _args[0] !== undefined ? _args[0] : null;
          time = time === null ? _configs__WEBPACK_IMPORTED_MODULE_1__["WAIT_REDIRECT"] : time;
          _context.next = 4;
          return appDelay(time);

        case 4:
          location.reload();

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

global.appDelay = function (time) {
  var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  logInfo("waiting: " + time);
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(func());
    }, time);
  });
};

global.isset = function (item) {
  try {
    if (item === undefined || item === null) {
      return false;
    }

    return true;
  } catch (e) {
    return false;
  }
};

global.issetKey = function (item, key) {
  try {
    return item[key] !== undefined;
    ;
  } catch (e) {
    return false;
  }
}; //lấy giá trị của biến với key


global.getValueOfKey = function (item, key) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  try {
    var _item$key;

    return (_item$key = item[key]) !== null && _item$key !== void 0 ? _item$key : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

global.isEmpty = function (item) {
  if (!isset(item)) {
    return true;
  }

  return item.isEmpty();
};

global.isNotEmpty = function (item) {
  return !isEmpty(item);
}; // hàm gọi mutiple kế thừa


global.Classes = function (bases) {
  var Bases = function Bases() {
    var _this = this;

    _classCallCheck(this, Bases);

    bases.forEach(function (base) {
      return Object.assign(_this, new base());
    });
  };

  bases.forEach(function (base) {
    Object.getOwnPropertyNames(base.prototype).filter(function (prop) {
      return prop != 'constructor';
    }).forEach(function (prop) {
      return Bases.prototype[prop] = base.prototype[prop];
    });
  });
  return Bases;
}; // thêm số 0 đằng trước


global.addZero = function (your_number) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var num = '' + your_number;

  while (num.length < length) {
    num = '0' + num;
  }

  return num;
}; // thêm số 0 đằng trước


global.toClone = function (obj) {
  return Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);
};

global.newCollect = function (col) {
  return new collect(col.toArray());
};

global.now = function () {
  return new Date();
};

global.urlClear = function () {
  return location.protocol + '//' + location.host + location.pathname;
};

global.domainName = function () {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (!url) {
    url = document.URL;
  }

  return new URL(url).hostname;
};

global.isObject = function (variable) {
  return _typeof(variable) === 'object' && variable !== null;
};

global.intRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

global.extPageType = null;
global.extensionUrl = chrome.runtime.getURL;
Object.defineProperty(Object.prototype, 'toClone', {
  value: function value() {
    return _objectSpread({}, this);
  },
  configurable: true
});
Object.defineProperty(Object.prototype, 'toArray', {
  value: function value() {
    var arr = [];

    for (var key in this) {
      if (this.hasOwnProperty(key)) {
        arr.push(this[key]);
      }
    }

    return arr;
  },
  configurable: true
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/helpers/helpers.js":
/*!********************************!*\
  !*** ./src/helpers/helpers.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Helpers = /*#__PURE__*/function () {
  function Helpers() {
    _classCallCheck(this, Helpers);
  }

  _createClass(Helpers, [{
    key: "intRandom",
    value: function intRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }]);

  return Helpers;
}();

/* harmony default export */ __webpack_exports__["default"] = (Helpers);

/***/ }),

/***/ "./src/helpers/request.js":
/*!********************************!*\
  !*** ./src/helpers/request.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Request; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _const_all__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @const/all */ "./src/const/all.js");
/* harmony import */ var _exceptions_api_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../exceptions/api-error */ "./src/exceptions/api-error.js");
/* harmony import */ var _common_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @common/auth */ "./src/modules/common/auth.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");





var Request = /*#__PURE__*/function () {
  function Request() {
    var _this$fbRequestHeader;

    _classCallCheck(this, Request);

    this.fbRequestHeaders = {
      "access-control-allow-origin": '*',
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/x-www-form-urlencoded",
      "Access-Control-Expose-Headers": "Content-Length" // "sec-fetch-dest": "empty",
      // "sec-fetch-mode": "cors",
      // "sec-fetch-site": "same-origin",
      // "origin": "https://www.facebook.com",
      // "referer": "https://www.facebook.com"

    }, this.fbRequestHeaders2 = (_this$fbRequestHeader = {
      //"access-control-allow-origin": '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': 'Content-Length',
      'Access-Control-Expose-Headers': 'Content-Length',
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/x-www-form-urlencoded"
    }, _defineProperty(_this$fbRequestHeader, "Access-Control-Expose-Headers", "Content-Length"), _defineProperty(_this$fbRequestHeader, "sec-fetch-dest", "document"), _defineProperty(_this$fbRequestHeader, "sec-fetch-mode", "navigate"), _defineProperty(_this$fbRequestHeader, "sec-fetch-site", "same-origin"), _defineProperty(_this$fbRequestHeader, 'sec-fetch-user', '?1'), _defineProperty(_this$fbRequestHeader, 'upgrade-insecure-requests', '1'), _defineProperty(_this$fbRequestHeader, "origin", AppConst.FB_WAP), _defineProperty(_this$fbRequestHeader, "cookie", "sb=0TjKX2SrmFTTIrjEe2Bh_w4u; datr=0TjKX4Pv67sOab4fmSmGqQGi; c_user=100010200977046; spin=r.1003169591_b.trunk_t.1610156749_s.1_v.2_; m_pixel_ratio=1; wd=1349x625; xs=13%3AEOt1sMUz3WSNxA%3A2%3A1609942456%3A5520%3A3903%3A%3AAcWrXc4SpCErVlO4I4wQMhAQbnFHtw5fFgxQ0QnE4A; fr=0PvRMuomGSCwZSsDT.AWXVnUJp-7IZmKjTqHcWBORyeu4.BexUG6.xW.F_5.0.0.Bf-atM"), _defineProperty(_this$fbRequestHeader, "referer", AppConst.FB_WAP + "/group/leave/?group_id=1571811716451056&refid=18"), _defineProperty(_this$fbRequestHeader, 'user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'), _this$fbRequestHeader);
  }

  _createClass(Request, [{
    key: "xmlHttp",
    value: function xmlHttp() {
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          // Typical action to be performed when the document is ready:
          console.log(xhttp);
        }
      };

      xhttp.open("POST", AppConst.FB_WAP + "/a/group/join/?group_id=1571811716451056&gfid=AQAu0HAspmPElxNiyjg&refid=18", true);
      xhttp.setRequestHeader("origin", AppConst.FB_WAP);
      xhttp.setRequestHeader("Access-Control-Allow-Origin", '*');
      xhttp.send();
    }
  }, {
    key: "send",
    value: function send(request) {
      return axios(request)["catch"](function (errorRequest) {
        logInfo('Error Request:', errorRequest.response);
        var apiError = null;

        if (extPageType !== 'client') {
          logWarning('tạo lỗi request cho trường hợp client');
        } else {
          apiError = new _exceptions_api_error__WEBPACK_IMPORTED_MODULE_2__["default"](errorRequest, request);
          apiError.log();
          apiError.saveLog();
        }

        if (AppConfigs.APP_DEBUG === true) {
          alert('Lỗi Request');
          apiError.throwInfo();
          return;
        }

        if (errorRequest.response && errorRequest.response.status === 401 || request.url.lastIndexOf('https://graph.facebook.com') > -1) {
          if (extPageType === 'client') {
            ChromeServices.logout();
            return;
          } else {
            var auth = new _common_auth__WEBPACK_IMPORTED_MODULE_3__["default"]();
            auth.logout();
          }
        }

        if (apiError) {
          apiError.throwInfo();
        }
      });
    }
  }, {
    key: "getUrlParam",
    value: function getUrlParam() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var requestData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!requestData.headers) {
        requestData.headers = {};
      } // requestData.headers["access-control-allow-origin"] = "*";
      // requestData.headers["access-control-allow-credentials"] = true;
      // requestData.headers["access-control-allow-headers"] = "origin, x-requested-with, content-type";
      // requestData.headers["access-control-allow-methods"] = "PUT, GET, POST, DELETE, OPTIONS";


      requestData.method = "GET";
      requestData.url = url;
      return this.send(requestData);
    }
  }, {
    key: "postUrlParam",
    value: function postUrlParam() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var requestData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!requestData.headers) {
        requestData.headers = {};
      } // requestData.headers["access-control-allow-origin"] = "*";
      // requestData.headers["access-control-allow-credentials"] = true;
      // requestData.headers["access-control-allow-headers"] = "origin, x-requested-with, content-type";
      // requestData.headers["access-control-allow-methods"] = "PUT, GET, POST, DELETE, OPTIONS";


      requestData.method = "POST";
      requestData.url = url;
      return this.send(requestData);
    }
  }, {
    key: "getFbUrlParam",
    value: function getFbUrlParam() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.send({
        headers: this.fbRequestHeaders,
        referrer: "https://www.facebook.com/",
        referrerPolicy: "strict-origin-when-cross-origin",
        method: "GET",
        url: url,
        params: params,
        mode: "cors",
        credentials: "include",
        data: {}
      });
    }
  }, {
    key: "postFbUrlParam",
    value: function postFbUrlParam() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.send({
        headers: this.fbRequestHeaders2,
        referrer: AppConst.FB_WAP + "/",
        //referrerPolicy: "strict-origin-when-cross-origin",
        method: "POST",
        url: url,
        params: params,
        //mode: "cors",
        credentials: true,
        withCredentials: true,
        data: {}
      });
    }
  }, {
    key: "get",
    value: function get() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.send({
        method: "GET",
        url: path,
        params: params,
        data: {}
      });
    }
  }, {
    key: "get404",
    value: function get404() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      try {
        return this.send({
          method: "GET",
          url: path,
          params: params,
          data: {}
        });
      } catch (e) {}
    }
  }, {
    key: "getFbApi",
    value: function getFbApi() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.getFbUrlParam(_const_all__WEBPACK_IMPORTED_MODULE_1__["FB_API_URL"] + path, params);
    }
  }, {
    key: "postFbApi",
    value: function postFbApi() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.postFbUrlParam(_const_all__WEBPACK_IMPORTED_MODULE_1__["FB_API_URL"] + path, params);
    }
  }, {
    key: "checkUrlExists",
    value: function () {
      var _checkUrlExists = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(url) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", axios.get(url).then(function () {
                  return true;
                })["catch"](function (error) {
                  return false;
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function checkUrlExists(_x) {
        return _checkUrlExists.apply(this, arguments);
      }

      return checkUrlExists;
    }()
  }]);

  return Request;
}();



/***/ }),

/***/ "./src/helpers/storage.js":
/*!********************************!*\
  !*** ./src/helpers/storage.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var storage = {};

storage.show = function () {
  return new Promise(function (resolve, reject) {
    chrome.storage.local.get(null, function (result) {
      var resultDecryp = {};

      for (var variable in result) {
        if (result.hasOwnProperty(variable)) {
          var key = myCodding.decryp(variable);
          var value = myCodding.decryp(result[variable]);
          resultDecryp[key] = value;
        }
      }

      resolve(resultDecryp);
    });
  });
};

storage.setItem = function (itemName, value) {
  var func = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (result) {
    return result;
  };
  return new Promise(function (resolve, reject) {
    var valueDecryp = myCodding.encryp(value);
    itemName = myCodding.encryp(itemName);
    chrome.storage.local.set(_defineProperty({}, itemName, valueDecryp), function (result) {
      result = myCodding.decryp(result);
      resolve(func(result));
    });
  });
};

storage.getItem = function (itemName) {
  var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (getValue) {
    return getValue;
  };
  itemName = myCodding.encryp(itemName);
  return new Promise(function (resolve, reject) {
    chrome.storage.local.get([itemName], function (result) {
      var resultDec = myCodding.decryp(result[itemName]);
      resolve(func(resultDec));
    });
  });
};

storage.addOrUpdateItem = function (key, value) {
  var keyValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return storage.getItem(keyEncryp).then(function (listItems) {
    if (_typeof(value) !== 'object') {
      if (_typeof(listItems) === 'object') {
        if (!listItems.includes(value)) {
          listItems.push(value);
        }
      } else {
        listItems = [value];
      }
    } else {
      if (_typeof(listItems) === 'object') {
        if (keyValue !== null) {
          listItems[keyValue] = value;
        } else {
          listItems.push(value);
        }
      } else {
        if (keyValue !== null) {
          listItems = _defineProperty({}, keyValue, value);
        } else {
          listItems = [value];
        }
      }
    }

    myCodding.decryp(listItems);
    return storage.setItem(key, listItems);
  });
};

storage.getItemValue = function (key, keyValue) {
  var valueOfKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return storage.getItem(key).then( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(listItems) {
      var result;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(_typeof(listItems) !== 'object')) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              if (!(valueOfKey === null)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", listItems[keyValue]);

            case 6:
              listItems.forEach(function (item) {
                if (item[keyValue] === valueOfKey) {
                  result = item;
                  return item;
                }
              });
              return _context.abrupt("return", result);

            case 8:
              return _context.abrupt("return");

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
}; //trường hợp 1
//xóa một item với dạng {abv = [keyValue1, keyValue1]}
//xóa keyValue1 sẽ là storage.deleteItem(abv,keyValue1)
////trường hợp 2
//xóa một item với dạng {abv = [{keyValue1 : valueOfKey1}, {keyValue2 : valueOfKey2}]}
//xóa keyValue1 sẽ là storage.deleteItem(abv,keyValue1, valueOfKey1);


storage.deleteItem = function (key, keyValue) {
  var valueOfKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return storage.getItem(key).then(function (listItems) {
    if (_typeof(listItems) !== 'object') {
      console.log('warning');
      return true;
    }

    var resultItems;

    if (valueOfKey === null) {
      resultItems = listItems.filter(function (item) {
        return item !== keyValue;
      });
    } else {
      resultItems = listItems.filter(function (item) {
        return item[keyValue] !== valueOfKey;
      });
    }

    return storage.setItem(key, resultItems);
  });
};

storage.setStorage = function () {
  var setDb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var resultEncryp = {};

  for (var variable in setDb) {
    if (setDb.hasOwnProperty(variable)) {
      var key = myCodding.encryp(variable);
      var value = myCodding.encryp(setDb[variable]);
      resultEncryp[key] = value;
    }
  }

  return new Promise(function (resolve, reject) {
    chrome.storage.local.set(resultEncryp, function (result) {
      resolve(result);
    });
  });
};

storage.truncateObject = function (name) {
  return storage.setItem(name, []);
};

storage.clear = function () {
  chrome.storage.local.clear(function () {
    var error = chrome.runtime.lastError;

    if (error) {
      logDanger(error);
    } // do something more

  });
};

/* harmony default export */ __webpack_exports__["default"] = (storage);

/***/ }),

/***/ "./src/models/app-log.js":
/*!*******************************!*\
  !*** ./src/models/app-log.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AppLogModel; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_base_model_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @models/base-model.js */ "./src/models/base-model.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var AppLogModel = /*#__PURE__*/function (_BaseModel) {
  _inherits(AppLogModel, _BaseModel);

  var _super = _createSuper(AppLogModel);

  function AppLogModel() {
    var _this;

    _classCallCheck(this, AppLogModel);

    _this = _super.call(this); //tên bảng đặt theo số nhiều

    _this.objectName = 'app-logs'; // cột hiển thị cho client

    _this.publicCols = ['id', 'message', 'status', 'time']; //this.apiModelPath = 'groupKey';
    //this.apiModelPath = 'fbGroupKeyword';

    return _this;
  }

  _createClass(AppLogModel, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(data) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                data.id = this.randomId();
                data.time = now().getFullDateTime();
                return _context.abrupt("return", _get(_getPrototypeOf(AppLogModel.prototype), "create", this).call(this, data));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function create(_x) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "createMulti",
    value: function () {
      var _createMulti = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(data) {
        var _this2 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                data.map(function (item) {
                  item.id = _this2.randomId();
                  return item;
                });
                return _context2.abrupt("return", _get(_getPrototypeOf(AppLogModel.prototype), "createMulti", this).call(this, data));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createMulti(_x2) {
        return _createMulti.apply(this, arguments);
      }

      return createMulti;
    }()
  }]);

  return AppLogModel;
}(_models_base_model_js__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ }),

/***/ "./src/models/base-model.js":
/*!**********************************!*\
  !*** ./src/models/base-model.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @helpers/storage */ "./src/helpers/storage.js");


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var collect = __webpack_require__(/*! collect.js */ "./node_modules/collect.js/dist/index.js");

var BaseModel = /*#__PURE__*/function () {
  function BaseModel() {
    _classCallCheck(this, BaseModel);

    this.primaryKey = 'id'; //tên bảng đặt theo số nhiều

    this.objectName = ''; // tên cột cách nhau bằng dấu _

    this.publicCols = [];
    this.privateCols = [];
    this.myApi = global.MyApi; // tên api của model vi du fbAccount

    this.apiModelPath = false;
    this.storage = _helpers_storage__WEBPACK_IMPORTED_MODULE_1__["default"];
    this.defaultCols = {};
    this.markeRandomId = false;
  }

  _createClass(BaseModel, [{
    key: "api",
    value: function api() {
      return this.myApi[this.apiModelPath];
    }
  }, {
    key: "addOrUpdate",
    value: function () {
      var _addOrUpdate = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function addOrUpdate() {
        return _addOrUpdate.apply(this, arguments);
      }

      return addOrUpdate;
    }() //save vào storage

  }, {
    key: "save",
    value: function () {
      var _save = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(data) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", _helpers_storage__WEBPACK_IMPORTED_MODULE_1__["default"].addOrUpdateItem(this.objectName, data));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function save(_x) {
        return _save.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: "getFromStorage",
    value: function getFromStorage() {
      return _helpers_storage__WEBPACK_IMPORTED_MODULE_1__["default"].getItem(this.objectName);
    } //lấy ra tất cả. và sử dụng thư viện collect

  }, {
    key: "all",
    value: function () {
      var _all = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var _this = this;

        var data;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.getFromStorage();

              case 3:
                data = _context3.sent;

                if (data && this.defaultCols) {
                  data.map(function (item) {
                    for (var key in _this.defaultCols) {
                      if (_this.defaultCols.hasOwnProperty(key) && !issetKey(item, key)) {
                        item[key] = _this.defaultCols[key];
                      }
                    }
                  });
                }

                return _context3.abrupt("return", collect(data));

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);
                logInfo(_context3.t0);
                return _context3.abrupt("return", collect([]));

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 8]]);
      }));

      function all() {
        return _all.apply(this, arguments);
      }

      return all;
    }()
  }, {
    key: "showSyncToApi",
    value: function () {
      var _showSyncToApi = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(id) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (this.apiModelPath) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return");

              case 2:
                return _context4.abrupt("return", this.api().show(id));

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function showSyncToApi(_x2) {
        return _showSyncToApi.apply(this, arguments);
      }

      return showSyncToApi;
    }() //tạo lên server và local

  }, {
    key: "createSync",
    value: function () {
      var _createSync = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(data) {
        var resutApi;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.createSyncToApi(data);

              case 2:
                resutApi = _context5.sent;

                if (!(resutApi.data.length === 0)) {
                  _context5.next = 6;
                  break;
                }

                logInfo('Api không có item nào để insert vào:' + this.objectName);
                return _context5.abrupt("return");

              case 6:
                _context5.next = 8;
                return this.createOrUpdate({
                  'id': resutApi.data.id
                }, resutApi.data);

              case 8:
                return _context5.abrupt("return", _context5.sent);

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function createSync(_x3) {
        return _createSync.apply(this, arguments);
      }

      return createSync;
    }() //tạo trên server

  }, {
    key: "createSyncToApi",
    value: function () {
      var _createSyncToApi = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6(data) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (this.apiModelPath) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return");

              case 2:
                return _context6.abrupt("return", this.api().store(data));

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function createSyncToApi(_x4) {
        return _createSyncToApi.apply(this, arguments);
      }

      return createSyncToApi;
    }() //tạo Multi trên server

  }, {
    key: "createMultiSyncToApi",
    value: function () {
      var _createMultiSyncToApi = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee7(data) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (this.apiModelPath) {
                  _context7.next = 2;
                  break;
                }

                return _context7.abrupt("return");

              case 2:
                return _context7.abrupt("return", this.api().storeMulti(data));

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function createMultiSyncToApi(_x5) {
        return _createMultiSyncToApi.apply(this, arguments);
      }

      return createMultiSyncToApi;
    }() //tạo trên dblocal

  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee8(data) {
        var allData;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (this.markeRandomId && !isset(data, 'id')) {
                  data.id = this.randomId();
                } //lấy tất cả


                _context8.next = 3;
                return this.all();

              case 3:
                allData = _context8.sent;
                // thêm vào collect
                allData.push(data); // save lại

                logInfo('created: ', data, allData);
                _context8.next = 8;
                return this.saveStorage(allData.toArray());

              case 8:
                return _context8.abrupt("return", data);

              case 9:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function create(_x6) {
        return _create.apply(this, arguments);
      }

      return create;
    }() //tạo Multi lên server và local

  }, {
    key: "createMultiSync",
    value: function () {
      var _createMultiSync = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee9(dataItems) {
        var resutApi, apiItems, resutl, i, created;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.createMultiSyncToApi(dataItems);

              case 2:
                resutApi = _context9.sent;
                apiItems = resutApi.data;
                resutl = [];
                i = 0;

              case 6:
                if (!(i < apiItems.length)) {
                  _context9.next = 14;
                  break;
                }

                _context9.next = 9;
                return this.createOrUpdate({
                  'id': apiItems[i].id
                }, apiItems[i]);

              case 9:
                created = _context9.sent;
                resutl.push(created);

              case 11:
                i++;
                _context9.next = 6;
                break;

              case 14:
                return _context9.abrupt("return", resutl);

              case 15:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function createMultiSync(_x7) {
        return _createMultiSync.apply(this, arguments);
      }

      return createMultiSync;
    }()
  }, {
    key: "createMulti",
    value: function () {
      var _createMulti = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee10(data) {
        var allData;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (this.markeRandomId && !isset(data, 'id')) {
                  data.id = this.randomId();
                } //lấy tất cả


                _context10.next = 3;
                return this.all();

              case 3:
                allData = _context10.sent;
                // thêm vào collect
                allData = allData.toArray();
                allData = [].concat(_toConsumableArray(allData), _toConsumableArray(data)); // save lại

                logInfo('created: ', data, allData);
                return _context10.abrupt("return", this.saveStorage(allData));

              case 8:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function createMulti(_x8) {
        return _createMulti.apply(this, arguments);
      }

      return createMulti;
    }()
  }, {
    key: "createOrUpdate",
    value: function () {
      var _createOrUpdate = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee11(condition, data) {
        var allData, search, columnName;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return this.all();

              case 2:
                allData = _context11.sent;
                search = allData; //tìm kiếm

                for (columnName in condition) {
                  search = search.where(columnName, condition[columnName]);
                } // nếu không tìm thấy tạo


                if (!search.isEmpty()) {
                  _context11.next = 13;
                  break;
                }

                if (this.markeRandomId && !issetKey(data, 'id')) {
                  data.id = this.randomId();
                }

                logInfo('Create Item: ', data);
                allData.push(data); // save lại

                _context11.next = 11;
                return this.saveStorage(allData.toArray());

              case 11:
                _context11.next = 15;
                break;

              case 13:
                _context11.next = 15;
                return this.update(condition, data);

              case 15:
                return _context11.abrupt("return", data);

              case 16:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function createOrUpdate(_x9, _x10) {
        return _createOrUpdate.apply(this, arguments);
      }

      return createOrUpdate;
    }()
  }, {
    key: "updateSync",
    value: function () {
      var _updateSync = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee12(id, data) {
        var resutApi;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this.updateSyncToApi(id, data);

              case 2:
                resutApi = _context12.sent;
                return _context12.abrupt("return", this.update({
                  'id': resutApi.data.id
                }, resutApi.data));

              case 4:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function updateSync(_x11, _x12) {
        return _updateSync.apply(this, arguments);
      }

      return updateSync;
    }()
  }, {
    key: "updateSyncToApi",
    value: function () {
      var _updateSyncToApi = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee13(id, data) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                if (this.apiModelPath) {
                  _context13.next = 2;
                  break;
                }

                return _context13.abrupt("return");

              case 2:
                return _context13.abrupt("return", this.api().update(id, data));

              case 3:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function updateSyncToApi(_x13, _x14) {
        return _updateSyncToApi.apply(this, arguments);
      }

      return updateSyncToApi;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee14(condition, dataUpdate) {
        var allData, dataUpdated;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return this.all();

              case 2:
                allData = _context14.sent;
                dataUpdated = allData.map(function (item) {
                  //nếu không thỏa mãn trả về luôn
                  for (var columnName in condition) {
                    if (item[columnName] !== condition[columnName]) {
                      return item;
                    }
                  } // nếu thỏa mãn update item


                  for (var _columnName in dataUpdate) {
                    item[_columnName] = dataUpdate[_columnName];
                  }

                  logInfo('udpate Item: ', dataUpdate);
                  return item;
                }); // save lại

                return _context14.abrupt("return", this.saveStorage(dataUpdated.toArray()));

              case 5:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function update(_x15, _x16) {
        return _update.apply(this, arguments);
      }

      return update;
    }() //gán trực tiếp dữ liệu vào storage
    // data chính là toàn bộ dữ liệu của bảng(model)

  }, {
    key: "saveStorage",
    value: function saveStorage(data) {
      return _helpers_storage__WEBPACK_IMPORTED_MODULE_1__["default"].setItem(this.objectName, data);
    }
  }, {
    key: "deleteSyncToApi",
    value: function () {
      var _deleteSyncToApi = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee15(id) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                if (this.apiModelPath) {
                  _context15.next = 2;
                  break;
                }

                return _context15.abrupt("return");

              case 2:
                return _context15.abrupt("return", this.api()["delete"](id));

              case 3:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function deleteSyncToApi(_x17) {
        return _deleteSyncToApi.apply(this, arguments);
      }

      return deleteSyncToApi;
    }()
  }, {
    key: "listSyncFromApi",
    value: function () {
      var _listSyncFromApi = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee16(id) {
        var resutl, nextPageNumber, apiResutl, nextPageUrl, url;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                if (this.apiModelPath) {
                  _context16.next = 2;
                  break;
                }

                return _context16.abrupt("return");

              case 2:
                resutl = null;
                nextPageNumber = null;

              case 4:
                _context16.next = 6;
                return this.api().list(nextPageNumber);

              case 6:
                apiResutl = _context16.sent;
                nextPageNumber = 1;
                nextPageUrl = apiResutl.data.next_page_url;

                if (nextPageUrl) {
                  url = new URL(nextPageUrl);
                  nextPageNumber = url.searchParams.get("page");
                }

                _context16.next = 12;
                return this.createMulti(apiResutl.data.data);

              case 12:
                if (nextPageNumber > 1) {
                  _context16.next = 4;
                  break;
                }

              case 13:
                return _context16.abrupt("return");

              case 14:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function listSyncFromApi(_x18) {
        return _listSyncFromApi.apply(this, arguments);
      }

      return listSyncFromApi;
    }()
  }, {
    key: "deleteItem",
    value: function deleteItem(id) {
      logInfo('deleted:', id, _typeof(id));
      return _helpers_storage__WEBPACK_IMPORTED_MODULE_1__["default"].deleteItem(this.objectName, this.primaryKey, id);
    }
  }, {
    key: "deleteCols",
    value: function deleteCols(cols) {
      var ids = cols.pluck('id');
      return this.deleteAll(ids);
    }
  }, {
    key: "deleteAll",
    value: function () {
      var _deleteAll = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee17(ids) {
        var allItem, lastItem;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return this.all();

              case 2:
                allItem = _context17.sent;
                lastItem = allItem.whereNotIn('id', ids);
                return _context17.abrupt("return", this.saveStorage(lastItem.toArray()));

              case 5:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function deleteAll(_x19) {
        return _deleteAll.apply(this, arguments);
      }

      return deleteAll;
    }() //xóa dữ liệu bảng

  }, {
    key: "truncate",
    value: function truncate() {
      return _helpers_storage__WEBPACK_IMPORTED_MODULE_1__["default"].truncateObject(this.objectName);
    } // nơi viết các hàm hỗ trợ

  }, {
    key: "randomId",
    value: function randomId() {
      var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 99999;
      return AppHelpers.intRandom(min, max);
    }
  }, {
    key: "getCols",
    value: function getCols() {
      return this.publicCols;
    } /// nơi viết các hàm select
    //select các item với cột là public

  }, {
    key: "selectPublic",
    value: function selectPublic(rows) {
      if (AppConfigs.APP_DEBUG) {
        return this.select(this.publicCols.concat(this.privateCols), rows);
      }

      return this.select(this.publicCols, rows);
    } //select và xắp sếp theo mảng columns chuyền vào

  }, {
    key: "select",
    value: function select(columns, paramItems) {
      var list = paramItems;
      return list.map(function (item, index) {
        var object = {};
        columns.forEach(function (col, i) {
          object[col] = item[col];
        });
        return object;
      });
    }
  }, {
    key: "findById",
    value: function () {
      var _findById = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee18(id) {
        var list;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return this.all();

              case 2:
                list = _context18.sent;
                return _context18.abrupt("return", list.where('id', parseInt(id)));

              case 4:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function findById(_x20) {
        return _findById.apply(this, arguments);
      }

      return findById;
    }()
  }, {
    key: "firstById",
    value: function () {
      var _firstById = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee19(id) {
        var list;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.next = 2;
                return this.all();

              case 2:
                list = _context19.sent;
                return _context19.abrupt("return", list.where('id', parseInt(id)).first());

              case 4:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function firstById(_x21) {
        return _firstById.apply(this, arguments);
      }

      return firstById;
    }()
  }]);

  return BaseModel;
}();

/* harmony default export */ __webpack_exports__["default"] = (BaseModel);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/models/fb-account-page.js":
/*!***************************************!*\
  !*** ./src/models/fb-account-page.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FbAccountPage; });
/* harmony import */ var _models_base_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @models/base-model.js */ "./src/models/base-model.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var FbAccountPage = /*#__PURE__*/function (_BaseModel) {
  _inherits(FbAccountPage, _BaseModel);

  var _super = _createSuper(FbAccountPage);

  function FbAccountPage() {
    var _this;

    _classCallCheck(this, FbAccountPage);

    _this = _super.call(this);
    _this.objectName = 'fb_account_pages';
    _this.publicCols = ['id', 'page_id', 'name', 'category'];
    _this.apiModelPath = 'fbAccountPage';
    return _this;
  }

  return FbAccountPage;
}(_models_base_model_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/models/setting-action-date.js":
/*!*******************************************!*\
  !*** ./src/models/setting-action-date.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_base_model_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @models/base-model.js */ "./src/models/base-model.js");
/* harmony import */ var _models_trigger_action_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @models/trigger-action.js */ "./src/models/trigger-action.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var SettingActionDate = /*#__PURE__*/function (_BaseModel) {
  _inherits(SettingActionDate, _BaseModel);

  var _super = _createSuper(SettingActionDate);

  function SettingActionDate() {
    _classCallCheck(this, SettingActionDate);

    return _super.call(this);
  }

  _createClass(SettingActionDate, [{
    key: "getAll",
    value: function getAll() {
      var currentDate = new Date().getFullDate(); //lấy giá trị action_date

      var data = getValueOfKey(Settings.getData(), 'action_date'); //lấy giá trị của ngày hôm nay

      return getValueOfKey(data, currentDate);
    }
  }, {
    key: "getKey",
    value: function getKey(key) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var allData = this.getAll(); //lấy key

      return getValueOfKey(allData, key, defaultValue);
    } //lấy thông tin số các hành động trong ngày

  }, {
    key: "getFbPageCountPosted",
    value: function getFbPageCountPosted(pageId) {
      var key = 'post_number_of_fb_page_' + pageId; // mặc định là 0

      return this.getKey(key, 0);
    } //số lần join group trong ngày

  }, {
    key: "getFbGroupCountJoin",
    value: function getFbGroupCountJoin() {
      return this.getKey('fb_group_count_join');
    } //số lần đã like trong ngày

  }, {
    key: "getFbLiked",
    value: function getFbLiked() {
      return this.getKey('fb_liked');
    } //số lần save fbpost trong ngày

  }, {
    key: "getFbSavePost",
    value: function getFbSavePost() {
      return this.getKey('fb_save_post');
    } //số lần fbComment trong ngày

  }, {
    key: "getFbCommented",
    value: function getFbCommented() {
      return this.getKey('fb_commented');
    }
  }, {
    key: "getFbClickLinkCount",
    value: function getFbClickLinkCount() {
      return this.getKey('fb_click_link_count');
    } // get danh sách id group đã đăng trong ngày

  }, {
    key: "getListFbGroupPosted",
    value: function getListFbGroupPosted() {
      return this.getKey('fb_groups_posted', []);
    } // get danh sách id group đã đăng trong ngày

  }, {
    key: "getFbPostShareIds",
    value: function getFbPostShareIds() {
      return this.getKey('fb_post_share_ids', []);
    } //cập nhật số bài viết đã đăng lên pageID trong 1 ngày

  }, {
    key: "updateFbPagePost",
    value: function () {
      var _updateFbPagePost = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(pageId, number) {
        var key;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                key = 'post_number_of_fb_page_' + pageId;
                _context.next = 3;
                return this.updateActionDate(_defineProperty({}, key, number));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function updateFbPagePost(_x, _x2) {
        return _updateFbPagePost.apply(this, arguments);
      }

      return updateFbPagePost;
    }() //cập nhật PostShare đã đăng trong ngày hôm nay

  }, {
    key: "updateFbPostShareId",
    value: function () {
      var _updateFbPostShareId = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(postId) {
        var lastIds, currentIds;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                lastIds = this.getFbPostShareIds();
                currentIds = lastIds.push(postId);
                _context2.next = 4;
                return this.updateActionDate('fb_post_share_ids', currentIds);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function updateFbPostShareId(_x3) {
        return _updateFbPostShareId.apply(this, arguments);
      }

      return updateFbPostShareId;
    }() //cập nhật số bài viết đã đăng lên GroupId trong 1 ngày

  }, {
    key: "updateFbGroupPostImcrement",
    value: function () {
      var _updateFbGroupPostImcrement = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(groupId) {
        var key;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                key = 'post_number_of_fb_group_' + groupId;
                _context3.next = 3;
                return this.updateImcrementKey(key);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function updateFbGroupPostImcrement(_x4) {
        return _updateFbGroupPostImcrement.apply(this, arguments);
      }

      return updateFbGroupPostImcrement;
    }() //cập nhật số nhóm đã tham gia lên 1

  }, {
    key: "updateImcrementFbGroupJoin",
    value: function () {
      var _updateImcrementFbGroupJoin = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4() {
        var key;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                key = 'fb_group_count_join';
                _context4.next = 3;
                return this.updateImcrementKey(key);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function updateImcrementFbGroupJoin() {
        return _updateImcrementFbGroupJoin.apply(this, arguments);
      }

      return updateImcrementFbGroupJoin;
    }() //cập nhật số nhóm đã tham gia lên 1

  }, {
    key: "updateImcrementFbGroupJoin",
    value: function () {
      var _updateImcrementFbGroupJoin2 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5() {
        var key;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                key = 'fb_group_count_join';
                _context5.next = 3;
                return this.updateImcrementKey(key);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function updateImcrementFbGroupJoin() {
        return _updateImcrementFbGroupJoin2.apply(this, arguments);
      }

      return updateImcrementFbGroupJoin;
    }() // thêm id của 1 group vào danh sách những Group đã đăng

  }, {
    key: "updateListFbGroupPosted",
    value: function () {
      var _updateListFbGroupPosted = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6(groupId) {
        var key;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                key = 'fb_groups_posted';
                _context6.next = 3;
                return this.updateAddItemInKey(key, groupId);

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function updateListFbGroupPosted(_x5) {
        return _updateListFbGroupPosted.apply(this, arguments);
      }

      return updateListFbGroupPosted;
    }() // tăng số like

  }, {
    key: "updateFbLiked",
    value: function () {
      var _updateFbLiked = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee7(amount) {
        var key;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                key = 'fb_liked';
                _context7.next = 3;
                return this.updateImcrementKey(key, amount);

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function updateFbLiked(_x6) {
        return _updateFbLiked.apply(this, arguments);
      }

      return updateFbLiked;
    }() // cập nhật số lượt fb save post

  }, {
    key: "updateFbSavePost",
    value: function () {
      var _updateFbSavePost = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee8(amount) {
        var key;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                key = 'fb_save_post';
                _context8.next = 3;
                return this.updateImcrementKey(key, amount);

              case 3:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function updateFbSavePost(_x7) {
        return _updateFbSavePost.apply(this, arguments);
      }

      return updateFbSavePost;
    }() // cập nhật số lượt fb comment

  }, {
    key: "updateFbCommented",
    value: function () {
      var _updateFbCommented = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee9(amount) {
        var key;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                key = 'fb_commented';
                _context9.next = 3;
                return this.updateImcrementKey(key, amount);

              case 3:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function updateFbCommented(_x8) {
        return _updateFbCommented.apply(this, arguments);
      }

      return updateFbCommented;
    }() //Tăng giá trị của actionDate[key nào đó] lên

  }, {
    key: "updateImcrementKey",
    value: function () {
      var _updateImcrementKey = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee10(key) {
        var _this$getKey;

        var amount,
            count,
            _args10 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                amount = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : 1;
                count = (_this$getKey = this.getKey(key)) !== null && _this$getKey !== void 0 ? _this$getKey : 0;
                _context10.next = 4;
                return this.updateActionDate(_defineProperty({}, key, count + amount));

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function updateImcrementKey(_x9) {
        return _updateImcrementKey.apply(this, arguments);
      }

      return updateImcrementKey;
    }() //Thêm một item vào danh danh sách actionDate[key nào đó]

  }, {
    key: "updateAddItemInKey",
    value: function () {
      var _updateAddItemInKey = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee11(key, valueAdd) {
        var listItem;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                listItem = this.getKey(key, []);
                listItem.push(valueAdd);
                _context11.next = 4;
                return this.updateActionDate(_defineProperty({}, key, listItem));

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function updateAddItemInKey(_x10, _x11) {
        return _updateAddItemInKey.apply(this, arguments);
      }

      return updateAddItemInKey;
    }() //cập nhật thông tin số các hành động trong ngày

  }, {
    key: "updateActionDate",
    value: function () {
      var _updateActionDate = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee12(item) {
        var currentDate, fullAction;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                currentDate = new Date().getFullDate(); //lấy ra tất cả các action

                fullAction = this.getAll(); // thực hiện merge

                fullAction = _objectSpread(_objectSpread({}, fullAction), item);
                _context12.next = 5;
                return Settings.update({
                  action_date: _defineProperty({}, currentDate, fullAction)
                });

              case 5:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function updateActionDate(_x12) {
        return _updateActionDate.apply(this, arguments);
      }

      return updateActionDate;
    }()
  }]);

  return SettingActionDate;
}(_models_base_model_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (SettingActionDate);

/***/ }),

/***/ "./src/models/settings.js":
/*!********************************!*\
  !*** ./src/models/settings.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @helpers/storage */ "./src/helpers/storage.js");
/* harmony import */ var _models_base_model_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @models/base-model.js */ "./src/models/base-model.js");
/* harmony import */ var _models_trigger_action_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @models/trigger-action.js */ "./src/models/trigger-action.js");
/* harmony import */ var _models_setting_action_date_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @models/setting-action-date.js */ "./src/models/setting-action-date.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var collect = __webpack_require__(/*! collect.js */ "./node_modules/collect.js/dist/index.js");






var Settings = /*#__PURE__*/function (_BaseModel) {
  _inherits(Settings, _BaseModel);

  var _super = _createSuper(Settings);

  function Settings() {
    var _this;

    _classCallCheck(this, Settings);

    _this = _super.call(this);
    _this.objectName = 'settings'; //tabId là id của tab sẽ chạy hành động
    //name là tên của hành động
    //step: bước cần thực hiện trong hành động(hành động có thể gồm nhiều bước);
    //data là param của hành động hoặc step
    ////time là thời gian cụ thể để hành động được thực hiện

    _this.publicCols = ['id', 'role_id', 'name', 'email', 'avatar', 'username', 'password', 'token'];
    _this.triggerAction = new _models_trigger_action_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
    _this.actionDate = new _models_setting_action_date_js__WEBPACK_IMPORTED_MODULE_4__["default"]();
    _this.apiModelPath = 'userSetting';
    return _this;
  }

  _createClass(Settings, [{
    key: "getValue",
    value: function getValue(key) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      //getValueOfKey là hàm global
      //giúp lấy giá trị của key không bị lỗi undefined
      //data[key]
      return getValueOfKey(this.getData(), key, defaultValue);
    }
  }, {
    key: "getUser",
    value: function getUser(key) {
      //getValueOfKey là hàm global
      //giúp lấy giá trị của key không bị lỗi undefined
      //data[key]
      var data = getValueOfKey(this.getData(), 'user_info');
      return getValueOfKey(data, key, data);
    }
  }, {
    key: "getFb",
    value: function getFb(key) {
      var data = getValueOfKey(this.getData(), 'fb_info');
      return getValueOfKey(data, key, data);
    }
  }, {
    key: "getTriggerAction",
    value: function getTriggerAction() {
      var data = getValueOfKey(this.getData(), 'trigger_actions');
      return data;
    }
  }, {
    key: "getMySettings",
    value: function getMySettings() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var data = getValueOfKey(this.getData(), 'my_settings', {});

      if (!key) {
        return data;
      }

      return getValueOfKey(data, key);
    }
  }, {
    key: "getListDomain",
    value: function getListDomain() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var data = getValueOfKey(this.getData(), 'list_domains', {});

      if (!key) {
        return data;
      }

      return getValueOfKey(data, key);
    }
  }, {
    key: "getActionTimeType",
    value: function getActionTimeType() {
      return getValueOfKey(this.getData(), 'actionTimeType', 'actionTimeAccountNew');
    }
  }, {
    key: "getProcessingTabId",
    value: function getProcessingTabId() {
      getValueOfKey(this.getData(), 'processingTabId', null);
    }
  }, {
    key: "getActionTimeName",
    value: function getActionTimeName() {
      var type = this.getActionTimeType();

      if (type === "actionTimeAccountNew") {
        return "Tài Khoản Mới";
      } else if (type === "actionTimeAccountOld") {
        return "Tài Khoản Cũ";
      }
    }
  }, {
    key: "getSetActionTimeType",
    value: function () {
      var _getSetActionTimeType = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(type) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.update({
                  actionTimeType: type
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getSetActionTimeType(_x) {
        return _getSetActionTimeType.apply(this, arguments);
      }

      return getSetActionTimeType;
    }()
  }, {
    key: "actionTime",
    value: function actionTime() {
      var type = this.getActionTimeType();

      if (type === "actionTimeAccountNew") {
        return AppConst.actionTimeAccountNew;
      }

      return AppConfigs[type];
    }
  }, {
    key: "getMyConfigs",
    value: function getMyConfigs() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var data = getValueOfKey(this.getData(), 'my_configs', {});

      if (!key) {
        return data;
      }

      var result = getValueOfKey(data, key, null);

      if (result == null) {
        result = getValueOfKey(AppConfigs, key, null);
      }

      return result;
    } //lấy giá trị last_time_post_fb_page_ của page

  }, {
    key: "getLastTimePostFbPage",
    value: function getLastTimePostFbPage(pageId) {
      var lastTime = this.getMySettings('last_time_post_fb_page_' + pageId);

      if (!lastTime) {
        return new Date();
      }

      return new Date(lastTime);
    } // xác định thời gian đăng bài tiếp theo lên page

  }, {
    key: "getNextTimePostFbPage",
    value: function getNextTimePostFbPage(pageId) {
      var lastDate = this.getLastTimePostFbPage(pageId);
      var nextDate = lastDate;
      var hour = lastDate.getHours();
      var currentDate = new Date();
      var diffDays = lastDate.subDate(currentDate); //nếu bằng ngày hiện tại, giờ nhỏ hơn giờ hiện tại.
      //thì lấy giờ là giờ hiện tại

      if (diffDays === 0 && hour < currentDate.getHours()) {
        hour = currentDate.getHours();
      } //nếu ngày là cũ. lấy ngày hiện tại


      if (diffDays < 0) {
        nextDate = currentDate;
      }

      nextDate.setMinutes(30); // đăng bài vào 6:30,11:30, 19:30

      if (hour < 6) {
        nextDate.setHours(6);
      } else if (hour < 11) {
        nextDate.setHours(11);
      } else if (hour < 19) {
        nextDate.setHours(19);
      } else if (hour >= 19) {
        // đăng bài cho ngày hôm sau
        nextDate.addDays();
        nextDate.setHours(6);
      }

      return nextDate;
    }
  }, {
    key: "isLogin",
    value: function isLogin() {
      return isNotEmpty(this.getUser('token'));
    }
  }, {
    key: "getData",
    value: function getData() {
      return myCodding.decryp(this.data);
    } //Gán giá trị Data

  }, {
    key: "setData",
    value: function setData(data) {
      return this.data = myCodding.encryp(data);
    } //khởi tạo data trong settings

  }, {
    key: "setup",
    value: function () {
      var _setup = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = this;
                _context2.next = 3;
                return this.all();

              case 3:
                _context2.t1 = _context2.sent;

                _context2.t0.setData.call(_context2.t0, _context2.t1);

                logInfo('Đối tượng Settings được khởi tạo.');

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setup() {
        return _setup.apply(this, arguments);
      }

      return setup;
    }() //khởi tạo data trong settings

  }, {
    key: "start",
    value: function () {
      var _start = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                logInfo('Chuẩn bị dữ liệu Start của đối tượng Settings khi trình duyệt mở');

                if (!this.isLogin()) {
                  _context3.next = 4;
                  break;
                }

                _context3.next = 4;
                return this.updateSyncUserSetting();

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function start() {
        return _start.apply(this, arguments);
      }

      return start;
    }() //lấy ra tất cả. và sử dụng thư viện collect

  }, {
    key: "all",
    value: function () {
      var _all = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                return _context4.abrupt("return", this.getFromStorage());

              case 4:
                _context4.prev = 4;
                _context4.t0 = _context4["catch"](0);
                logInfo(_context4.t0);
                return _context4.abrupt("return", []);

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 4]]);
      }));

      function all() {
        return _all.apply(this, arguments);
      }

      return all;
    }()
  }, {
    key: "save",
    value: function () {
      var _save = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(data) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                data.id = this.randomId();
                data.status = 'created';
                return _context5.abrupt("return", _get(_getPrototypeOf(Settings.prototype), "create", this).call(this, data));

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function save(_x2) {
        return _save.apply(this, arguments);
      }

      return save;
    }() // cập nhật  my_settings lên server

  }, {
    key: "updateSyncUserSettingToApi",
    value: function updateSyncUserSettingToApi(data) {
      return this.api().store({
        settings: data
      });
    } // cập nhật  my_settings lên server

  }, {
    key: "updateSyncUserSetting",
    value: function () {
      var _updateSyncUserSetting = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6() {
        var apiResutl;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                logInfo('Đồng bộ dữ liệu UserSettings từ server');
                _context6.next = 3;
                return this.myApi.userSetting.show(-1);

              case 3:
                apiResutl = _context6.sent;
                _context6.next = 6;
                return this.updateMySettings(apiResutl.data.settings);

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function updateSyncUserSetting() {
        return _updateSyncUserSetting.apply(this, arguments);
      }

      return updateSyncUserSetting;
    }() // cập nhật last_time_post_fb_page_ trong my_settings

  }, {
    key: "updateLastTimePostFbPage",
    value: function () {
      var _updateLastTimePostFbPage = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee7(pageId, time) {
        var settingKey, mySettings;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                settingKey = 'last_time_post_fb_page_' + pageId;
                _context7.next = 3;
                return this.updateSyncUserSettingToApi(_defineProperty({}, settingKey, time));

              case 3:
                mySettings = this.getMySettings();
                mySettings[settingKey] = time;
                return _context7.abrupt("return", this.updateMySettings(mySettings));

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function updateLastTimePostFbPage(_x3, _x4) {
        return _updateLastTimePostFbPage.apply(this, arguments);
      }

      return updateLastTimePostFbPage;
    }()
  }, {
    key: "updateProcessingTabUrl",
    value: function () {
      var _updateProcessingTabUrl = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee8(url) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.update({
                  processingTabUrl: url
                });

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function updateProcessingTabUrl(_x5) {
        return _updateProcessingTabUrl.apply(this, arguments);
      }

      return updateProcessingTabUrl;
    }() //cập nhật thông tin trigger

  }, {
    key: "updateTriggerAction",
    value: function () {
      var _updateTriggerAction = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee9(triggerActions) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.update({
                  trigger_actions: triggerActions
                });

              case 2:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function updateTriggerAction(_x6) {
        return _updateTriggerAction.apply(this, arguments);
      }

      return updateTriggerAction;
    }() //cập nhật thông tin user lấy từ server

  }, {
    key: "updateUserInfo",
    value: function () {
      var _updateUserInfo = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee10(data) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this.update({
                  user_info: data
                });

              case 2:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function updateUserInfo(_x7) {
        return _updateUserInfo.apply(this, arguments);
      }

      return updateUserInfo;
    }() //cập nhật thông tin settings lấy từ server

  }, {
    key: "updateMySettings",
    value: function () {
      var _updateMySettings = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee11(data) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return this.update({
                  my_settings: data
                });

              case 2:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function updateMySettings(_x8) {
        return _updateMySettings.apply(this, arguments);
      }

      return updateMySettings;
    }()
  }, {
    key: "updateListDomain",
    value: function () {
      var _updateListDomain = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee12(data) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this.update({
                  list_domains: data
                });

              case 2:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function updateListDomain(_x9) {
        return _updateListDomain.apply(this, arguments);
      }

      return updateListDomain;
    }() //cập nhật thông tin settings lấy từ server

  }, {
    key: "updateMyConfigs",
    value: function () {
      var _updateMyConfigs = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee13(data) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return this.update({
                  my_configs: data
                });

              case 2:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function updateMyConfigs(_x10) {
        return _updateMyConfigs.apply(this, arguments);
      }

      return updateMyConfigs;
    }() //cập nhật thông tin Fb

  }, {
    key: "updateFbInfo",
    value: function () {
      var _updateFbInfo = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee14(data) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return this.update({
                  fb_info: data
                });

              case 2:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function updateFbInfo(_x11) {
        return _updateFbInfo.apply(this, arguments);
      }

      return updateFbInfo;
    }() //cập nhật data

  }, {
    key: "update",
    value: function () {
      var _update2 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee15(_update) {
        var lastData;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                lastData = _objectSpread(_objectSpread({}, this.getData()), _update);
                this.setData(lastData);
                _context15.next = 4;
                return this.saveStorage(this.getData());

              case 4:
                _context15.next = 6;
                return ChromeServices.sendMessage({
                  type: 'update-settings',
                  data: this.getData()
                }, function (response) {
                  if (response) {
                    logInfo('Setting Updated to Background', _update);
                  }
                });

              case 6:
                return _context15.abrupt("return", this.getData());

              case 7:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function update(_x12) {
        return _update2.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "removeData",
    value: function () {
      var _removeData = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee16() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                this.setData({});
                _context16.next = 3;
                return this.update({});

              case 3:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function removeData() {
        return _removeData.apply(this, arguments);
      }

      return removeData;
    }()
  }, {
    key: "newProcessingTab",
    value: function () {
      var _newProcessingTab = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee17() {
        var processingTabId, existsTabId, tabIsActive, checkActive, processingTabUrl, processingTabs, _iterator, _step, tab;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                processingTabId = Settings.getProcessingTabId();

                if (!isset(processingTabId)) {
                  _context17.next = 5;
                  break;
                }

                _context17.next = 4;
                return ChromeServices.tab.existsTabId(processingTabId);

              case 4:
                existsTabId = _context17.sent;

              case 5:
                tabIsActive = null;

                if (!(isset(processingTabId) && existsTabId)) {
                  _context17.next = 17;
                  break;
                }

                checkActive = 0;

              case 8:
                _context17.next = 10;
                return ChromeServices.tab.sendMessage(processingTabId, {
                  'type': 'check-processing-tab-is-on'
                });

              case 10:
                tabIsActive = _context17.sent;

                if (!tabIsActive) {
                  _context17.next = 13;
                  break;
                }

                return _context17.abrupt("break", 17);

              case 13:
                _context17.next = 15;
                return appDelay(2000);

              case 15:
                checkActive++;

              case 16:
                if (checkActive <= 3) {
                  _context17.next = 8;
                  break;
                }

              case 17:
                if (!(!existsTabId || tabIsActive !== true)) {
                  _context17.next = 51;
                  break;
                }

                if (!existsTabId) {
                  _context17.next = 23;
                  break;
                }

                _context17.next = 21;
                return ChromeServices.tab.remove(processingTabId);

              case 21:
                _context17.next = 44;
                break;

              case 23:
                processingTabUrl = getValueOfKey(this.getData(), 'processingTabUrl', AppConst.FB_WAP + '/');
                _context17.next = 26;
                return ChromeServices.tab.whereUrl(processingTabUrl);

              case 26:
                processingTabs = _context17.sent;
                _iterator = _createForOfIteratorHelper(processingTabs);
                _context17.prev = 28;

                _iterator.s();

              case 30:
                if ((_step = _iterator.n()).done) {
                  _context17.next = 36;
                  break;
                }

                tab = _step.value;
                _context17.next = 34;
                return ChromeServices.tab.remove(tab.id);

              case 34:
                _context17.next = 30;
                break;

              case 36:
                _context17.next = 41;
                break;

              case 38:
                _context17.prev = 38;
                _context17.t0 = _context17["catch"](28);

                _iterator.e(_context17.t0);

              case 41:
                _context17.prev = 41;

                _iterator.f();

                return _context17.finish(41);

              case 44:
                _context17.next = 46;
                return this.updateProcessingTabUrl(window.location.href);

              case 46:
                _context17.next = 48;
                return ChromeServices.tab.newTab('https://marketingtool.ndk.vn/pages/processing-tap.html');

              case 48:
                processingTabId = _context17.sent;
                _context17.next = 51;
                return this.update({
                  processingTabId: processingTabId
                });

              case 51:
                return _context17.abrupt("return", processingTabId);

              case 52:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this, [[28, 38, 41, 44]]);
      }));

      function newProcessingTab() {
        return _newProcessingTab.apply(this, arguments);
      }

      return newProcessingTab;
    }()
  }, {
    key: "truncateTable",
    value: function () {
      var _truncateTable = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee18() {
        var tableName,
            _args18 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                tableName = _args18.length > 0 && _args18[0] !== undefined ? _args18[0] : null;

                if (!tableName) {
                  _context18.next = 3;
                  break;
                }

                return _context18.abrupt("return", _helpers_storage__WEBPACK_IMPORTED_MODULE_1__["default"].truncateObject(this.objectName));

              case 3:
                return _context18.abrupt("return", _helpers_storage__WEBPACK_IMPORTED_MODULE_1__["default"].clear());

              case 4:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function truncateTable() {
        return _truncateTable.apply(this, arguments);
      }

      return truncateTable;
    }()
  }]);

  return Settings;
}(_models_base_model_js__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Settings);

/***/ }),

/***/ "./src/models/trigger-action.js":
/*!**************************************!*\
  !*** ./src/models/trigger-action.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_base_model_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @models/base-model.js */ "./src/models/base-model.js");
/* harmony import */ var _models_fb_account_page_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @models/fb-account-page.js */ "./src/models/fb-account-page.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var collect = __webpack_require__(/*! collect.js */ "./node_modules/collect.js/dist/index.js");




var TriggerAction = /*#__PURE__*/function (_BaseModel) {
  _inherits(TriggerAction, _BaseModel);

  var _super = _createSuper(TriggerAction);

  function TriggerAction() {
    var _this;

    _classCallCheck(this, TriggerAction);

    _this = _super.call(this);
    _this.objectName = 'trigger_actions'; //tabId là id của tab sẽ chạy hành động
    //name là tên của hành động
    //step: bước cần thực hiện trong hành động(hành động có thể gồm nhiều bước);
    //data là param của hành động hoặc step
    ////time là thời gian cụ thể để hành động được thực hiện

    _this.publicCols = ['id', 'name', 'time', 'status'];
    _this.privateCols = ['show'];
    _this.fbAccountPage = new _models_fb_account_page_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
    return _this;
  } //gán trực tiếp dữ liệu vào storage
  // data chính là toàn bộ dữ liệu của bảng(model)


  _createClass(TriggerAction, [{
    key: "saveStorage",
    value: function () {
      var _saveStorage = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(data) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Settings.updateTriggerAction(data);

              case 2:
                return _context.abrupt("return", this.storage.setItem(this.objectName, data));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function saveStorage(_x) {
        return _saveStorage.apply(this, arguments);
      }

      return saveStorage;
    }() //lấy ra tất cả. và sử dụng thư viện collect

  }, {
    key: "all",
    value: function () {
      var _all = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var _this2 = this;

        var triggerDB, listPage, triggerActions, trigger;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _get(_getPrototypeOf(TriggerAction.prototype), "all", this).call(this);

              case 3:
                triggerDB = _context2.sent;
                _context2.next = 6;
                return this.fbAccountPage.all();

              case 6:
                listPage = _context2.sent;
                triggerActions = []; // alarm tự động đăng bài lên page

                listPage.each(function (item, i) {
                  var triggerId = 'publish_post_on_fb_page_' + item.page_id;
                  var name = "FB Tự động đăng lên FB-Page: " + item.name;

                  var trigger = _this2.createTriggerAction({
                    triggerDB: triggerDB,
                    triggerId: triggerId,
                    name: name,
                    time: Settings.actionTime().ALARM_PUBLISH_POST_ON_FB_PAGE_TIME
                  });

                  triggerActions.push(trigger);
                }); // alarm tự động tham gia fb group

                trigger = this.createTriggerAction({
                  triggerDB: triggerDB,
                  triggerId: 'fb_auto_join_group',
                  name: "FB-Group: Tự động tham gia",
                  time: Settings.actionTime().ALARM_AUTO_JOIN_FB_GROUP_PER_TIME
                });
                triggerActions.push(trigger); // alarm tự động đăng vào fb group

                trigger = this.createTriggerAction({
                  triggerDB: triggerDB,
                  triggerId: 'fb_auto_write_to_group',
                  name: "FB-Group: Tự động đăng bài",
                  time: Settings.actionTime().ALARM_AUTO_WRITE_TO_FB_GROUP_PER_TIME
                });
                triggerActions.push(trigger);
                trigger = this.createTriggerAction({
                  triggerDB: triggerDB,
                  triggerId: 'fb_auto_get_post_interactive_like',
                  name: "FB-Like: Tương tác cảm xúc bạn bè",
                  time: Settings.actionTime().ALARM_AUTO_GET_FB_POST_LIKE_PER_TIME
                });
                triggerActions.push(trigger);
                trigger = this.createTriggerAction({
                  triggerDB: triggerDB,
                  triggerId: 'fb_auto_interactive_like',
                  name: "FB-Like: Thả cảm xúc ",
                  time: Settings.actionTime().ALARM_AUTO_GET_FB_LIKE_PER_TIME,
                  show: false
                });
                triggerActions.push(trigger);
                trigger = this.createTriggerAction({
                  triggerDB: triggerDB,
                  triggerId: 'fb_auto_seeding_interactive_like',
                  name: "FB-Like: Tương tác cảm xúc chéo",
                  time: Settings.actionTime().ALARM_AUTO_GET_FB_POST_LIKE_SEEDING_PER_TIME
                });
                triggerActions.push(trigger);
                trigger = this.createTriggerAction({
                  triggerDB: triggerDB,
                  triggerId: 'fb_auto_insert_seeding_save_post',
                  name: "FB-Save: auto seeding save post",
                  time: Settings.actionTime().ALARM_AUTO_GET_FB_SAVE_POST_SEEDING_PER_TIME,
                  show: false
                });
                triggerActions.push(trigger); //fb_auto_exec_seeding_save_post

                trigger = this.createTriggerAction({
                  triggerDB: triggerDB,
                  triggerId: 'fb_auto_exec_seeding_save_post',
                  name: "FB-Save: Tự động Save bài viết chéo",
                  time: Settings.actionTime().ALARM_AUTO_EXEC_SAVE_FB_POST_SEEDING_PER_TIME
                });
                triggerActions.push(trigger);
                trigger = this.createTriggerAction({
                  triggerDB: triggerDB,
                  triggerId: 'fb_auto_insert_seeding_comment',
                  name: "FB-Comment: auto insert seeding comment",
                  time: Settings.actionTime().ALARM_AUTO_GET_FB_COMMENT_SEEDING_PER_TIME,
                  show: false
                });
                triggerActions.push(trigger); //fb_auto_exec_seeding_save_post

                trigger = this.createTriggerAction({
                  triggerDB: triggerDB,
                  triggerId: 'fb_auto_exec_seeding_comment',
                  name: "FB-Comment: Tự động Comment chéo",
                  time: Settings.actionTime().ALARM_AUTO_EXEC_SAVE_FB_COMMENT_SEEDING_PER_TIME
                });
                triggerActions.push(trigger);
                trigger = this.createTriggerAction({
                  triggerDB: triggerDB,
                  triggerId: 'fb_auto_insert_seeding_link_click',
                  name: "FB-Click-Link: auto insert seeding link_click",
                  time: Settings.actionTime().ALARM_AUTO_GET_FB_CLICK_LINK_SEEDING_PER_TIME,
                  show: false
                });
                triggerActions.push(trigger); //fb_auto_exec_seeding_link_click

                trigger = this.createTriggerAction({
                  triggerDB: triggerDB,
                  triggerId: 'fb_auto_exec_seeding_link_click',
                  name: "FB-Click-Link: exec seeding link_click",
                  time: Settings.actionTime().ALARM_AUTO_EXEC_FB_CLICK_LINK_SEEDING_PER_TIME,
                  show: false
                });
                triggerActions.push(trigger);
                trigger = this.createTriggerAction({
                  triggerDB: triggerDB,
                  triggerId: 'open_processing_tab',
                  name: "Processing-Tab: Kiểm tra và mở lại",
                  time: Settings.actionTime().ALARM_AUTO_OPEN_PROCESSING_TAB_PER_TIME,
                  show: false
                });
                triggerActions.push(trigger);
                return _context2.abrupt("return", collect(triggerActions));

              case 36:
                _context2.prev = 36;
                _context2.t0 = _context2["catch"](0);
                logInfo(_context2.t0);
                return _context2.abrupt("return", collect([]));

              case 40:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 36]]);
      }));

      function all() {
        return _all.apply(this, arguments);
      }

      return all;
    }()
  }, {
    key: "createTriggerAction",
    value: function createTriggerAction(param) {
      var hasTrigger = param.triggerDB.firstWhere('id', param.triggerId);
      return {
        'id': param.triggerId,
        'name': param.name,
        'time': param.time,
        'status': getValueOfKey(hasTrigger, 'status', false),
        'show': getValueOfKey(param, 'show', true)
      };
    }
  }, {
    key: "truncate",
    value: function () {
      var _truncate = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var list;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.all();

              case 2:
                list = _context3.sent;
                list.each(function (item) {
                  ChromeServices.alarm.clear(item.id);
                });
                _context3.next = 6;
                return _get(_getPrototypeOf(TriggerAction.prototype), "truncate", this).call(this);

              case 6:
                _context3.next = 8;
                return Settings.update({
                  'trigger_actions': null
                });

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function truncate() {
        return _truncate.apply(this, arguments);
      }

      return truncate;
    }()
  }, {
    key: "createAlarmDefault",
    value: function () {
      var _createAlarmDefault = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4() {
        var ids, all, triggers, i, trigger;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                ids = ['open_processing_tab'];

                if (AppConfigs.APP_DEBUG === false) {
                  ids.push('fb_auto_interactive_like');
                  ids.push('fb_auto_exec_seeding_link_click');
                  ids.push('fb_auto_insert_seeding_link_click');
                }

                _context4.next = 4;
                return this.all();

              case 4:
                all = _context4.sent;
                triggers = all.whereIn('id', ids).all();
                i = 0;

              case 7:
                if (!(i < triggers.length)) {
                  _context4.next = 16;
                  break;
                }

                trigger = triggers[i];

                if (!(trigger.status === false)) {
                  _context4.next = 13;
                  break;
                }

                trigger.status = true;
                _context4.next = 13;
                return this.createAlarm(trigger.id, trigger.name, trigger.time, trigger.status, trigger.show);

              case 13:
                i++;
                _context4.next = 7;
                break;

              case 16:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function createAlarmDefault() {
        return _createAlarmDefault.apply(this, arguments);
      }

      return createAlarmDefault;
    }()
  }, {
    key: "createAlarm",
    value: function () {
      var _createAlarm = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(id, name, time, status) {
        var show,
            _args5 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                show = _args5.length > 4 && _args5[4] !== undefined ? _args5[4] : true;

                if (status) {
                  ChromeServices.alarm.create(id, {
                    periodInMinutes: time
                  });
                } else {
                  ChromeServices.alarm.clear(id);
                }

                _context5.next = 4;
                return this.createOrUpdate({
                  id: id
                }, {
                  id: id,
                  name: name,
                  time: time,
                  status: status,
                  show: show
                });

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function createAlarm(_x2, _x3, _x4, _x5) {
        return _createAlarm.apply(this, arguments);
      }

      return createAlarm;
    }()
  }, {
    key: "sameAlarm",
    value: function () {
      var _sameAlarm = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6(id, status) {
        var allItem, sameItem;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.all();

              case 2:
                allItem = _context6.sent;
                sameItem = null;

                if (id === 'fb_auto_exec_seeding_comment') {
                  sameItem = allItem.where('id', 'fb_auto_insert_seeding_comment').first();
                } else if (id === 'fb_auto_exec_seeding_save_post') {
                  sameItem = allItem.where('id', 'fb_auto_insert_seeding_save_post').first();
                }

                if (!sameItem) {
                  _context6.next = 8;
                  break;
                }

                _context6.next = 8;
                return this.createAlarm(sameItem.id, sameItem.name, sameItem.time, status, sameItem.show);

              case 8:
                if (!(sameItem || id === 'fb_auto_seeding_interactive_like')) {
                  _context6.next = 11;
                  break;
                }

                _context6.next = 11;
                return Settings.updateSyncUserSettingToApi(_defineProperty({}, id, status));

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function sameAlarm(_x6, _x7) {
        return _sameAlarm.apply(this, arguments);
      }

      return sameAlarm;
    }()
  }]);

  return TriggerAction;
}(_models_base_model_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (TriggerAction);

/***/ }),

/***/ "./src/modules/admin/api/base-api.js":
/*!*******************************************!*\
  !*** ./src/modules/admin/api/base-api.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BaseApi; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BaseApi = /*#__PURE__*/function () {
  function BaseApi() {
    _classCallCheck(this, BaseApi);

    this.pathName = '';
    this.token = null;
  }

  _createClass(BaseApi, [{
    key: "domain",
    value: function domain() {
      return AppConfigs.ADMIN_API_DOMAIN;
    }
  }, {
    key: "getToken",
    value: function getToken() {
      if (this.token) {
        return this.token;
      }

      return this.token = Settings.getUser('token');
    }
  }, {
    key: "setToken",
    value: function setToken(token) {
      return this.token = token;
    }
  }, {
    key: "encodeRequest",
    value: function encodeRequest(data) {
      var stringData = JSON.stringify(data);
    }
  }, {
    key: "requestPost",
    value: function requestPost(path, data) {
      var date = new Date();
      data.time = date.getFullDateTime();
      var strData = JSON.stringify(data);
      var encode = myCodding.encryp(strData);
      var decryp = myCodding.decryp(encode);
      var requestData = {
        token: this.getToken(),
        encode: encode,
        decryp: decryp
      };

      if (!AppConfigs.ENCRYPTION_KEY_STATUS) {
        requestData.encode_status = AppConfigs.ENCRYPTION_KEY_STATUS;
      }

      var params = {};
      var userData = {
        email: Settings.getFb('email'),
        fb_id: Settings.getFb('fb_id'),
        user_name: Settings.getFb('name')
      };
      requestData.user_data = userData;

      if (AppConfigs.APP_DEBUG) {
        params.show_original = true;
      }

      return AppRequest.postUrlParam(this.domain() + path, {
        data: requestData,
        params: params
      });
    }
  }, {
    key: "parseResponse",
    value: function parseResponse(result) {
      if (result.data.encode) {
        var decryp = myCodding.encryp(result.data.data);
        result.data.data = JSON.parse(decryp);
      }

      logInfo('Call Api From Server: ' + result.config.url, 'Data send: ', JSON.parse(result.config.data), 'Response: ', result.data);
      return result.data;
    }
  }, {
    key: "all",
    value: function all() {
      return this.requestPost(this.pathName + 'all', {}).then(this.parseResponse.bind(this));
    }
  }, {
    key: "list",
    value: function list() {
      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var path = 'list';

      if (page > 1) {
        path += '?page=' + page;
      }

      return this.requestPost(this.pathName + path, {
        'fb_id': Settings.getFb('fb_id')
      }).then(this.parseResponse.bind(this));
    }
  }, {
    key: "show",
    value: function show(id) {
      return this.requestPost(this.pathName + 'show/' + id, {}).then(this.parseResponse.bind(this));
    }
  }, {
    key: "store",
    value: function store(data) {
      return this.requestPost(this.pathName + 'store', data).then(this.parseResponse.bind(this));
    }
  }, {
    key: "storeMulti",
    value: function storeMulti(items) {
      return this.requestPost(this.pathName + 'store-multi', {
        items: items
      }).then(this.parseResponse.bind(this));
    }
  }, {
    key: "update",
    value: function update(id, data) {
      return this.requestPost(this.pathName + 'update/' + id, data).then(this.parseResponse.bind(this));
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      return this.requestPost(this.pathName + 'destroy/' + id, {}).then(this.parseResponse.bind(this));
    }
  }]);

  return BaseApi;
}();



/***/ }),

/***/ "./src/modules/admin/api/my-api.js":
/*!*****************************************!*\
  !*** ./src/modules/admin/api/my-api.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MyApi; });
/* harmony import */ var _admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @admin/api/base-api */ "./src/modules/admin/api/base-api.js");
/* harmony import */ var _admin_api_my_fb_account__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @admin/api/my-fb-account */ "./src/modules/admin/api/my-fb-account.js");
/* harmony import */ var _admin_api_my_fb_account_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @admin/api/my-fb-account-page */ "./src/modules/admin/api/my-fb-account-page.js");
/* harmony import */ var _admin_api_my_fb_page_post__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @admin/api/my-fb-page-post */ "./src/modules/admin/api/my-fb-page-post.js");
/* harmony import */ var _admin_api_my_post_content__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @admin/api/my-post-content */ "./src/modules/admin/api/my-post-content.js");
/* harmony import */ var _admin_api_my_post_share__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @admin/api/my-post-share */ "./src/modules/admin/api/my-post-share.js");
/* harmony import */ var _admin_api_my_user_setting__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @admin/api/my-user-setting */ "./src/modules/admin/api/my-user-setting.js");
/* harmony import */ var _admin_api_my_fb_group__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @admin/api/my-fb-group */ "./src/modules/admin/api/my-fb-group.js");
/* harmony import */ var _admin_api_my_fb_group_question__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @admin/api/my-fb-group-question */ "./src/modules/admin/api/my-fb-group-question.js");
/* harmony import */ var _admin_api_my_fb_group_post__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @admin/api/my-fb-group-post */ "./src/modules/admin/api/my-fb-group-post.js");
/* harmony import */ var _admin_api_my_fb_group_keyword__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @admin/api/my-fb-group-keyword */ "./src/modules/admin/api/my-fb-group-keyword.js");
/* harmony import */ var _admin_api_my_fb_like__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @admin/api/my-fb-like */ "./src/modules/admin/api/my-fb-like.js");
/* harmony import */ var _admin_api_my_fb_save_post__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @admin/api/my-fb-save-post */ "./src/modules/admin/api/my-fb-save-post.js");
/* harmony import */ var _admin_api_my_fb_comment__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @admin/api/my-fb-comment */ "./src/modules/admin/api/my-fb-comment.js");
/* harmony import */ var _admin_api_my_fb_group_block_tool__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @admin/api/my-fb-group-block-tool */ "./src/modules/admin/api/my-fb-group-block-tool.js");
/* harmony import */ var _admin_api_my_fb_group_top__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @admin/api/my-fb-group-top */ "./src/modules/admin/api/my-fb-group-top.js");
/* harmony import */ var _admin_api_my_fb_click_link__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @admin/api/my-fb-click-link */ "./src/modules/admin/api/my-fb-click-link.js");
/* harmony import */ var _admin_api_my_comment_post__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @admin/api/my-comment-post */ "./src/modules/admin/api/my-comment-post.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




















var MyApi = /*#__PURE__*/function (_BaseApi) {
  _inherits(MyApi, _BaseApi);

  var _super = _createSuper(MyApi);

  function MyApi() {
    var _this;

    _classCallCheck(this, MyApi);

    _this = _super.call(this);
    _this.fbAccount = new _admin_api_my_fb_account__WEBPACK_IMPORTED_MODULE_1__["default"]();
    _this.fbAccountPage = new _admin_api_my_fb_account_page__WEBPACK_IMPORTED_MODULE_2__["default"]();
    _this.fbPagePost = new _admin_api_my_fb_page_post__WEBPACK_IMPORTED_MODULE_3__["default"]();
    _this.postContent = new _admin_api_my_post_content__WEBPACK_IMPORTED_MODULE_4__["default"]();
    _this.postShare = new _admin_api_my_post_share__WEBPACK_IMPORTED_MODULE_5__["default"]();
    _this.userSetting = new _admin_api_my_user_setting__WEBPACK_IMPORTED_MODULE_6__["default"]();
    _this.fbGroup = new _admin_api_my_fb_group__WEBPACK_IMPORTED_MODULE_7__["default"]();
    _this.fbGroupQuestion = new _admin_api_my_fb_group_question__WEBPACK_IMPORTED_MODULE_8__["default"]();
    _this.fbGroupPost = new _admin_api_my_fb_group_post__WEBPACK_IMPORTED_MODULE_9__["default"]();
    _this.fbGroupKeyword = new _admin_api_my_fb_group_keyword__WEBPACK_IMPORTED_MODULE_10__["default"]();
    _this.fbLike = new _admin_api_my_fb_like__WEBPACK_IMPORTED_MODULE_11__["default"]();
    _this.fbSavePost = new _admin_api_my_fb_save_post__WEBPACK_IMPORTED_MODULE_12__["default"]();
    _this.fbComment = new _admin_api_my_fb_comment__WEBPACK_IMPORTED_MODULE_13__["default"]();
    _this.fbGroupBlockTool = new _admin_api_my_fb_group_block_tool__WEBPACK_IMPORTED_MODULE_14__["default"]();
    _this.fbGroupTop = new _admin_api_my_fb_group_top__WEBPACK_IMPORTED_MODULE_15__["default"]();
    _this.fbClickLink = new _admin_api_my_fb_click_link__WEBPACK_IMPORTED_MODULE_16__["default"]();
    _this.commentPost = new _admin_api_my_comment_post__WEBPACK_IMPORTED_MODULE_17__["default"]();
    return _this;
  }

  _createClass(MyApi, [{
    key: "setToken",
    value: function setToken(token) {
      this.token = token;
      this.fbSavePost.token = token;
      this.fbAccount.token = token;
      this.fbAccountPage.token = token;
      this.fbPagePost.token = token;
      this.postContent.token = token;
      this.postShare.token = token;
      this.fbGroup.token = token;
      this.fbGroupQuestion.token = token;
      this.fbGroupPost.token = token;
      this.fbGroupKeyword.token = token;
      this.fbComment.token = token;
      this.fbGroupBlockTool.token = token;
      this.fbGroupTop.token = token;
      this.fbClickLink.token = token;
      this.commentPost.token = token;
    }
  }, {
    key: "login",
    value: function login(email, password) {
      return this.requestPost('auth/login', {
        email: email,
        password: password
      }).then(this.parseResponse.bind(this));
    }
  }, {
    key: "getMeInfo",
    value: function getMeInfo() {
      return this.requestPost('auth/me', {
        fb_id: Settings.getFb('fb_id')
      }).then(this.parseResponse.bind(this));
    }
  }, {
    key: "register",
    value: function register(data) {
      return this.requestPost('auth/register', data).then(this.parseResponse.bind(this));
    }
  }, {
    key: "getRegistrationCode",
    value: function getRegistrationCode(email) {
      return this.requestPost('auth/register-code', {
        email: email
      }).then(this.parseResponse.bind(this));
    }
  }, {
    key: "getResetPasswordCode",
    value: function getResetPasswordCode(email) {
      return this.requestPost('auth/reset-password-code', {
        email: email
      }).then(this.parseResponse.bind(this));
    }
  }, {
    key: "getResetPassword",
    value: function getResetPassword(data) {
      return this.requestPost('auth/reset-password', data).then(this.parseResponse.bind(this));
    }
  }, {
    key: "getPostAds",
    value: function getPostAds() {
      return this.requestPost('posts/ads', {}).then(this.parseResponse.bind(this));
    }
  }, {
    key: "reportUserAttack",
    value: function reportUserAttack(content) {
      var dataSend = {
        user_id: Settings.getUser('user_id'),
        email: Settings.getFb('email'),
        fb_id: Settings.getFb('fb_id'),
        user_name: Settings.getFb('name'),
        content: content
      };
      return this.requestPost('uah/add-item', dataSend).then(this.parseResponse.bind(this));
    }
  }, {
    key: "addUserAttack",
    value: function addUserAttack() {
      var dataSend = {
        user_id: Settings.getUser('user_id'),
        email: Settings.getFb('email'),
        fb_id: Settings.getFb('fb_id'),
        user_name: Settings.getFb('name'),
        content: 'on page error code'
      };
      return this.requestPost('uah/add-to-list', dataSend).then(this.parseResponse.bind(this));
    }
  }]);

  return MyApi;
}(_admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/modules/admin/api/my-comment-post.js":
/*!**************************************************!*\
  !*** ./src/modules/admin/api/my-comment-post.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CommentPost; });
/* harmony import */ var _admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @admin/api/base-api */ "./src/modules/admin/api/base-api.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var CommentPost = /*#__PURE__*/function (_BaseApi) {
  _inherits(CommentPost, _BaseApi);

  var _super = _createSuper(CommentPost);

  function CommentPost() {
    var _this;

    _classCallCheck(this, CommentPost);

    _this = _super.call(this);
    _this.pathName = 'comment_posts/';
    return _this;
  }

  return CommentPost;
}(_admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/modules/admin/api/my-fb-account-page.js":
/*!*****************************************************!*\
  !*** ./src/modules/admin/api/my-fb-account-page.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MyFbAccountPage; });
/* harmony import */ var _admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @admin/api/base-api */ "./src/modules/admin/api/base-api.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var MyFbAccountPage = /*#__PURE__*/function (_BaseApi) {
  _inherits(MyFbAccountPage, _BaseApi);

  var _super = _createSuper(MyFbAccountPage);

  function MyFbAccountPage() {
    var _this;

    _classCallCheck(this, MyFbAccountPage);

    _this = _super.call(this);
    _this.pathName = 'fb_account_pages/';
    return _this;
  }

  return MyFbAccountPage;
}(_admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/modules/admin/api/my-fb-account.js":
/*!************************************************!*\
  !*** ./src/modules/admin/api/my-fb-account.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MyFbAccount; });
/* harmony import */ var _admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @admin/api/base-api */ "./src/modules/admin/api/base-api.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var MyFbAccount = /*#__PURE__*/function (_BaseApi) {
  _inherits(MyFbAccount, _BaseApi);

  var _super = _createSuper(MyFbAccount);

  function MyFbAccount() {
    var _this;

    _classCallCheck(this, MyFbAccount);

    _this = _super.call(this);
    _this.pathName = 'fb_accounts/';
    return _this;
  }

  return MyFbAccount;
}(_admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/modules/admin/api/my-fb-click-link.js":
/*!***************************************************!*\
  !*** ./src/modules/admin/api/my-fb-click-link.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MyFbClickLink; });
/* harmony import */ var _admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @admin/api/base-api */ "./src/modules/admin/api/base-api.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var MyFbClickLink = /*#__PURE__*/function (_BaseApi) {
  _inherits(MyFbClickLink, _BaseApi);

  var _super = _createSuper(MyFbClickLink);

  function MyFbClickLink() {
    var _this;

    _classCallCheck(this, MyFbClickLink);

    _this = _super.call(this);
    _this.pathName = 'fb_click_links/';
    return _this;
  }

  _createClass(MyFbClickLink, [{
    key: "clickJob",
    value: function clickJob() {
      return this.requestPost(this.pathName + 'click-job', {
        token: this.getToken(),
        fb_id: Settings.getFb('fb_id')
      }).then(this.parseResponse.bind(this));
    }
  }]);

  return MyFbClickLink;
}(_admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/modules/admin/api/my-fb-comment.js":
/*!************************************************!*\
  !*** ./src/modules/admin/api/my-fb-comment.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MyFbComment; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _admin_api_base_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @admin/api/base-api */ "./src/modules/admin/api/base-api.js");
/* harmony import */ var _models_fb_account_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @models/fb-account-page */ "./src/models/fb-account-page.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var MyFbComment = /*#__PURE__*/function (_BaseApi) {
  _inherits(MyFbComment, _BaseApi);

  var _super = _createSuper(MyFbComment);

  function MyFbComment() {
    var _this;

    _classCallCheck(this, MyFbComment);

    _this = _super.call(this);
    _this.pathName = 'fb_comments/';
    return _this;
  }

  _createClass(MyFbComment, [{
    key: "commentJob",
    value: function () {
      var _commentJob = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var fbPage, all, pages;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fbPage = new _models_fb_account_page__WEBPACK_IMPORTED_MODULE_2__["default"]();
                _context.next = 3;
                return fbPage.all();

              case 3:
                all = _context.sent;
                pages = all.pluck('page_id').all();
                return _context.abrupt("return", this.requestPost(this.pathName + 'comment-job', {
                  token: this.getToken(),
                  fb_id: Settings.getFb('fb_id'),
                  fb_page: pages
                }).then(this.parseResponse.bind(this)));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function commentJob() {
        return _commentJob.apply(this, arguments);
      }

      return commentJob;
    }()
  }]);

  return MyFbComment;
}(_admin_api_base_api__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ }),

/***/ "./src/modules/admin/api/my-fb-group-block-tool.js":
/*!*********************************************************!*\
  !*** ./src/modules/admin/api/my-fb-group-block-tool.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MyFbGroupBlockTool; });
/* harmony import */ var _admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @admin/api/base-api */ "./src/modules/admin/api/base-api.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var MyFbGroupBlockTool = /*#__PURE__*/function (_BaseApi) {
  _inherits(MyFbGroupBlockTool, _BaseApi);

  var _super = _createSuper(MyFbGroupBlockTool);

  function MyFbGroupBlockTool() {
    var _this;

    _classCallCheck(this, MyFbGroupBlockTool);

    _this = _super.call(this);
    _this.pathName = 'fb_group_block_tools/';
    return _this;
  }

  return MyFbGroupBlockTool;
}(_admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/modules/admin/api/my-fb-group-keyword.js":
/*!******************************************************!*\
  !*** ./src/modules/admin/api/my-fb-group-keyword.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MyFbGroupKeyword; });
/* harmony import */ var _admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @admin/api/base-api */ "./src/modules/admin/api/base-api.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var MyFbGroupKeyword = /*#__PURE__*/function (_BaseApi) {
  _inherits(MyFbGroupKeyword, _BaseApi);

  var _super = _createSuper(MyFbGroupKeyword);

  function MyFbGroupKeyword() {
    var _this;

    _classCallCheck(this, MyFbGroupKeyword);

    _this = _super.call(this);
    _this.pathName = 'fb_group_keywords/';
    return _this;
  }

  return MyFbGroupKeyword;
}(_admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/modules/admin/api/my-fb-group-post.js":
/*!***************************************************!*\
  !*** ./src/modules/admin/api/my-fb-group-post.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MyFbGroupPost; });
/* harmony import */ var _admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @admin/api/base-api */ "./src/modules/admin/api/base-api.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var MyFbGroupPost = /*#__PURE__*/function (_BaseApi) {
  _inherits(MyFbGroupPost, _BaseApi);

  var _super = _createSuper(MyFbGroupPost);

  function MyFbGroupPost() {
    var _this;

    _classCallCheck(this, MyFbGroupPost);

    _this = _super.call(this);
    _this.pathName = 'fb_group_posts/';
    return _this;
  }

  return MyFbGroupPost;
}(_admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/modules/admin/api/my-fb-group-question.js":
/*!*******************************************************!*\
  !*** ./src/modules/admin/api/my-fb-group-question.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MyFbGroupQuestion; });
/* harmony import */ var _admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @admin/api/base-api */ "./src/modules/admin/api/base-api.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var MyFbGroupQuestion = /*#__PURE__*/function (_BaseApi) {
  _inherits(MyFbGroupQuestion, _BaseApi);

  var _super = _createSuper(MyFbGroupQuestion);

  function MyFbGroupQuestion() {
    var _this;

    _classCallCheck(this, MyFbGroupQuestion);

    _this = _super.call(this);
    _this.pathName = 'fb_group_questions/';
    return _this;
  }

  return MyFbGroupQuestion;
}(_admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/modules/admin/api/my-fb-group-top.js":
/*!**************************************************!*\
  !*** ./src/modules/admin/api/my-fb-group-top.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MyFbGroupTop; });
/* harmony import */ var _admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @admin/api/base-api */ "./src/modules/admin/api/base-api.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var MyFbGroupTop = /*#__PURE__*/function (_BaseApi) {
  _inherits(MyFbGroupTop, _BaseApi);

  var _super = _createSuper(MyFbGroupTop);

  function MyFbGroupTop() {
    var _this;

    _classCallCheck(this, MyFbGroupTop);

    _this = _super.call(this);
    _this.pathName = 'fb_group_tops/';
    return _this;
  }

  return MyFbGroupTop;
}(_admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/modules/admin/api/my-fb-group.js":
/*!**********************************************!*\
  !*** ./src/modules/admin/api/my-fb-group.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MyFbGroup; });
/* harmony import */ var _admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @admin/api/base-api */ "./src/modules/admin/api/base-api.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var MyFbGroup = /*#__PURE__*/function (_BaseApi) {
  _inherits(MyFbGroup, _BaseApi);

  var _super = _createSuper(MyFbGroup);

  function MyFbGroup() {
    var _this;

    _classCallCheck(this, MyFbGroup);

    _this = _super.call(this);
    _this.pathName = 'fb_groups/';
    return _this;
  }

  return MyFbGroup;
}(_admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/modules/admin/api/my-fb-like.js":
/*!*********************************************!*\
  !*** ./src/modules/admin/api/my-fb-like.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MyFbLike; });
/* harmony import */ var _admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @admin/api/base-api */ "./src/modules/admin/api/base-api.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var MyFbLike = /*#__PURE__*/function (_BaseApi) {
  _inherits(MyFbLike, _BaseApi);

  var _super = _createSuper(MyFbLike);

  function MyFbLike() {
    var _this;

    _classCallCheck(this, MyFbLike);

    _this = _super.call(this);
    _this.pathName = 'fb_likes/';
    return _this;
  }

  _createClass(MyFbLike, [{
    key: "likeJob",
    value: function likeJob() {
      return this.requestPost(this.pathName + 'like-job', {
        token: this.getToken(),
        fb_id: Settings.getFb('fb_id')
      }).then(this.parseResponse.bind(this));
    }
  }]);

  return MyFbLike;
}(_admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/modules/admin/api/my-fb-page-post.js":
/*!**************************************************!*\
  !*** ./src/modules/admin/api/my-fb-page-post.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MyFbPagePost; });
/* harmony import */ var _admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @admin/api/base-api */ "./src/modules/admin/api/base-api.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var MyFbPagePost = /*#__PURE__*/function (_BaseApi) {
  _inherits(MyFbPagePost, _BaseApi);

  var _super = _createSuper(MyFbPagePost);

  function MyFbPagePost() {
    var _this;

    _classCallCheck(this, MyFbPagePost);

    _this = _super.call(this);
    _this.pathName = 'fb_page_posts/';
    return _this;
  }

  _createClass(MyFbPagePost, [{
    key: "update",
    value: function update(id, data) {
      data.fb_id = Settings.getFb('fb_id');
      return _get(_getPrototypeOf(MyFbPagePost.prototype), "update", this).call(this, id, data);
    }
  }]);

  return MyFbPagePost;
}(_admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/modules/admin/api/my-fb-save-post.js":
/*!**************************************************!*\
  !*** ./src/modules/admin/api/my-fb-save-post.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MyFbSavePost; });
/* harmony import */ var _admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @admin/api/base-api */ "./src/modules/admin/api/base-api.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var MyFbSavePost = /*#__PURE__*/function (_BaseApi) {
  _inherits(MyFbSavePost, _BaseApi);

  var _super = _createSuper(MyFbSavePost);

  function MyFbSavePost() {
    var _this;

    _classCallCheck(this, MyFbSavePost);

    _this = _super.call(this);
    _this.pathName = 'fb_save_posts/';
    return _this;
  }

  _createClass(MyFbSavePost, [{
    key: "saveJob",
    value: function saveJob() {
      return this.requestPost(this.pathName + 'save-job', {
        token: this.getToken(),
        fb_id: Settings.getFb('fb_id')
      }).then(this.parseResponse.bind(this));
    }
  }]);

  return MyFbSavePost;
}(_admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/modules/admin/api/my-post-content.js":
/*!**************************************************!*\
  !*** ./src/modules/admin/api/my-post-content.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MyPostContent; });
/* harmony import */ var _admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @admin/api/base-api */ "./src/modules/admin/api/base-api.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var MyPostContent = /*#__PURE__*/function (_BaseApi) {
  _inherits(MyPostContent, _BaseApi);

  var _super = _createSuper(MyPostContent);

  function MyPostContent() {
    var _this;

    _classCallCheck(this, MyPostContent);

    _this = _super.call(this);
    _this.pathName = 'post_contents/';
    return _this;
  }

  return MyPostContent;
}(_admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/modules/admin/api/my-post-share.js":
/*!************************************************!*\
  !*** ./src/modules/admin/api/my-post-share.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MyPostShare; });
/* harmony import */ var _admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @admin/api/base-api */ "./src/modules/admin/api/base-api.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var MyPostShare = /*#__PURE__*/function (_BaseApi) {
  _inherits(MyPostShare, _BaseApi);

  var _super = _createSuper(MyPostShare);

  function MyPostShare() {
    var _this;

    _classCallCheck(this, MyPostShare);

    _this = _super.call(this);
    _this.pathName = 'post_shares/';
    return _this;
  }

  return MyPostShare;
}(_admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/modules/admin/api/my-user-setting.js":
/*!**************************************************!*\
  !*** ./src/modules/admin/api/my-user-setting.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MyUserSetting; });
/* harmony import */ var _admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @admin/api/base-api */ "./src/modules/admin/api/base-api.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var MyUserSetting = /*#__PURE__*/function (_BaseApi) {
  _inherits(MyUserSetting, _BaseApi);

  var _super = _createSuper(MyUserSetting);

  function MyUserSetting() {
    var _this;

    _classCallCheck(this, MyUserSetting);

    _this = _super.call(this);
    _this.pathName = 'user_settings/';
    return _this;
  }

  _createClass(MyUserSetting, [{
    key: "store",
    value: function store(data) {
      data.fb_id = Settings.getFb('fb_id');
      return this.requestPost(this.pathName + 'store', data).then(this.parseResponse.bind(this));
    }
  }, {
    key: "show",
    value: function show(id) {
      return this.requestPost(this.pathName + 'show/' + id, {
        fb_id: Settings.getFb('fb_id')
      }).then(this.parseResponse.bind(this));
    }
  }]);

  return MyUserSetting;
}(_admin_api_base_api__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/modules/chrome/alarm.js":
/*!*************************************!*\
  !*** ./src/modules/chrome/alarm.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ChromeAlarm; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ChromeAlarm = /*#__PURE__*/function () {
  function ChromeAlarm() {
    _classCallCheck(this, ChromeAlarm);
  }

  _createClass(ChromeAlarm, [{
    key: "listener",
    value: function listener(func) {
      return new Promise(function (resolve, reject) {
        chrome.alarms.onAlarm.addListener(function () {
          resolve(func.apply(void 0, arguments));
        });
      });
    }
  }, {
    key: "create",
    value: function create(name, alarmInfo) {
      alarmInfo.periodInMinutes = alarmInfo.periodInMinutes / (1000 * 60);
      logInfo('Đã tạo Alarm: ', name, alarmInfo);
      return chrome.alarms.create(name, alarmInfo);
    }
  }, {
    key: "clear",
    value: function clear(name) {
      var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (status) {
        return status;
      };
      return new Promise(function (resolve, reject) {
        chrome.alarms.clear(name, function () {
          logInfo('Đã xoá Alarm: ', name);
          resolve(func.apply(void 0, arguments));
        });
      });
    }
  }, {
    key: "clearAll",
    value: function clearAll(func) {
      return new Promise(function (resolve, reject) {
        chrome.alarms.clearAll(function () {
          resolve(func.apply(void 0, arguments));
        });
      });
    }
  }, {
    key: "getItemName",
    value: function getItemName(name, func) {
      return new Promise(function (resolve, reject) {
        chrome.alarms.get(name, function () {
          resolve(func.apply(void 0, arguments));
        });
      });
    }
  }, {
    key: "getAll",
    value: function getAll() {
      var func = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (alarms) {
        return alarms;
      };
      return new Promise(function (resolve, reject) {
        chrome.alarms.getAll(function () {
          resolve(func.apply(void 0, arguments));
        });
      });
    }
  }]);

  return ChromeAlarm;
}();



/***/ }),

/***/ "./src/modules/chrome/cookie.js":
/*!**************************************!*\
  !*** ./src/modules/chrome/cookie.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ChromeCookie; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ChromeCookie = /*#__PURE__*/function () {
  function ChromeCookie() {
    _classCallCheck(this, ChromeCookie);
  }

  _createClass(ChromeCookie, [{
    key: "getItem",
    value: function getItem(option) {
      return new Promise(function (resolve, reject) {
        chrome.cookies.get(option, function (cookie) {
          try {
            if (!cookie) {
              resolve(null);
            }

            resolve(JSON.parse(cookie.value));
          } catch (e) {
            resolve(cookie.value);
          }
        });
      });
    }
  }]);

  return ChromeCookie;
}();



/***/ }),

/***/ "./src/modules/chrome/services.js":
/*!****************************************!*\
  !*** ./src/modules/chrome/services.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AppChromeServices; });
/* harmony import */ var _chrome_tab_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @chrome/tab.js */ "./src/modules/chrome/tab.js");
/* harmony import */ var _chrome_alarm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @chrome/alarm.js */ "./src/modules/chrome/alarm.js");
/* harmony import */ var _chrome_cookie_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @chrome/cookie.js */ "./src/modules/chrome/cookie.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var collect = __webpack_require__(/*! collect.js */ "./node_modules/collect.js/dist/index.js");





var AppChromeServices = /*#__PURE__*/function () {
  function AppChromeServices() {
    _classCallCheck(this, AppChromeServices);

    this.tab = new _chrome_tab_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.alarm = new _chrome_alarm_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.cookie = new _chrome_cookie_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
  } //lắng nghe và nhận data


  _createClass(AppChromeServices, [{
    key: "listenerMessage",
    value: function listenerMessage(func) {
      logInfo('Lắng nghe được sự kiện chrome runtime');
      chrome.runtime.onMessage.addListener(func);
    } //gửi data

  }, {
    key: "sendMessage",
    value: function sendMessage(data) {
      var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (response) {
        return true;
      };
      logInfo('Gửi sự kiện chrome runtime: ', data);
      return new Promise(function (resolve, reject) {
        chrome.runtime.sendMessage(data, function () {
          resolve(func.apply(void 0, arguments));
        });
      });
    }
  }, {
    key: "getAllFrames",
    value: function getAllFrames(tabId) {
      var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (details) {
        if (!details) {
          // Invalid tabId
          // TODO: Handle invalid tab ID
          return collect([]);
        }

        var listIframe = details.filter(function (detail) {
          return detail.parentFrameId === 0;
        });
        return collect(listIframe);
      };
      return new Promise(function (resolve, reject) {
        chrome.webNavigation.getAllFrames({
          tabId: tabId
        }, function () {
          resolve(func.apply(void 0, arguments));
        });
      });
    }
  }, {
    key: "getAllFrames",
    value: function getAllFrames(tabId) {
      var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (details) {
        if (!details) {
          // Invalid tabId
          // TODO: Handle invalid tab ID
          return collect([]);
        }

        var listIframe = details.filter(function (detail) {
          return detail.parentFrameId === 0;
        });
        return collect(listIframe);
      };
      return new Promise(function (resolve, reject) {
        chrome.webNavigation.getAllFrames({
          tabId: tabId
        }, function () {
          resolve(func.apply(void 0, arguments));
        });
      });
    }
  }, {
    key: "listenerIFrames",
    value: function listenerIFrames(tabId) {
      return this.sendMessage({
        type: 'list-iframe',
        tabId: tabId
      }, function (res) {
        return res;
      });
    }
  }, {
    key: "addFrameOption",
    value: function addFrameOption() {
      chrome.webRequest.onHeadersReceived.addListener(function (info) {
        var headers = info.responseHeaders;

        for (var i = headers.length - 1; i >= 0; --i) {
          var header = headers[i].name.toLowerCase();

          if (header == 'x-frame-options' || header == 'frame-options') {
            headers.splice(i, 1); // Remove header
          }
        }

        return {
          responseHeaders: headers
        };
      }, {
        urls: ['*://*/*'],
        // Pattern to match all http(s) pages
        types: ['sub_frame']
      }, ['blocking', 'responseHeaders']);
    }
  }, {
    key: "logout",
    value: function logout() {
      return ChromeServices.sendMessage({
        type: 'logout'
      }, function (res) {
        return res;
      });
    }
  }]);

  return AppChromeServices;
}();



/***/ }),

/***/ "./src/modules/chrome/tab.js":
/*!***********************************!*\
  !*** ./src/modules/chrome/tab.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ChromeTab; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var collect = __webpack_require__(/*! collect.js */ "./node_modules/collect.js/dist/index.js");

var ChromeTab = /*#__PURE__*/function () {
  function ChromeTab() {
    _classCallCheck(this, ChromeTab);
  } //mở tap mới với url và trả về id tab


  _createClass(ChromeTab, [{
    key: "newTab",
    value: function newTab(url) {
      return new Promise(function (resolve, reject) {
        chrome.tabs.create({
          "url": url
        }, function (newTab) {
          logInfo("tab mới có id là: " + newTab.id);
          resolve(newTab.id);
        });
      });
    } // lấy id của tab hiện tại. dành cho trang quản trị extension

  }, {
    key: "getIdCurrentTab",
    value: function getIdCurrentTab() {
      return new Promise(function (resolve, reject) {
        chrome.tabs.query({
          active: true,
          currentWindow: true
        }, /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(tabs) {
            var tabId;
            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!chrome.runtime.lastError) {
                      _context.next = 3;
                      break;
                    }

                    resolve(undefined);
                    return _context.abrupt("return");

                  case 3:
                    tabId = tabs[0].id;
                    logInfo("tab hiện tại có id là: " + tabId);
                    resolve(tabId);

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
      });
    } // lấy id của tab hiện tại . dành cho trang thường không phải trang trang quản trị

  }, {
    key: "listenIdCurrentTab",
    value: function listenIdCurrentTab() {
      return ChromeServices.sendMessage({
        type: 'getTabId'
      }, function (res) {
        logInfo("tab hiện tại có id là: " + res.tabId);
        return res.tabId;
      });
    }
  }, {
    key: "existsTabId",
    value: function existsTabId(id) {
      return new Promise(function (resolve, reject) {
        chrome.tabs.get(id, function () {
          if (chrome.runtime.lastError) {
            resolve(false);
            return;
          } else {
            resolve(true);
          }
        });
      });
    }
  }, {
    key: "remove",
    value: function remove(id) {
      return new Promise(function (resolve, reject) {
        chrome.tabs.remove(id, function () {
          if (chrome.runtime.lastError) {
            resolve(undefined);
            return;
          }

          resolve(true);
        });
      });
    }
  }, {
    key: "whereUrl",
    value: function whereUrl(url1) {
      return new Promise(function (resolve, reject) {
        chrome.tabs.query({
          url: url1
        }, function (tabs) {
          resolve(tabs);
        });
      });
    }
  }, {
    key: "currentTab",
    value: function currentTab(url1) {
      return new Promise(function (resolve, reject) {
        chrome.tabs.query({
          active: true,
          currentWindow: true
        }, function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 1),
              currentTab = _ref3[0];

          resolve(currentTab);
        });
      });
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(tabId, _sendMessage) {
      return new Promise(function (resolve, reject) {
        chrome.tabs.sendMessage(tabId, _sendMessage, function (tabs) {
          if (chrome.runtime.lastError) {
            resolve(undefined);
          } else {
            resolve(tabs);
          }
        });
      });
    }
  }]);

  return ChromeTab;
}();



/***/ }),

/***/ "./src/modules/common/auth.js":
/*!************************************!*\
  !*** ./src/modules/common/auth.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Auth; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @helpers/storage */ "./src/helpers/storage.js");
/* harmony import */ var _models_trigger_action_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @models/trigger-action.js */ "./src/models/trigger-action.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Auth = /*#__PURE__*/function () {
  function Auth() {
    _classCallCheck(this, Auth);
  }

  _createClass(Auth, [{
    key: "logout",
    value: function () {
      var _logout = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var dbData, triggerAction;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                logInfo('logout');

                if (getValueOfKey(Settings.getData(), 'processingTabId', false)) {
                  chrome.tabs.remove(Settings.getProcessingTabId(), function () {});
                }

                _context.next = 4;
                return Settings.removeData();

              case 4:
                _context.next = 6;
                return _helpers_storage__WEBPACK_IMPORTED_MODULE_1__["default"].show();

              case 6:
                dbData = _context.sent;
                Object.keys(dbData).forEach(function (key) {
                  dbData[key] = null;
                });
                _context.next = 10;
                return _helpers_storage__WEBPACK_IMPORTED_MODULE_1__["default"].setStorage(dbData);

              case 10:
                triggerAction = new _models_trigger_action_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
                _context.next = 13;
                return triggerAction.truncate();

              case 13:
                if (!(extPageType === 'background')) {
                  _context.next = 18;
                  break;
                }

                _context.next = 16;
                return ChromeServices.tab.newTab('login.html');

              case 16:
                _context.next = 19;
                break;

              case 18:
                if (extPageType === 'option') {
                  appRedirect('login.html');
                }

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function logout() {
        return _logout.apply(this, arguments);
      }

      return logout;
    }()
  }]);

  return Auth;
}();



/***/ }),

/***/ "./src/modules/common/my-codding.js":
/*!******************************************!*\
  !*** ./src/modules/common/my-codding.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MyCodding; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MyCodding = /*#__PURE__*/function () {
  function MyCodding() {
    _classCallCheck(this, MyCodding);
  }

  _createClass(MyCodding, [{
    key: "encryptionKeyObj",
    value: function encryptionKeyObj(type) {
      var encryptionKey = AppConfigs.ENCRYPTION_KEY;
      var encryptionKey2 = encryptionKey.slice(5) + encryptionKey.slice(0, 5);
      var lengthKey = encryptionKey.length;
      this.encryptionObj = {};

      for (var i = 0; i < lengthKey; i++) {
        if (type === 'encryp') {
          this.encryptionObj[encryptionKey[i]] = encryptionKey2[i];
        } else {
          this.encryptionObj[encryptionKey2[i]] = encryptionKey[i];
        }
      }

      return this.encryptionObj;
    }
  }, {
    key: "encryptionStr",
    value: function encryptionStr(strInput, type) {
      var objKey = this.encryptionKeyObj(type);
      var arrInput = strInput.split('');
      var strOutput = '';

      for (var i = 0; i < arrInput.length; i++) {
        strOutput += getValueOfKey(objKey, arrInput[i], arrInput[i]);
      }

      return strOutput;
    }
  }, {
    key: "encryp",
    value: function encryp(dataInput) {
      if (!isset(dataInput)) {
        return dataInput;
      }

      if (isObject(dataInput)) {
        dataInput = JSON.stringify(dataInput);
      }

      var encode = this.encryptionStr(dataInput, 'encryp');
      return this.encryptionStr(encode, 'encryp');
    }
  }, {
    key: "decryp",
    value: function decryp(encode) {
      if (!isset(encode)) {
        return encode;
      }

      var decryp = this.encryptionStr(encode, 'decryp');
      var result = this.encryptionStr(decryp, 'decryp');

      try {
        return JSON.parse(result);
      } catch (e) {//  console.log(e);
      }

      return result;
    }
  }, {
    key: "fakeEncryp",
    value: function fakeEncryp(length) {
      var result = [];
      var characters = AppConfigs.ENCRYPTION_KEY;
      var charactersLength = characters.length;

      for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
      }

      return result.join('');
    }
  }]);

  return MyCodding;
}();



/***/ }),

/***/ 0:
/*!*************************************************************************!*\
  !*** multi ./src/helpers/global.js ./src/app/ext-landing/background.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\xampp\htdocs\marketing-tool\src\helpers\global.js */"./src/helpers/global.js");
module.exports = __webpack_require__(/*! C:\xampp\htdocs\marketing-tool\src\app\ext-landing\background.js */"./src/app/ext-landing/background.js");


/***/ })

/******/ });