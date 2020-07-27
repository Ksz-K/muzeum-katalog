import React, { useEffect, Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { deleteMuseum, addPhotoMuseum } from "../../actions/loadMuseums";
import { countMuseums } from "../../actions/museum";
import Spinner from "./Spinner";
import { setAlert } from "../../actions/alert";

const ManageMuseums = () => {
  const dispatch = useDispatch();

  const museumsLoaded = useSelector((state) => state.loadMuseums);

  const [isOwner, setIsOwner] = useState(false);
  const [pageContent, setPageContent] = useState({
    name: "",
    photo: "",
    slug: "",
    formattedAddress: "",
    averageRating: "*",
    id: "",
  });

  useEffect(() => {
    if (museumsLoaded.owned === undefined || museumsLoaded.owned.length === 0) {
      setIsOwner(false);
    } else {
      setIsOwner(true);
      setPageContent({
        name: museumsLoaded.owned[0].name,
        photo: museumsLoaded.owned[0].photo,
        slug: museumsLoaded.owned[0].slug,
        formattedAddress: museumsLoaded.owned[0].location.formattedAddress,
        averageRating:
          museumsLoaded.owned[0].averageRating > 0
            ? museumsLoaded.owned[0].averageRating
            : "*",
        id: museumsLoaded.owned[0]._id,
      });
    }
  }, [museumsLoaded.owned]);

  //Redirect if page reloaded
  if (museumsLoaded.museumsNo === null) {
    return <Redirect to="/" />;
  }

  async function handleImageUpload(event) {
    const imageFile = event.target.files[0];
    // console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
    //  console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 4000,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      // console.log(
      //   "compressedFile instanceof Blob",
      //   compressedFile instanceof Blob
      // );
      // console.log(
      //   `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      // );

      await dispatch(addPhotoMuseum(compressedFile, pageContent.id));
    } catch (error) {
      //  console.log(error);
      dispatch(setAlert("error", "danger"));
    }
  }

  return (
    <Fragment>
      {!isOwner && (
        <Fragment>
          <section className="container" style={{ marginTop: "10vh" }}>
            <div className="row">
              <div className="col-md-8 m-auto">
                <div className="card bg-white py-2 px-4">
                  <div className="card-body">
                    <h1 className="mb-2">Zarządzanie Muzeum</h1>
                    <p className="lead">
                      Nie masz jeszcze Muzeum - kliknij link poniżej aby
                      utworzyć
                    </p>
                    <Link to="/addmuseum" className="btn btn-primary btn-block">
                      Utwórz Muzeum
                    </Link>

                    <p className="text-muted mt-5">
                      * Konto Muzealnika umożliwia utworzenie jednego Muzeum
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      )}
      {isOwner && (
        <Fragment>
          {museumsLoaded.loading ? (
            <Fragment>
              <Spinner />
            </Fragment>
          ) : (
            <section className="container" style={{ marginTop: "10vh" }}>
              <div className="row">
                <div className="col-md-8 m-auto">
                  <div className="card bg-white py-2 px-4">
                    <div className="card-body">
                      <h1 className="mb-4">Zarządzaj swoim Muzeum</h1>
                      <div className="card mb-3">
                        <div className="row no-gutters">
                          <div className="col-md-4">
                            <img
                              src={`http://localhost:5000/uploads/${pageContent.photo}`}
                              className="card-img"
                              alt="..."
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="card-body">
                              <h5 className="card-title">
                                <Link to={`/museums/${pageContent.slug}`}>
                                  {pageContent.name}
                                  <span className="float-right badge badge-success">
                                    {pageContent.averageRating}
                                  </span>
                                </Link>
                              </h5>
                              <span className="badge badge-dark mb-2">
                                {pageContent.formattedAddress}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <form className="mb-4">
                        <div className="form-group">
                          <div className="custom-file">
                            <label className="custom-file-label">
                              {pageContent.photo.length > 24
                                ? "Zmień zdjęcie Muzeum"
                                : "Dodaj zdjęcie Muzeum"}
                            </label>
                            <input
                              type="file"
                              className="custom-file-input"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e)}
                            />
                          </div>
                        </div>
                      </form>

                      <Link
                        to="/addmuseum"
                        className="btn btn-primary btn-block"
                      >
                        Edytuj dane Muzeum{" "}
                      </Link>

                      <Link
                        to="/manageexpositions"
                        className="btn btn-secondary btn-block"
                      >
                        Zarządzaj wystawami
                      </Link>
                      <Link
                        className="btn btn-danger btn-block"
                        onClick={() => {
                          if (window.confirm("Usunąć trwale Muzeum?")) {
                            dispatch(deleteMuseum(pageContent.id));
                            dispatch(countMuseums());
                          }
                        }}
                        to="/managemuseums"
                      >
                        Usuń muzeum z Katalogu
                      </Link>
                      <p className="text-muted mt-5">
                        * Konto Muzealnika umożliwia utworzenie jednego Muzeum
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ManageMuseums;
