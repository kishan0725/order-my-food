import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {

  public hotel;
  public cartItems = [];
  public totalAmount = 0;
  public isFetched: boolean = false;
  public toggleMode = "over";
  public userName = '';

  constructor(private _hotelService: HotelService, private route: ActivatedRoute, private router: Router) {
    this.scrollTop();
    [this.hotel] =  this._hotelService.getHotel(this.route.snapshot.paramMap.get('id'));
    this.userName = this._hotelService.userName;
    if(!this.userName) {
      this.router.navigateByUrl("/hotels");
    }
  }

  scrollTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  addToMyCart = (menu) => {

    const cartItem = {
      "id": menu.id,
      "name": menu.name,
      "price": menu.price,
      "quantity": 1
    }

    this.cartItems.push(cartItem);
    this.cartItems = this.cartItems.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i); // removes duplicate menus
    this.calculateAmount();
  }

  removeItem = (cartItem) => {
    this.cartItems = this.cartItems.filter((menu) => menu.id != cartItem.id);
    this.calculateAmount();
  }

  addQuantity = (cartItem) => {
    this.cartItems.forEach((item,index)=>{
      if(item.id == cartItem.id)
        this.cartItems[index].quantity = Number(this.cartItems[index].quantity)  + 1; 
   });
   this.calculateAmount();
  }

  removeQuantity = (cartItem) => {
    this.cartItems.forEach((item,index)=>{
      if(item.id == cartItem.id) {
        if (this.cartItems[index].quantity > 0)
          this.cartItems[index].quantity -= 1;
      }
   });
   this.calculateAmount();
  }

  calculateAmount = () => {
    this.totalAmount = 0; 
    this.cartItems.map((item) => {
      this.totalAmount = this.totalAmount + (item.quantity*item.price)
    });
  }

  openPaymentMethod = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "It's just a sample confirmation message!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9c27b0',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, pay bill!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Payment Successfull!',
          text: "It's just a sample success message. We can integrate real time UPI service!",
          showConfirmButton: true,
          confirmButtonColor: '#9c27b0'
        });
      }
    })
  }

  ngOnInit(): void {
  }

}
