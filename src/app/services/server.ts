import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  tap,
  catchError,
  throwError,
} from 'rxjs';

export interface AuthResponse {
  accessToken: string;
  user: {
    email: string;
    id: number;
  };
}

export interface User {
  id: number;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  private adminUserSubject = new BehaviorSubject<User | null>(null);
  private clientUserSubject = new BehaviorSubject<User | null>(null);

  adminUser$ = this.adminUserSubject.asObservable();
  clientUser$ = this.clientUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  // ==== Đăng ký / đăng nhập chung ====
  signup(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('clientToken', response.accessToken);
        this.clientUserSubject.next(response.user);
      }),
      catchError(error => throwError(() => new Error(error.error?.message || 'Đăng ký thất bại')))
    );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('adminToken', response.accessToken);
        this.adminUserSubject.next(response.user);
      }),
      catchError(error => throwError(() => new Error(error.error?.message || 'Đăng nhập thất bại')))
    );
  }

  // ==== Client ====
  getClientUser(): User | null {
    return this.clientUserSubject.value;
  }

  isClientLoggedIn(): boolean {
    return !!localStorage.getItem('clientToken');
  }

  logoutClient(): void {
    localStorage.removeItem('clientToken');
    this.clientUserSubject.next(null);
  }

  // ==== Admin ====
  getAdminUser(): User | null {
    return this.adminUserSubject.value;
  }

  isAdminLoggedIn(): boolean {
    return !!localStorage.getItem('adminToken');
  }

  logoutAdmin(): void {
    localStorage.removeItem('adminToken');
    this.adminUserSubject.next(null);
  }

  // ==== Lấy thông tin user theo token ====
  fetchUser(tokenType: 'admin' | 'client'): void {
    const token = localStorage.getItem(tokenType === 'admin' ? 'adminToken' : 'clientToken');
    if (!token) return;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<User>(`${this.apiUrl}/users/me`, { headers }).subscribe({
      next: (user) => {
        if (tokenType === 'admin') {
          this.adminUserSubject.next(user);
        } else {
          this.clientUserSubject.next(user);
        }
      },
      error: () => {
        if (tokenType === 'admin') {
          this.logoutAdmin();
        } else {
          this.logoutClient();
        }
      }
    });
  }
}
