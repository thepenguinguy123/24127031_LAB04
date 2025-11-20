import { useState, useEffect } from 'react'
import './WeatherDisplay.css'

export default function WeatherDisplay({ lat, lon, locationName }) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true)
        setError(null)

        // Using Open-Meteo API (free, no API key required)
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
        )

        const data = await response.json()

        if (data.current) {
          setWeather({
            temperature: data.current.temperature_2m,
            humidity: data.current.relative_humidity_2m,
            windSpeed: data.current.wind_speed_10m,
            weatherCode: data.current.weather_code,
            timezone: data.timezone,
          })
        }
      } catch (err) {
        setError('Không thể tải dữ liệu thời tiết')
        console.error('Weather fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    if (lat && lon) {
      fetchWeather()
    }
  }, [lat, lon])

  const getWeatherDescription = (code) => {
    const descriptions = {
      0: { text: 'Trời quang', icon: '☀️' },
      1: { text: 'Có mây', icon: '🌤️' },
      2: { text: 'Mây từng phần', icon: '⛅' },
      3: { text: 'Mây nhiều', icon: '☁️' },
      45: { text: 'Sương mù', icon: '🌫️' },
      48: { text: 'Sương mù với mưa tuyết', icon: '🌫️' },
      51: { text: 'Mưa nhẹ', icon: '🌦️' },
      53: { text: 'Mưa vừa', icon: '🌧️' },
      55: { text: 'Mưa nặng', icon: '⛈️' },
      61: { text: 'Mưa nhẹ', icon: '🌦️' },
      63: { text: 'Mưa vừa', icon: '🌧️' },
      65: { text: 'Mưa nặng', icon: '⛈️' },
      71: { text: 'Tuyết nhẹ', icon: '🌨️' },
      73: { text: 'Tuyết vừa', icon: '🌨️' },
      75: { text: 'Tuyết nặng', icon: '🌨️' },
      77: { text: 'Hạt tuyết', icon: '🌨️' },
      80: { text: 'Mưa rào nhẹ', icon: '🌦️' },
      81: { text: 'Mưa rào vừa', icon: '🌧️' },
      82: { text: 'Mưa rào nặng', icon: '⛈️' },
      85: { text: 'Tuyết rào nhẹ', icon: '🌨️' },
      86: { text: 'Tuyết rào nặng', icon: '🌨️' },
      95: { text: 'Bão (có sét)', icon: '⛈️' },
      96: { text: 'Bão (có sét, mưa tuyết)', icon: '⛈️' },
      99: { text: 'Bão (có sét, mưa tuyết)', icon: '⛈️' },
    }

    return descriptions[code] || { text: 'Không rõ', icon: '🌡️' }
  }

  if (loading) {
    return <div className="weather-container loading">⏳ Đang tải thời tiết...</div>
  }

  if (error || !weather) {
    return <div className="weather-container error">{error || 'Không có dữ liệu thời tiết'}</div>
  }

  const weatherInfo = getWeatherDescription(weather.weatherCode)

  return (
    <div className="weather-container">
      <div className="weather-header">
        <h3>🌤️ Thời Tiết Tại {locationName}</h3>
      </div>

      <div className="weather-main">
        <div className="weather-icon">{weatherInfo.icon}</div>
        <div className="weather-info">
          <div className="temperature">
            <span className="value">{Math.round(weather.temperature)}°C</span>
            <span className="label">Nhiệt độ</span>
          </div>
          <div className="condition">
            <span className="value">{weatherInfo.text}</span>
            <span className="label">Điều kiện</span>
          </div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">💨 Tốc độ gió</span>
          <span className="detail-value">{Math.round(weather.windSpeed)} km/h</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">💧 Độ ẩm</span>
          <span className="detail-value">{weather.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">📍 Múi giờ</span>
          <span className="detail-value">{weather.timezone}</span>
        </div>
      </div>

      <div className="weather-footer">
        <small>Dữ liệu từ Open-Meteo API</small>
      </div>
    </div>
  )
}
