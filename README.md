Presenting figr-ui, a component library extending components from shadcn. Use the components with your own custom props!

## Installation

```
$ npm install --save @roysupriyo10/figr-ui
$ yarn add @roysupriyo10/figr-ui
$ pnpm add @roysupriyo10/figr-ui
$ bun install @roysupriyo10/figr-ui
```
## Additional Steps

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
