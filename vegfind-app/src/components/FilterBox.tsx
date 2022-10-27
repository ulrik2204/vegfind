import { Box, Button, Checkbox, FormLabel, TextField } from "@mui/material";

import { Field, Form, Formik } from "formik";
import _ from "lodash";
import { ReactElement } from "react";
import { BoolDict, Filters } from "../helpers/types";

type FilterBoxProps = {
  filterInitialValues: Filters;
  onSubmit: (filters: Filters) => void;
};

const isBoolDict = (value: unknown): value is BoolDict => typeof value === "object";
const isNumber = (value: unknown): value is number => typeof value === "number";
const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";

export default function FilterBox(props: FilterBoxProps): ReactElement {
  return (
    <Box>
      <Formik initialValues={props.filterInitialValues} onSubmit={props.onSubmit}>
        {({ errors }) => (
          <Form>
            {Object.keys(props.filterInitialValues).map((filterKey) => {
              const key = filterKey as keyof Filters;
              const value = props.filterInitialValues[key];
              if (isBoolean(value))
                return (
                  <Box key={key} sx={{ marginTop: "1em" }}>
                    <Field name={key} as={Checkbox} defaultChecked={value} />
                    {_.startCase(key)}
                  </Box>
                );
              else if (isNumber(value))
                return (
                  <Field
                    key={key}
                    name={key}
                    as={TextField}
                    type="number"
                    label={_.startCase(key)}
                    error={errors[key] != undefined}
                    helperText={errors[key]}
                    sx={{ margin: "1em 1em 0 0" }}
                  />
                );
              else if (isBoolDict(value))
                return (
                  <Box key={key} sx={{ marginTop: "1em" }}>
                    <FormLabel component="legend">{_.startCase(key)}</FormLabel>
                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
                      {Object.keys(value).map((boolDictKey) => {
                        const dictValue = value[boolDictKey];
                        const dictKey = `${key}.${boolDictKey}`;
                        return (
                          <span key={dictKey}>
                            <Field name={dictKey} as={Checkbox} defaultChecked={dictValue} />
                            {boolDictKey}
                          </span>
                        );
                      })}
                    </Box>
                  </Box>
                );
              else return <></>;
            })}
            <Button
              type="submit"
              color="primary"
              variant="contained"
              sx={{ margin: "1em 1em 1em 0" }}
            >
              Set Filters
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
