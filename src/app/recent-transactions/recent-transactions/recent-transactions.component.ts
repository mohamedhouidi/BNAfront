import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { startWith, delay, tap } from 'rxjs/operators';
import { RecentTransactionsService } from '../recent-transactions.service';

@Component({
  selector: 'online-banking-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrls: ['./recent-transactions.component.css']
})
export class RecentTransactionsComponent implements OnInit, AfterViewInit {

  transactions: any;
  displayedColumns: string[] = ['date', 'amount', 'submittedOnDate'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,private recentTransactionsService: RecentTransactionsService) {
    // this.recentTransactionsService.getClientTransactions().subscribe((transactions: any) => {
    //   console.log("this is transactions",transactions);
    //   this.transactions = transactions;
    // });
    this.route.data.subscribe((data:{transactions: any}) => {
      this.transactions = data.transactions;
    });
  }

  ngOnInit(): void {

    console.log('Here from oninit of recent transactions component', this.transactions);
  }

  ngAfterViewInit(): void {
  this.paginator.page
    .pipe(
    startWith(null),
    delay(0),
    tap(() => this.setTransactionsTable()
    )
  ).subscribe();
}

  setTransactionsTable() {
    this.dataSource = new MatTableDataSource(this.transactions);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
