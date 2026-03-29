'use strict';
/* ── DATA ── */
const COUNTRIES=[{flag:'🇮🇳',name:'India',code:'+91'},{flag:'🇺🇸',name:'USA',code:'+1'},{flag:'🇬🇧',name:'UK',code:'+44'},{flag:'🇦🇺',name:'Australia',code:'+61'},{flag:'🇨🇦',name:'Canada',code:'+1'},{flag:'🇩🇪',name:'Germany',code:'+49'},{flag:'🇫🇷',name:'France',code:'+33'},{flag:'🇯🇵',name:'Japan',code:'+81'},{flag:'🇸🇬',name:'Singapore',code:'+65'},{flag:'🇦🇪',name:'UAE',code:'+971'}];
let selectedCountry=COUNTRIES[0],authTab='phone',otpResendTimer=null;

const CONTACTS=[
  {id:1,name:'Sarah Wilson',avatar:'S',color:'#7c3aed',status:'online',preview:'Hey! Free tonight? 🎉',time:'2m',unread:2},
  {id:2,name:'James Park',avatar:'J',color:'#06b6d4',status:'online',preview:'Sent you the project files 📁',time:'15m',unread:1},
  {id:3,name:'Priya Sharma',avatar:'P',color:'#ec4899',status:'away',preview:'Thanks! ✅',time:'1h',unread:0},
  {id:4,name:'Dev Squad 🚀',avatar:'D',color:'#10b981',status:'online',preview:'Standup in 5 mins',time:'5m',unread:3,group:true},
  {id:5,name:'Emma Liu',avatar:'E',color:'#f97316',status:'offline',preview:'See you tomorrow',time:'3h',unread:0},
  {id:6,name:'Marcus Brown',avatar:'M',color:'#f59e0b',status:'online',preview:'Can you review my PR?',time:'1d',unread:0},
];
const MSG_HISTORY={
  1:[{s:'them',t:'Hey! 👋',time:'10:02'},{s:'me',t:'Hi Sarah! How are you?',time:'10:03'},{s:'them',t:'Just back from Bali 🌴',time:'10:05'},{s:'them',t:'Hey! Free tonight? 🎉',time:'10:41'}],
  2:[{s:'them',t:'Finished the design review!',time:'Yesterday'},{s:'me',t:'Can you share the files?',time:'Yesterday'},{s:'them',t:'Sent you the project files 📁',time:'12:45',file:{name:'design_v3.fig',size:'24MB'}}],
  4:[{s:'them',t:'Good morning team! 🌞',time:'9:00',sn:'Carlos'},{s:'me',t:'Morning! Ready for sprint review.',time:'9:02'},{s:'them',t:'Standup in 5 mins',time:'9:55',sn:'Carlos'}],
};
const CALL_LOG=[
  {cid:1,type:'video',dir:'in',dur:'12:34',time:'Today 11:00'},
  {cid:2,type:'voice',dir:'out',dur:'5:21',time:'Today 9:45'},
  {cid:3,type:'voice',dir:'missed',dur:'—',time:'Yesterday'},
  {cid:4,type:'video',dir:'in',dur:'45:00',time:'Yesterday'},
];
const REELS_DATA=[
  {id:1,em:'🏄',author:'@wave_rider',caption:'Best surf of the year! 🌊',likes:'24.3K',comments:'1.2K',sound:'Ocean Waves – Original',bg:'linear-gradient(180deg,#0891b2,#164e63)'},
  {id:2,em:'🍜',author:'@foodie_life',caption:'Homemade ramen from scratch 🍜',likes:'87.6K',comments:'4.5K',sound:'Calm Down – Rema',bg:'linear-gradient(180deg,#92400e,#1c1917)'},
  {id:3,em:'🎸',author:'@rockband',caption:'First stadium show tonight! 🎶',likes:'112K',comments:'8.9K',sound:'Blinding Lights – Weekend',bg:'linear-gradient(180deg,#4c1d95,#0c0a09)'},
  {id:4,em:'🌌',author:'@cosmos',caption:'Milky Way at 4800m 🌠',likes:'55K',comments:'2.3K',sound:'Space – Ambient',bg:'linear-gradient(180deg,#0f0c2a,#1a1035)'},
  {id:5,em:'🐋',author:'@ocean_dept',caption:'Blue whale encounter! 🐋',likes:'203K',comments:'15K',sound:'Ocean – Lullaby',bg:'linear-gradient(180deg,#0c4a6e,#0f172a)'},
];
const SHOP_CATS=['All','Electronics','Fashion','Home','Gaming','Beauty','Sports'];
let products=[
  {id:1,em:'📱',name:'Pro Smartphone X15',brand:'NexPhone',price:899,orig:1099,stars:'⭐⭐⭐⭐⭐',badge:'Hot',cat:'Electronics'},
  {id:2,em:'💻',name:'UltraBook Pro 14"',brand:'TechBrand',price:1299,orig:1599,stars:'⭐⭐⭐⭐½',badge:null,cat:'Electronics'},
  {id:3,em:'🎧',name:'ANC Headphones Elite',brand:'SoundPro',price:249,orig:349,stars:'⭐⭐⭐⭐⭐',badge:'18% Off',cat:'Electronics'},
  {id:4,em:'👟',name:'Air Runner 2.0',brand:'SportEdge',price:129,orig:169,stars:'⭐⭐⭐⭐½',badge:'New',cat:'Fashion'},
  {id:5,em:'⌚',name:'Smart Watch Series 9',brand:'TimeTech',price:399,orig:499,stars:'⭐⭐⭐⭐⭐',badge:'Best Seller',cat:'Electronics'},
  {id:6,em:'🎮',name:'Controller Pro RGB',brand:'GameZone',price:79,orig:99,stars:'⭐⭐⭐⭐',badge:null,cat:'Gaming'},
];
let cart=[];
const CARDS=[
  {id:1,num:'4291',holder:'ALEX MORGAN',exp:'03/28',brand:'VISA',grad:'linear-gradient(135deg,#7c3aed,#0e7490)'},
  {id:2,num:'8847',holder:'ALEX MORGAN',exp:'09/27',brand:'MC',grad:'linear-gradient(135deg,#dc2626,#b45309)'},
];
const TXS=[
  {desc:'Coffee & Co.',date:'Today 09:15',amount:-5.40,icon:'☕',color:'#ef4444'},
  {desc:'Sarah Wilson',date:'Today 08:30',amount:+120,icon:'👤',color:'#10b981'},
  {desc:'Netflix',date:'Yesterday',amount:-15.99,icon:'🎬',color:'#ef4444'},
  {desc:'Freelance Work',date:'Mar 10',amount:+600,icon:'💼',color:'#10b981'},
  {desc:'Grocery',date:'Mar 09',amount:-68.20,icon:'🛒',color:'#ef4444'},
];
const FILTERS=[
  {name:'Normal',style:'none',emoji:'🌟'},
  {name:'Vivid',style:'saturate(1.8) contrast(1.1)',emoji:'🌈'},
  {name:'Warm',style:'sepia(0.4) saturate(1.3)',emoji:'🌅'},
  {name:'Cool',style:'hue-rotate(30deg) saturate(1.2)',emoji:'❄️'},
  {name:'B&W',style:'grayscale(1)',emoji:'⬛'},
  {name:'Fade',style:'opacity(0.85) contrast(0.9)',emoji:'🌫️'},
  {name:'Drama',style:'contrast(1.4) saturate(1.3)',emoji:'🎭'},
];
const STORY_DATA=[
  {name:'You',avatar:'A',color:'#7c3aed',mine:true},
  ...CONTACTS.map(c=>({name:c.name.split(' ')[0],avatar:c.avatar,color:c.color,seen:Math.random()>.5}))
];

/* ── STATE ── */
let currentPage='chats',activeContact=null,callStream=null,callFacing='user',callTimer=null,callSecs=0,micOn=true,camOn=true;
let recStream=null,recFacing='user',recMediaRecorder=null,recChunks=[],recTimer=null,recSecs=0,recFilter=0,recBeauty=false,recIsRecording=false;
let shopCat='All',profilePhoto=null,userProfile={name:'Alex Morgan',bio:'Living life ✨',avatar:'A'};

/* ── SPLASH ── */
window.addEventListener('DOMContentLoaded',()=>{
  renderCountryList();
  setupOTPBoxes();
  setTimeout(()=>{
    document.getElementById('splash').classList.add('hidden');
    document.getElementById('authFlow').classList.remove('hidden');
  },3000);
});

/* ══ AUTH ══ */
function switchAuthTab(tab){
  authTab=tab;
  document.getElementById('tabPhone').classList.toggle('active',tab==='phone');
  document.getElementById('tabEmail').classList.toggle('active',tab==='email');
  document.getElementById('phoneInput').classList.toggle('hidden',tab!=='phone');
  document.getElementById('emailInput').classList.toggle('hidden',tab!=='email');
}
function renderCountryList(){
  document.getElementById('countryList').innerHTML=COUNTRIES.map(c=>`<div class="country-item" onclick="pickCountry(${COUNTRIES.indexOf(c)})">${c.flag} ${c.name} <span style="margin-left:auto;color:var(--t3)">${c.code}</span></div>`).join('');
}
function filterCountries(q){
  const els=document.querySelectorAll('.country-item');
  COUNTRIES.forEach((c,i)=>{els[i].style.display=c.name.toLowerCase().includes(q.toLowerCase())?'':'none';});
}
function toggleCountryPicker(){document.getElementById('countryPicker').classList.toggle('hidden');}
function pickCountry(i){
  selectedCountry=COUNTRIES[i];
  document.getElementById('flagEmoji').textContent=selectedCountry.flag;
  document.getElementById('dialCode').textContent=selectedCountry.code;
  document.getElementById('countryPicker').classList.add('hidden');
}
function sendOTP(){
  const btn=document.getElementById('sendOtpBtn');
  const txt=document.getElementById('sendOtpText');
  const spin=document.getElementById('sendOtpSpinner');
  const val=authTab==='phone'?document.getElementById('phoneField').value:document.getElementById('emailField').value;
  if(!val.trim()){showToast('Please enter your '+(authTab==='phone'?'phone number':'email'),'error');return;}
  txt.classList.add('hidden');spin.classList.remove('hidden');btn.disabled=true;
  setTimeout(()=>{
    txt.classList.remove('hidden');spin.classList.add('hidden');btn.disabled=false;
    const dest=authTab==='phone'?selectedCountry.code+' '+val:val;
    document.getElementById('otpSentTo').textContent='OTP sent to '+dest;
    showScreen('authOTP');
    startResendTimer();
    showToast('OTP sent! Demo code: 123456','success');
  },1800);
}
function setupOTPBoxes(){
  const boxes=document.querySelectorAll('.otp-box');
  boxes.forEach((box,i)=>{
    box.addEventListener('input',e=>{
      box.classList.toggle('filled',box.value.length>0);
      if(box.value&&i<boxes.length-1)boxes[i+1].focus();
      if(i===boxes.length-1&&box.value) checkAutoVerify();
    });
    box.addEventListener('keydown',e=>{if(e.key==='Backspace'&&!box.value&&i>0)boxes[i-1].focus();});
  });
}
function checkAutoVerify(){
  const code=[...document.querySelectorAll('.otp-box')].map(b=>b.value).join('');
  if(code.length===6) verifyOTP();
}
function verifyOTP(){
  const code=[...document.querySelectorAll('.otp-box')].map(b=>b.value).join('');
  if(code!=='123456'){showToast('Incorrect OTP. Use 123456','error');return;}
  showToast('✅ Verified!','success');
  setTimeout(()=>showScreen('authProfile'),600);
}
function startResendTimer(){
  let t=30;const el=document.getElementById('resendTimer');const btn=document.getElementById('resendBtn');
  btn.disabled=true;
  otpResendTimer=setInterval(()=>{t--;el.textContent=t;if(t<=0){clearInterval(otpResendTimer);btn.disabled=false;btn.innerHTML='Resend OTP';}},1000);
}
function resendOTP(){
  document.querySelectorAll('.otp-box').forEach(b=>{b.value='';b.classList.remove('filled');});
  showToast('OTP resent! Demo: 123456','info');
  startResendTimer();
}
function goBackToLogin(){showScreen('authLogin');}
function showScreen(id){
  document.querySelectorAll('.auth-screen').forEach(s=>s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}
function pickProfilePhoto(){document.getElementById('profilePhotoInput').click();}
function handleProfilePhoto(input){
  const file=input.files[0]; if(!file)return;
  const url=URL.createObjectURL(file);
  profilePhoto=url;
  const prev=document.getElementById('profileAvatarPreview');
  prev.innerHTML=`<img src="${url}" style="width:100%;height:100%;object-fit:cover;border-radius:50%"/>`;
}
function completeProfile(){
  const name=document.getElementById('profileName').value.trim()||'User';
  const bio=document.getElementById('profileBio').value.trim();
  userProfile={name,bio:bio||'NexChat User ✨',avatar:name.charAt(0).toUpperCase(),photo:profilePhoto};
  document.getElementById('authFlow').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  initApp();
}

/* ══ APP INIT ══ */
function initApp(){
  updateTopBar();
  renderStories();
  renderChatList();
  renderCallLog();
  renderReels();
  renderShop();
  renderCards();
  renderTransactions();
  renderProfileScreen();
}
function updateTopBar(){
  const av=document.getElementById('tbAvatar');
  if(userProfile.photo){av.style.backgroundImage=`url(${userProfile.photo})`;av.style.backgroundSize='cover';av.textContent='';}
  else av.textContent=userProfile.avatar;
}

/* ══ NAVIGATION ══ */
function navigateTo(tab){
  currentPage=tab;
  document.querySelectorAll('.bt-item').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  const s=document.getElementById('screen-'+tab);
  if(s)s.classList.add('active');
  const titles={chats:'Messages',calls:'Calls',reels:'Reels',shop:'Shop',pay:'Pay',profile:'Profile'};
  document.getElementById('tbTitle').textContent=titles[tab]||tab;
  document.getElementById('tbBack').style.display='none';
}
function openConversation(contact){
  activeContact=contact;
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-conversation').classList.add('active');
  document.getElementById('tbBack').style.display='flex';
  document.getElementById('tbTitle').innerHTML=`<div style="display:flex;align-items:center;gap:8px"><div style="width:28px;height:28px;border-radius:50%;background:${contact.color};display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.75rem">${contact.avatar}</div>${contact.name}</div>`;
  renderMessages(contact.id);
  setupConvInput();
}
function handleTopbarBack(){navigateTo(currentPage==='chats'?'chats':currentPage);navigateTo('chats');}
function openSearch(){showToast('Search coming soon','info');}
function openProfile(){navigateTo('profile');}

/* ══ STORIES ══ */
function renderStories(){
  document.getElementById('storiesRow').innerHTML=STORY_DATA.map((s,i)=>`
    <div class="story-item" onclick="viewStory(${i})">
      <div class="story-ring ${s.mine?'my-story':s.seen?'seen':''}">
        <div class="story-avatar" style="background:${s.color}">${s.avatar}
          ${s.mine?'<div class="story-add-dot">+</div>':''}
        </div>
      </div>
      <div class="story-name">${s.name}</div>
    </div>`).join('');
}
function viewStory(i){
  const s=STORY_DATA[i];
  if(s.mine){showToast('Upload your story 📸','info');return;}
  showToast(`Viewing ${s.name}'s story`,'info');
}

/* ══ CHAT LIST ══ */
function renderChatList(){
  document.getElementById('chatList').innerHTML=CONTACTS.map(c=>`
    <div class="chat-row" onclick="openConversation(${JSON.stringify(c).replace(/"/g,'&quot;')})">
      <div class="chat-avatar" style="background:${c.color}">${c.avatar}
        ${c.status==='online'?'<div class="online-ring"></div>':''}
      </div>
      <div class="chat-info">
        <div class="chat-name">${c.name}</div>
        <div class="chat-preview">${c.preview}</div>
      </div>
      <div class="chat-meta">
        <span class="chat-time">${c.time}</span>
        ${c.unread?`<span class="chat-unread">${c.unread}</span>`:''}
      </div>
    </div>`).join('');
}
function openNewChat(){
  showModal(`<div class="modal-title">New Message</div>
    ${CONTACTS.map(c=>`<div class="chat-row" onclick="closeModal();openConversation(${JSON.stringify(c).replace(/"/g,'&quot;')})">
      <div class="chat-avatar" style="background:${c.color}">${c.avatar}</div>
      <div class="chat-info"><div class="chat-name">${c.name}</div><div class="chat-preview">${c.status}</div></div>
    </div>`).join('')}`);
}

/* ══ MESSAGES ══ */
function renderMessages(cid){
  const msgs=MSG_HISTORY[cid]||[];
  const area=document.getElementById('convMsgs');
  let html=`<div class="day-divider">Today</div>`;
  msgs.forEach(m=>{
    if(m.file){
      html+=`<div class="msg-row ${m.s}"><div class="msg-av" style="background:${m.s==='me'?'#7c3aed':activeContact.color}">${m.s==='me'?userProfile.avatar:activeContact.avatar}</div>
        <div><div class="bubble-file" onclick="showToast('Downloading…','info')"><div class="bf-icon">📄</div><div><div class="bf-name">${m.file.name}</div><div class="bf-sz">${m.file.size}</div></div></div>
        <div class="bubble-time">${m.time}</div></div></div>`;
    }else{
      html+=`<div class="msg-row ${m.s}"><div class="msg-av" style="background:${m.s==='me'?'#7c3aed':activeContact.color}">${m.s==='me'?userProfile.avatar:activeContact.avatar}</div>
        <div class="bubble">${esc(m.t)}<div class="bubble-time">${m.time}${m.s==='me'?' ✓✓':''}</div></div></div>`;
    }
  });
  area.innerHTML=html;
  area.scrollTop=area.scrollHeight;
}
function setupConvInput(){
  const input=document.getElementById('convInput');
  const btn=document.getElementById('convSendBtn');
  btn.onclick=sendMsg;
  input.onkeydown=e=>{if(e.key==='Enter')sendMsg();};
  document.getElementById('attachBtn').onclick=()=>document.getElementById('attachInput').click();
  document.getElementById('attachInput').onchange=handleAttach;
  document.getElementById('emojiBtn2').onclick=()=>{
    const emojis=['😂','❤️','🔥','🎉','👍','😎','✨','🙏'];
    input.value+=emojis[Math.floor(Math.random()*emojis.length)];input.focus();
  };
}
function sendMsg(){
  const input=document.getElementById('convInput');
  const text=input.value.trim(); if(!text||!activeContact)return;
  input.value='';
  const area=document.getElementById('convMsgs');
  const now=new Date(),ts=now.getHours().toString().padStart(2,'0')+':'+now.getMinutes().toString().padStart(2,'0');
  const div=document.createElement('div');
  div.className='msg-row me';
  div.innerHTML=`<div class="msg-av" style="background:#7c3aed">${userProfile.avatar}</div><div class="bubble">${esc(text)}<div class="bubble-time">${ts} ✓</div></div>`;
  area.appendChild(div);area.scrollTop=area.scrollHeight;
  if(!MSG_HISTORY[activeContact.id])MSG_HISTORY[activeContact.id]=[];
  MSG_HISTORY[activeContact.id].push({s:'me',t:text,time:ts});
  showTyping();
}
function showTyping(){
  const area=document.getElementById('convMsgs');
  const div=document.createElement('div');div.className='typing-row';div.id='typingBubble';
  div.innerHTML=`<div class="msg-av" style="background:${activeContact.color}">${activeContact.avatar}</div><div class="typing-bubble"><div class="td"></div><div class="td"></div><div class="td"></div></div>`;
  area.appendChild(div);area.scrollTop=area.scrollHeight;
  const replies=['Got it! 👍','Sure thing!','On it 💪','❤️','Let me check…','haha 😄'];
  setTimeout(()=>{
    div.remove();
    const now=new Date(),ts=now.getHours().toString().padStart(2,'0')+':'+now.getMinutes().toString().padStart(2,'0');
    const reply=replies[Math.floor(Math.random()*replies.length)];
    const r=document.createElement('div');r.className='msg-row them';
    r.innerHTML=`<div class="msg-av" style="background:${activeContact.color}">${activeContact.avatar}</div><div class="bubble">${reply}<div class="bubble-time">${ts}</div></div>`;
    area.appendChild(r);area.scrollTop=area.scrollHeight;
    MSG_HISTORY[activeContact.id].push({s:'them',t:reply,time:ts});
  },2000);
}
function handleAttach(e){
  const files=e.target.files; if(!files.length)return;
  const area=document.getElementById('convMsgs');
  Array.from(files).forEach(f=>{
    const sz=f.size>1048576?(f.size/1048576).toFixed(1)+' MB':(f.size/1024).toFixed(0)+' KB';
    const div=document.createElement('div');div.className='msg-row me';
    div.innerHTML=`<div class="msg-av" style="background:#7c3aed">${userProfile.avatar}</div><div><div class="bubble-file"><div class="bf-icon">📄</div><div><div class="bf-name">${esc(f.name)}</div><div class="bf-sz">${sz}</div></div></div><div class="bubble-time">Just now ✓</div></div>`;
    area.appendChild(div);
  });
  area.scrollTop=area.scrollHeight;e.target.value='';
  showToast(`Sent ${files.length} file(s) 📎`,'success');
}

/* ══ CALLS ══ */
function renderCallLog(){
  document.getElementById('recentCallsList').innerHTML=CALL_LOG.map(c=>{
    const con=CONTACTS.find(x=>x.id===c.cid);if(!con)return'';
    const cls=c.dir==='in'?'cl-in':c.dir==='out'?'cl-out':'cl-missed';
    const icon=c.dir==='in'?'↙':c.dir==='out'?'↗':'↙';
    return`<div class="call-log" onclick="launchCall('${c.type}',${c.cid})">
      <div class="chat-avatar" style="background:${con.color}">${con.avatar}</div>
      <div class="cl-info"><div class="cl-name">${con.name}</div>
        <div class="cl-sub"><span class="${cls}">${icon} ${c.dir}</span> · ${c.type==='video'?'📹':'📞'} ${c.type}</div></div>
      <div class="cl-time">${c.time}<br/><span style="color:var(--t3);font-size:.7rem">${c.dur}</span></div>
    </div>`;
  }).join('');
}
async function launchCall(type,cid){
  const con=cid?CONTACTS.find(c=>c.id===cid):CONTACTS[0];
  document.getElementById('callPeerName').textContent=con?con.name:'Calling…';
  document.getElementById('callAvatarBig').textContent=con?con.avatar:'?';
  document.getElementById('callAvatarBig').style.background=con?con.color:'#7c3aed';
  document.getElementById('callOverlay').classList.remove('hidden');
  micOn=true;camOn=type==='video';
  document.getElementById('btnCam').classList.toggle('off',!camOn);
  const localVid=document.getElementById('localVideo');
  if(type==='video'){
    try{
      callStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:callFacing},audio:true});
      localVid.srcObject=callStream;localVid.classList.remove('hidden');
      document.getElementById('callStatus').textContent='Connected';
      callSecs=0;callTimer=setInterval(()=>{
        callSecs++;
        const m=Math.floor(callSecs/60).toString().padStart(2,'0');
        const s=(callSecs%60).toString().padStart(2,'0');
        document.getElementById('callStatus').textContent=m+':'+s;
      },1000);
    }catch(err){showToast('Camera/mic permission denied. Grant access in browser settings.','error');document.getElementById('callStatus').textContent='No camera access';}
  }else{
    document.getElementById('callStatus').textContent='Voice call…';
    callSecs=0;callTimer=setInterval(()=>{callSecs++;const m=Math.floor(callSecs/60).toString().padStart(2,'0');const s=(callSecs%60).toString().padStart(2,'0');document.getElementById('callStatus').textContent=m+':'+s;},1000);
  }
}
function endCall(){
  clearInterval(callTimer);
  if(callStream){callStream.getTracks().forEach(t=>t.stop());callStream=null;}
  document.getElementById('localVideo').srcObject=null;
  document.getElementById('localVideo').classList.add('hidden');
  document.getElementById('callOverlay').classList.add('hidden');
  document.getElementById('callStatus').textContent='Connecting…';
  showToast('Call ended','info');
}
function toggleMic(){micOn=!micOn;if(callStream)callStream.getAudioTracks().forEach(t=>t.enabled=micOn);document.getElementById('btnMic').classList.toggle('off',!micOn);showToast(micOn?'Mic on 🎙️':'Mic muted 🔇','info');}
function toggleCam(){camOn=!camOn;if(callStream)callStream.getVideoTracks().forEach(t=>t.enabled=camOn);document.getElementById('btnCam').classList.toggle('off',!camOn);}
async function flipCamera(){
  callFacing=callFacing==='user'?'environment':'user';
  if(callStream){callStream.getTracks().forEach(t=>t.stop());}
  try{callStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:callFacing},audio:true});document.getElementById('localVideo').srcObject=callStream;}catch(e){showToast('Could not flip camera','error');}
}

/* ══ REELS ══ */
function renderReels(){
  let html=REELS_DATA.map(r=>`
    <div class="reel-slide" style="background:${r.bg}">
      <div class="reel-slide-bg">${r.em}</div>
      <div class="reel-overlay-grad"></div>
      <div class="reel-info">
        <div class="reel-author-row">
          <div class="reel-author-av">${r.author.charAt(1).toUpperCase()}</div>
          <div class="reel-author-name">${r.author}</div>
          <button class="reel-follow-btn" onclick="toggleFollow(this)">Follow</button>
        </div>
        <div class="reel-caption">${r.caption}</div>
        <div class="reel-sound-row">🎵 ${r.sound}</div>
      </div>
      <div class="reel-side-actions">
        <div class="reel-sa-btn" onclick="likeReel(this)"><div class="reel-sa-icon">❤️</div><div class="reel-sa-count">${r.likes}</div></div>
        <div class="reel-sa-btn" onclick="commentReel()"><div class="reel-sa-icon">💬</div><div class="reel-sa-count">${r.comments}</div></div>
        <div class="reel-sa-btn" onclick="shareReel()"><div class="reel-sa-icon">↗️</div></div>
        <div class="reel-sa-btn" onclick="saveReel(this)"><div class="reel-sa-icon">🔖</div></div>
      </div>
    </div>`).join('');
  document.getElementById('reelsScroll').innerHTML=html;
}
function toggleFollow(btn){btn.textContent=btn.textContent==='Follow'?'Following ✓':'Follow';btn.style.background=btn.textContent.includes('Following')?'rgba(255,255,255,.2)':'none';}
function likeReel(btn){const ic=btn.querySelector('.reel-sa-icon');ic.textContent=ic.textContent==='❤️'?'🤍':'❤️';}
function commentReel(){showModal('<div class="modal-title">Comments</div><div style="text-align:center;padding:32px;color:var(--t2)">💬 Comments section</div><div class="m-input-group"><input type="text" placeholder="Add a comment…"/></div><div class="m-actions"><button class="m-btn-primary" onclick="closeModal();showToast(\'Comment posted!\',\'success\')">Post</button></div>');}
function shareReel(){showToast('🔗 Link copied to clipboard!','success');}
function saveReel(btn){btn.querySelector('.reel-sa-icon').textContent='🔖';showToast('Saved to collection','success');}

/* ══ REEL RECORDER ══ */
function renderFilters(){
  document.getElementById('recFiltersRow').innerHTML=FILTERS.map((f,i)=>`
    <div class="rec-filter" onclick="applyFilter(${i})">
      <div class="rec-filter-thumb ${i===recFilter?'active-filter':''}" style="filter:${f.style}">
        <div class="rec-filter-thumb-inner">🌅</div>
      </div>
      <div class="rec-filter-label">${f.name}</div>
    </div>`).join('');
}
function applyFilter(i){
  recFilter=i;
  document.getElementById('recVideo').style.filter=FILTERS[i].style;
  document.getElementById('recCanvas').style.filter=FILTERS[i].style;
  document.getElementById('recFilterName').textContent=FILTERS[i].name;
  renderFilters();
}
async function openReelRecorder(){
  document.getElementById('recorderOverlay').classList.remove('hidden');
  renderFilters();
  try{
    recStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:recFacing},audio:true});
    document.getElementById('recVideo').srcObject=recStream;
  }catch(e){showToast('Camera access denied. Please allow camera in browser settings.','error');}
}
function closeRecorder(){
  if(recStream)recStream.getTracks().forEach(t=>t.stop());
  if(recTimer)clearInterval(recTimer);
  recIsRecording=false;recChunks=[];recSecs=0;
  document.getElementById('recBtn').classList.remove('recording');
  document.getElementById('recProgressRing').style.display='none';
  document.getElementById('recPreview').classList.add('hidden');
  document.getElementById('recorderOverlay').classList.add('hidden');
}
async function flipRecorderCamera(){
  recFacing=recFacing==='user'?'environment':'user';
  if(recStream)recStream.getTracks().forEach(t=>t.stop());
  try{recStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:recFacing},audio:true});document.getElementById('recVideo').srcObject=recStream;}catch(e){}
}
function startRecording(){
  if(recIsRecording)return;
  recIsRecording=true;recChunks=[];recSecs=0;
  document.getElementById('recBtn').classList.add('recording');
  document.getElementById('recProgressRing').style.display='block';
  try{
    recMediaRecorder=new MediaRecorder(recStream);
    recMediaRecorder.ondataavailable=e=>{if(e.data.size>0)recChunks.push(e.data);};
    recMediaRecorder.start();
  }catch(e){showToast('Recording not supported in this browser','error');return;}
  const circle=document.getElementById('recProgressCircle');
  const maxSecs=90;
  recTimer=setInterval(()=>{
    recSecs++;
    const m=Math.floor(recSecs/60),s=recSecs%60;
    document.getElementById('recTimer').textContent=m+':'+(s<10?'0':'')+s;
    const pct=recSecs/maxSecs;
    circle.style.strokeDashoffset=289*(1-pct);
    if(recSecs>=maxSecs)stopRecording();
  },1000);
}
function stopRecording(){
  if(!recIsRecording)return;
  recIsRecording=false;clearInterval(recTimer);
  document.getElementById('recBtn').classList.remove('recording');
  if(recMediaRecorder&&recMediaRecorder.state!=='inactive'){
    recMediaRecorder.onstop=()=>{
      const blob=new Blob(recChunks,{type:'video/webm'});
      const url=URL.createObjectURL(blob);
      document.getElementById('recPreviewVideo').src=url;
      document.getElementById('recPreview').classList.remove('hidden');
    };
    recMediaRecorder.stop();
  }
}
function discardRecording(){
  document.getElementById('recPreview').classList.add('hidden');
  document.getElementById('recProgressRing').style.display='none';
  document.getElementById('recTimer').textContent='0:00';recSecs=0;recChunks=[];
}
function postReel(){
  closeRecorder();
  const newReel={id:REELS_DATA.length+1,em:'🎬',author:'@'+userProfile.name.toLowerCase().replace(' ','_'),caption:'My new reel! 🎥',likes:'0',comments:'0',sound:'Original Audio',bg:'linear-gradient(135deg,#7c3aed,#06b6d4)'};
  REELS_DATA.unshift(newReel);renderReels();
  showToast('🚀 Reel posted!','success');navigateTo('reels');
}
function handleGalleryUpload(input){
  if(input.files[0]){showToast('Media selected! Review & post.','info');stopRecording();}
}
function toggleBeautyMode(){recBeauty=!recBeauty;document.getElementById('recVideo').style.filter=FILTERS[recFilter].style+(recBeauty?' brightness(1.1) contrast(.95)':'');showToast(recBeauty?'Beauty mode on ✨':'Beauty mode off','info');}

/* ══ SHOP ══ */
function renderShop(cat){
  if(cat)shopCat=cat;
  document.getElementById('shopCatsRow').innerHTML=SHOP_CATS.map(c=>`<button class="scat ${c===shopCat?'active':''}" onclick="renderShop('${c}')">${c}</button>`).join('');
  const list=shopCat==='All'?products:products.filter(p=>p.cat===shopCat);
  document.getElementById('shopProductGrid').innerHTML=list.map((p,i)=>`
    <div class="prod-card" style="animation-delay:${i*.05}s" onclick="viewProduct(${p.id})">
      <div class="prod-img">${p.em}${p.badge?`<span class="prod-badge">${p.badge}</span>`:''}</div>
      <div class="prod-info">
        <div class="prod-name">${p.name}</div>
        <div class="prod-brand">${p.brand}</div>
        <div class="prod-row"><div><span class="prod-price">$${p.price}</span> <span class="prod-orig">$${p.orig}</span></div><span class="prod-stars">${p.stars}</span></div>
        <button id="padd-${p.id}" class="prod-add-btn ${cart.find(c=>c.id===p.id)?'added':''}" onclick="event.stopPropagation();addToCart(${p.id})">${cart.find(c=>c.id===p.id)?'✓ In Cart':'Add to Cart'}</button>
      </div>
    </div>`).join('');
}
function filterProducts(q){
  document.querySelectorAll('.prod-card').forEach((card,i)=>{
    const all=shopCat==='All'?products:products.filter(p=>p.cat===shopCat);
    const p=all[i];
    card.style.display=(!p||(!q||p.name.toLowerCase().includes(q)||p.brand.toLowerCase().includes(q)))?'':'none';
  });
}
function addToCart(id){
  const p=products.find(x=>x.id===id);if(!p)return;
  const ex=cart.find(c=>c.id===id);
  if(ex)ex.qty++;else cart.push({...p,qty:1});
  updateCartBadge();
  const btn=document.getElementById('padd-'+id);
  if(btn){btn.textContent='✓ In Cart';btn.classList.add('added');}
  showToast(`🛒 ${p.name} added!`,'success');
}
function updateCartBadge(){
  const total=cart.reduce((s,c)=>s+c.qty,0);
  document.getElementById('cartBadge').textContent=total;
  document.getElementById('dot-shop').style.display=total>0?'block':'none';
}
function openCart(){
  if(!cart.length){showToast('Your cart is empty 🛒','info');return;}
  const total=cart.reduce((s,c)=>s+c.price*c.qty,0);
  showModal(`<div class="modal-title">🛒 Cart (${cart.length} items)</div>
    ${cart.map(c=>`<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)">
      <span style="font-size:1.8rem">${c.em}</span>
      <div style="flex:1"><div style="font-weight:700;font-size:.88rem">${c.name}</div>
        <div style="display:flex;align-items:center;gap:8px;margin-top:4px">
          <button onclick="changeQty(${c.id},-1)" style="width:24px;height:24px;border-radius:50%;background:var(--s3);border:none;cursor:pointer;color:var(--t1)">−</button>
          <span id="qty-${c.id}">${c.qty}</span>
          <button onclick="changeQty(${c.id},1)" style="width:24px;height:24px;border-radius:50%;background:var(--s3);border:none;cursor:pointer;color:var(--t1)">+</button>
        </div>
      </div>
      <div>
        <div style="font-weight:700;color:var(--purpleL);font-size:.9rem" id="ctotal-${c.id}">$${(c.price*c.qty).toFixed(2)}</div>
        <button onclick="removeFromCart(${c.id})" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:.75rem">Remove</button>
      </div>
    </div>`).join('')}
    <div style="display:flex;justify-content:space-between;padding:12px 0;font-weight:800;font-size:1rem">
      <span>Total</span><span style="color:var(--purpleL)">$${total.toFixed(2)}</span>
    </div>
    <div class="m-actions"><button class="m-btn-outline" onclick="closeModal()">Continue</button>
    <button class="m-btn-primary" onclick="checkout()">Pay Now 💳</button></div>`);
}
function changeQty(id,delta){
  const item=cart.find(c=>c.id===id);if(!item)return;
  item.qty=Math.max(1,item.qty+delta);
  const el=document.getElementById('qty-'+id);if(el)el.textContent=item.qty;
  const ct=document.getElementById('ctotal-'+id);if(ct)ct.textContent='$'+(item.price*item.qty).toFixed(2);
  updateCartBadge();
}
function removeFromCart(id){
  cart=cart.filter(c=>c.id!==id);updateCartBadge();closeModal();
  if(cart.length)openCart();else showToast('Cart is empty','info');
  renderShop();
}
function checkout(){
  closeModal();cart=[];updateCartBadge();renderShop();
  showToast('🎉 Order placed! Delivery in 3–5 days.','success');
}
function viewProduct(id){
  const p=products.find(x=>x.id===id);if(!p)return;
  showModal(`<div style="text-align:center;font-size:4.5rem;margin-bottom:12px">${p.em}</div>
    <div class="modal-title">${p.name}</div>
    <div style="color:var(--t2);margin-bottom:8px">${p.brand}</div>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
      <span style="font-size:1.4rem;font-weight:800;color:var(--purpleL)">$${p.price}</span>
      <span style="text-decoration:line-through;color:var(--t3)">$${p.orig}</span>
      <span style="color:var(--t2)">${p.stars}</span>
    </div>
    <p style="color:var(--t2);font-size:.88rem;line-height:1.6;margin-bottom:16px">A premium product with exceptional quality. Ships in 2–4 business days. 1-year warranty included. 🛡️</p>
    <div class="m-actions"><button class="m-btn-outline" onclick="closeModal()">Close</button>
    <button class="m-btn-primary" onclick="addToCart(${id});closeModal()">Add to Cart 🛒</button></div>`);
}
function openAddProduct(){
  const emojis=['🖥️','📱','💡','🎒','🧴','🏀','🎮','🖨️','📷','🎵'];
  let chosenEmoji='🖥️';
  showModal(`<div class="modal-title">+ Add Your Product</div>
    <div class="emoji-picker-inline">${emojis.map(e=>`<span class="ep-em" onclick="selectProductEmoji(this,'${e}')">${e}</span>`).join('')}</div>
    <div class="m-input-group"><label>Product Name</label><input type="text" id="np-name" placeholder="e.g. Wireless Earbuds"/></div>
    <div class="m-input-group"><label>Brand</label><input type="text" id="np-brand" placeholder="e.g. MyBrand"/></div>
    <div class="m-input-group"><label>Price ($)</label><input type="number" id="np-price" placeholder="99"/></div>
    <div class="m-input-group"><label>Category</label>
      <select id="np-cat">${SHOP_CATS.slice(1).map(c=>`<option>${c}</option>`).join('')}</select>
    </div>
    <div class="m-actions"><button class="m-btn-outline" onclick="closeModal()">Cancel</button>
    <button class="m-btn-primary" onclick="submitProduct()">List Product 🚀</button></div>`);
}
function selectProductEmoji(el,em){
  document.querySelectorAll('.ep-em').forEach(e=>e.classList.remove('selected'));
  el.classList.add('selected');el.dataset.em=em;
}
function submitProduct(){
  const name=document.getElementById('np-name').value.trim();
  const brand=document.getElementById('np-brand').value.trim();
  const price=parseFloat(document.getElementById('np-price').value)||0;
  const cat=document.getElementById('np-cat').value;
  const em=document.querySelector('.ep-em.selected')?.dataset.em||'📦';
  if(!name||!brand||!price){showToast('Please fill all fields','error');return;}
  const id=Date.now();
  products.unshift({id,em,name,brand,price,orig:Math.round(price*1.2),stars:'⭐⭐⭐⭐⭐',badge:'New',cat});
  closeModal();renderShop();showToast('🎉 Product listed!','success');
}

/* ══ PAY ══ */
function renderCards(){
  document.getElementById('payCardsSwipe').innerHTML=CARDS.map(c=>`
    <div class="real-card" style="background:${c.grad}">
      <div class="rc-chip"></div>
      <div class="rc-num">•••• •••• •••• ${c.num}</div>
      <div class="rc-row">
        <div><div class="rc-lbl">Card Holder</div><div class="rc-val">${c.holder}</div></div>
        <div><div class="rc-lbl">Expires</div><div class="rc-val">${c.exp}</div></div>
        <div class="rc-brand">${c.brand}</div>
      </div>
    </div>`).join('');
}
function renderTransactions(){
  document.getElementById('payTxList').innerHTML=TXS.map(t=>`
    <div class="tx-item">
      <div class="tx-icon" style="background:${t.color}22">${t.icon}</div>
      <div style="flex:1"><div class="tx-desc">${t.desc}</div><div class="tx-date">${t.date}</div></div>
      <div class="tx-amount ${t.amount>0?'tx-pos':'tx-neg'}">${t.amount>0?'+':''}\$${Math.abs(t.amount).toFixed(2)}</div>
    </div>`).join('');
}
function openAddCard(){
  showModal(`<div class="modal-title">💳 Add New Card</div>
    <div class="m-input-group"><label>Card Number</label><input type="text" id="cn-num" placeholder="1234 5678 9012 3456" maxlength="19" oninput="formatCardNum(this)"/></div>
    <div style="display:flex;gap:12px">
      <div class="m-input-group" style="flex:1"><label>Expiry (MM/YY)</label><input type="text" id="cn-exp" placeholder="MM/YY" maxlength="5" oninput="formatExpiry(this)"/></div>
      <div class="m-input-group" style="flex:1"><label>CVV</label><input type="password" id="cn-cvv" placeholder="•••" maxlength="4"/></div>
    </div>
    <div class="m-input-group"><label>Card Holder Name</label><input type="text" id="cn-name" placeholder="JOHN DOE"/></div>
    <div class="m-input-group"><label>Card Type</label><select id="cn-type"><option>VISA</option><option>Mastercard</option><option>Amex</option></select></div>
    <div class="m-actions"><button class="m-btn-outline" onclick="closeModal()">Cancel</button>
    <button class="m-btn-primary" onclick="saveCard()">Save Card 💳</button></div>`);
}
function formatCardNum(el){let v=el.value.replace(/\D/g,'');v=v.match(/.{1,4}/g)?.join(' ')||v;el.value=v;}
function formatExpiry(el){let v=el.value.replace(/\D/g,'');if(v.length>=2)v=v.slice(0,2)+'/'+v.slice(2);el.value=v;}
function saveCard(){
  const num=document.getElementById('cn-num').value.replace(/\s/g,'').slice(-4);
  const exp=document.getElementById('cn-exp').value;
  const name=document.getElementById('cn-name').value.toUpperCase()||'CARD HOLDER';
  const brand=document.getElementById('cn-type').value;
  if(!num||num.length<4||!exp){showToast('Please fill card details','error');return;}
  const grads=['linear-gradient(135deg,#10b981,#0891b2)','linear-gradient(135deg,#f97316,#dc2626)','linear-gradient(135deg,#8b5cf6,#06b6d4)'];
  CARDS.push({id:Date.now(),num,holder:name,exp,brand,grad:grads[CARDS.length%grads.length]});
  renderCards();closeModal();showToast('✅ Card added!','success');
}
function openPayAction(type){
  const cfg={
    send:{title:'💸 Send Money',body:`<div class="m-input-group"><label>To (name or @handle)</label><input type="text" placeholder="@sarah_wilson"/></div><div class="m-input-group"><label>Amount</label><input type="number" placeholder="0.00"/></div><div class="m-input-group"><label>Note</label><input type="text" placeholder="For lunch 🍕"/></div>`,action:"showToast('💸 Sent successfully!','success')"},
    receive:{title:'📥 Receive',body:`<div class="qr-visual">⊞</div><div style="text-align:center;color:var(--t2);font-size:.85rem;margin-bottom:8px">Scan to pay you</div><div style="text-align:center;font-weight:700">@${userProfile.name.toLowerCase().replace(' ','_')}</div>`,action:"showToast('📋 Link copied!','success')"},
    topup:{title:'💳 Top Up',body:`<div class="m-input-group"><label>From Card</label><select>${CARDS.map(c=>`<option>•••• ${c.num}</option>`).join('')}</select></div><div class="m-input-group"><label>Amount</label><input type="number" placeholder="0.00"/></div>`,action:"showToast('✅ Wallet topped up!','success')"},
    scan:{title:'📷 Scan QR',body:`<div class="qr-visual">📷</div><div style="text-align:center;color:var(--t2);font-size:.85rem">Point camera at QR code</div>`,action:"showToast('✅ QR scanned!','success')"},
  };
  const c=cfg[type];
  showModal(`<div class="modal-title">${c.title}</div>${c.body}<div class="m-actions"><button class="m-btn-outline" onclick="closeModal()">Cancel</button><button class="m-btn-primary" onclick="closeModal();${c.action}">Confirm</button></div>`);
}
function showAllTransactions(){showToast('All transactions view','info');}

/* ══ PROFILE SCREEN ══ */
function renderProfileScreen(){
  const av=document.getElementById('profileBigAvatar');
  if(userProfile.photo){av.innerHTML=`<img src="${userProfile.photo}"/>`;} else av.textContent=userProfile.avatar;
  document.getElementById('profileDisplayName').textContent=userProfile.name;
  document.getElementById('profileDisplayBio').textContent=userProfile.bio||'NexChat User ✨';
}
function doLogout(){
  showModal(`<div class="modal-title">Log Out?</div><p style="color:var(--t2);margin-bottom:16px">Are you sure you want to log out of NexChat?</p>
    <div class="m-actions"><button class="m-btn-outline" onclick="closeModal()">Cancel</button>
    <button class="m-btn-primary" style="background:var(--red);box-shadow:none" onclick="confirmLogout()">Log Out</button></div>`);
}
function confirmLogout(){
  closeModal();document.getElementById('app').classList.add('hidden');
  document.getElementById('authFlow').classList.remove('hidden');
  showScreen('authLogin');
  document.querySelectorAll('.otp-box').forEach(b=>{b.value='';b.classList.remove('filled');});
  cart=[];updateCartBadge();
}

/* ══ MODAL ══ */
function showModal(html){
  document.getElementById('modalBody').innerHTML=html;
  document.getElementById('modalBack').classList.remove('hidden');
}
function closeModal(e){
  if(e&&e.target!==document.getElementById('modalBack'))return;
  document.getElementById('modalBack').classList.add('hidden');
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.getElementById('modalBack').classList.add('hidden');});

/* ══ TOAST ══ */
function showToast(msg,type='info'){
  const stack=document.getElementById('toastStack');
  const t=document.createElement('div');t.className=`toast ${type}`;t.textContent=msg;
  stack.appendChild(t);
  setTimeout(()=>{t.style.opacity='0';t.style.transform='translateY(10px) scale(.9)';t.style.transition='all .3s';setTimeout(()=>t.remove(),300);},3000);
}

/* ══ HELPERS ══ */
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
Object.assign(window,{
  switchAuthTab,toggleCountryPicker,pickCountry,filterCountries,sendOTP,verifyOTP,resendOTP,goBackToLogin,pickProfilePhoto,handleProfilePhoto,completeProfile,
  navigateTo,handleTopbarBack,openSearch,openProfile,openNewChat,viewStory,
  sendMsg,handleAttach,insertEmoji:()=>{},triggerAttach:()=>document.getElementById('attachInput').click(),
  launchCall,endCall,toggleMic,toggleCam,flipCamera,
  openReelRecorder,closeRecorder,flipRecorderCamera,startRecording,stopRecording,discardRecording,postReel,handleGalleryUpload,toggleBeautyMode,applyFilter,toggleFollow,likeReel,commentReel,shareReel,saveReel,
  renderShop,filterProducts,addToCart,openCart,changeQty,removeFromCart,checkout,viewProduct,openAddProduct,selectProductEmoji,submitProduct,
  openAddCard,formatCardNum,formatExpiry,saveCard,openPayAction,showAllTransactions,
  doLogout,confirmLogout,
  showModal,closeModal,showToast,
});
