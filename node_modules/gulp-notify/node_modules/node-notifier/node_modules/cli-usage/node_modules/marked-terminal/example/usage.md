# mversion [ <newversion> | major | minor | patch | prerelease ] [ -m <optional message> ] [ -n | --no-prefix ]
> Update module version in either one or all of package.json,
component.json, bower.json, manifest.json and *.jquery.json.

**Run without arguments to get current version.**

## Semver Summary

Given a version number `MAJOR.MINOR.PATCH` increment the:
 * `MAJOR` version when you make incompatible API changes,,
 * `MINOR` version when you add functionality in a backwards-compatible manner, and,
 * `PATCH` version when you make backwards-compatible bug fixes.,

Additional labels for pre-release and build metadata are available as extensions to the `
MAJOR.MINOR.PATCH` format.

## Update version
Update version by defining new semver valid version
or a release string (`major`, `minor`, `patch`, `build`).

### Examples
```
$ mversion minor
$ mversion 1.0.1-beta
```


## Git

Use `-m` to auto commit and tag. Apply optional message and use `%s`
as placeholder for the updated version. Default message is `v%s` where `%s`
is replaced with new version.



`--tag` (or `-t` for short) allows for overriding the tag name used.
This does not change behaviour of the message, just the tag name.


As with `-m`, all occurances of `%s` are replaced with the newly bumped version.



`--no-prefix` (or `-n` for short) is a short hand for setting
a tag name without `v` as prefix. This does not change behaviour of
the message, just the tag name.


### Examples
```
$ mversion minor -m
$ mversion minor -m 'Bumped to v%s' --tag 'v%s-src'
```


## And just a table to show it off

| Lorem | Ipsum | Sit amet     | Dolar  |
|------|------|----------|----------|
| Row 1  | Value    | Value  | Value |
| Row 2  | Value    | Value  | Value |
| Row 3  | Value    | Value  | Value |
| Row 4  | Value    | Value  | Value |



