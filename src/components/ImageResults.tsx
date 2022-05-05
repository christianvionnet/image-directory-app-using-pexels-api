import { Photo } from "pexels";
import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

interface Props {
  pexelsPhotos?: Photo[];
  wikiPhotos?: any[];
  imageClickHandler: (e: any, photo: Photo) => void;
}

const ImageResults: React.FC<Props> = ({
  pexelsPhotos = [],
  wikiPhotos = [],
  imageClickHandler,
}) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 480: 2, 900: 5 }}>
      <Masonry gutter={20}>
        {/* {pexelsPhotos && pexelsPhotos.length > 0 ? (
          <> */}
        {/* {pexelsPhotos.map((photo) => (
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
          </>
        ) : (
          <> */}
        {wikiPhotos.length > 0 &&
          wikiPhotos.map((photo, i) => (
            <div key={i} className="masonry-item">
              <a href="/#">
                <img src={photo} alt="" />
              </a>
            </div>
          ))}
        {/* </>
        )} */}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default ImageResults;