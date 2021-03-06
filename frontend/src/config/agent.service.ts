import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.API_URL + '/v1/agent';

@Injectable()
export class AgentService {
    constructor(private http: HttpClient) { }

    fetchAllAgent() {
        return this.http.get(BASE_URL);
    }

    fetchAvailableAgent() {
        return this.http.get(BASE_URL + '/available');
    }

    fetchDetailAgent(id: string) {
        return this.http.get(BASE_URL + '/' + id);
    }

    fetchDetailAgentByCustomerId(id: number) {
        return this.http.get(`${BASE_URL}/customer/${id}`);
    }

    assignAgentToCustomer(id: number, customerId: number) {
        return this.http.put(`${BASE_URL}/assign/${id}/customer/${customerId}`, {});
    }
}