import { Injectable } from '@angular/core';
import { action, observable} from 'mobx';

@Injectable()
export class UserStore {

  @observable userStore: any;

  constructor() {}
  
  @action addUser( data: any ) {
    this.userStore = data;
  }
}