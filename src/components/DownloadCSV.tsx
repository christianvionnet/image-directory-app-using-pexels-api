import { Photo } from "pexels";
import React from "react";
import { CSVLink } from "react-csv";

interface Props {
  photos: Photo[];
  title: string;
  searchFor: string;
}

const DownloadCSV: React.FC<Props> = ({ photos, title, searchFor }) => {
  return (
    <div>
      <h2 className="alert alert-success text-center p-4 mt-6 mx-6">{title}</h2>
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
    </div>
  );
};

export default DownloadCSV;
