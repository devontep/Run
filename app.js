(function () {
  const KEY = "runforge-state-v1";
  const tabs = [
    ["home", "Home", "H"],
    ["plan", "Plan", "P"],
    ["log", "Log", "+"],
    ["progress", "Progress", "%"],
    ["goals", "Goals", "*"],
    ["settings", "Settings", "S"],
  ];

  const runTypes = ["Easy", "Speed", "Tempo", "Long", "Time Trial", "Recovery", "Other"];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const todayIso = () => new Date().toISOString().slice(0, 10);
  const formatDate = (date) => new Date(date + "T12:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  const secondsToTime = (seconds) => {
    if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
    const rounded = Math.round(seconds);
    const hours = Math.floor(rounded / 3600);
    const mins = Math.floor((rounded % 3600) / 60);
    const secs = rounded % 60;
    return hours ? `${hours}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}` : `${mins}:${String(secs).padStart(2, "0")}`;
  };
  const timeToSeconds = (time) => {
    const parts = String(time || "").trim().split(":").map(Number);
    if (parts.some((n) => Number.isNaN(n))) return 0;
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    return 0;
  };
  const pace = (distance, time) => distance > 0 ? `${secondsToTime(timeToSeconds(time) / Number(distance))}/mi` : "0:00/mi";

  const plan = [
    week(1, 11, [
      w("Monday", "Full Body Strength + 2 Mile Easy Run", "Easy", true, 2, "10:15-11:00/mi", ["Full Body Strength", "2 mile easy run"]),
      w("Tuesday", "Speed Work", "Speed", false, 3.5, "400m reps at 2:00", ["Warm-up: 1 mile easy", "6 x 400m @ 2:00 each", "Recovery: 2 minutes walk/jog", "Cooldown: 1 mile"]),
      w("Wednesday", "Mobility / Stretching", "Recovery", false, 0, "Recovery", ["Mobility", "Stretching"]),
      w("Thursday", "Full Body Strength + Tempo Run", "Tempo", true, 4, "2 miles @ 8:45-9:00/mi", ["1 mile easy", "2 miles tempo", "1 mile cooldown"]),
      w("Friday", "Rest", "Rest", false, 0, "Rest", ["Rest"]),
      w("Saturday", "3 Mile Easy Long Run", "Long", false, 3, "10:15-11:15/mi", ["3 mile easy long run"]),
      w("Sunday", "Rest", "Rest", false, 0, "Rest", ["Rest"]),
    ]),
    week(2, 12, [
      w("Monday", "Full Body Strength + 2 Mile Easy Run", "Easy", true, 2, "10:15-11:00/mi", ["Full Body Strength", "2 mile easy run"]),
      w("Tuesday", "Speed Work", "Speed", false, 3.5, "400m reps at 2:00", ["Warm-up: 1 mile easy", "6 x 400m @ 2:00 each", "Recovery: 2 minutes", "Cooldown: 1 mile"]),
      w("Wednesday", "Recovery", "Recovery", false, 0, "Recovery", ["Recovery"]),
      w("Thursday", "Full Body Strength + Tempo Run", "Tempo", true, 4, "2 miles @ 8:45-9:00/mi", ["1 mile easy", "2 miles tempo", "1 mile cooldown"]),
      w("Friday", "Rest", "Rest", false, 0, "Rest", ["Rest"]),
      w("Saturday", "3.5 Mile Easy Long Run", "Long", false, 3.5, "10:15-11:15/mi", ["3.5 mile easy long run"]),
      w("Sunday", "Rest", "Rest", false, 0, "Rest", ["Rest"]),
    ]),
    week(3, 14, [
      w("Monday", "Full Body Strength + 2.5 Mile Easy Run", "Easy", true, 2.5, "10:15-11:00/mi", ["Full Body Strength", "2.5 mile easy run"]),
      w("Tuesday", "Speed Work", "Speed", false, 4, "400m reps at 1:55-2:00", ["Warm-up: 1 mile easy", "8 x 400m @ 1:55-2:00 each", "Recovery: 2 minutes", "Cooldown: 1 mile"]),
      w("Wednesday", "Recovery", "Recovery", false, 0, "Recovery", ["Recovery"]),
      w("Thursday", "Full Body Strength + Tempo Run", "Tempo", true, 5, "3 miles @ 8:45-9:00/mi", ["1 mile easy", "3 miles tempo", "1 mile cooldown"]),
      w("Friday", "Rest", "Rest", false, 0, "Rest", ["Rest"]),
      w("Saturday", "4 Mile Easy Long Run", "Long", false, 4, "10:15-11:15/mi", ["4 mile easy long run"]),
      w("Sunday", "Rest", "Rest", false, 0, "Rest", ["Rest"]),
    ]),
    week(4, 10, [
      w("Monday", "Full Body Strength 80% + 2 Mile Easy Run", "Easy", true, 2, "10:15-11:00/mi", ["Full Body Strength at 80% normal volume", "2 mile easy run"]),
      w("Tuesday", "Speed Sharpening", "Speed", false, 3, "Goal pace", ["Warm-up: 1 mile easy", "4 x 400m @ goal pace", "Recovery: 2 minutes", "Cooldown: 1 mile"]),
      w("Wednesday", "Recovery", "Recovery", false, 0, "Recovery", ["Recovery"]),
      w("Thursday", "Full Body Strength 80% + 2 Mile Easy Run", "Easy", true, 2, "Easy", ["Full Body Strength at 80% normal volume", "2 mile easy run"]),
      w("Friday", "Rest", "Rest", false, 0, "Rest", ["Rest"]),
      w("Saturday", "2-Mile Time Trial", "Time Trial", false, 2, "Goal: under 18:00", ["2-mile time trial", "Goal: under 18:00"]),
      w("Sunday", "Recovery", "Recovery", false, 0, "Recovery", ["Recovery"]),
    ]),
    week(5, 16.5, [
      w("Monday", "Full Body Strength + 3 Mile Easy Run", "Easy", true, 3, "10:15-11:00/mi", ["Full Body Strength", "3 mile easy run"]),
      w("Tuesday", "Speed Work", "Speed", false, 5, "800m reps at 4:05", ["Warm-up: 1 mile easy", "5 x 800m @ 4:05 each", "Recovery: 2-3 minutes", "Cooldown: 1 mile"]),
      w("Wednesday", "Recovery", "Recovery", false, 0, "Recovery", ["Recovery"]),
      w("Thursday", "Full Body Strength + Tempo Run", "Tempo", true, 5.5, "3.5 miles @ 8:45-9:00/mi", ["1 mile easy", "3.5 miles tempo", "1 mile cooldown"]),
      w("Friday", "Rest", "Rest", false, 0, "Rest", ["Rest"]),
      w("Saturday", "5 Mile Easy Long Run", "Long", false, 5, "10:15-11:15/mi", ["5 mile easy long run"]),
      w("Sunday", "Rest", "Rest", false, 0, "Rest", ["Rest"]),
    ]),
    week(6, 17, [
      w("Monday", "Full Body Strength + 3 Mile Easy Run", "Easy", true, 3, "10:15-11:00/mi", ["Full Body Strength", "3 mile easy run"]),
      w("Tuesday", "Speed Work", "Speed", false, 5, "800m reps at 4:00", ["Warm-up: 1 mile easy", "5 x 800m @ 4:00 each", "Recovery: 2-3 minutes", "Cooldown: 1 mile"]),
      w("Wednesday", "Recovery", "Recovery", false, 0, "Recovery", ["Recovery"]),
      w("Thursday", "Full Body Strength + Tempo Run", "Tempo", true, 5.5, "3.5 miles @ 8:45-9:00/mi", ["1 mile easy", "3.5 miles tempo", "1 mile cooldown"]),
      w("Friday", "Rest", "Rest", false, 0, "Rest", ["Rest"]),
      w("Saturday", "5.5 Mile Easy Long Run", "Long", false, 5.5, "10:15-11:15/mi", ["5.5 mile easy long run"]),
      w("Sunday", "Rest", "Rest", false, 0, "Rest", ["Rest"]),
    ]),
    week(7, 19, [
      w("Monday", "Full Body Strength + 3.5 Mile Easy Run", "Easy", true, 3.5, "10:15-11:00/mi", ["Full Body Strength", "3.5 mile easy run"]),
      w("Tuesday", "Speed Work", "Speed", false, 6, "800m reps at 3:55", ["Warm-up: 1 mile easy", "6 x 800m @ 3:55 each", "Recovery: 2-3 minutes", "Cooldown: 1 mile"]),
      w("Wednesday", "Recovery", "Recovery", false, 0, "Recovery", ["Recovery"]),
      w("Thursday", "Full Body Strength + Tempo Run", "Tempo", true, 6, "4 miles @ 8:45-9:00/mi", ["1 mile easy", "4 miles tempo", "1 mile cooldown"]),
      w("Friday", "Rest", "Rest", false, 0, "Rest", ["Rest"]),
      w("Saturday", "6 Mile Easy Long Run", "Long", false, 6, "10:15-11:15/mi", ["6 mile easy long run"]),
      w("Sunday", "Rest", "Rest", false, 0, "Rest", ["Rest"]),
    ]),
    week(8, 11, [
      w("Monday", "Full Body Strength 80% + 3 Mile Easy Run", "Easy", true, 3, "10:15-11:00/mi", ["Full Body Strength at 80% normal volume", "3 mile easy run"]),
      w("Tuesday", "Speed Sharpening", "Speed", false, 3, "Goal pace", ["Warm-up: 1 mile easy", "4 x 400m @ goal pace", "Recovery: 2 minutes", "Cooldown: 1 mile"]),
      w("Wednesday", "Recovery", "Recovery", false, 0, "Recovery", ["Recovery"]),
      w("Thursday", "Full Body Strength 70-80% + 2 Mile Tempo", "Tempo", true, 2, "Tempo", ["Full Body Strength at 70-80% normal volume", "2 mile tempo run"]),
      w("Friday", "Rest", "Rest", false, 0, "Rest", ["Rest"]),
      w("Saturday", "2-Mile Time Trial", "Time Trial", false, 2, "Goal: 17:00-17:30", ["2-mile time trial", "Goal: 17:00-17:30"]),
      w("Sunday", "Rest", "Rest", false, 0, "Rest", ["Rest"]),
    ]),
  ];

  function week(number, miles, workouts) {
    return { number, miles, workouts: workouts.map((workout, index) => ({ ...workout, id: `w${number}-${index + 1}`, weekNumber: number })) };
  }

  function w(dayOfWeek, title, workoutType, includesStrength, distancePlanned, targetPace, instructions) {
    return { dayOfWeek, title, workoutType, includesStrength, distancePlanned, targetPace, instructions, completed: false, completedAt: null };
  }

  const defaultSettings = {
    startingTwoMileTime: "18:30",
    goalTwoMileTime: "17:00",
    trainingStartDate: todayIso(),
    units: "miles",
    notificationsEnabled: true,
    darkMode: true,
  };

  let state = load();

  function load() {
    const saved = JSON.parse(localStorage.getItem(KEY) || "null");
    if (saved) return { ...saved, settings: { ...defaultSettings, ...saved.settings } };
    return { tab: "home", selectedWeek: 1, settings: defaultSettings, completions: {}, logs: [] };
  }

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function setState(next) {
    state = { ...state, ...next };
    save();
    render();
  }

  function getWorkout(id) {
    return plan.flatMap((item) => item.workouts).find((item) => item.id === id);
  }

  function workoutsForWeek(weekNumber) {
    return plan.find((item) => item.number === weekNumber).workouts;
  }

  function plannedRunWorkouts(weekNumber) {
    return workoutsForWeek(weekNumber).filter((item) => item.workoutType !== "Rest" && item.distancePlanned > 0);
  }

  function completedWorkouts(weekNumber) {
    return workoutsForWeek(weekNumber).filter((item) => state.completions[item.id]);
  }

  function completedMiles(weekNumber) {
    const logged = state.logs.filter((log) => log.weekNumber === weekNumber).reduce((sum, log) => sum + Number(log.distance || 0), 0);
    const loggedIds = new Set(state.logs.map((log) => log.workoutId).filter(Boolean));
    const plannedCredits = workoutsForWeek(weekNumber)
      .filter((item) => state.completions[item.id] && item.distancePlanned > 0 && !loggedIds.has(item.id))
      .reduce((sum, item) => sum + item.distancePlanned, 0);
    return logged + plannedCredits;
  }

  function currentWeek() {
    const start = new Date(state.settings.trainingStartDate + "T12:00:00");
    const now = new Date();
    const diff = Math.floor((now - start) / (7 * 24 * 60 * 60 * 1000)) + 1;
    return Math.max(1, Math.min(8, Number.isFinite(diff) ? diff : 1));
  }

  function todayWorkout() {
    const day = days[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
    return workoutsForWeek(currentWeek()).find((item) => item.dayOfWeek === day) || workoutsForWeek(currentWeek())[0];
  }

  function streak() {
    const dates = [...new Set([...Object.values(state.completions).map((item) => item.completedAt), ...state.logs.map((item) => item.date)].filter(Boolean))].sort().reverse();
    if (!dates.length) return 0;
    let count = 0;
    let cursor = new Date(todayIso() + "T12:00:00");
    for (let i = 0; i < 60; i += 1) {
      const iso = cursor.toISOString().slice(0, 10);
      if (dates.includes(iso)) count += 1;
      else if (count > 0) break;
      cursor.setDate(cursor.getDate() - 1);
    }
    return count;
  }

  function bestTwoMile() {
    const tests = state.logs.filter((log) => log.runType === "Time Trial" && Number(log.distance) >= 2).map((log) => timeToSeconds(log.time) * (2 / Number(log.distance)));
    const best = Math.min(timeToSeconds(state.settings.startingTwoMileTime), ...tests);
    return secondsToTime(best);
  }

  function render() {
    document.querySelector(".bottom-tabs").innerHTML = tabs.map(([id, label, icon]) => `<button class="tab-button ${state.tab === id ? "active" : ""}" data-tab="${id}"><span class="tab-icon">${icon}</span>${label}</button>`).join("");
    document.querySelectorAll("[data-tab]").forEach((button) => button.addEventListener("click", () => setState({ tab: button.dataset.tab })));
    const views = { home: renderHome, plan: renderPlan, log: renderLog, progress: renderProgress, goals: renderGoals, settings: renderSettings };
    document.getElementById("app").innerHTML = views[state.tab]();
    bind();
    if (state.tab === "progress") drawCharts();
  }

  function shell(title, subtitle, right = "") {
    return `<header class="topbar"><div><h1 class="brand">${title}</h1><p class="muted">${subtitle}</p></div>${right}</header>`;
  }

  function renderHome() {
    const weekNumber = currentWeek();
    const today = todayWorkout();
    const complete = completedWorkouts(weekNumber).length;
    const total = workoutsForWeek(weekNumber).filter((item) => item.workoutType !== "Rest").length;
    const percent = Math.round((complete / total) * 100);
    const next = workoutsForWeek(weekNumber).find((item) => !state.completions[item.id] && item.workoutType !== "Rest") || today;
    return `
      ${shell("RunForge", `Week ${weekNumber} - 8-Week 2-Mile Build`, `<span class="date-pill">${formatDate(todayIso())}</span>`)}
      <div class="grid two">
        ${metric("Current 2-mile", bestTwoMile(), "Starting point: 18:30")}
        ${metric("Goal 2-mile", state.settings.goalTwoMileTime, "Target race pace")}
        ${metric("Weekly miles", `${completedMiles(weekNumber).toFixed(1)} / ${plan[weekNumber - 1].miles}`, "Completed / planned")}
        ${metric("Training streak", `${streak()} day${streak() === 1 ? "" : "s"}`, `${complete}/${total} workouts this week`)}
      </div>
      <section class="hero-card section-titleless">
        <p class="eyebrow">Today</p>
        <h2>${today.title}</h2>
        <p>${today.includesStrength ? "Strength included - " : ""}${today.workoutType}</p>
        <p class="muted">Target Pace: ${today.targetPace}</p>
        <div class="button-row">
          <button class="primary-button" data-open="${today.id}">Start Workout</button>
          <button class="secondary-button" data-complete="${today.id}">${state.completions[today.id] ? "Completed" : "Mark Complete"}</button>
        </div>
      </section>
      <section class="card progress-ring" style="--pct:${percent}%">
        <div class="ring"><span>${percent}%</span></div>
        <div><p class="eyebrow">Weekly Progress</p><h2>${complete} of ${total}</h2><p class="muted">Next run: ${next.dayOfWeek} - ${next.title}</p></div>
      </section>
      <div class="section-title"><h2>Quick Actions</h2></div>
      <div class="quick-grid">
        <button class="quick-button" data-tab-jump="log">Log Run</button>
        <button class="quick-button" data-tab-jump="plan">View Plan</button>
        <button class="quick-button" data-tt-log>Record 2-Mile Test</button>
        <button class="quick-button" data-weekly-review>Weekly Review</button>
      </div>
    `;
  }

  function metric(label, value, sub) {
    return `<article class="metric"><p class="label">${label}</p><p class="value">${value}</p><p class="sub">${sub}</p></article>`;
  }

  function renderPlan() {
    const selected = plan[state.selectedWeek - 1];
    return `
      ${shell("Plan", `Week ${state.selectedWeek} - ${selected.miles} planned miles`)}
      <div class="week-strip">${plan.map((item) => `<button class="week-button ${state.selectedWeek === item.number ? "active" : ""}" data-week="${item.number}">W${item.number}</button>`).join("")}</div>
      <div class="section-title"><h2>Weekly Schedule</h2><span class="chip">${completedWorkouts(state.selectedWeek).length}/${selected.workouts.filter((item) => item.workoutType !== "Rest").length} done</span></div>
      ${selected.workouts.map(workoutCard).join("")}
    `;
  }

  function workoutCard(item) {
    const done = state.completions[item.id];
    const kind = item.workoutType === "Time Trial" ? "test" : item.workoutType.toLowerCase();
    return `
      <article class="workout-card ${done ? "completed" : ""}">
        <div class="workout-main">
          <button class="check" data-complete="${item.id}" aria-label="Toggle ${item.title}">${done ? "OK" : ""}</button>
          <button class="unstyled" data-open="${item.id}" style="text-align:left;background:transparent;border:0;color:inherit;padding:0">
            <p class="workout-title">${item.dayOfWeek}: ${item.title}</p>
            <p class="workout-meta">${item.distancePlanned ? `${item.distancePlanned} mi - ` : ""}${item.targetPace}${item.includesStrength ? " - Strength" : ""}</p>
          </button>
          <span class="status-pill">${kind}</span>
        </div>
      </article>
    `;
  }

  function renderLog(prefillTrial = false) {
    const selectedWorkout = workoutsForWeek(currentWeek()).find((item) => item.workoutType === "Time Trial");
    return `
      ${shell("Log", "Manual run entry")}
      <form id="logForm" class="form-panel">
        <div class="grid two">
          ${field("Date", `<input name="date" type="date" value="${todayIso()}" required>`)}
          ${field("Run type", `<select name="runType">${runTypes.map((type) => `<option ${prefillTrial && type === "Time Trial" ? "selected" : ""}>${type}</option>`).join("")}</select>`)}
        </div>
        ${field("Planned workout", `<select name="workoutId"><option value="">Unplanned run</option>${plan.flatMap((item) => item.workouts).filter((item) => item.distancePlanned > 0).map((item) => `<option value="${item.id}" ${prefillTrial && selectedWorkout && item.id === selectedWorkout.id ? "selected" : ""}>W${item.weekNumber} ${item.dayOfWeek}: ${item.title}</option>`).join("")}</select>`)}
        <div class="grid two">
          ${field("Distance", `<input name="distance" type="number" min="0" step="0.01" value="${prefillTrial ? "2" : ""}" placeholder="Miles" required>`)}
          ${field("Time", `<input name="time" pattern="[0-9:]*" placeholder="18:30" required>`)}
        </div>
        <div class="grid two">
          ${field("Average pace", `<input name="averagePace" readonly placeholder="Auto-calculated">`)}
          ${field("RPE", `<input name="rpe" type="number" min="1" max="10" value="6" required>`)}
        </div>
        <div class="grid two">
          ${field("Avg HR", `<input name="heartRateAvg" type="number" placeholder="Optional">`)}
          ${field("Max HR", `<input name="heartRateMax" type="number" placeholder="Optional">`)}
        </div>
        <div class="grid two">
          ${field("Cadence", `<input name="cadence" type="number" placeholder="Optional">`)}
          ${field("Weather", `<input name="weather" placeholder="Optional">`)}
        </div>
        ${field("Shoe used", `<input name="shoe" placeholder="Optional">`)}
        ${field("Notes", `<textarea name="notes" placeholder="How did it feel?"></textarea>`)}
        <button class="primary-button" type="submit">Save Run</button>
      </form>
      <div class="section-title"><h2>Recent Runs</h2><span class="chip">${state.logs.length} total</span></div>
      <section class="form-panel">${state.logs.length ? state.logs.slice().reverse().map((log) => `<div class="log-row"><div><strong>${log.runType}</strong><p class="workout-meta">${formatDate(log.date)} - ${log.distance} mi - ${log.averagePace}</p></div><strong>${log.time}</strong></div>`).join("") : `<p class="muted">No runs logged yet.</p>`}</section>
    `;
  }

  function field(label, control) {
    return `<label class="field"><span>${label}</span>${control}</label>`;
  }

  function renderProgress() {
    const weekNumber = currentWeek();
    return `
      ${shell("Progress", "Charts and performance signals")}
      <section class="card chart-card"><h3>2-Mile Progress</h3><canvas id="twoMileChart"></canvas></section>
      <section class="card chart-card"><h3>Weekly Mileage</h3><canvas id="mileageChart"></canvas></section>
      <section class="card chart-card"><h3>Pace Trend</h3><canvas id="paceChart"></canvas></section>
      <section class="form-panel stat-list">
        ${stat("Fastest 400m", fastestInterval(0.25))}
        ${stat("Fastest 800m", fastestInterval(0.5))}
        ${stat("Longest run", `${Math.max(0, ...state.logs.map((log) => Number(log.distance || 0))).toFixed(1)} mi`)}
        ${stat("Consistency score", `${Math.round((completedWorkouts(weekNumber).length / workoutsForWeek(weekNumber).filter((item) => item.workoutType !== "Rest").length) * 100)}%`)}
      </section>
    `;
  }

  function stat(label, value) {
    return `<div class="stat-line"><span>${label}</span><strong>${value}</strong></div>`;
  }

  function fastestInterval(distance) {
    const speedLogs = state.logs.filter((log) => ["Speed", "Time Trial"].includes(log.runType) && Number(log.distance) >= distance);
    if (!speedLogs.length) return "No data";
    return secondsToTime(Math.min(...speedLogs.map((log) => timeToSeconds(log.time) * (distance / Number(log.distance)))));
  }

  function renderGoals() {
    const goals = computeGoals();
    return `
      ${shell("Goals", "Badges and unlocks")}
      ${goals.map((goal) => `
        <article class="goal-card">
          <div class="goal-head"><h3>${goal.unlocked ? "Unlocked" : "Locked"} - ${goal.title}</h3><span class="status-pill">${goal.progress}%</span></div>
          <div class="bar" style="--pct:${goal.progress}%"><span></span></div>
          <p class="workout-meta">${goal.unlockedAt ? `Unlocked ${formatDate(goal.unlockedAt)}` : goal.target}</p>
        </article>
      `).join("")}
    `;
  }

  function computeGoals() {
    const best = timeToSeconds(bestTwoMile());
    const allRunWeeks = plan.some((weekItem) => plannedRunWorkouts(weekItem.number).every((item) => state.completions[item.id]));
    const completedAll = plan.every((weekItem) => weekItem.workouts.filter((item) => item.workoutType !== "Rest").every((item) => state.completions[item.id]));
    const speedAll = plan.flatMap((item) => item.workouts).filter((item) => item.workoutType === "Speed").every((item) => state.completions[item.id]);
    const longest = Math.max(0, ...state.logs.map((log) => Number(log.distance || 0)), ...plan.flatMap((item) => item.workouts).filter((item) => state.completions[item.id]).map((item) => item.distancePlanned));
    const thresholds = [["Sub-18:00 2-mile", 1080], ["Sub-17:30", 1050], ["Sub-17:00", 1020], ["Sub-16:00", 960], ["Sub-15:00", 900]];
    return [
      ...thresholds.map(([title, seconds]) => goal(title, `Run 2 miles under ${secondsToTime(seconds)}`, Math.min(100, Math.round((timeToSeconds(state.settings.startingTwoMileTime) - best) / (timeToSeconds(state.settings.startingTwoMileTime) - seconds) * 100)), best < seconds)),
      goal("Complete all 4 runs in one week", "Finish every run in any training week", allRunWeeks ? 100 : Math.max(...plan.map((weekItem) => Math.round((completedWorkouts(weekItem.number).filter((item) => item.distancePlanned > 0).length / plannedRunWorkouts(weekItem.number).length) * 100))), allRunWeeks),
      goal("Complete 8-week plan", "Finish every non-rest workout", Math.round((Object.keys(state.completions).length / plan.flatMap((item) => item.workouts).filter((item) => item.workoutType !== "Rest").length) * 100), completedAll),
      goal("Run 6-mile long run", "Complete the 6-mile long run", Math.min(100, Math.round((longest / 6) * 100)), longest >= 6),
      goal("Complete every speed session", "Finish all speed sessions in the plan", Math.round((plan.flatMap((item) => item.workouts).filter((item) => item.workoutType === "Speed" && state.completions[item.id]).length / 8) * 100), speedAll),
    ];
  }

  function goal(title, target, progress, unlocked) {
    const clean = Math.max(0, Math.min(100, Number.isFinite(progress) ? progress : 0));
    const unlockDates = Object.values(state.completions).map((item) => item.completedAt).filter(Boolean).sort();
    return { title, target, progress: unlocked ? 100 : clean, unlocked, unlockedAt: unlocked ? unlockDates[unlockDates.length - 1] || todayIso() : null };
  }

  function renderSettings() {
    return `
      ${shell("Settings", "Training preferences")}
      <form id="settingsForm" class="form-panel">
        <div class="grid two">
          ${field("Starting 2-mile", `<input name="startingTwoMileTime" value="${state.settings.startingTwoMileTime}">`)}
          ${field("Goal 2-mile", `<input name="goalTwoMileTime" value="${state.settings.goalTwoMileTime}">`)}
        </div>
        ${field("Training start date", `<input name="trainingStartDate" type="date" value="${state.settings.trainingStartDate}">`)}
        ${field("Preferred units", `<select name="units"><option ${state.settings.units === "miles" ? "selected" : ""}>miles</option><option ${state.settings.units === "kilometers" ? "selected" : ""}>kilometers</option></select>`)}
        <div class="setting-row"><div class="toggle-line"><span>Notifications</span><label class="switch"><input name="notificationsEnabled" type="checkbox" ${state.settings.notificationsEnabled ? "checked" : ""}></label></div></div>
        <div class="setting-row"><div class="toggle-line"><span>Dark mode</span><label class="switch"><input name="darkMode" type="checkbox" ${state.settings.darkMode ? "checked" : ""}></label></div></div>
        <div class="setting-row"><strong>Training days</strong><p class="workout-meta">Strength: Monday and Thursday - Runs: Monday, Tuesday, Thursday, Saturday</p></div>
        <div class="button-row"><button class="primary-button" type="submit">Save Settings</button><button class="danger-button" type="button" data-reset>Reset Plan</button></div>
      </form>
    `;
  }

  function bind() {
    document.querySelectorAll("[data-week]").forEach((button) => button.addEventListener("click", () => setState({ selectedWeek: Number(button.dataset.week) })));
    document.querySelectorAll("[data-tab-jump]").forEach((button) => button.addEventListener("click", () => setState({ tab: button.dataset.tabJump })));
    document.querySelectorAll("[data-complete]").forEach((button) => button.addEventListener("click", (event) => {
      event.preventDefault();
      toggleComplete(button.dataset.complete);
    }));
    document.querySelectorAll("[data-open]").forEach((button) => button.addEventListener("click", () => openWorkout(button.dataset.open)));
    document.querySelector("[data-tt-log]")?.addEventListener("click", () => {
      state.tab = "log";
      render();
      const form = document.getElementById("logForm");
      form.runType.value = "Time Trial";
      form.distance.value = "2";
      calcPace(form);
    });
    document.querySelector("[data-weekly-review]")?.addEventListener("click", () => {
      const weekNumber = currentWeek();
      alert(`Week ${weekNumber} Review\nRuns completed: ${completedWorkouts(weekNumber).filter((item) => item.distancePlanned > 0).length}\nMileage: ${completedMiles(weekNumber).toFixed(1)} / ${plan[weekNumber - 1].miles}\nStrength days: ${completedWorkouts(weekNumber).filter((item) => item.includesStrength).length}\nLongest run: ${Math.max(0, ...state.logs.map((log) => Number(log.distance || 0))).toFixed(1)} mi\nConsistency: ${Math.round((completedWorkouts(weekNumber).length / workoutsForWeek(weekNumber).filter((item) => item.workoutType !== "Rest").length) * 100)}%\nRecommendation: keep the next week steady unless RPE is trending above 8.`);
    });
    document.getElementById("logForm")?.addEventListener("input", (event) => calcPace(event.currentTarget));
    document.getElementById("logForm")?.addEventListener("submit", saveLog);
    document.getElementById("settingsForm")?.addEventListener("submit", saveSettings);
    document.querySelector("[data-reset]")?.addEventListener("click", resetPlan);
  }

  function toggleComplete(id) {
    const completions = { ...state.completions };
    if (completions[id]) delete completions[id];
    else completions[id] = { completedAt: todayIso() };
    setState({ completions });
  }

  function openWorkout(id) {
    const item = getWorkout(id);
    document.getElementById("modalDay").textContent = `Week ${item.weekNumber} - ${item.dayOfWeek}`;
    document.getElementById("modalTitle").textContent = item.title;
    document.getElementById("modalBody").innerHTML = `
      <p class="muted">${item.workoutType} ${item.includesStrength ? "- Strength included" : ""}</p>
      <p><strong>Planned mileage:</strong> ${item.distancePlanned || 0} mi</p>
      <p><strong>Target pace:</strong> ${item.targetPace}</p>
      <ul>${item.instructions.map((line) => `<li>${line}</li>`).join("")}</ul>
    `;
    const complete = document.getElementById("modalComplete");
    complete.textContent = state.completions[id] ? "Mark Incomplete" : "Mark Complete";
    complete.onclick = () => toggleComplete(id);
    document.getElementById("workoutDialog").showModal();
  }

  function calcPace(form) {
    if (form.distance && form.time && form.averagePace) form.averagePace.value = pace(Number(form.distance.value), form.time.value);
  }

  function saveLog(event) {
    event.preventDefault();
    const form = event.currentTarget;
    calcPace(form);
    const workout = form.workoutId.value ? getWorkout(form.workoutId.value) : null;
    const log = {
      id: `log-${Date.now()}`,
      workoutId: form.workoutId.value,
      weekNumber: workout ? workout.weekNumber : currentWeek(),
      date: form.date.value,
      runType: form.runType.value,
      distance: Number(form.distance.value),
      time: form.time.value,
      averagePace: form.averagePace.value,
      rpe: Number(form.rpe.value),
      heartRateAvg: form.heartRateAvg.value,
      heartRateMax: form.heartRateMax.value,
      cadence: form.cadence.value,
      weather: form.weather.value,
      shoe: form.shoe.value,
      notes: form.notes.value,
    };
    const completions = { ...state.completions };
    if (log.workoutId) completions[log.workoutId] = { completedAt: log.date };
    setState({ logs: [...state.logs, log], completions, tab: "progress" });
  }

  function saveSettings(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setState({
      settings: {
        startingTwoMileTime: form.startingTwoMileTime.value,
        goalTwoMileTime: form.goalTwoMileTime.value,
        trainingStartDate: form.trainingStartDate.value,
        units: form.units.value,
        notificationsEnabled: form.notificationsEnabled.checked,
        darkMode: form.darkMode.checked,
      },
    });
  }

  function resetPlan() {
    if (confirm("Reset all completions and run logs?")) setState({ completions: {}, logs: [] });
  }

  function drawCharts() {
    drawLine("twoMileChart", [
      { label: "Start", value: timeToSeconds(state.settings.startingTwoMileTime) / 60 },
      { label: "W4", value: testAtWeek(4) || 18 },
      { label: "W8", value: testAtWeek(8) || timeToSeconds(bestTwoMile()) / 60 },
    ], 17);
    drawBars("mileageChart", plan.map((item) => ({ label: `W${item.number}`, planned: item.miles, actual: completedMiles(item.number) })));
    drawLine("paceChart", plan.map((item) => ({ label: `W${item.number}`, value: averagePaceForWeek(item.number) })));
  }

  function testAtWeek(weekNumber) {
    const tests = state.logs.filter((log) => log.weekNumber === weekNumber && log.runType === "Time Trial");
    if (!tests.length) return null;
    return Math.min(...tests.map((log) => timeToSeconds(log.time) / 60));
  }

  function averagePaceForWeek(weekNumber) {
    const logs = state.logs.filter((log) => log.weekNumber === weekNumber && Number(log.distance) > 0);
    if (!logs.length) return 10;
    return logs.reduce((sum, log) => sum + timeToSeconds(log.time), 0) / logs.reduce((sum, log) => sum + Number(log.distance), 0) / 60;
  }

  function prepCanvas(id) {
    const canvas = document.getElementById(id);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(rect.width * devicePixelRatio));
    canvas.height = Math.floor(170 * devicePixelRatio);
    const ctx = canvas.getContext("2d");
    ctx.scale(devicePixelRatio, devicePixelRatio);
    return { ctx, w: rect.width, h: 170 };
  }

  function drawLine(id, data, goalLine) {
    const { ctx, w: width, h: height } = prepCanvas(id);
    const values = data.map((item) => item.value).filter(Number.isFinite);
    const min = Math.min(...values, goalLine || Infinity) - 0.5;
    const max = Math.max(...values) + 0.5;
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "rgba(255,255,255,.12)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i += 1) {
      const y = 18 + i * 34;
      ctx.beginPath(); ctx.moveTo(34, y); ctx.lineTo(width - 14, y); ctx.stroke();
    }
    const pts = data.map((item, index) => ({ x: 38 + index * ((width - 62) / Math.max(1, data.length - 1)), y: 132 - ((item.value - min) / (max - min || 1)) * 104, ...item }));
    ctx.strokeStyle = "#7CFF6B";
    ctx.lineWidth = 3;
    ctx.beginPath();
    pts.forEach((point, index) => index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y));
    ctx.stroke();
    if (goalLine) {
      const y = 132 - ((goalLine - min) / (max - min || 1)) * 104;
      ctx.strokeStyle = "#FACC15";
      ctx.setLineDash([5, 5]);
      ctx.beginPath(); ctx.moveTo(34, y); ctx.lineTo(width - 14, y); ctx.stroke();
      ctx.setLineDash([]);
    }
    pts.forEach((point) => {
      ctx.fillStyle = "#7CFF6B";
      ctx.beginPath(); ctx.arc(point.x, point.y, 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#A3A3A3"; ctx.font = "11px sans-serif"; ctx.fillText(point.label, point.x - 10, 158);
    });
  }

  function drawBars(id, data) {
    const { ctx, w: width, h: height } = prepCanvas(id);
    const max = Math.max(...data.map((item) => Math.max(item.planned, item.actual)), 1);
    ctx.clearRect(0, 0, width, height);
    const gap = 7;
    const group = (width - 36) / data.length;
    data.forEach((item, index) => {
      const x = 22 + index * group;
      const plannedHeight = (item.planned / max) * 108;
      const actualHeight = (item.actual / max) * 108;
      ctx.fillStyle = "rgba(255,255,255,.16)";
      ctx.fillRect(x, 132 - plannedHeight, (group - gap) / 2, plannedHeight);
      ctx.fillStyle = "#7CFF6B";
      ctx.fillRect(x + (group - gap) / 2 + 3, 132 - actualHeight, (group - gap) / 2, actualHeight);
      ctx.fillStyle = "#A3A3A3"; ctx.font = "10px sans-serif"; ctx.fillText(item.label, x, 158);
    });
  }

  render();
})();
