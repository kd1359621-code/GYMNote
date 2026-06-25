let records = JSON.parse(localStorage.getItem("records")) || [];
let count = 0;


const counterTitle = document.getElementById("counterTitle");

let currentCategory = "";
const category = document.getElementById("category");



const display = document.getElementById("count");


const home = document.getElementById("home");
const counter = document.getElementById("counter");

const gosc = document.getElementById("goSetCounter");
const Saveback = document.getElementById("Saveback");
const back = document.getElementById("back");

const ArchiveList = document.getElementById("ArchiveList");

const goArchive = document.getElementById("goArchive");
const archive = document.getElementById("archive");

const newExercise = document.getElementById("newExercise");

const addExercise = document.getElementById("addExercise");

const reps = document.getElementById("reps");

const weight = document.getElementById("weight");

const sortType = document.getElementById("sortType");

const categoryFilter = document.getElementById("categoryFilter");


const startTraining = document.getElementById("startTraining");

const categoryScreen = document.getElementById("categoryScreen");

const countCircle = document.getElementById("countCircle");










const restOverlay = document.getElementById("restOverlay");

const restTimer = document.getElementById("restTimer");

const plusRest = document.getElementById("plusRest");
const minusRest = document.getElementById("minusRest");

const endRest = document.getElementById("endRest");


let setRecords = [];

let longPressTriggered = false;

const exerciseSelect = document.getElementById("exerciseSelect");
let categories =
  JSON.parse(localStorage.getItem("categories")) || [
    "胸",
    "肩",
    "背中",
    "脚",
    "腕"
  ];
display.textContent = count;


let exercises =
  JSON.parse(localStorage.getItem("exercises")) || {

    胸: [
      "ベンチプレス",
      "インクラインプレス"
    ],

    肩: [
      "ショルダープレス",
      "サイドレイズ"
    ],

    背中: [
      "懸垂",
      "ラットプルダウン"
    ],

    脚: [
      "スクワット",
      "レッグプレス"
    ],

    腕: [
      "アームカール"
    ]
  };


//部位

function renderCategories() {

  const categoryList =
    document.getElementById("categoryList");

  categoryList.innerHTML = "";

  categories.forEach(cat => {

    const card =
      document.createElement("div");

    card.className =
      "category-card";

    const btn =
      document.createElement("button");

    btn.className =
      "category-btn";

    btn.textContent = cat;

    btn.addEventListener("click", () => {

      currentCategory = cat;

      startTrainingProcess();

    });

    card.appendChild(btn);

    categoryList.appendChild(card);
  });
}

//renderCategories();




const newCategory =
  document.getElementById("newCategory");

const addCategory =
  document.getElementById("addCategory");





//並び替え
if (addCategory && newCategory) {

  addCategory.addEventListener("click", () => {

    const value = newCategory.value;

    if (value !== "") {

      categories.push(value);
      exercises[value] = [];

      localStorage.setItem(
        "categories",
        JSON.stringify(categories)
      );

      localStorage.setItem(
        "exercises",
        JSON.stringify(exercises)
      );

      renderCategories();

      newCategory.value = "";
    }
  });

}



//セットカウンター



countCircle.addEventListener("click", () => {


  if (longPressTriggered) {

    longPressTriggered = false;
    return;

  }


  count++;

  const repsValue =
    Number(reps.value);

  const weightValue =
    Number(weight.value);

  setRecords.push({

    reps: repsValue,
    weight: weightValue

  });

  display.textContent = count;

  // レスト画面へ
  startRestTimer();
});




//レスト画面
let pressTimer;

let restTime = 90;
let restInterval = null;

countCircle.addEventListener("mousedown", () => {

  longPressTriggered = false;

  pressTimer = setTimeout(() => {

    longPressTriggered = true;

    if (count > 0) {

      count--;
      setRecords.pop();
      display.textContent = count;

    }

  }, 1000);

});

countCircle.addEventListener("mouseup", () => {

  clearTimeout(pressTimer);

});

countCircle.addEventListener("mouseleave", () => {

  clearTimeout(pressTimer);

});



endRest.addEventListener("click", () => {

  clearInterval(restInterval);

  restOverlay.classList.add("hidden");

});


function updateRestDisplay() {



  const minutes =
    String(Math.floor(restTime / 60))
      .padStart(2, "0");

  const seconds =
    String(restTime % 60)
      .padStart(2, "0");

  restTimer.textContent =
    `${minutes}:${seconds}`;
}




function startRestTimer() {

  restTime = 90;

  updateRestDisplay();

  restOverlay.classList.remove("hidden");

  clearInterval(restInterval);

  restInterval = setInterval(() => {

    restTime--;
    console.log(restTime);

    updateRestDisplay();

    if (restTime <= 0) {

      clearInterval(restInterval);

      restOverlay.classList.add("hidden");

    }

  }, 1000);

}


plusRest.addEventListener("click", () => {

  restTime += 30;

  updateRestDisplay();

});

minusRest.addEventListener("click", () => {

  if (restTime > 30) {

    restTime -= 30;

  } else {

    restTime = 0;

  }

  updateRestDisplay();

});






countCircle.addEventListener("touchstart", () => {

  longPressTriggered = false;

  pressTimer = setTimeout(() => {

    longPressTriggered = true;

    if (count > 0) {

      count--;
      setRecords.pop();

      display.textContent = count;
    }

  }, 1000);

});

countCircle.addEventListener("touchend", () => {

  clearTimeout(pressTimer);

});

countCircle.addEventListener("touchcancel", () => {

  clearTimeout(pressTimer);

});







//セットカウンターにいく
gosc.addEventListener("click", () => {

  home.classList.add("hidden");
  categoryScreen.classList.remove("hidden");

  renderCategories();

});



//部位決定処理
function startTrainingProcess() {

  const date =
    document.getElementById("date");

  count = 0;
  display.textContent = count;



  exerciseSelect.innerHTML = "";

  exercises[currentCategory].forEach(exercise => {

    const option =
      document.createElement("option");

    option.value = exercise;
    option.textContent = exercise;

    exerciseSelect.appendChild(option);

  });

  const today = new Date();

  const year =
    today.getFullYear();

  const month =
    String(today.getMonth() + 1)
      .padStart(2, "0");

  const day =
    String(today.getDate())
      .padStart(2, "0");

  date.value =
    `${year}-${month}-${day}`;

  categoryScreen.classList.add("hidden");
  counter.classList.remove("hidden");

};










//ホームに戻る
back.addEventListener("click", () => {
  archive.classList.add("hidden");
  home.classList.remove("hidden");
});


//セーブして戻る
Saveback.addEventListener("click", () => {
  const date = document.getElementById("date");
  const selectedDate = date.value;

  counter.classList.add("hidden");
  home.classList.remove("hidden");

  if (count > 0) {
    const now = new Date();

    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");

    const currentTime = `${hour}:${minute}`;

    records.push({
      category: currentCategory,
      exercise: exerciseSelect.value,
      sets: [...setRecords],
      date: selectedDate,
      time: currentTime
    });

    localStorage.setItem("records", JSON.stringify(records));
  }

  count = 0;
  setRecords = [];
  display.textContent = count;
});


//履歴に飛ぶ
goArchive.addEventListener("click", () => {
  home.classList.add("hidden");
  archive.classList.remove("hidden");

  renderCategoryFilter();


  renderRecords();
});

//履歴並び替え
function renderRecords() {

  ArchiveList.innerHTML = "";

  let sortedRecords = records.slice();


  if (categoryFilter.value !== "all") {

    sortedRecords =
      sortedRecords.filter(record =>
        record.category ===
        categoryFilter.value
      );
  }


  if (sortType.value === "new") {

    sortedRecords.sort((a, b) =>
      new Date(`${b.date} ${b.time}`) -
      new Date(`${a.date} ${a.time}`)
    );

  } else if (sortType.value === "old") {

    sortedRecords.sort((a, b) =>
      new Date(`${a.date} ${a.time}`) -
      new Date(`${b.date} ${b.time}`)
    );
  }

  sortedRecords.forEach(record => {

    const li =
      document.createElement("li");

    li.textContent =
      `${record.category}｜
       ${record.exercise}｜
       ${record.sets.length}セット｜
       ${record.date} ${record.time}`;

    const detail =
      document.createElement("ul");

    const detailBtn =
      document.createElement("button");

    detail.style.display = "none";

    detailBtn.textContent = "詳細表示";


    // セット内容
    record.sets
      .slice()
      .reverse()
      .forEach((set, index) => {

        const setLi =
          document.createElement("li");

        const setNumber =
          record.sets.length - index;

        setLi.textContent =
          `${setNumber}セット目：
           ${set.weight}kg ×
           ${set.reps}rep`;

        detail.appendChild(setLi);
      });


    // ボタン処理
    detailBtn.addEventListener("click", () => {

      if (detail.style.display === "none") {

        detail.style.display = "block";

        detailBtn.textContent =
          "詳細を隠す";

      } else {

        detail.style.display = "none";

        detailBtn.textContent =
          "詳細表示";
      }
    });


    li.appendChild(detailBtn);
    li.appendChild(detail);

    ArchiveList.appendChild(li);

  });
}



sortType.addEventListener("change", () => {
  renderRecords();
});

categoryFilter.addEventListener("change", () => {
  renderRecords();
});

//部位別フィルター
function renderCategoryFilter() {

  categoryFilter.innerHTML =
    '<option value="all">すべての部位</option>';

  categories.forEach(category => {

    const option =
      document.createElement("option");

    option.value =
      category;

    option.textContent =
      category;

    categoryFilter.appendChild(option);

  });
}

//種目追加
addExercise.addEventListener("click", () => {

  const value = newExercise.value;

  if (value !== "") {

    exercises[currentCategory].push(value);

    localStorage.setItem(
      "exercises",
      JSON.stringify(exercises)
    );

    const option =
      document.createElement("option");

    option.value = value;
    option.textContent = value;

    exerciseSelect.appendChild(option);

    newExercise.value = "";
  }
});