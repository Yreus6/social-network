import { LanguageType } from '@jnxplus/nx-boot-gradle/src/utils/types';

export interface NxBootGradleLibGeneratorSchema {
  name: string;
  tags?: string;
  directory?: string;
  language: LanguageType;
  groupId: string;
  projectVersion: string;
  projects?: string;
}
