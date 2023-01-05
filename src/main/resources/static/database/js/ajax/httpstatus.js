"use strict";

const HTTP_STATUS_VER = "1.0.0";

const HttpStatus = {};

// --- 1xx Informational ---
Object.defineProperty(HttpStatus, "SC_CONTINUE", { value: 100, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_SWITCHING_PROTOCOLS", { value: 101, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_PROCESSING", { value: 102, writable: false, enumerable: true, configurable: true });

// --- 2xx Success ---
Object.defineProperty(HttpStatus, "SC_OK", { value: 200, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_CREATED", { value: 201, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_ACCEPTED", { value: 202, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_NON_AUTHORITATIVE_INFORMATION", { value: 203, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_NO_CONTENT", { value: 204, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_RESET_CONTENT", { value: 205, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_PARTIAL_CONTENT", { value: 206, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_MULTI_STATUS", { value: 207, writable: false, enumerable: true, configurable: true });

// --- 3xx Redirection ---
Object.defineProperty(HttpStatus, "SC_MULTIPLE_CHOICES", { value: 300, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_MOVED_PERMANENTLY", { value: 301, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_MOVED_TEMPORARILY", { value: 302, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_SEE_OTHER", { value: 303, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_NOT_MODIFIED", { value: 304, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_USE_PROXY", { value: 305, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_TEMPORARY_REDIRECT", { value: 307, writable: false, enumerable: true, configurable: true });

// --- 4xx Client Error ---
Object.defineProperty(HttpStatus, "SC_BAD_REQUEST", { value: 400, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_UNAUTHORIZED", { value: 401, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_PAYMENT_REQUIRED", { value: 402, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_FORBIDDEN", { value: 403, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_NOT_FOUND", { value: 404, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_METHOD_NOT_ALLOWED", { value: 405, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_NOT_ACCEPTABLE", { value: 406, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_PROXY_AUTHENTICATION_REQUIRED", { value: 407, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_REQUEST_TIMEOUT", { value: 408, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_CONFLICT", { value: 409, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_GONE", { value: 410, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_LENGTH_REQUIRED", { value: 411, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_PRECONDITION_FAILED", { value: 412, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_REQUEST_TOO_LONG", { value: 413, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_REQUEST_URI_TOO_LONG", { value: 414, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_UNSUPPORTED_MEDIA_TYPE", { value: 415, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_REQUESTED_RANGE_NOT_SATISFIABLE", { value: 416, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_EXPECTATION_FAILED", { value: 417, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_INSUFFICIENT_SPACE_ON_RESOURCE", { value: 419, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_METHOD_FAILURE", { value: 420, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_UNPROCESSABLE_ENTITY", { value: 422, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_LOCKED", { value: 423, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_FAILED_DEPENDENCY", { value: 424, writable: false, enumerable: true, configurable: true });
// --- 5xx Server Error ---
Object.defineProperty(HttpStatus, "SC_INTERNAL_SERVER_ERROR", { value: 500, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_NOT_IMPLEMENTED", { value: 501, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_BAD_GATEWAY", { value: 502, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_SERVICE_UNAVAILABLE", { value: 503, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_GATEWAY_TIMEOUT", { value: 504, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_HTTP_VERSION_NOT_SUPPORTED", { value: 505, writable: false, enumerable: true, configurable: true });
Object.defineProperty(HttpStatus, "SC_INSUFFICIENT_STORAGE", { value: 507, writable: false, enumerable: true, configurable: true });
