# React Line Clamp

A flexible and performant React component for clamping content to a specified number of lines with expand/collapse functionality.

## Features

- 🎯 **Precise line clamping** - Uses CSS `line-clamp` for optimal performance
- 🔄 **Expand/Collapse functionality** - Built-in toggle with customizable text
- 🎨 **Highly customizable** - Custom styles, classes, and button components
- 📱 **Responsive** - Automatically recalculates on window resize
- 🧩 **Flexible content** - Supports text, JSX, and any React content
- 🔧 **TypeScript support** - Full type definitions included
- ⚡ **Lightweight** - Zero dependencies (except React)
- 🧩 **Flexible API** - Controlled and uncontrolled modes

## Installation

```bash
npm install react-line-clamp
```

or

```bash
yarn add react-line-clamp
```

## Usage

### Basic Example

```tsx
import LineClamp from 'react-line-clamp';

function App() {
  return (
    <LineClamp lines={3}>
      This is a very long text that will be clamped to 3 lines. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </LineClamp>
  );
}
```

### With Custom Expand/Collapse Text

```tsx
<LineClamp
  lines={2}
  expandText="Read more"
  collapseText="Show less"
>
  Your long text here...
</LineClamp>
```

### Without Toggle Button

```tsx
<LineClamp lines={3} showButton={false}>
  Your long text here...
</LineClamp>
```

### With Custom Styling

```tsx
<LineClamp
  lines={3}
  className="my-custom-class"
  style={{
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#333'
  }}
>
  Your long text here...
</LineClamp>
```

### With Rich Content

```tsx
<LineClamp lines={3}>
  <p>This component now supports <strong>rich content</strong>!</p>
  <p>You can include <em>multiple paragraphs</em>, <a href="#">links</a>, and other elements.</p>
  <p>Perfect for blog previews, product descriptions, and more complex layouts.</p>
</LineClamp>
```

### Controlled Mode

```tsx
import { useState } from 'react';
import LineClamp from 'react-line-clamp';

function ControlledExample() {
  const [expanded, setExpanded] = useState(false);

  return (
    <LineClamp
      lines={3}
      expanded={expanded}
      onToggle={setExpanded}
    >
      Your long content here...
    </LineClamp>
  );
}
```

### Custom Button Component

```tsx
const CustomButton = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="btn btn-primary"
  >
    {children}
  </button>
);

<LineClamp
  lines={3}
  buttonComponent={CustomButton}
>
  Your long content here...
</LineClamp>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | **Required.** The content to be clamped |
| `lines` | `number` | - | **Required.** Maximum number of lines to display |
| `className` | `string` | `""` | Additional CSS classes |
| `style` | `React.CSSProperties` | `{}` | Custom styles |
| `expandText` | `string` | `"Show more"` | Text to show when content is clamped |
| `collapseText` | `string` | `"Show less"` | Text to show when content is expanded |
| `showButton` | `boolean` | `true` | Whether to show expand/collapse buttons |
| `buttonComponent` | `React.ComponentType` | - | Custom button component |
| `onToggle` | `(expanded: boolean) => void` | - | Callback when expand/collapse state changes |
| `expanded` | `boolean` | - | Control the expanded state (controlled mode) |

### TypeScript

The component is written in TypeScript and includes full type definitions. The main interface is:

```tsx
interface LineClampProps {
  children: React.ReactNode;
  lines: number;
  className?: string;
  style?: React.CSSProperties;
  collapseText?: string;
  expandText?: string;
  showButton?: boolean;
  buttonComponent?: React.ComponentType<{
    onClick: () => void;
    children: React.ReactNode;
  }>;
  onToggle?: (expanded: boolean) => void;
  expanded?: boolean;
}
```

## Browser Support

This component uses CSS `line-clamp` which is supported in:
- Chrome 6+
- Firefox 68+
- Safari 5+
- Edge 17+

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Your Name]
