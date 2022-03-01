# Change Log
## [v0.5.4] - 2022-02-28
### Added
* Replace chart icon functionality added
* faWoman icon added to icon library
## [v0.5.3] - 2022-02-21
### Changed
* Textfield for thickness option in PieEditor changed to slider
* Width and height listeners and initial values in BarEditor swapped so they are consistent with what updating the chart actually does
* Misalignment of plus button in LineChartInputFields fixed
* Changing of point radius no longer breaks data labels code for LineChart type
* Positioning of DataLabels for LineChart type updated to be aligned with point
### Removed
* Lock to chart option in WaffleEditor removed
* Position settings for PieEditor removed
## [v0.5.2] - 2022-02-14
### Changed
* Transition time when hovering over ContentElement images made faster
* Chart outline type now locks to chart (i.e. radius can no longer be updated)
* Konva event listeners added to inserted images
## [v0.5.1] - 2022-02-11
### Changed
* TextField, Checkbox, ColorPicker, DropDownList, and FontSelector types updated to support being disabled for changed. Default prop types also defined so that this property is optional
* UI for waffle editor updated. Setting options now grouped by color and size settings
* Decorator options disabled when not selected
## [v0.5.0] - 2022-02-08
Relatively signficant update: Layering system updated to draw all elements in one group and use a global z-index, instead of many separate local z-indexes that elements will switch to.
### Added
* Infographic elements are now all drawn in main group, instead of being grouped into subgroups
### Changed
* PositionCommand updated to not use LayerCommand
### Removed
* _SwitchContainerOnDrag in AInfographic
## [v0.4.1] - 2022-02-07
### Changed
* ClearSelection is now called before text elements are inserted instead of afterwards
* When attempting to replace an IconBar type with another chart, a constant padding is written in place of the IconBar's padding
## [v0.4.0] - 2022-02-01
### Added
* NumericTextField and LabeledNumericTextField types defined
### Changed
* TextField type updated so that new lines and lone whitespace not permitted
* All previous TextField and LabeledTextField objects that handled numeric data updated to use new types
## [v0.3.6] - 2022-01-27
### Changed
* Obesity infographic template updated so that all text is editable
* Violence infographic template updated so that background color can be changed. Infographic also uses RectangleHeader type for background elements instead of Konva.Rect type
## [v0.3.5] - 2022-01-26
### Changed
* Sliders in ImageEditor and IconEditors are now custom defined (i.e. they no longer use the LabeledSlider type)
## [v0.3.4] - 2022-01-24
### Added
* Background color attribute added to LineChart type
* UI color picker and label for updating background color added
### Changed
* Feature toggle added to "Replace Icons" button
## [v0.3.3] - 2022-01-22
### Changed
* Styles handing the overflow-y for all editors updated to scale properly with webpage height changes
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
