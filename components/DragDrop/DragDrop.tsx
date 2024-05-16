// Import necessary dependencie
'use client';
import {useState} from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import styles from './page.module.css'; // Import CSS styles
import {v4 as uuidv4} from 'uuid';

// Sample data
export const data = [
  {
    id: '1',
    Task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.',
    Due_Date: '25-May-2020',
  },
  {
    id: '2',
    Task: 'Fix Styling',
    Due_Date: '26-May-2020',
  },
  {
    id: '3',
    Task: 'Handle Door Specs',
    Due_Date: '27-May-2020',
  },
  {
    id: '4',
    Task: 'morbi',
    Due_Date: '23-Aug-2020',
  },
  {
    id: '5',
    Task: 'proin',
    Due_Date: '05-Jan-2021',
  },
];

// Initial columns
export const columnsFromBackend = {
  [uuidv4()]: {
    title: 'To-do',
    items: data,
  },
  [uuidv4()]: {
    title: 'In Progress',
    items: [],
  },
  [uuidv4()]: {
    title: 'Done',
    items: [],
  },
};

export default function Home() {
  const [columns, setColumns] = useState(columnsFromBackend);

  // Function to handle drag and drop
  const onDragEnd = (result: any, columns: any, setColumns: any) => {
    if (!result.destination) return;
    const {source, destination} = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  // JSX for rendering
  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
      <div className={styles.container}>
        {/* Render columns */}
        {Object.entries(columns).map(([columnId, column]) => {
          return (
            <div key={columnId} className={styles.column}>
              <h2 className={styles.columnTitle}>{column.title}</h2>
              <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                  <div className={styles.columnContent} ref={provided.innerRef} {...provided.droppableProps}>
                    {/* Render items */}
                    {column.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            className={styles.item}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <p>{item.Task}</p>
                            <p className={styles.dueDate}>{item.Due_Date}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}
