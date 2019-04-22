import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule} from './app.router'
import {HttpModule} from '@angular/http'
import {FormsModule} from '@angular/forms'

import { AppComponent }  from './app.component';
import {HeaderComponent} from './utility/header/header.component'
import {FooterComponent} from './utility/footer/footer.component'
import {NotFoundComponent} from './utility/notFound/notFound.component'
import {IndexComponent} from './index/index.component'
import {MyHttpService} from './utility/service/myhttp.service'
import { Carousel} from './utility/carousel/carousel.component';
import { Slide} from './utility/carousel/slide.component';
import { listComponent} from './list/list.component'
import { loginComponent} from './login/login.component'
import { cartComponent} from './cart/cart.component'
import { OrderConfirmComponent} from './orderConfirm/orderConfirm.component'
import {OrderConfirmStepOneComponent} from './orderConfirm/embed/orderConfirmStepOne.component'
import {OrderConfirmStepTwoComponent} from './orderConfirm/embed/orderConfirmStepTwo.component'
import {OrderConfirmStepThreeComponent} from './orderConfirm/embed/orderConfirmStepThree.component'
@NgModule({
  imports:      [
     BrowserModule ,
     AppRoutingModule,
     FormsModule,
     HttpModule
     ],
  providers:[
    MyHttpService
  ],
  declarations: [ 
    IndexComponent,
    NotFoundComponent,
    FooterComponent,
    HeaderComponent,
    AppComponent,
    Carousel,
    Slide,
    listComponent,
    loginComponent,
    cartComponent,
    OrderConfirmComponent,
    OrderConfirmStepOneComponent,
    OrderConfirmStepTwoComponent,
    OrderConfirmStepThreeComponent
    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
