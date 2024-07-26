Presenting figr-ui, a component library extending components from shadcn. Use the components with your own custom props!

## Installation

Install the dependency with your favourite package manager, let's use npm for this example

```
$ npm install --save @roysupriyo10/figr-ui
```
## Additional Steps

You must include the given css file for the components to work properly

```jsx
  import React from 'react';

  import { Button } from '@roysupriyo10/figr-ui';
  import '@roysupriyo10/figr-ui/dist/index.css';
  
  function App(){
    const [loading, setLoading] = React.useState(false);

    return (
      <div>
        <Button variant="primary" isLoading={loading}>Click me!</button>
      </div>
    );
  }
```

## View component states using Storybook

Clone the repo to your local machine

```
$ git clone https://github.com/roysupriyo10/figr-ui.git
```

Install dependencies using your favourite package manager, let's use npm for this example

```
$ npm install
```

Start the storybook server at your desired port, configuration is included

```
$ npm run storybook -- -p 6006
```

## Dark mode toggle included

Import the <DarkModeToggle /> component to toggle the light and dark states of components

```jsx
  import { DarkModeToggle } from '@roysupriyo10/figr-ui';
  
  function App() {
    return (
      <body>
        <header>
          ...navigation
          <DarkModeToggle
            defaultTheme="light"
          />
        </header>
      </body>
    );
  }
```
