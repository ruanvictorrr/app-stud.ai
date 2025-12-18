module.exports = {

"[externals]/crypto [external] (crypto, cjs, async loader)": ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.resolve().then(() => {
        return parentImport("[externals]/crypto [external] (crypto, cjs)");
    });
});
}),
"[project]/node_modules/https-proxy-agent/dist/index.js [app-route] (ecmascript, async loader)": ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/[root-of-the-server]__91057398._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/node_modules/https-proxy-agent/dist/index.js [app-route] (ecmascript)");
    });
});
}),
"[project]/node_modules/gaxios/node_modules/node-fetch/src/index.js [app-route] (ecmascript, async loader)": ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/274c0_node-fetch_src_utils_multipart-parser_83e6f8ee.js",
  "server/chunks/node_modules_bd3c9f1c._.js",
  "server/chunks/[root-of-the-server]__a9a5f086._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/node_modules/gaxios/node_modules/node-fetch/src/index.js [app-route] (ecmascript)");
    });
});
}),

};