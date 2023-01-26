Feature: Login Outline

    Scenario Outline: Login with invalid credentials
        Given I am on the login page
        When I fill in my email and password with <User> and <Password>
        Then I should validate that I am not logged in

        Examples:
            | User      | Password  |
            | username1 | password  |
            | username2 | password2 |
            | username3 | password3 |