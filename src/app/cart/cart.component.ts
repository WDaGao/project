import { Component, OnInit } from '@angular/core';
import { MyHttpService } from '../utility/service/myhttp.service'
import { Router } from '@angular/router'
@Component({
    selector: 'cart',
    templateUrl: './cart.component.html',
    styleUrls: ["assets/css/cart.css"]
})

export class cartComponent implements OnInit {
    cartData: Array<any> = [];
    goodsCount: number = 1;
    constructor(private http: MyHttpService, private router: Router) { }

    ngOnInit() { this.getCartData() }
    //获取购物车内容
    getCartData() {
        this.http.sendRequest('http://localhost/ajia_code/data/cart/list.php')
            .subscribe((result: any) => {
                this.cartData = result.data;
            })
    }
    //实现数量的添加和减去
    //先写个函数
    setCount(index: number, count: number) {
        this.http.sendRequest('http://localhost/ajia_code/data/cart/update_count.php?iid=' + this.cartData[index].iid + "&count=" + count)
            .subscribe((result: any) => {
                if (result.code == 200) {
                    this.getCartData();
                }
            })
    }
    subtract(msg: any, index: number) {
        if (msg.path[0].nextElementSibling.value == 1) {
            this.delete(index);
        } else {
            msg.path[0].nextElementSibling.value--;
            this.goodsCount = msg.path[0].nextElementSibling.value;
            this.setCount(index,this.goodsCount)
        }
    }
    add(msg: any, index: number) {
        msg.path[0].previousElementSibling.value++;
        this.goodsCount = msg.path[0].previousElementSibling.value;
        this.setCount(index,this.goodsCount)
    }

    //删除函数
    delete(index: number) {
        this.http.sendRequest('http://localhost/ajia_code/data/cart/del.php?iid=' + this.cartData[index].iid)
            .subscribe((result: any) => {
                if (result.code == 200) {
                    this.getCartData();
                }
            })
    }
    //删除点击事件
    del(index: number) {
        this.delete(index);
    }
    jiesuan(){
        if(this.cartData.length!=0){
            this.router.navigateByUrl('/orderConfirm');
        }else{
            alert("抱歉，您还未选择任何商品！")
        }
        
    }
}