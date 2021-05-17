import { from } from "rxjs";
import { Tag } from "./tag";
import { User } from "./user";
import { Comment} from "./comment";

export class Post {
    id: number;
    title: string;
    content: string;
    create_at: Date;
    comments: Comment[];
    user: User;
    tag: Tag[];
}
