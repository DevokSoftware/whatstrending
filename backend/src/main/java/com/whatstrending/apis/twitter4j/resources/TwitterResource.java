package com.whatstrending.apis.twitter4j.resources;

import com.whatstrending.apis.twitter4j.configuration.TwitterProperties;
import com.whatstrending.apis.twitter4j.configuration.TwitterService;
import com.whatstrending.apis.twitter4j.implementation.MixSearch;
import com.whatstrending.apis.twitter4j.models.Tweet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import twitter4j.*;

import java.util.List;

@RestController
@RequestMapping("twitter")
@CrossOrigin(origins = "https://whatstrendingtoday.herokuapp.com/", maxAge = 3600)
public class TwitterResource {

    @Autowired
    private TwitterProperties twitterProperties;


    @GetMapping("/trends")
    public Trend[] getTrends() {
        System.out.println("Getting list of trends.");
        Trend[] trendsArray = null;
        TwitterService ts = new TwitterService();

        try {
            TwitterFactory tf = new TwitterFactory(ts.configurationBuilder(twitterProperties).build());
            Twitter twitter = tf.getInstance();
            //ResponseList<Location> locations;
            //locations = twitter.getAvailableTrends();
            // System.out.println(location.getName() + " (woeid:" + location.getWoeid() + ")");
            //PT - 23424925

            Trends trends = twitter.getPlaceTrends(23424925);
            trendsArray = trends.getTrends();

        } catch (TwitterException te) {
            System.out.println(te.getMessage());
        }


        return trendsArray;
    }

    @GetMapping("/tweets")
    public List<Tweet> getTweets(@RequestParam(name = "trend") String trend) throws TwitterException {
        System.out.printf("Getting tweets for trend '%s'.\n", trend);
        TwitterService ts = new TwitterService();
        TwitterFactory tf = new TwitterFactory(ts.configurationBuilder(twitterProperties).build());
        Twitter twitter = tf.getInstance();
        MixSearch mixSearch = new MixSearch();
        return mixSearch.getTweetsFromApi(trend,twitter);
    }
}
