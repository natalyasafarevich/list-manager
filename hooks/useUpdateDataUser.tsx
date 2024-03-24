// import {getDataUser} from '@/store/data-user/actions';
// import {AppDispatch} from '@/store/store';
// import {useEffect, useState} from 'react';
// import {useDispatch} from 'react-redux';

// const useUpdateDataUser = (addition: any) => {
//   const [value, setValue] = useState<any>();
//   const dispatch: AppDispatch = useDispatch();
//   useEffect(() => {
//     const {displayName, email, phoneNumber, photoURL, uid} = value;
//     setValue({displayName, email, phoneNumber, photoURL, uid});
//   }, [value]);

//   useEffect(() => {
//     dispatch(getDataUser({...value}));
//   }, [value, addition]);
//   return
// };
