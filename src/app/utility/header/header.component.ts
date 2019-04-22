import { Component, OnInit,DoCheck } from '@angular/core';
import {MyHttpService} from '../service/myhttp.service'
import { Router} from '@angular/router'
@Component({
    selector: 'storeHeader',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit,DoCheck {
    isUserLogin:boolean = false;
    uName:string = "";
    goodsName:string="";
    constructor(private myHttp:MyHttpService,private route:Router) { }

    ngOnInit() { 
        this.checkUserLogin();
    }
    ngDoCheck(){
        
    }
    // 检查用户是否登录
    checkUserLogin(){
        this.myHttp
        .sendRequest('http://localhost/ajia_code/data/user/session_data.php')
        .subscribe((result:any)=>{
            console.log(result);
            if(result.uid){
                //用户是登录状态
                this.isUserLogin = true;
                this.uName = result.uname;
            }
            else{
                //未登录
                this.isUserLogin = false;
            }
        })
    }

    //退出登录
    logout(){
        this.myHttp
            .sendRequest("http://localhost/ajia_code/data/user/logout.php")
            .subscribe((result:any)=>{
                if(result.code == 200){
                    this.isUserLogin = false;
                    this.uName = "";
                }
            })
    }
    
}