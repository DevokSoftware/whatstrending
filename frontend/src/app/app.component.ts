import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpStatusService } from './shared/http-status.service';
import { Article, New } from './shared/models/new';
import { Trend } from './shared/models/trend';
import { Tweet } from './shared/models/tweet';
import { NewsService } from './shared/services/news/news.service';
import { TrendService } from './shared/services/trends/trend.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers


})
export class AppComponent {
  title = 'frontend';
  images = ["https://picsum.photos/id/700/900/500", "https://picsum.photos/id/553/900/500", "https://picsum.photos/id/883/900/500", "https://picsum.photos/id/124/900/500"];

  constructor(private trendService: TrendService, private newsService: NewsService, private httpStatusService: HttpStatusService, config: NgbCarouselConfig) {
    config.interval = -1;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit() {
    this.getTrends();
  }

  displayedColumns = ['position', 'name', 'tweetVolume'];
  public dataSource = new MatTableDataSource<Trend>();

  trends: Trend[] = [];
  tweets: Tweet[] = [];
  articles: Article[] = [];
  article: Article;
  tweetIndex: number = 0;
  articleIndex: number = 0;
  selectedApp = 'twitter';
  selectedTrend;
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  loading$ = this.httpStatusService.loading$;
  arcticleLeftArrow: boolean = true;
  arcticleRightArrow: boolean = true;

  getTrends() {
    this.trendService.getTrends().subscribe(
      data => {
        this.dataSource.data = data
        if (data.length > 0) {
          this.getTrendInfo(data[0].name)
        }
      });
  }

  getTweets(trend: string) {
    this.trendService.getTweets(trend).subscribe(
      data => {
        this.tweets = data
        //        console.log(data)
        for (let i = 0; i < data.length; i++) {
          if (this.tweets.length > 0) {
            this.tweetIndex = 0;
            this.checkForHashtagAndAt(this.tweets[i])
          }
        }
      });
  }
  getNews(trend: string) {
    this.newsService.getNews(trend).subscribe(
      data => {
        this.articles = data.articles;
        for (let i = 0; i < this.articles.length; i++) {
          if (this.articles.length > 0) {
            this.article = this.articles[0]
            this.arcticleLeftArrow = false;
            if (this.articles.length == 1) {
              this.arcticleLeftArrow = false;
            }
          }
        }
      });
  }


  getTrendInfo(trend: string) {
    this.selectedTrend = trend;
    this.cleanData();
    this.getTweets(trend)
    this.getNews(trend)
  }


  nextArticle() {
    if (this.articleIndex + 1 < this.articles.length) {

      if (this.articleIndex + 2 < this.articles.length) {
        this.arcticleRightArrow = true;
      } else {
        this.arcticleRightArrow = false;
      }
      this.articleIndex++;
      this.article = this.articles[this.articleIndex];
      this.arcticleLeftArrow = true;
    }
  }

  previousArticle() {
    if (this.articleIndex - 1 >= 0) {
      if (this.articleIndex - 2 >= 0) {
        this.arcticleLeftArrow = true;
      } else {
        this.arcticleLeftArrow = false;
      }
      this.articleIndex--;
      this.article = this.articles[this.articleIndex];
      this.arcticleRightArrow = true;
    }
  }


  openTweet(tweet: any) {
    let url = 'https://twitter.com/' + tweet.user.screenName + '/status/' + tweet.id
    window.open(url, "_blank");
  }

  selectApp(app: string) {
    this.selectedApp = app
  }

  cleanData() {
    this.tweets = []
    this.articles = []
    this.article = null;
  }

  checkForHashtagAndAt(tweet: Tweet) {
    let words = tweet.text.split(/\s+/);
    let finalText;
    for (var i = 0; i < words.length; i++) {
      if (words[i].charAt(0) == "#") {
        words[i] = "<span class=\"hashtag\">" + words[i] + "</span>";
      }

      if (words[i].charAt(0) == "@") {
        words[i] = "<span class=\"at\">" + words[i] + "</span>";
      }
      if (words[i].startsWith("https://t.co")) {
        words[i] = "";
      }
      if (i == 0) {
        finalText = words[i]
      } else {
        finalText = finalText + " " + words[i]
      }
    }
    tweet.text = finalText;
  }

  openArticle() {

  }
}

