import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/server';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  email = '';
  password = '';
  confirmPassword = '';
  error = '';
  success = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (!this.email || !this.password || !this.confirmPassword) {
      this.error = 'Vui lòng nhập đầy đủ thông tin!';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Mật khẩu không khớp!';
      return;
    }

    this.authService.signup(this.email, this.password).subscribe({
      next: () => {
        this.success = 'Đăng ký thành công!';
        setTimeout(() => this.router.navigate(['admin/login']), 1000);
      },
      error: () => {
        this.error = 'Email đã tồn tại hoặc lỗi máy chủ!';
      }
    });
  }
}
