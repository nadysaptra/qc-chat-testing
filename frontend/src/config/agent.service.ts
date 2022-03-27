import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const BASE_URL = environment + '/v1/agent';

@Injectable()
export class AgentService {
    constructor(private http: HttpClient) { }

    fetchAllAgent() {
        return this.http.get(BASE_URL);
    }

    fetchAvailableAgent() {
        return this.http.get(BASE_URL + '/available');
    }
}