const { body, validationResult } = require("express-validator");

// Validate middleware function before processing the signup function for creating a new user 
exports.validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req); // Run function returns a promise containing errors, which is stored in the result variable
            if (!result.isEmpty()) break; // Means there are errors encountered in the validation check 
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) return next();

        // 422 -> Unprocessable Entity 
        return res.status(422).json({ errors: errors.array() });
    };
};

// Express-validator module is used to validate all the params of the request

// Validator array for login and signup for validation chain
exports.loginValidator = [
    body("email").trim().isEmail().withMessage("Email is Required"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password should contain at least 6 characters")
];

exports.signupValidator = [
    body("name").trim().notEmpty().withMessage("Name is Required"),
    ...exports.loginValidator,
];

exports.chatCompletionValidator = [
    body("message").trim().notEmpty().withMessage("Message is Required")
];
