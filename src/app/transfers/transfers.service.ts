import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferRequest } from './transferRequest.model';
import { AuthenticationService } from '../core/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TransfersService {

  constructor(private http: HttpClient , private authenticationService: AuthenticationService) { }

  getTransferTemplate() {
  const userId = this.authenticationService.getCredentials().userId;
                console.log('From the Transfert service get account method ', userId);
                return this.http.get(`/user/get/options/${userId}`);
  }

  createNewTransfer(body: any ) {
    const userId = this.authenticationService.getCredentials().userId;
    return this.http.post<any>(`/user/transfert/${userId}`,body);
   
  }

}
