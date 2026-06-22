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
    // サイト共通のInstagramフィード用 Behold.so Feed ID（任意）。
    // ※ 現在は物件ごとに設定する方式を採用。GFKのフィードは
    //    src/content/properties/gfk.md の instagramWidgetId に設定している。
    //    全社共通アカウントができたらここにIDを入れると共通フィードとして使える。
    widgetId: '',
  },
};
