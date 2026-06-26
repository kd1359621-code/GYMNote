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

const daysSince = document.getElementById("daysSince");

const statusMessage = document.getElementById("statusMessage");







let setRecords = [];






const goAI =
  document.getElementById("goAI");

const aiScreen =
  document.getElementById("aiScreen");

const aiCategorySelect =
  document.getElementById("aiCategorySelect");

const aiExerciseSelect =
  document.getElementById("aiExerciseSelect");

const showAdvice =
  document.getElementById("showAdvice");

const adviceArea =
  document.getElementById("adviceArea");

const adviceTarget =
  document.getElementById("adviceTarget");

const adviceComment =
  document.getElementById("adviceComment");

const backHomeAI =
  document.getElementById("backHomeAI");




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


let longPressTriggered = false;

countCircle.addEventListener("pointerdown", () => {

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

countCircle.addEventListener("pointerup", () => {

  clearTimeout(pressTimer);

  if (longPressTriggered) {

    longPressTriggered = false;
    return;
  }

  count++;

  const repsValue = Number(reps.value);
  const weightValue = Number(weight.value);

  setRecords.push({
    reps: repsValue,
    weight: weightValue
  });

  display.textContent = count;

  startRestTimer();

});

countCircle.addEventListener("pointerleave", () => {
  clearTimeout(pressTimer);
});


//レスト画面
let pressTimer;

let restTime = 90;
let restInterval = null;



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



//日数コメント
function updateTrainingStatus() {

  if (records.length === 0) {

    daysSince.textContent = "初回";
    statusMessage.textContent = "START NOW 💪";

    return;
  }

  const lastRecord =
    records[records.length - 1];

  const lastDate =
    new Date(lastRecord.date);

  const today =
    new Date();

  const diffTime =
    today - lastDate;

  const diffDays =
    Math.floor(
      diffTime / (1000 * 60 * 60 * 24)
    );

  daysSince.textContent =
    `${diffDays}日`;

  if (diffDays === 0) {

    statusMessage.textContent =
      "ON FIRE 🔥";

  } else if (diffDays <= 2) {

    statusMessage.textContent =
      "GREAT 💪";

  } else if (diffDays <= 4) {

    statusMessage.textContent =
      "KEEP GOING 👍";

  } else if (diffDays <= 7) {

    statusMessage.textContent =
      "TIME TO TRAIN 🏋️";

  } else {

    statusMessage.textContent =
      "LET'S TRAIN 🔥";

  }

}


goAI.addEventListener("click", () => {

  home.classList.add("hidden");
  aiScreen.classList.remove("hidden");

  aiCategorySelect.innerHTML = "";

  categories.forEach(category => {

    const option = document.createElement("option");

    option.value = category;
    option.textContent = category;

    aiCategorySelect.appendChild(option);

  });



  aiCategorySelect.addEventListener("change", () => {

    updateAIExercises();

  });

  updateAIExercises();

});

backHomeAI.addEventListener("click", () => {

  aiScreen.classList.add("hidden");

  home.classList.remove("hidden");

});

showAdvice.addEventListener("click", async () => {

  adviceArea.classList.remove("hidden");

  const category = aiCategorySelect.value;
  const exercise = aiExerciseSelect.value;

  const history = records.filter(record =>
    record.category === category &&
    record.exercise === exercise
  );

  const latestRecord = history[history.length - 1];
  if (history.length === 0) {

    adviceTarget.textContent =
      "初回トレーニング";

    adviceComment.textContent =
      "まずは無理のない重量で始めて記録を作りましょう！";

    return;
  }

  // 全セットをまとめる
  const allSets = [];

  history.forEach(record => {
    record.sets.forEach(set => {
      allSets.push(set);
    });
  });

  // 最高重量
  const maxWeight = Math.max(
    ...allSets.map(set => set.weight)
  );

  // 最高重量だけ取り出す
  const maxWeightSets =
    allSets.filter(set => set.weight === maxWeight);

  // その重量で最高レップ
  const maxReps = Math.max(
    ...maxWeightSets.map(set => set.reps)
  );

  console.table(maxWeightSets);

  let targetWeight = maxWeight;
  let targetReps = maxReps;

  if (maxReps >= 12) {

    targetWeight += 2.5;
    targetReps = 8;

  } else {

    targetReps++;

  }

  adviceTarget.textContent =
    `${targetWeight}kg × ${targetReps}回`;

  const response = await fetch("/api/advice.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      category,
      exercise,
      weight: targetWeight,
      reps: targetReps
    })
  });

  const ai = await response.json();

  adviceComment.textContent = ai.advice;

});

function updateAIExercises() {

  aiExerciseSelect.innerHTML = "";

  const category =
    aiCategorySelect.value;

  exercises[category].forEach(exercise => {

    const option = document.createElement("option");

    option.value = exercise;
    option.textContent = exercise;

    aiExerciseSelect.appendChild(option);

  });

}






updateTrainingStatus();