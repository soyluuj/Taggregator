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
#### achievementModel
```
achievement {
    id: { type: String,  unique:true, default: () => uuidv4() },
    name: { type: String, required: true },
    description: { type: String, required: true },
    badgeIconUrl: { type: String, required: true },
    criteria: { type: String, required: true },
    exp: { type: Number, required: true }
}
```

#### articleModel
```
article {
    id: { type: String, unique: true, default: () => uuidv4() },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: String, required: true, trim: true },
    publishedDate: { type: Date, default: Date.now },
    tags: [{ type: String, trim: true }],
    isPublished: { type: Boolean, default: true }
}
```
#### bookmarkCollectionsModel
```
bookmarkCollection {
    id: { type: String, unique: true, default: () => uuidv4() },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    userId: { type: String, ref: 'User', required: true },
    isPublic: { type: Boolean, default: true },

    bookmarks: [{ type: String, ref: 'Bookmark' }] 
}
```
#### bookmarkModel
```
bookmark {
    id: { type: String, unique: true, default: () => uuidv4() },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    userId: { type: String, ref: 'User', required: true },
    isPublic: { type: Boolean, default: true },

    bookmarks: [{ type: String, ref: 'Bookmark' }] 
}
```
#### userAchievementModel
```
userAchievement {
    userId: { type: String, required: true },
    achievementId: { type: String, required: true },
    dateAchieved: { type: Date, default: Date.now }
}
```
#### userModel
```
user {
    id: { type: String,  unique:true, default: () => uuidv4() },
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    following: [{ type: String }], 
    followers: [{ type: String }],
    publicProfile: { type: Boolean, default: true }
}
```

### Controllers
#### achievementController
This controller submits information to achievementService to check the user's validity on receiving an achievement.

#### articleController
The article controller manages the home page, and the content served in it. It is connected to the articleService and can get all articles, get a single article, like, and create an article. It also fetches popular articles as a default configuration.

#### bookmarkController
A similar controller to the articleController, it facilitates the creation of personalized article lists, as well as serving popular bookmark lists from other accounts.

#### userController
Manages the authentication of the user.

### Services
#### achievementService
* achievementChecker()
* createAchievement()
* listAchievements()
#### articleService
* calculatePopularityScore()
* async getPopularArticles()
* async getAllArticles()
* getArticleById()
* getArticleByMongoId()
* createArticle()
* incrementViewCount()
* incrementLikeCount()
* updateArticle()
* deleteArticle()
* getArticlesByAuthor()
* searchArticles()
* initializeSampleData()
#### bookmarkService
* createBookmark()
* getUserBookmarks()
* searchBookmarks()
* getFollowedUsersBookmarks()
#### userService
* registerUser()
* authenticateUser()

### Routes
### Validators
