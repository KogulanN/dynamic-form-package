//@ts-nocheck

import React, { useState } from 'react';
import { validateForm } from '../utils/formUtils';

interface Question {
  question_id: string;
  type: string;
  label: string;
  mandatory?: boolean;
  placeholder?: string;
  options?: string[];
}

interface BusinessRule {
  rule_id: string;
  type: string;
  question_id: string;
  pattern?: string;
  error_message: string;
}

interface Row {
  row_id: string;
  questions: string[];
}

interface Section {
  section_id: string;
  section_title: string;
  rows: Row[];
}

interface Layout {
  layout: Section[];
}

interface DynamicFormProps {
  questions: Question[];
  businessRules: BusinessRule[];
  layout: Layout;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ questions, businessRules, layout }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData, businessRules);
    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, submit the data
      console.log('Form data:', formData);
    } else {
      // Form has errors, update the errors state
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {layout.layout.map(section => (
        <div key={section.section_id}>
          <h2>{section.section_title}</h2>
          {section.rows.map(row => (
            <div key={row.row_id} className="form-row">
              {row.questions.map(questionId => {
                const question = questions.find(q => q.question_id === questionId);
                
                if (!question) {
                  return null; // If question is not found, return null to avoid rendering
                }

                return (
                  <div key={question.question_id} className="form-group">
                    <label htmlFor={question.question_id}>{question.label}</label>
                    {question.type === 'text' && (
                      <input
                        type="text"
                        id={question.question_id}
                        name={question.question_id}
                        onChange={handleChange}
                        placeholder={question.placeholder}
                      />
                    )}
                    {question.type === 'select' && (
                      <select id={question.question_id} name={question.question_id} onChange={handleChange}>
                        {question.options?.map(option => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                    {/* Add other input types as needed */}
                    {errors[question.question_id] && <p className="error">{errors[question.question_id]}</p>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
