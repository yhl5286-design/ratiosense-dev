/* 소리의 방 번역.
   계이름 도레미파솔라시도′ → C D E F G A B C′ (음이름).
     한국어판은 고정도법으로 읽는다. 라 = 440Hz가 곧 A440이므로 영어권 초등 교실에서
     통하는 음이름으로 옮기는 편이 계이름보다 분명하다.
   칸 → part(하프 눈금) / beat(리듬 칸). 두 뜻이 섞여 있어 자리마다 가려 옮겼다.
   조각으로 나뉜 문장은 이어 붙었을 때 한 문장이 되도록 맞추었다. */
export default {
  /* 머리·단추 */
  '홈으로': 'Home',
  '소리의 비밀': 'The Sound Secret',
  '소리 설정': 'Sound settings',
  '목소리 고르기': 'Choose voices',
  '캐릭터 목소리 고르기': 'Choose character voices',
  '대사 다시 듣기': 'Say that again',
  '이전': 'Back',
  '← 이전': '← Back',
  '다음 →': 'Next →',
  '닫기': 'Close',
  '제출!': 'Submit!',
  '제출! →': 'Submit! →',
  '다시 한번!': 'Try once more!',
  '조금만 더!': 'Almost there!',
  '🎙️ 캐릭터 목소리': '🎙️ Character voices',
  '{{r.name}} 목소리': '{{r.name}} voice',
  '▶ 들어보기': '▶ Listen',
  '다 골랐어요': 'All chosen',
  '음성 + 효과음': 'Voice + sound effects',
  '효과음만': 'Sound effects only',
  '소리 끔': 'Sound off',

  /* 인물 */
  '레시오': 'Ratia',
  '비의 비밀 탐색 안내자': 'your guide to the Secret of Ratio',
  '밝은 안내 목소리': 'a bright guiding voice',
  '안내': 'Guide',
  '문제를 읽어 주는 목소리': 'the voice that reads the questions aloud',
  '여성 내레이션': 'female narration',
  '에라토스테네스': 'Eratosthenes',
  '시냐크': 'Signac',
  '먼셀': 'Munsell',
  '뭉크': 'Munch',
  '문제를 읽어 줄게요.': 'I will read the questions for you.',
  '레시오예요. 반가워요!': 'Ratia here. Nice to meet you!',

  /* 들머리 */
  '소리의 비밀을 찾아봅시다!': 'Let us go and find the Sound Secret!',
  '이 방은 소리의 비밀을 알아내는 방이에요.': 'This is the room where we work out the secret of sound.',
  '색깔 방에서는 물감의 양을 비로 맞추어 주황을 만들었지요. 이번에는 같은 비를 귀로 찾아볼 거예요.':
    'In the Color room you made orange by getting the amounts of paint into the right ratio. This time we will find the very same ratios with our ears.',
  '아름다운 소리의 비밀을 찾으러 가볼까요?': 'Shall we go and find the secret of beautiful sound?',
  '시작하기 →': 'Let us begin →',

  /* 건반 */
  '건반을 눌러 소리의 떨림을 느껴 보세요! 높은 음일수록 현의 길이가 짧고, 현이 빠르게 떨려요. 여덟 건반을 모두 눌러 소리를 들어 보세요.':
    'Press the keys and feel the sound vibrate! The higher the note, the shorter the string and the faster it shakes. Press all eight keys and listen.',
  '실제는 더 빠르지만 구분하기 쉽도록 천천히 보여드려요': 'It is really much faster — we slow it down so you can see it',
  '{{k.label}} 건반': '{{k.label}} key',
  '건반을 눌러 보세요': 'Press a key',
  ' — 1초에 ': ' — vibrates ',
  '번 떨려요 (': ' times a second (',
  '의 진동수 : ': ' frequency: ',
  '도 — 줄이 가장 길고, 가장 느리게 떨려요': 'C — the longest string, shaking the slowest',
  ' — 도보다 줄이 짧고, 더 빠르게 떨려요': ' — a shorter string than C, shaking faster',
  '🎹 여덟 건반을 모두 들어봤어요! 이제 건반을 누르면 진동수가 보여요':
    '🎹 You have heard all eight keys! Now pressing a key shows its frequency',
  '들어본 건반 ': 'Keys heard ',
  '도 &nbsp;&nbsp;': 'C &nbsp;&nbsp;',
  '누른 음': 'the note you pressed',
  '음': 'Note',
  '음정': 'Interval',
  '진동수 비 (도 : 음)': 'Frequency ratio (C : note)',
  '도': 'C',
  '레': 'D',
  '미': 'E',
  '파': 'F',
  '솔': 'G',
  '라': 'A',
  '시': 'B',
  '도′': 'C′',
  '미′': 'E′',
  '한 옥타브 높은 도': 'the C an octave higher',
  '낮은 도': 'low C',
  '높은 도': 'high C',
  '완전1도(같은 음)': 'perfect unison (same note)',
  '장2도': 'major 2nd',
  '장3도': 'major 3rd',
  '완전4도': 'perfect 4th',
  '완전5도': 'perfect 5th',
  '장6도': 'major 6th',
  '장7도': 'major 7th',
  '완전8도(옥타브)': 'perfect octave',

  /* 화음 평정 */
  '도와 다른 음을 함께 눌러 보세요. 어울리는 소리를 듣고 물결 무늬를 본 다음 별점을 매겨 보세요. 일곱 음을 모두 평가하면 다음으로 가요.':
    'Press C together with another note. Listen to how they blend, look at the wave pattern, then give it a star rating. Rate all seven notes and we move on.',
  '아무 순서나 괜찮아요 · 정답은 없어요 — 내 귀가 기준! 별점을 주면 그 음의 진동수 비가 열려요':
    'Any order is fine · there is no right answer — your ears decide! Rate a note and its frequency ratio opens up',
  '도와 {{hxName}}의 어울림 — 내 귀에는': 'How C and {{hxName}} blend — to my ears',
  '5점 만점에 몇 점': 'out of five',
  '{{s.n}}점': '{{s.n}} stars',
  '▶ 도+{{m.n}}': '▶ C+{{m.n}}',
  '{{m.n}} {{s.n}}점': '{{m.n}} {{s.n}} stars',
  '건반을 눌러 도와의 어울림을 들어 보세요!': 'Press a key and hear how it blends with C!',
  '도 혼자 울려요 — 기준음(★)이에요. 다른 건반을 눌러 함께 들어 보세요!':
    'C on its own — this is the reference note (★). Press another key to hear them together!',
  '도 : ': 'C : ',
  '도와 ': 'C and ',
  ' 함께 울려요 — 아래 물결 무늬를 관찰해 보세요!': ' ringing together — watch the wave pattern below!',
  '(도) 초록 물결 ': '(C) green wave ',
  '번 + (': ' times + (',
  ') 주황 물결 ': ') orange wave ',
  '번마다 반복되는 무늬가 생겨요!': ' times — and a pattern appears that repeats!',
  '두 물결이 만드는 무늬가 얼마나 자주 반복되나요? 잘 보고 별점을 매겨 봐요!':
    'How often does the pattern the two waves make repeat? Look closely, then give it stars!',
  '설명이 끝난 뒤에 눌러 주세요': 'Please wait until the speaking has finished',
  '지금 누르면 소리가 겹쳐 잘 들리지 않아요.': 'Press it now and the sounds overlap so you cannot hear it well.',
  '별점 저장! ⭐': 'Rating saved! ⭐',
  '의 진동수 비가 열렸어요. 건반을 다시 눌러 확인하고, 아직 안 들어 본 음도 눌러 봐요!':
    ' has its frequency ratio open now. Press the key again to check, and try the notes you have not heard yet!',
  '일곱 음 모두 평정 완료! ⭐': 'All seven notes rated! ⭐',
  '⭐ 일곱 음 모두 평정 완료!': '⭐ All seven notes rated!',
  '건반 아래에 진동수의 비가 전부 열렸어요. 다시 눌러 확인해 보고, 다음으로 가요!':
    'Every frequency ratio under the keys is open now. Press to check them, then move on!',
  '잠깐! 아직 별점을 안 준 음이 있어요. 각 음을 눌러 도와 함께 들어 보고, 별점을 매겨 주세요. 정답은 없어요, 내 귀가 기준이에요!':
    'Hold on! Some notes still have no stars. Press each one, hear it with C, and rate it. There is no right answer — your ears decide!',
  '평정한 음 ': 'Notes rated ',

  /* 별점으로 방 만들기 */
  '🤔 별을': '🤔 If you put the notes',
  '비슷하게 준 음들끼리': 'you gave similar stars to',
  '모아 보면,': 'together,',
  '같은 방에': 'which notes',
  '어떤 음들': 'would end up',
  '이 모이게 될까요?': 'in the same room?',
  '⭐ 내 별점으로 방 만들기!': '⭐ Build the rooms from my ratings!',
  '(없음)': '(none)',
  '내가 매긴 별점을 모아 봤어요. 별을 비슷하게 준 음들끼리 모아 보면, 같은 방에 어떤 음들이 모이게 될까요?':
    'Here are all your ratings together. If you group the notes you gave similar stars to, which ones end up in the same room?',
  '별점이 방을 만들었어요! 점수가 높은 방의 음들을 눌러서 들어보고, 점차 점수가 낮은 방의 음도 들어보세요. 어떤 음들이 잘 어울리게 들리나요? 그 이유를 아래에서 골라 보세요.':
    'Your stars built the rooms! Listen to the notes in the high-scoring room first, then work your way down to the lower ones. Which notes blend well? Choose the reason below.',
  '점수가 높은 방의 음들을 눌러서 들어보고, 점차 점수가 낮은 방의 음도 들어보세요. 음을 누르면 그 화음의 물결 그래프가 함께 나타나요.':
    'Listen to the notes in the high-scoring room, then work down to the lower ones. Press a note and the wave graph for that chord appears with it.',
  '⭐ 높은 방': '⭐ High room',
  '⭐ 높은 방 (4~5점)': '⭐ High room (4–5 stars)',
  '🙂 보통 방': '🙂 Middle room',
  '🙂 보통 방 (3점)': '🙂 Middle room (3 stars)',
  '😖 낮은 방': '😖 Low room',
  '😖 낮은 방 (1~2점)': '😖 Low room (1–2 stars)',
  '두 음의 진동수 비가 간단하여,': 'because the frequency ratio of the two notes is simple,',
  '그래프 규칙이 자주 만들어질수록 화음이 잘 어울린다.':
    'and the more often the graph pattern comes round, the better the chord blends.',
  '모두 높은 음이라서 잘 어울린다': 'they blend because they are all high notes',
  '건반에서 도와 멀리 있어서 잘 어울린다': 'they blend because they are far from C on the keyboard',
  '도′(높음)도 레(낮음)도 있는지 확인해 봐요 — 음의 높이만으로는 설명이 안 돼요!':
    'Check whether C′ (high) and D (low) are both in there — pitch alone does not explain it!',
  '파와 솔은 도에서 멀지 않은데도 잘 어울려요 — 거리로는 설명이 안 돼요!':
    'F and G are not far from C and they still blend well — distance does not explain it either!',
  '발견! 비가 간단할수록 잘 어울려요. 이제 각 음의 진동수 비를 열어 봤어요. 내 방과 비교해 보세요!':
    'A discovery! The simpler the ratio, the better they blend. Every frequency ratio is open now — compare them with your own rooms!',
  '발견! 비가 간단할수록 잘 어울려요': 'A discovery! The simpler the ratio, the better they blend',
  '이제 각 음의 진동수 비를 열어 봤어요 — 내 방과 비교해 보세요!':
    'Every frequency ratio is open now — compare them with your own rooms!',

  /* 기준 분류 */
  '🏷️ 음정에 따른 분류 보기': '🏷️ See how musicians sort them',
  '완전음정 방': 'Perfect intervals',
  '1·4·5·8도': 'unison, 4th, 5th, octave',
  '장음정 방': 'Major intervals',
  '2·3·6·7도': '2nd, 3rd, 6th, 7th',
  '장음정 · 비가 간단한 방': 'Major intervals · simpler ratios',
  '장음정 · 비가 복잡한 방': 'Major intervals · more complex ratios',
  '⭐ 내가 나눈 방': '⭐ The rooms I made',
  '여러분이 나눈 방과 어떤 점이 같고 다른가요?': 'How are they the same as your rooms, and how are they different?',
  '먼저 별점 방 만들기를 해 보세요. 내가 나눈 방이 여기에 나타나요.':
    'Build your star rooms first and they will appear here.',
  '먼저 아주 잘 어울리는 완전음정 방과, 장음정 방으로 나눠 볼게요.':
    'First we split off the perfect intervals, which blend especially well, from the major ones.',
  '이제 장음정 방을 비가 간단한 방과 복잡한 방으로 다시 나눠요.':
    'Now we split the major intervals again, into simpler ratios and more complex ones.',
  '기준 분류가 완성됐어요! 여러분이 별점으로 나눈 방과 비교해 보세요. 어떤 점이 같고 다른가요?':
    'The standard sorting is complete! Compare it with the rooms your stars made. What is the same, and what is different?',
  '잘 어울리는 정도로 먼저 크게 나눠요': 'First a big split by how well they blend',
  '장음정 방을 다시 둘로 나눠요': 'Now the major intervals split in two',
  '완성! 아래의 내가 나눈 방과 비교해 보세요': 'Done! Compare it with your own rooms below',
  '⏳ 분류 중…': '⏳ Sorting…',
  '↺ 다시 보기': '↺ Watch again',
  '▶ 분류 시작': '▶ Start sorting',
  '잘 들어 보세요…': 'Listen carefully…',
  '분류 과정을 한 번 보면 다음으로 갈 수 있어요': 'Watch the sorting through once and you can go on',
  '음정 표 완성! 도부터 한 옥타브 높은 도까지 다 들어봤어요. 1 대 2, 2 대 3, 3 대 4처럼 비가 간단할수록 두 소리가 더 잘 어울려요!':
    'The interval table is complete! You have heard everything from C up to the C an octave higher. The simpler the ratio — 1 to 2, 2 to 3, 3 to 4 — the better the two sounds blend!',
  '▶ 분류 시작을 눌러 기준 분류를 한 번 보고, 내가 나눈 방과 비교해 보세요':
    'Press ▶ Start sorting to watch the standard sorting once, then compare it with your own rooms',

  /* 실제 음악 설명 */
  '🎼 실제 음악에서는': '🎼 In real music,',
  '파(3:4)·솔(2:3)·도′(1:2)': 'F (3:4), G (2:3) and C′ (1:2)',
  '을 잘 어울리는 음정으로 보고,': ' count as intervals that blend well, and are called',
  '완전 음정': 'perfect intervals',
  '이라고 해요.': '.',
  '미(4:5)·라(3:5)': 'E (4:5) and A (3:5)',
  '도 잘 어울리는 느낌이죠? 반면에': ' blend nicely too, do they not? On the other hand,',
  '레(8:9)·시(8:15)': 'D (8:9) and B (8:15)',
  '는 잘 어울리지 않아요.': ' do not blend well.',
  '여러분의 느낌도 이와 비슷했나요?': 'Did your ears say something similar?',
  '사람마다 조금씩은 다를 수 있어요!': 'It can differ a little from person to person!',
  '처럼': 'Just like',
  '비가 간단할수록': 'the simpler the ratio,',
  '두 소리가': 'the better the two sounds',
  '더 잘 어울려요': 'blend together',

  /* 리듬 */
  '잘 어울리는 두 음의 비밀은 진동수의 비가 간단하다는 것까지 알아봤어요.':
    'So far you have found that notes blend well when their frequency ratio is simple.',
  '그런데 왜 하필 간단한 비여야 잘 어울릴까요?': 'But why should a simple ratio be the one that blends?',
  '저와 함께 리듬을 듣고, 보고, 만들면서 그 이유까지 찾아봐요!':
    'Come with me — we will listen to rhythms, look at them, build them, and find the reason.',
  '리듬 실험실로! →': 'To the rhythm lab! →',
  '먼저 아무것도 알려 주지 않고 리듬을 들려줄게요. 북만, 트라이앵글만, 그리고 함께 들어 보고 두 소리가 잘 맞아떨어지는지 느껴 보세요.':
    'First, a rhythm with nothing explained. Listen to the drum alone, the triangle alone, and then both together, and feel whether they lock in with each other.',
  '🥁 북 · 🔺 트라이앵글 — 귀가 먼저예요': '🥁 Drum · 🔺 Triangle — ears first',
  '북': 'Drum',
  '트라이앵글': 'Triangle',
  '무음': 'silence',
  ' 스케줄(t0 기준 초):': ' schedule (seconds from t0):',
  '🥁 북만 듣기': '🥁 Drum only',
  '🔺 트라이앵글만 듣기': '🔺 Triangle only',
  '▶ 함께 듣기': '▶ Both together',
  '🎧 지금은 소리만 — 두 소리가 잘 맞아떨어지는지 귀로 느껴 보세요':
    '🎧 Sound only for now — use your ears to feel whether the two lock in together',
  '🥁 북': '🥁 Drum',
  '🔺 트라이앵글': '🔺 Triangle',
  '🤔 함께 들으니 어떻던가요? 정답은 없어요 — 내 귀가 기준!':
    '🤔 How was it with both together? There is no right answer — your ears decide!',
  '🙂 딱딱 잘 맞아떨어져요': '🙂 They lock in neatly',
  '😕 자꾸 어긋나는 것 같아요': '😕 They keep slipping out of step',
  '북만, 트라이앵글만, 그리고 함께 — 세 가지를 모두 들어 보세요.':
    'Drum alone, triangle alone, and both together — listen to all three.',
  '북만, 트라이앵글만, 함께 — 세 가지를 다 들어 보세요': 'Drum alone, triangle alone, both — listen to all three',
  '잘 들었나요? 느낌을 골라 봐요.': 'Did you hear it? Choose how it felt.',
  '아직 비는 알려 주지 않았어요 — 먼저 귀로 들어 봐요!': 'No ratios yet — listen with your ears first!',
  '좋아요. 이제 칸을 보면서, 북과 트라이앵글이 각각 몇 칸마다 울리는지 세어 보세요.':
    'Good. Now look at the beats and count how often the drum and the triangle each sound.',
  '🔍 칸을 세어 봐요 — 각 악기는 몇 칸마다 울리나요?':
    '🔍 Count the beats — how many beats between each instrument’s sounds?',
  '칸을 세어 보세요 — 각 악기는 몇 칸마다 울리나요?': 'Count the beats — how many between each instrument’s sounds?',
  '두 악기가 몇 칸마다 울리는지 세어 보세요': 'Count how many beats apart each instrument sounds',
  '🥁 북은': '🥁 The drum every',
  '🔺 트라이앵글은': '🔺 The triangle every',
  '칸마다': ' beats',
  '칸마다 : 🔺 ': ' beats : 🔺 ',
  '칸마다 → ': ' beats → ',
  '찾았다! ': 'Found it! ',
  '북은 ': 'The drum sounds every ',
  '칸마다, 트라이앵글은 ': ' beats, the triangle every ',
  '칸마다 울려요 — 이 리듬에 숨은 비예요!': ' beats — that is the ratio hidden in this rhythm!',
  '울린 칸에는 악기 그림이 놓여 있어요. 처음 울린 칸부터 그다음 울린 칸까지 몇 칸을 건너뛰나요?':
    'Every beat that sounds has an instrument on it. From the first one to the next, how many beats do you skip?',
  '한 악기만 다시 들어 볼까요? 소리가 날 때 켜지는 칸만 눈으로 따라가면 간격이 보여요.':
    'Shall we listen to just one instrument again? Follow only the beats that light up and the gap becomes clear.',
  '울린 칸의 번호를 차례로 적어 보세요. 번호가 몇씩 커지는지 보면 몇 칸마다인지 알 수 있어요.':
    'Write down the numbers of the beats that sound. See how much the numbers go up by and you have the gap.',
  '🎯 두 소리가 같은 칸에서 함께 울리는 곳: ': '🎯 Beats where both sound together: ',
  '칸, ': ' — they meet again every ',
  '칸마다 다시 만나요!': ' beats!',
  '재생을 눌러 두 소리가 언제 다시 만나는지 들어 봐요!': 'Press play and hear when the two meet again!',
  '들어 보세요': 'Have a listen',

  /* 같은 비를 다시 만나기 */
  '같은 1 : 2예요!': 'The same 1 : 2!',
  '화음에서 도와 한 옥타브 높은 도의 진동수 비가 1 : 2였어요 — 그 비가 리듬으로도 나타났어요.':
    'In the chord, C and the C an octave higher had a frequency ratio of 1 : 2 — and that same ratio has turned up in the rhythm.',
  '같은 2 : 3이에요!': 'The same 2 : 3!',
  '화음에서 도와 솔의 진동수 비가 2 : 3이었어요 — 그 비가 리듬으로도 나타났어요.':
    'In the chord, C and G had a frequency ratio of 2 : 3 — and that same ratio has turned up in the rhythm.',
  '🔗 같은 비를 또 만났어요': '🔗 The same ratio again',
  '🔗 리듬에서 찾은 비를 화음으로 확인해요': '🔗 Checking the rhythm ratio against the chord',
  '🎹 화음 — 도 : 솔 = 264Hz : 396Hz = ': '🎹 Chord — C : G = 264Hz : 396Hz = ',
  '도가 2번 떨리는 동안 솔은 3번 떨려요. 그래서 짧은 주기로 자꾸 다시 만나지요 — 리듬에서 두 소리가 6칸마다 다시 만난 것과 똑같아요.':
    'While C shakes twice, G shakes three times. That is why they keep meeting again so soon — exactly like the two sounds meeting every 6 beats in the rhythm.',
  '🎨 색깔 방에서 만든 빨강 2 : 노랑 3도 같은 비였어요. 물감의 양에서도, 소리의 떨림에서도 2 : 3이에요 — 재료는 달라도 비는 같아요.':
    '🎨 The red 2 : yellow 3 you made in the Color room was this ratio too. Amounts of paint, shaking of sound — 2 : 3 in both. Different stuff, same ratio.',
  '내가 솔에 준 별점: ': 'The stars I gave G: ',
  '🎹 도와 솔 함께 듣기': '🎹 Hear C and G together',
  '🥁 리듬으로 다시 듣기': '🥁 Hear it as rhythm again',
  '🎹 도와 한 옥타브 높은 도의 진동수 비 = ': '🎹 Frequency ratio of C and the C an octave higher = ',
  '눌러서 화음으로도, 리듬으로도 들어 보세요. 두 소리는 두 칸마다 다시 만나요.':
    'Press to hear it as a chord and as a rhythm. The two meet again every two beats.',
  '🎹 도와 높은 도 함께 듣기': '🎹 Hear C and high C together',
  '우리가 찾은 2 : 3 — 어디에서 만난 비일까요?': 'The 2 : 3 you found — where have you met this ratio before?',
  '🎹 화음에서 도와 솔의 진동수 비': '🎹 The frequency ratio of C and G in the chord',
  '📏 하프에서 라 줄의 길이': '📏 The length of the A string on the harp',
  '하프에서는 줄 하나의 길이를 나누었어요. 지금은 두 소리가 함께 울릴 때의 비를 찾고 있어요.':
    'On the harp you divided the length of a single string. Right now we are after the ratio of two sounds ringing together.',
  '✨ 오늘 처음 보는 비': '✨ A ratio I am seeing for the first time today',
  '별점을 매기며 만난 진동수 비 표를 떠올려 볼까요? 그 안에 2 : 3이 있었어요.':
    'Think back to the table of frequency ratios you met while rating. 2 : 3 was in there.',
  '우리가 찾은 2 : 3 — 앞에서 어디에서 만난 비일까요? (맞는 곳이 둘이에요)':
    'The 2 : 3 you found — where have you met it before? (There are two right answers)',
  '🎨 색깔 방에서 만든 빨강 : 노랑': '🎨 The red : yellow you made in the Color room',
  '색깔 방에서도 만난 2 : 3이에요!': 'The very 2 : 3 you met in the Color room!',
  '빨강 2 : 노랑 3으로 주황을 만들었지요 — 물감의 양에서 찾은 그 비가 소리에서도 똑같이 나타났어요. 소재는 달라도 비는 같아요.':
    'You made orange with red 2 : yellow 3. The ratio you found in amounts of paint has turned up in sound as well. Different material, same ratio.',
  '진동수 비 표와 색깔 방에서 만든 주황을 함께 떠올려 볼까요? 둘 다 2 : 3이었어요.':
    'Think of the frequency table and the orange you made in the Color room together. Both were 2 : 3.',
  '우리가 찾은 1 : 2 — 어디에서 만난 비일까요?': 'The 1 : 2 you found — where have you met this ratio before?',
  '🎹 화음에서 도와 한 옥타브 높은 도의 진동수 비': '🎹 The frequency ratio of C and the C an octave higher',
  '도와 솔은 2 : 3이었어요. 앞에서 별점을 매긴 표를 다시 떠올려 볼까요?':
    'C and G were 2 : 3. Shall we look back at the table you rated?',
  '진동수 비 표에서 가장 간단한 비가 무엇이었는지 떠올려 볼까요?':
    'Which was the simplest ratio in the frequency table? Think back.',
  '같은 ': 'The same ',
  '이 화음에도, 리듬에도 있었어요!': ' was there in the chord and in the rhythm!',
  '이 비를 앞에서 어디서 만났는지 떠올려 봐요!': 'Think back to where you met this ratio before!',
  '이 비를 앞에서 만난 곳을 고르면 완료!': 'Choose where you met this ratio before and you are done!',
  ' — 화음에서도 만난 비예요': ' — the very ratio you met in the chord',

  /* 세 리듬 견주기 */
  '여러 리듬을 차례로 들어 보세요. 두 소리가 다시 만나기까지 몇 칸이 걸리는지, 어떤 리듬일 때 두 소리가 자주 만나는지 비교해보세요. 왜 간단한 비가 잘 어울리는지 보일 거예요.':
    'Listen to the rhythms one after another. Compare how many beats it takes for the two sounds to meet again, and which rhythm brings them together most often. You will see why a simple ratio blends.',
  '세 리듬의 만나는 칸을 비교해요': 'Compare where the three rhythms meet',
  '세 리듬을 모두 들어 보세요. 두 소리가 다시 만나는 칸이 어떻게 달라지나요?':
    'Listen to all three rhythms. How does the beat where the two meet again change?',
  '세 리듬을 차례로 들으며, 다시 만나는 칸을 견주어 봐요!':
    'Listen to the three rhythms in turn and compare where they meet again!',
  '세 리듬을 모두 들어 보세요': 'Listen to all three rhythms',
  '세 리듬을 다 들었어요! 무엇을 알 수 있는지 골라 봐요.': 'You have heard all three! Choose what it tells you.',
  '세 리듬을 견주어 알 수 있는 것을 골라요': 'Choose what comparing the three rhythms tells you',
  '🤔 세 리듬을 견주어 보면 무엇을 알 수 있나요?': '🤔 What does comparing the three rhythms tell you?',
  '비가 간단할수록 두 소리가 더 빨리 다시 만나요': 'The simpler the ratio, the sooner the two sounds meet again',
  '비가 복잡할수록 더 빨리 다시 만나요': 'The more complex the ratio, the sooner they meet again',
  '8 : 9는 비가 가장 복잡했는데, 12칸 안에서 한 번도 만나지 못했어요. 다시 비교해 볼까요?':
    '8 : 9 was the most complex ratio, and it never met once inside 12 beats. Shall we compare again?',
  '다시 만나는 것은 비와 상관없어요': 'Meeting again has nothing to do with the ratio',
  '1 : 2와 8 : 9의 만나는 칸을 나란히 놓고 견주어 볼까요? 두 리듬이 아주 달랐어요.':
    'Shall we set 1 : 2 and 8 : 9 side by side and compare where they meet? The two rhythms were very different.',
  '이렇게 정리했어요': 'Here is what it came to',
  '1 : 2는 두 칸마다, 2 : 3은 여섯 칸마다 — 8 : 9는 열두 칸 안에서 한 번도 만나지 못했어요.':
    '1 : 2 meets every two beats, 2 : 3 every six — and 8 : 9 never met once in twelve.',
  '진동수도 똑같아요. 비가 간단할수록 두 떨림이 더 빨리 다시 만나서, 귀에 잘 어울리게 들려요.':
    'Frequencies work the same way. The simpler the ratio, the sooner the two vibrations meet again, and the better they sound to your ears.',
  '여러분도 솔(2 : 3)에 ': 'You gave G (2 : 3) ',
  ', 레(8 : 9)에 ': ', and D (8 : 9) ',
  '을 주었지요!': ' yourself!',
  '실제 음악에서도 2 : 3인 솔은 잘 어울리는 음, 8 : 9인 레는 잘 어울리지 않는 음으로 꼽혀요!':
    'In real music too, G at 2 : 3 counts as a note that blends and D at 8 : 9 as one that does not!',
  '🔎 간단한 비일수록 빨리 다시 만나요': '🔎 The simpler the ratio, the sooner they meet again',
  '비가 간단할수록 두 소리가 빨리 다시 만나요 — 다음으로 가요!':
    'The simpler the ratio, the sooner the two sounds meet again — on we go!',
  '▶ 듣기': '▶ Listen',
  ' 대 ': ' to ',
  ' 리듬 듣기': ' rhythm',
  '(화음의 ': '(the chord’s ',

  /* 내가 정한 간격 */
  '이번에는 여러분이 직접 간격을 정해 봐요. 북과 트라이앵글이 몇 칸마다 울릴지 골라 재생하면, 두 소리가 몇 칸마다 다시 만나는지 알 수 있어요. 한 번 시도해 보고 다음으로 가요.':
    'Now you set the gaps. Choose how many beats apart the drum and the triangle sound, press play, and you will see how often the two meet again. Try it once and we move on.',
  '🎛️ 내가 정한 간격 — 한 번 시도해 봐요': '🎛️ My own gaps — give it one try',
  '🎛️ 내가 정한 간격으로 만들기 — 두 소리가 만나는 칸을 확인했어요':
    '🎛️ Building with my own gaps — you have seen where the two meet',
  '🎛️ 내가 정한 간격으로 만들기 — 두 소리는 몇 칸마다 만날까요?':
    '🎛️ Building with my own gaps — how many beats apart do the two meet?',
  '북과 트라이앵글의 간격을 하나씩 골라 보세요!': 'Choose a gap for the drum and one for the triangle!',
  '북과 트라이앵글이 몇 칸마다 울릴지 하나씩 골라 봐요.':
    'Choose how many beats apart the drum and the triangle each sound.',
  '간격을 고르고 한 번 재생하면 다음으로 갈 수 있어요': 'Choose the gaps, play it once, and you can go on',
  '▶ 내 리듬 재생': '▶ Play my rhythm',
  '내 ': 'My ',
  '칸마다 다시 만나요 (': ' beats they meet again (',
  '칸)': ' beats)',
  ' → 12칸 안에서는 만나지 못해요 (': ' → they never meet inside 12 beats (',
  '칸을 가야 만나요)': ' beats before they would meet)',
  '칸에서 함께! — ': ' they ring together! — every ',
  '칸마다 다시 만나요': ' beats they meet again',
  '❌ 12칸 안에서는 한 번도 만나지 못해요 (': '❌ They never meet once inside 12 beats (',
  '✅ 완료! 아래에서 간격을 바꿔 더 만들어 보고 다음으로 가요':
    '✅ Done! Change the gaps below and make a few more, then move on',
  '🤔 방금 만든 리듬을 짚어 볼까': '🤔 Let us look back at the rhythm you just made',
  '두 소리가 다시 만나는 칸을 어떻게 찾았나요?': 'How did you find the beat where the two meet again?',
  '북과 트라이앵글의 간격을 정하고 재생해서 만나는 칸을 세었어요':
    'I set the gaps for the drum and the triangle, played it, and counted where they met',
  '소리를 듣지 않고 숫자만 골랐어요': 'I just picked numbers without listening',
  '귀로 듣고 눈으로 세어 보아야 언제 다시 만나는지 알 수 있어요. 한 번 더 재생해 볼까요?':
    'You have to listen and count to know when they meet again. Shall we play it once more?',
  '왜 어떤 간격에서는 두 소리가 더 자주 만났을까요?': 'Why did some gaps make the two meet more often?',
  '두 간격의 비가 간단할수록 더 빨리 다시 만나기 때문이에요':
    'Because the simpler the ratio of the two gaps, the sooner they meet again',
  '간격이 짧을수록 무조건 자주 만나기 때문이에요': 'Because shorter gaps always mean meeting more often',
  '3칸과 4칸보다 2칸과 4칸이 더 빨리 만났지요. 간격의 길이만으로는 정해지지 않아요.':
    '2 and 4 met sooner than 3 and 4. The length of the gaps alone does not decide it.',
  '내가 정한 두 간격을 기호로 나타내면 어느 것일까요?': 'Which symbols show the two gaps you chose?',
  '북의 칸 수 : 트라이앵글의 칸 수': 'drum beats : triangle beats',
  '북의 칸 수 ＋ 트라이앵글의 칸 수': 'drum beats ＋ triangle beats',
  '두 수를 더한 값이에요. 우리가 한 일은 두 간격을 견주어 본 것이지요?':
    'That is the two numbers added together. What we did was compare the two gaps, was it not?',
  '북의 칸 수 － 트라이앵글의 칸 수': 'drum beats － triangle beats',
  '두 수의 차예요. 우리가 한 일은 두 간격을 견주어 본 것이지요?':
    'That is the difference between them. What we did was compare the two gaps, was it not?',

  /* 묶어 세기 */
  '🧺 12칸을 다른 단위로 다시 세어 봐요': '🧺 Count the 12 beats again in different units',
  '칸씩 묶기': '-beat bundles',
  '묶음 풀기': 'Undo the bundles',
  '칸 단위로 세니 12 ÷ ': '-beat units, so 12 ÷ ',
  '번!': ' times!',
  ' 단위가 커질수록 횟수가 줄어요.': ' The bigger the unit, the fewer the times.',
  '풀면 다시 낱칸 12개!': 'Undo them and you are back to 12 single beats!',
  '낱칸 12개 — 버튼으로 묶어 보세요': '12 single beats — use the buttons to bundle them',
  '지금은 낱칸 12개예요 — 먼저 버튼을 눌러 묶어 볼까요?':
    'Right now there are 12 single beats — shall we press a button and bundle them first?',
  '단위가 커지면 횟수가 줄어요!': 'A bigger unit means fewer times!',
  '12칸을 2칸 단위로 세면 6번, 3칸이면 4번, 4칸이면 3번, 6칸이면 2번. 단위가 커질수록 세는 횟수가 줄어요!':
    'Counting 12 beats in twos gives 6, in threes gives 4, in fours gives 3, in sixes gives 2. The bigger the unit, the fewer the counts!',
  '단위가 커지면 횟수가 줄어요 — 6은 2로도 3으로도 딱 묶여요!':
    'A bigger unit means fewer counts — and 6 bundles neatly into twos and into threes!',
  '12칸을 2칸 단위·3칸 단위로 다시 세어 보고, 풀기까지 해 봐요!':
    'Count the 12 beats in twos and in threes, and try undoing them too!',
  '2칸씩·3칸씩 묶고, 풀기까지 하면 완료!': 'Bundle in twos, in threes, and undo them — then you are done!',
  '✅ 확인했어요 — 다음으로 가요': '✅ Checked — on we go',

  /* 하프 */
  '리듬으로 비를 잘 느껴봤나요? 재밌죠? 이번에는 비율을 이용해서 악기를 만들어보려고 해요. 먼저 줄을 길게, 짧게 조절해 보면서 소리가 높아지는지 낮아지는지 알아보세요.':
    'Did the rhythms give you a feel for ratio? Fun, was it not? Now we are going to build an instrument using ratio. First make the string longer and shorter and find out whether the sound goes up or down.',
  '슬라이더를 움직이면 소리가 따라와요 — 기준 라와 함께 들어 어울리는 자리를 찾아보세요!':
    'The sound follows the slider — listen alongside the reference A and find the spot where it fits!',
  '줄 길이': 'String length',
  '(진동수 {{slF}}Hz)': '(frequency {{slF}}Hz)',
  '♪ 줄 뜯기': '♪ Pluck the string',
  ' 줄 뜯기': ' — pluck it',
  '함께 줄이기 ←': '← Shorten both',
  '두 줄 함께 조절': 'Adjust both strings together',
  '→ 함께 늘리기': 'Lengthen both →',
  '분수 :': 'fraction:',
  '소수 :': 'decimal:',
  '백분율 :': 'per cent:',
  '길이는': 'The lengths change to',
  '로 달라져도 비는 늘': 'but the ratio stays',
  '— 튕겨 보면': '— pluck them and',
  '어울림도 그대로': 'they blend just the same',
  '예요!': '!',
  '♪ 두 줄 함께 뜯기': '♪ Pluck both strings',
  '🔊 기준 라 줄(72cm) 듣기': '🔊 Hear the reference A string (72cm)',
  '♪ 내 줄 뜯어 확인하기': '♪ Pluck my string and check',
  '🎵 라와 함께 듣기': '🎵 Hear it with A',
  '하프 줄 길이': 'Harp string length',
  '내 줄 길이 : 라 줄 72cm(기준)': 'my string : the A string, 72cm (reference)',
  '긴 줄 : 짧은 줄': 'long string : short string',
  '(기준 라 ★)': '(reference A ★)',
  '(아주 높은 소리!)': '(a very high sound!)',
  '(높은 소리!)': '(a high sound!)',
  '(아주 낮은 소리!)': '(a very low sound!)',
  '(낮은 소리!)': '(a low sound!)',
  '라 음 440Hz는 악기를 조율하는 기준 음이에요. ': 'A at 440Hz is the note instruments are tuned to. ',
  '라 줄이 72센티미터일 때 ': 'If the A string is 72 centimetres, how many centimetres is the ',
  ' 줄은 몇 센티미터일까요? 슬라이더를 움직여 소리를 들으며 찾아보세요.':
    ' string? Move the slider, listen, and find it.',
  '하프 공방 1부 · 귀로 찾기 ': 'Harp workshop, part 1 · finding it by ear ',
  ' · 72cm를 기준으로 몇 칸인지도 확인해요': ' · check how many parts of the 72cm it takes, too',
  '이번에는 귀 대신 칸으로 구해 봐요. ': 'This time work it out in parts instead of by ear. The ',
  ' 줄은 ': ' string: out of ',
  '칸 중 ': ' parts it takes ',
  '칸이에요. 72센티미터를 ': ' of them. Divide 72 centimetres into ',
  '등분하면 한 칸은 몇 센티미터일까요? 한 칸을 먼저 구하고, 그 다음 ':
    ' equal parts — how many centimetres is one part? Find one part first, then work out the length of ',
  '칸의 길이를 구해 보세요.': ' of them.',
  '하프 공방 2부 · 칸으로 계산하기 ': 'Harp workshop, part 2 · working it out in parts ',
  '🎯 {{harpN}} 자리': '🎯 the {{harpN}} spot',
  '🎯 귀로 찾은': '🎯 Found by ear —',
  '줄은': 'the string is',
  '{{harpB}}칸 중 {{harpA}}칸': '{{harpA}} of {{harpB}} parts',
  '이에요!': '!',
  '72cm를': 'Divide 72cm into',
  '{{harpB}}등분': '{{harpB}} parts',
  '하면 → 한 칸 = 72 ÷ {{harpB}} =': ' → one part = 72 ÷ {{harpB}} =',
  '그 한 칸이': 'and that one part taken',
  '{{harpA}}칸': '{{harpA}} times',
  '이니까 → {{harpUnit}} × {{harpA}} =': ' → {{harpUnit}} × {{harpA}} =',
  '❓ 왜 라보다 짧아질까?': '❓ Why is it shorter than A?',
  '2부 ·': 'Part 2 ·',
  '칸으로 계산하기': 'working it out in parts',
  '— 이번엔 귀 대신': '— this time not by ear but in',
  '칸': 'parts',
  '으로 구해요. {{harpN}} 줄은': '. The {{harpN}} string is',
  '높은 소리': 'A higher sound',
  '일수록 줄은 왜 짧아질까?': ' — why is its string shorter?',
  '라 ★': 'A ★',
  '떨리는 빠르기 (진동수)': 'how fast it shakes (frequency)',
  '라 : {{harpN}} = {{harpA}} : {{harpB}}': 'A : {{harpN}} = {{harpA}} : {{harpB}}',
  '줄의 길이': 'string length',
  '라 : {{harpN}} = {{harpB}} : {{harpA}}': 'A : {{harpN}} = {{harpB}} : {{harpA}}',
  '↑ 두 비는 숫자가': '↑ The numbers in the two ratios are',
  '뒤집혀': 'the other way round',
  '있어요 (거꾸로 관계)': ' (an inverse relationship)',
  '{{harpN}} 줄은 라보다': 'The {{harpN}} string is',
  '예요. 높은 소리는 빨리 떨리니까 줄은 더': ' than A. A higher sound shakes faster, so the string has to be',
  '짧아야': 'shorter',
  '해요.': '.',
  '그래서 답도 72보다': 'And so the answer is',
  '작은': 'smaller',
  '값이 나와요!': ' than 72!',
  '{{harpN}} 줄의 길이 = 72 × {{harpA}}/{{harpB}} =': '{{harpN}} string length = 72 × {{harpA}}/{{harpB}} =',
  '🎯 귀로 찾았어요! ': '🎯 Found by ear! ',
  '칸 — ': ' parts — ',
  'cm예요.': 'cm.',
  ' 줄 완성! ': ' string done! ',
  '72cm를 ': 'Divide 72cm into ',
  '등분하면 한 칸이 ': ' parts and one part is ',
  'cm — 그 ': 'cm — and ',
  '칸이 ': ' parts make ',
  'cm예요!': 'cm!',
  '귀로 찾았어요! 72센티미터를 ': 'Found by ear! Divide 72 centimetres into ',
  '센티미터, 그 ': ' centimetres, and ',
  '센티미터예요.': ' centimetres.',
  '줄이 길수록 낮은 소리, 짧을수록 높은 소리였어요. 목표 소리와 내 줄 소리를 번갈아 들어 볼까요?':
    'A longer string was a lower sound, a shorter one higher. Shall we listen to the target and your string one after the other?',
  '목표보다 내 소리가 낮게 들리죠? 조금 더 짧게 움직여 볼까요?':
    'Your sound is lower than the target, is it not? Shall we make it a little shorter?',
  '목표보다 내 소리가 높게 들리죠? 조금 더 길게 움직여 볼까요?':
    'Your sound is higher than the target, is it not? Shall we make it a little longer?',
  '눈금을 보면서 한 칸씩 옮겨 보세요. 한 칸 움직일 때마다 소리가 얼마나 달라지는지 들으면 찾기 쉬워요.':
    'Watch the scale and move one part at a time. Hearing how much the sound changes each step makes it easier to find.',
  '한 칸을 찾았어요! ': 'You found one part! ',
  'cm — 그럼 ': 'cm — so how many cm is ',
  '칸은 몇 cm일까요?': ' parts?',
  '좋아요! 72센티미터를 ': 'Good! Divide 72 centimetres into ',
  '등분했으니 한 칸은 ': ' parts, so one part is ',
  '센티미터예요. 그럼 ': ' centimetres. So how many centimetres is ',
  '칸은 몇 센티미터일까요?': ' parts?',
  '칸은 ': ' parts is ',
  'cm짜리 한 칸이 ': 'One part of cm, taken ',
  '칸 — 이제 이 계산을 곱셈식 하나로 써 볼까요?': ' times — shall we write that as a single multiplication now?',
  '맞아요! ': 'That is right! ',
  '칸이니까 ': ' parts, so that is ',
  '센티미터예요. 이번에는 같은 계산을 곱셈식 하나로 써 볼까요? 72센티미터에 어떤 분수를 곱하면 될까요?':
    ' centimetres. Now shall we write the same working as one multiplication? What fraction do you multiply 72 centimetres by?',
  ' 💡 2 : 3 — 화음의 도와 솔, 북과 트라이앵글의 리듬에서 만났던 바로 그 비예요!':
    ' 💡 2 : 3 — the very ratio you met in the C and G chord and in the drum-and-triangle rhythm!',
  '등분한 한 칸(': ' equal parts, one part (',
  'cm)이 ': 'cm) taken ',
  '칸 = 라 줄의 ': ' times, which is this much of the A string: ',
  '칸이라고 했어요. 72cm를 몇 칸으로 나누어야 할까요?':
    ' parts, we said. So how many parts should 72cm be divided into?',
  '440은 라 음의 진동수(헤르츠)예요 — 지금 구하는 건 한 칸의 길이죠? 눈금 그림을 다시 볼까요?':
    '440 is the frequency of A in hertz — what we want is the length of one part. Shall we look at the scale again?',
  '눈금 그림을 보세요. 라 줄이 몇 칸으로 나뉘어 있나요? 그 수로 72를 나누면 한 칸이 나와요.':
    'Look at the scale. How many parts is the A string divided into? Divide 72 by that number and you have one part.',
  '한 칸을 ': 'Joining one part ',
  '번 이어 붙이면 72cm가 되어야 해요. 나눗셈으로 한 칸을 먼저 구해 볼까요?':
    ' times must come to 72cm. Shall we find one part by dividing first?',
  '한 칸의 길이는 방금 구했어요. 이제 그 한 칸이 몇 칸 필요한지 세어 볼까요?':
    'You have just found the length of one part. Now shall we count how many of them are needed?',
  '은 전체를 나눈 칸 수예요 — ': ' is the number of parts the whole is divided into — how many of them does ',
  '이 차지하는 칸 수는 그중 몇 칸일까요?': ' take?',
  '눈금 그림에서 색칠된 칸만 세어 보세요. ': 'Count only the shaded parts on the scale. The ',
  '은 ': ' takes how many of the ',
  '칸 중 몇 칸인가요?': ' parts?',
  '한 칸의 길이에 칸 수를 곱하면 돼요. 한 칸을 그만큼 이어 붙인 것과 같아요.':
    'Multiply the length of one part by the number of parts. It is the same as joining that many together.',
  '식을 소리 내어 읽어 볼까요? 라 줄 72센티미터에 어떤 분수를 곱하면 ':
    'Shall we read it out loud? What fraction do you multiply the 72-centimetre A string by to get the ',
  ' 줄이 될까요?': ' string?',
  '440은 라 음의 진동수(헤르츠)예요 — 지금 구하는 건 줄의 길이죠? 길이의 비를 떠올려 볼까요?':
    '440 is the frequency of A in hertz — what we want is a length. Shall we think about the ratio of lengths?',
  '분수의 위아래가 바뀌지 않았나요? 라 : ': 'Are the top and bottom of the fraction the wrong way round? A : ',
  ' — 어느 수가 위(분자)로 갈까요?': ' — which number goes on top?',
  '방금 센 칸을 떠올려 봐요 — 전체 칸 수는 아래(분모), 차지한 칸 수는 위(분자)예요.':
    'Think of the parts you just counted — the total number goes on the bottom, the number taken goes on top.',
  ' 줄은 라보다 높은 소리니까 답이 72보다 작아야 해요. 그렇다면 곱하는 분수는 1보다 클까요, 작을까요?':
    ' string is higher than A, so the answer must be less than 72. Is the fraction you multiply by bigger or smaller than 1?',
  '🤔 방금 만든 줄을 짚어 볼까': '🤔 Let us look back at the string you just made',
  '🤔 방금 한 일을 짚어 볼까': '🤔 Let us look back at what you just did',
  '이 줄의 길이를 어떻게 구했나요?': 'How did you work out the length of this string?',
  '72센티미터를 ': 'I divided 72 centimetres into ',
  '등분해 한 칸을 구하고, 그 ': ' parts to get one part, then found the length of ',
  '칸의 길이를 구했어요': ' of them',
  '슬라이더를 아무 데나 놓고 소리만 들었어요': 'I put the slider anywhere and just listened',
  '2부는 귀 대신 칸으로 구하는 자리예요. 한 칸의 길이부터 다시 구해 볼까요?':
    'Part 2 is about working it out in parts, not by ear. Shall we start again from the length of one part?',
  '왜 줄을 짧게 하면 소리가 높아질까요?': 'Why does a shorter string give a higher sound?',
  '줄이 짧을수록 더 빠르게 떨리기 때문이에요': 'Because a shorter string shakes faster',
  '줄이 짧을수록 소리가 작아지기 때문이에요': 'Because a shorter string gives a quieter sound',
  '소리의 크기가 아니라 높이가 달라졌지요. 첫 단계에서 본 떨림을 다시 떠올려 볼까요?':
    'What changed was the pitch, not the loudness. Shall we think back to the shaking you saw in the first step?',
  '라 줄과 이 줄의 길이를 기호로 쓰면 어느 것일까요?': 'Which symbols show the length of the A string against this one?',
  '라 : ': 'A : ',
  '앞에는 라 줄의 칸 수, 뒤에는 ': 'The A string’s parts go first and the ',
  ' 줄의 칸 수를 놓아요. 순서를 다시 볼까요?': ' string’s parts second. Shall we check the order?',
  '두 길이의 차예요. 우리가 한 일은 두 길이를 견주어 본 것이지요?':
    'That is the difference between the two lengths. What we did was compare them, was it not?',
  '🎯 바로 이 자리예요! 「내 줄 뜯어 확인하기」를 눌러 보세요':
    '🎯 This is the spot! Press “Pluck my string and check”',
  '📏 내 줄은 ': '📏 Of the ',
  '칸으로 나눈 것 중 ': ' parts, my string is ',
  '칸!': '!',
  '칸으로 나눈 눈금 — 지금 내 줄은 ': ' parts on the scale — my string is now ',
  '딱 ': 'exactly ',
  '약 ': 'about ',
  '칸 — 다음으로 갈 수 있어요': ' parts — you can go on',
  '① 한 칸의 길이부터 구해요': '① Start with the length of one part',
  '② 한 칸이 ': '② If one part goes ',
  '칸이면 몇 cm일까요?': ' times, how many cm is that?',
  '③ 마지막! 곱셈식 하나로 써 봐요': '③ Last one! Write it as a single multiplication',
  '① 먼저 한 칸의 길이 — 72cm를 몇 등분?': '① One part first — 72cm into how many equal parts?',
  '② 그럼 ': '② And ',
  '칸은? — 한 칸을 몇 번 이어 붙일까?': ' parts? — how many times do you join one part?',
  '③ 이 계산을 곱셈식 하나로': '③ Now as a single multiplication',
  ' 줄의 길이 = 72 × ': ' string length = 72 × ',

  /* 그림 속 글자 */
  '의 떨림 모양 — 높은 음일수록 물결이 촘촘해요</text>':
    ' — the shape of the shaking. The higher the note, the tighter the waves</text>',
  '\">건반을 누르면 두 물결이 나타나요!</text>': '">Press a key and two waves appear!</text>',
  '\">↺ 다시 처음으로!</text>': '">↺ Back to the start!</text>',
  '\">여기까지가 한 묶음 (무늬가 한 바퀴)</text>': '">One bundle ends here (the pattern comes round)</text>',
  '도 ': 'C ',
  '번 = ': ' waves = ',
  '번': ' waves',
  '한 묶음(무늬 한 바퀴)': 'one bundle (the pattern comes round)',
  '\">도 ': '">C ',
  '번</text>': ' waves</text>',
  '\">노란 띠까지가 무늬 한 바퀴(한 묶음)예요</text>':
    '">Up to the yellow band is one turn of the pattern (one bundle)</text>',
  '\">라 줄 72cm — ': '">A string 72cm — ',
  '등분한 눈금</text>': ' equal parts</text>',
  '내 줄 = ': 'My string = ',
  '칸 (': ' parts (',
  '내 줄 — 목표: ': 'My string — target: ',
  '\">라 줄 72cm를 ': '">The 72cm A string in ',
  '등분 — 그중 ': ' parts — of which ',
  '\">한 칸 ': '">one part ',
  '칸 ': ' parts ',

  /* 두 방 잇기 */
  '잠깐만요! 색깔의 방에서 찾은 1 대 2와, 소리의 방에서 찾은 1 대 2를 나란히 놓아 봤어요. 두 방에서 찾은 것은 어떤 점이 같을까요? 아래에서 골라 보세요.':
    'Hold on a moment! Here is the 1 to 2 you found in the Color room, side by side with the 1 to 2 you found here. What do the two have in common? Choose below.',
  '🎨 색깔의 방 · 🎵 소리의 방 — 두 방에서 만난 비를 견주어요':
    '🎨 Color room · 🎵 Sound room — comparing the ratios from both',
  '🎨 색깔의 방': '🎨 The Color room',
  '1컵': '1 cup',
  '2컵': '2 cups',
  '빨강과 노랑의 양': 'amounts of red and yellow',
  '🎵 소리의 방': '🎵 The Sound room',
  '두 음의 진동수 · 한 옥타브': 'frequencies of two notes · one octave',
  '두 방에서 찾은 것은': 'What do the two rooms',
  '어떤 점이 같을까요?': 'have in common?',
  '두 방 모두 양이 달라져도 비가 같으면 결과가 같았어요':
    'In both, the amounts changed but the same ratio gave the same result',
  '맞아요! 물감의 양이 달라도 비가 1 대 2면 같은 색이었고, 진동수가 달라도 비가 1 대 2면 한 옥타브였어요. 두 방 모두 비가 정하고 있었지요.':
    'Exactly! Different amounts of paint at 1 to 2 gave the same color, and different frequencies at 1 to 2 gave an octave. In both rooms it was the ratio doing the deciding.',
  '두 방 모두 수가 클수록 더 좋아졌어요': 'In both, bigger numbers made things better',
  '물감을 많이 넣는다고 더 붉어지지 않았고, 진동수가 높다고 더 잘 어울리지도 않았지요. 다시 한번 생각해볼까요?':
    'More paint did not make it redder, and a higher frequency did not make it blend better. Shall we think again?',
  '색과 소리는 서로 상관이 없어요': 'Color and sound have nothing to do with each other',
  '두 방에서 모두 1 대 2라는 같은 비가 나왔어요. 그 점을 다시 견주어 볼까요?':
    'The very same ratio, 1 to 2, came out of both rooms. Shall we compare that again?',
  '두 방이 이어졌어요!': 'The two rooms link up!',

  /* 내 말로 정리 */
  '건반의 떨림, 잘 어울리던 두 음, 리듬이 다시 만나던 칸, 나누어 만든 하프 줄. 이 가운데 하나를 골라 봐요. 그때 무엇을 했고 왜 그런 소리가 났는지 한 줄로 적어 주세요.':
    'The shaking of the keys, the two notes that blended, the beat where the rhythms met again, the harp string you made by dividing. Pick one of them. Write one line about what you did and why it sounded the way it did.',
  '건반 · 별점 · 리듬 · 하프 — 그중 하나를 예로 들어 적어요':
    'Keys · stars · rhythm · harp — write about one of them',
  /* “내가 [직접 듣고 해 본 것]을 하나 예로 들어서, [소리의 비밀]을 한 줄 적어 보세요!” */
  '내가': 'Take one thing you',
  '직접 듣고 해 본 것': 'heard and tried for yourself',
  '을 하나 예로 들어서,': ' and write one line about',
  '을 한 줄 적어 보세요!': '!',
  '예) 라 줄을 반으로 줄였더니 …': 'e.g. When I halved the A string …',
  '내 말로 정리': 'In my own words',
  '한 줄이면 충분해요 — 내 말로 적어 봐요!': 'One line is plenty — say it your own way!',
  '제출 완료!': 'Submitted!',
  '내 말로 정리한 소리의 비밀이 저장됐어요.': 'Your own words about the Sound secret have been saved.',

  /* 비밀 카드 */
  '여러분이 적은 내용을 잘 보았어요. 건반과 리듬, 하프 줄로 비를 공부해 보았지요. 이제 함께 정리해 봐요. 낱말 카드를 놓아 빈칸을 채워 보세요.':
    'I have read what you wrote. You have studied ratio with keys, with rhythms and with harp strings. Now let us pull it together. Drag the word cards into the blanks.',
  '📝 소리의 비밀 정리': '📝 The Sound secret, in one sentence',
  '✋ 낱말을': '✋ Take a word,',
  '손가락이나 마우스로 누른 채 끌어서': 'hold it down with your finger or mouse and drag it',
  '빈칸 위에 놓아 주세요': 'onto the blank',
  '두 음의 진동수의 비가 더 ': 'The ',
  '간단한': 'simpler',
  ' 비일수록 더 잘 어울린다.': ' the ratio of the two frequencies, the better they blend.',
  '줄의 길이와 음 높이의 관계는 서로 ': 'String length and pitch work in ',
  '반대': 'opposite',
  ' 이다.': ' directions.',
  '복잡한': 'more complex',
  '비례': 'proportional',
  '다른 카드를 놓아 볼까요?': 'Shall we try a different card?',
  '정리 완성!': 'All wrapped up!',
  '소리의 비밀을 문장으로 정리했어요. 허브로 돌아가 다음 탐험을 이어가요!':
    'You have put the Sound secret into words. Head back and carry on with the next adventure!',
  '🃏 소리의 비밀 카드': '🃏 The Sound secret card',
  '진동수의 비가 간단할수록 어울리는 화음!': 'The simpler the ratio of the vibrations, the sweeter the chord!',
  '황금비의 셋째 자리예요. 기억해 두세요!': 'This is the third digit of the golden ratio. Remember it!',
  '소리의 비밀을 잘 찾아냈어요! 카드 숫자 1을 얻었어요! 잘 기억해두세요!':
    'You found the Sound secret! You have earned the card number 1. Keep it safe!',
  '탐색 완료! 카드 숫자 1 획득': 'Room complete! Card number 1 is yours',
  '🗺️ 지도의 비밀로 이어가기 →': '🗺️ On to the Map Secret →',
  '🏠 허브로 돌아가기': '🏠 Back to the start',
  '조작물을 다시 보면서 생각해 볼까요?': 'Shall we look at it again and think?',

  /* 진행 안내 */
  '아래 물음에 답하면 다음으로 갈 수 있어요': 'Answer the question below and you can go on',
  '문제를 해결하면 다음으로 갈 수 있어요': 'Solve this and you can go on',
  '아래 물음에 답하고 넘어가요.': 'Answer the question below, then move on.',
  '지금 문제를 해결하고 넘어가요.': 'Finish this one first, then move on.',
};
