import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Pulefeed — Independent Political & Tech Feed'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #1a0a0a 100%)',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Background pattern - subtle grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Red accent line top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #e53e3e, #fc8181, #e53e3e)',
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '96px',
            height: '96px',
            borderRadius: '24px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '32px',
          }}
        >
          <span
            style={{
              fontSize: '52px',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-2px',
            }}
          >
            P
          </span>
        </div>

        {/* Brand name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0px',
            marginBottom: '20px',
          }}
        >
          <span
            style={{
              fontSize: '80px',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-3px',
            }}
          >
            Pule
          </span>
          <span
            style={{
              fontSize: '80px',
              fontWeight: 900,
              color: '#e53e3e',
              letterSpacing: '-3px',
            }}
          >
            feed
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: '26px',
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: '0.5px',
            margin: 0,
          }}
        >
          Independent Political &amp; Tech Feed
        </p>

        {/* Bottom URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '36px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255,255,255,0.3)',
            fontSize: '18px',
          }}
        >
          pulefeed.tech
        </div>

        {/* Red accent line bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'rgba(229,62,62,0.3)',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
