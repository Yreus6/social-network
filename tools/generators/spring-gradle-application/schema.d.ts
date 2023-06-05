import { LanguageType, PackagingType } from '@jnxplus/nx-boot-gradle/src/utils/types';

export interface NxBootGradleAppGeneratorSchema {
  name: string;
  tags?: string;
  directory?: string;
  language: LanguageType;
  groupId: string;
  projectVersion: string;
  packaging: PackagingType;
  configFormat: '.properties' | '.yml';
}
