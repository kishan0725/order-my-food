import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Input() public hotelSearch;

  @Output() searchQueryEvent = new EventEmitter();

  constructor() { }

  searchQuery = (query) => {
    this.searchQueryEvent.emit(query);
  }

  ngOnInit(): void {
  }

}
