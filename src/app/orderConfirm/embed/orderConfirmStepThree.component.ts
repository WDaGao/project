import { Component, OnInit,OnDestroy } from '@angular/core';
import {Router} from '@angular/router'

@Component({
    selector: 'storeOrderConfirmStepThree',
    templateUrl: './orderConfirmStepThree.component.html'
})

export class OrderConfirmStepThreeComponent implements OnInit,OnDestroy{
    count:number = 5;
    timer:any;
    constructor(private myRouter:Router) { }

    ngOnInit() { 

        this.timer = setInterval(()=>{
            //count自减操作
            this.count--;
            if(this.count == 0)
            {
                //结束定时器
                clearInterval(this.timer);
                this.timer = null;
                //跳转到首页 Router
                // this.myRouter.navigate(['/index'])
                this.myRouter.navigateByUrl('/index')
            }
        },1000)

    }

    ngOnDestroy(){
        if(this.timer){
            clearInterval(this.timer);
            this.timer = null;
        }
        
    }
}