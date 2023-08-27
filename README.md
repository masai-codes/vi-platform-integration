# API's endpoints details

1. create assessments - http://localhost:3030/virtual-interview-template/assessments/create

   - Body

   ```js
       {
       "title": "Test2 ",
       "questions": [
           "64eba3e0b35d051ab7ad358d"
       ],
       "intro_message": "Hi , I am Gautam, working at masai in tech team",
       "interviewer_name": "Gautam",
       "voice_code": "en-US-GuyNeural",
       "redirect_url": "masaischool.com",
       "schedule_start_time": "2023-08-28T01:25",
       "schedule_end_time": "2023-08-28T03:28",
       "max_duration_minutes": "10",
       "lock_assessment_after_end_time": false,
       "model": "gpt-3.5-turbo"
   }
   ```

2. create interview (add user) - http://localhost:3030/vi-assessment/submission/create

   - Body

   ```js
   {
     assessment_id: "64eba424b35d051ab7ad3596";
     code: "123";
     email: "gohilgautam22@gmail.com";
     meta: "{}";
     variables: [];
   }
   ```

3. Start interview => '/virtual-interview-template/assessment-interview/:id/:submission_id'

# API test

1. create API key works fine, change role instaed of roles in jwt details
2. create webhook works fine as well {name,targetUrl}
3. get organisation => /organisations/:id works fine, but I can see any organisations data if I have id of the org
4. Get stats => /organisations/stats works fine
5. Create Assessment => http://localhost:3030/virtual-interview-template/assessments/create => works fine
6. Add user => http://localhost:3030/vi-assessment/submission/create => works fine
