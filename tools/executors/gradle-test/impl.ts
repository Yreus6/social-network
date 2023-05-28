import { ExecutorContext, logger } from '@nrwl/devkit';
import { getExecutable, getProjectPath, runCommand } from '@jnxplus/nx-boot-gradle/src/utils/command';
import { TestExecutorSchema } from '@jnxplus/nx-boot-gradle/src/executors/test/schema';

export default async function runExecutor(
  options: TestExecutorSchema,
  context: ExecutorContext
) {
  logger.info(`Executor ran for Test: ${JSON.stringify(options)}`);
  return runCommand(`${getExecutable()} ${getProjectPath(context)}:test ${getProjectPath(context)}:integrationTest`);
}
