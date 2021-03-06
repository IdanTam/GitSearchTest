import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';



//Search service run query github api
@Injectable()
export  class SearchService {

  private gitApiUrl: string = 'https://api.github.com/search/repositories?q=';
  
  constructor(public http: Http) {
  }
  
  search(query: string) {
    return this.http.get(this.gitApiUrl + query)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    //console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
