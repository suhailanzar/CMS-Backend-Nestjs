import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationModule } from './authorization/authorization.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './article/article.module';




@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://suhailanz01:KKbNkmSmgJYhWBoW@cluster0.41triad.mongodb.net/cms?retryWrites=true&w=majority', {
    }),
    
    AuthorizationModule,
    ArticleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
