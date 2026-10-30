"use client";

import {
  Dropzone,
  DropZoneArea,
  DropzoneFileList,
  DropzoneFileListItem,
  DropzoneRemoveFile,
  DropzoneTrigger,
  useDropzone,
} from "@/components/ui/dropzone";
import { useEffect } from "react";
import { Field, FieldLabel } from "../ui/field";
import { CloudUploadIcon, Trash2Icon } from "lucide-react";

const FileUploadInput = ({
  handleChange,
  label,
  error,
  invalid = false,
}: {
  label: string;
  error?: string;
  invalid?: boolean;
  handleChange: (files: File[]) => void;
}) => {
  const dropzone = useDropzone({
    onDropFile: async (file: File) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        status: "success",
        result: URL.createObjectURL(file),
      };
    },
    validation: {
      accept: { "image/*": [".png", ".jpg", ".jpeg"] },
      maxSize: 10 * 1024 * 1024,
      maxFiles: 10,
    },
  });

  // ✅ Bridge: sync dropzone → RHF
  useEffect(() => {
    const successFiles = dropzone.fileStatuses
      .filter((f) => f.status === "success")
      .map((f) => f.file);

    handleChange(successFiles);
    // form.setValue("images", successFiles, { shouldValidate: true });
  }, [dropzone.fileStatuses, handleChange]);

  return (
    <div className="not-prose flex flex-col gap-4">
      <Field data-invalid={invalid}>
        <FieldLabel>{label}</FieldLabel>
        <Dropzone {...dropzone} isInvalid={invalid}>
          <div>
            <DropZoneArea className="bg-dark-200 hover:bg-dark-100">
              <DropzoneTrigger className="flex flex-col items-center gap-4 bg-transparent hover:bg-transparent p-10 text-center text-sm w-full">
                <CloudUploadIcon className="size-8" />
                <div>
                  <p className="font-semibold">Upload listing images</p>
                  <p className="text-sm text-muted-foreground">
                    Click here or drag and drop to upload
                  </p>
                </div>
              </DropzoneTrigger>
            </DropZoneArea>
          </div>

          <DropzoneFileList className="grid grid-cols-3 gap-3 p-0">
            {dropzone.fileStatuses.map((file) => (
              <DropzoneFileListItem
                className="overflow-hidden rounded-md bg-secondary p-0 shadow-sm"
                key={file.id}
                file={file}
              >
                {file.status === "pending" && (
                  <div className="aspect-video animate-pulse bg-black/20" />
                )}
                {file.status === "success" && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={file.result}
                    alt={`uploaded-${file.fileName}`}
                    className="aspect-video object-cover"
                  />
                )}
                <div className="flex items-center justify-between p-2 pl-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm">{file.fileName}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <DropzoneRemoveFile
                    variant="ghost"
                    className="shrink-0 hover:outline"
                  >
                    <Trash2Icon className="size-4" />
                  </DropzoneRemoveFile>
                </div>
              </DropzoneFileListItem>
            ))}
          </DropzoneFileList>
        </Dropzone>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </Field>
    </div>
  );
};

export default FileUploadInput;
