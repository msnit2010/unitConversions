// Create a centralized error handler
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Ensure we don't send headers if they're already sent
    if (res.headersSent) {
        return next(err);
    }

    // Set proper content type
    res.setHeader('Content-Type', 'application/json');

    const response = {
        success: false,
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    };

    if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack;
    }

    // Handle different types of errors
    if (err.type === 'ValidationError') {
        response.details = process.env.NODE_ENV === 'development' ? err.message : undefined;
        return res.status(400).json(response);
    }

    res.status(err.status || 500).json(response);
};

module.exports = errorHandler; 