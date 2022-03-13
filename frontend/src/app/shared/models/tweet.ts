import { MediaEntity } from "./mediaEntity";
import { User } from "./user";



export class Tweet{
    id: string;
    text: string;
    favoriteCount: number;
    retweetCount: number;
    createdAt: Date;
    lang: string;
    user: User;
    mediaEntities: MediaEntity[];
}