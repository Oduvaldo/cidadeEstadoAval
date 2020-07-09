import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MessageDialogComponent } from '../../../../shared/components/dialog/message-dialog/message-dialog.component';

import { State } from '../../../../shared/model/state';
import { StateService } from '../../../../shared/service/state.service';

@Component({
  selector: 'app-state-edit',
  templateUrl: './state-edit.component.html',
  styleUrls: ['./state-edit.component.css']
})
export class StateEditComponent implements OnInit {
  idStateFormControl = new FormControl();
  nameFormControl = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  abbreviationFormControl = new FormControl('', [Validators.required, Validators.maxLength(2)]);

  formGroup = new FormGroup({
    idState: this.idStateFormControl,
    name: this.nameFormControl,
    abbreviation: this.abbreviationFormControl,
  });

  constructor(
    private stateService: StateService,

    private dialogRef: MatDialogRef<StateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: State,

    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    if (!this.data.idState) { return; }

    this.stateService.getState(this.data.idState)
      .then((state: State) => {
        this.idStateFormControl.setValue(state.idState);
        this.nameFormControl.setValue(state.name);
        this.abbreviationFormControl.setValue(state.abbreviation);
      })
      .catch((error: any) => {
        this.dialog.open(MessageDialogComponent, {
          width: '350px',
          data: {
            message: error.message,
          }
        });
      });
  }

  save(): void {
    const state = {
      ...this.formGroup.value,
    } as State;

    state.idState ? this.putState(state) : this.postState(state);
  }

  private postState(state: State): void {
    this.stateService.postState(state)
      .then((result: any) => {
        this.dialogRef.close();
      })
      .catch((error: any) => {
        this.dialog.open(MessageDialogComponent, {
          width: '350px',
          data: {
            message: error.message,
          }
        });
      });
  }

  private putState(state: State): void {
    this.stateService.putState(state)
      .then((result: any) => {
        this.dialogRef.close();
      })
      .catch((error: any) => {
        this.dialog.open(MessageDialogComponent, {
          width: '350px',
          data: {
            message: error.message,
          }
        });
      });
  }

}
