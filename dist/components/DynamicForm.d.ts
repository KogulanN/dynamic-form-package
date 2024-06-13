import React from 'react';
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
declare const DynamicForm: React.FC<DynamicFormProps>;
export default DynamicForm;
