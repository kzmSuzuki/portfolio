import styles from "./ProductReadme.module.css";
import type { Product } from "../../data/productsData";

interface ProductReadmeProps {
  product: Product;
}

export default function ProductReadme({ product }: ProductReadmeProps) {
  // Markdownライクなテキストを段落に分割
  const sections = product.readme.split('\n\n').filter(line => line.trim());

  const renderSection = (text: string, index: number) => {
    // 見出しの処理
    if (text.startsWith('## ')) {
      return <h2 key={index} className={styles.heading}>{text.replace('## ', '')}</h2>;
    }
    if (text.startsWith('### ')) {
      return <h3 key={index} className={styles.subheading}>{text.replace('### ', '')}</h3>;
    }
    
    // リストの処理
    if (text.startsWith('- ')) {
      const items = text.split('\n').filter(item => item.startsWith('- '));
      return (
        <ul key={index} className={styles.list}>
          {items.map((item, i) => (
            <li key={i}>{item.replace('- ', '')}</li>
          ))}
        </ul>
      );
    }

    // 通常の段落
    return <p key={index} className={styles.paragraph}>{text}</p>;
  };

  // YouTube URLを埋め込み用URLに変換
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch')) {
      const videoId = new URL(url).searchParams.get('v');
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url; // 既に埋め込み用URLの場合、またはVimeoなど
  };

  return (
    <div className={styles.readme}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <span className={styles.icon}>📄</span>
          README.md
        </h2>
      </div>
      <div className={styles.content}>
        {/* ローカル動画の場合 */}
        {product.videoFile && (
          <div className={styles.videoContainer}>
            <video
              controls
              preload="metadata"
              poster={product.videoPoster}
              className={styles.video}
            >
              <source src={product.videoFile} type="video/mp4" />
              <source src={product.videoFile.replace('.mp4', '.webm')} type="video/webm" />
              お使いのブラウザは動画タグをサポートしていません。
            </video>
          </div>
        )}
        
        {/* YouTube動画の場合 */}
        {!product.videoFile && product.videoUrl && (
          <div className={styles.videoContainer}>
            <iframe
              src={getEmbedUrl(product.videoUrl)}
              title={product.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.video}
              loading="lazy"
            ></iframe>
          </div>
        )}
        
        {sections.map((section, index) => renderSection(section, index))}
      </div>
    </div>
  );
}
