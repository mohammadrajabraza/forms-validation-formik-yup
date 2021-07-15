import React from "react"
import ReactDOM from "react-dom"
import { Formik, Form, useField } from "formik"
import * as Yup from 'yup'
import "./index.css"

const inputErrorStyle = {
  border: "2px solid var(--red-600)",
  animation: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both"
}


const MyTextInput = ({ label, ...props}) => {

  const [field, meta] = useField(props)
  return <>
      <label htmlFor={props.id || props.name}> {label} </label>
      <input className="text-input" style={ meta.touched && meta.error ? inputErrorStyle : {} } {...field} {...props} />
      { meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
  </>
}

const MyCheckBox = ({ children, ...props}) => {

  const [field, meta] = useField({...props, type: 'checkbox'})
  return <div>
    <label>
      <input type="checkbox" {...field} {...props} 
        style={ meta.touched && meta.error ? inputErrorStyle : {} }/>
      {children}
    </label>
    {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
  </div>
}

const MySelect = ({label, ...props}) => {

  const [field, meta] = useField(props)

  return <div>
    <label htmlFor={props.id || props.name}>{label}</label>
    <select {...props} {...field} style={ meta.touched && meta.error ? inputErrorStyle : {} }/>
    {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
  </div>
}

const MyTextArea = ({label, ...props}) => {
  const [field, meta] =useField(props)
  return <div>
    <label htmlFor={props.id || props.name}>{label}</label>
    <textarea {...field} {...props} style={ meta.touched && meta.error ? inputErrorStyle : {} }></textarea>
    {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
  </div>
}

const SignupForm = () => {

  


  return <Formik
    initialValues={{ email: "", fullname: "", streetAddress: "", password: "",
      confirmPassword: "", city: "", acceptedTerms: false, jobType: ''}}
    validationSchema={Yup.object({
      fullname: Yup.string().required('Required').max(15, 'Must be 15 characters or less'),
      email: Yup.string().required('Required').email('Invalid email address'),
      streetAddress: Yup.string().required('Required'),
      password: Yup.string().required('Required').min(8, 'Must contain at least 8 characters')
        .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/,
        "Must contain 1 uppercase, 1 lowercase, 1 number and 1 special case character"
      ),
      confirmPassword: Yup.string().required('Required')
     .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      acceptedTerms: Yup.boolean().required('Required')
        .oneOf([true], 'You must accept the terms and conditions.'),
      jobType: Yup.string().required('Required')
        .oneOf(
          ['designer', 'development', 'product', 'other'],
          'Invalid Job Type'
        )
      
    })}
    onSubmit={(values => {
      console.log(JSON.stringify(values, null, 2))
    })

    }>
    {formik =>(
      <Form>
        <MyTextInput
          label="Full Name"
          name="fullname"
          placeholder="Ahmed khan"
          type="text"
          // style={formik.errors.fullname ? inputErrorStyle : {}}
        />

        <MyTextInput
          name="email"
          type="email"
          placeholder="abc@example.com"
          label="Email"
        />

        <MyTextInput
          label="Password"
          name="password"
          type="password"
        />
        <MyTextInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
        />

        <MyTextArea
          label="Street Address"
          name="streetAddress"
          placeholder="123, 10-A street, upfare hill"
        />

        <MySelect label="Job Type" name="jobType">
          <option value="">Select a job type</option>
          <option value="designer">Designer</option>
          <option value="development">Developer</option>
          <option value="product">Product Manager</option>
          <option value="other">Other</option>
        </MySelect> 
        
        <MyCheckBox name="acceptedTerms">
             I accept the terms and conditions
        </MyCheckBox>
        <br />
        <button type="submit" disabled={!formik.dirty || !formik.isValid}>Submit</button>
        <button type="reset" onClick={formik.handleReset}>Reset Form</button>
    </Form>
    )}
  </Formik>
}

function App() {
  return <SignupForm />
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
