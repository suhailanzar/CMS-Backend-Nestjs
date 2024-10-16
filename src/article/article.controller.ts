import { Body, Controller, Get, Param, Post, UseGuards, Request, Put, Delete } from '@nestjs/common';
import { articleDto } from './article.dto';
import { ArticleService } from './article.service';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { log } from 'console';

@Controller('article')
export class ArticleController {

    constructor(private articleservice: ArticleService) { }

    @UseGuards(AuthorizationGuard)
    @Post('postArticle')
    async postArticle(@Body() articles: articleDto, @Request() req): Promise<{ message: string }> {
        const userId = req.user.userid // Retrieve the user ID from the request
        console.log('user id in the post article is ', userId);

        // Include userId in the article data
        const articleData = {
            ...articles,
            userid: userId, // Add userId to the article data
        };

        const result = await this.articleservice.postArticle(articleData);
        return { message: result };
    }

    @UseGuards(AuthorizationGuard) // Use the JWT guard
    @Get('getArticles') // No need for userid in the path
    async getArticles(@Request() req): Promise<articleDto[] | null> {
        const userId = req.user.userid; // Retrieve the user ID from the request
        const result = await this.articleservice.getArticles(userId);
        return result;
    }

    @UseGuards(AuthorizationGuard) // Use the JWT guard
    @Get('viewArticle/:articleId') // Define articleId as a path parameter
    async viewArticle(@Param('articleId') articleId: string): Promise<articleDto | null> {
        const result = await this.articleservice.viewArticle(articleId);
        console.log('result is', result);

        return result;
    }

    @UseGuards(AuthorizationGuard) // Use the JWT guard
    @Put('editArticle/:articleId') // Define articleId as a path parameter and use HTTP PUT method for updating
    async editArticle(
        @Param('articleId') articleId: string,
        @Body() articleData: articleDto
    ): Promise<articleDto | null> {

        const result = await this.articleservice.editArticle(articleId, articleData);
        console.log('Updated result is', result);

        return result;
    }

    @UseGuards(AuthorizationGuard) // Use JWT or any other guard for authorization
    @Delete('deleteArticle/:articleId') // Define articleId as a path parameter
    async deleteArticle(@Param('articleId') articleId: string): Promise<{ message: string }> {
        const result = await this.articleservice.deleteArticle(articleId);
        return { message: result };
    }



}
