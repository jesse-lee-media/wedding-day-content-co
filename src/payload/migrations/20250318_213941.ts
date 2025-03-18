import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "videos" DROP COLUMN IF EXISTS "optimized_video_url";
  ALTER TABLE "videos" DROP COLUMN IF EXISTS "optimized_video_filename";
  ALTER TABLE "videos" DROP COLUMN IF EXISTS "optimized_video_filesize";
  ALTER TABLE "videos" DROP COLUMN IF EXISTS "optimized_video_height";
  ALTER TABLE "videos" DROP COLUMN IF EXISTS "optimized_video_width";
  ALTER TABLE "videos" DROP COLUMN IF EXISTS "optimized_video_mime_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "videos" ADD COLUMN "optimized_video_url" varchar;
  ALTER TABLE "videos" ADD COLUMN "optimized_video_filename" varchar;
  ALTER TABLE "videos" ADD COLUMN "optimized_video_filesize" numeric;
  ALTER TABLE "videos" ADD COLUMN "optimized_video_height" numeric;
  ALTER TABLE "videos" ADD COLUMN "optimized_video_width" numeric;
  ALTER TABLE "videos" ADD COLUMN "optimized_video_mime_type" varchar;`)
}
