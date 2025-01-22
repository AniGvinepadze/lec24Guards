import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  private posts = [
    { id: 1, title: 'post 1', content: 'content1' },
    { id: 2, title: 'post 2', content: 'content2' },
    { id: 3, title: 'post 3', content: 'content3' },
    { id: 4, title: 'post 4', content: 'content4' },
    { id: 5, title: 'post 5', content: 'content5' },
  ];
  create(createPostDto: CreatePostDto) {
    const { title, content } = createPostDto;
    const lastId = this.posts[this.posts.length - 1]?.id || 0;
    const newPost = {
      id: lastId + 1,
      content,
      title,
    };
    this.posts.push(newPost);

    return newPost;
  }

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    const post = this.posts.find((el) => el.id === id);
    if (!post) throw new NotFoundException('post not found ');
    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    const index = this.posts.findIndex((el) => el.id === id);
    if (index === -1) throw new BadRequestException('post coundnot found');
    const { content, title } = updatePostDto;
    const updaterequest: { content?: string; title?: string } = {};
    if (content) updaterequest.content = content;
    if (title) updaterequest.title = title;

    this.posts[index] = {
      ...this.posts[index],
      ...updaterequest,
    };
    return this.posts[index];
  }

  remove(id: number) {
    const index = this.posts.findIndex((el) => el.id === id);
    if (index === -1) throw new BadRequestException('post coundnot found');
    const deletedPost = this.posts.splice(index, 1);
    return deletedPost;
  }
}

// addmin has all permitions
// editor has all permitions exeptsn fro delete
// viewer has only get