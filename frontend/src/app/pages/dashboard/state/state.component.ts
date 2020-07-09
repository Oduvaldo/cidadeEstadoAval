import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import { State } from '../../../shared/model/state';
import { StateService } from '../../../shared/service/state.service';

import { StateEditComponent } from './state-edit/state-edit.component';

import { MessageDialogComponent } from '../../../shared/components/dialog/message-dialog/message-dialog.component';

import * as Util from '../../../util/util';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit, OnDestroy {
  displayedColumns = ['name', 'abbreviation', 'update', 'delete'];
  dataSource = [];

  search = '';

  private stateEditDialogSubscription: Subscription;

  constructor(
    private stateService: StateService,

    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadDataSource();
  }

  applyFilter(): void {
    this.loadDataSource({
      search: this.search,
    });
  }

  onKeyUp(): void {
    if (!this.search) { this.loadDataSource(); }
  }

  clearFilter(): void {
    this.search = '';
    this.loadDataSource();
  }

  onAddState(): void {
    this.openEditStateDialog();
  }

  onUpdateState(state: State): void {
    this.openEditStateDialog(state);
  }

  onDeleteState(state: State): void {
    this.deleteState(state);
  }

  private loadDataSource(args?: any): void {
    this.stateService.getStates(args)
      .then((results: any) => {
        this.dataSource = results;
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

  private openEditStateDialog(state?: State): void {
    const dialogRef = this.dialog.open(StateEditComponent, {
      width: '500px',
      disableClose: true,

      data: state && state.idState ? { idState: state.idState } : {},
    });

    this.stateEditDialogSubscription = dialogRef.afterClosed().subscribe((result: any) => {
      this.loadDataSource();
    });
  }

  private deleteState(state: State): void {
    this.stateService.deleteState(state)
      .then((result: any) => {
        this.loadDataSource();
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

  ngOnDestroy(): void {
    Util.unsubscribe(this.stateEditDialogSubscription);
  }
}
