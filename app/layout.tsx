import type { Metadata } from "next";
import { Noto_Sans_JP, JetBrains_Mono, Pixelify_Sans, Jost} from 'next/font/google'
import './globals.css'

// Noto Sans JP（本文用）
const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'], // 日本語は自動で必要サブセットが配信されます。latinを入れておくとUI文字などで安心
  weight: ['400', '700'], // 必要なウェイトのみ（増やすとサイズ増）
  display: 'swap',
  variable: '--sans', // CSS変数としても使う
})

// JetBrains Mono（コード・等幅用）
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--mono',
})

const pixelifySans = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--dot',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--jost',
})

export const metadata: Metadata = {
  title: 'Kzm\'s portfolio | new education v.0.1 beta',
  description: 'Kzm\'s portfolio site',
}

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSansJP.className} ${notoSansJP.variable} ${jetBrainsMono.variable} ${pixelifySans.variable} ${jost.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
