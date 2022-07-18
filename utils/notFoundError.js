module.exports = class NotFoundError extends Error {
  constructor(error) {
    super(error.message);

    this.data = { error };
    this.statusCode = 404;
  }
};
