// Français · Grade 4 · Leçon 1 « La rencontre » (Français plus 1, pages 8–9 · Cahier pages 4–5).
// All the content of the lesson. The engine is french-lesson.js. Pictures: img/lesson-1/<name>.jpg
// Picture fields: img: "bouli" (a file in img/lesson-1/), or emoji: "👧".
(function(){
const NAMES={ // name → [English, Українська, العربية]
  "Bouli":["Bouli","Булі","بولي"], "Alice":["Alice","Аліса","أليس"], "Noura":["Noura","Нура","نورا"],
  "Minou":["Minou","Міну","مينو"], "Mounir":["Mounir","Мунір","منير"], "Fouad":["Fouad","Фуад","فؤاد"],
  "Stéphanie":["Stéphanie","Стефані","ستيفاني"], "Nounours":["Nounours","Нунурс","نونورس"], "Lapinou":["Lapinou","Лапіну","لابينو"],
  "Mark":["Mark","Марк","مارك"], "Luc":["Luc","Люк","لوك"], "Amélie":["Amélie","Амелі","أميلي"], "Sara":["Sara","Сара","سارة"]
};
const N=(n,i)=>(NAMES[n]||[n,n,n])[i];

window.LESSON={
  n:1, grade:4, title:"La rencontre", en:"The meeting", uk:"Зустріч", ar:"اللقاء",
  book:"Français plus 1 · pages 8–9 · Cahier pages 4–5",
  cover:"comic",

  // The people of the lesson. g: "il" (boy / animal) or "elle" (girl).
  people:[
    {fr:"Bouli",     img:"bouli",     g:"il",   en:"Bouli, the little alien", uk:"Булі, маленький інопланетянин", ar:"بولي، الكائن الفضائي الصغير"},
    {fr:"Alice",     img:"alice",     g:"elle", en:"Alice, a girl",  uk:"Аліса, дівчинка", ar:"أليس، بنت"},
    {fr:"Noura",     img:"noura",     g:"elle", en:"Noura, a girl",  uk:"Нура, дівчинка",  ar:"نورا، بنت"},
    {fr:"Minou",     img:"minou",     g:"il",   en:"Minou, the cat", uk:"Міну, кіт",       ar:"مينو، القطّ"},
    {fr:"Mounir",    img:"mounir",    g:"il",   en:"Mounir, a boy",  uk:"Мунір, хлопчик",  ar:"منير، ولد"},
    {fr:"Fouad",     img:"fouad",     g:"il",   en:"Fouad, a boy",   uk:"Фуад, хлопчик",   ar:"فؤاد، ولد"},
    {fr:"Stéphanie", img:"stephanie", g:"elle", en:"Stéphanie, a girl", uk:"Стефані, дівчинка", ar:"ستيفاني، بنت"},
    {fr:"Nounours",  img:"nounours",  g:"il",   en:"Nounours, the teddy bear", uk:"Нунурс, ведмедик", ar:"نونورس، الدبدوب"},
    {fr:"Lapinou",   img:"lapinou",   g:"il",   en:"Lapinou, the bunny", uk:"Лапіну, зайчик", ar:"لابينو، الأرنب"},
  ],

  // Words & phrases to say (flash cards). ic: a small badge on the picture.
  phrases:[
    {fr:"Bonjour !",                 img:"panel2",      en:"Hello!",           uk:"Привіт! / Добрий день!", ar:"مرحبًا!"},
    {fr:"Je m’appelle…",             img:"mounir-talk", en:"My name is…",      uk:"Мене звати…",  ar:"اسمي…"},
    {fr:"Comment tu t’appelles ?",   img:"ask",         en:"What is your name?", uk:"Як тебе звати?", ar:"ما اسمك؟"},
    {fr:"Moi",                       img:"moi",         en:"Me",               uk:"Я (мене)",     ar:"أنا"},
    {fr:"Toi",                       img:"toi",         en:"You",              uk:"Ти (тебе)",    ar:"أنت"},
    {fr:"C’est…",                    img:"qui-1",       en:"This is…",         uk:"Це…",          ar:"هذا… / هذه…"},
    {fr:"Il",                        img:"fouad", ic:"👦", en:"He (a boy)",    uk:"Він",          ar:"هو"},
    {fr:"Elle",                      img:"stephanie", ic:"👧", en:"She (a girl)", uk:"Вона",      ar:"هي"},
  ],

  // The story (page 8). Each card: a picture and what the people say.
  story:[
    {img:"panel1", lines:[], note:{fr:"Regarde !", en:"Look! A little spaceship lands in the park.", uk:"Дивись! Маленький космічний корабель сідає в парку.", ar:"انظر! مركبة فضائية صغيرة تهبط في الحديقة."}},
    {img:"panel2", lines:[{who:"Bouli", fr:"Bonjour ! Je m’appelle Bouli !"}]},
    {img:"panel3", lines:[{who:"Bouli", fr:"Et toi, comment tu t’appelles ?"},{who:"Alice", fr:"Moi, je m’appelle Alice !"}]},
    {img:"panel4", lines:[{who:"Alice", fr:"C’est Noura, c’est Minou."}]},
    {img:"ph-bouli", title:"Des phrases pour parler", lines:[{who:"", fr:"Tu t’appelles Bouli."}]},
    {img:"ph-stephanie", title:"Des phrases pour parler", lines:[{who:"", fr:"C’est Stéphanie. Elle s’appelle Stéphanie."}]},
    {img:"ph-fouad", title:"Des phrases pour parler", lines:[{who:"", fr:"C’est Fouad. Il s’appelle Fouad."}]},
  ],

  // Le son « ou » (page 9): the 8 words of the lesson, and words without « ou » for the game.
  ou:{img:"ou", words:["Bonjour","Bouli","Fouad","Mounir","Nounours","Lapinou","Noura","Minou"],
      pics:{"Bonjour":"panel2"},
      not:["Alice","Stéphanie","Moi","Toi","Elle","Il"]},

  // Le verbe s'appeler (page 9)
  verb:{img:"verbe", rows:[
    {p:"Je",   el:"m’", end:"e",  name:"Noura",  img:"noura",       en:"I am called",   uk:"Мене звати", ar:"اسمي"},
    {p:"Tu",   el:"t’", end:"es", name:"Mounir", img:"mounir-talk", en:"You are called", uk:"Тебе звати", ar:"اسمك"},
    {p:"Il",   el:"s’", end:"e",  name:"Bouli",  img:"bouli",       en:"He is called",  uk:"Його звати", ar:"اسمه"},
    {p:"Elle", el:"s’", end:"e",  name:"Alice",  img:"alice",       en:"She is called", uk:"Її звати",   ar:"اسمها"},
  ]},

  // Sentences for "Build the sentence" and "Listen" (picture + sentence)
  sentences:[
    {fr:"Bonjour ! Je m’appelle Bouli !", img:"panel2"},
    {fr:"Comment tu t’appelles ?",        img:"ask"},
    {fr:"Moi, je m’appelle Alice !",      img:"moi"},
    {fr:"Je m’appelle Mounir.",           img:"mounir-talk"},
    {fr:"Je m’appelle Fouad.",            img:"fouad"},
    {fr:"Tu t’appelles Bouli.",           img:"ph-bouli"},
    {fr:"Il s’appelle Minou.",            img:"minou"},
    {fr:"Il s’appelle Nounours.",         img:"nounours"},
    {fr:"Il s’appelle Lapinou.",          img:"lapinou"},
    {fr:"Il s’appelle Fouad.",            img:"cest-fouad"},
    {fr:"Elle s’appelle Alice.",          img:"alice"},
    {fr:"Elle s’appelle Noura.",          img:"noura"},
    {fr:"Elle s’appelle Stéphanie.",      img:"ph-stephanie"},
    {fr:"C’est Noura.",                   img:"noura"},
    {fr:"C’est Bouli.",                   img:"qui-1"},
  ],

  // Words for "Build the word"
  build:["Bouli","Alice","Noura","Minou","Mounir","Fouad","Lapinou","Nounours","Stéphanie","Bonjour","Moi","Toi","Elle"],

  // School exercises (book, cahier, class work, homework). One menu tile per section.
  exercises:[
    {k:"ordre", t:"Mets en ordre", en:"Put the words in order", ic:"🧱", img:"ph-fouad", from:"Travail de classe 1 · Exercices de mi-terme · Devoir noté 1",
     items:[
      {type:"order", fr:"Il s’appelle Fouad.", img:"fouad"},
      {type:"order", fr:"Toi, tu t’appelles Stéphanie ?", img:"r2"},
      {type:"order", fr:"Comment tu t’appelles ?", img:"r4"},
      {type:"order", fr:"Il s’appelle Mounir.", img:"mounir"},
      {type:"order", fr:"Je m’appelle Mark.", emoji:"🙋‍♂️"},
      {type:"order", fr:"Il s’appelle Luc.", emoji:"👦"},
      {type:"order", fr:"Elle s’appelle Amélie.", emoji:"👧"},
     ]},
    {k:"verbe", t:"Complète le verbe s’appeler", en:"Complete the verb", ic:"✍️", img:"verbe", from:"Cahier p. 5 ex. 5 et 6 · Devoir",
     items:[
      {type:"fill", img:"x-bouli",     parts:["Je ",["m’","t’","s’"],"appell",["e","es"]," Bouli."], ans:["m’","e"]},
      {type:"fill", img:"mounir-talk", parts:["Tu ",["m’","t’","s’"],"appell",["e","es"]," Mounir."], ans:["t’","es"]},
      {type:"fill", img:"bouli",       parts:["Il ",["m’","t’","s’"],"appell",["e","es"]," Bouli."], ans:["s’","e"]},
      {type:"fill", img:"alice",       parts:["Elle ",["m’","t’","s’"],"appell",["e","es"]," Alice."], ans:["s’","e"]},
      {type:"fill", img:"fouad",       parts:["Tu t’appell",["e","es"]," Fouad."], ans:["es"]},
      {type:"fill", img:"stephanie",   parts:["Elle s’appell",["e","es"]," Stéphanie."], ans:["e"]},
      {type:"fill", img:"nounours",    parts:["Il s’appell",["e","es"]," Nounours."], ans:["e"]},
      {type:"fill", emoji:"👧",        parts:["Tu ",["t’appelles","s’appelle","m’appelle"]," Sara ?"], ans:["t’appelles"]},
      {type:"fill", img:"minou",       parts:["Il ",["s’appelle","t’appelles","m’appelle"]," Minou."], ans:["s’appelle"]},
      {type:"fill", img:"x-bouli",     parts:["Je ",["m’appelle","s’appelle","t’appelles"]," Bouli."], ans:["m’appelle"]},
      {type:"fill", img:"stephanie",   parts:["Elle ",["s’appelle","m’appelle","t’appelles"]," Stéphanie."], ans:["s’appelle"]},
     ]},
    {k:"regarde", t:"Regarde et écris", en:"Look at the picture and write", ic:"👀", img:"minou-face", from:"Cahier p. 5 ex. 3 et 4 · Exercices de mi-terme ex. 5",
     items:[
      {type:"order", img:"minou-face", q:"Comment il s’appelle ?", fr:"Il s’appelle Minou."},
      {type:"order", img:"alice-face", q:"Comment elle s’appelle ?", fr:"Elle s’appelle Alice."},
      {type:"order", img:"ex3", q:"Stéphanie :", fr:"Bonjour ! Je m’appelle Stéphanie !"},
      {type:"order", img:"ex3", q:"Stéphanie :", fr:"Et toi, comment tu t’appelles ?"},
      {type:"order", img:"ex3", q:"Alice :", fr:"Moi, je m’appelle Alice."},
     ]},
    {k:"parle", t:"Comment il s’appelle ?", en:"What is his / her name?", ic:"🗣️", img:"mounir", from:"Livre p. 9 · Parle 1, 2 et 3",
     items:"people-mc"},
    {k:"qui", t:"Qui est-ce ?", en:"Who is it?", ic:"❓", img:"qui-2", from:"Livre p. 9 · Parle 4",
     items:[
      {type:"mc", img:"qui-1", q:"Qui est-ce ?", opts:["C’est Bouli.","C’est Alice.","C’est Minou."]},
      {type:"mc", img:"qui-2", q:"Qui est-ce ?", opts:["C’est Nounours.","C’est Lapinou.","C’est Stéphanie."]},
      {type:"mc", img:"qui-3", q:"Qui est-ce ?", opts:["C’est Alice.","C’est Noura.","C’est Bouli."]},
      {type:"mc", img:"qui-4", q:"Qui est-ce ?", opts:["C’est Lapinou.","C’est Minou.","C’est Mounir."]},
     ]},
    {k:"relie", t:"Lis. Relie.", en:"Read and match", ic:"🔗", img:"r1", from:"Cahier p. 4 ex. 2",
     items:[
      {type:"match", pairs:[
        {img:"r3", fr:"Je m’appelle Stéphanie."},
        {img:"r4", fr:"Bonjour ! Comment tu t’appelles ?"},
        {img:"r2", fr:"Elle s’appelle Stéphanie."},
        {img:"r1", fr:"Il s’appelle Fouad."}]},
     ]},
    {k:"entends", t:"Écoute. Touche.", en:"Listen and tap the picture", ic:"👂", img:"x-alice", from:"Cahier p. 4 ex. 1",
     items:[
      {type:"tap", say:"Bonjour ! Je m’appelle Bouli !", opts:["x-bouli","x-alice","x-mounir"]},
      {type:"tap", say:"Comment tu t’appelles ?", opts:["ask","x-bouli","x-mounir"]},
      {type:"tap", say:"C’est Alice. Elle s’appelle Alice.", opts:["cest-alice","x-mounir","x-bouli"]},
      {type:"tap", say:"Moi, je m’appelle Alice.", opts:["x-alice","x-bouli","cest-fouad"]},
      {type:"tap", say:"C’est Fouad. Il s’appelle Fouad.", opts:["cest-fouad","cest-alice","ask"]},
      {type:"tap", say:"Je m’appelle Mounir.", opts:["x-mounir","x-alice","x-bouli"]},
     ]},
    {k:"ou", t:"Le son « ou »", en:"Find the words with « ou »", ic:"🔉", img:"minou", from:"Exercices de mi-terme ex. 4",
     items:"ou-yn"},
    {k:"lis", t:"Compréhension : Elyssa", en:"Read the text and answer", ic:"📄", emoji:"👧🎒", from:"Compréhension écrite 1",
     text:{emoji:"👧🎒", lines:["Bonjour !","Je suis Elyssa, je suis une fille.","J’ai huit ans.","Ma sœur s’appelle Lina,","mon frère s’appelle Amine.","Je suis une élève, mon cartable est rouge."]},
     items:[
      {type:"mc", emoji:"👧", q:"Elyssa est…", opts:["une fille","un garçon"], icons:["👧","👦"]},
      {type:"mc", emoji:"🎂", q:"Elyssa a…", opts:["8 ans","7 ans","9 ans"], say:["huit ans","sept ans","neuf ans"]},
      {type:"mc", emoji:"👧👧", q:"Lina est…", opts:["la sœur d’Elyssa","la mère d’Elyssa","la grand-mère d’Elyssa"], icons:["👧","👩","👵"]},
      {type:"mc", emoji:"👧👦", q:"Amine est…", opts:["le frère d’Elyssa","la mère d’Elyssa","la sœur d’Elyssa"], icons:["👦","👩","👧"]},
      {type:"mc", emoji:"🎒", q:"Le cartable d’Elyssa est…", opts:["rouge","bleu","vert"], icons:["🟥","🟦","🟩"]},
     ]},
  ],

  // Translations of everything that is not built from a pattern (below).
  dict:{
    "Bonjour !":["Hello!","Привіт!","مرحبًا!"],
    "Bonjour":["Hello","Привіт","مرحبًا"],
    "Regarde !":["Look!","Дивись!","انظر!"],
    "Comment tu t’appelles ?":["What is your name?","Як тебе звати?","ما اسمك؟"],
    "Et toi, comment tu t’appelles ?":["And you, what is your name?","А тебе як звати?","وأنت، ما اسمك؟"],
    "Bonjour ! Comment tu t’appelles ?":["Hello! What is your name?","Привіт! Як тебе звати?","مرحبًا! ما اسمك؟"],
    "Comment il s’appelle ?":["What is his name?","Як його звати?","ما اسمه؟"],
    "Comment elle s’appelle ?":["What is her name?","Як її звати?","ما اسمها؟"],
    "Qui est-ce ?":["Who is it?","Хто це?","من هذا؟"],
    "C’est Noura, c’est Minou.":["This is Noura, this is Minou.","Це Нура, це Міну.","هذه نورا، وهذا مينو."],
    "Moi":["Me","Я","أنا"],"Toi":["You","Ти","أنت"],"Il":["He","Він","هو"],"Elle":["She","Вона","هي"],
    "Elyssa est…":["Elyssa is…","Еліса —…","إليسا…"],
    "Elyssa a…":["Elyssa is … years old","Елісі … років","عمر إليسا…"],
    "Lina est…":["Lina is…","Ліна —…","لينا هي…"],
    "Amine est…":["Amine is…","Амін —…","أمين هو…"],
    "Le cartable d’Elyssa est…":["Elyssa's school bag is…","Портфель Еліси…","حقيبة إليسا…"],
    "une fille":["a girl","дівчинка","بنت"],"un garçon":["a boy","хлопчик","ولد"],
    "8 ans":["8 years old","8 років","8 سنوات"],"7 ans":["7 years old","7 років","7 سنوات"],"9 ans":["9 years old","9 років","9 سنوات"],
    "la sœur d’Elyssa":["Elyssa's sister","сестра Еліси","أخت إليسا"],"la mère d’Elyssa":["Elyssa's mother","мама Еліси","أم إليسا"],
    "la grand-mère d’Elyssa":["Elyssa's grandmother","бабуся Еліси","جدة إليسا"],"le frère d’Elyssa":["Elyssa's brother","брат Еліси","أخو إليسا"],
    "rouge":["red","червоний","أحمر"],"bleu":["blue","синій","أزرق"],"vert":["green","зелений","أخضر"],
    "Je suis Elyssa, je suis une fille.":["I am Elyssa, I am a girl.","Я Еліса, я дівчинка.","أنا إليسا، أنا بنت."],
    "J’ai huit ans.":["I am eight years old.","Мені вісім років.","عمري ثماني سنوات."],
    "Ma sœur s’appelle Lina,":["My sister's name is Lina,","Мою сестру звати Ліна,","اسم أختي لينا،"],
    "mon frère s’appelle Amine.":["my brother's name is Amine.","мого брата звати Амін.","واسم أخي أمين."],
    "Je suis une élève, mon cartable est rouge.":["I am a pupil, my school bag is red.","Я учениця, мій портфель червоний.","أنا تلميذة، حقيبتي حمراء."],
    "Stéphanie :":["Stéphanie:","Стефані:","ستيفاني:"],"Alice :":["Alice:","Аліса:","أليس:"],
  },
  // Translations made from a pattern: "Il s’appelle Minou." → "His name is Minou." …
  auto(fr){
    const t=fr.trim();let m;
    const end=t.match(/[.!?]$/)?t.slice(-1):'.';
    const P=[
      [/^Bonjour ! Je m’appelle (.+?) ?!?$/, n=>["Hello! My name is "+N(n,0)+"!","Привіт! Мене звати "+N(n,1)+"!","مرحبًا! اسمي "+N(n,2)+"!"]],
      [/^Moi, je m’appelle (.+?) ?[.!]?$/, n=>["Me, my name is "+N(n,0)+".","А мене звати "+N(n,1)+".","أنا اسمي "+N(n,2)+"."]],
      [/^Toi, tu t’appelles (.+?) \?$/, n=>["You, is your name "+N(n,0)+"?","Тебе звати "+N(n,1)+"?","أنت، هل اسمك "+N(n,2)+"؟"]],
      [/^Je m’appelle (.+?) ?[.!]?$/, n=>["My name is "+N(n,0)+".","Мене звати "+N(n,1)+".","اسمي "+N(n,2)+"."]],
      [/^Tu t’appelles (.+?) ?[.?]?$/, n=>["Your name is "+N(n,0)+(end==='?'?'?':'.'),"Тебе звати "+N(n,1)+(end==='?'?'?':'.'),"اسمك "+N(n,2)+(end==='?'?'؟':'.')]],
      [/^Il s’appelle (.+?)\.?$/, n=>["His name is "+N(n,0)+".","Його звати "+N(n,1)+".","اسمه "+N(n,2)+"."]],
      [/^Elle s’appelle (.+?)\.?$/, n=>["Her name is "+N(n,0)+".","Її звати "+N(n,1)+".","اسمها "+N(n,2)+"."]],
      [/^C’est (.+?)\. (Il|Elle) s’appelle .+$/, (n,g)=>["This is "+N(n,0)+". "+(g==='Il'?'His':'Her')+" name is "+N(n,0)+".","Це "+N(n,1)+". "+(g==='Il'?'Його':'Її')+" звати "+N(n,1)+".","هذا "+N(n,2)+". "+(g==='Il'?'اسمه ':'اسمها ')+N(n,2)+"."]],
      [/^C’est (.+?)\.?$/, n=>["This is "+N(n,0)+".","Це "+N(n,1)+".","هذا "+N(n,2)+"."]],
    ];
    for(const [re,f] of P){if((m=t.match(re)))return f(m[1],m[2])}
    return null;
  }
};
})();
