import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" ALTER COLUMN "display_original" DROP NOT NULL;
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_title_idx" ON "forms" USING btree ("title");
  CREATE INDEX IF NOT EXISTS "_forms_v_version_version_title_idx" ON "_forms_v" USING btree ("version_title");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "forms_title_idx";
  DROP INDEX IF EXISTS "_forms_v_version_version_title_idx";
  ALTER TABLE "media" ALTER COLUMN "display_original" SET NOT NULL;`)
}
