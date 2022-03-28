import { AgentInterface } from './../interface/agent.interface';
import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgentService } from 'src/config/agent.service';

export interface DialogData {
    name: string;
}

@Component({
    selector: 'dialog-assign',
    templateUrl: './assign-dialog.component.html',
    providers: [
        AgentService
    ]
})
export class AssignDialogComponent {
    selectedValue = null;
    agents: AgentInterface[] = [];
    name: string = '';
    constructor(
        private agentService: AgentService,
        public dialogRef: MatDialogRef<AssignDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {
        this.name = data.name;
        this.getAgents()
    }

    async getAgents() {
        this.agents = await this.agentService.fetchAvailableAgent().toPromise().catch(() => []).then((res: any) => res);
    }

    cancel(): void {
        this.dialogRef.close();
    }

    close() {
        this.dialogRef.close({
            id: this.selectedValue,
        });
    }
}