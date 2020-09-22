import React, {useState} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {v4 as uuid} from 'uuid';
import Moment from 'react-moment';
var arraySort = require('array-sort');


{/**.
let a=[
    {
    id:0,
    value:1  
},

{
    id:1,
    value:2  

}

]

     {a.map((item,index)=>{return(<li key={index} className=" bg-blue-300 m-2">{item.value}</li>)})}

 */}


function Card(props) {

  const [popup, setpopup]=useState(false);
  const [shupopup, setshupopup]=useState(false);
  const [sortpopup, setsortpopup]=useState(false);
  const [content, setcontent]=useState(1);


const itemsFromBackend=[
];

const [data , setData]=useState(itemsFromBackend);


const IncContent= ()=>{
const date = new Date();

var itemupdate = data;
 setcontent(content + 1);
 if(content<=10)
 {
   itemupdate.push({"id":uuid() , content , date})
 }
 else {
    setpopup(true)
const timer = setTimeout(() => {
  setpopup(false)
}, 1000);
return () => clearTimeout(timer);

 }
 setData(itemupdate);
 setColumns(columnsFromBackend)
 
}

const popshut=()=>{
  setpopup(!popup);
}

const shuContent=()=>{
 var itemupdate = data;
 for (let i = itemupdate.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [itemupdate[i], itemupdate[j]] = [itemupdate[j], itemupdate[i]];
}
setData(itemupdate);
setColumns(columnsFromBackend)
if(content > 1){
setshupopup(true)
const timer = setTimeout(() => {
  setshupopup(false)
}, 1000);
return () => clearTimeout(timer);
}
//  var currentIndex = data.length, temporaryValue, randomIndex;

//  // While there remain elements to shuffle...
//  while (0 !== currentIndex) {

//    // Pick a remaining element...
//    randomIndex = Math.floor(Math.random() * currentIndex);
//    currentIndex -= 1;

//    // And swap it with the current element.
//    temporaryValue = data[currentIndex];
//    data[currentIndex] = data[randomIndex];
//    data[randomIndex] = temporaryValue;
//  }
  
//  return  setData(data);
 
}
const sortContent=()=>{


setData(arraySort (data, 'content'));
setColumns(columnsFromBackend);
if( content > 1)
{  setsortpopup(true);

const timer = setTimeout(() => {
  setsortpopup(false)
}, 1000);
return () => clearTimeout(timer);
}
}

const columnsFromBackend={
     [uuid()]:{
          name: 'Cards',
          items: data
     }
 }

const onDragEnd = (result, columns, setColumns)=>{
   if(!result.destination) return;
   const { source, destination} = result;
   const column = columns [source.droppableId];
   const copiedItems = [...column.items]
   const [removed] = copiedItems.splice(source.index,1);
   copiedItems.splice(destination.index, 0, removed);
   setColumns({
     ...columns,
     [source.droppableId] : {
       ...column,
       items: copiedItems
     }
   })
}



    const [columns , setColumns]=useState(columnsFromBackend);
    return (
        <>
        
        <div className="card flex ml-1  relative">
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
         {Object.entries(columns).map(([id, column])=>{
             return (
                 <Droppable droppableId={id} key={id}>
                 {(provided, snapshot)=>{
                     return (
                         <div 
                         {...provided.droppableProps }
                         ref={provided.innerRef}
                         style={{
                             background: snapshot.isDraggingOver ? 'Lightblue' : 'Lightgrey',
                             padding:4,
                             width:250,
                             minHeight:635,
                         }}
                         >
                         {column.items.map((item, index)=>{
                            return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          padding: 6,
                                          textAlign:'center',
                                          margin: "0 0 8px 0",
                                          minHeight: "20px",
                                          backgroundColor: snapshot.isDragging
                                            ? "#020202"
                                            : "green",
                                          color: "white",
                                          ...provided.draggableProps.style
                                        }}
                                      >
                                        {item.content}
                                      <div className="text-xs">
                                        <Moment fromNow >{item.date}</Moment>
                                      </div>
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                         })}
                         {provided.placeholder}
                         </div>
                     );
                 }}
                 </Droppable>
             )
         })
        }
        </DragDropContext>
        <div className="flex flex-col w-full">
        <div className="ml-2 mt-2">
        <button className="bg-blue-400 p-2 rounded outline-none" onClick={IncContent}>Add Card</button>
        <button className="bg-blue-400 p-2 ml-2 rounded outline-none" onClick={shuContent}>Shuffle</button>
        <button className="bg-blue-400 p-2 ml-2 rounded outline-none" onClick={sortContent}>Sort</button>
        </div>
        <div className="ml-2 flex">
        {/**pop up of add cards */}
        {popup ?
        <div className="relative z-10"> 
        <div className=" -my-2">
        <div ><i class="fa fa-caret-up fa-2x text-blue-400 ml-2" aria-hidden="true" ></i></div>
        <div className="bg-blue-400 -my-3 border rounded p-3 text-red-600 flex">
        <p className="p-2 ">Sorry Cannot Add more Cards</p>
        </div>
        </div>
        </div>
         : " "
        }
        {    /**          shuffle pop up of add cards ends */}
        {shupopup ?
        <div className="absolute z-20 ml-24"> 
        <div className="-my-2">
        <div ><i class="fa fa-caret-up fa-2x text-blue-400 ml-2" aria-hidden="true" ></i></div>
        <div className="bg-blue-400 -my-3 border rounded p-3 text-red-600 flex">
        <p className="p-2 ">Cards are shuffled</p>
        
        </div>
        </div>
        </div>
       : " " 
      }
        {    /** sort cards ends */}
       {sortpopup ?
          <div className="absolute z-20 ml-40"> 
          <div className="-my-2">
          <div ><i class="fa fa-caret-up fa-2x text-blue-400 ml-2" aria-hidden="true" ></i></div>
          <div className="bg-blue-400 -my-3 border rounded p-3 text-red-600 flex">
          <p className="p-2 ">Cards are sorted <span className="text-green">successfully </span></p>
          </div>
          </div>
          </div>
          : " "
        }
          {    /**          pop up of shuffle cards ends */}

        </div>
        </div>
        </div>
        

        </>
    );
}

export default Card;