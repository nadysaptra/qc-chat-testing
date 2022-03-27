import { AuthService } from './../config/auth.service';
import { AgentService } from './../config/agent.service';
import { CustomerService } from './../config/customer.service';
import { AppService } from './service/app.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from './helpers/form-helper';

const status: string = ''; // 'unserve' | 'resolve' | 'serve');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
export class AppComponent {
  messages: any[] = [];
  isAuthenticated = false;
  user: { name: string; email: string } | undefined;

  loginForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, ValidationService.emailValidator]]
  });

  constructor(private formBuilder: FormBuilder, private appService: AppService) {
    const session = this.appService.isSessionValid();
    if (session) {
      this.isAuthenticated = true;
      this.user = this.appService.getCustomer();
    }
  }

  async register() {
    const form: { name: string; email: string } = this.loginForm.value;
    const saveRes = await this.appService.saveCustomer(form);
    if (saveRes) {
      this.isAuthenticated = true;
    }
    alert('error');
  }


  sendMessage(event: any) {
    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: 'text',
      user: {
        name: this.user?.name,
        avatar: 'https://i.gifer.com/no.gif',
      },
    });
  }

  logout() {
    this.appService.removeCustomer();
    this.isAuthenticated = false;
    this.messages = [];
  }


}
