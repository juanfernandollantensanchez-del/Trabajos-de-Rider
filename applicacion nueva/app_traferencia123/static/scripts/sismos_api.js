document.addEventListener("DOMContentLoaded", () => {
  const btnSismos = document.getElementById("btn-sismos");
  const estadoSismos = document.getElementById("estado-sismos");

  if (!btnSismos) return;

  let capaSismos = null;

  // Endpoint del USGS con el registro sísmico global completo (todos los sismos del mundo)
  const URL_API_GLOBAL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

  btnSismos.addEventListener("click", async () => {
    if (!window.mapa) {
      alert("El mapa no está listo.");
      return;
    }

    if (estadoSismos) estadoSismos.textContent = "Cargando todos los sismos registrados en el mundo...";

    try {
      const res = await fetch(URL_API_GLOBAL);
      const data = await res.json();

      // Limpiar capas previas
      if (capaSismos) {
        window.mapa.removeLayer(capaSismos);
      }

      // Restablecer la vista del mapa para ver todo el planeta
      window.mapa.setView([20, 0], 2);

      // Dibujar todos los sismos del mundo
      capaSismos = L.geoJSON(data, {
        pointToLayer: (feature, latlng) => {
          const mag = feature.properties.mag || 1;
          return L.circleMarker(latlng, {
            radius: Math.max(mag * 2.5, 3),
            fillColor: mag >= 5.0 ? "#ef4444" : mag >= 3.0 ? "#f97316" : "#eab308",
            color: "#ffffff",
            weight: 0.8,
            opacity: 0.9,
            fillOpacity: 0.7
          });
        },
        onEachFeature: (feature, layer) => {
          const props = feature.properties;
          const fecha = new Date(props.time).toLocaleString();
          const profundidad = feature.geometry.coordinates[2];

          layer.bindPopup(`
            <div style="color: #0f172a; font-family: sans-serif;">
              <h4 style="margin: 0 0 5px 0;">🌐 Evento Sísmico</h4>
              <b>Lugar:</b> ${props.place || "Ubicación no especificada"}<br>
              <b>Magnitud:</b> <span style="color: #dc2626; font-weight: bold;">${props.mag ?? "N/A"}</span><br>
              <b>Profundidad:</b> ${profundidad} km<br>
              <b>Fecha y Hora:</b> ${fecha}
            </div>
          `);
        }
      }).addTo(window.mapa);

      if (estadoSismos) {
        estadoSismos.textContent = `¡Listo! Se cargaron ${data.features.length} sismos registrados en todo el mundo.`;
      }
    } catch (err) {
      console.error("Error al obtener los sismos mundiales:", err);
      if (estadoSismos) estadoSismos.textContent = "Error al cargar el registro sísmico mundial.";
    }
  });
});