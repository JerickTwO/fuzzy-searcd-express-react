// src/FuzzySearch.js
import { useState } from "react";

const FuzzySearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);

    if (searchQuery) {
      try {
        // Hacer la solicitud al backend usando fetch
        const response = await fetch(
          `http://localhost:5000/api/items?q=${searchQuery}`
        );

        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }

        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error al buscar datos:", error);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h1>Búsqueda Difusa con Base de Datos</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Buscar..."
        style={{ width: "100%", padding: "8px", fontSize: "16px" }}
      />
      <ul style={{ marginTop: "20px" }}>
        {results.length > 0 ? (
          results.map((item) => (
            <li key={item.id} style={{ padding: "5px 0", fontSize: "18px" }}>
              {item.name}
            </li>
          ))
        ) : (
          <li style={{ padding: "5px 0", fontSize: "18px", color: "gray" }}>
            No se encontraron resultados
          </li>
        )}
      </ul>
    </div>
  );
};

export default FuzzySearch;
