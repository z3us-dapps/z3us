(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4473],{97101:function(e,a,t){"use strict";var s=t(52322),r=t(2784),n=t(53724),l=t(9219);let i=(0,r.forwardRef)((e,a)=>{let{onChange:t,value:r,hasError:l,...i}=e;return(0,s.jsx)(n.X4,{...i,ref:a,onValueChange:t,value:void 0!==r&&""!==r?r:void 0})}),o=(0,r.forwardRef)((e,a)=>{let{validate:t,name:r,label:n,...o}=e;return(0,s.jsx)(l.n,{name:r,label:n,validate:t,children:(0,s.jsx)(i,{...o,ref:a})})});a.ZP=o},323:function(e,a,t){"use strict";t.d(a,{N7:function(){return o}});var s=t(52322),r=t(2784),n=t(72580),l=t(9219);let i=(0,r.forwardRef)((e,a)=>{let{onChange:t,hasError:r,...l}=e;return(0,s.jsx)(n.I,{...l,elementType:"textarea",type:"textarea",ref:a,onChange:e=>{let a=e.nativeEvent;a.isComposing||t(e.target.value)}})}),o=(0,r.forwardRef)((e,a)=>{let{validate:t,name:r,label:n,...o}=e;return(0,s.jsx)(l.n,{name:r,label:n,validate:t,children:(0,s.jsx)(i,{...o,ref:a})})});a.ZP=o},40051:function(e,a,t){"use strict";t.r(a),t.d(a,{Home:function(){return eH},default:function(){return eK}});var s=t(52322),r=t(85056),n=t(2784),l=t(49177),i=t(83112),o=t(73557),f=t(39857),d=t(8522),c=t(23554),u=t(99040),g=t(2827),m=t(71691),_=t(47843);let b=(0,r.Ji)(0),h=(e,a)=>{let t=a.reduce((e,a)=>({...e,[a.from]:a.tokens.reduce((e,a)=>({...e,[a.resource]:(0,r.gH)(a.amount).value.add((0,r.gH)(e[a.resource]||0).value).toString()}),{})}),{});return e=Object.entries(t).reduce((e,a)=>{let[t,s]=a;return Object.entries(s).reduce((e,a)=>{let[s,n]=a;return e.callMethod(t,"withdraw",[(0,r.Lk)(s),(0,r.gH)(n)])},e)},e),a.reduce((e,a)=>{let{tokens:t,to:s}=a;return t.reduce((e,a)=>{let{resource:t,amount:n}=a;return e.takeFromWorktop(t,(0,r.gH)(n).value,(e,a)=>e.callMethod(s,"try_deposit_or_abort",[(0,r.ne)(a),b]))},e)},e)},v=(e,a)=>{let t=a.reduce((e,a)=>({...e,[a.from]:a.nfts.reduce((e,a)=>({...e,[a.resource]:a.ids.reduce((e,a)=>({...e,[a]:null}),e[a.resource]||{})}),{})}),{});return e=Object.entries(t).reduce((e,a)=>{let[t,s]=a;return Object.entries(s).reduce((e,a)=>{let[s,n]=a;return Object.keys(n).forEach(a=>{e=e.callMethod(t,"withdraw",[(0,r.Lk)(s),(0,r.d$)(a)])}),e},e)},e),a.reduce((e,a)=>{let{nfts:t,to:s}=a;return t.reduce((e,a)=>{let{resource:t,ids:n}=a;return e.takeNonFungiblesFromWorktop(t,n,(e,a)=>e.callMethod(s,"try_deposit_or_abort",[(0,r.ne)(a),b]))},e)},e)};var x=t(6277),j=t(18917),p=t(6887),M=t(12132),y=t(95886),z=t(98076),k=t(63370),w=t(731),q=t(47122),N=t(94225),C=t(510),V=t(47930),T=t(11633),E=t(72580),Z=t(9795),F=t(74669),I=t(28694),R=t(43789);t(41486),t(8144),t(66786),t(92995),t(13945);let O=(0,l.vU)({clear:{id:"/GCoTA",defaultMessage:"Clear"}}),P=e=>{let{id:a,account:t,alias:r,value:n,onSelect:l}=e;return(0,s.jsxs)(j.x,{component:"button",className:"_1gvz7gk7 _5baftf6d _5baftf77 _5baftf4p _5baftf5j _5baftf4 _5baftf1z8 _5baftfhi _5baftfg _5baftfg2 _5baftf1v _5baftfgf _5baftffm _5baftf173 _5baftf16y _5baftf177 _5baftfea _5baftf2g",value:a,display:"flex",onClick:()=>{l(a)},children:[(0,s.jsx)(j.x,{children:(0,s.jsx)(R.Z,{size:"small",color:"strong",truncate:!0,children:r})}),(0,s.jsx)(j.x,{flexGrow:1,children:(0,s.jsxs)(R.Z,{size:"small",truncate:!0,children:["(",t,")"]})}),a===n&&(0,s.jsx)(j.x,{flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",children:(0,s.jsx)(C.Z,{})})]})},S=(0,n.forwardRef)((e,a)=>{let{className:t,data:r,value:l,onValueChange:o,styleVariant:f="primary",sizeVariant:d="large",placeholder:c}=e,u=(0,i.Z)(),[g,m]=(0,n.useState)(!1),[_,b]=(0,n.useState)(void 0),[h,v]=(0,n.useState)(r),[M,{width:y}]=(0,w.Z)(),z=(0,n.useRef)(null),k=(0,n.useRef)(null),[C]=(0,N.Nr)(l,200),R=(e,a)=>{let t=e.toLowerCase();return a.filter(e=>Object.values(e).some(e=>!!("string"==typeof l&&e.toLowerCase().includes(t))))};(0,n.useEffect)(()=>{v(R(C,r))},[r]),(0,n.useEffect)(()=>{g&&v(R(C,r))},[C]);let S=()=>{m(!1)},A=e=>{v(r),o(e),S()},L=(0,n.useCallback)((e,a)=>{let{id:t,account:r,alias:n}=a;return(0,s.jsx)(P,{id:t,account:r,alias:n,value:l,onSelect:A},t)},[l,A]);return(0,s.jsx)(j.x,{ref:a,className:(0,x.Z)("_1gvz7gk9 _5baftf4",t),children:(0,s.jsxs)(Z.Pg,{open:g,children:[(0,s.jsx)(Z.tW,{asChild:!0,children:(0,s.jsxs)(j.x,{ref:M,className:"_1gvz7gk1 _5baftf4",children:[(0,s.jsx)(E.I,{ref:z,styleVariant:f,sizeVariant:d,value:l,placeholder:c,onChange:e=>{let a=e.currentTarget.value;o(a)},onFocus:()=>{m(!0)},rightIconClassName:"_5baftfb4",rightIcon:(0,s.jsx)(V.Z,{})}),g&&(null==l?void 0:l.length)>0&&(0,s.jsx)(I.eE,{message:u.formatMessage(O.clear),children:(0,s.jsx)(p.z,{ref:k,styleVariant:"secondary",sizeVariant:"small",iconOnly:!0,className:"_1gvz7gkd _5baftf1",onClick:()=>{o(""),v(R("",r)),m(!0),z.current.focus()},children:(0,s.jsx)(T.Z,{})})})]})}),(0,s.jsx)(Z.i9,{children:(0,s.jsx)(Z.yk,{align:"start",sideOffset:2,onOpenAutoFocus:e=>{e.preventDefault()},onEscapeKeyDown:()=>{S()},onPointerDownOutside:e=>{var a,t;!z||(null===(a=z.current)||void 0===a?void 0:a.contains(e.target))||(null===(t=k.current)||void 0===t?void 0:t.contains(e.target))||S()},style:{width:"".concat(y,"px")},children:(0,s.jsx)(F.Z,{className:"_1gvz7gk3 _5baftf4",scrollableNodeProps:{ref:b},children:(0,s.jsx)(j.x,{className:"_1gvz7gk5 _5baftf6d _5baftf77 _5baftf4p _5baftf5j _5baftf4 _5baftfea _5baftffa",children:(0,s.jsx)(q.OO,{data:h,itemContent:L,customScrollParent:_})})})})})]})})});var A=t(95096),L=t(2509),W=t(9219);t(86305);let H=(0,n.forwardRef)((e,a)=>{var t;let{onChange:r,value:l,toolTipMessageKnownAddress:i,isKnownAddressVisible:o=!0,hasError:f=!1,exclude:d,...c}=e,u=(0,A.T)(),g=Object.values(u).filter(e=>e.address!==d).map(e=>({id:e.address,account:(0,L.Q)(e.address,8),alias:e.name})),m=(0,n.useMemo)(()=>l||"",[l]),_=null===(t=u[m])||void 0===t?void 0:t.name,b=_||(0,L.Q)(m,8);return(0,s.jsxs)(s.Fragment,{children:[o&&(0,s.jsx)(j.x,{className:"p4a0541 _5baftfg _5baftfea _5baftf1g",children:(0,s.jsxs)(j.x,{className:"p4a0543 _5baftf4 _5baftfg _5baftf1v _5baftf1g _5baftf1y2 _5baftfev _5baftf5j",children:[b&&(0,s.jsx)(I.eE,{message:l,side:"top",children:(0,s.jsx)(j.x,{children:(0,s.jsxs)(R.Z,{size:"xxsmall",truncate:!0,children:["(",b,")"]})})}),!!_&&i&&(0,s.jsx)(j.x,{flexShrink:0,children:(0,s.jsx)(I.eE,{message:i,side:"top",children:(0,s.jsx)(k.Z,{})})})]})}),(0,s.jsx)(S,{...c,value:m,ref:a,onValueChange:e=>{r(e)},data:g,styleVariant:f?"primary-error":"primary"})]})}),K=(0,n.forwardRef)((e,a)=>{let{validate:t,name:r,label:n,...l}=e;return(0,s.jsx)(W.n,{name:r,label:n,validate:t,children:(0,s.jsx)(H,{...l,ref:a})})});var D=t(36021),U=t(96108),B=t(70440),$=t(97101);t(84196);let X=(0,l.vU)({collection:{id:"IOSCB1",defaultMessage:"NFT Collection"},item:{id:"W2OoOl",defaultMessage:"NFT"},nonFungiblesCollectionToolTip:{defaultMessage:"You don't have any NFT collections",id:"CV+lHE"},nonFungiblesToolTip:{defaultMessage:"You don't have any NFT's",id:"aqiLsu"}}),G=(0,n.forwardRef)((e,a)=>{let t=(0,i.Z)(),{fromAccount:r,resourceKey:l="address",itemKey:o="id",...f}=e,{name:d}=(0,n.useContext)(M.z),{data:c,isLoading:u}=(0,D.ln)(r),{nonFungibleBalances:g=[]}=c||{},m=(0,B.K)("".concat(d?"".concat(d,"."):"").concat(l)),{data:_,isFetching:b,hasNextPage:h,fetchNextPage:v}=(0,U.Ld)(m,[r]),x=(0,n.useMemo)(()=>g.map(e=>({id:e.address,title:e.name})),[g]),p=(null==x?void 0:x.length)>0,y=(0,n.useMemo)(()=>(null==_?void 0:_.pages.reduce((e,a)=>[...e,...a.items.map(e=>({id:e,title:e}))],[]))||[],[_]),z=(null==y?void 0:y.length)>0;return(0,n.useEffect)(()=>{!b&&h&&v()},[b,v,h]),(0,s.jsxs)(j.x,{disabled:!r||u||b,className:"_96zzcu1 _5baftf4 _5baftfg _5baftf11 _5baftf2m",children:[(0,s.jsx)(I.eE,{message:t.formatMessage(X.nonFungiblesCollectionToolTip),disabled:p,children:(0,s.jsx)("span",{children:(0,s.jsx)($.ZP,{...f,ref:a,name:l,placeholder:t.formatMessage(X.collection),data:x,disabled:!p,fullWidth:!0})})}),(0,s.jsx)(I.eE,{message:t.formatMessage(X.nonFungiblesToolTip),disabled:z,children:(0,s.jsx)("span",{children:(0,s.jsx)($.ZP,{...f,name:o,placeholder:t.formatMessage(X.item),data:y,disabled:!z,fullWidth:!0})})})]})});var Q=t(43207),Y=t(323),J=t(5535),ee=t(65098);let ea=n.forwardRef((e,a)=>{let{color:t="currentColor",...r}=e;return(0,s.jsx)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...r,ref:a,children:(0,s.jsx)("path",{stroke:t,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",d:"M17 14.75V19.25M11.25 19.25H5.78165C5.21714 19.25 4.77296 18.7817 4.88545 18.2285C5.19601 16.7012 6.21027 14 9.49996 14C10.1744 14 10.7532 14.0563 11.25 14.25M19.25 17H14.75M14.75 10.25C16.2687 10.25 17.25 9.01878 17.25 7.5C17.25 5.98122 16.2687 4.75 14.75 4.75M12.25 7.5C12.25 9.01878 11.0187 10.25 9.49996 10.25C7.98118 10.25 6.74996 9.01878 6.74996 7.5C6.74996 5.98122 7.98118 4.75 9.49996 4.75C11.0187 4.75 12.25 5.98122 12.25 7.5Z"})})}),et=n.forwardRef((e,a)=>{let{color:t="currentColor",...r}=e;return(0,s.jsx)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...r,ref:a,children:(0,s.jsx)("path",{stroke:t,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",d:"M12.25 4.75H12A7.25 7.25 0 1 0 19.25 12v-.25m-2.25-7V7m0 0v2.25M17 7h2.25M17 7h-2.25"})})});var es=t(7560),er=t(38930),en=t(72422),el=t(19106),ei=t(80254),eo=t(57915),ef=t(97368),ed=t(68622),ec=t(62825);let eu="Tabs",[eg,em]=(0,en.b)(eu,[el.Pc]),e_=(0,el.Pc)(),[eb,eh]=eg(eu),ev=(0,n.forwardRef)((e,a)=>{let{__scopeTabs:t,value:s,onValueChange:r,defaultValue:l,orientation:i="horizontal",dir:o,activationMode:f="automatic",...d}=e,c=(0,ef.gm)(o),[u,g]=(0,ed.T)({prop:s,onChange:r,defaultProp:l});return(0,n.createElement)(eb,{scope:t,baseId:(0,ec.M)(),value:u,onValueChange:g,orientation:i,dir:c,activationMode:f},(0,n.createElement)(eo.WV.div,(0,es.Z)({dir:c,"data-orientation":i},d,{ref:a})))}),ex=(0,n.forwardRef)((e,a)=>{let{__scopeTabs:t,loop:s=!0,...r}=e,l=eh("TabsList",t),i=e_(t);return(0,n.createElement)(el.fC,(0,es.Z)({asChild:!0},i,{orientation:l.orientation,dir:l.dir,loop:s}),(0,n.createElement)(eo.WV.div,(0,es.Z)({role:"tablist","aria-orientation":l.orientation},r,{ref:a})))}),ej=(0,n.forwardRef)((e,a)=>{let{__scopeTabs:t,value:s,disabled:r=!1,...l}=e,i=eh("TabsTrigger",t),o=e_(t),f=eM(i.baseId,s),d=ey(i.baseId,s),c=s===i.value;return(0,n.createElement)(el.ck,(0,es.Z)({asChild:!0},o,{focusable:!r,active:c}),(0,n.createElement)(eo.WV.button,(0,es.Z)({type:"button",role:"tab","aria-selected":c,"aria-controls":d,"data-state":c?"active":"inactive","data-disabled":r?"":void 0,disabled:r,id:f},l,{ref:a,onMouseDown:(0,er.M)(e.onMouseDown,e=>{r||0!==e.button||!1!==e.ctrlKey?e.preventDefault():i.onValueChange(s)}),onKeyDown:(0,er.M)(e.onKeyDown,e=>{[" ","Enter"].includes(e.key)&&i.onValueChange(s)}),onFocus:(0,er.M)(e.onFocus,()=>{let e="manual"!==i.activationMode;c||r||!e||i.onValueChange(s)})})))}),ep=(0,n.forwardRef)((e,a)=>{let{__scopeTabs:t,value:s,forceMount:r,children:l,...i}=e,o=eh("TabsContent",t),f=eM(o.baseId,s),d=ey(o.baseId,s),c=s===o.value,u=(0,n.useRef)(c);return(0,n.useEffect)(()=>{let e=requestAnimationFrame(()=>u.current=!1);return()=>cancelAnimationFrame(e)},[]),(0,n.createElement)(ei.z,{present:r||c},({present:t})=>(0,n.createElement)(eo.WV.div,(0,es.Z)({"data-state":c?"active":"inactive","data-orientation":o.orientation,role:"tabpanel","aria-labelledby":f,hidden:!t,id:d,tabIndex:0},i,{ref:a,style:{...e.style,animationDuration:u.current?"0s":void 0}}),t&&l))});function eM(e,a){return`${e}-trigger-${a}`}function ey(e,a){return`${e}-content-${a}`}t(5830);var ez=t(83308),ek=(0,ez.u)({defaultClassName:"_1t55vyz5",variantClassNames:{styleVariant:{primary:"_1t55vyz6 _5baftfea _5baftfg _5baftf1v _5baftf1a _5baftfl9 _5baftfpk _5baftf37y _5baftf3bv",secondary:"_1t55vyz7 _1t55vyz3"},sizeVariant:{small:"_1t55vyz8",medium:"_1t55vyz9 _1t55vyz4",large:"_1t55vyza"}},defaultVariants:{styleVariant:"primary",sizeVariant:"medium"},compoundVariants:[[{styleVariant:"primary",sizeVariant:"medium"},"_1t55vyzb"]]}),ew=(0,ez.u)({defaultClassName:"_1t55vyzh",variantClassNames:{styleVariant:{primary:"_1t55vyzi _5baftfhk _5baftfg5 _5baftfg2",secondary:"_1t55vyzj _5baftf10m"},sizeVariant:{small:"_1t55vyzk",medium:"_1t55vyzl _1t55vyzg",large:"_1t55vyzm"}},defaultVariants:{styleVariant:"primary",sizeVariant:"medium"},compoundVariants:[[{styleVariant:"primary",sizeVariant:"medium"},"_1t55vyzn"]]});let eq=e=>{let{children:a,list:t,sizeVariant:r="medium",styleVariant:n="primary",...l}=e;return(0,s.jsxs)(ev,{...l,children:[(0,s.jsx)(ex,{className:(0,x.Z)("_1t55vyz1 _5baftfg _5baftf1v _5baftfg8 _5baftf4",ek({sizeVariant:r,styleVariant:n})),children:t.map(e=>{let{label:a,value:t}=e;return(0,s.jsx)(ej,{value:t,className:(0,x.Z)(ew({sizeVariant:r,styleVariant:n}),"_1t55vyzd _5baftf34 _5baftf3a _5baftf3g _5baftf3m _5baftfj _5baftffp _5baftfhi"),children:a},t)})}),a]})},eN=e=>{if(null==e)throw Error("Input string is null or undefined.");if(0===e.length)return e;if("string"!=typeof e)throw Error("Input is not a string.");let a=e.codePointAt(0);if(void 0!==a&&a>127||void 0!==a&&Number.isNaN(a))throw Error("Input string contains invalid Unicode character.");return e.charAt(0).toUpperCase()+e.slice(1)};t(53863);var eC="ikuqqgx _5baftf37 _5baftf3d _5baftf3j _5baftf3p _5baftf3s _5baftf3y _5baftf44 _5baftf4a _5baftf6g _5baftf7a _5baftf3re _5baftf5m _5baftfh5 _5baftfhd",eV="ikuqqgf _5baftf4",eT="ikuqqg1 _5baftf4 _5baftfea _5baftfg _5baftf11 _5baftf2m",eE="ikuqqg3 _5baftf37 _5baftf3s _5baftf3re _5baftf87 _5baftf8b _5baftf8c _5baftf4v _5baftf4z _5baftf50",eZ="ikuqqg5 _5baftfg _5baftf11 _5baftf2d";let eF="message",eI="account",eR="tokens",eO="nfts",eP=(0,l.vU)({button_add_from:{id:"nlmCx1",defaultMessage:"Add another source"},button_add_account:{id:"k9/iMB",defaultMessage:"Add another recipient"},button_add_token:{id:"dYGqTI",defaultMessage:"Add another asset"},known_address:{id:"1LCRft",defaultMessage:"Known address"},title:{id:"DtYelJ",defaultMessage:"Transfer"},from_title:{id:"F4xg6X",defaultMessage:"From account"},from_subtitle:{id:"yeLIPx",defaultMessage:"Select account you wish to send assets from"},from_placeholder:{defaultMessage:"Select account",id:"0+6+jP"},to_placeholder:{defaultMessage:"Select account",id:"0+6+jP"},to_title:{id:"gCOFay",defaultMessage:"To account"},to_subtitle:{id:"y0Ofed",defaultMessage:"Select recipient to send assets to"},message_title:{id:"T7Ry38",defaultMessage:"Message"},message_subtitle:{id:"QBcOMr",defaultMessage:"Send an optional message with the transaction"},message_placeholder:{id:"d4jAEU",defaultMessage:"Enter transaction message"},message_encrypt_title:{id:"luAead",defaultMessage:"Encrypt message"},tab_tokens:{id:"P6EE/a",defaultMessage:"Tokens"},tab_nfts:{id:"nqRscq",defaultMessage:"NFTs"},button_submit:{id:"9WRlF4",defaultMessage:"Send"}}),eS=(0,n.forwardRef)((e,a)=>{let t=(0,i.Z)(),{name:r}=(0,n.useContext)(M.z),l=(0,B.K)("".concat(r?"".concat(r,"."):"").concat(eI))||"",{data:o}=(0,D.ln)(l),{fungibleBalances:f=[]}=o||{},d=(0,n.useMemo)(()=>f.map(e=>e.address),[o]);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(j.x,{className:(0,x.Z)(eT,eE),children:[(0,s.jsxs)(j.x,{className:eZ,children:[(0,s.jsx)(R.Z,{color:"strong",size:"large",weight:"strong",children:t.formatMessage(eP.from_title)}),(0,s.jsx)(R.Z,{size:"xsmall",children:t.formatMessage(eP.from_subtitle)})]}),(0,s.jsx)(j.x,{children:(0,s.jsx)(z.e,{placeholder:t.formatMessage(eP.from_placeholder),ref:a,name:eI})})]}),(0,s.jsx)(y.H,{name:"actions",defaultKeys:1,className:"ikuqqgn _5baftf4 _5baftfh",trashTrigger:(0,s.jsx)(p.z,{styleVariant:"ghost",sizeVariant:"small",iconOnly:!0,className:eV,children:(0,s.jsx)(ee.Z,{})}),addTrigger:(0,s.jsx)(p.z,{styleVariant:"secondary",sizeVariant:"large",fullWidth:!0,leftIcon:(0,s.jsx)(j.x,{marginLeft:"small",children:(0,s.jsx)(ea,{})}),className:"ikuqqgh ikuqqgg",children:t.formatMessage(eP.button_add_account)}),children:(0,s.jsxs)(j.x,{className:(0,x.Z)(eT,eE),children:[(0,s.jsxs)(j.x,{className:eZ,children:[(0,s.jsx)(R.Z,{color:"strong",size:"large",weight:"strong",children:t.formatMessage(eP.to_title)}),(0,s.jsx)(R.Z,{size:"xsmall",children:t.formatMessage(eP.to_subtitle)})]}),(0,s.jsxs)(j.x,{children:[(0,s.jsx)(K,{placeholder:t.formatMessage(eP.to_placeholder),name:"to",toolTipMessageKnownAddress:t.formatMessage(eP.known_address),exclude:l}),(0,s.jsx)(y.H,{name:"resources",defaultKeys:1,className:"ikuqqgp _5baftf4 _5baftfg",addTrigger:(0,s.jsx)(p.z,{styleVariant:"secondary",sizeVariant:"large",fullWidth:!0,leftIcon:(0,s.jsx)(j.x,{marginLeft:"small",children:(0,s.jsx)(et,{})}),className:"ikuqqgl ikuqqgk",children:t.formatMessage(eP.button_add_token)}),trashTrigger:(0,s.jsx)(p.z,{styleVariant:"ghost",sizeVariant:"small",iconOnly:!0,className:"ikuqqgr _5baftf4",children:(0,s.jsx)(ee.Z,{})}),children:(0,s.jsx)(j.x,{className:"ikuqqgt _5baftf4 _5baftf5p",children:(0,s.jsxs)(eq,{list:[{label:eN(t.formatMessage(eP.tab_tokens)),value:eR},{label:eN(t.formatMessage(eP.tab_nfts)),value:eO}],defaultValue:eR,className:"ikuqqgv _5baftf87",children:[(0,s.jsx)(ep,{value:eR,className:eC,children:(0,s.jsx)(J.O,{balances:f,resourceAddresses:d})}),(0,s.jsx)(ep,{value:eO,className:eC,children:(0,s.jsx)(G,{fromAccount:l})})]})})})]})]})})]})});var eA=()=>{let e=(0,i.Z)(),a=(0,n.useRef)(null),t=(0,B.K)(eF)||"";return(0,n.useEffect)(()=>{var e;null==a||null===(e=a.current)||void 0===e||e.focus()},[null==a?void 0:a.current]),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(j.x,{className:eT,children:[(0,s.jsxs)(j.x,{className:eZ,children:[(0,s.jsx)(R.Z,{color:"strong",size:"large",weight:"strong",children:e.formatMessage(eP.message_title)}),(0,s.jsx)(R.Z,{size:"xsmall",children:e.formatMessage(eP.message_subtitle)})]}),(0,s.jsxs)(j.x,{className:"ikuqqg7 _5baftf4",children:[(0,s.jsx)(j.x,{className:"ikuqqg9 _5baftf1 _5baftffy _5baftfg1",children:(0,s.jsx)(R.Z,{size:"xxsmall",children:"".concat((null==t?void 0:t.length)||0,"/").concat(200)})}),(0,s.jsx)(Y.N7,{name:eF,placeholder:e.formatMessage(eP.message_placeholder),sizeVariant:"large",className:"ikuqqgb ikuqqga",maxLength:200})]})]}),(0,s.jsx)(y.H,{name:"from",defaultKeys:1,trashTrigger:(0,s.jsx)(p.z,{styleVariant:"ghost",sizeVariant:"small",iconOnly:!0,className:eV,children:(0,s.jsx)(ee.Z,{})}),addTrigger:(0,s.jsx)(j.x,{className:"ikuqqgj _5baftf3s _5baftf3y _5baftf44 _5baftf4a _5baftf37 _5baftf3re _5baftf8v _5baftf8z",children:(0,s.jsx)(p.z,{styleVariant:"secondary",sizeVariant:"large",fullWidth:!0,leftIcon:(0,s.jsx)(j.x,{marginLeft:"small",children:(0,s.jsx)(ea,{})}),children:e.formatMessage(eP.button_add_from)})}),children:(0,s.jsx)(eS,{ref:a})}),(0,s.jsx)(Q.M,{children:(0,s.jsx)(p.z,{sizeVariant:"large",styleVariant:"primary",fullWidth:!0,children:e.formatMessage(eP.button_submit)})})]})};t(79692);let eL=(0,l.vU)({validation_token_address_required:{id:"IXFNmv",defaultMessage:"Resource is required"},validation_token_address:{id:"gO3ocF",defaultMessage:"Please select token"},validation_token_amount_required:{id:"jU3fsF",defaultMessage:"Amount is required"},validation_token_amount:{id:"FrNeCi",defaultMessage:"Please enter a valid amount"},validation_nft_collection_required:{id:"IwILnS",defaultMessage:"NFT collection is required"},validation_nft_collection:{id:"jPKpFd",defaultMessage:"Please select NFT collection"},validation_nft_item_required:{id:"BKQjIu",defaultMessage:"NFT item is required"},validation_nft_item:{id:"yTLHBR",defaultMessage:"Please select NFT item"},validation_from:{id:"w2XWRt",defaultMessage:"Please select account"},validation_message:{id:"9Xeynx",defaultMessage:"Message can not be longer than {length}"},validation_to:{id:"qdvh1F",defaultMessage:"Please select recipient"},validation_values_length:{id:"8Dy6y8",defaultMessage:"At least one group is required"},error_toast:{id:"fjqZcw",defaultMessage:"Failed submitting transaction to the network"},success_toast:{id:"Gkt0d0",defaultMessage:"Successfully submitted transaction to the network"},toast_action_label:{id:"K7AkdL",defaultMessage:"Show"}});function eW(e,a,t){return{from:[{account:"-"!==e?e:"",actions:[{to:"",resources:a?[{address:a,id:t?decodeURIComponent(t):"",amount:0}]:[]}]}],message:"",messageEncrypted:!1}}let eH=()=>{let e=(0,i.Z)(),a=(0,m.h)(),t=(0,_.p)(),l=(0,o.TH)(),b=(0,o.s0)(),[x]=(0,f.lr)(),j=x.get("accountId")||"-",p=x.get("resourceId"),M=x.get("nftId"),y=eW(j,p,M),[z,k]=(0,n.useState)(y),[w,q]=(0,n.useState)(),N=(0,n.useMemo)(()=>{let a=c.z.object({address:c.z.string({required_error:e.formatMessage(eL.validation_token_address_required)}).min(1,e.formatMessage(eL.validation_token_address)),amount:c.z.coerce.number({required_error:e.formatMessage(eL.validation_token_amount_required)}).gt(0,{message:e.formatMessage(eL.validation_token_amount)})}),t=c.z.object({address:c.z.string({required_error:e.formatMessage(eL.validation_nft_collection_required)}).min(1,e.formatMessage(eL.validation_nft_collection)),id:c.z.string({required_error:e.formatMessage(eL.validation_nft_item_required)}).min(1,e.formatMessage(eL.validation_nft_item))}),s=a.or(t),r=c.z.object({to:c.z.string().min(1,e.formatMessage(eL.validation_to)),resources:c.z.array(s)});return c.z.object({from:c.z.array(c.z.object({account:c.z.string().min(1,e.formatMessage(eL.validation_from)),actions:c.z.array(r)})).min(1,e.formatMessage(eL.validation_values_length)),message:c.z.string().max(200,e.formatMessage(eL.validation_message,{length:200})).or(c.z.undefined()),messageEncrypted:c.z.boolean().or(c.z.undefined())})},[]);(0,n.useEffect)(()=>{k(eW(j,p,M))},[j,p,M]);let C=async s=>{q(void 0);let n=N.safeParse(s);if(!1===n.success){q(n.error);return}let i=new r.DO;s.from.forEach(e=>{let{account:a,actions:t}=e;return t.forEach(e=>{var t;if((null===(t=e.resources)||void 0===t?void 0:t.length)>0){let t=[],s=[];e.resources.forEach(e=>{let{address:a,id:r,amount:n}=e;r?t.push({resource:a,ids:[r]}):s.push({resource:a,amount:n})}),t.length>0&&(i=v(i,[{from:a,to:e.to,nfts:t}])),s.length>0&&(i=h(i,[{from:a,to:e.to,tokens:s}]))}})});let o=i.build(),f=await r.$D.Instructions.convert(o.instructions,a,"String");await t({version:1,transactionManifest:f.value,message:s.message}).then(a=>{a.isErr()?d.A.error(e.formatMessage(eL.error_toast),{description:a.error.message||a.error.error}):(d.A.success(e.formatMessage(eL.success_toast),{description:a.value.status,action:{label:e.formatMessage(eL.toast_action_label),onClick:()=>{x.set("tx","".concat(a.value.transactionIntentHash)),b("".concat(l.pathname,"?").concat(x))}}}),k(eW("","","")))})};return(0,s.jsxs)(u.l,{onSubmit:C,initialValues:z,errors:null==w?void 0:w.format(),className:"t6z5ej1 _5baftf4 _5baftfea",children:[(0,s.jsx)(g.d,{message:null==w?void 0:w.flatten().formErrors[0]}),(0,s.jsx)(eA,{})]})};var eK=eH},86305:function(){},84196:function(){},13945:function(){},5830:function(){},53863:function(){},79692:function(){}}]);