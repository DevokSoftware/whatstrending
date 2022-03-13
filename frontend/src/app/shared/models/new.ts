export class New{
    totalResults: string;
    articles : Article[]
}

export class Article{
    title: string;
    description: string;
    content: string ; 
    source: Source;
    url: string;
    urlToImage: string;
    author: string
}

class Source {
    name : string
}