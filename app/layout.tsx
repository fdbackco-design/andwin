import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ANDWIN LIVE STUDIO - 라이브커머스 전문 스튜디오',
  description:
    '라이브커머스 기획·제작·송출·아카데미를 제공하는 전문 스튜디오. 소비자의 니즈와 제품에 맞는 퀄리티 높은 방송과 트렌디한 컨텐츠 제작.',
  keywords: '라이브커머스, 라이브커머스 스튜디오, 쇼호스트, 라이브 방송, ANDWIN',
  icons: {
    icon: '/assets/favicon.png',
    shortcut: '/assets/favicon.png',
    apple: '/assets/favicon.png',
  },
  openGraph: {
    title: 'ANDWIN LIVE STUDIO - 라이브커머스 전문 스튜디오',
    description:
      '라이브커머스 기획·제작·송출·아카데미를 제공하는 전문 스튜디오. 소비자의 니즈와 제품에 맞는 퀄리티 높은 방송과 트렌디한 컨텐츠 제작.',
    type: 'website',
  },
  viewport: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

