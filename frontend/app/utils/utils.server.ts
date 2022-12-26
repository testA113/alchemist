export type StrapiError<ErrorKeys> = {
  status: number;
  name: string;
  message: string;
  details: {
    errors: {
      path: Array<ErrorKeys>;
      message: string;
      name: string;
    }[];
  };
};

// using the generic strapi error and possible error key from the form, generate a formatted error object
export function formatStrapiError<ErrorKeys extends string>(
  error: StrapiError<ErrorKeys>
) {
  const errors = error.details.errors;
  const formattedErrors = errors.reduce((acc, { path, message }) => {
    acc[path[0]] = message;
    return acc;
  }, {} as Record<ErrorKeys, string>);
  return formattedErrors;
}
