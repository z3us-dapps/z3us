"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[662],{44633:function(e,t,r){r.d(t,{z:function(){return u}});var n=r(70865),a=r(96670),i=r(26297),o=r(52322),s=r(2784),c=r(72779),l=r.n(c),d={base:"inline-flex items-center cursor-pointer focus:outline-none transition ease-in-out duration-300",disabled:"opacity-50 cursor-not-allowed",size:{sm:"px-2 py-1 text-sm",base:"px-5 py-3 text-base",lg:"px-6 py-4 text-lg text-lg"},variant:{ghost:"bg-opacity-25 hover:bg-opacity-25 hover:bg-violet-100 active:bg-opacity-25 active:bg-violet-100 focus:bg-opacity-25 focus:outline-none focus:ring focus:ring-violet-200 rounded",primary:"bg-blue_magenta-500 hover:bg-blue_magenta-400 font-medium focus:outline-none focus:ring focus:ring-violet-200 text-white shadow-md rounded-full",secondary:"font-medium bg-white hover:bg-violet-50 active:bg-violet-100 focus:outline-none focus:ring focus:ring-violet-200 text-purple-800 shadow-md rounded-full",danger:"bg-red-500 hover:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-white"}},u=(0,s.forwardRef)((function(e,t){var r=e.variant,s=void 0===r?"primary":r,c=e.size,u=void 0===c?"base":c,p=e.children,x=e.onClick,f=e.className,g=void 0===f?"":f,b=e.disabled,h=void 0!==b&&b,m=e.href,v=e.target,w=(0,i.Z)(e,["variant","size","children","onClick","className","disabled","href","target"]),j=l()(d.base,d.size[u],d.variant[s],h&&d.disabled,g);return m?(0,o.jsx)("a",(0,a.Z)((0,n.Z)({href:m,target:v,onClick:x,className:j},w),{children:p})):(0,o.jsx)("button",(0,a.Z)((0,n.Z)({onClick:x,ref:t},w),{className:j,children:p}))}))},73932:function(e,t,r){r.d(t,{l:function(){return c}});var n=r(52322),a=r(2784),i=r(44633),o=r(14198),s=function(){var e=(0,a.useState)(o.v.CHROME_STORE_URL),t=e[0],r=e[1],n=(0,a.useState)(!1),i=n[0],s=n[1];return(0,a.useEffect)((function(){var e=function(){var e=null===navigator||void 0===navigator?void 0:navigator.userAgent;return e.match(/chrome|chromium|crios/i)?"chrome":e.match(/firefox|fxios/i)?"firefox":e.match(/safari/i)?"safari":e.match(/opr\//i)?"opera":e.match(/edg/i)?"edge":"No browser detection"}();i||("firefox"===e&&r(o.v.FIREFOX_STORE_URL),s(!0))}),[i]),t},c=function(e){var t=e.children,r=e.size,o=e.variant,c=e.showEffect,l=(0,a.useRef)(null),d=s();return(0,a.useEffect)((function(){var e=l.current;if(e&&c){var t=e.getBoundingClientRect(),r=document.createElement("div");r.classList.add("lines");var n=document.createElement("div"),a=document.createElement("div"),i=function(e,t,r){var n=document.createElementNS("http://www.w3.org/2000/svg","svg"),a=document.createElementNS("http://www.w3.org/2000/svg","rect");return n.setAttributeNS("http://www.w3.org/2000/svg","viewBox","0 0 ".concat(e," ").concat(t)),a.setAttribute("x","0"),a.setAttribute("y","0"),a.setAttribute("width","100%"),a.setAttribute("height","100%"),a.setAttribute("rx","".concat(r)),a.setAttribute("ry","".concat(r)),a.setAttribute("pathLength","10"),n.appendChild(a),n}(t.width,t.height,25);n.appendChild(i),n.appendChild(i.cloneNode(!0)),n.appendChild(i.cloneNode(!0)),n.appendChild(i.cloneNode(!0)),a.appendChild(i.cloneNode(!0)),a.appendChild(i.cloneNode(!0)),a.appendChild(i.cloneNode(!0)),a.appendChild(i.cloneNode(!0)),r.appendChild(n),r.appendChild(a),e.appendChild(r)}}),[]),(0,n.jsx)("div",{ref:l,className:"landing-cta-btn",children:(0,n.jsx)(i.z,{size:r,variant:o,href:d,className:"font-bold",children:t})})};c.defaultProps={showEffect:!0}},28358:function(e,t,r){r.d(t,{$:function(){return N}});var n=r(52322),a=r(2784),i=r(39097),o=r.n(i),s=r(70865),c=r(36320),l=function(e){var t=e.css,r=e.className;return(0,n.jsxs)(c.x,{as:"svg",width:"28",height:"28",viewBox:"0 0 28 28",className:r,css:(0,s.Z)({fill:"currentColor"},t),children:[(0,n.jsx)("g",{children:(0,n.jsx)("path",{d:"M0,14c0,7.7,6.3,14,14,14s14-6.3,14-14S21.7,0,14,0S0,6.3,0,14z M2,14C2,7.4,7.4,2,14,2s12,5.4,12,12s-5.4,12-12,12 S2,20.6,2,14z"})}),(0,n.jsx)("g",{children:(0,n.jsx)("path",{d:"M24.1,18.3l-6.3,2.2c-0.7,0.3-1.5-0.3-1.5-1.1c0-0.8-0.7-1.4-1.5-1.1L7,21l10.2-6.4c0.5-0.3,1,0,1,0.5s0.6,0.8,1,0.5 l5.6-3.8C23.8,6.8,19.3,3,14,3C9.4,3,5.5,5.8,3.9,9.7l6.3-2.2c0.7-0.3,1.5,0.3,1.5,1.1s0.7,1.4,1.5,1.1L21,7l-10.2,6.4 c-0.5,0.3-1,0-1-0.5s-0.6-0.8-1-0.5l-5.6,3.8c1,5,5.5,8.8,10.8,8.8C18.6,25,22.5,22.2,24.1,18.3z"})})]})};l.defaultProps={css:void 0,className:void 0};var d=r(24625),u=r(68048),p=r(38617),x=r(34918),f=r(44229),g=r(1317),b=r(64396),h=r(33540),m=r(7261),v=r(72779),w=r.n(v),j=r(44633),F=function(e){var t=e.className,r=(0,p.F)(),i=r.theme,o=r.setTheme,s=r.resolvedTheme,c=(0,a.useState)(!1),l=c[0],d=c[1];return(0,a.useEffect)((function(){d("light"===s);var e=document.documentElement;"dark"===s?e.classList.add(u.$_):e.classList.remove(u.$_)}),[s]),(0,n.jsx)("div",{className:"theme-selector ".concat(t),children:(0,n.jsxs)(m.fC,{defaultValue:i||"light",onValueChange:function(e){o(e)},children:[(0,n.jsx)(m.xz,{asChild:!0,"aria-label":"Food",children:(0,n.jsxs)(j.z,{size:"sm",variant:"ghost",className:"capitalize",children:[(0,n.jsx)("span",{className:"opacity-0 w-0",children:(0,n.jsx)(m.B4,{})}),"Theme",(0,n.jsx)(m.JO,{className:"ml-1",children:l?(0,n.jsx)(x.Z,{className:"h-3 w-3"}):(0,n.jsx)(f.Z,{className:"h-3 w-3"})})]})}),(0,n.jsxs)(m.VY,{children:[(0,n.jsx)(m.u_,{className:"flex items-center justify-center text-wax-700 dark:text-wax-300",children:(0,n.jsx)(g.Z,{className:"h-6 w-6"})}),(0,n.jsx)(m.l_,{className:"bg-white dark:bg-zinc-800 p-2 rounded-lg shadow-lg",children:(0,n.jsx)(m.ZA,{children:["light","dark","system"].map((function(e,t){return(0,n.jsxs)(m.ck,{value:e.toLowerCase(),className:w()("relative flex items-center px-8 py-2 rounded-md text-xs font-medium text-wax-700 dark:text-wax-300 focus:bg-wax-0 dark:focus:bg-wax-0","focus:outline-none select-none"),children:[(0,n.jsx)(m.eT,{children:e}),(0,n.jsx)(m.wU,{className:"absolute left-2 inline-flex items-center",children:(0,n.jsx)(b.Z,{className:"h-4 w-4"})})]},"".concat(e,"-").concat(t))}))})}),(0,n.jsx)(m.$G,{className:"flex items-center justify-center text-wax-700 dark:text-wax-300",children:(0,n.jsx)(h.Z,{className:"h-6 w-6"})})]})]})})};F.defaultProps={className:void 0};var C={className:void 0},N=function(e){var t=e.className;return(0,n.jsx)("div",{className:"footer ".concat(t),children:(0,n.jsx)(d._,{children:(0,n.jsxs)("div",{className:"block sm:flex w-100 items-center",children:[(0,n.jsxs)("div",{className:"flex-1 flex items-center fill-white",children:[(0,n.jsx)(o(),{href:"/",passHref:!0,children:(0,n.jsx)("a",{className:"cursor-pointer inline-flex items-center justify-center hover:opacity-80 transition-opacity",children:(0,n.jsx)(l,{className:"transition-colors"})})}),(0,n.jsxs)("span",{className:"text-xs pl-2",children:["\xa9 ",(new Date).getFullYear()," Z3US"]})]}),(0,n.jsxs)("ul",{className:"text-sm flex items-center pt-2 sm:pt-0",children:[(0,n.jsx)("li",{className:"pr-3",children:(0,n.jsx)(o(),{href:"/privacy",passHref:!0,children:(0,n.jsx)("a",{className:"hover:underline decoration-from-font underline-offset-4",children:"Privacy"})})}),(0,n.jsx)("li",{className:"pr-2",children:(0,n.jsx)(o(),{href:"/terms",passHref:!0,children:(0,n.jsx)("a",{className:"hover:underline decoration-from-font underline-offset-4",children:"Terms"})})}),(0,n.jsx)("li",{children:(0,n.jsx)(F,{})})]})]})})})};N.defaultProps=C},12935:function(e,t,r){r.d(t,{h:function(){return R}});var n=r(52322),a=r(2784),i=r(24712),o=r(86010),s=r(39097),c=r.n(s),l=r(73932),d=r(70865),u=r(36320),p=function(e){var t=e.css;return(0,n.jsxs)(u.x,{as:"svg",width:"128",height:"20",viewBox:"0 0 128 20",css:(0,d.Z)({fill:"currentColor"},t),children:[(0,n.jsx)("path",{d:"M65.8286 13.2917V0.857422H69.4858V12.5603C69.4858 14.1761 70.7956 15.486 72.4115 15.486H89.2343C90.8502 15.486 92.16 14.1761 92.16 12.5603V0.857422H95.8172V11.2803V13.2917C95.8172 16.5234 93.1974 19.1431 89.9658 19.1431H71.68C68.4484 19.1431 65.8286 16.5234 65.8286 13.2917Z"}),(0,n.jsx)("path",{d:"M4.75424 4.51456L-4.57168e-05 0.857422H29.9885L10.6057 15.486H20.8457H25.2342L29.9885 19.1431H-4.57168e-05L18.8342 4.51456H8.22853H4.75424Z"}),(0,n.jsx)("path",{d:"M105.691 0.857422H128L123.246 4.51456H105.691C104.682 4.51456 103.863 5.33324 103.863 6.34314C103.863 7.35303 104.682 8.17171 105.691 8.17171H120.32C123.35 8.17171 125.806 10.6277 125.806 13.6574C125.806 16.6871 123.35 19.1431 120.32 19.1431H98.0115L102.766 15.486H120.32C121.33 15.486 122.149 14.6673 122.149 13.6574C122.149 12.6475 121.33 11.8289 120.32 11.8289H105.691C102.662 11.8289 100.206 9.37281 100.206 6.34314C100.206 3.31346 102.662 0.857422 105.691 0.857422Z"}),(0,n.jsx)("path",{d:"M55.5886 19.1431C58.8202 19.1431 61.44 16.5234 61.44 13.2917V6.70885C61.44 3.4772 58.8202 0.857422 55.5886 0.857422H36.2057L31.4514 4.51456H54.8571C56.473 4.51456 57.7828 5.83153 57.7828 7.44736C57.7828 10.9816 57.7828 9.76521 57.7828 12.5542C57.7828 14.17 56.473 15.486 54.8571 15.486H31.4514L36.2057 19.1431H55.5886Z"}),(0,n.jsx)("path",{d:"M54.1258 8.9033C54.1258 8.49935 53.7983 8.17188 53.3943 8.17188H38.0343L34.3772 10.0004L38.0343 11.829H53.3943C53.7983 11.829 54.1258 11.5015 54.1258 11.0976V8.9033Z"})]})};p.defaultProps={css:void 0};var x=r(24625),f=r(14198),g=function(){return(0,n.jsx)("svg",{width:"24px",height:"24px",viewBox:"0 0 24 24",children:(0,n.jsx)("path",{d:"M24,12c0,6.6-5.4,12-12,12C5.4,24,0,18.6,0,12C0,5.4,5.4,0,12,0C18.6,0,24,5.4,24,12z M12.4,8.9 c-1.2,0.5-3.5,1.5-7,3c-0.6,0.2-0.9,0.4-0.9,0.7c0,0.4,0.4,0.5,1,0.7c0.1,0,0.2,0.1,0.3,0.1c0.6,0.2,1.4,0.4,1.9,0.4 c0.4,0,0.8-0.2,1.3-0.5c3.3-2.2,5-3.3,5.1-3.3c0.1,0,0.2,0,0.2,0c0.1,0.1,0.1,0.2,0.1,0.2c0,0.2-1.8,1.9-2.8,2.7 c-0.3,0.3-0.5,0.5-0.5,0.5c-0.1,0.1-0.2,0.2-0.3,0.3c-0.6,0.5-1,1,0,1.6c0.5,0.3,0.9,0.6,1.3,0.9c0.4,0.3,0.9,0.6,1.4,0.9 c0.1,0.1,0.3,0.2,0.4,0.3c0.5,0.4,0.9,0.7,1.5,0.6c0.3,0,0.7-0.3,0.8-1.2c0.4-2.1,1.2-6.7,1.4-8.6c0-0.2,0-0.4,0-0.5 c0-0.1,0-0.2-0.2-0.3c-0.1-0.1-0.4-0.1-0.5-0.1C16.5,7.2,15.8,7.5,12.4,8.9z"})})},b=function(){return(0,n.jsx)("svg",{width:"24px",height:"24px",viewBox:"0 0 24 24",children:(0,n.jsx)("path",{d:"M12,0C5.4,0,0,5.4,0,12s5.4,12,12,12s12-5.4,12-12S18.6,0,12,0z M18.5,9.5c0,0.1,0,0.3,0,0.4c0,4.1-3.1,8.8-8.8,8.8 c-1.7,0-3.4-0.5-4.7-1.4c0.2,0,0.5,0,0.7,0c1.4,0,2.8-0.5,3.8-1.3c-1.3,0-2.5-0.9-2.9-2.1c0.2,0,0.4,0.1,0.6,0.1 c0.3,0,0.6,0,0.8-0.1c-1.4-0.3-2.5-1.5-2.5-3c0,0,0,0,0,0C6,11,6.5,11.2,7,11.2c-0.8-0.6-1.4-1.5-1.4-2.6C5.6,8,5.8,7.5,6,7.1 c1.5,1.9,3.8,3.1,6.3,3.2c-0.1-0.2-0.1-0.5-0.1-0.7c0-1.7,1.4-3.1,3.1-3.1c0.9,0,1.7,0.4,2.2,1c0.7-0.1,1.4-0.4,2-0.7 c-0.2,0.7-0.7,1.3-1.4,1.7c0.6-0.1,1.2-0.2,1.8-0.5C19.6,8.6,19.1,9.1,18.5,9.5z"})})},h=function(){return(0,n.jsx)("svg",{width:"24px",height:"24px",viewBox:"0 0 24 24",children:(0,n.jsx)("path",{d:"M12,0C5.4,0,0,5.4,0,12c0,5.3,3.4,9.8,8.2,11.4C8.8,23.5,9,23.1,9,22.8c0-0.3,0-1,0-2c-3.3,0.7-4-1.6-4-1.6 c-0.5-1.4-1.3-1.8-1.3-1.8c-1.1-0.7,0.1-0.7,0.1-0.7c1.2,0.1,1.8,1.2,1.8,1.2c1.1,1.8,2.8,1.3,3.5,1c0.1-0.8,0.4-1.3,0.8-1.6 C7.1,17,4.3,16,4.3,11.4c0-1.3,0.5-2.4,1.2-3.2C5.5,7.8,5,6.6,5.7,5c0,0,1-0.3,3.3,1.2c1-0.3,2-0.4,3-0.4c1,0,2,0.1,3,0.4 C17.3,4.7,18.3,5,18.3,5c0.7,1.7,0.2,2.9,0.1,3.2c0.8,0.8,1.2,1.9,1.2,3.2c0,4.6-2.8,5.6-5.5,5.9c0.4,0.4,0.8,1.1,0.8,2.2 c0,1.6,0,2.9,0,3.3c0,0.3,0.2,0.7,0.8,0.6C20.6,21.8,24,17.3,24,12C24,5.4,18.6,0,12,0z"})})},m=r(11349),v=r(5632),w=r(44633),j=r(49041),F=r(94589),C=r(39538),N=r(95769),y=r(93400),P=[{name:"Home",to:"/",id:"home"},{name:"Feedback",to:f.v.HELLO_NEXT_FEEDBACK_URL,id:"feedback"},{name:"Roadmap",to:"/roadmap",id:"roadmap"},{name:"Docs",to:"/docs",id:"docs",subMenu:[{name:"API Reference",to:"/docs/api",id:"api-reference"},{name:"API V1",to:"/docs/api/api-v1",id:"api-v1"},{name:"Demo",to:"/docs/demo",id:"api-demo"}]},{name:"Github",to:f.v.GITHUB_URL,id:"github"},{name:"Twitter",to:f.v.TWITTER_URL,id:"twitter"},{name:"Telegram",to:f.v.TELEGRAM_URL,id:"telegram"}],T={closed:{opacity:0},open:{opacity:1}},k={closed:{transition:{staggerChildren:.05,staggerDirection:-1}},open:{transition:{staggerChildren:.05,staggerDirection:1}}},H=function(){var e=(0,v.useRouter)().asPath,t=(0,m.Z)((0,j.n)(!1,!0),2),r=t[0],a=t[1],i=e.includes("/docs"),o=function(){a(0)};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(w.z,{size:"sm",variant:"ghost",className:"md:hidden w-8 h-8 relative z-30",onClick:function(){a(r?0:1)},children:(0,n.jsxs)("span",{className:"flex items-center justify-center w-10 h-10",children:[(0,n.jsx)("span",{className:"transition-opacity absolute",style:{opacity:r?"0":"1"},children:(0,n.jsx)(N.Z,{className:"block h-5 w-5"})}),(0,n.jsx)("span",{className:"transition-opacity absolute",style:{opacity:r?"1":"0"},children:(0,n.jsx)(y.Z,{className:"block h-5 w-5"})})]})}),(0,n.jsx)(F.M,{children:r&&(0,n.jsx)(C.m.aside,{className:"fixed top-0 left-0 w-screen h-screen bg-purple-900/90 backdrop-blur-md",initial:{width:0},animate:{width:"100%"},transition:{ease:"easeOut",duration:.2},exit:{width:0,transition:{delay:.25,duration:.2}},children:(0,n.jsx)(C.m.ul,{className:"mt-14 p-5 flex flex-col gap-5",initial:"closed",animate:"open",exit:"closed",variants:k,children:P.map((function(e){var t=e.name,r=e.to,a=e.id,s=e.subMenu;return(0,n.jsxs)(C.m.li,{variants:T,children:[(0,n.jsx)(c(),{href:r,passHref:!0,children:(0,n.jsx)("a",{role:"link",tabIndex:0,className:"text-2xl font-medium",onClick:o,onKeyDown:o,children:t})}),s?(0,n.jsx)("ul",{className:"pl-3 pt-4 flex-col gap-4 ".concat(i?"flex":"hidden"),children:s.map((function(e){var t=e.id,r=e.to,a=e.name;return(0,n.jsx)("li",{children:(0,n.jsx)(c(),{href:r,passHref:!0,children:(0,n.jsx)("a",{role:"link",tabIndex:0,className:"text-xl font-medium",onKeyDown:o,onClick:o,children:a})})},t)}))}):null]},a)}))})})})]})},S={isBetaButtonVisible:!0,isDocsButtonVisible:!0,className:void 0,notTabletSticky:!1},R=function(e){var t=e.className,r=e.isBetaButtonVisible,s=e.isDocsButtonVisible,d=e.notTabletSticky,u=(0,a.useState)(!1),m=u[0],v=u[1],w=(0,i.v)().scrollY;return(0,a.useEffect)((function(){return w.onChange((function(e){window.innerWidth>768&&d||v(e>0)}))}),[]),(0,n.jsx)("div",{className:(0,o.Z)("z-20 header transition-all h-16",t,m?"sticky top-0 header--sticky backdrop-blur-md shadow-sm dark:shadow-md dark:shadow-[#12001f]":"",d?"md:relative":""),children:(0,n.jsx)(x._,{children:(0,n.jsxs)("div",{className:"flex w-100 py-5",children:[(0,n.jsx)("div",{className:"flex-1 color-white z-30 flex items-start",children:(0,n.jsx)(c(),{href:"/",passHref:!0,children:(0,n.jsx)("a",{className:"cursor-pointer inline-flex hover:opacity-60 transition-opacity mt-1",children:(0,n.jsx)(p,{css:{maxWidth:"112px"}})})})}),(0,n.jsx)(H,{}),(0,n.jsxs)("ul",{className:"font-medium text-sm gap-3 lg:gap-5 hidden md:flex items-center",children:[(0,n.jsx)("li",{children:(0,n.jsx)(c(),{href:f.v.HELLO_NEXT_FEEDBACK_URL,passHref:!0,children:(0,n.jsx)("a",{className:"cursor-pointer hover:underline decoration-from-font underline-offset-4",target:"_blank",children:"Feedback"})})}),(0,n.jsx)("li",{children:(0,n.jsx)(c(),{href:"/roadmap",passHref:!0,children:(0,n.jsx)("a",{className:"cursor-pointer hover:underline decoration-from-font underline-offset-4",children:"Road map"})})}),s?(0,n.jsx)("li",{children:(0,n.jsx)(c(),{href:"/docs",passHref:!0,children:(0,n.jsx)("a",{className:"cursor-pointer hover:underline decoration-from-font underline-offset-4",children:"Docs"})})}):null,(0,n.jsx)("li",{className:"h-6",children:(0,n.jsx)("a",{className:"header-icon cursor-pointer inline-flex items-center justify-center fill-inherit hover:opacity-60 transition-opacity",href:f.v.TELEGRAM_URL,children:(0,n.jsx)(g,{})})}),(0,n.jsx)("li",{className:"h-6",children:(0,n.jsx)("a",{className:"header-icon cursor-pointer inline-flex items-center justify-center fill-inherit hover:opacity-60 transition-opacity",href:f.v.TWITTER_URL,children:(0,n.jsx)(b,{})})}),(0,n.jsx)("li",{className:"h-6",children:(0,n.jsx)("a",{className:"header-icon cursor-pointer inline-flex items-center justify-center fill-inherit hover:opacity-60 transition-opacity",href:f.v.GITHUB_URL,children:(0,n.jsx)(h,{})})}),r?(0,n.jsx)("li",{children:(0,n.jsxs)(l.l,{size:"base",variant:"secondary",children:[(0,n.jsx)("span",{className:"hidden lg:block",children:"Get BETA access"}),(0,n.jsx)("span",{className:"lg:hidden",children:"Get BETA"})]})}):null]})]})})})};R.defaultProps=S},24625:function(e,t,r){r.d(t,{_:function(){return o}});var n=r(52322),a=(r(2784),r(86010)),i={className:void 0},o=function(e){var t=e.children,r=e.className;return(0,n.jsx)("div",{className:(0,a.Z)("z3-container",r&&r),children:t})};o.defaultProps=i},36320:function(e,t,r){r.d(t,{x:function(){return n}});var n=(0,r(68048).zo)("div",{boxSizing:"border-box"})},68048:function(e,t,r){r.d(t,{$_:function(){return f},F4:function(){return x},xg:function(){return g},zo:function(){return p}});var n=420,a=650,i=960,o=1280,s=1400,c=(0,r(43866).Th)({utils:{bg:function(e){return{backgroundColor:e}},p:function(e){return{padding:e}},pt:function(e){return{paddingTop:e}},pr:function(e){return{paddingRight:e}},pb:function(e){return{paddingBottom:e}},pl:function(e){return{paddingLeft:e}},px:function(e){return{paddingLeft:e,paddingRight:e}},py:function(e){return{paddingTop:e,paddingBottom:e}},m:function(e){return{margin:e}},mt:function(e){return{marginTop:e}},mr:function(e){return{marginRight:e}},mb:function(e){return{marginBottom:e}},ml:function(e){return{marginLeft:e}},mx:function(e){return{marginLeft:e,marginRight:e}},my:function(e){return{marginTop:e,marginBottom:e}},ta:function(e){return{textAlign:e}},fd:function(e){return{flexDirection:e}},fw:function(e){return{flexWrap:e}},ai:function(e){return{alignItems:e}},ac:function(e){return{alignContent:e}},jc:function(e){return{justifyContent:e}},as:function(e){return{alignSelf:e}},fg:function(e){return{flexGrow:e}},fs:function(e){return{flexShrink:e}},fb:function(e){return{flexBasis:e}},bc:function(e){return{backgroundColor:e}},br:function(e){return{borderRadius:e}},btrr:function(e){return{borderTopRightRadius:e}},bbrr:function(e){return{borderBottomRightRadius:e}},bblr:function(e){return{borderBottomLeftRadius:e}},btlr:function(e){return{borderTopLeftRadius:e}},bs:function(e){return{boxShadow:e}},lh:function(e){return{lineHeight:e}},ox:function(e){return{overflowX:e}},oy:function(e){return{overflowY:e}},pe:function(e){return{pointerEvents:e}},us:function(e){return{WebkitUserSelect:e,userSelect:e}},userSelect:function(e){return{WebkitUserSelect:e,userSelect:e}},size:function(e){return{width:e,height:e}},appearance:function(e){return{WebkitAppearance:e,appearance:e}},backgroundClip:function(e){return{WebkitBackgroundClip:e,backgroundClip:e}}},media:{xs:"(min-width: ".concat(n,"px)"),sm:"(min-width: ".concat(a,"px)"),md:"(min-width: ".concat(i,"px)"),lg:"(min-width: ".concat(o,"px)"),xl:"(min-width: ".concat(s,"px)"),motion:"(prefers-reduced-motion)",hover:"(any-hover: hover)",dark:"(prefers-color-scheme: dark)",light:"(prefers-color-scheme: light)"},theme:{fonts:{untitled:"Untitled Sans, -apple-system, system-ui, sans-serif",mono:"S\xf6hne Mono, monospace",montserrat:'"Montserrat", sans-serif',fira:'"Fira Sans", sans-serif',Centra:"'Centra-Web', Arial",HaasGrotTextRound:"'HaasGrotTextRound-Web', Arial",HaasGrotDisplayRound:"'HaasGrotDispRound-Web', Arial",Inter:"'Inter', sans-serif"},fontSizes:{1:"11px",2:"12px",3:"13px",4:"14px",5:"16px",6:"18px",7:"20px",8:"24px",9:"28px",10:"32px",11:"36px",12:"40px",13:"48px",14:"56px",15:"68px"},lineHeights:{1:"13px",2:"14px",3:"15px",4:"16px",5:"18px",6:"20px",7:"23px",8:"26px",9:"30px",10:"38px",11:"48px",12:"50px",13:"58px",14:"66px",15:"74px"},space:{1:"4px",2:"8px",3:"12px",4:"16px",5:"20px",6:"24px",7:"28px",8:"32px",9:"36px",10:"40px",11:"44px",12:"48px"},sizes:{1:"4px",2:"8px",3:"12px",4:"16px",5:"20px",6:"24px",7:"28px",8:"32px",9:"36px",10:"40px",11:"44px",12:"48px"},radii:{1:"4px",2:"6px",3:"8px",4:"12px",round:"50%",pill:"9999px"},zIndices:{1:"100",2:"200",3:"300",4:"400",max:"999"},transitions:{default:"all 250ms ease"},shadows:{shadowPanel:"0 10px 20px 0px rgb(1 5 20 / 57%), 0 10px 20px -15px rgb(1 5 20 / 95%)",shadowPanel2:"0px 2px 4px rgba(0, 0, 0, 0.10)",accountPanelShadow:"0px 4px 12px rgba(0, 0, 0, 0.25)",buttonFocusShadow:"inset 0 0 0 1px rgba(59, 112, 235, 0.2), 0 0 0 1px rgba(59, 112, 235, 0.2)",popup:"0px 6px 6px -5px rgb(22 23 24 / 53%)",modal:"0px 10px 18px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",tooltip:"0px 10px 18px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",inputHover:"0 0 0 4px rgb(143 143 143 / 10%)",inputFocus:"0 0 0 4px rgb(143 6 225 / 10%)",inputError:"0 0 0 4px rgb(255 6 6 / 10%)",sliderShadow:"0 0 0 2px rgb(143 143 143 / 10%)",sliderShadowHover:"0 0 0 4px rgb(143 143 143 / 10%)"},colors:{white:"#FFFFFF",black:"#000000",z3usPurple:"#8052FF",bgPanel:"#ffffff",bgPanel2:"#f1f1f1",bgPanel3:"#ffffff",bgPanel4:"#f1f1f1",bgToolTip1:"#ffffff",bgToolTip2:"#f1f1f1",bgPanelHeaderTransparent:"rgba(255,255,255, 0.7)",bgPanelFooter:"#f1f1f1",bgPanelDialog:"$bgPanel",bgPanelHover:"#f7f7f7",bgPanelShadowDown:"linear-gradient(180deg, rgba(141,141,141,0.1) 0%, rgba(141,141,141,0) 100%)",bgPanelShadowUp:"linear-gradient(0deg, rgba(141,141,141,0.1) 0%, rgba(141,141,141,0) 100%)",bgAccordion:"#dbdbdb",bgToggleActive:"#dad7f3",bgSlider:"#eeeeee",bgSliderRange:"#dad7f3 ",bgTransparentDialog:"rgba(0,0,0, 0.4)",bgSliderTrack:"$buttonBgPrimary",bgInput:"#ffffff",bgLink:"rgba(155,90,181,0.10)",bgPriceGreen:"rgb(206 244 217)",bgPriceRed:"rgb(255 164 164 / 59%)",bgSkeleton1:"rgba(255, 255, 255, 0.9)",bgSkeleton2:"rgba(255, 255, 255, 0.8)",bgToastSuccess:"linear-gradient(90deg, rgb(186 255 196 / 60%) 0%, rgb(240 255 238 / 90%) 30%, rgb(247 255 246 / 90%) 100%)",bgToastError:"linear-gradient(90deg, rgb(255 214 214 / 90%) 0%, rgb(255 255 255 / 70%) 70%, rgb(255 255 255 / 80%) 100%)",txtDefault:"#000000",txtInverse:"#FFFFFF",txtDisabled:"#a6a6a6",txtMuted:"#c2c2c2",txtHelp:"#959595",txtButtonPrimary:"#FFFFFF",txtPriceGreen:"rgb(14 146 14)",txtPriceRed:"rgb(195 23 23 / 88%)",txtError:"#b01f0c",txtInputPlaceholder:"#eee",borderPanel:"#ececec",borderPanel2:"#dbdbdb",borderPanel3:"#D2D2D2",borderPanelFooter:"#e9e9e9",borderDialog:"#736b82",borderPopup:"#e5e5e5",borderInput:"#C9C9C9",borderAvatar:"#FFFFFF",borderInputHover:"#afafaf",borderInputFocus:"#673bdf",borderInputError:"#b01f0c",borderPriceRed:"rgb(237 152 152 / 59%)",borderPriceGreen:"rgb(51 202 51)",borderTransparent:"rgba(0, 0, 0, 0.1)",iconDefault:"#000000",iconDefaultInverse:"#FFFFFF",iconActive:"#673bdf",buttonText:"#000000",buttonGhost:"#282828",buttonTextInverse:"#FFFFFF",buttonTextRed:"#FFFFFF",buttonBgInverse:"#000000",buttonBgRed:"#d84d48",buttonBgPrimary:"#8457FF",buttonBgPrimaryHover:"#471eb5",buttonBgSecondary:"#d79364",buttonBgTertiary:"#eaeaea",buttonBgTertiaryHover:"#d5d5d5",buttonBgGhost:"transparent",buttonBgGhostHover:"rgba(0, 0, 0, 0.05)"}}}),l=(c.config,c.createTheme),d=c.css,u=(c.getCssText,c.globalCss),p=c.styled,x=(c.theme,c.keyframes),f=l("dark-theme",{shadows:{shadowPanel:"0 10px 20px 0px rgb(1 5 20 / 57%), 0 10px 20px -15px rgb(1 5 20 / 95%)",shadowPanel2:"0px 2px 4px rgba(0, 0, 0, 0.80)",accountPanelShadow:"0px 4px 12px rgba(0, 0, 0, 0.8)",buttonFocusShadow:"0 0 0 2px rgba(103, 59, 223, 0.4)",popup:"0px 6px 6px -5px rgb(22 23 24 / 53%)",modal:"0 10px 20px 0px rgb(1 5 20 / 57%), 0 10px 20px -15px rgb(1 5 20 / 95%)",tooltip:"0 10px 20px 0px rgb(1 5 20 / 57%), 0 10px 20px -15px rgb(1 5 20 / 95%)",inputHover:"0 0 0 4px rgb(143 143 143 / 10%)",inputFocus:"0 0 0 4px rgb(143 6 225 / 20%)",inputError:"0 0 0 4px rgb(255 6 6 / 20%)",sliderShadow:"0 0 0 2px rgb(143 143 143 / 10%)",sliderShadowHover:"0 0 0 4px rgb(143 143 143 / 10%)"},colors:{white:"#FFFFFF",black:"#000000",z3usPurple:"#8052FF",bgPanel:"#161718",bgPanel2:"#323232",bgPanel3:"#323232",bgPanel4:"#161718",bgToolTip1:"#323232",bgToolTip2:"#161718",bgPanelHeaderTransparent:"rgba(9,9,9, 0.9)",bgPanelFooter:"#1c1c1c",bgPanelDialog:"$bgPanel2",bgPanelHover:"#242424",bgPanelShadowDown:"linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)",bgPanelShadowUp:"linear-gradient(0deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)",bgAccordion:"#181818",bgToggleActive:"#aca7d3",bgSlider:"#000000",bgSliderRange:"#aca7d3",bgTransparentDialog:"rgba(0,0,0, 0.6)",bgSliderTrack:"$buttonBgPrimary",bgInput:"#111111",bgLink:"rgba(192,125,219,0.1)",bgPriceGreen:"rgb(13 86 38 / 59%)",bgPriceRed:"rgb(99 29 29 / 59%)",bgSkeleton1:"rgba(255, 255, 255, 0.1)",bgSkeleton2:"rgba(255, 255, 255, 0.05)",bgToastSuccess:"linear-gradient(90deg, rgb(47 159 15 / 40%) 0%, rgb(7 27 1 / 90%) 30%, rgb(5 22 1 / 90%) 100%)",bgToastError:"linear-gradient(90deg, rgb(104 45 45 / 90%) 0%, rgb(42 13 13 / 70%) 80%, rgb(33 2 2 / 40%) 100%)",txtDefault:"#ffffff",txtInverse:"#000000",txtDisabled:"#8889a7",txtMuted:"#636363",txtHelp:"#a1a1a1",txtButtonPrimary:"#FFFFFF",txtPriceGreen:"rgb(109 255 125)",txtPriceRed:"rgb(255 45 45 / 88%)",txtError:"#f8250a",txtInputPlaceholder:"#8889a7",borderPanel:"#434243",borderPanel2:"#2c2b2b",borderPanel3:"#767676",borderPanelFooter:"#2c2b2b",borderDialog:"#101010",borderPopup:"#434343",borderInput:"#434343",borderAvatar:"#323232",borderInputHover:"#747474",borderInputFocus:"#673bdf",borderInputError:"#b01f0c",borderPriceRed:"rgb(107 35 35 / 64%)",borderPriceGreen:"rgb(17 144 17 / 64%)",borderTransparent:"rgba(255, 255, 255, 0.3)",iconDefault:"#DCDCDC",iconDefaultInverse:"#000000",iconActive:"#8457FF",buttonText:"#FFFFFF",buttonGhost:"#FFFFFF",buttonTextInverse:"#000000",buttonTextRed:"#FFFFFF",buttonBgInverse:"#FFFFFF",buttonBgRed:"#d84d48",buttonBgPrimary:"#8457FF",buttonBgPrimaryHover:"#8457FF",buttonBgSecondary:"#d79364",buttonBgTertiary:"#6c6c6c",buttonBgTertiaryHover:"#4c4c4c",buttonBgGhost:"transparent",buttonBgGhostHover:"rgba(255, 255, 255, 0.05)"}}),g=(u({body:{margin:"0",padding:"0",fontWeight:400,fontVariantNumeric:"tabular-nums",fontFamily:"$Inter",fontSize:"$1",textRendering:"optimizeLegibility","-webkit-tap-highlight-color":"transparent","-webkit-touch-callout":"none","-moz-osx-font-smoothing":"grayscale","-webkit-font-smoothing":"subpixel-antialiased",color:"$txtDefault",fill:"$txtDefault",ul:{margin:"0",padding:"0",listStyleType:"none"},"@media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2), (min-resolution: 192dpi)":{body:{"font-smoothing":"antialiased","-webkit-font-smoothing":"antialiased"}}}}),d({WebkitTapHighlightColor:"transparent","&:focus:not(&:focus-visible)":{boxShadow:"none"},"&:focus":{outline:"none",boxShadow:"$buttonFocusShadow"},"@safari":{WebkitTapHighlightColor:"transparent",outline:"none"}}))}}]);