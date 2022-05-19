import React, { FC, useState, MouseEvent, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

import {
  getPhotos,
  getWikiPhotos,
  setError,
} from "./store/actions/photosActions";
import { RootState } from "./store";
import Intro from "./components/Intro";
import Modal from "./components/Modal";
import Footer from "./components/Footer";
import { Photo } from "pexels";
import ImageResults from "./components/ImageResults";
import DownloadCSV from "./components/DownloadCSV";
import Spinner from "./components/Spinner";
import LoadMore from "./components/LoadMore";

const App: FC = () => {
  const dispatch = useDispatch();

  const { photos, total_results, error } = useSelector(
    (state: RootState) => state.photos
  );
  // console.log("total_results", total_results);
  const data = useSelector((state: any) => state.wikiPhotos);

  // const wikipediaURL = "https://en.wikipedia.org/w/api.php";

  const [loading, setLoading] = useState(false);
  const [searchFor, setSearchFor] = useState("");
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [src, setSrc] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorUrl, setAuthorUrl] = useState("");
  const [limit, setLimit] = useState(100);
  const [source, setSource] = useState("pexels");

  useEffect(() => {
    // console.log("limit: ", limit);
  }, [limit]);

  const searchPhotosHandler = (
    query: string,
    limit: number,
    source: string
  ) => {
    if (source === "pexels") {
      if (error) {
        setError("");
      }
      setLoading(true);
      setSearchFor(query);
      setPage(1);
      setLimit(limit);
      setSource(source);
      dispatch(
        getPhotos(
          1,
          query,
          () => setLoading(false),
          () => setLoading(false),
          limit
        )
      );
      setTitle(`Success! Results for ${query} in Pexels`);
    } else {
      setLoading(true);
      setSearchFor(query);
      setPage(1);
      setLimit(limit);
      setSource(source);
      dispatch(
        getWikiPhotos(
          query,
          () => setLoading(true),
          () => setLoading(false),
          limit
        )
      );
      setTitle(`Success! Results for ${query} in Wikimedia`);
    }
  };

  const loadMoreHandler = (e: any) => {
    setBtnLoading(true);
    setPage((prev) => prev + 1);
    dispatch(
      getPhotos(
        page + 1,
        searchFor,
        () => setBtnLoading(false),
        () => setBtnLoading(false),
        limit
      )
    );
  };

  const modalCloseHandler = () => {
    setSrc("");
    setAuthorName("");
    setAuthorUrl("");
    setShowModal(false);
  };

  const imageClickHandler = (e: MouseEvent, photo: Photo) => {
    e.preventDefault();
    setSrc(photo.src.original);
    setAuthorUrl(photo.photographer_url);
    setAuthorName(photo.photographer);
    setShowModal(true);
  };

  let content = null;

  if (loading) {
    content = <Spinner />;
  }

  if (error) {
    content = (
      <div className="alert alert-danger mt-6 text-center">{error}</div>
    );
  }

  if (source === "pexels") {
    content = (
      <Fragment>
        {photos.length > 0 ? (
          <>
            <h2 className="alert alert-success text-center p-4 mt-6 mx-6">
              {title}
            </h2>

            <DownloadCSV photos={photos} title={title} searchFor={searchFor} />
            <ImageResults
              pexelsPhotos={photos}
              imageClickHandler={imageClickHandler}
            />
          </>
        ) : (
          <p className="text-center mt-6">No results</p>
        )}

        <LoadMore
          total_results={total_results}
          limit={limit}
          page={page}
          loadMoreHandler={loadMoreHandler}
          btnLoading={btnLoading}
        />
      </Fragment>
    );
  }

  if (source === "wikimedia") {
    // console.log("data: ", data.wikiPhotos);
    content = (
      <Fragment>
        {data.wikiPhotos.length > 0 ? (
          <>
            <h2 className="alert alert-success text-center p-4 mt-6 mx-6">
              {title}
            </h2>
            <DownloadCSV
              photos={data.wikiPhotos}
              title={title}
              searchFor={searchFor}
            />
            <ImageResults
              wikiPhotos={data.wikiPhotos}
              imageClickHandler={imageClickHandler}
            />
          </>
        ) : (
          <p className="text-center mt-6">No results</p>
        )}
      </Fragment>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100 ">
      <Intro onSearch={searchPhotosHandler} />
      <div className="container-fluid px-6 mb-4">{content}</div>
      {showModal && (
        <Modal
          src={src}
          onClose={modalCloseHandler}
          authorName={authorName}
          authorUrl={authorUrl}
        />
      )}
      <Footer />
    </div>
  );
};

export default App;
