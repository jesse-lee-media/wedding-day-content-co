import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "form_submissions_data" ADD COLUMN "block_type" varchar NOT NULL;
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_text_label_idx" ON "forms_blocks_text" USING btree ("label");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_text_name_idx" ON "forms_blocks_text" USING btree ("name");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_textarea_label_idx" ON "forms_blocks_textarea" USING btree ("label");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_textarea_name_idx" ON "forms_blocks_textarea" USING btree ("name");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_date_label_idx" ON "forms_blocks_date" USING btree ("label");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_date_name_idx" ON "forms_blocks_date" USING btree ("name");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_select_options_label_idx" ON "forms_blocks_select_options" USING btree ("label");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_select_options_value_idx" ON "forms_blocks_select_options" USING btree ("value");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_select_label_idx" ON "forms_blocks_select" USING btree ("label");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_select_name_idx" ON "forms_blocks_select" USING btree ("name");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_radio_options_label_idx" ON "forms_blocks_radio_options" USING btree ("label");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_radio_options_value_idx" ON "forms_blocks_radio_options" USING btree ("value");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_radio_label_idx" ON "forms_blocks_radio" USING btree ("label");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_radio_name_idx" ON "forms_blocks_radio" USING btree ("name");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_email_label_idx" ON "forms_blocks_email" USING btree ("label");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_email_name_idx" ON "forms_blocks_email" USING btree ("name");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_phone_number_label_idx" ON "forms_blocks_phone_number" USING btree ("label");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_phone_number_name_idx" ON "forms_blocks_phone_number" USING btree ("name");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_text_label_idx" ON "_forms_v_blocks_text" USING btree ("label");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_text_name_idx" ON "_forms_v_blocks_text" USING btree ("name");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_textarea_label_idx" ON "_forms_v_blocks_textarea" USING btree ("label");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_textarea_name_idx" ON "_forms_v_blocks_textarea" USING btree ("name");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_date_label_idx" ON "_forms_v_blocks_date" USING btree ("label");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_date_name_idx" ON "_forms_v_blocks_date" USING btree ("name");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_select_options_label_idx" ON "_forms_v_blocks_select_options" USING btree ("label");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_select_options_value_idx" ON "_forms_v_blocks_select_options" USING btree ("value");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_select_label_idx" ON "_forms_v_blocks_select" USING btree ("label");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_select_name_idx" ON "_forms_v_blocks_select" USING btree ("name");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_radio_options_label_idx" ON "_forms_v_blocks_radio_options" USING btree ("label");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_radio_options_value_idx" ON "_forms_v_blocks_radio_options" USING btree ("value");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_radio_label_idx" ON "_forms_v_blocks_radio" USING btree ("label");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_radio_name_idx" ON "_forms_v_blocks_radio" USING btree ("name");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_email_label_idx" ON "_forms_v_blocks_email" USING btree ("label");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_email_name_idx" ON "_forms_v_blocks_email" USING btree ("name");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_phone_number_label_idx" ON "_forms_v_blocks_phone_number" USING btree ("label");
  CREATE INDEX IF NOT EXISTS "_forms_v_blocks_phone_number_name_idx" ON "_forms_v_blocks_phone_number" USING btree ("name");
  ALTER TABLE "form_submissions_data" DROP COLUMN IF EXISTS "name";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "forms_blocks_text_label_idx";
  DROP INDEX IF EXISTS "forms_blocks_text_name_idx";
  DROP INDEX IF EXISTS "forms_blocks_textarea_label_idx";
  DROP INDEX IF EXISTS "forms_blocks_textarea_name_idx";
  DROP INDEX IF EXISTS "forms_blocks_date_label_idx";
  DROP INDEX IF EXISTS "forms_blocks_date_name_idx";
  DROP INDEX IF EXISTS "forms_blocks_select_options_label_idx";
  DROP INDEX IF EXISTS "forms_blocks_select_options_value_idx";
  DROP INDEX IF EXISTS "forms_blocks_select_label_idx";
  DROP INDEX IF EXISTS "forms_blocks_select_name_idx";
  DROP INDEX IF EXISTS "forms_blocks_radio_options_label_idx";
  DROP INDEX IF EXISTS "forms_blocks_radio_options_value_idx";
  DROP INDEX IF EXISTS "forms_blocks_radio_label_idx";
  DROP INDEX IF EXISTS "forms_blocks_radio_name_idx";
  DROP INDEX IF EXISTS "forms_blocks_email_label_idx";
  DROP INDEX IF EXISTS "forms_blocks_email_name_idx";
  DROP INDEX IF EXISTS "forms_blocks_phone_number_label_idx";
  DROP INDEX IF EXISTS "forms_blocks_phone_number_name_idx";
  DROP INDEX IF EXISTS "_forms_v_blocks_text_label_idx";
  DROP INDEX IF EXISTS "_forms_v_blocks_text_name_idx";
  DROP INDEX IF EXISTS "_forms_v_blocks_textarea_label_idx";
  DROP INDEX IF EXISTS "_forms_v_blocks_textarea_name_idx";
  DROP INDEX IF EXISTS "_forms_v_blocks_date_label_idx";
  DROP INDEX IF EXISTS "_forms_v_blocks_date_name_idx";
  DROP INDEX IF EXISTS "_forms_v_blocks_select_options_label_idx";
  DROP INDEX IF EXISTS "_forms_v_blocks_select_options_value_idx";
  DROP INDEX IF EXISTS "_forms_v_blocks_select_label_idx";
  DROP INDEX IF EXISTS "_forms_v_blocks_select_name_idx";
  DROP INDEX IF EXISTS "_forms_v_blocks_radio_options_label_idx";
  DROP INDEX IF EXISTS "_forms_v_blocks_radio_options_value_idx";
  DROP INDEX IF EXISTS "_forms_v_blocks_radio_label_idx";
  DROP INDEX IF EXISTS "_forms_v_blocks_radio_name_idx";
  DROP INDEX IF EXISTS "_forms_v_blocks_email_label_idx";
  DROP INDEX IF EXISTS "_forms_v_blocks_email_name_idx";
  DROP INDEX IF EXISTS "_forms_v_blocks_phone_number_label_idx";
  DROP INDEX IF EXISTS "_forms_v_blocks_phone_number_name_idx";
  ALTER TABLE "form_submissions_data" ADD COLUMN "name" varchar NOT NULL;
  ALTER TABLE "form_submissions_data" DROP COLUMN IF EXISTS "block_type";`)
}
