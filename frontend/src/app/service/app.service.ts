import { Injectable } from "@angular/core";
import { AuthService } from "src/config/auth.service";
import { CustomerService } from "src/config/customer.service";

@Injectable()
export class AppService {
    constructor(private authService: AuthService, private customerService: CustomerService) {

    }
    storageKey: string = 'qc-user'
    getCustomer() {
        if (sessionStorage.getItem(this.storageKey) && sessionStorage.getItem(this.storageKey) !== "") {
            return JSON.parse(sessionStorage.getItem(this.storageKey)!);
        }
        return {}
    }

    getCustomerStatus() {

    }

    getAgentStatus() {

    }

    isCustomerServed() {

    }

    removeCustomer() {
        sessionStorage.removeItem(this.storageKey)
    }

    isSessionValid() {
        if (sessionStorage.getItem(this.storageKey) && sessionStorage.getItem(this.storageKey) !== "") {
            return true;
        }
        return false;
    }

    async saveCustomer(form: { name: string; email: string }) {
        const auth = await this.authService.authenticate(form).toPromise();
        if (auth) {
            sessionStorage.setItem(this.storageKey, JSON.stringify(form));
            return true;
        }
        return false;
    }

}