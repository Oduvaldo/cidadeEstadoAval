import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import { City } from '../../../shared/model/city';
import { CityService } from '../../../shared/service/city.service';

import { CityEditComponent } from './city-edit/city-edit.component';

import { MessageDialogComponent } from '../../../shared/components/dialog/message-dialog/message-dialog.component';

import * as Util from '../../../util/util';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  displayedColumns = ['name', 'state', 'update', 'delete'];
  dataSource = [];

  search = '';

  private cityEditDialogSubscription: Subscription;

  constructor(
    private cityService: CityService,

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

  onAddCity(): void {
    this.openEditCityDialog();
  }

  onUpdateCity(city: City): void {
    this.openEditCityDialog(city);
  }

  onDeleteCity(city: City): void {
    this.deleteCity(city);
  }

  private loadDataSource(args?: any): void {
    this.cityService.getCities(args)
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

  private openEditCityDialog(city?: City): void {
    const dialogRef = this.dialog.open(CityEditComponent, {
      width: '500px',
      disableClose: true,
      data: city && city.idCity ? { idCity: city.idCity } : {},
    });

    this.cityEditDialogSubscription = dialogRef.afterClosed().subscribe((result: any) => {
      this.loadDataSource();
    });
  }

  private deleteCity(city: City): void {
    this.cityService.deleteCity(city)
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

  ngOnDestr(): void {
    Util.unsubscribe(this.cityEditDialogSubscription);
  }
}
