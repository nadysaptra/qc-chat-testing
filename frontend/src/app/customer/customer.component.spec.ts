import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbThemeModule, NbLayoutModule, NbChatModule } from '@nebular/theme';
import { SharedModule } from '../shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';

describe('CustomerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CustomerComponent
      ],
      imports: [

        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CustomerRoutingModule,
        SharedModule,

        NbThemeModule.forRoot({ name: 'default' }),
        NbLayoutModule,
        NbEvaIconsModule,
        NbChatModule.forChild(),


        HttpClientModule,
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CustomerComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
