import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/server';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'] // ✅ dùng đúng "styleUrls"
})
export class Header {
  dropdownOpen = false;

  constructor(public auth: AuthService) { }

  get isLoggedIn(): boolean {
    return this.auth.isAdminLoggedIn() || this.auth.isClientLoggedIn();
  }

  get currentUserEmail(): string | null {
    if (this.auth.isAdminLoggedIn()) {
      return this.auth.getAdminUser()?.email ?? null;
    }
    if (this.auth.isClientLoggedIn()) {
      return this.auth.getClientUser()?.email ?? null;
    }
    return null;
  }

  logout() {
    if (this.auth.isAdminLoggedIn()) {
      this.auth.logoutAdmin();
    }
    if (this.auth.isClientLoggedIn()) {
      this.auth.logoutClient();
    }
    location.reload(); // hoặc this.router.navigate(['/']);
  }
}
