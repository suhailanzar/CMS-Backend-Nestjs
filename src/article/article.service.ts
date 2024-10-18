import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ArticleDocument, Article } from 'model/articleModel';
import { Model, ObjectId, Types } from 'mongoose';
import { signUpDto } from 'src/authorization/auth.dto';
import { articleDto } from './article.dto';
import { title } from 'process';
import { exec } from 'child_process';
import { find, map } from 'rxjs';

@Injectable()
export class ArticleService {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) { }

async postArticle(articleData: articleDto): Promise<string> {
  // Check for required fields
  if (!articleData.title || !articleData.content ) {
    throw new BadRequestException('Title, content, and user ID are required.');
  }

  try {
    // Create a new article with the provided data
    const newArticle = new this.articleModel({
      ...articleData,
      date: articleData.date || new Date(),
      userid: articleData.userid, // Ensure to include userid
    });

    // Save the article to the database
    await newArticle.save();
    return 'Article created successfully';
  } catch (error) {
    throw new BadRequestException(`Failed to create article: ${error.message}`);
  }
}

async getArticles(userid: string): Promise<articleDto[] | null> {
  try {
    
    // Find articles by userid, converting userid to ObjectId
    const articles = await this.articleModel.find({userid:userid})
    

    // Check if articles were found
    if (!articles || articles.length === 0) {
      return null;
    }

    // Return the articles mapped to the DTO format
    return articles.map(article => ({
      articleId: article._id as Types.ObjectId, // Explicitly cast _id to Types.ObjectId
      title: article.title,
      content: article.content,
      date: article.date,
      userid: article.userid // This assumes article.userid is stored as Types.ObjectId in the database
    }));
  } catch (error) {
    throw new Error(`Error fetching articles: ${error.message}`);
  }
}

async viewArticle(articleId: string): Promise<articleDto> {
  const articles = await this.articleModel.findOne({ _id:articleId }).exec(); // Adjust the field name if necessary

  return articles

}

async editArticle(articleId: string, articleData: articleDto): Promise<articleDto> {
  const updatedArticle = await this.articleModel.findByIdAndUpdate(
    { _id: articleId }, 
    articleData, 
    { new: true } // Return the updated document
  ).exec();

  if (!updatedArticle) {
    throw new NotFoundException('Article not found');
  }

  return updatedArticle;
}


async deleteArticle(articleId: string): Promise<string> {
  const deletedArticle = await this.articleModel.findByIdAndDelete(articleId);

  if (!deletedArticle) {
    throw new NotFoundException(`Article with ID ${articleId} not found`);
  }

  return `Article with ID ${articleId} successfully deleted`;
}


}
