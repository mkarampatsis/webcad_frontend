import { Component, inject } from '@angular/core';
import { 
  ReactiveFormsModule, 
  FormControl, 
  FormGroup,
  Validators, 
  AbstractControl, } from '@angular/forms';
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
    console.log('Validating password match');
    const form = control as FormGroup
    console.log('Form controls:', form?.controls);
    const password = form?.get('password')?.value;
    const confirmPassword = form?.get('confirmPassword')?.value;
    console.log('Password:',  password);
    console.log('Confirm Password:',   confirmPassword);

    if (password && confirmPassword && password !== confirmPassword) {     
      form?.get('confirmPassword')?.setErrors({ passwordMismatch: true }); 
      console.log('Password mismatch detected');
      return { passwordMismatch: true };
    } else {
      form?.get('confirmPassword')?.setErrors(null); 
      return null;
    }    
  }

  signUp() {
    // Implement sign-up logic here, e.g., navigate to a sign-up page or open a sign-up modal
    console.log('Sign-up button clicked');
    this.newUser = true;
  }

  loginWithEmail() {
    throw new Error('Method not implemented.');
  }

  signUpFormSubmit(value: Partial<{ email: string|null; firstname: string|null; lastname: string|null; password: string|null; confirmPassword: string|null; }>) {
    console.log('Sign-up form submitted with values:', value);
    this.userService.registerUser({
      email: value.email || undefined,
      name: `${value.firstname} ${value.lastname}`,
      password: value.password || undefined
    }).subscribe({
      next: (res) => {
        console.log('User registered successfully', res);
        this.newUser = false;
      },
      error: (err) => console.error('User registration error', err),
    });
  }

}
