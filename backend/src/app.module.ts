import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuController } from './menu/menu.controller';
import { MenuServiceService } from './menu-service/menu-service.service';
import { PrismaService } from 'prisma/prisma-service';

@Module({
  imports: [],
  controllers: [AppController, MenuController],
  providers: [AppService, MenuServiceService,PrismaService],
})
export class AppModule {}
