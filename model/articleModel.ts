import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop({ type: Types.ObjectId, ref: 'User'})
  userid: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  date: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
