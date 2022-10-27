import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";

import { Field, Form, Formik } from "formik";
import _ from "lodash";
import { ReactElement, useState } from "react";
import { BoolDict, Filters } from "../helpers/types";

type FilterBoxProps = {
  filterInitialValues: Filters;
  onSubmit: (filters: Filters) => void;
};

const isBoolDict = (value: unknown): value is BoolDict => typeof value === "object";
const isNumber = (value: unknown): value is number => typeof value === "number";
const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";

export default function FilterBox(props: FilterBoxProps): ReactElement {
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
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
                  <Accordion
                    expanded={expanded === key}
                    onChange={handleChange(key)}
                    key={key}
                    sx={{ marginTop: "1em" }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>{_.startCase(key)}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormLabel component="legend">{_.startCase(key)}</FormLabel>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: {
                            xs: "1fr 1fr",
                            md: "1fr 1fr 1fr",
                            lg: "1fr 1fr 1fr 1fr",
                          },
                        }}
                      >
                        {Object.keys(value).map((boolDictKey) => {
                          const dictValue = value[boolDictKey];
                          const dictKey = `${key}.${boolDictKey}`;
                          return (
                            <FormControlLabel
                              control={
                                <Field name={dictKey} as={Checkbox} defaultChecked={dictValue} />
                              }
                              label={boolDictKey}
                              key={dictKey}
                            />
                          );
                        })}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
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
