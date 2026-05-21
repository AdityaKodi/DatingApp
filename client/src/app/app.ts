import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from "../Layout/nav/nav";
import { AccountService } from '../Core/Services/account-service';
import { JsonPipe } from '@angular/common';
import { Home } from "../Features/home/home";

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
   private http = inject(HttpClient);
   private accountService = inject(AccountService);
  title = 'Dating App';
  protected members = signal<any>([]);

  ngOnInit(): void {
    this.setCurrentUsers();
    this.http.get('https://localhost:5001/api/members').subscribe({
      next: response => {this.members.set(response)},
      error: error=> console.log(error),
      complete:()=>console.log("API Call Is completed !!")
    });
  }

  setCurrentUsers()
  {
    const userString = localStorage.getItem("user");
    if(!userString) return;
    const user = JSON.parse(userString);
    this.accountService.curentUser.set(user);
  }
}
