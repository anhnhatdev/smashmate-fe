import { useState, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Search,
  MapPinned,
  Swords,
  Clock3,
  ChevronRight,
  Heart,
  HeartOff,
  Eye,
  Sparkles,
  X,
} from 'lucide-react'
import { feedPosts } from '../data'
import { useFavorites } from '../hooks/useFavorites'
import { useDebounce } from '../hooks/useUtils'
import { PostCardSkeleton } from '../components/ui/Skeletons'
import type { FeedType } from '../types'

const AREAS = ['TP.HCM', 'Hà Nội', 'Đà Nẵng']
const LEVELS = ['3.5 - 5.5', '5.5 - 7.0', 'Open']
const TIMES = ['Sáng', 'Chiều', 'Tối', 'Cuối tuần']
const SORTS = ['Gần tôi', 'Mới nhất', 'Nhiều tương tác'] as const

type SortMode = typeof SORTS[number]

interface FeedPageProps {
  addToast?: (msg: string, type?: 'success' | 'info' | 'warning') => void
}

export function FeedPage({ addToast }: FeedPageProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const currentType = (params.get('type') as FeedType | null) ?? 'match'

  const [rawSearch, setRawSearch] = useState(params.get('q') ?? '')
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [sortMode, setSortMode] = useState<SortMode>('Gần tôi')
  const [loading] = useState(false)

  const search = useDebounce(rawSearch, 280)
  const { toggle, isFavorite } = useFavorites()

  const tabs: { label: string; type: FeedType }[] = [
    { label: '🏸 Tìm kèo', type: 'match' },
    { label: '🏟️ Pass sân', type: 'court' },
    { label: '🛒 Mua bán', type: 'sell' },
  ]

  const filtered = useMemo(() => {
    let posts = feedPosts.filter((p) => p.type === currentType)

    if (search.trim()) {
      const q = search.toLowerCase()
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.area.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      )
    }

    if (selectedArea) {
      posts = posts.filter((p) => p.area.includes(selectedArea))
    }

    if (sortMode === 'Gần tôi') {
      posts = [...posts].sort((a, b) => a.distanceKm - b.distanceKm)
    } else if (sortMode === 'Nhiều tương tác') {
      posts = [...posts].sort((a, b) => b.views - a.views)
    }

    return posts
  }, [currentType, search, selectedArea, sortMode])

  function handleFavorite(id: number, title: string) {
    toggle(id)
    const isNowFav = !isFavorite(id)
    addToast?.(
      isNowFav ? `Đã lưu "${title}" vào quan tâm` : `Đã xoá khỏi danh sách quan tâm`,
      isNowFav ? 'success' : 'info',
    )
  }

  function handleTabChange(type: FeedType) {
    const next = new URLSearchParams(location.search)
    next.set('type', type)
    if (rawSearch) next.set('q', rawSearch)
    navigate(`/feed?${next.toString()}`, { replace: true })
  }

  const hasActiveFilters = selectedArea || selectedLevel || selectedTime

  return (
    <div className="container app-page">
      {/* Page header */}
      <section className="page-hero compact" aria-labelledby="feed-title">
        <div className="eyebrow subtle">
          <Search size={14} aria-hidden="true" />
          Feed tổng hợp từ cộng đồng
        </div>
        <h1 id="feed-title" className="page-title">
          Tìm bài đăng đúng nhu cầu
        </h1>
        <p className="page-subtitle">
          Tổng hợp từ các nhóm cầu lông, lọc theo khu vực, trình độ và khung giờ chỉ trong vài thao tác.
        </p>
      </section>

      <div className="feed-layout">
        {/* Sidebar */}
        <aside className="sidebar-card glass" aria-label="Bộ lọc bài đăng">
          <h2 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Bộ lọc thông minh</h2>

          {/* Search */}
          <div className="filter-group">
            <label htmlFor="feed-search">Từ khóa</label>
            <div className="search-box">
              <Search size={16} aria-hidden="true" />
              <input
                id="feed-search"
                value={rawSearch}
                onChange={(e) => setRawSearch(e.target.value)}
                placeholder="Tìm kèo, sân, vợt..."
                aria-label="Tìm kiếm bài đăng"
              />
              {rawSearch && (
                <button
                  className="search-clear"
                  onClick={() => setRawSearch('')}
                  aria-label="Xoá tìm kiếm"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Area filter */}
          <div className="filter-group">
            <label>Khu vực</label>
            <div className="chip-wrap">
              {AREAS.map((area) => (
                <button
                  key={area}
                  className={`filter-chip${selectedArea === area ? ' active' : ''}`}
                  onClick={() => setSelectedArea(selectedArea === area ? null : area)}
                  aria-pressed={selectedArea === area}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Level filter */}
          <div className="filter-group">
            <label>Trình độ</label>
            <div className="chip-wrap">
              {LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  className={`filter-chip${selectedLevel === lvl ? ' active' : ''}`}
                  onClick={() => setSelectedLevel(selectedLevel === lvl ? null : lvl)}
                  aria-pressed={selectedLevel === lvl}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Time filter */}
          <div className="filter-group">
            <label>Khung giờ</label>
            <div className="chip-wrap">
              {TIMES.map((t) => (
                <button
                  key={t}
                  className={`filter-chip${selectedTime === t ? ' active' : ''}`}
                  onClick={() => setSelectedTime(selectedTime === t ? null : t)}
                  aria-pressed={selectedTime === t}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              className="clear-filters-btn"
              onClick={() => {
                setSelectedArea(null)
                setSelectedLevel(null)
                setSelectedTime(null)
              }}
            >
              <X size={13} /> Xoá bộ lọc
            </button>
          )}

          <div className="sidebar-note" role="note">
            <Sparkles size={15} aria-hidden="true" />
            Hệ thống gợi ý các bài gần bạn nhất theo loại nội dung đang chọn.
          </div>
        </aside>

        {/* Main feed content */}
        <div className="feed-content">
          {/* Toolbar */}
          <div className="feed-toolbar glass" role="toolbar" aria-label="Bộ lọc feed">
            <div className="tab-row" role="tablist">
              {tabs.map((tab) => (
                <button
                  key={tab.type}
                  className={`tab-pill${currentType === tab.type ? ' active' : ''}`}
                  role="tab"
                  aria-selected={currentType === tab.type}
                  onClick={() => handleTabChange(tab.type)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="toolbar-bottom">
              <div className="chip-wrap">
                {SORTS.map((s) => (
                  <button
                    key={s}
                    className={`filter-chip${sortMode === s ? ' active' : ''}`}
                    onClick={() => setSortMode(s)}
                    aria-pressed={sortMode === s}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <span className="result-count" aria-live="polite">
                {filtered.length} bài
              </span>
            </div>
          </div>

          {/* Post list */}
          <div className="feed-list" role="feed" aria-label="Danh sách bài đăng" aria-busy={loading}>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <PostCardSkeleton key={i} />)
            ) : filtered.length === 0 ? (
              <EmptyState search={rawSearch} onClear={() => setRawSearch('')} />
            ) : (
              filtered.map((post) => (
                <article
                  key={post.id}
                  className={`post-card ${post.accent}`}
                  aria-label={post.title}
                >
                  <div className="post-topline">
                    <span className={`card-chip ${post.accent}`}>
                      {post.type === 'match' ? '🏸 Tìm kèo' : post.type === 'court' ? '🏟️ Pass sân' : '🛒 Mua bán'}
                    </span>
                    <div className="post-topline-right">
                      <span className="muted-inline">
                        <Eye size={12} /> {post.views}
                      </span>
                      <span className="muted-inline">{post.distance}</span>
                    </div>
                  </div>

                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>

                  <div className="post-meta">
                    <span><MapPinned size={14} aria-hidden="true" /> {post.area}</span>
                    <span><Swords size={14} aria-hidden="true" /> {post.level}</span>
                    <span><Clock3 size={14} aria-hidden="true" /> {post.time}</span>
                  </div>

                  <div className="post-tags">
                    {post.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="post-footer">
                    <div>
                      <strong>{post.club}</strong>
                      <small>{post.postedAt}</small>
                    </div>
                    <div className="post-actions">
                      <button
                        className={`fav-button${isFavorite(post.id) ? ' active' : ''}`}
                        onClick={() => handleFavorite(post.id, post.title)}
                        aria-label={isFavorite(post.id) ? 'Xoá khỏi quan tâm' : 'Thêm vào quan tâm'}
                        aria-pressed={isFavorite(post.id)}
                      >
                        {isFavorite(post.id) ? <HeartOff size={15} /> : <Heart size={15} />}
                      </button>
                      <button type="button" className="detail-btn" aria-label={`Xem chi tiết: ${post.title}`}>
                        Xem chi tiết
                        <ChevronRight size={15} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function EmptyState({ search, onClear }: { search: string; onClear: () => void }) {
  return (
    <div className="empty-state" role="status">
      <span className="empty-emoji">🏸</span>
      <h3>Không tìm thấy bài đăng</h3>
      <p>
        {search
          ? `Không có kết quả cho "${search}". Hãy thử từ khác hoặc bỏ bộ lọc.`
          : 'Chưa có bài đăng trong danh mục này. Hãy thử tab khác.'}
      </p>
      {search && (
        <button className="cta-button secondary" onClick={onClear}>
          Xoá tìm kiếm
        </button>
      )}
    </div>
  )
}
