import 'dotenv/config';

import { DataSource, DataSourceOptions } from 'typeorm';

import { EzbarKREntityConfig } from './config';

const main = async () => {
  new DataSource(EzbarKREntityConfig.of('EZBAR_KR_ENTITY').getOptions() as DataSourceOptions).initialize();
};

main();
