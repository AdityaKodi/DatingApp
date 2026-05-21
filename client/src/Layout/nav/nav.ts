import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../Core/Services/account-service';

@Component({
  selector: 'app-nav',
  imports: [ReactiveFormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {

  protected accountService = inject(AccountService);

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
        this.loginForm.get("email")?.setValue(null);
        this.loginForm.get("password")?.setValue(null);

      },
      error: error => { console.log(error) }
    })
  }

  logout() {
    this.accountService.logout();
  }

}