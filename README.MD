# Fireguard Crypto Utils

# Install

```bash
npm install -g @fireguard/crypto-utils
```

# Get available commands
```bash
crypto -h
```

# Generate random password

## Basic use
``` bash
crypto pass

# Result
Password 1: xPIfR5nmpbZ4u$18
```

## Generate password with the length of 20 characters
```bash
crypto pass 20

# Result
Password 1: U~n81D!KEhr9fvVxiFue
```

## Generate password with bcrypt salt and hash
```bash
crypto pass 20 -r

# Result
Password 1: o@kycdTDNlJA9LQ-p9mi
Salt: $2b$10$bHFBIP6qyne59pckK/Fgb.
Hash: $2b$10$bHFBIP6qyne59pckK/Fgb.yZhjplSWUEKAtyS8Q/8RtKL0iAe2GAu
```

## Generate password with bcrypt salt with 12 interactions and hash
```bash
crypto pass 20 -r -s 12

# Result
Password 1: dXjLRgI$UGyManVfV#Sz
Salt: $2b$12$sEmpHIm8EgtIt/5Cud/Wsu
Hash: $2b$12$sEmpHIm8EgtIt/5Cud/WsutbqUK84rAAslReglQOWXZSKjEN.Gtvu
```

## Generate 4 passwords with bcrypt salt with 12 interactions and hash
``` bash
crypto pass 20 -r -s 12 -n 4

# Result
Password 1: $xhEUms1z-#dfhGXSmot
Salt: $2b$12$Joe9CC71ZFLtSVOHjc4H2.
Hash: $2b$12$Joe9CC71ZFLtSVOHjc4H2.acCKWudon.U2E.X7bJddFNnXOZsFJBe
---------------------------
Password 2: Dvyro04JkqjzK18QD-za
Salt: $2b$12$iiSApd9QU8k0rySpEomDJ.
Hash: $2b$12$iiSApd9QU8k0rySpEomDJ.Upt3bZragqsvIqYQYAPoLi2QsorKrhy
---------------------------
Password 3: Oxt8Q7TQbfg!oKP6bOmy
Salt: $2b$12$riT5B6xRgTvA98BZHe4ev.
Hash: $2b$12$riT5B6xRgTvA98BZHe4ev.5l0ibPHcJ64ZU0YCmrxC4DRamF9NQ9y
---------------------------
Password 4: chLEf2~p0dwDrMHlpl7Z
Salt: $2b$12$vJJUC87sN4Plw5gR4InAeu
Hash: $2b$12$vJJUC87sN4Plw5gR4InAeuOyRQEFFmwOyTkwstdLbuNRXFbZdvTs.
---------------------------
```