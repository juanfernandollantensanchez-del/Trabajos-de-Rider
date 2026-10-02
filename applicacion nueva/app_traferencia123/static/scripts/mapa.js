window.mapa = null;

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("mapa");
  if (!contenedor || typeof L === "undefined") return;

  // Renderizado por Canvas para eliminar la lentitud
  const map = L.map("mapa", { preferCanvas: true }).setView([20, 0], 2);

  // ASIGNACIÓN CRÍTICA: Asignamos la instancia a window.mapa para que otros scripts la reconozcan
  window.mapa = map;

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  setTimeout(() => map.invalidateSize(), 250);

  const rutas = [
    {
      nombre: "Ruta 1: Centro Histórico -> Parque Caldas",
      origen: [2.4419, -76.6063],
      destino: [2.4448, -76.6147]
    },
    {
      nombre: "Ruta 2: Campanario -> Hospital San José",
      origen: [2.4560, -76.5980],
      destino: [2.4480, -76.6050]
    },
    {
      nombre: "Ruta 3: Unicauca -> Barrio Bolivar",
      origen: [2.4435, -76.6001],
      destino: [2.4485, -76.6090]
    }
  ];

  const selectRutas = document.getElementById("select-rutas");
  const inputOrigen = document.getElementById("coord-origen");
  const inputDestino = document.getElementById("coord-destino");

  if (selectRutas) {
    selectRutas.innerHTML = '<option value="">-- Personalizada / Selecciona una Ruta --</option>';
    rutas.forEach((r, idx) => {
      const opt = document.createElement("option");
      opt.value = idx;
      opt.textContent = r.nombre;
      selectRutas.appendChild(opt);
    });

    selectRutas.addEventListener("change", (e) => {
      const selected = rutas[e.target.value];
      if (selected) {
        if (inputOrigen) inputOrigen.value = selected.origen.join(", ");
        if (inputDestino) inputDestino.value = selected.destino.join(", ");
      }
    });
  }

  let capaRuta = null;
  let marcadores = [];

  function parseCoord(str) {
    if (!str) return null;
    const parts = str.split(",").map(n => parseFloat(n.trim()));
    return (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) ? parts : null;
  }

  async function trazarRutaPorCalles(origen, destino) {
    const url = `https://router.project-osrm.org/route/v1/driving/${origen[1]},${origen[0]};${destino[1]},${destino[0]}?overview=full&geometries=geojson`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!data.routes || data.routes.length === 0) {
        alert("No se encontró una ruta de navegación.");
        return;
      }

      capaRuta = L.geoJSON(data.routes[0].geometry, {
        style: { color: "#10b981", weight: 6, opacity: 0.8 }
      }).addTo(map);

      const m1 = L.marker(origen).addTo(map).bindPopup("<b>Origen</b>");
      const m2 = L.marker(destino).addTo(map).bindPopup("<b>Destino</b>");
      marcadores.push(m1, m2);

      map.fitBounds(capaRuta.getBounds(), { padding: [40, 40] });
    } catch (err) {
      console.error("Error al trazar ruta:", err);
    }
  }

  const btnTrazar = document.getElementById("btn-trazar-seleccion");
  if (btnTrazar) {
    btnTrazar.addEventListener("click", () => {
      if (capaRuta) map.removeLayer(capaRuta);
      marcadores.forEach(m => map.removeLayer(m));
      marcadores = [];

      const idx = selectRutas ? selectRutas.value : "";
      let orig = idx !== "" && rutas[idx] ? rutas[idx].origen : parseCoord(inputOrigen?.value);
      let dest = idx !== "" && rutas[idx] ? rutas[idx].destino : parseCoord(inputDestino?.value);

      if (orig && dest) {
        trazarRutaPorCalles(orig, dest);
      } else {
        alert("Ingresa o selecciona coordenadas válidas.");
      }
    });
  }

  const btnLimpiar = document.getElementById("btn-limpiar");
  if (btnLimpiar) {
    btnLimpiar.addEventListener("click", () => {
      if (capaRuta) map.removeLayer(capaRuta);
      marcadores.forEach(m => map.removeLayer(m));
      marcadores = [];
      map.eachLayer((layer) => {
        if (layer instanceof L.Polyline || layer instanceof L.Marker || layer instanceof L.CircleMarker) {
          map.removeLayer(layer);
        }
      });
      if (inputOrigen) inputOrigen.value = "";
      if (inputDestino) inputDestino.value = "";
      if (selectRutas) selectRutas.value = "";
    });
  }
});