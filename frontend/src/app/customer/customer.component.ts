import { AuthService } from '../../config/auth.service';
import { AgentService } from '../../config/agent.service';
import { CustomerService } from '../../config/customer.service';
import { AppService } from '../service/app.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../helpers/form-helper';
import { interval, Subscription } from 'rxjs';
import { AppState, appState } from '../app.state';
import { getUser, isSessionValid, getCustomerStatus, updateSession, removeCustomer } from '../storage/session';

const INTERVAL_TIME = 5000; // 5 seconds

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  providers: [AppService, CustomerService, AgentService, AuthService],
  styles: [`
    ::ng-deep nb-layout-column {
      justify-content: center;
      display: flex;
    }
    nb-chat {
      width: 500px;
    }
  `],
})
export class CustomerComponent {
  state: AppState = appState;
  customerStatusInterval: Subscription = new Subscription();

  loginForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, ValidationService.emailValidator]]
  });

  constructor(private formBuilder: FormBuilder, private appService: AppService, private customerService: CustomerService) {
    const session = isSessionValid();
    if (session) {
      this.state.isAuthenticated = true;
      this.state.customer = getUser();
      this.runStatusSubscription();
    }
  }

  async register() {
    const form: { name: string; email: string } = this.loginForm.value;
    const saveRes = await this.appService.saveCustomer(form);
    if (!saveRes) {
      alert('error');
      return;
    }
    if (saveRes) {
      this.state.isAuthenticated = true;
      this.state.customer = saveRes as { id: number; name: string; email: string; agent_id: number; status: string; };
      this.runStatusSubscription();
    }
  }

  runStatusSubscription() {
    const customerStatus = getCustomerStatus();
    const fetchDetailAgent = async () => {
      const agent = await this.appService.getDetailAgentByCustomerId(this.state.customer!.id);
      if (agent) {
        this.state.agent = agent;
      }
    }
    if (customerStatus === "unserve" && this.state.customer) {
      const checkCustomerStatus = async () => {
        const customerStatusInsideInterval = await this.customerService.fetchCustomerStatus(this.state.customer!.id).toPromise().then((res: any) => res).catch(() => null);
        if (!customerStatusInsideInterval) {
          return;
        }
        this.state.status = customerStatusInsideInterval.data.status;
        switch (this.state.status) {
          case "served":
            this.customerStatusInterval.unsubscribe();
            updateSession(this.state.customer!)
            fetchDetailAgent();
            break;
          case "unserve":
            const queue = await this.appService.getRemainingQueue();
            if (queue) {
              this.state.queue = queue;
            }

            break;

          default:
            break;
        }
      }
      checkCustomerStatus();
      const source = interval(INTERVAL_TIME);
      this.customerStatusInterval = source.subscribe(() => {
        checkCustomerStatus();
      });
    } else {
      this.state.status = customerStatus;
      this.state.customer!.status = customerStatus;
      fetchDetailAgent();
    }
  }


  sendMessage(event: any) {
    this.state.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: 'text',
      user: {
        name: this.state.customer?.name,
        avatar: 'https://i.gifer.com/no.gif',
      },
    });
  }

  logout() {
    removeCustomer();
    this.state.isAuthenticated = false;
    this.state.messages = [];
  }


}
