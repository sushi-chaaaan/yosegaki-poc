class SessionNotFoundError extends Error {
  static {
    this.prototype.name = "SessionNotFoundError"
  }
  constructor() {
    super("No session found")
  }
}

export { SessionNotFoundError }
