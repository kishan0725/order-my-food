import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js';

interface SortOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {
  
  public hotels;
  public hotelConstant;
  public hotelSearch='';
  public userName = '';
  public hasUserName;

  sortOptions: SortOption[] = [
    {value: 'name', viewValue: 'Name'},
    {value: 'rating', viewValue: 'Rating'},
    {value: 'reviews', viewValue: 'Review'}
  ];
  selectedValue = this.sortOptions[0].value; // default sorting

  constructor(private _hotelService: HotelService, private router: Router) {
    this.hotelConstant = this._hotelService.getHotelsList();
    this.hotels =  this.hotelConstant;
    this.sortHotels(this.selectedValue);
    this.userName = this._hotelService.userName;

    if(!this._hotelService.hasUserName) {
      this.inputName();
    }
  }

  inputName = async() => {
    await Swal.fire({
      title: 'Your name?',
      text: "We keep your name confidential!",
      input: 'text',
      confirmButtonColor: '#9c27b0',
      allowOutsideClick: false,
      allowEscapeKey: false,
      inputValidator: (value) => {
        if (!value) {
          return 'Please enter your name!'
        }
        else {
          this._hotelService.setUserName(value);
          this.userName = this._hotelService.userName;
        }
      }
    })
  }

  searchQuery = (query) => {
    this.hotels = this.hotelConstant.filter((hotel) =>  JSON.stringify(hotel).toLowerCase().indexOf(query.toLowerCase()) !== -1);
    
  }

  sortHotels = (selectedValue) => {
    if (selectedValue === 'rating'){
      this.hotels = this.hotels.sort(function(a,b){return b.rating - a.rating})   
    }
    else if (selectedValue === 'reviews'){
      this.hotels = this.hotels.sort(function(a,b){return b.reviews - a.reviews})
    }
    else if (selectedValue === 'name'){
      function compareName  (a, b)  {
        // case-insensitive comparison
        a = a.toLowerCase();
        b = b.toLowerCase();
      
        return (a < b) ? -1 : (a > b) ? 1 : 0;
      }
      this.hotels = this.hotels.sort(function(a,b){return compareName(a.name, b.name)})
  }
}

  goToHotel = (hotel) => {
    this.router.navigate(['/hotels', hotel.id])
  }

  ngOnInit(): void {
  }

}
