import { Component, OnInit} from '@angular/core';
import { MyHttpService } from '../utility/service/myhttp.service'
import { ActivatedRoute,Router,NavigationEnd } from '@angular/router'
import 'rxjs/add/operator/filter';
@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['assets/css/products.css']
})

export class listComponent implements OnInit {
    //商品数组
    listData: Array<any> = [];
    //分页显示数组
    PageNum: Array<any> = [];
    //购物车数组
    cartData: Array<any> = [];
    //搜索的商品名字
    kw: string = '';
    shuzu:Array<any>=[];
    clickPage: number = 1;
    goodsCount: number = 1;
    countPrice: number = 0;
    constructor(private http: MyHttpService,
                private acRouter: ActivatedRoute,
                private router:Router
                ) { }

    ngOnInit() {
        this.acRouter.params.subscribe((msg: any) => {
            this.kw=msg.kw;
            this.shuzu.push(msg.kw);
        })
        this.initData();
        this.getCartData();
    }
//钩子（组件组装完成之后调用的方法，仅调用一次）
 
ngAfterViewInit(){
 
    // 监听路由变化
     
    this.router.events
     
    .filter((event:any) => event instanceof NavigationEnd)
     
    .subscribe((event:NavigationEnd) => {
     
    // 加载数据方法
        console.log(event)
        this.initData();
    });
     
}
     
    
    /*OnChanges(){
        console.log(this.shuzu);
    }*/
    //创建函数加载商品数据
    initData() {
            this.http.sendRequest('http://localhost/ajia_code/data/product/list.php?kw=' + this.kw).subscribe((result: any) => {
                this.listData = result.data;
                for (var i = 0; i < result.pageCount; i++) {
                    this.PageNum[i] = i;
                }
            })
    }
    //绑定分页点击事件
    pageList(msg: any) {
        var pno = msg.path[0].innerText;
        if (pno == "上一页") {
            if (this.clickPage == 1) {
                msg.path[0].disabled = true;
            } else {
                msg.path[0].disabled = false;
                this.clickPage--
            }
        } else if (pno == "下一页") {
            if (this.clickPage == this.PageNum.length) {
                msg.path[0].disabled = true;
            } else {
                msg.path[0].disabled = false;
                this.clickPage++
            }
        } else {
            this.clickPage = pno;
        }
        this.http.sendRequest('http://localhost/ajia_code/data/product/list.php?pno=' + this.clickPage+"&kw="+this.kw).subscribe((result: any) => {
            this.listData = result.data;
        })
    }
    reduce(msg: any) {
        if (msg.path[0].nextElementSibling.value == 1) {
            return;
        } else {
            msg.path[0].nextElementSibling.value--;
            this.goodsCount = msg.path[0].nextElementSibling.value;
        }
    }
    plus(msg: any) {
        msg.path[0].previousElementSibling.value++;
        this.goodsCount = msg.path[0].previousElementSibling.value;
    }
    //添加购物车功能
    addcart(msg: number) {
        this.http.sendRequest('http://localhost/ajia_code/data/cart/add.php?lid=' + this.listData[msg].lid + "&buyCount=" + this.goodsCount)
            .subscribe((result: any) => {
                if (result.code == 300) {
                    alert("对不起，您还未登录！")
                } else if (result.code == 200) {
                    alert("商品添加成功!")
                    this.getCartData();
                }
            })
    }
    //购物车导航
    getCartData() {
        this.http.sendRequest('http://localhost/ajia_code/data/cart/list.php')
            .subscribe((result: any) => {
                this.cartData = result.data;
                for (var i = 0; i < this.cartData.length; i++) {
                    this.countPrice += this.cartData[i].count * this.cartData[i].price
                }
            })
    }
}