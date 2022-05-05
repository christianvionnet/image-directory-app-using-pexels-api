import { GET_WIKI_PHOTOS, WikiPhotosState } from '../types';

const wikiInitialState: WikiPhotosState = {
  wikiPhotos: []
}


const wikiPhotoReducer = (state = wikiInitialState, action: any): WikiPhotosState => {
  switch (action.type) {
    case GET_WIKI_PHOTOS:
      const { photos } = action.payload;
      console.log(photos)
      return { // returning a copy of orignal state 
        ...state, //spreading the original state
        wikiPhotos: photos  // new todos array
      }
    default:
      return state;
  }
}

export default wikiPhotoReducer