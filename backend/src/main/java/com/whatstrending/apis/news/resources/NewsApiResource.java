package com.whatstrending.apis.news.resources;

import com.jzhangdeveloper.newsapi.models.Everything;
import com.jzhangdeveloper.newsapi.net.NewsAPIResponse;
import com.jzhangdeveloper.newsapi.params.EverythingParams;
import com.whatstrending.apis.news.configuration.NewsProperties;
import com.whatstrending.apis.news.configuration.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("news")
public class NewsApiResource {

    @Autowired
    private NewsProperties newsProperties;

    @RequestMapping("")
    public Everything getNews(@RequestParam String params) throws IOException, InterruptedException{

        LocalDateTime nowDate = LocalDateTime.now().minusHours(12L);
        String convertedDate = nowDate.toString();
        // = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(nowDate);
        NewsService newsService= new NewsService();
        Map<String, String> everythingParams = EverythingParams.newBuilder()
                .setLanguage("pt")
                .setFrom(convertedDate)
                .setSearchQuery(params).build();

        NewsAPIResponse response = newsService.createNewsAPIClient(newsProperties).getEverything(everythingParams);

        return response.getBody();
    }
}