import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { data } from 'src/app/api/data.json'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  hasUserName = false;
  userName = '';

  hasUserNameChange: Subject<boolean> = new Subject<boolean>();

  userNameChange: Subject<string> = new Subject<string>();

  // userName$ = this._userNameSource.asObservable();

  constructor(private httpClient: HttpClient) {
    this.hasUserNameChange.subscribe((value) => {
      this.hasUserName = value;
    });

    this.userNameChange.subscribe((name) => {
      this.userName = name;
    });
  }

  public setUserName = (name) => {
    this.hasUserNameChange.next(!this.hasUserName);
    this.userNameChange.next(name);
  }

  public getHotelsList = () => {
    try {
      return data;
    }
    catch(e) {
      console.log(e);
    }
  }

  public getHotel = (id: string) => {
    try {
      return data.filter((hotel) => hotel.id == id);
    }
    catch(e) {
      console.log(e);
    }
  }

}
