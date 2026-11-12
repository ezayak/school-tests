# Швидкочитання: sources

Sources in `~/Documents/2026-2027/Lucas/Optima/`:

- `speed-reading.txt`: a 30-day programme in 4 weeks (clusters, long words, endings, fluency). Its material is regrouped by skill into the **Щодня** games; there are no day or week numbers in the games.
- `швидкочитання.pdf`: «Школа швидкочитання, 1 клас» (Торсінг), 16 scanned spreads. Book pages are the printed numbers: the left page of scan spread k is page 2k.
  Left pages = eye exercises (**Книжка**), right pages = texts (**Тексти**).

Status: `planned` until the game is built, then `file · key`.

## speed-reading.txt

| Day   | What                                                                       | Built into                                                                                                            |
| ----- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 1     | 15 consonant clusters                                                      | `catch.js · syl`; `daily.js · flash clusters`                                                                         |
| 2     | Find the highlighted syllable                                              | skipped: nothing is highlighted in the file; its words are in Day 3                                                   |
| 3     | 10 words with clusters, by syllables                                       | `catch.js · words`; `daily.js · flash words`                                                                          |
| 4     | Look-alike syllables (стра – стри – стро …)                                | `catch.js · syl`; `daily.js · flash similar`                                                                          |
| 5     | Missing syllable (\_\_\_на → країна)                                       | `daily.js · gaps syl`                                                                                                 |
| 6     | 5 phrases                                                                  | `daily.js · phrases words` (word by word, then the whole phrase)                                                      |
| 7     | Review                                                                     | skipped: no new material (the games mix all of it)                                                                    |
| 8–9   | 7 long words by syllables, then whole                                      | `daily.js · flash long` (dashes on / off)                                                                             |
| 10    | 6 pairs one syllable apart (корова – корона)                               | `catch.js · words`; `which.html` (from catch.js · words)                                                              |
| 11    | 8 words, "don't skip the middle"                                           | `catch.js · words` (some of the words); `daily.js · flash long`                                                       |
| 12    | 5 "which word did you read" pairs                                          | `catch.js · words` (without полудниця: not a word); `which.html` (from catch.js · words; АБВ switch for the capitals) |
| 13    | 5 sentences                                                                | `daily.js · phrases groups` (split into groups here, as Day 22)                                                       |
| 14    | Review                                                                     | skipped: no new material                                                                                              |
| 15–16 | Nouns in 3 forms, singular – plural                                        | `catch.js · end`; `which.html` (from catch.js · end)                                                                  |
| 17    | Choose the ending in a sentence                                            | `daily.js · gaps end`                                                                                                 |
| 18    | 4 verbs in 4 tenses                                                        | `catch.js · end`                                                                                                      |
| 19    | Complete the ending (читає, читатиме: as corrected at the end of the file) | `daily.js · gaps end`                                                                                                 |
| 20    | «У шкільному саду» + 4 questions                                           | `text-garden.js` (answers taken from the text: the txt has no key)                                                    |
| 21    | Review                                                                     | skipped: no new material                                                                                              |
| 22    | 4 sentences in phrases                                                     | `daily.js · phrases groups`                                                                                           |
| 23–24 | «Мандрівка до лісу», read 3 times + find the mistake                       | `text-forest.js` (3 readings + `mist`; the txt gives only answer 1, 2–4 taken from the text)                          |
| 25    | Dialogue                                                                   | `text-library.js` (title «До бібліотеки» made up: the txt has none)                                                   |
| 26    | 5 drawing instructions                                                     | `daily.js · pics house` (pick the picture; it grows step by step)                                                     |
| 27    | «Загублене кошеня» (title as corrected) + 4 questions                      | `text-kitten.js` (answers taken from the text)                                                                        |
| 28    | Retell                                                                     | skipped (oral)                                                                                                        |
| 29    | Final word list with 4 marks                                               | skipped (the user decided: no check section); its words are in the games                                              |
| 30    | A new story                                                                | skipped: no story in the file                                                                                         |

## швидкочитання.pdf

| Scan | Book p. | Left page (Книжка)                                                                                                                                         | Right page (Тексти)                                                                                |
| ---- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 1    | covers  | Складова таблиця (back cover): `book.js · table` (generated from its consonants)                                                                           | front cover: skipped                                                                               |
| 2    | 4–5     | Tangled lines: `book.js · lines` (the game draws its own lines; the book word «музика» first, then other book words)                                       | Квак (42 words, by syllables): `text-p5.js`                                                        |
| 3    | 6–7     | Read only the blue letters: `book.js · colors` (the dark-blue letters; colours measured on the scan)                                                       | Вуглик (53 words, by syllables): `text-p7.js`                                                      |
| 4    | 8–9     | Word wedges: `book.js · wedge p8`; anagrams: `book.js · anagrams p8` (торав, карот left out: no clear word, the user decided)                              | Вуглик, mother cat (47 words): `text-p9.js`                                                        |
| 5    | 10–11   | Words from the biggest letter to the smallest: `book.js · sizes big`                                                                                       | Не дам (58 words): `text-p11.js`                                                                   |
| 6    | 12–13   | Syllable columns along the arrows: `book.js · table grid12`                                                                                                | The farm family, pictures for words (67): `text-p13.js` (pictures cropped into `img/texts/farm-*`) |
| 7    | 14–15   | Syllables along the arrows: `book.js · table grid14` (read as a snake); consonant + Р + vowel: `book.js · table withR` (Р itself left out)                 | The bunnies, pictures for words (67): `text-p15.js` (pictures `img/texts/hares-*`)                 |
| 8    | 16–17   | «Носоріг» poem: `book.js · poem`; «Утвори слова» Н / Ґ: skipped (the user decided; only оша / ава printed)                                                 | Grandma and the kitten, pictures for words (76): `text-p17.js` (pictures `img/texts/yarn-*`)       |
| 9    | 18–19   | Cross out the repeated letters: `book.js · cross` (слон, тигр)                                                                                             | The hen, missing letters (71): `text-p19.js`                                                       |
| 10   | 20–21   | Word wedges: `book.js · wedge p20`; find the odd word: `book.js · odd`                                                                                     | The ponies, missing letters (68): `text-p21.js`                                                    |
| 11   | 22–23   | Anagrams to pictures: `book.js · anagrams p22` (pictures cropped into `img/book/`)                                                                         | Snowflakes, missing letters (81): `text-p23.js`                                                    |
| 12   | 24–25   | Mirrored letter cubes: `book.js · mirror`                                                                                                                  | Мудрий Пень, half letters (91): `text-p25.js` (bottom of the letters cut, as printed)              |
| 13   | 26–27   | Shapes: skipped (the user decided: no reading); words along arrows on a circle: `book.js · circles` (веселка, Україна)                                     | Леопардик, half letters (98): `text-p27.js` (bottom of the letters cut, as printed)                |
| 14   | 28–29   | Words from the smallest letter to the biggest: `book.js · sizes small` (order measured on the scan)                                                        | Тітонька Му, half letters (98): `text-p29.js` (top of the letters cut, as printed)                 |
| 15   | 30–31   | Split the sentences: `book.js · split` (as printed, even «почитанється»: the user decided); hidden words: `book.js · hidden` (3 a row; no key in the book) | Поні Бантик, half letters (109): `text-p31.js` (top of the letters cut, as printed)                |
| 16   | 32–33   | Sources list: skipped                                                                                                                                      | Таблиці Шульте: `book.js · schulte`                                                                |

Тексти: the book gives no answers. The right answer and the wrong choices of every question, and the three titles of «Добери заголовок»,
are made up from the text. In the cut-letter texts the punctuation hidden by the cut is restored (the page cuts it again).
