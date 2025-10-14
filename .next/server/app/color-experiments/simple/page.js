(()=>{var t={};t.id=234,t.ids=[234],t.modules={2934:t=>{"use strict";t.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:t=>{"use strict";t.exports=require("next/dist/client/components/request-async-storage.external")},4580:t=>{"use strict";t.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:t=>{"use strict";t.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:t=>{"use strict";t.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:t=>{"use strict";t.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},1017:t=>{"use strict";t.exports=require("path")},7310:t=>{"use strict";t.exports=require("url")},1777:(t,a,e)=>{"use strict";e.r(a),e.d(a,{GlobalError:()=>o.a,__next_app__:()=>s,originalPathname:()=>g,pages:()=>d,routeModule:()=>b,tree:()=>p});var n=e(7096),i=e(6132),r=e(7284),o=e.n(r),l=e(2564),c={};for(let t in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(t)&&(c[t]=()=>l[t]);e.d(a,c);let p=["",{children:["color-experiments",{children:["simple",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(e.bind(e,8984)),"/Users/sambrause/Downloads/aesthetics-ai-demo REVERTED/src/app/color-experiments/simple/page.tsx"]}]},{}]},{metadata:{icon:[async t=>(await Promise.resolve().then(e.bind(e,3881))).default(t)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(e.bind(e,3100)),"/Users/sambrause/Downloads/aesthetics-ai-demo REVERTED/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(e.t.bind(e,9291,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async t=>(await Promise.resolve().then(e.bind(e,3881))).default(t)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["/Users/sambrause/Downloads/aesthetics-ai-demo REVERTED/src/app/color-experiments/simple/page.tsx"],g="/color-experiments/simple/page",s={require:e,loadChunk:()=>Promise.resolve()},b=new n.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/color-experiments/simple/page",pathname:"/color-experiments/simple",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:p}})},1385:(t,a,e)=>{Promise.resolve().then(e.bind(e,5836))},5836:(t,a,e)=>{"use strict";e.r(a),e.d(a,{default:()=>o});var n=e(3854),i=e(9181),r=e(1018);function o(){let t=(0,r.useRouter)();return(0,n.jsxs)("div",{className:"min-h-screen",style:{backgroundColor:"#FFFFFF",color:"#1F2937"},children:[n.jsx("div",{className:"fixed top-4 left-4 z-50 px-4 py-2 rounded-lg text-sm font-medium shadow-sm",style:{backgroundColor:"#374151",color:"#FFFFFF",border:"1px solid #6B7280"},children:"Grayscale Design"}),n.jsx("style",{dangerouslySetInnerHTML:{__html:`
          :root {
            --color-primary: #374151;
            --color-secondary: #6B7280;
            --color-accent: #4B5563;
            --color-background: #FFFFFF;
            --color-surface: #F9FAFB;
            --color-text: #1F2937;
            --color-text-secondary: #6B7280;
            --color-border: #D1D5DB;
            --color-success: #374151;
            --color-warning: #4B5563;
            --color-error: #374151;
          }
          
          /* Grayscale design with proper hierarchy */
          .patient-detail-container {
            background: #FFFFFF !important;
          }
          
          .patient-detail-container .bg-gradient-to-br {
            background: #FFFFFF !important;
          }
          
          .patient-detail-container .from-black,
          .patient-detail-container .via-gray-900,
          .patient-detail-container .to-black {
            background: #FFFFFF !important;
          }
          
          /* Header with light gray background and dark text */
          .patient-detail-container .patient-header {
            background: #F9FAFB !important;
            border-bottom: 1px solid #D1D5DB !important;
          }
          
          .patient-detail-container .bg-gray-800\\/50 {
            background-color: #F9FAFB !important;
          }
          
          .patient-detail-container .border-gray-700\\/50 {
            border-color: #D1D5DB !important;
          }
          
          /* Text hierarchy with grayscale - all dark text on light backgrounds */
          .patient-detail-container .text-gray-400 {
            color: #6B7280 !important;
            font-weight: 400 !important;
          }
          
          .patient-detail-container .text-white {
            color: #1F2937 !important;
            font-weight: 600 !important;
          }
          
          .patient-detail-container .hover\\:text-white:hover {
            color: #1F2937 !important;
          }
          
          .patient-detail-container .hover\\:bg-gray-700\\/50:hover {
            background-color: #F3F4F6 !important;
          }
          
          /* Primary buttons - light gray background with dark text */
          .patient-detail-container .bg-gradient-to-r.from-blue-600.to-purple-600 {
            background: #F3F4F6 !important;
            color: #1F2937 !important;
            border: 1px solid #D1D5DB !important;
            font-weight: 600 !important;
          }
          
          .patient-detail-container .shadow-blue-500\\/25 {
            box-shadow: 0 4px 6px -1px rgba(55, 65, 81, 0.2), 0 2px 4px -1px rgba(55, 65, 81, 0.1) !important;
          }
          
          .patient-detail-container .text-gray-600 {
            color: #6B7280 !important;
            font-weight: 400 !important;
          }
          
          .patient-detail-container .border-gray-900 {
            border-color: #6B7280 !important;
          }
          
          .patient-detail-container .bg-gray-200 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          .patient-detail-container .text-gray-800 {
            color: #1F2937 !important;
            font-weight: 600 !important;
          }
          
          .patient-detail-container .text-gray-900 {
            color: #1F2937 !important;
            font-weight: 700 !important;
          }
          
          .patient-detail-container .bg-white {
            background-color: #FFFFFF !important;
            color: #1F2937 !important;
          }
          
          .patient-detail-container .text-black {
            color: #1F2937 !important;
            font-weight: 600 !important;
          }
          
          .patient-detail-container .hover\\:bg-gray-100:hover {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          .patient-detail-container .bg-gray-100 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          .patient-detail-container .text-gray-500 {
            color: #6B7280 !important;
            font-weight: 400 !important;
          }
          
          .patient-detail-container .text-gray-700 {
            color: #1F2937 !important;
            font-weight: 500 !important;
          }
          
          .patient-detail-container .border-gray-200 {
            border-color: #D1D5DB !important;
          }
          
          .patient-detail-container .border-gray-300 {
            border-color: #D1D5DB !important;
          }
          
          .patient-detail-container .bg-gray-50 {
            background-color: #F9FAFB !important;
            color: #1F2937 !important;
          }
          
          .patient-detail-container .bg-gray-600 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          .patient-detail-container .bg-gray-700 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          .patient-detail-container .bg-gray-800 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          .patient-detail-container .bg-gray-900 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          .patient-detail-container .text-gray-300 {
            color: #9CA3AF !important;
          }
          
          .patient-detail-container .text-gray-200 {
            color: #E5E7EB !important;
          }
          
          .patient-detail-container .text-gray-100 {
            color: #F3F4F6 !important;
          }
          
          /* Colored elements become light grayscale */
          .patient-detail-container .bg-blue-500 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          .patient-detail-container .bg-blue-600 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          .patient-detail-container .bg-purple-500 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          .patient-detail-container .bg-purple-600 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          .patient-detail-container .bg-pink-500 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          .patient-detail-container .text-blue-400 {
            color: #6B7280 !important;
          }
          
          .patient-detail-container .text-purple-400 {
            color: #6B7280 !important;
          }
          
          .patient-detail-container .text-pink-400 {
            color: #9CA3AF !important;
          }
          
          /* Remove gradients and use light grayscale */
          .patient-detail-container .from-blue-400,
          .patient-detail-container .via-purple-400,
          .patient-detail-container .to-pink-400,
          .patient-detail-container .from-gray-600,
          .patient-detail-container .to-gray-900,
          .patient-detail-container .dark\\:from-white,
          .patient-detail-container .dark\\:via-gray-200,
          .patient-detail-container .dark\\:to-gray-400,
          .patient-detail-container .from-cyan-600,
          .patient-detail-container .to-blue-600,
          .patient-detail-container .from-yellow-500,
          .patient-detail-container .to-green-500,
          .patient-detail-container .from-yellow-600,
          .patient-detail-container .to-yellow-500,
          .patient-detail-container .from-orange-500,
          .patient-detail-container .to-yellow-500 {
            background: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          .patient-detail-container .dark\\:text-white {
            color: #1F2937 !important;
          }
          
          /* Other colored elements become light grayscale */
          .patient-detail-container .bg-cyan-500 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          .patient-detail-container .bg-cyan-600 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          .patient-detail-container .text-cyan-400 {
            color: #6B7280 !important;
          }
          
          .patient-detail-container .border-cyan-400 {
            border-color: #D1D5DB !important;
          }
          
          .patient-detail-container .bg-orange-500 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          .patient-detail-container .bg-orange-400 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          .patient-detail-container .text-orange-400 {
            color: #6B7280 !important;
          }
          
          .patient-detail-container .bg-yellow-500 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          .patient-detail-container .bg-yellow-400 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          .patient-detail-container .text-yellow-400 {
            color: #6B7280 !important;
          }
          
          /* Clean grayscale shadows */
          .patient-detail-container .shadow-lg {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
          }
          
          .patient-detail-container .shadow-xl {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
          }
          
          /* Remove animated background elements */
          .patient-detail-container .absolute.inset-0.overflow-hidden.pointer-events-none {
            display: none !important;
          }
          
          /* Clean button and card styling */
          .patient-detail-container button {
            border-radius: 8px !important;
            font-weight: 500 !important;
            transition: all 0.15s ease !important;
          }
          
          .patient-detail-container .rounded-2xl {
            border-radius: 12px !important;
          }
          
          .patient-detail-container .rounded-xl {
            border-radius: 8px !important;
          }
          
          /* Card styling with gray borders */
          .patient-detail-container .rounded-2xl.border {
            border: 1px solid #D1D5DB !important;
            background: #FFFFFF !important;
            color: #1F2937 !important;
          }
          
          /* Tab navigation with light gray */
          .patient-detail-container .bg-gray-800\\/50.rounded-xl {
            background: #F9FAFB !important;
            border: 1px solid #D1D5DB !important;
            color: #1F2937 !important;
          }
          
          /* Findings cards with clean light design */
          .patient-detail-container .bg-gradient-to-r.from-blue-900\\/30.to-cyan-900\\/30 {
            background: #FFFFFF !important;
            border: 1px solid #D1D5DB !important;
            color: #1F2937 !important;
          }
          
          .patient-detail-container .border-blue-700\\/50 {
            border-color: #D1D5DB !important;
          }
          
          .patient-detail-container .hover\\:border-blue-600\\/70:hover {
            border-color: #6B7280 !important;
          }
          
          .patient-detail-container .hover\\:shadow-blue-500\\/20:hover {
            box-shadow: 0 4px 6px -1px rgba(107, 114, 128, 0.1), 0 2px 4px -1px rgba(107, 114, 128, 0.06) !important;
          }
          
          /* Findings shortlist - new color scheme */
          .patient-detail-container .bg-pink-500,
          .patient-detail-container .bg-pink-400,
          .patient-detail-container .bg-pink-300,
          .patient-detail-container .bg-pink-200,
          .patient-detail-container .bg-pink-100 {
            background-color: #E8F4F8 !important;
            color: #1F2937 !important;
            border: 1px solid #B8D4D1 !important;
          }
          
          .patient-detail-container .text-pink-500,
          .patient-detail-container .text-pink-400,
          .patient-detail-container .text-pink-300,
          .patient-detail-container .text-pink-200,
          .patient-detail-container .text-pink-100 {
            color: #111827 !important;
            font-weight: 600 !important;
          }
          
          /* Additional findings shortlist styling - darker text */
          .patient-detail-container .bg-blue-500,
          .patient-detail-container .bg-blue-400,
          .patient-detail-container .bg-blue-300,
          .patient-detail-container .bg-blue-200,
          .patient-detail-container .bg-blue-100 {
            background-color: #E8F4F8 !important;
            color: #111827 !important;
            border: 1px solid #B8D4D1 !important;
          }
          
          .patient-detail-container .bg-purple-500,
          .patient-detail-container .bg-purple-400,
          .patient-detail-container .bg-purple-300,
          .patient-detail-container .bg-purple-200,
          .patient-detail-container .bg-purple-100 {
            background-color: #F0F4F8 !important;
            color: #111827 !important;
            border: 1px solid #C7D6D7 !important;
          }
          
          .patient-detail-container .bg-cyan-500,
          .patient-detail-container .bg-cyan-400,
          .patient-detail-container .bg-cyan-300,
          .patient-detail-container .bg-cyan-200,
          .patient-detail-container .bg-cyan-100 {
            background-color: #F0F4F8 !important;
            color: #111827 !important;
            border: 1px solid #C7D6D7 !important;
          }
          
          /* Additional color variations for findings shortlist - darker text */
          .patient-detail-container .bg-green-500,
          .patient-detail-container .bg-green-400,
          .patient-detail-container .bg-green-300,
          .patient-detail-container .bg-green-200,
          .patient-detail-container .bg-green-100 {
            background-color: #F0F8F0 !important;
            color: #111827 !important;
            border: 1px solid #C8E6C8 !important;
          }
          
          .patient-detail-container .bg-orange-500,
          .patient-detail-container .bg-orange-400,
          .patient-detail-container .bg-orange-300,
          .patient-detail-container .bg-orange-200,
          .patient-detail-container .bg-orange-100 {
            background-color: #FFF8F0 !important;
            color: #111827 !important;
            border: 1px solid #F5D5A3 !important;
          }
          
          .patient-detail-container .bg-yellow-500,
          .patient-detail-container .bg-yellow-400,
          .patient-detail-container .bg-yellow-300,
          .patient-detail-container .bg-yellow-200,
          .patient-detail-container .bg-yellow-100 {
            background-color: #FFFEF0 !important;
            color: #111827 !important;
            border: 1px solid #F5F0A3 !important;
          }
          
          .patient-detail-container .bg-indigo-500,
          .patient-detail-container .bg-indigo-400,
          .patient-detail-container .bg-indigo-300,
          .patient-detail-container .bg-indigo-200,
          .patient-detail-container .bg-indigo-100 {
            background-color: #F0F4FF !important;
            color: #111827 !important;
            border: 1px solid #D1D9FF !important;
          }
          
          .patient-detail-container .bg-teal-500,
          .patient-detail-container .bg-teal-400,
          .patient-detail-container .bg-teal-300,
          .patient-detail-container .bg-teal-200,
          .patient-detail-container .bg-teal-100 {
            background-color: #F0FDFA !important;
            color: #111827 !important;
            border: 1px solid #C8F7F0 !important;
          }
          
          /* Findings shortlist title - make text darker gray */
          .patient-detail-container .text-gray-500,
          .patient-detail-container .text-gray-400,
          .patient-detail-container .text-gray-300 {
            color: #1F2937 !important;
            font-weight: 600 !important;
          }
          
          /* Score backgrounds - make them lighter gray */
          .patient-detail-container .bg-gray-200,
          .patient-detail-container .bg-gray-100,
          .patient-detail-container .bg-gray-50 {
            background-color: #F9FAFB !important;
            color: #1F2937 !important;
          }
          
          /* Additional targeting for findings shortlist title text */
          .patient-detail-container .text-gray-600,
          .patient-detail-container .text-gray-500,
          .patient-detail-container .text-gray-400,
          .patient-detail-container .text-gray-300,
          .patient-detail-container .text-gray-200 {
            color: #1F2937 !important;
            font-weight: 600 !important;
          }
          
          /* Score elements - make backgrounds even lighter */
          .patient-detail-container .bg-gray-300,
          .patient-detail-container .bg-gray-200,
          .patient-detail-container .bg-gray-100,
          .patient-detail-container .bg-gray-50 {
            background-color: #F9FAFB !important;
            color: #1F2937 !important;
          }
          
          /* Analysis score backgrounds - make them very light */
          .patient-detail-container .bg-blue-100,
          .patient-detail-container .bg-blue-200,
          .patient-detail-container .bg-purple-100,
          .patient-detail-container .bg-purple-200,
          .patient-detail-container .bg-cyan-100,
          .patient-detail-container .bg-cyan-200 {
            background-color: #F9FAFB !important;
            color: #1F2937 !important;
          }
          
          /* All score backgrounds - make them light gray instead of dark */
          .patient-detail-container .bg-blue-500,
          .patient-detail-container .bg-blue-400,
          .patient-detail-container .bg-blue-300,
          .patient-detail-container .bg-purple-500,
          .patient-detail-container .bg-purple-400,
          .patient-detail-container .bg-purple-300,
          .patient-detail-container .bg-cyan-500,
          .patient-detail-container .bg-cyan-400,
          .patient-detail-container .bg-cyan-300,
          .patient-detail-container .bg-green-500,
          .patient-detail-container .bg-green-400,
          .patient-detail-container .bg-green-300,
          .patient-detail-container .bg-orange-500,
          .patient-detail-container .bg-orange-400,
          .patient-detail-container .bg-orange-300,
          .patient-detail-container .bg-yellow-500,
          .patient-detail-container .bg-yellow-400,
          .patient-detail-container .bg-yellow-300 {
            background-color: #F9FAFB !important;
            color: #1F2937 !important;
          }
          
          /* Findings shortlist text - make all text dark for readability */
          .patient-detail-container .text-white,
          .patient-detail-container .text-gray-100,
          .patient-detail-container .text-gray-200,
          .patient-detail-container .text-gray-300 {
            color: #1F2937 !important;
            font-weight: 500 !important;
          }
          
          /* Findings shortlist title specifically */
          .patient-detail-container .text-gray-400,
          .patient-detail-container .text-gray-500,
          .patient-detail-container .text-gray-600 {
            color: #1F2937 !important;
            font-weight: 600 !important;
          }
          
          /* Comprehensive targeting for all score backgrounds */
          .patient-detail-container .bg-blue-600,
          .patient-detail-container .bg-blue-700,
          .patient-detail-container .bg-blue-800,
          .patient-detail-container .bg-purple-600,
          .patient-detail-container .bg-purple-700,
          .patient-detail-container .bg-purple-800,
          .patient-detail-container .bg-cyan-600,
          .patient-detail-container .bg-cyan-700,
          .patient-detail-container .bg-cyan-800,
          .patient-detail-container .bg-green-600,
          .patient-detail-container .bg-green-700,
          .patient-detail-container .bg-green-800,
          .patient-detail-container .bg-orange-600,
          .patient-detail-container .bg-orange-700,
          .patient-detail-container .bg-orange-800,
          .patient-detail-container .bg-yellow-600,
          .patient-detail-container .bg-yellow-700,
          .patient-detail-container .bg-yellow-800 {
            background-color: #F9FAFB !important;
            color: #1F2937 !important;
          }
          
          /* All findings shortlist text elements - make darker */
          .patient-detail-container .text-blue-400,
          .patient-detail-container .text-blue-500,
          .patient-detail-container .text-purple-400,
          .patient-detail-container .text-purple-500,
          .patient-detail-container .text-cyan-400,
          .patient-detail-container .text-cyan-500,
          .patient-detail-container .text-green-400,
          .patient-detail-container .text-green-500,
          .patient-detail-container .text-orange-400,
          .patient-detail-container .text-orange-500,
          .patient-detail-container .text-yellow-400,
          .patient-detail-container .text-yellow-500 {
            color: #111827 !important;
            font-weight: 600 !important;
          }
          
          /* Additional findings shortlist text colors */
          .patient-detail-container .text-indigo-400,
          .patient-detail-container .text-indigo-500,
          .patient-detail-container .text-teal-400,
          .patient-detail-container .text-teal-500,
          .patient-detail-container .text-pink-400,
          .patient-detail-container .text-pink-500 {
            color: #111827 !important;
            font-weight: 600 !important;
          }
          
          /* Remove ALL dark gray backgrounds - make everything light gray */
          .patient-detail-container .bg-gray-900,
          .patient-detail-container .bg-gray-800,
          .patient-detail-container .bg-gray-700,
          .patient-detail-container .bg-gray-600,
          .patient-detail-container .bg-gray-500,
          .patient-detail-container .bg-gray-400 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          /* Specific targeting for area findings horizontal bars */
          .patient-detail-container .bg-gray-800\\/50,
          .patient-detail-container .bg-gray-700\\/50,
          .patient-detail-container .bg-gray-600\\/50,
          .patient-detail-container .bg-gray-500\\/50,
          .patient-detail-container .bg-gray-400\\/50 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          /* Area findings headers - make them light gray */
          .patient-detail-container .bg-gray-900,
          .patient-detail-container .bg-gray-800,
          .patient-detail-container .bg-gray-700 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          /* Analysis score text - remove background */
          .patient-detail-container .bg-gradient-to-r,
          .patient-detail-container .bg-blue-500,
          .patient-detail-container .bg-blue-400,
          .patient-detail-container .bg-blue-300,
          .patient-detail-container .bg-blue-200,
          .patient-detail-container .bg-blue-100 {
            background: transparent !important;
            color: #1F2937 !important;
          }
          
          /* Percentage bar styling - make it fill to the actual percentage */
          .patient-detail-container .w-\\[\\d+%\\] {
            background-color: #6B7280 !important;
          }
          
          .patient-detail-container .bg-blue-500,
          .patient-detail-container .bg-blue-400,
          .patient-detail-container .bg-blue-300 {
            background-color: #6B7280 !important;
          }
          
          /* Severity badges with light grayscale - dark text on light backgrounds */
          .patient-detail-container .text-orange-400 {
            color: #1F2937 !important;
            font-weight: 600 !important;
          }
          
          .patient-detail-container .bg-orange-500\\/20 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          .patient-detail-container .border-orange-500\\/50 {
            border-color: #D1D5DB !important;
          }
          
          .patient-detail-container .text-yellow-400 {
            color: #1F2937 !important;
            font-weight: 600 !important;
          }
          
          .patient-detail-container .bg-yellow-500\\/20 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          .patient-detail-container .border-yellow-500\\/50 {
            border-color: #D1D5DB !important;
          }
          
          /* Green elements become light grayscale */
          .patient-detail-container .text-green-400 {
            color: #1F2937 !important;
          }
          
          .patient-detail-container .bg-green-500\\/20 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          .patient-detail-container .border-green-500\\/50 {
            border-color: #D1D5DB !important;
          }
          
          /* Additional specific fixes for findings and analysis */
          
          /* Remove any remaining dark backgrounds from analysis sections */
          .patient-detail-container .bg-gray-900,
          .patient-detail-container .bg-gray-800,
          .patient-detail-container .bg-gray-700 {
            background-color: #F9FAFB !important;
            color: #1F2937 !important;
          }
          
          /* Analysis score text - ensure no background */
          .patient-detail-container .text-4xl,
          .patient-detail-container .text-3xl,
          .patient-detail-container .text-2xl,
          .patient-detail-container .text-xl {
            background: transparent !important;
            color: #1F2937 !important;
          }
          
          /* Progress bars - make them fill to actual percentage with gray color */
          .patient-detail-container .bg-blue-500,
          .patient-detail-container .bg-blue-400,
          .patient-detail-container .bg-blue-300,
          .patient-detail-container .bg-blue-200,
          .patient-detail-container .bg-blue-100,
          .patient-detail-container .bg-gradient-to-r {
            background-color: #6B7280 !important;
          }
          
          /* Remove any gradient backgrounds from score displays */
          .patient-detail-container .from-blue-500,
          .patient-detail-container .to-blue-600,
          .patient-detail-container .from-blue-400,
          .patient-detail-container .to-blue-500 {
            background: transparent !important;
            color: #1F2937 !important;
          }
          
          /* Findings section headers - very light background */
          .patient-detail-container .bg-gray-800\\/50,
          .patient-detail-container .bg-gray-700\\/50,
          .patient-detail-container .bg-gray-600\\/50 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          /* Additional targeting for area findings horizontal bars */
          .patient-detail-container .rounded-xl,
          .patient-detail-container .rounded-lg,
          .patient-detail-container .rounded-md {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          /* Target any remaining dark elements in findings sections */
          .patient-detail-container .bg-opacity-50,
          .patient-detail-container .bg-opacity-75,
          .patient-detail-container .bg-opacity-90 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          /* Analysis tab area section headers - make them light gray */
          .patient-detail-container .bg-gray-900,
          .patient-detail-container .bg-gray-800,
          .patient-detail-container .bg-gray-700,
          .patient-detail-container .bg-gray-600,
          .patient-detail-container .bg-gray-500 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          /* Specific targeting for analysis tab headers */
          .patient-detail-container .bg-gray-800\\/50,
          .patient-detail-container .bg-gray-700\\/50,
          .patient-detail-container .bg-gray-600\\/50,
          .patient-detail-container .bg-gray-500\\/50 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          /* Analysis tab section headers with borders */
          .patient-detail-container .border-gray-800,
          .patient-detail-container .border-gray-700,
          .patient-detail-container .border-gray-600 {
            border-color: #D1D5DB !important;
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          /* Additional targeting for analysis tab area headers */
          .patient-detail-container .bg-gray-900\\/50,
          .patient-detail-container .bg-gray-800\\/50,
          .patient-detail-container .bg-gray-700\\/50,
          .patient-detail-container .bg-gray-600\\/50,
          .patient-detail-container .bg-gray-500\\/50 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          /* Target any remaining dark analysis tab elements */
          .patient-detail-container .bg-gray-900\\/75,
          .patient-detail-container .bg-gray-800\\/75,
          .patient-detail-container .bg-gray-700\\/75,
          .patient-detail-container .bg-gray-600\\/75 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          /* Analysis tab section headers - ensure all are light gray */
          .patient-detail-container .bg-gray-900\\/90,
          .patient-detail-container .bg-gray-800\\/90,
          .patient-detail-container .bg-gray-700\\/90,
          .patient-detail-container .bg-gray-600\\/90 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          /* Comprehensive rule to remove ALL remaining dark gray backgrounds */
          .patient-detail-container [class*="bg-gray-9"],
          .patient-detail-container [class*="bg-gray-8"],
          .patient-detail-container [class*="bg-gray-7"],
          .patient-detail-container [class*="bg-gray-6"],
          .patient-detail-container [class*="bg-gray-5"],
          .patient-detail-container [class*="bg-gray-4"] {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          /* Target any remaining dark backgrounds with opacity */
          .patient-detail-container [class*="bg-gray-9/"],
          .patient-detail-container [class*="bg-gray-8/"],
          .patient-detail-container [class*="bg-gray-7/"],
          .patient-detail-container [class*="bg-gray-6/"],
          .patient-detail-container [class*="bg-gray-5/"],
          .patient-detail-container [class*="bg-gray-4/"] {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          /* Ultra-comprehensive targeting for ANY remaining dark gray */
          .patient-detail-container [class*="bg-gray-"],
          .patient-detail-container [class*="bg-slate-"],
          .patient-detail-container [class*="bg-zinc-"],
          .patient-detail-container [class*="bg-neutral-"],
          .patient-detail-container [class*="bg-stone-"] {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          /* Target any dark backgrounds with any opacity */
          .patient-detail-container [class*="bg-gray-"]:not([class*="bg-gray-1"]):not([class*="bg-gray-2"]):not([class*="bg-gray-3"]) {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          /* Catch any remaining dark elements */
          .patient-detail-container .bg-black,
          .patient-detail-container .bg-gray-900,
          .patient-detail-container .bg-gray-800,
          .patient-detail-container .bg-gray-700,
          .patient-detail-container .bg-gray-600,
          .patient-detail-container .bg-gray-500,
          .patient-detail-container .bg-gray-400 {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          /* Final comprehensive catch-all for any dark backgrounds */
          .patient-detail-container [style*="background-color: rgb(17, 24, 39)"],
          .patient-detail-container [style*="background-color: rgb(31, 41, 55)"],
          .patient-detail-container [style*="background-color: rgb(55, 65, 81)"],
          .patient-detail-container [style*="background-color: rgb(75, 85, 99)"],
          .patient-detail-container [style*="background-color: rgb(107, 114, 128)"],
          .patient-detail-container [style*="background-color: rgb(156, 163, 175)"],
          .patient-detail-container [style*="background-color: #111827"],
          .patient-detail-container [style*="background-color: #1F2937"],
          .patient-detail-container [style*="background-color: #374151"],
          .patient-detail-container [style*="background-color: #4B5563"],
          .patient-detail-container [style*="background-color: #6B7280"],
          .patient-detail-container [style*="background-color: #9CA3AF"] {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          /* Target any elements with dark colors in their class names */
          .patient-detail-container [class*="dark"],
          .patient-detail-container [class*="black"],
          .patient-detail-container [class*="gray-9"],
          .patient-detail-container [class*="gray-8"],
          .patient-detail-container [class*="gray-7"],
          .patient-detail-container [class*="gray-6"],
          .patient-detail-container [class*="gray-5"],
          .patient-detail-container [class*="gray-4"] {
            background-color: #F3F4F6 !important;
            color: #1F2937 !important;
          }
          
          /* Clean spacing */
          .patient-detail-container .p-6 {
            padding: 1.5rem !important;
          }
          
          .patient-detail-container .p-4 {
            padding: 1rem !important;
          }
          
          .patient-detail-container .mb-6 {
            margin-bottom: 1.5rem !important;
          }
          
          .patient-detail-container .mb-4 {
            margin-bottom: 1rem !important;
          }
        `}}),n.jsx(i.Q,{patient:{id:"1001",name:"Sydney Adams",age:28,email:"sydney.adams@email.com",phone:"(555) 123-4567",lastVisit:"2024-01-15",score:78,findings:[{name:"Forehead Wrinkles",severity:"moderate",score:70},{name:"Dark Spots",severity:"mild",score:60},{name:"Nasolabial Folds",severity:"moderate",score:75},{name:"Marionette Lines",severity:"moderate",score:72},{name:"Red Spots",severity:"mild",score:55},{name:"Whiteheads",severity:"mild",score:50},{name:"Temporal Hollow",severity:"moderate",score:68},{name:"Under Eye Hollow",severity:"moderate",score:70},{name:"Upper Eye Hollow",severity:"mild",score:62},{name:"Lower Eyelid Sag",severity:"moderate",score:65},{name:"Mid Cheek Flattening",severity:"moderate",score:72},{name:"Crooked Nose",severity:"mild",score:58},{name:"Dorsal Hump",severity:"mild",score:60},{name:"Dry Lips",severity:"mild",score:55},{name:"Excess/Submental Fullness",severity:"moderate",score:68},{name:"Prejowl Sulcus",severity:"moderate",score:70},{name:"Retruded Chin",severity:"moderate",score:72},{name:"Masseter Hypertrophy",severity:"mild",score:58}],frontImage:"/Sydney Adams Front.png",sideImage:"/Sydney Adams Side.png",scanDate:"December 15, 2024"},onBack:()=>{t.push("/provider/patients")},onOpenAreaAnalysis:t=>{console.log("Open area analysis:",t)}})]})}},8984:(t,a,e)=>{"use strict";e.r(a),e.d(a,{$$typeof:()=>o,__esModule:()=>r,default:()=>c});var n=e(5153);let i=(0,n.createProxy)(String.raw`/Users/sambrause/Downloads/aesthetics-ai-demo REVERTED/src/app/color-experiments/simple/page.tsx`),{__esModule:r,$$typeof:o}=i,l=i.default,c=l}};var a=require("../../../webpack-runtime.js");a.C(t);var e=t=>a(a.s=t),n=a.X(0,[271,10,323,942,908,969,720,181],()=>e(1777));module.exports=n})();