# What to do

- Install Virtualbox and vagrant
- `vagrant up`
- `vagrant ssh`
- In your home folder find data.db, a sqlite3 database loaded with records. sqlite3 is already installed on the Vagrant box.
- Write a backend service for the specified api using Python
- If you don't want to use Python, that's fine, just install whatever language (and framework) you need in the Vagrant image and send it back. If you aren't using Python, please be clear about how we should start the service and flag any dependency issues we may run into.
- Write a frontend service that consumes that api and provides a UI for the user

## Task
Today we're building a simple events website. We've been provided data for a bunch of events which include location data.

For your project, please build a simple data access API wrapping the SQLite data with the following endpoints:

## Common API Endpoints
We need endpoints to:

- List out all events (there could be thousands)
- Give details on a specific event
- Attend/RSVP to an event

You can choose what the endpoint(s) look like and what data they return but make sure that we can accomplish all the above tasks. Just make sure the endpoints return json.

After that plase choose *one* of the following options to implement:

### Option 1: Frontend
We'd like to build an interface to allow users to view and edit the data. We need both a backend that has endpoints that take in parameters and returns json data, and a frontend interface which consumes the data and displays it.

At minimum, this frontend should be capable of the following:

- Render the list of events in chronological order, displaying whatever details you deem necessary for each event
- Allow a user to view more details about each event, including ticket tiers, event description, etc. You can display the details on the same page, or create a second "event details" page.
- Allow a user to mark an event as "attending" — if a user has marked an event as "attending," this state should be reflected in the list of events, as well as on the event details page.

### Option 2: Event Search Service
Events are more interesting if they're geographically or topically relevant. Please build a simple data wrapper that uses geography, naming, or some other signal to allow discovery of events via search rather than browsing. (This doesn't mean you have to use complex search indexing or machine learning; any plausible lookup method(s) is okay.)

You may decide to modify the data model to track attendee history or provide additional useful lookup keys, and should add an API endpoint to fetch recommendations based on your search criteria (location, keyword, attendee email, etc.).

## General notes

* Include any assumptions you are making about the requirements for the project in your code comments.
* If you build a frontend, please make sure the project works in the latest versions of Chrome, Firefox, Safari and Internet Explorer. No need to support anything older than that.
* If you use a JS module loader or CSS precompiler, please do make sure to include the unminified version of your source when you submit the test.
* Don't worry too much about how it looks...but don't worry too little!
* For the search service, please explain any changes you make to the data model and the search criteria you implemented in your API.

## To Submit
Once you have your code working, zip up the directory and submit it along with:

* Instructions on how to start the server (or service)
* How to test it (i.e. what hostname/URL do we visit, what automated tests exist, etc.)

We may test this with a much larger dataset than what we provided here, so if you've modified the data model please provide a reasonable loading script, migration, or other mechanism to adapt input in the same format as our sample to your new schema.

## Data
We have 2 tables, Events and Locations (each event has a single location)

Events look like:
Events:
```
    id (Integer)
    status (String)
    start_date (DateTime)
    end_date (DateTime)
    description (String)
    official (Boolean)
    visibility (String)
    guests_can_invite_others (Boolean)
    modified_date (DateTime)
    created_date (DateTime)
    participant_count (Numeric)
    reason_for_private (String)
    order_email_template (String)
    name (String)
    locations = (Location)
```

Locations:
```
    id (Integer)
    event_id (Integer, links to parent event's id)

    address_type (String)
    contact_phone (String)
    primary (Boolean)
    contact_email (String)
    contact_family_name (String)
    contact_given_name (String)
    host_given_name (String)
    timezone (String)
    city (String)
    locality (String)
    state (String)
    address_type (String)
    latitude (String)
    longitude (String)
    accuracy (String)
    address1 (String)
    address2 (String)
    postal_code (String)
    country (String)
    modified_date (DateTime)
    created_date (DateTime)
    number_spaces_remaining (Numeric)
    spaces_remaining (Boolean)
    name (String)
```
