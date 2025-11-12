export type WorkCategory = "appliance" | "living" | "food" | "supplement";

export interface WorkItem {
  title: string;
  image: string;
  url: string;
  category: WorkCategory;
}

export const workData: WorkItem[] = [
  // 가전제품 (appliance)
  {
    "title": "쿠첸직영몰",
    "image": "/assets/live-reference/쿠첸.JPG",
    "url": "https://view.shoppinglive.naver.com/replays/1698401?fm=shoppinglive&sn=home",
    "category": "appliance"
  },
  {
    "title": "풀무원가전",
    "image": "/assets/live-reference/풀무원가전.JPG",
    "url": "https://view.shoppinglive.naver.com/replays/1763332?fm=shoppinglive&sn=home",
    "category": "appliance"
  },
  {
    "title": "제니퍼룸",
    "image": "/assets/live-reference/제니퍼룸.JPG",
    "url": "https://view.shoppinglive.naver.com/replays/1612423?fm=shoppinglive&sn=home",
    "category": "appliance"
  },
  {
    "title": "삼성음향",
    "image": "/assets/live-reference/하만카돈.JPG",
    "url": "https://view.shoppinglive.naver.com/replays/1711444?fm=shoppinglive&sn=home",
    "category": "appliance"
  },
  {
    "title": "삼성저장",
    "image": "/assets/live-reference/휴렉.JPG",
    "url": "https://view.shoppinglive.naver.com/replays/1737682?fm=shoppinglive&sn=home",
    "category": "appliance"
  },
  {
    "title": "위칙",
    "image": "/assets/live-reference/위칙.JPG",
    "url": "https://naver.me/5YSmcnkx",
    "category": "living"
  },
  {
    "title": "이너시아",
    "image": "/assets/live-reference/이너시아.png",
    "url": "https://shoppinglive.kakao.com/live/45214",
    "category": "living"
  },
  {
    "title": "인바디",
    "image": "/assets/live-reference/인바디.jpg",
    "url": "",
    "category": "living"
  },
  {
    "title": "코디",
    "image": "/assets/live-reference/코디.JPG",
    "url": "https://view.shoppinglive.naver.com/replays/1414335?fm=shoppinglive&sn=home",
    "category": "living"
  },
  {
    "title": "테팔",
    "image": "/assets/live-reference/테팔.png",
    "url": "",
    "category": "living"
  },
  {
    "title": "비비큐",
    "image": "/assets/live-reference/비비큐.png",
    "url": "https://shoppinglive.kakao.com/live/49157?input_channel_id=4119&ref=live_share&t_src=shopping_live&t_ch=share&t_obj=URLshare",
    "category": "food"
  },
  {
    "title": "레모나",
    "image": "/assets/live-reference/레모나.JPG",
    "url": "https://view.shoppinglive.naver.com/replays/1678528?fm=shoppinglive&sn=home",
    "category": "food"
  },
  {
    "title": "HC 한우마을",
    "image": "/assets/live-reference/홍천한우.jpg",
    "url": "https://shoppinglive.kakao.com/live/35317?input_channel_id=4119&ref=live_share&t_src=shopping_live&t_ch=share&t_obj=talkshare",
    "category": "food"
  },
  {
    "title": "조선장어",
    "image": "/assets/live-reference/조선장어.png",
    "url": "",
    "category": "food"
  },
  {
    "title": "풀무원샘물",
    "image": "/assets/live-reference/풀무원샘물.jpg",
    "url": "https://view.shoppinglive.naver.com/replays/1594499?fm=shoppinglive&sn=home",
    "category": "food"
  },
  {
    "title": "풀무원건생",
    "image": "/assets/live-reference/풀무원건생.JPG",
    "url": "https://view.shoppinglive.naver.com/replays/1657855?fm=shoppinglive&sn=home",
    "category": "supplement"
  },
  {
    "title": "메리루스",
    "image": "/assets/live-reference/메리루스.png",
    "url": "",
    "category": "supplement"
  },
  {
    "title": "가든오브라이프",
    "image": "/assets/live-reference/가든오브라이프.png",
    "url": "https://shoppinglive.kakao.com/live/47784",
    "category": "supplement"
  },
  {
    "title": "듀오덤",
    "image": "/assets/live-reference/듀오덤.png",
    "url": "https://shoppinglive.kakao.com/live/38695?input_channel_id=4119&ref=live_share&t_src=shopping_live&t_ch=share&t_obj=URLshare",
    "category": "supplement"
  },
  {
    "title": "광동제약",
    "image": "/assets/live-reference/광동제약.png",
    "url": "https://shoppinglive.kakao.com/live/47897",
    "category": "supplement"
  },
];

export const categoryLabels: Record<WorkCategory, string> = {
  appliance: "가전제품",
  living: "리빙",
  food: "푸드",
  supplement: "건강기능식품",
};

