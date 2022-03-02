Feature: Parse OCR to CLI

    Parse this command :
    to give a CLI output

    Scenario: Parse command with file without error
    Given this command -f "test/fixtures/all-digit.txt" -c -f "test/fixtures/complete-entries/two-complete-entries.txt"
    When i parse the command
    Then the argument should be command and files without errors
    When i create command interactor
    Then the console output should be
    | 123456789\n |
    | 123456789\n356619702\n |

    Scenario: Parse command with file errored
    Given this command -c -f "test/fixtures/complete-entries/checksum-error.txt"
    When i parse the command
    Then the argument should be errored
    When i create command interactor
    Then the console output should be
    | 123456789\n356619782 ERR\n |

    Scenario: Parse command with file illisible
    Given this command -c -f "test/fixtures/entry-with-unreadable.txt"
    When i parse the command
    Then the argument should be illisible
    When i create command interactor
    Then the console output should be
    | 12345?78? ILL\n |

    Scenario: Exec command with a lot of args but helper to
    Given this command -c -f "test/fixtures/entry-with-unreadable.txt" -h
    When i exec the command
    Then the console output should be the helper

    Scenario: Exec command with file and ouput with error invalid and valid code
    Given this command -f "test/fixtures/complete-entries/error-illegal-valid-entries.txt" -o "test/fixtures/output/example.txt"
    When i exec the command
    Then the content file "test/fixtures/output/example.txt" should be
    | 123456789\n356619782 ERR\n35661?782 ILL  |

