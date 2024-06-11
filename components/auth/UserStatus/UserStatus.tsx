'use client';
import {useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged, UserInfo, UserProfile} from 'firebase/auth';
import firebaseApp from '@/firebase';
import {useDispatch, useSelector} from 'react-redux';
import {getAdditionalInfo, getDataUser, isUserUpdated} from '@/store/data-user/actions';
import {getDatabase, onValue, ref} from 'firebase/database';
import {getBoards} from '@/store/board/actions';
import {updateUserData} from '@/helper/updateUserData';
import {fetchBackDefaultData} from '@/helper/getFirebaseData';
import {getUserNames} from '@/store/auth/actions';
import {usePathname, redirect} from 'next/navigation';
import {RootState, AppDispatch} from '@/store/store';
import useScrollControl from '@/hooks/useScrollControl';

const UserStatus = () => {
  // Hook for scroll tracking
  useScrollControl();

  // State for user and user profile
  const [user, setUser] = useState<UserInfo | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userNames, setUserNames] = useState<Array<string>>([]);

  // Redux dispatch
  const dispatch: AppDispatch = useDispatch();

  // Current user state from Redux
  const current_user = useSelector((state: RootState) => state.userdata);

  // Firebase authentication object
  const auth = getAuth(firebaseApp);

  // Firebase database object
  const db = getDatabase(firebaseApp);

  // Fetching boards on database change
  useEffect(() => {
    const starCountRef = ref(db, `/boards`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        dispatch(getBoards(data));
      }
    });
  }, [db, dispatch]);

  // Handling changes in user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: UserInfo | null) => {
      if (user) {
        const {displayName, email, phoneNumber, photoURL, uid, providerId} = user;
        setUser({displayName, email, phoneNumber, photoURL, uid, providerId});

        // Update user data in database
        updateUserData(`${uid}/`, {
          email: email,
          phoneNumber: phoneNumber,
          displayName: displayName,
          photoURL: photoURL,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // Fetching additional user information
  useEffect(() => {
    dispatch(getAdditionalInfo(userProfile));
  }, [userProfile, dispatch]);

  // Fetching user names
  useEffect(() => {
    dispatch(getUserNames(userNames));
  }, [dispatch, userNames]);

  useEffect(() => {
    if (user || current_user.isUpdate) {
      dispatch(getDataUser({...user}));
      fetchBackDefaultData('/usernames', setUserNames);
    }
    user && fetchBackDefaultData(`/users/${user?.uid}/additional-info`, setUserProfile);
    dispatch(isUserUpdated(false));
  }, [user, current_user.isUpdate, dispatch]);

  // Checking path and redirecting user
  const pathname = usePathname();
  useEffect(() => {
    if (current_user.uid && pathname === '/') {
      redirect('/boards');
    }
  }, [current_user, pathname]);

  // Returning component
  return null;
};

export default UserStatus;
