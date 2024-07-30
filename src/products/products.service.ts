import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import PRegisterDTO from "../../DTOs/Products/PRegisterDTO";
import {AuthService} from "../auth/auth.service";
import Product from "../../DTOs/Products/Product";

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService, private readonly auth: AuthService) {}

    async get(): Promise<Array<Product>> {
        return await this.prisma.products.findMany();
    }

    async register(data: PRegisterDTO, token: string): Promise<Product> {
        if (!this.auth.validate(token)) return null;
        return await this.prisma.products.create({ data });
    }

    async update(data: PRegisterDTO, id: number, token: string): Promise<Product> {
        if (!this.auth.validate(token)) return null;
        return await this.prisma.products.update({ where: { id }, data: data });
    }

    async delete(id: number, token: string): Promise<Product> {
        if (!this.auth.validate(token)) return null;
        return await this.prisma.products.delete({ where: { id } });
    }
}

