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
Password 1: K2O7%%79Yl0l1Z&t
```

## Generate password with the length of 20 characters
```bash
crypto pass 20

# Result
Password 1: M?dMM0$+WoUnn%4H4s7j
```

## Generate 3 passwords with the length of 20 characters
```bash
crypto pass 20 -r 3

# Result
Password 1: YLr#xK%1oPa%!dy&T0UU
---------------------------
Password 2: qQ%Xi2AU*Mbly882ppqb
---------------------------
Password 3: x5s%?7+HsQXokLWzhLZu
---------------------------
```

## Generate password with setted criteria and 20 characters
```bash
crypto pass 20 -n 1 -s 2 -u 3 -l 4

# (-n) 1 Number character
# (-s) 2 Symbols characters
# (-u) 3 Uppercase characters
# (-l) 4 Lowercase characters

# Result
Password 1: XAxJXi&t0CUsm80v?Z*
```

## Generate password with bcrypt salt and hash
```bash
crypto pass 20 --recovery

# Result
Password 1: s#b!yXSqL89:b+R:3vhp
Salt: $2b$10$UeQ898VPeLhqsgPza97pB.
Hash: $2b$10$UeQ898VPeLhqsgPza97pB.3kbOmUbiArHpV8RaVF8372p45CoIVxC
```

## Generate password with bcrypt salt with 12 interactions and hash
```bash
crypto pass 20 --recovery --salts 12

# Result
Password 1: B!OGAM:V&vi!N033OSRa
Salt: $2b$12$cRLJ1sVdej3nE/DLIphTDO
Hash: $2b$12$cRLJ1sVdej3nE/DLIphTDOqQpT045XYUh7eEsy5RMmSGOGoY3UPRW
```

## Generate 4 passwords with bcrypt salt with 12 interactions and hash
``` bash
crypto pass 20 --recovery --salts 12 -r 4

# Result
Password 1: 6xV34&ntAjU#9qRN@%is
Salt: $2b$12$NEkzUOi3MTJdyQHRtp0Utu
Hash: $2b$12$NEkzUOi3MTJdyQHRtp0UtuMi4Nw8ue9tPB.Lu.Qg/1KHszrwjphYu
---------------------------
Password 2: oau1uVU&k&@gjx6y*POE
Salt: $2b$12$26WiAoPzpXPRKDzlYorBHe
Hash: $2b$12$26WiAoPzpXPRKDzlYorBHeTKQXsqCGS4DY6jVm6zB/I2/ydqPgLPa
---------------------------
Password 3: H#3IRHD2%q7fwHCRIjBe
Salt: $2b$12$Id9eqaejsH1UoE8fzc85gO
Hash: $2b$12$Id9eqaejsH1UoE8fzc85gOcBHXtrftkvVjT9swhgfwzkFMAi7OZ3u
---------------------------
Password 4: Z%?gj78+qwv5PHKJ+izV
Salt: $2b$12$yCCAiySRFUfraD3gA8y1D.
Hash: $2b$12$yCCAiySRFUfraD3gA8y1D.Q5U3OBeXDd45OH56uhlHZhQNuEjvrpC
---------------------------
```

# Manager OTP flow

## Autenticator ( Google Authenticator )

### Generate secret
``` bash
crypto authenticator

# Result
Secret: BAHUYURJJA7F6EJ5IFME2QAQG4

# Generate with 36 bytes for secret
crypto authenticator -b 36

# Result
Secret: KISHKJQWIRESICYNCFCSOGBDFMDHIJJ7JMFQWDJJKY3HO6IKPYRSQ7KLDM
```

### Generate code for secret
``` bash
crypto authenticator BAHUYURJJA7F6EJ5IFME2QAQG4

# Result
Code: 207855

# Generate code for 8 digits
crypto authenticator BAHUYURJJA7F6EJ5IFME2QAQG4 -d 8

# Result
Code: 39771567
```

### Validate code for secret and code
``` bash
crypto authenticator BAHUYURJJA7F6EJ5IFME2QAQG4 -c 946523

# Result
Result: VALID

# For invalid code
crypto authenticator BAHUYURJJA7F6EJ5IFME2QAQG4 -c 0

# Result
Result: INVALID
```

## TOtp

### Generate code for secret
``` bash
crypto totp BAHUYURJJA7F6EJ5IFME2QAQG4

# Result
Code: 034919

# Generate code for 8 digits
crypto totp BAHUYURJJA7F6EJ5IFME2QAQG4 -d 8

# Result
Code: 42915957
```

### Validate code for secret and code
``` bash
crypto totp BAHUYURJJA7F6EJ5IFME2QAQG4 -c 698844

# Result
Result: VALID

# For invalid code
crypto totp BAHUYURJJA7F6EJ5IFME2QAQG4 -c 0

# Result
Result: INVALID
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
