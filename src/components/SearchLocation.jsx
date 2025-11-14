import { useState } from 'react'
import './SearchLocation.css'

export default function SearchLocation({ onSearch, loading }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSearch(input.trim())
    }
  }

  const handleSuggestion = (suggestion) => {
    setInput(suggestion)
    onSearch(suggestion)
  }

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập tên địa điểm ở Việt Nam (VD: Hà Nội, Đà Nẵng, Hạ Long)..."
            className="search-input"
            disabled={loading}
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? '⏳ Đang tìm kiếm...' : '🔍 Tìm kiếm'}
          </button>
        </div>
      </form>

      <div className="suggestions">
        <strong>Gợi ý:</strong>
        <div className="suggestion-buttons">
          {['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hạ Long', 'Hội An'].map((suggestion) => (
            <button
              key={suggestion}
              className="suggestion-btn"
              onClick={() => handleSuggestion(suggestion)}
              disabled={loading}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
