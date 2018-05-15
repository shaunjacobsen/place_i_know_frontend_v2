import React from 'react';
import MapboxGl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
      markersRendered: false,
    };
  }

  componentDidUpdate() {
    this.renderMarkers();
    this.fitMapToBounds();
  }

  componentDidMount() {
    MapboxGl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

    this.map = new MapboxGl.Map({
      container: this.container,
      style: 'mapbox://styles/transitized/cjgs3vt1700022slgxyc129vb',
    });
  }

  fitMapToBounds() {
    if (this.props.points) {
      let bounds = new MapboxGl.LngLatBounds();
      this.props.points.forEach(point => {
        bounds.extend(new MapboxGl.LngLat(point.lng, point.lat));
      });
      this.map.fitBounds(bounds, {
        padding: 50,
      });
    }
  }

  clearMarkers() {
    this.state.markers.forEach(marker => {
      marker.remove();
    });
  }

  renderMarkers() {
    if (this.props.points) {
      this.props.points.forEach(point => {
        const marker = new MapboxGl.Marker().setLngLat([point.lng, point.lat]);
        marker.addTo(this.map);
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
