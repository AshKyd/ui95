# Who is this for?

This project is mostly for me, because I'm a weirdo who likes making stuff. The
eventual goal is that this will replace my site at [ash.ms](https://ash.ms/)
and look real cool.

But you might find it interesting if you have a burning need to implement an
old-school interface, maybe in a game or something.

# Using ui95

⚠️ While you should consider this alpha quality and subject to change ⚠️, you can implement the components or the full-on apps in your own projects.

## Using components or apps in your project

If you want to implement these components or apps, you can directly require the Preact components into your app.

```
import Button from 'src/components/button';
export default function() {
  return <Button>Hello world</Button>
}
```

For examples, see the [Storybook](https://ui95.ash.ms/storybook/) components.

<iframe src="/storybook/" width="100%" height="600"></iframe>

## Using the full shell in your project

To run a full desktop, you can mount the `Shell` component in your Preact app.

```
<Shell
  fs={fs}
  startMenu={startMenu}
  desktopIcons={desktopIcons}
  apps={apps}
  ref={shell => (this.shell = shell)}
  site={site}
/>
```

| Prop         | Description                                                                                                                                               |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fs           | An instance of the filesystem. This is a kind of rudimentary state the Explorer uses to navigate and can be found in `src/lib/filesystem`.                |
| startMenu    | An object of items to include in the Start menu. Takes the form `{ "Menu entry": { icon: "default", appProps: {…} }`                                      |
| desktopIcons | An object of items to show on the desktop. Takes the form `{ "My Computer": {filename:"My Computer",icon:"default",appProps:{app:"Explorer",path:"/"}} }` |
| apps         | Object containing the list of apps imported from the `apps/` folder, or created yourself.                                                                 |
| site         | Object containing site-wide config. Presently only requires the title field. Eg. `{ title: "Example ui95 app" }`                                          |

### appProps

App props are used by the Shell to encapsulate info about an instance of an app. This is used in various places around the app, including in the FileIcons implementation, Start menu & toolbars. These props are passed directly to the app when the app is launched.

For instance, to show an alert with a message you might use the following appProps:

```js
{
  app: 'Alert',
  title: 'Untitled window',
  test: 'An error occurred'
}
```

You can see this pattern in the startMenu and desktopIcons examples under [As a desktop](/?id=as-a-desktop).

# Developing

Develop new components against Storybook:

```
npm i
npm run start
```

### Developing a new app

Apps are a weird case in React because they require bidirectional data flow. This could be handled a multitude of ways but I wanted to keep them componentised and standalone rather than bringing onboard something heavy like Redux.

Apps are responsible for maintaining their position when dragged or resized, as well as communicating events such as minimize, close and focus back to the shell. Apps also receive a wmProps object containing window state and shell APIs which must be passed to the window itself, but can also be accessed directly.

The simplest implementation of an app can be found in the functional webview component:

```js
import { h, render, Component } from "preact";
import Window from "../../components/window/index.js";

function Webview({ title, src, wmProps }) {
  return (
    <Window
      title={title}
      classNames="webview"
      width={800}
      height={600}
      wmProps={wmProps}
    >
      <iframe class="ui95-webview" src={src} />
    </Window>
  );
}

export default Webview;
```

This component largely passes props from the shell into the window, then fills the window with an iframe. The props are all fairly self-explanatory, and are used to maintain the desktop.

Once you have a window implementation running you can fill it with any content you like.

### Launching other apps from your app

The shell always passes a `onLaunchApp` function. You can use this to directly hook into the `openWindow` method of the shell.

For instance, the following will open the Alert app with some sample text:

```js
props.openWindow("Alert", {
  app: "Alert",
  title: "Untitled window",
  test: "An error occurred"
});
```

# Roadmap

There is no firm roadmap, but I am separately working on an integration with the [Hexo static site generator](https://hexo.io/) so I can add ui95 as a frontend to my entire blog.

In the meantime, this is a fun project that I think looks pretty cool.
