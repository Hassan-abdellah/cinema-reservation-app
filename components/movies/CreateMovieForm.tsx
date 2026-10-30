"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";

import { Field, FieldGroup } from "@/components/ui/field";

import { Fragment, useCallback } from "react";
import { useRouter } from "next/navigation";
import { moviesValidationSchema } from "@/validationSchemas";
import {
  TextField,
  SelectField,
  TextAreaField,
  FileUploadInput,
  AysncSearchField,
} from "@/components/inputs";
import { createMovie } from "@/lib/actions/movies.actions";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const CreateMovieForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof moviesValidationSchema>>({
    resolver: zodResolver(moviesValidationSchema),
    defaultValues: {
      title: "",
      description: "",
      directorName: "",
      durationMin: "",
      cast: [],
      genres: [],
      trailerUrl: null,
      poster: undefined,
    },
  });

  const handleAddMovie = async (
    data: z.infer<typeof moviesValidationSchema>,
  ) => {
    try {
      const formData = new FormData();
      const file = data.poster;
      if (!(file instanceof File)) throw new Error("Please select an image");
      formData.append("poster", file);
      formData.append("title", data.title);
      formData.append("description", data.description ?? "");
      formData.append("directorName", data.directorName ?? "");
      formData.append("durationMin", data.durationMin);
      formData.append("cast", JSON.stringify(data.cast));
      formData.append("genres", JSON.stringify(data.genres));
      formData.append("trailerUrl", data.trailerUrl ?? "");

      await createMovie(formData);

      toast.add({
        type: "success",
        description: "Movie Added Successfully",
      });
      router.push("/movies/list");
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleImageChange = useCallback(
    (files: File[]) => {
      form.setValue("poster", files[0], { shouldValidate: true });
    },
    [form],
  );

  return (
    <section className="py-8">
      <Card className="border-none">
        <CardHeader>
          <CardTitle>Create Movie</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(handleAddMovie)}>
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextField
                    id="movie-title"
                    label="Title"
                    placeholder="Enter Movie Title e.g: Inception"
                    invalid={fieldState.invalid}
                    error={fieldState.error?.message}
                    {...field}
                    className="lg:col-span-3 md:col-span-2 col-span-1"
                  />
                )}
              />

              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextAreaField
                    id="movie-description"
                    label="Description"
                    invalid={fieldState.invalid}
                    error={fieldState.error?.message}
                    placeholder="Enter Movie Description"
                    maxChars={1000}
                    {...field}
                    value={field.value ?? ""}
                  />
                )}
              />

              <Controller
                name="directorName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Fragment>
                    <AysncSearchField
                      handleChange={(values) => field.onChange(values[0])}
                      onBlur={field.onBlur}
                      value={field.value ? [field.value] : []}
                      label="Director"
                      id="moive-director"
                      invalid={fieldState.invalid}
                      error={fieldState.error?.message}
                      cacheKey="director"
                      fetchUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/api/people/search?is_director=true`}
                      mappingKey="name"
                      mappingValue="name"
                      apiKey="results"
                      multiple={false}
                    />
                  </Fragment>
                )}
              />
              <Controller
                name="durationMin"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextField
                    id="movie-durationMin"
                    label="Duration In Minutes"
                    placeholder="Enter Movie Duration In Minutes e.g: 150"
                    invalid={fieldState.invalid}
                    error={fieldState.error?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name="genres"
                control={form.control}
                render={({ field, fieldState }) => (
                  <SelectField
                    handleChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value?.map((item) => String(item)) ?? []}
                    label="Genres"
                    id="moive-genres"
                    invalid={fieldState.invalid}
                    error={fieldState.error?.message}
                    cacheKey="genres"
                    fetchUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/api/genres`}
                    mappingKey="name"
                    mappingValue="id"
                    apiKey="genres"
                    multiple={true}
                  />
                )}
              />
              <Controller
                name="cast"
                control={form.control}
                render={({ field, fieldState }) => (
                  <AysncSearchField
                    handleChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value ?? []}
                    label="Cast"
                    id="moive-cast"
                    invalid={fieldState.invalid}
                    error={fieldState.error?.message}
                    cacheKey="cast"
                    fetchUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/api/people/search`}
                    mappingKey="name"
                    mappingValue="name"
                    apiKey="results"
                    multiple={true}
                  />
                )}
              />
              <FileUploadInput
                label="Image"
                handleChange={handleImageChange}
                invalid={form.getFieldState("poster").invalid}
                error={
                  form.formState.isSubmitted
                    ? form.formState.errors.poster?.message
                    : undefined
                }
              />
            </FieldGroup>
          </form>
          <Field orientation="horizontal" className="mt-4 justify-end">
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              form="form-rhf-demo"
              className="px-10 py-4 rounded-xl cursor-pointer transition-colors duration-150 bg-bubblegum-tint hover:bg-wild-strawberry"
            >
              {form.formState.isSubmitting ? <Spinner /> : <span>Submit</span>}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              className="px-10 py-4 rounded-xl cursor-pointer transition-colors duration-150 bg-transparent hover:bg-wild-strawberry hover:text-white-smoke border-wild-strawberry text-wild-strawberry"
            >
              Reset
            </Button>
          </Field>
        </CardContent>
      </Card>
    </section>
  );
};

export default CreateMovieForm;
