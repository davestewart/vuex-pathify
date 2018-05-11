# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) 
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

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

