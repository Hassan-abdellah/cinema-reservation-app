"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";

import { Field, FieldGroup } from "@/components/ui/field";

import { useRouter } from "next/navigation";
import { cinemaValidationSchema } from "@/validationSchemas";
import { TextField } from "@/components/inputs";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { createCinema } from "@/lib/actions/cinemas.action";

const CreateCinemaForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof cinemaValidationSchema>>({
    resolver: zodResolver(cinemaValidationSchema),
    defaultValues: {
      name: "",
      city: "",
      address: "",
      numberOfHalls: "",
    },
  });

  const handleAddMovie = async (
    data: z.infer<typeof cinemaValidationSchema>,
  ) => {
    try {
      await createCinema(data);

      toast.add({
        type: "success",
        description: "Movie Added Successfully",
      });
      router.push("/cinemas/list");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <section className="py-8">
      <Card className="border-none">
        <CardHeader>
          <CardTitle>Create Cinema</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(handleAddMovie)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextField
                    id="cinema-name"
                    label="Name"
                    placeholder="Enter Cinema Name e.g: XPlaza"
                    invalid={fieldState.invalid}
                    error={fieldState.error?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name="numberOfHalls"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextField
                    id="cinema-numberOfHalls"
                    label="Number Of Halls"
                    placeholder="Enter Cinema Number Of Halls e.g: 3"
                    invalid={fieldState.invalid}
                    error={fieldState.error?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name="city"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextField
                    id="cinema-city"
                    label="City"
                    placeholder="Enter Cinema City e.g: New York"
                    invalid={fieldState.invalid}
                    error={fieldState.error?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name="address"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextField
                    id="cinema-address"
                    label="Adress"
                    placeholder="Enter Cinema Adress e.g: 12th avenue"
                    invalid={fieldState.invalid}
                    error={fieldState.error?.message}
                    {...field}
                  />
                )}
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

export default CreateCinemaForm;
