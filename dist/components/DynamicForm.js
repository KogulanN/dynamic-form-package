"use strict";
//@ts-nocheck
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var formUtils_1 = require("../utils/formUtils");
var DynamicForm = function (_a) {
    var questions = _a.questions, businessRules = _a.businessRules, layout = _a.layout;
    var _b = (0, react_1.useState)({}), formData = _b[0], setFormData = _b[1];
    var _c = (0, react_1.useState)({}), errors = _c[0], setErrors = _c[1];
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setFormData(function (prevState) {
            var _a;
            return (__assign(__assign({}, prevState), (_a = {}, _a[name] = value, _a)));
        });
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        var validationErrors = (0, formUtils_1.validateForm)(formData, businessRules);
        if (Object.keys(validationErrors).length === 0) {
            // Form is valid, submit the data
            console.log('Form data:', formData);
        }
        else {
            // Form has errors, update the errors state
            setErrors(validationErrors);
        }
    };
    return (react_1.default.createElement("form", { onSubmit: handleSubmit },
        layout.layout.map(function (section) { return (react_1.default.createElement("div", { key: section.section_id },
            react_1.default.createElement("h2", null, section.section_title),
            section.rows.map(function (row) { return (react_1.default.createElement("div", { key: row.row_id, className: "form-row" }, row.questions.map(function (questionId) {
                var _a;
                var question = questions.find(function (q) { return q.question_id === questionId; });
                if (!question) {
                    return null; // If question is not found, return null to avoid rendering
                }
                return (react_1.default.createElement("div", { key: question.question_id, className: "form-group" },
                    react_1.default.createElement("label", { htmlFor: question.question_id }, question.label),
                    question.type === 'text' && (react_1.default.createElement("input", { type: "text", id: question.question_id, name: question.question_id, onChange: handleChange, placeholder: question.placeholder })),
                    question.type === 'select' && (react_1.default.createElement("select", { id: question.question_id, name: question.question_id, onChange: handleChange }, (_a = question.options) === null || _a === void 0 ? void 0 : _a.map(function (option) { return (react_1.default.createElement("option", { key: option, value: option }, option)); }))),
                    errors[question.question_id] && react_1.default.createElement("p", { className: "error" }, errors[question.question_id])));
            }))); }))); }),
        react_1.default.createElement("button", { type: "submit" }, "Submit")));
};
exports.default = DynamicForm;
