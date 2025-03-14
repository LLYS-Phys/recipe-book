import { Component, DestroyRef, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { ChangeDetectionStrategy, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatButton, MatIcon, RouterLink, MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit{
  constructor( private destroyRef: DestroyRef, private authService: AuthService, private router: Router ){
    merge(this.form.controls.email.statusChanges, this.form.controls.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  errorMessage = signal('');
  hide = signal(true);
  isAuthenticated = false
  locale: string | null = null

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    password: new FormControl('', {
      validators: [Validators.minLength(6), Validators.required]
    })
  })

  ngOnInit() {
    this.locale = localStorage.getItem('locale')
    document.querySelector("header")?.addEventListener("click", () => this.locale = localStorage.getItem('locale'))
    document.querySelector(".mobile-menu-list")?.addEventListener("click", () => this.locale = localStorage.getItem('locale'))

    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: value => {
        window.localStorage.setItem('saved-login-form', JSON.stringify({email: value.email}))
      }
    })
    const userSubscription = this.authService.user.subscribe({
      next: (user) => {
        this.isAuthenticated = !!user
        if (this.isAuthenticated) window.location.replace("/")
      }
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe()
      userSubscription.unsubscribe()
    })
  }

  onSubmit(){
    if (this.form.controls.email.invalid || this.form.controls.password.invalid){
      console.log('Invalid email or password')
      return
    }

    const enteredEmail = this.form.value.email
    const enteredPassword = this.form.value.password

    this.authService.login(enteredEmail!, enteredPassword!).subscribe({
      next: (resData) => {
        console.log(resData)
        this.form.reset()
        this.router.navigate(['/'])
      },
      error: (error) => console.log(error)
    })
  }

  updateErrorMessage() {
    if (this.form.controls.email.hasError('required')) {
      this.errorMessage.set('You have to enter an email address!');
    } else if (this.form.controls.email.hasError('email')) {
      this.errorMessage.set('Invalid email address');
    } else {
      this.errorMessage.set('');
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
