import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

const API = 'http://localhost:3000';
const TOKEN_KEY = 'token';
const USER_KEY = 'user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) { }
  private currentUserSubject = new BehaviorSubject<any>(this.getCurrentUser());
  currentUser$ = this.currentUserSubject.asObservable(); // <-- component khác có thể subscribe


  register(userData: any): Observable<any> {
    return this.http.post(`${API}/register`, userData);
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(`${API}/users?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users.length > 0) {
          localStorage.setItem(USER_KEY, JSON.stringify(users[0]));
          localStorage.setItem(TOKEN_KEY, 'fake-jwt-token'); // bạn có thể sửa thành accessToken nếu dùng json-server-auth
          return true;
        } else {
          return false;
        }
      })
    );
  }


  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any[]>(`${API}/users?email=${email}`).pipe(
      tap(users => {
        if (users.length) {
          localStorage.setItem(USER_KEY, JSON.stringify(users[0]));
        }
      })
    );
  }

  getCurrentUser(): any {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.currentUserSubject.next(null); // <-- cập nhật trạng thái
  }
}