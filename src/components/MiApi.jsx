import React from "react";
import { FaSortNumericUp, FaSortNumericDown } from "react-icons/fa";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

const MiApi = ({ search }) => {
  const [movies, setMovies] = useState([]);
  const [sortDate, setSortDate] = useState("");

  //llama al servicio cuando se renderiza.
  useEffect(() => {
    consultarInformacion();
  }, []);

  //llamada al servicio de modo asyncrono.
  const consultarInformacion = async () => {
    const url = "https://ghibliapi.herokuapp.com/films/";
    const response = await fetch(url);
    const data = await response.json();

    setMovies(data);

    console.log(movies);
  };

  return (
    <div className="container moviesList">
      <h1 className="pb-3 text-white">Listado de Peliculas Studio Ghibli</h1>

      <div className="sortButtons pb-3">
        <h6 className="text-white">Ordenar por Fecha de Estreno</h6>
        <button
          onClick={() => setSortDate("1")}
          type="button"
          className="btn btn-dark"
        >
          Ascendente <FaSortNumericUp />
        </button>
        <button
          onClick={() => setSortDate("-1")}
          type="button"
          className="btn btn-dark"
        >
          Descendente <FaSortNumericDown />
        </button>
      </div>

      <div className="row gx-3">
        {movies
          .filter((movie) => { //Se establece filtro segun contenido de la barra del busqueda que se guarda en variable search
            if (search === "") {
              return movie;
            } else if (
              movie.title
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase()) ||
              movie.original_title_romanised
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())
            ) {
              return movie;
            }
          })
          .sort((a, b) => { //Se hace el sort ascendente o descendente segun botton presionado. 
            if (sortDate === "1")
              return a.release_date > b.release_date
                ? 1
                : a.release_date < b.release_date
                ? -1
                : 0;
            else if (sortDate === "-1")
              return a.release_date < b.release_date
                ? 1
                : a.release_date > b.release_date
                ? -1
                : 0;
          })
          .map((movie) => ( /*Se lee arreglo con los datos cargados desde la llamada a la Api y se renderizan en pantalla en Cards*/
            <div className="col-12 col-md-6 col-lg-4 text-black mb-3">
              <Card>
                <Card.Header>
                  <h5>{movie.title}</h5>
                  <h6>({movie.original_title_romanised})</h6>
                </Card.Header>
                <Card.Img variant="top" src={movie.image} />
                <Card.Body>
                  <Card.Title>
                    <h5>Año de Estreno</h5>
                    <h3>{movie.release_date}</h3>
                  </Card.Title>
                </Card.Body>
                <Card.Footer className="text-muted">
                  Rating: {movie.rt_score}
                </Card.Footer>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MiApi;
