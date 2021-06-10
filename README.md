# Lender Maintenance App

This page is a single page web application built by AngularJS 1.6.9

## Installation

Use the package manager npm to install.

```bash
npm install
```

## Usage

```bash
npm start
```
When the terminal shows the local server is running, click on the http address shown in the terminal to launch the page.

## Features
This page meets the following requirements:

Scenario 1: Lenders loading
When I visit the Lenders page
Then I should see a loading spinner

Scenario 2: Lenders loaded
Given I am on the Lenders page
When the lenders have finished loading
Then I should see all my lenders

Scenario 3: Error loading Lenders
Given I am on the Lenders page
And the lenders are loading
When the Lenders cannot be loaded
Then I should see an error
And I should see a button to try again

Scenario 4: Scrolling through lenders
Given I am on the Lenders page
And the lenders have been loaded on the page
When I scroll down the page
Then column headings should stay on the screen

### Note

1. The default number of displayed records per page is 20. When there are more than 20 records, paginator is enabled.
2. Currently this page only supports to be viewed on Desktop, it doesn't support mobile view well.
3. Because the data is local mock JSON data, I do not know the request response body in real world(eg. whether error response has an error message or which attribute stores the error message), I set up the error handling, but it might not work perfectly with real API.

