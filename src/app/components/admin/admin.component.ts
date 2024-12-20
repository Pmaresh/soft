import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  loginFailed: boolean = false;
  loginSuccess: boolean = false;
 
  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
 
  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.adminService.login(username, password).subscribe(
        response => {
          console.log(response);
          this.loginSuccess = true;
          this.loginFailed = false;
        },
        error => {
          console.error(error);
          this.loginFailed = true;
          this.loginSuccess = false;
        }
      );
    }
  }
}