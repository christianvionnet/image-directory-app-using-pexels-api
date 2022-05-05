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

  const data = useSelector((state: any) => state.wikiPhotos);

  const wikimediaURL = "https://commons.wikimedia.org/w/api.php";
  const wikipediaURL = "https://en.wikipedia.org/w/api.php";

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
    console.log(source);
  }, [source]);

  const searchPhotosHandler = (
    query: string,
    limit: number,
    source: string,
    attribution: string
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
          () => setLoading(false),
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
    console.log(photos);
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
    console.log("data: ", data);
    content = (
      <Fragment>
        {data.wikiPhotos.length > 0 ? (
          <>
            {/* <DownloadCSV
              photos={data.wikiPhotos}
              title={title}
              searchFor={searchFor}
            /> */}
            <h2 className="alert alert-success text-center p-4 mt-6 mx-6">
              {title}
            </h2>

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
      <div className="container-fluid px-6">{content}</div>
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

/*

import React, { FC, useState, MouseEvent, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import "./App.css";

import { CSVLink } from "react-csv";

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

const App: FC = () => {
  const dispatch = useDispatch();
  const { photos, total_results, error } = useSelector(
    (state: RootState) => state.photos
  );
  // const { photos } = useSelector(
  //   (state: RootState) => state.photos
  // );

  const wikimediaURL = "https://commons.wikimedia.org/w/api.php";
  const wikipediaURL = "https://en.wikipedia.org/w/api.php";

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
  const [attribution, setAttribution] = useState("no");
  // const [responses, setResponses] = useState<string[]>([]);
  // const [response, setResponse] = useState({});
  // const [keys, setKeys] = useState<string[]>([]);
  // const [params, setParams] = useState("");

  // let res = {};
  // console.log(res);

  // const fetchData = async (params: string) => {
  //   try {
  //     const data = await fetch(wikimediaURL + "?" + params);
  //     const res = await data.json();
  //     const keys = Object.keys(res.query.pages);
  //     keys.map((key) => console.log(res.query.pages[key].imageinfo[0].url));
  //     // setKeys(keys);
  //     // setResponse(res);
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const wikiHandler = (
  //   title: string,
  //   source: string,
  //   limit: number,
  //   attribution: string
  // ) => {
  //   const gsrlimit = limit.toString();
  //   const iilimit = limit.toString();
  //   const gsroffset = "0";

  //   const params = new URLSearchParams({
  //     action: "query",
  //     gsrsearch: title,
  //     gsrlimit: gsrlimit,
  //     iilimit: iilimit,
  //     format: "json",
  //     generator: "search",
  //     origin: "*",
  //     prop: "imageinfo",
  //     redirects: "1",
  //     gsrnamespace: "6",
  //     iiprop: "canonicaltitle|url|sha1|extmetadata",
  //     iiextmetadatafilter:
  //       "AttributionRequired|LicenseShortName|Restrictions|Permission|UsageTerms|Copyrighted",
  //     gsroffset: gsroffset,
  //   });

  //   const str = params.toString();
  //   console.log(str);
  //   // setParams(str)
  //   // fetchData(str);
  //   setParams(str);
  // };

  const searchPhotosHandler = (
    query: string,
    limit: number,
    source: string,
    attribution: string
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
      setAttribution(attribution);
      console.log(source);
      console.log(attribution);
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
      setAttribution(attribution);
      // dispatch(
      //   getWikiPhotos(
      //     query,
      //     () => setLoading(false),
      //     () => setLoading(false),
      //     limit
      //   )
      // );
      setTitle(`Success! Results for ${query} in Wikimedia`);
      // wikiHandler(query, source, limit, attribution);
    }
  };

  const loadMoreHandler = (e: any) => {
    setBtnLoading(true);
    setPage((prev) => prev + 1);
    console.log(e);
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
    content = (
      <div className="d-flex justify-content-center py-6">
        <div className="loading"></div>
      </div>
    );
  } else {
    console.log(source);
    content = error ? (
      <div className="alert alert-danger mt-6 text-center">{error}</div>
    ) : (
      // source === "pexels" (
      <Fragment>
        {photos.length > 0 ? (
          <div>
            <h2 className="alert alert-success text-center p-4 mt-6 mx-6">
              {title}
            </h2>
            <div className="d-flex justify-content-center mb-5">
              <CSVLink
                data={photos}
                separator={","}
                filename={searchFor}
                className="btn btn-success"
              >
                Download CSV
              </CSVLink>
            </div>
            <ResponsiveMasonry columnsCountBreakPoints={{ 480: 2, 900: 5 }}>
              <Masonry gutter={20}>
                {photos.map((photo) => (
                  <div key={photo.id} className="masonry-item">
                    <a href="/#" onClick={(e) => {}}>
                      <img
                        src={photo.src.large}
                        alt=""
                        onClick={(e) => imageClickHandler(e, photo)}
                      />
                    </a>
                  </div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </div>
        ) : (
          <p className="text-center mt-6">No results</p>
        )}

        <div className="d-flex justify-content-center py-5">
          {total_results > page * 10 && (
            <button
              className="btn btn-primary"
              onClick={(e) => loadMoreHandler(e)}
              disabled={btnLoading}
            >
              {!btnLoading ? (
                `Load ${limit} more`
              ) : (
                <div className="loading loading--small"></div>
              )}
            </button>
          )}
        </div>
      </Fragment>
      // } else if (source === "wikimedia") {
      // }
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100 ">
      <Intro onSearch={searchPhotosHandler} />
      <div className="container-fluid px-6">{content}</div>
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


*/
