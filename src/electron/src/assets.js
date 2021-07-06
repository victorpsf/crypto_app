export function isDevelopment() {
    return process.env.NODE_ENV === 'development'
}

export function isProduction() {
    return process.env.NODE_ENV === 'production'
}

export function isTest() {
    return process.env.IS_TEST === 'true'
}

export function webPackDevServerUrl() {
    return process.env.WEBPACK_DEV_SERVER_URL
}

export function webPackDevServerUrlExists() {
    return !!(webPackDevServerUrl())
}