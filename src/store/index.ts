import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import photoReducer from './reducers/photosReducer';
import wikiPhotoReducer from './reducers/wikiPhotosReducer';


const rootReducer = combineReducers({
  photos: photoReducer,
  wikiPhotos: wikiPhotoReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;