import { Component, OnInit } from '@angular/core';
import { GitRepository }  from "../../models/galleryModels";
import { BookmarksService} from "../../services/bookmarks.service";

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {
    public bookmarks: Array<GitRepository> = [];

    constructor(private bookmarksService: BookmarksService) { }
  
    ngOnInit() {
      //get bookmarks when compent init.
      this.bookmarksService.getBookmarks().subscribe(
        (data) => this.extractItems(data),
        err => this.handleError(err));
    }

  //extract the data returned form the server and sotre it in bookmarks list
  private extractItems(data: any): void {
    
    if (data && data.length > 0) {
      data.forEach(item => {
        this.bookmarks.push(item);
      });
    } 
  }

  private handleError(error: any): Promise<any> {
    //TODO: add message to user
   
    return Promise.reject(error);
  }

}
