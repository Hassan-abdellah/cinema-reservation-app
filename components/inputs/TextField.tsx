import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

interface textFieldProps extends React.ComponentProps<"input"> {
  id: string;
  label: string;
  placeholder?: string;
  invalid?: boolean;
  error?: string;
}
const TextField = ({
  id,
  label,
  placeholder,
  error,
  invalid = false,
  className,
  ...props
}: textFieldProps) => {
  return (
    <Field data-invalid={invalid} className={className}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        {...props}
        className="input-field"
        aria-invalid={invalid}
        placeholder={placeholder}
        autoComplete="off"
      />
      {invalid && <FieldError errors={[{ message: error }]} />}
    </Field>
  );
};

export default TextField;
