(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6282],{44830:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return V}});var a=s(52322),l=s(2784),r=s(49177),i=s(83112),n=s(73557),o=s(18917),f=s(6887),d=s(72580),c=s(99040),u=s(43207),x=s(72797),m=s(86578),g=s(2827),_=s(95212),h=s(56089);let j=(0,r.vU)({password_placeholder:{id:"2LbrkB",defaultMessage:"Enter password"},unlock_error:{id:"uyz8/R",defaultMessage:"Incorrect password!"},form_button_title:{id:"fxvXUy",defaultMessage:"Reveal"}}),b={password:""};var v=e=>{let{combinedKeystoreId:t,onUnlock:s}=e,r=(0,i.Z)(),n=(0,l.useRef)(null),{getSecret:f}=(0,_.Q)(),[d,v]=(0,l.useState)("");(0,l.useEffect)(()=>{var e;null==n||null===(e=n.current)||void 0===e||e.focus()},[]);let y=async e=>{try{let a=await f(t,e.password);s(a),v("")}catch(e){console.error(e),v(r.formatMessage(j.unlock_error))}};return(0,a.jsxs)(c.l,{onSubmit:y,initialValues:b,children:[(0,a.jsx)(g.d,{message:d}),(0,a.jsx)(o.x,{className:h.Ti,children:(0,a.jsx)(x.ZP,{ref:n,isPassword:!0,name:"password",placeholder:r.formatMessage(j.password_placeholder),sizeVariant:"medium"})}),(0,a.jsx)(u.M,{children:(0,a.jsx)(m.z,{fullWidth:!0,sizeVariant:"large",children:r.formatMessage(j.form_button_title)})})]})},y=s(43789);s(41486),s(8144),s(9563),s(40979);let p=e=>{let{word:t,index:s}=e;return(0,a.jsxs)(o.x,{className:"spx8r07 _5baftf4 _5baftfj",children:[(0,a.jsx)(d.I,{styleVariant:"secondary",sizeVariant:"large",leftIconClassName:"spx8r05 _5baftfb7",leftIcon:(0,a.jsx)(o.x,{children:(0,a.jsxs)(y.Z,{children:[s+1,"."]})})}),(0,a.jsx)(o.x,{className:"spx8r09 _5baftf1 _5baftfj _5baftffs _5baftfg1 _5baftfg3",children:(0,a.jsx)(y.Z,{children:t})})]})};var M=e=>{let{words:t}=e;return(0,a.jsx)(o.x,{className:"spx8r01 _5baftf84 _5baftf94",children:(0,a.jsx)(o.x,{className:"spx8r03 _5baftfp",children:t.map((e,t)=>(0,a.jsx)(p,{word:e,index:t},e))})})},w=s(51129);s(80834);var k=e=>{let{secret:t}=e;return(0,a.jsx)(o.x,{className:"_1b00shy1 _5baftf3a _5baftf3g _5baftf3m _5baftf3s _5baftf3v _5baftf41 _5baftf47 _5baftf4d _5baftf4v _5baftf5p _5baftf6j _5baftf7d _5baftf4 _5baftfj _5baftf3xi _5baftf1af _5baftfgj",children:(0,a.jsx)(o.x,{className:"_1b00shy3 _5baftf4 _5baftfj _5baftffs",children:(0,a.jsx)(y.Z,{children:t})})})},C=e=>{let{keystore:t}=e,{isWallet:s}=(0,_.Q)(),[r,i]=(0,l.useState)(),[n,o]=(0,l.useState)([]);return s&&(null==t?void 0:t.type)===w.nq.LOCAL?r?(null==n?void 0:n.length)===1?(0,a.jsx)(k,{secret:r}):(0,a.jsx)(M,{words:n}):(0,a.jsx)(v,{combinedKeystoreId:t.id,onUnlock:e=>{i(e),o((null==e?void 0:e.split(" "))||[])}}):null},z=s(38465),Z=s(87115),N=s(65703),I=s(66572);let S=(0,r.vU)({title:{id:"3yk8fB",defaultMessage:"Wallet"},subtitle:{id:"ypG0Mw",defaultMessage:"Manage your wallet and private keys"},name_title:{id:"HAlOn1",defaultMessage:"Name"},name_subtitle:{id:"Ed9r5F",defaultMessage:"Change your wallet name"},secret_title:{id:"fxvXUy",defaultMessage:"Reveal"},secret_subtitle:{id:"Ya7CkP",defaultMessage:"Show seed phrase or extended private key"},remove_title:{id:"2P7Gje",defaultMessage:"Remove wallet"},remove_subtitle:{id:"ar3Mx5",defaultMessage:"Remove your wallet and delete all cache data"},remove:{id:"k76I/W",defaultMessage:"Delete wallet"},remove_confirm_title:{id:"k76I/W",defaultMessage:"Delete wallet"},remove_confirm_sub_title:{id:"1fXPQ6",defaultMessage:"Are you sure you want to delete wallet?"}});var V=()=>{let e=(0,i.Z)(),t=(0,n.s0)(),{isWallet:s,removeSecret:l,confirm:r}=(0,_.Q)(),{keystore:c,changeKeystoreName:u}=(0,z.e)(e=>({keystore:e.keystores.find(t=>{let{id:s}=t;return s===e.selectedKeystoreId}),changeKeystoreName:e.changeKeystoreNameAction})),x=async()=>{let s=await r({title:e.formatMessage(S.remove_confirm_title),content:e.formatMessage(S.remove_confirm_sub_title),buttonTitle:e.formatMessage(S.remove)});await l(s),t("/")};return(0,a.jsxs)(I.e,{children:[(0,a.jsx)(N.A,{title:e.formatMessage(S.title),subTitle:e.formatMessage(S.subtitle)}),(0,a.jsx)(Z.m,{leftCol:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(y.Z,{size:"large",weight:"strong",color:"strong",children:e.formatMessage(S.name_title)}),(0,a.jsx)(o.x,{children:(0,a.jsx)(y.Z,{size:"xsmall",children:e.formatMessage(S.name_subtitle)})})]}),rightCol:(0,a.jsx)(d.I,{value:c.name,elementType:"input",type:"url",onChange:e=>{let t=e.nativeEvent;t.isComposing||u(c.id,e.target.value)}})}),s&&(null==c?void 0:c.type)===w.nq.LOCAL&&(0,a.jsx)(Z.m,{leftCol:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(y.Z,{size:"large",weight:"strong",color:"strong",children:e.formatMessage(S.secret_title)}),(0,a.jsx)(o.x,{children:(0,a.jsx)(y.Z,{size:"xsmall",children:e.formatMessage(S.secret_subtitle)})})]}),rightCol:(0,a.jsx)(C,{keystore:c})}),s&&(null==c?void 0:c.type)===w.nq.COMBINED&&(0,a.jsx)(Z.m,{leftCol:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(y.Z,{size:"large",weight:"strong",color:"strong",children:e.formatMessage(S.secret_title)}),(0,a.jsx)(o.x,{children:(0,a.jsx)(y.Z,{size:"xsmall",children:e.formatMessage(S.secret_subtitle)})})]}),rightCol:(0,a.jsx)(o.x,{display:"flex",flexDirection:"column",width:"full",gap:"xlarge",children:Object.keys(c.keySources).map(e=>(0,a.jsxs)(o.x,{display:"flex",flexDirection:"column",width:"full",gap:"medium",children:[(0,a.jsx)(y.Z,{size:"large",weight:"strong",color:"strong",children:c.keySources[e].name}),(0,a.jsx)(C,{keystore:c.keySources[e]})]},e))})}),s&&(0,a.jsx)(Z.m,{isBottomBorderVisible:!1,leftCol:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(y.Z,{size:"large",weight:"strong",color:"strong",children:e.formatMessage(S.remove_title)}),(0,a.jsx)(o.x,{children:(0,a.jsx)(y.Z,{size:"xsmall",children:e.formatMessage(S.remove_subtitle)})})]}),rightCol:(0,a.jsx)(f.z,{onClick:x,styleVariant:"destructive",sizeVariant:"xlarge",fullWidth:!0,children:e.formatMessage(S.remove)})})]})}},80834:function(){},40979:function(){}}]);