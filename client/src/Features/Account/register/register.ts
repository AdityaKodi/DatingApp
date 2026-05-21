import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds } from '../../../Types/user.ts/user';
import { AccountService } from '../../../Core/Services/account-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  protected creds = {} as RegisterCreds;
  cancelRegister = output<boolean>();
  private acoutService = inject(AccountService);

  register()
  {
   this.acoutService.register(this.creds).subscribe({
    next:response => {
      console.log(response);
      this.cancel();
    },
    error:err =>{
      console.log(err);
    }
   })
  }

  cancel()
  {
    this.cancelRegister.emit(false);
  }
}
