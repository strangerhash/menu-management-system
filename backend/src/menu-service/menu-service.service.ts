import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma-service';
import { CreateMenuDto } from '../dto/create-menu.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MenuServiceService {
  private readonly filePath = path.join(process.cwd(), 'menu-data.json');


  constructor(private prisma: PrismaService) {}
  async createMenu(createMenuDto: CreateMenuDto, parentId?: string) {
    console.log("File path:", this.filePath);
    console.log("parentId",parentId)
    parentId = createMenuDto.parentId || null;
    // Load existing data from the JSON file
    let menus = [];
    if (fs.existsSync(this.filePath)) {
      const fileData = fs.readFileSync(this.filePath, 'utf8');
      if(fileData.length > 0)
      menus = JSON.parse(fileData);
    }
  
    const newMenu = {
      id: this.generateRandomIdWithDashes(), // Generate a unique ID
      name: createMenuDto.name,
      parentId: createMenuDto.parentId || null,
      children: [],
    };
  
    if (!parentId) {
      // Root-level menu
      menus.push(newMenu);
    } else {
      // Add to parent as a child
      const parentFound = this.addChildToParent(menus, parentId, newMenu);
      if (!parentFound) {
        throw new Error(`Parent menu with ID ${parentId} not found.`);
      }
    }
  
    // Save updated data back to the JSON file
    console.log("Updated menu structure:", JSON.stringify(menus, null, 2));
    fs.writeFileSync(this.filePath, JSON.stringify(menus, null, 2));
  
    return { data: newMenu };
  }


  private generateRandomIdWithDashes() {
    const randomId = Array.from({ length: 32 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    return `${randomId.slice(0, 8)}-${randomId.slice(8, 12)}-${randomId.slice(12, 16)}-${randomId.slice(16, 20)}-${randomId.slice(20)}`;
  }
  
  
  
  private addChildToParent(menus: any[], parentId: string, newMenu: any): boolean {
    for (const menu of menus) {
      if (menu.id == parentId) {
        // Parent found, add the new menu as its child
        console.log(`Parent found: ${menu.name}`);
        menu.children.push(newMenu);
        return true;
      }
      if (menu.children && menu.children.length > 0) {
        // Recursively check children
        if (this.addChildToParent(menu.children, parentId, newMenu)) {
          return true;
        }
      }
    }
    return false;
  }
  

  async getMenus(parentId?: string) {
    let menus = [];
    if (fs.existsSync(this.filePath)) {
      const fileData = fs.readFileSync(this.filePath, 'utf8');
      if(fileData.length > 0)
      menus = JSON.parse(fileData);
    }
  //   return this.prisma.menu.findMany({
  //     where: {
  //       parentId,
  //     },
  //     include: {
  //       children: true, // Include nested menus
  //     },
  //   });

  return ({
   "data":menus
  })
  }
}
