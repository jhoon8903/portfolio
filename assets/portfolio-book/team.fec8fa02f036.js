window.TEAM_STORY = {
  company: '액션핏',
  period: '2024.01 — 2025.10',
  role: 'Unity 클라이언트 개발 · 퇴사 시 개발팀장',
  intro: '디자이너 1명·기획자 1명·개발자 1명이 게임 하나를 함께 만드는 팀에서 시작했습니다. 새로 합류한 개발자가 기존 프로젝트를 이어받을 수 있도록, 개발하며 공통 시스템과 작업 기준을 함께 만들었습니다.',
  composition: [{ label: '정규직', count: 6 }, { label: '계약직', count: 4 }, { label: '인턴', count: 5 }],
  responsibilities: [
    { title: '면접과 온보딩', body: '정규직 6명과 계약직 4명을 직접 면접하고 온보딩했습니다. 신입 개발자가 프로젝트에 합류할 때 참고할 개발 파이프라인, UI 가이드, 용어집을 작성했습니다.', detail: '개발 지식뿐 아니라 팀에서 쓰는 용어와 작업 순서를 함께 전달했습니다. 비개발 부서와 협업할 때도 같은 용어로 대화할 수 있도록 문서를 정리했습니다.' },
    { title: '인턴 교육과 프로젝트 리드', body: '교육생 과제를 출제하고, 실제 게임의 소프트런칭을 지도했습니다. 매직캣·캣 점프·캔디 슬라이스 등 참여 타이틀에는 직접 구현한 부분과 교육 리드 역할을 구분해 기록했습니다.', detail: '교육생이 맡은 프로젝트도 공통 개발 규칙 안에서 진행할 수 있도록 과제와 코드리뷰를 연결했습니다. 아래 목록은 기존 포트폴리오에서 교육 리드로 표시한 타이틀입니다.' },
    { title: '코드리뷰와 업무 기준', body: '코드리뷰, Git-flow, 작업 견적과 개발 파이프라인을 팀의 협업 기준으로 정리했습니다. 게임을 만드는 일과 함께 개발자들의 업무를 관리했습니다.', detail: '인원이 늘어나는 동안 각자가 작업 방식과 프로젝트 구조를 다시 추측하지 않도록, 코드와 협업 문서에 기준을 남겼습니다.' },
  ],
  systems: [
    { problem: '프로젝트마다 저장·UI·에셋 로딩을 다시 구현', implementation: 'Cloud Save · MVVM UI · Asset Provider', change: '반복되는 기능을 공통 시스템으로 분리해 신규 프로젝트에서 재사용했습니다.' },
    { problem: '결제·광고 등 SDK 설정을 프로젝트마다 반복', implementation: 'IAP · SDK Installer · Push / PostBox', change: '연동과 설정 작업을 공통 모듈로 정리했습니다.' },
    { problem: '레벨 수정 작업이 개발자에게 집중', implementation: '모듈형 레벨 에디터', change: '기획자가 직접 레벨 콘텐츠를 만들 수 있도록 에디터를 제작했습니다.' },
  ],
  shipped: [
    { title: '편의점 정리왕', downloads: '100만 이상', role: '메인 개발 · 인계 후 리팩터링·최적화·레벨 에디터', image: '/portfolio/assets/actionfit/convenisort_ss0.png', url: 'https://play.google.com/store/apps/details?id=com.actionfit.convenisort&hl=ko' },
    { title: '머지냥카페', downloads: '100만 이상', role: '메인 개발 · 운영팀 인계', image: '/portfolio/assets/actionfit/catmerge_ss0.png', url: 'https://play.google.com/store/apps/details?id=com.actionfit.catmerge&hl=ko' },
    { title: '블럭냥', downloads: '100만 이상', role: '소프트런칭 빌드 수정 · 인수 운영 · 최적화', image: '/portfolio/assets/actionfit/blockcat_ss0.png', url: 'https://play.google.com/store/apps/details?id=com.actionfit.blockcat&hl=ko' },
  ],
};
