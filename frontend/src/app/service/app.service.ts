import { AgentService } from './../../config/agent.service';
import { Injectable } from "@angular/core";
import { AuthService } from "src/config/auth.service";
import { CustomerService } from "src/config/customer.service";

@Injectable()
export class AppService {
    storageKey: string = 'qc-user'
    constructor(private authService: AuthService, private customerService: CustomerService, private agentService: AgentService) {

    }
    getCustomer() {
        if (sessionStorage.getItem(this.storageKey) && sessionStorage.getItem(this.storageKey) !== "") {
            return JSON.parse(sessionStorage.getItem(this.storageKey)!);
        }
        return {}
    }

    updateSession(f: { id: number; name: string; email: string; agent_id: number; status: string; }) {
        sessionStorage.setItem(this.storageKey, JSON.stringify(f));
    }

    getCustomerStatus(): string {
        if (sessionStorage.getItem(this.storageKey) && sessionStorage.getItem(this.storageKey) !== "") {
            const session = JSON.parse(sessionStorage.getItem(this.storageKey)!);
            return session.status;
        }
        return 'unserve';
    }

    async getDetailAgent(id: string): Promise<{ name: string; email: string } | undefined> {
        const auth: any | null = await this.agentService.fetchDetailAgent(id).toPromise().catch(() => null);
        if (!auth) {
            return undefined;
        }
        return auth
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

    async saveCustomer(form: { name: string; email: string }): Promise<boolean | { id: number; name: string; email: string }> {
        const auth: any | null = await this.authService.authenticate(form).toPromise().catch(() => null);
        if (!auth) {
            return false;
        }
        let f = {
            ...form
        } as { id: number; name: string; email: string, status: string; agent_id: number; };
        f.id = auth.id;
        f.status = 'unserve';

        this.updateSession(f);
        return f;
    }

    async getDetailAgentByCustomerId(id: number) {
        const agent: any | null = await this.agentService.fetchDetailAgentByCustomerId(id).toPromise().catch(() => null);
        if (!agent) {
            return undefined;
        }
        return agent.data;
    }

    async getRemainingQueue() {
        const queue: any | null = await this.customerService.fetchCustomerRemainingQueue().toPromise().catch(() => null);
        if (!queue) {
            return null;
        }
        return queue.data.queue;
    }

}