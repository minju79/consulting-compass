import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { BadgeLabel } from "@/components/guide/BadgeLabel";

interface ComponentGuide {
  name: string;
  purpose: string;
  where: string;
  avoid: string;
  desktop: string;
  mobile: string;
  textLength: string;
  a11y: string;
  seoRelevance: boolean;
  conversionImpact: "높음" | "중간" | "낮음";
  proofNeeded: boolean;
  required: boolean;
}

const components: ComponentGuide[] = [
  { name: "글로벌 헤더", purpose: "전체 사이트 탐색과 브랜드 인식의 기준점", where: "모든 페이지 최상단에 고정(sticky)", avoid: "투명 헤더를 과도하게 사용해 콘텐츠와 겹치는 경우", desktop: "로고 좌측 + 메인 링크 중앙/우측 + CTA 버튼 우측 끝", mobile: "로고 좌측 + 햄버거 메뉴 우측, 풀스크린 오버레이 메뉴", textLength: "메뉴 항목 2~4단어", a11y: "키보드 탐색 가능, aria-label, ESC로 메뉴 닫기", seoRelevance: false, conversionImpact: "높음", proofNeeded: false, required: true },
  { name: "메가메뉴 / 드롭다운", purpose: "서비스·산업 등 하위 항목이 많을 때 구조적 탐색 제공", where: "주요 서비스나 산업군 메뉴에 사용", avoid: "항목이 3개 이하일 때 (단순 드롭다운 사용)", desktop: "전체 폭 또는 부분 폭 패널, 카테고리별 그룹", mobile: "아코디언 형태로 전환", textLength: "카테고리명 2~3단어, 설명 1줄", a11y: "포커스 트랩, 화살표 키 탐색, aria-expanded", seoRelevance: false, conversionImpact: "중간", proofNeeded: false, required: false },
  { name: "히어로 섹션", purpose: "방문자가 5초 내에 '무슨 회사인지, 무엇을 하는지' 파악", where: "홈페이지, 랜딩 페이지 최상단", avoid: "이미지만 크고 텍스트가 없는 경우, 자동 재생 비디오 남발", desktop: "좌 텍스트 + 우 이미지 또는 전체 배경 위 텍스트", mobile: "이미지 축소/제거, 텍스트 중심 1컬럼", textLength: "헤드라인 8~15단어, 서브헤드 20~30단어, CTA 2~4단어", a11y: "배경 이미지 위 텍스트는 오버레이로 대비 확보", seoRelevance: true, conversionImpact: "높음", proofNeeded: false, required: true },
  { name: "로고 / 신뢰 배지 스트립", purpose: "고객사 로고를 통해 즉각적 신뢰 형성", where: "히어로 하단 또는 서비스 섹션 상단", avoid: "로고가 2개 이하일 때, 인지도 없는 로고만 있을 때", desktop: "가로 1줄 나열, 5~8개 로고, 그레이스케일", mobile: "2줄 또는 슬라이드 형태로 축약", textLength: "'000+개 기업이 선택한' 등 1줄 레이블", a11y: "각 로고에 alt text, 장식용이면 role='presentation'", seoRelevance: false, conversionImpact: "높음", proofNeeded: true, required: false },
  { name: "서비스 카드", purpose: "제공하는 핵심 서비스를 구조적으로 소개", where: "홈페이지, 서비스 소개 페이지", avoid: "서비스 6개 이상을 한 화면에 나열 (그룹핑 필요)", desktop: "3~4컬럼 그리드, 아이콘 + 제목 + 설명 + 링크", mobile: "1~2컬럼, 세로 스크롤", textLength: "제목 2~4단어, 설명 2~3줄", a11y: "카드 전체를 링크로 감쌀 때 접근성 라벨 필요", seoRelevance: true, conversionImpact: "높음", proofNeeded: false, required: true },
  { name: "산업군/전문분야 카드", purpose: "산업별 전문성을 시각적으로 제시", where: "홈페이지, 산업 소개 페이지", avoid: "산업 경험이 실제로 없는 분야를 나열", desktop: "3~4컬럼, 아이콘/이미지 + 산업명 + 요약", mobile: "2컬럼 또는 가로 스크롤", textLength: "산업명 2~3단어, 요약 1~2줄", a11y: "링크가 있으면 명확한 라벨", seoRelevance: true, conversionImpact: "중간", proofNeeded: true, required: false },
  { name: "케이스 스터디 카드", purpose: "실제 프로젝트 경험과 성과를 증거로 제시", where: "홈페이지, 사례 목록 페이지", avoid: "성과 수치 없이 이미지만 보여주는 경우", desktop: "2~3컬럼, 이미지 + 산업 태그 + 제목 + 핵심 성과", mobile: "1컬럼 카드 리스트", textLength: "제목 5~10단어, 성과 수치 1~2개, 태그 2~3개", a11y: "이미지 alt text에 프로젝트 맥락 포함", seoRelevance: true, conversionImpact: "높음", proofNeeded: true, required: true },
  { name: "케이스 스터디 상세 요약 블록", purpose: "사례 상세 페이지 상단에서 핵심 정보 즉시 전달", where: "케이스 스터디 상세 페이지 상단", avoid: "요약 없이 바로 본문으로 시작하는 경우", desktop: "좌: 프로젝트 개요 테이블 / 우: 핵심 성과 수치", mobile: "세로 배치, 수치 우선 표시", textLength: "개요 항목 5~7개, 성과 수치 2~4개", a11y: "테이블에 caption, th에 scope 속성", seoRelevance: true, conversionImpact: "중간", proofNeeded: true, required: true },
  { name: "프로세스 타임라인", purpose: "체계적 접근 방식을 시각화하여 신뢰 형성", where: "서비스 소개 페이지, 홈페이지", avoid: "단계가 2개 이하이거나 8개 이상일 때", desktop: "가로 타임라인, 번호 + 제목 + 설명", mobile: "세로 타임라인으로 전환", textLength: "단계명 2~4단어, 설명 1~2줄", a11y: "순서 정보를 ol/li 구조로 전달", seoRelevance: false, conversionImpact: "중간", proofNeeded: false, required: true },
  { name: "통계/성과 수치 블록", purpose: "핵심 성과를 숫자로 압축하여 신뢰 강화", where: "히어로 하단, 서비스 페이지, 사례 상세", avoid: "출처 없는 수치, 의미 없는 수 나열", desktop: "3~4개 수치 가로 나열, 대형 숫자 + 레이블", mobile: "2x2 그리드 또는 세로 나열", textLength: "수치 + 2~4단어 레이블", a11y: "수치와 단위를 스크린리더가 자연스럽게 읽도록", seoRelevance: false, conversionImpact: "높음", proofNeeded: true, required: false },
  { name: "방법론/프레임워크 블록", purpose: "독자적 접근 방식을 시각화하여 전문성 강조", where: "서비스 페이지, 홈페이지", avoid: "일반적인 프로세스와 차별화 없는 경우", desktop: "다이어그램 또는 구조화된 카드 레이아웃", mobile: "세로 리스트 또는 축약 다이어그램", textLength: "방법론명 + 단계별 2~3줄 설명", a11y: "다이어그램에 텍스트 대체 제공", seoRelevance: false, conversionImpact: "중간", proofNeeded: false, required: false },
  { name: "팀/전문가 소개 카드", purpose: "핵심 인력 소개로 인간적 신뢰와 전문성 전달", where: "팀 소개 페이지, 홈페이지", avoid: "전체 직원 나열 (핵심 인력 3~6명에 집중)", desktop: "3~4컬럼, 사진 + 이름 + 직함 + 전문 분야", mobile: "2컬럼 또는 가로 스크롤", textLength: "이름, 직함 1줄, 전문 분야 1~2줄", a11y: "인물 사진 alt text에 이름과 역할 포함", seoRelevance: false, conversionImpact: "중간", proofNeeded: true, required: false },
  { name: "추천사/인용 블록", purpose: "고객의 실제 목소리로 신뢰를 강화", where: "홈페이지 중반, 사례 상세, 문의 폼 인접", avoid: "익명 추천사, 과장된 표현, 검증 불가한 인용", desktop: "카드 또는 전체 폭 인용, 사진 + 이름 + 직함 + 인용문", mobile: "1컬럼 카드, 인용문 축약", textLength: "인용문 2~4문장, 이름 + 직함 + 회사명", a11y: "blockquote 태그 사용, cite 속성", seoRelevance: false, conversionImpact: "높음", proofNeeded: true, required: false },
  { name: "인사이트/블로그 카드", purpose: "전문성을 증명하는 콘텐츠로 유입과 신뢰 확보", where: "홈페이지, 인사이트 목록", avoid: "제목만 나열하고 요약이 없는 경우", desktop: "3컬럼, 이미지 + 카테고리 + 제목 + 요약 + 날짜", mobile: "1컬럼, 이미지 축소", textLength: "제목 6~12단어, 요약 2줄", a11y: "이미지 alt text, 날짜에 time 태그", seoRelevance: true, conversionImpact: "낮음", proofNeeded: false, required: false },
  { name: "리포트/다운로드 리소스 카드", purpose: "리드 수집용 다운로드 콘텐츠 소개", where: "인사이트 페이지, 리포트 랜딩", avoid: "다운로드 가치가 불명확한 경우", desktop: "이미지/커버 + 제목 + 핵심 내용 + 다운로드 CTA", mobile: "1컬럼, CTA 강조", textLength: "제목 5~10단어, 하이라이트 3~5개", a11y: "CTA에 명확한 라벨 (예: 'PDF 다운로드')", seoRelevance: true, conversionImpact: "높음", proofNeeded: false, required: false },
  { name: "FAQ 아코디언", purpose: "자주 묻는 질문에 선제적으로 답변하여 불안 해소", where: "홈페이지 하단, 서비스 페이지, 문의 페이지", avoid: "질문이 2개 이하이거나 15개 이상일 때", desktop: "좌측 카테고리 탭 + 우측 아코디언, 또는 단일 목록", mobile: "풀 폭 아코디언", textLength: "질문 1줄, 답변 3~5줄", a11y: "aria-expanded, Enter/Space로 토글", seoRelevance: true, conversionImpact: "중간", proofNeeded: false, required: false },
  { name: "CTA 배너", purpose: "페이지 중간/하단에서 전환을 유도", where: "콘텐츠 섹션 사이, 페이지 마지막", avoid: "모든 섹션 사이마다 CTA를 넣어 피로감 유발", desktop: "배경색 강조 + 헤드라인 + 설명 + 버튼", mobile: "텍스트 축약, 버튼 풀 폭", textLength: "헤드라인 5~10단어, 버튼 2~4단어", a11y: "CTA 버튼에 명확한 라벨, 시각적 대비 확보", seoRelevance: false, conversionImpact: "높음", proofNeeded: false, required: true },
  { name: "상담 문의 폼", purpose: "방문자를 리드로 전환하는 최종 전환점", where: "문의 페이지, 홈페이지 하단 섹션", avoid: "필드 7개 이상, 불필요한 필수 입력", desktop: "2컬럼 (좌 설명 + 우 폼) 또는 중앙 정렬 폼", mobile: "풀 폭 1컬럼 폼", textLength: "필드 4~6개: 이름, 회사, 이메일, 문의 유형, 메시지", a11y: "각 필드에 label 연결, 에러 메시지 aria-live, 탭 순서", seoRelevance: false, conversionImpact: "높음", proofNeeded: false, required: true },
  { name: "비교 테이블 / Capability Matrix", purpose: "서비스 간 비교 또는 역량 매트릭스 제공", where: "서비스 페이지, 비교 페이지", avoid: "항목이 너무 많아 가독성이 떨어지는 경우", desktop: "테이블 형태, 열 고정 헤더", mobile: "가로 스크롤 또는 카드형 비교", textLength: "항목명 2~4단어, 설명 1줄", a11y: "caption, th scope, 헤더 고정 시 aria 처리", seoRelevance: false, conversionImpact: "중간", proofNeeded: false, required: false },
  { name: "탭 / 칩 / 필터 / 태그", purpose: "콘텐츠 분류와 필터링 기능 제공", where: "사례 목록, 인사이트 목록, 서비스 분류", avoid: "카테고리 2개 이하일 때 (불필요한 UI)", desktop: "가로 탭 바 또는 칩 그룹", mobile: "가로 스크롤 칩, 또는 드롭다운 필터", textLength: "태그 1~3단어", a11y: "tablist/tab role, aria-selected, 키보드 좌우 이동", seoRelevance: false, conversionImpact: "낮음", proofNeeded: false, required: false },
  { name: "Breadcrumb", purpose: "현재 위치 인지와 상위 탐색 경로 제공", where: "2단계 이상 깊이의 모든 페이지", avoid: "1단계 페이지(홈, 문의 등)에서는 불필요", desktop: "페이지 상단 좌측, 작은 텍스트", mobile: "동일, 길면 축약", textLength: "경로당 2~4단어", a11y: "nav aria-label='breadcrumb', ol/li 구조", seoRelevance: true, conversionImpact: "낮음", proofNeeded: false, required: false },
  { name: "페이지 인트로 패턴", purpose: "페이지 주제를 즉시 전달하는 상단 영역", where: "모든 내부 페이지 상단", avoid: "인트로 없이 바로 콘텐츠로 시작", desktop: "배지 + H1 + 설명 + 구분선", mobile: "동일, 텍스트 크기 조정", textLength: "H1 4~10단어, 설명 1~2줄", a11y: "H1 단일 사용, 명확한 페이지 주제", seoRelevance: true, conversionImpact: "낮음", proofNeeded: false, required: true },
  { name: "Sticky In-page TOC", purpose: "긴 문서 페이지에서 섹션 간 빠른 이동", where: "가이드 문서, 긴 아티클", avoid: "섹션 3개 이하인 짧은 페이지", desktop: "좌측 또는 우측 사이드바 고정", mobile: "상단 드롭다운 또는 숨김", textLength: "섹션명 3~6단어", a11y: "nav role, aria-current로 현재 섹션 표시", seoRelevance: false, conversionImpact: "낮음", proofNeeded: false, required: false },
  { name: "Empty State", purpose: "데이터가 없을 때 안내와 다음 행동 유도", where: "검색 결과 없음, 카테고리 비어있음", avoid: "빈 화면만 보여주는 경우", desktop: "아이콘 + 안내 메시지 + CTA", mobile: "동일", textLength: "안내 1~2줄 + CTA 1개", a11y: "role='status' 또는 aria-live", seoRelevance: false, conversionImpact: "낮음", proofNeeded: false, required: false },
  { name: "Footer", purpose: "사이트맵, 연락처, 법적 정보를 구조적으로 제공", where: "모든 페이지 최하단", avoid: "푸터에 과도한 콘텐츠를 넣어 복잡해지는 경우", desktop: "3~4컬럼 그리드: 회사 정보, 서비스, 리소스, 연락처", mobile: "아코디언 또는 1컬럼 순차 나열", textLength: "카테고리별 5~8개 링크", a11y: "footer 랜드마크 사용", seoRelevance: true, conversionImpact: "중간", proofNeeded: false, required: true },
  { name: "버튼 시스템", purpose: "사용자 행동을 유도하는 인터랙션 요소", where: "모든 페이지", avoid: "한 화면에 동일한 시각적 무게의 버튼 3개 이상", desktop: "Primary, Secondary, Ghost, Link 4단계", mobile: "터치 영역 최소 44x44px", textLength: "2~4단어: '프로젝트 문의하기', '서비스 상세 보기'", a11y: "focus-visible 스타일, disabled 상태 명확 구분", seoRelevance: false, conversionImpact: "높음", proofNeeded: false, required: true },
  { name: "폼 필드 상태", purpose: "입력 과정에서 명확한 피드백 제공", where: "문의 폼, 다운로드 폼, 구독 폼", avoid: "상태 구분 없이 동일한 스타일", desktop: "default/focus/error/success/disabled 5상태", mobile: "동일, 키보드 타입 최적화", textLength: "에러 메시지 1줄, 도움말 1줄", a11y: "aria-invalid, aria-describedby, aria-live='polite'", seoRelevance: false, conversionImpact: "높음", proofNeeded: false, required: true },
  { name: "Alert / Notice / Disclaimer", purpose: "중요 안내, 법적 고지, 주의사항 전달", where: "폼 주변, 페이지 상단, 법적 고지 영역", avoid: "과도한 경고로 사용자 불안 유발", desktop: "아이콘 + 텍스트, 배경색으로 유형 구분", mobile: "동일", textLength: "1~3줄", a11y: "role='alert' (긴급), role='status' (정보)", seoRelevance: false, conversionImpact: "낮음", proofNeeded: false, required: false },
];

const UiGuide = () => {
  return (
    <AppLayout>
      <PageHeader
        badge="UI Components"
        title="UI 가이드"
        description="컨설팅 업종 사이트에 필요한 핵심 UI 컴포넌트의 사용 목적, 배치 기준, 접근성 규칙을 정리합니다."
      />

      <div className="rounded-lg border bg-accent/5 border-accent/20 p-4 mb-8">
        <p className="text-sm text-foreground font-medium mb-1">📋 빠른 적용 포인트</p>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• 모든 컴포넌트는 동일한 11개 항목으로 문서화되어 있습니다.</li>
          <li>• <BadgeLabel type="required" /> 표시가 있는 컴포넌트는 대부분의 컨설팅 사이트에 필수입니다.</li>
          <li>• <BadgeLabel type="proof">증거 필요</BadgeLabel> 표시가 있는 컴포넌트는 실제 자산이 있어야 사용 가능합니다.</li>
        </ul>
      </div>

      {components.map((comp) => (
        <SectionBlock key={comp.name} id={comp.name.replace(/[\s/]/g, "-")} title={comp.name}>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {comp.required && <BadgeLabel type="required" />}
            {!comp.required && <BadgeLabel type="optional" />}
            {comp.proofNeeded && <BadgeLabel type="proof">증거 필요</BadgeLabel>}
            {comp.seoRelevance && <BadgeLabel type="seo" />}
            <BadgeLabel type={comp.conversionImpact === "높음" ? "required" : comp.conversionImpact === "중간" ? "recommended" : "optional"}>
              전환 영향: {comp.conversionImpact}
            </BadgeLabel>
          </div>
          <div className="rounded-lg border bg-card overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {[
                  ["사용 목적", comp.purpose],
                  ["사용 위치", comp.where],
                  ["사용 금지", comp.avoid],
                  ["데스크톱 패턴", comp.desktop],
                  ["모바일 패턴", comp.mobile],
                  ["권장 텍스트", comp.textLength],
                  ["접근성 기준", comp.a11y],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b last:border-b-0">
                    <td className="p-3 font-medium text-foreground w-28 md:w-36 bg-surface align-top text-xs">{label}</td>
                    <td className="p-3 text-muted-foreground text-xs">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionBlock>
      ))}

      <SectionBlock id="states" title="인터랙션 상태 규칙">
        <div className="rounded-lg border bg-card p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { state: "Default", desc: "기본 상태, 명확한 시각적 어포던스" },
              { state: "Hover", desc: "미묘한 색상 변화 또는 그림자 증가" },
              { state: "Focus-visible", desc: "2px outline, ring 색상 (키보드 접근성)" },
              { state: "Active", desc: "눌림 효과, 약간의 scale 축소" },
              { state: "Disabled", desc: "opacity 50%, cursor-not-allowed, aria-disabled" },
              { state: "Loading", desc: "스피너 또는 skeleton, 반복 클릭 방지" },
              { state: "Error", desc: "destructive 컬러, aria-invalid, 에러 메시지" },
              { state: "Success", desc: "확인 아이콘 + 성공 메시지, role='status'" },
            ].map((s) => (
              <div key={s.state} className="rounded-md border p-3">
                <span className="text-xs font-semibold text-foreground">{s.state}</span>
                <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="responsive" title="반응형 동작 규칙">
        <div className="rounded-lg border bg-card p-5">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• <strong className="text-foreground">Breakpoints:</strong> sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1440px)</p>
            <p>• <strong className="text-foreground">그리드:</strong> 데스크톱 12컬럼 → 태블릿 8컬럼 → 모바일 4컬럼</p>
            <p>• <strong className="text-foreground">카드:</strong> 3~4컬럼 → 2컬럼 → 1컬럼 순차 축소</p>
            <p>• <strong className="text-foreground">내비게이션:</strong> 수평 메뉴 → 햄버거 + 풀스크린 오버레이</p>
            <p>• <strong className="text-foreground">터치 영역:</strong> 최소 44×44px, 요소 간 최소 8px 간격</p>
            <p>• <strong className="text-foreground">타이포:</strong> 모바일에서 H1은 28px, H2는 22px 이상 유지</p>
          </div>
        </div>
      </SectionBlock>
    </AppLayout>
  );
};

export default UiGuide;
