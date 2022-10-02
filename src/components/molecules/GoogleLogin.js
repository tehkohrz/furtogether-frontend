import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  auth,
  logInWithEmailAndPassword,
  googleLogout,
  signInWithGoogle,
} from '../../services/firebase.service';
import { useAuthState } from 'react-firebase-hooks/auth';

import '../../GoogleLogin.css';

const GoogleLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      console.log('Loading...');
      return;
    }
    console.log(user);
    // if (user) navigate('/profile');
  }, [user, loading]);

  return (
    <div className='login'>
      <div className='login_container'>
        <input
          type='text'
          className='login_textBox'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email Address'
        />
        <input
          type='password'
          className='login_textBox'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <button
          className='login_btn'
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className='login_btn login_google' onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <Link to='reset'>Forgot Password</Link>
        </div>
        <div>
          Do not have an account? <Link to='/signup'>Sign Up Now</Link>
        </div>
        <div></div>
        <button className='login_btn' onClick={googleLogout}>
          Google Logout
        </button>
      </div>
    </div>
  );
};

// const GoogleLogin = () => {
//   return (
//     <div>
//       <button className='button' onClick={signInWithGoogle}>
//         <i className='fab fa-google'></i>Sign in with google
//       </button>
//     </div>
//   );
// };

export default GoogleLogin;
