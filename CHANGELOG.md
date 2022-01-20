# Change Log
## [v0.3.3] - 2022-01-19
### Changed
* Styles handing the overflow-y for chart editors updated to scale properly with webpage height changes
## [v0.3.2] - 2022-01-13
### Added
* Custom "Upload Image" button added to image library
### Changed
* Styles for image library elemented updated to fit with tool's theme
### Removed
* Insert image button removed 
## [v0.3.1] - 2022-01-12
### Added
* CSS added to "Editor" and "Replace Image" buttons in image editor to show when one has been selected
* Replace image functionality added
## [v0.3.0] - 2022-01-05
### Added
* FirstStatisticDecorator and StatisticDecorator updated to add data label to chart's group instead of a separate, user defined group that was passed in as a parameter
* FirstStatisticDecorator updated to return current x and y position when GetDecoratorSettings is called
* StatisticDecorator updated to return _top's position
* Default settings for StatisticDecorator updated
* Logic for clicking on "Selectable Decorator"s added
### Changed
* CreateChart in WaffleChart type no longer waits for document fonts to load
## [v0.2.6] - 2021-12-28
### Fixed 
* Alignment of stack bar chart inputs and labels updated to look nice when more than 2 categories are present
* Alignment of "Add category" button updated to be aligned with the rest of the UI when more than 2 categories are present
## [v0.2.5] - 2021-12-27
### Fixed
* Bug where replacing any chart with a pie/donut chart causes undefined behavior when changing data
## [v0.2.4] - 2021-12-27
### Fixed
* Bug where program crashes when UpdateDecoratorSettings called on unselected decorator
## [v0.2.3] - 2021-12-23
### Added
* Replace header and replace icon functionality added
* Insertion at specific indexes added to InsertIconCommand and InsertHeaderCommand objects
### Fixed
* Misalignment of replaced icons
## [v0.2.2] - 2021-12-17
### Added
* Responsive CSS added to home page and preview popups
## [v0.2.1] - 2021-12-15
### Added
* Image upload capabilities
* Image library (after upload)
## [v0.2] - 2021-11-26
### 
* Undo/redo module finished
* Replace chart process updated to use command objects
## [v0.1] - 2021-11-08
### Added
* Image uploading added
* CanvasCommands for undo and redo added
* Insert, Layer, and Remove commands for editor related functions added