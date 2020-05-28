import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-lyrics',
  templateUrl: './lyrics.component.html',
  styleUrls: ['./lyrics.component.scss']
})
export class LyricsComponent implements OnInit {
  artistSearch: string = "";
  songSearch: string = "";
  title: string = "";
  lyrics: string;
  isLoading: boolean = false;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }
  getLyrics() {
    this.isLoading = true;
    var requestUri = 'https://api.lyrics.ovh/v1/' + this.artistSearch + '/' + this.songSearch;
    this.http.get(requestUri).subscribe((res: any) => {
      this.lyrics = res.lyrics;
      this.title = this.artistSearch + " - " + this.songSearch;
      this.isLoading = false;
    }, err => {
      this.lyrics = 'Could not find the song';
      this.title = "";
      this.isLoading = false;
    });
  }
  onSearch() {
    this.getLyrics();
  }
}
