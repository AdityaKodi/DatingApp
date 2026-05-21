import { Component, signal } from '@angular/core';
import { Register } from "../Account/register/register";

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  isRegistrationMode = signal(false);

  onClickRegister(canSHow : boolean = true)
  {
    this.isRegistrationMode.set(canSHow);
  }
}


