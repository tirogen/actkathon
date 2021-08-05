import { ApiProperty } from '@nestjs/swagger';
import { ToInt } from 'class-sanitizer';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export interface Pagination<T> {
  data: T[];
  itemCount;
  page: number;
  pageSize: number;
  totalCount: number;
  pageCount: number;
}

export class PaginationQuery {
  @ApiProperty({ required: false })
  @ToInt()
  @IsOptional()
  @Transform((value) => value && parseInt(value.value, 10))
  page = 1;

  @ApiProperty({ required: false })
  @ToInt()
  @IsOptional()
  @Transform((value) => value && parseInt(value.value, 10))
  pageSize = 8;
}
export function toPagination<T>(data: T[], totalCount: number, options: PaginationQuery): Pagination<T> {
  const pageCount = Math.ceil(totalCount / options.pageSize);
  return {
    data,
    itemCount: data.length,
    page: options.page,
    pageSize: options.pageSize,
    totalCount,
    pageCount,
  };
}
