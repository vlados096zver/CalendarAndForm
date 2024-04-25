
export interface TableSettings {
  head: (TableHeadItem | null)[];
}

export interface TableHeadItem {
  title: string;
  maxWidth?: number;
  width?: number;
}

