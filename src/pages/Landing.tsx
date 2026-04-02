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
  ChevronRight,
  Zap,
} from 'lucide-react'

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="stat-card glass" style={{ borderRadius: 'var(--radius-xl)' }}>
      <div className="stat-icon" style={{ background: 'hsla(var(--primary), 0.1)', color: 'hsl(var(--primary))' }}>
        {icon}
      </div>
      <div>
        <strong style={{ fontSize: '1.25rem', display: 'block' }}>{value}</strong>
        <span style={{ fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))' }}>{label}</span>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, copy }: { icon: React.ReactNode; title: string; copy: string }) {
  return (
    <article className="feature-card glass" style={{ borderRadius: 'var(--radius-2xl)', padding: '2rem' }}>
      <div className="feature-icon" style={{ 
        width: '3.5rem', 
        height: '3.5rem', 
        borderRadius: '1.25rem', 
        background: 'linear-gradient(135deg, hsla(var(--primary), 0.1), hsla(var(--violet), 0.1))',
        color: 'hsl(var(--primary))',
        display: 'grid',
        placeItems: 'center',
        marginBottom: '1.5rem'
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: 800 }}>{title}</h3>
      <p style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.6, fontSize: '0.95rem' }}>{copy}</p>
    </article>
  )
}

function Badge({ tone, icon, label }: { tone: 'sky' | 'emerald' | 'rose' | 'violet'; icon: React.ReactNode; label: string }) {
  return (
    <span className={`badge ${tone}`} style={{ borderRadius: 'var(--radius-full)', padding: '0.5rem 1.25rem', fontWeight: 700 }}>
      {icon}
      {label}
    </span>
  )
}

export function LandingPage() {
  return (
    <div className="landing-page" style={{ paddingBottom: '8rem' }}>
      {/* Hero Section */}
      <section className="hero-section container" style={{ 
        paddingTop: '8rem', 
        paddingBottom: '6rem',
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '4rem',
        alignItems: 'center'
      }}>
        <div className="hero-copy">
          <div className="eyebrow" style={{ 
            background: 'hsla(var(--primary), 0.1)', 
            color: 'hsl(var(--primary))',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-full)',
            width: 'fit-content',
            marginBottom: '1.5rem',
            fontWeight: 700,
            fontSize: '0.85rem'
          }}>
            <Sparkles size={14} style={{ marginRight: '0.5rem' }} />
            Nền tảng giao lưu cầu lông hiện đại nhất
          </div>
          <h1 style={{ fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '2rem', letterSpacing: '-0.04em' }}>
            Kết nối cộng đồng
            <span className="gradient-text"> cầu lông Việt Nam</span>
          </h1>
          <p className="hero-description" style={{ 
            fontSize: '1.25rem', 
            lineHeight: 1.6, 
            color: 'hsl(var(--muted-foreground))',
            marginBottom: '3rem',
            maxWidth: '90%'
          }}>
            Tìm kiếm sân chơi, đối thủ phù hợp và mua bán dụng cụ dễ dàng. 
            Ứng dụng công nghệ AI để tối ưu hóa trải nghiệm tìm kèo của bạn.
          </p>
          <div className="hero-actions" style={{ marginBottom: '4rem', gap: '1.5rem' }}>
            <Link className="cta-button primary" to="/feed" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
              Bắt đầu ngay <Zap size={18} fill="currentColor" />
            </Link>
            <Link className="cta-button secondary" to="/map" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
              Tìm sân gần đây
            </Link>
          </div>
          <div className="hero-stats" style={{ gap: '1rem' }}>
            <StatCard label="Cộng đồng" value="25,000+" icon={<UsersRound size={20} />} />
            <StatCard label="Lượt tìm mỗi ngày" value="1,500+" icon={<Search size={20} />} />
            <StatCard label="Sân cầu lông" value="800+" icon={<MapPinned size={20} />} />
          </div>
        </div>

        <div className="hero-visual" style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            inset: '-2rem',
            background: 'radial-gradient(circle, hsla(var(--primary), 0.15) 0%, transparent 70%)',
            zIndex: 0,
            filter: 'blur(40px)'
          }} />
          <div className="glass" style={{ 
            borderRadius: 'var(--radius-2xl)', 
            padding: '1rem',
            borderWidth: '2px',
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden'
          }}>
            <div style={{
              background: 'hsla(var(--foreground), 0.05)',
              borderRadius: '1.25rem',
              overflow: 'hidden'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1626225967045-2c76b25624d7?auto=format&fit=crop&q=80&w=1000" 
                alt="Badminton Action" 
                style={{ width: '100%', height: '400px', objectFit: 'cover', opacity: 0.9 }}
              />
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem' }}>
                <div className="glass" style={{ padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="badge sky">Trực tiếp</span>
                    <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Quận 7, TP.HCM</span>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Tìm 2 người trình 3.0 - 4.5</h4>
                  <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Sân 175, 19:00 tối nay. Có trà đá!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="container" style={{ marginBottom: '8rem' }}>
        <div className="badge-row" style={{ 
          justifyContent: 'center', 
          gap: '2rem',
          padding: '2rem',
          background: 'hsla(var(--foreground), 0.03)',
          borderRadius: 'var(--radius-full)',
          flexWrap: 'wrap'
        }}>
          <Badge tone="sky" icon={<Bot size={14} />} label="AI Tìm kiếm thông minh" />
          <Badge tone="emerald" icon={<Zap size={14} />} label="Kết nối tức thì" />
          <Badge tone="rose" icon={<Heart size={14} />} label="Cộng đồng văn minh" />
          <Badge tone="violet" icon={<Bell size={14} />} label="Thông báo thời gian thực" />
        </div>
      </section>

      {/* Features Grid */}
      <section className="container" style={{ marginBottom: '8rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '3rem', letterSpacing: '-0.02em', marginBottom: '1rem' }}>Sản phẩm dành cho Racer</h2>
          <p style={{ fontSize: '1.15rem', color: 'hsl(var(--muted-foreground))', maxWidth: '600px', margin: '0 auto' }}>
            Chúng tôi xây dựng các công cụ mạnh mẽ nhất để hỗ trợ người chơi cầu lông từ nghiệp dư đến chuyên nghiệp.
          </p>
        </div>
        <div className="feature-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '2rem' 
        }}>
          <FeatureCard
            icon={<Zap size={24} />}
            title="Tìm kèo nhanh"
            copy="Hệ thống lọc bài đăng thông minh từ hàng chục group Facebook, giúp bạn tìm thấy sân chơi chỉ trong vài giây."
          />
          <FeatureCard
            icon={<MapPinned size={24} />}
            title="Bản đồ sân tập"
            copy="Dữ liệu hơn 800 sân cầu lông trên toàn quốc với thông tin chi tiết về giá cả, tiện ích và đánh giá."
          />
          <FeatureCard
            icon={<ChartNoAxesColumn size={24} />}
            title="Hệ thống ELO"
            copy="Theo dõi trình độ bản thân và cộng đồng qua hệ thống tính điểm ELO công bằng và minh bạch."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container">
        <div className="glass" style={{ 
          padding: '5rem', 
          borderRadius: 'var(--radius-2xl)', 
          textAlign: 'center',
          background: 'linear-gradient(135deg, hsla(var(--primary), 0.05), hsla(var(--violet), 0.05))',
          borderWidth: '2px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>Sẵn sàng ra sân chưa?</h2>
            <p style={{ fontSize: '1.2rem', color: 'hsl(var(--muted-foreground))', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
              Tham gia cùng 25,000+ người chơi khác tại Việt Nam và trải nghiệm cách tìm sân chơi hiện đại nhất.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <Link className="cta-button primary" to="/feed" style={{ fontSize: '1.1rem', padding: '1rem 3rem' }}>
                Khám phá ngay <ChevronRight size={20} />
              </Link>
            </div>
          </div>
          {/* Animated background element */}
          <div style={{
            position: 'absolute',
            top: '-10rem',
            right: '-10rem',
            width: '25rem',
            height: '25rem',
            background: 'hsla(var(--primary), 0.1)',
            borderRadius: '50%',
            filter: 'blur(80px)'
          }} />
        </div>
      </section>
    </div>
  )
}
