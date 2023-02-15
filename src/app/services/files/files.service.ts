import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import {tap} from "rxjs/operators";
import {map} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class FilesService {

    url = 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf';
  constructor(
    private http: HttpClient
  ) { }

    getFile(name: string, type: string) {
      return this.http.get(this.url, {responseType: 'blob'})
          .pipe(
              tap(content => {
                  const blob = new Blob([content], {type});
                  saveAs(blob, name);
              }),
              map(() => true)
          );
    }
}
