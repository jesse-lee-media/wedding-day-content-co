import type {
  CollectionAfterOperationHook,
  CollectionConfig,
  RelationshipFieldSingleValidation,
} from 'payload';
import { Resend } from 'resend';

import { env } from '@/env/server';
import { Role, hasRole } from '@/payload/access';
import { FormSubmissionEmailTemplate } from '@/payload/components/form-submission-email-template';
import type { PayloadFormCollection } from '@/payload/payload-types';

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
    await payload.findByID({
      collection: 'forms',
      id,
      req,
    });

    return true;
  } catch (error) {
    payload.logger.error(error);

    return errorMessage;
  }
};

const sendFormSubmissionEmail: CollectionAfterOperationHook<'form-submissions'> = async ({
  operation,
  req: { payload },
  req,
  result,
}) => {
  if (operation === 'create') {
    try {
      let form: PayloadFormCollection;

      if (typeof result.form === 'string' || typeof result.form === 'number') {
        form = await payload.findByID({
          collection: 'forms',
          id: result.form,
          req,
        });
      } else {
        form = result.form;
      }

      const resend = new Resend(env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: `Wedding Day Content Co. <${env.RESEND_FROM_ADDRESS_PAYLOAD}>`,
        to: env.RESEND_TO_ADDRESS_DEFAULT,
        subject: `New ${form.title} Submission`,
        react: FormSubmissionEmailTemplate({ data: result.data, form }),
      });

      if (error) {
        payload.logger.error(error);
      }
    } catch (error) {
      payload.logger.error(error);
    }
  }

  return result;
};

export const FormSubmissions: CollectionConfig<'form-submissions'> = {
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
  hooks: {
    afterOperation: [sendFormSubmissionEmail],
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
