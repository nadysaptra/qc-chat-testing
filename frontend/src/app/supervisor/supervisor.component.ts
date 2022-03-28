import { AssignDialogComponent } from './assign-dialog.component';
import { CustomerInterface } from './../interface/customer.interface';
import { AuthService } from './../../config/auth.service';
import { AgentService } from './../../config/agent.service';
import { CustomerService } from './../../config/customer.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from './../helpers/form-helper';
import { Subscription } from 'rxjs';
import { getUser, isSessionValid, removeCustomer } from './../storage/session';
import { supervisorState, SupervisorState } from './supervisor.state';
import { SupervisorInterface } from '../interface/supervisor.interface';
import { SupervisorAppService } from './service/supervisor.service';
import { MatDialog } from '@angular/material/dialog';

const INTERVAL_TIME = 5000; // 5 seconds

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.scss'],
  providers: [SupervisorAppService, CustomerService, AgentService, AuthService, MatDialog],
})
export class SupervisorComponent {
  state: SupervisorState = supervisorState;
  customerStatusInterval: Subscription = new Subscription();

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, ValidationService.emailValidator]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private supervisorAppService: SupervisorAppService,
    private agentService: AgentService,
    private customerService: CustomerService,
    public dialog: MatDialog) {
    const session = isSessionValid();
    if (session) {
      this.state.isAuthenticated = true;
      this.state.supervisor = getUser();
      this.getCustomerList();
    }
  }

  async register() {
    const form: { email: string } = this.loginForm.value;
    const saveRes = await this.supervisorAppService.login(form);
    if (!saveRes) {
      alert('error');
      return;
    }
    if (saveRes) {
      this.state.isAuthenticated = true;
      this.state.supervisor = saveRes as SupervisorInterface;
      this.getCustomerList();
    }
  }

  async getCustomerList() {
    if (this.state.supervisor.id) {
      this.state.customers = await this.customerService.fetchAllCustomer().toPromise().catch(() => []).then((r: any) => r);
    }
  }

  logout() {
    removeCustomer();
    this.state.isAuthenticated = false;
    this.state.customers = [];
  }

  assign(customer: CustomerInterface) {
    const dialogRef = this.dialog.open(AssignDialogComponent, {
      data: { "name": customer.name },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        const { id } = result;
        const res = await this.agentService.assignAgentToCustomer(id, customer.id).toPromise().catch(() => null);
        if (!res) {
          alert('cannot assign')
          return;
        }
        this.getCustomerList();
      }
    });
  }

}
