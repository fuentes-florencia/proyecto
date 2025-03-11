import React, { useState, useEffect } from 'react';

export const Peticiones = () => {
  // 1. Crear un lugar para guardar el nombre que escribimos
  const [busqueda, setBusqueda] = useState('');

  // 2. Crear un lugar para guardar los personajes que encontramos
  const [resultados, setResultados] = useState([]);

  // 3. Crear un lugar para saber si estamos buscando (cargando)
  const [estaCargando, setEstaCargando] = useState(false);

  // 4. Crear un lugar para guardar si hubo un error
  const [huboError, setHuboError] = useState(null);

  // 5. Cuando escribimos en el lugar para escribir, guardar lo que escribimos
  const manejarCambio = (evento) => {
    setBusqueda(evento.target.value);
  };

  // 6. Cuando el nombre que buscamos cambia, buscar en internet
  useEffect(() => {
    const buscar = async () => {
      if (!busqueda) {
        setResultados([]);
        return;
      }

      setEstaCargando(true);
      setHuboError(null);

      try {
        const respuesta = await fetch(
          `https://api.potterdb.com/v1/characters?filter[name_cont]=${busqueda}`
        );

        if (!respuesta.ok) {
          throw new Error(`Error: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        setResultados(datos.data);
      } catch (e) {
        setHuboError(e);
        setResultados([]);
      } finally {
        setEstaCargando(false);
      }
    };

    buscar();
  }, [busqueda]);

  // 14. Mostrar todo en la pantalla
  return (
    <div>
      {/* 15. Lugar para escribir el nombre */}
      <input
        type="text"
        placeholder="Escribe el nombre del personaje"
        value={busqueda}
        onChange={manejarCambio}
      />

      {/* 16. Si estamos cargando, mostrar "Cargando..." */}
      {estaCargando && <p>Cargando...</p>}

      {/* 17. Si hubo un error, mostrar el error */}
      {huboError && <p>Error: {huboError.message}</p>}

      {/* 18. Si encontramos personajes, mostrarlos */}
      {resultados.length > 0 && (
        <div>
          {resultados.map((personaje) => (
            <div key={personaje.id}>
              {/* 19. Mostrar el nombre del personaje */}
              <h2>{personaje.attributes.name}</h2>

              {/* 20. Mostrar la imagen del personaje */}
              {personaje.attributes.image && (
                <img
                  src={personaje.attributes.image}
                  alt={personaje.attributes.name}
                  style={{ maxWidth: '200px' }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};