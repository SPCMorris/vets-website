import React from 'react';
import Scroll from 'react-scroll';
import _ from 'lodash';
import { set } from 'lodash/fp';

import { isValidSection } from '../../utils/validations';

const Element = Scroll.Element;
const scroller = Scroll.scroller;

class GrowableTable extends React.Component {
  constructor(props) {
    super(props);
    this.createNewElement = this.createNewElement.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.state = {};
  }

  componentWillMount() {
    if (this.props.rows.length > 0) {
      this.props.rows.map((obj) => {
        this.setState({ [obj.key]: 'complete' });
        return true;
      });
    }
  }

  componentDidMount() {
    if (this.props.rows.length === 0) {
      this.createNewElement();
    }
  }

  scrollToTop() {
    scroller.scrollTo('topOfTable', {
      duration: 500,
      delay: 0,
      smooth: true,
    });
  }

  createNewElement() {
    const blankRowData = this.props.createRow();
    blankRowData.key = _.uniqueId('key-');
    const rows = this.props.rows.slice();
    rows.push(blankRowData);
    this.props.onRowsUpdate(rows);

    this.setState({ [blankRowData.key]: 'incomplete' });
  }

  findIncomplete() {
    return _.findKey(this.state, v => v === 'incomplete');
  }

  handleAdd() {
    // Save existing
    this.handleSave();

    if (this.props.isValidSection(this.props.path, this.props.data)) {
      this.createNewElement();
    }
  }

  handleEdit(event) {
    this.setState({ [event.target.dataset.key]: 'edit' });
  }

  handleSave(event) {
    this.props.initializeCurrentElement();
    const key = event ? event.target.dataset.key : this.findIncomplete();

    if (this.props.isValidSection(this.props.path, this.props.data)) {
      this.setState({ [key]: 'complete' });
    }

    this.scrollToTop();
  }

  handleRemove(event) {
    const indexToRemove = Number(event.target.dataset.index);
    const rows = [];
    this.props.rows.every((obj, index) => {
      if (index !== indexToRemove) {
        rows.push(obj);
      }
      return true;
    });
    this.props.onRowsUpdate(rows);
  }

  // TODO: change this to not use reaactKey, and instead perhaps add
  // `this.rows = []` in the constructor and update on changes
  render() {
    let reactKey = 0;
    let rowContent;
    const state = this.state;
    const rowElements = this.props.rows.map((obj, index) => {
      const stateKey = state[obj.key];
      if (stateKey && stateKey === 'complete') {
        rowContent = (
          <div key={reactKey++} className={stateKey}>
            <div className="row" key={obj.key}>
              <div className="small-6 columns">
                {React.createElement(this.props.component,
                  { data: obj,
                    view: 'collapsed',
                    onValueChange: (subfield, update) => {
                      const newRows = set(`[${index}].${subfield}`, update, this.props.rows);
                      this.props.onRowsUpdate(newRows);
                    }
                  })}
              </div>
              <div className="small-3 columns">
                <button className="usa-button-outline short" onClick={(event) => this.handleEdit(event)} data-key={obj.key}><i className="fa before-text fa-pencil"></i>Edit</button>
              </div>
            </div>
            <hr/>
          </div>
        );
      } else {
        let buttons;
        if (this.props.rows.length > this.props.minimumRows && stateKey !== 'incomplete') {
          buttons = (
            <div className="row">
              <div className="small-3 left columns">
                <button className="short" onClick={(event) => this.handleSave(event)} data-key={obj.key}><i className="fa before-text fa-check"></i>Update</button>
              </div>
              <div className="small-3 right columns">
                <button className="usa-button-outline short" onClick={this.handleRemove} data-index={index}><i className="fa before-text fa-trash-o"></i>Remove</button>
              </div>
            </div>
          );
        }
        rowContent = (
          <div key={reactKey++} className={stateKey}>
            <div className="row" key={obj.key}>
              <div className="small-12 columns">
                {React.createElement(this.props.component,
                  { data: obj,
                    view: 'expanded',
                    onValueChange: (subfield, update) => {
                      const newRows = set(`[${index}].${subfield}`, update, this.props.rows);
                      this.props.onRowsUpdate(newRows);
                    }
                  })}
              </div>
            </div>
            {buttons}
            <hr/>
          </div>
        );
      }

      return rowContent;
    });

    return (
      <div className="va-growable">
        <Element name="topOfTable"/>
        {rowElements}
        <div className="row">
          <div className="small-3 small-centered columns">
            <button className="usa-button-outline short" onClick={this.handleAdd}><i className="fa before-text fa-plus"></i>Add another</button>
          </div>
        </div>
      </div>
    );
  }
}

GrowableTable.propTypes = {
  component: React.PropTypes.func.isRequired,
  createRow: React.PropTypes.func.isRequired,
  data: React.PropTypes.object.isRequired,
  initializeCurrentElement: React.PropTypes.func.isRequired,
  onRowsUpdate: React.PropTypes.func.isRequired,
  path: React.PropTypes.string.isRequired,
  rows: React.PropTypes.array.isRequired,
  isValidSection: React.PropTypes.func.isRequired,
  minimumRows: React.PropTypes.number
};

GrowableTable.defaultProps = {
  isValidSection,
  minimumRows: 0
};

export default GrowableTable;
