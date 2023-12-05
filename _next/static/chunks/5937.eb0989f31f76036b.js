(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5937],{59466:function(e,a,t){"use strict";t.r(a),t.d(a,{default:function(){return j}});var s=t(52322),l=t(6277),r=t(2784),f=t(18917),i=t(21593),d=t(65475),o=t(49177),c=t(83112),n=t(73557),u=t(43789);t(41486),t(8144),t(9563),t(56633);let g=(0,o.vU)({title:{id:"HKVjc9",defaultMessage:"Staking validators"},subtitle:{id:"wo7fN5",defaultMessage:"View all currently registered Radix Network validator nodes, and manage your own XRD stakes to validators"}}),h=()=>{let e=(0,c.Z)(),{validatorId:a}=(0,n.UO)();return(0,s.jsxs)(f.x,{className:"_1gwvajr1 _5baftf51 _5baftf5v _5baftf6p _5baftf7j _5baftfa _5baftfg1 _5baftf14l _5baftfgb",children:[(0,s.jsx)(u.Z,{size:"xxlarge",color:"strong",weight:"strong",children:e.formatMessage(g.title)}),(0,s.jsx)(f.x,{maxWidth:"xsmall",children:(0,s.jsx)(u.Z,{size:"medium",children:e.formatMessage(g.subtitle)})})]})};t(37229);var x=t(39857),_=t(72340),b=t(27166);t(23132);let m=e=>{let{value:a,row:{original:t}}=e,{id:i}=t,d=(0,r.useMemo)(()=>(0,s.jsx)(f.x,{className:(0,l.Z)("fq404t5 _5baftf1 _5baftfg1 _5baftfg2 _5baftfg3 _5baftfg4 _5baftfb7 _5baftffp _5baftfg _5baftf2p _5baftf1y _5baftfbm","td-cell-loading"),children:(0,s.jsxs)(f.x,{display:"flex",width:"full",flexDirection:"column",gap:"small",flexGrow:1,children:[(0,s.jsx)(f.x,{className:b.A0,style:{height:"12px",width:"".concat((0,_.h)(50,90),"%")}}),(0,s.jsx)(f.x,{className:b.A0,style:{height:"12px",width:"".concat((0,_.h)(40,70),"%")}})]})}),[]);return(0,s.jsxs)(f.x,{className:"fq404t1 _5baftf4",children:[(0,s.jsx)(f.x,{className:(0,l.Z)("fq404t3 _5baftf4 _5baftfg _5baftf1y _5baftffp _5baftf2p","td-cell"),children:(0,s.jsx)(u.Z,{size:"small",color:"strong",truncate:!0,children:a})}),d]},i)},p=(0,o.vU)({validator:{id:"Ykb512",defaultMessage:"Validator"},address:{id:"e6Ph5+",defaultMessage:"Address"},total_stake:{id:"7vSKTY",defaultMessage:"Total stake"},owner_stake:{id:"3tVTRk",defaultMessage:"Owner stake"},uptime:{id:"u81G9+",defaultMessage:"Uptime"},apy:{id:"MLTKb6",defaultMessage:"APY"},fee:{id:"7Zeppl",defaultMessage:"Fee %"}}),w=()=>Math.random().toString(36).substring(7),M=Array.from({length:400}).map((e,a,t)=>{let s=w();return{id:"".concat(a,"-").concat(s),validator:"".concat(a,"-").concat(s),address:"".concat(a,"-").concat(s),totalStake:(0,_.h)(1,100),ownerStake:(0,_.h)(1,100),apy:(0,_.h)(1,100),fee:(0,_.h)(1,100),upTime:(0,_.h)(1,100),acceptsStake:(0,_.h)(1,100)}}),k=()=>{let e=(0,c.Z)(),a=(0,n.s0)();(0,n.TH)();let[t]=(0,x.lr)(),s=(0,r.useMemo)(()=>[{Header:e.formatMessage(p.validator),accessor:"validator",width:"20%",Cell:m},{Header:e.formatMessage(p.address),accessor:"address",width:"auto",Cell:m},{Header:e.formatMessage(p.total_stake),accessor:"totalStake",width:"auto",Cell:m},{Header:e.formatMessage(p.owner_stake),accessor:"ownerStake",width:"auto",Cell:m},{Header:e.formatMessage(p.uptime),accessor:"upTime",width:"13%",Cell:m},{Header:e.formatMessage(p.apy),accessor:"apy",width:"8%",Cell:m},{Header:e.formatMessage(p.fee),accessor:"fee",width:"8%",Cell:m}],[]),[l,f]=(0,r.useState)(M),[i,d]=(0,r.useState)(!1),[o,u]=(0,r.useState)(!1),[g,h]=(0,r.useState)(s);return{items:l,columns:g,loading:i,loadMore:o,onRowSelected:e=>{let{id:s}=e;t.set("validator",s),a("/staking?".concat(t))},onEndReached:()=>{}}};var j=()=>{let{scrollableNode:e,isScrolledTop:a}=(0,i.v)(),{items:t,columns:r,loading:o,loadMore:c,onRowSelected:n,onEndReached:u}=k();return(0,s.jsxs)(f.x,{className:(0,l.Z)("_1xixi921 _5baftf4"),children:[(0,s.jsx)(h,{}),(0,s.jsx)(f.x,{className:"_1xixi925 _5baftf6n _5baftf7h _5baftf4",children:(0,s.jsx)(d.i,{className:"_1xixi923 _1xixi922",styleVariant:"primary",sizeVariant:"large",scrollableNode:null!=e?e:void 0,data:t,columns:r,isScrolledTop:a,loading:o,loadMore:c,onRowSelected:n})})]})}},23132:function(){},56633:function(){},37229:function(){}}]);