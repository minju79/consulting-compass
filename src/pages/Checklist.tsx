import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { useState } from "react";

interface CheckItem {
  text: string;
  checked: boolean;
}

interface ChecklistGroup {
  id: string;
  title: string;
  items: string[];
}

const checklistGroups: ChecklistGroup[] = [
  {
    id: "pre-production",
    title: "홈페이지 제작 전 체크리스트",
    items: [
      "타겟 고객(페르소나)이 정의되어 있는가?",
      "핵심 서비스 3~6개가 명확히 정리되어 있는가?",
      "차별화 포인트(왜 우리인가)가 한 문장으로 정리되어 있는가?",
      "주요 사례/성과가 최소 2~3건 준비되어 있는가?",
      "핵심 인력 정보(사진, 경력, 전문분야)가 확보되어 있는가?",
      "경쟁사 3~5곳의 사이트를 분석했는가?",
      "브랜드 가이드(로고, 색상, 폰트)가 준비되어 있는가?",
      "고객사 로고 사용 허가를 받았는가?",
      "전환 목표(상담 문의, 다운로드 등)가 정의되어 있는가?",
      "필수 페이지 목록과 정보 구조(IA)가 설계되어 있는가?",
    ],
  },
  {
    id: "design-review",
    title: "디자인 검수 체크리스트",
    items: [
      "브랜드 톤에 맞는 컬러 시스템이 적용되어 있는가?",
      "타이포그래피 위계(H1~H3, 본문, 캡션)가 일관적인가?",
      "간격 시스템이 통일되어 있는가? (8px 배수 기반)",
      "카드, 버튼, 인풋 등 컴포넌트 스타일이 일관적인가?",
      "이미지/아이콘 스타일이 통일되어 있는가?",
      "그림자/보더 사용이 일관적인가?",
      "불필요한 장식적 요소가 없는가?",
      "위계 정보(시각적 중요도)가 명확한가?",
      "화이트스페이스가 충분한가?",
      "전체적으로 신뢰감 있고 전문적인 인상을 주는가?",
    ],
  },
  {
    id: "ui-review",
    title: "UI 검수 체크리스트",
    items: [
      "모든 버튼에 hover/focus/active/disabled 상태가 있는가?",
      "폼 필드에 focus, error, success 상태가 구현되어 있는가?",
      "링크와 버튼이 시각적으로 구분되는가?",
      "CTA 버튼이 충분히 눈에 띄는가?",
      "아코디언, 탭 등 인터랙션 요소가 정상 동작하는가?",
      "로딩 상태(skeleton, spinner)가 제공되는가?",
      "에러 상태와 빈 상태(empty state)가 디자인되어 있는가?",
      "내비게이션에서 현재 페이지가 명확히 표시되는가?",
      "모달, 드롭다운의 열림/닫힘이 자연스러운가?",
      "폼 제출 후 피드백(성공/실패 메시지)이 제공되는가?",
    ],
  },
  {
    id: "ux-review",
    title: "UX 검수 체크리스트",
    items: [
      "첫 화면에서 '무슨 회사 / 누구를 위한 / 무엇을 제공'이 즉시 파악되는가?",
      "CTA가 모호하지 않고 구체적인가?",
      "신뢰 요소가 above the fold에 있는가?",
      "서비스 → 사례 → 문의 흐름이 자연스러운가?",
      "문의 폼 필드가 6개 이하인가?",
      "페이지 간 내부 링크가 적절히 배치되어 있는가?",
      "스크롤 없이도 핵심 메시지를 파악할 수 있는가?",
      "정보 밀도가 적절한가? (과다 또는 과소)",
      "사용자가 현재 위치를 항상 인지할 수 있는가?",
      "이탈이 예상되는 지점에 보조 CTA가 있는가?",
    ],
  },
  {
    id: "mobile-review",
    title: "모바일 검수 체크리스트",
    items: [
      "모바일에서 텍스트 크기가 읽기 편한가? (본문 14px 이상)",
      "터치 영역이 최소 44×44px인가?",
      "가로 스크롤이 발생하지 않는가?",
      "카드 그리드가 1~2컬럼으로 정상 전환되는가?",
      "내비게이션 메뉴가 모바일에서 정상 동작하는가?",
      "히어로 섹션이 모바일에서 적절히 축약되는가?",
      "CTA 버튼에 쉽게 접근 가능한가?",
      "이미지가 모바일 화면에 맞게 조절되는가?",
      "폼이 모바일에서 사용하기 편한가?",
      "로딩 속도가 모바일 환경에서 적절한가?",
    ],
  },
  {
    id: "seo-review",
    title: "SEO / GEO 체크리스트",
    items: [
      "각 페이지에 고유한 title 태그(60자 이내)가 있는가?",
      "각 페이지에 고유한 meta description(160자 이내)이 있는가?",
      "H1이 페이지당 1개인가?",
      "H1 → H2 → H3 순서가 지켜지는가?",
      "canonical 태그가 설정되어 있는가?",
      "Open Graph / Twitter 메타 태그가 설정되어 있는가?",
      "sitemap.xml이 생성되어 있는가?",
      "robots.txt가 적절히 설정되어 있는가?",
      "JSON-LD 구조화 데이터(Organization, FAQ 등)가 적용되어 있는가?",
      "이미지에 alt 텍스트가 포함되어 있는가?",
      "URL 구조가 의미 있고 깔끔한가?",
      "내부 링크가 적절히 배치되어 있는가?",
    ],
  },
  {
    id: "launch-review",
    title: "런칭 전 최종 점검 체크리스트",
    items: [
      "모든 링크가 정상 동작하는가? (404 없음)",
      "모든 이미지가 정상 로딩되는가?",
      "폼 제출이 정상 동작하고 알림이 수신되는가?",
      "404 페이지가 커스텀 디자인되어 있는가?",
      "HTTPS가 적용되어 있는가?",
      "Analytics(GA4 등) 추적 코드가 삽입되어 있는가?",
      "개인정보처리방침 페이지가 있는가?",
      "파비콘이 설정되어 있는가?",
      "소셜 공유 시 OG 이미지가 정상 표시되는가?",
      "성능 점수(Lighthouse)가 80점 이상인가?",
      "크로스 브라우저(Chrome, Safari, Firefox) 테스트를 완료했는가?",
      "최종 콘텐츠 검수(오탈자, 잘못된 정보)를 완료했는가?",
    ],
  },
];

const Checklist = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (groupId: string, index: number) => {
    const key = `${groupId}-${index}`;
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getGroupProgress = (group: ChecklistGroup) => {
    const checked = group.items.filter((_, i) => checkedItems[`${group.id}-${i}`]).length;
    return { checked, total: group.items.length };
  };

  return (
    <AppLayout>
      <PageHeader
        badge="Checklist"
        title="실무 체크리스트"
        description="컨설팅 업종 홈페이지 제작의 각 단계별 검수 항목입니다. 체크박스를 클릭하여 진행 상황을 추적하세요."
      />

      {checklistGroups.map((group) => {
        const progress = getGroupProgress(group);
        return (
          <SectionBlock key={group.id} id={group.id} title={group.title}>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-300"
                  style={{ width: `${(progress.checked / progress.total) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground shrink-0">
                {progress.checked}/{progress.total}
              </span>
            </div>
            <div className="rounded-lg border bg-card overflow-hidden">
              {group.items.map((item, i) => {
                const key = `${group.id}-${i}`;
                const isChecked = checkedItems[key] || false;
                return (
                  <label
                    key={i}
                    className="flex items-start gap-3 px-4 py-3 border-b last:border-b-0 cursor-pointer hover:bg-surface/50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleItem(group.id, i)}
                      className="mt-0.5 h-4 w-4 rounded border-border text-accent focus:ring-accent shrink-0"
                    />
                    <span className={`text-sm ${isChecked ? "text-muted-foreground line-through" : "text-foreground"}`}>
                      {item}
                    </span>
                  </label>
                );
              })}
            </div>
          </SectionBlock>
        );
      })}
    </AppLayout>
  );
};

export default Checklist;
