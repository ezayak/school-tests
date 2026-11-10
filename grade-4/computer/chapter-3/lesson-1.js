// Computer · Grade 4 · Unit 3 · Lesson 1 « My friends » (book pages 96–105, with the unit opener and "Do you remember?").
// All the content of the lesson. The how-to's are done in Mini Outlook and Mini Edge (shared/netsim.js). Same format as chapter-2/lesson-1.js.
// Book mistake fixed: Hands on 2.3 "How is this button used it Outlook?" → "in Outlook".
// The e-book's Hands on answers were not shown in the screenshots: the answers here are from the lesson text (// unverified, UNVERIFIED.md).
(function () {
  const PEOPLE = { view: "people", contacts: ["marco", "alex", "tom"] };
  const NEWC = [
    { act: "click", t: "rail:people", say: "On the left, click [People]." },
    { act: "click", t: "pp:new", say: "Click [New contact]." },
  ];
  window.LESSON = {
    n: 1,
    grade: 4,
    title: "My friends",
    unit: "Unit 3 · Lesson 1",
    book: "Book pages 96–105",
    cover: "cover",
    question: {
      q: "How is saving a friend's information [on paper] different from saving it [on the computer]?",
      a: "On the computer all your friends are in [Contacts]. You can [find], [change] and [delete] them fast, and email them with one click.", // unverified: the book asks, it has no answer
      img: "boy",
    },
    words: [
      { w: "Email", m: "a message you send over the Internet: fast and free" },
      {
        w: "Contacts / Address Book",
        m: "the place where you keep your friends' information (two names for the same thing)",
      },
      { w: "New contact", m: "the button that adds a friend to your contacts" },
      { w: "Edit contact", m: "change the information of a contact" },
      { w: "Favorites", m: "the contacts you put at the top" },
      {
        w: "outlook.live.com",
        m: "the website where you check your email from any computer",
      },
      { w: "Sign in / Sign out", m: "go into your account / leave it" },
      {
        w: "Public computer",
        m: "a computer many people use, like at school or in a library",
      },
    ],

    ideas: [
      {
        t: "Communicating online",
        lines: [
          "Sending [emails] is one way to talk to your friends.",
          "In this unit: [contacts], [forward], send [files], [polite] emails, [spell check]. The program is [Microsoft Outlook].",
        ],
        img: "cover",
      },
      {
        t: "Why we use email",
        lines: [
          "An email travels [very fast] around the world.",
          "It [doesn't cost] anything to send.",
        ],
        img: "email-world",
      },
      {
        t: "How to send an email",
        lines: [
          "Click [New mail]. Type your friend's address in [To].",
          "Type a title in [Subject], then your message. Click [Send].",
        ],
        img: "send",
        howto: "send",
      },
      {
        t: "How to reply",
        lines: [
          "Click the message to open it.",
          "Click [Reply], type your message, click [Send].",
        ],
        img: "reply",
        howto: "reply",
      },
      {
        t: "Email or text message?",
        lines: [
          "[Email]: for school, work and important things. You can write a lot and [attach files].",
          "[Text message]: for [quick chats] with friends and family.",
        ],
        vis: { kind: "emoji", e: "📧 🏫 · 💬 👪" },
      },
      {
        t: "Keep your friends' information organized",
        lines: [
          "Keep your friends in [Contacts]. Some programs call it the [Address Book]: it is the same thing.",
          "Save the first name, last name, home address, phone number, [email address] and more.",
        ],
        img: "boy",
      },
      {
        t: "Add a contact",
        lines: [
          "[People] › [New contact] › type the name and the email › [Save].",
          "The [name] and the [email address] are the most important. You can add a [photo] too.",
        ],
        img: "new-contact",
        howto: "contact",
      },
      {
        t: "Delete, favorites, edit",
        lines: [
          "[Delete]: a contact you do not need anymore. [Add to favorites]: a friend you write to a lot.",
          "[Edit contact]: change the information.",
        ],
        img: "contact-options",
        howto: "edit",
      },
      {
        t: "Ask first!",
        lines: [
          "Do you want to share a friend's email address with someone else?",
          "Always [ask your friend] first.",
        ],
        img: "boy-glasses",
      },
      {
        t: "Be safe",
        lines: [
          "Manage your contacts [responsibly].",
          "Only add contacts who are [trusted] friends and family.",
        ],
        vis: { kind: "emoji", e: "🛡️ 👪" },
      },
      {
        t: "Check your email anywhere",
        lines: [
          "No computer with you? Open a browser and go to [outlook.live.com].",
          "[Sign in] with your email address and your password. You only need the [Internet].",
        ],
        img: "sign-in",
        howto: "online",
      },
      {
        t: "On a public computer",
        lines: [
          "When you are done, always [Sign out].",
          "[Never save your password]: public computers can have viruses or programs that track you.",
        ],
        img: "sign-out",
        howto: "signout",
      },
    ],

    howto: [
      {
        k: "send",
        t: "Send an email",
        code: "p. 98",
        ic: "✉️",
        img: "send",
        start: { me: "marco" },
        steps: [
          { act: "click", t: "ol:newmail", say: "Click [New mail]." },
          {
            act: "type",
            t: "cm:to",
            text: "stella-ba@outlook.com",
            say: "In [To], type Stella's email address.",
          },
          {
            act: "type",
            t: "cm:subject",
            text: "School project",
            say: "In [Subject], type a title: [School project].",
          },
          {
            act: "type",
            t: "cm:body",
            text: "Do you want to meet today at 6 p.m.?",
            say: "Type your email.",
          },
          { act: "click", t: "cm:send", say: "Click [Send]." },
        ],
      },
      {
        k: "reply",
        t: "Reply to an email",
        code: "p. 98",
        ic: "↩️",
        img: "reply",
        start: { me: "stella" },
        steps: [
          {
            act: "click",
            t: "msg:school",
            say: "Click the message from Marco to open it.",
          },
          { act: "click", t: "rd:reply", say: "Click [Reply]." },
          {
            act: "type",
            t: "cm:body",
            text: "Great idea!!! See you later!",
            say: "Type your message.",
          },
          { act: "click", t: "cm:send", say: "Click [Send]." },
        ],
      },
      {
        k: "contact",
        t: "Add a contact",
        code: "3.1.2",
        ic: "👤",
        img: "new-contact",
        start: { contacts: [] },
        steps: [
          ...NEWC,
          {
            act: "type",
            t: "nc:first",
            text: "Marco",
            say: "In [First name], type [Marco].",
          },
          {
            act: "type",
            t: "nc:email",
            text: "marco.bacademy@outlook.com",
            say: "In [Email address], type Marco's email.",
          },
          {
            act: "click",
            t: "nc:save",
            say: "Click [Save]. Marco is in your contacts!",
          },
        ],
      },
      {
        k: "fav",
        t: "Add to favorites",
        code: "3.1.3",
        ic: "⭐",
        img: "contact-options",
        start: PEOPLE,
        steps: [
          { act: "click", t: "ct:Marco", say: "Click [Marco]." },
          { act: "click", t: "pp:fav", say: "Click [Add to favorites]." },
          {
            act: "click",
            t: "pnav:fav",
            say: "Click [Favorites]: Marco is there.",
          },
        ],
      },
      {
        k: "edit",
        t: "Edit a contact",
        code: "3.1.3",
        ic: "✏️",
        img: "contact-options",
        start: { ...PEOPLE, sel: "Marco" },
        steps: [
          {
            act: "click",
            t: "card:edit",
            say: "Click [Edit contact].",
          },
          {
            act: "type",
            t: "nc:phone",
            text: "555 0101",
            say: "Add Marco's phone number: [555 0101].",
          },
          { act: "click", t: "nc:save", say: "Click [Save]." },
        ],
      },
      {
        k: "delete",
        t: "Delete a contact",
        code: "3.1.3",
        ic: "🗑️",
        img: "contact-options",
        start: PEOPLE,
        steps: [
          {
            act: "click",
            t: "ct:Tom",
            say: "Click the contact you do not need anymore: [Tom].",
          },
          { act: "click", t: "pp:delete", say: "Click [Delete]." },
          {
            act: "click",
            t: "pnav:deleted",
            say: "Click [Deleted]: Tom is there now.",
          },
        ],
      },
      {
        k: "online",
        t: "Check your email online",
        code: "3.1.4",
        ic: "🌐",
        img: "sign-in",
        start: { app: "edge" },
        steps: [
          {
            act: "type",
            t: "e:addr",
            text: "outlook.live.com",
            say: "In the browser, type the web address [outlook.live.com].",
          },
          {
            act: "key",
            t: "key:Enter",
            key: "Enter",
            say: "Press [Enter].",
          },
          {
            act: "type",
            t: "ms:email",
            text: "stella-ba@outlook.com",
            say: "To sign in, type your email address.",
          },
          { act: "click", t: "ms:next", say: "Click [Next]." },
          {
            act: "type",
            t: "ms:pass",
            text: "Blue!Tiger7",
            say: "Type your password.",
          },
          { act: "click", t: "ms:signin", say: "Click [Sign in]." },
        ],
      },
      {
        k: "signout",
        t: "Sign out",
        code: "Figure 3.1.5",
        ic: "🚪",
        img: "sign-out",
        start: { app: "edge", page: "outlook", signed: true },
        steps: [
          {
            act: "click",
            t: "acct",
            say: "At the top on the right, click your [picture].",
          },
          { act: "click", t: "acct:signout", say: "Click [Sign out]." },
        ],
      },
    ],

    games: [
      {
        k: "button",
        t: "Which button?",
        en: "The buttons of Mail and People",
        ic: "🔘",
        items: [
          {
            type: "mc",
            q: "Add a [new friend] to your contacts.",
            opts: ["New contact", "Edit contact", "Delete", "Add to favorites"],
            oi: ["btn:newcontact", "btn:editcontact", "btn:delete", "btn:fav"],
          },
          {
            type: "mc",
            q: "Change a friend's [phone number].",
            opts: ["Edit contact", "New contact", "Delete", "Add to favorites"],
            oi: ["btn:editcontact", "btn:newcontact", "btn:delete", "btn:fav"],
          },
          {
            type: "mc",
            q: "Remove a contact you [don't need].",
            opts: ["Delete", "Edit contact", "New contact", "Add to favorites"],
            oi: ["btn:delete", "btn:editcontact", "btn:newcontact", "btn:fav"],
          },
          {
            type: "mc",
            q: "Put a friend you write to a lot in [Favorites].",
            opts: ["Add to favorites", "Delete", "New contact", "Edit contact"],
            oi: ["btn:fav", "btn:delete", "btn:newcontact", "btn:editcontact"],
          },
          {
            type: "mc",
            q: "Open your [contacts].",
            opts: ["People", "Mail"],
            oi: ["people", "railmail"],
          },
          {
            type: "mc",
            q: "Write a [new email].",
            opts: ["New mail", "New contact"],
            oi: ["btn:newmail", "btn:newcontact"],
          },
        ],
      },
      {
        k: "emailtext",
        t: "Email or text message?",
        en: "Which one is better?",
        ic: "💬",
        items: [
          {
            type: "mc",
            q: "A question to your [teacher] about the homework.",
            vis: { kind: "emoji", e: "👩‍🏫 📚" },
            opts: ["Email", "Text message"],
          },
          {
            type: "mc",
            q: "Tell your mom: [I'm on my way!]",
            vis: { kind: "emoji", e: "👩 🏃" },
            opts: ["Text message", "Email"],
          },
          {
            type: "mc",
            q: "Send your [project file] to the class.",
            vis: { kind: "emoji", e: "📄 👧👦" },
            opts: ["Email", "Text message"],
          },
          {
            type: "mc",
            q: "A quick [hi] to your cousin.",
            vis: { kind: "emoji", e: "👋 🙂" },
            opts: ["Text message", "Email"],
          },
        ],
      },
      {
        k: "do",
        t: "Do it in Mini Outlook",
        en: "Contacts, email, sign out",
        ic: "📧",
        items: [
          {
            type: "sim",
            q: "Add [Lisa] to your contacts, with a [photo].",
            start: { contacts: ["marco"] },
            steps: [
              ...NEWC,
              {
                act: "click",
                t: "nc:photo",
                say: "Click the [camera] to add a photo.",
              },
              { act: "click", t: "photo:2", say: "Choose a photo." },
              {
                act: "type",
                t: "nc:first",
                text: "Lisa",
                say: "In [First name], type [Lisa].",
              },
              {
                act: "type",
                t: "nc:email",
                text: "lisa-dt-ba@outlook.com",
                say: "Type Lisa's email address.",
              },
              { act: "click", t: "nc:save", say: "Click [Save]." },
            ],
          },
          {
            type: "sim",
            q: "Put [Alex] in your [favorites].",
            start: PEOPLE,
            steps: [
              { act: "click", t: "ct:Alex", say: "Click [Alex]." },
              { act: "click", t: "pp:fav", say: "Click [Add to favorites]." },
            ],
          },
          {
            type: "sim",
            q: "Send an email to [Alex].",
            start: { me: "stella" },
            steps: [
              { act: "click", t: "ol:newmail", say: "Click [New mail]." },
              {
                act: "type",
                t: "cm:to",
                text: "alex.bacademy@outlook.com",
                say: "In [To], type Alex's email address.",
              },
              {
                act: "type",
                t: "cm:subject",
                text: "Hello",
                say: "In [Subject], type [Hello].",
              },
              { act: "click", t: "cm:send", say: "Click [Send]." },
            ],
          },
          {
            type: "sim",
            q: "You are on a [library computer]. [Sign out].",
            start: { app: "edge", page: "outlook", signed: true },
            steps: [
              { act: "click", t: "acct", say: "Click your [picture]." },
              { act: "click", t: "acct:signout", say: "Click [Sign out]." },
            ],
          },
          {
            type: "sim",
            q: "Sign in on a [public computer]. Don't save the password!",
            start: { app: "edge", page: "login", askSave: true },
            steps: [
              {
                act: "type",
                t: "ms:email",
                text: "stella-ba@outlook.com",
                say: "Type your email address.",
              },
              { act: "click", t: "ms:next", say: "Click [Next]." },
              {
                act: "type",
                t: "ms:pass",
                text: "Blue!Tiger7",
                say: "Type your password.",
              },
              { act: "click", t: "ms:signin", say: "Click [Sign in]." },
              {
                act: "click",
                t: "pw:never",
                say: "Save the password? Click [Never].",
              },
            ],
          },
        ],
      },
      {
        k: "tf",
        t: "True or false?",
        en: "Email and contacts",
        ic: "✅",
        items: [
          {
            type: "tf",
            q: "Contacts and the Address Book are the same thing.",
            a: true,
            img: "boy",
          },
          {
            type: "tf",
            q: "It costs money to send an email.",
            a: false,
            x: "Sending an email [doesn't cost] anything.",
            img: "email-world",
          },
          {
            type: "tf",
            q: "You can check your email on any computer with the Internet.",
            a: true,
            img: "sign-in",
          },
          {
            type: "tf",
            q: "On a library computer, you don't need to sign out.",
            a: false,
            x: "On a public computer, always [Sign out] when you are done.",
            img: "sign-out",
          },
          {
            type: "tf",
            q: "The name and the email address are the most important fields of a contact.",
            a: true,
            img: "new-contact",
          },
        ],
      },
      {
        k: "order",
        t: "Steps in order",
        en: "Put the steps in the right order",
        ic: "🔢",
        items: [
          { type: "order", howto: "contact" },
          { type: "order", howto: "send" },
          { type: "order", howto: "online" },
        ],
      },
    ],

    exercises: [
      {
        k: "notebook",
        t: "A strong password",
        en: "Book p. 103 · Write in your notebook",
        ic: "🔐",
        from: "Book p. 103",
        items: [
          {
            type: "open",
            q: "Why is it important to have a strong password for your email account?",
            a: "A strong password is [hard to guess]. Nobody else can open my email, read my messages or [send emails as me].", // unverified
            img: "sign-in",
          },
        ],
      },
      {
        k: "tf1",
        t: "True or false",
        en: "Book · Hands on 1.1–1.6",
        ic: "⚖️",
        from: "Book p. 104 · Hands on! 1.1–1.6",
        keep: true,
        items: [
          // unverified (all six): no key in the screenshots
          {
            type: "tf",
            q: "There is no way to delete contacts you do not need anymore.",
            a: false,
            x: "Click the contact, then click [Delete].",
            icon: "btn:delete",
          },
          {
            type: "tf",
            q: "An email address is the same thing as a home address.",
            a: false,
            x: "An [email address] is for emails on the Internet. A [home address] is where you live.",
            vis: { kind: "emoji", e: "📧 ≠ 🏠" },
          },
          {
            type: "tf",
            q: "It is okay to save your password when logging into your email on a public computer.",
            a: false,
            x: "[Never] save your password on a public computer.",
            img: "boy-glasses",
          },
          {
            type: "tf",
            q: "You can change a contact's name or information by editing it.",
            a: true,
            icon: "btn:editcontact",
          },
          {
            type: "tf",
            q: "The Address Book is where you save information like names and emails.",
            a: true,
            img: "boy",
          },
          {
            type: "tf",
            q: "You should never share a friend's email address without their permission.",
            a: true,
            img: "boy-glasses",
          },
        ],
      },
      {
        k: "btn",
        t: "How is this button used?",
        en: "Book · Hands on 2.1–2.5",
        ic: "🔘",
        from: "Book pp. 104–105 · Hands on! 2.1–2.5",
        keep: true,
        items: [
          // unverified (all five): no key in the screenshots
          {
            type: "mc",
            q: "How is this button used in Outlook?",
            icon: "btn:newcontact",
            opts: [
              "To save a new contact to your email contacts",
              "To change the contact information for someone who is already in your list",
              "To remove a contact from your list permanently",
              "To view or manage your contacts",
              "To add a photo to the contact's details",
            ],
          },
          {
            type: "mc",
            q: "How is this button used in Outlook?",
            icon: "btn:editcontact",
            opts: [
              "To change the contact information for someone who is already in your list",
              "To remove a contact from your list permanently",
              "To save a new contact to your email contacts",
              "To view or manage your contacts",
              "To add a photo to the contact's details",
            ],
          },
          {
            type: "mc",
            q: "How is this button used in Outlook?",
            icon: "btn:deleted",
            opts: [
              "To remove a contact from your list permanently",
              "To change the contact information for someone who is already in your list",
              "To save a new contact to your email contacts",
              "To view or manage your contacts",
              "To add a photo to the contact's details",
            ],
          },
          {
            type: "mc",
            q: "How is this button used in Outlook?",
            icon: "people",
            opts: [
              "To view or manage your contacts",
              "To change the contact information for someone who is already in your list",
              "To remove a contact from your list permanently",
              "To save a new contact to your email contacts",
              "To add a photo to the contact's details",
            ],
          },
          {
            type: "mc",
            q: "How is this button used in Outlook?",
            icon: "photo",
            opts: [
              "To add a photo to the contact's details",
              "To change the contact information for someone who is already in your list",
              "To remove a contact from your list permanently",
              "To save a new contact to your email contacts",
              "To view or manage your contacts",
            ],
          },
        ],
      },
      {
        k: "ask",
        t: "Answer the questions",
        en: "Book · Hands on 3.1–3.3",
        ic: "✍️",
        from: "Book p. 105 · Hands on! 3.1–3.3",
        keep: true,
        items: [
          // unverified (model answers): no key in the screenshots
          {
            type: "open",
            q: "Why is it important to organize your email contacts?",
            a: "So I can [find] my friends' information [quickly] and send my emails to the [right person].",
            img: "contact-options",
          },
          {
            type: "open",
            q: "What steps do you take to add a new contact?",
            a: "Click [People] › [New contact] › type the [name] and the [email address] › click [Save].",
            img: "new-contact",
          },
          {
            type: "open",
            q: "Why is it important not to save your password when accessing your email account on a public computer?",
            a: "Many people use a public computer. The next person could [open my email]. Public computers can also have [viruses] or programs that [track] my information.",
            img: "sign-out",
          },
        ],
      },
      {
        k: "newc",
        t: "Make a new contact",
        en: "Book · Hands on 4 in Mini Outlook",
        ic: "📇",
        from: "Book p. 105 · Hands on! 4",
        items: [
          {
            type: "sim",
            q: "Practice creating a new email contact. Make up the information: [first name], [last name], [email], [home phone], [address].",
            start: { contacts: ["marco", "alex"] },
            steps: [
              ...NEWC,
              {
                act: "type",
                t: "nc:first",
                text: "Leo",
                say: "First name: [Leo].",
              },
              {
                act: "type",
                t: "nc:last",
                text: "Martin",
                say: "Last name: [Martin].",
              },
              {
                act: "type",
                t: "nc:email",
                text: "leo.martin@outlook.com",
                say: "Personal email: [leo.martin@outlook.com].",
              },
              {
                act: "type",
                t: "nc:phone",
                text: "555 2468",
                say: "Home phone: in [Mobile phone number], type [555 2468].",
              },
              {
                act: "type",
                t: "nc:address",
                text: "12 Palm Street",
                say: "Address: [12 Palm Street].",
              },
              { act: "click", t: "nc:save", say: "Click [Save]." },
            ],
          },
        ],
      },
    ],
  };
})();
