interface BusinessRule {
    rule_id: string;
    type: string;
    question_id: string;
    pattern?: string;
    error_message: string;
}
export declare const validateForm: (formData: any, businessRules: BusinessRule[]) => any;
export declare const applyBusinessRules: (formData: any, businessRules: any) => void;
export {};
