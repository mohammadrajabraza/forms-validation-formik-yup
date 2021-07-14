import React from "react"
import ReactDOM from "react-dom"
import { useFormik } from "formik"
import * as Yup from 'yup'
import "./index.css"

const SignupForm = () => {
  const formik = useFormik({
    initialValues: { 
      email: "",
      firstname: "",
      lastname: "" 
    },
    validationSchema: Yup.object({
      firstname:  Yup.string().required('Required').max(15, 'Must be 15 characters or less'),
      lastname: Yup.string().required('Required').max(20, 'Must be 20 characters or less'),
      email: Yup.string().required('Required').email('Invalid email address')
    }) ,
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2))
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
        id="email" type="email" {...formik.getFieldProps('email')}
      />
      {formik.touched.email && formik.errors.email ? <div> {formik.errors.email} </div> : null}
      
      <label htmlFor="firstname">First Name</label>
      <input
        id="firstname" type="text" {...formik.getFieldProps('firstname')}
      />
      {formik.touched.firstname && formik.errors.firstname ? <div>{formik.errors.firstname}</div> : null}
      <label htmlFor="lastname">Last Name</label>
      <input
        id="lastname" type="text" {...formik.getFieldProps('lastname')}
      />
      {formik.touched.lastname && formik.errors.lastname ? <div>{formik.errors.lastname}</div> : null}
      <br/>
      <button type="submit">Submit</button>
    </form>
  );
};


function App() {
  return <SignupForm />
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
