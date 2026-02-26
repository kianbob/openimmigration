import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'OpenImmigration — U.S. Immigration Court Data Explorer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
          <div style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', fontFamily: 'serif' }}>
            OpenImmigration
          </div>
        </div>
        <div style={{ fontSize: '28px', color: '#bfdbfe', textAlign: 'center', maxWidth: '800px' }}>
          U.S. Immigration Court Data Explorer
        </div>
        <div style={{ display: 'flex', gap: '32px', marginTop: '40px' }}>
          <div style={{ textAlign: 'center', color: 'white' }}>
            <div style={{ fontSize: '36px', fontWeight: 'bold' }}>3.3M+</div>
            <div style={{ fontSize: '16px', color: '#bfdbfe' }}>Pending Cases</div>
          </div>
          <div style={{ textAlign: 'center', color: 'white' }}>
            <div style={{ fontSize: '36px', fontWeight: 'bold' }}>2.3M</div>
            <div style={{ fontSize: '16px', color: '#bfdbfe' }}>Asylum Backlog</div>
          </div>
          <div style={{ textAlign: 'center', color: 'white' }}>
            <div style={{ fontSize: '36px', fontWeight: 'bold' }}>78.5%</div>
            <div style={{ fontSize: '16px', color: '#bfdbfe' }}>Deportation Rate</div>
          </div>
        </div>
        <div style={{ fontSize: '14px', color: '#93c5fd', marginTop: '32px' }}>
          Data from DOJ EOIR · A TheDataProject.ai Platform
        </div>
      </div>
    ),
    { ...size }
  )
}
