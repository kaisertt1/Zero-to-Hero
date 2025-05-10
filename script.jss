// Game State
const game = {
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  stats: {
    strength: 0,
    intelligence: 0,
    charm: 0,
    courage: 0,
    agility: 0,
    discipline: 0,
    wisdom: 0
  }
};

// Initialize
function init() {
  loadGame();
  updateUI();
}

// Add XP to a stat
function addXP(stat, amount) {
  game.stats[stat] += amount;
  game.xp += amount;
  
  // Check for level up
  if (game.xp >= game.xpToNextLevel) {
    levelUp();
  }
  
  saveGame();
  updateUI();
}

// Level up!
function levelUp() {
  game.level++;
  game.xp -= game.xpToNextLevel;
  game.xpToNextLevel = Math.floor(game.xpToNextLevel * 1.2);
  
  // Visual feedback
  alert(`🎉 Level Up! Now Level ${game.level}`);
}

// Save progress
function saveGame() {
  localStorage.setItem('zeroToHero', JSON.stringify(game));
}

// Load progress
function loadGame() {
  const saved = localStorage.getItem('zeroToHero');
  if (saved) {
    Object.assign(game, JSON.parse(saved));
  }
}

// Update the UI
function updateUI() {
  // Update stats
  for (const stat in game.stats) {
    document.getElementById(`${stat}-val`).textContent = game.stats[stat];
  }
  
  // Update XP/Level
  document.getElementById('level').textContent = game.level;
  document.getElementById('xp').textContent = game.xp;
  document.getElementById('xp-needed').textContent = game.xpToNextLevel;
  
  // Update XP bar
  const xpPercent = (game.xp / game.xpToNextLevel) * 100;
  document.getElementById('xp-fill').style.width = `${xpPercent}%`;
}

// Start the game
window.onload = init;
// Add new function below addXP()
function deductXP(stat, amount) {
  if (stat === 'all') {
    // Deduct from all stats
    for (const key in game.stats) {
      game.stats[key] = Math.max(0, game.stats[key] - amount);
    }
    game.xp = Math.max(0, game.xp - amount);
  } else {
    // Deduct from specific stat
    game.stats[stat] = Math.max(0, game.stats[stat] - amount);
    game.xp = Math.max(0, game.xp - amount);
  }
  
  saveGame();
  updateUI();
  
  // Visual feedback
  const penaltyMsg = stat === 'all' 
    ? `All stats -${amount} (Stay strong!)` 
    : `${stat} -${amount}`;
  alert(`🚨 Penalty: ${penaltyMsg}`);
}

// Modify existing levelUp() to prevent negative XP
function levelUp() {
  if (game.xp >= game.xpToNextLevel) {
    game.level++;
    game.xp = Math.max(0, game.xp - game.xpToNextLevel);
    game.xpToNextLevel = Math.floor(game.xpToNextLevel * 1.2);
    alert(`🎉 Level Up! Now Level ${game.level}`);
  }
}
