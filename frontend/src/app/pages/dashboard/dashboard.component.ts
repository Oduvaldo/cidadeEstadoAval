import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AuthenticationService } from '../../shared/service/authentication.service';
import { CacheService } from '../../shared/service/cache.service';

import { MessageDialogComponent } from '../../shared/components/dialog/message-dialog/message-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  authenticated = false;

  constructor(
    public authenticationService: AuthenticationService,
    public cacheService: CacheService,

    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.authenticationService.postAuthentication()
      .then((result: any) => {
        this.cacheService.setToken(result.token);
        this.authenticated = true;
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
