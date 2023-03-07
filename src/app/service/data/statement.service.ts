import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { BaseResponse } from 'src/app/model/BaseResponse';
import { UserDto } from 'src/app/model/UserDto';
import { baseUrl } from 'src/environments/environment';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class StatementService {
  private userDTO: UserDto;

  constructor(private http: HttpClient,
    private userDataService: UserDataService) {
    this.userDTO = new UserDto();
    console.log("from statementService component " + this.userDTO);
  }


  getTop10Transactions(): Observable<BaseResponse> {
    this.userDTO = this.userDataService.getLoginUser();
    console.log(this.userDTO.userId);
    console.log(this.userDTO.username);
    console.log('StatementService getTop10Transactions called..');
    const token = sessionStorage.getItem('authenticatedUser');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<BaseResponse>(`${baseUrl}statement/top10/` + this.userDTO.userId, { headers }).pipe(
      catchError((error: any) => {
        console.error('Error getting transactions:', error);
        return throwError(() => new Error('test'));
      })
    );
  }


  getMonthTransaction(): Observable<BaseResponse> {
    this.userDTO = this.userDataService.getLoginUser();
    console.log(this.userDTO.userId);
    console.log(this.userDTO.username);
    console.log('StatementService getMonthTransaction called..');
    const token = sessionStorage.getItem('authenticatedUser');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<BaseResponse>(`${baseUrl}statement/month/` + this.userDTO.userId + "?date=" + this.getTodaysDate(), { headers }).pipe(
      catchError((error: any) => {
        console.error('Error getting transactions:', error);
        return throwError(() => new Error('error in getMonthTransaction'));
      })
    );
  }


  getTodaysDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const year = today.getFullYear();
    const dateString = `${month}-${day}-${year}`;
    return dateString;
  }


  getLastMonthTransactions(lastM: string): Observable<BaseResponse> {
    this.userDTO = this.userDataService.getLoginUser();
    console.log(this.userDTO.userId);
    console.log(this.userDTO.username);
    console.log('StatementService getMonthTransaction called..');
    const token = sessionStorage.getItem('authenticatedUser');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<BaseResponse>(`${baseUrl}statement/last/` + this.userDTO.userId + "?lastMonth=" + lastM, { headers }).pipe(
      catchError((error: any) => {
        console.error('Error getting transactions:', error);
        return throwError(() => new Error('error in getMonthTransaction'));
      })
    );
  }


  getTransactionsBetweenDates(toDate: string, fromDate: string): Observable<BaseResponse> {
    this.userDTO = this.userDataService.getLoginUser();
    console.log(this.userDTO.userId);
    console.log(this.userDTO.username);
    console.log('StatementService getMonthTransaction called..');
    const token = sessionStorage.getItem('authenticatedUser');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<BaseResponse>(`${baseUrl}statement/between/` + this.userDTO.userId + "?toDate=" + toDate + "&fromDate=" + fromDate, { headers }).pipe(
      catchError((error: any) => {
        console.error('Error getting getTransactionsBetweenDates:', error);
        return throwError(() => new Error('error in getTransactionsBetweenDates'));
      })
    );
  }

}
