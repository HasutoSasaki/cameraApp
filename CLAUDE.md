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

### Component Styling Examples
```typescript
// ✅ Correct - using design tokens and guidelines
const styles = StyleSheet.create({
  toolButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
    borderRadius: 20, // Circular for 40px buttons
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
    color: Colors.TEXT_WHITE,
  },
  pressedButton: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
});

// ❌ Wrong - hardcoded values and inconsistent patterns
const styles = StyleSheet.create({
  toolButton: {
    backgroundColor: 'rgba(128, 128, 128, 0.6)', // Non-standard background
    borderRadius: 5, // Inconsistent radius
    shadowOpacity: 0.2, // Non-standard shadow
  },
  buttonText: {
    fontSize: 12, // Non-standard font size
    color: '#fff', // Hardcoded color
  },
});
```

### Interactive Pressable Pattern
```typescript
// ✅ Correct - consistent interactive feedback
<Pressable
  style={({ pressed }) => [
    styles.button,
    isActive && styles.activeButton,
    pressed && styles.pressedButton,
  ]}
  onPress={handlePress}
>
  <Text style={styles.buttonText}>Label</Text>
</Pressable>

// ❌ Wrong - missing pressed state feedback
<Pressable style={styles.button} onPress={handlePress}>
  <Text style={styles.buttonText}>Label</Text>
</Pressable>
```