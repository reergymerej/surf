(() => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const FRAMES_PER_SECOND = 30

  function ProgressBar ({
    borderStyle = 'black',
    borderWidth = 1,
    fillDirection = ProgressBar.FILL_DIRECTION.RIGHT,
    fillStyle = 'chartreuse',
    height = 0,
    width = 0,
    x = 0,
    y = 0,
    ctx,
  }) {
    this.width = width
    this.height = height
    this.fillDirection = fillDirection
    this.borderWidth = borderWidth
    this.borderStyle = borderStyle
    this.fillStyle = fillStyle
    this.x = x
    this.y = y
    this.ctx = ctx
  }

  ProgressBar.FILL_DIRECTION = {
    LEFT: 'left',
    RIGHT: 'right',
    UP: 'up',
    DOWN: 'down',
  }

  ProgressBar.prototype.setContext = function (ctx) {
    this.ctx = ctx
  }

  ProgressBar.prototype.clear = function () {
    const x = this.x - this.borderWidth
    const y = this.y - this.borderWidth
    const width = this.width + this.borderWidth * 2
    const height = this.height + this.borderWidth * 2
    this.ctx.clearRect(x, y, width, height)
  }

  ProgressBar.prototype.position = function (x, y) {
    this.x = x
    this.y = y
  }

  ProgressBar.prototype.move = function (x, y) {
    this.clear()
    this.x += x
    this.y += y
  }

  ProgressBar.prototype.drawBorder = function () {
    this.ctx.lineWidth = this.borderWidth
    this.ctx.strokeStyle = this.borderStyle
    this.ctx.strokeRect(this.x, this.y, this.width, this.height)
  }

  ProgressBar.prototype.drawFill = function () {
    this.ctx.fillStyle = this.fillStyle
    const percentModifier = this.percentage / 100
    switch (this.fillDirection) {
      case ProgressBar.FILL_DIRECTION.RIGHT: {
        const width = this.width * percentModifier
        this.ctx.fillRect(
          this.x,
          this.y,
          width,
          this.height
        )
        break
      }

      case ProgressBar.FILL_DIRECTION.LEFT: {
        const width = this.width * percentModifier
        this.ctx.fillRect(
          this.x + this.width - width,
          this.y,
          width,
          this.height
        )
        break
      }

      case ProgressBar.FILL_DIRECTION.UP: {
        const height = this.height * percentModifier
        this.ctx.fillRect(
          this.x,
          this.y + this.height - height,
          this.width,
          height
        )
        break
      }

      case ProgressBar.FILL_DIRECTION.DOWN: {
        const height = this.height * percentModifier
        this.ctx.fillRect(
          this.x,
          this.y,
          this.width,
          height
        )
        break
      }

      default:
        throw new Error(`unknown fillDirection "${this.fillDirection}"`)
    }
  }

  ProgressBar.prototype.draw = function (x, y) {
    this.clear()
    if (x !== undefined && y !== undefined) {
      this.position(x, y)
    }

    this.drawFill()
    this.drawBorder()
  }

  ProgressBar.prototype.setPercentage = function (percentage) {
    if (percentage > 100 || percentage < 0) {
      throw new Error(`percentage out of range ${percentage}`)
    }
    this.percentage = percentage
  }

  const pb = new ProgressBar({
    width: 100,
    height: 20,
    x: 20,
    y: 30,
    ctx: ctx,
  })

  const pb2 = new ProgressBar({
    width: 66,
    height: 66,
    x: 20,
    y: 66,
    ctx: ctx,
    fillStyle: 'red',
    fillDirection: ProgressBar.FILL_DIRECTION.LEFT,
  })

  const pb3 = new ProgressBar({
    width: 23,
    height: 99,
    x: 100,
    y: 90,
    ctx: ctx,
    fillStyle: 'rebeccapurple',
    fillDirection: ProgressBar.FILL_DIRECTION.UP,
    borderStyle: 'blue',
  })

  const pb4 = new ProgressBar({
    width: 23,
    height: 99,
    x: 150,
    y: 90,
    ctx: ctx,
    fillStyle: 'blue',
    fillDirection: ProgressBar.FILL_DIRECTION.DOWN,
    borderStyle: 'rebeccapurple',
  })

  let frame = 0
  const animate = (time) => {
    frame++
    console.log(`frame: ${frame} - ${time}`)

    const percentage = frame * 1
    if (percentage < 100) {
      pb.setPercentage(percentage)
      pb2.setPercentage(percentage)
      pb3.setPercentage(percentage)
      pb4.setPercentage(percentage)

      pb.move(1, 1)
      pb2.move(0, 1.3)
      pb3.move(-1, 3)
      ;[pb, pb2, pb3, pb4].forEach(x => x.draw())
      setTimeout(() => requestAnimationFrame(animate), 1000 / FRAMES_PER_SECOND)
    }
  }
  requestAnimationFrame(animate)
})()
