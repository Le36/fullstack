import {configureStore} from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from "./reducers/userReducer";
import statsReducer from "./reducers/statsReducer";

const store = configureStore({
	reducer: {
		notification: notificationReducer,
		blogs: blogReducer,
		user: userReducer,
		stats: statsReducer
	},
})

export default store
