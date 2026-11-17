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
const arrow = '<span aria-hidden="true">↗</span>';
const localLink = (url, label, cls = '') => `<a class="${cls}" href="${e(url)}" target="_blank" rel="noopener">${e(label)} ${arrow}</a>`;
const tags = values => `<ul class="tags" aria-label="사용 기술">${values.map(x => `<li>${e(x)}</li>`).join('')}</ul>`;

function projectVisual(p, small = false) {
  if (!p.image) return `<div class="project-visual chart-visual ${small ? 'small' : ''}" aria-label="동일 조건 20개 시드 비교: 조정 전 0개, 조정 후 20개가 1,000단계 완료"><span>1,000단계 완료 · 20개 시드</span><div><span>조정 전</span><i class="chart-bar before"></i><b>0/20</b></div><div><span>조정 후</span><i class="chart-bar after"></i><b>20/20</b></div><small>자동 플레이 시뮬레이션</small></div>`;
  return `<div class="project-visual visual-${p.id}"><img src="${e(p.image)}" alt="${e(p.imageAlt || `${p.title} 실제 화면`)}" loading="lazy"></div>`;
}

function projectRow(p, index) {
  return `<article class="project-row">
    <a href="#/case/${p.id}" class="project-image-link" aria-label="${e(p.title)} 사례 보기">${projectVisual(p)}</a>
    <div class="project-copy"><div class="project-meta"><span>기록 ${String(data.projects.indexOf(p)+1).padStart(2,"0")} / ${e(p.category)}</span><span>${e(p.status)}</span></div><h3><a href="#/case/${p.id}">${e(p.title)} <span aria-hidden="true">↗</span></a></h3><p class="project-role">${e(p.ownership)}</p><p class="project-summary">${e(p.summary)}</p><p class="project-outcome"><strong>${e(p.resultValue)}</strong> <span>${e(p.resultLabel)}</span></p></div>
  </article>`;
}

function careerList(compact = false) {
  const list = compact ? data.experience.slice(0, 3) : data.experience;
  return `<ol class="career-list ${compact ? 'compact' : ''}">${list.map(x => `<li><span class="career-date">${e(x.period)}</span><div><h3>${e(x.company)}</h3><p class="career-role">${e(x.role)}</p>${compact ? '' : `<p>${e(x.body)}</p>`}</div></li>`).join('')}</ol>`;
}

function contactBand() {
  return `<div class="contact-line"><span>연락</span><a href="mailto:jhoon8903@gmail.com">jhoon8903@gmail.com</a>${localLink('/portfolio/downloads/lee-jeong-hoon-resume-2026-11-18.pdf?rev=skills','이력서 PDF · 2026.11.18')}${localLink('/portfolio/downloads/lee-jeong-hoon-portfolio-2026-11-18.pdf?rev=skills','포트폴리오 PDF · 2026.11.18')}</div>`;
}

function home() {
  const wiggle = data.projects[0], capsule = data.projects[1];
  const chapters = [
    {n:'01', url:'team', title:'팀을 만드는 일', subtitle:'팀 빌딩 · 교육 · 개발팀 운영', body:'개발자 1명으로 시작해 15명 규모의 팀을 운영했습니다. 면접·온보딩부터 협업 기준과 공통 시스템까지.', foot:'2024.01 — 2025.10 · 액션핏'},
    {n:'02', url:'projects', title:'게임을 만드는 일', subtitle:'구현 · 최적화 · 검증', body:'Wiggle Puzzle의 경로 탐색 최적화부터 1인 개발 프로젝트의 자동화와 ECS 실험까지.', foot:'Wiggle Puzzle · BFS 지연 600 → ≤50ms · 개발 사례 7편'},
    {n:'03', url:'career', title:'지금까지의 이력', subtitle:'경력 · 프리랜서 · 멘토링', body:'팀에서 맡은 역할부터 프리랜서 멘토링, 게임 제작에 쓰는 Codex 스킬 개발까지.', foot:'2023 — 현재'},
    {n:'04', url:'demos', title:'직접 플레이', subtitle:'실행 가능한 게임', body:'화면으로 본 게임을 직접 실행해 볼 수 있습니다. 프로젝트와 빌드를 선택해 주세요.', foot:'13개 프로젝트 · 21개 데모'}
  ];
  return `<div class="page-width home-page">
    <section class="book-cover" aria-labelledby="cover-title">
      <div class="cover-type"><p class="cover-author">이정훈 <span>Unity 클라이언트 개발자</span></p><h1 id="cover-title">제작<span>기록</span><i aria-hidden="true">.</i></h1><p class="cover-subtitle">게임의 구현부터<br>함께 만드는 팀의 기반까지.</p><p class="cover-description">캐주얼 게임을 개발하고, 성능을 개선하고,<br>다음 개발자가 이어갈 작업 기준을 만듭니다.</p><div class="cover-edition"><span>개발 · 설계 · 팀 운영</span><span>2023—2026</span></div></div>
      <div class="cover-plates"><div class="plate-running-head"><span>수록 작품</span><span>개발 화면과 그 뒤의 과정</span></div><div class="plate-layout"><figure class="cover-plate plate-one"><a href="#/case/capsule" aria-label="고양이 캡슐 디펜스 개발 기록"><img src="${e(capsule.image)}" alt="고양이 캡슐 디펜스의 캡슐 추첨과 유닛 강화 화면"></a><figcaption><b>도판 01</b><span>고양이 캡슐 디펜스<br>1인 개발 · 개발 중</span><a href="#/case/capsule" aria-label="고양이 캡슐 디펜스 기록 펼치기">↗</a></figcaption></figure><figure class="cover-plate plate-two"><a href="#/case/wiggle" aria-label="Wiggle Puzzle 최적화 기록"><img src="${e(wiggle.image)}" alt="Wiggle Puzzle의 경로와 퍼즐 보드"></a><figcaption><b>도판 02</b><span>Wiggle Puzzle<br>아키텍처 · 성능 최적화</span><a href="#/case/wiggle" aria-label="Wiggle Puzzle 기록 펼치기">↗</a></figcaption></figure></div></div>
    </section>
    <section class="book-contents" aria-labelledby="contents-heading"><div class="contents-note"><p class="running-label">이 기록의 차례</p><h2 id="contents-heading">관심 있는 장부터<br>펼쳐 보세요.</h2><p>전체 흐름은 이 페이지에서,<br>맡았던 일과 구현 과정은 각 장에서.</p><div class="current-note"><span>최근 활동</span><strong>디벨로캣 · 프리랜서 멘토</strong><p>2026.11 — 현재<br>교육생 프로젝트 멘토링</p><a href="#/career">경력에서 보기 →</a></div><a class="text-link" href="#/career/codex-skills">게임 제작에 쓴 Codex 스킬 →</a></div><nav class="chapter-index" aria-label="제작 기록집 목차">${chapters.map(c=>`<a class="chapter-entry" href="#/${c.url}"><span class="chapter-no">${c.n}</span><div><p class="chapter-subtitle">${c.subtitle}</p><h3>${c.title}</h3><p class="chapter-description">${c.body}</p><span class="chapter-foot">${c.foot}</span></div><span class="chapter-arrow" aria-hidden="true">↗</span></a>`).join('')}</nav></section>
    ${contactBand()}</div>`;
}

function chapterHeading(number, title, description, meta='') {
  return `<header class="page-heading"><div class="chapter-heading-label"><span>제 ${number}장</span><span>${meta || '이정훈의 제작 기록'}</span></div><div class="chapter-heading-row"><span class="chapter-display" aria-hidden="true">${number}</span><div><h1>${title}</h1><p>${description}</p></div></div></header>`;
}

function teamDiagram() {
  return `<figure class="team-diagram"><figcaption><span>조직 구성 기록</span><span>액션핏 · 퇴사 직전</span></figcaption><div class="team-diagram-total"><strong>15</strong><span>명의 개발팀<br>운영과 협업 기준을 정리</span></div><div class="team-dot-groups">${team.composition.map((x,i)=>`<div><span class="staff-dots staff-${i}" aria-hidden="true">${Array.from({length:x.count},()=>'<i></i>').join('')}</span><span>${e(x.label)} <b>${x.count}명</b></span></div>`).join('')}</div><p>직접 면접·온보딩: 정규직 6명 · 계약직 4명</p></figure>`;
}

function teamPage() {
  const training = data.titles.filter(x=>x.role.includes('교육'));
  return `<div class="page-width interior team-page">${chapterHeading("01","팀을 만드는 일","면접과 온보딩, 교육과 협업 기준. 개발팀을 구성하고 운영한 기록입니다.",e(team.company)+" · "+e(team.period))}<div class="team-reading-layout"><aside class="team-contents"><p>이 페이지에서</p><nav aria-label="팀 빌딩 기록 목차"><a href="#/team/start">팀의 출발점</a><a href="#/team/hiring">면접·온보딩</a><a href="#/team/education">인턴 교육</a><a href="#/team/operations">개발팀 운영</a><a href="#/team/systems">공통 시스템</a><a href="#/team/shipped">함께 만든 게임</a></nav><div class="team-aside-fact"><strong>퇴사 직전 15명</strong>${team.composition.map(x=>`<span>${e(x.label)} ${x.count}명</span>`).join('')}</div></aside><div class="team-article">
    <section id="start"><p class="section-number">01.1 / 출발점</p><h2>처음에는 개발자가 저 혼자였습니다.</h2><p>디자이너 1명, 기획자 1명, 개발자 1명으로 캐주얼 게임을 만들었습니다. 게임 개발을 진행하면서 개발자를 면접하고, 새로 합류한 사람이 프로젝트를 이어갈 수 있도록 온보딩과 공통 시스템을 함께 만들었습니다.</p><p>퇴사 직전에는 정규직 6명·계약직 4명·인턴 5명으로 구성된 15명 규모의 개발팀을 관리했습니다.</p>${teamDiagram()}</section>
    ${team.responsibilities.map((x,i)=>`<section id="${['hiring','education','operations'][i]}"><p class="section-number">01.${i+2} / ${["합류","교육","운영"][i]}</p><h2>${e(x.title)}</h2><p>${e(x.body)}</p><p>${e(x.detail)}</p>${i===0?`<dl class="document-list"><div><dt>개발 파이프라인</dt><dd>신규 개발자에게 전달할 개발 절차와 작업 기준</dd></div><div><dt>UI 가이드</dt><dd>프로젝트에서 사용하는 UI 개발 기준</dd></div><div><dt>용어집</dt><dd>개발자와 비개발 부서가 함께 사용하는 용어</dd></div></dl>`:''}${i===1?`<div class="training-list"><h3>교육 리드로 참여한 타이틀</h3><ul>${training.map(t=>`<li>${localLink(t.url,t.title)}<span>MVP · 교육</span></li>`).join('')}</ul></div>`:''}</section>`).join('')}
    <section id="systems"><p class="section-number">01.5 / 개발 기반</p><h2>반복되는 개발 작업을 공통화했습니다.</h2><p>프로젝트마다 저장, UI, 에셋 로딩, 결제·광고 연동을 다시 만들고 있었습니다. 공통 모듈과 에디터를 만들어 다음 프로젝트와 새로 합류한 개발자가 재사용할 수 있게 정리했습니다.</p><div class="systems-record">${team.systems.map(x=>`<article><p class="record-context">${e(x.problem)}</p><h3>${e(x.implementation)}</h3><p>${e(x.change)}</p></article>`).join('')}</div></section>
    <section id="shipped"><p class="section-number">01.6 / 함께 만든 게임</p><h2>팀 운영과 게임 개발을 병행했습니다.</h2><p>캐주얼 게임 23종의 출시 과정에서 메인 개발, 인수 운영, 최적화, 교육 리드를 역할별로 맡았습니다. 대표 타이틀의 담당 범위는 아래와 같습니다.</p><div class="shipped-records">${team.shipped.map(x=>`<article><img src="${e(x.image)}" alt="${e(x.title)} 게임 화면" loading="lazy"><div><h3>${localLink(x.url,x.title)}</h3><p>${e(x.role)}</p></div></article>`).join('')}</div><a class="text-link" href="#/projects">전체 참여 타이틀과 개발 사례 →</a></section>
    <section class="team-reference"><h2>관련 자료</h2><p>이력서와 포트폴리오의 액션핏 경력에도 팀 구성과 담당 업무를 기록했습니다.</p><div>${localLink('/portfolio/downloads/lee-jeong-hoon-resume-2026-11-18.pdf?rev=skills','이력서 PDF · 2026.11.18')}${localLink('/portfolio/downloads/lee-jeong-hoon-portfolio-2026-11-18.pdf?rev=skills','포트폴리오 PDF · 2026.11.18')}</div></section>
  </div></div>${contactBand()}</div>`;
}

function projects() {
  const categories = ['전체', ...new Set(data.projects.map(p=>p.category))];
  const shown = data.projects.filter(p => filter === '전체' || p.category === filter);
  return `<div class="page-width interior">${chapterHeading("02","게임을 만드는 일","맡은 범위와 구현 과정, 확인한 결과를 담은 일곱 편의 개발 기록.")}<div class="filter-bar" role="group" aria-label="프로젝트 분야 필터">${categories.map(x=>`<button type="button" data-filter="${e(x)}" aria-pressed="${x===filter}">${e(x)} <span>${x==='전체'?data.projects.length:data.projects.filter(p=>p.category===x).length}</span></button>`).join('')}</div><p class="list-status" role="status">${e(filter)} · ${shown.length}개 프로젝트</p><div class="project-list library-list">${shown.map(projectRow).join('')}</div>
    <section class="archive-section"><div class="section-head"><div><h2>참여 타이틀 목록</h2><p>개별 출시작의 담당 역할을 확인할 수 있습니다.</p></div></div><details class="disclosure"><summary>전체 ${data.titles.length}개 참여 타이틀 <span>역할·서비스 구분 보기</span></summary><p class="archive-note">기존 포트폴리오에 기록된 상태를 기준으로 표시했습니다. 출시 참여 23종과 아래 전체 참여 목록은 집계 범위가 다릅니다.</p><div class="title-table"><div class="title-table-head"><span>타이틀</span><span>담당 역할</span><span>기록상 상태</span></div>${data.titles.map(x=>`<div>${x.url?localLink(x.url,x.title):`<strong>${e(x.title)}</strong>`}<span>${e(x.role)}</span><span>${x.status==='live'?'라이브':'종료 · MVP'}</span></div>`).join('')}</div></details></section>${contactBand()}</div>`;
}

function codexSkillsStory() {
  return `<section class="codex-story" id="codex-skills" aria-labelledby="codex-title">
    <header><h2 id="codex-title">게임 제작에 쓴 Codex 스킬</h2>
      <p>혼자 게임을 만들며 같은 피드백을 반복하는 일이 생겼습니다. 자주 고치는 부분은 Codex가 다음 작업에서도 참조할 수 있도록 제작 규칙으로 남기고, 결과를 비교하는 일은 스크립트로 만들었습니다.</p></header>
    <article>
      <h3>공격력 아이콘을 다시 그린 이유</h3>
      <div><p>고양이 캡슐 디펜스의 첫 공격력 아이콘은 광택이 나는 검이었습니다. 캐릭터가 사용하는 무기와 화면의 그림체에 맞춰 평면 라이플로 고쳤습니다. 이후 작업을 위해 <code>game-asset-pipeline</code> 제작 명세에 기준 이미지와 외곽선, 금지할 표현을 기록했습니다. 256px 아이콘 네 종은 크기와 Unity 임포트 설정도 확인했습니다.</p>
        <div class="codex-plates">
          <figure><img width="80" height="80" loading="lazy" src="/portfolio/assets/capsule-cats/damage-before.png" alt="광택과 입체 음영이 있는 검 아이콘"><figcaption>첫 시안 · 검</figcaption></figure>
          <figure><img width="80" height="80" loading="lazy" src="/portfolio/assets/capsule-cats/damage-after.png" alt="외곽선을 살린 평면 라이플 아이콘"><figcaption>교정 후 · 라이플</figcaption></figure>
        </div></div>
    </article>
    <article><h3>패배 뒤 강화하면 다음 도전이 달라질까?</h3>
      <div><p>첫 스테이지에서 한두 번 패배한 뒤 획득 재화로 강화하면 돌파할 수 있게 만들고 싶었습니다. <code>stage-creator</code>에 강화 조건과 시드, 재도전 한도를 기록하고 Unity 전투를 반복 실행했습니다. 당시 후보를 새 시드로 검증한 결과, 세 번의 도전 안에 돌파한 자동 여정은 무강화 0/16, 강화 허용 14/16이었습니다. 이 결과를 다음 스테이지를 조정할 때의 기준으로 삼았습니다.</p>
        <a class="text-link" href="#/case/capsule/record-skills">기획부터 실험까지, 스킬 5종의 역할 →</a></div></article>
    <article><h3>캐릭터 동작에서 한 포즈만 고치기</h3>
      <div><p>방향별 픽셀 애니메이션을 편집하는 별도 도구 <code>directional-sprite-actions</code>를 만들었습니다. 승인한 PNG 포즈를 재사용하고 바뀐 방향과 프레임만 교체할 수 있습니다. 피격 동작 예제에서는 8방향의 충격·반동·복귀 포즈를 한 장의 시트로 묶었습니다. 세 프레임의 재생 시간(80·100·120ms)을 JSON으로 내보내고, 같은 타이밍의 GIF로 동작을 확인할 수 있게 했습니다.</p></div></article>
  </section>`;
}

function capsuleSkillsList() {
  return `<dl class="codex-skill-list">${data.capsuleSkills.map(skill => `<div><dt>${e(skill.task)} · <code>${e(skill.name)}</code></dt><dd>${e(skill.output)}</dd></div>`).join('')}</dl>`;
}

function career() {
  return `<div class="page-width interior">${chapterHeading("03","지금까지의 이력","게임 개발과 팀 운영, 프리랜서 활동과 교육생 프로젝트 멘토링.")}<div class="page-actions">${localLink('/portfolio/downloads/lee-jeong-hoon-resume-2026-11-18.pdf?rev=skills','이력서 PDF · 2026.11.18','text-link')} <a class="text-link" href="#/career/codex-skills">Codex 스킬 제작 사례 ↓</a></div><div class="career-layout"><section><ol class="career-list">${data.experience.map(x=>`<li><span class="career-date">${e(x.period)}</span><div><h2>${e(x.company)}</h2><p class="career-role">${e(x.role)}</p><p>${e(x.body)}</p>${x.company==='㈜액션핏'?`<a class="text-link" href="#/team">면접·온보딩·교육·개발팀 운영 기록 →</a>`:''}</div></li>`).join('')}</ol></section><aside class="skills"><h2 class="subheading">기술과 적용 경험</h2><dl>${data.skills.map(x=>`<div><dt>${e(x.name)}</dt><dd>${e(x.evidence)}</dd></div>`).join('')}</dl></aside></div>${codexSkillsStory()}${contactBand()}</div>`;
}

function demos() {
  return `<div class="page-width interior">${chapterHeading("04","직접 플레이","13개 프로젝트 · 21개 실행 데모. 관심 있는 게임의 빌드를 선택해 주세요.")}<div class="demo-grid">${data.demos.map((x,i)=>`<article class="demo-card"><div class="demo-thumb"><img src="${e(x.image)}" alt="${e(x.title)} 게임 화면" loading="lazy"></div><div class="demo-copy"><p class="eyebrow">${e(x.kind)}</p><h2>${e(x.title)}</h2><p>${e(x.note)}</p><div class="demo-buttons">${x.variants.map((v,j)=>`<button type="button" data-demo="${i}" data-variant="${j}" aria-label="${e(x.title)} ${e(v.label)} 실행"><span aria-hidden="true">▶</span> ${e(v.label)} 실행</button>`).join('')}</div></div></article>`).join('')}</div><p class="archive-note">데모는 기존 공개 빌드를 불러옵니다. 첫 실행에는 로딩 시간이 필요할 수 있습니다.</p></div>`;
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
  return p.evidence.filter(x=>!bookHref(x.url).startsWith('#/case/')).map((x,i)=>`<a href="${e(x.url)}" target="_blank" rel="noopener"><span class="source-file-type">${e((x.url.split('.').pop().split('?')[0].length<6?x.url.split('.').pop().split('?')[0]:'LINK').toUpperCase())}</span><span>${e(x.label)}</span><span aria-hidden="true">↗</span></a>`).join('');
}

function casePage(id) {
  const p = data.projects.find(x=>x.id===id);
  if (!p) return notFound();
  const number=caseNumber(p), sections=records[id]?.sections||[];
  const next=data.projects[(data.projects.indexOf(p)+1)%data.projects.length];
  const caption=p.imageAlt||`${p.title} 개발 화면`;
  return `<div class="page-width interior record-page record-${p.id}">
    <header class="record-title"><div class="record-running"><a href="#/projects">← 제 02장 · 게임을 만드는 일</a><span>개발 기록 ${number} / 07</span></div><div class="record-title-line"><span class="record-display" aria-hidden="true">${number}</span><div><p class="record-category">${e(p.category)} <span>· ${e(p.status)}</span></p><h1>${e(p.title)}</h1></div></div><p class="record-deck">${e(p.summary)}</p><nav class="record-jumps" aria-label="빠른 탐색"><a href="#/case/${id}/overview">핵심 요약 ↓</a><a href="#/case/${id}/process">구현 과정 ↓</a><a href="#/case/${id}/details">상세 기록 ↓</a><a href="#/case/${id}/evidence">검증 자료 ↓</a></nav></header>
    <section class="record-opening" aria-label="프로젝트 개요"><figure class="record-plate">${projectVisual(p)}<figcaption><span>도판 ${number}</span><span>${e(p.image?caption:'Drop 예산 조정 전후 · 1,000단계 완료 시드 비교')}</span></figcaption></figure><div class="record-brief"><p class="running-label">이 프로젝트에서 맡은 일</p><h2>${e(p.ownership)}</h2><p class="record-responsibility">${e(p.process[0].body)}</p><dl class="record-facts"><div><dt>사용 기술</dt><dd>${p.tech.map(e).join(' · ')}</dd></div><div><dt>진행 구분</dt><dd>${e(p.status)}</dd></div></dl><div class="record-finding"><span>기록한 결과</span><strong>${e(p.resultValue)}</strong><p>${e(p.resultLabel)}</p></div><p class="record-qualification">${e(p.caveat)}</p><a class="record-read-link" href="#/case/${id}/overview">담당 범위와 결과부터 읽기 <span aria-hidden="true">↓</span></a></div></section>
    <div class="record-body"><aside class="record-contents"><p class="running-label">기록 ${number}의 목차</p><nav aria-label="${e(p.title)} 기록 목차"><a href="#/case/${id}/overview"><span>01</span> 핵심 요약</a><a href="#/case/${id}/process"><span>02</span> 구현 과정</a><a href="#/case/${id}/details"><span>03</span> 상세 기록 <small>${sections.length}개</small></a>${sections.length?`<details class="record-section-index"><summary>상세 항목 찾아보기</summary><ol>${sections.map(x=>`<li><a href="#/case/${id}/record-${e(x.id)}">${e(x.title)}</a></li>`).join('')}</ol></details>`:''}<a href="#/case/${id}/evidence"><span>04</span> 검증 자료</a></nav><a class="record-index-back" href="#/projects">전체 개발 기록으로 →</a></aside>
    <article class="record-article">
      <section class="record-section" id="overview"><p class="section-number">${number}.1 / 핵심 요약</p><h2>문제, 담당한 일, 확인한 결과.</h2><dl class="record-overview"><div><dt>해결할 문제</dt><dd>${e(p.problem)}</dd></div><div><dt>직접 구현한 범위</dt><dd><ul>${p.actions.map(x=>`<li>${e(x)}</li>`).join('')}</ul></dd></div><div><dt>확인한 결과</dt><dd><ul>${p.outcomes.map(x=>`<li>${e(x)}</li>`).join('')}</ul></dd></div></dl></section>
      <section class="record-section" id="process"><p class="section-number">${number}.2 / 구현 과정</p><h2>구현의 순서와 선택한 구조.</h2><ol class="record-process">${p.process.map((x,i)=>`<li><span aria-hidden="true">${String(i+1).padStart(2,'0')}</span><div><h3>${e(x.title)}</h3><p>${e(x.body)}</p></div></li>`).join('')}</ol></section>
      <section class="record-details" id="details"><header><p class="section-number">${number}.3 / 상세 기록</p><h2>설계와 검증의 세부 내용.</h2><p>구현 자료와 실험 조건을 항목별로 펼쳐 읽을 수 있습니다.</p></header>${sections.map((x,i)=>`<section class="record-section source-section" id="record-${e(x.id)}"><p class="record-section-count">${number}.3.${i+1}</p><h3 class="source-heading">${e(x.title)}</h3><div class="source-prose">${id==='capsule' && x.id==='skills' ? capsuleSkillsList() : ''}${recordHtml(x.html)}</div></section>`).join('')}</section>
      <section class="record-section" id="evidence"><p class="section-number">${number}.4 / 검증 자료</p><h2>결과를 확인할 수 있는 자료.</h2><p class="source-intro">원자료와 실행 파일을 직접 확인할 수 있습니다.</p><div class="record-sources">${sourceLinks(p)}</div><div class="record-limit"><h3>이 결과가 설명하는 범위</h3><p>${e(p.caveat)}</p></div></section>
    </article></div><nav class="record-next" aria-label="다음 개발 기록"><a href="#/projects">목차로 돌아가기</a><a href="#/case/${next.id}"><span>다음 기록 ${caseNumber(next)}</span><strong>${e(next.title)}</strong><i aria-hidden="true">→</i></a></nav>
  </div>`;
}

function notFound() { return '<div class="page-width interior"><h1>페이지를 찾을 수 없습니다.</h1><a class="button primary" href="#/">소개로 돌아가기</a></div>'; }

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
    const legacy={case:'projects',shipped:'projects',playable:'demos',career:'career',capabilities:'team',top:'home'};
    return [legacy[hash]||'home'];
  }
  if(route[0]==='career' && hash==='codex-skills') return ['career',hash];
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
  document.querySelectorAll('[data-nav]').forEach(a=>{
    const active = a.dataset.nav === (page === 'case' ? 'projects' : page);
    if(active) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
  });
  main.innerHTML = normalizeBookLinks(page==='home'?home():page==='team'?teamPage():page==='projects'?projects():page==='career'?career():page==='demos'?demos():page==='case'?casePage(parts[1],parts[2]||'summary'):notFound());
  const headings = {home:'소개',team:'팀 빌딩',projects:'프로젝트',career:'경력·기술',demos:'플레이 데모',case:data.projects.find(x=>x.id===parts[1])?.title||'프로젝트'};
  document.title = `${headings[page]||'포트폴리오'} · 이정훈의 제작 기록`;
  document.body.dataset.page = page;
  if(focus) { main.focus({preventScroll:true}); window.scrollTo({top:0,behavior:'instant'}); }
  if((page==='team'||page==='career') && parts[1]) document.getElementById(parts[1])?.scrollIntoView();
  if(page==='case' && parts[2]) {
    const section=parts[2]==='summary'?'overview':parts[2];
    const activeLink=document.querySelector(`.record-contents a[href="${publicHref("#/case/"+parts[1]+"/"+section)}"]`);
    activeLink?.setAttribute('aria-current','location');
    if(activeLink?.closest('details')) activeLink.closest('details').open=true;
    const target=document.getElementById(section);
    Promise.allSettled([...main.querySelectorAll('img')].map(img=>{img.loading='eager';return img.decode();})).then(()=>{
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
