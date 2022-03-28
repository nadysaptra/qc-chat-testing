import { AgentInterface } from './../../interface/agent.interface';
import { AgentService } from './../../../config/agent.service';
import { Injectable } from "@angular/core";
import { AuthService } from "src/config/auth.service";
import { updateSession, updateSessionRole } from '../../storage/session';

@Injectable()
export class AgentAppService {

    constructor(private agentService: AgentService, private authService: AuthService) { }

    async getDetailAgent(id: string): Promise<{ name: string; email: string } | undefined> {
        const auth: any | null = await this.agentService.fetchDetailAgent(id).toPromise().catch(() => null);
        if (!auth) {
            return undefined;
        }
        return auth
    }

    async login(form: { email: string }): Promise<boolean | AgentInterface> {
        const auth: any | null = await this.authService.authenticateAgent(form).toPromise().catch(() => null);
        if (!auth) {
            return false;
        }
        let f = auth as AgentInterface;

        updateSession(f);
        updateSessionRole('customer');
        return f;
    }
}