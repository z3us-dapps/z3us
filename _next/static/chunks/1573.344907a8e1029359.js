"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1573],{43047:function(e,t,a){a.r(t),a.d(t,{Swap:function(){return S},default:function(){return q}});var s=a(52322),r=a(28694),o=a(43789),n=a(68284),i=a(16803),c=a(2784),l=a(49177),d=a(83112),u=a(73557),m=a(39857),f=a(8522),_=a(23554),g=a(18917),p=a(99040),h=a(50945),M=a(2827),x=a(84192),b=a(47843),j=a(6887),v=a(12132),k=a(95886),y=a(98076),w=a(43207),z=a(5535),A=a(70440),E=a(36021);let F=(0,l.vU)({account_placeholder:{defaultMessage:"Select account",id:"0+6+jP"},button_submit:{id:"s8BnAC",defaultMessage:"Swap"}});var N=()=>{let e=(0,d.Z)(),t=(0,c.useRef)(null),{name:a}=(0,c.useContext)(v.z),r=(0,A.K)("".concat(a?"".concat(a,"."):"","account"))||"",{data:o}=(0,x.rU)(),{data:n}=(0,E.ln)(r),{fungibleBalances:i=[]}=n||{},l=(0,c.useMemo)(()=>i.filter(e=>!!o[e.address]).map(e=>e.address),[n,o]),u=(0,c.useMemo)(()=>Object.keys(o),[o]);return(0,c.useEffect)(()=>{var e;null==t||null===(e=t.current)||void 0===e||e.focus()},[null==t?void 0:t.current]),(0,s.jsxs)(g.x,{display:"flex",flexDirection:"column",gap:"medium",alignItems:"center",justifyContent:"center",children:[(0,s.jsx)(y.e,{placeholder:e.formatMessage(F.account_placeholder),ref:t,name:"account"}),(0,s.jsx)(k.H,{name:"from",defaultKeys:1,ignoreTriggers:!0,children:(0,s.jsx)(z.O,{balances:i,resourceAddresses:l})}),(0,s.jsx)(k.H,{name:"to",defaultKeys:1,ignoreTriggers:!0,children:(0,s.jsx)(z.O,{balances:i,resourceAddresses:u})}),(0,s.jsx)(w.M,{children:(0,s.jsx)(j.z,{sizeVariant:"large",styleVariant:"primary",fullWidth:!0,children:e.formatMessage(F.button_submit)})})]})};let O=(0,l.vU)({fee_wallet:{id:"PyXtpD",defaultMessage:"Wallet fee"},fee_lp:{id:"OS5a2i",defaultMessage:"Pool fee"},price_impact:{id:"WBB92z",defaultMessage:"Price impact"},price_impact_info:{id:"MoWYiJ",defaultMessage:"Price impact is the influence of user&apos;s individual trade over the market price of an underlying asset pair. It is directly correlated with the amount of liquidity in the pool. Price impact can be especially high for illiquid markets/pairs, and may cause a trader to lose a significant portion of their funds."},validation_token_required:{id:"IXFNmv",defaultMessage:"Resource is required"},validation_token:{id:"gO3ocF",defaultMessage:"Please select token"},validation_amount_required:{id:"jU3fsF",defaultMessage:"Amount is required"},validation_amount:{id:"FrNeCi",defaultMessage:"Please enter a valid amount"},validation_account:{id:"w2XWRt",defaultMessage:"Please select account"},error_toast:{id:"fjqZcw",defaultMessage:"Failed submitting transaction to the network"},success_toast:{id:"Gkt0d0",defaultMessage:"Successfully submitted transaction to the network"},toast_action_label:{id:"K7AkdL",defaultMessage:"Show"}}),T={account:"",from:[{address:"",amount:0}],to:[{address:"",amount:0}]};function P(e,t){let a=e.to[0].amount!==t.to[0].amount?"receive":"send",s="send"===a?t.from[0].amount:t.to[0].amount,r=.003*s;return{from:t.from[0].address,to:t.to[0].address,side:a,amount:s+r,fee:r}}let S=()=>{let e=(0,d.Z)(),t=(0,b.p)(),a=(0,u.TH)(),l=(0,u.s0)(),[j]=(0,m.lr)(),[v,k]=(0,c.useState)(T),[y,w]=(0,c.useState)(T),[z,A]=(0,c.useState)(P(v,v)),[E,F]=(0,c.useState)(),{data:S,error:q}=(0,x.G_)(z.from,z.to,z.side,z.amount),{data:C}=(0,n.S)(z.from),D=(0,i.vK)("symbol",C);(0,c.useEffect)(()=>{if(!S)return;let e=function(e,t,a){let s="send"===e.side?"input":"output",r="send"===e.side?"output":"input";return{account:t.account,from:[{address:a["".concat(s,"_address")],amount:Number.parseFloat(a["".concat(s,"_amount")].token)}],to:[{address:a["".concat(r,"_address")],amount:Number.parseFloat(a["".concat(r,"_amount")].token)}]}}(z,y,S);w(e),k(e)},[S]);let L=(0,c.useMemo)(()=>{let t=_.z.object({address:_.z.string({required_error:e.formatMessage(O.validation_token_required)}).min(1,e.formatMessage(O.validation_token)),amount:_.z.coerce.number({required_error:e.formatMessage(O.validation_amount_required)}).gt(0,{message:e.formatMessage(O.validation_amount)})});return _.z.object({account:_.z.string().min(1,e.formatMessage(O.validation_account)),from:_.z.array(t).length(1),to:_.z.array(t).length(1)})},[]),Z=async e=>{(y.from[0].address!==e.from[0].address||y.from[0].amount!==e.from[0].amount||y.to[0].address!==e.to[0].address||y.to[0].amount!==e.to[0].amount)&&(A(P(y,e)),w(e))},K=async s=>{F(void 0);let r=L.safeParse(s);if(!1===r.success){F(r.error);return}let o="send"===z.side?"input":"output",n=S.swaps.reduce((e,t)=>"\n		".concat(e,'\n			CALL_METHOD\n				Address("').concat(s.account,'")\n				"withdraw"\n				Address("').concat(t["".concat(o,"_address")],'")\n				Decimal("').concat(1.003*Number.parseFloat(t["".concat(o,"_amount")].token),'")\n			;\n			TAKE_ALL_FROM_WORKTOP\n				Address("').concat(t["".concat(o,"_address")],'")\n				Bucket("bucket1")\n			;\n			CALL_METHOD\n				Address("').concat(t.pool_address,'")\n				"swap"\n				Bucket("bucket1")\n			;\n			CALL_METHOD\n				Address("').concat(s.account,'")\n				"deposit_batch"\n				Expression("ENTIRE_WORKTOP")\n			;\n		'),"");await t({version:1,transactionManifest:n}).then(t=>{t.isErr()?f.A.error(e.formatMessage(O.error_toast),{description:t.error.message||t.error.error}):(f.A.success(e.formatMessage(O.success_toast),{description:t.value.status,action:{label:e.formatMessage(O.toast_action_label),onClick:()=>{j.set("tx","".concat(t.value.transactionIntentHash)),l("".concat(a.pathname,"?").concat(j))}}}),k(T))})};return(0,s.jsx)(g.x,{width:"full",children:(0,s.jsxs)(p.l,{onSubmit:K,onChange:Z,initialValues:v,errors:null==E?void 0:E.format(),children:[(0,s.jsx)(M.d,{message:(null==E?void 0:E.flatten().formErrors[0])||(null==q?void 0:q.message)}),(0,s.jsx)(N,{}),S&&(0,s.jsxs)(g.x,{children:[(0,s.jsx)(h.$,{leftTitle:(0,s.jsx)(o.Z,{size:"small",children:e.formatMessage(O.price_impact)}),rightData:(0,s.jsx)(r.eE,{message:e.formatMessage(O.price_impact_info),children:(0,s.jsx)(g.x,{children:(0,s.jsx)(o.Z,{size:"small",color:"strong",children:e.formatNumber(Number.parseFloat(S.price_impact),{style:"percent"})})})})}),(0,s.jsx)(h.$,{leftTitle:(0,s.jsx)(o.Z,{size:"small",children:e.formatMessage(O.fee_wallet)}),rightData:(0,s.jsxs)(o.Z,{size:"small",color:"strong",children:[e.formatNumber(z.fee,{style:"decimal",maximumFractionDigits:18})," ",D]})}),(0,s.jsx)(h.$,{leftTitle:(0,s.jsx)(o.Z,{size:"small",children:e.formatMessage(O.fee_lp)}),rightData:(0,s.jsxs)(o.Z,{size:"small",color:"strong",children:[e.formatNumber(Number.parseFloat(S.input_fee_lp.token),{style:"decimal",maximumFractionDigits:18})," ",D]})})]})]})})};var q=S}}]);