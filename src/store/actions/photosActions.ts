import { createClient, PhotosWithTotalResults, ErrorResponse } from 'pexels';
import { ThunkAction } from 'redux-thunk';

import { RootState } from '../';
import { PhotosAction, GET_PHOTOS, SET_ERROR, GET_WIKI_PHOTOS } from '../types';

const client = createClient(process.env.REACT_APP_PEXELS_API || '');
const wikimediaURL = "https://commons.wikimedia.org/w/api.php";

export const getPhotos = (page: number, searchQuery: string, onSuccess: () => void, onError: () => void, limit: number): ThunkAction<void, RootState, null, PhotosAction> => {
  return async dispatch => {
    try {
      const photos: PhotosWithTotalResults | ErrorResponse = await client.photos.search({ page, query: searchQuery, per_page: limit });
      console.log(photos)
      if ("error" in photos) {
        throw new Error(photos.error);
      } else {
        dispatch({
          type: GET_PHOTOS,
          payload: {
            photos: photos.photos,
            page: page,
            total_results: photos.total_results
          }
        });
        onSuccess();
      }

    } catch (error: any) {
      dispatch(setError(error.message));
      onError();
    }
  }
}

export const getWikiPhotos = (searchQuery: string, onSuccess: () => void, onError: () => void, limit: number): ThunkAction<void, RootState, null, PhotosAction> => {
  return async dispatch => {


    const gsrlimit = limit.toString();
    const iilimit = limit.toString();
    const gsroffset = "0";

    const params = new URLSearchParams({
      action: "query",
      gsrsearch: searchQuery,
      gsrlimit: gsrlimit,
      iilimit: iilimit,
      format: "json",
      generator: "search",
      origin: "*",
      prop: "imageinfo",
      redirects: "1",
      gsrnamespace: "6",
      iiprop: "canonicaltitle|url|sha1|extmetadata",
      iiextmetadatafilter:
        "AttributionRequired|LicenseShortName|Restrictions|Permission|UsageTerms|Copyrighted",
      gsroffset: gsroffset,
    });

    const str = params.toString();

    try {
      const data = await fetch(wikimediaURL + "?" + str);
      const res = await data.json();
      const keys = Object.keys(res.query.pages);
      const wikiPhotos = keys.map(key => res.query.pages[key].imageinfo[0].url)
      console.log(wikiPhotos)
      dispatch({
        type: GET_WIKI_PHOTOS,
        payload: {
          photos: wikiPhotos
        }
      });
      onSuccess();

    } catch (error: any) {
      dispatch(setError(error.message));
      onError();
    }
  }

}

export const setError = (err: string): PhotosAction => {
  return {
    type: SET_ERROR,
    payload: err
  }
}