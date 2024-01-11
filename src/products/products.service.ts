/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Prisma } from '@prisma/client';
import { ConnectionArgs } from '../page/connection-args.dto'
@Injectable()
export class ProductsService {

  constructor(private prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({ data: createProductDto });
  }

  findAll() {
    return this.prisma.product.findMany({
      where: {
        published: true,
      },
    });
  }

async findPage(connectionArguments: ConnectionArgs) {
    const where: Prisma.ProductWhereInput = {
      published: true,
    };
    return findManyCursorConnection(
      (args: any) =>
        this.prisma.product.findMany({
          ...args, // 👈 apply paging arguments
          where: where,
        }),
      () => this.prisma.product.count({
          where: where, // 👈 apply paging arguments
        }),
      connectionArguments,
    );
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id: id },
      data: updateProductDto,
    });
  }

  remove(id: string) {
    return this.prisma.product.delete({
      where: {
        id: id,
      },
    });
  }

  findDrafts() {
    return this.prisma.product.findMany({ where: { published: false } });
  }
}
