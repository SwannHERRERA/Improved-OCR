# Improved OCR

Votre manager à récemment acheté une machine qui automatise la lecture des lettres et des fax.
Cette machine scanne les documents et produit un fichier avec un certain nombre d'entrées.
Vous devez écrire un programme pour parser ce fichier.

## User Story 1

Le format créé par la machine est le suivant :

```
    _  _     _  _  _  _  _ 
  | _| _||_||_ |_   ||_||_|
  ||_  _|  | _||_|  ||_| _|

```

Chaque entrée fait exactement **4 lignes et 27 colonnes** (9 x 3).
Les trois premières lignes décrivent des chiffres grâce à des pipes et des underscores.
La quatrième ligne est blanche.

Chaque entrée ou **code** créé possède 9 chiffres, chacun allant de 0 à 9.
Un fichier classique peut contenir jusqu'à 100 entrées.

Ecrivez un programme qui prend en entrée ce fichier et arrive à parser les codes contenus.

## User Story 2

Parfois, la machine génère de mauvais codes.
Vous devez maintenant pouvoir valider les codes grâce à un checksum.
Il peut être calculé de la manière suivante :

code     : 3  5  6  6  0  9  7  0  1
position : p9 p8 p7 p6 p5 p4 p3 p2 p1

calcul du checksum :
((1*p1) + (2*p2) + (3*p3) + ... + (9*p9)) mod 11 == 0

## User Story 3

Votre manager souhaite obtenir les résultats de votre programme.
Il vous demande d'écrire un fichier en sortie, pour chacun des fichiers en entrée, sur ce format:

457508000
664371495 ERR

Le fichier en sortie possède un code par ligne.
Si le checksum est mauvais, c'est indiqué par ERR dans une seconde colonne indiquant le statut.

## User Story 4

Parfois, la machine produit des nombres illisibles, comme le suivant :

```
    _  _     _  _  _  _  _ 
  | _|  |  | _||_   ||_|| |
  ||_  _|  | _||_|  ||_| _|
  
```

Votre programme doit être capable de repérer de tels problèmes.  
Dans ce cas, les nombres inconnus sont remplacés par des '?'.  
Mettez à jour votre sortie fichier. Avec le nombre illisible précédent, cela donnerait :  

457508000    
664371495 ERR   
12?13678? ILL

## User Story 5

Votre manager aimerait faire un peu de classification.  
Pour un ensemble de fichiers donnés en entrée, il voudrait maintenant avoir la possibilité de :  
- soit garder le comportement actuel et créer un fichier sortie pour chaque fichier entrée  
- soit utiliser un nouveau comportement qui lui permette de "regrouper" les codes similaires  

Ce comportement est le suivant : quelque soit le nombre de fichiers en entrée, le programme va créer 3 sorties nommées authorized, errored, et unknown  
  
Authorized contient tous les checksums valides  
Errored contient tous les checksums invalides  
Unknown contient tous les checksums illisibles   
  
## User Story 6   
  
Fournissez un outil de commande aux autres développeurs de votre société pour qu'ils puissent facilement utiliser toutes les fonctionnalités que vous venez de créer.  
  
Son implémentation est libre.  
  
  
### Barème Indicatif
  
1 - Parse codes - /2  
2 - Checksum - /2  
3 - Output - /2  
4 - Not readable - /2  
5 - Group codes - /2  
6 - Cmd line - /2  
Tests - /2  

Pas 1 test par partie 	-1  
Non respect CQS 	-1  
Non respect loi Demeter -1  