import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CentersModule } from './centers/centers.module';
import { Center } from './centers/entities/center.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER || 'efalcon',
      password: process.env.DB_PASS || 'efalcon123',
      database: process.env.DB_NAME || 'efalcon_db',
      entities: [Center],
      synchronize: true, // Auto-create tables (for development only)
      logging: false,
    }),
    CentersModule,
  ],
})
export class AppModule {}
