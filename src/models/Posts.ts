import { Schema, model, Document } from 'mongoose';
interface IPost {
	text: string;
	title: string;
}
const PostSchema = new Schema({
	text: String,
	title: String,
});
interface IPostModel extends IPost, Document {}

export const Post = model<IPostModel>('post', PostSchema);
