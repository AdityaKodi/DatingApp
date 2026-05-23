import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../Core/Services/account-service';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from '../../Core/Services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {

  protected accountService = inject(AccountService);
  private toast = inject(ToastService);

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  protected isLoggedIn = signal(false);

  login() {

    let cred = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }

    this.accountService.login(cred).subscribe({
      next: result => {
        this.isLoggedIn.set(true);
        this.toast.success("Logged in successfully");
        this.loginForm.get("email")?.setValue(null);
        this.loginForm.get("password")?.setValue(null);

      },
      error: error => { console.log(error.error);
        this.toast.error(error.title);
       }
    })
  }

  logout() {
    this.accountService.logout();
  }

}