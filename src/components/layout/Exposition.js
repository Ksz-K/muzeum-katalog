import React from "react";

const Exposition = ({ title, description }) => {
  return (
    <div className="card mb-3">
      <h5 className="card-header bg-primary text-white">{title}</h5>
      <div className="card-body">
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
};

export default Exposition;
