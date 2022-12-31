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

export type StrapiData<AttributesValues> = {
  data: {
    id: number;
    attributes: AttributesValues;
  };
  error?: StrapiError<string>;
};

export type StrapiDataArray<AttributesValues> = {
  data: {
    id: number;
    attributes: AttributesValues;
  }[];
  error?: StrapiError<string>;
};
