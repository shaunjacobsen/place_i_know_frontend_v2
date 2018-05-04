import React from 'react';
import MapboxGl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    this.fitMapToBounds();
  }

  componentDidMount() {
    MapboxGl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

    this.map = new MapboxGl.Map({
      container: this.container,
      style: 'mapbox://styles/transitized/cj8dtzyix8aow2rs7d63dlyq0',
    });
  }

  fitMapToBounds() {
    if (this.props.points) {
      let bounds = new MapboxGl.LngLatBounds();
      //   new MapboxGl.LngLat(this.props.bounds.se.lng, this.props.bounds.se.lat),
      //   new MapboxGl.LngLat(this.props.bounds.nw.lng, this.props.bounds.nw.lat)
      // );
      this.props.points.forEach(point => {
        bounds.extend(new MapboxGl.LngLat(point.lng, point.lat));
      });
      this.map.fitBounds(bounds);
    }
  }

  renderMarkers() {
    if (this.props.map.points) {
      this.props.map.points.forEach(marker => {
        new MapboxGl.Marker().setLngLat([marker.lng, marker.lat]).addTo(this.container);
      });
    }
  }

  render() {
    return (
      <div
        className="itinerary-map"
        ref={el => {
          this.container = el;
        }}
      />
    );
  }
}