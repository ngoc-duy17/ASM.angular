import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/server';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  dropdownOpen = false;
  currentUserEmail = '';

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
    const user = this.auth.getCurrentUser();
    this.currentUserEmail = user?.email || '';
  }

  logout(): void {
    this.auth.logout();
    this.currentUserEmail = ''; // cập nhật lại view sau khi logout
  }
}
