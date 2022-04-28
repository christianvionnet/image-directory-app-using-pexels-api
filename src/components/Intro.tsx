import React, { FC, FormEvent, useState } from "react";

import Input from "./Input";

interface IntroProps {
  onSearch: (value: string, value2: number) => void;
}

const Intro: FC<IntroProps> = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    onSearch(search, limit);
    setSearch("");
    setLimit(10);
  };

  return (
    <section>
      {/* <div className="hero-body">
        <div className="container">
          <h1 className="title is-uppercase mb-6">
            Best free stock photos in one place
          </h1>
          <form onSubmit={submitHandler} className="form">
            <Input
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              placeholder="Search..."
            />
            <button className="button is-large is-danger ml-4">Search</button>
          </form>
        </div>
      </div> */}

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
                      onChange={(e) => setSearch(e.currentTarget.value)}
                      placeholder="Type here to search..."
                    />
                  </div>
                  <div className="mb-3 form-group">
                    <label className="form-label">Source</label>
                    <br />
                    <select id="endpoint" name="endpoint">
                      <option value="1" selected>
                        Pexels
                      </option>
                      <option value="2">
                        Other source (not available yet)
                      </option>
                    </select>
                  </div>
                  <div className="mb-3 form-group">
                    <label className="form-label">Limit</label>
                    <br />
                    <select
                      id="limit"
                      name="limit"
                      onChange={(e) => {
                        // const selectedLimit = e.target.value;
                        setLimit(parseInt(e.target.value));
                        console.log(typeof parseInt(e.target.value));
                      }}
                    >
                      <option value={10} selected>
                        10
                      </option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                      {/* <option value="250">250</option>
                      <option value="500">500</option>
                      <option value="750">750</option>
                      <option value="1000">1,000</option>
                      <option value="1500">1,500</option>
                      <option value="2000">2,000</option>
                      <option value="4000">4,000</option>
                      <option value="6000">6,000</option>
                      <option value="8000">8,000</option>
                      <option value="10000">10,000</option> */}
                    </select>
                  </div>
                  <div className="mb-3 form-group">
                    <label className="form-label">Attribution</label>
                    <br />
                    <select id="attr" name="attr">
                      <option value="1">Yes</option>
                      <option value="0" selected>
                        No (Royalty Free)
                      </option>
                    </select>
                  </div>
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
