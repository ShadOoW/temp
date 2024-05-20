import { Stream } from 'stream';

export enum FileStatus {
  created = 'created',
  updated = 'updated',
  deleted = 'deleted',
  shared = 'shared',
}

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

