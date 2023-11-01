import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from '../interfaces/usuario.interface';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { browserSessionPersistence, getAuth, setPersistence } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afauth: AngularFireAuth, private firestore: Firestore, private router: Router) { }

  async login(user: Usuario) {
    // this.afauth.
    try {
      return await this.afauth.signInWithEmailAndPassword(user.email, user.clave);
    } catch (error) {
      console.log("Error signing in");
      return null;
    }
  }


  async register(user: Usuario) {
    return (await this.afauth.createUserWithEmailAndPassword(user.email, user.clave)
      .then(res => {
        console.log("Registrado");
        res.user?.sendEmailVerification().then(() => { return });
        return res.user
      })
      .catch(() => {
        console.log("Error registro");
        return null;
      })
    )
  }

  async registerUser(user: Usuario) {
    const auth = getAuth();
    setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        return (await this.afauth.createUserWithEmailAndPassword(user.email, user.clave)
          .then(res => {
            console.log("Registrado");
            //res.user?.sendEmailVerification().then(() => { return });
            return res.user
          })
          .catch(() => {
            console.log("Error registro");
            return null;
          })
        )
      });
  }



  async registerAdmin(user: Usuario) {
    try {
      return (await this.afauth.createUserWithEmailAndPassword(user.email, user.clave)
        .then(res => {
          console.log("Admin registrado");
          return true;
        }))
    } catch (error) {
      return false;
    }
  }

  getUserLogged() {

    return this.afauth.authState;
  }

  getUser() {
    return this.afauth.currentUser
  }


  logout() {
    this.afauth.signOut().then(() => this.router.navigate(['']));
  }
}
