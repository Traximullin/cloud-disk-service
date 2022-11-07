import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/*

  Описываю модель данных, как они будут выглядеть в БД 
  email: string
  password: string

*/

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  
  @Prop()
  email: string;

  @Prop()
  password: string;

}

export const UsersSchema = SchemaFactory.createForClass(Users);
