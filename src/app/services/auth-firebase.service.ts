import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  public user: User;
  constructor(public ofAuth: AngularFireAuth) { }

  async resetPassword(email:string):Promise<void>{
    try{
      return this.ofAuth.sendPasswordResetEmail(email);
    } catch(error){
    }
  }

  async sendVerificationEmail(){
    return (await this.ofAuth.currentUser).sendEmailVerification();
  }

  async loginFirebase(email:string,password:string){
    const result= await this.ofAuth.signInWithEmailAndPassword(email, password);
    return result;
  }
  async registerFirebase(email:string,password:string){
    const result= await this.ofAuth.createUserWithEmailAndPassword(email,password);
    this.sendVerificationEmail();
    return result;
  }
  async logoutFirebase() {
    await this.ofAuth.signOut();
  }

  getCurrentUser() {
    return this.ofAuth.authState.pipe(first()).toPromise();
  }
}


