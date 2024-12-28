import{a as q,d as L,e as l,f as N,g as T,h as A,i as f,j as G,l as V,m as U,n as H,o as B,p as J,q as Y,r as $,s as z,t as K,u as Q,v as W,w as X}from"./chunk-UT44A6SV.js";import"./chunk-XAZLOLJU.js";import{h as R,i as j,x as F}from"./chunk-LSVXEVRK.js";import{$ as _,B as C,Cb as I,Db as D,Pa as s,Q as M,Qa as u,Xa as m,ab as w,ba as S,bb as x,cb as d,fb as P,g as v,ja as O,jb as n,kb as o,lb as k,ob as p,pb as E,qa as c,x as y,yb as i,zb as g}from"./chunk-352QRF22.js";function h(a){a||(O(h),a=_(c));let r=new v(t=>a.onDestroy(t.next.bind(t)));return t=>t.pipe(M(r))}var te=()=>["/"];function ne(a,r){if(a&1&&(n(0,"mat-error"),i(1),o()),a&2){let t=E();s(),g(t.errorMessage())}}var Z=class a{constructor(r,t,e){this.destroyRef=r;this.authService=t;this.router=e;y(this.form.controls.email.statusChanges,this.form.controls.email.valueChanges).pipe(h()).subscribe(()=>this.updateErrorMessage())}errorMessage=m("");hide=m(!0);isAuthenticated=!1;locale=null;form=new A({email:new f("",{validators:[l.email,l.required]}),password:new f("",{validators:[l.minLength(6),l.required]})});ngOnInit(){this.locale=localStorage.getItem("locale"),document.querySelector("header")?.addEventListener("click",()=>this.locale=localStorage.getItem("locale")),document.querySelector(".mobile-menu-list")?.addEventListener("click",()=>this.locale=localStorage.getItem("locale"));let r=this.form.valueChanges.pipe(C(500)).subscribe({next:e=>{window.localStorage.setItem("saved-login-form",JSON.stringify({email:e.email}))}}),t=this.authService.user.subscribe({next:e=>{this.isAuthenticated=!!e,this.isAuthenticated&&window.location.replace("/")}});this.destroyRef.onDestroy(()=>{r.unsubscribe(),t.unsubscribe()})}onSubmit(){if(this.form.controls.email.invalid||this.form.controls.password.invalid){console.log("Invalid email or password");return}let r=this.form.value.email,t=this.form.value.password;this.authService.login(r,t).subscribe({next:e=>{console.log(e),this.form.reset(),this.router.navigate(["/"])},error:e=>console.log(e)})}updateErrorMessage(){this.form.controls.email.hasError("required")?this.errorMessage.set("You have to enter an email address!"):this.form.controls.email.hasError("email")?this.errorMessage.set("Invalid email address"):this.errorMessage.set("")}clickEvent(r){this.hide.set(!this.hide()),r.stopPropagation()}static \u0275fac=function(t){return new(t||a)(u(c),u(X),u(R))};static \u0275cmp=S({type:a,selectors:[["app-login"]],standalone:!0,features:[I],decls:26,vars:8,consts:[["routerLinkActive","router-link-active",3,"routerLink"],[3,"ngSubmit","formGroup"],[1,"formField"],["matInput","","placeholder","pat@example.com","required","","id","email","name","email","formControlName","email",3,"blur"],["matInput","","id","password","name","password","formControlName","password",3,"type"],["mat-icon-button","","matSuffix","","type","button",3,"click"],[1,"actions"],["mat-stroked-button",""],["iconPositionEnd",""]],template:function(t,e){t&1&&(n(0,"h2"),i(1,"Please enter your credentials!"),o(),n(2,"p"),i(3,"If you are not an administartor, please go back to the "),n(4,"a",0),i(5,"Home page"),o(),i(6,` .
`),o(),n(7,"form",1),p("ngSubmit",function(){return e.onSubmit()}),n(8,"mat-form-field",2)(9,"mat-label"),i(10,"Enter email address"),o(),n(11,"input",3),p("blur",function(){return e.updateErrorMessage()}),o(),w(12,ne,2,1,"mat-error"),o(),n(13,"mat-form-field")(14,"mat-label"),i(15,"Enter password"),o(),k(16,"input",4),n(17,"button",5),p("click",function(ee){return e.clickEvent(ee)}),n(18,"mat-icon"),i(19),o()()(),n(20,"div",6)(21,"button",7)(22,"span"),i(23,"Login"),o(),n(24,"mat-icon",8),i(25,"arrow_right_alt"),o()()()()),t&2&&(s(4),d("routerLink",D(7,te)),s(3),d("formGroup",e.form),s(5),P(e.form.controls.email.invalid?12:-1),s(4),d("type",e.hide()?"password":"text"),s(),x("aria-label","Hide password")("aria-pressed",e.hide()),s(2),g(e.hide()?"visibility_off":"visibility"))},dependencies:[B,G,L,N,T,H,V,U,q,F,j,K,z,J,Y,$,W,Q],styles:["[_nghost-%COMP%]{display:flex;align-items:center;justify-content:center;flex-direction:column;min-height:inherit;margin-top:2rem}[_nghost-%COMP%]   p[_ngcontent-%COMP%]{color:gray}[_nghost-%COMP%]   p[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:gray;text-decoration:none;font-weight:700}[_nghost-%COMP%]   p[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{opacity:.8}[_nghost-%COMP%]   form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.5rem;margin-top:1rem}[_nghost-%COMP%]   form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border-color:transparent;background-color:transparent;cursor:pointer}[_nghost-%COMP%]   form[_ngcontent-%COMP%]   .formField[_ngcontent-%COMP%]{width:20rem}[_nghost-%COMP%]   form[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]{display:flex;justify-content:center}[_nghost-%COMP%]   form[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:50%;border-radius:.5rem;background-color:#000;color:#fff;opacity:1}[_nghost-%COMP%]   form[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{opacity:.8}@media screen and (max-width: 1024px){[_nghost-%COMP%]   h2[_ngcontent-%COMP%], [_nghost-%COMP%]   p[_ngcontent-%COMP%]{width:90%;text-align:center}}"],changeDetection:0})};export{Z as LoginComponent};
