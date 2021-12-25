import React from 'react'
import ReactDOM from 'react-dom'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import './index.css'

const inputErrorStyle = {
  border: '2px solid var(--red-600)',
  animation: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both'
}

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <>
      <label htmlFor={props.id || props.name}> {label} </label>
      <input className='text-input' style={meta.touched && meta.error ? inputErrorStyle : {}} {...field} {...props} />
      {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
    </>
  )
}

const MyCheckBox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' })
  return (
    <div>
      <label>
        <input
          type='checkbox' {...field} {...props}
          style={meta.touched && meta.error ? inputErrorStyle : {}}
        />
        {children}
      </label>
      {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
    </div>
  )
}

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...props} {...field} style={meta.touched && meta.error ? inputErrorStyle : {}} />
      {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
    </div>
  )
}

const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea {...field} {...props} style={meta.touched && meta.error ? inputErrorStyle : {}} />
      {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
    </div>
  )
}

const SignupForm = () => {
  return (
    <Formik
      initialValues={{
        email: '',
        fullname: '',
        cnic: '',
        streetAddress: '',
        password: '',
        confirmPassword: '',
        city: '',
        acceptedTerms: false,
        jobType: '',
        cellphone: ''
      }}
      validationSchema={Yup.object({
        fullname: Yup
          .string()
          .required('Required')
          .max(15, 'Must be 15 characters or less')
          .matches(
            /^([a-zA-Z]+\s)*[a-zA-Z]+$/,
            'Only alphabets & spaces are allowed'
          ),
        email: Yup.string().required('Required').email('Invalid email address'),
        cnic: Yup.string().required('Required')
          .matches(
            /^\d{5}-{0,1}\d{7}-{0,1}\d{1}$/,
            'Please follow patterns: 01234-1234567-8'
          ),
        streetAddress: Yup.string().required('Required'),
        cellphone: Yup.string().required('Required')
          .matches(
            /^((\+92)|(0092)|(92))-{0,1}3\d{2}-{0,1}\d{7}$|^0{0,1}3\d{2}-{0,1}\d{7}$/,
            'Follow these patterns: 0300-1234567, 92-300-1234567'),
        password: Yup.string().required('Required').min(8, 'Must contain at least 8 characters')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/,
            'Must contain 1 uppercase, 1 lowercase, 1 number and 1 special case character'
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
      })}
    >
      {formik => (
        <Form>
          <MyTextInput
            label='Full Name'
            name='fullname'
            placeholder='Ahmed khan'
            type='text'
          />

          <MyTextInput
            label='CNIC #'
            name='cnic'
            placeholder='01234-1234567-8'
            type='text'
          />

          <MyTextInput
            name='email'
            type='email'
            placeholder='abc@example.com'
            label='Email'
          />

          <MyTextInput
            name='cellphone'
            type='tel'
            placeholder='0300-1234567, 92-300-1234567'
            label='Cell Phone'
          />

          <MyTextInput
            label='Password'
            name='password'
            type='password'
          />
          <MyTextInput
            label='Confirm Password'
            name='confirmPassword'
            type='password'
          />

          <MyTextArea
            label='Street Address'
            name='streetAddress'
            placeholder='123, 10-A street, upfare hill'
          />

          <MySelect label='Job Type' name='jobType'>
            <option value=''>Select a job type</option>
            <option value='designer'>Designer</option>
            <option value='development'>Developer</option>
            <option value='product'>Product Manager</option>
            <option value='other'>Other</option>
          </MySelect>

          <MyCheckBox name='acceptedTerms'>
            I accept the terms and conditions
          </MyCheckBox>
          <br />
          <button type='submit' disabled={!formik.dirty || !formik.isValid}>Submit</button>
          <button type='reset' onClick={formik.handleReset}>Reset Form</button>
        </Form>
      )}
    </Formik>
  )
}

function App () {
  return <SignupForm />
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
