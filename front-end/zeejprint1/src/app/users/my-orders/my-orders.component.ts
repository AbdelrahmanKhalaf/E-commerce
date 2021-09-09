import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDeleteOrder } from 'src/app/shard/models/dataDelete';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs"
import { ActivatedRoute, Router } from '@angular/router';
declare const Stripe
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  public myOrders: any;
  public message: any
  public totalPrice: any
  public chacke = false;
  public order = {};
  public user: any
  constructor(
    private Orders: ProdactsService, private route: ActivatedRoute, private router: Router
  ) { }
  delete(id: any, count: number, index, price) {
    let data: IDeleteOrder = {
      prodactId: id,
      count: count
    }
    this.Orders.deleteOrder(data).subscribe((res: any) => {
      if (res.message_en == "The order has been deleted") {
        if (index > -1) {
          this.myOrders.splice(index, 1);
        }
        this.message = res.message_en
        const Price = (price / count)
        const sale = (Price * this.myOrders[index].prodactDetails.sale / 100)
        const priceSale = Price - sale
        this.totalPrice = this.totalPrice - priceSale
      }
      if (res.orders) {
        this.message = res.message_en


        const Price = (res.orders[0].price / res.orders[0].count)
        const sale = (Price * this.myOrders[index].prodactDetails.sale / 100)
        const priceSale = Price - sale
        console.log(priceSale);

        this.totalPrice = this.totalPrice - priceSale
      }
    })
  }
  deleteAll() {
    this.Orders.deleteAllOrders().subscribe((res: any) => {
      this.message = res.message_en
      for (let index = 0; index < this.myOrders.length; index++) {
        if (this.myOrders[index].status == 0) {
          this.myOrders.splice(index, 1);

        }
      }
      this.totalPrice = 0
    }, (err: any) => {
      console.log(err);

    })
  }
  ngOnInit(): void {
    this.totalPrice = 0;
    this.Orders.myOrders().subscribe((res: any) => {
      this.myOrders = res.orders;
      console.log(this.myOrders);

      for (let i = 0; i < this.myOrders.length; i++) {
        const sale: any = (this.myOrders[i].price * this.myOrders[i].prodactDetails.sale / 100)
        const priceSale = (this.myOrders[i].price - sale)
        this.totalPrice = this.totalPrice + priceSale
      }
    })
    this.route.queryParams.subscribe((pram: any) => {
      if (pram.session_id) {
        let data: IDeleteOrder = {
          prodactId: pram.prodactId,
          count: pram.count
        }
        this.Orders.BuyOrder(data).subscribe((res: any) => {
          console.log(data);

          if (res.order) {
            this.myOrders[pram.index].count = res.orders[0].count
            this.myOrders[pram.index].price = res.orders[0].price
            const Price = (this.myOrders[pram.index].price / this.myOrders[pram.index].count)
            const sale = (Price * this.myOrders[pram.index].prodactDetails.sale / 100)
            const priceSale = Price - sale
            this.totalPrice = this.totalPrice - priceSale
            this.router.navigate(['/user/my-orders'])
            this.message = " We are currently proccessing your order and will send you a confrime email shortyly"
          }
          if (res.message_en == "The order has been deleted") {
            if (pram.index > -1) {
              this.myOrders.splice(pram.index, 1);
            }
            this.message = " We are currently proccessing your order and will send you a confrime email shortyly";
            this.router.navigate(['/user/my-orders'])
          }
        }, (err: any) => {
          console.log(err);

        })
      }


    })
    this.Orders.myInfromtion().subscribe((res: any) => {
      this.user = res.user[0]
    })
  }
  chackeOut(prodactId, count, i, price) {
    console.log(count);

    if (this.user.walt > (price * count)) {
      this.Orders.orderDetails(prodactId).subscribe((res: any) => {
        const order = res.orders[0]
        const pricsAfterSale = order.prodactDetails.price - (order.prodactDetails.price * (order.prodactDetails.sale / 100)) * count
        let data: any = {
          price: pricsAfterSale
        }
        this.Orders.buyFromWalt(data).subscribe((res: any) => {
          let data: IDeleteOrder = {
            prodactId: order.prodactDetails.prodactId,
            count: count
          }
          this.Orders.BuyOrder(data).subscribe((res: any) => {
            console.log(res);

            if (res.orders) {
              this.myOrders[i].count = res.order[0].count
              this.myOrders[i].price = res.order[0].price
              this.myOrders.filter((a: any) => {
                if (a._id === res.orders._id && a.status === 2) {
                  this.message = " We are currently proccessing your order and will send you a confrime email shortyly";
                  a.count = res.orders.count;
                  a.price = res.orders.pric;
                }
                console.log(a._id !== res.orders._id);
                if (a.status == 2 && a._id !== res.orders._id && a.prodactId._id !== prodactId) {
                  this.message = " We are currently proccessing your order and will send you a confrime email shortyly";
                  this.myOrders.push(res.order)
                }

              })
              const Price = (this.myOrders[i].price / this.myOrders[i].count)
              const sale = (Price * this.myOrders[i].sale / 100)
              const priceSale = Price - sale
              this.totalPrice = this.totalPrice - priceSale
              this.message = " We are currently proccessing your order and will send you a confrime email shortyly"
            }
            if (res.message_en == "The order has been deleted" && res.order) {
              if (i > -1) {
                this.myOrders.splice(i, 1);
                this.message = " We are currently proccessing your order and will send you a confrime email shortyly";
                this.myOrders.filter((a: any) => {
                  if (a._id == res.order._id) {
                    a.count = res.order.count;
                    a.price = res.order.pric;
                    this.message = " We are currently proccessing your order and will send you a confrime email shortyly";
                  } if (a._id !== res.orders._id && a.status == 2 && a.prodactId._id !== prodactId) {
                    this.message = " We are currently proccessing your order and will send you a confrime email shortyly";
                    this.myOrders.push(res.order)
                  }
                })
              }
            }
          }, (err: any) => {
            console.log(err);

          })

        })
      })

    } else {
      this.Orders.orderDetails(prodactId).subscribe((res: any) => {
        const order = res.orders[0]
        const pricsAfterSale = order.prodactDetails.price - (order.prodactDetails.price * (order.prodactDetails.sale / 100))
        const data = {
          customer_email: order.userId.email,
          prodactId: order.prodactDetails.prodactId,
          index: i,
          count: count,
          line_items: [{
            quantity: Number(count),
            price_data: {
              currency: "sar",
              unit_amount: pricsAfterSale * 100,
              product_data: {
                name: order.prodactDetails.title_en,
                description: order.prodactId.des_en,
                images: [`https://zeejprint.com/website/images/services/graphic-design/marketing-and-advertising.jpg`]
              }

            }
          }
          ]
        }
        this.Orders.checkOut(data).subscribe((res: any) => {
          console.log(res);
          const stripe = Stripe(environment.sercet_key)
          console.log(stripe);

          stripe.redirectToCheckout(
            { sessionId: res.sessionId }
          )

        }, (err: any) => {
          console.log(err);
        })
      })
    }

  }
  // chakeAll() {
  //   this.Orders.myOrders().subscribe((res: any) => {
  //     this.myOrders = res.orders;

  //     const data = res.orders.map((order: any) => {
  //       const pricsAfterSale = order.prodactDetails.price - (order.prodactDetails.price * (order.prodactDetails.sale / 100))
  //       const data = {
  //         customer_email: order.userId.email,
  //         line_items: [{
  //           quantity: Number(order.count),
  //           price_data: {
  //             currency: "sar",
  //             unit_amount: pricsAfterSale * 100,
  //             product_data: {
  //               name: 'boda',
  //               description: order.prodactId.des_en,
  //               images: [`https://zeejprint.com/website/images/services/graphic-design/marketing-and-advertising.jpg`]
  //             }

  //           }
  //         }
  //           ,
  //         {
  //           quantity: Number(order.count),
  //           price_data: {
  //             currency: "sar",
  //             unit_amount: pricsAfterSale * 100,
  //             product_data: {
  //               name: 'boda2',
  //               description: order.prodactId.des_en,
  //               images: [`https://zeejprint.com/website/images/services/graphic-design/marketing-and-advertising.jpg`]
  //             }

  //           }
  //         }
  //         ]
  //       }
  //       return data
  //     })
  //     console.log(data);

  //     // for (let index = 0; index < data.length; index++) {
  //     //   const element = data[index];
  //     //   console.log(index);
  //     //   const Newdata = []
  //     //   Newdata.push(data[index])

  //     //   console.log(Newdata);

  //     //   // this.Orders.checkOut(data[index]).subscribe((res: any) => {
  //     //   //   console.log(res);
  //     //   //   const stripe = Stripe(environment.sercet_key)
  //     //   //   console.log(stripe);

  //     //   //   stripe.redirectToCheckout(
  //     //   //     { sessionId: res.sessionId }
  //     //   //   )

  //     //   // }, (err: any) => {
  //     //   //   console.log(err);
  //     //   // })


  //     // }

  //   })
  // }

}
