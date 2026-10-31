CREATE TABLE "genres" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"tmdb_id" integer,
	CONSTRAINT "genres_name_unique" UNIQUE("name"),
	CONSTRAINT "genres_tmdb_id_unique" UNIQUE("tmdb_id")
);
--> statement-breakpoint
CREATE TABLE "movies_generes" (
	"movie_id" uuid NOT NULL,
	"genre_id" integer NOT NULL,
	CONSTRAINT "movies_generes_movie_id_genre_id_pk" PRIMARY KEY("movie_id","genre_id")
);
--> statement-breakpoint
ALTER TABLE "movies_generes" ADD CONSTRAINT "movies_generes_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movies_generes" ADD CONSTRAINT "movies_generes_genre_id_genres_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE no action ON UPDATE no action;