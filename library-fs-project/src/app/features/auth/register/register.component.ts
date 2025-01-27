import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {Register} from '../../../core/models/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class RegisterComponent {
#formBuilder = inject(FormBuilder);
#authService: AuthService = inject(AuthService);
registerForm = this.#formBuilder.group({
  name: ['', [Validators.required, Validators.minLength(4)]],
  surname: ['', Validators.required],
  username: ['', Validators.required],
  password: ['', [Validators.required,Validators.minLength(5)]],
});
  hide = signal(true);

get name(){
  return this.registerForm.controls['name'];
}

get surname(){
  return this.registerForm.controls['surname'];
}

get username(){
  return this.registerForm.controls['username'];
}

get password(){
  return this.registerForm.controls['password'];
}

signup(){
  if(this.registerForm.valid){
  this.#authService.register(this.registerForm.value as Register);
  }
}

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

}
