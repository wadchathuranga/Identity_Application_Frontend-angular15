import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegisterModel } from '../shared/models/account/UserRegisterModel';
import { environment } from 'src/environments/environment.development';
import { UserLoginModel } from '../shared/models/account/UserLoginModel';
import { UserModel } from '../shared/models/account/UserModel';
import { ReplaySubject, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmEmail } from '../shared/models/account/ConfirmEmail';
import { ResetPasswordModel } from '../shared/models/account/ResetPasswordModel';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private userSource = new ReplaySubject<UserModel | null>(1);
  user$ = this.userSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  refreshUser(jwt: string | null) {
    if (jwt === null) {
      this.userSource.next(null);
      return of(undefined);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);

    return this.http
      .get<UserModel>(`${environment.appUrl}/account/refresh-user-token`, {
        headers,
      })
      .pipe(
        map((userModel: UserModel) => {
          if (userModel) {
            this.setUser(userModel);
          }
        })
      );
  }

  userRegister(userRegisterModel: UserRegisterModel) {
    return this.http.post(
      `${environment.appUrl}/account/register`,
      userRegisterModel
    );
  }

  confirmEmail(confirmEmailModel: ConfirmEmail) {
    return this.http.put(
      `${environment.appUrl}/account/confirm-email`,
      confirmEmailModel
    );
  }

  resendEmailConfirmationLink(email: string) {
    return this.http.post(
      `${environment.appUrl}/account/resend-email-confirmation-link/${email}`,
      {}
    );
  }

  forgotUsernameOrPassword(email: string) {
    return this.http.post(
      `${environment.appUrl}/account/forgot-username-or-password-link/${email}`,
      {}
    );
  }

  resetPassword(model: ResetPasswordModel) {
    return this.http.put(`${environment.appUrl}/account/reset-password`, model);
  }

  userLogin(userLoginModel: UserLoginModel) {
    return this.http
      .post<UserModel>(`${environment.appUrl}/account/login`, userLoginModel)
      .pipe(
        map((userModel: UserModel) => {
          if (userModel) {
            this.setUser(userModel);
            // return userModel; // we dont need data to other side
          }
          // return null; // we dont need data to other side
        })
      );
  }

  userLogout() {
    localStorage.removeItem(environment.userKey);
    this.userSource.next(null);
    this.router.navigateByUrl('/');
  }

  getJWT() {
    const userData = localStorage.getItem(environment.userKey);
    if (userData) {
      const userInfo: UserModel = JSON.parse(userData);
      return userInfo.jwt;
    } else {
      return null;
    }
  }

  private setUser(userModel: UserModel) {
    localStorage.setItem(environment.userKey, JSON.stringify(userModel));
    this.userSource.next(userModel);
  }
}
