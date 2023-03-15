import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./favoritos.css";

function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const milhaLista = localStorage.getItem("@cineflix");
    setFilmes(JSON.parse(milhaLista) || []);
  }, []);

  return (
    <div className="meus-filmes">
      <h1>Meus filmes</h1>
      <ul>
        <li>
          {filmes.map((item) => {
            return (
              <li key={item.id}>
                <span>{item.title}</span>
                <div>
                  <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                  <button>Excluir</button>
                </div>
              </li>
            );
          })}
        </li>
      </ul>
    </div>
  );
}

export default Favoritos;
