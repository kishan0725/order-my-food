import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { IHotel } from '../models/hotel';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private url: string = '/assets/api/data.json';

  public hasUserName = false;

  public userName = '';

  customError = {
    status: 500,
    message: 'Sorry! Something went wrong :('
  }

  hasUserNameChange: Subject<boolean> = new Subject<boolean>();

  userNameChange: Subject<string> = new Subject<string>();

  constructor(private httpClient: HttpClient) {

    this.hasUserNameChange.subscribe((value) => {
      this.hasUserName = value;
    });

    this.userNameChange.subscribe((name) => {
      this.userName = name;
    });

  }

  public getHotelsList = (): Observable<IHotel[]> => {
    return this.httpClient.get<IHotel[]>(this.url).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public setUserName = (name) => {
    this.hasUserNameChange.next(!this.hasUserName);
    this.userNameChange.next(name);
  }

}
