import { CircleDollarSign, Check, Mail } from 'lucide-react'
import { plans } from '../data'

function FeatureItem({ label }: { label: string }) {
  return (
    <li className="pricing-feature-item">
      <div className="check-icon"><Check size={14} /></div>
      <span>{label}</span>
    </li>
  )
}

export function PricingPage() {
  return (
    <div className="container app-page">
      <section className="page-hero compact centered" aria-labelledby="pricing-title">
        <div className="eyebrow">
          <CircleDollarSign size={14} aria-hidden="true" />
          Mở rộng trải nghiệm của bạn
        </div>
        <h1 id="pricing-title" className="page-title">Gói dịch vụ cao cấp</h1>
        <p className="page-subtitle">
          Khám phá những tính năng mạnh mẽ dành riêng cho người chơi cầu lông chuyên nghiệp và CLB.
        </p>
      </section>

      <div className="pricing-grid" role="group" aria-label="Gói dịch vụ">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`pricing-card glass${plan.featured ? ' featured' : ''} ${plan.tone}`}
            aria-label={plan.name}
          >
            {plan.featured && (
              <div className="featured-badge">
                PHỔ BIẾN NHẤT
              </div>
            )}
            <div className="pricing-header">
              <h3>{plan.name}</h3>
              <div className="price-tag">
                <strong className="price">{plan.price}</strong>
                <span className="price-period">{plan.priceNum > 0 ? '/ tháng' : ''}</span>
              </div>
            </div>
            <p className="plan-description">{plan.description}</p>

            <ul className="plan-features" role="list">
              {plan.features.map((feature) => (
                <FeatureItem key={feature} label={feature} />
              ))}
            </ul>

            <button
              className={`cta-button ${plan.featured ? 'primary' : 'secondary'}`}
              type="button"
            >
              {plan.cta}
            </button>
          </article>
        ))}
      </div>

      <div className="pricing-faq container">
        <h2 className="text-center">Câu hỏi thường gặp</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h4>Tôi có thể thay đổi gói sau khi đăng ký?</h4>
            <p>Có, bạn có thể nâng cấp hoặc hạ cấp bất kỳ lúc nào thông qua phần Cài đặt của bạn.</p>
          </div>
          <div className="faq-item">
            <h4>Thanh toán được thực hiện như thế nào?</h4>
            <p>SmashMate hỗ trợ đa dạng phương thức thanh toán: MoMo, VNPay và chuyển khoản ngân hàng.</p>
          </div>
          <div className="faq-item">
            <h4>Có thể dùng thử gói Plus trước không?</h4>
            <p>Tất cả tài khoản mới đều có thể dùng thử miễn phí gói Plus trong vòng 7 ngày.</p>
          </div>
          <div className="faq-item">
            <h4>Dành cho doanh nghiệp hoặc giải đấu?</h4>
            <p>Vui lòng liên hệ trực tiếp với đội ngũ hỗ trợ để nhận mức giá ưu đãi và các giải pháp tùy chỉnh.</p>
          </div>
        </div>
      </div>

      <div className="support-cta glass">
        <div className="cta-icon"><Mail size={24} /></div>
        <div className="cta-content">
          <h3>Bạn cần thêm sự hỗ trợ?</h3>
          <p>Nhóm tư vấn SmashMate luôn sẵn sàng giúp bạn chọn gói dịch vụ phù hợp nhất.</p>
        </div>
        <button className="cta-button primary small">Liên hệ ngay</button>
      </div>
    </div>
  )
}
