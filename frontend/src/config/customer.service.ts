import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.API_URL + '/v1/customer';

@Injectable()
export class CustomerService {
    constructor(private http: HttpClient) { }

    fetchCustomerStatus(id: number) {
        return this.http.get(BASE_URL + '/' + id + '/status');
    }

    fetchCustomerRemainingQueue() {
        return this.http.get(BASE_URL + '/queue');
    }

}