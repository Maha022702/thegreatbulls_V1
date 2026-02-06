(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
function Providers(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "f3ed20675a5172d538a45fb5e4ee405c897eca0656d3caedfd3e8323b4305652") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f3ed20675a5172d538a45fb5e4ee405c897eca0656d3caedfd3e8323b4305652";
    }
    const { children } = t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toaster"], {
            position: "top-right",
            toastOptions: {
                duration: 4000,
                style: {
                    background: "#1f2937",
                    color: "#fff",
                    border: "1px solid #374151"
                }
            }
        }, void 0, false, {
            fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Providers.tsx",
            lineNumber: 19,
            columnNumber: 10
        }, this);
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] !== children) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SessionProvider"], {
            children: [
                children,
                t1
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Providers.tsx",
            lineNumber: 33,
            columnNumber: 10
        }, this);
        $[2] = children;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    return t2;
}
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slottable"], {
            children: props.children
        }, void 0, false, {
            fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/ui/button.tsx",
            lineNumber: 47,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/ui/button.tsx",
        lineNumber: 42,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Button;
Button.displayName = "Button";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$React.forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navbar",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__ = __turbopack_context__.i("[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/node_modules/lucide-react/dist/esm/icons/trending-down.js [app-client] (ecmascript) <export default as TrendingDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function Navbar() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(20);
    if ($[0] !== "88f9bdd6153dbeb66d175012ee26b000102045a2c9e9f3f3de35931c9b610506") {
        for(let $i = 0; $i < 20; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "88f9bdd6153dbeb66d175012ee26b000102045a2c9e9f3f3de35931c9b610506";
    }
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = [
            {
                symbol: "NIFTY 50",
                price: "21,847.50",
                change: "+0.85%",
                isPositive: true
            },
            {
                symbol: "BANKNIFTY",
                price: "47,123.80",
                change: "-0.32%",
                isPositive: false
            },
            {
                symbol: "SENSEX",
                price: "71,234.56",
                change: "+0.67%",
                isPositive: true
            }
        ];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const [marketData, setMarketData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t0);
    const [showBanner, setShowBanner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    let t1;
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = ({
            "Navbar[useEffect()]": ()=>{
                const interval = setInterval({
                    "Navbar[useEffect() > setInterval()]": ()=>{
                        setMarketData(_NavbarUseEffectSetIntervalSetMarketData);
                    }
                }["Navbar[useEffect() > setInterval()]"], 15000);
                return ()=>clearInterval(interval);
            }
        })["Navbar[useEffect()]"];
        t2 = [];
        $[2] = t1;
        $[3] = t2;
    } else {
        t1 = $[2];
        t2 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
    let t3;
    if ($[4] !== showBanner) {
        t3 = showBanner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                height: 0,
                opacity: 0
            },
            animate: {
                height: "auto",
                opacity: 1
            },
            exit: {
                height: 0,
                opacity: 0
            },
            className: "bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 relative overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 py-3 flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                                    lineNumber: 78,
                                    columnNumber: 231
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold",
                                    children: "Early Bird Offer – Flat 30% off till 15th Feb | Only 47 seats left"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                                    lineNumber: 78,
                                    columnNumber: 260
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                            lineNumber: 78,
                            columnNumber: 186
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: {
                                "Navbar[<button>.onClick]": ()=>setShowBanner(false)
                            }["Navbar[<button>.onClick]"],
                            className: "text-slate-700 hover:text-slate-900",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                                lineNumber: 80,
                                columnNumber: 88
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                            lineNumber: 78,
                            columnNumber: 371
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                    lineNumber: 78,
                    columnNumber: 107
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"
                }, void 0, false, {
                    fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                    lineNumber: 80,
                    columnNumber: 128
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
            lineNumber: 69,
            columnNumber: 24
        }, this);
        $[4] = showBanner;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            children: t3
        }, void 0, false, {
            fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
            lineNumber: 88,
            columnNumber: 10
        }, this);
        $[6] = t3;
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    let t5;
    if ($[8] !== marketData) {
        t5 = marketData.map(_NavbarMarketDataMap);
        $[8] = marketData;
        $[9] = t5;
    } else {
        t5 = $[9];
    }
    let t6;
    if ($[10] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-slate-900 border-b border-slate-800",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 py-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center space-x-6 overflow-x-auto scrollbar-hide",
                    children: t5
                }, void 0, false, {
                    fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                    lineNumber: 104,
                    columnNumber: 111
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                lineNumber: 104,
                columnNumber: 66
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
            lineNumber: 104,
            columnNumber: 10
        }, this);
        $[10] = t5;
        $[11] = t6;
    } else {
        t6 = $[11];
    }
    let t7;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/",
            className: "flex-shrink-0 flex items-center group",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                className: "text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent",
                whileHover: {
                    scale: 1.05
                },
                transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                },
                children: "The Great Bulls"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                lineNumber: 112,
                columnNumber: 75
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
            lineNumber: 112,
            columnNumber: 10
        }, this);
        $[12] = t7;
    } else {
        t7 = $[12];
    }
    let t8;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center",
            children: [
                t7,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hidden md:ml-10 md:flex md:space-x-8",
                    children: [
                        {
                            href: "/courses",
                            label: "Courses"
                        },
                        {
                            href: "/webinars",
                            label: "Live Sessions"
                        },
                        {
                            href: "/blog",
                            label: "Market Insights"
                        },
                        {
                            href: "/testimonials",
                            label: "Success Stories"
                        }
                    ].map(_NavbarAnonymous)
                }, void 0, false, {
                    fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                    lineNumber: 125,
                    columnNumber: 49
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
            lineNumber: 125,
            columnNumber: 10
        }, this);
        $[13] = t8;
    } else {
        t8 = $[13];
    }
    let t9;
    if ($[14] !== session) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            className: "bg-slate-900/80 backdrop-blur-lg border-b border-slate-800/50 sticky top-0 z-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between h-16",
                    children: [
                        t8,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-4",
                            children: session ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/dashboard",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            className: "text-slate-300 hover:text-yellow-400 hover:bg-slate-800",
                                            children: "Dashboard"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                                            lineNumber: 144,
                                            columnNumber: 292
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                                        lineNumber: 144,
                                        columnNumber: 268
                                    }, this),
                                    session.user.role === "admin" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/admin",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            className: "text-slate-300 hover:text-yellow-400 hover:bg-slate-800",
                                            children: "Admin"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                                            lineNumber: 144,
                                            columnNumber: 463
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                                        lineNumber: 144,
                                        columnNumber: 443
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        className: "border-slate-700 text-slate-300 hover:bg-slate-800",
                                        onClick: _NavbarButtonOnClick,
                                        children: "Logout"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                                        lineNumber: 144,
                                        columnNumber: 577
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/login",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            className: "text-slate-300 hover:text-yellow-400 hover:bg-slate-800",
                                            children: "Login"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                                            lineNumber: 144,
                                            columnNumber: 783
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                                        lineNumber: 144,
                                        columnNumber: 763
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/courses",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            className: "bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 hover:from-yellow-500 hover:to-orange-600 font-semibold",
                                            children: "Join Now"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                                            lineNumber: 144,
                                            columnNumber: 918
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                                        lineNumber: 144,
                                        columnNumber: 896
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                                lineNumber: 144,
                                columnNumber: 718
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                            lineNumber: 144,
                            columnNumber: 210
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                    lineNumber: 144,
                    columnNumber: 163
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                lineNumber: 144,
                columnNumber: 107
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
            lineNumber: 144,
            columnNumber: 10
        }, this);
        $[14] = session;
        $[15] = t9;
    } else {
        t9 = $[15];
    }
    let t10;
    if ($[16] !== t4 || $[17] !== t6 || $[18] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                t4,
                t6,
                t9
            ]
        }, void 0, true);
        $[16] = t4;
        $[17] = t6;
        $[18] = t9;
        $[19] = t10;
    } else {
        t10 = $[19];
    }
    return t10;
}
_s(Navbar, "asc0AsQksyUQ9S5LZlN5RHcg6I0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"]
    ];
});
_c = Navbar;
function _NavbarButtonOnClick() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signOut"])();
}
function _NavbarAnonymous(item_1) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: item_1.href,
        className: "relative text-slate-300 hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-colors group",
        children: [
            item_1.label,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute inset-x-0 bottom-0 h-0.5 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                lineNumber: 166,
                columnNumber: 179
            }, this)
        ]
    }, item_1.href, true, {
        fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
        lineNumber: 166,
        columnNumber: 10
    }, this);
}
function _NavbarMarketDataMap(item_0, index) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: -10
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            delay: index * 0.1
        },
        className: "flex items-center space-x-2 text-sm whitespace-nowrap",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-slate-400 font-medium",
                children: item_0.symbol
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                lineNumber: 177,
                columnNumber: 72
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-white font-semibold",
                children: item_0.price
            }, void 0, false, {
                fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                lineNumber: 177,
                columnNumber: 139
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex items-center space-x-1 ${item_0.isPositive ? "text-green-400" : "text-red-400"}`,
                children: [
                    item_0.isPositive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                        className: "w-3 h-3"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                        lineNumber: 177,
                        columnNumber: 328
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__["TrendingDown"], {
                        className: "w-3 h-3"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                        lineNumber: 177,
                        columnNumber: 365
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-medium",
                        children: item_0.change
                    }, void 0, false, {
                        fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                        lineNumber: 177,
                        columnNumber: 402
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
                lineNumber: 177,
                columnNumber: 203
            }, this)
        ]
    }, item_0.symbol, true, {
        fileName: "[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/components/Navbar.tsx",
        lineNumber: 169,
        columnNumber: 10
    }, this);
}
function _NavbarUseEffectSetIntervalSetMarketData(prev) {
    return prev.map(_NavbarUseEffectSetIntervalSetMarketDataPrevMap);
}
function _NavbarUseEffectSetIntervalSetMarketDataPrevMap(item) {
    return {
        ...item,
        price: (parseFloat(item.price.replace(",", "")) + (Math.random() - 0.5) * 10).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        change: `${(Math.random() - 0.5) * 2 > 0 ? "+" : ""}${(Math.random() * 2).toFixed(2)}%`,
        isPositive: Math.random() > 0.5
    };
}
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Documents_Projects_thegreatbulls-react_thegreatbulls_v1_src_0a1f7ce5._.js.map