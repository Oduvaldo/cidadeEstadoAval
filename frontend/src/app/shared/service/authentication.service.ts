import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, catchError, take, timeout } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import * as Service from './service';
import * as Logger from '../../util/logger';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
  ) { }

  postAuthentication(): Promise<any> {
    const url = `${environment.BACKEND_HOST}/authentication`;

    const option = {
      Authorization: `Bearer ${btoa(environment.BACKEND_USER)}`,
    };

    return this.http.post<any>(url, {}, Service.getHttpOption(option))
      .pipe(
        take(1),
        timeout(environment.HTTP_TIMEOUT),
        map((result: any) => ({
          token: result.token,
        })),
        catchError((error: any) => {
          Logger.error(error);
          if (error.error) { throw error.error; }
          throw error;
        }),
      )
      .toPromise();
  }

}
