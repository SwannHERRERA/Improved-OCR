# Improved OCR

## How to use

- firstly add the good shebang to the start of your cli file
- replace {/usr/bin/env npx} by the path of your npx command

```zsh
(echo "#\!/usr/bin/env npx ts-node" && cat src/exec-improved-ocr.ts) > src/exec-improved-ocr2.ts && mv src/exec-improved-ocr2.ts src/exec-improved-ocr.ts
```

- Secondly give the good right to exec your file

```zsh
chmod +x src/exec-improved-ocr.ts
```

```zsh
# groued story 1 - 2 - 3 - 4
improve-ocr -f ./errored.txt -f ./clean.txt -f ./unreadable.txt

# single story 5
improve-ocr -f ./file.txt -o ./result.txt -f ./file2.txt -o ./result.txt -f ./file3.txt -o ./result.txt

ts-node src/exec-improved-ocr.ts -f "test/fixtures/all-digit.txt" -c -f "test/fixtures/complete-entries/two-complete-entries.txt"
```


## Test Use Case 1
- test file corresponding: test/parsing.test.ts

## Test Use Case 2
- test file corresponding: test/checksum.test.ts

## Test Use Case 3
- test file corresponding: test/write-code-result.ts

## Test Use Case 4
- test file corresponding: test/write-code-result.ts

## Test Use Case 5
- test file corresponding: test/write-code-result.ts

## Test Use Case 6
- test file corresponding: test/cli.test.ts and cucumber tests
