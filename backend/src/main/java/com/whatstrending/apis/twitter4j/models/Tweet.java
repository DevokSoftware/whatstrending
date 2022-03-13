package com.whatstrending.apis.twitter4j.models;

import twitter4j.*;

import java.util.Date;
import java.util.Objects;

public class Tweet {
    private Date createdAt;
    private String id;
    private String text;
    private int favoriteCount;
    private long retweetCount;
    private String lang;
    private MediaEntity[] mediaEntities;

    private User user = null;


    public Tweet(){}

    public Tweet(Status status) {
        this.setId(Long.toString(status.getId()));
        this.setRetweetCount(status.getRetweetCount());
        this.setFavoriteCount(status.getFavoriteCount());
        this.setText(status.getText());
        this.setMediaEntities(status.getMediaEntities());
        this.setCreatedAt(status.getCreatedAt());
        this.setLang(status.getLang());
        this.setUser(status.getUser());
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setFavoriteCount(int favoriteCount) {
        this.favoriteCount = favoriteCount;
    }


    public void setRetweetCount(long retweetCount) {
        this.retweetCount = retweetCount;
    }

    public void setLang(String lang) {
        this.lang = lang;
    }


    public void setMediaEntities(MediaEntity[] mediaEntities) {
        this.mediaEntities = mediaEntities;
    }


    public void setUser(User user) {
        this.user = user;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public String getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public int getFavoriteCount() {
        return favoriteCount;
    }

    public long getRetweetCount() {
        return retweetCount;
    }

    public String getLang() {
        return lang;
    }

    public MediaEntity[] getMediaEntities() {
        return mediaEntities;
    }

    public User getUser() {
        return user;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Tweet) {
            Tweet tweet = (Tweet) obj;
            return this.getId().equals(tweet.getId());
        }else{
            return false;
        }
    }
    @Override
    public int hashCode() {
        return Objects.hash(this.getId());
    }
}
