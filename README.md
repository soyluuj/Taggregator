# Taggregator: Gamified Learning Website

Taggregator is a website that makes learning fun, by collecting a diverse
variety of articles and implementing gamified systems to encourage users to keep
learning. The website requires an account to use its services, and provides all
users with levels and XP points, reading streaks, achievements, and statistics.
The articles offered to the users can have one or more tags, such as "Science",
"Technology", "Nature", and can be combined for a diverse organization of
articles.

## References
[Penpot Framework](https://design.penpot.app/#/view?file-id=458ded29-7ef8-80f7-8006-fb158cff05c3&page-id=458ded29-7ef8-80f7-8006-fb158cff05c4&section=interactions&index=0&share-id=458ded29-7ef8-80f7-8006-fb9dd02ed8f6)  
[Canva Slides](https://www.canva.com/design/DAG7LcHCv60/NtzBCqUzfhQF1b8xnA4XkQ/edit?utm_content=DAG7LcHCv60&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## Technology Used
Primary Language: JavaScript

Frontend: HTML/CSS/JS
Backend: Express
Database: MongoDB
Platform: Vercel

## API Documentation

### Overview
The Taggregator API serves as the bridge between the database and the website itself. It contains the middleware necessary to fetch data of the articles, users, and their bookmarks.

The technical stack is:
* Node and Express
* MongoDB
* Vercel

### Models
#### userModel
```
user {
    id: string,
    username: string,
    password: string,
    following: [string],
    followers: [string],
    public: boolean
}
```

### Controllers
#### achievementController
This controller submits information to achievementService to check the user's validity on receiving an achievement.

#### articleController
The article controller manages the home page, and the content served in it. It is connected to the articleService and can get all articles, get a single article, like, and create an article. It also fetches popular articles as a default configuration.

#### bookmarkController
A similar controller to the articleController, it facilitates the creation of personalized article lists, as well as serving popular bookmark lists from other accounts.

### Services
### Routes
### Validators
