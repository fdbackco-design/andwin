# ANDWIN Live Commerce Studio

ANDWIN Live Commerce Studio의 정적 랜딩 페이지입니다. Next.js로 구축되었으며 Vercel에 정적 사이트로 배포됩니다.

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules (globals.css)
- **Deployment**: Vercel (Static Export)

## 프로젝트 구조

```
andwin/
├── app/
│   ├── components/          # React 컴포넌트
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── AndwinIs.tsx
│   │   ├── Service.tsx
│   │   ├── WorkSection.tsx
│   │   ├── ConceptGallery.tsx
│   │   ├── Academy.tsx
│   │   ├── Partners.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── data/
│   │   └── workData.ts      # WORK 섹션 데이터
│   ├── layout.tsx            # 루트 레이아웃
│   ├── page.tsx              # 메인 페이지
│   └── globals.css           # 전역 스타일
├── public/
│   └── assets/               # 정적 자산
│       ├── live-reference/   # 라이브 레퍼런스 이미지
│       └── concept/          # 컨셉 갤러리 이미지
├── next.config.mjs           # Next.js 설정
├── package.json
└── tsconfig.json
```

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 프로덕션 빌드

```bash
npm run build
```

빌드된 정적 파일은 `out/` 디렉토리에 생성됩니다.

### 프로덕션 미리보기

```bash
npm run start
```

## 배포

### Vercel 배포

1. Vercel에 프로젝트를 연결합니다.
2. 빌드 설정은 자동으로 감지됩니다.
3. `next.config.mjs`의 `output: 'export'` 설정으로 정적 사이트가 생성됩니다.

### 수동 배포

```bash
npm run build
```

`out/` 디렉토리의 내용을 정적 호스팅 서비스에 업로드하세요.

## 주요 기능

- ✅ 반응형 디자인 (모바일, 태블릿, 데스크톱)
- ✅ 부드러운 스크롤 네비게이션
- ✅ 모바일 햄버거 메뉴
- ✅ IntersectionObserver 기반 스크롤 애니메이션
- ✅ 접근성 고려 (ARIA 레이블, 시맨틱 HTML)
- ✅ SEO 최적화 (메타 태그, 구조화된 데이터)
- ✅ 한국어/영어 이중 언어 지원

## 섹션 구성

1. **Hero**: 메인 비주얼 섹션
2. **ANDWIN IS**: 회사 소개
3. **SERVICE**: 서비스 소개 (3개 카드)
4. **WORK**: 라이브 레퍼런스 갤러리 (카테고리별 그리드)
5. **Concept Gallery**: 컨셉 이미지 갤러리
6. **Academy**: 아카데미 소개
7. **Partners**: 파트너 브랜드
8. **Contact**: 문의 폼
9. **Footer**: 푸터 정보

## 이미지 추가

`public/assets/` 디렉토리에 다음 이미지를 추가하세요:

- `hero-bg.jpg`: Hero 섹션 배경 이미지
- `academy-bg.jpg`: Academy 섹션 배경 이미지
- `live-reference/*.jpg`: 각 브랜드별 라이브 레퍼런스 이미지
- `concept/*.jpg`: 컨셉 갤러리 이미지

## EmailJS 설정 (Contact 폼)

Contact 폼에서 이메일 전송 기능을 사용하려면 EmailJS 설정이 필요합니다.

### 1. EmailJS 계정 생성

1. [https://www.emailjs.com/](https://www.emailjs.com/)에서 무료 계정을 생성합니다.
2. 대시보드에서 **Email Services**를 추가합니다 (Gmail, Outlook 등).
3. **Email Templates**에서 새 템플릿을 생성합니다.

### 2. 템플릿 설정

EmailJS 템플릿에서 다음 변수들을 사용할 수 있습니다:

- `{{to_email}}`: 수신자 이메일 (dlsdjdmlqlc3@naver.com)
- `{{from_name}}`: 발신자 이름
- `{{from_email}}`: 발신자 이메일
- `{{phone}}`: 연락처
- `{{store_url}}`: 브랜드 스토어 URL
- `{{message}}`: 문의 내용
- `{{subject}}`: 이메일 제목

템플릿 예시:
```
제목: {{subject}}

이름: {{from_name}}
이메일: {{from_email}}
연락처: {{phone}}
브랜드 스토어 URL: {{store_url}}

문의 내용:
{{message}}
```

### 3. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 정보를 입력하세요:

```env
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
```

각 값은 EmailJS 대시보드에서 확인할 수 있습니다:
- **Public Key**: Account > API Keys
- **Service ID**: Email Services > Service ID
- **Template ID**: Email Templates > Template ID

### 4. Vercel 배포 시 환경 변수 설정

Vercel 대시보드에서 프로젝트 설정 > Environment Variables에 위의 환경 변수들을 추가하세요.

## 커스터마이징

### 색상 변경

`app/globals.css`의 CSS 변수를 수정하세요:

```css
:root {
  --color-bg: #ffffff;
  --color-text: #111111;
  --color-footer-bg: #111111;
  /* ... */
}
```

### 데이터 수정

WORK 섹션의 데이터는 `app/data/workData.ts`에서 수정할 수 있습니다.

## 라이선스

© 2025 ANDWIN STUDIO. All Rights Reserved.

