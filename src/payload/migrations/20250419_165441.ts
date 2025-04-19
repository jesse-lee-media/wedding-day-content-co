import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_mux_video_playback_options_playback_policy" AS ENUM('signed', 'public');
  ALTER TYPE "public"."enum_navigation_call_to_action_icon" ADD VALUE 'calendarCheck' BEFORE 'chevronDown';
  ALTER TYPE "public"."enum_navigation_call_to_action_icon" ADD VALUE 'navArrowDownSmall' BEFORE 'navArrowLeft';
  CREATE TABLE IF NOT EXISTS "mux_video_playback_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"playback_id" varchar,
  	"playback_policy" "enum_mux_video_playback_options_playback_policy"
  );

  CREATE TABLE IF NOT EXISTS "mux_video" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar NOT NULL,
  	"asset_id" varchar,
  	"duration" numeric,
  	"poster_timestamp" numeric,
  	"aspect_ratio" varchar,
  	"max_width" numeric,
  	"max_height" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  ALTER TABLE "videos" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "videos" CASCADE;

  DROP INDEX IF EXISTS "payload_locked_documents_rels_videos_id_idx";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "mux_video_id" uuid;
  DO $$ BEGIN
   ALTER TABLE "mux_video_playback_options" ADD CONSTRAINT "mux_video_playback_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mux_video"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "mux_video_playback_options_order_idx" ON "mux_video_playback_options" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "mux_video_playback_options_parent_id_idx" ON "mux_video_playback_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "mux_video_title_idx" ON "mux_video" USING btree ("title");
  CREATE INDEX IF NOT EXISTS "mux_video_updated_at_idx" ON "mux_video" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "mux_video_created_at_idx" ON "mux_video" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_mux_video_fk" FOREIGN KEY ("mux_video_id") REFERENCES "public"."mux_video"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_mux_video_id_idx" ON "payload_locked_documents_rels" USING btree ("mux_video_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "videos_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "videos" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"alt" varchar NOT NULL,
  	"thumbnail_url" varchar,
  	"thumbnail_filename" varchar,
  	"thumbnail_filesize" numeric,
  	"thumbnail_height" numeric,
  	"thumbnail_width" numeric,
  	"thumbnail_mime_type" varchar,
  	"thumbnail_data_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );

  ALTER TABLE "mux_video_playback_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mux_video" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "mux_video_playback_options" CASCADE;
  DROP TABLE "mux_video" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_mux_video_fk";

  DROP INDEX IF EXISTS "payload_locked_documents_rels_mux_video_id_idx";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "videos_id" uuid;
  CREATE INDEX IF NOT EXISTS "videos_updated_at_idx" ON "videos" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "videos_created_at_idx" ON "videos" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "videos_filename_idx" ON "videos" USING btree ("filename");

  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_videos_id_idx" ON "payload_locked_documents_rels" USING btree ("videos_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "mux_video_id";
  ALTER TABLE "public"."navigation" ALTER COLUMN "call_to_action_icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_navigation_call_to_action_icon";
  CREATE TYPE "public"."enum_navigation_call_to_action_icon" AS ENUM('arrowLeft', 'arrowRight', 'arrowUpRight', 'calendar', 'chevronDown', 'circle', 'instagram', 'menu', 'navArrowDown', 'navArrowLeft', 'navArrowRight', 'navArrowUp', 'quoteSolid', 'tikTok', 'x');
  ALTER TABLE "public"."navigation" ALTER COLUMN "call_to_action_icon" SET DATA TYPE "public"."enum_navigation_call_to_action_icon" USING "call_to_action_icon"::"public"."enum_navigation_call_to_action_icon";
  DROP TYPE "public"."enum_mux_video_playback_options_playback_policy";`)
}
