import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import youtubeReducer from './redux/youtubeSlice';
import memberReducer from './redux/memberSlice';
import historyReducer from './redux/historySlice';
import galleryReducer from './redux/gallerySlice';

const store = configureStore({
	reducer: {
		youtubue: youtubeReducer,
		member: memberReducer,
		history: historyReducer,
		gallery: galleryReducer
	}
});

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);
