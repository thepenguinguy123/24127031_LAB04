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

    try {
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

      // Add search radius circle (5km = 5000 meters)
      const radiusCircle = L.circle([location.lat, location.lon], {
        radius: 5000,
        color: '#667eea',
        weight: 2,
        opacity: 0.3,
        fill: true,
        fillColor: '#667eea',
        fillOpacity: 0.05,
        dashArray: '5, 5',
      }).addTo(map.current)

      markersRef.current.push(radiusCircle)

      // Add location marker - using custom div icon
      const locationMarker = L.marker([location.lat, location.lon], {
        icon: L.divIcon({
          html: '<div style="background: #4CAF50; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px;">📍</div>',
          iconSize: [36, 36],
          iconAnchor: [18, 36],
          popupAnchor: [0, -36],
        }),
      })
        .addTo(map.current)
        .bindPopup(`<strong>${location.name}</strong><br/><small>Vị trí tìm kiếm - Bán kính tìm kiếm: 5km</small>`)

      markersRef.current.push(locationMarker)

      // Add POI markers
      if (pois && pois.length > 0) {
        pois.forEach((poi, idx) => {
          const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']
          const color = colors[idx % colors.length]

          const customIcon = L.divIcon({
            html: `<div style="background: ${color}; width: 36px; height: 36px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px;">${idx + 1}</div>`,
            iconSize: [42, 42],
            iconAnchor: [21, 42],
            popupAnchor: [0, -42],
          })

          const marker = L.marker([poi.lat, poi.lon], { icon: customIcon })
            .addTo(map.current)
            .bindPopup(`<strong>${poi.name}</strong><br/><small>${poi.type}</small>`)

          markersRef.current.push(marker)
        })
      }
    } catch (err) {
      console.error('Map error:', err)
    }

    return () => {
      // Keep map persistent
    }
  }, [location, pois])

  return (
    <div className="map-wrapper">
      <div ref={mapContainer} className="map-container"></div>
    </div>
  )
}
