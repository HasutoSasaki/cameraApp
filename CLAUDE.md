<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# Design System Guidelines
When working on UI components, follow these design system conventions:

## Color Usage
- Use colors from `src/assets/style/colors.ts`
- Never use hardcoded color values in components
- Import Colors object: `import { Colors } from '@/assets/style/colors'`

## Layout Constants
- Use layout constants from `src/assets/style/layout.ts`
- Apply Safe Area insets for iOS compatibility using `Layout.SAFE_AREA_TOP` and `Layout.SAFE_AREA_BOTTOM`
- Use predefined component sizes and spacing values
- Import Layout object: `import { Layout } from '@/assets/style/layout'`

## Styling Standards
For comprehensive styling guidelines including modern UI patterns, shadows, transparency, and interactive feedback, refer to `docs/styling-guidelines.md`. This document provides:
- Semi-transparent background patterns
- Modern border radius values
- Consistent shadow and elevation standards
- Active state highlighting patterns
- Interactive feedback implementation
- Typography standards
- Component-specific styling patterns

## Examples
```typescript
// ✅ Correct - using design tokens
backgroundColor: Colors.MAIN_BACKGROUND,
paddingTop: Layout.SAFE_AREA_TOP,
height: Layout.TOP_CONTROL_BAR_HEIGHT,

// ❌ Wrong - hardcoded values
backgroundColor: '#2CD3F4',
paddingTop: 44,
height: 70,
```