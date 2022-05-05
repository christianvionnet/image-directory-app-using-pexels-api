import React from "react";

interface Props {
  total_results: number;
  page: number;
  loadMoreHandler: (e: any) => void;
  btnLoading: boolean;
  limit: number;
}

const LoadMore: React.FC<Props> = ({
  total_results,
  page,
  loadMoreHandler,
  btnLoading,
  limit,
}) => {
  return (
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
  );
};

export default LoadMore;
