# Improved OCR

```zsh
# groued story 1 - 2 - 3 - 4
improve-ocr -f ./errored.txt -f ./clean.txt -f ./unreadable.txt

# single story 5
improve-ocr -f ./file.txt -o ./result.txt -f ./file2.txt -o ./result.txt -f ./file3.txt -o ./result.txt

ts-node src/exec-improved-ocr.ts -f "src/fixtures/all-digit.txt" -c -f "src/fixtures/complete-entries/two-complete-entries.txt"
```
