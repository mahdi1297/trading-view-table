import { FC, ReactElement } from "react";

export type TableHead = {
  id: number;
  title: string;
  component?: FC;
  children?: ReactElement;
  modalClassName?: string;
};
