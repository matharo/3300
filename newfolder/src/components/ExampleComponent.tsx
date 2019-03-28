import * as React from "react";

interface Props {
  example: string;
}

interface State {
  example: string;
}

export class ExampleComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      example: "this is an example state"
    };
  }

  render() {
    return (
      <div>
        <h1>
          The properties (props) of this component are "{this.props.example}". The
          states of this component are "{this.state.example}"
        </h1>
      </div>
    );
  }
}
