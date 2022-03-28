import { AgentService } from './../../config/agent.service';
import { Injectable } from "@angular/core";
import { AuthService } from "src/config/auth.service";
import { CustomerService } from "src/config/customer.service";
import { storageRoleKey, updateSession, updateSessionRole } from '../storage/session';

@Injectable()
export class AppService {

    constructor(private authService: AuthService, private customerService: CustomerService, private agentService: AgentService) {

    }

    async getDetailAgent(id: string): Promise<{ name: string; email: string } | undefined> {
        const auth: any | null = await this.agentService.fetchDetailAgent(id).toPromise().catch(() => null);
        if (!auth) {
            return undefined;
        }
        return auth
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

        updateSession(f);
        updateSessionRole('customer');
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