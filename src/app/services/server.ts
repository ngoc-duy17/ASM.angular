import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, switchMap, map } from 'rxjs';

interface User {
  id?: number;
  email: string;
  password: string;
  role: 'client' | 'admin';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private LOGGED_USER_KEY = 'loggedInUser';

  constructor(private http: HttpClient, private router: Router) { }

  register(user: User): Observable<boolean> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${user.email}`).pipe(
      switchMap(users => {
        if (users.length > 0) {
          return of(false); // Email đã tồn tại
        }
        return this.http.post<User>(this.apiUrl, user).pipe(map(() => true));
      })
    );
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users.length === 1) {
          localStorage.setItem(this.LOGGED_USER_KEY, JSON.stringify(users[0]));
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.LOGGED_USER_KEY);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem(this.LOGGED_USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }
}
