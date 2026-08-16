const promptBox =
  document.getElementById("prompt");

const buildButton =
  document.getElementById("build");

const code =
  document.querySelector("#code code");

const preview =
  document.getElementById("preview");

const toast =
  document.getElementById("toast");

const projectName =
  document.getElementById("projectName");


let project = {

  html: "",

  css: "",

  js: ""

};


/* TOAST */

function showToast(message) {

  toast.textContent =
    message;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 2200);

}


/* QUICK PROMPTS */

document
  .querySelectorAll(".quick button")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        promptBox.value =
          button.dataset.prompt;

        promptBox.focus();

      }
    );

  });


/* MODES */

document
  .querySelectorAll(".mode")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(".mode")
          .forEach(item => {

            item.classList.remove(
              "active"
            );

          });

        button.classList.add(
          "active"
        );

      }
    );

  });


/* GENERATE DEMO PROJECT */

function generateProject(
  description
) {

  const isFootball =
    description
      .toLowerCase()
      .includes("футбол");


  const title =
    isFootball
      ? "FOOTBALL ACADEMY"
      : "NOVA PROJECT";


  project.html = `<!DOCTYPE html>

<html lang="ru">

<head>

<meta charset="UTF-8">

<meta
name="viewport"
content="width=device-width, initial-scale=1.0"
>

<title>${title}</title>

<link
rel="stylesheet"
href="style.css"
>

</head>

<body>

<nav>

<div class="logo">
✦ NOVA
</div>

<div class="links">

<a>Home</a>
<a>Projects</a>
<a>About</a>
<a>Contact</a>

</div>

</nav>


<main>

<div class="badge">
AI GENERATED
</div>

<h1>
${title}
</h1>

<p>
Создано с помощью
Nova Code AI.
</p>

<button
onclick="startProject()"
>
Explore →
</button>

</main>


<script src="script.js"><\/script>

</body>

</html>`;


  project.css = `

* {
box-sizing: border-box;
}

body {

margin: 0;

font-family:
Arial,
sans-serif;

background:
#08090d;

color:
white;

}

body::before {

content: "";

position:
fixed;

width:
600px;

height:
600px;

background:
#6356ff;

filter:
blur(180px);

opacity:
.2;

top:
-200px;

right:
-100px;

}

nav {

display:
flex;

justify-content:
space-between;

align-items:
center;

padding:
28px 8%;

}

.logo {

font-weight:
800;

font-size:
18px;

}

.links {

display:
flex;

gap:
25px;

color:
#888;

font-size:
13px;

}

main {

min-height:
80vh;

padding:
18vh 8%;

}

.badge {

color:
#a79cff;

letter-spacing:
4px;

font-size:
10px;

}

h1 {

font-size:
clamp(
48px,
9vw,
110px
);

line-height:
.9;

margin:
20px 0;

letter-spacing:
-5px;

}

p {

color:
#999;

font-size:
16px;

}

button {

margin-top:
20px;

border:
0;

border-radius:
10px;

padding:
14px 22px;

font-weight:
700;

cursor:
pointer;

}

@media(max-width:600px) {

.links {

display:
none;

}

main {

padding-top:
25vh;

}

h1 {

letter-spacing:
-3px;

}

}
`;


  project.js = `

function startProject() {

alert(
"Nova project launched ✦"
);

}

console.log(
"Nova Code AI project ready"
);

`;


  code.textContent =
    project.html;


  projectName.textContent =
    title;


  renderPreview();

}


/* LIVE PREVIEW */

function renderPreview() {

  const iframe =
    document.createElement(
      "iframe"
    );


  iframe.style.width =
    "100%";

  iframe.style.height =
    "100%";

  iframe.style.minHeight =
    "370px";

  iframe.style.border =
    "0";


  preview.innerHTML = "";


  preview.appendChild(
    iframe
  );


  const documentContent =
    project.html
      .replace(
        "</head>",
        `<style>
        ${project.css}
        </style>
        </head>`
      )
      .replace(
        "</body>",
        `<script>
        ${project.js}
        <\/script>
        </body>`
      );


  iframe.srcdoc =
    documentContent;

}


/* BUILD */

buildButton.addEventListener(
  "click",
  () => {

    const request =
      promptBox.value.trim();


    if (!request) {

      showToast(
        "Сначала опиши сайт ✦"
      );

      promptBox.focus();

      return;

    }


    buildButton.disabled =
      true;


    buildButton.textContent =
      "Nova строит… ✦";


    setTimeout(
      () => {

        generateProject(
          request
        );


        buildButton.disabled =
          false;


        buildButton.textContent =
          "Создать с Nova ↗";


        showToast(
          "Проект создан ✦"
        );

      },
      900
    );

  }
);


/* NEW PROJECT */

document
  .getElementById("newProject")
  .addEventListener(
    "click",
    () => {

      promptBox.value = "";

      project = {
        html: "",
        css: "",
        js: ""
      };

      code.textContent =
        "Здесь появится код проекта после генерации.";

      preview.innerHTML = `

      <div>

        <strong>
          Live Preview
        </strong>

        <small>
          Создай проект,
          чтобы увидеть результат.
        </small>

      </div>

      `;


      projectName.textContent =
        "Новый проект";


      showToast(
        "Новый проект готов ✦"
      );

    }
  );


/* FILE SWITCHER */

document
  .querySelectorAll(".file")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(".file")
          .forEach(item => {

            item.classList.remove(
              "active"
            );

          });


        button.classList.add(
          "active"
        );


        const type =
          button.dataset.file;


        if (type === "html") {

          code.textContent =
            project.html;

        }


        if (type === "css") {

          code.textContent =
            project.css;

        }


        if (type === "js") {

          code.textContent =
            project.js;

        }

      }
    );

  });


/* PREVIEW BUTTON */

document
  .getElementById("previewButton")
  .addEventListener(
    "click",
    () => {

      if (!project.html) {

        showToast(
          "Сначала создай проект"
        );

        return;

      }


      renderPreview();

    }
  );


/* PUBLISH */

document
  .getElementById("publish")
  .addEventListener(
    "click",
    () => {

      showToast(
        "Deploy Engine добавим следующим этапом 🚀"
      );

    }
  );
