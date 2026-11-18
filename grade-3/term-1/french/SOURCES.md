# French Grade 3 (Lucas): sources

Two groups on the French page (`index.html`, side bar from `groups` in `lessons.js`):

- **Léo et Théo Plus 1** (`BOOK`): « Léo et Théo Plus 1 · Livre de l'élève » (Arcella, Guillemant), one lesson per Unité, **book exercises only**.
- **Teacher's lessons** (`TEACHER`): `lesson-1` … `lesson-4`, `revision-1`, from the teacher's slides and sheets in `~/Documents/2026-2027/Lucas/French/` (not the book). New sheets go there.

## Book lessons: plan

Scan: `~/Documents/2026-2027/Lucas/French/book/outN.png`, one two-page spread per file (1399×891).
**The file number is not the page number**: use the table below (printed page numbers, bottom corners).

- Files: `unite-N.js` + `unite-N.html` (copy `lesson-2.html`, change the script and title), pictures in `img/unite-N/`.
  Card in `BOOK` with `label: "Unité"`, `n: N`, `title` as printed ("Salut, les amis !"), `en`, `cover`, `note`.
- Done: engine change: the lesson's key and picture folder from `L.key` / `L.imgDir` instead of `lesson-${L.n}`,
  so `unite-1` and the teacher's `lesson-1` don't share saved tabs or pictures. Old lessons must render the same (compare script).
- Learn: the unit's opening comic (Écoute et lis) as the story, every vocabulary page as words, each « Chante ! » as a text with sound,
  one `sound` tile per « Boîte à sons », the « Le monde autour de toi » page as a story part.
- Play: listen, match, bword, bsent for the unit's words.
- Exercices: every numbered book task that has something to check, `from: "Livre p. N ex. M"`, in the book's order.
  Vrai ou faux → `mc` (Vrai / Faux, `full`); Réponds → `mc` (right one first); Écoute et associe / Associe → `match`;
  Écoute et dis le numéro → `tap`; Remets dans l'ordre → `order`; Cherche les mots avec le son → `letters` / `mc`.
- Left out (list them in the table): Brico (crafts), Joue / Joue au… with a classmate, Dessine, Mime, the « Mes compétences » projects
  (only their reading questions go in, into the unit before them).
- Videos: the book's mp4s in `book/` (CARTOON_UNITE-N = the opening comic, VIDEO_N = the unit's VIDÉO exercise, VIDEO_AUTOUR_DE_TOI_N = Le monde autour de toi, VIDEO_CIVILISATION_1/2),
  re-encoded to 480p (`ffmpeg -vf scale=-2:480 -crf 28`, ~1–5 MB) into `video/` as `cartoon-N`, `video-N`, `autour-N`, `civilisation-N` with a `.jpg` poster.
  A `video` tile in Learn (`{k: "video", v, t, en, from, img}`); not in `also` (online only). Each video is committed with its unit. No VIDEO_1 file (p. 12 ex. 8).
- Pictures: `native: true` (shown at their own size); crops are never upscaled.
- One lesson at a time: build, check (`french-lesson` skill scripts), show, wait for approval, commit; `VERSION` bump in `sw.js` last.
- Order: Unité 0 → 1 → 2 → 3 → 4 → 5 → 6, then « Vive les fêtes ! », « Grand jeu de l'oie » (revision game), Projet de lecture (a story).

## Book pages

| File        | Pages | Content                                                                                         | Built into                                                                                           |
| ----------- | ----- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| out2        | 1     | Cover                                                                                           | skipped (cover; card picture)                                                                        |
| out3        | 2–3   | Tableau des contenus                                                                            | skipped (contents)                                                                                   |
| out4        | 4–5   | Unité 0 Bienvenue ! · Tu parles déjà français ? · Que fais-tu à l'école ? (consignes)           | `unite-0` · mots, relie, consignes, jacques (ex. 2 left out: open question)                          |
| out5        | 6–7   | Unité 0 · L'alphabet (voyelles, consonnes, prénoms épelés)                                      | `unite-0` · voyelles, reponds, prenoms, epelle (ex. 7 song with no words, ex. 8 Loto: left out)      |
| out7        | 8–9   | Unité 1 Salut, les amis ! · comic, Léo et Théo                                                  | `unite-1` · cartoon-1 video, story, qui, joue (ex. 2 song: in the story)                             |
| out8        | 10–11 | Unité 1 · Comment tu t'appelles ? · Les salutations                                             | `unite-1` · story, tappelles, epelle, salutations, observe (unverified)                              |
| out10       | 12–13 | Unité 1 · Comment ça va ? · Chante ! Bonjour, les amis ! · Boîte à sons : l'intonation          | `unite-1` · words, cava, montre (unverified), story: song and intonation (ex. 8 video: no file)      |
| out11       | 14–15 | Unité 1 · Saluer et accueillir (le monde autour de toi) · Brico : marionnettes à doigts         | `unite-1` · accueillir, monde, civilisation-1 video (ex. 2 open, ex. 4 mime, Brico: left out)        |
| out12       | 16–17 | Unité 2 Voici ma famille ! · comic · Vrai ou faux · Réponds · Chante ! Ma famille               | `unite-2` · cartoon-2 video, story, song, vf, reponds                                                |
| out14       | 18–19 | Unité 2 · Ma famille · Quel âge as-tu ? (les nombres de 0 à 12)                                 | `unite-2` · video-2, famille, freres, nombres, age, dialogues in the story                           |
| out15       | 20–21 | Unité 2 · Les animaux domestiques · Chante ! La famille Hurluberlu · Boîte à sons : le son [y]  | `unite-2` · animaux, vf2, sound [y], son-y, song in the story (ex. 13 find in the picture: left out) |
| out17       | 22–23 | Unité 2 · En famille, c'est génial ! · Brico : les animaux en rouleaux                          | `unite-2` · civilisation-2 video, bebes (ex. 1 and 3 personal, Brico: left out)                      |
| out19       | 24–25 | Mes compétences 1–2 · L'arbre généalogique                                                      | `unite-2` · story: the family tree text and questions (ex. 2 draw, ex. 3 describe: left out)         |
| out20       | 26–27 | Unité 3 Tous à l'école ! · comic · Vrai ou faux · Réponds · Chante ! Dans mon cartable          | not yet · `unite-3`                                                                                  |
| out21       | 28–29 | Unité 3 · Les objets scolaires · Les couleurs                                                   | not yet · `unite-3`                                                                                  |
| out23       | 30–31 | Unité 3 · Dans la salle de classe · Chante ! La ronde des couleurs · Boîte à sons : le son [u]  | not yet · `unite-3`                                                                                  |
| out24       | 32–33 | Unité 3 · À l'école, sans souci ! · Brico : la couleur de la lumière                            | not yet · `unite-3`                                                                                  |
| out25       | 34–35 | Unité 4 Anniversaire tropical ! · comic · Vrai ou faux · Réponds · Chante ! Joyeux anniversaire | not yet · `unite-4`                                                                                  |
| out26       | 36–37 | Unité 4 · Les 12 mois et les 4 saisons · C'est quand ton anniversaire ? (13 à 31)               | not yet · `unite-4`                                                                                  |
| out28       | 38–39 | Unité 4 · La fête d'anniversaire · Chante ! · Boîte à sons : le son [ɛ]                         | not yet · `unite-4`                                                                                  |
| out30       | 40–41 | Unité 4 · La fête parfaite · Brico : une carte d'invitation                                     | not yet · `unite-4`                                                                                  |
| out31       | 42–43 | Mes compétences 3–4 · Affiche des anniversaires                                                 | not yet · `unite-4` (reading)                                                                        |
| out32       | 44–45 | Unité 5 Après-midi au parc · comic · Vrai ou faux · Réponds · Chante ! Allô ?                   | not yet · `unite-5`                                                                                  |
| out34       | 46–47 | Unité 5 · Quelle heure est-il ? · Les jours de la semaine · l'emploi du temps                   | not yet · `unite-5`                                                                                  |
| out36       | 48–49 | Unité 5 · La routine · Chante ! Le temps passe · Boîte à sons : [ø] et [œ]                      | not yet · `unite-5`                                                                                  |
| out38       | 50–51 | Unité 5 · C'est quand, le bon moment ? · Brico : le calendrier perpétuel                        | not yet · `unite-5`                                                                                  |
| out39       | 52–53 | Unité 6 Bonnes vacances ! · comic · Vrai ou faux · Réponds · Chante ! Bonjour soleil !          | not yet · `unite-6`                                                                                  |
| out41       | 54–55 | Unité 6 · Quel temps fait-il ? · La météo                                                       | not yet · `unite-6`                                                                                  |
| out43       | 56–57 | Unité 6 · En vacances · Chante ! Vive, vive les vacances ! · Boîte à sons : le son [o]          | not yet · `unite-6`                                                                                  |
| out44       | 58–59 | Unité 6 · Qu'est-ce que tu peux faire… · Brico : memory de la météo                             | not yet · `unite-6`                                                                                  |
| out46       | 60–61 | Mes compétences 5–6 · Mes vacances idéales                                                      | not yet · `unite-6` (reading)                                                                        |
| out48       | 62–63 | Vive les fêtes ! La Chandeleur · La « crêpes-party »                                            | not yet · `fetes`                                                                                    |
| out50       | 64–65 | Vive les fêtes ! Le Carnaval · Brico : le masque-assiette                                       | not yet · `fetes`                                                                                    |
| out51       | 66–67 | Vive les fêtes ! Fête Nationale · Brico : le drapeau français                                   | not yet · `fetes`                                                                                    |
| out53       | 68–69 | Grand jeu de l'oie (revision of the year)                                                       | not yet · `jeu-oie`                                                                                  |
| out55–out74 | 70–95 | Projet de lecture : Mamie Pétronille et le ruban jaune (story)                                  | not yet · `story-petronille`                                                                         |
| out75       | 96    | Mamie Pétronille · Jouons ensemble ! (Associe · Lis et dessine · Aimes-tu cette histoire ?)     | not yet · `story-petronille`                                                                         |
