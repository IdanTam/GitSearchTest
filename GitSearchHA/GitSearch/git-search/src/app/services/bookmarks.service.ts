import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import {GitRepository} from "../models/galleryModels";


//Bookmarks service use to store and retrieve user bookmarks on server session
@Injectable()
export  class BookmarksService {

  private bookmarksApiUrl: string = 'http://localhost:62224/api/Bookmarks/';
  
  constructor(public http: Http) {}
  
  public setBookmark(data: GitRepository) {
    return this.http.post(this.bookmarksApiUrl + "SetBookmark", data);
     
  }

  public getBookmarks() {
    return this.http.get(this.bookmarksApiUrl + "getBookmarks")
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
