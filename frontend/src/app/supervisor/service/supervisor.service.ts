import { SupervisorInterface } from './../../interface/supervisor.interface';
import { AgentService } from './../../../config/agent.service';
import { Injectable } from "@angular/core";
import { AuthService } from "src/config/auth.service";
import { updateSession, updateSessionRole } from '../../storage/session';

@Injectable()
export class SupervisorAppService {

    constructor(private agentService: AgentService, private authService: AuthService) { }

    async getDetailSupervisor(id: string): Promise<{ name: string; email: string } | undefined> {
        const auth: any | null = await this.agentService.fetchDetailAgent(id).toPromise().catch(() => null);
        if (!auth) {
            return undefined;
        }
        return auth
    }

    async login(form: { email: string }): Promise<boolean | SupervisorInterface> {
        const auth: any | null = await this.authService.authenticateSupervisor(form).toPromise().catch(() => null);
        if (!auth) {
            return false;
        }
        let f = auth as SupervisorInterface;

        updateSession(f);
        updateSessionRole('customer');
        return f;
    }
}