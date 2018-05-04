import React from 'react';
import MapboxGl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export class SingleMarkerMap extends React.Component {
  componentDidMount() {
    MapboxGl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

    this.map = new MapboxGl.Map({
      container: this.container,
      style: 'mapbox://styles/transitized/cjgs3vt1700022slgxyc129vb',
      zoom: 14,
    });

    this.renderMarker();
  }

  setCenter() {
    this.map.setCenter([this.props.point.lng, this.props.point.lat]);
  }

  renderMarker() {
    new MapboxGl.Marker()
      .setLngLat([this.props.point.lng, this.props.point.lat])
      .addTo(this.map);
    this.setCenter();
  }

  render() {
    return (
      <div
        className="single-marker-map"
        ref={el => {
          this.container = el;
        }}
      />
    );
  }
}
