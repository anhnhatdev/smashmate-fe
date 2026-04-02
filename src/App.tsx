import {
  Bell,
  Bot,
  CalendarDays,
  ChartNoAxesColumn,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Coffee,
  Heart,
  MapPinned,
  Medal,
  Menu,
  Palette,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Swords,
  Target,
  Trophy,
  UsersRound,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'

type ThemeName = 'light' | 'dark' | 'ocean' | 'forest' | 'sunset' | 'rose'
type FeedType = 'match' | 'court' | 'sell'

type Post = {
  id: number
  type: FeedType
  title: string
  club: string
  area: string
  level: string
  time: string
  distance: string
  excerpt: string
  tags: string[]
  accent: 'sky' | 'emerald' | 'orange'
}

type Court = {
  id: number
  name: string
  area: string
  courts: number
  open: string
  price: string
  top: string
  left: string
}

const feedPosts: Post[] = [
  {
    id: 1,
    type: 'match',
    title: 'Tìm kèo đôi nam 5.5 - 6.0 tối nay',
    club: 'CLB Smash District 7',
    area: 'Quận 7, TP.HCM',
    level: 'Trình trung bình khá',
    time: '19:30 - 21:30',
    distance: '2.4 km',
    excerpt:
      'Thiếu 2 bạn để ghép sân tối nay, ưu tiên người chơi đều cầu và vui vẻ. Có thể xoay vòng 2 cặp.',
    tags: ['Giao lưu', 'Đôi nam', 'Tối nay'],
    accent: 'sky',
  },
  {
    id: 2,
    type: 'court',
    title: 'Pass sân khung giờ vàng tại Tân Bình',
    club: 'Nhà thi đấu Hoàng Hoa',
    area: 'Tân Bình, TP.HCM',
    level: 'Mọi trình độ',
    time: '18:00 - 20:00',
    distance: '4.8 km',
    excerpt:
      'Đã cọc trước nhưng đội bận đột xuất. Sân thảm đẹp, trần cao, gửi xe tiện. Pass lại giá tốt.',
    tags: ['Pass sân', 'Giá mềm', 'Khung giờ đẹp'],
    accent: 'emerald',
  },
  {
    id: 3,
    type: 'sell',
    title: 'Bán Astrox 88D Pro 4UG5 còn rất mới',
    club: 'Badminton Corner',
    area: 'Gò Vấp, TP.HCM',
    level: 'Thi đấu / phong trào',
    time: 'Đăng 2 giờ trước',
    distance: '6.1 km',
    excerpt:
      'Vợt 99%, đã căng Exbolt 65 11.5kg. Có hóa đơn và bao vợt đi kèm. Test trực tiếp thoải mái.',
    tags: ['Mua bán', 'Yonex', 'Like new'],
    accent: 'orange',
  },
  {
    id: 4,
    type: 'match',
    title: 'Cần 1 nữ ghép kèo mixed cuối tuần',
    club: 'Sunny Court',
    area: 'Thủ Đức, TP.HCM',
    level: 'Nữ 4.5+',
    time: 'Chủ nhật 08:00',
    distance: '7.3 km',
    excerpt:
      'Team đánh vui, kỷ luật thời gian. Có quay clip giao lưu và hỗ trợ chia trình rõ ràng.',
    tags: ['Mixed', 'Cuối tuần', 'Có quay clip'],
    accent: 'sky',
  },
  {
    id: 5,
    type: 'court',
    title: 'Nhượng 2 sân liên tiếp tại Nhà Bè',
    club: 'Blue Arena',
    area: 'Nhà Bè, TP.HCM',
    level: 'Mọi trình độ',
    time: '20:00 - 22:00',
    distance: '9.2 km',
    excerpt:
      'Phù hợp nhóm 8-12 người. Có máy lạnh, ánh sáng ổn, nhà vệ sinh sạch sẽ.',
    tags: ['Nhượng sân', '2 sân', 'Tối muộn'],
    accent: 'emerald',
  },
  {
    id: 6,
    type: 'sell',
    title: 'Thanh lý giày cầu lông size 42',
    club: 'Shop cầu lông local',
    area: 'Phú Nhuận, TP.HCM',
    level: 'Phong trào',
    time: 'Đăng hôm nay',
    distance: '3.5 km',
    excerpt:
      'Giày đi ít, đế bám tốt, phù hợp sân thảm. Có thể ship nội thành hoặc xem trực tiếp.',
    tags: ['Giày', 'Thanh lý', 'Ship nhanh'],
    accent: 'orange',
  },
]

const courts: Court[] = [
  { id: 1, name: 'Smash Hub', area: 'Quận 3', courts: 8, open: '05:30 - 23:00', price: '85k - 120k', top: '22%', left: '21%' },
  { id: 2, name: 'Sunlight Arena', area: 'Tân Bình', courts: 10, open: '06:00 - 22:30', price: '90k - 130k', top: '35%', left: '58%' },
  { id: 3, name: 'D7 Shuttle Club', area: 'Quận 7', courts: 6, open: '05:00 - 22:00', price: '100k - 140k', top: '67%', left: '49%' },
  { id: 4, name: 'Thủ Đức Court', area: 'Thủ Đức', courts: 12, open: '06:00 - 23:00', price: '75k - 115k', top: '28%', left: '78%' },
]

const ranking = [
  { name: 'Nguyen Minh Tri', score: 1480, district: 'Quận 10', streak: '12 trận thắng', rank: 1 },
  { name: 'Tran Bao Chau', score: 1425, district: 'Thủ Đức', streak: '8 trận thắng', rank: 2 },
  { name: 'Le Hoang Quan', score: 1390, district: 'Tân Bình', streak: '6 trận thắng', rank: 3 },
  { name: 'Pham Gia Huy', score: 1330, district: 'Quận 7', streak: '5 trận thắng', rank: 4 },
  { name: 'Vu Khanh Linh', score: 1295, district: 'Phú Nhuận', streak: '4 trận thắng', rank: 5 },
]

const plans = [
  {
    name: 'Free',
    price: '0đ',
    description: 'Theo dõi kèo cơ bản và khám phá cộng đồng cầu lông miễn phí.',
    features: ['Xem feed công khai', 'Lọc theo loại bài', 'Xem bản đồ sân cơ bản'],
    tone: 'slate',
  },
  {
    name: 'Plus',
    price: '89.000đ',
    description: 'Phù hợp người chơi thường xuyên muốn lọc nhanh và theo dõi cá nhân hóa.',
    features: ['AI tóm tắt bài đăng', 'Lưu danh sách quan tâm', 'Nhắc lịch theo khung giờ'],
    tone: 'sky',
    featured: true,
  },
  {
    name: 'Club',
    price: '249.000đ',
    description: 'Dành cho nhóm/CLB cần landing riêng, thống kê bài đăng và quản lý lịch.',
    features: ['Trang CLB nổi bật', 'Báo cáo tương tác', 'Ưu tiên hiển thị theo khu vực'],
    tone: 'emerald',
  },
]

const reminderCards = [
  { title: 'Kèo đôi nam tối thứ 5', time: 'Thứ 5, 19:15', note: 'Nhắc trước 45 phút tại Smash Hub' },
  { title: 'Pass sân cần kiểm tra', time: 'Hôm nay, 17:30', note: 'Theo dõi bài đăng từ Blue Arena' },
  { title: 'Deal vợt đang quan tâm', time: 'Ngày mai, 09:00', note: 'So sánh 2 bài đăng Astrox trước khi chốt' },
]

const interestCards = [
  { title: 'Tìm kèo mixed cuối tuần', count: 14, color: 'rose' },
  { title: 'Pass sân khu vực Tân Bình', count: 9, color: 'emerald' },
  { title: 'Mua bán vợt Yonex 4U', count: 18, color: 'amber' },
]

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell><LandingPage /></AppShell>} />
      <Route path="/feed" element={<AppShell><FeedPage /></AppShell>} />
      <Route path="/map" element={<AppShell hideFooterOnMap><MapPage /></AppShell>} />
      <Route path="/ranking" element={<AppShell><RankingPage /></AppShell>} />
      <Route path="/pricing" element={<AppShell><PricingPage /></AppShell>} />
      <Route path="/interests" element={<AppShell><InterestsPage /></AppShell>} />
      <Route path="/reminders" element={<AppShell><RemindersPage /></AppShell>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function AppShell({
  children,
  hideFooterOnMap = false,
}: {
  children: React.ReactNode
  hideFooterOnMap?: boolean
}) {
  const location = useLocation()
  const [theme, setTheme] = useState<ThemeName>('light')
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { label: 'Tìm kèo', to: '/feed', active: location.pathname === '/feed' },
    { label: 'Sân', to: '/map', active: location.pathname === '/map' },
    { label: 'Xếp hạng', to: '/ranking', active: location.pathname === '/ranking' },
    { label: 'Sử dụng', to: '/pricing', active: location.pathname === '/pricing' },
  ]

  return (
    <div className={`app-shell ${theme}`}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar glass">
        <div className="container topbar-inner">
          <div className="brand-row">
            <Link className="brand" to="/">
              <span className="brand-mark">🏸</span>
              <span className="brand-text">
                Giao lưu <span>Cầu Lông</span>
              </span>
            </Link>
            <div className="mobile-pill-nav">
              {navItems.slice(0, 2).map((item) => (
                <Link key={item.to} className={`pill-link ${item.active ? 'active' : ''}`} to={item.to}>
                  {item.label === 'Tìm kèo' ? <Search size={12} /> : <MapPinned size={12} />}
                  {item.label === 'Tìm kèo' ? 'Kèo' : 'Sân'}
                </Link>
              ))}
            </div>
          </div>

          <nav className="desktop-nav">
            {navItems.map((item) => (
              <Link key={item.to} className={`nav-link ${item.active ? 'active' : ''}`} to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="topbar-actions">
            <button
              className="theme-button"
              type="button"
              onClick={() =>
                setTheme((current) => {
                  const options: ThemeName[] = ['light', 'dark', 'ocean', 'forest', 'sunset', 'rose']
                  const nextIndex = (options.indexOf(current) + 1) % options.length
                  return options[nextIndex]
                })
              }
            >
              <Palette size={14} />
              <span className="theme-swatch" />
            </button>
            <button className="support-button" type="button">
              <Coffee size={14} />
              <span>Ủng hộ & Góp ý</span>
            </button>
            <button className="icon-button" type="button" aria-label="Quan tâm">
              <Heart size={16} />
            </button>
            <button className="icon-button bell" type="button" aria-label="Nhắc lịch">
              <Bell size={16} />
            </button>
            <button className="mobile-menu" type="button" onClick={() => setMobileOpen((open) => !open)}>
              <Menu size={16} />
            </button>
            <div className="avatar-skeleton" />
          </div>
        </div>
        {mobileOpen && (
          <div className="mobile-menu-panel glass">
            {navItems.map((item) => (
              <Link key={item.to} className={`mobile-menu-link ${item.active ? 'active' : ''}`} to={item.to} onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link className="mobile-menu-link" to="/interests" onClick={() => setMobileOpen(false)}>
              Danh sách quan tâm
            </Link>
            <Link className="mobile-menu-link" to="/reminders" onClick={() => setMobileOpen(false)}>
              Nhắc lịch của tôi
            </Link>
          </div>
        )}
      </header>

      <main className={`page-shell ${hideFooterOnMap && location.pathname === '/map' ? 'map-mode' : ''}`}>{children}</main>
      {!(hideFooterOnMap && location.pathname === '/map') && <SiteFooter />}
    </div>
  )
}

function LandingPage() {
  return (
    <div className="landing-page">
      <section className="hero-section container">
        <div className="hero-copy">
          <div className="eyebrow">
            <Sparkles size={14} />
            Nền tảng tìm kèo cầu lông số 1 Việt Nam
          </div>
          <h1>
            Tìm kèo, pass sân, mua bán dụng cụ
            <span className="gradient-text"> nhanh hơn trong một ứng dụng</span>
          </h1>
          <p className="hero-description">
            Tổng hợp bài đăng từ nhiều cộng đồng cầu lông, lọc theo khu vực, trình độ, khung giờ
            và khoảng cách. Chưa cần backend, nhưng cảm giác sử dụng và cấu trúc giao diện đã được clone
            sát với bản gốc.
          </p>
          <div className="hero-actions">
            <Link className="cta-button primary" to="/feed">
              Khám phá kèo ngay
            </Link>
            <Link className="cta-button secondary" to="/map">
              Xem bản đồ sân
            </Link>
          </div>
          <div className="hero-stats">
            <StatCard label="Facebook groups" value="10+" icon={<UsersRound size={18} />} />
            <StatCard label="Bài đăng / ngày" value="1.2k" icon={<ChartNoAxesColumn size={18} />} />
            <StatCard label="Tỉnh thành nổi bật" value="12" icon={<MapPinned size={18} />} />
          </div>
        </div>

        <div className="hero-visual glass">
          <div className="hero-visual-glow" />
          <div className="mini-window">
            <div className="mini-window-bar">
              <span />
              <span />
              <span />
            </div>
            <div className="feed-preview-card featured">
              <div className="card-chip sky">AI match</div>
              <h3>Tìm đối thủ cùng trình trong bán kính 5km</h3>
              <p>Hệ thống nhóm bài đăng theo khu vực, trình độ và thời điểm phù hợp nhất.</p>
            </div>
            <div className="preview-grid">
              <div className="feed-preview-card">
                <Target size={18} />
                <strong>Lọc theo trình</strong>
                <span>3.5 đến 6.5</span>
              </div>
              <div className="feed-preview-card">
                <CalendarDays size={18} />
                <strong>Khung giờ</strong>
                <span>Sáng, tối, cuối tuần</span>
              </div>
              <div className="feed-preview-card">
                <Store size={18} />
                <strong>Pass sân</strong>
                <span>Theo dõi realtime</span>
              </div>
              <div className="feed-preview-card">
                <Bell size={18} />
                <strong>Nhắc lịch</strong>
                <span>Lưu kèo quan tâm</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="badge-row container">
        <Badge tone="sky" icon={<Bot size={13} />} label="AI Search" />
        <Badge tone="emerald" icon={<MapPinned size={13} />} label="Distance Filter" />
        <Badge tone="rose" icon={<Heart size={13} />} label="Interests" />
        <Badge tone="violet" icon={<Bell size={13} />} label="Reminders" />
      </section>

      <section className="feature-section container">
        <SectionHeading
          title="Từ landing đến app screen đều mang cùng một ngôn ngữ thiết kế"
          description="Bo góc lớn, surface kính mờ, đổ bóng có màu và interaction mềm như app native."
        />
        <div className="feature-grid">
          <FeatureCard
            icon={<Search size={20} />}
            title="Feed tổng hợp"
            copy="Giao diện danh sách bài đăng với tìm kiếm, filter chips, tab loại nội dung và card nhiều metadata."
          />
          <FeatureCard
            icon={<MapPinned size={20} />}
            title="Map view"
            copy="Bản đồ giả lập có marker, panel sân bên trái và trạng thái full-height giống sản phẩm thật."
          />
          <FeatureCard
            icon={<Trophy size={20} />}
            title="Xếp hạng"
            copy="Leaderboard theo phong cách card nổi, nhấn mạnh top 3 với màu và nhịp typography gần bản gốc."
          />
        </div>
      </section>

      <section className="showcase-section container">
        <div className="showcase-panel glass">
          <div>
            <div className="eyebrow subtle">
              <ShieldCheck size={14} />
              Giao diện clone để tiếp tục làm product
            </div>
            <h2>Toàn bộ khung frontend đã sẵn sàng để gắn API sau này</h2>
            <p>
              Tất cả màn chính đều dùng dữ liệu mock có cấu trúc hợp lý, nên đội backend có thể nối dữ liệu thật mà
              không phải đập lại UI từ đầu.
            </p>
          </div>
          <div className="showcase-list">
            <ShowcaseItem title="Landing marketing" text="Hero, stats, feature cards, CTA và footer đầy đủ." />
            <ShowcaseItem title="Internal app routes" text="Feed, Map, Ranking, Pricing, Interests, Reminders." />
            <ShowcaseItem title="Visual system" text="Theme switcher nhiều palette, glass surfaces và ambient glow." />
          </div>
        </div>
      </section>
    </div>
  )
}

function FeedPage() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const currentType = (params.get('type') as FeedType | null) ?? 'match'

  const filtered = useMemo(
    () => feedPosts.filter((post) => post.type === currentType),
    [currentType],
  )

  const tabs: { label: string; type: FeedType }[] = [
    { label: 'Tìm kèo', type: 'match' },
    { label: 'Pass sân', type: 'court' },
    { label: 'Mua bán', type: 'sell' },
  ]

  return (
    <div className="container app-page">
      <section className="page-hero compact">
        <div>
          <div className="eyebrow subtle">
            <Search size={14} />
            Feed tổng hợp từ cộng đồng
          </div>
          <h1 className="page-title">Tìm bài đăng đúng nhu cầu chỉ trong vài thao tác</h1>
          <p className="page-subtitle">
            Màn feed được dựng theo hướng sản phẩm thật: thanh tìm kiếm lớn, filter chips, list card và sidebar nổi.
          </p>
        </div>
      </section>

      <div className="feed-layout">
        <aside className="sidebar-card glass">
          <h3>Bộ lọc thông minh</h3>
          <div className="filter-group">
            <label>Từ khóa</label>
            <div className="search-box">
              <Search size={16} />
              <input value="kèo tối nay" readOnly />
            </div>
          </div>
          <div className="filter-group">
            <label>Khu vực</label>
            <div className="chip-wrap">
              <span className="filter-chip active">TP.HCM</span>
              <span className="filter-chip">Hà Nội</span>
              <span className="filter-chip">Đà Nẵng</span>
            </div>
          </div>
          <div className="filter-group">
            <label>Trình độ</label>
            <div className="chip-wrap">
              <span className="filter-chip active">3.5 - 5.5</span>
              <span className="filter-chip">5.5 - 7.0</span>
              <span className="filter-chip">Open</span>
            </div>
          </div>
          <div className="filter-group">
            <label>Khung giờ</label>
            <div className="chip-wrap">
              <span className="filter-chip">Sáng</span>
              <span className="filter-chip active">Tối</span>
              <span className="filter-chip">Cuối tuần</span>
            </div>
          </div>
          <div className="sidebar-note">
            <Sparkles size={15} />
            Hệ thống gợi ý các bài gần bạn nhất theo loại nội dung đang chọn.
          </div>
        </aside>

        <div className="feed-content">
          <div className="feed-toolbar glass">
            <div className="tab-row">
              {tabs.map((tab) => (
                <Link
                  key={tab.type}
                  className={`tab-pill ${currentType === tab.type ? 'active' : ''}`}
                  to={`/feed?type=${tab.type}`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
            <div className="chip-wrap">
              <span className="filter-chip active">Gần tôi</span>
              <span className="filter-chip">Mới nhất</span>
              <span className="filter-chip">Nhiều tương tác</span>
            </div>
          </div>

          <div className="feed-list">
            {filtered.map((post) => (
              <article key={post.id} className={`post-card ${post.accent}`}>
                <div className="post-topline">
                  <span className={`card-chip ${post.accent}`}>{post.type === 'match' ? 'Tìm kèo' : post.type === 'court' ? 'Pass sân' : 'Mua bán'}</span>
                  <span className="muted-inline">{post.distance}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="post-meta">
                  <span><MapPinned size={14} /> {post.area}</span>
                  <span><Swords size={14} /> {post.level}</span>
                  <span><Clock3 size={14} /> {post.time}</span>
                </div>
                <div className="post-tags">
                  {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="post-footer">
                  <div>
                    <strong>{post.club}</strong>
                    <small>Bài đăng cộng đồng đã được gom lại</small>
                  </div>
                  <button type="button">
                    Xem chi tiết
                    <ChevronRight size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MapPage() {
  return (
    <div className="map-page">
      <aside className="map-sidebar glass">
        <div className="map-sidebar-head">
          <div>
            <div className="eyebrow subtle">
              <MapPinned size={14} />
              Bản đồ sân cầu lông
            </div>
            <h2>Tìm sân gần bạn</h2>
          </div>
          <span className="count-badge">{courts.length} sân nổi bật</span>
        </div>
        <div className="search-box">
          <Search size={16} />
          <input value="Hà Nội / TP.HCM / Thủ Đức..." readOnly />
        </div>
        <div className="map-filter-row">
          <span className="filter-chip active">Đang mở</span>
          <span className="filter-chip">Giá tốt</span>
          <span className="filter-chip">Gần tôi</span>
        </div>
        <div className="map-court-list">
          {courts.map((court) => (
            <article key={court.id} className="map-court-card">
              <div className="map-court-top">
                <strong>{court.name}</strong>
                <span>{court.area}</span>
              </div>
              <div className="map-court-meta">
                <span><Store size={14} /> {court.courts} sân</span>
                <span><Clock3 size={14} /> {court.open}</span>
              </div>
              <div className="map-court-bottom">
                <span>{court.price}</span>
                <button type="button">Xem</button>
              </div>
            </article>
          ))}
        </div>
      </aside>

      <section className="map-canvas">
        <div className="map-grid" />
        <div className="map-watermark">SmashMate Maps</div>
        {courts.map((court) => (
          <div key={court.id} className="map-marker" style={{ top: court.top, left: court.left }}>
            <MapPinned size={18} />
            <span>{court.name}</span>
          </div>
        ))}
      </section>
    </div>
  )
}

function RankingPage() {
  return (
    <div className="container app-page">
      <section className="page-hero compact">
        <div className="eyebrow subtle">
          <Trophy size={14} />
          Bảng xếp hạng cộng đồng
        </div>
        <h1 className="page-title">Theo dõi người chơi nổi bật theo phong độ gần đây</h1>
        <p className="page-subtitle">
          Trang này mô phỏng leaderboard với cụm top 3, bảng xếp hạng mở rộng và các chỉ số phụ trợ.
        </p>
      </section>

      <div className="podium-grid">
        {ranking.slice(0, 3).map((player) => (
          <article key={player.rank} className={`podium-card rank-${player.rank}`}>
            <div className="medal-wrap"><Medal size={26} /></div>
            <strong>#{player.rank}</strong>
            <h3>{player.name}</h3>
            <p>{player.district}</p>
            <div className="podium-score">{player.score} điểm</div>
            <span>{player.streak}</span>
          </article>
        ))}
      </div>

      <div className="leaderboard glass">
        {ranking.map((player) => (
          <div key={player.rank} className="leaderboard-row">
            <div className="leaderboard-rank">#{player.rank}</div>
            <div className="leaderboard-name">
              <strong>{player.name}</strong>
              <span>{player.district}</span>
            </div>
            <div className="leaderboard-streak">{player.streak}</div>
            <div className="leaderboard-score">{player.score}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PricingPage() {
  return (
    <div className="container app-page">
      <section className="page-hero compact centered">
        <div className="eyebrow subtle">
          <CircleDollarSign size={14} />
          Gói sử dụng
        </div>
        <h1 className="page-title">Pricing clone theo đúng tinh thần bo tròn, sáng và dễ quét</h1>
        <p className="page-subtitle">
          Các gói được dựng dạng card pill lớn, có chip nổi bật và CTA rõ ràng giống cách sản phẩm SaaS hiện đại trình bày.
        </p>
      </section>
      <div className="pricing-grid">
        {plans.map((plan) => (
          <article key={plan.name} className={`pricing-card ${plan.featured ? 'featured' : ''} ${plan.tone}`}>
            {plan.featured && <div className="card-chip sky">Phổ biến nhất</div>}
            <h3>{plan.name}</h3>
            <div className="price-line">
              <span className="price">{plan.price}</span>
              <small>/ tháng</small>
            </div>
            <p>{plan.description}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Star size={14} />
                  {feature}
                </li>
              ))}
            </ul>
            <button className={`cta-button ${plan.featured ? 'primary' : 'secondary'}`} type="button">
              Chọn gói
            </button>
          </article>
        ))}
      </div>
    </div>
  )
}

function InterestsPage() {
  return (
    <div className="container app-page">
      <section className="page-hero compact">
        <div className="eyebrow subtle">
          <Heart size={14} />
          Danh sách quan tâm
        </div>
        <h1 className="page-title">Lưu những loại bài đăng bạn muốn quay lại nhanh</h1>
      </section>
      <div className="mini-grid">
        {interestCards.map((item) => (
          <article key={item.title} className={`interest-card ${item.color}`}>
            <strong>{item.title}</strong>
            <span>{item.count} bài phù hợp trong tuần này</span>
          </article>
        ))}
      </div>
    </div>
  )
}

function RemindersPage() {
  return (
    <div className="container app-page">
      <section className="page-hero compact">
        <div className="eyebrow subtle">
          <Bell size={14} />
          Nhắc lịch của tôi
        </div>
        <h1 className="page-title">Theo dõi những kèo, sân và deal bạn không muốn bỏ lỡ</h1>
      </section>
      <div className="reminder-stack">
        {reminderCards.map((item) => (
          <article key={item.title} className="reminder-card glass">
            <div>
              <strong>{item.title}</strong>
              <p>{item.note}</p>
            </div>
            <div className="reminder-time">
              <CalendarDays size={16} />
              {item.time}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-mark">🏸</span>
            <span className="logo-text">
              SmashMate <span>Badminton</span>
            </span>
          </div>
          <p>
            Tổng hợp bài đăng cầu lông từ nhiều Facebook groups, tìm kèo nhanh hơn với AI, lọc theo khoảng
            cách, và theo dõi lịch chơi trong một ứng dụng.
          </p>
          <div className="badge-row footer-badges">
            <Badge tone="sky" icon={<Bot size={13} />} label="AI Search" />
            <Badge tone="emerald" icon={<MapPinned size={13} />} label="Distance Filter" />
            <Badge tone="rose" icon={<Heart size={13} />} label="Interests" />
            <Badge tone="violet" icon={<Bell size={13} />} label="Reminders" />
          </div>
        </div>
        <FooterColumn
          title="Tính năng"
          items={[
            { label: 'Tìm kèo', to: '/feed?type=match' },
            { label: 'Tìm sân / pass sân', to: '/feed?type=court' },
            { label: 'Map view', to: '/map' },
            { label: 'Mua bán dụng cụ', to: '/feed?type=sell' },
          ]}
        />
        <FooterColumn
          title="Cá nhân"
          items={[
            { label: 'Danh sách quan tâm', to: '/interests' },
            { label: 'Nhắc lịch của tôi', to: '/reminders' },
            { label: 'Trang feed', to: '/feed' },
          ]}
        />
        <div className="footer-column footer-note">
          <h3>Thông tin</h3>
          <ul>
            <li>Hỗ trợ</li>
            <li>Chính sách quyền riêng tư</li>
            <li>Điều khoản sử dụng</li>
          </ul>
          <div className="footer-tip">
            <p><Sparkles size={14} /> Dữ liệu cập nhật liên tục</p>
            <span>Nguồn bài đăng từ cộng đồng, hệ thống lọc và gợi ý theo tiêu chí bạn đã chọn.</span>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 SmashMate. All rights reserved.</p>
        <p>Dành cho cộng đồng cầu lông Việt Nam.</p>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  items,
}: {
  title: string
  items: { label: string; to: string }[]
}) {
  return (
    <div className="footer-column">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.label}>
            <Link to={item.to}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

function FeatureCard({ icon, title, copy }: { icon: React.ReactNode; title: string; copy: string }) {
  return (
    <article className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{copy}</p>
    </article>
  )
}

function StatCard({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="stat-card glass">
      <div className="stat-icon">{icon}</div>
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </div>
  )
}

function ShowcaseItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="showcase-item">
      <strong>{title}</strong>
      <span>{text}</span>
    </div>
  )
}

function Badge({ tone, icon, label }: { tone: 'sky' | 'emerald' | 'rose' | 'violet'; icon: React.ReactNode; label: string }) {
  return (
    <span className={`badge ${tone}`}>
      {icon}
      {label}
    </span>
  )
}

export default App
