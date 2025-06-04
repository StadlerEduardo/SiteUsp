// Quiz Data
const quizData = [
    {
        id: 1,
        question: "Em que ano a USP foi oficialmente fundada?",
        options: ["1901", "1934", "1950", "1964"],
        correct: 1,
        explanation: "A USP foi fundada em 25 de janeiro de 1934, unindo várias escolas tradicionais de São Paulo.",
        difficulty: "easy",
        category: "História",
        points: 100,
    },
    {
        id: 2,
        question: "Qual é o lema da Universidade de São Paulo?",
        options: ["Scientia Vinces", "Veritas et Scientia", "Per Aspera Ad Astra", "Sapientia et Virtus"],
        correct: 0,
        explanation:
            "O lema 'Scientia Vinces' significa 'Vencerás pela Ciência', refletindo o compromisso da USP com o conhecimento.",
        difficulty: "medium",
        category: "Institucional",
        points: 150,
    },
    {
        id: 3,
        question: "Quantos campi a USP possui atualmente?",
        options: ["5", "7", "9", "11"],
        correct: 1,
        explanation:
            "A USP possui 7 campi distribuídos pelo estado de São Paulo: São Paulo (Cidade Universitária), São Paulo (outros), Santos, São Carlos, Ribeirão Preto, Bauru e Pirassununga.",
        difficulty: "medium",
        category: "Estrutura",
        points: 150,
    },
    {
        id: 4,
        question: "Qual foi a primeira escola a integrar a USP?",
        options: ["Escola Politécnica", "Faculdade de Medicina", "Faculdade de Direito", "Faculdade de Filosofia"],
        correct: 2,
        explanation:
            "A Faculdade de Direito do Largo São Francisco, fundada em 1827, foi uma das escolas pioneiras que formaram a USP.",
        difficulty: "hard",
        category: "História",
        points: 200,
    },
    {
        id: 5,
        question: "Aproximadamente quantos alunos estudam na USP?",
        options: ["50.000", "70.000", "90.000", "110.000"],
        correct: 2,
        explanation:
            "A USP possui aproximadamente 90.000 alunos entre graduação e pós-graduação, sendo uma das maiores universidades do Brasil.",
        difficulty: "easy",
        category: "Números",
        points: 100,
    },
]

// Quiz State
let currentQuestion = 0
let selectedAnswer = null
let showResult = false
let quizComplete = false
let stats = {
    totalQuestions: 0,
    correctAnswers: 0,
    streak: 0,
    maxStreak: 0,
    timeSpent: 0,
    score: 0,
}
let timeLeft = 30
let isTimerActive = false
let soundEnabled = true

// Initialize Quiz
document.addEventListener("DOMContentLoaded", () => {
    initializeQuiz()
    updateSoundIcon()
})

function initializeQuiz() {
    loadQuestion()
    updateQuestionIndicators()
    updateStats()

    // Load sound preference
    const savedSound = localStorage.getItem("soundEnabled")
    if (savedSound !== null) {
        soundEnabled = JSON.parse(savedSound)
        updateSoundIcon()
    }
}

function loadQuestion() {
    const questionData = quizData[currentQuestion]

    // Update question text
    document.getElementById("questionText").textContent = questionData.question

    // Update progress
    document.getElementById("currentQuestion").textContent = currentQuestion + 1
    document.getElementById("totalQuestions").textContent = quizData.length

    const progressPercent = ((currentQuestion + 1) / quizData.length) * 100
    document.getElementById("quizProgress").style.width = `${progressPercent}%`

    // Update difficulty and category
    updateDifficultyBadge(questionData.difficulty)
    updateCategoryBadge(questionData.category)

    // Load options
    loadOptions(questionData.options)

    // Reset state
    selectedAnswer = null
    showResult = false
    timeLeft = 30
    isTimerActive = true

    // Update UI
    updateTimer()
    hideExplanation()
    updateNavigationButtons()
    updateSidebarInfo(questionData)

    // Start timer
    startTimer()
}

function loadOptions(options) {
    const container = document.getElementById("optionsContainer")
    container.innerHTML = ""

    options.forEach((option, index) => {
        const optionElement = document.createElement("div")
        optionElement.className = "option"
        optionElement.onclick = () => selectOption(index)

        optionElement.innerHTML = `
            <div class="option-content">
                <div class="option-letter">${String.fromCharCode(65 + index)}</div>
                <div class="option-text">${option}</div>
            </div>
            <div class="option-result">
                <i class="fas fa-check-circle"></i>
            </div>
        `

        container.appendChild(optionElement)
    })
}

function selectOption(index) {
    if (showResult) return

    // Clear previous selection
    document.querySelectorAll(".option").forEach((opt) => opt.classList.remove("selected"))

    // Select new option
    const options = document.querySelectorAll(".option")
    options[index].classList.add("selected")
    selectedAnswer = index

    // Stop timer and show result
    isTimerActive = false
    showResult = true

    // Process answer
    processAnswer()
}

function processAnswer() {
    const questionData = quizData[currentQuestion]
    const isCorrect = selectedAnswer === questionData.correct

    // Update options appearance
    const options = document.querySelectorAll(".option")
    options.forEach((option, index) => {
        if (index === questionData.correct) {
            option.classList.add("correct")
        } else if (index === selectedAnswer && !isCorrect) {
            option.classList.add("incorrect")
        }
    })

    // Update streak
    if (isCorrect) {
        stats.streak++
        stats.maxStreak = Math.max(stats.maxStreak, stats.streak)
    } else {
        stats.streak = 0
    }

    // Update stats
    stats.totalQuestions++
    if (isCorrect) stats.correctAnswers++

    // Calculate points with streak multiplier
    const basePoints = questionData.points
    const multiplier = 1 + (stats.streak - 1) * 0.1
    const earnedPoints = isCorrect ? Math.round(basePoints * multiplier) : 0
    stats.score += earnedPoints

    // Update time spent
    stats.timeSpent += 30 - timeLeft

    // Show explanation
    showExplanation(isCorrect, questionData.explanation, earnedPoints)

    // Update UI
    updateStats()
    updateNavigationButtons()

    // Play sound
    playSound(isCorrect ? "success" : "error")

    // Auto advance after delay
    setTimeout(() => {
        if (currentQuestion < quizData.length - 1) {
            // Enable next button
            document.getElementById("nextBtn").disabled = false
        } else {
            // Show finish button
            document.getElementById("nextBtnText").textContent = "Finalizar"
            document.getElementById("nextBtn").disabled = false
        }
    }, 2000)
}

function showExplanation(isCorrect, explanation, earnedPoints) {
    const explanationCard = document.getElementById("explanationCard")
    const explanationIcon = document.getElementById("explanationIcon")
    const explanationTitle = document.getElementById("explanationTitle")
    const explanationDescription = document.getElementById("explanationDescription")
    const xpReward = document.getElementById("xpReward")
    const streakBonus = document.getElementById("streakBonus")

    explanationCard.classList.remove("hidden")

    if (isCorrect) {
        explanationCard.classList.remove("incorrect")
        explanationIcon.className = "fas fa-check-circle"
        explanationTitle.textContent = "Correto!"
    } else {
        explanationCard.classList.add("incorrect")
        explanationIcon.className = "fas fa-times-circle"
        explanationTitle.textContent = "Incorreto!"
    }

    explanationDescription.textContent = explanation
    xpReward.textContent = `+${earnedPoints} XP`

    if (stats.streak > 1 && isCorrect) {
        streakBonus.classList.remove("hidden")
        streakBonus.innerHTML = `<i class="fas fa-fire"></i> Sequência x${stats.streak}`
    } else {
        streakBonus.classList.add("hidden")
    }
}

function hideExplanation() {
    document.getElementById("explanationCard").classList.add("hidden")
}

function startTimer() {
    const timerInterval = setInterval(() => {
        if (!isTimerActive) {
            clearInterval(timerInterval)
            return
        }

        timeLeft--
        updateTimer()

        if (timeLeft <= 0) {
            clearInterval(timerInterval)
            handleTimeUp()
        }
    }, 1000)
}

function updateTimer() {
    const timerValue = document.getElementById("timerValue")
    const timerProgress = document.getElementById("timerProgress")
    const timeLeftSpan = document.getElementById("timeLeft")

    if (timerValue) {
        timerValue.textContent = timeLeft
        if (timeLeft <= 10) {
            timerValue.classList.add("warning")
        } else {
            timerValue.classList.remove("warning")
        }
    }

    if (timerProgress) {
        const progressPercent = (timeLeft / 30) * 100
        timerProgress.style.width = `${progressPercent}%`
        if (timeLeft <= 10) {
            timerProgress.classList.add("warning")
        } else {
            timerProgress.classList.remove("warning")
        }
    }

    if (timeLeftSpan) {
        timeLeftSpan.textContent = timeLeft
        const timerDisplay = timeLeftSpan.parentElement
        if (timeLeft <= 10) {
            timerDisplay.classList.add("warning")
        } else {
            timerDisplay.classList.remove("warning")
        }
    }
}

function handleTimeUp() {
    isTimerActive = false
    showResult = true
    stats.streak = 0

    // Show correct answer
    const questionData = quizData[currentQuestion]
    const options = document.querySelectorAll(".option")
    options[questionData.correct].classList.add("correct")

    // Show explanation
    showExplanation(false, questionData.explanation, 0)

    // Update stats
    stats.totalQuestions++
    stats.timeSpent += 30
    updateStats()
    updateNavigationButtons()

    playSound("error")

    // Auto advance
    setTimeout(() => {
        nextQuestion()
    }, 3000)
}

function updateStats() {
    // Update header stats
    document.getElementById("streakCount").textContent = stats.streak
    document.getElementById("currentScore").textContent = Math.round(stats.score)

    // Update sidebar stats
    document.getElementById("sidebarScore").textContent = Math.round(stats.score)
    document.getElementById("correctAnswers").textContent = `${stats.correctAnswers}/${stats.totalQuestions}`
    document.getElementById("sidebarStreak").textContent = stats.streak
    document.getElementById("maxStreak").textContent = stats.maxStreak
}

function updateDifficultyBadge(difficulty) {
    const badges = document.querySelectorAll(".difficulty-badge")
    badges.forEach((badge) => {
        badge.className = `difficulty-badge ${difficulty}`
        badge.textContent = difficulty === "easy" ? "Fácil" : difficulty === "medium" ? "Médio" : "Difícil"
    })
}

function updateCategoryBadge(category) {
    const badges = document.querySelectorAll(".category-badge")
    badges.forEach((badge) => {
        badge.textContent = category
    })
}

function updateSidebarInfo(questionData) {
    document.getElementById("basePoints").textContent = questionData.points

    const multiplierRow = document.getElementById("multiplierRow")
    const multiplierValue = document.getElementById("multiplierValue")

    if (stats.streak > 0) {
        multiplierRow.classList.remove("hidden")
        multiplierValue.textContent = `x${(1 + stats.streak * 0.1).toFixed(1)}`
    } else {
        multiplierRow.classList.add("hidden")
    }
}

function updateQuestionIndicators() {
    const container = document.getElementById("questionIndicators")
    if (!container) return

    container.innerHTML = ""

    for (let i = 0; i < quizData.length; i++) {
        const indicator = document.createElement("div")
        indicator.className = "question-indicator"

        if (i < currentQuestion) {
            indicator.classList.add("completed")
        } else if (i === currentQuestion) {
            indicator.classList.add("current")
        }

        indicator.textContent = i + 1
        container.appendChild(indicator)
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById("prevBtn")
    const nextBtn = document.getElementById("nextBtn")
    const nextBtnText = document.getElementById("nextBtnText")

    // Previous button
    prevBtn.disabled = currentQuestion === 0

    // Next button
    if (showResult) {
        nextBtn.disabled = false
        if (currentQuestion === quizData.length - 1) {
            nextBtnText.textContent = "Ver Resultado"
        } else {
            nextBtnText.textContent = "Próxima"
        }
    } else {
        nextBtn.disabled = true
        nextBtnText.textContent = "Responder"
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--
        loadQuestion()
        updateQuestionIndicators()
        playSound("click")
    }
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++
        loadQuestion()
        updateQuestionIndicators()
        playSound("click")
    } else {
        showResults()
    }
}

function showResults() {
    const accuracy = (stats.correctAnswers / stats.totalQuestions) * 100
    const avgTime = stats.timeSpent / stats.totalQuestions

    // Determine performance level
    let performance = "Iniciante"
    let performanceIcon = "fas fa-star"

    if (accuracy >= 80) {
        performance = "Expert"
        performanceIcon = "fas fa-trophy"
    } else if (accuracy >= 60) {
        performance = "Avançado"
        performanceIcon = "fas fa-medal"
    } else if (accuracy >= 40) {
        performance = "Intermediário"
        performanceIcon = "fas fa-award"
    }

    // Update results modal
    document.getElementById("finalScore").textContent = Math.round(stats.score)
    document.getElementById("performanceIcon").className = performanceIcon
    document.getElementById("performanceLevel").textContent = performance
    document.getElementById("finalCorrect").textContent = `${stats.correctAnswers}/${stats.totalQuestions}`
    document.getElementById("finalAccuracy").textContent = `${Math.round(accuracy)}%`
    document.getElementById("finalMaxStreak").textContent = stats.maxStreak
    document.getElementById("finalAvgTime").textContent = `${Math.round(avgTime)}s`

    // Show achievement badges
    const achievementBadges = document.getElementById("achievementBadges")
    achievementBadges.innerHTML = ""

    const achievements = []
    if (accuracy === 100) achievements.push("🏆 Perfeição")
    if (stats.maxStreak >= 3) achievements.push("🔥 Sequência de Fogo")
    if (avgTime < 15) achievements.push("⚡ Velocidade da Luz")
    if (stats.correctAnswers >= 4) achievements.push("🧠 Mestre do Conhecimento")

    achievements.forEach((achievement) => {
        const badge = document.createElement("div")
        badge.className = "achievement-badge"
        badge.textContent = achievement
        achievementBadges.appendChild(badge)
    })

    if (achievements.length === 0) {
        document.getElementById("achievementsUnlocked").style.display = "none"
    }

    // Show modal
    document.getElementById("resultsModal").classList.add("active")
    playSound("success")
}

function restartQuiz() {
    // Reset state
    currentQuestion = 0
    selectedAnswer = null
    showResult = false
    quizComplete = false
    stats = {
        totalQuestions: 0,
        correctAnswers: 0,
        streak: 0,
        maxStreak: 0,
        timeSpent: 0,
        score: 0,
    }

    // Hide modal
    document.getElementById("resultsModal").classList.remove("active")

    // Reload first question
    loadQuestion()
    updateQuestionIndicators()
    updateStats()

    playSound("click")
}

function goHome() {
    playSound("click")
    window.location.href = "index.html"
}

function toggleSound() {
    soundEnabled = !soundEnabled
    updateSoundIcon()
    localStorage.setItem("soundEnabled", JSON.stringify(soundEnabled))

    if (soundEnabled) {
        playSound("success")
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

    try {
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
    } catch (error) {
        console.log("Audio not supported")
    }
}

function goBack() {
    playSound("click")
    window.location.href = "index.html"
}
