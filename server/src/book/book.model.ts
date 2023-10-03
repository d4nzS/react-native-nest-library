import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  imagePath: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);

BookSchema.set('toJSON', {
  transform:
    (doc, ret) => {
      ret.id = ret._id;

      delete ret._id;
      delete ret.__v;
    }
});
