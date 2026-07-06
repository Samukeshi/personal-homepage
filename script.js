const chatWindow = document.querySelector("#chatWindow");
const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");
const quickQuestions = document.querySelectorAll("[data-question]");

const profile = {
  name: "樱井白暮",
  identity: "一个正在学习 AI 的学生",
  current: "我最近主要在整理自己的作品，也在尝试用 AI 做一些更完整的小项目。",
  strengths: "我比较擅长把复杂问题讲清楚，也比较关注 AI 应用、内容表达和知识整理这几个方向。",
  works: "目前能看到的是这个个人主页第一版。我最近也在整理自己的作品，尝试用 AI 做一些更完整的小项目。具体细节还没补全的，我就先不乱说。",
  contact: "可以通过 QQ 找我：2579592162。有些细节我这里不一定说得全，想确认的话可以直接来问我。",
};

function getReply(question) {
  const normalized = question.trim().toLowerCase();

  if (includesAny(normalized, ["做什么", "近况", "最近", "现在"])) {
    return profile.current;
  }

  if (includesAny(normalized, ["作品", "项目", "案例", "portfolio"])) {
    return profile.works;
  }

  if (includesAny(normalized, ["联系", "邮箱", "微信", "合作", "contact"])) {
    return profile.contact;
  }

  if (includesAny(normalized, ["是谁", "介绍", "你是谁", "白暮"])) {
    return `我是白暮，${profile.identity}。这个数字分身主要是让你先简单了解我最近在做什么、做过什么，以及怎么联系我。`;
  }

  if (includesAny(normalized, ["擅长", "关心", "方向", "ai", "健身", "体育", "运动"])) {
    return profile.strengths;
  }

  if (includesAny(normalized, ["apex", "游戏"])) {
    return "我最近会打 APEX，主要是放松一下。其他游戏相关的经历我这里没整理，就先不乱说。";
  }

  return "这个我现在不太确定，就先不乱说。你可以问我最近在做什么、有哪些作品、怎么联系我；更具体的可以通过 QQ 2579592162 直接问我。";
}

function includesAny(text, keywords) {
  return keywords.some((keyword) => text.includes(keyword));
}

function addMessage(role, text) {
  const message = document.createElement("div");
  message.className = `message ${role}`;

  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  message.append(paragraph);

  chatWindow.append(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function ask(question) {
  const text = question.trim();
  if (!text) return;

  addMessage("user", text);
  chatInput.value = "";

  window.setTimeout(() => {
    addMessage("bot", getReply(text));
  }, 260);
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  ask(chatInput.value);
});

quickQuestions.forEach((button) => {
  button.addEventListener("click", () => {
    ask(button.dataset.question);
  });
});
