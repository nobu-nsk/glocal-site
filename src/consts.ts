// Google アナリティクス（GA4）測定ID。空にすると計測タグは読み込まれない。
export const GA4_ID = 'G-S4K621FEG2';

// 計測するイベント名（GA4のキーイベント＝コンバージョンに設定して使う）
export const GA_EVENTS = {
  bookingClick: 'airbnb_click', // 予約サイト（Airbnb等）への遷移クリック
  contactSubmit: 'contact_submit', // 問い合わせフォーム送信完了
  instagramClick: 'instagram_click', // Instagramプロフィールへの遷移クリック
};

// SNSアカウント（フッター等で使用）。新しいアカウントが増えたらここに追加する。
export const SOCIAL = {
  instagram: {
    handle: '@glocal.fuji.kawaguchiko',
    url: 'https://www.instagram.com/glocal.fuji.kawaguchiko/',
    // トップページのInstagramフィード（外部ウィジェット Behold.so）設定。
    // 連携手順:
    //   1) https://behold.so で無料登録し、Instagramアカウント(@glocal.fuji.kawaguchiko)を接続
    //   2) フィードを作成すると発行される Feed ID を下記 widgetId に貼り付け
    //   3) git push すると本番に反映（IDが空の間はフォロー導線のみ表示）
    widgetId: '2Ol3DyHXpWyOWvWS1nQB', // 例: 'abcd1234EXAMPLE'
  },
};
