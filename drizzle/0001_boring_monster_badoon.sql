CREATE TABLE "seats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hall_id" uuid NOT NULL,
	"label" text NOT NULL,
	"row_label" text NOT NULL,
	"row_number" integer NOT NULL,
	"grid_x" integer NOT NULL,
	"grid_y" integer NOT NULL,
	"type" text DEFAULT 'standard' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "seats_hall_id_grid_x_grid_y_unique" UNIQUE("hall_id","grid_x","grid_y"),
	CONSTRAINT "seats_hall_id_label_unique" UNIQUE("hall_id","label")
);
--> statement-breakpoint
ALTER TABLE "halls" ADD COLUMN "grid_cols" integer;--> statement-breakpoint
ALTER TABLE "halls" ADD COLUMN "grid_rows" integer;--> statement-breakpoint
ALTER TABLE "halls" ADD COLUMN "layout" jsonb;--> statement-breakpoint
ALTER TABLE "halls" ADD COLUMN "is_configured" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "seats" ADD CONSTRAINT "seats_hall_id_halls_id_fk" FOREIGN KEY ("hall_id") REFERENCES "public"."halls"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "halls" ADD CONSTRAINT "halls_cinema_id_name_unique" UNIQUE("cinema_id","name");