import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { catchError, map, Observable, of, tap, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { AuthResponse, User } from "../interfaces/auth.interface";
import { rxResource } from "@angular/core/rxjs-interop";

// Definimos los tipos de estados
type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly _baseUrl = environment.baseUrl;
    private readonly _http = inject(HttpClient);
    private readonly _authStatus = signal<AuthStatus>(
        localStorage.getItem('token') ? 'checking' : 'not-authenticated'
    );
    private readonly _user = signal<User | null>(null);
    private readonly _token = signal<string | null>(localStorage.getItem('token'));

    public readonly authStatus = computed<AuthStatus>(() => {
        if (this._authStatus() === 'checking') return 'checking';
        return (this._user() && this._token()) ? 'authenticated' : 'not-authenticated';
    });

    public readonly user = this._user.asReadonly();
    public readonly token = this._token.asReadonly();

    checkStatusResource = rxResource({
        stream: () => this.checkStatus(),
    })

    //metodo para logear un usuario esperamos un tipo observable tipo AuthResponse
    loginUser(email: string, password: string): Observable<boolean> {
        return this._http.post<AuthResponse>(`${this._baseUrl}/auth/login`, { email: email, password: password }).pipe(
            tap((response: any) => {
                this._user.set(response.user);
                this._token.set(response.token);
                this._authStatus.set('authenticated');
                localStorage.setItem('token', response.token);
                console.table(this._authStatus());
            }),
            map(() => true),
            catchError((error: any) => {
                this._user.set(null);
                this._token.set(null);
                this._authStatus.set('not-authenticated');
                localStorage.removeItem('token');
                return of(false); // Devuelve false en caso de error
            })
        );
    }

    registerUser(fullName: string, email: string, password: string): Observable<boolean> {
        return this._http.post<AuthResponse>(`${this._baseUrl}/auth/register`, { fullName, email, password }).pipe(
            tap((response: any) => {
                this._user.set(response.user);
                this._token.set(response.token);
                this._authStatus.set('authenticated');
                localStorage.setItem('token', response.token);
                console.table(this._authStatus());
            }),
            map(() => true),
            catchError((error: any) => {
                this._user.set(null);
                this._token.set(null);
                this._authStatus.set('not-authenticated');
                localStorage.removeItem('token');
                return of(false); // Devuelve false en caso de error
            })
        );
    }

    public checkStatus(): Observable<boolean> {
        if (this._token() === null) return of(false);
        return this._http.get<AuthResponse>(`${this._baseUrl}/auth/check-status`).pipe(
            tap((response: any) => {
                this._user.set(response.user);
                this._token.set(response.token);
                this._authStatus.set('authenticated');
                localStorage.setItem('token', response.token);
                console.table(this._authStatus());
            }),
            map(() => true),
            catchError((error: any) => {
                this._user.set(null);
                this._token.set(null);
                this._authStatus.set('not-authenticated');
                localStorage.removeItem('token');
                return of(false); // Devuelve false en caso de error
            })
        );
    }

    public logout(): void {
        this._user.set(null);
        this._token.set(null);
        this._authStatus.set('not-authenticated');
        localStorage.removeItem('token');
    }
}