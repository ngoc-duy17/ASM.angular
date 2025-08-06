import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/server';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-admin',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-admin.html',
  styleUrl: './register-admin.css'
})
export class RegisterAdmin {
  registerForm: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    const { email, password } = this.registerForm.value;

    this.authService.signup(email, password).subscribe({
      next: () => {
        alert('Đăng ký admin thành công');
        this.router.navigate(['/admin/login']);
      },
      error: () => {
        this.error = 'Tài khoản đã tồn tại hoặc có lỗi!';
      }
    });
  }
}
