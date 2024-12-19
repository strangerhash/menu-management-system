import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MenuServiceService } from '../menu-service/menu-service.service';
import { CreateMenuDto } from '../dto/create-menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuServiceService) {}

  @Post()
  async create(@Body() createMenuDto: CreateMenuDto, @Param('parentId') parentId?: string) {
    // createMenuDto, parentId
    return this.menuService.createMenu(createMenuDto,parentId);
  }

  @Get()
  async getAll() {
    return this.menuService.getMenus();
  }

  @Get(':parentId')
  async getByParent(@Param('parentId') parentId: string) {
    return this.menuService.getMenus(parentId);
  }
}
