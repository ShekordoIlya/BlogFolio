import { Component } from "react";
interface MyClassState {
  count: number;
}
interface IProps {
  isActive: boolean;
}
class MyFirstClassComponent extends Component<IProps, MyClassState> {
  constructor(props: IProps) {
    super(props);
    console.log("life cicle: constructor");
    this.state = {
      count: 0,
    };
  }
  updateState() {
    this.setState({ count: this.state.count + 1 });
  }
  updateLikeAGod() {
    this.forceUpdate();
  }
  render() {
    console.log("life cicle: in render");
    return (
      <div>
        In my class component{" "}
        <button onClick={() => this.updateState()}>Update State</button>
        <button onClick={() => this.updateLikeAGod()}>Force update</button>
        <h1>Count : {`${this.state.count}`}</h1>
        {this.props.isActive ? `is active` : `is not active`}
      </div>
    );
  }
  componentDidMount() {
    console.log("life cicle: in componentDidMount");
  }
  componentDidUpdate() {
    console.log("life cicle: in componentDidUpdate");
  }
  componentWillUnmount() {
    console.log("componentWillUnmount: component was unmounted");
  }
}
export default MyFirstClassComponent;
