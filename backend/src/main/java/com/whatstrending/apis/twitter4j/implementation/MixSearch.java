package com.whatstrending.apis.twitter4j.implementation;

import com.whatstrending.apis.twitter4j.models.Tweet;
import twitter4j.*;

import java.util.*;
import java.util.stream.Collectors;

//this search mode is a list of a recent, popular and mixed searches
public class MixSearch implements SearchMode{
    @Override
    public List<Tweet> getTweetsFromApi(String trend, Twitter twitter) throws TwitterException {
        Query query = new Query(trend);
        query.count(100); //100 is the max allowed
        query.setLang("pt");
        query.resultType(Query.POPULAR);
        Set<Tweet> tweetSet = new LinkedHashSet<>(getTweets(query, twitter));

        query.resultType(Query.RECENT);
        query.count(15);
        tweetSet.addAll(getTweets(query, twitter));

        query.setLang("en");
        query.count(100);
        query.resultType(Query.POPULAR);
        tweetSet.addAll(getTweets(query, twitter));

        query.resultType(Query.RECENT);
        query.count(15);
        tweetSet.addAll(getTweets(query, twitter));

        List<Tweet> tweetList = new ArrayList<>(tweetSet);
        Collections.shuffle(tweetList);
        return tweetList;
    }


    private List<Tweet> getTweets(Query query,  Twitter twitter) throws TwitterException {
        return twitter.search(query).getTweets().stream()
                .filter(t -> !(t.isRetweet() && t.getQuotedStatus() == null))
                .sorted(Comparator.comparing(Status::getUser,
                        Comparator.comparing(User::getFollowersCount)).reversed())
                .map(Tweet::new)
                .collect(Collectors.toList());
    }
}
