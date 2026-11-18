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
- Video: an mp4 file per lesson with a start time, from the user (`video/` next to the lesson, not precached: online only, like the Computer lessons' school videos).
- One lesson at a time: build, check (`french-lesson` skill scripts), show, wait for approval, commit; `VERSION` bump in `sw.js` last.
- Order: Unité 0 → 1 → 2 → 3 → 4 → 5 → 6, then « Vive les fêtes ! », « Grand jeu de l'oie » (revision game), Projet de lecture (a story).

## Book pages

| File        | Pages | Content                                                                                         | Built into                                                                                      |
| ----------- | ----- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| out2        | 1     | Cover                                                                                           | skipped (cover; card picture)                                                                   |
| out3        | 2–3   | Tableau des contenus                                                                            | skipped (contents)                                                                              |
| out4        | 4–5   | Unité 0 Bienvenue ! · Tu parles déjà français ? · Que fais-tu à l'école ? (consignes)           | `unite-0` · mots, relie, consignes, jacques (ex. 2 left out: open question)                     |
| out5        | 6–7   | Unité 0 · L'alphabet (voyelles, consonnes, prénoms épelés)                                      | `unite-0` · voyelles, reponds, prenoms, epelle (ex. 7 song with no words, ex. 8 Loto: left out) |
| out7        | 8–9   | Unité 1 Salut, les amis ! · comic, Léo et Théo                                                  | not yet · `unite-1`                                                                             |
| out8        | 10–11 | Unité 1 · Comment tu t'appelles ? · Les salutations                                             | not yet · `unite-1`                                                                             |
| out10       | 12–13 | Unité 1 · Comment ça va ? · Chante ! Bonjour, les amis ! · Boîte à sons : l'intonation          | not yet · `unite-1`                                                                             |
| out11       | 14–15 | Unité 1 · Saluer et accueillir (le monde autour de toi) · Brico : marionnettes à doigts         | not yet · `unite-1`                                                                             |
| out12       | 16–17 | Unité 2 Voici ma famille ! · comic · Vrai ou faux · Réponds · Chante ! Ma famille               | not yet · `unite-2`                                                                             |
| out14       | 18–19 | Unité 2 · Ma famille · Quel âge as-tu ? (les nombres de 0 à 12)                                 | not yet · `unite-2`                                                                             |
| out15       | 20–21 | Unité 2 · Les animaux domestiques · Chante ! La famille Hurluberlu · Boîte à sons : le son [y]  | not yet · `unite-2`                                                                             |
| out17       | 22–23 | Unité 2 · En famille, c'est génial ! · Brico : les animaux en rouleaux                          | not yet · `unite-2`                                                                             |
| out19       | 24–25 | Mes compétences 1–2 · L'arbre généalogique                                                      | not yet · `unite-2` (reading)                                                                   |
| out20       | 26–27 | Unité 3 Tous à l'école ! · comic · Vrai ou faux · Réponds · Chante ! Dans mon cartable          | not yet · `unite-3`                                                                             |
| out21       | 28–29 | Unité 3 · Les objets scolaires · Les couleurs                                                   | not yet · `unite-3`                                                                             |
| out23       | 30–31 | Unité 3 · Dans la salle de classe · Chante ! La ronde des couleurs · Boîte à sons : le son [u]  | not yet · `unite-3`                                                                             |
| out24       | 32–33 | Unité 3 · À l'école, sans souci ! · Brico : la couleur de la lumière                            | not yet · `unite-3`                                                                             |
| out25       | 34–35 | Unité 4 Anniversaire tropical ! · comic · Vrai ou faux · Réponds · Chante ! Joyeux anniversaire | not yet · `unite-4`                                                                             |
| out26       | 36–37 | Unité 4 · Les 12 mois et les 4 saisons · C'est quand ton anniversaire ? (13 à 31)               | not yet · `unite-4`                                                                             |
| out28       | 38–39 | Unité 4 · La fête d'anniversaire · Chante ! · Boîte à sons : le son [ɛ]                         | not yet · `unite-4`                                                                             |
| out30       | 40–41 | Unité 4 · La fête parfaite · Brico : une carte d'invitation                                     | not yet · `unite-4`                                                                             |
| out31       | 42–43 | Mes compétences 3–4 · Affiche des anniversaires                                                 | not yet · `unite-4` (reading)                                                                   |
| out32       | 44–45 | Unité 5 Après-midi au parc · comic · Vrai ou faux · Réponds · Chante ! Allô ?                   | not yet · `unite-5`                                                                             |
| out34       | 46–47 | Unité 5 · Quelle heure est-il ? · Les jours de la semaine · l'emploi du temps                   | not yet · `unite-5`                                                                             |
| out36       | 48–49 | Unité 5 · La routine · Chante ! Le temps passe · Boîte à sons : [ø] et [œ]                      | not yet · `unite-5`                                                                             |
| out38       | 50–51 | Unité 5 · C'est quand, le bon moment ? · Brico : le calendrier perpétuel                        | not yet · `unite-5`                                                                             |
| out39       | 52–53 | Unité 6 Bonnes vacances ! · comic · Vrai ou faux · Réponds · Chante ! Bonjour soleil !          | not yet · `unite-6`                                                                             |
| out41       | 54–55 | Unité 6 · Quel temps fait-il ? · La météo                                                       | not yet · `unite-6`                                                                             |
| out43       | 56–57 | Unité 6 · En vacances · Chante ! Vive, vive les vacances ! · Boîte à sons : le son [o]          | not yet · `unite-6`                                                                             |
| out44       | 58–59 | Unité 6 · Qu'est-ce que tu peux faire… · Brico : memory de la météo                             | not yet · `unite-6`                                                                             |
| out46       | 60–61 | Mes compétences 5–6 · Mes vacances idéales                                                      | not yet · `unite-6` (reading)                                                                   |
| out48       | 62–63 | Vive les fêtes ! La Chandeleur · La « crêpes-party »                                            | not yet · `fetes`                                                                               |
| out50       | 64–65 | Vive les fêtes ! Le Carnaval · Brico : le masque-assiette                                       | not yet · `fetes`                                                                               |
| out51       | 66–67 | Vive les fêtes ! Fête Nationale · Brico : le drapeau français                                   | not yet · `fetes`                                                                               |
| out53       | 68–69 | Grand jeu de l'oie (revision of the year)                                                       | not yet · `jeu-oie`                                                                             |
| out55–out74 | 70–95 | Projet de lecture : Mamie Pétronille et le ruban jaune (story)                                  | not yet · `story-petronille`                                                                    |
| out75       | 96    | Mamie Pétronille · Jouons ensemble ! (Associe · Lis et dessine · Aimes-tu cette histoire ?)     | not yet · `story-petronille`                                                                    |
