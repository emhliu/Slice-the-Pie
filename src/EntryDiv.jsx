import React, { useRef, useEffect, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import "./EntryDiv.css"

const MyTooltip = withStyles((theme) => ({
  arrow: {
    color: 'rgba(113, 168, 255, 1)',
  },
  tooltip: {
    backgroundColor: 'rgba(113, 168, 255, 1)',
    color: theme.palette.common.black,
    fontSize: 14,
  },
  }))(Tooltip);


function Entry (props) {

  function handleChange(value) {
    let total = 0;
    for(let i=0; i<props.alldata.length; i++){ //get total excluding props.category
      if(props.alldata[i].name !== props.category){
        total += props.alldata[i].value;
      }
    }
    console.log("total + value:", total + value*1);
    if(total + value*1 > 100){
      value = 100 - total;
    }
    
    props.setPrevCB(props.category, value);
    props.stateChanger(props.category, value);
  } 

  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  
  return (
    <div className="entry">
      <div id="legend">
        <svg height="20" width="20">
          <circle cx="10" cy="10" r="8" fill={props.color} />
        </svg>
        <span className="cate">{props.category}</span>
       
        <ClickAwayListener onClickAway={handleTooltipClose}>
              <MyTooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={props.caption}
                placement="bottom" arrow
              >
                <i onClick={handleTooltipOpen} className="fa fa-info-circle"></i>
              </MyTooltip>
          </ClickAwayListener>
        

      </div>
      <div>
        <input id={props.category} className="input" type="number" placeholder='0' min="0" max="100" value={props.newValue}
              onChange = { event => handleChange(event.target.value) }/>
        <span id="percent">% </span>
      </div>
    
    </div>
  )
}


function EntryDiv(props) {
  const [prev, setPrev] = useState(["",0]);
  
  function setPrevCB(cat,val){
    setPrev([cat,val*1]);
  }

  // calc Total
  let tot = 0;
  for(let i=0; i<props.data.length; i++){
    tot = tot + props.data[i].value*1;
  }

  let itemElems = [];
  
   for(let i=0; i<props.data.length; i++){
      let newValue = "";
      if(props.data[i].value !== 0){
        newValue = props.data[i].value;
      }
      itemElems.push(
        <Entry key={i} stateChanger={props.sc} category={props.data[i].name} color={props.data[i].color} caption={props.data[i].caption} setPrevCB={setPrevCB} 
        alldata={props.data} newValue={newValue}
        />
      )}

  
  return(
    <div>

      <div className="entry-box-header"> <span>Function</span> <span>Percentage (%)</span> </div> 

      <div> {itemElems} </div>

       <div id="total">
        <span className="cate">Total %</span> 
        <input value={tot} id="total-percent" type="number" readOnly/>
        <span id="percent">% </span>
      </div>

    </div>
  )
}

export default EntryDiv;