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
  confirmPassword = '';
  role: 'client' | 'admin' = 'client';

  constructor(private auth: AuthService, private router: Router) { }

  onRegister() {
    if (this.password !== this.confirmPassword) {
      alert('⚠️ Mật khẩu không trùng khớp');
      return;
    }

    this.auth.register({ email: this.email, password: this.password, role: this.role })
      .subscribe(success => {
        if (success) {
          alert('✅ Đăng ký thành công');
          this.router.navigate(['/login']);
        } else {
          alert('❌ Email đã tồn tại');
        }
      });
  }
}
