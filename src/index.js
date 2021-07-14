import React from "react"
import ReactDOM from "react-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup'
import "./index.css"

const SignupForm = () => {
  return <Formik
    initialValues={{ email: "", fullname: "", streetAddress: "", city: "" }}
    validationSchema={Yup.object({
      fullname: Yup.string().required('Required').max(15, 'Must be 15 characters or less'),
      email: Yup.string().required('Required').email('Invalid email address'),
      streetAddress: Yup.string().required('Required').max(50, 'Must be 50 characters or less'),
      city: Yup.string().required('Required')
      
    })}
    onSubmit={(values => {
      console.log(JSON.stringify(values, null, 2))
    })

    }>
      <Form>

        <label htmlFor="fullname">First Name</label>
        <Field type="text" name="fullname"/>
        <ErrorMessage name="fullname"/>
        
        <label htmlFor="email">Email Address</label>
        <Field type="email" name="email"/>
        <ErrorMessage name="email"/>

        <label htmlFor="streetAddress">Street Address</label>
        <Field name="streetAddress" as="textarea"/>
        <ErrorMessage name="streetAddress"/>

        <label htmlFor="city">City</label>
        <Field as="select" name="city">
          <option value="">{`< select - city >`}</option>
          <option value="Karachi">Karachi</option>
          <option value="Lahore">Lahore</option>
          <option value="Islamabad">Islamabad</option>
        </Field>
        <ErrorMessage name="city"/>
        
        <br />
        
        <button type="submit">Submit</button>
    </Form>
  </Formik>
}

function App() {
  return <SignupForm />
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
