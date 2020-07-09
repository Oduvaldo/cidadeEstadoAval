import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, catchError, take, timeout } from 'rxjs/operators';

import { City } from '../model/city';

import { CacheService } from './cache.service';

import { environment } from '../../../environments/environment';

import * as Service from './service';
import * as Logger from '../../util/logger';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(
    private http: HttpClient,

    private cacheService: CacheService,
  ) { }

  postCity(city: City): Promise<any> {
    const url = `${environment.BACKEND_HOST}/city`;

    const option = {
      Authorization: `Bearer ${this.cacheService.getToken()}`,
    };

    return this.http.post<any>(url, city, Service.getHttpOption(option))
      .pipe(
        take(1),
        timeout(environment.HTTP_TIMEOUT),
        map((result: any) => ({
          status: result.status,
        })),
        catchError((error: any) => {
          Logger.error(error);
          if (error.error) { throw error.error; }
          throw error;
        }),
      )
      .toPromise();
  }

  putCity(city: City): Promise<any> {
    const url = `${environment.BACKEND_HOST}/city`;

    const option = {
      Authorization: `Bearer ${this.cacheService.getToken()}`,
    };

    return this.http.put<any>(url, city, Service.getHttpOption(option))
      .pipe(
        take(1),
        timeout(environment.HTTP_TIMEOUT),
        map((result: any) => ({
          status: result.status,
        })),
        catchError((error: any) => {
          Logger.error(error);
          if (error.error) { throw error.error; }
          throw error;
        }),
      )
      .toPromise();
  }

  deleteCity(city: City): Promise<any> {
    const url = `${environment.BACKEND_HOST}/city/${city.idCity}`;

    const option = {
      Authorization: `Bearer ${this.cacheService.getToken()}`,
    };

    return this.http.delete<any>(url, Service.getHttpOption(option))
      .pipe(
        take(1),
        timeout(environment.HTTP_TIMEOUT),
        map((result: any) => ({
          status: result.status,
        })),
        catchError((error: any) => {
          Logger.error(error);
          if (error.error) { throw error.error; }
          throw error;
        }),
      )
      .toPromise();
  }

  getCities(args?: any): Promise<any> {
    let url = `${environment.BACKEND_HOST}/city`;

    const params = [];

    if (args && args.search) {
      params.push(`search=${args.search}`);
    }

    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }

    const option = {
      Authorization: `Bearer ${this.cacheService.getToken()}`,
    };

    return this.http.get<any>(url, Service.getHttpOption(option))
      .pipe(
        take(1),
        timeout(environment.HTTP_TIMEOUT),
        map((result: any) => (result.data)),
        catchError((error: any) => {
          Logger.error(error);
          if (error.error) { throw error.error; }
          throw error;
        }),
      )
      .toPromise();
  }

  getCity(idCity: string): Promise<any> {
    const url = `${environment.BACKEND_HOST}/city/${idCity}`;

    const option = {
      Authorization: `Bearer ${this.cacheService.getToken()}`,
    };

    return this.http.get<any>(url, Service.getHttpOption(option))
      .pipe(
        take(1),
        timeout(environment.HTTP_TIMEOUT),
        map((result: any) => {
          if (result.data && result.data.length > 0) {
            return result.data[0];
          }
        }),
        catchError((error: any) => {
          Logger.error(error);
          if (error.error) { throw error.error; }
          throw error;
        }),
      )
      .toPromise();
  }

}
