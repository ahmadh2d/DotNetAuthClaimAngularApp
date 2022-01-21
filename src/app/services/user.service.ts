import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResponseCode } from '../enums/responseCode';
import { User } from '../Models/user';
import { ResponseModel } from '../Models/responseModel';
import { Constants } from '../Helpers/constants';
import { Role } from '../Models/Role';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {
  baseUrlAPI: string = 'https://localhost:7012/api/user';

  constructor(private httpClient: HttpClient) { }

  public login(email: string, password: string) {
    const body = {
      email: email,
      password: password
    };

    return this.httpClient.post<ResponseModel>(`${this.baseUrlAPI}/LoginUser`, body, httpOptions);
  }

  public register(fullName: string, email: string, password: string, role: string) {
    const body = {
      fullName: fullName,
      email: email,
      password: password,
      role: role
    };

    return this.httpClient.post<ResponseModel>(`${this.baseUrlAPI}/RegisterUser`, body, httpOptions);
  }

  public getAllUsers(): Observable<User[]> {
    const headers = new HttpHeaders({
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem(Constants.USER_KEY))?.token,
    });

    return this.httpClient.get<ResponseModel>(`${this.baseUrlAPI}/GetAllUsers`, { headers: headers }).pipe(map(res => {
      let userList = new Array<User>();
      if (res.responseStatusCode === ResponseCode.SUCCESS) {
        if (res.dataSet) {
          let data = res.dataSet as User[];
          data.map(x => userList.push(x));
        }
      }
      return userList;
    }));
  }

  public getRoles(): Observable<Role[]> {
    return this.httpClient.get<ResponseModel>(`${this.baseUrlAPI}/GetRoles`).pipe(map(res => {
      let roleList = new Array<Role>();
      if (res.responseStatusCode === ResponseCode.SUCCESS) {
        if (res.dataSet) {
          let data = res.dataSet as Role[];
          data.map(x => roleList.push(x));
        }
      }
      return roleList;
    }));
  }

  public getOnlyUsers(): Observable<User[]> {
    const headers = new HttpHeaders({
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem(Constants.USER_KEY))?.token,
    });

    return this.httpClient.get<ResponseModel>(`${this.baseUrlAPI}/GetUsers`, { headers: headers }).pipe(map(res => {
      let userList = new Array<User>();
      if (res.responseStatusCode === ResponseCode.SUCCESS) {
        if (res.dataSet) {
          let data = res.dataSet as User[];
          data.map(x => userList.push(x));
        }
      }
      return userList;
    }));
  }
}
