"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyBusinessRules = exports.validateForm = void 0;
var validateForm = function (formData, businessRules) {
    var errors = {};
    businessRules.forEach(function (rule) {
        var value = formData[rule.question_id];
        if (rule.type === 'mandatory' && !value) {
            errors[rule.question_id] = rule.error_message;
        }
        else if (rule.type === 'regex' && rule.pattern && !new RegExp(rule.pattern).test(value)) {
            errors[rule.question_id] = rule.error_message;
        }
    });
    return errors;
};
exports.validateForm = validateForm;
var applyBusinessRules = function (formData, businessRules) {
    // Apply business rules as needed
};
exports.applyBusinessRules = applyBusinessRules;
