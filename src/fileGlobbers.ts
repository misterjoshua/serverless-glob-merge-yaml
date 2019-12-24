import glob from 'glob';

export type FileGlobber = (pathGlob: string) => Promise<string[]>;

export const globModuleGlobber: FileGlobber = async pathGlob =>
  glob.sync(pathGlob);
