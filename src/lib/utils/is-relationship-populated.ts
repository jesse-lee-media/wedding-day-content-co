type MultiRelationship = {
  relationTo: unknown;
  value: unknown;
};

export const isRelationshipPopulated = <T extends MultiRelationship>(item: any): item is T =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  typeof item.value !== 'string';
