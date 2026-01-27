export interface Product {
    id: number;
    slug: string;
    status: "active" | "beta" | "development";
    type: "Product" | "Asset";
    category: string;
    title: string;
    description: string;
    learner: string;
    mechanism: string;
    createdAt: string;
    image: string;
    readme: string;
    techStack: string[];
    features: string[];
    videoUrl?: string;      // YouTube埋め込みURL
    videoFile?: string;     // ローカル動画ファイルパス
    videoPoster?: string;   // 動画のサムネイル画像
}

export const productsData: Product[] = [
    {
        id: 1,
        slug: "web-programming-course",
        status: "active",
        type: "Product",
        category: "Web Platform",
        title: "自学自習型 Webプログラミング教材",
        description: "授業と自走学習の境界を溶かす旗艦プロダクト。",
        learner: "高専3年生",
        mechanism: "段階習得 + AIレビュー + マイルストーン課題",
        createdAt: "2025-09-30",
        image: "/repoImgs/skillmap.webp",
        videoFile: "/videos/skillmap.mp4", // デモ用（実際のパスに変更してください）
        videoPoster: "/repoImgs/skillmap.webp",
        readme: `## 概要

このプラットフォームは、学生が自分のペースで確実にWebプログラミングのスキルを習得できるよう設計された教材です。授業での一斉指導と自走学習の境界を溶かし、学習者一人ひとりが自律的に成長できる環境を提供します。

## 主な機能

### 段階的習得システム
- 基礎から応用まで、細かくステップ分けされたカリキュラム
- 各ステップで確実な理解を確認してから次へ進む仕組み
- 学習者の進捗を可視化するダッシュボード

### AIによる即時レビュー
- 提出されたコードをAIが自動レビュー
- 即座にフィードバックを提供し、学習サイクルを加速
- 個別の理解度に応じたヒントと改善提案

### マイルストーン課題
- 各章の終わりに実践的な課題を配置
- 学んだ知識を統合して使う機会を提供
- 教員による最終レビューと評価

## 技術的特徴

React + Google Apps Scriptで構築された軽量なWebアプリケーション。Google Classroomとの連携により、既存の教育インフラとシームレスに統合できます。`,
        techStack: ["React", "Google Apps Script", "Google Classroom API", "OpenAI API"],
        features: ["段階習得システム", "AIレビュー機能", "進捗ダッシュボード", "マイルストーン課題"]
    },
    {
        id: 2,
        slug: "ai-tutor",
        status: "beta",
        type: "Product",
        category: "AI Tutor",
        title: "AIチューター",
        description: "学習者との対話を通じて、学習者の理解度を診断し、学習者の学習を支援するAIチューター。",
        learner: "高専全学年",
        mechanism: "対話型学習支援 + 理解度診断",
        createdAt: "2025-09-30",
        image: "/repoImgs/tutor.webp",
        readme: `## 概要

生成AIを活用した対話型チューターシステムです。学習者の質問に答えるだけでなく、理解度を診断し、適切なヒントとフィードバックを提供します。

## 主な機能

### 対話型学習支援
- 自然言語で質問できるインターフェース
- 学習者の理解度に応じた説明
- ソクラテス式の問いかけで思考を促進

### 理解度診断
- 対話内容から学習者の理解度を推定
- つまずきポイントを特定
- 個別最適化された学習経路を提案

## 開発状況

現在ベータ版として一部の授業で試験運用中。学生からのフィードバックをもとに改善を続けています。`,
        techStack: ["Python", "FastAPI", "OpenAI API", "LangChain", "PostgreSQL"],
        features: ["対話型インターフェース", "理解度診断", "個別最適化", "学習履歴管理"]
    },
    {
        id: 3,
        slug: "algorithm-slides",
        status: "active",
        type: "Asset",
        category: "Class Slides",
        title: "授業スライド（アルゴリズム）",
        description: "探索・整列といった基礎から、セキュリティのアルゴリズムまで。",
        learner: "高専3年生",
        mechanism: "章単位・復習活用",
        createdAt: "2025-04-01",
        image: "/kzm_illust.png",
        readme: `## 概要

アルゴリズムとデータ構造を学ぶための授業スライドセットです。基礎的な探索・整列アルゴリズムから、暗号化やセキュリティに関連するアルゴリズムまで幅広くカバーしています。

## 内容

### 基礎編
- 線形探索・二分探索
- バブルソート・クイックソート
- スタック・キュー・リスト

### 応用編
- ハッシュテーブル
- 木構造・グラフ
- 暗号化アルゴリズム

## 特徴

各章ごとに復習問題を用意し、理解度を確認しながら進められるよう設計しています。`,
        techStack: ["PowerPoint", "Python (サンプルコード)"],
        features: ["章単位の構成", "復習問題付き", "サンプルコード", "可視化図解"]
    },
    {
        id: 4,
        slug: "c-language-slides",
        status: "active",
        type: "Asset",
        category: "Class Slides",
        title: "授業スライド（C言語）",
        description: "プログラミング教育の導入資料。基本構文からポインタまで。",
        learner: "高専1年生",
        mechanism: "章単位・復習活用",
        createdAt: "2025-04-01",
        image: "/kzm_illust.png",
        readme: `## 概要

プログラミング初学者向けのC言語教材です。基本的な文法から、ポインタや構造体といった応用的な内容まで、段階的に学べるよう構成されています。

## 内容

### 基礎編
- 変数・データ型
- 条件分岐・繰り返し
- 配列・関数

### 応用編
- ポインタの基礎
- 構造体
- ファイル入出力

## 特徴

実践的な演習問題を多数用意し、手を動かしながら学べるようにしています。`,
        techStack: ["C", "PowerPoint"],
        features: ["段階的カリキュラム", "演習問題", "実践課題", "図解付き説明"]
    },
]