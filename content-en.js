'use strict';
// English content — American toxic culture (localized, not translated).
// Line = 'text' | {audio:'dur', tx:'transcript'} | {sys:'notice'}. {name} = NPC name. hard:true = Unhinged only.
const EN = {};

EN.ui = {
  pickTitle: 'What do you want to simulate today?',
  pickSub: 'Pick your torture. It\'s all fiction. Mostly.',
  bf: 'Boyfriend', gf: 'Girlfriend',
  open: 'Start', back: '← Pick another',
  lvlTitle: 'Toxicity level',
  lvls: [['Mild', 'for therapy beginners'], ['Toxic', 'the standard experience'], ['Unhinged', 'no survivors']],
  chats: 'Chats', type: 'Type a message',
  online: 'Active', typing: 'typing…', recording: 'recording…',
  today: 'TODAY', transcribe: 'Transcript',
  again: 'Play again', other: 'Other simulation',
  copy: 'Copy', copied: 'Copied!',
  found: 'Endings unlocked',
  shareTxt: 'I played the Toxic Simulator ({sc} · {lv}) and got "{t}". {sl} {s} · {ml} {m}. Can you survive?',
};

EN.chefe = {
  icon: '💼', pick: 'Toxic Boss',
  pickDesc: 'Sunday, 10:47 PM. The Sunday Scaries just hit. Your boss is Active.',
  npc: () => ({ name: 'Chad Whitmore', av: 'CW', color: '#1d4ed8', role: 'VP of Growth' }),
  intro: {
    big: '10:47 PM', h: 'Toxic Boss Simulator',
    p: 'Sunday, 10:47 PM. Sunday Night Football just ended. Monday 9 AM is the pitch for Synergix\'s biggest client. {first} just opened the deck.\n\nPick a reply or type anything. Too slow? You\'ll get pinged. Sanity hits zero? You pass out on the keyboard. Every night is different.',
    fine: 'Fiction. Any resemblance to your boss is purely coincidental (or not).',
  },
  appName: 'Synergix Chat',
  start: 22 * 60 + 47, endAt: 24 * 60 + 5 * 60,
  stats: { s: 'Sanity', m: 'Boss mood', z: 'Sleep left', f: 'File' },
  z: st => dur(24 * 60 + 7 * 60 - st.clock),
  f: st => ['Apex_Pitch.pptx', 'Apex_Pitch_FINAL.pptx', 'Apex_Pitch_FINAL_v2.pptx', 'Apex_Pitch_FINAL_revised.pptx', 'Apex_Pitch_FINAL_for_real.pptx', 'Apex_Pitch_FINAL_FINAL.pptx', 'Apex_Pitch_USE_THIS_ONE.pptx', 'Apex_Pitch_DO_NOT_TOUCH.pptx', 'Apex_Pitch_boss_edits.pptx', 'Apex_Pitch_v47.pptx'][Math.min(st.ver, 9)],
  history: [
    { at: 18 * 60 + 2, who: 'npc', l: 'Big pitch tomorrow 9am with Apex. Easy layup 🏀' },
    { at: 18 * 60 + 5, who: 'me', l: 'On it! Deck\'s ready 👍' },
    { sys: '{first} viewed Apex_Pitch.pptx at 10:46 PM' },
  ],
  opening: {
    boss: ['saw the green dot 👀 went through the deck.', 'honestly? expected more from you. few small thoughts'],
    opts: [
      { t: 'Hey Chad! Fire away 😊', s: -5, m: 5, r: ['74 small thoughts. Thinking isn\'t your strength, but following instructions can be.'] },
      { t: 'Chad, it\'s almost 11pm on a Sunday…', s: 5, m: -10, r: ['Apex doesn\'t have Sundays. Neither do people who want to keep their job 🙂'] },
      { t: 'Watching the game but go ahead', m: -5, r: ['Mute it. Football is for people who hit their numbers. So, not you.'] },
    ],
  },
  pool: [
    { boss: ['The client logo is too small.', 'Make it bigger. But don\'t use more space.'], opts: [
      { t: 'Ok, adjusting', s: -10, m: 5, r: ['And make the font more "premium". I don\'t know which. You\'re supposed to be the creative one, right?'] },
      { t: 'That\'s not physically possible', m: -10, r: ['Nothing\'s impossible if you want it. Saw that on LinkedIn today.'] },
      { t: 'Would Comic Sans help?', s: 5, m: -15, r: ['Funny. Your deck is funnier. Let\'s talk about your attitude tomorrow.'] },
    ] },
    { boss: [{ audio: 'Loom · 14:37', tx: 'Hey, so, uh, quick one… I was on my Peloton and had a thought. What if we pivoted the entire narrative? Not everything. But everything. You know? Make a version B. And a C. Just to have options. Appreciate you!' }], opts: [
      { t: 'Watched it all. Doing 3 versions', s: -20, m: 10, min: 60, r: ['Legend. This is why you\'re my go-to. Don\'t tell the others.'] },
      { t: 'Can you send a TL;DR? 😅', m: -10, r: ['No time to type. Watch it at 2x.'] },
      { t: '"Love it!" (didn\'t watch)', s: -5, r: ['Love what? Loom says you watched 0:04.', { audio: 'Loom · 21:12', tx: '…and one more thing. Slide 12? Kill it. But keep the info.' }] },
    ] },
    { call: true, boss: [{ sys: '🎧 {first} started a huddle…' }], opts: [
      { t: '✅ Join', cls: 'callok', s: -15, m: 5, min: 47, r: [{ sys: 'Huddle · 47 min' }, 'Thanks for jumping on! Could\'ve been a message but I\'m a people person 👀'] },
      { t: '❌ Decline', cls: 'call', m: -15, r: ['Declined my huddle with your status on Active. Bold for someone in your position.'] },
    ] },
    { boss: ['Add a hockey-stick chart. Apex grows 300%.'], opts: [
      { t: 'Based on what?', m: -5, r: ['Based on vibes. Clients love a hockey stick 🏒'] },
      { t: 'You got it', s: -10, m: 10, r: ['Make it 400%. Aim for the moon.'] },
      { t: 'The data shows a 12% drop', s: 5, m: -10, r: ['Then don\'t show the data. Show the vision.'] },
    ] },
    { boss: ['Deck needs more "move the needle", "low-hanging fruit", "boil the ocean".'], opts: [
      { t: '"We\'ll leverage low-hanging synergies to move the needle without boiling the ocean"', s: -5, m: 10, r: ['CHILLS. Literal chills.'] },
      { t: 'None of that means anything', m: -10, r: ['It doesn\'t need to mean. It needs to resonate.'] },
      { t: 'Should I add "circle back"?', m: 5, r: ['Let\'s circle back on that.'] },
    ] },
    { boss: ['Re: your PTO next week…', 'let\'s revisit after Q4 🙂'], opts: [
      { t: 'Totally, no worries', s: -10, m: 5, r: ['Love it. Remember, our PTO is unlimited. Like your potential.'] },
      { t: 'We have unlimited PTO though', m: -10, r: ['Unlimited means there\'s no limit to how much I can deny it.'] },
      { t: 'I already booked flights', m: -10, r: ['You can work from the beach. Cabo has wifi, right?'] },
    ] },
    { boss: ['To celebrate your hard work: PIZZA PARTY Friday! 🍕', '(in lieu of Q3 bonuses)'], opts: [
      { t: 'Amazing!!', s: -5, m: 10, r: ['See? We\'re a family ❤️'] },
      { t: 'I\'d rather have the bonus', s: 5, m: -15, r: ['Bonuses are a mindset. Pizza is a reward.'] },
      { t: 'Is there gluten-free?', m: -5, r: ['There\'s one cheese slice. Fight for it. Builds culture.'] },
    ] },
    { boss: ['Leadership update: back in office 5 days a week starting Monday.', 'Hybrid means you get to choose which 5.'], opts: [
      { t: 'Sounds great!', s: -15, m: 10, r: ['Love the energy. Badge swipes are tracked btw.'] },
      { t: 'My commute is 90 min', m: -10, r: ['Great time for podcasts. Mine\'s 5 min, I live downtown.'] },
      { t: 'I was hired fully remote', s: 5, m: -15, r: ['And now you\'re fully present. Growth!'] },
    ] },
    { boss: ['Per my last message (sent 4 min ago)…', 'just bubbling this up 🙂'], opts: [
      { t: 'Sorry, on it!', s: -10, m: 5, r: ['No worries. Just following up on my follow-up.'] },
      { t: 'It\'s been 4 minutes', m: -10, r: ['4 minutes in startup time is a fiscal quarter.'] },
      { t: 'Reply-all: "Noted."', m: -5, r: ['Love the transparency. The CEO is cc\'d btw.'] },
    ] },
    { boss: ['Forget I\'m your boss.', 'We\'re not a team. We\'re a family ❤️'], opts: [
      { t: 'That\'s so nice ❤️', m: 5, r: ['That\'s why family members are salaried-exempt 😉'] },
      { t: 'So I can skip tomorrow? Family stuff', s: 5, m: -10, r: ['Real families show up. At 8:30.'] },
      { t: 'The family that Slacks at 11pm', m: -10, r: ['The family that CARES 🙂'] },
    ] },
    { boss: ['Wait. Open Thursday\'s version.', 'That one had more… energy.'], opts: [
      { t: 'But you asked me to change everything', m: -10, r: ['I asked you to improve, not change. Different things.'] },
      { t: 'Reverting to Thursday\'s', s: -15, m: 5, min: 30, r: ['Perfect. But keep tonight\'s changes.'] },
      { t: 'Which Thursday one? There are 9', s: -5, r: ['The good one.'] },
    ] },
    { boss: ['Instead of a raise this year, we\'re giving you more equity 🚀'], opts: [
      { t: 'Thank you!!', s: -10, m: 10, r: ['It vests over 6 years. If we IPO. Which we will. Probably.'] },
      { t: 'Equity in what?', m: -5, r: ['In the vision.'] },
      { t: 'Can I have the raise instead?', s: 5, m: -15, r: ['Raises are for people who don\'t believe in the mission.'] },
    ] },
    { boss: ['Saturday team-building: 8am hike + trust falls.', 'Mandatory but optional.'], opts: [
      { t: 'Can\'t wait!', s: -10, m: 10, r: ['Bring your own lunch. Culture isn\'t free.'] },
      { t: 'Is it paid?', m: -10, r: ['It\'s paid in memories.'] },
      { t: 'Mandatory or optional?', s: -5, r: ['Yes.'] },
    ] },
    { boss: ['Can you grab 15 min with me tomorrow?', 'Nothing bad 🙂'], opts: [
      { t: 'What\'s it about?', s: -10, r: ['Just a quick sync. HR might drop by. Super casual.'] },
      { t: 'Sure!', s: -15, m: 5, r: ['👍'] },
      { t: 'Can we do it now?', s: -20, r: ['No. Tomorrow. Sleep on it. If you can.'] },
    ] },
    { boss: ['Post on LinkedIn that you\'re "thrilled to be grinding on a Sunday".', 'Tag the company.'], opts: [
      { t: 'Posting! #blessed #grindset', s: -10, m: 10, r: ['Add a pic of your cold brew. And a B2B lesson you learned from your dog.'] },
      { t: 'No', s: 5, m: -15, r: ['Noted. That\'ll come up in your 360 review.'] },
      { t: 'Post it and turn off comments', m: 5, r: ['Smart. That\'s executive thinking.'] },
    ] },
    {"boss": [{"sys": "{first} created the channel #apex-war-room 🚀"}, "Made a channel so we can align better", "47 people in it. Including the client."], "opts": [{"t": "Great idea!", "s": -10, "m": 5, "r": ["Post a \"good morning team\" there at 7am daily. Visibility matters."]}, {"t": "Mute channel", "m": -10, "r": ["I saw you muted it. Slack doesn't tell me. I just know."]}, {"t": "The CLIENT is in it??", "m": -5, "r": ["Radical transparency. Careful with the emojis."]}]},
    {"boss": ["Heard you took a sick day last week.", "\"Sick.\" Ok."], "opts": [{"t": "I had a 102° fever", "m": -5, "r": ["102 is basically 98. You could've logged on."]}, {"t": "Sorry, won't happen again", "s": -10, "m": 5, "r": ["I know it won't. We're switching to \"unlimited\" sick days."]}, {"t": "Sick days are in my contract", "s": 5, "m": -15, "r": ["Contracts are more of a vibe."]}]},
    {"boss": ["Team happy hour Friday 🍻", "Not mandatory. But I'll notice who skips."], "opts": [{"t": "I'll be there!", "s": -10, "m": 10, "r": ["Great. It's BYOB. Bring one for me too."]}, {"t": "I have plans", "m": -10, "r": ["Plans bigger than the team? Interesting."]}, {"t": "Is it paid?", "s": 5, "m": -15, "r": ["It's happy hour. You're paid in happiness."]}]},
    {"boss": ["Apex asked for 40% off.", "I already said yes. Adjust the scope without cutting anything."], "opts": [{"t": "On it", "s": -15, "m": 10, "min": 30, "r": ["Great. Same deadline. Plus 2 bonus deliverables."]}, {"t": "Then we cut something", "m": -10, "r": ["We don't cut. We pivot."]}, {"t": "Who covers the difference?", "m": -10, "r": ["Your passion 🙂"]}]},
    { boss: ['Opened your deck next to Jordan\'s.', 'Not comparing. Just… Jordan gets it without me explaining.'], opts: [
      { t: 'I\'ll look at Jordan\'s', s: -10, m: 5, r: ['Good. Copy the thinking, not the slides. If you can.'] },
      { t: 'Jordan had two weeks', m: -10, r: ['And you had potential. We all make bets.'] },
      { t: 'Then give it to Jordan', s: 5, m: -15, r: ['Don\'t tempt me 🙂'] },
    ] },
    { boss: ['Can I be honest? I fought to hire you.', 'Starting to think I lost that fight.'], opts: [
      { t: 'I\'ll prove you right', s: -15, m: 10, r: ['Love that. Prove it by 6 AM.'] },
      { t: 'What did I do wrong?', s: -10, r: ['Nothing specific. That\'s the problem. Nothing stands out.'] },
      { t: 'That\'s a cruel thing to say', m: -10, r: ['It\'s feedback. Cruel would be not telling you.'] },
    ] },
    // ── Unhinged ──
    { hard: true, boss: ['Not a big deal but HR asked me to put you on a 30-day PIP.', 'Super standard!'], opts: [
      { t: 'What did I do??', s: -15, r: ['It\'s not about what you did. It\'s about what you\'ll do. Which is more.'] },
      { t: 'Ok…', s: -25, m: 10, r: ['Love that growth mindset 🌱'] },
      { t: 'I want that in writing', m: -20, r: ['Writing is so… formal. Let\'s keep it a vibe.'] },
    ] },
    { hard: true, boss: ['Saw you turned on "Open to Work" on LinkedIn.', 'Wanna talk about it?'], opts: [
      { t: 'That was an accident!', s: -15, r: ['Layoffs can be accidental too. Kidding 🙂'] },
      { t: 'Yes, actually', s: 10, m: -25, r: ['Great. Tomorrow after the pitch. Bring your laptop charger. And your badge.'] },
      { t: 'It\'s for a friend', m: -10, r: ['Tell your friend we pay more. We don\'t, but tell them.'] },
    ] },
    { hard: true, boss: ['Also we\'re doing a reorg. Your role is changing.', 'Same pay, double the scope. Congrats on the promotion 🎉'], opts: [
      { t: 'Thank you!!', s: -20, m: 10, r: ['Your new title is "Senior Associate II". Huge.'] },
      { t: 'Is there a raise?', m: -15, r: ['The raise is the experience.'] },
      { t: 'That\'s not a promotion', m: -15, r: ['It\'s a promotion of your responsibilities.'] },
    ] },
  ],
  final: {
    boss: ['Ok. Barely good enough.', 'Heading to bed, I present tomorrow 😴 Change the title on slide 1. Night.'],
    opts: [
      { t: 'Good night!', m: 5, r: ['🙏'] },
      { t: 'Who\'s presenting?', m: -5, r: ['Me, obviously. You\'re not VP-facing. Not sure you ever will be.'] },
      { t: '😐', r: [{ sys: 'Chad is now Away' }] },
    ],
  },
  nags: ['??', 'saw you read that 👀', 'your status says Active', 'noting your responsiveness for your review'],
  quit: 'i quit|quit|resign|resignation|two weeks|2 weeks notice|i\'?m done',
  free: {
    no: ["Let's take the word \"no\" offline. Forever.", "Interesting. Noting that for your review.", "Plenty of people would kill for your job, just saying.", "I'll pretend I didn't read that."],
    laugh: ["What's funny? Share with the class.", "Glad you're having fun. Fun doesn't ship decks though.", "Drop the meme in #random then.", "lol. now the slides."],
    yes: ["Love it. That's ownership 💪", "That's the rockstar energy I need 🎸", "Perfect. Since you're energized, take slide 20 too.", "Love people who don't push back."],
    q: ["Let's not answer questions with questions.", "Ask less, execute more.", "If you have to ask, it's already wrong.", "Great question. Sit with it."],
    other: ["Not sure what that means. Do it anyway.", "Ok… and the deck?", "Let's circle back on that.", "Hm. And the timeline?", "Not sure I agree, but do it."],
    sorry: ["Sorry doesn't ship slides.", "Apology accepted. Version 8 is not.", "No worries. I'll remember it fondly in your review.", "Love the accountability. Now the deck."],
    love: ["Uh. Was that meant for me? Let's keep it professional.", "I'll take appreciation. In slide form.", "HR would like a word. Kidding. Unless?", "Cute. Back to work."],
    money: ["Money isn't everything. It's almost everything, but not everything.", "Let's talk comp in Q1. Of next year.", "Raises come with results. Results come with Sundays.", "You're doing this for money? I thought it was for the mission."],
    sick: ["Grab a tea and open your laptop.", "Sick days don't cover Sunday nights.", "Everyone gets sick. Not everyone stays committed.", "Feel better! Deck due at 6."],
    tired: ["Tired is a mindset.", "Rest Monday after 6. Maybe.", "Everyone's tired. That's why it's called work.", "2 hours of sleep is plenty. I read that somewhere."],
    emoji: ["Words, please. We're professionals.", "Was that a yes?", "I'll take that as a yes."],
    shout: ["Why are you yelling?", "Caps lock is a lack of emotional intelligence.", "Breathe. Then send the slides.", "Noted: struggles under pressure."],
  },
  side: [
    { id: 'mom', name: 'Mom ❤️', av: 'M', color: '#db2777', pv: 'Did you eat, honey?', bonus: 8, open: ['Saw on the news that sleep is important. Close the laptop. Love you 💕'] },
    { id: 'ff', name: 'Fantasy League 🏈', av: 'FL', color: '#16a34a', pv: 'Dave: last place buys the trophy' },
    { id: 'room', name: 'Roommate', av: 'RM', color: '#0891b2', pv: 'Venmo request' },
    { id: 'hr', name: 'HR · People Team', av: 'HR', color: '#7c3aed', pv: 'Mandatory Wellness Training 💜' },
    { id: 'land', name: 'Landlord', av: 'LL', color: '#ea580c', pv: 'Lease renewal' },
    { id: 'ex', name: 'Ex', av: 'EX', color: '#525252', pv: '', bonus: -5, open: ['…wait you still work for {first}? 😬'] },
  ],
  pings: [
    { id: 'mom', l: 'Did you eat dinner, honey? 🍲' },
    { id: 'ff', l: 'Dave: whoever\'s last place gets a tattoo of my team logo. No exceptions' },
    { id: 'room', l: 'Venmo request: $47.50 "electricity + vibes" ⚡' },
    { id: 'hr', l: 'Reminder: complete your Mandatory Wellness Training by Friday! Burnout is a choice 💜' },
    { id: 'land', l: 'Hi! Rent is going up 18% next month. Market rates! 🙏' },
    { id: 'ex', l: 'u up?' },
  ],
  endings: {
    burnout: { e: '🫠', t: 'Passed out on the keyboard', d: 'You woke up at 8:50 AM with your face on the "J" key. 47 unread pings. The last one: "can we talk?"' },
    fired: { e: '📹', t: 'Laid off via 3-min Zoom', d: 'A 3-minute Zoom with an HR person you\'d never met. Your laptop locked mid-sentence. You slept 9 hours.' },
    curse: { e: '🔥', t: 'Said what everyone thinks', d: 'Screenshot hit 14 group chats and r/antiwork. Unemployed, but a legend.' },
    quit: { e: '🕊️', t: 'Quit', d: 'You quit at 11 PM over Slack. Turned off notifications. Slept. {first} presented alone and called the client "Apple".' },
    star: { e: '🏆', t: 'Employee of the month', d: 'Apex loved it. You got a shoutout in #general, a branded hoodie and the same salary. Budget is tight (the CEO bought a boat).' },
    survive: { e: '😮‍💨', t: 'Survived', d: 'At 9 AM {first} presented your slides. That afternoon, on LinkedIn: "Proud of what I built 🙏".' },
    target: { e: '🎯', t: 'Quick sync', d: 'At 9:15 AM a calendar invite: "Quick sync". HR is cc\'d. Friday, 4:58 PM.' },
  },
  note: 'This is fiction, but workplace harassment is real. Document everything (screenshots, emails) and reach out to HR, a union, or an employment lawyer.',
};

EN.love = {
  icon: '💔', pick: 'Toxic relationship',
  pickDesc: 'Saturday, 11:12 PM. Tyler\'s birthday at a dive bar. Your partner watched your story.',
  npc: g => g === 'o'
    ? { name: 'Brandon', av: 'B', color: '#2563eb', role: 'Boyfriend 💙' }
    : { name: 'Madison', av: 'M', color: '#db2777', role: 'Girlfriend 💗' },
  intro: {
    big: '11:12 PM', h: 'Toxic Relationship Simulator',
    p: 'Saturday, 11:12 PM. Tyler\'s birthday at a dive bar. First time in months you went out without {name}. You posted a story. {name} watched it in 4 seconds.\n\nPick a reply or type anything. Too slow? You\'ll hear about it. Battery at 34%. Good luck.',
    fine: 'Fiction and satire. Jealousy and control aren\'t proof of love.',
  },
  appName: 'Messages',
  start: 23 * 60 + 12, endAt: 23 * 60 + 12 + 190,
  stats: { s: 'Sanity', m: '{name}\'s mood', z: 'Battery', f: 'Status' },
  z: st => Math.max(0, 34 - Math.floor((st.clock - st.start) / 6)) + '%',
  zDead: st => 34 - Math.floor((st.clock - st.start) / 6) <= 0,
  f: st => ['in a relationship ❤️', 'in a relationship ❤️', '"it\'s fine"', 'read ' + hhmm(st.clock - 3), 'typing for 9 minutes', 'unfollowed your bestie', 'sad song on their story 🎵', '"we need to talk"'][Math.min(st.ver, 7)],
  history: [
    { at: 21 * 60 + 40, who: 'npc', l: 'Have fun 😊' },
    { at: 21 * 60 + 41, who: 'me', l: 'Love you ❤️' },
    { at: 21 * 60 + 41, who: 'npc', l: 'You too. Keep your location on' },
    { sys: '{name} viewed your story at 11:11 PM' },
  ],
  opening: {
    boss: ['hey', 'having fun huh? 🙂 who\'s the person next to you in your story?'],
    opts: [
      { t: 'Tyler\'s cousin!', s: -5, m: 5, r: ['Cousin. Sure. Why are they laughing at your joke? You\'re not even funny.'] },
      { t: 'Nobody babe ❤️', m: -5, r: ['Nobody has a face now?'] },
      { t: 'Was just thinking about you 😍', s: -5, m: 10, r: ['Thinking about me but took {delay} to text back. Ok.'] },
    ],
  },
  pool: [
    { boss: ['who is {@jake.pilates|@ashley.pilates} and why did {he|she} like your pic from 2019?'], opts: [
      { t: 'No idea!', m: -5, r: ['You don\'t know {him|her} and you let {him|her} like it? Block. Now. Screenshot.'] },
      { t: 'Already blocked, babe', s: -10, m: 10, r: ['Screenshot. Now block Tyler too, he\'s the one who dragged you out.'] },
      { t: 'It was one like', s: 5, m: -15, r: ['"One like" is how it starts.'] },
    ] },
    { boss: ['Life360 says you\'ve been at "Rusty\'s Bar & Grill" for 47 minutes.', 'Doing what exactly?'], opts: [
      { t: 'It\'s Tyler\'s birthday!', s: -5, r: ['I know whose birthday it is. I asked what you\'re DOING.'] },
      { t: 'My location glitched', m: -10, r: ['Phones don\'t glitch. People do.'] },
      { t: 'Turn yours on then', s: 5, m: -15, r: ['I don\'t need to. I\'M trustworthy.'] },
    ] },
    { boss: ['Send a pic right now. No filter. Holding up 3 fingers.', 'So I know it\'s live.'], opts: [
      { t: '📸 [send pic]', s: -10, m: 5, r: ['Why is someone in the background looking at the camera? Explain.'] },
      { t: 'What is this, a hostage photo?', m: -10, r: ['Oh so now it\'s a joke.'] },
      { t: 'My battery\'s dying…', m: -5, r: ['How convenient.'] },
    ] },
    { boss: [{ audio: '3:58', tx: 'I\'m not mad. I\'m literally not mad. I just think it\'s interesting you never have time for me but you have time for Tyler. Who I\'ve never trusted. But it\'s fine. I\'m fine. Have fun. Have SO much fun.' }], opts: [
      { t: 'Want me to come home?', s: -15, m: 10, r: ['No, stay. (you know what you should do.)'] },
      { t: 'Babe, we talked about this', m: -10, r: ['We talked about you having fun. Not THAT much fun.'] },
      { t: 'Listen at 2x and send ❤️', s: -5, r: ['A heart? After a 4-minute voice memo??', { audio: '6:20', tx: 'And another thing…' }] },
    ] },
    { boss: ['My therapist says you\'re showing narcissistic patterns.', 'So I\'m setting a boundary: you can\'t go out without me.'], opts: [
      { t: 'That\'s… not what a boundary is', m: -15, r: ['Wow. Now you\'re gaslighting me about boundaries?'] },
      { t: 'You\'re right, I\'m sorry', s: -15, m: 10, r: ['Thank you for respecting my healing journey 🌱'] },
      { t: 'Your therapist has never met me', m: -10, r: ['She doesn\'t need to. I showed her your texts.'] },
    ] },
    { boss: ['Why haven\'t you posted me yet? It\'s been 8 months.'], opts: [
      { t: 'I\'ll post you tonight!', s: -10, m: 10, r: ['Not a soft launch. A HARD launch. Caption: "my whole world".'] },
      { t: 'I don\'t really post people', m: -10, r: ['You posted Tyler\'s dog.'] },
      { t: 'I posted your hand in March', m: -5, r: ['A HAND. 8 months and I\'m a hand.'] },
    ] },
    { boss: ['k'], opts: [
      { t: 'Are you ok?', s: -10, m: 5, r: ['If you don\'t know what you did, I\'m not telling you.'] },
      { t: 'What did I do?', s: -10, m: -5, r: ['Think.'] },
      { t: 'k 👍', m: -15, r: ['A thumbs up. Wow. That\'s what I\'m worth to you.'] },
    ] },
    { call: true, boss: [{ sys: '📱 FaceTime from {name}…' }], opts: [
      { t: '✅ Answer', cls: 'callok', s: -15, m: 10, min: 25, r: [{ sys: 'FaceTime · 25 min' }, 'Flip the camera. More. Who\'s THAT?'] },
      { t: '❌ Decline', cls: 'call', m: -20, r: ['You declined me. What are you doing that you can\'t answer??'] },
    ] },
    { boss: ['You broke our Snapchat streak.', '412 days. On TYLER\'S BIRTHDAY.'], opts: [
      { t: 'We\'ll start a new one!', s: -5, r: ['It\'s not about the streak. It\'s about what it represents.'] },
      { t: 'It\'s just an app', m: -15, r: ['So I\'m "just an app" to you?'] },
      { t: 'Sending a snap right now', s: -5, m: 5, r: ['A pic of the ceiling? Ok.'] },
    ] },
    { boss: ['Your friends don\'t like me, do they?', 'I can feel it.'], opts: [
      { t: 'Of course they do!', s: -5, m: 5, r: ['Then why didn\'t anyone like my new post? Ask them. Now.'] },
      { t: 'They barely know you', m: -10, r: ['Exactly. Because you never bring me. You\'re embarrassed of me.'] },
      { t: 'Want me to leave?', s: -15, m: 10, r: ['I didn\'t say that. But if you want to… 🙂'] },
    ] },
    { boss: ['Why did you pay Tyler $12 on Venmo for "tacos 🌮"?', 'Who else was at tacos?'], opts: [
      { t: 'Just Tyler!', m: -5, r: ['Tacos for two. That\'s a date.'] },
      { t: 'Why are you checking my Venmo?', m: -15, r: ['It\'s PUBLIC. That\'s literally what it\'s for.'] },
      { t: 'Setting it to private now', s: -10, m: 5, r: ['Private?? What are you hiding??'] },
    ] },
    { boss: ['Your ex from sophomore year watched your story.', 'Why haven\'t you blocked them yet?'], opts: [
      { t: 'Blocking now!', s: -10, m: 5, r: ['Now? I had to tell you?'] },
      { t: 'I forgot they existed', m: -5, r: ['Funny. I remember every day.'] },
      { t: 'We\'re just friends', m: -20, r: ['Friends have limits. And the limit is me.'] },
    ] },
    { boss: ['do you love me?'], opts: [
      { t: 'So much ❤️', s: -5, m: 5, r: ['More than Tyler?'] },
      { t: 'Obviously', s: -5, m: -5, r: ['"Obviously" is so dry. Say it properly.'] },
      { t: 'More than anything, more than air, more than the Super Bowl 😍', s: -10, m: 15, r: ['More than the Super Bowl is huge. Screenshotting.'] },
    ] },
    { boss: ['What time are you coming home?', 'Exact time.'], opts: [
      { t: '1 AM', s: -5, r: ['1:00 or 1:59? There\'s a difference.'] },
      { t: 'Not sure, babe', m: -10, r: ['Not sure? People doing the right thing are sure.'] },
      { t: 'Leaving now', s: -10, m: 10, min: 20, r: ['Share your Uber. …Why is it going the other way?'] },
    ] },
    { boss: ['Watched your story again.', 'You wore THAT?'], opts: [
      { t: 'What\'s wrong with it?', m: -10, r: ['If you can\'t see it, that says enough about you.'] },
      { t: 'I\'ll change when I get home', s: -10, m: 5, r: ['Would\'ve been nice if you hadn\'t left in it.'] },
      { t: 'You bought it for me', s: 5, r: ['…to wear WITH ME.'] },
    ] },
    { boss: ['Your mom unfollowed me on Facebook.', 'She never liked me.'], opts: [
      { t: 'She barely uses Facebook!', m: -5, r: ['She shared 6 Minion memes today. I checked.'] },
      { t: 'I\'ll talk to her', s: -10, m: 10, r: ['Tonight. Now. Screenshot.'] },
      { t: 'Stop stalking my mom', s: 5, m: -15, r: ['Stalking?? I CARE about your family. Unlike you.'] },
    ] },
    {"boss": ["Why is your Spotify playing \"songs to forget someone\"?", "I can see it. Your playlist is public."], "opts": [{"t": "Tyler added that", "m": -5, "r": ["Tyler has access to your Spotify? Cozy."]}, {"t": "It's what the bar is playing", "s": -5, "r": ["That's a lot of coincidence for me."]}, {"t": "Switching to our playlist", "s": -10, "m": 10, "r": ["We have a playlist? Make one. Now. 40 songs."]}]},
    {"boss": ["Why am I not on your close friends?"], "opts": [{"t": "You are!", "s": -5, "r": ["Then why are there stories I haven't seen? I count."]}, {"t": "Close friends is for friends", "m": -10, "r": ["And what am I? Your enemy?"]}, {"t": "Adding you now", "s": -5, "m": 5, "r": ["Now? I had to ask?"]}]},
    {"boss": ["You watched my story 3 hours late.", "You used to watch it in 3 minutes."], "opts": [{"t": "No signal", "m": -5, "r": ["But you had signal to post your own story. Interesting."]}, {"t": "Sorry, I'll watch right away", "s": -10, "m": 5, "r": ["And react. With a heart. The fire emoji is for other people, right?"]}, {"t": "You track that?", "m": -10, "r": ["Someone has to."]}]},
    {"boss": ["You followed 4 new people this week.", "I want names. And reasons."], "opts": [{"t": "They're from work", "m": -5, "r": ["Work as what, models? I saw the pics."]}, {"t": "I'll unfollow all of them", "s": -15, "m": 10, "r": ["That's not what I wanted. But since you offered."]}, {"t": "I'm not justifying follows", "s": 5, "m": -15, "r": ["So you have something to hide."]}]},
    // ── Unhinged ──
    { hard: true, boss: ['I\'m coming to get you.', 'Already in the Uber.'], opts: [
      { t: 'You don\'t need to!!', m: -15, r: ['I do. I want to meet this "cousin".'] },
      { t: 'Ok babe', s: -20, m: 10, r: ['4 min away. Wait outside. Away from everyone.'] },
      { t: 'I\'m already leaving', s: -10, r: ['Then wait for me. I\'m checking if that\'s true.'] },
    ] },
    { hard: true, boss: ['Either you leave right now or I\'m posting our texts on my close friends story.'], opts: [
      { t: 'Leaving', s: -25, m: 15, r: ['See what you make me do?'] },
      { t: 'Post it', s: 5, m: -20, r: ['You never loved me. Never.'] },
      { t: 'That\'s blackmail', m: -15, r: ['Blackmail is you having a social life.'] },
    ] },
    { hard: true, boss: ['Also I unfollowed Tyler from your Instagram.', 'He looks at you weird.'], opts: [
      { t: 'How did you get into my Insta??', m: -10, r: ['Your password\'s saved on my laptop, babe 🥰'] },
      { t: 'Ok…', s: -20, r: ['See? So easy when you cooperate.'] },
      { t: 'I\'m changing my password', m: -20, r: ['Changing your password?? What are you hiding??'] },
    ] },
  ],
  final: {
    boss: ['ok. night.', 'we\'ll talk tomorrow.'],
    opts: [
      { t: 'Talk about what?', m: -5, r: ['You know.'] },
      { t: 'Good night babe ❤️', m: 5, r: [{ sys: 'Read' }] },
      { t: 'Love you', r: ['👍'] },
    ],
  },
  nags: ['??', 'Read 11:58 PM. Cool.', 'I can see you\'re active.', 'forget it.'],
  quit: 'break up|breaking up|it\'?s over|we\'?re done|i\'?m done|block(ed|ing)?|leave you|leaving you',
  free: {
    no: ["Wow. Ok. Noted.", "You've changed so much since you started hanging out with them.", "No need to be rude. I asked for ONE thing.", "Fine. Don't complain later.", "You never do anything for me."],
    laugh: ["Laughing? Laughing with who?", "Glad you're having fun. While I'm here.", "What's so funny? Who's next to you?", "lol what? Send me a screenshot of what you're laughing at."],
    yes: ["Good. See how easy that was? 🥰", "Ok. But don't do it again.", "Good. Now prove it.", "Promise? Like actually promise?"],
    q: ["Don't change the subject.", "I'm the one asking questions here.", "You know the answer.", "Why are you asking me that? Guilty?"],
    other: ["Hm.", "What kind of answer is that?", "Who taught you to talk like that? Tyler?", "You're acting weird tonight.", "Have you been drinking?"],
    sorry: ["Sorry doesn't fix it.", "Another sorry? You collect them.", "You always apologize and never change.", "Accepted. Not forgotten."],
    love: ["Love you too. That's why I worry.", "If you loved me you'd be here.", "You love me but you're out without me.", "Prove it. Come home."],
    money: ["So now you're throwing money at me?", "It's not about money. It's about attention.", "Who are you spending money on there?", "Send me your bank statement then."],
    sick: ["If you feel sick, come home. Now.", "Feeling sick or feeling too good?", "Want me to come check? Then I'll see everything.", "How convenient."],
    tired: ["Tired from partying? You're never this tired with me.", "Then come sleep here.", "But you're still out.", "Tired of me, huh?"],
    emoji: ["An emoji? Seriously?", "Use words. I deserve words.", "Was that emoji for me or did you copy it from another chat?"],
    shout: ["Don't yell at me.", "See? You're the one yelling.", "Screenshotting this for your mom.", "Wow. I've never been so disrespected."],
  },
  side: [
    { id: 'jess', name: 'Jess (bestie) 💃', av: 'J', color: '#9333ea', pv: 'GET OFF YOUR PHONE', bonus: 10, open: ['Hey. You didn\'t do anything wrong, ok? Come dance 💜'] },
    { id: 'tyler', name: 'Tyler 🎂', av: 'T', color: '#ea580c', pv: 'WHERE ARE YOU' },
    { id: 'mom', name: 'Mom ❤️', av: 'M', color: '#db2777', pv: 'Get an Uber home!', bonus: 5 },
    { id: 'squad', name: 'Saturday Squad 🍻', av: 'SS', color: '#0891b2', pv: 'who has my card' },
    { id: 'inlaw', name: '{name}\'s mom', av: 'MM', color: '#525252', pv: '', bonus: -5, open: ['Hi sweetie. {name} is very upset. What did you do?'] },
  ],
  pings: [
    { id: 'tyler', l: 'WHERE ARE YOU WE\'RE DOING SHOTS 🎂' },
    { id: 'jess', l: 'GET OFF YOUR PHONE AND COME DANCE' },
    { id: 'inlaw', l: 'Hi sweetie, do you have a minute? We need to talk.' },
    { id: 'mom', l: 'Get an Uber home, ok? 🙏' },
    { id: 'squad', l: 'guys tyler is crying at karaoke again' },
  ],
  endings: {
    burnout: { e: '😭', t: 'Crying in the bathroom', d: 'You cried in the bar bathroom. Tyler had to comfort you. On HIS birthday.' },
    fired: { e: '🕊️', t: 'Got dumped (and it\'s great)', d: '{name} broke up with you via Instagram story with a sad song and a sunset. Your friends threw a second party.' },
    curse: { e: '🔥', t: 'Said what everyone thinks', d: 'Blocked in 4 seconds. First peaceful night in 2 years.' },
    quit: { e: '🎉', t: 'Broke up', d: 'You broke up. Blocked everywhere. The whole bar cheered. Tyler cried. Best birthday gift ever.' },
    battery: { e: '🪫', t: 'Battery died', d: 'Your phone died. When it came back on: 87 texts, 14 missed FaceTimes and an 11-minute voice memo.' },
    star: { e: '🏅', t: '"Passed the test"', d: '{name} said you were "amazing" tonight. There\'s another test tomorrow. And the day after.' },
    survive: { e: '😶', t: '"We\'ll talk tomorrow"', d: 'You didn\'t sleep. You reread the whole chat at 4 AM trying to figure out what you did.' },
    target: { e: '🧊', t: 'Silent treatment till Tuesday', d: 'Left on read until Tuesday. You apologized for something you didn\'t even do.' },
  },
  note: 'Excessive jealousy, location tracking and guilt-tripping aren\'t love. If this feels familiar, talk to someone you trust. US: National Domestic Violence Hotline 1-800-799-7233 (or text START to 88788) · 988.',
};
