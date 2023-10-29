import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from '../interfaces/usuario.interface';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afauth: AngularFireAuth, private firestore: Firestore) { }

  async login(user: Usuario) {
    try {
      return await this.afauth.signInWithEmailAndPassword(user.email, user.clave);
    } catch (error) {
      console.log("Error signing in", error);
      return null;
    }
  }

  async register(user: Usuario) {
    try {
      return (await this.afauth.createUserWithEmailAndPassword(user.email, user.clave)
        .then(res => {
          if (res) {

          }
          return res;
        })
        .then(res => {
          res.user?.sendEmailVerification();

          console.log(res);
          return res.user
        })
      )


    } catch (error) {
      console.log("Error signing in", error);
      return null;
    }
  }

  getUserLogged() {
    return this.afauth.authState;
  }

  // checkLog(): any {
  //   this.getUserLogged().subscribe(user => {
  //     console.log("Usuario: ", user?.uid);
  //     return user?.uid;
  //   });

  // }

  async verficarNuevoUsuario(email: string): Promise<boolean> {
    try {
      const methods = await this.afauth.fetchSignInMethodsForEmail(email);
      return methods.length > 0;
    } catch (error) {
      return false;
    }
  }

  logout() {
    this.afauth.signOut();
  }
}
