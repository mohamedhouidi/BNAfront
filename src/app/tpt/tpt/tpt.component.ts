import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TptService } from '../tpt.service';

@Component({
  selector: 'online-banking-tpt',
  templateUrl: './tpt.component.html',
  styleUrls: ['./tpt.component.scss']
})
export class TptComponent implements OnInit {

  fromAccountOptions: any;
  toAccountOptions: any;
  displayedFromAccountOptions: any;
  displayedToAccountOptions: any;
  transferForm: FormGroup;
  date = new Date();


  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private tptService: TptService,
              private router: Router) {
    this.route.data.subscribe((data: {template: any}) => {
      const {fromAccountOptions, toAccountOptions} = data.template;
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
    this.tptService.createNewTPT(this.transferForm.value).subscribe((tpt: any) => {
      console.log(tpt);
    });
    this.transferForm.reset();
    console.log('trying to submit the tpt request', this.transferForm.value);
    this.router.navigate(['/recent-transactions']);
    }
}
