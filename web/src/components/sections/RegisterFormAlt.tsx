import React from 'react'
import { Formik, Form } from 'formik';

interface RegisterFormAltProps {

}

export const RegisterFormAlt: React.FC<RegisterFormAltProps> = ({}): JSX.Element => {
    return (
      <Formik
      initialValues={{ email: "", password: ''}}
      onSubmit={(val) => {
        console.log(val);
      }}>



      </Formik>

    );
}
