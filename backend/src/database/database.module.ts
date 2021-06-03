import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { getConnectionOptions } from 'typeorm';

@Module({
    imports: [TypeOrmModule.forRootAsync({
        useFactory: async () =>
          Object.assign(await getConnectionOptions(), {
            autoLoadEntities: true,
          }),
      }),]
})
export class DatabaseModule {}
