import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './lib/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { VendorModule } from './modules/vendor/vendor.module';
import { CertModule } from './modules/sustainability-cert/cert.module';
import { RentalSpaceModule } from './modules/rental-space/rental-space.module';
import { ProduceModule } from './modules/produce/produce.module';
import { CommunityModule } from './modules/community/community.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    VendorModule,
    CertModule,
    RentalSpaceModule,
    ProduceModule,
    CommunityModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
