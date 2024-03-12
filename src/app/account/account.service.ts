import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegisterModel } from '../shared/models/UserRegisterModel';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  userRegister(userRegisterModel: UserRegisterModel) {
    return this.http.post(
      `${environment.appUrl}/account/register`,
      userRegisterModel
    );
  }
}
