# Improved OCR

## How to use
- firstly add the good shebang to the start of your cli file
- replace {/usr/bin/env npx} by the path of your npx command

```
(echo "#\!/usr/bin/env npx ts-node" && cat src/exec-improved-ocr.ts) > src/exec-improved-ocr2.ts && mv src/exec-improved-ocr2.ts src/exec-improved-ocr.ts
```

- Secondly give the good right to exec your file

```
chmod +x src/exec-improved-ocr.ts
```

```zsh
# groued story 1 - 2 - 3 - 4
improve-ocr -f ./errored.txt -f ./clean.txt -f ./unreadable.txt

# single story 5
improve-ocr -f ./file.txt -o ./result.txt -f ./file2.txt -o ./result.txt -f ./file3.txt -o ./result.txt
```
