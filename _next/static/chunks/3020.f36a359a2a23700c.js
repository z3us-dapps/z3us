(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3020],{72797:function(e,a,t){"use strict";t.d(a,{Hz:function(){return o}});var s=t(52322),n=t(2784),r=t(72580),i=t(9219);let o=(0,n.forwardRef)((e,a)=>{let{isPassword:t,onChange:n,hasError:i,styleVariant:o="primary",...l}=e;return(0,s.jsx)(r.I,{...l,styleVariant:i?"primary"===o?"primary-error":"secondary-error":o,type:t?"password":"text",ref:a,onChange:e=>{let a=e.nativeEvent;a.isComposing||n(e.target.value)}})}),l=(0,n.forwardRef)((e,a)=>{let{validate:t,name:n,label:r,isPassword:l,hidden:c,...d}=e;return(0,s.jsx)(i.n,{name:n,label:r,validate:t,hidden:c,children:(0,s.jsx)(o,{...d,isPassword:l,hidden:!0,ref:a})})});a.ZP=l},43645:function(e,a,t){"use strict";t.r(a),t.d(a,{Swap:function(){return ea},default:function(){return et}});var s=t(52322),n=t(2784),r=t(49177),i=t(83112),o=t(73557),l=t(39857),c=t(8522),d=t(23554),u=t(18917),f=t(99040),m=t(36650),_=t(43207),g=t(68080),x=t(65098),h=t(86578),p=t(2827),b=t(7540),j=t(38059),v=t(86363),M=t(47843),y=t(6277),k=t(86232),w=t(10455),z=t(13154),A=t(43789),O=t(29774),N=t(73452),T=t(12132),P=t(98076),E=t(72797),Z=t(5535),C=t(70440),K=t(50945),F=t(28694),S=t(57635),L=t(26494),D=t(47324),q=t(16163),H=t(91316),R=t(16803),W=t(7101);t(41486),t(8144),t(9563),t(52311);var B="x3la7g8 _5baftfg _5baftfed _5baftf14 _5baftf84 _5baftf2s _5baftf2w";let I=(0,r.vU)({fee_wallet:{id:"PyXtpD",defaultMessage:"Wallet fee"},fee_lp:{id:"OS5a2i",defaultMessage:"Pool fee"},price_impact:{id:"WBB92z",defaultMessage:"Price impact"},price_impact_info:{id:"MoWYiJ",defaultMessage:"Price impact is the influence of user&apos;s individual trade over the market price of an underlying asset pair. It is directly correlated with the amount of liquidity in the pool. Price impact can be especially high for illiquid markets/pairs, and may cause a trader to lose a significant portion of their funds."},account_placeholder:{defaultMessage:"Select account",id:"0+6+jP"}}),V=()=>{var e;let a=(0,i.Z)(),t=(0,n.useRef)(null),{onFieldChange:r}=(0,n.useContext)(N.q),{name:o}=(0,n.useContext)(T.z),l=(0,C.K)("".concat(o?"".concat(o,"."):"","account"))||"",c=(0,C.K)("".concat(o).concat(o?".":"","from[0]")),d=(0,C.K)("".concat(o).concat(o?".":"","to[0]")),{data:f={}}=(0,H.rU)(),{data:_}=(0,q.p)(null==d?void 0:d.address),{data:g}=(0,D.ln)(l),{fungibleBalances:x=[]}=g||{},h=(0,R.vK)("symbol",null==_?void 0:null===(e=_.metadata)||void 0===e?void 0:e.items),b=(0,n.useMemo)(()=>x.filter(e=>!!f[e.address]).map(e=>e.address),[g,f]),j=(0,n.useMemo)(()=>Object.keys(f),[f]),[v,M]=(0,n.useState)("send"),y=(0,n.useMemo)(()=>"send"===v?Number.parseFloat((null==c?void 0:c.amount)||"0"):Number.parseFloat((null==d?void 0:d.amount)||"0"),[v,c,d]),k=(0,n.useMemo)(()=>.003*Number.parseFloat((null==d?void 0:d.amount)||"0"),[null==d?void 0:d.amount]),{data:w,error:z}=(0,H.G_)(l,null==c?void 0:c.address,null==d?void 0:d.address,v,y);return(0,n.useEffect)(()=>{var e;null==t||null===(e=t.current)||void 0===e||e.focus()},[null==t?void 0:t.current]),(0,n.useEffect)(()=>{r("".concat(o).concat(o?".":"","dex"),"astrolecent")},[r]),(0,n.useEffect)(()=>{if(!w)return;"send"===v?r("".concat(o).concat(o?".":"","to[0].amount"),(.997*w.outputTokens).toString()):r("".concat(o).concat(o?".":"","from[0].amount"),w.inputTokens.toString());let{divisibility:e}=_.details,a=(0,W.O)(),t='\n			TAKE_FROM_WORKTOP\n				Address("'.concat(d.address,'")\n				Decimal("').concat((.003*w.outputTokens).toFixed(e),'")\n				Bucket("fee_bucket').concat(a,'")\n			;\n			CALL_METHOD\n				Address("').concat(S.Pz,'")\n				"try_deposit_or_abort"\n				Bucket("fee_bucket').concat(a,'")\n				Enum<0u8>()\n			;\n		'),s=w.manifest.lastIndexOf("CALL_METHOD"),n="".concat(w.manifest.substring(0,s),"\n").concat(t,"\n").concat(w.manifest.substring(s));r("".concat(o).concat(o?".":"","manifest"),n)},[w]),(0,s.jsxs)(u.x,{width:"full",children:[(0,s.jsxs)(u.x,{className:B,children:[(0,s.jsx)(E.ZP,{name:"dex",hidden:!0}),(0,s.jsx)(E.ZP,{name:"manifest",hidden:!0}),(0,s.jsx)(P.e,{placeholder:a.formatMessage(I.account_placeholder),ref:t,name:"account"}),(0,s.jsx)(m.H,{name:"from",defaultKeys:1,ignoreTriggers:!0,children:(0,s.jsx)(Z.O,{balances:x,resourceAddresses:b,onAmountChange:()=>{M("send")}})}),(0,s.jsx)(m.H,{name:"to",defaultKeys:1,ignoreTriggers:!0,children:(0,s.jsx)(Z.O,{disabledAmount:!0,balances:x,resourceAddresses:j,onAmountChange:()=>{M("receive")}})})]}),(0,s.jsx)(p.d,{message:null==z?void 0:z.message}),w&&(0,s.jsxs)(u.x,{width:"full",children:[(0,s.jsx)(K.$,{leftTitle:(0,s.jsx)(A.Z,{size:"small",children:a.formatMessage(I.price_impact)}),rightData:(0,s.jsx)(F.eE,{message:a.formatMessage(I.price_impact_info),children:(0,s.jsx)(u.x,{children:(0,s.jsx)(A.Z,{size:"small",color:"strong",children:a.formatNumber(w.priceImpact,L.Bp)})})})}),(0,s.jsx)(K.$,{leftTitle:(0,s.jsx)(A.Z,{size:"small",children:a.formatMessage(I.fee_wallet)}),rightData:(0,s.jsxs)(A.Z,{size:"small",color:"strong",children:[a.formatNumber(k,L.i)," ",h]})}),(0,s.jsx)(K.$,{leftTitle:(0,s.jsx)(A.Z,{size:"small",children:a.formatMessage(I.fee_lp)}),rightData:(0,s.jsxs)(A.Z,{size:"small",color:"strong",children:[a.formatNumber(w.swapFee,L.i)," ",h]})})]})]})};var U=t(84192);let $=(0,r.vU)({fee_wallet:{id:"PyXtpD",defaultMessage:"Wallet fee"},fee_lp:{id:"OS5a2i",defaultMessage:"Pool fee"},price_impact:{id:"WBB92z",defaultMessage:"Price impact"},price_impact_info:{id:"MoWYiJ",defaultMessage:"Price impact is the influence of user&apos;s individual trade over the market price of an underlying asset pair. It is directly correlated with the amount of liquidity in the pool. Price impact can be especially high for illiquid markets/pairs, and may cause a trader to lose a significant portion of their funds."},account_placeholder:{defaultMessage:"Select account",id:"0+6+jP"}}),X=()=>{var e;let a=(0,i.Z)(),t=(0,n.useRef)(null),{onFieldChange:r}=(0,n.useContext)(N.q),{name:o}=(0,n.useContext)(T.z),l=(0,C.K)("".concat(o?"".concat(o,"."):"","account"))||"",c=(0,C.K)("".concat(o).concat(o?".":"","from[0]")),d=(0,C.K)("".concat(o).concat(o?".":"","to[0]")),{data:f={}}=(0,U.rU)(),{data:_}=(0,q.p)(null==d?void 0:d.address),{data:g}=(0,D.ln)(l),{fungibleBalances:x=[]}=g||{},h=(0,R.vK)("symbol",null==_?void 0:null===(e=_.metadata)||void 0===e?void 0:e.items),b=(0,n.useMemo)(()=>x.filter(e=>!!f[e.address]).map(e=>e.address),[g,f]),j=(0,n.useMemo)(()=>Object.keys(f),[f]),[v,M]=(0,n.useState)("send"),y=(0,n.useMemo)(()=>"send"===v?Number.parseFloat((null==c?void 0:c.amount)||"0"):Number.parseFloat((null==d?void 0:d.amount)||"0"),[v,c,d]),k=(0,n.useMemo)(()=>.003*Number.parseFloat((null==d?void 0:d.amount)||"0"),[null==d?void 0:d.amount]),{data:w,error:z}=(0,U.G_)(null==c?void 0:c.address,null==d?void 0:d.address,v,y);return(0,n.useEffect)(()=>{var e;null==t||null===(e=t.current)||void 0===e||e.focus()},[null==t?void 0:t.current]),(0,n.useEffect)(()=>{r("".concat(o).concat(o?".":"","dex"),"oci")},[]),(0,n.useEffect)(()=>{if(!w)return;let e=w.input_address===(null==c?void 0:c.address)?"send":"receive",a="send"===e?"input":"output",t="send"===e?"output":"input";"send"===e?r("".concat(o).concat(o?".":"","to[0].amount"),(.997*Number.parseFloat(w["".concat(t,"_amount")].token)).toString()):r("".concat(o).concat(o?".":"","from[0].amount"),w["".concat(a,"_amount")].token);let{divisibility:s}=_.details,n=(0,W.O)(),i=w.swaps.reduce((e,r)=>"\n		".concat(e,'\n			CALL_METHOD\n				Address("').concat(l,'")\n				"withdraw"\n				Address("').concat(r["".concat(a,"_address")],'")\n				Decimal("').concat(r["".concat(a,"_amount")].token,'")\n			;\n			TAKE_ALL_FROM_WORKTOP\n				Address("').concat(r["".concat(a,"_address")],'")\n				Bucket("bucket').concat(n,'")\n			;\n			CALL_METHOD\n				Address("').concat(r.pool_address,'")\n				"swap"\n				Bucket("bucket').concat(n,'")\n			;\n			TAKE_FROM_WORKTOP\n				Address("').concat(r["".concat(t,"_address")],'")\n				Decimal("').concat((.003*Number.parseFloat(r["".concat(t,"_amount")].token)).toFixed(s),'")\n				Bucket("fee_bucket').concat(n,'")\n			;\n			CALL_METHOD\n				Address("').concat(S.Pz,'")\n				"try_deposit_or_abort"\n				Bucket("fee_bucket').concat(n,'")\n				Enum<0u8>()\n			;\n			CALL_METHOD\n				Address("').concat(l,'")\n				"deposit_batch"\n				Expression("ENTIRE_WORKTOP")\n			;\n		'),"");r("".concat(o).concat(o?".":"","manifest"),i)},[w]),(0,s.jsxs)(u.x,{width:"full",children:[(0,s.jsxs)(u.x,{className:B,children:[(0,s.jsx)(E.ZP,{name:"dex",hidden:!0}),(0,s.jsx)(E.ZP,{name:"manifest",hidden:!0}),(0,s.jsx)(P.e,{placeholder:a.formatMessage($.account_placeholder),ref:t,name:"account"}),(0,s.jsx)(m.H,{name:"from",defaultKeys:1,ignoreTriggers:!0,children:(0,s.jsx)(Z.O,{balances:x,resourceAddresses:b,onAmountChange:()=>{M("send")}})}),(0,s.jsx)(m.H,{name:"to",defaultKeys:1,ignoreTriggers:!0,children:(0,s.jsx)(Z.O,{balances:x,resourceAddresses:j,onAmountChange:()=>{M("receive")}})})]}),(0,s.jsx)(p.d,{message:null==z?void 0:z.message}),w&&(0,s.jsxs)(u.x,{className:"x3la7gg _5baftf3a _5baftf3g _5baftf3m _5baftf3s _5baftf3v _5baftf41 _5baftf47 _5baftf4d _5baftf6m _5baftf7g _5baftf3ro _5baftf5s _5baftf4s _5baftf8a _5baftfgk _5baftf14e",children:[(0,s.jsx)(K.$,{leftTitle:(0,s.jsx)(A.Z,{size:"small",children:a.formatMessage($.price_impact)}),rightData:(0,s.jsx)(F.eE,{message:a.formatMessage($.price_impact_info),children:(0,s.jsx)(u.x,{children:(0,s.jsx)(A.Z,{size:"small",color:"strong",children:a.formatNumber(Number.parseFloat(w.price_impact),L.Bp)})})})}),(0,s.jsx)(K.$,{leftTitle:(0,s.jsx)(A.Z,{size:"small",children:a.formatMessage($.fee_wallet)}),rightData:(0,s.jsxs)(A.Z,{size:"small",color:"strong",children:[a.formatNumber(k,L.i)," ",h]})}),(0,s.jsx)(K.$,{leftTitle:(0,s.jsx)(A.Z,{size:"small",children:a.formatMessage($.fee_lp)}),rightData:(0,s.jsxs)(A.Z,{size:"small",color:"strong",children:[a.formatNumber(Number.parseFloat(w.input_fee_lp.token),L.i)," ",h]})})]})]})},G=(0,r.vU)({dex:{id:"U8QBHO",defaultMessage:"Powered by"},tab_oci:{id:"eyMKyf",defaultMessage:"OCI"},tab_astrolecent:{id:"CrAj8T",defaultMessage:"Astrolecent"}}),J="astrolecent",Q=()=>{let e=(0,i.Z)(),a=(0,n.useMemo)(()=>({oci:{title:e.formatMessage(G.tab_oci),image:O.l.OCI_SWAP},[J]:{title:e.formatMessage(G.tab_astrolecent),image:O.l.ASTROLESCENT}}),[]),[t,r]=(0,n.useState)("oci");return(0,s.jsxs)(u.x,{paddingBottom:"small",children:[(0,s.jsxs)(u.x,{className:"x3la7g4 _5baftf4 _5baftfg _5baftf1y _5baftf5p",children:[(0,s.jsx)(u.x,{paddingRight:"small",children:(0,s.jsx)(A.Z,{size:"medium",children:e.formatMessage(G.dex)})}),(0,s.jsxs)(k.h_,{children:[(0,s.jsx)(k.$F,{asChild:!0,children:(0,s.jsxs)(u.x,{component:"button",display:"inline-flex",alignItems:"center",className:(0,y.Z)(z.h,z.V),children:[(0,s.jsx)(A.Z,{size:"medium",color:"inherit",children:a[t].title}),(0,s.jsx)(u.x,{paddingLeft:"small",children:(0,s.jsx)(w.H,{size:"small",address:a[t].image})})]})}),(0,s.jsx)(k.cq,{children:(0,s.jsx)(k.AW,{align:"start",sideOffset:2,className:"x3la7g0",children:Object.entries(a).map(e=>{let[a,{title:t,image:n}]=e;return(0,s.jsxs)(k.Xi,{onSelect:()=>r(a),children:[(0,s.jsx)(k.Kp,{children:(0,s.jsx)(w.H,{size:"small",address:n})}),(0,s.jsx)(u.x,{display:"flex",marginLeft:"small",children:(0,s.jsx)(A.Z,{size:"xsmall",truncate:!0,children:t})})]},a)})})})]})]}),{oci:(0,s.jsx)(X,{}),[J]:(0,s.jsx)(V,{})}[t]]})},Y=(0,r.vU)({button_add_swap:{id:"Clukea",defaultMessage:"Add another swap"},button_submit:{id:"s8BnAC",defaultMessage:"Swap"},validation_token_required:{id:"IXFNmv",defaultMessage:"Resource is required"},validation_token:{id:"gO3ocF",defaultMessage:"Please select token"},validation_amount_required:{id:"jU3fsF",defaultMessage:"Amount is required"},validation_amount:{id:"FrNeCi",defaultMessage:"Please enter a valid amount"},validation_account:{id:"w2XWRt",defaultMessage:"Please select account"},validation_swaps:{id:"WsQhkr",defaultMessage:"At least one action is required"},error_toast:{id:"fjqZcw",defaultMessage:"Failed submitting transaction to the network"},success_toast:{id:"Gkt0d0",defaultMessage:"Successfully submitted transaction to the network"},toast_action_label:{id:"K7AkdL",defaultMessage:"Show"}}),ee={swaps:[{dex:"oci",manifest:"",account:"",from:[{address:"",amount:0}],to:[{address:"",amount:0}]}]},ea=()=>{let e=(0,i.Z)(),a=(0,M.p)(),t=(0,o.TH)(),r=(0,o.s0)(),y=(0,j.h9)(),[k]=(0,l.lr)(),w=(0,v.z)(),{data:z}=(0,b.D)(),[A,O]=(0,n.useState)(ee),[N,T]=(0,n.useState)();(0,n.useEffect)(()=>{if(!z)return;let e=Object.keys(w);0!==e.length&&O({swaps:[{dex:"oci",manifest:"",account:e[0],from:[{address:z.resourceAddresses.xrd,amount:0}],to:[{address:1===y?"resource_rdx1t52pvtk5wfhltchwh3rkzls2x0r98fw9cjhpyrf3vsykhkuwrf7jg8":"",amount:0}]}]})},[y,w,z]);let P=(0,n.useMemo)(()=>{let a=d.z.object({address:d.z.string({required_error:e.formatMessage(Y.validation_token_required)}).min(1,e.formatMessage(Y.validation_token)),amount:d.z.coerce.number({required_error:e.formatMessage(Y.validation_amount_required)}).gt(0,{message:e.formatMessage(Y.validation_amount)})});return d.z.object({swaps:d.z.array(d.z.object({dex:d.z.literal("oci").or(d.z.literal("astrolecent")),manifest:d.z.string().min(1),account:d.z.string().min(1,e.formatMessage(Y.validation_account)),from:d.z.array(a).length(1),to:d.z.array(a).length(1)})).min(1,e.formatMessage(Y.validation_swaps))})},[]),E=async s=>{T(void 0);let n=P.safeParse(s);if(!1===n.success){T(n.error);return}let i=s.swaps.map(e=>e.manifest).join("\n");await a({version:1,transactionManifest:i}).then(a=>{c.A.success(e.formatMessage(Y.success_toast),{description:a.status,action:{label:e.formatMessage(Y.toast_action_label),onClick:()=>{k.set("tx","".concat(a.transactionIntentHash)),r("".concat(t.pathname,"?").concat(k))}}}),O(ee)}).catch(a=>{c.A.error(e.formatMessage(Y.error_toast),{description:a.message||a.error})})};return(0,s.jsx)(u.x,{width:"full",children:(0,s.jsxs)(f.l,{onSubmit:E,initialValues:A,errors:null==N?void 0:N.format(),className:"x3la7ga _5baftf4",children:[(0,s.jsx)(u.x,{className:"x3la7g6 _5baftf4 _5baftfg _5baftf5p",children:(0,s.jsx)(p.d,{message:null==N?void 0:N.flatten().formErrors[0]})}),(0,s.jsx)(m.H,{name:"swaps",defaultKeys:1,addTrigger:(0,s.jsx)(u.x,{className:"x3la7ge _5baftf51",children:(0,s.jsx)(h.z,{styleVariant:"secondary",sizeVariant:"large",fullWidth:!0,leftIcon:(0,s.jsx)(u.x,{marginLeft:"small",children:(0,s.jsx)(g.Z,{})}),children:e.formatMessage(Y.button_add_swap)})}),trashTrigger:(0,s.jsx)(u.x,{children:(0,s.jsx)(h.z,{styleVariant:"ghost",sizeVariant:"small",iconOnly:!0,children:(0,s.jsx)(x.Z,{})})}),className:"x3la7gc _5baftf3v _5baftf41 _5baftf47 _5baftf4d _5baftfg _5baftf2m _5baftf3a _5baftf3rh _5baftf8d _5baftf51",children:(0,s.jsx)(Q,{})}),(0,s.jsx)(u.x,{className:"x3la7g2 _5baftf4 _5baftf4v",children:(0,s.jsx)(_.M,{children:(0,s.jsx)(h.z,{sizeVariant:"large",styleVariant:"primary",fullWidth:!0,children:e.formatMessage(Y.button_submit)})})})]})})};var et=ea},52311:function(){}}]);