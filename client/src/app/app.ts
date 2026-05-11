import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
   private http = inject(HttpClient);
  title = 'Dating App';
  protected members = signal<any>([]);

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/members').subscribe({
      next: response => {this.members.set(response)},
      error: error=> console.log(error),
      complete:()=>console.log("API Call Is completed !!")
    });
  }
}
