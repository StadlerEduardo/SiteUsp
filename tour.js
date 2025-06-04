// Tour Data
const tourPoints = [
    {
        id: "reitoria",
        name: "Reitoria",
        description: "Centro administrativo da USP, onde ficam os principais órgãos de gestão da universidade.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FtUsp.jpg-XW2zk9vNv9FwPurRW9NFExZSlF8uxx.jpeg",
        coordinates: { x: 30, y: 40 },
        facts: ["A Reitoria foi estabelecida em 1934", "Coordena todas as unidades da USP", "Abriga o gabinete do Reitor"],
        xp: 50,
        visited: false,
    },
    {
        id: "biblioteca",
        name: "Biblioteca Central",
        description: "Uma das maiores bibliotecas universitárias da América Latina.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ftUSp02.jpg-DJdBod4eRv5WZiDujEZLmO8hi4ijTy.jpeg",
        coordinates: { x: 60, y: 30 },
        facts: ["Mais de 6 milhões de volumes", "Acesso 24 horas para estudantes", "Sistema digital integrado"],
        xp: 40,
        visited: false,
    },
    {
        id: "museu",
        name: "Museu de Arte",
        description: "Espaço cultural que abriga importantes coleções artísticas.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dsc_3229.jpg-rUgwK1CZODVLYDGTZGF71uo0IiOb8D.jpeg",
        coordinates: { x: 20, y: 70 },
        facts: ["Fundado em 1963", "Mais de 10.000 obras", "Exposições temporárias mensais"],
        xp: 60,
        visited: false,
    },
    {
        id: "laboratorio",
        name: "Complexo de Laboratórios",
        description: "Laboratórios de pesquisa de ponta em diversas áreas do conhecimento.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ftUSp02.jpg-DJdBod4eRv5WZiDujEZLmO8hi4ijTy.jpeg",
        coordinates: { x: 80, y: 60 },
        facts: ["Equipamentos de última geração", "Pesquisas internacionais", "Parcerias com empresas"],
        xp: 70,
        visited: false,
    },
    {
        id: "praca",
        name: "Praça do Relógio",
        description: "Marco histórico e ponto de encontro tradicional dos estudantes.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FtUsp.jpg-XW2zk9vNv9FwPurRW9NFExZSlF8uxx.jpeg",
        coordinates: { x: 50, y: 50 },
        facts: ["Símbolo da USP", "Ponto de encontro histórico", "Eventos estudantis"],
        xp: 30,
        visited: false,
    },
]

// Tour State
const visitedPoints = new Set()
let currentPoint = null
const isAutoTour = false
const autoTourInterval = null
const totalXP = 0
let soundEnabled = true

// Initialize Tour
document.addEventListener("DOMContentLoaded", () => {
    initializeTour()
    updateSoundIcon()
    loadProgress()
})

function initializeTour() {
    renderTourPoints()
    renderPointsList()
    updateProgress()

    // Add click handlers to tour points
    document.querySelectorAll(".tour-point").forEach((point) => {
        point.addEventListener("click", function () {
            const pointId = this.getAttribute("data-point")
            visitPoint(pointId)
        })
    })

    // Load sound preference
    const savedSound = localStorage.getItem("soundEnabled")
    if (savedSound !== null) {
        soundEnabled = JSON.parse(savedSound)
        updateSoundIcon()
    }
}

function renderTourPoints() {
    tourPoints.forEach((point) => {
        const pointElement = document.querySelector(`[data-point="${point.id}"]`)
        if (pointElement) {
            updatePointAppearance(pointElement, point)
        }
    })
}

function updatePointAppearance(element, point) {
    const marker = element.querySelector(".point-marker")

    if (visitedPoints.has(point.id)) {
        element.classList.add("visited")
        marker.innerHTML = '<i class="fas fa-check"></i>'
    } else if (currentPoint === point.id) {
        element.classList.add("active")
        marker.innerHTML = '<i class="fas fa-map-marker-alt"></i>'
    } else {
        element.classList.remove("visited", "active")
        marker.innerHTML = '<i class="fas fa-map-marker-alt"></i>'
    }
}

function visitPoint(pointId) {
    const point = tourPoints.find((p) => p.id === pointId)
    if (!point) return

    // Mark as visited if not already
    if (!visitedPoints.has(pointId)) {
        visitedPoints.add(pointId)
        addXP(point.xp, `por visitar ${point.name}`)
        playSound("success")

        // Check if tour is complete
        if (visitedPoints.size === tourPoints.length) {
            showCompletionAchievement()
        }
    }

    // Set as current point
    currentPoint = pointId

    // Update UI
    updateProgress()
    showPointDetails(point)
    updateCurrentLocation(point.name)
    renderTourPoints()
    renderPointsList()

    playSound("click")
}

function showPointDetails(point) {
    const detailsCard = document.getElementById("pointDetails")
    const pointImage = document.getElementById("pointImage")
    const pointName = document.getElementById("pointName")
    const pointDescription = document.getElementById("pointDescription")
    const pointFactsList = document.getElementById("pointFactsList")
    const pointXP = document.getElementById("pointXP")
    const visitedBadge = document.getElementById("visitedBadge")

    if (detailsCard) {
        detailsCard.classList.remove("hidden")

        if (pointImage) pointImage.src = point.image
        if (pointName) pointName.textContent = point.name
        if (pointDescription) pointDescription.textContent = point.description
        if (pointXP) pointXP.textContent = `+${point.xp} XP`

        if (pointFactsList) {
            pointFactsList.innerHTML = ""
            point.facts.forEach((fact) => {
                const li = document.createElement("li")
                li.textContent = fact
                pointFactsList.appendChild(li)
            })
        }

        if (visitedBadge) {
            if (visitedPoints.has(point.id)) {
                visitedBadge.classList.remove("hidden")
            } else {
                visitedBadge.classList.add("hidden")
            }
        }
    }
}

function updateCurrentLocation(locationName) {
    const currentLocation = document.getElementById("currentLocation")
    const currentLocationName = document.getElementById("currentLocationName")

    if (currentLocation && currentLocationName) {
        currentLocation.classList.remove("hidden")
        currentLocationName.textContent = locationName
    }
}

function updateProgress() {
    const visitedCount = visitedPoints.size
    const totalPoints = tourPoints.length
    const progressPercent = (visitedCount / totalPoints) * 100

    // Calculate total XP earned
    let earnedXP = 0
    visitedPoints.forEach((pointId) => {
        const point = tourPoints.find((p) => p.id === pointId)
        if (point) earnedXP += point.xp
    })

    // Update header
    const visitedCountEl = document.getElementById("visitedCount")
    const totalPointsEl = document.getElementById("totalPoints")
    const totalXPEl = document.getElementById("totalXP")
    const tourProgressEl = document.getElementById("tourProgress")

    if (visitedCountEl) visitedCountEl.textContent = visitedCount
    if (totalPointsEl) totalPointsEl.textContent = totalPoints
    if (totalXPEl) totalXPEl.textContent = earnedXP
    if (tourProgressEl) tourProgressEl.style.width = `${progressPercent}%`

    // Update sidebar
    const progressBadge = document.getElementById("progressBadge")
    const sidebarProgress = document.getElementById("sidebarProgress")
    const sidebarXP = document.getElementById("sidebarXP")
    const progressPercent2 = document.getElementById("progressPercent")

    if (progressBadge) progressBadge.textContent = `${visitedCount}/${totalPoints}`
    if (sidebarProgress) sidebarProgress.style.width = `${progressPercent}%`
    if (sidebarXP) sidebarXP.textContent = earnedXP
    if (progressPercent2) progressPercent2.textContent = Math.round(progressPercent)
}

function renderPointsList() {
    const container = document.getElementById("pointsList")
    if (!container) return

    container.innerHTML = ""

    tourPoints.forEach((point) => {
        const pointItem = document.createElement("div")
        pointItem.className = `point-item ${currentPoint === point.id ? "active" : ""}`
        pointItem.onclick = () => visitPoint(point.id)

        pointItem.innerHTML = `
            <div class="point-item-info">
                <div class="point-status ${visitedPoints.has(point.id) ? "visited" : ""}"></div>
                <div class="point-name">${point.name}</div>
            </div>
            <div class="xp-badge">+${point.xp} XP</div>
        `

        container.appendChild(pointItem)
    })
}

function showCompletionAchievement() {
    const achievementCard = document.getElementById("completionAchievement")
    if (achievementCard) {
        achievementCard.classList.remove("hidden")
        playSound("success")
        showNotification("Parabéns! Você completou o tour virtual!", "success")
    }
}

function toggleAutoTour() {
    // Auto tour functionality would be implemented here
    playSound("click")
    showNotification("Funcionalidade em desenvolvimento", "warning")
}

function resetTour() {
    visitedPoints.clear()
    currentPoint = null

    updateProgress()
    renderTourPoints()
    renderPointsList()

    const detailsCard = document.getElementById("pointDetails")
    const currentLocation = document.getElementById("currentLocation")
    const achievementCard = document.getElementById("completionAchievement")

    if (detailsCard) detailsCard.classList.add("hidden")
    if (currentLocation) currentLocation.classList.add("hidden")
    if (achievementCard) achievementCard.classList.add("hidden")

    playSound("click")
    showNotification("Tour resetado com sucesso!", "success")
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
    playSound("click")
}

function view360() {
    const modal = document.getElementById("viewer360Modal")
    const viewerTitle = document.getElementById("viewerTitle")

    if (modal && currentPoint) {
        const point = tourPoints.find((p) => p.id === currentPoint)
        if (point && viewerTitle) {
            viewerTitle.textContent = `Vista 360° - ${point.name}`
        }
        modal.classList.add("active")
        playSound("click")
    }
}

function closeViewer360() {
    const modal = document.getElementById("viewer360Modal")
    if (modal) {
        modal.classList.remove("active")
        playSound("click")
    }
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

function addXP(amount, reason = "") {
    // This would integrate with the main game system
    showNotification(`+${amount} XP ${reason}`, "success")
}

function showNotification(message, type = "success") {
    // Create notification element
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "times-circle" : "exclamation-triangle"}"></i>
            <span>${message}</span>
        </div>
    `

    // Add to page
    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
        notification.classList.add("show")
    }, 100)

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove("show")
        setTimeout(() => {
            document.body.removeChild(notification)
        }, 300)
    }, 3000)
}

function saveProgress() {
    const progress = {
        visitedPoints: Array.from(visitedPoints),
        currentPoint: currentPoint,
    }
    localStorage.setItem("tourProgress", JSON.stringify(progress))
}

function loadProgress() {
    const saved = localStorage.getItem("tourProgress")
    if (saved) {
        const progress = JSON.parse(saved)
        progress.visitedPoints.forEach((pointId) => visitedPoints.add(pointId))
        currentPoint = progress.currentPoint
        updateProgress()
        renderTourPoints()
        renderPointsList()
    }
}

function goBack() {
    saveProgress()
    playSound("click")
    window.location.href = "index.html"
}

// Save progress periodically
setInterval(saveProgress, 30000)

// Save progress before page unload
window.addEventListener("beforeunload", saveProgress)
