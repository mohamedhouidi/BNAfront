import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransfersService } from './transfers.service';
import { TransferRequest } from './transferRequest.model';

@Component({
  selector: 'online-banking-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {

  fromAccountOptions: any;
  toAccountOptions: any;
  displayedFromAccountOptions: any;
  displayedToAccountOptions: any;
  transferForm: FormGroup;
  date = new Date();


  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private transfertService : TransfersService,
              private router: Router) {
    this.route.data.subscribe((data: {transferTemplate: any}) => {
      const {fromAccountOptions, toAccountOptions} = data.transferTemplate;
      this.fromAccountOptions = fromAccountOptions;
      this.displayedFromAccountOptions = fromAccountOptions;
      this.toAccountOptions = toAccountOptions;
      this.displayedToAccountOptions = toAccountOptions;
    });
   }

  ngOnInit(): void {
    this.createTransferForm();
  }

  createTransferForm() {
    this.transferForm = this.formBuilder.group({
      toAccount: ['', Validators.required],
      fromAccount: ['', Validators.required],
      amount: ['', Validators.required],
      date: this.date,
      remarks: ['', Validators.required]
    });
  }

  handleFromFieldOption(value: any) {
    this.displayedToAccountOptions = this.toAccountOptions.filter(account => value ? account.accountId !== value.accountId : true);
  }

  handleToFieldOption(value: any) {
    this.displayedFromAccountOptions = this.fromAccountOptions.filter( account => value ? account.accountId !== value.accountId : true);
  }

  submitTransferRequest() {
    this.transfertService.createNewTransfer(this.transferForm.value).subscribe((transfer: TransferRequest) => {
      console.log(transfer)
    });
    this.transferForm.reset();
    console.log('trying to submit the transfer request', this.transferForm.value);
    this.router.navigate(['/recent-transactions']);
  }


}
