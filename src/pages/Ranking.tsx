import React from 'react'
import { Trophy, Medal, MapPinned, Star, TrendingUp, UserRound } from 'lucide-react'
import { ranking } from '../data'

function PodiumCard({ rank, player }: { rank: number; player: typeof ranking[0] }) {
  const isTop1 = rank === 1
  return (
    <article className={`podium-card rank-${rank} glass${isTop1 ? ' featured' : ''}`} aria-label={`Thứ hạng ${rank}: ${player.name}`}>
      <div className="medal-wrap">
        <Medal size={isTop1 ? 32 : 26} aria-hidden="true" />
      </div>
      <strong className="rank-num">#{rank}</strong>
      {player.avatar ? (
        <img src={player.avatar} alt={player.name} className="player-avatar-lg" />
      ) : (
        <div className="player-avatar-placeholder"><UserRound size={isTop1 ? 32 : 24} /></div>
      )}
      <h3>{player.name}</h3>
      <p className="player-district"><MapPinned size={12} /> {player.district}</p>
      <div className="podium-score">
        <strong>{player.score.toLocaleString()}</strong>
        <span>điểm ELO</span>
      </div>
      <div className="player-streak">
        <TrendingUp size={12} />
        {player.streak}
      </div>
      <div className="player-stats-mini">
        <span>{player.games} trận</span>
        <span className="dot">•</span>
        <span>{player.winRate}% thắng</span>
      </div>
    </article>
  )
}

export function RankingPage() {
  const podium = ranking.slice(0, 3)
  const remaining = ranking.slice(3)

  return (
    <div className="container app-page">
      <section className="page-hero compact centered" aria-labelledby="ranking-title">
        <div className="eyebrow subtle">
          <Trophy size={14} aria-hidden="true" />
          Bảng xếp hạng ELO cộng đồng
        </div>
        <h1 id="ranking-title" className="page-title">Người chơi cầu lông nổi bật</h1>
        <p className="page-subtitle">
          Hệ thống tính điểm dựa trên phong độ gần đây, tỉ lệ thắng và cường độ thi đấu.
        </p>
      </section>

      {/* Podium Top 3 */}
      <div className="podium-grid" role="list">
        {podium.length >= 2 && <PodiumCard rank={2} player={podium[1]} />}
        {podium.length >= 1 && <PodiumCard rank={1} player={podium[0]} />}
        {podium.length >= 3 && <PodiumCard rank={3} player={podium[2]} />}
      </div>

      {/* Extended Leaderboard */}
      <div className="leaderboard glass" role="grid" aria-label="Bảng xếp hạng đầy đủ">
        <div className="leaderboard-header" role="row">
          <div role="columnheader">Hạng</div>
          <div role="columnheader">Vận động viên</div>
          <div role="columnheader" className="desktop-only text-center">Trận đấu</div>
          <div role="columnheader" className="desktop-only text-right">Tỉ lệ thắng</div>
          <div role="columnheader" className="text-right">Điểm ELO</div>
        </div>

        {ranking.map((player) => (
          <div key={player.rank} className="leaderboard-row" role="row">
            <div className={`leaderboard-rank rank-${player.rank}`} role="gridcell">
              #{player.rank}
            </div>
            <div className="leaderboard-name" role="gridcell">
              <div className="name-with-avatar">
                <div className="avatar-small"><UserRound size={14} /></div>
                <div>
                  <strong>{player.name}</strong>
                  <span>{player.district}</span>
                </div>
              </div>
            </div>
            <div className="leaderboard-games desktop-only text-center" role="gridcell">
              {player.games}
            </div>
            <div className="leaderboard-winrate desktop-only text-right" role="gridcell">
              <span className="winrate-bar" style={{ width: `${player.winRate}%` }} />
              {player.winRate}%
            </div>
            <div className="leaderboard-score text-right" role="gridcell">
              {player.score.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="ranking-info-card glass">
        <div className="info-icon"><TrendingUp size={20} /></div>
        <div className="info-content">
          <h4>Quy tắc tính điểm ELO</h4>
          <p>
            Điểm ELO được cập nhật mỗi khi kết quả trận đấu được ghi nhận trên hệ thống SmashMate.
            Điểm cộng/trừ phụ thuộc vào chênh lệch trình độ giữa bạn và đối thủ. Chuỗi thắng (streak)
            sẽ kích hoạt hệ thống nhân điểm thưởng.
          </p>
        </div>
        <button className="cta-button secondary small">Tìm hiểu thêm</button>
      </div>
    </div>
  )
}
