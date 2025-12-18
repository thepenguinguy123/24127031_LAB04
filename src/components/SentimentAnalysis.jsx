import { useState } from 'react'
import './SentimentAnalysis.css'

const BACKEND_URL = 'https://unappointed-unattempered-benton.ngrok-free.dev'

export default function SentimentAnalysis() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAnalyze = async (e) => {
    e.preventDefault()
    if (!text.trim()) {
      setError('Vui lòng nhập văn bản để phân tích')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch(`${BACKEND_URL}/sentiment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({
          text: text.trim(),
        }),
        mode: 'cors',
        credentials: 'include',
      })

      if (!response.ok) {
        const errorData = await response.text().catch(() => '')
        console.error('Backend response:', errorData)
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      console.error('Sentiment analysis error:', err)
      setError(
        `Lỗi CORS: Backend cần enable CORS. Vui lòng thêm CORS middleware vào FastAPI backend hoặc liên hệ admin.`
      )
    } finally {
      setLoading(false)
    }
  }

  const getSentimentEmoji = (sentiment) => {
    if (!sentiment) return '🤔'
    const lower = sentiment.toLowerCase()
    if (lower.includes('positive') || lower.includes('good')) return '😊'
    if (lower.includes('negative') || lower.includes('bad')) return '😞'
    if (lower.includes('neutral')) return '😐'
    return '🤔'
  }

  const getSentimentColor = (sentiment) => {
    if (!sentiment) return '#999'
    const lower = sentiment.toLowerCase()
    if (lower.includes('positive') || lower.includes('good')) return '#4CAF50'
    if (lower.includes('negative') || lower.includes('bad')) return '#ff6b6b'
    if (lower.includes('neutral')) return '#FFA500'
    return '#999'
  }

  return (
    <div className="sentiment-container">
      <div className="sentiment-card">
        <div className="sentiment-header">
          <h2>📊 Phân Tích Cảm Xúc (Sentiment Analysis)</h2>
          <p>Nhập văn bản để phân tích cảm xúc tích cực, tiêu cực hoặc trung lập</p>
        </div>

        <form onSubmit={handleAnalyze} className="sentiment-form">
          <div className="form-group">
            <label htmlFor="sentiment-text">📝 Nhập văn bản:</label>
            <textarea
              id="sentiment-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Nhập một câu hoặc đoạn văn để phân tích..."
              className="sentiment-input"
              rows="4"
              disabled={loading}
            />
            <div className="char-count">
              {text.length} / 500 ký tự
            </div>
          </div>

          <button
            type="submit"
            className="sentiment-button"
            disabled={loading || !text.trim()}
          >
            {loading ? '⏳ Đang phân tích...' : '🔍 Phân tích'}
          </button>
        </form>

        {error && (
          <div className="sentiment-error">
            <span>❌ {error}</span>
          </div>
        )}

        {result && (
          <div className="sentiment-result">
            <h3>📈 Kết quả phân tích:</h3>
            <div className="result-content">
              <div className="result-text">
                <span className="result-label">📝 Văn bản:</span>
                <p className="text-display">{result.text}</p>
              </div>

              {Array.isArray(result.sentiment) && result.sentiment.length > 0 && (
                <div className="result-scores">
                  <span className="result-label">🎯 Kết quả cảm xúc:</span>
                  {result.sentiment.map((item, idx) => (
                    <div key={idx} className="score-item">
                      <span className="score-label">{item.label}:</span>
                      <div className="score-bar">
                        <div
                          className="score-fill"
                          style={{
                            width: `${Math.round(item.score * 100)}%`,
                            backgroundColor: getSentimentColor(item.label),
                          }}
                        />
                      </div>
                      <span className="score-value">
                        {Math.round(item.score * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {result.sentiment && !Array.isArray(result.sentiment) && (
                <div className="result-item">
                  <span className="result-label">Cảm xúc:</span>
                  <span
                    className="result-value"
                    style={{ color: getSentimentColor(result.sentiment) }}
                  >
                    {getSentimentEmoji(result.sentiment)} {result.sentiment}
                  </span>
                </div>
              )}
            </div>

            <button
              type="button"
              className="clear-button"
              onClick={() => {
                setText('')
                setResult(null)
              }}
            >
              🔄 Phân tích khác
            </button>
          </div>
        )}

        <div className="sentiment-footer">
          <small>Backend: {BACKEND_URL}</small>
        </div>
      </div>
    </div>
  )
}
