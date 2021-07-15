import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { IsNotEmpty } from 'class-validator';
import { InjectModel } from 'nestjs-typegoose';
import { Post as PostSchema } from './post.model';

class CreatePostDto {
  @ApiProperty({ description: '帖子标题', example: '帖子标题1' })
  @IsNotEmpty({ message: '帖子标题为空' })
  title: string;
  @ApiProperty({ description: '帖子详情', example: '帖子详情1' })
  content: string;
}

@Controller('post')
@ApiTags('帖子')
export class PostController {
  constructor(
    @InjectModel(PostSchema) private readonly postModel: ModelType<PostSchema>,
  ) {}

  @Get()
  @ApiOperation({
    summary: '显示博客列表',
    description: '博客描述信息',
  })
  async index() {
    return await this.postModel.find();
  }

  @Post()
  @ApiOperation({ summary: '创建帖子' })
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postModel.create(createPostDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '博客详情' })
  async detail(@Param('id') id: string) {
    return await this.postModel.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑帖子' })
  async update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
    return await this.postModel.findByIdAndUpdate(id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除帖子' })
  async delete(@Param('id') id: string) {
    return await this.postModel.findByIdAndDelete(id);
  }
}
