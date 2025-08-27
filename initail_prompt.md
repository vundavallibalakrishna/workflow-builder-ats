 want to build a nice UI where for a demo purpose. So no login/registration for now. There will be no backend all the data should be saved in the front end app only.

Here are the requirements for building an app with reactjs for demo.

I have a applicant tracking system with following entities Job, Candidate, Mapping, Submission.

Each entity has its own set of predefined attribute list

Job -> Name, description, min and max salary, location.country, location.state, location.city Candidate -> name, email, linkedinurl, skills[], resumes[], expereice[], education[] Mapping -> candidate,job Applicaiton -> candidate,job SUbmission-> candidate,job,stage,status,expectedSalary, readyforrelocation EmailResponse-> candidate,Job SMSResponse -> candiadte,job

I have mentioned some sample attributes but the list can be long.

Using react flow i want recruiters to create workflows. A workflow will start with an entity (1)-> event (1)-> conditionblock(0 to n) (optional)(branch) -> action

This is a smaple flow the user will build. User cannot build a flow tih an entity and event. COnditional block is optional and action is also mandatory.

Conditional blocks can be chained and the branch (true/false) can both target an action.

Conditional blocks are a prefined list of grrovy codes that are stored in the system which are specific to an entiy. An example condition blocks

Check attribute of a entity . Below are some examples each being one condition. So I can chain them with true targeting the next condition a. if(job.salary > 10000) b. job.skills contains java
Check if the team is attached to the (job job.team != null)
Conditions are predefined and its a master list. User selects the condition. Each condition will have meta data saying condition name, condition inputs and each condition input will have metadata like weather its number,text,email,predefined list(dropdown), flag (2 values), Autocompletes (type of autocomplete could be team, user, accountmanager etc)

Similary actions are also predefined and stored on the list specific to entity e.g. Send email, Close the job, Update a job attribute.. Just like condition action will also have a predefined inputs and metadata.

User can create a workflow against each entity and event and chain them.

He can add delay nodes in between and it can trigger further conditions/actions. from and entity you can point to event only. From an event you can point to condition/action. From a condition you can point to action. From a action you can point to another condition or action.

You cannot have backlinks here. flow will go in only one direction.

User can create a workflows for write rules and make it so configurable that by using actions and conditions he can monitor the data flow.

I want to build the UI first with mock if it works then i will generate the backend remember to keep this open for future but do not touch this now.

Use reactflow and airflow kind of system to fully automate this engine.
