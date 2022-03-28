import { CustomerInterface } from '../interface/customer.interface';
import { SupervisorInterface } from '../interface/supervisor.interface';
import { AgentInterface } from './../interface/agent.interface';
export interface SupervisorState {
    customers: CustomerInterface[];
    isAuthenticated: boolean;
    supervisor: SupervisorInterface;
    agents: AgentInterface[];
}
export const supervisorState: SupervisorState = {
    customers: [],
    isAuthenticated: false,
    supervisor: <SupervisorInterface>{},
    agents: []
}