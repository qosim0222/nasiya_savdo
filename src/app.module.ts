import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { ContractModule } from './contract/contract.module';
import { ReturnModule } from './return/return.module';
import { DebtModule } from './debt/debt.module';
import { PaymentModule } from './payment/payment.module';
import { SalaryModule } from './salary/salary.module';
import { BuyModule } from './buy/buy.module';
import { PrismaModule } from './prisma/prisma.module';
import { PartnersModule } from './partners/partners.module';

@Module({
  imports: [UserModule,  ProductModule, CategoryModule, ContractModule, ReturnModule, DebtModule, PaymentModule, SalaryModule, BuyModule, PrismaModule, PartnersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
