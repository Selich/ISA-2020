import { Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import Cookies from "js-cookie";
import React from "react";
import { useRequestHolidayMutation } from "../../generated/graphql";
import { DatePickerField } from "../../pages/shop";

export const DermHolidays = () => {
  let token = Cookies.get("token");
  const [{ fetching }, request] = useRequestHolidayMutation();

  return (
    <>
      <Formik
        initialValues={{
          from: "",
          until: "",
        }}
        onSubmit={async (inputs, { setSubmitting }) => {
          setSubmitting(true);
          let variables = { inputs, token };
          const res = await request({ inputs, token });
          console.log(variables);
          console.log(res);
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <DatePickerField name="from" value={values.from} />
            <DatePickerField name="until" value={values.until} />
            <div>
              <Button disabled={isSubmitting} type="submit">
                Request
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
