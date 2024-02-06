// 'use client'
// import React, { useState } from 'react';
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// import firebaseApp from '@/firebase';

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   // const handleRegister = async () => {
//   //   try {
//   //     const auth = getAuth(firebaseApp);
//   //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);

//   //     // Успешная регистрация
//   //     const user = userCredential.user;
//   //     console.log('User registered successfully:', user);
//   //   } catch (error) {
//   //     const errorCode = error.code;
//   //     const errorMessage = error.message;
//   //     console.error('Error registering user:', errorCode, errorMessage);
//   //   }
//   // };

//   return (
//     <div>
//       <h2>Register</h2>
//       <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={handleRegister}>Register</button>
//     </div>
//   );
// };

// export default Register;
