import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_images_link_rel" AS ENUM('noopener', 'noreferrer', 'nofollow');
  CREATE TYPE "public"."enum_images_link_type" AS ENUM('internal', 'external');
  CREATE TABLE IF NOT EXISTS "images_link_rel" (
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"value" "enum_images_link_rel",
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
  );
  
  ALTER TABLE "images" ALTER COLUMN "alt" DROP NOT NULL;
  ALTER TABLE "images" ADD COLUMN "title" varchar;
  ALTER TABLE "images" ADD COLUMN "link_text" varchar;
  ALTER TABLE "images" ADD COLUMN "link_type" "enum_images_link_type" DEFAULT 'internal';
  ALTER TABLE "images" ADD COLUMN "link_relationship_id" uuid;
  ALTER TABLE "images" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "images" ADD COLUMN "link_url" varchar;
  ALTER TABLE "images" ADD COLUMN "link_new_tab" boolean DEFAULT false;
  ALTER TABLE "images" ADD COLUMN "link_umami_event" varchar;
  ALTER TABLE "images" ADD COLUMN "link_umami_event_id" varchar;
  ALTER TABLE "images" ADD COLUMN "has_link" boolean DEFAULT false;
  DO $$ BEGIN
   ALTER TABLE "images_link_rel" ADD CONSTRAINT "images_link_rel_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."images"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "images_link_rel_order_idx" ON "images_link_rel" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "images_link_rel_parent_idx" ON "images_link_rel" USING btree ("parent_id");
  DO $$ BEGIN
   ALTER TABLE "images" ADD CONSTRAINT "images_link_relationship_id_pages_id_fk" FOREIGN KEY ("link_relationship_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "images_link_link_relationship_idx" ON "images" USING btree ("link_relationship_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "images_link_rel" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "images_link_rel" CASCADE;
  ALTER TABLE "images" DROP CONSTRAINT "images_link_relationship_id_pages_id_fk";
  
  DROP INDEX IF EXISTS "images_link_link_relationship_idx";
  ALTER TABLE "images" ALTER COLUMN "alt" SET NOT NULL;
  ALTER TABLE "images" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "images" DROP COLUMN IF EXISTS "link_text";
  ALTER TABLE "images" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "images" DROP COLUMN IF EXISTS "link_relationship_id";
  ALTER TABLE "images" DROP COLUMN IF EXISTS "link_anchor";
  ALTER TABLE "images" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "images" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "images" DROP COLUMN IF EXISTS "link_umami_event";
  ALTER TABLE "images" DROP COLUMN IF EXISTS "link_umami_event_id";
  ALTER TABLE "images" DROP COLUMN IF EXISTS "has_link";
  DROP TYPE "public"."enum_images_link_rel";
  DROP TYPE "public"."enum_images_link_type";`)
}
