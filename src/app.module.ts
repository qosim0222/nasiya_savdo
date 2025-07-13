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
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';
import { EskizService } from './eskiz/eskiz.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ ConfigModule.forRoot({isGlobal:true}),
     UserModule,  ProductModule, CategoryModule, ContractModule, ReturnModule, DebtModule, PaymentModule, SalaryModule, BuyModule, PrismaModule, PartnersModule, UploadModule, AuthModule,
    ServeStaticModule.forRoot({
      rootPath:join(__dirname, '..', "uploads"),
      serveRoot:'/uploads'
    })
  ],
  controllers: [AppController],
  providers: [AppService, EskizService],
})
export class AppModule {}
