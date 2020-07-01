import React from "react";

const Landing = () => {
  return (
    <section className="showcase">
      <div className="dark-overlay">
        <div className="showcase-inner container">
          <h1 className="display-4">Muzea - wyszukiwarka </h1>
          <p className="lead">
            Tu znajdziesz informacje o muzeach, wystawach i opiniach
            zwiedzających
          </p>
          <form>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="miles"
                    placeholder="Obręb wyszukiwania"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="zipcode"
                    placeholder="Miasto"
                  />
                </div>
              </div>
            </div>
            <input
              type="submit"
              value="Znajdź Muzeum"
              className="btn btn-primary btn-block"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Landing;
