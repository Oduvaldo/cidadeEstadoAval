import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private token = '';

  constructor() { }

  getToken(): string {
    return this.token;
  }
  setToken(token): void {
    this.token = token;
  }

}
