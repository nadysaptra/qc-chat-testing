import { CustomerInterface } from './../interface/customer.interface';
import { AgentInterface } from './../interface/agent.interface';
import { AuthService } from './../../config/auth.service';
import { AgentService } from './../../config/agent.service';
import { CustomerService } from './../../config/customer.service';
import { AppService } from './../service/app.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from './../helpers/form-helper';
import { interval, Subscription } from 'rxjs';
import { AppState, appState } from './../app.state';
import { getUser, isSessionValid, removeCustomer } from './../storage/session';
import { AgentAppService } from './service/agent.service';
import { AgentState, agentState } from './agent.state';

const INTERVAL_TIME = 5000; // 5 seconds

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss'],
  providers: [AgentAppService, CustomerService, AgentService, AuthService],
})
export class AgentComponent {
  state: AgentState = agentState;
  customerStatusInterval: Subscription = new Subscription();

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, ValidationService.emailValidator]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private agentAppService: AgentAppService,
    private customerService: CustomerService) {
    const session = isSessionValid();
    if (session) {
      this.state.isAuthenticated = true;
      this.state.agent = getUser();
      this.getCustomerList();
    }
  }

  async register() {
    const form: { email: string } = this.loginForm.value;
    const saveRes = await this.agentAppService.login(form);
    if (!saveRes) {
      alert('error');
      return;
    }
    if (saveRes) {
      this.state.isAuthenticated = true;
      this.state.agent = saveRes as AgentInterface;
      this.getCustomerList();
    }
  }

  async getCustomerList() {
    if (this.state.agent.id) {
      this.state.customers = await this.customerService.fetchCustomerByAgentId(this.state.agent.id).toPromise().catch(() => []).then((r: any) => r.data.customers);
    }
  }

  logout() {
    removeCustomer();
    this.state.isAuthenticated = false;
    this.state.customers = [];
  }

  async resolve(id: number) {
    const res = await this.customerService.resolve(id).toPromise().catch(() => null);
    if (!res) {
      alert('failed');
    } else {
      this.getCustomerList();
    }
  }
}
