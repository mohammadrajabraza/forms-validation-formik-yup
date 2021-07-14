import React from "react"
import ReactDOM from "react-dom"
import { useFormik } from "formik"
import "./index.css"

const validate = values => {
  const errors = {}

  if(!values.firstname)
    errors.firstname = 'Required'
  else if(values.firstname.length > 15)
    errors.firstname = 'Must be 15 characters or less'

  if(!values.lastname)
    errors.lastname = 'Required'
  else if(values.lastname.length > 20)
    errors.lastname = 'Must be 20 characters or less'

  if(!values.email)
    errors.email = 'Required'
  else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
    errors.email = 'Invalid email address'  

  return errors
  
}

const SignupForm = () => {
  const formik = useFormik({
    initialValues: { 
      email: "",
      firstname: "",
      lastname: "" 
    },
    validate,
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2))
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.errors.email ? <div> {formik.errors.email} </div> : null}
      
      <label htmlFor="firstname">First Name</label>
      <input
        id="firstname"
        name="firstname"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstname}
      />
      {formik.errors.firstname ? <div>{formik.errors.firstname}</div> : null}
      <label htmlFor="lastname">Last Name</label>
      <input
        id="lastname"
        name="lastname"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastname}
      />
      {formik.errors.lastname ? <div>{formik.errors.lastname}</div> : null}
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
