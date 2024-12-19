import { IsString, IsOptional } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  parentId?: string; // Optional parent ID for nested menus
}
