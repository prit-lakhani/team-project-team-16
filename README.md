# Flight Management System by Team - 16

## Team members/Contributors:

- Pravin Ramasamy Balachandran
- Prit Lakhani
- Vishwesh Shah

### Summary of Contributions

- Prit Lakhani

  - Designed the backend APIs for adding, deleting and updating flights.
  - Implemented the frontned functionality to display for the flights at the customer end.
  - Implemented the backend functionality for adding, deleting and updating flights at the customer end.
  - Designed the backend APIs for assign a random gate at the customer end.
  - Integrated frontend pages and tested API calls.
  - Analyzed the primary goals to be met at every stage of our project in order to keep focused on what was necessary.

- Vishwesh Shah

  - Designed frontend functionality for Airport employee.
  - Created separate NavBar component to be used in all pages.
  - Implemented the frontend functionality for viewing gate details at the employee end.
  - Developed an APIs for enable/disable one or more gates for maintenance.
  - Ensured communication between teammates throughout the project and maintain sprint task sheet.
  - Helped others to resolve their issues whenever required.

- Pravin Ramasamy

  - Designed the backend APIs for login and signup.
  - Implemented routing on the frontend side.
  - Implemented the backend functionality to redirect the user based on role (General User, Airport Employee, Airline Employee).
  - Designed an APIs to assign baggage carosuel number to arriving flights and update the flight details in the database.
  - Between sprints gave regular feedback, allowing us to bounce ideas off all our teammates and improve with each sprint.

## Github Project Board

https://github.com/gopinathsjsu/team-project-team-16

## Tools and Languages Used

- Frontend : React JS, Html, CSS
- Backend : Node JS, Express JS
- Database : MongoDB
- Cloud : AWS EC2 Autoscaling with Load Balancer

## XP Values

1. Communication

- WhatsApp was our primary means of communication.
- To keep track of our progress, everyone on our team collaborated at every level of the project.
- We held a weekly sprint on Thursdays to keep track of our progress up to that point.
- During weekly sprints, we attempted to identify our roadblocks and eradicate them in the following sprint.
- In holding meetings, our team used a hybrid communication method that included in-person meetings as well as online sessions through Zoom.

2. Simplicity

- We attempted to keep things simple and to "do only what is necessary."
- We also attempted to reduce time waste by completing only the absolute criteria listed in the problem statement.

3. Feedback

- At the end of each sprint, a few minutes were set aside for feedback to discuss whether any team members needed to improve.
- We found areas for improvement through frequent input and revised the practices previously followed.

## Architecture Diagram

![ArchitectureDiagram](https://user-images.githubusercontent.com/99626312/205467571-a12fe2f4-637a-4002-83a2-f12977bcca38.jpeg)

## Class Diagram

![Class Diagram]()

## Deployment Diagram

![DeploymentDiagram](https://user-images.githubusercontent.com/99626312/205467579-d628acbb-ee1f-4f75-9018-ce730047d11c.jpeg)

## UI Wireframe

![WireFrame](https://user-images.githubusercontent.com/99626312/205468790-a872d9c3-e76b-40ce-b00b-7dbcd3b23990.png)

### Link to team's GitHub Repo

### Link to team's Project Board

### Link to team's Project Journal

### Link to team's Google Sprint Task Sheet

### Week Wise Design Decisions

1. Technologies to be used for frontend - Vannilla HTML, CSS, Bootstrap, React JS, Ant Design or Material UI?
2. Technologies to use for the backend - Python Flask, Java Spring Boot or Node JS?
3. Database to be used - MySQL or MongoDB
4. Design patterns to use - Decided to use Chain of Responsibility and Strategy Patterns
5. Rewards generation strategies- factors affecting rewards, when they change, events triggering them and much more.
6. Dynamic Pricing Strategies - How weekday, weekends, national holidays and festive seasons will contribute to the booking price of day?
7. Testing Strategies - Tools to be used and which APIs to test?
8. Cloud Services strategies- AWS or Heroku, ECR or EC2 deployment and cloud related decisions?

### Feature set

1. 3 personas: Airlines Employee, Airport Employee, General Users to access the system with role based authentication.
2. All Users :
   - Retrieve flights (for next 1 hour, 2 hour and 4 hour) arrivals and departures with updated details.
3. Airline Employee :
   - Add, update and delete flights belonging to their airline relevant to that airport.
   - A random gate assignment for arriving and departure flights - designed to prevent conflict assignments.
4. Airport Employees:
   - Enable or disable one or more gates for maintenance.
   - Assign baggage carousel number to arriving flights - the system should prevent conflicting assignments.
