import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { ConfirmEmail } from 'src/app/shared/models/account/ConfirmEmail';
import { UserModel } from 'src/app/shared/models/account/UserModel';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css'],
})
export class ConfirmEmailComponent implements OnInit {
  //
  success = false;

  constructor(
    private accountService: AccountService,
    private sharedService: SharedService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.accountService.user$.pipe(take(1)).subscribe({
      next: (user: UserModel | null) => {
        if (user) {
          this.router.navigateByUrl('/');
        } else {
          this.activatedRoute.queryParamMap.subscribe({
            next: (params: any) => {
              const confirmEmail: ConfirmEmail = {
                token: params.get('token'),
                email: params.get('email'),
              };

              this.accountService.confirmEmail(confirmEmail).subscribe({
                next: (response: any) => {
                  this.success = true;
                  this.sharedService.showNotification(
                    true,
                    response.value.title,
                    response.value.message
                  );
                },
                error: (error) => {
                  this.success = false;
                  this.sharedService.showNotification(
                    false,
                    'Failed',
                    error.error
                  );
                },
              });
            },
          });
        }
      },
    });
  }

  resendEmailConfirmtionLink() {
    this.router.navigateByUrl(
      '/account/send-email/resend-email-confirmation-link'
    );
  }
}
