# intern-match-app

## ディレクトリ構成

```
.
├── back-end/ (バックエンド)
├── front-end/ (フロントエンド)
└── docker-compose.yml
```

## 動作確認

`Docker`を用いて実行する。

```
// ネットワークの作成
docker network create match-app

// ビルド＆実行
docker compose --profile full up -d --build

// DBの準備
docker compose exec be rails db:prepare
```

## API エンドポイント

```
POST /users #サインアップ
POST /users/sign_in #サイイン

GET /api/v1/intern_profiles # 学生一覧の取得

POST /api/v1/messages # 企業 → 学生メッセージ送信
GET /api/v1/messages # 受信メッセージ一覧（実装間に合いませんでした）
```

## MVP

```
・インターン生が登録できる。
・企業からインターン生にメッセージを送信できる。
```

## 工夫した点

```
・生徒、企業を role に分けて、制約を設けました。
・会員登録の画面で共通部分(User)と InternProfile, CompanyProfile で派生プロフィールを組み合わせる設計にしました。
```

## 反省・感想

```
・行き当たりばったりの開発だったので、前もって必要な機能などを決めておけば効率の良い開発になったと思う。
・Next js, Ruby を触るのが初めてだったため、基礎の習得に時間がかかってしまった。
・欲を言うと、リアルタイムでのメッセージの送受信機能を実装したかった。
・初めてのことだらけで正直しんどかったが、振り返ると楽しかったし勉強になった。
```
