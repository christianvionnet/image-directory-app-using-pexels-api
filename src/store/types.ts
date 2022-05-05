import { Photo } from "pexels";

export const GET_PHOTOS = "GET_PHOTOS";
export const SET_ERROR = "SET_ERROR";
export const GET_WIKI_PHOTOS = "GET_WIKI_PHOTOS";

export interface PhotosState {
  photos: Photo[];
  total_results: number;
  error: string;
}

export interface WikiPhotosState {
  wikiPhotos: string[]
}

interface GetPhotosAction {
  type: typeof GET_PHOTOS;
  payload: {
    photos: Photo[];
    page: number;
    total_results: number;
  };
}

interface GetWikiPhotosAction {
  type: typeof GET_WIKI_PHOTOS;
  payload: {
    photos: any[];
  };
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

export type PhotosAction =
  | SetErrorAction
  | GetPhotosAction
  | GetWikiPhotosAction;
