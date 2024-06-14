import React, { useState } from 'react';
import './DynamicForm.css';

interface Question {
  question_id: string;
  type: string;
  label?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

interface BusinessRule {
  question_id: string;
  required: boolean;
  validation?: {
    type: string;
    minLength?: number;
    maxLength?: number;
  };
}

interface LayoutColumn {
  column_id: string;
  questions: string[];
}

interface LayoutRow {
  row_id: string;
  columns: LayoutColumn[];
}

interface LayoutSection {
  section_title: string;
  rows: LayoutRow[];
}

interface TabLayout {
  tab_title: string;
  sections: LayoutSection[];
}

interface AccordionLayout {
  accordion_title: string;
  sections: LayoutSection[];
}

interface DynamicFormProps {
  questions: Question[];
  businessRules: BusinessRule[];
  layout: (LayoutSection | TabLayout | AccordionLayout)[];
}

const DynamicForm: React.FC<DynamicFormProps> = ({ questions, businessRules, layout }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const renderQuestion = (questionId: string) => {
    const question = questions.find(q => q.question_id === questionId);
    if (!question) return null;

    return (
      <div key={question.question_id} className="question">
        <label htmlFor={question.question_id}>{question.label}</label>
        {question.type === 'text' && (
          <input type="text" id={question.question_id} name={question.question_id} placeholder={question.placeholder} />
        )}
        {question.type === 'select' && (
          <select id={question.question_id} name={question.question_id}>
            {question.options?.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        )}
        {question.type === 'radio' && (
          <div>
            {question.options?.map(option => (
              <label key={option.value}>
                <input type="radio" name={question.question_id} value={option.value} />
                {option.label}
              </label>
            ))}
          </div>
        )}
        {question.type === 'checkbox' && (
          <div>
            {question.options?.map(option => (
              <label key={option.value}>
                <input type="checkbox" name={question.question_id} value={option.value} />
                {option.label}
              </label>
            ))}
          </div>
        )}
        {question.type === 'date' && <input type="date" id={question.question_id} name={question.question_id} />}
        {question.type === 'number' && <input type="number" id={question.question_id} name={question.question_id} placeholder={question.placeholder} />}
        {/* Add other input types here */}
      </div>
    );
  };

  const renderSection = (section: LayoutSection) => (
    <div key={section.section_title} className="section">
      <h2 className="section-title">{section.section_title}</h2>
      {section.rows.map(row => (
        <div key={row.row_id} className="row">
          {row.columns.map(column => (
            <div key={column.column_id} className="column">
              {column.questions.map(questionId => renderQuestion(questionId))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderTabs = () => (
    <div>
      <div className="tabs">
        {layout.map((tab, index) => {
          if ((tab as TabLayout).tab_title) {
            return (
              <div key={(tab as TabLayout).tab_title} className={`tab ${activeTab === index ? 'active' : ''}`} onClick={() => setActiveTab(index)}>
                {(tab as TabLayout).tab_title}
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="tab-content">
        {layout[activeTab] && (layout[activeTab] as TabLayout).sections.map(section => renderSection(section))}
      </div>
    </div>
  );

  const renderAccordion = () => (
    <div>
      {layout.map((accordion, index) => {
        if ((accordion as AccordionLayout).accordion_title) {
          return (
            <div key={(accordion as AccordionLayout).accordion_title} className="accordion">
              <div className="accordion-title" onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}>
                {(accordion as AccordionLayout).accordion_title}
              </div>
              <div className={`accordion-content ${activeAccordion === index ? 'active' : ''}`}>
                {(accordion as AccordionLayout).sections.map(section => renderSection(section))}
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );

  const renderForm = () => {
    if ((layout[0] as TabLayout).tab_title) {
      return renderTabs();
    }
    if ((layout[0] as AccordionLayout).accordion_title) {
      return renderAccordion();
    }
    return layout.map(section => renderSection(section as LayoutSection));
  };

  return (
    <div className="container">
      {renderForm()}
    </div>
  );
};

export default DynamicForm;
