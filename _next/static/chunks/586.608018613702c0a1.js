(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[586],{13437:function(e,s,a){"use strict";var t=a(52322),r=a(2784);let d=r.forwardRef((e,s)=>{let{color:a="currentColor",...r}=e;return(0,t.jsxs)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...r,ref:s,children:[(0,t.jsx)("path",{stroke:a,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",d:"M4.75 19.25L9 18.25L18.2929 8.95711C18.6834 8.56658 18.6834 7.93342 18.2929 7.54289L16.4571 5.70711C16.0666 5.31658 15.4334 5.31658 15.0429 5.70711L5.75 15L4.75 19.25Z"}),(0,t.jsx)("path",{stroke:a,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",d:"M19.25 19.25H13.75"})]})});s.Z=d},95096:function(e,s,a){"use strict";a.d(s,{I:function(){return i},T:function(){return l}});var t=a(2784),r=a(38059),d=a(91206),n=a(38465);let l=()=>{let e=(0,r.h9)(),{addressBook:s}=(0,n.Z)(s=>({addressBook:s.addressBook[e]}));return(0,t.useMemo)(()=>s||{},[s])},i=()=>{let e=(0,d.i)(),s=l();return{...s,...e}}},76411:function(e,s,a){"use strict";a.r(s),a.d(s,{default:function(){return W}});var t=a(52322),r=a(2784),d=a(49177),n=a(83112),l=a(60705),i=a(18917),o=a(6887),c=a(45362),u=a(91206),m=a(95096),f=a(65703),g=a(66572),x=a(21593),h=a(28614),v=a(65098),j=a(13437),p=a(43789);a(41486),a(8144),a(39986),a(37745);let M=(0,d.vU)({delete:{id:"K3r6DQ",defaultMessage:"Delete"},edit:{id:"wEQDC6",defaultMessage:"Edit"}}),y=e=>{let{row:s,onDelete:a,onEdit:r}=e,d=(0,n.Z)();return(0,t.jsxs)(i.x,{className:"_1a68m1m1 _5baftf4 _5baftfg _5baftf21 _5baftfg8 _5baftf2s",children:[(0,t.jsxs)(i.x,{className:"_1a68m1m3 _5baftfgb _5baftfg _5baftf17 _5baftf1j _5baftf2j",children:[(0,t.jsx)(p.Z,{size:"small",color:"strong",weight:"medium",truncate:!0,children:s.original.name}),(0,t.jsx)(p.Z,{size:"xsmall",truncate:!0,children:s.original.address})]}),(0,t.jsx)(o.z,{sizeVariant:"small",styleVariant:"secondary",leftIcon:(0,t.jsx)(v.Z,{}),onClick:a,children:d.formatMessage(M.delete)}),(0,t.jsx)(o.z,{sizeVariant:"small",styleVariant:"secondary",leftIcon:(0,t.jsx)(j.Z,{}),onClick:r,children:d.formatMessage(M.edit)})]},s.original.address)},b=(0,d.vU)({header:{id:"HAlOn1",defaultMessage:"Name"}}),_=e=>{let{row:s,onEdit:a,onDelete:r}=e;return(0,t.jsx)(y,{row:s,onEdit:()=>a(s.original.address),onDelete:()=>r(s.original.address)},s.original.address)},k=e=>{let{data:s,onEdit:a,onDelete:d}=e,l=(0,n.Z)(),{scrollableNode:i}=(0,x.v)(),o=(0,r.useMemo)(()=>[{Header:l.formatMessage(b.header),accessor:"name",width:"auto",Cell:_}],[a,d]);return(0,t.jsx)(h.i,{styleVariant:"secondary",sizeVariant:"medium",scrollableNode:i,data:s,columns:o,cellProps:{onEdit:a,onDelete:d}})};var w=a(8522),Z=a(89698),C=a(38059),z=a(38465),A=a(2509);let V=(0,d.vU)({title:{id:"74xz0X",defaultMessage:"Delete address"},description:{id:"2tBfaP",defaultMessage:"Are you sure you want to delete {address} from address book?"},button_text:{id:"K3r6DQ",defaultMessage:"Delete"},success_message:{id:"qNNICy",defaultMessage:"Successfully deleted entry"}});var D=e=>{let{address:s,onClose:a}=e,r=(0,n.Z)(),d=(0,C.h9)(),{handleRemoveAddress:l}=(0,z.Z)(e=>({handleRemoveAddress:e.removeAddressBookEntryAction}));return(0,t.jsx)(Z.ld,{open:!!s,title:r.formatMessage(V.title),description:(0,t.jsx)(i.x,{component:"span",children:(0,t.jsx)(p.Z,{truncate:!0,children:r.formatMessage(V.description,{address:(0,A.Q)(s)})})}),confirmButtonText:r.formatMessage(V.button_text),onCancel:a,onConfirm:()=>{l(d,s),w.A.success(r.formatMessage(V.success_message),{}),a()}})},N=a(93138),E=a(63370),I=a(72580),B=a(2827),L=a(23554);let Q=(e,s)=>{let a=(null==e?void 0:e.success)===!1?e.error:null;if(!a)return{message:null,error:!1};let t=a.issues.find(e=>e.path.length===s.length&&e.path.every((e,a)=>"number"==typeof s[a]?"number"==typeof e&&e===s[a]:e===s[a]));return t?{message:t.message,error:!0}:{message:null,error:!1}},U=L.z.object({name:L.z.string().min(1,"Must include from name"),address:L.z.string().min(1,"Must include valid address").startsWith("account_")}),T=e=>{let s=U.safeParse({name:e.name,address:e.address});return!1===s.success?{success:!1,error:s.error}:{success:!0,data:s.data}},S=(e,s)=>Q(e,s),H=(0,d.vU)({title:{id:"CRZQfm",defaultMessage:"Address book entry"},updated_toast:{id:"Nm5nic",defaultMessage:"Successfully updated address book entry"},created_toast:{id:"e+se8N",defaultMessage:"Successfully added new address book entry"},name:{id:"HAlOn1",defaultMessage:"Name"},name_placeholder:{id:"XI8UhQ",defaultMessage:"Insert name"},address:{id:"e6Ph5+",defaultMessage:"Address"},address_placeholder:{id:"VrQ5VV",defaultMessage:"Insert address"},cancel:{id:"47FYwb",defaultMessage:"Cancel"},submit:{id:"jvo0vs",defaultMessage:"Save"}}),P={name:"",address:"",dateAdded:0,dateUpdated:0};var R=e=>{var s,a,d;let{address:c,onClose:u}=e,f=(0,n.Z)(),g=(0,C.h9)(),x=(0,m.T)(),{setAddressBookEntry:h}=(0,z.Z)(e=>({setAddressBookEntry:e.setAddressBookEntryAction})),[v,j]=(0,l.x)({name:null===(s=x[c])||void 0===s?void 0:s.name,address:null===(a=x[c])||void 0===a?void 0:a.address,validation:void 0});(0,r.useEffect)(()=>{j(e=>{var s,a;e.name=(null===(s=x[c])||void 0===s?void 0:s.name)||"",e.address=(null===(a=x[c])||void 0===a?void 0:a.address)||""})},[c]);let M=()=>{j(e=>{e.name="",e.address="",e.validation=void 0}),u()};return(0,t.jsx)(N.Vq,{open:void 0!==c,onClose:M,children:(0,t.jsxs)(i.x,{component:"form",padding:"large",display:"flex",flexDirection:"column",gap:"large",onSubmit:e=>{e.preventDefault();let s=x[c]||P,a={dateAdded:Date.now(),...s,dateUpdated:Date.now(),name:v.name,address:v.address},t=T(a);if(j(e=>{e.validation=t}),!t.success)return;h(g,v.address,a);let r=x[c]?f.formatMessage(H.updated_toast):f.formatMessage(H.created_toast);j(e=>{e.name="",e.address="",e.validation=void 0}),w.A.success(r,{}),u()},children:[(0,t.jsx)(p.Z,{size:"xlarge",color:"strong",weight:"strong",children:f.formatMessage(H.title)}),(0,t.jsxs)(i.x,{display:"flex",flexDirection:"column",gap:"xsmall",children:[(0,t.jsx)(p.Z,{size:"xsmall",children:f.formatMessage(H.name)}),(0,t.jsxs)(i.x,{children:[(0,t.jsx)(I.I,{placeholder:f.formatMessage(H.name_placeholder),value:v.name,onChange:e=>{j(s=>{s.name=e.currentTarget.value})},styleVariant:S(v.validation,["name"]).error?"primary-error":"primary"}),(0,t.jsx)(B.d,{message:S(v.validation,["name"]).message})]})]}),(0,t.jsxs)(i.x,{display:"flex",flexDirection:"column",gap:"xsmall",children:[(0,t.jsx)(p.Z,{size:"xsmall",children:f.formatMessage(H.address)}),(0,t.jsxs)(i.x,{children:[(0,t.jsx)(I.I,{disabled:!!(null===(d=x[c])||void 0===d?void 0:d.address),placeholder:f.formatMessage(H.address_placeholder),value:v.address,styleVariant:S(v.validation,["address"]).error?"primary-error":"primary",onChange:e=>{j(s=>{s.address=e.currentTarget.value})},rightIcon:v.validation&&!S(v.validation,["address"]).error&&(0,t.jsx)(i.x,{color:"green500",display:"flex",children:(0,t.jsx)(E.Z,{})})}),(0,t.jsx)(B.d,{message:S(v.validation,["address"]).message})]})]}),(0,t.jsxs)(i.x,{display:"flex",gap:"small",justifyContent:"flex-end",children:[(0,t.jsx)(o.z,{sizeVariant:"small",styleVariant:"secondary",onClick:M,children:f.formatMessage(H.cancel)}),(0,t.jsx)(o.z,{sizeVariant:"small",type:"submit",children:f.formatMessage(H.submit)})]})]})})};let O=(0,d.vU)({title:{id:"5zZZ90",defaultMessage:"Address book"},subtitle:{id:"wo97Qy",defaultMessage:"Manage your Radix address book with ease, editing account names and addresses in a convenient table view for seamless transactions."},new_address:{id:"klknry",defaultMessage:"New address"}});var W=()=>{let e=(0,n.Z)(),s=(0,u.i)(),a=(0,m.T)(),[d,x]=(0,l.x)({entries:[],deleting:void 0,editing:void 0});(0,r.useEffect)(()=>{x(e=>{e.entries=Object.values(a).filter(e=>!s[e.address])})},[a]);let h=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";x(s=>{s.editing=e})};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(g.e,{children:[(0,t.jsx)(f.A,{title:e.formatMessage(O.title),subTitle:e.formatMessage(O.subtitle)}),(0,t.jsxs)(i.x,{display:"flex",flexDirection:"column",gap:"small",children:[(0,t.jsx)(i.x,{paddingBottom:"medium",children:(0,t.jsx)(o.z,{styleVariant:"primary",leftIcon:(0,t.jsx)(c.Z,{}),onClick:()=>h(),children:e.formatMessage(O.new_address)})}),(0,t.jsx)(k,{data:d.entries,onEdit:h,onDelete:e=>{x(s=>{s.deleting=e})}})]})]}),(0,t.jsx)(D,{address:d.deleting,onClose:()=>{x(e=>{e.deleting=void 0})}}),(0,t.jsx)(R,{address:d.editing,onClose:()=>{x(e=>{e.editing=void 0})}})]})}},37745:function(){}}]);