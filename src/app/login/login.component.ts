import { Component, OnInit } from '@angular/core';
import {MyHttpService} from '../utility/service/myhttp.service';
import {Router} from '@angular/router';
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls:['assets/css/login.css']
})

export class loginComponent implements OnInit {
    userName:string="";
    userPwd:any="";
    constructor(private http:MyHttpService,private router:Router) { }

    ngOnInit() { }

    getData(){
        this.http.sendRequest('http://localhost/ajia_code/data/user/login.php?uname='+this.userName+"&upwd="+this.userPwd)
            .subscribe((result)=>{
                if(result.code==200){
                    this.router.navigateByUrl('/index');
                }else{
                    alert('用户名或密码有误！')
                }
        })
    }
}