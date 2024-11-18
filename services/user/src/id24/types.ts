type Groups = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  subGroups: SubGroups[];
  notes: string;
};

type SubGroups = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type { Groups, SubGroups };
