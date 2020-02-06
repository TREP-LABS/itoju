import app from './config/app';
import vars from './config/vars';
import { log } from './api/utils/logger';

export default app.listen(vars.port, () => {
  log.info(`App listening on port ${vars.port}`);
});
