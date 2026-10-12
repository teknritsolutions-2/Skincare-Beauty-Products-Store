(function () {
  const questions = [
    { q: 'How does your skin usually feel after cleansing?', answers: [['Comfortable', 'Normal'], ['Tight or thirsty', 'Dry'], ['Fresh, then shiny', 'Oily'], ['Different by zone', 'Combination']] },
    { q: 'Where does shine usually appear during the day?', answers: [['Rarely anywhere', 'Dry'], ['Mostly the T-zone', 'Combination'], ['Across most areas', 'Oily'], ['It varies', 'Normal']] },
    { q: 'How does your skin respond to unfamiliar products?', answers: [['Usually comfortable', 'Normal'], ['It can feel easily unsettled', 'Sensitive'], ['It depends on the area', 'Combination']] },
    { q: 'What would help your routine most right now?', answers: [['More comfort and moisture', 'Dry'], ['A lighter, balanced finish', 'Oily'], ['Support for mixed zones', 'Combination'], ['A simple steady routine', 'Normal']] },
    { q: 'Which texture sounds easiest to use consistently?', answers: [['Creamy and cushioning', 'Dry'], ['Light gel or fluid', 'Oily'], ['Layerable by zone', 'Combination'], ['Minimal and gentle', 'Sensitive']] }
  ];

  function resultType(answers) {
    const scores = { Dry: 0, Oily: 0, Combination: 0, Normal: 0, Sensitive: 0 };
    answers.forEach(answer => { if (scores[answer] !== undefined) scores[answer] += 1; });
    return Object.keys(scores).sort((a, b) => scores[b] - scores[a])[0];
  }

  function mount(root) {
    let step = 0;
    let answers = [];

    function drawQuestion() {
      const item = questions[step];
      const progress = Math.round(((step + 1) / questions.length) * 100);
      root.innerHTML = `<div class="quiz-view" aria-live="polite">
        <div class="progress-meta"><span>Question ${step + 1} of ${questions.length}</span><span>${progress}%</span></div>
        <div class="progress-track" aria-hidden="true"><div class="progress-bar" style="width:${progress}%"></div></div>
        <h2>${item.q}</h2>
        <div class="quiz-answers" role="radiogroup" aria-label="Answer choices">
          ${item.answers.map(([label, value]) => `<button class="quiz-answer ${answers[step] === value ? 'selected' : ''}" type="button" role="radio" aria-checked="${answers[step] === value}" data-value="${value}">${label}</button>`).join('')}
        </div>
        <div class="quiz-nav">
          <button class="btn btn-outline quiz-back" type="button" ${step === 0 ? 'disabled' : ''}>Back</button>
          <button class="btn btn-primary quiz-next" type="button" ${answers[step] ? '' : 'disabled'}>${step === questions.length - 1 ? 'See my edit' : 'Next'}</button>
        </div>
      </div>`;
      root.querySelectorAll('.quiz-answer').forEach(button => button.addEventListener('click', () => {
        answers[step] = button.dataset.value;
        drawQuestion();
      }));
      root.querySelector('.quiz-back').addEventListener('click', () => { step -= 1; drawQuestion(); });
      root.querySelector('.quiz-next').addEventListener('click', () => {
        if (step < questions.length - 1) { step += 1; drawQuestion(); }
        else drawResult();
      });
    }

    function drawResult() {
      const type = resultType(answers);
      const recommendations = Products.filter(product => product.available && (product.skin.includes(type) || product.skin.includes('All')))
        .sort((a, b) => ['Cleansers', 'Serums', 'Moisturizers', 'Sunscreens'].indexOf(a.category) - ['Cleansers', 'Serums', 'Moisturizers', 'Sunscreens'].indexOf(b.category))
        .slice(0, 3);
      root.innerHTML = `<div class="quiz-view" aria-live="polite">
        <span class="eyebrow">Your starting edit</span>
        <h2>${type}-leaning skin</h2>
        <p>Your answers suggest a ${type.toLowerCase()}-leaning routine. Treat this as general cosmetic guidance rather than a diagnosis; skin can shift with season, environment and products.</p>
        <div class="quiz-result-products">
          ${recommendations.map(product => `<a class="quiz-result-product" href="product-details.html?id=${product.id}"><img src="${product.image}" alt=""><strong>${product.name}</strong></a>`).join('')}
        </div>
        <div class="actions">
          <a class="btn btn-primary" href="shop.html?skin=${encodeURIComponent(type)}">Shop recommended products</a>
          <button class="btn btn-outline quiz-reset" type="button">Reset quiz</button>
        </div>
      </div>`;
      root.querySelector('.quiz-reset').addEventListener('click', () => { step = 0; answers = []; drawQuestion(); });
    }

    drawQuestion();
  }

  window.SkinQuiz = { mount, resultType };
  document.querySelectorAll('[data-skin-quiz]').forEach(mount);
})();
