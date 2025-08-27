export const conditions = {
  job: [
    {
      id: 'job_salary_check',
      name: 'Check Job Salary',
      inputs: [
        {
          name: 'operator',
          type: 'dropdown',
          options: ['>', '<', '==', '!=', '>=', '<='],
        },
        { name: 'value', type: 'number', label: 'Salary' },
      ],
      groovy_script: 'job.salary {operator} {value}',
    },
    {
      id: 'job_skills_check',
      name: 'Check Job Skills',
      inputs: [
        { name: 'skill', type: 'text', label: 'Skill' },
      ],
      groovy_script: 'job.skills.contains("{skill}")',
    },
    {
      id: 'job_team_check',
      name: 'Check Job Team',
      inputs: [],
      groovy_script: 'job.team != null',
    },
    {
      id: 'is_urgent_job',
      name: 'Is Urgent Job',
      inputs: [
        { name: 'urgent', type: 'flag', label: 'Urgent' },
      ],
      groovy_script: 'job.isUrgent() == {urgent}',
    },
  ],
  candidate: [],
  submission: [],
  mapping: [],
  application: [],
  // ... other entities
};
