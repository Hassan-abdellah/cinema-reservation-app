import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group";

interface textFieldProps extends React.ComponentProps<"textarea"> {
  id: string;
  label: string;
  placeholder?: string;
  invalid?: boolean;
  error?: string;
  maxChars?: number;
  fieldDescription?: string;
}
const TextAreaField = ({
  id,
  label,
  placeholder,
  error,
  invalid = false,
  maxChars,
  fieldDescription,
  ...props
}: textFieldProps) => {
  return (
    <>
      <Field data-invalid={invalid}>
        <FieldLabel htmlFor={id}>{label}</FieldLabel>

        <InputGroup className="input-field">
          <InputGroupTextarea
            {...props}
            id={id}
            placeholder={placeholder}
            rows={6}
            className="min-h-24"
            aria-invalid={invalid}
          />
          <InputGroupAddon align="block-end">
            <InputGroupText className="tabular-nums">
              {String(props.value).length}/{maxChars} characters
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        {fieldDescription && (
          <FieldDescription className="text-white">
            {fieldDescription}
          </FieldDescription>
        )}

        {invalid && <FieldError errors={[{ message: error }]} />}
      </Field>
    </>
  );
};

export default TextAreaField;
