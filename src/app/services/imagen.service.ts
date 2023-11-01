import { Injectable } from '@angular/core';
import { Storage, getDownloadURL, listAll, ref, uploadBytes } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  constructor(private storage: Storage) { }

  subirImg2(file: any): Observable<string> {
    return new Observable<string>((observer) => {
      const imgRef = ref(this.storage, `usuarios/${Date.now()}-${file.name}`);
      uploadBytes(imgRef, file)
        .then(res => {
          getDownloadURL(imgRef).then(url => {
            console.log("Subida", file);
            observer.next(url);
            observer.complete();
          });
        });
    });
  }
  subirImg(file: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const imgRef = ref(this.storage, `usuarios/${Date.now()}-${file.name}`);
      uploadBytes(imgRef, file)
        .then(res => getDownloadURL(imgRef))
        .then(url => {
          console.log("Subida", file);
          resolve(url);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

}
