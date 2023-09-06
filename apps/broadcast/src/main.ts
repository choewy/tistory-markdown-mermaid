import { Bootstrap } from './bootstrap';

const main = async () => {
  const bootstrap = await Bootstrap.define();
  await bootstrap.listen();
};

main();
