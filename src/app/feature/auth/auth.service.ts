import { Injectable } from '@angular/core';
import { Auth, authState, updateProfile } from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { BehaviorSubject, from, switchMap } from 'rxjs';
import { SignupCredential } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState = new BehaviorSubject<Object | null> (null);

  readonly isLoggedIn$ = authState(this.auth);

  constructor(private auth: Auth) { }

  signIn (credentials: Object) {
    this.authState.next(credentials)
  }

  signUp({ email, displayName, password }: SignupCredential) {
    return from(createUserWithEmailAndPassword(this.auth, email,  password)).pipe(
      switchMap(( { user }) => updateProfile(user, { displayName }))
    );
  }
}
