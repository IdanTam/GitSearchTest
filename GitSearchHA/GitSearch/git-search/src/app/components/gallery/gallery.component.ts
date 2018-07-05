import { Component, OnInit } from '@angular/core';
import * as GalleryModels from "../../models/galleryModels";
import GitRepository = GalleryModels.GitRepository;

import { SearchService } from "../../services/search.service";


@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
})



export class GalleryComponent implements OnInit {

    public searchResults: Array<GitRepository> = [];
    public query: string = "";
    public isSearching: boolean = false;
    public isNoResultsDisplay: boolean = false;

    constructor(private searchService: SearchService) { }

    ngOnInit() {
    }

    //search function, run query to github api using the search service
    public search(): void {
        //empty current results
        this.searchResults.length = 0;
        this.searchResults = [];
      
        //check if query is not empty
        if (this.query && this.query.length > 0) {

            //set display attributes   (diasble search controllers and display loader while serach is on going)
            this.isNoResultsDisplay = false;
            this.isSearching = true;


            this.searchService.search(this.query).subscribe(
                (data) => this.extractItems(data),
                err => this.handleError(err));
        }
    }

    //extract the data that was returned from github and store each item in project's GitReposiroty class 
    private extractItems(data: any): void {
        this.isSearching = false;
        if (data.items && data.items.length > 0) {
            data.items.forEach(item => {
                let avatar: string = "";
                let owner: string = "";
                if (item.owner) {
                    avatar = item.owner.avatar_url;
                    owner = item.owner.login;
                }
                //store data in project'class
                let newItem = new GitRepository(item.id, item.name, avatar, owner);
                this.searchResults.push(newItem);
            });
        } else {
            this.isNoResultsDisplay = true;
        }
    }

    private handleError(error: any): Promise<any> {
        //TODO: add message to user
        this.isSearching = false;
        return Promise.reject(error);
    }

    public keyDownFunction(event) {
        if (event.keyCode == 13) {
          this.search();
        }
    }

}
