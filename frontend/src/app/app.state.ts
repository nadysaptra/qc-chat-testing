export interface AppState {
    messages: any[];
    isAuthenticated: boolean;
    status: string;
    customer: { id: number; name: string; email: string } | undefined;
    queue: number;
    agent: { name: string; email: string } | undefined;
}
export const appState: AppState = {
    messages: [],
    isAuthenticated: false,
    status: 'unserve', // unserve, served, resolve
    customer: undefined,
    queue: 0,
    agent: undefined
}