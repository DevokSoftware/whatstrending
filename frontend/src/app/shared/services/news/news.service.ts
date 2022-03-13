import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { New } from '../../models/new';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews(params: string) {
    return this.http.get<New>("/api/news?params=" + params);
  }
}
