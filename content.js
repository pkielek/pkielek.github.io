window.CONTENT = {

  /* ---- centre of the dial in the default state ------------------------- */
  profile: {
    name: "Piotr Kiełek",
    role: "Fullstack Software Engineer",
    tagline: {
      en: "Laravel/FastAPI Backends, Flutter/JS Front, PyTorch ML/DL",
      pl: "Backendy Laravel/FastAPI, Front Flutter/JS, PyTorch ML/DL"
    },
    /* keep these short — they sit inside a circle */
    chips: {
      en: ["26 y/o", "5 years of experience", "MSc Applied CS"],
      pl: ["26 lat", "5 lat doświadczenia", "mgr inż. informatyki"]
    },
    status:   { en: "Open to full-stack roles", pl: "Otwarty na oferty full-stack" },
    location: { en: "Łódź, Poland / Remote", pl: "Łódź / Zdalnie" },
    socials: [
      { label: "Email",    href: "mailto:pkielek.praca@gmail.com", icon: "mail" },
      { label: "LinkedIn", href: "https://linkedin.com/in/pkielek",   icon: "linkedin" },
      { label: "GitHub",   href: "https://github.com/pkielek",     icon: "github" },
    ],
    hint: { en: "Pick an hour", pl: "Wybierz godzinę" }
  },

  /* ---- the six wedges, clockwise from 12 -------------------------------- */
  sections: [

    /* ===================================================== 01 · ABOUT ==== */
    {
      id: "about",
      title:  { en: "About me",              pl: "O mnie" },
      kicker: { en: "Who you are talking to", pl: "Z kim rozmawiasz" },
      lede: {
        en: "I am a full-stack developer building modern software. I care in equal parts about application performance, readable code and the user experience.",
        pl: "Jestem programistą fullstack, tworzącym nowoczesne rozwiązania. Dbam w równym stopniu o wydajność aplikacji, czytelność kodu i doświadczenie użytkownika."
      },
      image: {
        src: "assets/about.jpg",
        focus: "top",          // which part survives the cone crop
        alt:     { en: "Formal photo", pl: "Zdjęcie oficjalne" },
        caption: { en: "Piotr Kiełek", pl: "Piotr Kiełek" }
      },
      blocks: [
        {
          type: "prose",
          text: {
            en: [
              "I began working professionally in my second year of university, broadening my horizons by studying and working half-time at once, right until finishing my master's thesis. Alongside the commercial experience, what developed me most were the projects built for university courses. They gave me a wide range of skills, primarily in technologies around <strong>Python</strong>, such as <strong>FastAPI</strong>, <strong>scikit-learn</strong> and <strong>PyTorch/PyTorch Lightning</strong>, while solving problems in algorithm optimisation, metaheuristics and machine learning (including deep learning). Curiosity pulled me toward mobile applications as well, so I built several projects in <strong>Flutter</strong>.",
              "In that same tech stack - <strong>FastAPI</strong> and <strong>Flutter</strong> - I delivered an extensive information system as my engineering thesis, and a prototype application for managing datasets in computer-vision work as my master's thesis.",
              "My professional work has been tied to <strong>PHP</strong> from the very beginning, where I build full-stack solutions with the <strong>Laravel</strong> framework. For the past two years I have also been the lead developer of a mobile application written in <strong>Flutter</strong>.",
              "Alongside my studies I was heavily involved in student government, which sharpened my soft and leadership skills considerably: I served as chair and oversaw events that took dozens of people to run. I carried the same way of working into my studies - where I set the direction of the projects I worked on - and into my professional work, where I bring initiative and ideas of my own."
            ],pl: [
              "Pracę zawodową podjąłem na drugim roku studiów, poszerzając zakres rozwoju swoich kompetencji poprzez jednoczesne studiowanie i pracowanie na połowę etatu aż do obrony pracy magisterskiej. Oprócz zdobywania doświadczenia w warunkach komercyjnych, najchętniej rozwijałem się poprzez projekty tworzone w ramach przedmiotów realizowanych w czasie studiów. Dzięki nim zdobyłem szeroki wachlarz umiejętności przede wszystkim w technologiach związanych z językiem <strong>Python</strong>, takich jak <strong>FastAPI</strong>, <strong>scikit-learn</strong> oraz <strong>PyTorch/PyTorch Lightning</strong>, podczas rozwiązywania różnych problemów z zakresu optymalizacji algorytmów, metaheurystyk i uczenia maszynowego (w tym głębokiego). Ciekawość ciągnęła mnie też w stronę aplikacji mobilnych, więc stworzyłem kilka projektów w technologii <strong>Flutter</strong>.", 
              "W tym samym stosie technologicznym - <strong>FastAPI</strong> i <strong>Flutter</strong> - zrealizowałem rozbudowany system informatyczny w ramach pracy inżynierskiej oraz prototyp aplikacji do zarządzania zbiorami danych w zastosowaniach wizji komputerowej w ramach pracy magisterskiej.",
              "Od początku działalności zawodowej związany jestem z językiem <strong>PHP</strong>, w którym tworzę rozwiązania fullstackowe z użyciem frameworka <strong>Laravel</strong>. Od dwóch lat jestem także głównym programistą aplikacji mobilnej wykonanej we <strong>Flutterze</strong>.",
              "Równolegle ze studiami działałem intensywnie w samorządzie studenckim, znacznie polepszając swoje kompetencje miękkie i liderskie, pełniąc funkcję przewodniczącego oraz nadzorując wydarzenia angażujące w ich realizację dziesiątki osób. Ten sam sposób pracy przekładałem na działanie w trakcie studiów - gdzie nadawałem kierunek działań w realizowanych projektach - oraz w pracy zawodowej, gdzie wykazuję się inicjatywą i pomysłowością.",
            ]
          }
        },
        {
          type: "facts",
          title: { en: "At a glance", pl: "W skrócie" },
          items: [
            { k: { en: "Age",           pl: "Wiek" },         v: { en: "26", pl: "26" } },
            { k: { en: "Based in",      pl: "Miejsce" },      v: { en: "Łódź, Poland - remote friendly", pl: "Łódź - chętnie zdalnie" } },
            { k: { en: "Languages",     pl: "Języki" },       v: { en: "Polish (native), English (C1)", pl: "polski (ojczysty), angielski (C1)" } },
            { k: { en: "Working since", pl: "Pracuję od" },   v: "2021" },
            { k: { en: "Currently",     pl: "Obecnie" },      v: { en: "Software developer (PHP + JS + Flutter)", pl: "Programista informatyk (PHP + JS + Flutter)" } }
          ]
        },
        {
          type: "quote",
          text: {
            en: "Experience in a particular technology is not what counts - it is only a tool. What counts is the goal, the plan for achieving it, and only then the choice of tool.",
            pl: "Nie liczy się doświadczenie w konkretnej technologii - to tylko narzędzie. Liczy się cel, plan dojścia do niego, a na końcu dobór narzędzia."
          },
          cite: null
        }
      ]
    },

    /* ================================================= 02 · EDUCATION ==== */
    {
      id: "education",
      title:  { en: "Education", pl: "Wykształcenie" },
      kicker: { en: "Two diplomas, but one university and field", pl: "Dwa dyplomy, lecz jedna uczelnia i kierunek" },
      lede: {
        en: "I spent all six years on one degree, Applied Computer Science, at Lodz University of Technology.",
        pl: "Przez cały okres studiów uczyłem się na kierunku informatyka stosowana na Politechnice Łódzkiej."
      },
      image: {
        src: "assets/lodex.jpg",
        alt:     { en: "TUL Campus", pl: "Kampus PŁ" },
        caption: { en: "Lodz University of Technology", pl: "Politechnika Łódzka" }
      },
      blocks: [
        {
          type: "columns",
          columns: [
            {
              title: { en: "Master of Science", pl: "Magister inżynier" },
              meta:  "2024 - 2026",
              org:   { en: "Lodz University of Technology", pl: "Politechnika Łódzka" },
              lines: [
                { k: { en: "Field",  pl: "Kierunek" }, v: { en: "Applied Computer Science", pl: "Informatyka stosowana" } },
                { k: { en: "Specialty",  pl: "Specjalność" }, v: { en: "Software engineering and data analysis", pl: "Inżynieria oprogramowania i analiza danych" } },
                { k: { en: "Thesis", pl: "Temat pracy" },    v: { en: "The application of convolutional neural networks for animal identification", pl: "Zastosowanie splotowych sieci neuronowych do identyfikacji zwierząt" } },
                { k: { en: "Diploma grade", pl: "Ocena na dyplomie" },    v: { en: "5.0 / very good", pl: "5.0 / bardzo dobry" } }
              ],
              tags: {
                en: ["CNNs", "Animal identification", "Deep learning", "Computer vision", "Internet of Things", "PyTorch"],
                pl: ["Splotowe sieci neuronowe", "Identyfikacja zwierząt", "Uczenie głębokie", "Wizja komputerowa", "Internet Rzeczy", "PyTorch"]
              }
            },
            {
              title: { en: "Bachelor of Engineering", pl: "Inżynier" },
              meta:  "2019 - 2024",
              org:   { en: "Lodz University of Technology", pl: "Politechnika Łódzka" },
              lines: [
                { k: { en: "Field",  pl: "Kierunek" }, v: { en: "Applied Computer Science", pl: "Informatyka stosowana" } },
                { k: { en: "Specialty",  pl: "Specjalność" }, v: { en: "Software engineering and machine learning", pl: "Inżynieria oprogramowania i uczenie maszynowe" } },
                { k: { en: "Thesis", pl: "Temat pracy" },    v: { en: "Multi-platform information system supporting the operation of restaurants with the use of Flutter technology", pl: "Wieloplatformowy system informatyczny wspomagający pracę restauracji z użyciem technologii Flutter" } },
                { k: { en: "Diploma grade", pl: "Ocena na dyplomie" },    v: { en: "5.0 / very good", pl: "5.0 / bardzo dobry" } }
              ],
              tags: {
                en: ["Information system", "Cross-platform applications", "Flutter", "FastAPI", "Waiter service"],
                pl: ["System informatyczny", "Aplikacje wieloplatformowe", "Flutter", "FastAPI", "Obsługa kelnerska"]
              }
            }
          ]
        },
        {
          type: "list",
          title: { en: "Selected academic projects", pl: "Wybrane projekty akademickie" },
          items: [
            {
              title: { en: "eVoting University", pl: "eVoting University" },
              meta:  { en: "two-semester project, 4 people", pl: "dwusemestralny projekt, 4 osoby" },
              text: {
                en: "A project spanning every software-engineering course on the master's programme (24 ECTS). The team chose from available problems the one of running elections for university bodies - the student government, the Senate and the Rector. We carried out a thorough requirements analysis based on the university's own internal regulations. My roles were Project Manager, Lead Backend Developer, Legal Compliance Specialist and PWA Developer.",
                pl: "Projekt realizowany w ramach wszystkich przedmiotów z zakresu inżynierii oprogramowania na studiach magisterskich (24 ECTS). Zespół wybrał z dostępnych tematów ten dotyczący wyborów organów uczelni - samorządu studenckiego, Senatu i Rektora. Przeprowadzono dogłębną analizę wymagań na podstawie wewnętrznych aktów prawnych uczelni. Pełniłem role Project Managera, Lead Backend Developera, Legal Compliance Specialista, a także PWA Developera."
              },
              tags: ["FastAPI", "React", "PWA", "SonarQube", "RabbitMQ", "Prometheus", "Metabase", "Logtail", "Docker", "Supabase", "Geolocation"]
            },
            {
              title: { en: "BasketMeet", pl: "BasketMeet" },
              meta:  { en: "Introduction to Mobile Systems", pl: "Wprowadzenie do aplikacji mobilnych" },
              text: {
                en: "A simple mobile app with a serverless backend for finding basketball games nearby. Creating teams and meeting other players in the app covered the social side. It was also my first project in Flutter.",
                pl: "Prosta aplikacja mobilna z backendem serverless do wyszukiwania pobliskich meczów koszykówki. Za część społecznościową odpowiadały funkcje zakładania zespołów i poznawania innych graczy. Był to zarazem mój pierwszy projekt we Flutterze."
              },
              tags: ["Flutter", "Firebase", "Google Maps API"]
            },
            {
              title: { en: "CelebA - binary attribute prediction", pl: "CelebA - predykcja cech binarnych" },
              meta:  { en: "Deep Learning", pl: "Uczenie głębokie" },
              text: {
                en: "Binary attribute classification on the CelebA dataset. I proposed my own CNN architecture and compared it against a pretrained model (ResNet). I also measured how data augmentation affected accuracy.",
                pl: "Klasyfikacja cech binarnych na zbiorze CelebA. Zaproponowałem własną architekturę CNN i porównałem ją z modelem wstępnie wytrenowanym (ResNet). Sprawdziłem także wpływ augmentacji danych na skuteczność sieci."
              },
              tags: ["Python", "PyTorch", "PyTorch Lightning"]
            },
            {
              title: { en: "Movie rating predictions", pl: "Predykcja ocen filmów" },
              meta:  { en: "Machine Learning", pl: "Uczenie maszynowe" },
              text: {
                en: "The goal was a method predicting a film's rating from a supplied training set built on The Movie Database (TMDB). I applied and compared kNN, decision trees, classifier ensembles, person similarity and collaborative filtering.",
                pl: "Celem projektu było stworzenie metody przewidującej ocenę filmu na podstawie gotowego zbioru treningowego z danymi z The Movie Database (TMDB). Poznałem i zastosowałem kNN, drzewa decyzyjne, komitety klasyfikatorów, podobieństwo osób oraz collaborative filtering."
              },
              tags: ["Python"]
            },
            {
              title: { en: "Text documents classification", pl: "Klasyfikacja dokumentów tekstowych" },
              meta:  { en: "Computer Recognition Systems", pl: "Komputerowe systemy rozpoznawania" },
              text: {
                en: "Classifying articles from the Reuters-21578 dataset into one of six countries of origin using kNN. I evaluated the model with confusion-matrix metrics - precision, recall and F1 - based on various hyperparameter experiments.",
                pl: "Klasyfikacja artykułów ze zbioru Reuters-21578 do jednego z sześciu krajów pochodzenia metodą kNN. Model oceniłem metrykami opartymi na macierzy pomyłek - precyzją, czułością i miarą F1 - w wynikach otrzymanych z różnych eksperymentów na hiperparametrach."
              },
              tags: ["Java", "kNN"]
            }
          ]
        }
      ]
    },

    /* ================================================ 03 · EXPERIENCE ==== */
    {
      id: "experience",
      title:  { en: "Experience", pl: "Doświadczenie" },
      kicker: { en: "Two companies, five years in the industry", pl: "Dwie firmy, pięć lat w branży" },
      lede: {
        en: "Halfway through my engineering degree I began to gain professional experience.",
        pl: "Już w połowie studiów inżynierskich zacząłem zdobywać doświadczenie zawodowe."
      },
      image: {
        src: "assets/toya.jpg",
        focus: "right",
        alt:     { en: "Workplace", pl: "Miejsce pracy" },
        caption: { en: "TOYA", pl: "TOYA" }
      },
      blocks: [
        {
          type: "timeline",
          items: [
            {
              role:   { en: "Software developer (PHP + JS + Flutter)", pl: "Programista informatyk (PHP + JS + Flutter)" },
              org:    { en: "TOYA", pl: "TOYA" },
              period: { en: "Jan 2023 - present", pl: "Sty 2023 - obecnie" },
              milestones: [
                {
                  date: { en: "Jul 2024", pl: "Lip 2024" },
                  text: {
                    en: "Became lead developer of the company's mobile TV application.",
                    pl: "Objęcie roli głównego programisty aplikacji mobilnej telewizji."
                  }
                }
              ],
              bullets: {
                en: [
                  "Building, maintaining and extending an internal data-analysis system covering tens of thousands of devices.",
                  "Designing the database structure from scratch, fed by BigQuery scripts that aggregate and process data from the company's new generation of set-top boxes.",
                  "Developing a web data-visualisation platform in PHP (Laravel), drawing from over 20 million relevant events.",
                  "Maintaining and developing the company's mobile TV application in Flutter (10k+ downloads)."
                ],
                pl: [
                  "Całościowa realizacja, utrzymanie i rozwijanie systemu analizy danych z dziesiątek tysięcy urządzeń.",
                  "Stworzenie od podstaw struktury bazy danych, uzupełnianej przez skrypty w BigQuery, do agregacji i przetwarzania danych z nowej generacji urządzeń firmy.",
                  "Rozwijanie webowej platformy do wizualizacji danych z użyciem PHP (Laravel), czerpiącej z ponad 20 milionów istotnych zdarzeń.",
                  "Utrzymanie i rozwijanie aplikacji mobilnej telewizji we Flutterze (10 tys.+ pobrań)."
                ]
              },
              tags: ["PHP", "Laravel", "Eloquent ORM", "Blade", "JavaScript", "jQuery", "Highcharts", "MySQL", "CSS", "BigQuery", "Flutter", "Dart", "Bloc", "GetIt", "Clean Architecture", "REST APIs", "Firebase", "Google Analytics"]
            },
            {
              role:   { en: "Fullstack Developer", pl: "Fullstack Developer" },
              org:    { en: "ADVERTpro.co", pl: "ADVERTpro.co" },
              period: { en: "Jul 2021 - Aug 2022", pl: "Lip 2021 - Sie 2022" },
              bullets: {
                en: [
                  "Building web pages with PHP, jQuery and Bootstrap.",
                  "Developing an in-house CMS.",
                  "Improving internal team and project processes by introducing tools I had learned at university and in student government.",
                  "Working directly with clients and responding to their needs."
                ],
                pl: [
                  "Tworzenie stron internetowych z użyciem PHP, jQuery, Bootstrap.",
                  "Rozwijanie autorskiego systemu CMS.",
                  "Ulepszanie wewnętrznych schematów pracy zespołowej i projektowej poprzez wprowadzanie narzędzi poznanych podczas aktywności akademickiej i samorządowej.",
                  "Utrzymywanie bezpośrednich kontaktów z klientami i reagowanie na ich potrzeby."
                ]
              },
              tags: ["PHP", "CMS", "JavaScript", "jQuery", "Bootstrap", "MySQL", "HTML5", "CSS"]
            }
          ]
        }
      ]
    },

    /* ============================================== 04 · TECHNOLOGIES ==== */
    {
      id: "technologies",
      title:  { en: "Technologies", pl: "Technologie" },
      kicker: { en: "What I reach for first", pl: "Po co sięgam najpierw" },
      lede: {
        en: "What I work in day to day, and what I have built with and can pick back up without a warm-up.",
        pl: "To, w czym pracuję na co dzień, oraz w czym już budowałem i do czego wracam bez rozgrzewki."
      },
      image: {
        src: "assets/code.jpg",
        alt:     { en: "Code on screen", pl: "Kod na ekranie" },
        caption: null
      },
      blocks: [
        {
          type: "skills",
          groups: [
            {
              name: { en: "Backend", pl: "Backend" },
              core: ["PHP 7/8", "Laravel", "Python", "FastAPI"],
              also: ["SQLAlchemy", "RESTful API"]
            },
            {
              name: { en: "Databases", pl: "Bazy danych" },
              core: ["MySQL / MariaDB", "BigQuery"],
              also: ["PostgreSQL", "Firestore"]
            },
            {
              name: { en: "DevOps", pl: "DevOps" },
              core: ["Docker", "GitHub Actions"],
              also: ["Docker Compose", "RabbitMQ", "Prometheus"]
            },
            {
              name: { en: "Web Frontend", pl: "Web Frontend" },
              core: ["JavaScript (ES6+)", "jQuery", "HTML & CSS"],
              also: ["Bootstrap", "PWA"]
            },
            {
              name: { en: "Mobile", pl: "Mobile" },
              core: ["Flutter", "Dart", "Firebase"],
              also: ["Riverpod", "GetIt","Firebase Cloud Messaging", "Firebase Analytics"]
            },
            {
              name: { en: "ML & data", pl: "ML i dane" },
              core: ["PyTorch", "PyTorch Lightning", "Torchvision"],
              also: ["scikit-learn", "pandas", "NumPy", "Matplotlib"]
            },
            {
              name: { en: "Tooling", pl: "Narzędzia" },
              core: ["Git", "Bash", "Linux", "VS Code", "Claude Code"],
              also: ["UML", "JetBrains IDE"]
            }
          ]
        },
        {
          type: "tags",
          title: { en: "Also touched", pl: "Miałem też do czynienia z" },
          items: ["React", "Java", "JavaFX", "Spring Boot","MS SQL Server",  "x86 ASM", "C/C++", "Embedded (ESP32)", "Metabase"]
        }
      ]
    },

    /* ============================================== 05 · VOLUNTEERING ==== */
    {
      id: "volunteering",
      title:  { en: "Volunteering", pl: "Wolontariat" },
      kicker: { en: "For fulfillment and self-development", pl: "Dla spełnienia i samorozwoju" },
      lede: {
        en: "Since the beginning of my studies I took part in extracurricular activities, which was hard to part with.",
        pl: "Od początku studiów angażowałem się w aktywności dodatkowe, z czym ciężko było się rozstać."
      },
      image: {
        src: "assets/volunteer.jpg",
        focus: "top",
        alt:     { en: "Workshop", pl: "Warsztaty" },
        caption: { en: "Lecture during Faculty Day", pl: "Wykład podczas Dnia Wydziału" }
      },
      blocks: [
        {
          type: "timeline",

          title: { en: "Faculty Student Council (WRS)",
                   pl: "Wydziałowa Rada Samorządu (WRS)" },
          items: [
            {
              role:   { en: "President of the Faculty Electoral Committee", pl: "Przewodniczący Wydziałowej Komisji Wyborczej" },
              period: { en: "Jul 2023, 2025", pl: "Lip 2023, 2025" },
              bullets: [
                { en: "Organised the election of President twice, and moderated the debate in which the candidates took questions.",
                  pl: "Dwa razy organizowałem wybory przewodniczącego i moderowałem debatę z pytaniami do kandydatów." }
              ]
            },
            {
              role:   { en: "President of Faculty Student Council", pl: "Przewodniczący Wydziałowej Rady Samorządu" },
              period: { en: "2022 - 2023 term", pl: "kadencja 2022 - 2023" },
              milestones: [
                {
                  date: {en: "Jul - Oct 2022", pl: "Lip - Paź 2022"},
                  text: { en: "Lead coordinator of the Delta training and integration trip.",
                          pl: "Główny koordynator wyjazdu szkoleniowo-integracyjnego Delta." }
                },
                {
                  date: {en: "Nov - Dec 2022", pl: "Lis - Gru 2022"},
                  text: { en: "Lead coordinator of the Operacja: Mikołajki charity event.",
                          pl: "Główny koordynator akcji charytatywnej Operacja: Mikołajki." }
                },
                {
                  date: {en: "Jan - Apr 2023", pl: "Sty - Kwi 2023"},
                  text: { en: "Oversight and co-organisation of Faculty Day.",
                          pl: "Nadzór i współorganizacja Dnia Wydziału." }
                },
                {
                  date: "2022 - 2023",
                  text: { en: "Co-organised inter-faculty student events (Fuksówka, Połowinki).",
                          pl: "Współorganizacja międzywydziałowych imprez studenckich (Fuksówka, Połowinki)." }
                }
              ],
              bullets: {
                en: [
                  "Managed a team of around 40 active members.",
                  "Led the council’s work on behalf of the faculty’s students.",
                  "Represented the council before the faculty authorities and in a ceremonial capacity (speeches at the inauguration and at the diploma ceremony).",
                  "Revived the council’s internal off-site conference, run to bring its members together and train them."
                ],
                pl: [
                  "Zarządzałem zespołem około 40 aktywnych osób.",
                  "Kierowałem działaniami rady na rzecz studentów Wydziału.",
                  "Reprezentowałem radę przed Władzami Wydziału oraz pełniłem funkcję reprezentacyjną (przemowy na inauguracji oraz rozdaniu dyplomów).",
                  "Reaktywowałem wewnętrzną Konferencję Wyjazdową mającą na celu zintegrowanie i doszkalanie członków rady."
                ]
              },
            },
            {
              role:   { en: "Promotion team coordinator", pl: "Koordynator zespołu promocji" },
              period: { en: "Nov 2021 - Jul 2024", pl: "Lis 2021 - Lip 2024" },
              milestones: [
              ],
              bullets: {
                en: [
                  "Led a team of around 20 people responsible for promoting the council’s events.",
                  "Introduced new ways of working: graphic templates, and a semester-long posting schedule that kept posts from colliding on social media.",
                  "Ran training three times for new council members on managing the council’s social media and writing posts."
                ],
                pl: [
                  "Prowadziłem zespół około 20 osób odpowiedzialnych za promocję wydarzeń organizowanych przez WRS.",
                  "Wdrożyłem nowe mechanizmy działania: szablony grafik, semestralny harmonogram postów aby uniknąć kolizji w social mediach.",
                  "Trzykrotnie przeprowadziłem szkolenie dla nowych członków WRS z zarządzania samorządowymi social mediami i tworzenia postów.",
                ]
              },
            },
            {
              role:   { en: "Member of Faculty Student Council", pl: "Członek Wydziałowej Rady Samorządu" },
              period: { en: "Oct 2019 - Jul 2025", pl: "Paź 2019 - Lip 2025" },
              milestones: [
                {
                  date: { en: "Feb - Mar 2020", pl: "Lut - Mar 2020"},
                  text: { en: "Promotion coordinator for the winter semester teaching survey.",
                          pl: "Koordynator promocji ankietyzacji semestru zimowego." }
                },
                {
                  date: { en: "Apr 2020, Jan 2021", pl: "Kwi 2020, Sty 2021"},
                  text: { en: "Lead coordinator of the online e-sports tournaments, “WRS WFTIMS Tournament Series”.",
                          pl: "Główny koordynator turniejów e-sportowych online „Seria Turniejów WRS WFTIMS”." }
                },
                {
                  date: { en: "Nov - Dec 2020", pl: "Lis - Gru 2020"},
                  text: { en: "Promotion coordinator for the Operacja: Mikołajki charity drive.",
                          pl: "Koordynator promocji Operacji: Mikołajki." }
                },
                {
                  date: { en: "Jul - Oct 2021", pl: "Lip - Paź 2021"},
                  text: { en: "Promotion coordinator for the Delta training and integration trip.",
                          pl: "Koordynator promocji wyjazdu szkoleniowo-integracyjnego Delta." }
                },
                {
                  date: {en: "Jan - Apr 2022", pl: "Sty - Kwi 2022"},
                  text: { en: "Promotion coordinator for Faculty Day.",
                          pl: "Koordynator promocji Dnia Wydziału." }
                },
                {
                  date: {en: "Oct 2023", pl: "Paź 2023"},
                  text: { en: "Lead coordinator of the summer semester teaching survey.",
                          pl: "Główny koordynator ankietyzacji semestru letniego." }
                },
              ],
              bullets: {
                en: [
                  "Joined the promotion team in my first days on the council and stayed an active member, which kept earning me new roles.",
                  "At the start of the COVID-19 pandemic I started an event of my own - the Tournament Series, a student e-sports competition run twice.",
                  "In 2021 I was appointed to the staff of Delta, the four-day training and integration trip and the faculty’s most important event for new students.",
                  "After my term as president ended I stayed active in the council across several teams - promotion, graphics and partnerships.",
                  "For Faculty Day 2025 I gave a lecture - <strong>“Does PHP hold a developer back? A reckoning of the elePHPant’s evolution”</strong>."
                ],
                pl: [
                  "Od początku działalności włączyłem się w zespół promocji, będąc jego aktywnym członkiem, wyróżnianym poprzez bycie przydzielanym do nowych ról.",
                  "Na początku pandemii COVID-19 zainicjowałem autorskie wydarzenie - Serię Turniejów - zorganizowaną dwukrotnie e-sportową rywalizację studencką.",
                  "W 2021 roku zostałem wyznaczony do kadry czterodniowego wyjazdu szkoleniowo-integracyjnego Delta, najważniejszego wydarzenia dla nowych studentów na Wydziale.",
                  "Po zakończeniu kadencji przewodniczącego nadal aktywnie uczestniczyłem w życiu samorządu w różnych zespołach - promocji, grafiki, partnerów.",
                  'W ramach Dnia Wydziału 2025 przeprowadziłem wykład - <strong>„Czy PHP hamuje programistę? - konfrontacja z ewolucją słonika"</strong>.'
                ]
              },
            }
          ]
        },
        {
          type: "timeline",
          title: { en: "Lodz University of Technology Student Council (SSPŁ)",
                   pl: "Samorząd Studencki Politechniki Łódzkiej" },
          items: [
            {
              role:   { en: "Member of the Audit Committee", pl: "Członek Komisji Rewizyjnej" },
              period: { en: "2021 - 2022", pl: "2021 - 2022" },
              bullets: {
                en: [
                  "Oversaw the council’s work as part of its control body, supporting council entities across the university.",
                  "Applied what I had learned in my degree to the Committee’s own work: a Python bot that made the committee easier to reach on the council’s Discord."
                ],
                pl: [
                  "Nadzorowałem pracę samorządu jako organ kontrolny, wspierając jednostki samorządu na całej uczelni.",
                  "Zastosowałem umiejętności nabyte podczas studiów do polepszenia pracy komisji - stworzyłem bota w Pythonie usprawniającego kontakt z komisją na samorządowym Discordzie."
                ]
              },
            }
          ]
        },
        {
          type: "gallery",
          title: { en: "A few frames", pl: "Kilka kadrów" },
          images: [
            { src: "assets/gallery1.jpg", alt: { en: "Delta", pl: "Delta" } },
            { src: "assets/gallery2.jpg", alt: { en: "Internal conference", pl: "Konferencja Wyjazdowa" } },
            { src: "assets/gallery3.jpg", alt: { en: "WRS", pl: "WRS" } }
          ]
        },
        {
          type: "stats",
          items: [
            { value: "50+", label: { en: "people I worked with", pl: "ludzi, z którymi współpracowałem" } },
            { value: "1000+",  label: { en: "students we reached", pl: "studentów, do których dotarliśmy" } },
            { value: "6",    label: { en: "years of extra activity", pl: "lat dodatkowej aktywności" } }
          ]
        }
      ]
    },

    /* ================================================== 06 · PERSONAL ==== */
    {
      id: "personal",
      title:  { en: "Personal", pl: "Prywatnie" },
      kicker: { en: "The parts that do not fit on a CV", pl: "To, co nie mieści się w CV" },
      lede:   { en: "After leaving the office.", pl: "Co po wyjściu z biura." },
      image: {
        src: "assets/personal.jpg",
        alt:     { en: "Holidays 2025", pl: "Wakacje 2025" },
        caption: { en: "Holidays 2025", pl: "Wakacje 2025" }
      },
      blocks: [
        {
          type: "prose",
          text: {
            en: ["My favourite hobbies still keep me in front of a monitor, although I like to relax on a walk in nature's ambience. Or cook with music that may cause my neighbours to want to break my windows (to hear it louder, of course)."],
            pl: ["Ulubione hobby nadal trzyma mnie przy monitorze, natomiast lubię zrelaksować się na spacerze przy szumie natury. Lub też gotować przy muzyce, za którą sąsiedzi mogą chcieć wybić szyby z okien (oczywiście, by słyszeć głośniej)."]
          }
        },
        {
          type: "tags",
          title: { en: "Off the clock", pl: "Po godzinach" },
          items: {
            en: ["PC gaming", "World of Warcraft", "Board games", "Cooking", "Walking", "Electronic music", "Brain teasers", "Suits (TV series)", "Pokemon", "LEGO", "Figurines", "Dragon Ball"],
            pl: ["Gry komputerowe", "World of Warcraft", "Planszówki", "Gotowanie", "Spacery", "Muzyka elektroniczna", "Łamigłówki", "Suits", "Pokemony", "LEGO", "Figurki", "Dragon Ball"]
          }
        },
        {
          type: "facts",
          title: { en: "Currently", pl: "Aktualnie" },
          items: [
            { k: { en: "Playing",  pl: "Gram w" },  v: { en: "League of Legends (unfortunately) and PAYDAY 2", pl: "League of Legends (niestety) i PAYDAY 2" } },
            { k: { en: "Working on", pl: "Pracuję nad" },  v: { en: "Breaking my step-count records", pl: "Pobijaniem rekordów liczby kroków" } },
            { k: { en: "Watching", pl: "Oglądam" }, v: { en: "Reacher and The Blacklist", pl: "Reacher i The Blacklist" } },
            { k: { en: "Waiting for",  pl: "Czekam na" },  v: { en: "New release of Dragon Ball Super", pl: "Nowe wydanie Dragon Ball Super" } }
          ]
        },
      ]
    }
  ]
};
