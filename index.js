(() => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  const FRAMES_PER_SECOND = 30
  let count = 0
  const animate = (time) => {
    // console.log(`frame: ${count} - ${time}`)
    ctx.strokeStyle = count % 2 ? 'green' : 'blue'
    ctx.clearRect(10, 10, 25, 100)
    ctx.strokeRect(10, 10, 25, 100)
    count++
    setTimeout(() => requestAnimationFrame(animate), 1000 / FRAMES_PER_SECOND)
  }

  requestAnimationFrame(animate)
})()
