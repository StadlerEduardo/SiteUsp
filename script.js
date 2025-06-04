// Global Variables
let userProgress = {
    level: 1,
    xp: 150,
    totalXP: 1500,
    badges: ["first-quiz", "explorer", "knowledge-seeker"],
    completedQuests: ["welcome-tour", "first-quiz"],
    streak: 5,
}

let soundEnabled = true
const achievements = [
    { id: "first-quiz", name: "Primeiro Quiz", icon: "fas fa-brain", color: "blue", unlocked: true },
    { id: "explorer", name: "Explorador", icon: "fas fa-map", color: "green", unlocked: true },
    {
        id: "knowledge-seeker",
        name: "Buscador do Conhecimento",
        icon: "fas fa-book-open",
        color: "purple",
        unlocked: true,
    },
    { id: "streak-master", name: "Mestre da Sequência", icon: "fas fa-fire", color: "yellow", unlocked: false },
    { id: "usp-expert", name: "Expert USP", icon: "fas fa-crown", color: "red", unlocked: false },
]

const quests = [
    {
        id: "campus-tour",
        title: "Tour Virtual pelo Campus",
        description: "Explore todos os pontos importantes do campus",
        xp: 100,
        progress: 60,
        icon: "fas fa-camera",
    },
    {
        id: "history-master",
        title: "Mestre da História",
        description: "Complete todos os quizzes sobre a história da USP",
        xp: 200,
        progress: 30,
        icon: "fas fa-book-open",
    },
    {
        id: "social-connector",
        title: "Conector Social",
        description: "Compartilhe 5 conquistas nas redes sociais",
        xp: 150,
        progress: 80,
        icon: "fas fa-users",
    },
]

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
    initializePage()
    createParticles()
    startDailyTimer()
    animateStats()
})

function initializePage() {
    updateUserProgress()
    renderAchievements()
    renderQuests()

    // Add scroll animations
    window.addEventListener("scroll", handleScroll)

    // Initialize sound state
    updateSoundIcon()
}

function updateUserProgress() {
    const levelElement = document.getElementById("userLevel")
    const xpElement = document.getElementById("currentXP")
    const progressElement = document.getElementById("xpProgress")

    if (levelElement) levelElement.textContent = userProgress.level
    if (xpElement) xpElement.textContent = userProgress.xp
    if (progressElement) {
        const progressPercent = (userProgress.xp / (userProgress.level * 200)) * 100
        progressElement.style.width = `${Math.min(progressPercent, 100)}%`
    }
}

function renderAchievements() {
    const container = document.getElementById("achievementsGrid")
    if (!container) return

    container.innerHTML = ""

    achievements.forEach((achievement) => {
        const achievementElement = document.createElement("div")
        achievementElement.className = `achievement-item ${achievement.unlocked ? "" : "locked"}`

        achievementElement.innerHTML = `
            <div class="achievement-icon ${achievement.color}">
                <i class="${achievement.icon}"></i>
            </div>
            <div class="achievement-name">${achievement.name}</div>
            ${achievement.unlocked ? '<div class="achievement-status">Desbloqueado</div>' : ""}
        `

        container.appendChild(achievementElement)
    })
}

function renderQuests() {
    const container = document.getElementById("questsGrid")
    if (!container) return

    container.innerHTML = ""

    quests.forEach((quest) => {
        const questElement = document.createElement("div")
        questElement.className = "quest-card"

        questElement.innerHTML = `
            <div class="quest-header">
                <div class="quest-icon">
                    <i class="${quest.icon}"></i>
                </div>
                <div class="xp-badge">+${quest.xp} XP</div>
            </div>
            <div class="quest-title">${quest.title}</div>
            <div class="quest-description">${quest.description}</div>
            <div class="quest-progress">
                <div class="progress-header">
                    <span>Progresso</span>
                    <span>${quest.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${quest.progress}%"></div>
                </div>
            </div>
            <button class="btn btn-secondary quest-action">
                Continuar Missão
                <i class="fas fa-chevron-right"></i>
            </button>
        `

        container.appendChild(questElement)
    })
}

function animateStats() {
    const statElements = document.querySelectorAll(".stat-value[data-count]")

    statElements.forEach((element) => {
        const target = Number.parseInt(element.getAttribute("data-count"))
        const duration = 2000
        const step = target / (duration / 16)
        let current = 0

        const timer = setInterval(() => {
            current += step
            if (current >= target) {
                element.textContent = target.toLocaleString()
                clearInterval(timer)
            } else {
                element.textContent = Math.floor(current).toLocaleString()
            }
        }, 16)
    })
}

function handleScroll() {
    const scrolled = window.pageYOffset
    const header = document.querySelector(".header")

    if (scrolled > 50) {
        header.style.background = "rgba(255, 255, 255, 0.98)"
        header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
    } else {
        header.style.background = "rgba(255, 255, 255, 0.95)"
        header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)"
    }

    // Animate elements on scroll
    animateOnScroll()
}

function animateOnScroll() {
    const elements = document.querySelectorAll("[data-aos]")

    elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const elementVisible = 150

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add("animate-fadeInUp")
        }
    })
}

function createParticles() {
    const particlesContainer = document.getElementById("particles")
    if (!particlesContainer) return

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div")
        particle.className = "particle"
        particle.style.left = Math.random() * 100 + "%"
        particle.style.width = Math.random() * 10 + 5 + "px"
        particle.style.height = particle.style.width
        particle.style.animationDelay = Math.random() * 6 + "s"
        particle.style.animationDuration = Math.random() * 3 + 3 + "s"

        particlesContainer.appendChild(particle)
    }
}

function startDailyTimer() {
    const timerElement = document.getElementById("dailyTimer")
    if (!timerElement) return

    let timeLeft = 23 * 3600 + 45 * 60 // 23:45 in seconds

    setInterval(() => {
        const hours = Math.floor(timeLeft / 3600)
        const minutes = Math.floor((timeLeft % 3600) / 60)

        timerElement.textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`

        timeLeft--
        if (timeLeft < 0) {
            timeLeft = 24 * 3600 // Reset to 24 hours
        }
    }, 1000)
}

// Event Handlers
function closeWelcomeModal() {
    const modal = document.getElementById("welcomeModal")
    if (modal) {
        modal.classList.remove("active")
        playSound("success")
        showNotification("Bem-vindo à USP Gamificada!", "success")
    }
}

function toggleSound() {
    soundEnabled = !soundEnabled
    updateSoundIcon()

    if (soundEnabled) {
        showNotification("Som ativado", "success")
    } else {
        showNotification("Som desativado", "warning")
    }
}

function updateSoundIcon() {
    const soundIcon = document.getElementById("soundIcon")
    if (soundIcon) {
        soundIcon.className = soundEnabled ? "fas fa-volume-up" : "fas fa-volume-mute"
    }
}

function playSound(type) {
    if (!soundEnabled) return

    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    switch (type) {
        case "success":
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
            oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1)
            break
        case "error":
            oscillator.frequency.setValueAtTime(300, audioContext.currentTime)
            break
        case "click":
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
            break
    }

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.2)
}

function showNotification(message, type = "success") {
    const container = document.getElementById("notificationContainer")
    if (!container) return

    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "times-circle" : "exclamation-triangle"}"></i>
            <span>${message}</span>
        </div>
    `

    container.appendChild(notification)

    // Animate in
    setTimeout(() => {
        notification.classList.add("show")
    }, 100)

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove("show")
        setTimeout(() => {
            container.removeChild(notification)
        }, 300)
    }, 3000)
}

function addXP(amount, reason = "") {
    userProgress.xp += amount
    userProgress.totalXP += amount

    // Check for level up
    const newLevel = Math.floor(userProgress.totalXP / 1000) + 1
    if (newLevel > userProgress.level) {
        userProgress.level = newLevel
        showNotification(`Parabéns! Você subiu para o nível ${newLevel}!`, "success")
        playSound("success")
    }

    updateUserProgress()
    showNotification(`+${amount} XP ${reason}`, "success")
    playSound("click")
}

function unlockAchievement(achievementId) {
    const achievement = achievements.find((a) => a.id === achievementId)
    if (achievement && !achievement.unlocked) {
        achievement.unlocked = true
        userProgress.badges.push(achievementId)

        showNotification(`Conquista desbloqueada: ${achievement.name}!`, "success")
        playSound("success")
        renderAchievements()
    }
}

// Navigation Functions
function openPage(url) {
    playSound("click")
    window.location.href = url
}

function startTour() {
    playSound("click")
    addXP(10, "por iniciar o tour")
    window.location.href = "tour.html"
}

function startQuiz() {
    playSound("click")
    addXP(5, "por iniciar o quiz")
    window.location.href = "quiz.html"
}

function acceptChallenge() {
    playSound("click")
    showNotification("Desafio aceito! Boa sorte!", "success")
    addXP(25, "por aceitar o desafio diário")
}

function goBack() {
    playSound("click")
    window.history.back()
}

// Utility Functions
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + "k"
    }
    return num.toString()
}

function saveProgress() {
    localStorage.setItem("uspGameProgress", JSON.stringify(userProgress))
}

function loadProgress() {
    const saved = localStorage.getItem("uspGameProgress")
    if (saved) {
        userProgress = { ...userProgress, ...JSON.parse(saved) }
    }
}

// Load progress on page load
loadProgress()

// Save progress periodically
setInterval(saveProgress, 30000) // Save every 30 seconds

// Save progress before page unload
window.addEventListener("beforeunload", saveProgress)
