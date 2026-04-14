# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.7] - 2026-04-14

### Changed
- **Context Menu Reorganization**: Moved all commands into a submenu for cleaner editor context menu
- **GitHub Actions Improvements**: 
  - Enhanced release workflow with full validation and multi-platform publishing
  - Added tag version validation to prevent accidental releases
  - Improved test workflow with npm caching and better checks
  - Split release job into three separate jobs for independent platform publishing (GitHub Releases, VS Code Marketplace, Open VSX Registry)
- **Build Pipeline Enhancements**:
  - Added npm caching for faster CI/CD builds
  - Implemented better error handling and conditional job execution
  - Added explicit type checking and linting in release workflow

## [0.0.6] - 2026-04-09

### Changed
- **Test Suite Optimization**: Fixed an issue where test cases were not executing correctly and expanded the test suite to cover a broader range of scenarios.
- **Indentation Logic Fix**: Resolved a bug preventing correct indentation when the previous line contained mixed whitespace (combined tabs and spaces).
- **Documentation Improvements**: Updated the README and internal documentation to be more intuitive and easier to follow.

## [0.0.5] - 2025-07-30

### Changed

- Updated icon
- Optimized assets

## [0.0.4] - 2025-07-30

### Changed

- Changed bundler to esbuild for more optimization

## [0.0.3] - 2025-07-30

### Changed

- Updated indentation conversion methods to use `delete` and `insert` instead of `replace` for better performance and accuracy

## [0.0.2] -2025-07-27

### Added
- Support for executing commands via the editor context menu

### Changed
- Improved project documentation
- Enhanced GitHub Actions workflows

## [0.0.1] -2025-07-27

- Initial release
