interface BusinessRule {
    rule_id: string;
    type: string;
    question_id: string;
    pattern?: string;
    error_message: string;
  }
  
  export const validateForm = (formData: any, businessRules: BusinessRule[]) => {
    const errors: any = {};
  
    businessRules.forEach(rule => {
      const value = formData[rule.question_id];
      if (rule.type === 'mandatory' && !value) {
        errors[rule.question_id] = rule.error_message;
      } else if (rule.type === 'regex' && rule.pattern && !new RegExp(rule.pattern as string).test(value)) {
        errors[rule.question_id] = rule.error_message;
      }
    });
  
    return errors;
  };
  
  export const applyBusinessRules = (formData: any, businessRules: any) => {
    // Apply business rules as needed
  };
  