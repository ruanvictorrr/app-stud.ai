(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/lib/studyMaterialStore.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// src/lib/studyMaterialStore.ts
__turbopack_context__.s({
    "clearMaterial": ()=>clearMaterial,
    "loadMaterial": ()=>loadMaterial,
    "normalizeFromApi": ()=>normalizeFromApi,
    "onMaterialUpdated": ()=>onMaterialUpdated,
    "saveMaterial": ()=>saveMaterial
});
const STORAGE_KEY = "studai:lastMaterial:v1";
const EVENT_NAME = "studai:material_updated";
function normalizeFromApi(payload) {
    var _payload_meta;
    var _payload_data;
    // aceita:
    // - { success:true, data:{...} }
    // - { topic, flashcards, summary }
    const data = (_payload_data = payload === null || payload === void 0 ? void 0 : payload.data) !== null && _payload_data !== void 0 ? _payload_data : payload;
    const topic = data === null || data === void 0 ? void 0 : data.topic;
    const flashcards = data === null || data === void 0 ? void 0 : data.flashcards;
    const summary = data === null || data === void 0 ? void 0 : data.summary;
    if (!topic || !Array.isArray(flashcards) || !summary) return null;
    if (typeof (summary === null || summary === void 0 ? void 0 : summary.title) !== "string" || !Array.isArray(summary === null || summary === void 0 ? void 0 : summary.mainTopics) || !Array.isArray(summary === null || summary === void 0 ? void 0 : summary.keyPoints)) {
        return null;
    }
    var _payload_meta_materialId, _ref;
    return {
        topic,
        flashcards,
        summary,
        materialId: (_ref = (_payload_meta_materialId = payload === null || payload === void 0 ? void 0 : (_payload_meta = payload.meta) === null || _payload_meta === void 0 ? void 0 : _payload_meta.materialId) !== null && _payload_meta_materialId !== void 0 ? _payload_meta_materialId : payload === null || payload === void 0 ? void 0 : payload.materialId) !== null && _ref !== void 0 ? _ref : data === null || data === void 0 ? void 0 : data.materialId,
        createdAt: new Date().toISOString()
    };
}
function saveMaterial(material) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(material));
    window.dispatchEvent(new Event(EVENT_NAME));
}
function loadMaterial() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}
function clearMaterial() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(EVENT_NAME));
}
function onMaterialUpdated(cb) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const handler = ()=>cb();
    window.addEventListener(EVENT_NAME, handler);
    // também reage quando outro tab atualiza
    const storageHandler = (e)=>{
        if (e.key === STORAGE_KEY) cb();
    };
    window.addEventListener("storage", storageHandler);
    return ()=>{
        window.removeEventListener(EVENT_NAME, handler);
        window.removeEventListener("storage", storageHandler);
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/components/UploadSection.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>UploadSection
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyMaterialStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/studyMaterialStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function UploadSection(param) {
    let { onDataProcessed, onNavigate } = param;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isUploading, setIsUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [successInfo, setSuccessInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // opções (como você pediu)
    const [flashcardsCount, setFlashcardsCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10);
    const [difficulty, setDifficulty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("medium");
    const [summaryStyle, setSummaryStyle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("explained");
    const [topicsCount, setTopicsCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(4);
    // plano/limite
    const [usageLoading, setUsageLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [usage, setUsage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    async function loadUsage() {
        setUsageLoading(true);
        try {
            const res = await fetch("/api/usage/can-process", {
                cache: "no-store"
            });
            const json = await res.json();
            if (!res.ok || !(json === null || json === void 0 ? void 0 : json.success)) {
                setUsage(null);
                return;
            }
            var _json_monthlyUsed, _json_limit;
            setUsage({
                allowed: !!json.allowed,
                plan: json.plan,
                monthlyUsed: (_json_monthlyUsed = json.monthlyUsed) !== null && _json_monthlyUsed !== void 0 ? _json_monthlyUsed : null,
                limit: (_json_limit = json.limit) !== null && _json_limit !== void 0 ? _json_limit : null
            });
        } catch (e) {
            setUsage(null);
        } finally{
            setUsageLoading(false);
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UploadSection.useEffect": ()=>{
            loadUsage();
        }
    }["UploadSection.useEffect"], []);
    function onPickFile() {
        var _inputRef_current;
        (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.click();
    }
    async function onFileChange(e) {
        var _e_target_files;
        const file = (_e_target_files = e.target.files) === null || _e_target_files === void 0 ? void 0 : _e_target_files[0];
        if (!file) return;
        await handleUpload(file);
        e.target.value = "";
    }
    async function onDrop(e) {
        var _e_dataTransfer_files;
        e.preventDefault();
        const file = (_e_dataTransfer_files = e.dataTransfer.files) === null || _e_dataTransfer_files === void 0 ? void 0 : _e_dataTransfer_files[0];
        if (!file) return;
        await handleUpload(file);
    }
    function onDragOver(e) {
        e.preventDefault();
    }
    async function handleUpload(file) {
        setError(null);
        setSuccessInfo(null);
        await loadUsage();
        // se não está logado
        if (!usage && !usageLoading) {
            setError("Você precisa estar logado para enviar arquivos.");
            router.push("/login");
            return;
        }
        // se FREE e estourou
        if ((usage === null || usage === void 0 ? void 0 : usage.plan) === "FREE" && usage.allowed === false) {
            setError("Você atingiu o limite do plano grátis. Faça upgrade para continuar.");
            return;
        }
        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            // envia opções pro backend
            formData.append("flashcardsCount", String(flashcardsCount));
            formData.append("flashcardDifficulty", difficulty);
            formData.append("summaryStyle", summaryStyle);
            formData.append("topicsCount", String(topicsCount));
            const response = await fetch("/api/process-study-material", {
                method: "POST",
                body: formData
            });
            const json = await response.json();
            if (!response.ok || !(json === null || json === void 0 ? void 0 : json.success)) {
                if ((json === null || json === void 0 ? void 0 : json.code) === "LIMIT_REACHED") {
                    setError("Você atingiu o limite do plano grátis. Faça upgrade para continuar.");
                    await loadUsage();
                    return;
                }
                if (response.status === 401) {
                    setError("Você precisa estar logado para enviar arquivos.");
                    router.push("/login");
                    return;
                }
                throw new Error((json === null || json === void 0 ? void 0 : json.details) || (json === null || json === void 0 ? void 0 : json.error) || "Falha ao processar arquivo");
            }
            const material = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyMaterialStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeFromApi"])(json);
            if (!material) {
                throw new Error("Resposta inválida: faltou topic/flashcards/summary.");
            }
            // 🔥 PERSISTÊNCIA (não some ao mudar de página/seção)
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyMaterialStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveMaterial"])(material);
            // atualiza estado do app
            onDataProcessed === null || onDataProcessed === void 0 ? void 0 : onDataProcessed(material);
            // UI de sucesso + botões
            setSuccessInfo({
                topic: material.topic
            });
            await loadUsage();
        } catch (e) {
            setError((e === null || e === void 0 ? void 0 : e.message) || "Erro inesperado");
        } finally{
            setIsUploading(false);
        }
    }
    // FREE meter
    const showFreeMeter = (usage === null || usage === void 0 ? void 0 : usage.plan) === "FREE" && usage.limit != null && usage.monthlyUsed != null;
    const used = showFreeMeter ? usage.monthlyUsed : 0;
    const limit = showFreeMeter ? usage.limit : 0;
    const pct = showFreeMeter ? Math.min(100, Math.round(used / Math.max(1, limit) * 100)) : 0;
    const isBlockedFree = (usage === null || usage === void 0 ? void 0 : usage.plan) === "FREE" && usage.allowed === false;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-4xl sm:text-5xl font-bold text-white",
                        children: "Transforme seus estudos"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/UploadSection.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 text-gray-400 max-w-2xl mx-auto",
                        children: "Faça upload de fotos, PDFs ou documentos e deixe a IA criar flashcards e resumos inteligentes para você."
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/UploadSection.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/UploadSection.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 flex flex-col gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-300",
                                children: usageLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-500",
                                    children: "Carregando plano…"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/UploadSection.tsx",
                                    lineNumber: 193,
                                    columnNumber: 15
                                }, this) : usage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-500",
                                            children: "Plano:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/UploadSection.tsx",
                                            lineNumber: 196,
                                            columnNumber: 17
                                        }, this),
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: usage.plan === "FREE" ? "text-gray-200 font-semibold" : "text-[#00FF8B] font-semibold",
                                            children: usage.plan
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/UploadSection.tsx",
                                            lineNumber: 197,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-500",
                                    children: "Faça login para enviar arquivos."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/UploadSection.tsx",
                                    lineNumber: 202,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 191,
                                columnNumber: 11
                            }, this),
                            !usageLoading && !usage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push("/login"),
                                className: "rounded-xl bg-[#00FF8B] text-black font-semibold px-4 py-2 hover:opacity-90",
                                children: "Entrar"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 207,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/UploadSection.tsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this),
                    showFreeMeter ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-[#1A1A1A] bg-[#0F0F0F] p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-gray-300",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-500",
                                                children: "Uso mensal (FREE):"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                                lineNumber: 220,
                                                columnNumber: 17
                                            }, this),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-white",
                                                children: [
                                                    used,
                                                    "/",
                                                    limit
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                                lineNumber: 221,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/UploadSection.tsx",
                                        lineNumber: 219,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-500",
                                        children: [
                                            pct,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/UploadSection.tsx",
                                        lineNumber: 225,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 218,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 h-2 w-full rounded-full bg-[#151515] overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full bg-[#00FF8B]",
                                    style: {
                                        width: "".concat(pct, "%")
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/UploadSection.tsx",
                                    lineNumber: 229,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 228,
                                columnNumber: 13
                            }, this),
                            isBlockedFree ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 text-sm text-red-200",
                                children: "Limite atingido. Vá para a página de planos."
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 233,
                                columnNumber: 15
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/UploadSection.tsx",
                        lineNumber: 217,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/UploadSection.tsx",
                lineNumber: 189,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 grid grid-cols-1 lg:grid-cols-2 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-[#1A1A1A] bg-[#0F0F0F] p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm font-semibold text-white",
                                        children: "Quantidade de flashcards"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/UploadSection.tsx",
                                        lineNumber: 245,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-gray-200",
                                        children: flashcardsCount
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/UploadSection.tsx",
                                        lineNumber: 246,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 244,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "range",
                                min: 5,
                                max: 30,
                                value: flashcardsCount,
                                onChange: (e)=>setFlashcardsCount(parseInt(e.target.value, 10)),
                                className: "w-full mt-3"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 248,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 text-xs text-gray-500",
                                children: "Entre 5 e 30"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 256,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 text-sm font-semibold text-white",
                                children: "Dificuldade dos flashcards"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 258,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                        active: difficulty === "easy",
                                        onClick: ()=>setDifficulty("easy"),
                                        label: "Fácil"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/UploadSection.tsx",
                                        lineNumber: 260,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                        active: difficulty === "medium",
                                        onClick: ()=>setDifficulty("medium"),
                                        label: "Médio"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/UploadSection.tsx",
                                        lineNumber: 265,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                        active: difficulty === "hard",
                                        onClick: ()=>setDifficulty("hard"),
                                        label: "Difícil"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/UploadSection.tsx",
                                        lineNumber: 270,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 259,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/UploadSection.tsx",
                        lineNumber: 243,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-[#1A1A1A] bg-[#0F0F0F] p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-semibold text-white",
                                children: "Tipo de resumo"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 279,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                        active: summaryStyle === "bullet",
                                        onClick: ()=>setSummaryStyle("bullet"),
                                        label: "Bullet"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/UploadSection.tsx",
                                        lineNumber: 281,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                        active: summaryStyle === "explained",
                                        onClick: ()=>setSummaryStyle("explained"),
                                        label: "Explicado"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/UploadSection.tsx",
                                        lineNumber: 286,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 280,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm font-semibold text-white",
                                        children: "Tópicos do resumo"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/UploadSection.tsx",
                                        lineNumber: 294,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-gray-200",
                                        children: topicsCount
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/UploadSection.tsx",
                                        lineNumber: 295,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 293,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "range",
                                min: 3,
                                max: 8,
                                value: topicsCount,
                                onChange: (e)=>setTopicsCount(parseInt(e.target.value, 10)),
                                className: "w-full mt-3"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 297,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 text-xs text-gray-500",
                                children: "Entre 3 e 8 tópicos"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 305,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/UploadSection.tsx",
                        lineNumber: 278,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/UploadSection.tsx",
                lineNumber: 242,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: inputRef,
                type: "file",
                className: "hidden",
                onChange: onFileChange,
                accept: "image/*,application/pdf,text/plain"
            }, void 0, false, {
                fileName: "[project]/src/app/components/UploadSection.tsx",
                lineNumber: 310,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onDrop: onDrop,
                onDragOver: onDragOver,
                className: "w-full rounded-2xl border border-dashed border-[#00FF8B]/40 bg-[#0F0F0F] p-10 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto w-14 h-14 rounded-full bg-[#00FF8B]/10 flex items-center justify-center mb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                            className: "w-6 h-6 text-[#00FF8B]"
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/UploadSection.tsx",
                            lineNumber: 324,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/UploadSection.tsx",
                        lineNumber: 323,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-lg font-semibold text-white",
                        children: "Arraste e solte seu arquivo aqui"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/UploadSection.tsx",
                        lineNumber: 327,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 text-sm text-gray-400",
                        children: "ou clique para selecionar"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/UploadSection.tsx",
                        lineNumber: 328,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 text-xs text-gray-500 flex justify-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Imagens"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 331,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "PDFs"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 332,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Documentos"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 333,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/UploadSection.tsx",
                        lineNumber: 330,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onPickFile,
                        disabled: isUploading || isBlockedFree,
                        className: "mt-6 inline-flex items-center justify-center rounded-xl border border-[#2A2A2A] px-5 py-2 text-gray-200 hover:bg-[#151515] disabled:opacity-60",
                        children: isUploading ? "Processando..." : "Selecionar arquivo"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/UploadSection.tsx",
                        lineNumber: 336,
                        columnNumber: 9
                    }, this),
                    error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 text-sm text-red-400",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/UploadSection.tsx",
                        lineNumber: 344,
                        columnNumber: 18
                    }, this) : null,
                    successInfo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 mx-auto max-w-xl rounded-2xl border border-[#00FF8B]/30 bg-[#0B1410] p-5 text-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-[#00FF8B] font-semibold",
                                children: "Concluído ✅"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 349,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 text-white font-semibold text-lg",
                                children: successInfo.topic
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 350,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 text-sm text-gray-300",
                                children: "Material salvo e disponível nas abas."
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 351,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 flex flex-col sm:flex-row gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onNavigate === null || onNavigate === void 0 ? void 0 : onNavigate("flashcards"),
                                        className: "flex-1 rounded-xl bg-[#00FF8B] text-black font-semibold px-4 py-2 hover:opacity-90",
                                        children: "Ir para Flashcards"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/UploadSection.tsx",
                                        lineNumber: 356,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onNavigate === null || onNavigate === void 0 ? void 0 : onNavigate("summary"),
                                        className: "flex-1 rounded-xl border border-[#00FF8B]/40 text-[#00FF8B] font-semibold px-4 py-2 hover:bg-[#00FF8B]/10",
                                        children: "Ir para Resumo"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/UploadSection.tsx",
                                        lineNumber: 362,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 355,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/UploadSection.tsx",
                        lineNumber: 348,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/UploadSection.tsx",
                lineNumber: 318,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 grid grid-cols-1 md:grid-cols-3 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeatureCard, {
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                            className: "w-5 h-5 text-[#00FF8B]"
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/UploadSection.tsx",
                            lineNumber: 376,
                            columnNumber: 17
                        }, void 0),
                        title: "Flashcards Inteligentes",
                        desc: "Perguntas e respostas geradas automaticamente"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/UploadSection.tsx",
                        lineNumber: 375,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeatureCard, {
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                            className: "w-5 h-5 text-[#00FF8B]"
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/UploadSection.tsx",
                            lineNumber: 381,
                            columnNumber: 17
                        }, void 0),
                        title: "Resumos Estruturados",
                        desc: "Conteúdo organizado em tópicos principais"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/UploadSection.tsx",
                        lineNumber: 380,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeatureCard, {
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                            className: "w-5 h-5 text-[#00FF8B]"
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/UploadSection.tsx",
                            lineNumber: 386,
                            columnNumber: 17
                        }, void 0),
                        title: "Acompanhe seu Progresso",
                        desc: "Visualize sua evolução nos estudos"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/UploadSection.tsx",
                        lineNumber: 385,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/UploadSection.tsx",
                lineNumber: 374,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/UploadSection.tsx",
        lineNumber: 177,
        columnNumber: 5
    }, this);
}
_s(UploadSection, "rYEtaEAfBBMiRFgT0hZiLORloFw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = UploadSection;
function Pill(param) {
    let { active, onClick, label } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        className: active ? "px-3 py-2 rounded-xl bg-[#00FF8B]/10 text-[#00FF8B] border border-[#00FF8B]/30 text-sm font-semibold" : "px-3 py-2 rounded-xl bg-[#141414] text-gray-300 border border-[#2A2A2A] text-sm hover:bg-[#1A1A1A]",
        children: label
    }, void 0, false, {
        fileName: "[project]/src/app/components/UploadSection.tsx",
        lineNumber: 397,
        columnNumber: 5
    }, this);
}
_c1 = Pill;
function FeatureCard(param) {
    let { icon, title, desc } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl border border-[#1A1A1A] bg-[#0F0F0F] p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    icon,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-white font-semibold",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/UploadSection.tsx",
                        lineNumber: 416,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/UploadSection.tsx",
                lineNumber: 414,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 text-sm text-gray-400",
                children: desc
            }, void 0, false, {
                fileName: "[project]/src/app/components/UploadSection.tsx",
                lineNumber: 418,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/UploadSection.tsx",
        lineNumber: 413,
        columnNumber: 5
    }, this);
}
_c2 = FeatureCard;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "UploadSection");
__turbopack_context__.k.register(_c1, "Pill");
__turbopack_context__.k.register(_c2, "FeatureCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/studyProgressStore.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "clearProgress": ()=>clearProgress,
    "loadProgress": ()=>loadProgress,
    "makeProgressKey": ()=>makeProgressKey,
    "makeProgressKeyForDoc": ()=>makeProgressKeyForDoc,
    "onProgressUpdated": ()=>onProgressUpdated,
    "saveProgress": ()=>saveProgress
});
"use client";
const LS_PREFIX = "studai:progress:v1:";
function safeParse(s) {
    if (!s) return null;
    try {
        return JSON.parse(s);
    } catch (e) {
        return null;
    }
}
function emit(key) {
    // evento custom local + evento nativo storage
    window.dispatchEvent(new CustomEvent("studai:progress-updated", {
        detail: {
            key
        }
    }));
}
function makeProgressKey(userId, materialId) {
    return "".concat(LS_PREFIX).concat(userId, ":").concat(materialId);
}
function makeProgressKeyForDoc(userId, docId) {
    return "".concat(LS_PREFIX).concat(userId, ":doc:").concat(docId);
}
function loadProgress(key) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return safeParse(localStorage.getItem(key));
}
function saveProgress(key, progress) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.setItem(key, JSON.stringify({
        knownIds: Array.from(new Set(progress.knownIds || [])),
        reviewIds: Array.from(new Set(progress.reviewIds || [])),
        currentIndex: Number.isFinite(progress.currentIndex) ? progress.currentIndex : 0,
        updatedAt: Date.now()
    }));
    emit(key);
}
function clearProgress(key) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.removeItem(key);
    emit(key);
}
function onProgressUpdated(cb) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const handler = (ev)=>{
        var _anyEv_detail;
        const anyEv = ev;
        const key = anyEv === null || anyEv === void 0 ? void 0 : (_anyEv_detail = anyEv.detail) === null || _anyEv_detail === void 0 ? void 0 : _anyEv_detail.key;
        if (typeof key === "string") cb(key);
    };
    window.addEventListener("studai:progress-updated", handler);
    // também escuta mudanças do localStorage (outra aba)
    const storageHandler = (ev)=>{
        if (!ev.key) return;
        if (ev.key.startsWith(LS_PREFIX)) cb(ev.key);
    };
    window.addEventListener("storage", storageHandler);
    return ()=>{
        window.removeEventListener("studai:progress-updated", handler);
        window.removeEventListener("storage", storageHandler);
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/studySessionStore.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "clearSessions": ()=>clearSessions,
    "endSession": ()=>endSession,
    "listSessions": ()=>listSessions,
    "onSessionsUpdated": ()=>onSessionsUpdated,
    "recordSessionAction": ()=>recordSessionAction,
    "startSession": ()=>startSession
});
const KEY = "studai:sessions:v1";
const listeners = new Set();
function emit() {
    for (const fn of listeners){
        try {
            fn();
        } catch (e) {}
    }
}
function safeParse(raw) {
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}
function uid() {
    // browser + fallback
    // @ts-ignore
    return typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : "sess_".concat(Date.now(), "_").concat(Math.random().toString(16).slice(2));
}
function readAll() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    var _safeParse;
    return (_safeParse = safeParse(localStorage.getItem(KEY))) !== null && _safeParse !== void 0 ? _safeParse : [];
}
function writeAll(list) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.setItem(KEY, JSON.stringify(list));
    emit();
}
function startSession(params) {
    const s = {
        id: uid(),
        docId: params.docId,
        startedAt: new Date().toISOString(),
        mode: params.mode,
        sessionSize: params.sessionSize,
        knownCount: 0,
        reviewCount: 0,
        answeredCount: 0
    };
    const all = readAll();
    all.unshift(s);
    writeAll(all);
    return s.id;
}
function recordSessionAction(sessionId, action) {
    const all = readAll();
    const i = all.findIndex((x)=>x.id === sessionId);
    if (i < 0) return;
    const s = all[i];
    const next = {
        ...s,
        knownCount: action === "known" ? s.knownCount + 1 : s.knownCount,
        reviewCount: action === "review" ? s.reviewCount + 1 : s.reviewCount,
        answeredCount: s.answeredCount + 1
    };
    all[i] = next;
    writeAll(all);
}
function endSession(sessionId) {
    const all = readAll();
    const i = all.findIndex((x)=>x.id === sessionId);
    if (i < 0) return;
    const s = all[i];
    const endedAt = new Date().toISOString();
    const durationSec = Math.max(0, Math.round((new Date(endedAt).getTime() - new Date(s.startedAt).getTime()) / 1000));
    const denom = s.knownCount + s.reviewCount;
    const accuracyPct = denom > 0 ? Math.round(s.knownCount / denom * 100) : 0;
    all[i] = {
        ...s,
        endedAt,
        durationSec,
        accuracyPct
    };
    writeAll(all);
}
function listSessions(docId) {
    const all = readAll();
    const filtered = docId ? all.filter((s)=>s.docId === docId) : all;
    // ordena mais recente primeiro
    return filtered.sort((a, b)=>(b.startedAt || "").localeCompare(a.startedAt || ""));
}
function onSessionsUpdated(cb) {
    listeners.add(cb);
    return ()=>listeners.delete(cb);
}
function clearSessions(docId) {
    const all = readAll();
    if (!docId) {
        writeAll([]);
        return;
    }
    writeAll(all.filter((s)=>s.docId !== docId));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/components/FlashcardsSection.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>FlashcardsSection
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyMaterialStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/studyMaterialStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyProgressStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/studyProgressStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studySessionStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/studySessionStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$stop$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__StopCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-stop.js [app-client] (ecmascript) <export default as StopCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-client] (ecmascript) <export default as SlidersHorizontal>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function cn() {
    for(var _len = arguments.length, s = new Array(_len), _key = 0; _key < _len; _key++){
        s[_key] = arguments[_key];
    }
    return s.filter(Boolean).join(" ");
}
function pct(n) {
    return Math.max(0, Math.min(100, Math.round(n)));
}
function shuffle(arr) {
    const a = [
        ...arr
    ];
    for(let i = a.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [
            a[j],
            a[i]
        ];
    }
    return a;
}
function FlashcardsSection(_props) {
    _s();
    const [topic, setTopic] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [cards, setCards] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [docId, setDocId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("deck");
    const [isFlipped, setIsFlipped] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [index, setIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [knownIds, setKnownIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [reviewIds, setReviewIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [sessionSize, setSessionSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10);
    const [sessionActive, setSessionActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sessionQueue, setSessionQueue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [sessionIndex, setSessionIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [sessionId, setSessionId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // ---------- Progress keys (doc + legacy) ----------
    const legacyKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FlashcardsSection.useMemo[legacyKey]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyProgressStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeProgressKey"])(topic || "deck", cards.length || 0)
    }["FlashcardsSection.useMemo[legacyKey]"], [
        topic,
        cards.length
    ]);
    const docKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FlashcardsSection.useMemo[docKey]": ()=>docId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyProgressStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeProgressKeyForDoc"])(docId) : ""
    }["FlashcardsSection.useMemo[docKey]"], [
        docId
    ]);
    // ---------- Load material + progress ----------
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FlashcardsSection.useEffect": ()=>{
            const refresh = {
                "FlashcardsSection.useEffect.refresh": ()=>{
                    var _m_flashcards;
                    const m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyMaterialStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadMaterial"])();
                    var _m_topic;
                    setTopic((_m_topic = m === null || m === void 0 ? void 0 : m.topic) !== null && _m_topic !== void 0 ? _m_topic : "");
                    var _m_flashcards1;
                    setCards((_m_flashcards1 = m === null || m === void 0 ? void 0 : m.flashcards) !== null && _m_flashcards1 !== void 0 ? _m_flashcards1 : []);
                    var _m_docId;
                    setDocId((_m_docId = m === null || m === void 0 ? void 0 : m.docId) !== null && _m_docId !== void 0 ? _m_docId : "");
                    // carrega progresso: primeiro por docId, depois fallback legacy
                    const pDoc = (m === null || m === void 0 ? void 0 : m.docId) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyProgressStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadProgress"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyProgressStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeProgressKeyForDoc"])(m.docId)) : null;
                    var _m_topic1, _m_flashcards_length;
                    const pLegacy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyProgressStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadProgress"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyProgressStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeProgressKey"])((_m_topic1 = m === null || m === void 0 ? void 0 : m.topic) !== null && _m_topic1 !== void 0 ? _m_topic1 : "deck", (_m_flashcards_length = m === null || m === void 0 ? void 0 : (_m_flashcards = m.flashcards) === null || _m_flashcards === void 0 ? void 0 : _m_flashcards.length) !== null && _m_flashcards_length !== void 0 ? _m_flashcards_length : 0));
                    const p = pDoc !== null && pDoc !== void 0 ? pDoc : pLegacy;
                    var _p_knownIds;
                    setKnownIds((_p_knownIds = p === null || p === void 0 ? void 0 : p.knownIds) !== null && _p_knownIds !== void 0 ? _p_knownIds : []);
                    var _p_reviewIds;
                    setReviewIds((_p_reviewIds = p === null || p === void 0 ? void 0 : p.reviewIds) !== null && _p_reviewIds !== void 0 ? _p_reviewIds : []);
                    setFilter("all");
                    setMode("deck");
                    setIndex(0);
                    setIsFlipped(false);
                    setSessionActive(false);
                    setSessionQueue([]);
                    setSessionIndex(0);
                    setSessionId(null);
                }
            }["FlashcardsSection.useEffect.refresh"];
            refresh();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyMaterialStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onMaterialUpdated"])(refresh);
        }
    }["FlashcardsSection.useEffect"], []);
    const knownSet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FlashcardsSection.useMemo[knownSet]": ()=>new Set(knownIds)
    }["FlashcardsSection.useMemo[knownSet]"], [
        knownIds
    ]);
    const reviewSet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FlashcardsSection.useMemo[reviewSet]": ()=>new Set(reviewIds)
    }["FlashcardsSection.useMemo[reviewSet]"], [
        reviewIds
    ]);
    // ---------- Filtered deck (deck mode) ----------
    const filteredCards = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FlashcardsSection.useMemo[filteredCards]": ()=>{
            if (filter === "known") return cards.filter({
                "FlashcardsSection.useMemo[filteredCards]": (c)=>knownSet.has(c.id)
            }["FlashcardsSection.useMemo[filteredCards]"]);
            if (filter === "review") return cards.filter({
                "FlashcardsSection.useMemo[filteredCards]": (c)=>reviewSet.has(c.id)
            }["FlashcardsSection.useMemo[filteredCards]"]);
            return cards;
        }
    }["FlashcardsSection.useMemo[filteredCards]"], [
        cards,
        filter,
        knownSet,
        reviewSet
    ]);
    // ---------- Active list (deck or session) ----------
    const activeList = sessionActive ? sessionQueue : filteredCards;
    const activeIndex = sessionActive ? sessionIndex : index;
    var _activeList_activeIndex;
    const current = (_activeList_activeIndex = activeList[activeIndex]) !== null && _activeList_activeIndex !== void 0 ? _activeList_activeIndex : null;
    // ---------- Overall progress ----------
    const doneCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FlashcardsSection.useMemo[doneCount]": ()=>{
            const s = new Set([
                ...knownIds,
                ...reviewIds
            ]);
            return s.size;
        }
    }["FlashcardsSection.useMemo[doneCount]"], [
        knownIds,
        reviewIds
    ]);
    const progressPct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FlashcardsSection.useMemo[progressPct]": ()=>{
            const total = cards.length || 0;
            return total ? pct(doneCount / total * 100) : 0;
        }
    }["FlashcardsSection.useMemo[progressPct]"], [
        doneCount,
        cards.length
    ]);
    const accuracyPct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FlashcardsSection.useMemo[accuracyPct]": ()=>{
            const k = knownIds.length;
            const r = reviewIds.length;
            return k + r ? pct(k / (k + r) * 100) : 0;
        }
    }["FlashcardsSection.useMemo[accuracyPct]"], [
        knownIds.length,
        reviewIds.length
    ]);
    // ---------- Save progress (doc + legacy) ----------
    const persistProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FlashcardsSection.useCallback[persistProgress]": (nextKnown, nextReview)=>{
            const payload = {
                knownIds: nextKnown,
                reviewIds: nextReview,
                updatedAt: new Date().toISOString()
            };
            // salva por docId (novo)
            if (docKey) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyProgressStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveProgress"])(docKey, payload);
            // salva também no legacy para compatibilidade com telas antigas
            if (legacyKey) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyProgressStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveProgress"])(legacyKey, payload);
        }
    }["FlashcardsSection.useCallback[persistProgress]"], [
        docKey,
        legacyKey
    ]);
    // ---------- Helpers ----------
    function safeSetDeckIndex(next) {
        const total = filteredCards.length;
        if (!total) return setIndex(0);
        const clamped = Math.max(0, Math.min(total - 1, next));
        setIndex(clamped);
    }
    function safeSetSessionIndex(next) {
        const total = sessionQueue.length;
        if (!total) return setSessionIndex(0);
        const clamped = Math.max(0, Math.min(total - 1, next));
        setSessionIndex(clamped);
    }
    function goNext() {
        setIsFlipped(false);
        if (sessionActive) safeSetSessionIndex(sessionIndex + 1);
        else safeSetDeckIndex(index + 1);
    }
    function goPrev() {
        setIsFlipped(false);
        if (sessionActive) safeSetSessionIndex(sessionIndex - 1);
        else safeSetDeckIndex(index - 1);
    }
    // ---------- Session build ----------
    function buildSessionDeck(size) {
        const total = cards.length;
        const want = Math.max(1, Math.min(total || 1, Math.trunc(size || 10)));
        // prioridade: não respondidos -> review -> resto
        const notDone = cards.filter((c)=>!knownSet.has(c.id) && !reviewSet.has(c.id));
        const review = cards.filter((c)=>reviewSet.has(c.id));
        const rest = cards.filter((c)=>knownSet.has(c.id));
        const pool = [
            ...shuffle(notDone),
            ...shuffle(review),
            ...shuffle(rest)
        ];
        return pool.slice(0, want);
    }
    function startNewSession() {
        if (!cards.length || !docId) return;
        const deck = buildSessionDeck(sessionSize);
        setMode("session");
        setSessionQueue(deck);
        setSessionIndex(0);
        setIsFlipped(false);
        setSessionActive(true);
        const sid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studySessionStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSession"])({
            docId,
            mode: "session",
            sessionSize: deck.length
        });
        setSessionId(sid);
    }
    function stopSession() {
        if (sessionId) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studySessionStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endSession"])(sessionId);
        setSessionActive(false);
        setSessionQueue([]);
        setSessionIndex(0);
        setSessionId(null);
        setIsFlipped(false);
        setMode("deck");
    }
    // ---------- Mark actions ----------
    const markKnown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FlashcardsSection.useCallback[markKnown]": ()=>{
            if (!current) return;
            const nextKnownSet = new Set(knownIds);
            const nextReviewSet = new Set(reviewIds);
            nextKnownSet.add(current.id);
            nextReviewSet.delete(current.id);
            const nextKnown = Array.from(nextKnownSet);
            const nextReview = Array.from(nextReviewSet);
            setKnownIds(nextKnown);
            setReviewIds(nextReview);
            persistProgress(nextKnown, nextReview);
            if (sessionActive && sessionId) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studySessionStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recordSessionAction"])(sessionId, "known");
            // fim de sessão?
            if (sessionActive && sessionQueue.length && sessionIndex >= sessionQueue.length - 1) {
                if (sessionId) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studySessionStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endSession"])(sessionId);
                stopSession();
                return;
            }
            goNext();
        }
    }["FlashcardsSection.useCallback[markKnown]"], [
        current,
        knownIds,
        reviewIds,
        persistProgress,
        sessionActive,
        sessionId,
        sessionQueue.length,
        sessionIndex
    ]);
    const markReview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FlashcardsSection.useCallback[markReview]": ()=>{
            if (!current) return;
            const nextKnownSet = new Set(knownIds);
            const nextReviewSet = new Set(reviewIds);
            nextReviewSet.add(current.id);
            nextKnownSet.delete(current.id);
            const nextKnown = Array.from(nextKnownSet);
            const nextReview = Array.from(nextReviewSet);
            setKnownIds(nextKnown);
            setReviewIds(nextReview);
            persistProgress(nextKnown, nextReview);
            if (sessionActive && sessionId) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studySessionStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recordSessionAction"])(sessionId, "review");
            if (sessionActive && sessionQueue.length && sessionIndex >= sessionQueue.length - 1) {
                if (sessionId) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studySessionStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endSession"])(sessionId);
                stopSession();
                return;
            }
            goNext();
        }
    }["FlashcardsSection.useCallback[markReview]"], [
        current,
        knownIds,
        reviewIds,
        persistProgress,
        sessionActive,
        sessionId,
        sessionQueue.length,
        sessionIndex
    ]);
    // ---------- Keyboard shortcuts ----------
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FlashcardsSection.useEffect": ()=>{
            function onKey(e) {
                if (!current) return;
                if (e.key === " " || e.key.toLowerCase() === "enter") {
                    e.preventDefault();
                    setIsFlipped({
                        "FlashcardsSection.useEffect.onKey": (v)=>!v
                    }["FlashcardsSection.useEffect.onKey"]);
                }
                if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    markReview();
                }
                if (e.key === "ArrowRight") {
                    e.preventDefault();
                    markKnown();
                }
            }
            window.addEventListener("keydown", onKey);
            return ({
                "FlashcardsSection.useEffect": ()=>window.removeEventListener("keydown", onKey)
            })["FlashcardsSection.useEffect"];
        }
    }["FlashcardsSection.useEffect"], [
        current,
        markKnown,
        markReview
    ]);
    // ---------- Empty state ----------
    if (!cards.length) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "w-full max-w-5xl mx-auto mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-semibold",
                    children: "Flashcards"
                }, void 0, false, {
                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                    lineNumber: 325,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-2 opacity-70",
                    children: "Faça um upload para gerar flashcards automaticamente."
                }, void 0, false, {
                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                    lineNumber: 326,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
            lineNumber: 324,
            columnNumber: 7
        }, this);
    }
    // ---------- If filter results empty ----------
    const hasActive = !!current;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "w-full max-w-5xl mx-auto mt-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-white/10 bg-white/5 p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row md:items-start md:justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs opacity-70",
                                        children: "Flashcards"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 340,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-semibold mt-1",
                                        children: topic || "Seu deck"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 341,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 text-sm opacity-70",
                                        children: [
                                            "Atalhos: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: "Enter/Espaço"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                lineNumber: 343,
                                                columnNumber: 24
                                            }, this),
                                            " vira • ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: "←"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                lineNumber: 343,
                                                columnNumber: 51
                                            }, this),
                                            " revisar • ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: "→"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                lineNumber: 343,
                                                columnNumber: 70
                                            }, this),
                                            " acertei"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 342,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                lineNumber: 339,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Chip, {
                                        tone: "neutral",
                                        label: "📚 Cards: ".concat(cards.length)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 348,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Chip, {
                                        tone: "neutral",
                                        label: "✅ Feitos: ".concat(doneCount)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 349,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Chip, {
                                        tone: "green",
                                        label: "🎯 Aproveitamento: ".concat(accuracyPct, "%")
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 350,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                lineNumber: 347,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                        lineNumber: 338,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between text-xs opacity-70",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Progresso geral"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 357,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            progressPct,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 358,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                lineNumber: 356,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 h-2 w-full rounded-full bg-black/30 overflow-hidden border border-white/10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full rounded-full bg-[#00FF8B]/70",
                                    style: {
                                        width: "".concat(progressPct, "%")
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                    lineNumber: 361,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                lineNumber: 360,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                        lineNumber: 355,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 flex flex-col lg:flex-row lg:items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "inline-flex items-center gap-2 text-xs opacity-70 mr-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                lineNumber: 370,
                                                columnNumber: 15
                                            }, this),
                                            "Filtro:"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 369,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                        active: filter === "all",
                                        onClick: ()=>{
                                            setFilter("all");
                                            setIsFlipped(false);
                                            setIndex(0);
                                        },
                                        children: "Todos"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 373,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                        active: filter === "review",
                                        onClick: ()=>{
                                            setFilter("review");
                                            setIsFlipped(false);
                                            setIndex(0);
                                        },
                                        children: "Revisar"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 376,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                        active: filter === "known",
                                        onClick: ()=>{
                                            setFilter("known");
                                            setIsFlipped(false);
                                            setIndex(0);
                                        },
                                        children: "Conhecidos"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 379,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                lineNumber: 368,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-2",
                                children: [
                                    !sessionActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs opacity-70 mr-1",
                                                children: "Sessão:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                lineNumber: 388,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                min: 1,
                                                max: 50,
                                                value: sessionSize,
                                                onChange: (e)=>setSessionSize(Math.max(1, Math.min(50, Math.trunc(Number(e.target.value) || 10)))),
                                                className: "w-24 rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                lineNumber: 389,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: startNewSession,
                                                className: "rounded-2xl border border-[#00FF8B]/30 bg-[#00FF8B]/10 px-4 py-2 text-sm font-semibold text-[#00FF8B] hover:bg-[#00FF8B]/15 inline-flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                        lineNumber: 401,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Iniciar"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                lineNumber: 397,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: stopSession,
                                        className: "rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm hover:bg-black/30 inline-flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$stop$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__StopCircle$3e$__["StopCircle"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                lineNumber: 409,
                                                columnNumber: 17
                                            }, this),
                                            " Encerrar sessão"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 405,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            // reset só do deck ativo
                                            if (docKey) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyProgressStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearProgress"])(docKey);
                                            if (legacyKey) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyProgressStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearProgress"])(legacyKey);
                                            setKnownIds([]);
                                            setReviewIds([]);
                                            setIsFlipped(false);
                                        },
                                        className: "rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 inline-flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                lineNumber: 424,
                                                columnNumber: 15
                                            }, this),
                                            " Reset progresso"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 413,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                lineNumber: 385,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                        lineNumber: 366,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                lineNumber: 337,
                columnNumber: 7
            }, this),
            !hasActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 rounded-2xl border border-white/10 bg-white/5 p-10 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xl font-semibold",
                        children: "Nada aqui ainda"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                        lineNumber: 433,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 opacity-70",
                        children: "Esse filtro não tem cards. Tente “Todos” ou faça uma sessão."
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                        lineNumber: 434,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFilter("all"),
                        className: "mt-6 rounded-2xl border border-[#00FF8B]/30 bg-[#00FF8B]/10 px-6 py-3 font-semibold text-[#00FF8B] hover:bg-[#00FF8B]/15",
                        children: "Voltar para Todos"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                        lineNumber: 437,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                lineNumber: 432,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 flex items-center justify-between text-sm opacity-80",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: sessionActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "Sessão • Card ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            children: sessionIndex + 1
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                            lineNumber: 451,
                                            columnNumber: 33
                                        }, this),
                                        "/",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            children: sessionQueue.length
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                            lineNumber: 451,
                                            columnNumber: 59
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                    lineNumber: 450,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "Deck • Card ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            children: index + 1
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                            lineNumber: 455,
                                            columnNumber: 31
                                        }, this),
                                        "/",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            children: filteredCards.length
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                            lineNumber: 455,
                                            columnNumber: 50
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                    lineNumber: 454,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                lineNumber: 448,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-xs opacity-70",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center gap-1",
                                        children: [
                                            "✅ ",
                                            knownIds.length
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 461,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center gap-1",
                                        children: [
                                            "❌ ",
                                            reviewIds.length
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 464,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                lineNumber: 460,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                        lineNumber: 447,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 rounded-3xl border border-white/10 bg-white/5 p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative [perspective:1200px]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: cn("relative w-full min-h-[260px] transition-transform duration-500 [transform-style:preserve-3d]", isFlipped ? "[transform:rotateY(180deg)]" : ""),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setIsFlipped(true),
                                            className: "absolute inset-0 rounded-2xl border border-white/10 bg-black/20 p-6 text-left [backface-visibility:hidden] hover:bg-black/25",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs opacity-70",
                                                    children: "Pergunta"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                    lineNumber: 485,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-2 text-xl font-semibold leading-relaxed",
                                                    children: current.question
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                    lineNumber: 486,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-6 text-sm opacity-70",
                                                    children: "Clique para ver a resposta"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                    lineNumber: 490,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-3 flex flex-wrap gap-2",
                                                    children: [
                                                        knownSet.has(current.id) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Chip, {
                                                            tone: "green",
                                                            label: "✅ Conhecido"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                            lineNumber: 495,
                                                            columnNumber: 50
                                                        }, this) : null,
                                                        reviewSet.has(current.id) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Chip, {
                                                            tone: "red",
                                                            label: "❌ Revisar"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                            lineNumber: 496,
                                                            columnNumber: 51
                                                        }, this) : null,
                                                        current.difficulty ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Chip, {
                                                            tone: "neutral",
                                                            label: "⚡ ".concat(current.difficulty)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                            lineNumber: 497,
                                                            columnNumber: 44
                                                        }, this) : null
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                    lineNumber: 494,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                            lineNumber: 480,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setIsFlipped(false),
                                            className: "absolute inset-0 rounded-2xl border border-white/10 bg-black/20 p-6 text-left [transform:rotateY(180deg)] [backface-visibility:hidden] hover:bg-black/25",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs opacity-70",
                                                    children: "Resposta"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                    lineNumber: 507,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-2 text-lg leading-relaxed whitespace-pre-wrap opacity-95",
                                                    children: current.answer
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                    lineNumber: 508,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-6 text-sm opacity-70",
                                                    children: "Clique para voltar à pergunta"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                    lineNumber: 512,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                            lineNumber: 502,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                    lineNumber: 473,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                lineNumber: 472,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: goPrev,
                                                disabled: activeIndex <= 0,
                                                className: "rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm hover:bg-white/10 disabled:opacity-40 inline-flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                        lineNumber: 527,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Anterior"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                lineNumber: 522,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: goNext,
                                                disabled: activeIndex >= activeList.length - 1,
                                                className: "rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm hover:bg-white/10 disabled:opacity-40 inline-flex items-center gap-2",
                                                children: [
                                                    "Próximo ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                        lineNumber: 535,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                lineNumber: 530,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 521,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: markReview,
                                                className: "rounded-2xl border border-red-500/25 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-200 hover:bg-red-500/15 inline-flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                        lineNumber: 544,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Revisar"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                lineNumber: 540,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: markKnown,
                                                className: "rounded-2xl border border-[#00FF8B]/30 bg-[#00FF8B]/10 px-5 py-3 text-sm font-semibold text-[#00FF8B] hover:bg-[#00FF8B]/15 inline-flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                        lineNumber: 551,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Acertei"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                lineNumber: 547,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 539,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                lineNumber: 520,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                        lineNumber: 471,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
        lineNumber: 335,
        columnNumber: 5
    }, this);
}
_s(FlashcardsSection, "wznwHXmX35mB83WaFrYOc1Iix70=");
_c = FlashcardsSection;
function Pill(param) {
    let { active, onClick, children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: cn("rounded-full px-4 py-2 text-sm border transition", active ? "border-[#00FF8B]/30 bg-[#00FF8B]/10 text-[#00FF8B]" : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"),
        children: children
    }, void 0, false, {
        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
        lineNumber: 572,
        columnNumber: 5
    }, this);
}
_c1 = Pill;
function Chip(param) {
    let { label, tone } = param;
    const cls = tone === "green" ? "border-[#00FF8B]/25 bg-[#00FF8B]/10 text-[#00FF8B]" : tone === "red" ? "border-red-500/25 bg-red-500/10 text-red-200" : "border-white/10 bg-black/20 text-white/70";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: cn("text-xs px-3 py-1 rounded-full border", cls),
        children: label
    }, void 0, false, {
        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
        lineNumber: 593,
        columnNumber: 10
    }, this);
}
_c2 = Chip;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "FlashcardsSection");
__turbopack_context__.k.register(_c1, "Pill");
__turbopack_context__.k.register(_c2, "Chip");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/components/SummarySection.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>SummarySection
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyMaterialStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/studyMaterialStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function cn() {
    for(var _len = arguments.length, s = new Array(_len), _key = 0; _key < _len; _key++){
        s[_key] = arguments[_key];
    }
    return s.filter(Boolean).join(" ");
}
function lengthLabel(l) {
    if (l === "short") return "Curto";
    if (l === "long") return "Longo";
    if (l === "medium") return "Médio";
    return "—";
}
function SummarySection(_props) {
    var _summary_mainTopics, _summary_keyPoints;
    _s();
    const [topic, setTopic] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [tags, setTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [summary, setSummary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [openId, setOpenId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SummarySection.useEffect": ()=>{
            const refresh = {
                "SummarySection.useEffect.refresh": ()=>{
                    var _m_summary_mainTopics_, _m_summary_mainTopics, _m_summary;
                    const m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyMaterialStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadMaterial"])();
                    var _m_topic;
                    setTopic((_m_topic = m === null || m === void 0 ? void 0 : m.topic) !== null && _m_topic !== void 0 ? _m_topic : "");
                    var _m_tags;
                    setTags((_m_tags = m === null || m === void 0 ? void 0 : m.tags) !== null && _m_tags !== void 0 ? _m_tags : []);
                    var _m_summary1;
                    setSummary((_m_summary1 = m === null || m === void 0 ? void 0 : m.summary) !== null && _m_summary1 !== void 0 ? _m_summary1 : null);
                    var _m_summary_mainTopics__id;
                    setOpenId((_m_summary_mainTopics__id = m === null || m === void 0 ? void 0 : (_m_summary = m.summary) === null || _m_summary === void 0 ? void 0 : (_m_summary_mainTopics = _m_summary.mainTopics) === null || _m_summary_mainTopics === void 0 ? void 0 : (_m_summary_mainTopics_ = _m_summary_mainTopics[0]) === null || _m_summary_mainTopics_ === void 0 ? void 0 : _m_summary_mainTopics_.id) !== null && _m_summary_mainTopics__id !== void 0 ? _m_summary_mainTopics__id : null);
                }
            }["SummarySection.useEffect.refresh"];
            refresh();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyMaterialStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onMaterialUpdated"])(refresh);
        }
    }["SummarySection.useEffect"], []);
    const hasQuotes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SummarySection.useMemo[hasQuotes]": ()=>{
            var _summary_sourceQuotes;
            var _summary_sourceQuotes_length;
            return ((_summary_sourceQuotes_length = summary === null || summary === void 0 ? void 0 : (_summary_sourceQuotes = summary.sourceQuotes) === null || _summary_sourceQuotes === void 0 ? void 0 : _summary_sourceQuotes.length) !== null && _summary_sourceQuotes_length !== void 0 ? _summary_sourceQuotes_length : 0) > 0;
        }
    }["SummarySection.useMemo[hasQuotes]"], [
        summary
    ]);
    const length = lengthLabel(summary === null || summary === void 0 ? void 0 : summary.length);
    if (!summary) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "w-full max-w-5xl mx-auto mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-semibold",
                    children: "Resumos"
                }, void 0, false, {
                    fileName: "[project]/src/app/components/SummarySection.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-2 opacity-70",
                    children: "Faça um upload para gerar um resumo automaticamente."
                }, void 0, false, {
                    fileName: "[project]/src/app/components/SummarySection.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/SummarySection.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this);
    }
    var _summary_mainTopics_length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "w-full max-w-5xl mx-auto mt-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-white/10 bg-white/5 p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row md:items-start md:justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs opacity-70",
                                        children: "Resumo"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/SummarySection.tsx",
                                        lineNumber: 54,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-semibold mt-1",
                                        children: topic ? "".concat(topic, " — ").concat(summary.title) : summary.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/SummarySection.tsx",
                                        lineNumber: 55,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 text-sm opacity-70",
                                        children: "Leitura rápida + tópicos principais no padrão do app."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/SummarySection.tsx",
                                        lineNumber: 58,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/SummarySection.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Chip, {
                                        tone: "green",
                                        label: "📝 ".concat(length)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/SummarySection.tsx",
                                        lineNumber: 64,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Chip, {
                                        tone: "neutral",
                                        label: "📌 ".concat((_summary_mainTopics_length = summary === null || summary === void 0 ? void 0 : (_summary_mainTopics = summary.mainTopics) === null || _summary_mainTopics === void 0 ? void 0 : _summary_mainTopics.length) !== null && _summary_mainTopics_length !== void 0 ? _summary_mainTopics_length : 0, " tópicos")
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/SummarySection.tsx",
                                        lineNumber: 65,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Chip, {
                                        tone: "neutral",
                                        label: hasQuotes ? "🔎 ".concat(summary.sourceQuotes.length, " trechos") : "🔎 sem trechos"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/SummarySection.tsx",
                                        lineNumber: 66,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/SummarySection.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/SummarySection.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    (tags === null || tags === void 0 ? void 0 : tags.length) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex flex-wrap gap-2",
                        children: tags.slice(0, 12).map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs px-3 py-1 rounded-full border border-white/10 bg-black/20 text-white/70",
                                children: [
                                    "#",
                                    t
                                ]
                            }, t, true, {
                                fileName: "[project]/src/app/components/SummarySection.tsx",
                                lineNumber: 76,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/SummarySection.tsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/SummarySection.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 space-y-3",
                children: (summary.mainTopics || []).map((t)=>{
                    const opened = openId === t.id;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-white/10 bg-white/5 overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setOpenId(opened ? null : t.id),
                                className: "w-full flex items-center justify-between gap-3 p-5 hover:bg-white/5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xl",
                                                children: t.icon || "📘"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/SummarySection.tsx",
                                                lineNumber: 98,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-semibold",
                                                        children: t.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/components/SummarySection.tsx",
                                                        lineNumber: 100,
                                                        columnNumber: 21
                                                    }, this),
                                                    Array.isArray(t.tags) && t.tags.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-1 text-xs opacity-70",
                                                        children: t.tags.slice(0, 4).map((x)=>"#".concat(x)).join("  ")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/components/SummarySection.tsx",
                                                        lineNumber: 102,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-1 text-xs opacity-60",
                                                        children: "Clique para expandir"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/components/SummarySection.tsx",
                                                        lineNumber: 106,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/components/SummarySection.tsx",
                                                lineNumber: 99,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/SummarySection.tsx",
                                        lineNumber: 97,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: cn("text-xs opacity-70", opened && "opacity-100"),
                                        children: opened ? "Fechar" : "Abrir"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/SummarySection.tsx",
                                        lineNumber: 111,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/SummarySection.tsx",
                                lineNumber: 93,
                                columnNumber: 15
                            }, this),
                            opened ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-5 pb-5",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-2xl border border-white/10 bg-black/20 p-5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "opacity-90 leading-relaxed whitespace-pre-wrap",
                                        children: t.content
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/SummarySection.tsx",
                                        lineNumber: 119,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/SummarySection.tsx",
                                    lineNumber: 118,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/SummarySection.tsx",
                                lineNumber: 117,
                                columnNumber: 17
                            }, this) : null
                        ]
                    }, t.id, true, {
                        fileName: "[project]/src/app/components/SummarySection.tsx",
                        lineNumber: 92,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/app/components/SummarySection.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            ((_summary_keyPoints = summary.keyPoints) === null || _summary_keyPoints === void 0 ? void 0 : _summary_keyPoints.length) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 rounded-2xl border border-white/10 bg-white/5 p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3 flex-wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold",
                                children: "Pontos-chave"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/SummarySection.tsx",
                                lineNumber: 132,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs opacity-70",
                                children: [
                                    summary.keyPoints.length,
                                    " itens"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/SummarySection.tsx",
                                lineNumber: 133,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/SummarySection.tsx",
                        lineNumber: 131,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "mt-4 space-y-2",
                        children: summary.keyPoints.map((k, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "rounded-xl border border-white/10 bg-black/20 p-3 opacity-90",
                                children: k
                            }, i, false, {
                                fileName: "[project]/src/app/components/SummarySection.tsx",
                                lineNumber: 138,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/SummarySection.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/SummarySection.tsx",
                lineNumber: 130,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 rounded-2xl border border-white/10 bg-white/5 p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between flex-wrap gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold",
                                children: "Trechos do material"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/SummarySection.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs opacity-70",
                                children: hasQuotes ? "".concat(summary.sourceQuotes.length, " trecho(s)") : "Sem trechos disponíveis"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/SummarySection.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/SummarySection.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    !hasQuotes ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 opacity-70",
                        children: "Se o arquivo for imagem com texto pouco legível ou PDF sem extração, a IA pode não conseguir citar."
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/SummarySection.tsx",
                        lineNumber: 156,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 grid grid-cols-1 md:grid-cols-2 gap-4",
                        children: summary.sourceQuotes.map((q, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border border-white/10 bg-black/20 p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs opacity-70",
                                        children: "Trecho"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/SummarySection.tsx",
                                        lineNumber: 163,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 italic opacity-90",
                                        children: [
                                            "“",
                                            q.quote,
                                            "”"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/SummarySection.tsx",
                                        lineNumber: 164,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 text-xs opacity-70",
                                        children: "Por que importa"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/SummarySection.tsx",
                                        lineNumber: 165,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 opacity-85",
                                        children: q.whyItMatters
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/SummarySection.tsx",
                                        lineNumber: 166,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/src/app/components/SummarySection.tsx",
                                lineNumber: 162,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/SummarySection.tsx",
                        lineNumber: 160,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/SummarySection.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/SummarySection.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_s(SummarySection, "9q+MIIpEYzyaVvXT1OhNBoFbwP4=");
_c = SummarySection;
function Chip(param) {
    let { label, tone } = param;
    const cls = tone === "green" ? "border-[#00FF8B]/25 bg-[#00FF8B]/10 text-[#00FF8B]" : tone === "red" ? "border-red-500/25 bg-red-500/10 text-red-200" : "border-white/10 bg-black/20 text-white/70";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: cn("text-xs px-3 py-1 rounded-full border", cls),
        children: label
    }, void 0, false, {
        fileName: "[project]/src/app/components/SummarySection.tsx",
        lineNumber: 183,
        columnNumber: 10
    }, this);
}
_c1 = Chip;
var _c, _c1;
__turbopack_context__.k.register(_c, "SummarySection");
__turbopack_context__.k.register(_c1, "Chip");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/components/ProgressSection.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>ProgressSection
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyMaterialStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/studyMaterialStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyProgressStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/studyProgressStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function cn() {
    for(var _len = arguments.length, s = new Array(_len), _key = 0; _key < _len; _key++){
        s[_key] = arguments[_key];
    }
    return s.filter(Boolean).join(" ");
}
function pct(n) {
    return Math.max(0, Math.min(100, Math.round(n)));
}
function uniq(arr) {
    return Array.from(new Set(arr));
}
function ProgressSection() {
    _s();
    const [topic, setTopic] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [totalCards, setTotalCards] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [progressKey, setProgressKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [knownIds, setKnownIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [reviewIds, setReviewIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [updatedAt, setUpdatedAt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProgressSection.useEffect": ()=>{
            const refresh = {
                "ProgressSection.useEffect.refresh": ()=>{
                    var _m_flashcards;
                    const m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyMaterialStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadMaterial"])();
                    var _m_flashcards_length;
                    const count = (_m_flashcards_length = m === null || m === void 0 ? void 0 : (_m_flashcards = m.flashcards) === null || _m_flashcards === void 0 ? void 0 : _m_flashcards.length) !== null && _m_flashcards_length !== void 0 ? _m_flashcards_length : 0;
                    var _m_topic;
                    setTopic((_m_topic = m === null || m === void 0 ? void 0 : m.topic) !== null && _m_topic !== void 0 ? _m_topic : "");
                    setTotalCards(count);
                    var _m_topic1;
                    const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyProgressStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeProgressKey"])((_m_topic1 = m === null || m === void 0 ? void 0 : m.topic) !== null && _m_topic1 !== void 0 ? _m_topic1 : "deck", count);
                    setProgressKey(key);
                    const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyProgressStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadProgress"])(key);
                    var _p_knownIds;
                    setKnownIds((_p_knownIds = p === null || p === void 0 ? void 0 : p.knownIds) !== null && _p_knownIds !== void 0 ? _p_knownIds : []);
                    var _p_reviewIds;
                    setReviewIds((_p_reviewIds = p === null || p === void 0 ? void 0 : p.reviewIds) !== null && _p_reviewIds !== void 0 ? _p_reviewIds : []);
                    var _p_updatedAt;
                    setUpdatedAt((_p_updatedAt = p === null || p === void 0 ? void 0 : p.updatedAt) !== null && _p_updatedAt !== void 0 ? _p_updatedAt : null);
                }
            }["ProgressSection.useEffect.refresh"];
            refresh();
            const off1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyMaterialStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onMaterialUpdated"])(refresh);
            const off2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyProgressStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onProgressUpdated"])(refresh);
            return ({
                "ProgressSection.useEffect": ()=>{
                    off1 === null || off1 === void 0 ? void 0 : off1();
                    off2 === null || off2 === void 0 ? void 0 : off2();
                }
            })["ProgressSection.useEffect"];
        }
    }["ProgressSection.useEffect"], []);
    const known = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ProgressSection.useMemo[known]": ()=>new Set(knownIds)
    }["ProgressSection.useMemo[known]"], [
        knownIds
    ]);
    const review = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ProgressSection.useMemo[review]": ()=>new Set(reviewIds)
    }["ProgressSection.useMemo[review]"], [
        reviewIds
    ]);
    const doneCount = uniq([
        ...knownIds,
        ...reviewIds
    ]).length;
    const donePct = totalCards ? pct(doneCount / totalCards * 100) : 0;
    const knownCount = known.size;
    const reviewCount = review.size;
    const remainingCount = Math.max(0, totalCards - doneCount);
    if (!totalCards) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "w-full max-w-5xl mx-auto mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-semibold",
                    children: "Progresso"
                }, void 0, false, {
                    fileName: "[project]/src/app/components/ProgressSection.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-2 opacity-70",
                    children: "Gere um material (upload) para acompanhar seu progresso."
                }, void 0, false, {
                    fileName: "[project]/src/app/components/ProgressSection.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/ProgressSection.tsx",
            lineNumber: 64,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "w-full max-w-5xl mx-auto mt-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-white/10 bg-white/5 p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row md:items-start md:justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs opacity-70",
                                        children: "Progresso"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                                        lineNumber: 77,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-semibold mt-1",
                                        children: topic || "Seu deck"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                                        lineNumber: 78,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 text-sm opacity-70",
                                        children: "Acompanhe seu avanço no mesmo padrão visual do Flashcards."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                                        lineNumber: 79,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/ProgressSection.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Chip, {
                                        tone: "green",
                                        label: "✅ Conhecidos: ".concat(knownCount)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                                        lineNumber: 85,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Chip, {
                                        tone: "red",
                                        label: "❌ Revisar: ".concat(reviewCount)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                                        lineNumber: 86,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Chip, {
                                        tone: "neutral",
                                        label: "⏳ Restantes: ".concat(remainingCount)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                                        lineNumber: 87,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/ProgressSection.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between text-xs opacity-70",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Progresso geral"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                                        lineNumber: 94,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            donePct,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                                        lineNumber: 95,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/ProgressSection.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 h-2 w-full rounded-full bg-black/30 overflow-hidden border border-white/10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full rounded-full bg-[#00FF8B]/70",
                                    style: {
                                        width: "".concat(donePct, "%")
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/ProgressSection.tsx",
                                    lineNumber: 98,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/ProgressSection.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 text-xs opacity-60",
                                children: updatedAt ? "Última atualização: ".concat(new Date(updatedAt).toLocaleString()) : "Ainda sem atualizações"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/ProgressSection.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 flex flex-col sm:flex-row items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm opacity-70",
                                children: [
                                    "Total de cards: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        className: "opacity-90",
                                        children: totalCards
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                                        lineNumber: 109,
                                        columnNumber: 29
                                    }, this),
                                    " • Concluídos:",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        className: "opacity-90",
                                        children: doneCount
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                                        lineNumber: 110,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/ProgressSection.tsx",
                                lineNumber: 108,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    if (!progressKey) return;
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyProgressStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearProgress"])(progressKey);
                                },
                                className: "rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm hover:bg-white/10",
                                children: "Limpar progresso deste deck"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/ProgressSection.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/ProgressSection.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 grid grid-cols-1 md:grid-cols-3 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        title: "Conhecidos",
                        value: knownCount,
                        subtitle: "Você marcou como acertei",
                        tone: "green"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        title: "Revisar",
                        value: reviewCount,
                        subtitle: "Precisa reforçar",
                        tone: "red"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        title: "Restantes",
                        value: remainingCount,
                        subtitle: "Ainda não avaliados",
                        tone: "neutral"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/ProgressSection.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 rounded-2xl border border-white/10 bg-white/5 p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "font-semibold",
                        children: "Dica de estudo"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 opacity-70 leading-relaxed",
                        children: "Use sessões curtas (10–20 cards) e marque “Revisar” sem medo. O ideal é voltar nesses cards no dia seguinte."
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/ProgressSection.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/ProgressSection.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
_s(ProgressSection, "nrFvcH4tzHcqASiVxGa7CryLHKo=");
_c = ProgressSection;
function Chip(param) {
    let { label, tone } = param;
    const cls = tone === "green" ? "border-[#00FF8B]/25 bg-[#00FF8B]/10 text-[#00FF8B]" : tone === "red" ? "border-red-500/25 bg-red-500/10 text-red-200" : "border-white/10 bg-black/20 text-white/70";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: cn("text-xs px-3 py-1 rounded-full border", cls),
        children: label
    }, void 0, false, {
        fileName: "[project]/src/app/components/ProgressSection.tsx",
        lineNumber: 150,
        columnNumber: 10
    }, this);
}
_c1 = Chip;
function StatCard(param) {
    let { title, value, subtitle, tone } = param;
    const border = tone === "green" ? "border-[#00FF8B]/20" : tone === "red" ? "border-red-500/20" : "border-white/10";
    const bg = tone === "green" ? "bg-[#00FF8B]/10" : tone === "red" ? "bg-red-500/10" : "bg-black/20";
    const text = tone === "green" ? "text-[#00FF8B]" : tone === "red" ? "text-red-200" : "text-white/80";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: cn("rounded-2xl border bg-white/5 p-6", border),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs opacity-70",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/app/components/ProgressSection.tsx",
                lineNumber: 183,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: cn("mt-2 text-3xl font-bold", text),
                children: value
            }, void 0, false, {
                fileName: "[project]/src/app/components/ProgressSection.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: cn("mt-3 rounded-xl border p-3 text-sm opacity-90", border, bg),
                children: subtitle
            }, void 0, false, {
                fileName: "[project]/src/app/components/ProgressSection.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/ProgressSection.tsx",
        lineNumber: 182,
        columnNumber: 5
    }, this);
}
_c2 = StatCard;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ProgressSection");
__turbopack_context__.k.register(_c1, "Chip");
__turbopack_context__.k.register(_c2, "StatCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>Home
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$UploadSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/UploadSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$FlashcardsSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/FlashcardsSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$SummarySection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/SummarySection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ProgressSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/ProgressSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyMaterialStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/studyMaterialStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function Home() {
    _s();
    const [activeSection, setActiveSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("upload");
    const [studyData, setStudyData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // 🔥 carrega do localStorage ao abrir e mantém sincronizado
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyMaterialStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadMaterial"])();
            if (current) setStudyData(current);
            const unsub = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyMaterialStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onMaterialUpdated"])({
                "Home.useEffect.unsub": ()=>{
                    const latest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyMaterialStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadMaterial"])();
                    setStudyData(latest);
                }
            }["Home.useEffect.unsub"]);
            return unsub;
        }
    }["Home.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#0D0D0D]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "border-b border-[#1A1A1A] backdrop-blur-sm bg-[#0D0D0D]/80 sticky top-0 z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between h-16",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-8 h-8 rounded-lg bg-gradient-to-br from-[#00FF8B] to-[#007B5F] flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                className: "w-5 h-5 text-[#0D0D0D]"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 37,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 36,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#00FF8B] to-[#007B5F] bg-clip-text text-transparent",
                                            children: "Stud.ai"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 39,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                    className: "hidden md:flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavButton, {
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"],
                                            label: "Upload",
                                            active: activeSection === "upload",
                                            onClick: ()=>setActiveSection("upload")
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 45,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavButton, {
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
                                            label: "FlashCards",
                                            active: activeSection === "flashcards",
                                            onClick: ()=>setActiveSection("flashcards")
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 46,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavButton, {
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"],
                                            label: "Resumos",
                                            active: activeSection === "summary",
                                            onClick: ()=>setActiveSection("summary")
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 47,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavButton, {
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
                                            label: "Progresso",
                                            active: activeSection === "progress",
                                            onClick: ()=>setActiveSection("progress")
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 48,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 44,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1A1A] border border-[#00FF8B]/20",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                            className: "w-4 h-4 text-[#00FF8B]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 52,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-medium",
                                            children: "Nível 5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 53,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 51,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "md:hidden flex items-center gap-1 pb-3 overflow-x-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavButton, {
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"],
                                    label: "Upload",
                                    active: activeSection === "upload",
                                    onClick: ()=>setActiveSection("upload"),
                                    mobile: true
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavButton, {
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
                                    label: "Cards",
                                    active: activeSection === "flashcards",
                                    onClick: ()=>setActiveSection("flashcards"),
                                    mobile: true
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavButton, {
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"],
                                    label: "Resumos",
                                    active: activeSection === "summary",
                                    onClick: ()=>setActiveSection("summary"),
                                    mobile: true
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 60,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavButton, {
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
                                    label: "Progresso",
                                    active: activeSection === "progress",
                                    onClick: ()=>setActiveSection("progress"),
                                    mobile: true
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8",
                children: [
                    activeSection === "upload" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$UploadSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        onDataProcessed: setStudyData,
                        onNavigate: (section)=>setActiveSection(section)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, this),
                    activeSection === "flashcards" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$FlashcardsSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        data: studyData
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 74,
                        columnNumber: 44
                    }, this),
                    activeSection === "summary" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$SummarySection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        data: studyData
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 75,
                        columnNumber: 41
                    }, this),
                    activeSection === "progress" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ProgressSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 76,
                        columnNumber: 42
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "border-t border-[#1A1A1A] mt-12 py-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row items-center justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-sm text-gray-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                        className: "w-4 h-4 text-[#00FF8B]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 83,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "+1.2k estudantes ativos hoje"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 84,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 82,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-500",
                                children: "Feito com 💚 para estudantes"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 81,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_s(Home, "RMQNxmUU71WCGTkDn1KIHf7ko6Y=");
_c = Home;
function NavButton(param) {
    let { icon: Icon, label, active, onClick, mobile = false } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: "\n        flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300\n        ".concat(mobile ? "text-xs whitespace-nowrap" : "text-sm", "\n        ").concat(active ? "bg-[#00FF8B]/10 text-[#00FF8B] border border-[#00FF8B]/30" : "text-gray-400 hover:text-white hover:bg-[#1A1A1A]", "\n      "),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                className: "w-4 h-4"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: label
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 108,
        columnNumber: 5
    }, this);
}
_c1 = NavButton;
var _c, _c1;
__turbopack_context__.k.register(_c, "Home");
__turbopack_context__.k.register(_c1, "NavButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_81ee5979._.js.map