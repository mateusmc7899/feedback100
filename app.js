// Application data
const DATA = {
  disciplinas_medicas: [
    {"id": 1, "nome": "Cardiologia", "assuntos": ["Arritmias", "Insuficiência Cardíaca", "Coronariopatias", "Hipertensão", "Valvopatias"], "isCustom": false},
    {"id": 2, "nome": "Pneumologia", "assuntos": ["Asma", "DPOC", "Pneumonias", "Derrame Pleural", "Embolia Pulmonar"], "isCustom": false},
    {"id": 3, "nome": "Gastroenterologia", "assuntos": ["DRGE", "Úlcera Péptica", "Hepatites", "Cirrose", "Pancreatite"], "isCustom": false},
    {"id": 4, "nome": "Neurologia", "assuntos": ["AVC", "Epilepsia", "Cefaléias", "Demências", "Parkinson"], "isCustom": false},
    {"id": 5, "nome": "Endocrinologia", "assuntos": ["Diabetes", "Tireoidopatias", "Obesidade", "Osteoporose", "Adrenal"], "isCustom": false},
    {"id": 6, "nome": "Ginecologia", "assuntos": ["Amenorreia", "Sangramento Uterino", "Endometriose", "Miomatose", "Climatério"], "isCustom": false},
    {"id": 7, "nome": "Urologia", "assuntos": ["ITU", "Litíase Renal", "HPB", "Câncer de Próstata", "Disfunção Erétil"], "isCustom": false},
    {"id": 8, "nome": "Dermatologia", "assuntos": ["Dermatite", "Psoríase", "Melanoma", "Acne", "Infecções Fúngicas"], "isCustom": false},
    {"id": 9, "nome": "Oftalmologia", "assuntos": ["Glaucoma", "Catarata", "Retinopatia", "Conjuntivite", "Uveíte"], "isCustom": false},
    {"id": 10, "nome": "Otorrinolaringologia", "assuntos": ["Otite", "Sinusite", "Faringite", "Vertigem", "Perda Auditiva"], "isCustom": false}
  ],
  tipos_aves: [
    {"name": "Canário", "rarity": "comum", "weight": 50, "emoji": "🐤"},
    {"name": "Bem-te-vi", "rarity": "comum", "weight": 50, "emoji": "🐦"}, 
    {"name": "Sabiá", "rarity": "incomum", "weight": 30, "emoji": "🐦"},
    {"name": "Cardeal", "rarity": "raro", "weight": 15, "emoji": "🐦"},
    {"name": "Uirapuru", "rarity": "lendário", "weight": 5, "emoji": "🦅"}
  ],
  cores_aves: ["azul", "vermelho", "verde", "amarelo", "roxo", "dourado"],
  estagios_pet: [
    {"stage": "egg", "name": "Ovo", "emoji": "🥚", "minDays": 0, "maxDays": 7},
    {"stage": "hatching", "name": "Eclodindo", "emoji": "🐣", "minDays": 1, "maxDays": 7},
    {"stage": "chick", "name": "Filhote", "emoji": "🐤", "minDays": 8, "maxDays": 21},
    {"stage": "young", "name": "Jovem", "emoji": "🐦", "minDays": 22, "maxDays": 45},
    {"stage": "teenager", "name": "Adolescente", "emoji": "🦜", "minDays": 46, "maxDays": 90},
    {"stage": "adult", "name": "Adulto", "emoji": "🦅", "minDays": 91, "maxDays": 999}
  ],
  conquistas: [
    {"id": "primeira_eclosao", "name": "Primeira Eclosão", "desc": "Seu primeiro ovo eclodiu!", "icon": "🐣"},
    {"id": "sequencia_7", "name": "Uma Semana", "desc": "7 dias consecutivos estudando", "icon": "📚"},
    {"id": "sequencia_30", "name": "Um Mês", "desc": "30 dias consecutivos estudando", "icon": "🗓️"},
    {"id": "questoes_100", "name": "Centena", "desc": "100 questões respondidas corretamente", "icon": "💯"},
    {"id": "questoes_1000", "name": "Milhar", "desc": "1000 questões respondidas corretamente", "icon": "🏆"},
    {"id": "performance_80", "name": "Excelência", "desc": "Performance média acima de 80%", "icon": "⭐"},
    {"id": "ave_adulta", "name": "Ave Madura", "desc": "Primeira ave chegou à fase adulta", "icon": "🦅"},
    {"id": "colecao_5", "name": "Colecionador", "desc": "5 aves diferentes na coleção", "icon": "🏅"},
    {"id": "tempo_100h", "name": "Dedicação", "desc": "100 horas de estudo acumuladas", "icon": "⏱️"},
    {"id": "sequencia_100", "name": "Persistência", "desc": "100 dias consecutivos estudando", "icon": "🔥"}
  ]
};

const BIRD_VISUALS = {
  'egg': '🥚',
  'hatching': '🐣',
  'chick': '🐤',
  'young': '🐦',
  'teenager': '🦆',
  'adult': {
    'Canário': '🐤',
    'Bem-te-vi': '🦅',
    'Sabiá': '🐦',
    'Cardeal': '🦆',
    'Uirapuru': '🦜'
  }
};

// Storage Helper
class StorageHelper {
  static get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error getting from storage:', error);
      return defaultValue;
    }
  }

  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting to storage:', error);
    }
  }
}

// Sidebar System
class SidebarSystem {
  constructor() {
    this.sidebar = document.getElementById('sidebar');
    this.overlay = document.getElementById('sidebar-overlay');
    this.toggleBtn = document.getElementById('sidebar-toggle');
    this.isCollapsed = false;
    this.isMobile = window.innerWidth < 768;
    
    this.loadState();
    this.bindEvents();
    this.updateState();
  }

  bindEvents() {
    this.toggleBtn.addEventListener('click', () => this.toggle());
    this.overlay.addEventListener('click', () => this.closeMobile());
    
    // Handle window resize
    window.addEventListener('resize', () => {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth < 768;
      
      if (wasMobile !== this.isMobile) {
        this.updateState();
      }
    });
  }

  toggle() {
    if (this.isMobile) {
      this.toggleMobile();
    } else {
      this.toggleDesktop();
    }
  }

  toggleDesktop() {
    this.isCollapsed = !this.isCollapsed;
    this.saveState();
    this.updateState();
  }

  toggleMobile() {
    const isOpen = this.sidebar.classList.contains('mobile-open');
    if (isOpen) {
      this.closeMobile();
    } else {
      this.openMobile();
    }
  }

  openMobile() {
    this.sidebar.classList.add('mobile-open');
    this.overlay.classList.add('active');
  }

  closeMobile() {
    this.sidebar.classList.remove('mobile-open');
    this.overlay.classList.remove('active');
  }

  updateState() {
    if (this.isMobile) {
      // Mobile behavior
      this.sidebar.classList.remove('collapsed');
      this.closeMobile();
    } else {
      // Desktop behavior
      this.sidebar.classList.remove('mobile-open');
      this.overlay.classList.remove('active');
      
      if (this.isCollapsed) {
        this.sidebar.classList.add('collapsed');
      } else {
        this.sidebar.classList.remove('collapsed');
      }
    }

    // Update toggle button icon
    const icon = this.toggleBtn.querySelector('.hamburger-icon');
    if (this.isMobile) {
      icon.textContent = '☰';
    } else {
      icon.textContent = this.isCollapsed ? '☰' : '✕';
    }
  }

  loadState() {
    if (!this.isMobile) {
      this.isCollapsed = StorageHelper.get('sidebarCollapsed', false);
    }
  }

  saveState() {
    if (!this.isMobile) {
      StorageHelper.set('sidebarCollapsed', this.isCollapsed);
    }
  }
}

// Study Timer System
class StudyTimer {
  constructor() {
    this.startTime = null;
    this.elapsedTime = 0;
    this.isRunning = false;
    this.isPaused = false;
    this.interval = null;
    this.lastActiveTime = Date.now();
    
    this.initElements();
    this.bindEvents();
    this.checkVisibility();
  }

  initElements() {
    this.displayElement = document.getElementById('timer-display');
    this.startBtn = document.getElementById('start-timer');
    this.pauseBtn = document.getElementById('pause-timer');
    this.stopBtn = document.getElementById('stop-timer');
    this.statusElement = document.getElementById('timer-status');
    this.studyDurationInput = document.getElementById('study-duration');
  }

  bindEvents() {
    this.startBtn.addEventListener('click', () => this.start());
    this.pauseBtn.addEventListener('click', () => this.pause());
    this.stopBtn.addEventListener('click', () => this.stop());
    
    // Visibility change detection
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.isRunning && !this.isPaused) {
        this.showPauseNotification();
      }
    });
    
    // Window focus/blur events
    window.addEventListener('blur', () => {
      if (this.isRunning && !this.isPaused) {
        this.showPauseNotification();
      }
    });
  }

  checkVisibility() {
    setInterval(() => {
      const now = Date.now();
      if (this.isRunning && !this.isPaused) {
        if (document.hidden || !document.hasFocus()) {
          if (now - this.lastActiveTime > 3000) { // 3 seconds tolerance
            this.showPauseNotification();
          }
        } else {
          this.lastActiveTime = now;
          this.hidePauseNotification();
        }
      }
    }, 1000);
  }

  start() {
    if (!this.isRunning) {
      this.startTime = Date.now() - this.elapsedTime;
      this.isRunning = true;
      this.isPaused = false;
      this.lastActiveTime = Date.now();
      
      this.interval = setInterval(() => this.updateDisplay(), 100);
      
      this.startBtn.classList.add('hidden');
      this.pauseBtn.classList.remove('hidden');
      this.hidePauseNotification();
    }
  }

  pause() {
    if (this.isRunning && !this.isPaused) {
      this.isPaused = true;
      clearInterval(this.interval);
      
      this.pauseBtn.textContent = '▶️ Continuar';
      this.showPauseNotification('Timer pausado manualmente');
    } else if (this.isRunning && this.isPaused) {
      this.isPaused = false;
      this.lastActiveTime = Date.now();
      this.startTime = Date.now() - this.elapsedTime;
      this.interval = setInterval(() => this.updateDisplay(), 100);
      
      this.pauseBtn.textContent = '⏸️ Pausar';
      this.hidePauseNotification();
    }
  }

  stop() {
    if (this.isRunning) {
      const totalMinutes = Math.floor(this.elapsedTime / 60000);
      if (totalMinutes > 0) {
        this.studyDurationInput.value = totalMinutes;
      }
    }
    
    this.isRunning = false;
    this.isPaused = false;
    this.elapsedTime = 0;
    clearInterval(this.interval);
    
    this.displayElement.textContent = '00:00:00';
    this.startBtn.classList.remove('hidden');
    this.pauseBtn.classList.add('hidden');
    this.pauseBtn.textContent = '⏸️ Pausar';
    this.hidePauseNotification();
  }

  updateDisplay() {
    if (this.isRunning && !this.isPaused && !document.hidden && document.hasFocus()) {
      this.elapsedTime = Date.now() - this.startTime;
      this.displayElement.textContent = this.formatTime(this.elapsedTime);
    }
  }

  formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  showPauseNotification(message = 'Timer pausado - app inativo') {
    this.statusElement.textContent = message;
    this.statusElement.classList.remove('hidden');
  }

  hidePauseNotification() {
    this.statusElement.classList.add('hidden');
  }

  getElapsedMinutes() {
    return Math.floor(this.elapsedTime / 60000);
  }
}

// Pet System
class PetSystem {
  constructor() {
    this.currentPet = this.loadCurrentPet();
    this.initElements();
    this.updateDisplay();
  }

  initElements() {
    this.petVisual = document.getElementById('pet-visual');
    this.petName = document.getElementById('pet-name');
    this.petStage = document.getElementById('pet-stage');
    this.petDays = document.getElementById('pet-days');
    this.petProgressFill = document.getElementById('pet-progress-fill');
    this.petProgressText = document.getElementById('pet-progress-text');
  }

  loadCurrentPet() {
    return StorageHelper.get('currentPet', {
      stage: 'egg',
      daysSinceStart: 0,
      studyStreak: 0,
      totalCorrectAnswers: 0,
      totalStudyTime: 0,
      createdAt: Date.now(),
      type: null,
      color: null
    });
  }

  savePet() {
    StorageHelper.set('currentPet', this.currentPet);
  }

  addProgress(studyData) {
    const { correctAnswers, studyTime, isNewDay } = studyData;
    
    // Update pet stats
    this.currentPet.totalCorrectAnswers += correctAnswers;
    this.currentPet.totalStudyTime += studyTime;
    
    if (isNewDay) {
      this.currentPet.daysSinceStart++;
      this.currentPet.studyStreak++;
    }

    // Check for evolution
    this.checkEvolution();
    this.savePet();
    this.updateDisplay();
  }

  checkEvolution() {
    const currentStageIndex = DATA.estagios_pet.findIndex(s => s.stage === this.currentPet.stage);
    const currentStageData = DATA.estagios_pet[currentStageIndex];
    
    // Check if pet meets evolution criteria
    const meetsTimeCriteria = this.currentPet.daysSinceStart >= currentStageData.maxDays;
    const meetsStudyCriteria = this.currentPet.studyStreak >= Math.floor(currentStageData.maxDays / 2);
    const meetsQuestionsCriteria = this.currentPet.totalCorrectAnswers >= currentStageData.maxDays * 5;
    
    if (meetsTimeCriteria || (meetsStudyCriteria && meetsQuestionsCriteria)) {
      this.evolvePet();
    }
  }

  evolvePet() {
    const currentStageIndex = DATA.estagios_pet.findIndex(s => s.stage === this.currentPet.stage);
    
    if (currentStageIndex < DATA.estagios_pet.length - 1) {
      // Normal evolution
      const nextStage = DATA.estagios_pet[currentStageIndex + 1];
      this.currentPet.stage = nextStage.stage;
      this.currentPet.daysSinceStart = nextStage.minDays;
      
      // Assign type and color when hatching
      if (nextStage.stage === 'chick' && !this.currentPet.type) {
        this.assignBirdTypeAndColor();
      }
      
      this.showEvolutionAnimation();
      
      if (nextStage.stage === 'chick') {
        app.achievementSystem.unlock('primeira_eclosao');
      } else if (nextStage.stage === 'adult') {
        app.achievementSystem.unlock('ave_adulta');
      }
      
    } else {
      // Adult bird - move to collection and create new egg
      this.moveToCollectionAndReset();
    }
  }

  assignBirdTypeAndColor() {
    // Weighted random selection for bird type
    const totalWeight = DATA.tipos_aves.reduce((sum, bird) => sum + bird.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const bird of DATA.tipos_aves) {
      random -= bird.weight;
      if (random <= 0) {
        this.currentPet.type = bird.name;
        this.currentPet.rarity = bird.rarity;
        break;
      }
    }
    
    // Random color selection
    this.currentPet.color = DATA.cores_aves[Math.floor(Math.random() * DATA.cores_aves.length)];
  }

  moveToCollectionAndReset() {
    // Add current pet to collection
    app.birdCollection.addBird({
      type: this.currentPet.type,
      rarity: this.currentPet.rarity,
      color: this.currentPet.color,
      obtainedAt: Date.now()
    });
    
    // Reset to new egg
    this.currentPet = {
      stage: 'egg',
      daysSinceStart: 0,
      studyStreak: this.currentPet.studyStreak, // Keep streak
      totalCorrectAnswers: 0,
      totalStudyTime: 0,
      createdAt: Date.now(),
      type: null,
      color: null
    };
    
    this.savePet();
    this.updateDisplay();
  }

  showEvolutionAnimation() {
    this.petVisual.classList.add('evolution');
    setTimeout(() => {
      this.petVisual.classList.remove('evolution');
    }, 1000);
  }

  updateDisplay() {
    const stageData = DATA.estagios_pet.find(s => s.stage === this.currentPet.stage);
    
    // Update visual
    if (this.currentPet.stage === 'adult' && this.currentPet.type) {
      this.petVisual.textContent = BIRD_VISUALS.adult[this.currentPet.type] || BIRD_VISUALS.adult['Canário'];
    } else {
      this.petVisual.textContent = BIRD_VISUALS[this.currentPet.stage];
    }
    
    // Update info
    if (this.currentPet.stage === 'adult' && this.currentPet.type) {
      this.petName.textContent = `${this.currentPet.type} ${this.currentPet.color}`;
    } else {
      this.petName.textContent = stageData.name;
    }
    
    this.petStage.textContent = stageData.name;
    this.petDays.textContent = `Dia ${this.currentPet.daysSinceStart} de ${stageData.maxDays}`;
    
    // Update progress
    const progress = Math.min((this.currentPet.daysSinceStart / stageData.maxDays) * 100, 100);
    this.petProgressFill.style.width = `${progress}%`;
    this.petProgressText.textContent = `${Math.floor(progress)}% para próxima evolução`;
  }
}

// Bird Collection System
class BirdCollection {
  constructor() {
    this.collection = this.loadCollection();
  }

  loadCollection() {
    return StorageHelper.get('birdCollection', []);
  }

  saveCollection() {
    StorageHelper.set('birdCollection', this.collection);
  }

  addBird(birdData) {
    this.collection.push(birdData);
    this.saveCollection();
    this.updateDisplay();
    
    // Check collection achievements
    if (this.collection.length >= 5) {
      app.achievementSystem.unlock('colecao_5');
    }
  }

  updateDisplay() {
    const container = document.getElementById('birds-collection');
    const countElement = document.getElementById('collection-count');
    
    countElement.textContent = this.collection.length;
    
    if (this.collection.length === 0) {
      container.innerHTML = '<p class="text-secondary">Sua coleção está vazia. Continue estudando para ganhar suas primeiras aves!</p>';
      return;
    }
    
    container.innerHTML = this.collection.map((bird, index) => `
      <div class="bird-card">
        <div class="bird-visual">${BIRD_VISUALS.adult[bird.type] || '🐦'}</div>
        <div class="bird-name">${bird.type}</div>
        <div class="bird-rarity ${bird.rarity}">${bird.rarity}</div>
        <div class="bird-color" style="color: ${bird.color};">● ${bird.color}</div>
        <div class="bird-obtained-date">${new Date(bird.obtainedAt).toLocaleDateString('pt-BR')}</div>
      </div>
    `).join('');
  }
}

// Achievement System
class AchievementSystem {
  constructor() {
    this.unlockedAchievements = this.loadAchievements();
    this.updateDisplay();
  }

  loadAchievements() {
    return StorageHelper.get('achievements', []);
  }

  saveAchievements() {
    StorageHelper.set('achievements', this.unlockedAchievements);
  }

  unlock(achievementId) {
    if (!this.unlockedAchievements.includes(achievementId)) {
      this.unlockedAchievements.push(achievementId);
      this.saveAchievements();
      this.showNotification(achievementId);
      this.updateDisplay();
    }
  }

  showNotification(achievementId) {
    const achievement = DATA.conquistas.find(a => a.id === achievementId);
    if (!achievement) return;
    
    const notification = document.getElementById('achievement-notification');
    const icon = notification.querySelector('.achievement-icon');
    const name = notification.querySelector('.achievement-name');
    const desc = notification.querySelector('.achievement-desc');
    
    icon.textContent = achievement.icon;
    name.textContent = achievement.name;
    desc.textContent = achievement.desc;
    
    notification.classList.remove('hidden');
    notification.classList.add('show');
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.classList.add('hidden');
      }, 300);
    }, 3000);
  }

  updateDisplay() {
    const container = document.getElementById('achievements-list');
    
    container.innerHTML = DATA.conquistas.map(achievement => {
      const isUnlocked = this.unlockedAchievements.includes(achievement.id);
      return `
        <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}">
          <div class="achievement-icon">${achievement.icon}</div>
          <div class="achievement-info">
            <div class="achievement-title">${achievement.name}</div>
            <p class="achievement-description">${achievement.desc}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  checkAchievements(stats) {
    // Check various achievement conditions
    if (stats.studyStreak >= 7) {
      this.unlock('sequencia_7');
    }
    if (stats.studyStreak >= 30) {
      this.unlock('sequencia_30');
    }
    if (stats.studyStreak >= 100) {
      this.unlock('sequencia_100');
    }
    if (stats.totalCorrectAnswers >= 100) {
      this.unlock('questoes_100');
    }
    if (stats.totalCorrectAnswers >= 1000) {
      this.unlock('questoes_1000');
    }
    if (stats.averagePerformance >= 80) {
      this.unlock('performance_80');
    }
    if (stats.totalStudyTime >= 6000) { // 100 hours in minutes
      this.unlock('tempo_100h');
    }
  }
}

// Review System
class ReviewSystem {
  constructor() {
    this.reviews = this.loadReviews();
    this.updateDisplay();
  }

  loadReviews() {
    return StorageHelper.get('reviews', []);
  }

  saveReviews() {
    StorageHelper.set('reviews', this.reviews);
  }

  addOrUpdateReview(discipline, topic) {
    const existingIndex = this.reviews.findIndex(r => 
      r.discipline === discipline && r.topic === topic
    );
    
    const reviewDates = [
      new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    ];
    
    if (existingIndex !== -1) {
      // Update existing review
      this.reviews[existingIndex].dates = reviewDates;
      this.reviews[existingIndex].createdAt = Date.now();
    } else {
      // Add new review
      this.reviews.push({
        id: Date.now(),
        discipline,
        topic,
        dates: reviewDates,
        createdAt: Date.now()
      });
    }
    
    this.saveReviews();
    this.updateDisplay();
  }

  deleteReview(reviewId) {
    this.reviews = this.reviews.filter(r => r.id !== reviewId);
    this.saveReviews();
    this.updateDisplay();
  }

  updateDisplay() {
    this.updateMainDisplay();
    this.updateDashboardDisplay();
  }

  updateMainDisplay() {
    const container = document.getElementById('reviews-list');
    
    if (this.reviews.length === 0) {
      container.innerHTML = '<p class="text-secondary">Nenhuma revisão agendada</p>';
      return;
    }
    
    // Flatten all review dates
    const allReviews = [];
    this.reviews.forEach(review => {
      review.dates.forEach(date => {
        allReviews.push({
          ...review,
          reviewDate: date
        });
      });
    });
    
    // Sort by date
    allReviews.sort((a, b) => new Date(a.reviewDate) - new Date(b.reviewDate));
    
    container.innerHTML = allReviews.map(review => {
      const reviewDate = new Date(review.reviewDate);
      const now = new Date();
      const isOverdue = reviewDate < now;
      const isToday = reviewDate.toDateString() === now.toDateString();
      const isTomorrow = reviewDate.toDateString() === new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString();
      
      let statusClass = 'future';
      let statusText = reviewDate.toLocaleDateString('pt-BR');
      
      if (isOverdue) {
        statusClass = 'due';
        statusText = 'Atrasada';
      } else if (isToday) {
        statusClass = 'due';
        statusText = 'Hoje';
      } else if (isTomorrow) {
        statusClass = 'upcoming';
        statusText = 'Amanhã';
      }
      
      return `
        <div class="review-item">
          <div class="review-info">
            <div class="review-subject">${review.discipline} - ${review.topic}</div>
            <div class="review-date">
              <span class="review-status ${statusClass}">${statusText}</span>
            </div>
          </div>
          <div class="review-actions">
            <button class="delete-btn" data-review-id="${review.id}" data-review-info="${review.discipline} - ${review.topic}">
              Excluir
            </button>
          </div>
        </div>
      `;
    }).join('');
    
    // Add event listeners for delete buttons
    container.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const reviewId = parseInt(e.target.dataset.reviewId);
        const reviewInfo = e.target.dataset.reviewInfo;
        this.showDeleteModal(reviewId, reviewInfo);
      });
    });
  }

  updateDashboardDisplay() {
    const container = document.getElementById('recent-reviews');
    
    if (this.reviews.length === 0) {
      container.innerHTML = '<p class="text-secondary">Nenhuma revisão agendada</p>';
      return;
    }
    
    // Get next 3 reviews
    const allReviews = [];
    this.reviews.forEach(review => {
      review.dates.forEach(date => {
        allReviews.push({
          ...review,
          reviewDate: date
        });
      });
    });
    
    allReviews.sort((a, b) => new Date(a.reviewDate) - new Date(b.reviewDate));
    const nextReviews = allReviews.slice(0, 3);
    
    container.innerHTML = nextReviews.map(review => {
      const reviewDate = new Date(review.reviewDate);
      const now = new Date();
      const isOverdue = reviewDate < now;
      const isToday = reviewDate.toDateString() === now.toDateString();
      
      let statusText = reviewDate.toLocaleDateString('pt-BR');
      if (isOverdue) statusText = 'Atrasada';
      else if (isToday) statusText = 'Hoje';
      
      return `
        <div class="review-item">
          <div class="review-info">
            <div class="review-subject">${review.discipline}</div>
            <div class="review-date">${statusText}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  showDeleteModal(reviewId, reviewInfo) {
    const modal = document.getElementById('delete-modal');
    const reviewInfoElement = document.getElementById('delete-review-info');
    
    reviewInfoElement.textContent = reviewInfo;
    modal.classList.remove('hidden');
    
    // Store review ID for confirmation
    modal.dataset.reviewId = reviewId;
  }
}

// Study Stats System
class StudyStatsSystem {
  constructor() {
    this.stats = this.loadStats();
    this.updateDisplay();
  }

  loadStats() {
    return StorageHelper.get('studyStats', {
      totalStudyTime: 0,
      totalCorrectAnswers: 0,
      totalQuestionsAttempted: 0,
      studyStreak: 0,
      lastStudyDate: null,
      dailyStats: {}
    });
  }

  saveStats() {
    StorageHelper.set('studyStats', this.stats);
  }

  addStudySession(sessionData) {
    const { discipline, topic, questionsAttempted, questionsCorrect, studyDuration } = sessionData;
    const today = new Date().toDateString();
    
    // Check if it's a new day
    const isNewDay = this.stats.lastStudyDate !== today;
    
    if (isNewDay) {
      // Check if streak should continue (studied yesterday)
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
      if (this.stats.lastStudyDate === yesterday || this.stats.lastStudyDate === null) {
        this.stats.studyStreak++;
      } else {
        this.stats.studyStreak = 1; // Reset streak
      }
      
      this.stats.lastStudyDate = today;
    }
    
    // Update totals
    this.stats.totalStudyTime += studyDuration;
    this.stats.totalCorrectAnswers += questionsCorrect;
    this.stats.totalQuestionsAttempted += questionsAttempted;
    
    // Update daily stats
    if (!this.stats.dailyStats[today]) {
      this.stats.dailyStats[today] = {
        studyTime: 0,
        correctAnswers: 0,
        questionsAttempted: 0
      };
    }
    
    const dailyStats = this.stats.dailyStats[today];
    dailyStats.studyTime += studyDuration;
    dailyStats.correctAnswers += questionsCorrect;
    dailyStats.questionsAttempted += questionsAttempted;
    
    this.saveStats();
    this.updateDisplay();
    
    // Update pet progress
    app.petSystem.addProgress({
      correctAnswers: questionsCorrect,
      studyTime: studyDuration,
      isNewDay
    });
    
    // Check achievements
    app.achievementSystem.checkAchievements({
      studyStreak: this.stats.studyStreak,
      totalCorrectAnswers: this.stats.totalCorrectAnswers,
      totalStudyTime: this.stats.totalStudyTime,
      averagePerformance: this.getAveragePerformance()
    });
    
    // Add/update review
    app.reviewSystem.addOrUpdateReview(discipline, topic);
    
    return { isNewDay };
  }

  getAveragePerformance() {
    if (this.stats.totalQuestionsAttempted === 0) return 0;
    return Math.round((this.stats.totalCorrectAnswers / this.stats.totalQuestionsAttempted) * 100);
  }

  getTodayStats() {
    const today = new Date().toDateString();
    return this.stats.dailyStats[today] || {
      studyTime: 0,
      correctAnswers: 0,
      questionsAttempted: 0
    };
  }

  updateDisplay() {
    // Update header stats
    document.getElementById('streak-counter').textContent = `🔥 ${this.stats.studyStreak} dias`;
    document.getElementById('total-questions').textContent = `📊 ${this.stats.totalCorrectAnswers} questões`;
    
    // Update daily stats
    const todayStats = this.getTodayStats();
    document.getElementById('daily-time').textContent = `${todayStats.studyTime}min`;
    document.getElementById('daily-correct').textContent = todayStats.correctAnswers;
    
    const todayPerformance = todayStats.questionsAttempted > 0 ? 
      Math.round((todayStats.correctAnswers / todayStats.questionsAttempted) * 100) : 0;
    document.getElementById('daily-performance').textContent = `${todayPerformance}%`;

    // Update history stats
    const totalTimeElement = document.getElementById('total-time');
    const currentStreakElement = document.getElementById('current-streak');
    const averagePerformanceElement = document.getElementById('average-performance');
    
    if (totalTimeElement) {
      const totalHours = Math.floor(this.stats.totalStudyTime / 60);
      totalTimeElement.textContent = `${totalHours}h`;
    }
    
    if (currentStreakElement) {
      currentStreakElement.textContent = `${this.stats.studyStreak} dias`;
    }
    
    if (averagePerformanceElement) {
      averagePerformanceElement.textContent = `${this.getAveragePerformance()}%`;
    }
  }
}

// Settings System
class SettingsSystem {
  constructor() {
    this.settings = this.loadSettings();
    this.initSettings();
  }

  loadSettings() {
    return StorageHelper.get('settings', {
      theme: 'auto',
      notificationsEnabled: true,
      dailyGoal: 5
    });
  }

  saveSettings() {
    StorageHelper.set('settings', this.settings);
  }

  initSettings() {
    const themeSelect = document.getElementById('theme-select');
    const notificationsCheckbox = document.getElementById('notifications-enabled');

    if (themeSelect) {
      themeSelect.value = this.settings.theme;
      themeSelect.addEventListener('change', (e) => {
        this.settings.theme = e.target.value;
        this.saveSettings();
        this.applyTheme();
      });
    }

    if (notificationsCheckbox) {
      notificationsCheckbox.checked = this.settings.notificationsEnabled;
      notificationsCheckbox.addEventListener('change', (e) => {
        this.settings.notificationsEnabled = e.target.checked;
        this.saveSettings();
      });
    }

    // Update daily goal display
    this.updateDailyGoalDisplay();
    this.applyTheme();
  }

  updateDailyGoalDisplay() {
    const currentGoalElement = document.getElementById('current-goal');
    const headerGoalElement = document.getElementById('header-goal');
    const dailyGoalInput = document.getElementById('daily-goal');
    
    if (currentGoalElement) {
      currentGoalElement.textContent = this.settings.dailyGoal;
    }
    if (headerGoalElement) {
      headerGoalElement.textContent = this.settings.dailyGoal;
    }
    if (dailyGoalInput) {
      dailyGoalInput.placeholder = this.settings.dailyGoal.toString();
    }
  }

  applyTheme() {
    const html = document.documentElement;
    
    if (this.settings.theme === 'light') {
      html.setAttribute('data-color-scheme', 'light');
    } else if (this.settings.theme === 'dark') {
      html.setAttribute('data-color-scheme', 'dark');
    } else {
      html.removeAttribute('data-color-scheme');
    }
  }
}

// Navigation System
class NavigationSystem {
  constructor() {
    this.currentTab = 'dashboard';
    this.initNavigation();
  }

  initNavigation() {
    const navButtons = document.querySelectorAll('.sidebar-nav-btn');
    
    navButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tabId = e.target.closest('.sidebar-nav-btn').dataset.tab;
        this.switchTab(tabId);
        
        // Close mobile sidebar when nav item is clicked
        if (window.innerWidth < 768) {
          app.sidebarSystem.closeMobile();
        }
      });
    });
  }

  switchTab(tabId) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.classList.remove('active');
    });
    
    // Remove active class from all nav buttons
    document.querySelectorAll('.sidebar-nav-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Show selected tab
    const targetTab = document.getElementById(tabId);
    const targetBtn = document.querySelector(`[data-tab="${tabId}"]`);
    
    if (targetTab && targetBtn) {
      targetTab.classList.add('active');
      targetBtn.classList.add('active');
      this.currentTab = tabId;
      
      // Update displays when switching to certain tabs
      if (tabId === 'collection') {
        app.birdCollection.updateDisplay();
      } else if (tabId === 'achievements') {
        app.achievementSystem.updateDisplay();
      } else if (tabId === 'reviews') {
        app.reviewSystem.updateDisplay();
      } else if (tabId === 'history') {
        app.studyStats.updateDisplay();
      } else if (tabId === 'settings') {
        app.renderCustomDisciplines();
      }
    }
  }
}

// Main Application Class
class MedStudyApp {
  constructor() {
    this.sidebarSystem = new SidebarSystem();
    this.studyTimer = new StudyTimer();
    this.petSystem = new PetSystem();
    this.birdCollection = new BirdCollection();
    this.achievementSystem = new AchievementSystem();
    this.reviewSystem = new ReviewSystem();
    this.studyStats = new StudyStatsSystem();
    this.settingsSystem = new SettingsSystem();
    this.navigation = new NavigationSystem();
    
    this.disciplines = this.loadDisciplines();
    
    this.initApp();
  }

  loadDisciplines() {
    const customDisciplines = StorageHelper.get('customDisciplines', []);
    return [...DATA.disciplinas_medicas, ...customDisciplines];
  }

  saveDisciplines() {
    const customDisciplines = this.disciplines.filter(d => d.isCustom);
    StorageHelper.set('customDisciplines', customDisciplines);
  }

  initApp() {
    this.populateDisciplines();
    this.initStudyForm();
    this.initModals();
    this.renderCustomDisciplines();
  }

  populateDisciplines() {
    const disciplineSelect = document.getElementById('discipline');
    const topicSelect = document.getElementById('topic');
    
    if (!disciplineSelect || !topicSelect) return;
    
    disciplineSelect.innerHTML = '<option value="">Selecione uma disciplina</option>' +
      this.disciplines.map(d => `<option value="${d.nome}">${d.nome}</option>`).join('');
    
    disciplineSelect.addEventListener('change', (e) => {
      const selectedDiscipline = e.target.value;
      
      if (selectedDiscipline) {
        const discipline = this.disciplines.find(d => d.nome === selectedDiscipline);
        if (discipline) {
          topicSelect.innerHTML = '<option value="">Selecione um assunto</option>' +
            discipline.assuntos.map(a => `<option value="${a}">${a}</option>`).join('');
          topicSelect.disabled = false;
        }
      } else {
        topicSelect.value = '';
        topicSelect.innerHTML = '<option value="">Primeiro selecione a disciplina</option>';
        topicSelect.disabled = true;
      }
    });
  }

  initStudyForm() {
    const form = document.getElementById('study-form');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const disciplineValue = document.getElementById('discipline').value;
      const topicValue = document.getElementById('topic').value;
      const questionsAttemptedValue = parseInt(document.getElementById('questions-attempted').value);
      const questionsCorrectValue = parseInt(document.getElementById('questions-correct').value);
      const studyDurationValue = parseInt(document.getElementById('study-duration').value);
      
      const sessionData = {
        discipline: disciplineValue,
        topic: topicValue,
        questionsAttempted: questionsAttemptedValue,
        questionsCorrect: questionsCorrectValue,
        studyDuration: studyDurationValue
      };
      
      // Validate
      if (!sessionData.discipline || !sessionData.topic) {
        this.showToast('Por favor, selecione uma disciplina e um assunto.', 'error');
        return;
      }
      
      if (sessionData.questionsCorrect > sessionData.questionsAttempted) {
        this.showToast('O número de questões corretas não pode ser maior que o número de questões tentadas.', 'error');
        return;
      }
      
      if (isNaN(sessionData.questionsAttempted) || isNaN(sessionData.questionsCorrect) || isNaN(sessionData.studyDuration)) {
        this.showToast('Por favor, preencha todos os campos com valores válidos.', 'error');
        return;
      }
      
      // Process study session
      this.studyStats.addStudySession(sessionData);
      
      // Reset form
      form.reset();
      document.getElementById('topic').disabled = true;
      document.getElementById('topic').innerHTML = '<option value="">Primeiro selecione a disciplina</option>';
      
      // Stop timer if running
      if (this.studyTimer.isRunning) {
        this.studyTimer.stop();
      }
      
      // Show success message
      this.showToast('Sessão de estudo registrada com sucesso!', 'success');
      
      // Switch to dashboard
      this.navigation.switchTab('dashboard');
    });
  }

  initModals() {
    // Delete modal
    const modal = document.getElementById('delete-modal');
    const closeBtn = document.getElementById('close-modal');
    const cancelBtn = document.getElementById('cancel-delete');
    const confirmBtn = document.getElementById('confirm-delete');
    const backdrop = modal ? modal.querySelector('.modal-backdrop') : null;
    
    if (modal) {
      const closeModal = () => {
        modal.classList.add('hidden');
        delete modal.dataset.reviewId;
      };
      
      if (closeBtn) closeBtn.addEventListener('click', closeModal);
      if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
      if (backdrop) backdrop.addEventListener('click', closeModal);
      
      if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
          const reviewId = parseInt(modal.dataset.reviewId);
          if (reviewId) {
            this.reviewSystem.deleteReview(reviewId);
            closeModal();
          }
        });
      }
    }

    // Confirm modal
    const confirmModal = document.getElementById('confirm-modal');
    const closeConfirmBtn = document.getElementById('close-confirm-modal');
    const cancelConfirmBtn = document.getElementById('cancel-confirm');
    const confirmActionBtn = document.getElementById('confirm-action');
    const confirmBackdrop = confirmModal ? confirmModal.querySelector('.modal-backdrop') : null;
    
    if (confirmModal) {
      const closeConfirmModal = () => {
        confirmModal.classList.add('hidden');
        delete confirmModal.dataset.callback;
      };
      
      if (closeConfirmBtn) closeConfirmBtn.addEventListener('click', closeConfirmModal);
      if (cancelConfirmBtn) cancelConfirmBtn.addEventListener('click', closeConfirmModal);
      if (confirmBackdrop) confirmBackdrop.addEventListener('click', closeConfirmModal);
      
      if (confirmActionBtn) {
        confirmActionBtn.addEventListener('click', () => {
          const callback = confirmModal.callback;
          if (callback) {
            callback();
          }
          closeConfirmModal();
        });
      }
    }
  }

  // Settings Functions
  addCustomDiscipline() {
    const input = document.getElementById('new-discipline');
    const name = input.value.trim();
    
    if (!name) {
      this.showToast('Digite o nome da disciplina', 'error');
      return;
    }
    
    if (this.disciplines.some(d => d.nome.toLowerCase() === name.toLowerCase())) {
      this.showToast('Disciplina já existe', 'error');
      return;
    }
    
    const newDiscipline = {
      id: Date.now(),
      nome: name,
      assuntos: ['Tópico Geral', 'Revisão', 'Exercícios'],
      isCustom: true
    };
    
    this.disciplines.push(newDiscipline);
    this.saveDisciplines();
    this.populateDisciplines();
    this.renderCustomDisciplines();
    this.showToast('Disciplina adicionada!', 'success');
    input.value = '';
  }

  removeCustomDiscipline(disciplineId) {
    this.disciplines = this.disciplines.filter(d => !(d.isCustom && d.id === disciplineId));
    this.saveDisciplines();
    this.populateDisciplines();
    this.renderCustomDisciplines();
    this.showToast('Disciplina removida!', 'success');
  }

  renderCustomDisciplines() {
    const container = document.getElementById('custom-disciplines-list');
    if (!container) return;
    
    const customDisciplines = this.disciplines.filter(d => d.isCustom);
    
    if (customDisciplines.length === 0) {
      container.innerHTML = '<p class="text-secondary" style="margin-top: var(--space-16);">Nenhuma disciplina customizada</p>';
      return;
    }
    
    container.innerHTML = customDisciplines.map(discipline => `
      <div class="custom-discipline-item">
        <div class="discipline-name">
          ${discipline.nome}
          <span class="custom-badge">Custom</span>
        </div>
        <button class="remove-discipline-btn" onclick="app.removeCustomDiscipline(${discipline.id})">
          Remover
        </button>
      </div>
    `).join('');
  }

  async copyData() {
    const data = this.getAllData();
    const jsonData = JSON.stringify(data, null, 2);
    
    try {
      await navigator.clipboard.writeText(jsonData);
      this.showToast('Dados copiados para área de transferência!', 'success');
    } catch (err) {
      // Fallback para browsers mais antigos
      const textarea = document.createElement('textarea');
      textarea.value = jsonData;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.showToast('Dados copiados!', 'success');
    }
  }

  importData() {
    const fileInput = document.getElementById('import-file');
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          this.confirmAction(
            'Importar Dados',
            'Isso substituirá todos os seus dados atuais. Continuar?',
            () => {
              this.loadFromData(data);
              this.showToast('Dados importados com sucesso!', 'success');
              this.updateAllViews();
            }
          );
        } catch (err) {
          this.showToast('Arquivo inválido', 'error');
        }
      };
      reader.readAsText(file);
    };
    fileInput.click();
  }

  downloadJSON() {
    const data = this.getAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medstudy-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('Download iniciado!', 'success');
  }

  viewData() {
    const viewer = document.getElementById('data-viewer');
    if (viewer.classList.contains('hidden')) {
      const data = this.getAllData();
      viewer.value = JSON.stringify(data, null, 2);
      viewer.classList.remove('hidden');
    } else {
      viewer.classList.add('hidden');
    }
  }

  clearAllData() {
    this.confirmAction(
      'Limpar Todos os Dados',
      'Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita.',
      () => {
        ['currentPet', 'birdCollection', 'achievements', 'studyStats', 'reviews', 'sidebarCollapsed', 'customDisciplines', 'settings'].forEach(key => {
          localStorage.removeItem(key);
        });
        
        this.showToast('Dados limpos com sucesso! Recarregando...', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    );
  }

  setDailyGoal() {
    const input = document.getElementById('daily-goal');
    const goal = parseInt(input.value);
    
    if (isNaN(goal) || goal < 1 || goal > 50) {
      this.showToast('Digite uma meta válida entre 1 e 50', 'error');
      return;
    }
    
    this.settingsSystem.settings.dailyGoal = goal;
    this.settingsSystem.saveSettings();
    this.settingsSystem.updateDailyGoalDisplay();
    this.showToast('Meta diária definida!', 'success');
    input.value = '';
  }

  getAllData() {
    return {
      currentPet: StorageHelper.get('currentPet'),
      birdCollection: StorageHelper.get('birdCollection'),
      achievements: StorageHelper.get('achievements'),
      studyStats: StorageHelper.get('studyStats'),
      reviews: StorageHelper.get('reviews'),
      customDisciplines: StorageHelper.get('customDisciplines'),
      settings: StorageHelper.get('settings'),
      exportDate: new Date().toISOString(),
      version: "1.0"
    };
  }

  loadFromData(data) {
    if (data.currentPet) StorageHelper.set('currentPet', data.currentPet);
    if (data.birdCollection) StorageHelper.set('birdCollection', data.birdCollection);
    if (data.achievements) StorageHelper.set('achievements', data.achievements);
    if (data.studyStats) StorageHelper.set('studyStats', data.studyStats);
    if (data.reviews) StorageHelper.set('reviews', data.reviews);
    if (data.customDisciplines) StorageHelper.set('customDisciplines', data.customDisciplines);
    if (data.settings) StorageHelper.set('settings', data.settings);
  }

  updateAllViews() {
    // Reload all systems
    this.petSystem = new PetSystem();
    this.birdCollection = new BirdCollection();
    this.achievementSystem = new AchievementSystem();
    this.reviewSystem = new ReviewSystem();
    this.studyStats = new StudyStatsSystem();
    this.settingsSystem = new SettingsSystem();
    
    // Reload disciplines
    this.disciplines = this.loadDisciplines();
    this.populateDisciplines();
    this.renderCustomDisciplines();
    
    // Update displays
    this.petSystem.updateDisplay();
    this.birdCollection.updateDisplay();
    this.achievementSystem.updateDisplay();
    this.reviewSystem.updateDisplay();
    this.studyStats.updateDisplay();
  }

  confirmAction(title, message, callback) {
    const modal = document.getElementById('confirm-modal');
    const titleElement = document.getElementById('confirm-title');
    const messageElement = document.getElementById('confirm-message');
    
    if (modal && titleElement && messageElement) {
      titleElement.textContent = title;
      messageElement.textContent = message;
      modal.callback = callback;
      modal.classList.remove('hidden');
    }
  }

  showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const messageElement = document.getElementById('toast-message');
    
    if (toast && messageElement) {
      messageElement.textContent = message;
      toast.className = `toast ${type}`;
      toast.classList.add('show');
      
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
          toast.classList.add('hidden');
        }, 300);
      }, 3000);
    }
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new MedStudyApp();
});