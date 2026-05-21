import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { RegisterCreds, User } from '../../Types/user.ts/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  private http = inject(HttpClient); 
  baseURl : string = "https://localhost:5001/api/"
  curentUser = signal<User | null> (null);


  login(cred :any)
  {
    return this.http.post<User>(this.baseURl + "account/login",cred).pipe(
      tap(user=>{
        if(user){
       this.setCurrentUser(user);

        }
      })
    )
  }

  register(creds: RegisterCreds) {
    return this.http.post<User>(this.baseURl + 'account/register', creds).pipe(
      tap(user=>{
        if(user){
       this.setCurrentUser(user);

        }
      })
    );
  }

  setCurrentUser(user :User)
  {
    this.curentUser.set(user);
        localStorage.setItem("user",JSON.stringify(user));
  }

  logout()
  {
    this.curentUser.set(null);
    localStorage.removeItem("user")
  }


}
