import{a as D,f as y,x as S,y as I}from"./chunk-LSVXEVRK.js";import{Ab as s,Cb as v,Ma as P,Pa as r,Qa as _,ab as a,ba as M,bc as R,cb as x,dc as E,fb as l,gb as u,hb as C,ib as g,jb as i,kb as n,lb as f,pb as p,qa as O,sb as b,yb as o,zb as m}from"./chunk-352QRF22.js";function F(e,c){if(e&1&&(i(0,"div",0)(1,"div",2)(2,"div",3)(3,"div",3)(4,"div",3)(5,"div",3)(6,"div",3),f(7,"div",3),n()()()()()()()),e&2){let t=p();x("ngClass",t.currentRecipe?"":"loading")}}function j(e,c){e&1&&(i(0,"h1",4),o(1,"\u0420\u0435\u0446\u0435\u043F\u0442\u0430\u0442\u0430 \u043D\u0435 \u0435 \u043D\u0430\u043C\u0435\u0440\u0435\u043D\u0430!"),n())}function z(e,c){e&1&&(i(0,"h1"),o(1,"Recipe not found!"),n())}function A(e,c){if(e&1&&a(0,j,2,0,"h1",4)(1,z,2,0,"h1"),e&2){let t=p();l(t.locale=="bg"?0:1)}}function N(e,c){if(e&1&&(i(0,"h2"),o(1,"\u041F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430"),n(),i(2,"h3"),o(3),n()),e&2){let t=p(2);r(3),s("",t.currentRecipe.time_preparation," \u043C\u0438\u043D\u0443\u0442\u0438")}}function H(e,c){if(e&1&&(i(0,"h2"),o(1,"Preparation"),n(),i(2,"h3"),o(3),n()),e&2){let t=p(2);r(3),s("",t.currentRecipe.time_preparation," minutes")}}function q(e,c){if(e&1&&(i(0,"h2"),o(1,"\u0413\u043E\u0442\u0432\u0435\u043D\u0435"),n(),i(2,"h3"),o(3),n()),e&2){let t=p(2);r(3),s("",t.currentRecipe.time_cooking," \u043C\u0438\u043D\u0443\u0442\u0438")}}function B(e,c){if(e&1&&(i(0,"h2"),o(1,"Cooking"),n(),i(2,"h3"),o(3),n()),e&2){let t=p(2);r(3),s("",t.currentRecipe.time_cooking," minutes")}}function L(e,c){e&1&&(i(0,"h2"),o(1,"\u041F\u043E\u0440\u0446\u0438\u0438"),n())}function $(e,c){e&1&&(i(0,"h2"),o(1,"Portions"),n())}function U(e,c){e&1&&o(0," \u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u0438 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0438 ")}function G(e,c){e&1&&o(0," Products Needed ")}function J(e,c){if(e&1&&(i(0,"li"),o(1),n()),e&2){let t=c.$implicit;r(),m(t)}}function K(e,c){e&1&&o(0," \u0421\u0442\u044A\u043F\u043A\u0438 ")}function Q(e,c){e&1&&o(0," Steps ")}function V(e,c){if(e&1&&(i(0,"li"),o(1),n()),e&2){let t=c.$implicit;r(),m(t)}}function W(e,c){if(e&1&&(i(0,"section",1)(1,"h1"),o(2),n(),f(3,"img",5),i(4,"section",6)(5,"div",7)(6,"mat-icon"),o(7,"timer"),n(),a(8,N,4,1)(9,H,4,1),n(),i(10,"div",8)(11,"mat-icon"),o(12,"outdoor_grill"),n(),a(13,q,4,1)(14,B,4,1),n(),i(15,"div",9)(16,"mat-icon"),o(17,"restaurant_menu"),n(),a(18,L,2,0,"h2")(19,$,2,0,"h2"),i(20,"h3"),o(21),n()()(),i(22,"section",10)(23,"div",11),a(24,U,1,0)(25,G,1,0),n(),i(26,"ul"),C(27,J,2,1,"li",null,u),n()(),i(29,"section",12)(30,"div",11),a(31,K,1,0)(32,Q,1,0),n(),i(33,"ol"),C(34,V,2,1,"li",null,u),n()()()),e&2){let t=p();r(2),m(t.currentRecipe.name),r(),b("src",t.currentRecipe.photos[0],P),r(5),l(t.locale=="bg"?8:9),r(5),l(t.locale=="bg"?13:14),r(5),l(t.locale=="bg"?18:19),r(3),m(t.currentRecipe.portions_count),r(3),l(t.locale=="bg"?24:25),r(3),g(t.currentRecipe.ingredients),r(4),l(t.locale=="bg"?31:32),r(3),g(t.currentRecipe.steps)}}var T=class e{constructor(c,t,d){this.route=c;this.destroyRef=t;this.http=d}currentRecipe=null;locale=null;fetchRecipe(){return this.http.get("https://recipe-book-406c3-default-rtdb.europe-west1.firebasedatabase.app/recipes.json")}ngOnInit(){this.locale=localStorage.getItem("locale"),document.querySelector("header")?.addEventListener("click",()=>this.locale=localStorage.getItem("locale")),document.querySelector(".mobile-menu-list")?.addEventListener("click",()=>this.locale=localStorage.getItem("locale"));let c=this.route.paramMap.subscribe({next:t=>{let d=this.fetchRecipe().subscribe({next:w=>{let h=Object.values(w).find(k=>k.id==t.get("id"));this.currentRecipe=h||"not_found"}});this.destroyRef.onDestroy(()=>d.unsubscribe())},error:t=>console.log(t)});this.destroyRef.onDestroy(()=>c.unsubscribe())}static \u0275fac=function(t){return new(t||e)(_(y),_(O),_(D))};static \u0275cmp=M({type:e,selectors:[["app-detailed-recipe"]],standalone:!0,features:[v],decls:3,vars:1,consts:[[1,"loader-container",3,"ngClass"],[1,"recipe"],[1,"multi-spinner-container"],[1,"multi-spinner"],[1,"recipe-not-found"],[3,"src"],[1,"basic-information"],[1,"entry","preparation_time"],[1,"entry","cooking_time"],[1,"entry","portions"],[1,"ingredients","section"],[1,"header"],[1,"steps","section"]],template:function(t,d){t&1&&a(0,F,8,1,"div",0)(1,A,2,1)(2,W,36,8,"section",1),t&2&&l(d.currentRecipe==null?0:d.currentRecipe=="not_found"?1:2)},dependencies:[E,R,I,S],styles:['[_nghost-%COMP%]   h1[_ngcontent-%COMP%]{text-align:center;margin-top:2rem;font-size:3rem;padding:1rem;line-height:1}[_nghost-%COMP%]   .recipe[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;margin-top:1rem;height:70vh}[_nghost-%COMP%]   .recipe[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0}[_nghost-%COMP%]   .recipe[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:80%;border-radius:1rem;height:70vh;object-fit:cover}[_nghost-%COMP%]   .recipe[_ngcontent-%COMP%]   .basic-information[_ngcontent-%COMP%]{width:80%;background-color:#d3d3d3;margin-top:-1rem;z-index:-1;padding:2rem 0 1rem;display:flex;justify-content:center;gap:3rem;border-radius:0 0 1rem 1rem}[_nghost-%COMP%]   .recipe[_ngcontent-%COMP%]   .basic-information[_ngcontent-%COMP%]   .entry[_ngcontent-%COMP%]{text-align:center}[_nghost-%COMP%]   .recipe[_ngcontent-%COMP%]   .basic-information[_ngcontent-%COMP%]   .entry[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{margin:0}[_nghost-%COMP%]   .recipe[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]{margin-top:.5rem;width:80%}[_nghost-%COMP%]   .recipe[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{background-color:#ff4081;position:relative;color:#fff;padding:.5rem 1rem;border-radius:.5rem .5rem .5rem 0;width:fit-content;font-size:1rem}[_nghost-%COMP%]   .recipe[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]:after{border-style:solid;border-width:0 10px 8px 0;border-color:transparent #ff4081 transparent transparent;content:"";display:block;height:0;left:0;position:absolute;width:0;top:2.25rem}[_nghost-%COMP%]   .recipe[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%], [_nghost-%COMP%]   .recipe[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%]{font-size:1.125rem;padding-left:3rem}[_nghost-%COMP%]   .recipe[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%], [_nghost-%COMP%]   .recipe[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:.25rem 0}[_nghost-%COMP%]   .recipe[_ngcontent-%COMP%]   .steps[_ngcontent-%COMP%]{margin-bottom:1rem}[_nghost-%COMP%]   .loader-container[_ngcontent-%COMP%]{position:absolute;width:100%;height:100%;top:0;left:0;display:none}[_nghost-%COMP%]   .loader-container.loading[_ngcontent-%COMP%]{display:initial}[_nghost-%COMP%]   .loader-container[_ngcontent-%COMP%]   .multi-spinner-container[_ngcontent-%COMP%]{width:150px;height:150px;position:absolute;margin:30px auto;overflow:hidden;left:50%;transform:translate(-50%);top:10%}[_nghost-%COMP%]   .loader-container[_ngcontent-%COMP%]   .multi-spinner[_ngcontent-%COMP%]{position:absolute;width:calc(100% - 9.9px);height:calc(100% - 9.9px);border:5px solid transparent;border-top-color:#ff5722;border-radius:50%;-webkit-animation:_ngcontent-%COMP%_spin 5s cubic-bezier(.17,.49,.96,.76) infinite;animation:_ngcontent-%COMP%_spin 2s cubic-bezier(.17,.49,.96,.76) infinite}@media screen and (max-width: 1024px){[_nghost-%COMP%]   .recipe[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], [_nghost-%COMP%]   .recipe[_ngcontent-%COMP%]   .basic-information[_ngcontent-%COMP%], [_nghost-%COMP%]   .recipe[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]{width:100%}[_nghost-%COMP%]   .recipe[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%], [_nghost-%COMP%]   .recipe[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%]{padding:0 2rem}}@keyframes _ngcontent-%COMP%_spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}']})};export{T as DetailedRecipeComponent};
