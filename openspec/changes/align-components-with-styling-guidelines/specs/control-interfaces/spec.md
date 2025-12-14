# Specification: Control Interfaces

## MODIFIED Requirements

### Requirement: Control Element Visual Consistency
All control interface elements SHALL follow the established styling guidelines for consistent visual presentation.

#### Scenario: Tool button standardization
- **WHEN** any tool button (grid toggle, level indicator, drawing mode) is rendered
- **THEN** it shall use 40px × 40px dimensions with 20px border radius
- **AND** it shall apply semi-transparent background (rgba(0, 0, 0, 0.6)) for default state
- **AND** it shall use standard shadow pattern with 2px offset and 0.25 opacity
- **AND** icon size shall be 20px with proper centering
- **AND** active state shall use accent color background with enhanced shadow

#### Scenario: Selector component alignment
- **WHEN** selector components (ratio, zoom, mode) are displayed
- **THEN** they shall follow button element pattern with 14px border radius
- **AND** container height shall align with guideline standards (26px-32px range)
- **AND** internal padding shall use standardized values (12px horizontal, 5px vertical)
- **AND** text styling shall match typography standards for active/inactive states

#### Scenario: Control container styling
- **WHEN** control bar containers are positioned
- **THEN** they shall use 18px border radius for larger containers
- **AND** internal spacing shall follow 3px padding for element separation
- **AND** background shall maintain consistent semi-transparency
- **AND** shadow effects shall create proper depth hierarchy

### Requirement: Interactive Feedback Standardization  
All control interface elements SHALL implement consistent interactive feedback patterns.

#### Scenario: Press feedback implementation
- **WHEN** any control element receives touch input
- **THEN** it shall immediately apply 0.8 opacity and 0.95 scale transform
- **AND** the visual feedback shall be smooth and responsive
- **AND** the element shall return to normal state when touch is released
- **AND** feedback shall not interfere with the control's primary function

#### Scenario: State transition smoothness
- **WHEN** control elements change between active and inactive states
- **THEN** background color transitions shall be smooth and visible
- **AND** shadow changes shall enhance the state difference
- **AND** text color shall update to maintain proper contrast
- **AND** transitions shall complete within appropriate timing (≤200ms)

### Requirement: Spacing and Layout Adherence
Control interface layouts SHALL follow established spacing and sizing guidelines.

#### Scenario: Element spacing consistency
- **WHEN** multiple control elements are arranged in a container
- **THEN** gaps between elements shall use standardized values (1.5px-3px for tight spacing, 12px for section separation)
- **AND** internal padding shall follow the established patterns
- **AND** minimum touch target size shall meet accessibility requirements (44dp)
- **AND** layout shall maintain proper proportions across different screen sizes

#### Scenario: Safe area integration
- **WHEN** control bars are positioned near screen edges
- **THEN** they shall use Layout constants for safe area handling
- **AND** top control bar shall account for notch and status bar areas
- **AND** bottom control bar shall account for home indicator space
- **AND** horizontal padding shall prevent overlap with screen bezels