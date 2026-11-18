'use strict';

const data = window.PORTFOLIO_DATA;
const team = window.TEAM_STORY;
const records = window.PROJECT_RECORDS || {};
const recordMedia = window.RECORD_MEDIA || {};
const main = document.querySelector('#main');
const dialog = document.querySelector('.demo-dialog');
let filter = '전체';
let demoTrigger = null;
let routeVersion = 0;
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const e = escapeHtml;
const localLink = (url, label, cls = '') => `<a class="action-button ${cls}" href="${e(url)}" target="_blank" rel="noopener">${e(label)}</a>`;
const tags = values => `<ul class="tags" aria-label="사용 기술">${values.map(x => `<li>${e(x)}</li>`).join('')}</ul>`;

function projectVisual(p, small = false) {
  if (!p.image) return `<div class="project-visual chart-visual ${small ? 'small' : ''}" aria-label="동일 조건 20개 시드 비교: 조정 전 0개, 조정 후 20개가 1,000단계 완료"><span>1,000단계 완료 · 20개 시드</span><div><span>조정 전</span><i class="chart-bar before"></i><b>0/20</b></div><div><span>조정 후</span><i class="chart-bar after"></i><b>20/20</b></div><small>자동 플레이 시뮬레이션</small></div>`;
  return `<div class="project-visual visual-${p.id}"><img src="${e(p.image)}" alt="${e(p.imageAlt || `${p.title} 실제 화면`)}" loading="lazy"></div>`;
}

function projectRow(p, index) {
  return `<article class="project-row">
    <a href="#/case/${p.id}" class="project-image-link" aria-label="${e(p.title)} 사례 보기">${projectVisual(p)}</a>
    <div class="project-copy"><div class="project-meta"><span>기록 ${String(data.projects.indexOf(p)+1).padStart(2,"0")} / ${e(p.category)}</span><span>${e(p.status)}</span></div><h3><a href="#/case/${p.id}">${e(p.title)} <span class="action-button action-primary">보기</span></a></h3><p class="project-role">${e(p.ownership)}</p><p class="project-summary">${e(p.summary)}</p><p class="project-outcome"><strong>${e(p.resultValue)}</strong> <span>${e(p.resultLabel)}</span></p></div>
  </article>`;
}

function careerList(compact = false) {
  const list = compact ? data.experience.slice(0, 3) : data.experience;
  return `<ol class="career-list ${compact ? 'compact' : ''}">${list.map(x => `<li><span class="career-date">${e(x.period)}</span><div><h3>${e(x.company)}</h3><p class="career-role">${e(x.role)}</p>${compact ? '' : `<p>${e(x.body)}</p>`}</div></li>`).join('')}</ol>`;
}

const resumePDF = '/portfolio/downloads/lee-jeong-hoon-resume-2026-11-18.pdf?rev=capsule-release';
const portfolioPDF = '/portfolio/downloads/lee-jeong-hoon-portfolio-2026-11-18.pdf?rev=capsule-release';

function contactBand() {
  return `<div class="contact-line"><span>연락</span><a class="action-button" href="mailto:jhoon8903@gmail.com">이메일 보내기</a>${localLink(resumePDF,'이력서 PDF 보기')}${localLink(portfolioPDF,'포트폴리오 PDF 보기')}</div>`;
}

function home() {
  const chapter = '/portfolio';
  const capsule = data.projects.find(project => project.id === 'capsule');
  const history = [
    ['2023', 'MonsterStars', '아트를 받아 매치 디펜스와 로그라이크 강화 시스템을 혼자 구현했습니다.', chapter+'/resume/', '클라이언트 개발 이력'],
    ['2024–2025', '액션핏', '캐주얼 게임 23종의 출시 과정에 참여했습니다. 직접 개발한 게임, 라이브 운영을 인수한 게임, 인턴의 제작을 지도한 게임을 담당 역할별로 정리했습니다.', chapter+'/team/#shipped', '타이틀별 담당 역할'],
    ['2025–2026', '로켓단게임즈', 'Wiggle Puzzle의 경로 탐색을 병렬화해 연산 지연을 600ms 이상에서 50ms 이하로 줄였습니다. DuckOut 클라이언트와 플레이어블 광고도 맡았습니다.', chapter+'/wiggle-puzzle/', '경로 탐색 최적화'],
    ['2026–현재', '프리랜서', '캡슐냥 디펜스와 해달스도쿠를 혼자 개발해 Google Play에 출시했습니다. 11월부터는 디벨로캣에서 교육생의 게임 프로젝트를 멘토링하고 있습니다.', chapter+'/resume/#freelance', '프리랜서 연구와 출시']
  ];
  return `<div class="page-width field-home">
    <section class="field-cover" aria-labelledby="author-title">
      <div class="author-intro">
        <p class="field-kicker">Unity 클라이언트 개발자 · 전 액션핏 개발팀장</p>
        <h1 id="author-title">이정훈</h1>
        <p class="author-deck">처음엔 개발자가 저 혼자였고, 퇴사할 때는 15명의 개발팀을 맡았습니다.</p>
        <p class="author-note">편의점 정리왕은 제가 개발해 인계했고, 블럭냥은 넘겨받아 고쳤습니다. 팀장으로서는 개발자 10명을 직접 면접하고 인턴 5명의 프로젝트를 지도했습니다. 기획자가 직접 레벨을 고칠 수 있도록 에디터도 만들었습니다.</p>
        <div class="field-actions">${localLink(resumePDF,'이력서 PDF 보기','action-primary')}${localLink(portfolioPDF,'포트폴리오 PDF 보기')}<a class="action-button" href="mailto:jhoon8903@gmail.com">이메일 보내기</a></div>
      </div>
      <figure class="lead-case">
        <a href="${chapter}/capsule-cats/">
          <div class="puzzle-proof"><img src="/portfolio/assets/capsule-cats/upgrade-poster.jpg" width="644" height="1280" alt="캡슐냥 디펜스에서 유닛을 고르고 능력치를 강화하는 화면" fetchpriority="high">
            <div class="measurement"><span>캡슐냥 디펜스 · 1인 개발 · Google Play 출시</span><h2>강화까지 고려한<br>스테이지 밸런스</h2>
              <dl><div><dt>강화 시나리오로 시험한 범위</dt><dd>8<span>개 스테이지</span></dd></div><div><dt>밸런스를 조정한 기간</dt><dd>2<span>일</span></dd></div></dl>
            </div></div>
        </a>
        <figcaption><span>수 주 이상 예상했던 조정을 대규모 시뮬레이션으로 마쳤습니다.</span>
          <span class="lead-case-links"><a class="action-button action-primary" href="${chapter}/capsule-cats/">사례 보기</a>${localLink(capsule.storeUrl,'Google Play 보기')}</span></figcaption>
      </figure>
    </section>
    <section class="field-section career-ledger"><header><h2>개발 이력</h2><a class="action-button" href="${chapter}/resume/">이력서 보기</a></header>
      <ol>${history.map(([date,title,body,url,label])=>`<li><span class="ledger-date">${date}</span><div><h3>${title}</h3><p>${body}</p></div><a class="action-button" href="${url}">${label} 보기</a></li>`).join('')}</ol>
    </section>
    <section id="freelance-notes" class="field-section independent-notes"><header><h2>프리랜서 작업 노트</h2><a class="action-button" href="${chapter}/resume/#freelance">기록 보기</a></header>
      <article>
        <header class="note-heading"><a class="note-art" href="${chapter}/capsule-cats/" aria-label="캡슐냥 디펜스 개발 기록"><img loading="lazy" width="644" height="1280" src="/portfolio/assets/capsule-cats/combat-poster.jpg" alt="고양이 유닛들이 스테이지에서 적과 싸우는 화면"></a>
          <div><p class="field-kicker">캡슐냥 디펜스 · 1인 개발 · Google Play 출시</p><h3><a href="${chapter}/capsule-cats/">마지막 스테이지에서 강화를 멈추면 어떻게 될까?</a></h3></div>
        </header>
        <p>앞 스테이지에서 모은 재화와 강화 상태를 다음 전투에 넘겼습니다. 마지막 스테이지에서는 같은 조건에서 추가 강화만 멈춰 결과를 비교했습니다. 강화와 재도전을 함께 시험해 8개 스테이지의 밸런스를 이틀 만에 맞췄습니다.</p>
        <div class="note-links"><a class="action-button field-link" href="${chapter}/capsule-cats/balance-notes.html">밸런스 실험 보기</a>${localLink(capsule.storeUrl,'Google Play 보기','field-link')}</div>
      </article>
      <article>
        <header class="note-heading"><a class="note-art" href="${chapter}/otter-retention/" aria-label="해달스도쿠 운영 기록"><img loading="lazy" width="1076" height="2376" src="/portfolio/assets/otter-retention/onboarding.png" alt="해달스도쿠에서 첫 퍼즐의 답을 안내하는 화면"></a>
          <div><p class="field-kicker">해달스도쿠 · 1인 개발과 운영</p><h3><a href="${chapter}/otter-retention/">첫 판의 안내를 여섯 개에서 세 동작으로 줄였습니다.</a></h3></div>
        </header>
        <p>첫 판에서 해달 놓기, X 표시, 마지막 해달 찾기를 차례로 익히게 했습니다. 전면광고는 사용자가 보기를 선택할 때 불러오도록 바꿨습니다. 이후 10월 1~5일 콘솔에서 확인한 일별 광고 시청률은 91.91~97.71%였습니다. 날짜별 광고 구성과 수치는 원자료에 함께 남겼습니다.</p>
        <div class="note-links"><a class="action-button field-link" href="${chapter}/otter-retention/">운영 기록 보기</a></div>
      </article>
      <article>
        <header class="note-heading"><a class="note-art sprite-art" href="${chapter}/skills/directional-sprite-actions/" aria-label="8방향 피격 동작 시트와 GIF"><img loading="lazy" width="192" height="512" src="/portfolio/assets/skill-records/directional-sprite-actions-hit-sheet.png" alt="충격·반동·복귀 세 포즈를 여덟 방향으로 배열한 실제 시트"></a>
          <div><p class="field-kicker">AI Pipeline Skills · 제작 도구</p><h3><a href="${chapter}/skills/">포즈 하나를 고칠 때 24칸을 다시 맞추는 문제</a></h3></div>
        </header>
        <p>방향 순서와 프레임 시간을 정해 두고, 승인한 포즈를 시트와 GIF로 묶는 도구를 만들었습니다. 이제 수정한 PNG만 바꿔 다시 출력한 뒤 원본 24칸과 대조합니다.</p>
        <div class="note-links"><a class="action-button field-link" href="${chapter}/skills/">스킬별 사례 보기</a></div>
      </article>
    </section>
    <nav class="field-end" aria-label="다른 작업 보기"><a class="action-button" href="${chapter}/projects/">개발 프로젝트 보기</a><a class="action-button action-primary" href="${chapter}/play/">플레이할 게임 보기</a></nav>
  </div>`;
}


function chapterHeading(number, title, description, meta='') {
  return `<header class="page-heading"><div class="chapter-heading-label"><span>제 ${number}장</span><span>${meta || '이정훈의 제작 기록'}</span></div><div class="chapter-heading-row"><div><h1>${title}</h1><p>${description}</p></div></div></header>`;
}

function teamDiagram() {
  return `<figure class="team-diagram"><figcaption><span>조직 구성 기록</span><span>액션핏 · 퇴사 직전</span></figcaption><div class="team-diagram-total"><strong>15</strong><span>명의 개발팀<br>운영과 협업 기준을 정리</span></div><div class="team-dot-groups">${team.composition.map((x,i)=>`<div><span class="staff-dots staff-${i}" aria-hidden="true">${Array.from({length:x.count},()=>'<i></i>').join('')}</span><span>${e(x.label)} <b>${x.count}명</b></span></div>`).join('')}</div><p>정규직 6명과 계약직 4명은 직접 면접하고 온보딩했습니다.</p></figure>`;
}

function teamPage() {
  const training = data.titles.filter(x=>x.role.includes('교육'));
  return `<div class="page-width interior team-page">${chapterHeading("01","팀을 만드는 일","개발자 면접을 보고, 인턴의 첫 게임을 리뷰하고, 기획자가 직접 레벨을 고칠 에디터를 만들었습니다.",e(team.company)+" · "+e(team.period))}<div class="team-reading-layout"><aside class="team-contents"><p>이 페이지에서</p><nav aria-label="팀 빌딩 기록 목차"><a href="#/team/start">팀의 출발점</a><a href="#/team/hiring">면접·온보딩</a><a href="#/team/education">인턴 교육</a><a href="#/team/operations">개발팀 운영</a><a href="#/team/systems">공통 시스템</a><a href="#/team/shipped">함께 만든 게임</a></nav></aside><div class="team-article">
    <section id="start"><p class="section-number">01.1 / 출발점</p><h2>개발자가 저 혼자였던 팀</h2><p>디자이너 1명, 기획자 1명, 개발자 한 명으로 캐주얼 게임을 만들었습니다. 팀이 커지면서 채용과 교육, 라이브 운영, 기술 연구와 개발 전략까지 맡았습니다. 편의점 정리왕을 넘겨준 뒤에도 리팩터링과 최적화를 했고, 다른 사람이 이어받을 수 있도록 공통 시스템과 온보딩 문서를 만들었습니다.</p>${teamDiagram()}</section>
    ${team.responsibilities.map((x,i)=>`<section id="${['hiring','education','operations'][i]}"><p class="section-number">01.${i+2} / ${["합류","교육","운영"][i]}</p><h2>${e(x.title)}</h2><p>${e(x.body)}</p><p>${e(x.detail)}</p>${i===0?`<dl class="document-list"><div><dt>개발 파이프라인</dt><dd>신규 개발자에게 전달할 개발 절차와 작업 기준</dd></div><div><dt>UI 가이드</dt><dd>프로젝트에서 사용하는 UI 개발 기준</dd></div><div><dt>용어집</dt><dd>개발자와 비개발 부서가 함께 사용하는 용어</dd></div></dl>`:''}${i===1?`<div class="training-list"><h3>교육 리드로 참여한 타이틀</h3><ul>${training.map(t=>`<li>${localLink(t.url,t.title)}<span>MVP · 교육</span></li>`).join('')}</ul></div>`:''}</section>`).join('')}
    <section id="systems"><p class="section-number">01.5 / 개발 기반</p><h2>저장과 결제는 다음 게임에서도 쓸 수 있게</h2><p>프로젝트마다 저장, UI, 에셋 로딩, 결제·광고 연동을 다시 만들고 있었습니다. 공통 모듈과 에디터를 만들어 다음 프로젝트와 새로 합류한 개발자가 재사용할 수 있게 정리했습니다.</p><div class="systems-record">${team.systems.map(x=>`<article><p class="record-context">${e(x.problem)}</p><h3>${e(x.implementation)}</h3><p>${e(x.change)}</p></article>`).join('')}</div></section>
    <section id="shipped"><p class="section-number">01.6 / 함께 만든 게임</p><h2>액션핏에서 맡은 게임</h2><p>23종의 출시 과정에서 맡은 일이 게임마다 달랐습니다. 아래 세 작품은 제가 메인 개발 또는 인수 운영을 맡았던 게임입니다.</p><div class="shipped-records">${team.shipped.map(x=>`<article><img src="${e(x.image)}" alt="${e(x.title)} 게임 화면" loading="lazy"><div><h3>${localLink(x.url,x.title+' 보기')}</h3><p>${e(x.role)}</p><p class="store-audience">Google Play · ${e(x.downloads)} 다운로드</p></div></article>`).join('')}</div><p class="store-date">2026년 11월 18일 각 게임의 Google Play에 표시된 누적 다운로드 구간입니다. 퇴사 후 다운로드도 포함하며, 게임 제목을 누르면 스토어에서 확인할 수 있습니다.</p><a class="action-button" href="#/projects">사례 보기</a></section>
    <section class="team-reference"><h2>관련 자료</h2><p>이력서와 포트폴리오의 액션핏 경력에도 팀 구성과 담당 업무를 기록했습니다.</p><div>${localLink(resumePDF,'이력서 PDF 보기')}${localLink(portfolioPDF,'포트폴리오 PDF 보기')}</div></section>
  </div></div>${contactBand()}</div>`;
}

function projects() {
  const categories = ['전체', ...new Set(data.projects.map(p=>p.category))];
  const shown = data.projects.filter(p => filter === '전체' || p.category === filter);
  return `<div class="page-width interior">${chapterHeading("02","게임을 만드는 일","일곱 게임에서 직접 맡은 일과 결과입니다. 분야를 고르면 해당 사례만 남습니다.")}<div class="filter-bar" role="group" aria-label="프로젝트 분야 필터">${categories.map(x=>`<button class="action-button" type="button" data-filter="${e(x)}" aria-pressed="${x===filter}">${e(x)} <span>${x==='전체'?data.projects.length:data.projects.filter(p=>p.category===x).length}</span></button>`).join('')}</div><p class="list-status" role="status">${e(filter)} · ${shown.length}개 프로젝트</p><div class="project-list library-list">${shown.map(projectRow).join('')}</div>
    <section class="archive-section"><div class="section-head"><div><h2>참여 타이틀 목록</h2><p>개별 출시작의 담당 역할을 확인할 수 있습니다.</p></div></div><details class="disclosure"><summary><span>전체 ${data.titles.length}개 참여 타이틀</span><span class="action-button disclosure-action disclosure-open-label">보기</span><span class="action-button disclosure-action disclosure-close-label">닫기</span></summary><p class="archive-note">기존 포트폴리오에 기록된 상태를 기준으로 표시했습니다. 출시 참여 23종과 아래 전체 참여 목록은 집계 범위가 다릅니다.</p><div class="title-table"><div class="title-table-head"><span>타이틀</span><span>담당 역할</span><span>기록상 상태</span></div>${data.titles.map(x=>`<div>${x.url?localLink(x.url,x.title+' 보기'):`<strong>${e(x.title)}</strong>`}<span>${e(x.role)}</span><span>${x.status==='live'?'라이브':'종료 · MVP'}</span></div>`).join('')}</div></details></section>${contactBand()}</div>`;
}

function capsuleSkillsList() {
  return `<dl class="codex-skill-list">${data.capsuleSkills.map(skill => `<div><dt><a class="action-button" href="/portfolio/skills/${e(skill.name)}/">${e(skill.task)} · <code>${e(skill.name)}</code> 사례 보기</a></dt><dd>${e(skill.output)}</dd></div>`).join('')}</dl>`;
}

function freelanceNotes() {
  const notes = [
    ['해달스도쿠', '게임을 혼자 출시한 뒤 첫 판 튜토리얼과 전면광고 로딩을 고쳤습니다. 업데이트 전후의 일별 광고 시청률을 날짜별로 남겨, 운영하면서 다시 볼 수 있게 했습니다.', '/portfolio/otter-retention/', '광고 콘솔과 업데이트 이력'],
    ['플레이어블 광고', 'Unity와 Luna로 만든 광고를 납품할 때 네트워크마다 포장 방식이 달랐습니다. 한 빌드를 21개 광고망 규격으로 변환하는 Python 도구를 만들었습니다.', '/portfolio/play/', '플레이어블 데모'],
    ['캡슐냥 디펜스', '혼자 개발해 Google Play에 출시한 디펜스 게임입니다. 플레이어가 강화를 선택하면 다음 스테이지의 난이도도 달라집니다. 같은 전투를 계속 손으로 돌리는 대신 강화 조건별로 시뮬레이션을 실행해, 8개 스테이지의 밸런스를 이틀 만에 맞췄습니다.', '/portfolio/capsule-cats/', '스테이지 설계와 전투 기록'],
    ['픽셀 제작 도구', '캐릭터의 피격 동작에서 한 포즈만 바꿔도 시트를 다시 맞춰야 했습니다. 방향과 시간을 입력으로 받아 시트·GIF를 출력하고 원본과 대조하는 절차를 스킬로 만들었습니다.', '/portfolio/skills/pixel-pipeline/', '픽셀 원본과 검수표']
  ];
  return `<section class="freelance-notes" id="freelance"><header><p class="field-kicker">2026.02 이후 · 프리랜서</p><h2>혼자 출시하고, 다음 작업에 남긴 것</h2></header><div>${notes.map(([title,body,url,label])=>`<article><h3>${title}</h3><p>${body}</p><a class="action-button field-link" href="${url}">${e(label)} 보기</a></article>`).join('')}</div></section>`;
}


function career() {
  return `<div class="page-width interior">${chapterHeading("04","지금까지의 이력","2023년 게임 클라이언트 외주로 시작해 액션핏 개발팀장을 거쳤습니다. 지금은 게임을 개발하고 교육생 프로젝트를 멘토링합니다.")}<div class="page-actions">${localLink(resumePDF,'이력서 PDF 보기','text-link action-primary')} <a class="action-button text-link" id="codex-skills" href="/portfolio/skills/">스킬 사례 보기</a></div>${freelanceNotes()}<div class="career-layout"><section><ol class="career-list">${data.experience.map(x=>`<li><span class="career-date">${e(x.period)}</span><div><h2>${e(x.company)}</h2><p class="career-role">${e(x.role)}</p><p>${e(x.body)}</p>${x.company==='㈜액션핏'?`<a class="action-button text-link" href="#/team">팀 운영 기록 보기</a>`:''}</div></li>`).join('')}</ol></section><aside class="skills"><h2 class="subheading">기술과 적용 경험</h2><dl>${data.skills.map(x=>`<div><dt>${e(x.name)}</dt><dd>${e(x.evidence)}</dd></div>`).join('')}</dl></aside></div>${contactBand()}</div>`;
}

function demos() {
  return `<div class="page-width interior">${chapterHeading("05","직접 플레이","13개 프로젝트 · 21개 실행 데모. 빌드를 선택하면 이 페이지에서 실행됩니다.")}<div class="demo-grid">${data.demos.map((x,i)=>`<article class="demo-card"><div class="demo-thumb"><img src="${e(x.image)}" alt="${e(x.title)} 게임 화면" loading="lazy"></div><div class="demo-copy"><p class="eyebrow">${e(x.kind)}</p><h2>${e(x.title)}</h2><p>${e(x.note)}</p><div class="demo-buttons">${x.variants.map((v,j)=>`<button class="action-button action-primary" type="button" data-demo="${i}" data-variant="${j}" aria-label="${e(x.title)} ${e(v.label)} 게임 실행">${e(v.label)} 게임 실행</button>`).join('')}</div></div></article>`).join('')}</div><p class="archive-note">데모는 기존 공개 빌드를 불러옵니다. 첫 실행에는 로딩 시간이 필요할 수 있습니다.</p></div>`;
}

const projectPaths = { 'wiggle-puzzle':'wiggle', 'capsule-cats':'capsule', 'cat-merge-drop':'cat', 'k-pop-battle':'kpop', 'neon-reflector':'neon', 'bounce-defense':'bounce', 'otter-retention':'otter' };
const caseNumber = p => String(data.projects.indexOf(p)+1).padStart(2,'0');

function bookHref(url) {
  const match = String(url).match(/(?:https:\/\/jhoon8903\.github\.io)?\/portfolio\/(wiggle-puzzle|capsule-cats|cat-merge-drop|k-pop-battle|neon-reflector|bounce-defense|otter-retention)\/(?:index\.html)?(?:#([^?]*))?$/);
  if(match) {
    const id=projectPaths[match[1]], record=records[id];
    const section=record?.sections.find(x=>x.id===match[2]);
    return `#/case/${id}${section?'/record-'+section.id:'/process'}`;
  }
  if(String(url).includes('/capsule-cats/balance-notes.html')) {
    const section=records.capsule?.sections.find(x=>x.id.startsWith('balance-'));
    return `#/case/capsule/${section?'record-'+section.id:'details'}`;
  }
  return url;
}

function recordHtml(html) {
  return html.replace(/<table\b/g,'<div class="record-table-scroll"><table').replace(/<\/table>/g,'</table></div>').replace(/href="([^"<>]+)"/g,(_,url)=>`href="${bookHref(url)}"`).replace(/(src|poster)="record-media:([^"<>]+)"/g,(_,attribute,key)=>`${attribute}="${e(recordMedia[key]||'')}"`).replace(/<a\b[^>]*>/g,tag=>tag.includes('href="#/case/')?tag.replace(/\s(?:target|rel)="[^"]*"/g,''):tag);
}

function sourceLinks(p) {
  return p.evidence.filter(x=>!bookHref(x.url).startsWith('#/case/')).map(x=>`<a class="action-button" href="${e(x.url)}" target="_blank" rel="noopener"><span class="source-file-type">${e((x.url.split('.').pop().split('?')[0].length<6?x.url.split('.').pop().split('?')[0]:'LINK').toUpperCase())}</span><span>${e(x.label)} 보기</span></a>`).join('');
}

function casePage(id) {
  const p = data.projects.find(x=>x.id===id);
  if (!p) return notFound();
  const number=caseNumber(p), sections=records[id]?.sections||[];
  const next=data.projects[(data.projects.indexOf(p)+1)%data.projects.length];
  const caption=p.imageAlt||`${p.title} 개발 화면`;
  return `<div class="page-width interior record-page record-${p.id}">
    <header class="record-title"><div class="record-running"><a href="#/projects">← 제 02장 · 게임을 만드는 일</a><span>개발 기록 ${number} / 07</span></div><div class="record-title-line"><div><p class="record-category">${e(p.category)} <span>· ${e(p.status)}</span></p><h1>${e(p.title)}</h1></div></div><p class="record-deck">${e(p.summary)}</p></header>
    <section class="record-opening" aria-label="프로젝트 개요"><figure class="record-plate">${projectVisual(p)}<figcaption><span>도판 ${number}</span><span>${e(p.image?caption:'Drop 예산 조정 전후 · 1,000단계 완료 시드 비교')}</span></figcaption></figure><div class="record-brief"><p class="running-label">이 프로젝트에서 맡은 일</p><h2>${e(p.ownership)}</h2><dl class="record-facts"><div><dt>사용 기술</dt><dd>${p.tech.map(e).join(' · ')}</dd></div><div><dt>진행 구분</dt><dd>${e(p.status)}${p.storeUrl ? ` ${localLink(p.storeUrl,'Google Play에서 보기')}` : ''}</dd></div></dl><div class="record-finding"><span>기록한 결과</span><strong>${e(p.resultValue)}</strong><p>${e(p.resultLabel)}</p></div><a class="action-button action-primary record-read-link" href="#/case/${id}/overview">담당 범위와 결과 보기</a></div></section>
    <div class="record-body"><aside class="record-contents"><p class="running-label">기록 ${number}의 목차</p><nav aria-label="${e(p.title)} 기록 목차"><a href="#/case/${id}/overview"><span>01</span> 핵심 요약</a><a href="#/case/${id}/process"><span>02</span> 구현 과정</a><a href="#/case/${id}/details"><span>03</span> 상세 기록 <small>${sections.length}개</small></a>${sections.length?`<details class="record-section-index"><summary><span>상세 항목 찾아보기</span><span class="action-button disclosure-action disclosure-open-label">보기</span><span class="action-button disclosure-action disclosure-close-label">닫기</span></summary><ol>${sections.map(x=>`<li><a href="#/case/${id}/record-${e(x.id)}">${e(x.title)}</a></li>`).join('')}</ol></details>`:''}<a href="#/case/${id}/evidence"><span>04</span> 검증 자료</a></nav><a class="action-button record-index-back" href="#/projects">목록 보기</a></aside>
    <article class="record-article">
      <section class="record-section" id="overview"><h2>무엇을 고쳤나</h2><dl class="record-overview"><div><dt>해결할 문제</dt><dd>${e(p.problem)}</dd></div><div><dt>직접 구현한 범위</dt><dd><ul>${p.actions.map(x=>`<li>${e(x)}</li>`).join('')}</ul></dd></div><div><dt>확인한 결과</dt><dd><ul>${p.outcomes.map(x=>`<li>${e(x)}</li>`).join('')}</ul></dd></div></dl></section>
      <section class="record-section" id="process"><h2>구현 과정</h2><ol class="record-process">${p.process.map((x,i)=>`<li><span aria-hidden="true">${String(i+1).padStart(2,'0')}</span><div><h3>${e(x.title)}</h3><p>${e(x.body)}</p></div></li>`).join('')}</ol></section>
      <section class="record-details" id="details"><header><h2>개발 노트</h2></header>${sections.map(x=>`<details class="source-fold" id="record-${e(x.id)}"><summary><span>${e(x.title)}</span><span class="action-button disclosure-action disclosure-open-label">보기</span><span class="action-button disclosure-action disclosure-close-label">닫기</span></summary><div class="source-prose">${id==='capsule' && x.id==='skills' ? capsuleSkillsList() : ''}${recordHtml(x.html)}</div></details>`).join('')}</section>
      <section class="record-section" id="evidence"><h2>검증 자료</h2><div class="record-sources">${sourceLinks(p)}</div><div class="record-limit"><h3>이 결과가 설명하는 범위</h3><p>${e(p.caveat)}</p></div></section>
    </article></div><nav class="record-next" aria-label="다음 개발 기록"><a class="action-button" href="#/projects">목차 보기</a><a href="#/case/${next.id}"><span>다음 기록 ${caseNumber(next)}</span><strong>${e(next.title)}</strong><span class="action-button action-primary">다음 기록 보기</span></a></nav>
  </div>`;
}

function notFound() { return '<div class="page-width interior"><h1>페이지를 찾을 수 없습니다.</h1><a class="action-button action-primary" href="#/">소개 보기</a></div>'; }

const bookBase = window.BOOK_BASE || '/portfolio';
const publicRoutes = {
  '': ['home'], 'team': ['team'], 'projects': ['projects'], 'resume': ['career'], 'play': ['demos'],
  'wiggle-puzzle': ['case','wiggle'], 'capsule-cats': ['case','capsule'],
  'cat-merge-drop': ['case','cat'], 'k-pop-battle': ['case','kpop'],
  'neon-reflector': ['case','neon'], 'bounce-defense': ['case','bounce'],
  'otter-retention': ['case','otter'], 'capsule-cats/balance-notes.html': ['case','capsule','record-balance-notes']
};
function routeKey(pathname) {
  if(pathname!==bookBase && !pathname.startsWith(bookBase+'/')) return null;
  return decodeURI(pathname.slice(bookBase.length)).replace(/\/index\.html$/, '/').replace(/^\/|\/$/g,'');
}
function routeParts() {
  let hash=location.hash.slice(1);try{hash=decodeURIComponent(hash);}catch{}
  if(hash.startsWith('/')) return hash.slice(1).split('/');
  const route=[...(publicRoutes[routeKey(location.pathname)]||['home'])];
  if(route[0]==='home') {
    if(hash==='freelance-notes') return ['home',hash];
    const legacy={case:'projects',shipped:'projects',playable:'demos',career:'career',capabilities:'team',top:'home'};
    return [legacy[hash]||'home'];
  }
  if(route[0]==='career' && ['codex-skills','freelance'].includes(hash)) return ['career',hash];
  if(route[0]==='team' && hash) return ['team',hash.replace(/^team-/,'')];
  if(route[0]==='case' && hash) {
    if(hash==='case'||hash==='top') return route.slice(0,2);
    if(['summary','overview','process','details','evidence'].includes(hash)||hash.startsWith('record-')) return [...route.slice(0,2),hash];
    const section=records[route[1]]?.sections.find(x=>x.id===hash || x.id===hash.replace(/-title$/,''));
    if(section) return [...route.slice(0,2),'record-'+section.id];
  }
  return route;
}
function publicHref(hash) {
  const parts=hash.replace(/^#\/?/,'').split('/');
  const page=parts[0]||'home';
  const key=Object.keys(publicRoutes).find(key=>publicRoutes[key][0]===page && (page!=='case'||publicRoutes[key][1]===parts[1]));
  if(key===undefined) return hash;
  const section=page==='case'?parts[2]:(page==='team'||page==='career')?parts[1]:null;
  return bookBase+'/'+(key?key+'/':'')+(section?'#'+encodeURIComponent(section):'');
}
function normalizeBookLinks(html) {
  return html.replace(/href="(#\/[^"<>]*)"/g,(_,href)=>`href="${publicHref(href)}"`).replaceAll('href="/portfolio/#case"','href="/portfolio/projects/"');
}

function route(focus = false) {
  const version=++routeVersion;
  const parts = routeParts();
  const page = parts[0] || 'home';
  if (page === 'career' && parts[1] === 'codex-skills') {
    location.replace(bookBase+'/skills/');
    return;
  }
  document.querySelectorAll('[data-nav]').forEach(a=>{
    const active = a.dataset.nav === (page === 'case' ? 'projects' : page);
    if(active) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
  });
  main.innerHTML = normalizeBookLinks(page==='home'?home():page==='team'?teamPage():page==='projects'?projects():page==='career'?career():page==='demos'?demos():page==='case'?casePage(parts[1],parts[2]||'summary'):notFound());
  const headings = {home:'소개',team:'팀 빌딩',projects:'프로젝트',career:'경력·기술',demos:'플레이 데모',case:data.projects.find(x=>x.id===parts[1])?.title||'프로젝트'};
  document.title = `${headings[page]||'포트폴리오'} · 이정훈의 제작 기록`;
  document.body.dataset.page = page;
  if(focus) { main.focus({preventScroll:true}); window.scrollTo({top:0,behavior:'instant'}); }
  if((page==='team'||page==='career'||page==='home') && parts[1]) document.getElementById(parts[1])?.scrollIntoView();
  if(page==='case' && parts[2]) {
    const section=parts[2]==='summary'?'overview':parts[2];
    const activeLink=document.querySelector(`.record-contents a[href="${publicHref("#/case/"+parts[1]+"/"+section)}"]`);
    activeLink?.setAttribute('aria-current','location');
    if(activeLink?.closest('details')) activeLink.closest('details').open=true;
    const target=document.getElementById(section);
    if (target?.matches('details')) target.open=true;
    Promise.allSettled([...main.querySelectorAll('img')].filter(img=>img.getClientRects().length).map(img=>{img.loading='eager';return img.decode();})).then(()=>{
      if(version===routeVersion && target?.isConnected) target.scrollIntoView({behavior:'instant',block:'start'});
    });
  }
}

document.addEventListener('click',event=>{
  const sourceAnchor=event.target.closest('a[href]');
  if(sourceAnchor && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && sourceAnchor.target!=='_blank' && !sourceAnchor.hasAttribute('download') && !sourceAnchor.classList.contains('skip')) {
    const url=new URL(sourceAnchor.href,location.href);
    if(url.origin===location.origin && Object.hasOwn(publicRoutes,routeKey(url.pathname))) {
      event.preventDefault();
      const destination=url.pathname+url.search+url.hash;
      if(destination!==location.pathname+location.search+location.hash) history.pushState(null,'',destination);
      if(dialog.open) dialog.close();
      route(true);
      return;
    }
  }
  if(event.target.closest('.skip')) { event.preventDefault(); main.focus(); main.scrollIntoView(); return; }
  const filterButton=event.target.closest('[data-filter]');
  if(filterButton) {
    filter=filterButton.dataset.filter;
    const position=window.scrollY;
    route();
    document.querySelector(`[data-filter="${filter}"]`).focus({preventScroll:true});
    window.scrollTo({top:position,behavior:'instant'});
  }
  const demoButton=event.target.closest('[data-demo]');
  if(demoButton) {
    const project=data.demos[Number(demoButton.dataset.demo)];
    const variant=project.variants[Number(demoButton.dataset.variant)];
    demoTrigger=demoButton;
    document.querySelector('#demo-title').textContent=`${project.title} · ${variant.label}`;
    document.querySelector('.demo-frame').innerHTML=`<iframe title="${e(project.title)} ${e(variant.label)} 플레이 데모" src="${e(variant.url)}" allow="autoplay; fullscreen; gamepad" allowfullscreen sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-pointer-lock"></iframe>`;
    dialog.showModal();
    document.body.classList.add('modal-open');
    dialog.querySelector('button').focus();
  }
  if(event.target.closest('[data-close-demo]')) dialog.close();
});
dialog.addEventListener('click',event=>{if(event.target===dialog) {const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) dialog.close();}});
dialog.addEventListener('close',()=>{document.querySelector('.demo-frame').replaceChildren();document.body.classList.remove('modal-open');demoTrigger?.focus();});
window.addEventListener('hashchange',()=>{if(dialog.open)dialog.close();route(true);});
window.addEventListener('popstate',()=>{if(dialog.open)dialog.close();route(true);});
route();
