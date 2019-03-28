import * as React from "react";
import { ExampleComponent } from "./ExampleComponent";

export class App extends React.Component {
  render() {
    return (
      <div>
        <h1>
          This is where the application begins. You can import any component,
          like ExampleComponent below. This component does not have props or
          state, but it may. ExampleComponent has both props and state.
        </h1>
        <p>
          You can add whatever html component you want. Or you can create your
          own and add them, like with ExampleComponent. What we want this gui to
          do is let the user upload a csv file, have a button that says 'start',
          a button that says 'stop', and a 'generate output' button that
          generates some kind of output_log.json and a visual graph. Right now
          there are no other files in this branch, this is just a template, so
          you wont see our modules like Buffer.ts, etc.
        </p>
        <ExampleComponent example="example text prop" />
      </div>
    );
  }
}
