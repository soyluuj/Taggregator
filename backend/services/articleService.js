const Article = require('../models/Article');

class ArticleService {
    calculatePopularityScore(article) {
        const viewsWeight = 0.6;
        const likesWeight = 0.3;
        const recencyWeight = 0.1;
        
        // (Articles from last 7 days get boost)
        const daysOld = (new Date() - article.publishedDate) / (1000 * 60 * 60 * 24);
        const recencyFactor = Math.max(0, (7 - daysOld)) / 7.0;
        
        return (article.viewCount * viewsWeight) + 
               (article.likeCount * likesWeight) + 
               (recencyFactor * recencyWeight * 100);
    }

    async getPopularArticles() {
        try {
            const articles = await Article.find({ isPublished: true }).exec();
            return articles.sort((a, b) => {
                return this.calculatePopularityScore(b) - this.calculatePopularityScore(a);
            });
        } catch (error) {
            throw new Error(`Failed to fetch popular articles: ${error.message}`);
        }
    }

    async getAllArticles() {
        try {
            return await Article.find({ isPublished: true })
                .sort({ publishedDate: -1 })
                .exec();
        } catch (error) {
            throw new Error(`Failed to fetch articles: ${error.message}`);
        }
    }

    async getArticleById(id) {
        try {
            return await Article.findOne({ id }).exec();
        } catch (error) {
            throw new Error(`Failed to fetch article: ${error.message}`);
        }
    }

    async getArticleByMongoId(_id) {
        try {
            return await Article.findById(_id).exec();
        } catch (error) {
            throw new Error(`Failed to fetch article: ${error.message}`);
        }
    }

    async createArticle(articleData) {
        try {
            const article = new Article(articleData);
            return await article.save();
        } catch (error) {
            throw new Error(`Failed to create article: ${error.message}`);
        }
    }

    async incrementViewCount(id) {
        try {
            return await Article.findOneAndUpdate(
                { id },
                { $inc: { viewCount: 1 } },
                { new: true } // Return updated document
            ).exec();
        } catch (error) {
            throw new Error(`Failed to increment view count: ${error.message}`);
        }
    }

    async incrementLikeCount(id) {
        try {
            return await Article.findOneAndUpdate(
                { id },
                { $inc: { likeCount: 1 } },
                { new: true }
            ).exec();
        } catch (error) {
            throw new Error(`Failed to increment like count: ${error.message}`);
        }
    }

    async updateArticle(id, updateData) {
        try {
            return await Article.findOneAndUpdate(
                { id },
                { ...updateData, updatedAt: new Date() },
                { new: true }
            ).exec();
        } catch (error) {
            throw new Error(`Failed to update article: ${error.message}`);
        }
    }

    async deleteArticle(id) {
        try {
            return await Article.findOneAndUpdate(
                { id },
                { isPublished: false, updatedAt: new Date() },
                { new: true }
            ).exec();
        } catch (error) {
            throw new Error(`Failed to delete article: ${error.message}`);
        }
    }

    async getArticlesByAuthor(author) {
        try {
            return await Article.find({ 
                author, 
                isPublished: true 
            }).sort({ publishedDate: -1 }).exec();
        } catch (error) {
            throw new Error(`Failed to fetch author articles: ${error.message}`);
        }
    }

    async searchArticles(query) {
        try {
            return await Article.find({
                isPublished: true,
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { content: { $regex: query, $options: 'i' } },
                    { tags: { $in: [new RegExp(query, 'i')] } }
                ]
            }).sort({ publishedDate: -1 }).exec();
        } catch (error) {
            throw new Error(`Failed to search articles: ${error.message}`);
        }
    }

    async initializeSampleData() {
        try {
            const count = await Article.countDocuments();
            if (count === 0) {
                const sampleArticles = [
                    {
                        title: 'Getting Started with Node.js and Express',
                        content: 'Node.js makes it easy to build scalable network applications. Combined with Express, you can create robust web servers quickly...',
                        author: 'John Doe',
                        tags: ['nodejs', 'express', 'backend']
                    },
                    {
                        title: 'Understanding MongoDB and Mongoose',
                        content: 'MongoDB is a NoSQL database that works well with Node.js. Mongoose provides a straightforward schema-based solution...',
                        author: 'Jane Smith',
                        tags: ['mongodb', 'mongoose', 'database']
                    },
                    {
                        title: 'Building RESTful APIs with Express',
                        content: 'REST APIs have become the standard for web services. Learn how to build clean, maintainable APIs with Express...',
                        author: 'Mike Johnson',
                        tags: ['rest', 'api', 'express']
                    }
                ];

                for (const articleData of sampleArticles) {
                    await this.createArticle(articleData);
                }
                console.log('Sample articles created successfully');
            }
        } catch (error) {
            console.error('Failed to initialize sample data:', error.message);
        }
    }
}

module.exports = new ArticleService();