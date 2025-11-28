import { useState } from 'react'
import './Translator.css'

export default function Translator() {
  const [isOpen, setIsOpen] = useState(false)
  const [englishText, setEnglishText] = useState('')
  const [vietnameseText, setVietnameseText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleTranslate = async () => {
    if (!englishText.trim()) {
      setError('Vui lòng nhập tiếng Anh để dịch')
      return
    }

    setLoading(true)
    setError(null)
    setVietnameseText('')

    try {
      // Using MyMemory API (free, no API key required)
      const encodedText = encodeURIComponent(englishText)
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|vi`,
        {
          headers: {
            'User-Agent': 'MyMemory/1.0',
          },
        }
      )

      if (!response.ok) {
        throw new Error('Dịch thuật thất bại')
      }

      const data = await response.json()

      if (data.responseStatus === 200 && data.responseData.translatedText) {
        setVietnameseText(data.responseData.translatedText)
      } else {
        throw new Error('Không có kết quả dịch')
      }
    } catch (err) {
      console.error('Translation error:', err)
      setError('Không thể dịch. Vui lòng thử lại hoặc kiểm tra kết nối mạng!')
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setEnglishText('')
    setVietnameseText('')
    setError(null)
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    alert('✅ Đã sao chép vào clipboard!')
  }

  if (!isOpen) {
    return (
      <button
        className="translator-toggle"
        onClick={() => setIsOpen(true)}
        title="Mở dịch thuật"
      >
        🌐
      </button>
    )
  }

  return (
    <div className="translator-popup">
      <div className="translator-header">
        <h3>🌐 Dịch Thuật Anh → Việt</h3>
        <button
          className="translator-close"
          onClick={() => setIsOpen(false)}
          title="Đóng"
        >
          ✕
        </button>
      </div>

      <div className="translator-body">
        <div className="translator-section">
          <label className="translator-label">📝 Tiếng Anh</label>
          <textarea
            value={englishText}
            onChange={(e) => setEnglishText(e.target.value)}
            placeholder="Nhập câu tiếng Anh cần dịch..."
            className="translator-textarea"
            rows="4"
            disabled={loading}
          />
        </div>

        <div className="translator-section">
          <label className="translator-label">🇻🇳 Tiếng Việt</label>
          <textarea
            value={vietnameseText}
            readOnly
            placeholder="Kết quả dịch sẽ hiển thị ở đây..."
            className="translator-textarea result"
            rows="4"
          />
        </div>

        {error && <div className="translator-error">{error}</div>}

        <div className="translator-actions">
          <button
            className="translator-btn translate-btn"
            onClick={handleTranslate}
            disabled={loading || !englishText.trim()}
          >
            {loading ? '⏳ Đang dịch...' : '🔄 Dịch'}
          </button>
          <button
            className="translator-btn clear-btn"
            onClick={handleClear}
            disabled={loading}
          >
            🗑️ Xóa
          </button>
          {vietnameseText && (
            <button
              className="translator-btn copy-btn"
              onClick={() => handleCopy(vietnameseText)}
              disabled={loading}
            >
              📋 Copy
            </button>
          )}
        </div>
      </div>

      <div className="translator-footer">
        <small>Dùng LibreTranslate API</small>
      </div>
    </div>
  )
}
