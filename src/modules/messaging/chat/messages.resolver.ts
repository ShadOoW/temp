import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { MessageDto } from './dto/message.dto';
import { MessagesPageDto } from './dto/messages-page.dto';
import { MessagesPageOptionsDto } from './dto/messages-page-options.dto';

@Resolver(() => MessageDto)
export class MessagesResolver {
  constructor(private readonly chateService: ChatService) {}

  @Query(() => MessagesPageDto, { name: 'messages' })
  findAll(@Args() args: MessagesPageOptionsDto) {
    return this.chateService.findAll(args);
  }

  @Query(() => Int, { name: 'messagesCount' })
  messagesCount() {
    return this.chateService.count();
  }
}
