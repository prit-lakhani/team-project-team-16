class PlaneQueue {
  constructor() {
    this.dequeueChain = Promise.resolve()
    this.carousel = []
  }


  enqueue(plane) {
    this.carousel.push(plane)
  }

  dequeue() {
    // this is returned to the caller so it gets the next plane
    const intermediateChain = this.dequeueChain.then(() => {
      return this.carousel.shift()
    })
    // update the internal promise to resolve again only after 20 minutes
    // this will cause the next dequeue call to wait for 20 minutes
    this.dequeueChain = intermediateChain.then(() => {
      return new Promise((resolve) => setTimeout(resolve, 1200000))
    })
    return intermediateChain
  }
}