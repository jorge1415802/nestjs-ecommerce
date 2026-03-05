import { Injectable } from '@nestjs/common';
import type { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { dataSourceOptions } from 'src/database/typeorm/typeOrm.config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return dataSourceOptions;
  }
}
