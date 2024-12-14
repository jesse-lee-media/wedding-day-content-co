import type { CollectionConfig, RelationshipFieldSingleValidation } from 'payload';

import { Role, hasRole } from '@/payload/access';

const formRelationshipValidation: RelationshipFieldSingleValidation = async (
  value,
  { req: { payload }, req },
) => {
  if (!payload || !value) {
    return true;
  }

  const errorMessage = 'Form does not exist.';

  try {
    const id = typeof value === 'string' || typeof value === 'number' ? value : value.value;
    const form = await payload.findByID({
      id,
      collection: 'forms',
      req,
    });

    return !!form || errorMessage;
  } catch (error) {
    payload.logger.error(error);

    return errorMessage;
  }
};

export const FormSubmissions: CollectionConfig<'forms'> = {
  slug: 'form-submissions',
  typescript: {
    interface: 'PayloadFormSubmissionCollection',
  },
  access: {
    create: () => true,
    read: hasRole(Role.Admin, Role.Editor),
    update: () => false,
    delete: hasRole(Role.Admin),
  },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      admin: {
        readOnly: true,
      },
      validate: formRelationshipValidation,
    },
    {
      name: 'data',
      type: 'array',
      admin: {
        readOnly: true,
        components: {
          RowLabel: {
            path: '@/payload/components/row-label.tsx',
            exportName: 'RowLabel',
            clientProps: {
              path: 'label',
              fallback: 'Datum',
            },
          },
        },
      },
      required: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            readOnly: true,
          },
        },
      ],
    },
  ],
};
