export const actions = {
  job: [
    {
      id: 'send_email',
      name: 'Send Email',
      inputs: [
        { name: 'to', type: 'email', label: 'To' },
        { name: 'subject', type: 'text', label: 'Subject' },
        { name: 'body', type: 'textarea', label: 'Body' },
      ],
    },
    {
      id: 'close_job',
      name: 'Close Job',
      inputs: [],
    },
    {
      id: 'update_job_attribute',
      name: 'Update Job Attribute',
      inputs: [
        {
          name: 'attribute',
          type: 'dropdown',
          options: ['name', 'description', 'min_salary', 'max_salary'],
        },
        { name: 'value', type: 'text', label: 'New Value' },
      ],
    },
    {
      id: 'assign_to_team',
      name: 'Assign to Team',
      inputs: [
        { name: 'team', type: 'autocomplete', label: 'Team', autocomplete_type: 'teams' },
      ],
    },
  ],
  candidate: [
    {
      id: 'send_assessment',
      name: 'Send Assessment',
      inputs: [
        { name: 'email', type: 'email', label: 'Candidate Email' },
        { name: 'subject', type: 'text', label: 'Email Subject' },
      ],
    },
  ],
  // ... other entities
};
