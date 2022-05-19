import React, { FC, FormEvent, useState } from "react";

import Input from "./Input";

interface IntroProps {
  onSearch: (query: string, limit: number, source: string) => void;
}

const Intro: FC<IntroProps> = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState<number>(100);
  const [source, setSource] = useState("pexels");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    onSearch(search, limit, source);
    setSearch("");
  };

  return (
    <section>
      <nav className="navbar navbar-dark bg-primary mb-5">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            ReproductionPress Image Searcher
          </span>
        </div>
      </nav>
      <div className="container">
        <div className="row align-items-start">
          <div className="col">
            <div className="card ">
              <div className="card-header">MediaWiki Images</div>
              <div className="card-body">
                <h5 className="card-title">Search MediaWiki</h5>
                <form onSubmit={submitHandler}>
                  <div className="mb-3 form-group">
                    <label className="form-label">Title</label>
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Type here to search..."
                    />
                  </div>
                  <div className="mb-3 form-group">
                    <label className="form-label">Source</label>
                    <br />
                    <select
                      id="endpoint"
                      name="endpoint"
                      onChange={(e) => {
                        setSource(e.target.value);
                      }}
                    >
                      <option value="pexels" selected>
                        Pexels
                      </option>
                      <option value="wikimedia">WikiMedia Commons</option>
                      <option value="wikipedia">Wikipedia</option>
                    </select>
                  </div>
                  <div className="mb-3 form-group">
                    <label className="form-label">Limit</label>
                    <br />
                    <select
                      id="limit"
                      name="limit"
                      onChange={(e) => {
                        setLimit(parseInt(e.target.value));
                      }}
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100} selected>
                        100 (max for Pexels)
                      </option>
                      <option value={250}>250</option>
                      <option value={500}>500</option>
                      <option value={1000}>1000</option>
                      <option value={2000}>2000</option>
                    </select>
                  </div>
                  {/* <div className="mb-3 form-group">
                    <label className="form-label">Attribution</label>
                    <br />
                    <select
                      id="attr"
                      name="attr"
                    >
                      <option value="yes">Yes</option>
                      <option value="no" selected>
                        No (Royalty Free)
                      </option>
                    </select>
                  </div> */}
                  <button type="submit" className="btn btn-sm btn-primary">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
