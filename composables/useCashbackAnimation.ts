export interface CashbackItem {
  type: 'bill' | 'coin'
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  life: number
  maxLife: number
  opacity: number
  scale: number
  bounce: number
  spinSpeed: number
}

export class CashbackCanvas {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private badge: HTMLElement
  private bills: CashbackItem[] = []
  private isHovering = false
  private burstInterval: NodeJS.Timeout | null = null
  private animationId: number | null = null
  private lastTime = 0
  
  // Mobile-specific properties
  private isMobile = false
  private sectionEnterTime = 0
  private lastScrollTime = 0
  private scrollEmissionTime = 0
  private timeEmissionTime = 0

  constructor(canvas: HTMLCanvasElement, badge: HTMLElement) {
    this.canvas = canvas
    this.badge = badge
    
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error('Could not get canvas context')
    }
    this.ctx = ctx
    
    // Detect mobile device
    this.isMobile = window.matchMedia('(max-width: 768px)').matches || 
                   'ontouchstart' in window ||
                   navigator.maxTouchPoints > 0
    
    this.setupCanvas()
    this.setupEventListeners()
    this.animate()
  }

  private setupCanvas() {
    const updateSize = () => {
      if (this.canvas) {
        const heroSection = this.canvas.closest('.challenge-hero') as HTMLElement
        if (heroSection) {
          const rect = heroSection.getBoundingClientRect()
          this.canvas.width = rect.width
          this.canvas.height = rect.height
        }
      }
    }
    
    updateSize()
    window.addEventListener('resize', updateSize)
  }

  private setupEventListeners() {
    const hero = this.canvas.closest('.challenge-hero') as HTMLElement
    if (!hero) return
    
    this.badge.addEventListener('mouseenter', () => {
      this.isHovering = true
      this.startContinuousBursts()
    })
    
    this.badge.addEventListener('mouseleave', () => {
      this.isHovering = false
      this.stopContinuousBursts()
    })
    
    this.badge.addEventListener('click', (e) => {
      e.preventDefault()
      this.emitBills(8)
    })
    
    if (this.isMobile) {
      this.setupMobileEventListeners(hero)
    } else {
      this.setupDesktopEventListeners(hero)
    }
  }

  private setupDesktopEventListeners(hero: HTMLElement) {
    let lastEmissionTime = 0
    // Listen to the entire hero section for mouse movement
    hero.addEventListener('mousemove', (e) => {
      if (this.isHovering) return
      
      const now = performance.now()
      const badgePos = this.getBadgePosition()
      if (!badgePos) return
      
      const heroRect = hero.getBoundingClientRect()
      const mouseX = e.clientX - heroRect.left
      const mouseY = e.clientY - heroRect.top
      
      // Badge position is already in hero coordinates
      const distance = Math.sqrt(
        Math.pow(mouseX - badgePos.x, 2) + 
        Math.pow(mouseY - badgePos.y, 2)
      )
      
      // Use full hero dimensions for max distance calculation
      const maxDistance = Math.sqrt(heroRect.width * heroRect.width + heroRect.height * heroRect.height) * 0.8
      const proximityRatio = Math.max(0, 1 - (distance / maxDistance))
      
      // More aggressive scaling: closer = much faster, farther = much slower
      const baseInterval = 2000  // Very slow when far away
      const minInterval = 50     // Very fast when close
      const currentInterval = baseInterval - (Math.pow(proximityRatio, 2) * (baseInterval - minInterval))
      
      // Determine number of bills based on proximity
      let billCount = 1
      if (proximityRatio > 0.7) billCount = 3      // Very close: 3 bills
      else if (proximityRatio > 0.4) billCount = 2  // Medium close: 2 bills
      else if (proximityRatio < 0.1) return         // Too far: no animation
      
      if (now - lastEmissionTime > currentInterval) {
        this.emitBills(billCount)
        lastEmissionTime = now
      }
    })
    
    // Stop animation when mouse leaves the hero area
    hero.addEventListener('mouseleave', () => {
      if (!this.isHovering) {
        // Clear any remaining animation
        this.bills = []
      }
    })
  }

  private setupMobileEventListeners(hero: HTMLElement) {
    // Set up intersection observer to track when section is visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.sectionEnterTime = performance.now()
          this.startMobileTimeBasedEmission()
        } else {
          this.stopMobileTimeBasedEmission()
        }
      })
    }, {
      threshold: 0.3, // Section needs to be 30% visible
      rootMargin: '0px'
    })
    
    observer.observe(hero)
    
    // Set up scroll listener for scroll-based emissions
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleMobileScroll(hero)
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Touch interaction for immediate burst
    hero.addEventListener('touchstart', (e) => {
      this.emitBills(4)
    }, { passive: true })
  }

  private startMobileTimeBasedEmission() {
    if (this.burstInterval) return
    
    // Start with initial burst
    this.emitBills(2)
    this.timeEmissionTime = performance.now()
    
    // Time-based emissions - more money the longer you stay
    this.burstInterval = setInterval(() => {
      const timeSpent = (performance.now() - this.sectionEnterTime) / 1000 // seconds
      
      // Increase emission rate and count based on time spent
      let billCount = 1
      let interval = 1500
      
      if (timeSpent > 10) {
        billCount = 4
        interval = 300
      } else if (timeSpent > 5) {
        billCount = 3
        interval = 500
      } else if (timeSpent > 2) {
        billCount = 2
        interval = 800
      }
      
      this.emitBills(billCount)
      
      // Adjust interval for next emission
      clearInterval(this.burstInterval!)
      this.burstInterval = setInterval(() => {
        this.startMobileTimeBasedEmission()
      }, interval)
    }, 1500) // Initial interval
  }

  private stopMobileTimeBasedEmission() {
    if (this.burstInterval) {
      clearInterval(this.burstInterval)
      this.burstInterval = null
    }
  }

  private handleMobileScroll(hero: HTMLElement) {
    const now = performance.now()
    if (now - this.scrollEmissionTime < 200) return // Throttle scroll emissions
    
    const heroRect = hero.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    
    // Calculate how much of the section is visible
    const visibleTop = Math.max(0, -heroRect.top)
    const visibleBottom = Math.min(heroRect.height, viewportHeight - heroRect.top)
    const visibleHeight = Math.max(0, visibleBottom - visibleTop)
    const visibilityRatio = visibleHeight / heroRect.height
    
    // Calculate scroll progress through the section
    const scrollProgress = Math.max(0, Math.min(1, -heroRect.top / (heroRect.height - viewportHeight)))
    
    // Only emit if section is significantly visible
    if (visibilityRatio > 0.3) {
      // More bills based on scroll progress and visibility
      let billCount = Math.floor(1 + (scrollProgress * 3) + (visibilityRatio * 2))
      billCount = Math.min(billCount, 5) // Cap at 5 bills
      
      if (billCount > 0) {
        this.emitBills(billCount)
        this.scrollEmissionTime = now
      }
    }
  }

  private startContinuousBursts() {
    if (this.burstInterval) return
    
    this.emitBills(2)
    
    this.burstInterval = setInterval(() => {
      if (this.isHovering) {
        this.emitBills(Math.random() < 0.7 ? 1 : 2)
      }
    }, 180)
  }

  private stopContinuousBursts() {
    if (this.burstInterval) {
      clearInterval(this.burstInterval)
      this.burstInterval = null
    }
  }

  private getBadgePosition() {
    const heroSection = this.canvas.closest('.challenge-hero') as HTMLElement
    if (!heroSection) return { x: 0, y: 0 }
    
    const heroRect = heroSection.getBoundingClientRect()
    const badgeRect = this.badge.getBoundingClientRect()
    
    return {
      x: (badgeRect.left + badgeRect.width / 2) - heroRect.left,
      y: (badgeRect.top + badgeRect.height / 2) - heroRect.top
    }
  }

  private emitBills(count = 1) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }
    
    const origin = this.getBadgePosition()
    if (!origin) return
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 1.4 - Math.PI * 0.7
      const speed = 120 + Math.random() * 150
      const driftY = -60 - Math.random() * 100
      
      const isCoin = Math.random() < 0.35
      
      const item: CashbackItem = {
        type: isCoin ? 'coin' : 'bill',
        x: origin.x,
        y: origin.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + driftY,
        rotation: Math.random() * 30 - 15,
        rotationSpeed: (Math.random() - 0.5) * (isCoin ? 12 : 6),
        life: 0,
        maxLife: 1000 + Math.random() * 800,
        opacity: 0,
        scale: isCoin ? 0.7 + Math.random() * 0.2 : 0.8 + Math.random() * 0.3,
        bounce: isCoin ? 0.5 + Math.random() * 0.2 : 0,
        spinSpeed: isCoin ? 6 + Math.random() * 6 : 0
      }
      
      this.bills.push(item)
    }
  }

  private updateBills(deltaTime: number) {
    for (let i = this.bills.length - 1; i >= 0; i--) {
      const item = this.bills[i]
      
      item.life += deltaTime
      item.x += item.vx * deltaTime / 1000
      item.y += item.vy * deltaTime / 1000
      item.rotation += item.rotationSpeed * deltaTime / 100
      
      item.vy += 40 * deltaTime / 1000
      item.vx *= 0.998
      
      if (item.type === 'coin' && item.vy > 0 && item.y > this.canvas.height * 0.8 && item.bounce > 0) {
        item.vy *= -item.bounce
        item.bounce *= 0.6
        item.rotationSpeed *= 1.3
      }
      
      const fadeInTime = item.maxLife * 0.1
      if (item.life < fadeInTime) {
        item.opacity = item.life / fadeInTime
      } else {
        item.opacity = Math.max(0, 1 - (item.life - fadeInTime) / (item.maxLife - fadeInTime))
      }
      
      if (item.life >= item.maxLife || item.opacity <= 0) {
        this.bills.splice(i, 1)
      }
    }
  }

  private drawBill(item: CashbackItem) {
    this.ctx.save()
    
    this.ctx.translate(item.x, item.y)
    this.ctx.rotate(item.rotation * Math.PI / 180)
    this.ctx.scale(item.scale, item.scale)
    this.ctx.globalAlpha = item.opacity
    
    // Set z-index through canvas layering order
    if (item.type === 'coin') {
      this.ctx.globalCompositeOperation = 'source-over'
      this.drawCoin()
    } else {
      this.ctx.globalCompositeOperation = 'source-over' 
      this.drawBanknote()
    }
    
    this.ctx.restore()
  }

  private drawBanknote() {
    const width = 70
    const height = 36
    const x = -width / 2
    const y = -height / 2
    const cornerRadius = 4
    
    // Shadow
    this.ctx.save()
    this.ctx.translate(2, 2)
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
    this.roundRect(x, y, width, height, cornerRadius)
    this.ctx.fill()
    this.ctx.restore()
    
    // Main background
    const gradient = this.ctx.createLinearGradient(x, y, x + width, y + height)
    gradient.addColorStop(0, '#2ecc71')
    gradient.addColorStop(0.3, '#27ae60')
    gradient.addColorStop(0.7, '#229954')
    gradient.addColorStop(1, '#1e8449')
    
    this.ctx.fillStyle = gradient
    this.roundRect(x, y, width, height, cornerRadius)
    this.ctx.fill()
    
    // Border
    this.ctx.strokeStyle = '#1a5c3a'
    this.ctx.lineWidth = 1
    this.ctx.stroke()
    
    // Euro symbol
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
    this.ctx.font = 'bold 24px serif'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText('€', 0, 0)
  }

  private drawCoin() {
    const radius = 18
    
    // Shadow
    this.ctx.beginPath()
    this.ctx.arc(2, 2, radius, 0, 2 * Math.PI)
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
    this.ctx.fill()
    
    // Main coin
    const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, radius)
    gradient.addColorStop(0, '#ffd700')
    gradient.addColorStop(0.4, '#ffed4e')
    gradient.addColorStop(0.8, '#d4af37')
    gradient.addColorStop(1, '#b8860b')
    
    this.ctx.beginPath()
    this.ctx.arc(0, 0, radius, 0, 2 * Math.PI)
    this.ctx.fillStyle = gradient
    this.ctx.fill()
    
    // Border
    this.ctx.strokeStyle = '#b8860b'
    this.ctx.lineWidth = 2
    this.ctx.stroke()
    
    // Euro symbol
    this.ctx.fillStyle = '#8b4513'
    this.ctx.font = 'bold 14px Arial'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText('€', 0, 0)
  }

  private roundRect(x: number, y: number, width: number, height: number, radius: number) {
    this.ctx.beginPath()
    this.ctx.moveTo(x + radius, y)
    this.ctx.lineTo(x + width - radius, y)
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
    this.ctx.lineTo(x + width, y + height - radius)
    this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    this.ctx.lineTo(x + radius, y + height)
    this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
    this.ctx.lineTo(x, y + radius)
    this.ctx.quadraticCurveTo(x, y, x + radius, y)
    this.ctx.closePath()
  }

  private animate() {
    const now = performance.now()
    const deltaTime = now - (this.lastTime || now)
    this.lastTime = now
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    
    this.updateBills(deltaTime)
    
    // Sort bills by type to ensure proper layering: coins first (z-index 998), then bills (z-index 999)
    const sortedBills = [...this.bills].sort((a, b) => {
      if (a.type === 'coin' && b.type === 'bill') return -1
      if (a.type === 'bill' && b.type === 'coin') return 1
      return 0
    })
    
    sortedBills.forEach(item => this.drawBill(item))
    
    this.animationId = requestAnimationFrame(() => this.animate())
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
    if (this.burstInterval) {
      clearInterval(this.burstInterval)
    }
  }
}

export const useCashbackAnimation = () => {
  const initAnimation = (canvas: HTMLCanvasElement, badge: HTMLElement) => {
    try {
      return new CashbackCanvas(canvas, badge)
    } catch (error) {
      console.error('Error initializing cashback animation:', error)
      return null
    }
  }

  return {
    initAnimation
  }
}