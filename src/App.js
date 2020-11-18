import React, { useState, useEffect} from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      url: "https://github.com/Rocketseat/Enio",
      title: "Enio",
      techs: ["Node", "Go", "Flask"]
    })

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`)

    setRepositories(repositories.filter(repository => repository.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button type="submit" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
