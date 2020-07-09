import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { City } from '../../../../shared/model/city';
import { CityService } from '../../../../shared/service/city.service';

import { MessageDialogComponent } from '../../../../shared/components/dialog/message-dialog/message-dialog.component';

import { State } from '../../../../shared/model/state';
import { StateService } from '../../../../shared/service/state.service';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.css']
})
export class CityEditComponent implements OnInit {

  states: State[] = [];

  idCityFormControl = new FormControl();
  nameFormControl = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  idStateFormControl = new FormControl('', [Validators.required]);

  formGroup = new FormGroup({
    idCity: this.idCityFormControl,
    name: this.nameFormControl,
    idState: this.idStateFormControl,
  });

  constructor(
    private cityService: CityService,
    private stateService: StateService,

    private dialogRef: MatDialogRef<CityEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadStates();
    this.loadData();
  }

  private loadStates(): void {
    this.stateService.getStates()
      .then((states: State[]) => {
        this.states = states;
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

  private loadData(): void {
    if (!this.data.idCity) { return; }

    this.cityService.getCity(this.data.idCity)
      .then((city: City) => {
        this.idCityFormControl.setValue(city.idCity);
        this.nameFormControl.setValue(city.name);
        this.idStateFormControl.setValue(city.state.idState);
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
    const city = {
      idCity: this.idCityFormControl.value,
      name: this.nameFormControl.value,
      state: {
        idState: this.idStateFormControl.value,
      } as State,
    } as City;

    if (city.idCity) {
      this.putCity(city);
      return;
    }

    this.postCity(city);
  }

  private postCity(city: City): void {
    this.cityService.postCity(city)
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

  private putCity(city: City): void {
    this.cityService.putCity(city)
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
