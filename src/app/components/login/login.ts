import { Component, inject } from '@angular/core';
import { 
  ReactiveFormsModule, 
  FormControl, 
  FormGroup,
  Validators, 
  AbstractControl, } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

declare let google: any;

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {

  authService = inject(AuthService);
  userService = inject(UserService);
  user = this.authService.user;
  
  newUser: boolean = false;

  loginForm = new FormGroup({ 
    email: new FormControl(''),
    password: new FormControl('')
  });

  signUpForm = new FormGroup({  
      email: new FormControl('', [Validators.required, Validators.email]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, 
    this.passwordMatchValidator
  );

  ngOnInit() {
    google = this.authService.initializeGoogleSignIn();

    google.accounts.id.renderButton(
      document.getElementById("googleBtn"),
      { 
        theme: "outline", 
        size: "large", 
        shape: "rectangular", 
        logo_alignment: "center",
        width: "50%" 
      }
    );
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    // console.log('Validating password match');
    const form = control as FormGroup
    // console.log('Form controls:', form?.controls);
    const password = form?.get('password')?.value;
    const confirmPassword = form?.get('confirmPassword')?.value;
    // console.log('Password:',  password);
    // console.log('Confirm Password:',   confirmPassword);

    if (password && confirmPassword && password !== confirmPassword) {     
      form?.get('confirmPassword')?.setErrors({ passwordMismatch: true }); 
      // console.log('Password mismatch detected');
      return { passwordMismatch: true };
    } else {
      form?.get('confirmPassword')?.setErrors(null); 
      return null;
    }    
  }

  signUp() {
    // Implement sign-up logic here, e.g., navigate to a sign-up page or open a sign-up modal
    // console.log('Sign-up button clicked');
    this.newUser = true;
  }

  loginWithEmail(value: Partial<{ email: string|null; password: string|null; }>) {
    console.log('Login form submitted with values:', value);
    this.authService.loginUser({
      email: value.email || '',
      password: value.password || ''
    }).subscribe({
      next: (res) => {
        // console.log('Login successful', res);
        const decodedToken = jwtDecode(res.token);
        this.authService.user.set(decodedToken as any);
        localStorage.setItem('accessToken', res.token);
        this.authService.router.navigate(['/than-cad']);
      },
      error: (err) => console.error('Login error', err),
    });
  }   

  signUpFormSubmit(value: Partial<{ email: string|null; firstname: string|null; lastname: string|null; password: string|null; confirmPassword: string|null; }>) {
    // console.log('Sign-up form submitted with values:', value);
    this.userService.registerUser({
      email: value.email || undefined,
      name: `${value.firstname} ${value.lastname}`,
      password: value.password || undefined
    }).subscribe({
      next: (res) => {
        // console.log('User registered successfully', res);
        this.signUpForm.reset();
        this.newUser = false;
      },
      error: (err) => console.error('User registration error', err),
    });
  }

  resetsignUpForm(){
    this.signUpForm.reset();
    this.newUser = false;
  }

}
