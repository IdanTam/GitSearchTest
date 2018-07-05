import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GitRepository } from "../../models/galleryModels";

import {BookmarksService} from "../../services/bookmarks.service";


@Component({
    selector: 'app-repository',
    templateUrl: './repository.component.html',
    styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {
    @Input() data: GitRepository;
    @Input() isDisplayButton: boolean = true;

    constructor(private bookmarksService: BookmarksService) { }

    ngOnInit() {
    }

    public setBookmark() {
        this.bookmarksService.setBookmark(this.data).subscribe(
            () => alert("Success! has been bookmarked"),
            err => this.handleError(err));
    }

  private handleError(error: any): Promise<any> {
    alert("Error! bookmark has failed");
    console.log(error);
    return Promise.reject(error);
  }
}

