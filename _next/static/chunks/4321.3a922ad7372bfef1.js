"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4321],{14321:function(e,l,a){a.d(l,{y:function(){return p}});var s=a(52322),n=a(2784),i=a(49177),o=a(83112),d=a(18917),t=a(12348),u=a(12132),c=a(70440),r=a(28694),f=a(47324),m=a(96108),g=a(97101);a(41486),a(32642),a(92226);let h=(0,i.vU)({collection:{id:"IOSCB1",defaultMessage:"NFT Collection"},item:{id:"W2OoOl",defaultMessage:"NFT"},nonFungiblesCollectionToolTip:{defaultMessage:"You don't have any NFT collections",id:"CV+lHE"},nonFungiblesToolTip:{defaultMessage:"You don't have any NFT's",id:"aqiLsu"}}),p=(0,n.forwardRef)((e,l)=>{let a=(0,o.Z)(),{fromAccount:i,resourceKey:p="address",itemKey:T="id",onSelect:b,...x}=e,{name:M}=(0,n.useContext)(u.z),{data:{nonFungibleBalances:j=[]}}=(0,f.ln)([i]),v=(0,c.K)("".concat(M?"".concat(M,"."):"").concat(p)),{data:C,isFetching:F,hasNextPage:N,fetchNextPage:E}=(0,m.Ld)(v,[i]),z=(0,n.useMemo)(()=>j.map(e=>({id:e.address,title:e.name})),[j]),k=(null==z?void 0:z.length)>0,W=(0,n.useMemo)(()=>(null==C?void 0:C.pages.reduce((e,l)=>[...e,...l.items.map(e=>({id:e,title:e}))],[]))||[],[C]),_=(null==W?void 0:W.length)>0;return(0,n.useEffect)(()=>{!F&&N&&E()},[F,E,N]),(0,s.jsxs)(d.x,{disabled:!i||F,className:"z7liua4 z7liuav z7liua21 z7liuat1",children:[(0,s.jsx)(r.eE,{message:a.formatMessage(h.nonFungiblesCollectionToolTip),disabled:k,children:(0,s.jsx)("span",{children:(0,s.jsx)(g.ZP,{...x,ref:l,name:p,placeholder:a.formatMessage(h.collection),data:z,disabled:!k,fullWidth:!0})})}),v&&(0,s.jsx)(r.eE,{message:a.formatMessage(h.nonFungiblesToolTip),disabled:_,children:(0,s.jsx)("span",{children:F?(0,s.jsx)(t.hW,{}):(0,s.jsx)(g.ZP,{...x,name:T,placeholder:a.formatMessage(h.item),data:W,disabled:!_,fullWidth:!0,onSelect:e=>{b&&b(v,e)}})})})]})})}}]);