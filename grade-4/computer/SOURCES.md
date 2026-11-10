# Computer · Grade 4: sources (Unit 3 on)

Every source file used for the Computer lessons from Unit 3 on, page by page: what it was built into, or why it was skipped.
When new files come, compare them with this list and build only what is missing. Then add the file here.
Unit 1–2 sources are in the header line at the top of each `chapter-1/lesson-N.js` and `chapter-2/lesson-N.js`.

Status: **built** (file · key) · **planned** (stage not built yet) · **skipped** (why) · **waiting** (see [TODO.md](TODO.md)).
Answers without a key are listed in [UNVERIFIED.md](UNVERIFIED.md).

Source folder: `~/Documents/2026-2027/Alex/Computer/`. Book pages are the printed "Page N" tags of the e-book.

## unit-3/ · Unit 3 « Communicating online » (book pages 96–127) → `chapter-3/`

Scroll screenshots: one folder per part of the unit, `outN.png` in number order.

| Folder       | Book pages | Content                                                                                                        | Goes to                                                                                                                | Status  |
| ------------ | ---------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------- |
| `1/` out1–10 | 96–98      | Unit opener (Figure 3.1), Learning Objectives, Tools; Do you remember? (why email, send, reply; 3.2, 3.3)      | `lesson-1.js` · cover (`cover.jpg` from out3), ideas                                                                   | built   |
| `2/` out1–46 | 99–105     | Lesson 1 « My friends »: Email, contacts / Address Book, 3.1.2 add a contact, 3.1.3, Be Safe 1.1, 3.1.4 online | `lesson-1.js` · `boy.jpg` (out4), `boy-glasses.jpg` (out18 + out19)                                                    | built   |
| `3/` out1–34 | 106–111    | Lesson 2 « Forward an email »: History 2.1, 3.2.1 forward, 3.2.2 Cc, 3.2.3 Bcc, 3.2.4 Cc and Bcc               | `lesson-2.js` · `boy-net.jpg` (out1), `email-safety.jpg` (out25), `email-team.jpg` (out29), `email-dinner.jpg` (out31) | built   |
| `4/` out1–60 | 112–122    | Lesson 3 « Sending files »: attachment types, 3.3.1–3.3.4 Google images / videos, 3.3.5 attach, 3.3.6, 3.3.7   | `lesson-3.js` · `girl.jpg` (out5), `boy-glasses.jpg` (out13)                                                           | built   |
| `5/` out1–26 | 123–127    | Lesson 4 « Email rules »: be polite (2 emails), email etiquette (3.4.1), 3.4.2 spell check, History 4.1        | `lesson-4.js`                                                                                                          | planned |

Book pages, task by task:

| Page    | Content                                                                   | Goes to                                                                                     | Status                                                                          |
| ------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| 96–97   | Unit opener, Learning Objectives, Tools: Microsoft Outlook                | `lesson-1.js` · cover, idea cards 1–2                                                       | built                                                                           |
| 98      | Do you remember? Why we use email; how to send (3.2); how to reply (3.3)  | `lesson-1.js` · how-to's `send`, `reply`                                                    | built                                                                           |
| 99      | Email vs. text messages; keep your friends' information organized         | `lesson-1.js` · ideas, words, game `emailtext`                                              | built                                                                           |
| 100     | 3.1.2 To add a contact                                                    | `lesson-1.js` · how-to `contact`                                                            | built                                                                           |
| 101     | 3.1.3 Delete, Add to favorites, Edit contact; ask permission; Be Safe 1.1 | `lesson-1.js` · how-to's `fav`, `edit`, `delete`                                            | built                                                                           |
| 102–103 | 3.1.4 Check your email online (outlook.live.com, sign in, sign out)       | `lesson-1.js` · how-to's `online`, `signout` (Mini Edge)                                    | built                                                                           |
| 103     | "Why is it important to have a strong password?" (notebook)               | `lesson-1.js` · exercise `notebook`                                                         | built (model answer: UNVERIFIED)                                                |
| 104     | Hands on 1.1–1.6 True or False                                            | `lesson-1.js` · exercise `tf1`                                                              | built (no key: UNVERIFIED)                                                      |
| 104–105 | Hands on 2.1–2.5 How is this button used in Outlook?                      | `lesson-1.js` · exercise `btn`                                                              | built (no key: UNVERIFIED); book typo "used it Outlook" fixed                   |
| 105     | Hands on 3.1–3.3 questions; 4 make up a new contact                       | `lesson-1.js` · exercises `ask`, `newc` (Mini Outlook)                                      | built (model answers: UNVERIFIED)                                               |
| 106     | Send one email to many people; History 2.1 carbon paper                   | `lesson-2.js` · ideas, words, game `tf`                                                     | built                                                                           |
| 107     | 3.2.1 To forward an email message                                         | `lesson-2.js` · how-to `forward`                                                            | built                                                                           |
| 108     | 3.2.2 To use Cc                                                           | `lesson-2.js` · how-to `cc`                                                                 | built                                                                           |
| 109     | 3.2.3 To use Bcc; 3.2.4 Cc and Bcc                                        | `lesson-2.js` · how-to's `bcc`, `ccbcc`                                                     | built; Fig. 3.2.3 shows the subject of another email (book mistake, not copied) |
| 110     | Hands on 1.1–1.3 What does this button do? (Forward, Cc, Bcc)             | `lesson-2.js` · exercise `btn`                                                              | built (no key: UNVERIFIED)                                                      |
| 110–111 | Hands on 2.1–2.3 Cc or Bcc? (three emails); 3 movie night email           | `lesson-2.js` · exercises `ccorbcc` (the book's emails as pictures), `movie` (Mini Outlook) | built (no key: UNVERIFIED)                                                      |
| 112     | Attachments: document, image, audio, video, presentation files; ZIP tip   | `lesson-3.js` · idea cards 1–7, game `kind`                                                 | built; the heading "SmartArt" is a book mistake: the card says "Attachments"    |
| 113     | 3.3.1 To search the Internet for images                                   | `lesson-3.js` · how-to `images` (Mini Edge)                                                 | built                                                                           |
| 114     | 3.3.2 Images that match your needs (Tools, Size, Color, Usage rights)     | `lesson-3.js` · how-to `tools` (Mini Edge)                                                  | built                                                                           |
| 115     | 3.3.3 To save an image; Smart Tip 3.1                                     | `lesson-3.js` · how-to `saveimg` (Mini Edge), idea card                                     | built                                                                           |
| 116     | 3.3.4 To search for videos (Any duration)                                 | `lesson-3.js` · how-to `videos` (Mini Edge)                                                 | built                                                                           |
| 117     | 3.3.5 To attach a file; music you pay for                                 | `lesson-3.js` · how-to `attach`, idea card                                                  | built                                                                           |
| 118     | 3.3.6 Extra tips (Preview, Open, Copy, Save As, Remove Attachment); 3.3.7 | `lesson-3.js` · how-to `extra`, idea card                                                   | built                                                                           |
| 119     | 3.3.7B Save As window; Rules for attachments; Smart Tip 3.2               | `lesson-3.js` · how-to `saveatt`, idea cards                                                | built                                                                           |
| 120     | Hands on 1.1–1.5 What would you send as a … file?                         | `lesson-3.js` · exercise `send`                                                             | built (no key: UNVERIFIED)                                                      |
| 120–121 | Hands on 2.1–2.2 Word document as an attachment                           | `lesson-3.js` · exercise `doc` (2.1 open, 2.2 Mini Outlook)                                 | built (2.1 model answer: UNVERIFIED)                                            |
| 121     | Hands on 3.1–3.2 favourite food image, send it                            | `lesson-3.js` · exercise `food` (Mini Edge + Mini Outlook)                                  | built                                                                           |
| 122     | Hands on 4 free images of vegetables; draw them in your notebook          | `lesson-3.js` · exercise `veg` (Mini Edge)                                                  | built; the drawing is left out                                                  |
| 123     | Be polite: Email 1 and Email 2; which is better? (notebook)               | `lesson-4.js` · ideas, exercise `open`                                                      | planned                                                                         |
| 124     | Email etiquette; Key parts of email etiquette (3.4.1)                     | `lesson-4.js` · ideas, game                                                                 | planned                                                                         |
| 125     | Spell check; 3.4.2 To correct a mistake; History 4.1                      | `lesson-4.js` · how-to `spell`                                                              | planned                                                                         |
| 126     | Hands on 1.1–1.2 make the impolite emails polite                          | `lesson-4.js` · exercise `polite`                                                           | planned (model answers: UNVERIFIED)                                             |
| 127     | Hands on 2.1–2.4 email to your teacher (dropdowns)                        | `lesson-4.js` · exercise `parts`                                                            | planned (choices not visible: UNVERIFIED)                                       |
| 127     | Hands on 3 find and fix the mistakes, send it                             | `lesson-4.js` · exercise `fix` (Mini Outlook)                                               | planned                                                                         |

Figure PNGs (`unit-3/lu_g4_se_final_pageNN[-k].png`, 1920 wide, transparent background): the pictures of the lessons.

| File                  | Figure                                           | Goes to                                                                                       | Status  |
| --------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------- | ------- |
| page98-1, page98-2    | 3.2 send an email, 3.3 reply                     | `img/lesson-1/` · `send.jpg`, `reply.jpg`                                                     | built   |
| page99-1              | 3.1.1 email around the world                     | `img/lesson-1/` · `email-world.jpg`                                                           | built   |
| page100, page101      | 3.1.2 new contact, 3.1.3 contact options         | `img/lesson-1/` · `new-contact.jpg`, `contact-options.jpg`                                    | built   |
| page102, page103      | 3.1.4 sign in online, 3.1.5 sign out             | `img/lesson-1/` · `sign-in.jpg`, `sign-out.jpg`                                               | built   |
| page107, page108      | 3.2.1 forward, 3.2.2 Cc                          | `img/lesson-2/` · `forward.jpg`, `cc.jpg`                                                     | built   |
| page109-1, page109-2  | 3.2.3 Bcc, 3.2.4 Cc and Bcc                      | `img/lesson-2/` · `bcc.jpg`, `ccbcc.jpg`                                                      | built   |
| page112-1 … page112-5 | file type icons (document … presentation)        | `img/lesson-3/` · `doc-ic.jpg`, `image-ic.jpg`, `audio-ic.jpg`, `video-ic.jpg`, `pres-ic.jpg` | built   |
| page113 … page116     | 3.3.1 – 3.3.4 Google images, tools, save, videos | `img/lesson-3/` · `google.jpg`, `tools.jpg`, `save-image.jpg`, `videos.jpg`                   | built   |
| page117 … page119     | 3.3.5 attach, 3.3.6 options, 3.3.7A/B save       | `img/lesson-3/` · `attach.jpg`, `att-options.jpg`, `inbox-att.jpg`, `save-att.jpg`            | built   |
| page124, page125      | 3.4.1 email etiquette, 3.4.2 spell check         | `img/lesson-4/`                                                                               | planned |

## Other files in the Computer folder

| File                                                   | Content                       | Status                                                    |
| ------------------------------------------------------ | ----------------------------- | --------------------------------------------------------- |
| `20261105-LU_G4_U2_L2_1_Modify_picture_VT.mp4`         | school video, Unit 2 Lesson 2 | not built yet (Unit 2 lessons have no videos so far; ask) |
| `20261108-LU_G4_U2_L2_4_Change_pyramids_colors_VT.mp4` | school video, Unit 2 Lesson 2 | not built yet (as above)                                  |
