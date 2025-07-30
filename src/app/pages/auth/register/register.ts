import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/server';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  email = '';
  password = '';
  role = 'client';

  constructor(private auth: AuthService, private router: Router) { }

  onRegister() {
    const newUser = {
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.auth.register(newUser).subscribe(() => {
      alert('Đăng ký thành công!');
      this.router.navigate(['/login']);
    });
  }
}
