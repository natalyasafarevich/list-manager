import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Ваш корневой редюсер

const store = configureStore({
  reducer: rootReducer,
  // другие параметры, если есть
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
