# Fireguard command line crypto utils

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

# Generate deterministic token

## Basic use
``` bash
crypto token 5f3a9c89db3c5f7c32bc6463

# Result
Token: NDY3M2RjM2E0NmJkOGUzYmU4YjU4NmIzODQ1N2FlMGRkMDk0OGEyODZjODA4MDk2OTIwZTY5ZmIzOTViYjU4ZQ==

# Validate token
crypto token -t NDY3M2RjM2E0NmJkOGUzYmU4YjU4NmIzODQ1N2FlMGRkMDk0OGEyODZjODA4MDk2OTIwZTY5ZmIzOTViYjU4ZQ== 5f3a9c89db3c5f7c32bc6463

# Result
Result: VALID
```

## Basic set multiples params
``` bash
crypto token 5f3a9c89db3c5f7c32bc6463 5dee6e906ef1a32011d7c34d EMAIL 2

# Result
Token: Mjg0YjAzM2JiNTg0MDA2Mzc0MTQ2MDVkNTZkZjM2NTBkM2I2MGE2NGEyMzMyMmRmMDQ5M2VlNjE2YWE2YWM2Yg==

# Validate token
crypto token -t Mjg0YjAzM2JiNTg0MDA2Mzc0MTQ2MDVkNTZkZjM2NTBkM2I2MGE2NGEyMzMyMmRmMDQ5M2VlNjE2YWE2YWM2Yg== 5f3a9c89db3c5f7c32bc6463 5dee6e906ef1a32011d7c34d EMAIL 2

# Result
Result: VALID
```

## Set hash Algorithm

Avaliable algorithms: sha1, mdc2, ripemd160, sha224, sha256, sha384, sha512, md4, md5
Default algorithm: sha256

``` bash
crypto token 5f3a9c89db3c5f7c32bc6463 -a sha1

# Result
Token: NDk2MWY2NTk5NjAxYzcxODA4NDQ5NDAyMmUzMjVmODlmN2NlNGFiNQ==
```

``` bash
crypto token 5f3a9c89db3c5f7c32bc6463 -a sha512

# Result
ODEyMTJiNTg1ZjNkZDg2OGJmMGNlYmFjYTk0YTYwOTdmYTViZmYxYTM3MmUyYTAxMjA0YjBmMzU2NDI1M2ViODBiZTY1ZjA2OTQyMjc5ODAzOWViYTI4MmNjMzUwMGI4NDE3OGQ2YmZlMzRhOGVkYzQ0ZmY0OGM2MDAxMzgyZmU=
```