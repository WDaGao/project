// a-module-routing

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 引入需要用到的组件类
import {NotFoundComponent} from './utility/notFound/notFound.component'
import {IndexComponent} from './index/index.component'
import {listComponent} from './list/list.component'
import { loginComponent} from './login/login.component'
import { cartComponent} from './cart/cart.component'
import { OrderConfirmComponent} from './orderConfirm/orderConfirm.component'
import {OrderConfirmStepOneComponent} from './orderConfirm/embed/orderConfirmStepOne.component'
import {OrderConfirmStepTwoComponent} from './orderConfirm/embed/orderConfirmStepTwo.component'
import {OrderConfirmStepThreeComponent} from './orderConfirm/embed/orderConfirmStepThree.component'
// 配置路由词典
const routes: Routes = [
  { path: '', redirectTo:'/index',pathMatch:'full' },  
  { path: 'index', component: IndexComponent },
  { path: 'list/:kw', component:listComponent},
  { path: "login",component:loginComponent},
  { path: 'cart', component:cartComponent},
  { path: 'orderConfirm',component:OrderConfirmComponent,
      children:[
       {path:'',component:OrderConfirmStepOneComponent},
       {path:'stepOne',component:OrderConfirmStepOneComponent},
       {path:'stepTwo',component:OrderConfirmStepTwoComponent},
       {path:'stepThree',component:OrderConfirmStepThreeComponent}
      ]
  },
  { path: '**', component: NotFoundComponent },
];

// 将forChild改为forRoot,是给根模块来设置路由的
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
// 导出的模块的名称
export class AppRoutingModule { }

