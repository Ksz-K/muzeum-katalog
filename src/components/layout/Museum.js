import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loadingTrue } from "../../actions/loadMuseums";
import cutText from "../../utils/cutText";

const Museum = ({
  name,
  address,
  description,
  photo,
  www_url,
  museumID,
  averageRating,
  paginationViewStatus,
}) => {
  const dispatch = useDispatch();
  return (
    <div className={`card mb-3 ${paginationViewStatus}`}>
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={`/uploads/${photo}`} className="card-img" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              <Link
                to={`/museums/${www_url}`}
                onClick={() => dispatch(loadingTrue())}
              >
                {name}
                <span className="float-right badge badge-success">
                  {averageRating.toFixed(2)}
                </span>
              </Link>
            </h5>
            <span className="badge badge-dark mb-2"> {address}</span>
            <p className="card-text">{cutText(description)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Museum;
