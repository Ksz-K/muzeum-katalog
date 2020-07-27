import React, { useEffect, Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { deleteExposition, mark2edit } from "../../actions/loadMuseums";
import Spinner from "./Spinner";
import { setAlert } from "../../actions/alert";

const ManageMuseums = () => {
  const dispatch = useDispatch();

  const museumsLoaded = useSelector((state) => state.loadMuseums);

  const [expoExists, setExpoExists] = useState(false);

  const [pageContent, setPageContent] = useState([]);
  const [museum, setMuseum] = useState({
    name: "",
    address: "",
    description: "",
    photo: "",
    slug: "",
    museumID: "",
    owner: "",
    averageRating: "",
  });

  useEffect(() => {
    if (museumsLoaded.owned[0] !== undefined) {
      setExpoExists(museumsLoaded.owned[0].expositions.length);
      setPageContent(museumsLoaded.owned[0].expositions);
      setMuseum({
        name: museumsLoaded.owned[0].name,
        address: museumsLoaded.owned[0].location.formattedAddress,
        description: museumsLoaded.owned[0].description,
        photo: museumsLoaded.owned[0].photo,
        slug: museumsLoaded.owned[0].slug,
        museumID: museumsLoaded.owned[0]._id,
        owner: museumsLoaded.owned[0].user,
        averageRating: museumsLoaded.owned[0].averageRating || "*",
      });
    }
  }, [museumsLoaded.owned]);

  //Redirect if page reloaded
  if (museumsLoaded.museumsNo === null) {
    return <Redirect to="/" />;
  }

  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <Link
                to="/managemuseums"
                className="btn btn-link text-secondary my-3"
              >
                <i className="fas fa-chevron-left"></i> Powrót do sekcji Muzeum
              </Link>
              <h1 className="mb-4">Zarządzaj Wystawami</h1>
              <div className="card mb-3">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img
                      src={`http://localhost:5000/uploads/${museum.photo}`}
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">
                        <Link to={`/museums/${museum.slug}`}>
                          {museum.name}
                          <span className="float-right badge badge-success">
                            {museum.averageRating}
                          </span>
                        </Link>
                      </h5>
                      <span className="badge badge-dark mb-2">
                        {museum.address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                to="/addexposition"
                className="btn btn-primary btn-block mb-4"
                onClick={() => {
                  dispatch(mark2edit(""));
                }}
              >
                Dodaj wystawę{" "}
              </Link>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">
                      {pageContent.length
                        ? "Tytuł"
                        : "To Muzeum nie posiada wystaw"}
                    </th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {pageContent.map((exposition, index) => (
                    <tr key={index}>
                      <td>{exposition.title}</td>
                      <td className="text-right">
                        <Link
                          to="/addexposition"
                          className="btn btn-secondary"
                          onClick={() => {
                            dispatch(mark2edit(exposition._id));
                          }}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </Link>
                        <Link
                          className="btn btn-danger"
                          to="/manageexpositions"
                          onClick={() => {
                            if (window.confirm("Usunąć wystawę?")) {
                              dispatch(
                                deleteExposition(exposition._id, museum.owner)
                              );
                            }
                          }}
                        >
                          <i className="fas fa-times"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageMuseums;
