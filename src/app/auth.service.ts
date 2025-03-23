import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3333/api/users';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser$: Observable<any>;

  private authStatusSubject = new BehaviorSubject<boolean>(false);
  public authStatus$ = this.authStatusSubject.asObservable();

  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    let storedUser = null;
    if (this.isBrowser) {
      const user = localStorage.getItem('currentUser');
      storedUser = user ? JSON.parse(user) : null;
    }

    this.currentUserSubject = new BehaviorSubject<any>(storedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();

    if (this.isBrowser) {
      this.authStatusSubject.next(!!this.getSessionData());
    }
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      tap(() => {
        this.login({
          email: userData.email,
          password: userData.password,
        }).subscribe();
      })
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http
      .post<{ sessionId: string; user: any; expiresAt: Date }>(
        `${this.apiUrl}/login`,
        credentials
      )
      .pipe(
        tap((response) => {
          if (response) {
            this.storeSessionData(response.sessionId, response.expiresAt);
            this.storeUserInfo(response.user);
            this.authStatusSubject.next(true);
            this.router.navigateByUrl('/platform');
          }
        })
      );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('sessionData');
    }

    this.currentUserSubject.next(null);
    this.authStatusSubject.next(false);
    this.router.navigate(['/login']);
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getSessionData();
  }

  private storeSessionData(sessionId: string, expiresAt: Date): void {
    if (this.isBrowser) {
      const sessionData = { token: sessionId, expiry: expiresAt };
      localStorage.setItem('sessionData', JSON.stringify(sessionData));
    }
  }

  private getSessionData(): { token: string; expiry: Date } | null {
    if (!this.isBrowser) return null;

    const sessionData = localStorage.getItem('sessionData');
    if (sessionData) {
      const parsedData = JSON.parse(sessionData);
      if (new Date(parsedData.expiry) > new Date()) {
        return parsedData;
      } else {
        this.logout(); // session expired
      }
    }
    return null;
  }

  private storeUserInfo(user: any): void {
    if (this.isBrowser && user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    }
  }
}
