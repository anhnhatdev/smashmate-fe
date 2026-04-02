import { Link } from 'react-router-dom'
import {
  Sparkles,
  UsersRound,
  ChartNoAxesColumn,
  MapPinned,
  Target,
  CalendarDays,
  Store,
  Bell,
  ShieldCheck,
  Bot,
  Heart,
  Search,
} from 'lucide-react'

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
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

function FeatureCard({ icon, title, copy }: { icon: React.ReactNode; title: string; copy: string }) {
  return (
    <article className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{copy}</p>
    </article>
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

function ShowcaseItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="showcase-item">
      <strong>{title}</strong>
      <span>{text}</span>
    </div>
  )
}

export function LandingPage() {
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
            và khoảng cách. Giao diện hiện đại, trải nghiệm mượt mà như app native.
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
        <div className="section-heading">
          <h2>Thiết kế hiện đại, ngôn ngữ UI nhất quán</h2>
          <p>Bo góc lớn, surface kính mờ, và interaction mềm mại mang lại cảm giác cao cấp.</p>
        </div>
        <div className="feature-grid">
          <FeatureCard
            icon={<Search size={20} />}
            title="Feed tổng hợp"
            copy="Giao diện danh sách bài đăng với tìm kiếm mạnh mẽ, filter thông minh và card giàu thông tin."
          />
          <FeatureCard
            icon={<MapPinned size={20} />}
            title="Map view"
            copy="Bản đồ sân cầu lông trực quan với thông tin chi tiết về sân, giá cả và tiện ích."
          />
          <FeatureCard
            icon={<ChartNoAxesColumn size={20} />}
            title="Xếp hạng"
            copy="Theo dõi phong độ và thứ hạng của người chơi trong cộng đồng với Leaderboard chi tiết."
          />
        </div>
      </section>

      <section className="showcase-section container">
        <div className="showcase-panel glass">
          <div>
            <div className="eyebrow subtle">
              <ShieldCheck size={14} />
              Sẵn sàng cho việc mở rộng
            </div>
            <h2>Kiến trúc Frontend chuẩn Senior</h2>
            <p>
              Toàn bộ source code được tổ chức theo module, dễ bảo trì và sẵn sàng kết nối với API thực tế.
            </p>
          </div>
          <div className="showcase-list">
            <ShowcaseItem title="Router & Layout" text="Hỗ trợ nhiều route và App Shell linh hoạt." />
            <ShowcaseItem title="Design System" text="Hệ thống màu sắc, typography và component tái sử dụng." />
            <ShowcaseItem title="State Management" text="Quản lý theme, thông báo và dữ liệu yêu thích mượt mà." />
          </div>
        </div>
      </section>
    </div>
  )
}
