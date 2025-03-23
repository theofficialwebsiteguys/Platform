import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3333/api/users'; // Backend API URL
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser$: Observable<any>;

  private authStatusSubject = new BehaviorSubject<boolean>(false); // Auth status observable
  public authStatus$ = this.authStatusSubject.asObservable(); // Expose as observable

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();

    // Update auth status based on the presence of a valid session
    this.authStatusSubject.next(!!this.getSessionData());
  }

  /**
   * Register a new user and automatically log them in
   */
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

  /**
   * Login user with credentials
   */
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
            this.authStatusSubject.next(true); // Update auth status
            this.router.navigateByUrl('/platform'); // Navigate to the main app
          }
        })
      );
  }

  /**
   * Logout the user and clear local storage
   */
  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('sessionData');
    this.currentUserSubject.next(null);
    this.authStatusSubject.next(false); // Update auth status
    this.router.navigate(['/login']); // Redirect to login
  }

  /**
   * Get the current user value
   */
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  /**
   * Check if the user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getSessionData();
  }

  /**
   * Store session data in local storage
   */
  private storeSessionData(sessionId: string, expiresAt: Date): void {
    const sessionData = { token: sessionId, expiry: expiresAt };
    localStorage.setItem('sessionData', JSON.stringify(sessionData));
  }

  /**
   * Retrieve session data from local storage
   */
  private getSessionData(): { token: string; expiry: Date } | null {
    const sessionData = localStorage.getItem('sessionData');
    if (sessionData) {
      const parsedData = JSON.parse(sessionData);
      if (new Date(parsedData.expiry) > new Date()) {
        return parsedData; // Session is still valid
      } else {
        this.logout(); // Session expired
      }
    }
    return null;
  }

  /**
   * Store user information in local storage
   */
  private storeUserInfo(user: any): void {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user); // Update the subject
    }
  }
}
