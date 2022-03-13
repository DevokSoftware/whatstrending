package com.whatstrending.apis.twitter4j.implementation;

import com.whatstrending.apis.twitter4j.models.Tweet;
import twitter4j.Twitter;
import twitter4j.TwitterException;

import java.util.List;
import java.util.Set;

public interface SearchMode {
    List<Tweet> getTweetsFromApi(String trend, Twitter twitter) throws TwitterException;
}
