import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationModule } from './authorization/authorization.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './article/article.module';




@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/cms', {
    }),
    
    AuthorizationModule,
    ArticleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
