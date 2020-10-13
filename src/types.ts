import { Db } from 'mongodb';
import { ReactNode } from 'react';

export type WithChildren = {
  children: ReactNode;
};

export type WithDb = {
  db: Db;
};
