import { CustomerInterface } from '../interface/customer.interface';
import { AgentInterface } from './../interface/agent.interface';
export interface AgentState {
    customers: CustomerInterface[];
    isAuthenticated: boolean;
    agent: AgentInterface;
}
export const agentState: AgentState = {
    customers: [],
    isAuthenticated: false,
    agent: <AgentInterface>{}
}