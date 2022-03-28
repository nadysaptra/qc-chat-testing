import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.API_URL + '/v1/auth';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) { }
    authenticate(form: { name: string; email: string }) {
        return this.http.post(BASE_URL, form);
    }

    authenticateAgent(form: { email: string; }) {
        return this.http.post(`${BASE_URL}/agent`, form)
    }

    authenticateSupervisor(form: { email: string; }) {
        return this.http.post(`${BASE_URL}/supervisor`, form)
    }
}