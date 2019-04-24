import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BookSearch, BookInfo } from 'src/app/profile/user-library/book-models/BookInfo';
import { MapSearch, LatAndLng } from '../map-models/MapInfo';
import { MapService } from '../map-services/map.service';
import { BookService } from 'src/app/profile/user-library/book-services/books.service';
import { UserService } from 'src/app/profile/user-services/user.service';
import { UserID } from 'src/app/profile/user-models/UserInfo';

export let userLocation: LatAndLng[];
@Component({
  selector: 'app-find-book',
  templateUrl: './find-book.component.html',
  styleUrls: ['./find-book.component.scss']
})
export class FindBookComponent implements OnInit {
  @Input() public parentData;
  @Output() public searchResults = new EventEmitter;
  @Output() public userLocation: LatAndLng[];
  book: BookSearch = {
    title: '',
    authorName: ''
  };
  radius: number;

  userBooks: BookSearch[];
  searchOptions: string;
  userSearch: string;

  constructor(
    private bookService: BookService,
    private mapService: MapService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }
  // Returns book info, use id to find users
  async getBook() {
    if (this.searchOptions === 'title') {
      this.book.title = this.userSearch;
      this.book.authorName = '';
    } else {
      this.book.authorName = this.userSearch;
      this.book.title = '';
    }

    const books = await this.bookService.searchLibrary(this.book);
    return books;
  }

  async getUsers() {
    const userIDs = await this.getLocations();
    const results = [];
    console.log(userIDs);
    userIDs.forEach(async user => {
      const newLocation = await this.mapService.getUserLocation(user.ownedby);
      let isInResult = false;
      const locationObject = {
        lat: newLocation.data.lat,
        lng: newLocation.data.lng
      };
      if (results.length > 0) {
        results.forEach(result => {
          console.log(result);
          if (locationObject.lat === result.lat && locationObject.lng === result.lng) {
            isInResult = true;
          }
        });
      }
      if (!isInResult) {
        console.log('!isInResult' , results);
        results.push({
          lat: newLocation.data.lat,
          lng: newLocation.data.lng,
          alpha: 1
        });
      }

    });
    console.log('results', results);
    userLocation = results;
  }
  async getLocations() {
    const bookResults = await this.getBook();
    this.userBooks = bookResults.data;
    const users = await this.mapService.searchMapForBook(
      this.radius,
      this.userBooks
    );
    return users.data.users[0];
  }

  // async onSearch() {
  //   this.searchResults.emit(userLocation)
  // }

}
