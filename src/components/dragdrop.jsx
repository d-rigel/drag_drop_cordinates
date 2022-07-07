import React from 'react';
import axios from "axios";
import './dragdrop.css';

export default class Draggable extends React.Component {
  state = {
    isDragging: false,

    originalX: 0,
    originalY: 0,

    translateX: 0,
    translateY: 0,

    lastTranslateX: 0,
    lastTranslateY: 0,

    theClass: 'display-none'
  };

  
  componentDidMount = async() => {
    let coordsInit = await fetch('http://localhost:3900/api/coords/init');
    coordsInit = await coordsInit.json();
    this.setState({
      translateX: coordsInit.xPos,
      translateY: coordsInit.yPos,
      lastTranslateX: coordsInit.xPos,
      lastTranslateY: coordsInit.yPos,
      theClass: ''
    });
  }

  
  componentWillUnmount  = async () => {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  };

  handleMouseDown = (e) => {
    e.preventDefault();
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    if (this.props.onDragStart) {
      this.props.onDragStart();
    }

    this.setState({
      originalX: e.clientX,
      originalY: e.clientY,
      isDragging: true
    });
  };

  handleMouseMove = ({ clientX, clientY }) => {
    const { isDragging } = this.state;
    const { onDrag } = this.props;

    if (!isDragging) {
      return;
    }

    this.setState(prevState => ({
      translateX: clientX - prevState.originalX + prevState.lastTranslateX,
      translateY: clientY - prevState.originalY + prevState.lastTranslateY
    }), () => {
      if (onDrag) {
        onDrag({
          translateX: this.state.translateX,
          translateY: this.state.translateY
        });
      }
    });
  };

  handleMouseUp = async () => {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);

    this.setState(
      {
        originalX: 0,
        originalY: 0,
        lastTranslateX: this.state.translateX,
        lastTranslateY: this.state.translateY,

        isDragging: false
      },
      () => {
        if (this.props.onDragEnd) {
          this.props.onDragEnd();
        }
      }
    );

    let saveCords = axios.post("http://localhost:3900/api/coords/savecords", {
      xPos: this.state.lastTranslateX,
      yPos: this.state.lastTranslateY
    });
  
//    const newToken = await updateCords(this.state);
//    console.log('unmounting');
  };

  render() {
    const { children } = this.props;
    const { theClass, translateX, translateY, isDragging } = this.state;

    return (
      <div
        onMouseDown={this.handleMouseDown}
        x={translateX}
        y={translateY}
        isDragging={isDragging}
        style={{transform: `translate(${translateX}px, ${translateY}px)`, cursor: 'grab' }}
        id='dragItem'
        className={theClass}
      >
        {children}
      </div>
    );
  }
}


