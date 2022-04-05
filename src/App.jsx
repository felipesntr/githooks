import { useState, useEffect } from "react";
import "./app.css";
function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://api.github.com/users/diego3g/repos"
      );
      const data = await response.json();
      setRepositories(data);
    })();
  }, []);

  useEffect(() => {
    let favorites = 0;
    for (let i = 0; i < repositories.length; i++) {
      if (repositories[i].favorite) favorites++;
    }
    window.document.title = `Você tem ${favorites} favoritos`;
  }, [repositories]);

  const toggleFavorite = (id) => {
    const newRepositories = repositories.map((repository) => {
      if (repository.id === id) {
        return {
          ...repository,
          favorite: !repository.favorite,
        };
      }
      return repository;
    });
    setRepositories(newRepositories);
  };

  return (
    <>
      <ul className="repo-list">
        {repositories.map((repository) => (
          <li key={repository.id} onClick={() => toggleFavorite(repository.id)}>
            <a href={repository.svn_url}>{repository.name}</a>
            {repository.favorite && <span> *</span>}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
