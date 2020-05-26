import { server } from './app';
import { Badges } from './utils';

const PORT = 3333;

server.listen(PORT, () => {
  console.log(
    `\n${Badges.SUCCESS}Everything is ready!\n\nhttp://localhost:${PORT}`
  );
});
