import React from 'react';
import './App.css';
import Map from "./Map";
import {FormControl, IconButton, MenuItem, Select, withStyles} from '@material-ui/core';
import {Delete} from "@material-ui/icons";


const styles = theme => ({
  map: {
    zIndex: -1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
  },
  shapeSelectContainer: {
    position: 'absolute',
    verticalAlign: 'middle',
    right: 16,
    top: 16
  },
  textContainer: {
    position: 'absolute',
    bottom: 32,
    left: 16,
    background: '#eee',
    paddingLeft: 16,
    paddingRight: 16,
  }
});

const shapes = [
  { key: 1, value: 'Circle', mode: 'draw_circle' },
  { key: 2, value: 'Drag Circle', mode: 'drag_circle' },
  { key: 3, value: 'Polygon', mode: 'draw_polygon' },
  { key: 4, value: 'Line', mode: 'draw_line_string' },
];

class App extends React.Component {

  constructor(props) {
    super(props);
    this.initialState = {
      selectedShape: shapes[0],
      mode: shapes[0].mode,
      features: []
    };
    this.state = { ...this.initialState };
  }

  setState(state, callback) {
    super.setState(state, callback);
    console.log('what');
  }

  render() {
    const { classes } = this.props;
    const feature = this.state.features[0];
    const center = feature && feature.properties.isCircle ?
        feature.properties.center.map(coord => coord.toFixed(3)) : [];
    return (
      <div>
        <div className={classes.map}>
          <Map
            onFeaturesUpdated={
              (features) => this.setState({features: features})
            }
            features={this.state.features}
            mode={this.state.mode} />
        </div>
        <div className={classes.shapeSelectContainer}>
          <FormControl>
            <Select
              value={this.state.selectedShape.key ? this.state.selectedShape.key : 0}
              onChange={(e) => {
                const selectedShape = shapes.find(shape => shape.key === e.target.value);
                this.setState({
                  selectedShape: selectedShape,
                  mode: selectedShape.mode,
                  features: []
                })
              }}
              inputProps={{name: 'shape', id: 'shape-selector'}}>
              {
                shapes.map(shape =>
                  <MenuItem key={shape.key} value={shape.key}>{shape.value}</MenuItem>
                )
              }
            </Select>
          </FormControl>
          <IconButton onClick={() => this.setState({ ...this.initialState })}>
            <Delete />
          </IconButton>
        </div>
        <div className={classes.textContainer}>
          <p>{`Center: [${center.join(', ')}]`}</p>
          <p>
            {
              `Radius: ${feature && feature.properties.isCircle ? feature.properties.radiusInKm.toFixed(4) : '--'} kms`
            }
          </p>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
