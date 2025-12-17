# Specification: UI Design System

## MODIFIED Requirements

### Requirement: Component Styling Patterns
The system SHALL enforce consistent styling patterns based on documented guidelines for all UI components.

#### Scenario: Semi-transparent background application
- **WHEN** any control element or container is rendered
- **THEN** it shall use the standardized semi-transparent background (rgba(0, 0, 0, 0.6))
- **AND** it shall not use hardcoded or custom background colors
- **AND** the transparency shall allow proper visibility of underlying content
- **AND** the background shall maintain consistent opacity across all similar components

#### Scenario: Border radius standardization
- **WHEN** any UI component applies border radius
- **THEN** large containers shall use 18px border radius
- **AND** small buttons shall use 14px border radius
- **AND** tool buttons (40px) shall use 20px border radius for circular appearance
- **AND** border radius values shall not deviate from these standards

#### Scenario: Shadow and elevation consistency
- **WHEN** any interactive element is displayed
- **THEN** it shall apply the standard shadow pattern (shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5)
- **AND** shadow color shall be #000 for default states
- **AND** active states shall use enhanced shadows with accent color
- **AND** shadow properties shall remain consistent across similar component types

### Requirement: Interactive Feedback Implementation
The system SHALL provide standardized interactive feedback for all pressable elements.

#### Scenario: Pressed state transformation
- **WHEN** any pressable element is pressed
- **THEN** it shall apply opacity reduction to 0.8
- **AND** it shall apply scale transform to 0.95
- **AND** the transformation shall be immediate and smooth
- **AND** the element shall return to original state when press is released

#### Scenario: Active state enhancement
- **WHEN** any element is in active or selected state
- **THEN** it shall use accent color background (Colors.ACCENT_COLOR)
- **AND** it shall apply enhanced shadow with accent color tint
- **AND** shadow opacity shall increase to 0.4 with radius of 4
- **AND** elevation shall increase to 6 for enhanced depth perception

### Requirement: Typography Standards Enforcement
The system SHALL apply consistent typography patterns across all text elements.

#### Scenario: Active text styling
- **WHEN** text appears in active or selected elements
- **THEN** it shall use TEXT_BLACK color for contrast
- **AND** font size shall be 14px with 700 font weight
- **AND** letter spacing shall be 0.5px for readability
- **AND** text shall maintain proper contrast ratio against accent backgrounds

#### Scenario: Inactive text styling  
- **WHEN** text appears in inactive or default elements
- **THEN** it shall use TEXT_WHITE color for visibility
- **AND** font size shall be 14px with 600 font weight
- **AND** letter spacing shall be 0.5px for consistency
- **AND** text shall maintain proper contrast against semi-transparent backgrounds