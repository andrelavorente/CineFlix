import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./filme-info.css";
import api from "../../services/api";

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "2251310de4cbe1aaac14530e51665dd5",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("filme não encontrado!");
          navigate("/", { replace: true });
          return;
        });
    }
    loadFilme();

    return () => {
      console.log("Componente foi desmontado");
    };
  }, [navigate, id]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@cineflix");

    let filmeSalvo = JSON.parse(minhaLista) || [];

    const hasFilme = filmeSalvo.some(
      (filmeSalvos) => filmeSalvos.id === filme.id
    );

    if (hasFilme) {
      alert("Este filme já está na lista!");
      return;
    }

    filmeSalvo.push(filme);
    localStorage.setItem("@cineflix", JSON.stringify(filmeSalvo));
    alert("Filme salvo com sucesso!");
  }

  if (loading === true) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>

      <strong>Nota: {filme.vote_average.toFixed(1)} / 10</strong>

      <div className="area-button">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a
            target="blank"
            rel="external"
            href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}

export default Filme;
