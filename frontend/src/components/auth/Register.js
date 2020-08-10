import React, { Fragment } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  // state hook

  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    password: '',
    cnfPassword: '',
  });

  const { name, email, password, cnfPassword } = inputData;

  const handleChange = (e) =>
    setInputData({ ...inputData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== cnfPassword) {
      console.log('Passwords do not match');
    } else {
      console.log(inputData);
    }
  };

  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Sign Up</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Create Your Account
        </p>
        <form className='form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={handleChange}
              minLength='8'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Confirm Password'
              name='cnfPassword'
              value={cnfPassword}
              onChange={handleChange}
              minLength='8'
              required
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Register' />
        </form>
        <p className='my-1'>
          Already have an account? <Link to='/login'>Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};

export default Register;
