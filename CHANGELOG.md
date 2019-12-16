# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) 
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.4.1] - 2019-12-16

### Fixed
- IE11 compatibility - #77 / @JessicaSachs

## [1.4.0] - 2019-09-08

### Added
- Enable variable expansion in component helper paths

## [1.3.0] - 2019-09-08

### Added
- Enable array read / write for sub-properties

## [1.2.5] - 2019-09-07

### Fixed
- Fixed issue where get and set helpers cached reference to store 

## [1.2.3] - 2019-06-13
### Added
- TypeScript: added overload for array and object accessors

### Changed
- Removed dependency on Lodash `deepClone()` for a naive clone method

### Fixes
- TypeScript: added proper generics to accessors - #58 / @KaelWD

## [1.2.2] - 2019-03-11
### Added
- Added Class Component to dependencies

## [1.2.0] - 2019-03-11
### Added
- Typescript typings file - #38 / @ozum
- Add TypeScript property decorators and docs - #38 / @ozum

### Fixed
- Use typeof instead of instanceof to defend against Nuxt errors - #46 / @SebastienTainon
- Added missing return to callOne() - #43 / @germanp
- Allow dollar sign in getKeys - #41 / @germanp
- Return the call to vuex.store.dispatch - #37 / @nchutchind

## [1.1.0] - 2018-06-11
### Added
- Ability to create new sub-properties on the fly
- `call()` helper to map actions using the same syntax as `get()` and `sync()`
- `registerModule()` helper to register wildcard members for dynamic modules

### Changed
- Wildcards can now appear anywhere in the last segment of a path
- Wildcards targeting module properties must now be explicit, i.e. `foo/*` rather than `foo*`
- `deep` option format is now 0: disabled, 1: read-write, 2: read-write-create
- `deep` option can now be changed at any time
- `Payload#update()` now **returns** the updated state, rather than updating the passed state

### Fixed
- Invalid computed property paths now return empty functions
- Bug in sync where invalid paths would cause error message to error


## [1.0.10] - 2018-05-20
### Fixed
- Fixed invalid wildcard bug which caused Nuxt to bomb

## [1.0.9] - 2018-05-18
### Fixed
- Fixed setting of sub-properties when using mutations **and** actions

## [1.0.8] - 2018-05-12
### Added
- Banner to built files

### Changed
- Unknown modules now throw error rather than log to console (for Nuxt compatibility)

### Fixed
- `store.get()` regression fixed

## [1.0.7] - 2018-05-11
### Fixed
- `sync()` now reads only from state and not getters

## [1.0.6] - 2018-05-11
### Fixed
- Vuex getter functions now return as functions not values for computed properties

## [1.0.5] - 2018-05-09
### Added
- State can now be passed to `make.*` as a function
- Added CHANGELOG.md

### Changed
- Removed `only` parameter from `make.*` helpers; function now takes single `state` / `keys` parameter
- Updated docs accordingly

## [1.0.4] - 2018-05-04
### Removed
- Removed component helpers set() function


## [1.0.3] - 2018-05-04
### Fixed
- Fixed bug with module-level wildcard get() not returning getters


## [1.0.2] - 2018-05-03
### Fixed
- Fixed error message displaying original package name


## [1.0.1] - 2018-04-30
### Changed
- Docs tidy-ups and clarifications

## [1.0.0] - 2018-04-23
- Official release

