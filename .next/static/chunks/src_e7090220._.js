(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/lib/studyMaterialStore.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "clearMaterial": ()=>clearMaterial,
    "loadMaterial": ()=>loadMaterial,
    "normalizeFromApi": ()=>normalizeFromApi,
    "onMaterialUpdated": ()=>onMaterialUpdated,
    "saveMaterial": ()=>saveMaterial
});
const KEY = "studai:lastMaterial:v1";
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
function normalizeFlashcards(input) {
    const arr = Array.isArray(input) ? input : [];
    const out = [];
    for(let i = 0; i < arr.length; i++){
        const c = arr[i] || {};
        const id = Number.isFinite(Number(c.id)) ? Number(c.id) : i + 1;
        const question = typeof c.question === "string" ? c.question : "";
        const answer = typeof c.answer === "string" ? c.answer : "";
        if (!question || !answer) continue;
        const d = String(c.difficulty || "").toLowerCase();
        const difficulty = d === "easy" || d === "medium" || d === "hard" ? d : undefined;
        const tags = Array.isArray(c.tags) ? c.tags.filter((t)=>typeof t === "string") : undefined;
        out.push({
            id,
            question,
            answer,
            difficulty,
            tags
        });
    }
    // remove ids duplicados (garante unicidade)
    const seen = new Set();
    const fixed = [];
    for (const c of out){
        let id = c.id;
        while(seen.has(id))id += 100000; // desloca pra não colidir
        seen.add(id);
        fixed.push({
            ...c,
            id
        });
    }
    return fixed;
}
function normalizeSummary(input) {
    const s = input || {};
    const title = typeof s.title === "string" ? s.title : "Resumo";
    const mainTopicsRaw = Array.isArray(s.mainTopics) ? s.mainTopics : [];
    const mainTopics = mainTopicsRaw.map((t, idx)=>({
            id: Number.isFinite(Number(t === null || t === void 0 ? void 0 : t.id)) ? Number(t.id) : idx + 1,
            title: typeof (t === null || t === void 0 ? void 0 : t.title) === "string" ? t.title : "Tópico ".concat(idx + 1),
            content: typeof (t === null || t === void 0 ? void 0 : t.content) === "string" ? t.content : "",
            icon: typeof (t === null || t === void 0 ? void 0 : t.icon) === "string" ? t.icon : "📌"
        })).filter((t)=>t.title && t.content);
    const keyPoints = Array.isArray(s.keyPoints) ? s.keyPoints.filter((k)=>typeof k === "string") : [];
    return {
        title,
        mainTopics,
        keyPoints
    };
}
function normalizeFromApi(anyJson) {
    var _anyJson_data, _anyJson_data1, _anyJson_data_data, _anyJson_data2, _anyJson_data_data1, _anyJson_data3, _summary_mainTopics;
    if (!anyJson) return null;
    const payload = (anyJson === null || anyJson === void 0 ? void 0 : anyJson.topic) && (anyJson === null || anyJson === void 0 ? void 0 : anyJson.flashcards) ? anyJson : (anyJson === null || anyJson === void 0 ? void 0 : (_anyJson_data = anyJson.data) === null || _anyJson_data === void 0 ? void 0 : _anyJson_data.topic) && (anyJson === null || anyJson === void 0 ? void 0 : (_anyJson_data1 = anyJson.data) === null || _anyJson_data1 === void 0 ? void 0 : _anyJson_data1.flashcards) ? anyJson.data : (anyJson === null || anyJson === void 0 ? void 0 : (_anyJson_data2 = anyJson.data) === null || _anyJson_data2 === void 0 ? void 0 : (_anyJson_data_data = _anyJson_data2.data) === null || _anyJson_data_data === void 0 ? void 0 : _anyJson_data_data.topic) && (anyJson === null || anyJson === void 0 ? void 0 : (_anyJson_data3 = anyJson.data) === null || _anyJson_data3 === void 0 ? void 0 : (_anyJson_data_data1 = _anyJson_data3.data) === null || _anyJson_data_data1 === void 0 ? void 0 : _anyJson_data_data1.flashcards) ? anyJson.data.data : null;
    if (!payload) return null;
    const topic = typeof payload.topic === "string" ? payload.topic : "";
    if (!topic) return null;
    const tags = Array.isArray(payload.tags) ? payload.tags.filter((t)=>typeof t === "string") : [];
    const flashcards = normalizeFlashcards(payload.flashcards);
    const summary = normalizeSummary(payload.summary);
    if (!flashcards.length || !(summary === null || summary === void 0 ? void 0 : (_summary_mainTopics = summary.mainTopics) === null || _summary_mainTopics === void 0 ? void 0 : _summary_mainTopics.length)) return null;
    return {
        topic,
        tags,
        flashcards,
        summary,
        createdAt: new Date().toISOString()
    };
}
function saveMaterial(material) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.setItem(KEY, JSON.stringify(material));
    emit();
}
function loadMaterial() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return safeParse(localStorage.getItem(KEY));
}
function clearMaterial() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.removeItem(KEY);
    emit();
}
function onMaterialUpdated(cb) {
    listeners.add(cb);
    return ()=>listeners.delete(cb);
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyMaterialStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/studyMaterialStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const PREFS_KEY = "studai:genPrefs:v1";
function clampInt(n, min, max) {
    if (!Number.isFinite(n)) return min;
    return Math.max(min, Math.min(max, Math.trunc(n)));
}
function formatBytes(bytes) {
    if (!Number.isFinite(bytes)) return "";
    const units = [
        "B",
        "KB",
        "MB",
        "GB"
    ];
    let i = 0;
    let v = bytes;
    while(v >= 1024 && i < units.length - 1){
        v /= 1024;
        i++;
    }
    return "".concat(v.toFixed(i === 0 ? 0 : 1), " ").concat(units[i]);
}
function difficultyLabel(d) {
    if (d === "easy") return "fácil";
    if (d === "medium") return "médio";
    if (d === "hard") return "difícil";
    return "aleatório";
}
function summaryLabel(s) {
    return s === "bullets" ? "resumo bullets" : "resumo elaborado";
}
function isApiSuccess(json) {
    var _json_data;
    if (!json) return false;
    return (json === null || json === void 0 ? void 0 : json.success) === true || (json === null || json === void 0 ? void 0 : (_json_data = json.data) === null || _json_data === void 0 ? void 0 : _json_data.success) === true;
}
function extractPayload(json) {
    var _json_data, _json_data1;
    if (!json) return null;
    if ((json === null || json === void 0 ? void 0 : json.data) && (json === null || json === void 0 ? void 0 : json.success) === true) return json.data;
    if ((json === null || json === void 0 ? void 0 : (_json_data = json.data) === null || _json_data === void 0 ? void 0 : _json_data.data) && (json === null || json === void 0 ? void 0 : (_json_data1 = json.data) === null || _json_data1 === void 0 ? void 0 : _json_data1.success) === true) return json.data.data;
    var _json_data2;
    return (_json_data2 = json === null || json === void 0 ? void 0 : json.data) !== null && _json_data2 !== void 0 ? _json_data2 : null;
}
function UploadSection(param) {
    let { onDataProcessed, onNavigate } = param;
    _s();
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [isUploading, setIsUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedFile, setSelectedFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [flashcardsCount, setFlashcardsCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10);
    const [difficulty, setDifficulty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("random");
    const [summaryStyle, setSummaryStyle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("bullets");
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [lastProcessedAt, setLastProcessedAt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [lastMaterial, setLastMaterial] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [lastApiJson, setLastApiJson] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // ✅ cooldown p/ 429 (quota)
    const [cooldownSec, setCooldownSec] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [lastUsed, setLastUsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UploadSection.useEffect": ()=>{
            try {
                const raw = localStorage.getItem(PREFS_KEY);
                if (!raw) return;
                const p = JSON.parse(raw);
                if (p === null || p === void 0 ? void 0 : p.flashcardsCount) setFlashcardsCount(clampInt(Number(p.flashcardsCount), 1, 50));
                if (p === null || p === void 0 ? void 0 : p.difficulty) setDifficulty(p.difficulty);
                if (p === null || p === void 0 ? void 0 : p.summaryStyle) setSummaryStyle(p.summaryStyle);
            } catch (e) {}
        }
    }["UploadSection.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UploadSection.useEffect": ()=>{
            try {
                localStorage.setItem(PREFS_KEY, JSON.stringify({
                    flashcardsCount,
                    difficulty,
                    summaryStyle
                }));
            } catch (e) {}
        }
    }["UploadSection.useEffect"], [
        flashcardsCount,
        difficulty,
        summaryStyle
    ]);
    // ✅ timer do cooldown
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UploadSection.useEffect": ()=>{
            if (cooldownSec <= 0) return;
            const t = window.setInterval({
                "UploadSection.useEffect.t": ()=>{
                    setCooldownSec({
                        "UploadSection.useEffect.t": (s)=>s <= 1 ? 0 : s - 1
                    }["UploadSection.useEffect.t"]);
                }
            }["UploadSection.useEffect.t"], 1000);
            return ({
                "UploadSection.useEffect": ()=>window.clearInterval(t)
            })["UploadSection.useEffect"];
        }
    }["UploadSection.useEffect"], [
        cooldownSec
    ]);
    function onPickFile() {
        var _inputRef_current;
        setMessage(null);
        (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.click();
    }
    function clearSelection() {
        setSelectedFile(null);
        setStatus("idle");
        setMessage(null);
        setLastProcessedAt(null);
        setLastUsed(null);
        setLastMaterial(null);
        setLastApiJson(null);
        setCooldownSec(0);
    }
    async function handleUpload(file, opts) {
        if (!(opts === null || opts === void 0 ? void 0 : opts.silentSelectMessage)) setMessage(null);
        setIsUploading(true);
        setStatus("uploading");
        setMessage("Processando…");
        setCooldownSec(0);
        const used = {
            flashcardsCount: clampInt(flashcardsCount, 1, 50),
            difficulty,
            summaryStyle
        };
        setLastUsed(used);
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("flashcardsCount", String(used.flashcardsCount));
            formData.append("flashcardsDifficulty", used.difficulty);
            formData.append("summaryStyle", used.summaryStyle);
            const response = await fetch("/api/process-study-material", {
                method: "POST",
                body: formData
            });
            const json = await response.json().catch(()=>null);
            setLastApiJson(json);
            // ✅ 429: quota — mostra countdown
            if (response.status === 429) {
                const retry = Number(json === null || json === void 0 ? void 0 : json.retryAfterSeconds);
                const retrySec = Number.isFinite(retry) ? retry : 45;
                setStatus("error");
                setCooldownSec(retrySec);
                setLastProcessedAt(new Date().toLocaleTimeString());
                setMessage("Limite da cota do Gemini atingido. Tente novamente em ".concat(retrySec, "s."));
                return;
            }
            const ok = response.ok && isApiSuccess(json);
            const payload = extractPayload(json);
            if (!ok || !payload) {
                var _json_data, _json_data1;
                const errMsg = (json === null || json === void 0 ? void 0 : json.details) || (json === null || json === void 0 ? void 0 : json.error) || (json === null || json === void 0 ? void 0 : (_json_data = json.data) === null || _json_data === void 0 ? void 0 : _json_data.details) || (json === null || json === void 0 ? void 0 : (_json_data1 = json.data) === null || _json_data1 === void 0 ? void 0 : _json_data1.error) || "Falha ao processar (HTTP ".concat(response.status, ")");
                throw new Error(errMsg);
            }
            // ✅ NORMALIZA + SALVA NO STORE
            const material = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyMaterialStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeFromApi"])(payload) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyMaterialStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeFromApi"])({
                success: true,
                data: payload
            }) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyMaterialStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeFromApi"])(json);
            if (!material) {
                throw new Error("A API respondeu, mas não veio topic/flashcards/summary no formato esperado.");
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyMaterialStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveMaterial"])(material);
            setLastMaterial(material);
            onDataProcessed === null || onDataProcessed === void 0 ? void 0 : onDataProcessed(material);
            setStatus("success");
            setMessage("Arquivo processado com sucesso! ✅");
            setLastProcessedAt(new Date().toLocaleTimeString());
        } catch (e) {
            console.error(e);
            setStatus("error");
            setMessage((e === null || e === void 0 ? void 0 : e.message) || "Falha ao processar arquivo ❌");
            setLastProcessedAt(new Date().toLocaleTimeString());
        } finally{
            setIsUploading(false);
        }
    }
    async function onFileChange(e) {
        var _e_target_files;
        const file = ((_e_target_files = e.target.files) === null || _e_target_files === void 0 ? void 0 : _e_target_files[0]) || null;
        if (!file) return;
        setSelectedFile(file);
        setStatus("selected");
        setMessage("Arquivo selecionado. Processando…");
        await handleUpload(file, {
            silentSelectMessage: true
        });
        e.target.value = "";
    }
    async function onDrop(e) {
        var _e_dataTransfer_files;
        e.preventDefault();
        const file = ((_e_dataTransfer_files = e.dataTransfer.files) === null || _e_dataTransfer_files === void 0 ? void 0 : _e_dataTransfer_files[0]) || null;
        if (!file) return;
        setSelectedFile(file);
        setStatus("selected");
        setMessage("Arquivo selecionado. Processando…");
        await handleUpload(file, {
            silentSelectMessage: true
        });
    }
    function onDragOver(e) {
        e.preventDefault();
    }
    async function onRegenerate() {
        if (!selectedFile) return;
        setMessage("Reprocessando com as novas configurações…");
        await handleUpload(selectedFile, {
            silentSelectMessage: true
        });
    }
    const lastUsedPreview = lastUsed ? "".concat(lastUsed.flashcardsCount, " flashcards • ").concat(difficultyLabel(lastUsed.difficulty), " • ").concat(summaryLabel(lastUsed.summaryStyle)) : null;
    const canNavigate = !!lastMaterial;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: inputRef,
                type: "file",
                className: "hidden",
                onChange: onFileChange,
                accept: "image/*,application/pdf,text/plain"
            }, void 0, false, {
                fileName: "[project]/src/app/components/UploadSection.tsx",
                lineNumber: 255,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 rounded-2xl border border-white/10 bg-white/5 p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row md:items-center md:justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm opacity-70",
                                        children: "Configurações"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/UploadSection.tsx",
                                        lineNumber: 266,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-base font-semibold",
                                        children: "Como gerar seus materiais"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/UploadSection.tsx",
                                        lineNumber: 267,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 265,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs opacity-70",
                                children: [
                                    status === "uploading" ? "⏳ Processando..." : null,
                                    status === "success" ? "✅ Sucesso" : null,
                                    status === "error" ? "❌ Falhou" : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 270,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/UploadSection.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 grid grid-cols-1 md:grid-cols-3 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-white/10 bg-black/10 p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs opacity-70",
                                        children: "Quantidade de flashcards"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/UploadSection.tsx",
                                        lineNumber: 279,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        min: 1,
                                        max: 50,
                                        value: flashcardsCount,
                                        onChange: (e)=>setFlashcardsCount(clampInt(Number(e.target.value), 1, 50)),
                                        className: "mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 outline-none"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/UploadSection.tsx",
                                        lineNumber: 280,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-1 text-xs opacity-60",
                                        children: "1 a 50"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/UploadSection.tsx",
                                        lineNumber: 288,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 278,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-white/10 bg-black/10 p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs opacity-70",
                                        children: "Dificuldade"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/UploadSection.tsx",
                                        lineNumber: 292,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: difficulty,
                                        onChange: (e)=>setDifficulty(e.target.value),
                                        className: "mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 outline-none",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "easy",
                                                children: "Fácil"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                                lineNumber: 298,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "medium",
                                                children: "Médio"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                                lineNumber: 299,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "hard",
                                                children: "Difícil"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                                lineNumber: 300,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "random",
                                                children: "Aleatório"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                                lineNumber: 301,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/UploadSection.tsx",
                                        lineNumber: 293,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 291,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-white/10 bg-black/10 p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs opacity-70",
                                        children: "Estilo do resumo"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/UploadSection.tsx",
                                        lineNumber: 306,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: summaryStyle,
                                        onChange: (e)=>setSummaryStyle(e.target.value),
                                        className: "mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 outline-none",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "bullets",
                                                children: "Bullets (objetivo)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                                lineNumber: 312,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "detailed",
                                                children: "Elaborado (explicativo)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                                lineNumber: 313,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/UploadSection.tsx",
                                        lineNumber: 307,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 305,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/UploadSection.tsx",
                        lineNumber: 277,
                        columnNumber: 9
                    }, this),
                    (status === "success" || status === "error" || canNavigate) && lastUsedPreview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: [
                            "mt-4 rounded-xl border p-3 text-sm",
                            canNavigate ? "border-[#00FF8B]/20 bg-[#00FF8B]/10 text-[#00FF8B]" : "border-red-500/20 bg-red-500/10 text-red-200"
                        ].join(" "),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-semibold",
                                children: canNavigate ? "Gerado com:" : "Tentou gerar com:"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 327,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "opacity-90 mt-1",
                                children: lastUsedPreview
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 328,
                                columnNumber: 13
                            }, this),
                            lastProcessedAt ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs opacity-70 mt-1",
                                children: [
                                    "às ",
                                    lastProcessedAt
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 329,
                                columnNumber: 32
                            }, this) : null,
                            !canNavigate && cooldownSec > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 text-sm opacity-90",
                                children: [
                                    "⏳ Aguarde ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: [
                                            cooldownSec,
                                            "s"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/UploadSection.tsx",
                                        lineNumber: 334,
                                        columnNumber: 27
                                    }, this),
                                    " para tentar novamente."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 333,
                                columnNumber: 15
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 flex flex-col sm:flex-row gap-2",
                                children: canNavigate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>onNavigate === null || onNavigate === void 0 ? void 0 : onNavigate("flashcards"),
                                            className: "rounded-xl border border-[#00FF8B]/30 bg-[#00FF8B]/10 px-4 py-2 text-sm font-semibold text-[#00FF8B] hover:bg-[#00FF8B]/15",
                                            children: "Ir para Flashcards"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/UploadSection.tsx",
                                            lineNumber: 341,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>onNavigate === null || onNavigate === void 0 ? void 0 : onNavigate("summary"),
                                            className: "rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10",
                                            children: "Ir para Resumo"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/UploadSection.tsx",
                                            lineNumber: 348,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onRegenerate,
                                    disabled: !selectedFile || isUploading || cooldownSec > 0,
                                    className: "rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm disabled:opacity-50 hover:bg-white/10",
                                    children: cooldownSec > 0 ? "Tentar novamente em ".concat(cooldownSec, "s") : "Tentar novamente"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/UploadSection.tsx",
                                    lineNumber: 356,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 338,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/UploadSection.tsx",
                        lineNumber: 319,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex flex-col sm:flex-row items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs opacity-60",
                                children: selectedFile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        "Arquivo atual: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "opacity-90",
                                            children: selectedFile.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/UploadSection.tsx",
                                            lineNumber: 372,
                                            columnNumber: 32
                                        }, this),
                                        " • ",
                                        formatBytes(selectedFile.size)
                                    ]
                                }, void 0, true) : "Selecione um arquivo para gerar o conteúdo."
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 369,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onRegenerate,
                                        disabled: !selectedFile || isUploading || cooldownSec > 0,
                                        className: "rounded-xl border border-[#00FF8B]/30 bg-[#00FF8B]/10 px-4 py-2 text-sm font-semibold text-[#00FF8B] disabled:opacity-50 hover:bg-[#00FF8B]/15",
                                        children: cooldownSec > 0 ? "Aguarde ".concat(cooldownSec, "s") : "Gerar novamente"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/UploadSection.tsx",
                                        lineNumber: 380,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onPickFile,
                                        disabled: isUploading,
                                        className: "rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm disabled:opacity-50 hover:bg-white/10",
                                        children: "Trocar arquivo"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/UploadSection.tsx",
                                        lineNumber: 388,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: clearSelection,
                                        disabled: isUploading,
                                        className: "rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm disabled:opacity-50 hover:bg-black/30",
                                        children: "Limpar"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/UploadSection.tsx",
                                        lineNumber: 396,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 379,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/UploadSection.tsx",
                        lineNumber: 368,
                        columnNumber: 9
                    }, this),
                    lastApiJson ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                        className: "mt-4 text-xs opacity-80",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                className: "cursor-pointer",
                                children: "Ver resposta da API (debug)"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 408,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                className: "mt-2 whitespace-pre-wrap break-words rounded-xl border border-white/10 bg-black/20 p-3",
                                children: JSON.stringify(lastApiJson, null, 2)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/UploadSection.tsx",
                                lineNumber: 409,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/UploadSection.tsx",
                        lineNumber: 407,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/UploadSection.tsx",
                lineNumber: 263,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onDrop: onDrop,
                onDragOver: onDragOver,
                className: "w-full rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-10 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-lg font-semibold",
                        children: "Arraste e solte seu arquivo aqui"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/UploadSection.tsx",
                        lineNumber: 421,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 text-sm opacity-70",
                        children: "ou clique para selecionar"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/UploadSection.tsx",
                        lineNumber: 422,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onPickFile,
                        disabled: isUploading,
                        className: "mt-6 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-2 disabled:opacity-60 hover:bg-white/10",
                        children: isUploading ? "Processando..." : "Selecionar arquivo"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/UploadSection.tsx",
                        lineNumber: 424,
                        columnNumber: 9
                    }, this),
                    message ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: [
                            "mt-4 text-sm",
                            status === "success" || canNavigate ? "text-[#00FF8B]" : status === "error" ? "text-red-300" : "text-white/70"
                        ].join(" "),
                        children: message
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/UploadSection.tsx",
                        lineNumber: 433,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/UploadSection.tsx",
                lineNumber: 416,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/UploadSection.tsx",
        lineNumber: 254,
        columnNumber: 5
    }, this);
}
_s(UploadSection, "f0EKzg4L/BDbtS2Eu46styuxDjo=");
_c = UploadSection;
var _c;
__turbopack_context__.k.register(_c, "UploadSection");
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
    "onProgressUpdated": ()=>onProgressUpdated,
    "saveProgress": ()=>saveProgress
});
const PREFIX = "studai:progress:v1:";
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
function makeProgressKey(topic, cardsCount) {
    const t = (topic || "").trim().toLowerCase().slice(0, 80);
    return "".concat(t, "::").concat(cardsCount);
}
function loadProgress(key) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return safeParse(localStorage.getItem(PREFIX + key));
}
function saveProgress(key, progress) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const payload = {
        knownIds: Array.isArray(progress.knownIds) ? progress.knownIds : [],
        reviewIds: Array.isArray(progress.reviewIds) ? progress.reviewIds : [],
        updatedAt: new Date().toISOString()
    };
    localStorage.setItem(PREFIX + key, JSON.stringify(payload));
    emit();
}
function clearProgress(key) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (key) {
        localStorage.removeItem(PREFIX + key);
        emit();
        return;
    }
    // remove tudo que começa com PREFIX
    const keysToRemove = [];
    for(let i = 0; i < localStorage.length; i++){
        const k = localStorage.key(i);
        if (k && k.startsWith(PREFIX)) keysToRemove.push(k);
    }
    for (const k of keysToRemove)localStorage.removeItem(k);
    emit();
}
function onProgressUpdated(cb) {
    listeners.add(cb);
    return ()=>listeners.delete(cb);
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
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function difficultyLabel(d) {
    if (d === "easy") return "Fácil";
    if (d === "hard") return "Difícil";
    return "Médio";
}
function difficultyClass(d) {
    if (d === "easy") return "border-green-500/30 bg-green-500/10 text-green-200";
    if (d === "hard") return "border-red-500/30 bg-red-500/10 text-red-200";
    return "border-yellow-500/30 bg-yellow-500/10 text-yellow-200";
}
function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
}
function uniqById(list) {
    const seen = new Set();
    const out = [];
    for (const c of list){
        if (!seen.has(c.id)) {
            seen.add(c.id);
            out.push(c);
        }
    }
    return out;
}
function mulberry32(seed) {
    let a = seed >>> 0;
    return function() {
        a |= 0;
        a = a + 0x6d2b79f5 | 0;
        let t = Math.imul(a ^ a >>> 15, 1 | a);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}
function seededShuffle(arr, seed) {
    const a = [
        ...arr
    ];
    const rand = mulberry32(seed);
    for(let i = a.length - 1; i > 0; i--){
        const j = Math.floor(rand() * (i + 1));
        [a[i], a[j]] = [
            a[j],
            a[i]
        ];
    }
    return a;
}
const STREAK_KEY = "studai:streak:v1";
function toYYYYMMDD(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return "".concat(y, "-").concat(m, "-").concat(day);
}
function addDays(dateStr, days) {
    const [y, m, d] = dateStr.split("-").map(Number);
    const dt = new Date(y, (m || 1) - 1, d || 1);
    dt.setDate(dt.getDate() + days);
    return toYYYYMMDD(dt);
}
function loadStreak() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = localStorage.getItem(STREAK_KEY);
        if (!raw) return {
            streak: 0,
            lastDate: ""
        };
        const parsed = JSON.parse(raw);
        return {
            streak: Number.isFinite(parsed === null || parsed === void 0 ? void 0 : parsed.streak) ? Number(parsed.streak) : 0,
            lastDate: typeof (parsed === null || parsed === void 0 ? void 0 : parsed.lastDate) === "string" ? parsed.lastDate : ""
        };
    } catch (e) {
        return {
            streak: 0,
            lastDate: ""
        };
    }
}
function saveStreak(s) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.setItem(STREAK_KEY, JSON.stringify(s));
}
function updateStreakOnStudy() {
    const today = toYYYYMMDD(new Date());
    const current = loadStreak();
    if (!current.lastDate) {
        const next = {
            streak: 1,
            lastDate: today
        };
        saveStreak(next);
        return next;
    }
    if (current.lastDate === today) return current;
    const expected = addDays(current.lastDate, 1);
    const next = expected === today ? {
        streak: Math.max(1, current.streak + 1),
        lastDate: today
    } : {
        streak: 1,
        lastDate: today
    };
    saveStreak(next);
    return next;
}
function fireConfetti() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const root = document.createElement("div");
    root.style.position = "fixed";
    root.style.inset = "0";
    root.style.pointerEvents = "none";
    root.style.zIndex = "9999";
    document.body.appendChild(root);
    const pieces = 120;
    const w = window.innerWidth;
    const h = window.innerHeight;
    for(let i = 0; i < pieces; i++){
        const p = document.createElement("div");
        const size = 6 + Math.random() * 8;
        p.style.position = "absolute";
        p.style.width = "".concat(size, "px");
        p.style.height = "".concat(size * 0.6, "px");
        p.style.borderRadius = "999px";
        p.style.left = "".concat(Math.random() * w, "px");
        p.style.top = "".concat(-20 - Math.random() * 200, "px");
        p.style.opacity = "0.95";
        p.style.transform = "rotate(".concat(Math.random() * 360, "deg)");
        p.style.background = "hsl(".concat(Math.floor(Math.random() * 360), ", 90%, 60%)");
        const duration = 900 + Math.random() * 900;
        const drift = (Math.random() - 0.5) * 260;
        const rot = (Math.random() - 0.5) * 720;
        p.animate([
            {
                transform: "translate(0,0) rotate(0deg)",
                opacity: 1
            },
            {
                transform: "translate(".concat(drift, "px, ").concat(h + 200, "px) rotate(").concat(rot, "deg)"),
                opacity: 0.9
            }
        ], {
            duration,
            easing: "cubic-bezier(.2,.8,.2,1)",
            fill: "forwards"
        });
        root.appendChild(p);
    }
    setTimeout(()=>root.remove(), 2200);
}
function haptic(pattern) {
    try {
        // @ts-ignore
        if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(pattern);
    } catch (e) {}
}
async function requestFullscreen() {
    try {
        if (typeof document === "undefined") return;
        const el = document.documentElement;
        if (el === null || el === void 0 ? void 0 : el.requestFullscreen) await el.requestFullscreen();
    } catch (e) {}
}
async function exitFullscreen() {
    try {
        if (typeof document === "undefined") return;
        if (document.fullscreenElement && document.exitFullscreen) await document.exitFullscreen();
    } catch (e) {}
}
function FlashcardsSection(param) {
    let { data } = param;
    _s();
    const [cards, setCards] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [topic, setTopic] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [topicTags, setTopicTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [idx, setIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [showAnswer, setShowAnswer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [knownIds, setKnownIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [reviewIds, setReviewIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("smart");
    const [direction, setDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [animKey, setAnimKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [streak, setStreak] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        streak: 0,
        lastDate: ""
    });
    const confettiFiredRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [studyMode, setStudyMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [autoAdvance, setAutoAdvance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [autoAdvanceDelayMs, setAutoAdvanceDelayMs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(220);
    const [smartIncludeKnown, setSmartIncludeKnown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [smartEvery, setSmartEvery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(3);
    const [smartShuffle, setSmartShuffle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [smartSeed, setSmartSeed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "FlashcardsSection.useState": ()=>Date.now()
    }["FlashcardsSection.useState"]);
    const [smartSprintReviewOnly, setSmartSprintReviewOnly] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lastAction, setLastAction] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // ✅ carrega do store (fallback)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FlashcardsSection.useEffect": ()=>{
            const refresh = {
                "FlashcardsSection.useEffect.refresh": ()=>{
                    const m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyMaterialStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadMaterial"])();
                    var _m_flashcards;
                    const newCards = (_m_flashcards = m === null || m === void 0 ? void 0 : m.flashcards) !== null && _m_flashcards !== void 0 ? _m_flashcards : [];
                    var _m_topic;
                    const newTopic = (_m_topic = m === null || m === void 0 ? void 0 : m.topic) !== null && _m_topic !== void 0 ? _m_topic : "";
                    var _m_tags;
                    const newTags = (_m_tags = m === null || m === void 0 ? void 0 : m.tags) !== null && _m_tags !== void 0 ? _m_tags : [];
                    setCards(newCards);
                    setTopic(newTopic);
                    setTopicTags(newTags);
                    setIdx(0);
                    setShowAnswer(false);
                    setFilter("smart");
                    setDirection(1);
                    setAnimKey({
                        "FlashcardsSection.useEffect.refresh": (k)=>k + 1
                    }["FlashcardsSection.useEffect.refresh"]);
                    const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyProgressStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeProgressKey"])(newTopic, newCards.length);
                    const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyProgressStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadProgress"])(key);
                    var _p_knownIds;
                    setKnownIds((_p_knownIds = p === null || p === void 0 ? void 0 : p.knownIds) !== null && _p_knownIds !== void 0 ? _p_knownIds : []);
                    var _p_reviewIds;
                    setReviewIds((_p_reviewIds = p === null || p === void 0 ? void 0 : p.reviewIds) !== null && _p_reviewIds !== void 0 ? _p_reviewIds : []);
                    confettiFiredRef.current = false;
                    setStreak(loadStreak());
                    setLastAction(null);
                    setSmartSeed(Date.now());
                }
            }["FlashcardsSection.useEffect.refresh"];
            refresh();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyMaterialStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onMaterialUpdated"])(refresh);
        }
    }["FlashcardsSection.useEffect"], []);
    // ✅ se vier data pelo page.tsx, usa ela também (não quebra nada)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FlashcardsSection.useEffect": ()=>{
            var _data_flashcards;
            if (!(data === null || data === void 0 ? void 0 : (_data_flashcards = data.flashcards) === null || _data_flashcards === void 0 ? void 0 : _data_flashcards.length)) return;
            setCards(data.flashcards);
            var _data_topic;
            setTopic((_data_topic = data.topic) !== null && _data_topic !== void 0 ? _data_topic : "");
            var _data_tags;
            setTopicTags((_data_tags = data.tags) !== null && _data_tags !== void 0 ? _data_tags : []);
            setIdx(0);
            setShowAnswer(false);
            setFilter("smart");
            setDirection(1);
            setAnimKey({
                "FlashcardsSection.useEffect": (k)=>k + 1
            }["FlashcardsSection.useEffect"]);
            var _data_topic1;
            const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyProgressStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeProgressKey"])((_data_topic1 = data.topic) !== null && _data_topic1 !== void 0 ? _data_topic1 : "", data.flashcards.length);
            const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyProgressStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadProgress"])(key);
            var _p_knownIds;
            setKnownIds((_p_knownIds = p === null || p === void 0 ? void 0 : p.knownIds) !== null && _p_knownIds !== void 0 ? _p_knownIds : []);
            var _p_reviewIds;
            setReviewIds((_p_reviewIds = p === null || p === void 0 ? void 0 : p.reviewIds) !== null && _p_reviewIds !== void 0 ? _p_reviewIds : []);
            confettiFiredRef.current = false;
            setStreak(loadStreak());
            setLastAction(null);
            setSmartSeed(Date.now());
        }
    }["FlashcardsSection.useEffect"], [
        data
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FlashcardsSection.useEffect": ()=>{
            if (!lastAction) return;
            const t = window.setTimeout({
                "FlashcardsSection.useEffect.t": ()=>setLastAction(null)
            }["FlashcardsSection.useEffect.t"], 320);
            return ({
                "FlashcardsSection.useEffect": ()=>window.clearTimeout(t)
            })["FlashcardsSection.useEffect"];
        }
    }["FlashcardsSection.useEffect"], [
        lastAction
    ]);
    const progressKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FlashcardsSection.useMemo[progressKey]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyProgressStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeProgressKey"])(topic, cards.length)
    }["FlashcardsSection.useMemo[progressKey]"], [
        topic,
        cards.length
    ]);
    const smartDeck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FlashcardsSection.useMemo[smartDeck]": ()=>{
            if (!cards.length) return [];
            const knownSet = new Set(knownIds);
            const reviewSet = new Set(reviewIds);
            const reviewCardsRaw = cards.filter({
                "FlashcardsSection.useMemo[smartDeck].reviewCardsRaw": (c)=>reviewSet.has(c.id)
            }["FlashcardsSection.useMemo[smartDeck].reviewCardsRaw"]);
            const unseenRaw = cards.filter({
                "FlashcardsSection.useMemo[smartDeck].unseenRaw": (c)=>!knownSet.has(c.id) && !reviewSet.has(c.id)
            }["FlashcardsSection.useMemo[smartDeck].unseenRaw"]);
            const knownRaw = cards.filter({
                "FlashcardsSection.useMemo[smartDeck].knownRaw": (c)=>knownSet.has(c.id)
            }["FlashcardsSection.useMemo[smartDeck].knownRaw"]);
            if (smartSprintReviewOnly) {
                const base = smartShuffle ? seededShuffle(reviewCardsRaw, smartSeed) : reviewCardsRaw;
                return uniqById(base);
            }
            const reviewCards = smartShuffle ? seededShuffle(reviewCardsRaw, smartSeed ^ 0xabc123) : reviewCardsRaw;
            const unseenCards = smartShuffle ? seededShuffle(unseenRaw, smartSeed ^ 0x55aa77) : unseenRaw;
            const knownCards = smartShuffle ? seededShuffle(knownRaw, smartSeed ^ 0x0f0f0f) : knownRaw;
            const priority = [
                ...reviewCards,
                ...unseenCards
            ];
            if (!smartIncludeKnown || knownCards.length === 0) {
                return uniqById(priority.length ? priority : cards);
            }
            const every = clamp(smartEvery, 1, 10);
            const deck = [];
            let i = 0;
            let j = 0;
            while(i < priority.length || j < knownCards.length){
                for(let k = 0; k < every && i < priority.length; k++)deck.push(priority[i++]);
                if (j < knownCards.length) deck.push(knownCards[j++]);
                if (i >= priority.length && j < knownCards.length) while(j < knownCards.length)deck.push(knownCards[j++]);
            }
            return uniqById(deck.length ? deck : cards);
        }
    }["FlashcardsSection.useMemo[smartDeck]"], [
        cards,
        knownIds,
        reviewIds,
        smartIncludeKnown,
        smartEvery,
        smartShuffle,
        smartSeed,
        smartSprintReviewOnly
    ]);
    const filteredCards = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FlashcardsSection.useMemo[filteredCards]": ()=>{
            if (filter === "smart") return smartDeck;
            if (filter === "known") return cards.filter({
                "FlashcardsSection.useMemo[filteredCards]": (c)=>knownIds.includes(c.id)
            }["FlashcardsSection.useMemo[filteredCards]"]);
            if (filter === "review") return cards.filter({
                "FlashcardsSection.useMemo[filteredCards]": (c)=>reviewIds.includes(c.id)
            }["FlashcardsSection.useMemo[filteredCards]"]);
            return cards;
        }
    }["FlashcardsSection.useMemo[filteredCards]"], [
        cards,
        filter,
        knownIds,
        reviewIds,
        smartDeck
    ]);
    // ✅ SAFE INDEX (não deixa current virar undefined)
    const safeIdx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FlashcardsSection.useMemo[safeIdx]": ()=>{
            if (!filteredCards.length) return 0;
            return Math.min(idx, filteredCards.length - 1);
        }
    }["FlashcardsSection.useMemo[safeIdx]"], [
        idx,
        filteredCards.length
    ]);
    const current = filteredCards[safeIdx];
    const deckProgressPct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FlashcardsSection.useMemo[deckProgressPct]": ()=>{
            const total = filteredCards.length || 1;
            const pos = Math.min(safeIdx + 1, total);
            return Math.round(pos / total * 100);
        }
    }["FlashcardsSection.useMemo[deckProgressPct]"], [
        safeIdx,
        filteredCards.length
    ]);
    const masteredPct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FlashcardsSection.useMemo[masteredPct]": ()=>{
            const total = cards.length || 1;
            return Math.round(knownIds.length / total * 100);
        }
    }["FlashcardsSection.useMemo[masteredPct]"], [
        cards.length,
        knownIds.length
    ]);
    function setIndexSafe(nextIndex, dir) {
        setDirection(dir);
        setShowAnswer(false);
        setIdx(clamp(nextIndex, 0, Math.max(0, filteredCards.length - 1)));
        setAnimKey((k)=>k + 1);
    }
    function next() {
        setIndexSafe(safeIdx + 1, 1);
    }
    function prev() {
        setIndexSafe(safeIdx - 1, -1);
    }
    function applyProgress(newKnown, newReview) {
        setKnownIds(newKnown);
        setReviewIds(newReview);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyProgressStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveProgress"])(progressKey, {
            knownIds: newKnown,
            reviewIds: newReview
        });
        const s = updateStreakOnStudy();
        setStreak(s);
        const total = cards.length;
        if (total > 0 && newKnown.length >= total && !confettiFiredRef.current) {
            confettiFiredRef.current = true;
            fireConfetti();
            haptic([
                30,
                40,
                30
            ]);
        }
    }
    async function enterStudyMode() {
        setStudyMode(true);
        await requestFullscreen();
    }
    async function leaveStudyMode() {
        setStudyMode(false);
        await exitFullscreen();
    }
    function scheduleAdvance() {
        if (!autoAdvance) return;
        const wait = clamp(autoAdvanceDelayMs, 0, 2000);
        window.setTimeout(()=>next(), wait);
    }
    function markKnown() {
        if (!current) return;
        const id = current.id;
        const newKnown = knownIds.includes(id) ? knownIds : [
            ...knownIds,
            id
        ];
        const newReview = reviewIds.filter((x)=>x !== id);
        setLastAction("known");
        haptic(20);
        applyProgress(newKnown, newReview);
        scheduleAdvance();
    }
    function markReview() {
        if (!current) return;
        const id = current.id;
        const newReview = reviewIds.includes(id) ? reviewIds : [
            ...reviewIds,
            id
        ];
        const newKnown = knownIds.filter((x)=>x !== id);
        setLastAction("review");
        haptic([
            30,
            20,
            30
        ]);
        applyProgress(newKnown, newReview);
        scheduleAdvance();
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FlashcardsSection.useEffect": ()=>{
            function handler(e) {
                var _el_tagName;
                const el = document.activeElement;
                const tag = el === null || el === void 0 ? void 0 : (_el_tagName = el.tagName) === null || _el_tagName === void 0 ? void 0 : _el_tagName.toLowerCase();
                if (tag === "input" || tag === "textarea" || tag === "select") return;
                if (e.key === "Escape") {
                    if (studyMode) {
                        e.preventDefault();
                        leaveStudyMode();
                    }
                    return;
                }
                if (e.key === "ArrowRight") {
                    e.preventDefault();
                    next();
                } else if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    prev();
                } else if (e.key === " " || e.code === "Space") {
                    e.preventDefault();
                    setShowAnswer({
                        "FlashcardsSection.useEffect.handler": (v)=>!v
                    }["FlashcardsSection.useEffect.handler"]);
                } else if (e.key.toLowerCase() === "a") {
                    e.preventDefault();
                    markReview();
                } else if (e.key.toLowerCase() === "d") {
                    e.preventDefault();
                    markKnown();
                } else if (e.key.toLowerCase() === "f") {
                    e.preventDefault();
                    studyMode ? leaveStudyMode() : enterStudyMode();
                } else if (e.key.toLowerCase() === "r") {
                    e.preventDefault();
                    setSmartSeed(Date.now());
                }
            }
            window.addEventListener("keydown", handler);
            return ({
                "FlashcardsSection.useEffect": ()=>window.removeEventListener("keydown", handler)
            })["FlashcardsSection.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["FlashcardsSection.useEffect"], [
        safeIdx,
        current,
        filteredCards.length,
        knownIds,
        reviewIds,
        studyMode,
        autoAdvance,
        autoAdvanceDelayMs
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FlashcardsSection.useEffect": ()=>{
            if (idx !== safeIdx) setIdx(safeIdx);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["FlashcardsSection.useEffect"], [
        safeIdx
    ]);
    if (!cards.length) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "w-full max-w-5xl mx-auto mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-semibold",
                    children: "FlashCards"
                }, void 0, false, {
                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                    lineNumber: 473,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-2 opacity-70",
                    children: "Faça um upload para gerar flashcards automaticamente."
                }, void 0, false, {
                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                    lineNumber: 474,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
            lineNumber: 472,
            columnNumber: 7
        }, this);
    }
    const animClass = direction === 1 ? "studai-enter-right" : "studai-enter-left";
    const curDifficulty = (current === null || current === void 0 ? void 0 : current.difficulty) || "medium";
    function FlashcardCard(param) {
        let { compact } = param;
        if (!current) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: compact ? "" : "mt-5",
            style: {
                perspective: "1200px"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: animClass,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>setShowAnswer((v)=>!v),
                    className: "w-full text-left",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: [
                            "relative w-full rounded-2xl border border-white/10 bg-black/10",
                            lastAction === "known" ? "ring-1 ring-[#00FF8B]/40" : "",
                            lastAction === "review" ? "ring-1 ring-red-500/40" : ""
                        ].join(" "),
                        style: {
                            transformStyle: "preserve-3d",
                            transition: "transform 600ms cubic-bezier(.2,.8,.2,1)",
                            transform: showAnswer ? "rotateY(180deg)" : "rotateY(0deg)",
                            minHeight: compact ? "320px" : "260px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 rounded-2xl p-8 md:p-10 flex flex-col justify-center",
                                style: {
                                    backfaceVisibility: "hidden"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm opacity-70 mb-3",
                                        children: "Pergunta"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 506,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xl md:text-2xl font-semibold leading-relaxed",
                                        children: current.question
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 507,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 text-sm opacity-60",
                                        children: "(clique/ Espaço) • ← → • A = Não sei • D = Sei • F = Tela cheia • R = Shuffle"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 508,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                lineNumber: 502,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 rounded-2xl p-8 md:p-10 flex flex-col justify-center",
                                style: {
                                    backfaceVisibility: "hidden",
                                    transform: "rotateY(180deg)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm opacity-70 mb-3",
                                        children: "Resposta"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 517,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xl md:text-2xl font-semibold leading-relaxed",
                                        children: current.answer
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 518,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 text-sm opacity-60",
                                        children: "(clique/ Espaço) • ESC = Sair"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 519,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                lineNumber: 513,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                        lineNumber: 489,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                    lineNumber: 488,
                    columnNumber: 11
                }, this)
            }, "".concat(animKey, "-").concat(current.id), false, {
                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                lineNumber: 487,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
            lineNumber: 486,
            columnNumber: 7
        }, this);
    }
    function ControlsRow() {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-6 flex flex-col md:flex-row items-center justify-between gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "w-full md:w-auto px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10",
                    onClick: prev,
                    children: "Anterior"
                }, void 0, false, {
                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                    lineNumber: 531,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex w-full md:w-auto gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "flex-1 md:flex-none px-5 py-2 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/15 text-red-200 font-semibold",
                            onClick: markReview,
                            children: "Não sei (A)"
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                            lineNumber: 539,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "flex-1 md:flex-none px-5 py-2 rounded-xl border border-[#00FF8B]/30 bg-[#00FF8B]/10 hover:bg-[#00FF8B]/15 text-[#00FF8B] font-semibold",
                            onClick: markKnown,
                            children: "Sei (D)"
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                            lineNumber: 546,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                    lineNumber: 538,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "w-full md:w-auto px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10",
                    onClick: next,
                    children: "Próximo"
                }, void 0, false, {
                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                    lineNumber: 554,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
            lineNumber: 530,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "w-full max-w-5xl mx-auto mt-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: "\n        @keyframes studaiEnterRight {\n          0% { opacity: 0; transform: translateX(18px) scale(.995); }\n          100% { opacity: 1; transform: translateX(0) scale(1); }\n        }\n        @keyframes studaiEnterLeft {\n          0% { opacity: 0; transform: translateX(-18px) scale(.995); }\n          100% { opacity: 1; transform: translateX(0) scale(1); }\n        }\n        .studai-enter-right { animation: studaiEnterRight 260ms ease-out; }\n        .studai-enter-left { animation: studaiEnterLeft 260ms ease-out; }\n      "
            }, void 0, false, {
                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                lineNumber: 566,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm opacity-80",
                        children: "🎯 Flashcards gerados"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                        lineNumber: 580,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl font-semibold mt-4",
                        children: "FlashCards"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                        lineNumber: 584,
                        columnNumber: 9
                    }, this),
                    topic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 opacity-70",
                        children: topic
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                        lineNumber: 585,
                        columnNumber: 18
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex flex-col sm:flex-row items-center justify-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF8B]/20 bg-[#00FF8B]/10 text-sm",
                                children: [
                                    "🔥 Sequência: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold",
                                        children: Math.max(0, streak.streak)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 589,
                                        columnNumber: 27
                                    }, this),
                                    " dia(s)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                lineNumber: 588,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>studyMode ? leaveStudyMode() : enterStudyMode(),
                                className: "px-3 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-sm",
                                children: studyMode ? "Sair do Study Mode (ESC)" : "Study Mode (F)"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                lineNumber: 592,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                        lineNumber: 587,
                        columnNumber: 9
                    }, this),
                    (topicTags === null || topicTags === void 0 ? void 0 : topicTags.length) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex flex-wrap justify-center gap-2",
                        children: topicTags.slice(0, 10).map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs px-3 py-1 rounded-full border border-white/10 bg-black/10 opacity-80",
                                children: [
                                    "#",
                                    t
                                ]
                            }, t, true, {
                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                lineNumber: 603,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                        lineNumber: 601,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 max-w-md mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between text-xs opacity-70",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Domínio (deck completo)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 612,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            masteredPct,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 613,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                lineNumber: 611,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 h-2 rounded-full bg-white/10 overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full rounded-full bg-[#00FF8B]/40",
                                    style: {
                                        width: "".concat(masteredPct, "%")
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                    lineNumber: 616,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                lineNumber: 615,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                        lineNumber: 610,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                lineNumber: 579,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 grid grid-cols-1 md:grid-cols-3 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-white/10 bg-white/5 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm opacity-70",
                                children: "Total"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                lineNumber: 623,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-semibold",
                                children: cards.length
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                lineNumber: 624,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                        lineNumber: 622,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-white/10 bg-white/5 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm opacity-70",
                                children: "Conhecidos"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                lineNumber: 627,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-semibold",
                                children: knownIds.length
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                lineNumber: 628,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                        lineNumber: 626,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-white/10 bg-white/5 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm opacity-70",
                                children: "Para revisar"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                lineNumber: 631,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-semibold",
                                children: reviewIds.length
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                lineNumber: 632,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                        lineNumber: 630,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                lineNumber: 621,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 rounded-2xl border border-white/10 bg-white/5 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col md:flex-row items-center justify-between gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-semibold",
                                            children: "Auto-advance"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                            lineNumber: 640,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm opacity-70",
                                            children: "Depois de marcar (A/D), vai para o próximo automaticamente."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                            lineNumber: 641,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                    lineNumber: 639,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setAutoAdvance((v)=>!v),
                                            className: [
                                                "px-4 py-2 rounded-xl border text-sm",
                                                autoAdvance ? "border-[#00FF8B]/30 bg-[#00FF8B]/10 text-[#00FF8B]" : "border-white/10 bg-black/10 opacity-80 hover:bg-black/20"
                                            ].join(" "),
                                            children: autoAdvance ? "Auto-advance: ON" : "Auto-advance: OFF"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                            lineNumber: 645,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs opacity-70",
                                                    children: "Delay"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                    lineNumber: 658,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    min: 0,
                                                    max: 2000,
                                                    value: autoAdvanceDelayMs,
                                                    onChange: (e)=>setAutoAdvanceDelayMs(clamp(Number(e.target.value || 0), 0, 2000)),
                                                    className: "w-24 rounded-lg border border-white/10 bg-black/20 px-3 py-2 outline-none text-sm"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                    lineNumber: 659,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs opacity-70",
                                                    children: "ms"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                    lineNumber: 667,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                            lineNumber: 657,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                    lineNumber: 644,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                            lineNumber: 638,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col md:flex-row items-center justify-between gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-semibold",
                                            children: "Revisão inteligente"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                            lineNumber: 674,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm opacity-70",
                                            children: "Prioriza “Não sei” + “não vistos” e intercala “Sei” pra reforço espaçado."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                            lineNumber: 675,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                    lineNumber: 673,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-2 text-sm opacity-90",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: smartIncludeKnown,
                                                    onChange: (e)=>setSmartIncludeKnown(e.target.checked),
                                                    disabled: smartSprintReviewOnly
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                    lineNumber: 680,
                                                    columnNumber: 17
                                                }, this),
                                                "Misturar conhecidos"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                            lineNumber: 679,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs opacity-70",
                                                    children: "1 conhecido a cada"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                    lineNumber: 690,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    min: 1,
                                                    max: 10,
                                                    value: smartEvery,
                                                    onChange: (e)=>setSmartEvery(clamp(Number(e.target.value || 3), 1, 10)),
                                                    className: "w-20 rounded-lg border border-white/10 bg-black/20 px-3 py-2 outline-none text-sm",
                                                    disabled: smartSprintReviewOnly
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                    lineNumber: 691,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs opacity-70",
                                                    children: "prioritários"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                    lineNumber: 700,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                            lineNumber: 689,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-2 text-sm opacity-90",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: smartShuffle,
                                                    onChange: (e)=>setSmartShuffle(e.target.checked)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                    lineNumber: 704,
                                                    columnNumber: 17
                                                }, this),
                                                "Shuffle leve"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                            lineNumber: 703,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setSmartSeed(Date.now()),
                                            className: "px-4 py-2 rounded-xl border border-white/10 bg-black/10 hover:bg-black/20 text-sm",
                                            children: "Re-embaralhar (R)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                            lineNumber: 708,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-2 text-sm opacity-90",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: smartSprintReviewOnly,
                                                    onChange: (e)=>{
                                                        setSmartSprintReviewOnly(e.target.checked);
                                                        setFilter("smart");
                                                        setIdx(0);
                                                        setShowAnswer(false);
                                                        setAnimKey((k)=>k + 1);
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                    lineNumber: 716,
                                                    columnNumber: 17
                                                }, this),
                                                "Sprint “Só Não-sei”"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                            lineNumber: 715,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                    lineNumber: 678,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                            lineNumber: 672,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                    lineNumber: 637,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                lineNumber: 636,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 flex items-center justify-center gap-2 flex-wrap",
                children: [
                    "smart",
                    "all",
                    "review",
                    "known"
                ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setFilter(f);
                            setDirection(1);
                            setIdx(0);
                            setShowAnswer(false);
                            setAnimKey((k)=>k + 1);
                            setLastAction(null);
                        },
                        className: [
                            "px-4 py-2 rounded-xl border text-sm",
                            "border-white/10 bg-white/5 hover:bg-white/10",
                            filter === f ? "ring-1 ring-white/20" : ""
                        ].join(" "),
                        children: f === "smart" ? smartSprintReviewOnly ? "Sprint" : "Inteligente" : f === "all" ? "Todos" : f === "review" ? "Revisar" : "Conhecidos"
                    }, f, false, {
                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                        lineNumber: 736,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                lineNumber: 734,
                columnNumber: 7
            }, this),
            !filteredCards.length || !current ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 rounded-2xl border border-white/10 bg-white/5 p-8 text-center opacity-70",
                children: smartSprintReviewOnly ? "Sprint concluído 🎉 Você não tem mais cards marcados como “Não sei”." : "Nada aqui ainda para este filtro."
            }, void 0, false, {
                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                lineNumber: 758,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 rounded-2xl border border-white/10 bg-white/5 p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm opacity-70",
                                children: [
                                    safeIdx + 1,
                                    " de ",
                                    filteredCards.length
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                lineNumber: 764,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: [
                                    "text-xs px-3 py-1 rounded-full border",
                                    difficultyClass(curDifficulty)
                                ].join(" "),
                                children: difficultyLabel(curDifficulty)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                lineNumber: 768,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                        lineNumber: 763,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between text-xs opacity-70",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Progresso (deck atual)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 775,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            deckProgressPct,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                        lineNumber: 776,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                lineNumber: 774,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 h-2 rounded-full bg-white/10 overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full rounded-full bg-[#00FF8B]/50",
                                    style: {
                                        width: "".concat(deckProgressPct, "%")
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                    lineNumber: 779,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                lineNumber: 778,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                        lineNumber: 773,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlashcardCard, {}, void 0, false, {
                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                        lineNumber: 783,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlsRow, {}, void 0, false, {
                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                        lineNumber: 784,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                lineNumber: 762,
                columnNumber: 9
            }, this),
            studyMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[9998]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/70 backdrop-blur-sm",
                        onClick: leaveStudyMode
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                        lineNumber: 790,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-[9999] h-full w-full p-4 md:p-10 flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full max-w-4xl rounded-2xl border border-white/10 bg-[#0D0D0D] p-6 md:p-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between gap-3 flex-wrap",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm opacity-70",
                                                    children: "Study Mode"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                    lineNumber: 795,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-semibold text-lg",
                                                    children: topic || "Flashcards"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                    lineNumber: 796,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs opacity-60 mt-1",
                                                    children: "ESC para sair • clique fora para fechar"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                    lineNumber: 797,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                            lineNumber: 794,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setAutoAdvance((v)=>!v),
                                                    className: [
                                                        "px-3 py-2 rounded-xl border text-sm",
                                                        autoAdvance ? "border-[#00FF8B]/30 bg-[#00FF8B]/10 text-[#00FF8B]" : "border-white/10 bg-white/5 hover:bg-white/10 opacity-90"
                                                    ].join(" "),
                                                    children: autoAdvance ? "Auto: ON" : "Auto: OFF"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                    lineNumber: 801,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: leaveStudyMode,
                                                    className: "px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm",
                                                    children: "Sair (ESC)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                    lineNumber: 813,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                            lineNumber: 800,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                    lineNumber: 793,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between text-xs opacity-70",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        safeIdx + 1,
                                                        " de ",
                                                        filteredCards.length,
                                                        " • ",
                                                        filter === "smart" ? smartSprintReviewOnly ? "Sprint" : "Inteligente" : filter
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                    lineNumber: 824,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        deckProgressPct,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                    lineNumber: 827,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                            lineNumber: 823,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2 h-2 rounded-full bg-white/10 overflow-hidden",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-full rounded-full bg-[#00FF8B]/50",
                                                style: {
                                                    width: "".concat(deckProgressPct, "%")
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                                lineNumber: 830,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                            lineNumber: 829,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                    lineNumber: 822,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlashcardCard, {
                                            compact: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                            lineNumber: 835,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlsRow, {}, void 0, false, {
                                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                            lineNumber: 836,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                                    lineNumber: 834,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                            lineNumber: 792,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                        lineNumber: 791,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/FlashcardsSection.tsx",
                lineNumber: 789,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/FlashcardsSection.tsx",
        lineNumber: 565,
        columnNumber: 5
    }, this);
}
_s(FlashcardsSection, "/Iw0KuSi3ktGEK8tFwKZeth9fDQ=");
_c = FlashcardsSection;
var _c;
__turbopack_context__.k.register(_c, "FlashcardsSection");
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
function lengthLabel(l) {
    if (l === "short") return "Curto";
    if (l === "long") return "Longo";
    return "Médio";
}
// Estima o "tamanho" caso sua API não retorne summary.length
function estimateLength(summary) {
    const parts = [];
    if (summary === null || summary === void 0 ? void 0 : summary.title) parts.push(String(summary.title));
    const mainTopics = Array.isArray(summary === null || summary === void 0 ? void 0 : summary.mainTopics) ? summary.mainTopics : [];
    for (const t of mainTopics){
        parts.push(String((t === null || t === void 0 ? void 0 : t.title) || ""));
        parts.push(String((t === null || t === void 0 ? void 0 : t.content) || ""));
    }
    const keyPoints = Array.isArray(summary === null || summary === void 0 ? void 0 : summary.keyPoints) ? summary.keyPoints : [];
    for (const k of keyPoints)parts.push(String(k || ""));
    const size = parts.join(" ").trim().length;
    if (size < 900) return "short";
    if (size > 2200) return "long";
    return "medium";
}
function SummarySection(param) {
    let { data } = param;
    _s();
    const [topic, setTopic] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [tags, setTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [summary, setSummary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // 1) Se veio data do upload, usa imediatamente
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SummarySection.useEffect": ()=>{
            var _data_data;
            if (!data) return;
            const payload = (data === null || data === void 0 ? void 0 : data.topic) ? data : (data === null || data === void 0 ? void 0 : (_data_data = data.data) === null || _data_data === void 0 ? void 0 : _data_data.topic) ? data.data : data;
            var _payload_topic;
            setTopic((_payload_topic = payload === null || payload === void 0 ? void 0 : payload.topic) !== null && _payload_topic !== void 0 ? _payload_topic : "");
            var _payload_tags;
            setTags((_payload_tags = payload === null || payload === void 0 ? void 0 : payload.tags) !== null && _payload_tags !== void 0 ? _payload_tags : []);
            var _payload_summary;
            setSummary((_payload_summary = payload === null || payload === void 0 ? void 0 : payload.summary) !== null && _payload_summary !== void 0 ? _payload_summary : null);
        }
    }["SummarySection.useEffect"], [
        data
    ]);
    // 2) Fallback: carrega do store (localStorage) + live update
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SummarySection.useEffect": ()=>{
            const refresh = {
                "SummarySection.useEffect.refresh": ()=>{
                    const m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyMaterialStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadMaterial"])();
                    if (!m) return;
                    var _m_topic;
                    setTopic((_m_topic = m.topic) !== null && _m_topic !== void 0 ? _m_topic : "");
                    var _m_tags;
                    setTags((_m_tags = m.tags) !== null && _m_tags !== void 0 ? _m_tags : []);
                    var _m_summary;
                    setSummary((_m_summary = m.summary) !== null && _m_summary !== void 0 ? _m_summary : null);
                }
            }["SummarySection.useEffect.refresh"];
            // Só faz refresh inicial se não tiver summary vindo por props
            if (!data) refresh();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyMaterialStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onMaterialUpdated"])(refresh);
        }
    }["SummarySection.useEffect"], [
        data
    ]);
    const mainTopics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SummarySection.useMemo[mainTopics]": ()=>{
            var _this;
            const arr = (_this = summary) === null || _this === void 0 ? void 0 : _this.mainTopics;
            return Array.isArray(arr) ? arr : [];
        }
    }["SummarySection.useMemo[mainTopics]"], [
        summary
    ]);
    const keyPoints = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SummarySection.useMemo[keyPoints]": ()=>{
            var _this;
            const arr = (_this = summary) === null || _this === void 0 ? void 0 : _this.keyPoints;
            return Array.isArray(arr) ? arr : [];
        }
    }["SummarySection.useMemo[keyPoints]"], [
        summary
    ]);
    const sourceQuotes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SummarySection.useMemo[sourceQuotes]": ()=>{
            var _this;
            const arr = (_this = summary) === null || _this === void 0 ? void 0 : _this.sourceQuotes;
            return Array.isArray(arr) ? arr : [];
        }
    }["SummarySection.useMemo[sourceQuotes]"], [
        summary
    ]);
    const lengthValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SummarySection.useMemo[lengthValue]": ()=>{
            var _this;
            const l = (_this = summary) === null || _this === void 0 ? void 0 : _this.length;
            return typeof l === "string" ? l : estimateLength(summary);
        }
    }["SummarySection.useMemo[lengthValue]"], [
        summary
    ]);
    if (!summary) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "w-full max-w-5xl mx-auto mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-semibold",
                    children: "Resumos"
                }, void 0, false, {
                    fileName: "[project]/src/app/components/SummarySection.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-2 opacity-70",
                    children: "Faça um upload para gerar um resumo automaticamente."
                }, void 0, false, {
                    fileName: "[project]/src/app/components/SummarySection.tsx",
                    lineNumber: 89,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/SummarySection.tsx",
            lineNumber: 87,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "w-full max-w-5xl mx-auto mt-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm opacity-80",
                        children: [
                            "📝 Resumo gerado • ",
                            lengthLabel(lengthValue)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/SummarySection.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl font-semibold mt-4",
                        children: topic ? "".concat(topic, " — ").concat(summary.title) : summary.title
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/SummarySection.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    (tags === null || tags === void 0 ? void 0 : tags.length) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex flex-wrap justify-center gap-2",
                        children: tags.slice(0, 12).map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs px-3 py-1 rounded-full border border-white/10 bg-black/10 opacity-80",
                                children: [
                                    "#",
                                    t
                                ]
                            }, t, true, {
                                fileName: "[project]/src/app/components/SummarySection.tsx",
                                lineNumber: 108,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/SummarySection.tsx",
                        lineNumber: 106,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/SummarySection.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 space-y-4",
                children: mainTopics.map((t)=>{
                    var _t_id;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-white/10 bg-white/5 p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xl",
                                        children: t.icon || "📘"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/SummarySection.tsx",
                                        lineNumber: 124,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-semibold text-lg",
                                        children: t.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/SummarySection.tsx",
                                        lineNumber: 125,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/SummarySection.tsx",
                                lineNumber: 123,
                                columnNumber: 13
                            }, this),
                            Array.isArray(t === null || t === void 0 ? void 0 : t.tags) && t.tags.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 flex flex-wrap gap-2",
                                children: t.tags.slice(0, 10).map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs px-3 py-1 rounded-full border border-white/10 bg-black/10 opacity-80",
                                        children: [
                                            "#",
                                            tag
                                        ]
                                    }, tag, true, {
                                        fileName: "[project]/src/app/components/SummarySection.tsx",
                                        lineNumber: 132,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/SummarySection.tsx",
                                lineNumber: 130,
                                columnNumber: 15
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 opacity-80 leading-relaxed",
                                children: t.content
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/SummarySection.tsx",
                                lineNumber: 142,
                                columnNumber: 13
                            }, this)
                        ]
                    }, (_t_id = t.id) !== null && _t_id !== void 0 ? _t_id : t.title, true, {
                        fileName: "[project]/src/app/components/SummarySection.tsx",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/app/components/SummarySection.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            keyPoints.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 rounded-2xl border border-white/10 bg-white/5 p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold",
                        children: "Pontos-chave"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/SummarySection.tsx",
                        lineNumber: 150,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "mt-4 list-disc pl-6 space-y-2 opacity-80",
                        children: keyPoints.map((k, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: k
                            }, i, false, {
                                fileName: "[project]/src/app/components/SummarySection.tsx",
                                lineNumber: 153,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/SummarySection.tsx",
                        lineNumber: 151,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/SummarySection.tsx",
                lineNumber: 149,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 rounded-2xl border border-white/10 bg-white/5 p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between flex-wrap gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold",
                                children: "Trechos do material"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/SummarySection.tsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm opacity-70",
                                children: sourceQuotes.length ? "".concat(sourceQuotes.length, " trecho(s)") : "Sem trechos disponíveis"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/SummarySection.tsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/SummarySection.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this),
                    !sourceQuotes.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 opacity-70",
                        children: "Se o arquivo for imagem com texto pouco legível, ou PDF sem extração de texto, a IA pode não conseguir citar."
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/SummarySection.tsx",
                        lineNumber: 169,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 grid grid-cols-1 md:grid-cols-2 gap-4",
                        children: sourceQuotes.map((q, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border border-white/10 bg-black/10 p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm opacity-70",
                                        children: "Trecho"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/SummarySection.tsx",
                                        lineNumber: 176,
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
                                        lineNumber: 177,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 text-sm opacity-70",
                                        children: "Por que importa"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/SummarySection.tsx",
                                        lineNumber: 178,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 opacity-80",
                                        children: q.whyItMatters
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/SummarySection.tsx",
                                        lineNumber: 179,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/src/app/components/SummarySection.tsx",
                                lineNumber: 175,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/SummarySection.tsx",
                        lineNumber: 173,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/SummarySection.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/SummarySection.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_s(SummarySection, "cSwbMdLZF88zgzkFEnMVlefIhYY=");
_c = SummarySection;
var _c;
__turbopack_context__.k.register(_c, "SummarySection");
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
function pct(n) {
    return Math.max(0, Math.min(100, Math.round(n)));
}
function labelDifficulty(d) {
    if (d === "easy") return "Fácil";
    if (d === "hard") return "Difícil";
    return "Médio";
}
function ProgressSection() {
    _s();
    const [topic, setTopic] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [cards, setCards] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [knownIds, setKnownIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [reviewIds, setReviewIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [updatedAt, setUpdatedAt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ProgressSection.useMemo[key]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyProgressStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeProgressKey"])(topic, cards.length)
    }["ProgressSection.useMemo[key]"], [
        topic,
        cards.length
    ]);
    const refresh = ()=>{
        const m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyMaterialStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadMaterial"])();
        var _m_topic;
        const t = (_m_topic = m === null || m === void 0 ? void 0 : m.topic) !== null && _m_topic !== void 0 ? _m_topic : "";
        var _m_flashcards;
        const c = (_m_flashcards = m === null || m === void 0 ? void 0 : m.flashcards) !== null && _m_flashcards !== void 0 ? _m_flashcards : [];
        setTopic(t);
        setCards(c);
        const k = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyProgressStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeProgressKey"])(t, c.length);
        const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyProgressStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadProgress"])(k);
        var _p_knownIds;
        setKnownIds((_p_knownIds = p === null || p === void 0 ? void 0 : p.knownIds) !== null && _p_knownIds !== void 0 ? _p_knownIds : []);
        var _p_reviewIds;
        setReviewIds((_p_reviewIds = p === null || p === void 0 ? void 0 : p.reviewIds) !== null && _p_reviewIds !== void 0 ? _p_reviewIds : []);
        var _p_updatedAt;
        setUpdatedAt((_p_updatedAt = p === null || p === void 0 ? void 0 : p.updatedAt) !== null && _p_updatedAt !== void 0 ? _p_updatedAt : null);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProgressSection.useEffect": ()=>{
            refresh();
            const off1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyMaterialStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onMaterialUpdated"])(refresh);
            const off2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyProgressStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onProgressUpdated"])(refresh);
            return ({
                "ProgressSection.useEffect": ()=>{
                    off1 === null || off1 === void 0 ? void 0 : off1();
                    off2 === null || off2 === void 0 ? void 0 : off2();
                }
            })["ProgressSection.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["ProgressSection.useEffect"], []);
    const total = cards.length;
    const known = knownIds.length;
    const review = reviewIds.length;
    const masteredPct = total ? pct(known / total * 100) : 0;
    const remaining = Math.max(0, total - known - review);
    const byDifficulty = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ProgressSection.useMemo[byDifficulty]": ()=>{
            const diffs = [
                "easy",
                "medium",
                "hard"
            ];
            return diffs.map({
                "ProgressSection.useMemo[byDifficulty]": (d)=>{
                    const group = cards.filter({
                        "ProgressSection.useMemo[byDifficulty].group": (c)=>c.difficulty === d
                    }["ProgressSection.useMemo[byDifficulty].group"]);
                    const totalD = group.length;
                    const knownD = group.filter({
                        "ProgressSection.useMemo[byDifficulty]": (c)=>knownIds.includes(c.id)
                    }["ProgressSection.useMemo[byDifficulty]"]).length;
                    const reviewD = group.filter({
                        "ProgressSection.useMemo[byDifficulty]": (c)=>reviewIds.includes(c.id)
                    }["ProgressSection.useMemo[byDifficulty]"]).length;
                    const pctD = totalD ? pct(knownD / totalD * 100) : 0;
                    return {
                        d,
                        totalD,
                        knownD,
                        reviewD,
                        pctD
                    };
                }
            }["ProgressSection.useMemo[byDifficulty]"]);
        }
    }["ProgressSection.useMemo[byDifficulty]"], [
        cards,
        knownIds,
        reviewIds
    ]);
    if (!total) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "w-full max-w-5xl mx-auto mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-semibold",
                    children: "Progresso"
                }, void 0, false, {
                    fileName: "[project]/src/app/components/ProgressSection.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-2 opacity-70",
                    children: "Faça upload e gere flashcards para acompanhar seu progresso."
                }, void 0, false, {
                    fileName: "[project]/src/app/components/ProgressSection.tsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/ProgressSection.tsx",
            lineNumber: 75,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "w-full max-w-5xl mx-auto mt-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm opacity-80",
                        children: "📊 Progresso"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl font-semibold mt-4",
                        children: "Acompanhe seu Progresso"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    topic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 opacity-70",
                        children: topic
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                        lineNumber: 89,
                        columnNumber: 18
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/ProgressSection.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 rounded-2xl border border-white/10 bg-white/5 p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-4 flex-wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm opacity-70",
                                        children: "Dominado"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                                        lineNumber: 96,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-3xl font-semibold",
                                        children: [
                                            masteredPct,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                                        lineNumber: 97,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/ProgressSection.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm opacity-70",
                                children: updatedAt ? "Atualizado: ".concat(new Date(updatedAt).toLocaleString()) : ""
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/ProgressSection.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 h-3 rounded-full bg-white/10 overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full bg-green-500/40 rounded-full",
                            style: {
                                width: "".concat(masteredPct, "%")
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/ProgressSection.tsx",
                            lineNumber: 106,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 grid grid-cols-1 md:grid-cols-3 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border border-white/10 bg-black/10 p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm opacity-70",
                                        children: "Conhecidos"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                                        lineNumber: 111,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-2xl font-semibold",
                                        children: known
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                                        lineNumber: 112,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/ProgressSection.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border border-white/10 bg-black/10 p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm opacity-70",
                                        children: "Para revisar"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                                        lineNumber: 115,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-2xl font-semibold",
                                        children: review
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                                        lineNumber: 116,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/ProgressSection.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border border-white/10 bg-black/10 p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm opacity-70",
                                        children: "Não vistos"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                                        lineNumber: 119,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-2xl font-semibold",
                                        children: remaining
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                                        lineNumber: 120,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/ProgressSection.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 flex justify-end",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$studyProgressStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearProgress"])(key),
                            className: "px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm",
                            children: "Resetar progresso"
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/ProgressSection.tsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/ProgressSection.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 grid grid-cols-1 md:grid-cols-3 gap-4",
                children: byDifficulty.map((x)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-white/10 bg-white/5 p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-semibold",
                                        children: labelDifficulty(x.d)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                                        lineNumber: 139,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm opacity-70",
                                        children: [
                                            x.pctD,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                                        lineNumber: 140,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/ProgressSection.tsx",
                                lineNumber: 138,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 h-2 rounded-full bg-white/10 overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: [
                                        "h-full rounded-full",
                                        x.d === "easy" ? "bg-green-500/40" : x.d === "hard" ? "bg-red-500/40" : "bg-yellow-500/40"
                                    ].join(" "),
                                    style: {
                                        width: "".concat(x.pctD, "%")
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/ProgressSection.tsx",
                                    lineNumber: 144,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/ProgressSection.tsx",
                                lineNumber: 143,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 grid grid-cols-3 gap-2 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-xl border border-white/10 bg-black/10 p-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs opacity-70",
                                                children: "Total"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/ProgressSection.tsx",
                                                lineNumber: 155,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-lg font-semibold",
                                                children: x.totalD
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/ProgressSection.tsx",
                                                lineNumber: 156,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                                        lineNumber: 154,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-xl border border-white/10 bg-black/10 p-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs opacity-70",
                                                children: "Conhecidos"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/ProgressSection.tsx",
                                                lineNumber: 159,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-lg font-semibold",
                                                children: x.knownD
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/ProgressSection.tsx",
                                                lineNumber: 160,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                                        lineNumber: 158,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-xl border border-white/10 bg-black/10 p-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs opacity-70",
                                                children: "Revisar"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/ProgressSection.tsx",
                                                lineNumber: 163,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-lg font-semibold",
                                                children: x.reviewD
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/ProgressSection.tsx",
                                                lineNumber: 164,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                                        lineNumber: 162,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/ProgressSection.tsx",
                                lineNumber: 153,
                                columnNumber: 13
                            }, this)
                        ]
                    }, x.d, true, {
                        fileName: "[project]/src/app/components/ProgressSection.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/components/ProgressSection.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/ProgressSection.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
_s(ProgressSection, "fYJrjKWW5bc7DSNcqvckAg3jcag=");
_c = ProgressSection;
var _c;
__turbopack_context__.k.register(_c, "ProgressSection");
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
;
var _s = __turbopack_context__.k.signature();
"use client";
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
                                                lineNumber: 23,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 22,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#00FF8B] to-[#007B5F] bg-clip-text text-transparent",
                                            children: "Stud.ai"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 25,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 21,
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
                                            lineNumber: 31,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavButton, {
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
                                            label: "FlashCards",
                                            active: activeSection === "flashcards",
                                            onClick: ()=>setActiveSection("flashcards")
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 32,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavButton, {
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"],
                                            label: "Resumos",
                                            active: activeSection === "summary",
                                            onClick: ()=>setActiveSection("summary")
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 33,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavButton, {
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
                                            label: "Progresso",
                                            active: activeSection === "progress",
                                            onClick: ()=>setActiveSection("progress")
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 34,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 30,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1A1A] border border-[#00FF8B]/20",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                            className: "w-4 h-4 text-[#00FF8B]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 38,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-medium",
                                            children: "Nível 5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 39,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 37,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 20,
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
                                    lineNumber: 44,
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
                                    lineNumber: 45,
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
                                    lineNumber: 46,
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
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8",
                children: [
                    activeSection === "upload" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$UploadSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        onDataProcessed: (data)=>{
                            setStudyData(data);
                        },
                        onNavigate: (section)=>setActiveSection(section)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, this),
                    activeSection === "flashcards" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$FlashcardsSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        data: studyData
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 62,
                        columnNumber: 44
                    }, this),
                    activeSection === "summary" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$SummarySection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        data: studyData
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 63,
                        columnNumber: 41
                    }, this),
                    activeSection === "progress" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ProgressSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 64,
                        columnNumber: 42
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 52,
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
                                        lineNumber: 71,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "+1.2k estudantes ativos hoje"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 72,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-500",
                                children: "Feito com 💚 para estudantes"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 69,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_s(Home, "4RDoweeyjebS/24LuhRoiaZJh8Q=");
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
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: label
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 96,
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

//# sourceMappingURL=src_e7090220._.js.map