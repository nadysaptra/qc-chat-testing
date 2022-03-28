import { AgentInterface } from "../interface/agent.interface";

export const storageKey: string = 'qc-user';
export const storageRoleKey = 'qc-user-role';

export const getCustomer = () => {
    if (sessionStorage.getItem(storageKey) && sessionStorage.getItem(storageKey) !== "") {
        return JSON.parse(sessionStorage.getItem(storageKey)!);
    }
    return {}
}

export const getRole = () => sessionStorage.getItem(storageRoleKey);

export const updateSession = (f: AgentInterface) => sessionStorage.setItem(storageKey, JSON.stringify(f));

export const updateSessionRole = (role: string) => sessionStorage.setItem(storageRoleKey, role);

export const getCustomerStatus = (): string => {
    if (sessionStorage.getItem(storageKey) && sessionStorage.getItem(storageKey) !== "") {
        const session = JSON.parse(sessionStorage.getItem(storageKey)!);
        return session.status;
    }
    return 'unserve';
}

export const removeCustomer = () => {
    sessionStorage.removeItem(storageKey)
    sessionStorage.removeItem(storageRoleKey);
}

export const isSessionValid = () => {
    if (sessionStorage.getItem(storageKey) && sessionStorage.getItem(storageKey) !== "") {
        return true;
    }
    return false;
}