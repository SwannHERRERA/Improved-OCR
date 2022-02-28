Feature: Parse OCR to CLI

    Parse this command :
    to give a CLI output

    Scenario: Parse command with single input file
    Given this command -f "test/fixtures/all-digit.txt" -c -f "test/fixtures/complete-entries/two-complete-entries.txt"
    When i parse the command
    Then the argument should be as expected
    When i create command interactor
    Then the console output should be
    |  |
    |  |
    |  |
