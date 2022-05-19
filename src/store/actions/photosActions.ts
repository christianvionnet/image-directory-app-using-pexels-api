import { createClient, PhotosWithTotalResults, ErrorResponse } from 'pexels';
import { ThunkAction } from 'redux-thunk';

import { useState } from 'react';

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

    // const gsrlimit = limit.toString();
    // const iilimit = limit.toString();

    let gsroffset = "0";

    try {

      let done = false
      let newArray: any[] = []

      while (!done) {

        const rawParams = new URLSearchParams({
          action: "query",
          gsrsearch: searchQuery,
          gsrlimit: limit.toString(),
          iilimit: limit.toString(),
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

        const params = rawParams.toString();
        const data = await fetch(wikimediaURL + "?" + params);
        const res = await data.json();
        const keys = Object.keys(res.query.pages);
        const wikiPhotos = keys.map(key => res.query.pages[key].imageinfo[0])
        newArray = [...newArray, ...wikiPhotos]

        if (newArray.length >= limit) {
          dispatch({
            type: GET_WIKI_PHOTOS,
            payload: {
              photos: newArray
            }
          });
          onSuccess();
          gsroffset = "0"
          done = true
        } else {
          gsroffset = res.continue.gsroffset
        }

      }

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