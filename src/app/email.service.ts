import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private functionUrl = 'https://twg-template-submission-92b1532f00c1.herokuapp.com';

  constructor(private http: HttpClient) { }

  sendUniversalEmail(formData: FormData) {
    return this.http.post(this.functionUrl + '/send-email-universal', formData);
  }
}
