import React from 'react';

class ButtonPrint extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
  }

  render() {
    return (
      <button
          className="messaging-btn-print"
          type="button"
          onClick={this.handleClick}>
        <i className="fa fa-print"></i>
        <span>Print</span>
      </button>
    );
  }
}

ButtonPrint.propTypes = {
};

export default ButtonPrint;
