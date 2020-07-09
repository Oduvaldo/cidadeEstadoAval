import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent implements OnInit {

  private validationMessages = {
    DUPLICATED_STATE: 'Estado já cadastrado!',
    DUPLICATED_CITY: 'Cidade já cadastrada!',
    THERE_ARE_CITIES: 'Existem cidades cadastradas no estado!',
    SYSTEM_FAILURE: 'Falha no sistema, contate o suporte.',
  };

  constructor(
    private dialogRef: MatDialogRef<MessageDialogComponent>,

    @Inject(MAT_DIALOG_DATA) private data: any,
  ) { }

  ngOnInit(): void {
  }

  getMessage(): string {
    return this.validationMessages[this.data.message]
      ? this.validationMessages[this.data.message]
      : this.validationMessages.SYSTEM_FAILURE;
  }

}
