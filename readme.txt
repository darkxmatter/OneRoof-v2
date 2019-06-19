(Uncomment server/database/index.js to create database tables if they don't exist.
Create a new url if needed. We used ElephantSQL. pgadmin is another option.)

API GUIDE:

ENDPOINTS THAT CAN BE USED BY MULTIPLE USER TYPES

  '/user'
    POST: creates a user in 'users' table
      expects 'pwd', 'name', 'apt_id', and 'role' in request body
      request body must have 'Content-Type' of 'application/json'
    GET: login request. authenticates (stretch feature) user and finds their role if they exist 
      looks for 'name' and 'pwd' in request header

  '/event'
    POST: creates event in 'events' table
      don't send this request until you've checked the role of the current user.
      management and maintenance can send a post to this route, residents cannot.
      request body expects 'date', 'description', 'type', and 'user_id'
        assign NULL to user_id if the event is meant to be public
        assign the id of a specific resident to resident_id if the event is private and meant for a specific user
        (e.g. accepted maintenance request, apartment inspection, etc)
    GET: gets all events (only events in the future, ignores events that have passed) from table depending on role
      expects 'role' (role of current user) and 'user_id' (id of current user) in request header
      if the role is 'Manager', display all events
      if role is 'Tenant', display only public events (with user_id of NULL) or events where their id is the event's 'user_id'

  '/messages'
    GET: gets all messages sent or received by a user
      request headers expects 'sender_id' and 'receiver_id'
    POST: post message sent by user_id.
      request body expects 'text', 'sender_id', 'receiver_id' and 'timestamp'

ENDPOINTS THAT CAN BE USED ONLY BY MANAGERS

  '/allUsers'
    GET: gets a list of all users for managers

  '/allApartments'
    GET: gets a list of all apartments for manager

  '/events'
    DELETE: deletes event from events table
      request body expects an event id

  '/payments'
    POST: adds a pending payment to the payments table for every user
      does not require any additional info to be sent
    PUT: changes a pending payment's 'received' field from false to true
      expects in request body 'apt_id' and 'month' (apartment that owes rent and month when rent is due)
  
  'payments/overdue'
    GET: get all overdue payments (where received is false)

  'payments/current'
    GET: get all payment information associated with the current month

ENDPOINTS THAT CAN BE USED ONLY BY RESIDENTS
  '/payments/send'
    PUT: pay rent. update 'sent' field in payments table from false to true
    request body expects 'apt_id' and 'month'

  '/payments/history'
    GET: gets all payment history associated with a user / apartment
      request headers expects 'apt_id'

TODO
  allow manager to also see who HAS paid
  







=== Front End === 
** LOGIN VIEW ** 
1. Sign-up – name (input box), password (input box), apartment # (drop down), role (drop down), and submit button. (POST request)
2. Log-in – name (input box). Password (input box), and submit button. (GET request) 

Manager View-

** Manager dashboard, on component did mount, API GET request for all tenants and all apartments **
- payments:
1. GET request: current month payments, filtered and rendered in our due and received list
2. GET request: overdue payments: previous month payments with received: false
3. POST request: schedule payments, sending apartment id, month (drop down menu), amount (input fields next to drop down)
4. PUT request: apartment id and month (drop down menu)

-events: 
Form component: dates (drop down menu, onchange), title (input field, onchange), description (input field, onchange), submit button (PUT).
Schedule Events component (UL): renders the array of events (Event Line component).
Event Line component (LI):  dates, title, description, inner delete button. Unique Id’s. Delete API request in our action creators. 

- messages:
similar to our slack chatroom 
1. List of tenants (button) – GET request that will render the previous messages between the manager and tenant. (clear the previous messages from previous tenant)
2. POST when manager inputs a new message, onchange for our input box and submit button. \
3. Drop down list of tenants (private or public event)
4. All messages + the user we are talking to (which determines which messages are displayed) can be stored in React local state rather than Redux store


-Tenant View
- messages:
similar to our slack chatroom 
1. Manager (button) – GET request that will render the previous messages between the manager and tenant. (clear the previous messages from previous tenant)
2. Maintenance (button) – GET request that will render the previous messages between the manager and tenant.
2. POST when manager inputs a new message, onchange for our input box and submit button.

- Payments
- Month view
- Display past rent payments (GET request using the apt ID)
- Make a payment – Drop down menu of months, input box for amount, and a paypal submit button (PUT request with month, amount, and apt ID)

- Events
1. View present and future events. GET request (user ID, on component did mount). Scroll on Y-Axis
