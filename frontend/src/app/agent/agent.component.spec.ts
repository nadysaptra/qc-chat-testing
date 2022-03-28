import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { AgentRoutingModule } from './agent-routing.module';
import { AgentComponent } from './agent.component';

describe('AgentComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AgentComponent
      ],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        AgentRoutingModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        SharedModule,

        HttpClientModule,
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AgentComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
