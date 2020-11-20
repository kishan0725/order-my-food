import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {

  public hotels = [];
  public hotel;
  public cartItems = [];
  public totalAmount = 0;
  public isFetched: boolean = false;
  public toggleMode = "over";
  public userName = '';

  constructor(private _hotelService: HotelService, private route: ActivatedRoute, private router: Router) { }

  scrollTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  getHotel = (id: number) => {
    try {
      return this.hotels.filter((hotel) => hotel.id == id);
    }
    catch(e) {
      console.log(e);
    }
  }

  addToMyCart = (menu) => {
    const cartItem = {
      "id": menu.id,
      "name": menu.name,
      "price": menu.price,
      "quantity": 1
    }

    this.cartItems.push(cartItem);

    if (this.hasDuplicateItem()) {
      this.ItemAlreadyExistModal(cartItem);
      this.removeDuplicateItem();
    }
    else {
      this.ItemAddedModal(menu);
      this.calculateAmount();
    }
  }

  hasDuplicateItem = () => {
    let itemArray = this.cartItems.map(function(item){ return item.id });
    let isDuplicate = itemArray.some(function(item, idx){ 
      return itemArray.indexOf(item) != idx 
    });
    return isDuplicate;
  }

  removeDuplicateItem = () => {
    this.cartItems = this.cartItems.filter((v,i,a) => a.findIndex(t=>(t.id === v.id))===i);
  }

  ItemAddedModal = (menu) => {
    Swal.fire({
      icon: 'success',
      title: `${menu.name} added to your basket!`,
      text: "Click on the basket icon at the top of the page to view your basket items.",
      showConfirmButton: true,
      confirmButtonColor: '#9c27b0'
    });
  }

  ItemAlreadyExistModal = (menu) => {
    Swal.fire({
      icon: 'warning',
      title: `${menu.name} already exist in your basket!`,
      showConfirmButton: true,
      confirmButtonColor: '#9c27b0'
    });
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
    this.scrollTop();
    this._hotelService.getHotelsList().subscribe((data) => {
      this.hotels = data;
      this.route.paramMap.subscribe((params: ParamMap) => {
        [this.hotel] =  this.getHotel(parseInt(params.get('id')));
      })
    });

    this.userName = this._hotelService.userName;
    if(!this.userName) {
      this.router.navigateByUrl("/hotels");
    }
  }
}
