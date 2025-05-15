/* blocks/interactive-quiz/interactive-quiz.js */
export default function decorate(block) {
  const quizContainer = document.createElement('div');
  quizContainer.className = 'df-quiz-section';

  // Extract quiz data from block
  const questions = [];
  const questionBlocks = block.querySelectorAll(':scope > div');

  questionBlocks.forEach((qBlock, index) => {
    const question = qBlock.querySelector('h2, h3')?.textContent || `Question ${index + 1}`;
    const options = Array.from(qBlock.querySelectorAll('li')).map(li => li.textContent);

    questions.push({
      question,
      options
    });
  });

  quizContainer.innerHTML = `
    <div class="df-quiz-container">
      <h2 class="df-quiz-heading">What's Your Cookie Personality?</h2>
      <div class="df-quiz-progress"></div>
      <div class="df-quiz-question"></div>
      <div class="df-quiz-options"></div>
      <button class="df-quiz-cta">Next Question</button>
    </div>
  `;

  block.textContent = '';
  block.append(quizContainer);

  // Quiz initialization
  const quiz = {
    currentQuestion: 0,
    totalQuestions: questions.length,
    progressDots: quizContainer.querySelector('.df-quiz-progress'),
    questionEl: quizContainer.querySelector('.df-quiz-question'),
    optionsEl: quizContainer.querySelector('.df-quiz-options'),
    ctaBtn: quizContainer.querySelector('.df-quiz-cta')
  };

  function updateProgress() {
    quiz.progressDots.innerHTML = '';
    for (let i = 0; i < quiz.totalQuestions; i++) {
      const dot = document.createElement('div');
      dot.className = `df-quiz-progress-dot ${i === quiz.currentQuestion ? 'active' : ''}`;
      quiz.progressDots.appendChild(dot);
    }
  }

  function showQuestion() {
    const currentQ = questions[quiz.currentQuestion];
    quiz.questionEl.textContent = currentQ.question;
    quiz.optionsEl.innerHTML = currentQ.options
      .map(option => `<div class="df-quiz-option">${option}</div>`)
      .join('');

    quiz.ctaBtn.textContent = quiz.currentQuestion === quiz.totalQuestions - 1
      ? 'Get Results'
      : 'Next Question';
  }

  quiz.optionsEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('df-quiz-option')) {
      document.querySelectorAll('.df-quiz-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      e.target.classList.add('selected');
    }
  });

  quiz.ctaBtn.addEventListener('click', () => {
    if (quiz.currentQuestion < quiz.totalQuestions - 1) {
      quiz.currentQuestion++;
      updateProgress();
      showQuestion();
    } else {
      // Handle quiz completion
      block.dispatchEvent(new CustomEvent('quizCompleted'));
    }
  });

  updateProgress();
  showQuestion();
}
