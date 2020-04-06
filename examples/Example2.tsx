import React, { useState, useRef, useEffect } from "react";
import { line, box, point } from "./types";
import Xarrows from "../src/Xarrow";

const canvasStyle = {
  width: "100%",
  height: "40vh",
  background: "white",
  overflow: "auto",
  display: "flex"
  // overflowY: "scroll",
  // overflowX: "hidden"
};

const boxContainerStyle = {
  position: "relative",
  overflow: "scroll",
  width: "120%",
  height: "120%",
  background: "white",
  color: "black",
  border: "black solid 1px"
};

// const innerBoxContainerStyle = {
//   position: "relative",
//   width: "50%",
//   height: "100%",
//   background: "white",
//   color: "black",
//   border: "black solid 1px"
// };

const boxStyle = {
  position: "absolute",
  border: "1px #999 solid",
  borderRadius: "10px",
  textAlign: "center",
  width: "100px",
  height: "30px"
};

const Box: React.FC = props => {
  const [lastPoint, setLastPoint] = useState<point>({ x: 0, y: 0 });

  const handlDragStart = (e: React.DragEvent) => {
    setLastPoint({ x: e.clientX, y: e.clientY });
  };

  const handleDragEnd = (e: React.DragEvent, boxId: string) => {
    let i = props.boxes.findIndex(box => box.id === boxId);
    let newBoxes = [...props.boxes];
    let newX = newBoxes[i].x + e.clientX - lastPoint.x,
      newY = newBoxes[i].y + e.clientY - lastPoint.y;
    if (newX < 0 || newY < 0) return;
    newBoxes[i].x = newX;
    newBoxes[i].y = newY;
    props.setBoxes(newBoxes);
  };

  return (
    <div
      ref={props.box.ref}
      style={{ ...boxStyle, left: props.box.x, top: props.box.y }}
      onDragStart={e => handlDragStart(e)}
      onDragEnd={e => handleDragEnd(e, props.box.id)}
      draggable
    >
      {props.box.id}
    </div>
  );
};

const Example2: React.FC = () => {
  const [boxes, setBoxes] = useState<box[]>([
    { id: "box1", x: 20, y: 20, options: {}, ref: useRef(null) },
    { id: "box2", x: 20, y: 200, ref: useRef(null) }
  ]);

  const [boxes2, setBoxes2] = useState<box[]>([
    { id: "box3", x: 20, y: 20, options: {}, ref: useRef(null) },
    { id: "box4", x: 20, y: 200, ref: useRef(null) }
  ]);

  const [lines, setLines] = useState<line[]>([
    { from: "box1", to: "box4" }
    // { from: "box3", to: "box2" }
  ]);

  const getRefById = Id => {
    var ref;
    [...boxes, ...boxes2].forEach(box => {
      if (box.id === Id) ref = box.ref;
    });
    return ref;
  };

  return (
    <React.Fragment>
      <p>
        {" "}
        works perfectly no matter the parent-child relationship between the Xarrow and the source
        and target.{" "}
      </p>
      <div style={canvasStyle}>
        <div style={boxContainerStyle}>
          {boxes.map((box, i) => (
            <Box key={i} box={box} boxes={boxes} setBoxes={setBoxes} />
          ))}
        </div>
        <div style={boxContainerStyle}>
          {boxes2.map((box, i) => (
            <Box key={i} box={box} boxes={boxes2} setBoxes={setBoxes2} />
          ))}
        </div>
      </div>
      {lines.map((line, i) => (
        <Xarrows
          key={i}
          start={getRefById(line.from)}
          end={getRefById(line.to)}
          monitorDOMchanges={true}
        />
      ))}
    </React.Fragment>
  );
};

export default Example2;
