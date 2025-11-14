import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import './MapDisplay.css'

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

export default function MapDisplay({ location, pois }) {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const markersRef = useRef([])

  useEffect(() => {
    if (!mapContainer.current) return

    // Initialize map
    if (!map.current) {
      map.current = L.map(mapContainer.current).setView([location.lat, location.lon], 13)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
      }).addTo(map.current)
    } else {
      map.current.setView([location.lat, location.lon], 13)
    }

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current = []

    // Add location marker
    const locationMarker = L.marker([location.lat, location.lon], {
      icon: L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      }),
    })
      .addTo(map.current)
      .bindPopup(`<strong>${location.name}</strong>`)

    markersRef.current.push(locationMarker)

    // Add POI markers
    if (pois && pois.length > 0) {
      pois.forEach((poi, idx) => {
        const customIcon = L.divIcon({
          html: `<div class="custom-marker" style="background: hsl(${(idx * 360) / 5}, 70%, 50%)">${idx + 1}</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
        })

        const marker = L.marker([poi.lat, poi.lon], { icon: customIcon })
          .addTo(map.current)
          .bindPopup(`<strong>${poi.name}</strong><br/><small>${poi.type}</small>`)

        markersRef.current.push(marker)
      })
    }

    return () => {
      // Cleanup is handled by keeping map instance persistent
    }
  }, [location, pois])

  return (
    <div className="map-wrapper">
      <div ref={mapContainer} className="map-container"></div>
    </div>
  )
}
