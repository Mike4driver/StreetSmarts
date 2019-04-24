import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BookService } from './user-library/book-services/books.service';
import Axios from 'axios';
import { BookInfo } from './user-library/book-models/BookInfo';
import { userBooks } from './user-library/add-book/add-book.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Output() newBook: EventEmitter<any> = new EventEmitter();
  userBooks: BookInfo[]
  title: string;

  constructor(private bookService: BookService) { }

  async ngOnInit() {
    let res = await this.bookService.getUserLibrary()
    console.log(res);
    this.userBooks = res.data
  }
  async onSubmit() {
    let res = await this.bookService.getUserLibrary()
    console.log(res);
    this.userBooks = res.data
  }

  async deleteBook(book: BookInfo) {
    console.log(book.id)
    await this.bookService.deleteBook(book)
    this.userBooks = this.userBooks.filter(b => b.id !== book.id)
  }
}
