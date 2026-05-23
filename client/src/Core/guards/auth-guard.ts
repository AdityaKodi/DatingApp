import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../Services/account-service';
import { ToastService } from '../Services/toast-service';

export const authGuard: CanActivateFn = () => {
  const accountService = inject(AccountService);
  const toast = inject(ToastService);

  if(accountService.curentUser()) return true;
  else{
    toast.error("You shall not pass");
    return false;
  }
};
