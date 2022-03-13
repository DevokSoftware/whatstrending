import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trend } from '../../models/trend';
import { Tweet } from '../../models/tweet';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrendService {
  constructor(private http: HttpClient) { }

  getTrends() {
    return this.http.get<Trend[]>("/api/twitter/trends");
  }

  getTweets(trend: string) {
    return this.http.get<Tweet[]>("/api/twitter/tweets?trend=" + trend);
  }

  encodeString(value: any) {

  }
}
